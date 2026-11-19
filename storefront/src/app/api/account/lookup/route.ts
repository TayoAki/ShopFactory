import { NextResponse } from 'next/server';
import { body, requireOrigin, emailAddress, customerOrigin, cookieNames, cookieOptions, limitForm } from '@/lib/customer-security';
import { lookupOrder } from '@/lib/customer-service';
export async function POST(request:Request) {
 try{requireOrigin(request);const data=await body(request);const email=emailAddress(data.email);await limitForm(request,'lookup',email);const raw=await lookupOrder(email,String(data.reference||'').trim());const response=NextResponse.redirect(customerOrigin()+'/account',303);response.cookies.set(cookieNames.customer,raw,{...cookieOptions,maxAge:604800});return response;}catch{return NextResponse.redirect(customerOrigin()+'/account?lookup_error=1',303);}
}
