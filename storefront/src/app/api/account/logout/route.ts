import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { customerDatabase } from '@/lib/customer-db';
import { requireOrigin, customerOrigin, cookieNames, cookieOptions, hash, customerFailure } from '@/lib/customer-security';
export async function POST(request:Request) {
  try {requireOrigin(request);const jar=await cookies();const db=await customerDatabase();const response=NextResponse.redirect(customerOrigin()+'/account',303);for(const name of Object.values(cookieNames)){const raw=jar.get(name)?.value;if(raw)await db.query('DELETE FROM bogey_customer.sessions WHERE token_hash=$1',[hash(raw)]);response.cookies.set(name,'',{...cookieOptions,maxAge:0});}return response;}catch(error){return customerFailure(error);}
}
