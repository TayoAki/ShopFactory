'use client';

import { useId, useState } from 'react';
import { track } from '@/lib/analytics';

/** Explicit email consent; confirmation is required before marketing export. */
export function EmailCapture({
  source,
  cta = 'Sign up',
  productHandle,
}: {
  source: string;
  cta?: string;
  productHandle?: string;
}) {
  const id = useId();
  const [email, setEmail] = useState('');
  const [consent,setConsent]=useState(false);
  const [feedback,setFeedback]=useState('');
  const [state, setState] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email) || !consent) {
      setFeedback('Enter a valid email and agree to receive Bogey Baby emails.');
      setState('error');
      return;
    }
    setState('sending');
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, consent, source, productHandle }),
      });
      const result=await res.json();
      if (!res.ok) throw new Error(result.error||'We could not save your signup. Please try again.');
      setFeedback(result.message);
      track('generate_lead', { source, product_handle: productHandle });
      setState('done');
    } catch(error) {
      setFeedback(error instanceof Error?error.message:'We could not save your signup. Please try again.');
      setState('error');
    }
  }

  if (state === 'done') return <p className="form-msg" role="status">{feedback}</p>;

  return (
    <form onSubmit={onSubmit} noValidate>
      <div className="input-row">
        <label className="sr-only" htmlFor={`${id}-email`}>Email address</label>
        <input id={`${id}-email`} className="input" type="email" autoComplete="email" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <button className="btn btn--sm" type="submit" disabled={state === 'sending'}>
          {state === 'sending' ? 'Sending…' : cta}
        </button>
      </div>
      <label className="newsletter-consent"><input type="checkbox" checked={consent} onChange={e=>setConsent(e.target.checked)} required/><span>Get occasional Bogey Baby emails about new colors and drops. Unsubscribe anytime.</span></label>
      {state === 'error' && <p className="form-msg form-msg--error" role="alert">{feedback}</p>}
    </form>
  );
}
