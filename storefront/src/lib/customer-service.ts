import { randomUUID } from 'node:crypto';
import { customerDatabase } from './customer-db';
import { CustomerError, customerOrigin, hash, token, preferenceToken } from './customer-security';
import { queueMail } from './customer-mail';
import { paymentDatabase } from './payments';

export const newsletterConsent = 'I want occasional Bogey Baby emails about new colors and drops. I can unsubscribe at any time.';
export async function saveSupport(input: {name:string;email:string;kind:string;order:string;message:string;requestKey:string}) {
  const db=await customerDatabase();const client=await db.connect();
  const fingerprint=hash(JSON.stringify([input.name,input.email,input.kind,input.order,input.message]));
  const reference='BB-'+token().slice(0,10).toUpperCase();
  try {
    await client.query('BEGIN');
    const inserted=await client.query(`INSERT INTO bogey_customer.support_requests(id,request_key,fingerprint,reference,name,email,kind,order_reference,message) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9) ON CONFLICT(request_key) DO NOTHING RETURNING reference`,[randomUUID(),input.requestKey,fingerprint,reference,input.name,input.email,input.kind,input.order,input.message]);
    if(!inserted.rowCount){
      const row=(await client.query('SELECT reference,fingerprint FROM bogey_customer.support_requests WHERE request_key=$1',[input.requestKey])).rows[0];
      if(row?.fingerprint!==fingerprint)throw new CustomerError('Your message changed. Please submit it again.');
      await client.query('COMMIT');return row.reference as string;
    }
    const inbox=process.env.SUPPORT_NOTIFICATION_EMAIL;
    await queueMail(client,'support_notice',{to:inbox||'',replyTo:input.email,subject:`${reference}: ${input.kind} request`,text:`A new Bogey Baby request is saved.\n\nReference: ${reference}\nName: ${input.name}\nEmail: ${input.email}\nOrder: ${input.order||'Not provided'}\nTopic: ${input.kind}\n\n${input.message}\n\nManage requests: ${customerOrigin()}/customer-care`});
    await queueMail(client,'support_receipt',{to:input.email,...(inbox?{replyTo:inbox}:{}),subject:`Your Bogey Baby request ${reference}`,text:`Your message is saved with reference ${reference}.\n\nKeep this reference for follow-up. You can review our return terms at ${customerOrigin()}/pages/shipping-returns.\n\nBogey Baby`});
    await client.query('COMMIT');return reference;
  }catch(error){await client.query('ROLLBACK');throw error;}finally{client.release();}
}

