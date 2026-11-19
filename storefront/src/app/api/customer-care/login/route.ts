import { NextResponse } from 'next/server';
import { body, requireOrigin, customerOrigin, cookieNames, cookieOptions, clientKey, rateLimit, safeEqual, token, hash } from '@/lib/customer-security';
import { customerDatabase } from '@/lib/customer-db';
export async function POST(request:Request) {
 try{requireOrigin(request);await rateLimit('admin:'+clientKey(request),5,900);const data=await body(request);const key=process.env.CUSTOMER_CARE_ADMIN_KEY;if(!key||!safeEqual(String(data.key||''),key))throw new Error();const db=await customerDatabase();const raw=token();await db.query("INSERT INTO bogey_customer.sessions(token_hash,email,purpose,expires_at) VALUES($1,'admin','admin',now()+interval '8 hours')",[hash(raw)]);const response=NextResponse.redirect(customerOrigin()+(data.next==='/growth'?'/growth':'/customer-care'),303);response.cookies.set(cookieNames.admin,raw,{...cookieOptions,maxAge:28800});return response;}catch{return NextResponse.redirect(customerOrigin()+'/customer-care?error=1',303);}
}
