import { NextResponse } from 'next/server';
import { body, requireOrigin, customerOrigin, preferenceEmail, customerFailure } from '@/lib/customer-security';
import { unsubscribe } from '@/lib/customer-service';
export async function POST(request:Request) {
  try {requireOrigin(request);const data=await body(request);await unsubscribe(preferenceEmail(String(data.token||'')));return NextResponse.redirect(customerOrigin()+'/email-preferences?unsubscribed=1',303);}catch(error){return customerFailure(error);}
}