export async function requestEmailLink(email:string,purpose:'account'|'newsletter',source='account',productHandle?:string) {
  const db=await customerDatabase();const client=await db.connect();const raw=token();
  const minutes=purpose==='account'?20:1440;
  try {
    await client.query('BEGIN');
    if(purpose==='newsletter')await client.query(`INSERT INTO bogey_customer.subscribers(email,source,product_handle,consent_text) VALUES($1,$2,$3,$4)
      ON CONFLICT(email) DO UPDATE SET source=EXCLUDED.source,product_handle=EXCLUDED.product_handle,consent_text=EXCLUDED.consent_text,requested_at=now()`,[email,source,productHandle??null,newsletterConsent]);
    await client.query(`INSERT INTO bogey_customer.email_tokens(token_hash,email,purpose,expires_at) VALUES($1,$2,$3,now()+$4*interval '1 minute')`,[hash(raw),email,purpose,minutes]);
    const link=customerOrigin()+(purpose==='account'?'/account/confirm':'/email-preferences/confirm')+'?token='+raw;
    const outboxId=await queueMail(client,purpose==='account'?'account_link':'newsletter_confirmation',{
      to:email,subject:purpose==='account'?'Your Bogey Baby sign-in link':'Confirm your Bogey Baby emails',
      text:purpose==='account'?`Open this link, then choose Sign in to access your paid orders:\n\n${link}\n\nThis link expires in 20 minutes and can be used once. If you did not request it, ignore this email.`:`Confirm that you want occasional Bogey Baby emails about new colors and drops:\n\n${link}\n\nThis link expires in 24 hours. If you did not request it, ignore this email.\n\nUnsubscribe: ${customerOrigin()}/email-preferences?token=${preferenceToken(email)}`,
    },minutes);
    await client.query('COMMIT');return outboxId;
  }catch(error){await client.query('ROLLBACK');throw error;}finally{client.release();}
}
export async function consumeLink(raw:string,purpose:'account'|'newsletter') {
  if(!/^[A-Za-z0-9_-]{43}$/.test(raw))throw new CustomerError('This link is invalid or has expired. Request a new one.');
  const db=await customerDatabase();const client=await db.connect();
  try {
    await client.query('BEGIN');
    const result=await client.query(`UPDATE bogey_customer.email_tokens SET used_at=now() WHERE token_hash=$1 AND purpose=$2 AND used_at IS NULL AND expires_at>now() RETURNING email`,[hash(raw),purpose]);
    const email=result.rows[0]?.email as string|undefined;if(!email)throw new CustomerError('This link is invalid or has expired. Request a new one.');
    if(purpose==='newsletter')await client.query(`UPDATE bogey_customer.subscribers SET status='subscribed',confirmed_at=now(),unsubscribed_at=NULL WHERE email=$1`,[email]);
    const sessionToken=purpose==='account'?token():null;
    if(sessionToken)await client.query(`INSERT INTO bogey_customer.sessions(token_hash,email,purpose,expires_at) VALUES($1,$2,'customer',now()+interval '7 days')`,[hash(sessionToken),email]);
    await client.query('COMMIT');return {email,sessionToken};
  }catch(error){await client.query('ROLLBACK');throw error;}finally{client.release();}
}
export async function unsubscribe(email:string) {
  const db=await customerDatabase();const client=await db.connect();
  try {
    await client.query('BEGIN');
    await client.query(`UPDATE bogey_customer.subscribers SET status='unsubscribed',unsubscribed_at=now() WHERE email=$1`,[email]);
    await client.query(`UPDATE bogey_customer.email_tokens SET used_at=now() WHERE email=$1 AND purpose='newsletter' AND used_at IS NULL`,[email]);
    await client.query('COMMIT');
  }catch(error){await client.query('ROLLBACK');throw error;}finally{client.release();}
}
export async function customerOrders(email:string, orderScope?:string|null) {
  const db=await paymentDatabase();
  return (await db.query(`SELECT session_id,amount_total,currency,basket,fulfillment_status,created_at FROM bogey_checkout.orders WHERE livemode=true AND lower(COALESCE(stripe_session->'customer_details'->>'email',stripe_session->>'customer_email',''))=$1 AND ($2::text IS NULL OR session_id=$2) ORDER BY created_at DESC LIMIT 100`,[email,orderScope??null])).rows;
}
export function csvCell(value:unknown) {
  let text=String(value??'');if(/^[=+\-@\t\r]/.test(text))text="'"+text;
  return '"'+text.replaceAll('"','""')+'"';
}

/** An unguessable checkout reference plus billing email grants access to that order only. */
export async function lookupOrder(email:string,reference:string) {
 if(!/^cs_live_[A-Za-z0-9]{10,240}$/.test(reference))throw new CustomerError('Check your checkout reference and billing email.');
 const db=await paymentDatabase();const found=(await db.query("SELECT session_id FROM bogey_checkout.orders WHERE session_id=$1 AND livemode=true AND lower(COALESCE(stripe_session->'customer_details'->>'email',stripe_session->>'customer_email',''))=$2",[reference,email])).rows[0];
 if(!found)throw new CustomerError('Check your checkout reference and billing email.');
 const customerDb=await customerDatabase();const raw=token();await customerDb.query("INSERT INTO bogey_customer.sessions(token_hash,email,purpose,order_scope,expires_at) VALUES($1,$2,'customer',$3,now()+interval '7 days')",[hash(raw),email,reference]);return raw;
}
