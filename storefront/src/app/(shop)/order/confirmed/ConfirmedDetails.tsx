'use client';

import { useEffect, useState } from 'react';
import { money } from '@/lib/money';

type Summary = { orderId: string; firstName: string; email: string; total: number; count: number; demo: boolean };

export function ConfirmedDetails() {
  const [s, setS] = useState<Summary | null>(null);
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem('bb_last_order');
      if (raw) setS(JSON.parse(raw));
    } catch {
      /* ignore */
    }
  }, []);
  return (
    <>
      <span className="eyebrow">Order confirmed</span>
      <h1>You&apos;re in good company{s?.firstName ? `, ${s.firstName}` : ''}.</h1>
      {s ? (
        <p className="lead" style={{ marginTop: 14 }}>
          Order {s.orderId} for {s.count} {s.count === 1 ? 'hat' : 'hats'} ({money(s.total)}) is confirmed. We&apos;ll email {s.email} with tracking when it ships, within 10 business days.
          {s.demo && <strong> This was a demo order: no payment was taken.</strong>}
        </p>
      ) : (
        <p className="lead" style={{ marginTop: 14 }}>Your order is confirmed. We&apos;ll email tracking when it ships.</p>
      )}
    </>
  );
}
