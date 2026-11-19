import { timingSafeEqual } from 'node:crypto';
import { processCustomerMail } from '@/lib/customer-mail';
import { processFulfillmentQueue } from '@/lib/fulfillment';

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
    const [fulfillment,email]=await Promise.allSettled([processFulfillmentQueue(),processCustomerMail(10)]);
    if(fulfillment.status==='rejected')throw fulfillment.reason;
    return Response.json({...fulfillment.value,customerMail:email.status==='fulfilled'?email.value:{error:'Email processing unavailable'}});
  } catch {
    console.error('Printify queue processing failed');
    return new Response(null, { status: 503 });
  }
}
