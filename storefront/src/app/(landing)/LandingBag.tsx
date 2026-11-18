'use client';

import { Icon } from '@/components/Icon';
import { useCart } from '@/lib/cart';

export function LandingBag() {
  const cart = useCart();
  return (
    <button className="icon-btn" onClick={cart.open} aria-label={`Shopping bag, ${cart.count} items`}>
      <Icon name="bag" />
      {cart.count > 0 && <span className="bag-count">{cart.count}</span>}
    </button>
  );
}
