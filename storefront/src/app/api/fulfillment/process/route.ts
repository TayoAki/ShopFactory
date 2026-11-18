import { timingSafeEqual } from 'node:crypto';
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
    return Response.json(await processFulfillmentQueue());
  } catch {
    console.error('Printify queue processing failed');
    return new Response(null, { status: 503 });
  }
}
