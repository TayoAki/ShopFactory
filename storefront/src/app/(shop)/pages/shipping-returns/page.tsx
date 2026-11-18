import type { Metadata } from 'next';
import Link from 'next/link';
import { FeatureRow } from '@/components/FeatureRow';

export const metadata: Metadata = { title: 'Shipping & Returns', description: 'Free US shipping on every Bogey Baby hat, free fit exchanges within 30 days and 30-day returns.' };

export default function ShippingReturnsPage() {
  return (
    <section className="section">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Shipping &amp; Returns</span>
          <h1>Free shipping. Free fit exchanges. 30-day returns.</h1>
        </div>
        <FeatureRow
          cols={3}
          items={[
            { icon: 'truck', title: 'Shipping', text: 'Every hat is made to order and ships within 10 business days. US shipping is free on every order. We ship to US addresses at launch.' },
            { icon: 'exchange', title: 'Exchanges', text: 'Wrong fit or style? Exchanges are free within 30 days of delivery. Start one from your account or reply to your order email.' },
            { icon: 'calendar', title: 'Returns', text: 'Return unworn hats within 30 days of delivery, with no restocking fee. Refunds go back to your original payment method.' },
          ]}
        />
        <div className="prose" style={{ marginTop: 40 }}>
          <h2>How an exchange works</h2>
          <ol>
            <li>Start the exchange from your account, or reply to your order email with the hat and fit you want.</li>
            <li>We email you a return label.</li>
            <li>Your new hat is made and shipped as soon as the return is on its way.</li>
          </ol>
          <h2>Damaged or wrong item?</h2>
          <p>Email us a photo within 30 days of delivery and we&apos;ll replace it at no cost.</p>
          <Link href="/account" className="btn" style={{ marginTop: 10 }}>Start an exchange</Link>
        </div>
      </div>
    </section>
  );
}
