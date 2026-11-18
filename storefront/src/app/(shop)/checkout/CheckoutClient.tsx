'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { CartLines, CartSummary } from '@/components/CartDrawer';
import { Icon } from '@/components/Icon';
import { TrustLine } from '@/components/TrustLine';
import { track } from '@/lib/analytics';
import { useCart } from '@/lib/cart';
import { money } from '@/lib/money';
import { site } from '@/lib/site';

/**
 * Checkout (plan P-08). In "demo" mode the full flow runs without taking payment.
 * Going live: mount Stripe's Payment Element and Express Checkout Element in the payment step and
 * create the order server-side (Medusa or Printify order API) before confirming. See README.
 */
export function CheckoutClient() {
  const cart = useCart();
  const router = useRouter();
  const [placing, setPlacing] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (cart.count > 0) track('begin_checkout', { value: cart.total / 100, items: cart.count });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (cart.count === 0)
    return (
      <section className="section">
        <div className="container center">
          <h1>Your bag is empty</h1>
          <Link href="/collections/all" className="btn" style={{ marginTop: 18 }}>Shop hats</Link>
        </div>
      </section>
    );

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    if (!form.get('email') || !form.get('address1') || !form.get('zip')) {
      setError('Please fill in your email and shipping address.');
      return;
    }
    setError('');
    setPlacing(true);
    track('add_shipping_info', { value: cart.total / 100 });
    track('add_payment_info', { value: cart.total / 100 });
    const orderId = 'BB-' + Math.random().toString(36).slice(2, 7).toUpperCase();
    const summary = { orderId, firstName: String(form.get('firstName') || ''), email: String(form.get('email')), total: cart.total, count: cart.count, demo: site.checkoutMode === 'demo' };
    try {
      sessionStorage.setItem('bb_last_order', JSON.stringify(summary));
    } catch {
      /* ignore */
    }
    track('purchase', { transaction_id: orderId, value: cart.total / 100, items: cart.count, demo: summary.demo });
    cart.clear();
    router.push(`/order/confirmed?order=${orderId}`);
  }

  return (
    <section className="section" style={{ paddingTop: 24 }}>
      <div className="container">
        {site.checkoutMode === 'demo' && <p className="notice" style={{ marginBottom: 20 }}>Demo checkout: no payment is taken and no order is made. Connect Stripe to go live.</p>}
        <div className="split" style={{ alignItems: 'start' }}>
          <form onSubmit={onSubmit} className="form-grid" noValidate>
            <h1 className="h2">Checkout</h1>
            <fieldset className="form-grid" style={{ border: 0, padding: 0, margin: 0 }}>
              <legend className="h3" style={{ marginBottom: 10 }}>Contact</legend>
              <label className="field"><span>Email</span><input className="input" name="email" type="email" autoComplete="email" required /></label>
              <label style={{ display: 'flex', gap: 10, alignItems: 'center', fontSize: '0.92rem' }}>
                <input type="checkbox" name="optin" style={{ width: 20, height: 20 }} /> Email me new colors and drops.
              </label>
            </fieldset>
            <fieldset className="form-grid" style={{ border: 0, padding: 0, margin: 0 }}>
              <legend className="h3" style={{ marginBottom: 10 }}>Delivery</legend>
              <div className="form-grid form-grid--2">
                <label className="field"><span>First name</span><input className="input" name="firstName" autoComplete="given-name" required /></label>
                <label className="field"><span>Last name</span><input className="input" name="lastName" autoComplete="family-name" required /></label>
              </div>
              <label className="field"><span>Address</span><input className="input" name="address1" autoComplete="address-line1" required /></label>
              <label className="field"><span>Apartment, suite (optional)</span><input className="input" name="address2" autoComplete="address-line2" /></label>
              <div className="form-grid form-grid--2">
                <label className="field"><span>City</span><input className="input" name="city" autoComplete="address-level2" required /></label>
                <label className="field"><span>ZIP code</span><input className="input" name="zip" autoComplete="postal-code" inputMode="numeric" required /></label>
              </div>
              <div className="panel" style={{ padding: 16 }}>
                <strong>Free US shipping</strong>
                <div className="small muted">Made to order, ships within 10 business days.</div>
              </div>
            </fieldset>
            <fieldset className="form-grid" style={{ border: 0, padding: 0, margin: 0 }}>
              <legend className="h3" style={{ marginBottom: 10 }}>Payment</legend>
              <div className="panel panel--line" style={{ padding: 18 }}>
                <p style={{ margin: 0, fontWeight: 700 }}><Icon name="lock" width={18} style={{ display: 'inline', verticalAlign: '-3px' }} /> Secure payment</p>
                <p className="small muted" style={{ margin: '6px 0 0' }}>
                  {site.checkoutMode === 'demo' ? 'Card, Apple Pay and Google Pay appear here once Stripe is connected.' : 'Card, Apple Pay and Google Pay.'}
                </p>
              </div>
            </fieldset>
            {error && <p className="form-msg form-msg--error" role="alert">{error}</p>}
            <button className="btn btn--block" type="submit" disabled={placing}>
              {placing ? 'Placing order…' : `${site.checkoutMode === 'demo' ? 'Place demo order' : 'Pay'} · ${money(cart.total)}`}
            </button>
            <TrustLine />
          </form>
          <aside className="panel" aria-label="Order summary">
            <h2 className="h3">Order summary</h2>
            <CartLines compact />
            <div style={{ marginTop: 14 }}><CartSummary /></div>
            <p className="small muted" style={{ marginTop: 12 }}>Secure checkout · Free fit exchanges within 30 days</p>
          </aside>
        </div>
      </div>
    </section>
  );
}
