import { getProduct } from '@/lib/catalog';
import { basketHash, CheckoutError, checkoutMode, paymentDatabase, stripeClient, validateBasket } from '@/lib/payments';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    const origin = new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://www.bogeybaby.com').origin;
    if (request.headers.get('origin') !== origin) return Response.json({ error: 'Please start checkout from the store.' }, { status: 403 });
    const mode = checkoutMode();
    if (!['live', 'test'].includes(mode) || !process.env.STRIPE_WEBHOOK_SECRET) throw new CheckoutError('Checkout is being connected. Please try again later.');
    const stripe = stripeClient();
    const liveKey = /^(sk|rk)_live_/.test(process.env.STRIPE_SECRET_KEY || '');
    if (liveKey !== (mode === 'live')) throw new Error('Stripe key and checkout mode differ.');
    const raw = await request.text();
    if (raw.length > 16384) throw new CheckoutError('Please check your bag and try again.');
    let input;
    try { input = JSON.parse(raw); } catch { throw new CheckoutError('Please refresh checkout and try again.'); }
    const basket = validateBasket(input.lines);
    const id = input.attemptId;
    if (typeof id !== 'string' || !/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id)) throw new CheckoutError('Please refresh checkout and try again.');
    const settings = await stripe.tax.settings.retrieve();
    if (settings.status !== 'active' || !(settings.defaults.tax_code || process.env.STRIPE_PRODUCT_TAX_CODE)) {
      throw new CheckoutError('Checkout is being connected. Please try again later.');
    }
    const db = await paymentDatabase();
    const hash = basketHash(basket);
    await db.query('INSERT INTO bogey_checkout.attempts(id,basket_hash,basket) VALUES($1,$2,$3) ON CONFLICT DO NOTHING', [id, hash, JSON.stringify(basket)]);
    const stored = (await db.query('SELECT basket_hash, session_id FROM bogey_checkout.attempts WHERE id=$1', [id])).rows[0];
    if (stored.basket_hash !== hash) throw new CheckoutError('Your bag has changed. Please refresh checkout.');
    if (stored.session_id) {
      const existing = await stripe.checkout.sessions.retrieve(stored.session_id);
      if (existing.status === 'open' && existing.url) return Response.json({ url: existing.url });
      throw new CheckoutError('This checkout has ended. Please refresh checkout to start again.');
    }
    const coupon = basket.discount ? await stripe.coupons.create({
      amount_off: basket.discount, currency: 'usd', duration: 'once', name: 'Golf buddy bundle',
    }, { idempotencyKey: id + '-discount' }) : null;
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      integration_identifier: 'bogey_baby_checkout_nxjfwqrz',
      line_items: basket.lines.map(line => {
        const product = getProduct(line.handle)!;
        const color = product.colors.find(color => color.slug === line.color)!;
        return {
          quantity: line.qty,
          price_data: {
            currency: 'usd', unit_amount: product.price, tax_behavior: 'exclusive',
            product_data: {
              name: product.title + ' / ' + color.name,
              tax_code: process.env.STRIPE_PRODUCT_TAX_CODE || settings.defaults.tax_code!,
              metadata: { handle: line.handle, color: line.color, printify_variant_id: String(color.printify?.variantId || '') },
            },
          },
        };
      }),
      discounts: coupon ? [{ coupon: coupon.id }] : undefined,
      automatic_tax: { enabled: true },
      shipping_address_collection: { allowed_countries: ['US'] },
      shipping_options: [{ shipping_rate_data: { display_name: 'Free US shipping', type: 'fixed_amount', fixed_amount: { amount: 0, currency: 'usd' }, tax_behavior: 'exclusive' } }],
      metadata: { bogey_attempt: id, basket_hash: hash },
      success_url: origin + '/order/confirmed?session_id={CHECKOUT_SESSION_ID}',
      cancel_url: origin + '/checkout',
    }, { idempotencyKey: id });
    await db.query('UPDATE bogey_checkout.attempts SET session_id=$2 WHERE id=$1', [id, session.id]);
    return Response.json({ url: session.url });
  } catch (error) {
    if (!(error instanceof CheckoutError)) console.error('Checkout failed', error instanceof Error ? error.name : 'Unknown error');
    return Response.json({ error: error instanceof CheckoutError ? error.message : 'Checkout is unavailable. Please try again shortly.' }, { status: error instanceof CheckoutError ? 400 : 503 });
  }
}
