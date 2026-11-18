'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { getProduct } from '@/lib/catalog';
import { bundleDiscount, tierFor, shippingFor } from '@/lib/pricing';
import { track } from '@/lib/analytics';

export interface CartLine {
  handle: string;
  color: string; // color slug
  qty: number;
}

interface CartState {
  lines: CartLine[];
  count: number;
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  tierName: string | null;
  isOpen: boolean;
  open: () => void;
  close: () => void;
  add: (items: { handle: string; color: string }[], opts?: { openDrawer?: boolean; source?: string }) => void;
  setQty: (handle: string, color: string, qty: number) => void;
  remove: (handle: string, color: string) => void;
  clear: () => void;
  toast: string | null;
}

const CartContext = createContext<CartState | null>(null);
const KEY = 'bb_cart_v1';

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [isOpen, setOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setLines((JSON.parse(raw) as CartLine[]).filter((l) => getProduct(l.handle)));
    } catch {
      /* storage can be unavailable (private mode) */
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(lines));
    } catch {
      /* ignore */
    }
  }, [lines, loaded]);

  const totals = useMemo(() => {
    let count = 0;
    let subtotal = 0;
    for (const l of lines) {
      const p = getProduct(l.handle);
      if (!p) continue;
      count += l.qty;
      subtotal += p.price * l.qty;
    }
    const discount = bundleDiscount(subtotal, count);
    const shipping = shippingFor(subtotal - discount);
    return { count, subtotal, discount, shipping, total: subtotal - discount + shipping, tierName: tierFor(count)?.name ?? null };
  }, [lines]);

  const add = useCallback<CartState['add']>((items, opts) => {
    setLines((prev) => {
      const next = [...prev];
      for (const it of items) {
        const i = next.findIndex((l) => l.handle === it.handle && l.color === it.color);
        if (i >= 0) next[i] = { ...next[i], qty: next[i].qty + 1 };
        else next.push({ handle: it.handle, color: it.color, qty: 1 });
      }
      return next;
    });
    const value = items.reduce((s, it) => s + (getProduct(it.handle)?.price ?? 0), 0);
    track('add_to_cart', { items: items.map((i) => `${i.handle}:${i.color}`), bundle_size: items.length, value: value / 100, source: opts?.source });
    setToast(items.length > 1 ? `${items.length} hats added to your bag` : 'Added to your bag');
    window.setTimeout(() => setToast(null), 3500);
    if (opts?.openDrawer !== false) setOpen(true);
  }, []);

  const setQty = useCallback((handle: string, color: string, qty: number) => {
    setLines((prev) =>
      qty <= 0
        ? prev.filter((l) => !(l.handle === handle && l.color === color))
        : prev.map((l) => (l.handle === handle && l.color === color ? { ...l, qty: Math.min(qty, 10) } : l)),
    );
  }, []);

  const remove = useCallback((handle: string, color: string) => {
    setLines((prev) => prev.filter((l) => !(l.handle === handle && l.color === color)));
    track('remove_from_cart', { item: `${handle}:${color}` });
  }, []);

  const clear = useCallback(() => setLines([]), []);

  const value: CartState = {
    lines,
    ...totals,
    isOpen,
    open: () => {
      setOpen(true);
      track('view_cart', { value: totals.total / 100 });
    },
    close: () => setOpen(false),
    add,
    setQty,
    remove,
    clear,
    toast,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartState {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside CartProvider');
  return ctx;
}
