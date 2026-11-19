import { body, requireOrigin, emailAddress, CustomerError, customerFailure, limitForm } from '@/lib/customer-security';
import { requestEmailLink } from '@/lib/customer-service';
import { mailReady, processCustomerMail } from '@/lib/customer-mail';
import { after } from 'next/server';
export const runtime='nodejs';
export async function POST(request:Request) {
  try {
    requireOrigin(request);const data=await body(request);const email=emailAddress(data.email);
    const source=String(data.source||'site').slice(0,100);const productHandle=String(data.productHandle||'').slice(0,100);
    if(data.consent!==true)throw new CustomerError('Please agree to receive Bogey Baby emails.');
    await limitForm(request,'newsletter',email);await requestEmailLink(email,'newsletter',source,productHandle);
    after(()=>processCustomerMail(2).then(()=>undefined));
    return Response.json({ok:true,message:mailReady()?'Your signup request is saved. Check your email to confirm before we send you updates.':'Your signup request is saved. You will join the email list after confirming your email address.'},{status:202,headers:{'Cache-Control':'no-store'}});
  }catch(error){return customerFailure(error);}
}
