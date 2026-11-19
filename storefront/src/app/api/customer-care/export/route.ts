import { requireCustomerAdmin } from '@/lib/customer-admin';
import { customerDatabase } from '@/lib/customer-db';
import { csvCell } from '@/lib/customer-service';
import { customerFailure } from '@/lib/customer-security';
export async function GET() {
 try{await requireCustomerAdmin();const db=await customerDatabase();const rows=(await db.query("SELECT email,source,confirmed_at,consent_text FROM bogey_customer.subscribers WHERE status='subscribed' ORDER BY confirmed_at DESC LIMIT 10000")).rows;const csv=['email,source,confirmed_at,consent_text',...rows.map(r=>[r.email,r.source,r.confirmed_at?.toISOString(),r.consent_text].map(csvCell).join(','))].join('\r\n');return new Response(csv,{headers:{'Content-Type':'text/csv; charset=utf-8','Content-Disposition':'attachment; filename="bogey-baby-confirmed-subscribers.csv"','Cache-Control':'no-store'}});}catch(error){return customerFailure(error);}
}
