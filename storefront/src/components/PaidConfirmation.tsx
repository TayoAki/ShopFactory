'use client';

import { useEffect, useState } from 'react';
import { useCart } from '@/lib/cart';
import { track } from '@/lib/analytics';
import { money } from '@/lib/money';

type PaidOrder = { id: string; amount: number; count: number; livemode: boolean };
export function PaidConfirmation() {
  const { clear } = useCart();
  const [order, setOrder] = useState<PaidOrder | null>(null);
  const [message, setMessage] = useState('Confirming your payment…');
  useEffect(() => {
    let canceled = false;
    let timer: ReturnType<typeof setTimeout>;
    let attempts = 0;
    async function check() {
      try {
        const id = new URLSearchParams(window.location.search).get('session_id');
        const response = await fetch('/api/checkout/status?session_id=' + encodeURIComponent(id || ''), { cache: 'no-store' });
        if (!response.ok) throw new Error('Confirmation unavailable');
        const result = await response.json();
        if (canceled) return;
        if (result.status === 'paid') {
          setOrder(result);
          clear();
          const key = 'bb_paid_analytics_' + result.id;
          try {
            if (!localStorage.getItem(key)) {
              track(result.livemode ? 'purchase' : 'test_purchase', {
                transaction_id: result.id, value: result.amount / 100, items: result.count,
                ...(result.livemode ? { revenue: result.amount / 100, currency: 'USD' } : {}),
              });
              localStorage.setItem(key, '1');
            }
          } catch { /* unavailable browser storage does not affect the order */ }
          return;
        }
        setMessage('Your payment is still processing. Your bag is saved while we wait for confirmation.');
      } catch {
        if (!canceled) setMessage('We are checking your payment. Please keep your checkout reference and contact hello@bogeybaby.com if confirmation does not appear.');
      }
      attempts += 1;
      if (!canceled && attempts < 10) timer = setTimeout(check, 3000);
    }
    void check();
    return () => { canceled = true; clearTimeout(timer); };
  }, [clear]);
  return (
    <>
      <span className="eyebrow">{order?.livemode ? 'Payment confirmed' : order ? 'Test payment confirmed' : 'Payment status'}</span>
      <h1>{order ? "You're in good company." : 'Checking your checkout'}</h1>
      <p className="lead" style={{ marginTop: 14 }}>
        {order ? `Payment of ${money(order.amount)} for ${order.count} ${order.count === 1 ? 'hat' : 'hats'} is confirmed.` : message}
      </p>
      {order && <p className="small muted" style={{ marginTop: 16 }}>Checkout reference: {order.id}</p>}
    </>
  );
}
