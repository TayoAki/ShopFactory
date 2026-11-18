'use client';

import Link from 'next/link';
import { CartLines, CartSummary } from '@/components/CartDrawer';
import { Icon } from '@/components/Icon';
import { TrustLine } from '@/components/TrustLine';
import { useCart } from '@/lib/cart';
import { money } from '@/lib/money';

export function CartPageClient() {
  const cart = useCart();
  if (cart.count === 0)
    return (
      <div className="empty-bag">
        <p className="lead">Your bag is empty.</p>
        <Link href="/collections/all" className="btn">Shop hats</Link>
      </div>
    );
  return (
    <div className="split" style={{ alignItems: 'start', marginTop: 20 }}>
      <CartLines />
      <div className="panel">
        <CartSummary />
        <Link href="/checkout" className="btn btn--block" style={{ marginTop: 16 }}>
          <Icon name="lock" width={18} /> Checkout · {money(cart.total)}
        </Link>
        <TrustLine />
      </div>
    </div>
  );
}
