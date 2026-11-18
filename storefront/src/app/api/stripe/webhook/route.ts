import Stripe from 'stripe';
import { recordPaidSession, stripeClient } from '@/lib/payments';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  const signature = request.headers.get('stripe-signature');
  if (!secret || !signature) return new Response('Webhook unavailable', { status: 400 });
  let event: Stripe.Event;
  try {
    event = stripeClient().webhooks.constructEvent(await request.text(), signature, secret);
  } catch {
    return new Response('Invalid webhook signature', { status: 400 });
  }
  if (event.type === 'checkout.session.completed' || event.type === 'checkout.session.async_payment_succeeded') {
    try {
      await recordPaidSession(event.data.object.id);
    } catch {
      console.error('Paid checkout could not be recorded', event.id);
      return new Response('Please retry', { status: 500 });
    }
  }
  return new Response(null, { status: 204 });
}
