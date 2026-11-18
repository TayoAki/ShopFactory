'use client';

import Image from 'next/image';
import { useState } from 'react';
import type { Product } from '@/data/products';
import { useCart } from '@/lib/cart';
import { money } from '@/lib/money';
import { bundleDiscount, bundleTiers, tierFor } from '@/lib/pricing';
import { site } from '@/lib/site';
import { track } from '@/lib/analytics';
import { EmailCapture } from './EmailCapture';
import { TrustLine } from './TrustLine';

type Pick = { handle: string; color: string };

/** Build a Golf Buddy Pair (2) or Foursome Starter (3+) from any hats and colors (plan C-13, P-04). */
export function BundleBuilder({ products, defaults }: { products: Product[]; defaults: Pick[] }) {
  const cart = useCart();
  const [size, setSize] = useState(2);
  const [picks, setPicks] = useState<Pick[]>(defaults);
  const active = picks.slice(0, size);
  const find = (h: string) => products.find((p) => p.handle === h)!;
  const subtotal = active.reduce((s, pk) => s + find(pk.handle).price, 0);
  const discount = bundleDiscount(subtotal, size);
  const tier = tierFor(size);

  function update(i: number, next: Partial<Pick>) {
    setPicks((prev) =>
      prev.map((pk, j) => {
        if (j !== i) return pk;
        const handle = next.handle ?? pk.handle;
        const p = find(handle);
        const color = next.color ?? (next.handle ? p.colors[0].slug : pk.color);
        return { handle, color };
      }),
    );
  }

  return (
    <div className="panel" style={{ background: 'var(--white)' }}>
      <div className="tiles" role="radiogroup" aria-label="How many hats" style={{ gridTemplateColumns: '1fr 1fr' }}>
        {[...bundleTiers].reverse().map((t) => (
          <button key={t.minQty} type="button" role="radio" aria-checked={size === t.minQty} className="tile" style={{ gridTemplateColumns: 'auto 1fr' }} onClick={() => setSize(t.minQty)}>
            <span className="badge">{t.badge}</span>
            <span className="tile__radio" aria-hidden="true" />
            <span>
              <span className="tile__name">{t.minQty} hats</span>
              <span className="tile__sub">Save {t.percentOff}%</span>
            </span>
          </button>
        ))}
      </div>

      <div style={{ display: 'grid', gap: 16, marginTop: 20 }}>
        {active.map((pk, i) => {
          const p = find(pk.handle);
          const c = p.colors.find((x) => x.slug === pk.color) ?? p.colors[0];
          return (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '84px 1fr', gap: 14, alignItems: 'center', paddingBottom: 16, borderBottom: '1px dashed var(--line)' }}>
              <Image src={c.image.src} alt={c.image.alt} width={c.image.width} height={c.image.height} sizes="84px" style={{ borderRadius: 10 }} />
              <div style={{ display: 'grid', gap: 8 }}>
                <label className="field">
                  <span>Hat {i + 1}</span>
                  <select className="input" value={pk.handle} onChange={(e) => update(i, { handle: e.target.value })}>
                    {products.map((x) => (
                      <option key={x.handle} value={x.handle}>
                        {x.title} · {money(x.price)}
                      </option>
                    ))}
                  </select>
                </label>
                {p.colors.length > 1 && (
                  <div className="swatches" role="radiogroup" aria-label={`Hat ${i + 1} color`}>
                    {p.colors.map((x) => (
                      <button key={x.slug} type="button" role="radio" aria-checked={pk.color === x.slug} aria-label={x.name} title={x.name} className="swatch" style={{ background: x.swatch }} onClick={() => update(i, { color: x.slug })} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ marginTop: 16 }}>
        <div className="summary-row"><span>{size} hats</span><span>{money(subtotal)}</span></div>
        {tier && <div className="summary-row saving"><span>{tier.name} savings ({tier.percentOff}%)</span><span>−{money(discount)}</span></div>}
        <div className="summary-row"><span>Shipping (US)</span><span>Free</span></div>
        <div className="summary-row summary-row--total"><span>Total</span><span>{money(subtotal - discount)}</span></div>
      </div>

      {site.dropMode ? (
        <div style={{ marginTop: 16 }}>
          <EmailCapture source="golf-buddy" cta="Notify me" />
        </div>
      ) : (
        <button
          type="button"
          className="btn btn--block"
          style={{ marginTop: 16 }}
          onClick={() => {
            track('select_promotion', { promotion_id: tier?.name, bundle_size: size });
            cart.add(active, { source: 'golf-buddy' });
          }}
        >
          Claim the {tier?.name} · {money(subtotal - discount)}
        </button>
      )}
      <TrustLine />
    </div>
  );
}
