import type {Metadata} from 'next';
import {cookies} from 'next/headers';
import {cookieNames,session} from '@/lib/customer-security';
import {customerDatabase} from '@/lib/customer-db';
import {mailReady} from '@/lib/customer-mail';
export const metadata:Metadata={title:'Customer care',robots:{index:false,follow:false}};
export const dynamic='force-dynamic';
export default async function CustomerCare({searchParams}:{searchParams:Promise<{error?:string}>}) {
 const params=await searchParams;const jar=await cookies();const admin=await session(jar.get(cookieNames.admin)?.value,'admin');
 if(!admin)return <section className="section"><div className="container" style={{maxWidth:600}}><h1>Customer care</h1><form className="panel form-grid" style={{marginTop:24}} action="/api/customer-care/login" method="post"><label className="field"><span>Admin access key</span><input className="input" type="password" name="key" autoComplete="current-password" required maxLength={128}/></label><button className="btn">Sign in</button>{params.error&&<p role="alert">Sign-in failed. Check your key or wait before trying again.</p>}</form></div></section>;
 const db=await customerDatabase();const requests=(await db.query('SELECT * FROM bogey_customer.support_requests ORDER BY created_at DESC LIMIT 100')).rows;
 const counts=(await db.query('SELECT status,count(*)::int AS total FROM bogey_customer.subscribers GROUP BY status')).rows;
 const mail=(await db.query('SELECT status,count(*)::int AS total FROM bogey_customer.email_outbox GROUP BY status')).rows;
 return <section className="section"><div className="container customer-care"><div className="releases__head"><h1>Customer care</h1><form method="post" action="/api/account/logout"><button className="btn btn--secondary">Sign out</button></form></div>
  <div className="panel"><h2 className="h3">Delivery and subscribers</h2><p>Email provider: {mailReady()?'Configured':'Not connected — saved requests remain available below.'}</p><p>Support notification inbox: {process.env.SUPPORT_NOTIFICATION_EMAIL||'Not set'}</p><p>{counts.length?counts.map(c=>`${c.total} ${c.status}`).join(' · '):'No subscribers yet.'}</p><p>{mail.length?mail.map(c=>`${c.total} emails ${c.status}`).join(' · '):'No emails queued.'}</p><div className="btn-row"><a className="btn btn--secondary" href="/api/customer-care/export">Export confirmed subscribers</a><form method="post" action="/api/customer-care/retry"><button className="btn btn--secondary">Retry pending email</button></form></div></div>
  <h2 style={{margin:'32px 0 20px'}}>Support requests</h2>{requests.length?requests.map(r=><article className="panel customer-care__request" key={r.id}><div className="releases__head"><h3>{r.reference} · {r.kind}</h3><span>{r.status}</span></div><p><strong>{r.name}</strong> · <a href={`mailto:${encodeURIComponent(r.email)}`}>{r.email}</a></p>{r.order_reference&&<p className="customer-order__reference">Order: {r.order_reference}</p>}<p className="customer-care__message">{r.message}</p><p className="small muted">{new Date(r.created_at).toLocaleString('en-US',{timeZone:'America/New_York'})} Eastern</p><form method="post" action="/api/customer-care/update"><input type="hidden" name="id" value={r.id}/><input type="hidden" name="status" value={r.status==='open'?'resolved':'open'}/><button className="btn btn--sm">{r.status==='open'?'Mark resolved':'Reopen request'}</button></form></article>):<p>No support requests yet.</p>}
 </div></section>;
}
