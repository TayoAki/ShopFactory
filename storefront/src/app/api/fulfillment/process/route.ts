import { timingSafeEqual } from 'node:crypto';
import { processCustomerMail } from '@/lib/customer-mail';
import { processFulfillmentQueue } from '@/lib/fulfillment';
import {syncGrowthSources} from '@/lib/growth-providers';

export const runtime = 'nodejs';
export const maxDuration = 240;

export async function POST(request: Request) {
  const secret = process.env.FULFILLMENT_CRON_SECRET;
  const supplied = request.headers.get('authorization') || '';
  const expected = 'Bearer ' + secret;
  if (!secret || Buffer.byteLength(supplied) !== Buffer.byteLength(expected) || !timingSafeEqual(Buffer.from(supplied), Buffer.from(expected))) {
    return new Response(null, { status: 401 });
  }
  try {
    const [fulfillment,email,financials]=await Promise.allSettled([processFulfillmentQueue(),processCustomerMail(10),syncGrowthSources()]);
    if(fulfillment.status==='rejected')throw fulfillment.reason;
    return Response.json({...fulfillment.value,growthSync:financials.status==='fulfilled'?financials.value:{error:'Reconciliation unavailable'},customerMail:email.status==='fulfilled'?email.value:{error:'Email processing unavailable'}});
  } catch {
    console.error('Printify queue processing failed');
    return new Response(null, { status: 503 });
  }
}
