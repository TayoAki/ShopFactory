'use client';

import { useId, useState } from 'react';
import { track } from '@/lib/analytics';

/** Email + optional SMS signup (plan C-16). Posts to /api/waitlist. */
export function EmailCapture({
  source,
  cta = 'Sign up',
  productHandle,
  showPhone = false,
  successText = "You're on the list. Check your inbox.",
}: {
  source: string;
  cta?: string;
  productHandle?: string;
  showPhone?: boolean;
  successText?: string;
}) {
  const id = useId();
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [state, setState] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setState('error');
      return;
    }
    setState('sending');
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, phone: phone || undefined, source, productHandle }),
      });
      if (!res.ok) throw new Error('bad status');
      track('generate_lead', { source, product_handle: productHandle });
      setState('done');
    } catch {
      setState('error');
    }
  }

  if (state === 'done') return <p className="form-msg" role="status">{successText}</p>;

  return (
    <form onSubmit={onSubmit} noValidate>
      <div className="input-row">
        <label className="sr-only" htmlFor={`${id}-email`}>Email address</label>
        <input id={`${id}-email`} className="input" type="email" autoComplete="email" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <button className="btn btn--sm" type="submit" disabled={state === 'sending'}>
          {state === 'sending' ? 'Sending…' : cta}
        </button>
      </div>
      {showPhone && email.length > 3 && (
        <div style={{ marginTop: 10 }}>
          <label className="sr-only" htmlFor={`${id}-phone`}>Phone number (optional)</label>
          <input id={`${id}-phone`} className="input" type="tel" autoComplete="tel" placeholder="Text me instead (optional)" value={phone} onChange={(e) => setPhone(e.target.value)} />
          <p className="consent">
            By entering your number you agree to receive recurring marketing texts from Bogey Baby. Consent isn&apos;t a condition of purchase. Msg &amp; data rates may apply. Reply STOP to cancel.
          </p>
        </div>
      )}
      {state === 'error' && <p className="form-msg form-msg--error" role="alert">Please enter a valid email address.</p>}
    </form>
  );
}
