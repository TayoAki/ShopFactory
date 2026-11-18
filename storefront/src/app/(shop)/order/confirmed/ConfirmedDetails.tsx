'use client';

import { useEffect, useState } from 'react';
import { PaidConfirmation } from '@/components/PaidConfirmation';
import { money } from '@/lib/money';

type Summary = { orderId: string; firstName: string; total: number; count: number; demo: boolean };

export function ConfirmedDetails() {
  const [summary, setSummary] = useState<Summary | null>(null);
  const [paymentReturn, setPaymentReturn] = useState<boolean | null>(null);
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setPaymentReturn(params.has('session_id'));
    try {
      const value = JSON.parse(sessionStorage.getItem('bb_last_order') || 'null');
      if (value?.demo === true && value.orderId === params.get('order')) setSummary(value);
    } catch { /* invalid stored summaries are ignored */ }
  }, []);
  if (paymentReturn === null) return <h1>Checking your checkout…</h1>;
  if (paymentReturn) return <PaidConfirmation />;
  if (!summary) return <h1>No checkout confirmation was found.</h1>;
  return (
    <>
      <span className="eyebrow">Demo checkout completed</span>
      <h1>You&apos;re in good company{summary.firstName ? `, ${summary.firstName}` : ''}.</h1>
      <p className="lead" style={{ marginTop: 14 }}>
        Your demo bag contained {summary.count} {summary.count === 1 ? 'hat' : 'hats'} ({money(summary.total)}).
        No payment was taken and no order will be shipped.
      </p>
    </>
  );
}
