'use client';

import { useRef, useState } from 'react';
import { CartLines, CartSummary } from '@/components/CartDrawer';
import { useCart } from '@/lib/cart';

export function LiveCheckout() {
  const cart = useCart();
  const attempt = useRef<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  async function startCheckout() {
    setBusy(true);
    setError('');
    attempt.current ||= crypto.randomUUID();
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lines: cart.lines, attemptId: attempt.current }),
      });
      const result = await response.json();
      if (!response.ok || !result.url) throw new Error(result.error || 'Please try checkout again.');
      window.location.assign(result.url);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Please try again.');
      setBusy(false);
    }
  }
  return (
    <section className="section">
      <div className="container split">
        <div>
          <h1>Checkout</h1>
          <p className="lead" style={{ marginTop: 16 }}>Enter your delivery and payment details in secure checkout. Standard US shipping is $7, or free on orders $120+ after discounts. Any applicable tax is calculated using your delivery address.</p>
          <button className="btn" disabled={busy} onClick={startCheckout} style={{ marginTop: 24 }}>
            {busy ? 'Opening secure checkout…' : 'Continue to secure checkout'}
          </button>
          {error && <p role="alert" className="form-msg form-msg--error">{error}</p>}
        </div>
        <aside className="panel" aria-label="Order summary">
          <h2 className="h3">Your bag</h2>
          <CartLines compact />
          <CartSummary />
        </aside>
      </div>
    </section>
  );
}
