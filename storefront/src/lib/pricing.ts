/**
 * Bundle pricing ("Bring your golf buddy"). Percent-based so it works across hats with different prices.
 * Printify embroidered caps cost about $21 each, plus US shipping of $4.59 for the first item and $2.09
 * for each extra item. Keep the deepest tier above landed cost; check margins before changing these.
 */
export const bundleTiers = [
  { minQty: 3, percentOff: 15, name: 'The Foursome Starter', badge: 'Best value' },
  { minQty: 2, percentOff: 10, name: 'The Golf Buddy Pair', badge: 'Most popular' },
] as const;

export type BundleTier = (typeof bundleTiers)[number];

export function tierFor(qty: number): BundleTier | null {
  return bundleTiers.find((t) => qty >= t.minQty) ?? null;
}

export function bundleDiscount(subtotalCents: number, qty: number): number {
  const t = tierFor(qty);
  return t ? Math.round((subtotalCents * t.percentOff) / 100) : 0;
}

export function tierPrice(unitCents: number, qty: number): { total: number; saved: number } {
  const subtotal = unitCents * qty;
  const saved = bundleDiscount(subtotal, qty);
  return { total: subtotal - saved, saved };
}
