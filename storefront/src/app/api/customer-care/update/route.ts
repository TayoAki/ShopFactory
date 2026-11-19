import { NextResponse } from 'next/server';
import { requireCustomerAdmin } from '@/lib/customer-admin';
import { customerDatabase } from '@/lib/customer-db';
import { body, requireOrigin, customerOrigin, CustomerError, customerFailure } from '@/lib/customer-security';
export async function POST(request:Request) {
 try{requireOrigin(request);await requireCustomerAdmin();const data=await body(request);if(!/^[0-9a-f-]{36}$/i.test(String(data.id))||!['open','resolved'].includes(String(data.status)))throw new CustomerError('Invalid request.');const db=await customerDatabase();await db.query("UPDATE bogey_customer.support_requests SET status=$2,resolved_at=CASE WHEN $2='resolved' THEN now() ELSE NULL END WHERE id=$1",[data.id,data.status]);return NextResponse.redirect(customerOrigin()+'/customer-care',303);}catch(error){return customerFailure(error);}
}
