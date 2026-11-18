'use client';

import { useCart } from '@/lib/cart';

/** Confirmation toast. Hidden while the cart drawer is open, since the drawer already confirms the add. */
export function Toast() {
  const { toast, isOpen } = useCart();
  const show = Boolean(toast) && !isOpen;
  return (
    <div className="toast" data-show={show} role="status" aria-live="polite">
      {show ? toast : ''}
    </div>
  );
}
