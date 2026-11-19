import { NextResponse } from 'next/server';
import { body, requireOrigin, customerOrigin } from '@/lib/customer-security';
import { consumeLink } from '@/lib/customer-service';
export async function POST(request:Request) {
  try {requireOrigin(request);const data=await body(request);await consumeLink(String(data.token||''),'newsletter');return NextResponse.redirect(customerOrigin()+'/email-preferences?confirmed=1',303);}catch{return NextResponse.redirect(customerOrigin()+'/email-preferences?error=1',303);}
}
