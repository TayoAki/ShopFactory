import { NextResponse } from 'next/server';
import { consumeLink } from '@/lib/customer-service';
import { body, requireOrigin, customerOrigin, cookieNames, cookieOptions } from '@/lib/customer-security';
export async function POST(request:Request) {
  try {requireOrigin(request);const data=await body(request);const result=await consumeLink(String(data.token||''),'account');const response=NextResponse.redirect(customerOrigin()+'/account',303);response.cookies.set(cookieNames.customer,result.sessionToken!,{...cookieOptions,maxAge:604800});return response;}catch{return NextResponse.redirect(customerOrigin()+'/account?link_error=1',303);}
}
