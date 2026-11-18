'use client';

import { useState } from 'react';

export function ContactForm() {
  const [state, setState] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    setState('sending');
    const res = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) }).catch(() => null);
    setState(res && res.ok ? 'done' : 'error');
  }
  if (state === 'done') return <p className="panel form-msg" role="status">Thanks, we&apos;ve got it. Expect a reply within one business day.</p>;
  return (
    <form className="panel form-grid" onSubmit={onSubmit}>
      <div className="form-grid form-grid--2">
        <label className="field"><span>Name</span><input className="input" name="name" autoComplete="name" required /></label>
        <label className="field"><span>Email</span><input className="input" name="email" type="email" autoComplete="email" required /></label>
      </div>
      <label className="field"><span>Order number (optional)</span><input className="input" name="order" /></label>
      <label className="field"><span>Message</span><textarea className="input" name="message" rows={5} required /></label>
      <button className="btn" type="submit" disabled={state === 'sending'}>{state === 'sending' ? 'Sending…' : 'Send message'}</button>
      {state === 'error' && <p className="form-msg form-msg--error" role="alert">Something went wrong. Please email us instead.</p>}
    </form>
  );
}
