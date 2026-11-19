import { NextResponse } from 'next/server';
import { body, requireOrigin, emailAddress, customerOrigin, CustomerError, customerFailure, limitForm } from '@/lib/customer-security';
import { requestEmailLink } from '@/lib/customer-service';
import { mailReady, processCustomerMail } from '@/lib/customer-mail';
export const runtime='nodejs';
export async function POST(request:Request) {
  try {
    requireOrigin(request);const data=await body(request);const email=emailAddress(data.email);await limitForm(request,'account',email);
    if(!mailReady())throw new CustomerError('Email sign-in is temporarily unavailable. Please try again later.',503);
    const id=await requestEmailLink(email,'account');const delivery=await processCustomerMail(1,id);
    if(!delivery.sent)throw new CustomerError('We could not send a sign-in email yet. Please try again in a few minutes.',503);
    return NextResponse.redirect(customerOrigin()+'/account?sent=1',303);
  }catch(error){if(request.headers.get('content-type')?.includes('application/json'))return customerFailure(error);return NextResponse.redirect(customerOrigin()+'/account?error=1',303);}
}
