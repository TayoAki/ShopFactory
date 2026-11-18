import Stripe from 'stripe';
import { Pool } from 'pg';
import { createHash } from 'node:crypto';
import { getProduct } from '@/lib/catalog';
import { bundleDiscount } from '@/lib/pricing';

export type CheckoutLine = { handle: string; color: string; qty: number };
export class CheckoutError extends Error {}
let pool: Pool | undefined;
let schema: Promise<unknown> | undefined;

export function stripeClient() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new CheckoutError('Checkout is being connected. Please try again later.');
  return new Stripe(key);
}

export function checkoutMode() {
  return process.env.NEXT_PUBLIC_CHECKOUT_MODE || 'demo';
}

export function validateBasket(input: unknown) {
  if (!Array.isArray(input) || !input.length || input.length > 20) throw new CheckoutError('Please check your bag and try again.');
  const merged = new Map<string, CheckoutLine>();
  for (const line of input) {
    if (!line || typeof line.handle !== 'string' || typeof line.color !== 'string' || !Number.isInteger(line.qty) || line.qty < 1 || line.qty > 20) {
      throw new CheckoutError('Please check the quantities in your bag.');
    }
    const product = getProduct(line.handle);
    if (!product?.colors.some(color => color.slug === line.color)) throw new CheckoutError('A hat or color in your bag is unavailable.');
    const key = line.handle + ':' + line.color;
    merged.set(key, { handle: line.handle, color: line.color, qty: line.qty + (merged.get(key)?.qty || 0) });
  }
  const lines = [...merged.values()].sort((a, b) => (a.handle + a.color).localeCompare(b.handle + b.color));
  const count = lines.reduce((total, line) => total + line.qty, 0);
  if (count > 20) throw new CheckoutError('Please contact us for orders of more than 20 hats.');
  const subtotal = lines.reduce((total, line) => total + getProduct(line.handle)!.price * line.qty, 0);
  const snapshot = lines.map(line => {
    const product = getProduct(line.handle)!;
    const color = product.colors.find(color => color.slug === line.color)!;
    return {
      ...line, title: product.title, colorName: color.name, unitAmount: product.price,
      printifyProductId: product.source.kind === 'printify' ? product.source.productId : undefined,
      printifyVariantId: color.printify?.variantId,
    };
  });
  return { lines: snapshot, count, subtotal, discount: bundleDiscount(subtotal, count) };
}

export function basketHash(basket: ReturnType<typeof validateBasket>) {
  return createHash('sha256').update(JSON.stringify(basket)).digest('hex');
}

export async function paymentDatabase() {
  if (!process.env.CHECKOUT_DATABASE_URL) throw new CheckoutError('Checkout is being connected. Please try again later.');
  pool ||= new Pool({ connectionString: process.env.CHECKOUT_DATABASE_URL, max: 4 });
  schema ||= pool.query(`
    CREATE SCHEMA IF NOT EXISTS bogey_checkout;
    CREATE TABLE IF NOT EXISTS bogey_checkout.attempts (
      id uuid PRIMARY KEY,
      basket_hash text NOT NULL,
      basket jsonb NOT NULL,
      session_id text UNIQUE,
      created_at timestamptz NOT NULL DEFAULT now()
    );
    CREATE TABLE IF NOT EXISTS bogey_checkout.orders (
      session_id text PRIMARY KEY,
      attempt_id uuid NOT NULL REFERENCES bogey_checkout.attempts(id),
      livemode boolean NOT NULL,
      amount_total integer NOT NULL,
      currency text NOT NULL,
      basket jsonb NOT NULL,
      stripe_session jsonb NOT NULL,
      fulfillment_status text NOT NULL DEFAULT 'awaiting_fulfillment',
      created_at timestamptz NOT NULL DEFAULT now()
    );
  `).catch(error => { schema = undefined; throw error; });
  await schema;
  return pool;
}

export async function recordPaidSession(sessionId: string) {
  const stripe = stripeClient();
  const session = await stripe.checkout.sessions.retrieve(sessionId);
  if (session.payment_status !== 'paid') return null;
  const db = await paymentDatabase();
  const attemptId = session.metadata?.bogey_attempt;
  if (!attemptId || !/^[0-9a-f-]{36}$/i.test(attemptId)) throw new Error('Payment has no valid checkout attempt.');
  const result = await db.query('SELECT basket_hash, basket FROM bogey_checkout.attempts WHERE id=$1 AND session_id=$2', [attemptId, session.id]);
  const attempt = result.rows[0];
  if (!attempt || attempt.basket_hash !== session.metadata?.basket_hash) throw new Error('Payment does not match a checkout attempt.');
  const basket = attempt.basket as ReturnType<typeof validateBasket>;
  if (session.currency !== 'usd' || session.amount_subtotal !== basket.subtotal ||
      session.total_details?.amount_discount !== basket.discount || session.amount_total === null ||
      session.amount_total < basket.subtotal - basket.discount || session.shipping_cost?.amount_total !== 0 ||
      session.automatic_tax?.status !== 'complete') throw new Error('Payment totals or tax are inconsistent.');
  await db.query(`
    INSERT INTO bogey_checkout.orders(session_id,attempt_id,livemode,amount_total,currency,basket,stripe_session)
    VALUES($1,$2,$3,$4,$5,$6,$7)
    ON CONFLICT(session_id) DO NOTHING
  `, [session.id, attemptId, session.livemode, session.amount_total, session.currency, JSON.stringify(basket), JSON.stringify(session)]);
  return { id: session.id, amount: session.amount_total, count: basket.count, livemode: session.livemode };
}
