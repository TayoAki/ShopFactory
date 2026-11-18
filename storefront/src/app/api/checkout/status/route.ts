import { after } from 'next/server';
import { fulfillPaidOrder } from '@/lib/fulfillment';
import { recordPaidSession, stripeClient } from '@/lib/payments';

export const runtime = 'nodejs';

export async function GET(request: Request) {
  const id = new URL(request.url).searchParams.get('session_id') || '';
  if (!/^cs_(test_|live_)?[a-zA-Z0-9]{20,200}$/.test(id)) return Response.json({ error: 'Invalid checkout' }, { status: 400 });
  try {
    const session = await stripeClient().checkout.sessions.retrieve(id);
    if (!session.metadata?.bogey_attempt) return new Response(null, { status: 404 });
    if (session.payment_status !== 'paid') return Response.json({ status: 'pending' }, { headers: { 'Cache-Control': 'no-store' } });
    const order = await recordPaidSession(id);
    if (order) after(async () => { await fulfillPaidOrder(order.id); });
    return Response.json({ status: 'paid', ...order }, { headers: { 'Cache-Control': 'no-store' } });
  } catch {
    return Response.json({ error: 'Unable to confirm payment yet.' }, { status: 503 });
  }
}
