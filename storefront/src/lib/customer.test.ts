import assert from 'node:assert/strict';
import {test,before,beforeEach,after} from 'node:test';
import {randomUUID} from 'node:crypto';
import nock from 'nock';
import {customerDatabase} from './customer-db';
import {saveSupport,requestEmailLink,consumeLink,unsubscribe,customerOrders,lookupOrder,csvCell} from './customer-service';
import {processCustomerMail} from './customer-mail';
import {decrypt,encrypt,hash,session,customerSession,rateLimit,emailAddress,preferenceToken,preferenceEmail,requireOrigin,body} from './customer-security';
import {paymentDatabase} from './payments';
const url=process.env.CUSTOMER_TEST_DATABASE_URL;const integration=url?test:test.skip;
before(async()=>{
 if(!url)return;const u=new URL(url);assert.equal(u.hostname,'127.0.0.1');assert.equal(u.pathname,'/bogey_customer_test');
 process.env.CHECKOUT_DATABASE_URL=url;process.env.CUSTOMER_AUTH_SECRET='fixture-only-auth-secret-with-at-least-forty-characters';process.env.NEXT_PUBLIC_SITE_URL='http://localhost:3123';process.env.SUPPORT_NOTIFICATION_EMAIL='owner@example.invalid';
 nock.disableNetConnect();await customerDatabase();await paymentDatabase();
});
beforeEach(async()=>{
 if(!url)return;delete process.env.RESEND_API_KEY;delete process.env.EMAIL_FROM;nock.cleanAll();
 await (await customerDatabase()).query('TRUNCATE bogey_customer.support_requests,bogey_customer.subscribers,bogey_customer.email_tokens,bogey_customer.sessions,bogey_customer.email_outbox,bogey_customer.rate_limits');
 await (await paymentDatabase()).query('TRUNCATE bogey_checkout.orders,bogey_checkout.attempts CASCADE');
});
after(async()=>{nock.cleanAll();nock.enableNetConnect();if(url){await (await customerDatabase()).end();await (await paymentDatabase()).end();}});
async function link(purpose:'account'|'newsletter',email='alice@example.invalid'){
 const id=await requestEmailLink(email,purpose,'test');const row=(await (await customerDatabase()).query('SELECT payload FROM bogey_customer.email_outbox WHERE id=$1',[id])).rows[0];const mail=decrypt<{text:string}>(row.payload);return{id,raw:mail.text.match(/\?token=([A-Za-z0-9_-]{43})/)![1]};
}
integration('support content persists and identical retries do not duplicate requests or notices',async()=>{
 const input={name:'Alice',email:'alice@example.invalid',kind:'return',order:'reference',message:'Please help with the fit. Full body survives.',requestKey:randomUUID()};
 const reference=await saveSupport(input);assert.equal(await saveSupport(input),reference);
 const db=await customerDatabase();const rows=(await db.query('SELECT * FROM bogey_customer.support_requests')).rows;assert.equal(rows.length,1);assert.equal(rows[0].message,input.message);assert.equal((await db.query('SELECT * FROM bogey_customer.email_outbox')).rowCount,2);
 await assert.rejects(()=>saveSupport({...input,message:'Changed request'}));
});
integration('customer feedback remains private and durable with an order reference',async()=>{
 const db=await customerDatabase();const reference=await saveSupport({name:'Fixture Buyer',email:'buyer@example.invalid',kind:'review',order:'outside-order-fixture',message:'Fit feedback; not permission to publish.',requestKey:randomUUID()});
 const row=(await db.query('SELECT kind,message,status,order_reference FROM bogey_customer.support_requests WHERE reference=$1',[reference])).rows[0];
 assert.equal(row.kind,'review');assert.equal(row.status,'open');assert.equal(row.order_reference,'outside-order-fixture');assert.match(row.message,/not permission to publish/);
});
integration('provider failure preserves retryable email; concurrent retries use one idempotent send',async()=>{
 const {id}=await link('account');process.env.RESEND_API_KEY='fixture-only';process.env.EMAIL_FROM='Test <test@example.invalid>';
 nock('https://api.resend.com').post('/emails').matchHeader('Idempotency-Key','bogey-customer/'+id).reply(503,{});
 assert.equal((await processCustomerMail(1,id)).sent,0);const db=await customerDatabase();let row=(await db.query('SELECT * FROM bogey_customer.email_outbox WHERE id=$1',[id])).rows[0];assert.equal(row.status,'pending');assert.equal(row.attempts,1);assert.ok(row.payload);
 await db.query('UPDATE bogey_customer.email_outbox SET next_attempt_at=now() WHERE id=$1',[id]);
 nock('https://api.resend.com').post('/emails').matchHeader('Idempotency-Key','bogey-customer/'+id).reply(200,{id:'provider-fixture'});
 const results=await Promise.all([processCustomerMail(1,id),processCustomerMail(1,id)]);assert.equal(results.reduce((n,r)=>n+r.sent,0),1);
 row=(await db.query('SELECT * FROM bogey_customer.email_outbox WHERE id=$1',[id])).rows[0];assert.equal(row.status,'sent');assert.equal(row.payload,null);assert.ok(nock.isDone());
});
integration('magic links enforce purpose, expiry and atomic single-use; sessions enforce roles',async()=>{
 const {raw}=await link('account');await assert.rejects(()=>consumeLink(raw,'newsletter'));
 const used=await Promise.allSettled([consumeLink(raw,'account'),consumeLink(raw,'account')]);assert.equal(used.filter(r=>r.status==='fulfilled').length,1);
 const result=used.find(r=>r.status==='fulfilled') as PromiseFulfilledResult<{email:string;sessionToken:string|null}>;assert.equal(await session(result.value.sessionToken!,'customer'),'alice@example.invalid');assert.equal(await session(result.value.sessionToken!,'admin'),null);assert.equal(await session('tampered','customer'),null);
 const expired=await link('account');await (await customerDatabase()).query("UPDATE bogey_customer.email_tokens SET expires_at=now()-interval '1 second' WHERE token_hash=$1",[hash(expired.raw)]);await assert.rejects(()=>consumeLink(expired.raw,'account'));
});
integration('newsletter requires confirmation and unsubscribe invalidates older opt-in links',async()=>{
 const first=await link('newsletter');const db=await customerDatabase();assert.equal((await db.query('SELECT status FROM bogey_customer.subscribers')).rows[0].status,'pending');await consumeLink(first.raw,'newsletter');assert.equal((await db.query('SELECT status FROM bogey_customer.subscribers')).rows[0].status,'subscribed');
 const older=await link('newsletter');const pref=preferenceToken('alice@example.invalid');assert.equal(preferenceEmail(pref),'alice@example.invalid');await unsubscribe(preferenceEmail(pref));await assert.rejects(()=>consumeLink(older.raw,'newsletter'));assert.equal((await db.query('SELECT status FROM bogey_customer.subscribers')).rows[0].status,'unsubscribed');assert.throws(()=>preferenceEmail(pref+'tampered'));
});
integration('history is isolated by email and live mode; reference lookup grants one order only',async()=>{
 const db=await paymentDatabase();const refs:string[]=[];
 for(const [i,email,live] of [[1,'alice@example.invalid',true],[2,'alice@example.invalid',true],[3,'bob@example.invalid',true],[4,'alice@example.invalid',false]] as const){const id=randomUUID();const ref='cs_live_'+String(i).repeat(40);refs.push(ref);await db.query('INSERT INTO bogey_checkout.attempts(id,basket_hash,basket) VALUES($1,$2,$3)',[id,'fixture',JSON.stringify({lines:[],count:1})]);await db.query("INSERT INTO bogey_checkout.orders(session_id,attempt_id,livemode,amount_total,currency,basket,stripe_session) VALUES($1,$2,$3,4500,'usd',$4,$5)",[ref,id,live,JSON.stringify({lines:[],count:1}),JSON.stringify({customer_details:{email}})]);}
 assert.equal((await customerOrders('alice@example.invalid')).length,2);await assert.rejects(()=>lookupOrder('alice@example.invalid',refs[2]));await assert.rejects(()=>lookupOrder('alice@example.invalid',refs[3]));const raw=await lookupOrder('alice@example.invalid',refs[0]);const current=await customerSession(raw);assert.equal(current?.order_scope,refs[0]);assert.equal((await customerOrders(current!.email,current!.order_scope)).length,1);
});
integration('rate limiting remains atomic and recovers after its time window',async()=>{
 const results=await Promise.allSettled(Array.from({length:12},()=>rateLimit('test-concurrent',5)));assert.equal(results.filter(r=>r.status==='fulfilled').length,5);await (await customerDatabase()).query("UPDATE bogey_customer.rate_limits SET expires_at=now()-interval '1 second'");await assert.doesNotReject(()=>rateLimit('test-concurrent',5));
});
integration('payloads reject tampering; inputs reject CRLF, forged origins, oversize and invalid JSON',async()=>{
 const encrypted=encrypt({private:'value'});assert.ok(!encrypted.includes('value'));assert.deepEqual(decrypt(encrypted),{private:'value'});const bytes=Buffer.from(encrypted,'base64url');bytes[30]^=1;assert.throws(()=>decrypt(bytes.toString('base64url')));assert.throws(()=>emailAddress('a@example.com\r\nBcc: victim@example.com'));assert.throws(()=>requireOrigin(new Request('http://localhost:3123',{method:'POST',headers:{origin:'https://evil.invalid'}})));
 await assert.rejects(()=>body(new Request('http://localhost:3123',{method:'POST',body:'x'.repeat(17000)})));await assert.rejects(()=>body(new Request('http://localhost:3123',{method:'POST',body:'null',headers:{'Content-Type':'application/json'}})));assert.equal(csvCell('=1+1'),'"\'=1+1"');
});
