import type { Metadata } from 'next';
import { CartPageClient } from './CartPageClient';

export const metadata: Metadata = { title: 'Your bag', robots: { index: false } };

export default function CartPage() {
  return (
    <section className="section">
      <div className="container" style={{ maxWidth: 900 }}>
        <h1>Your bag</h1>
        <CartPageClient />
      </div>
    </section>
  );
}
