import { customerDatabase } from '@/lib/customer-db';
import { NextResponse } from 'next/server';
import { requireCustomerAdmin } from '@/lib/customer-admin';
import { requireOrigin, customerOrigin, customerFailure } from '@/lib/customer-security';
import { processCustomerMail } from '@/lib/customer-mail';
export async function POST(request:Request) {
 try{requireOrigin(request);await requireCustomerAdmin();await (await customerDatabase()).query("UPDATE bogey_customer.email_outbox SET next_attempt_at=now() WHERE status='pending'");await processCustomerMail(10);return NextResponse.redirect(customerOrigin()+'/customer-care',303);}catch(error){return customerFailure(error);}
}
