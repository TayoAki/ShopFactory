import { createHash, createHmac, randomBytes, timingSafeEqual, createCipheriv, createDecipheriv } from 'node:crypto';
import { customerDatabase } from './customer-db';
export class CustomerError extends Error { constructor(message: string, public status = 400) { super(message); } }
export function customerOrigin() { return new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://www.bogeybaby.com').origin; }
export function secret() {
  const value = process.env.CUSTOMER_AUTH_SECRET;
  if (!value || value.length < 40) throw new Error('Customer security is not configured');
  return createHash('sha256').update(value).digest();
}
export function hash(value: string) { return createHash('sha256').update(value).digest('hex'); }
export function token() { return randomBytes(32).toString('base64url'); }
export function safeEqual(a: string, b: string) { return timingSafeEqual(createHash('sha256').update(a).digest(), createHash('sha256').update(b).digest()); }
export function encrypt(value: unknown) {
  const iv = randomBytes(12); const cipher = createCipheriv('aes-256-gcm', secret(), iv);
  const data = Buffer.concat([cipher.update(JSON.stringify(value), 'utf8'), cipher.final()]);
  return Buffer.concat([iv, cipher.getAuthTag(), data]).toString('base64url');
}
export function decrypt<T>(value: string): T {
  const data = Buffer.from(value, 'base64url');
  const cipher = createDecipheriv('aes-256-gcm', secret(), data.subarray(0, 12)); cipher.setAuthTag(data.subarray(12, 28));
  return JSON.parse(Buffer.concat([cipher.update(data.subarray(28)), cipher.final()]).toString('utf8'));
}
export function emailAddress(value: unknown) {
  const email = String(value || '').trim().toLowerCase();
  if (email.length > 254 || (email.split('@')[0]?.length ?? 0) > 64 || !/^[a-z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-z0-9](?:[a-z0-9-]*[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)+$/i.test(email)) throw new CustomerError('Please enter a valid email address.');
  return email;
}
export function requireOrigin(request: Request) { if (request.headers.get('origin') !== customerOrigin()) throw new CustomerError('Please submit this form from Bogey Baby.', 403); }
export async function body(request: Request): Promise<Record<string, unknown>> {
  const reader = request.body?.getReader(); let raw = ''; let bytes = 0; const decoder = new TextDecoder();
  if (!reader) throw new CustomerError('Please complete the form.');
  while (true) { const { done, value } = await reader.read(); if (done) break; bytes += value.byteLength; if (bytes > 16384) { await reader.cancel(); throw new CustomerError('Please shorten your message.', 413); } raw += decoder.decode(value, { stream: true }); }
  raw += decoder.decode();
  try { const parsed=request.headers.get('content-type')?.includes('application/json') ? JSON.parse(raw) : Object.fromEntries(new URLSearchParams(raw)); if(!parsed||typeof parsed!=='object'||Array.isArray(parsed))throw new Error();return parsed; } catch { throw new CustomerError('Please check your form and try again.'); }
}
export function clientKey(request: Request) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  return createHmac('sha256', secret()).update(ip).digest('hex');
}
export async function rateLimit(key: string, limit: number, seconds = 3600) {
  const db = await customerDatabase();
  const result = await db.query(`INSERT INTO bogey_customer.rate_limits(key,count,expires_at) VALUES($1,1,now()+$3*interval '1 second')
    ON CONFLICT(key) DO UPDATE SET count=CASE WHEN bogey_customer.rate_limits.expires_at<now() THEN 1 ELSE bogey_customer.rate_limits.count+1 END,
    expires_at=CASE WHEN bogey_customer.rate_limits.expires_at<now() THEN now()+$3*interval '1 second' ELSE bogey_customer.rate_limits.expires_at END
    WHERE bogey_customer.rate_limits.expires_at<now() OR bogey_customer.rate_limits.count<$2 RETURNING key`, [key, limit, seconds]);
  if (!result.rowCount) throw new CustomerError('Please wait before trying again.', 429);
}
export async function limitForm(request: Request, kind: string, email: string) {
  await rateLimit(kind+':ip:'+clientKey(request), 20);
  await rateLimit(kind+':email:'+hash(email), 5);
}
export const cookieNames = { customer: '__Host-bb_customer', admin: '__Host-bb_care' } as const;
export const cookieOptions = { httpOnly: true, secure: true, sameSite: 'lax' as const, path: '/' };
export async function session(raw: string | undefined, purpose: 'customer' | 'admin') {
  if (!raw) return null;
  const db = await customerDatabase();
  return (await db.query('SELECT email FROM bogey_customer.sessions WHERE token_hash=$1 AND purpose=$2 AND expires_at>now()', [hash(raw), purpose])).rows[0]?.email as string | undefined || null;
}
export function preferenceToken(email: string) {
  const payload = Buffer.from(email).toString('base64url');
  return payload+'.'+createHmac('sha256',secret()).update('unsubscribe:'+payload).digest('base64url');
}
export function preferenceEmail(value: string) {
  if (value.length > 500) throw new CustomerError('This link is not valid.');
  const [payload, signature] = value.split('.');
  const expected = createHmac('sha256',secret()).update('unsubscribe:'+payload).digest('base64url');
  if (!payload || !signature || !safeEqual(signature,expected)) throw new CustomerError('This link is not valid.');
  return emailAddress(Buffer.from(payload,'base64url').toString('utf8'));
}
export function customerFailure(error: unknown) {
  if (!(error instanceof CustomerError)) console.error('Customer request failed', error instanceof Error ? error.name : 'Unknown');
  return Response.json({ok:false,error:error instanceof CustomerError ? error.message : 'We could not save this request. Please try again.'},{status:error instanceof CustomerError ? error.status : 503,headers:{'Cache-Control':'no-store'}});
}

export async function customerSession(raw: string | undefined) {
  if(!raw)return null;const db=await customerDatabase();
  return (await db.query("SELECT email,order_scope FROM bogey_customer.sessions WHERE token_hash=$1 AND purpose='customer' AND expires_at>now()",[hash(raw)])).rows[0] as {email:string;order_scope:string|null}|undefined||null;
}
