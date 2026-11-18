import type { Metadata } from 'next';
import Link from 'next/link';
import { site } from '@/lib/site';

export const metadata: Metadata = { title: 'Account', robots: { index: false } };

export default function AccountPage() {
  return (
    <section className="section">
      <div className="container split" style={{ alignItems: 'start' }}>
        <div>
          <span className="eyebrow">Account</span>
          <h1>Your orders and exchanges</h1>
          <p className="lead" style={{ marginTop: 14 }}>Sign in to track an order or start a free fit exchange.</p>
          <p className="muted">No account? You don&apos;t need one: reply to your order email, or write to <a className="link" href={`mailto:${site.supportEmail}`}>{site.supportEmail}</a> with your order number.</p>
          <Link href="/pages/shipping-returns" className="link link--cta">How exchanges work →</Link>
        </div>
        <form className="panel form-grid" action="/api/account/magic-link" method="post">
          <h2 className="h3">Sign in with a link</h2>
          <label className="field"><span>Email</span><input className="input" type="email" name="email" autoComplete="email" required /></label>
          <button className="btn" type="submit">Email me a sign-in link</button>
          <p className="small muted" style={{ margin: 0 }}>Accounts connect to the order system at launch.</p>
        </form>
      </div>
    </section>
  );
}
