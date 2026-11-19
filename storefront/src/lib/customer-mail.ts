import { randomUUID } from 'node:crypto';
import type { PoolClient } from 'pg';
import { customerDatabase } from './customer-db';
import { decrypt, encrypt } from './customer-security';
export type CustomerMail = { to: string; subject: string; text: string; replyTo?: string };
export function mailReady() { return Boolean(process.env.RESEND_API_KEY && process.env.EMAIL_FROM); }
export async function queueMail(client: PoolClient, kind: string, mail: CustomerMail, minutes = 1440) {
  const id = randomUUID();
  await client.query(`INSERT INTO bogey_customer.email_outbox(id,kind,payload,expires_at) VALUES($1,$2,$3,now()+$4*interval '1 minute')`,[id,kind,encrypt(mail),minutes]);
  return id;
}
export async function processCustomerMail(limit = 10, onlyId?: string) {
  const db = await customerDatabase();
  await db.query("DELETE FROM bogey_customer.sessions WHERE expires_at<now(); DELETE FROM bogey_customer.email_tokens WHERE expires_at<now()-interval '1 day'; DELETE FROM bogey_customer.rate_limits WHERE expires_at<now()-interval '1 day'");
  await db.query("UPDATE bogey_customer.email_outbox SET status='expired',payload=NULL WHERE status='pending' AND expires_at<=now()");
  if (!mailReady()) return {sent:0,pending:true};
 const client=await db.connect();let sent=0;
  try {
    await client.query('SELECT pg_advisory_lock(624153002)');
    await client.query(`UPDATE bogey_customer.email_outbox SET status='expired',payload=NULL WHERE status='pending' AND expires_at<=now()`);
    const rows = (await client.query(`SELECT * FROM bogey_customer.email_outbox WHERE status='pending' AND next_attempt_at<=now() AND expires_at>now() AND ($2::uuid IS NULL OR id=$2) AND ($3::boolean OR kind<>'support_notice') ORDER BY created_at LIMIT $1`,[Math.min(limit,20),onlyId??null,Boolean(process.env.SUPPORT_NOTIFICATION_EMAIL)])).rows;
    for (const row of rows) {
      try {
        const mail = decrypt<CustomerMail>(row.payload);
        const response = await fetch('https://api.resend.com/emails',{method:'POST',headers:{Authorization:'Bearer '+process.env.RESEND_API_KEY,'Content-Type':'application/json','Idempotency-Key':'bogey-customer/'+row.id},body:JSON.stringify({from:process.env.EMAIL_FROM,to:[mail.to||(row.kind==='support_notice'?process.env.SUPPORT_NOTIFICATION_EMAIL:'')],subject:mail.subject,text:mail.text,...(mail.replyTo?{reply_to:mail.replyTo}:{})}),signal:AbortSignal.timeout(10000)});
        if (!response.ok) throw new Error('Email provider returned '+response.status);
        const result=await response.json();if(typeof result.id!=='string')throw new Error('Email provider response invalid');
        await client.query(`UPDATE bogey_customer.email_outbox SET status='sent',payload=NULL,provider_id=$2,last_error=NULL WHERE id=$1`,[row.id,result.id]);sent++;
      } catch(error) {
        await client.query(`UPDATE bogey_customer.email_outbox SET attempts=attempts+1,next_attempt_at=now()+interval '5 minutes',last_error=$2 WHERE id=$1`,[row.id,error instanceof Error&&/^Email provider/.test(error.message)?error.message:'Delivery attempt failed']);
      }
    }
  } finally {await client.query('SELECT pg_advisory_unlock(624153002)').catch(()=>undefined);client.release();}
  return {sent,pending:false};
}
