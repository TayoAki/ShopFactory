import { after } from 'next/server';
import { randomUUID } from 'node:crypto';
import { body, requireOrigin, emailAddress, CustomerError, customerFailure, limitForm } from '@/lib/customer-security';
import { saveSupport } from '@/lib/customer-service';
import { processCustomerMail } from '@/lib/customer-mail';
export const runtime='nodejs';
export async function POST(request:Request) {
  try {
    requireOrigin(request);const data=await body(request);
    if(data.website)throw new CustomerError('Please check your form.');
    const email=emailAddress(data.email);const name=String(data.name||'').trim();const message=String(data.message||'').trim();const order=String(data.order||'').trim();
    const kind=['order','return','fit','review','other'].includes(String(data.kind))?String(data.kind):'other';
    if(!name||name.length>100||!message||message.length>5000||order.length>255)throw new CustomerError('Please include your name and a message of up to 5,000 characters.');
    const requestKey=String(data.requestKey||randomUUID());if(!/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(requestKey))throw new CustomerError('Please refresh the form and try again.');
    await limitForm(request,'contact',email);const reference=await saveSupport({name,email,kind,order,message,requestKey});
    after(()=>processCustomerMail(2).then(()=>undefined));
    return Response.json({ok:true,reference,message:`Your message is saved. Your reference is ${reference}.`},{status:201,headers:{'Cache-Control':'no-store'}});
  }catch(error){return customerFailure(error);}
}
