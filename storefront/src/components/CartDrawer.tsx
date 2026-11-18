'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/lib/cart';
import { getProduct, bestSellers } from '@/lib/catalog';
import { money } from '@/lib/money';
import { bundleTiers, tierFor } from '@/lib/pricing';
import { Icon } from './Icon';
import { TrustLine } from './TrustLine';

export function CartLines({ compact = false }: { compact?: boolean }) {
  const cart = useCart();
  return (
    <div>
      {cart.lines.map((l) => {
        const p = getProduct(l.handle);
        const c = p?.colors.find((x) => x.slug === l.color) ?? p?.colors[0];
        if (!p || !c) return null;
        return (
          <div className="line" key={`${l.handle}-${l.color}`}>
            <div className="line__img">
              <Image src={c.image.src} alt={c.image.alt} width={c.image.width} height={c.image.height} sizes="84px" />
            </div>
            <div>
              <Link href={`/products/${p.handle}?color=${c.slug}`} className="line__title">{p.title}</Link>
              <div className="small muted">{c.name}</div>
              <div className="qty" role="group" aria-label={`Quantity for ${p.title}, ${c.name}`}>
                <button type="button" aria-label="Decrease quantity" onClick={() => cart.setQty(l.handle, l.color, l.qty - 1)}><Icon name="minus" width={16} /></button>
                <span aria-live="polite">{l.qty}</span>
                <button type="button" aria-label="Increase quantity" onClick={() => cart.setQty(l.handle, l.color, l.qty + 1)}><Icon name="plus" width={16} /></button>
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontWeight: 700 }}>{money(p.price * l.qty)}</div>
              {!compact && <button type="button" className="line__remove" onClick={() => cart.remove(l.handle, l.color)}>Remove</button>}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function CartSummary() {
  const cart = useCart();
  return (
    <div>
      <div className="summary-row"><span>Subtotal</span><span>{money(cart.subtotal)}</span></div>
      {cart.discount > 0 && (
        <div className="summary-row saving"><span>{cart.tierName} savings</span><span>−{money(cart.discount)}</span></div>
      )}
      <div className="summary-row"><span>Shipping (US)</span><span>Free</span></div>
      <div className="summary-row summary-row--total"><span>Total</span><span>{money(cart.total)}</span></div>
    </div>
  );
}

function BundleNudge() {
  const cart = useCart();
  const next = [...bundleTiers].reverse().find((t) => t.minQty > cart.count);
  if (!next || cart.count === 0) return null;
  const need = next.minQty - cart.count;
  const inBag = new Set(cart.lines.map((l) => l.handle));
  const suggestion = bestSellers().find((p) => !inBag.has(p.handle)) ?? bestSellers()[0];
  return (
    <div className="nudge">
      <strong>
        Add {need} more {need === 1 ? 'hat' : 'hats'} and save {next.percentOff}% on everything
      </strong>
      {next.minQty === 2 ? 'One for you, one for your golf buddy.' : 'Enough for the whole foursome.'}
      {suggestion && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 10 }}>
          <Image src={suggestion.colors[0].image.src} alt="" width={56} height={70} style={{ borderRadius: 8 }} />
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 700 }}>{suggestion.title}</div>
            <div>{money(suggestion.price)}</div>
          </div>
          <button type="button" className="btn btn--sm" onClick={() => cart.add([{ handle: suggestion.handle, color: suggestion.colors[0].slug }], { openDrawer: true, source: 'cart_nudge' })}>
            Add
          </button>
        </div>
      )}
    </div>
  );
}

export function CartDrawer() {
  const cart = useCart();
  const tier = tierFor(cart.count);
  return (
    <>
      <div className="overlay" data-open={cart.isOpen} onClick={cart.close} aria-hidden="true" />
      <aside className="drawer drawer--right" data-open={cart.isOpen} aria-label="Shopping bag" aria-hidden={!cart.isOpen} inert={!cart.isOpen} role="dialog">
        <div className="drawer__head">
          <h2>Your bag {cart.count > 0 && <span className="small muted">({cart.count})</span>}</h2>
          <button className="icon-btn" aria-label="Close bag" onClick={cart.close}>
            <Icon name="close" />
          </button>
        </div>
        <div className="drawer__body">
          {cart.count === 0 ? (
            <div className="empty-bag">
              <EmptyBagArt />
              <p className="h3" style={{ marginBottom: 6 }}>Your bag&apos;s empty.</p>
              <p className="muted">Let&apos;s fix that before your next tee time.</p>
              <Link href="/collections/all" className="btn" onClick={cart.close}>Shop hats</Link>
            </div>
          ) : (
            <>
              <p className="saving" style={{ margin: '0 0 6px' }}>
                <Icon name="check" width={18} style={{ display: 'inline', verticalAlign: '-4px' }} /> Free US shipping included
                {tier && <> · {tier.name}: {tier.percentOff}% off</>}
              </p>
              <CartLines />
              <BundleNudge />
            </>
          )}
        </div>
        {cart.count > 0 && (
          <div className="drawer__foot">
            <CartSummary />
            <Link href="/checkout" className="btn btn--block" style={{ marginTop: 14 }} onClick={cart.close}>
              <Icon name="lock" width={18} /> Checkout · {money(cart.total)}
            </Link>
            <TrustLine />
          </div>
        )}
      </aside>
    </>
  );
}

function EmptyBagArt() {
  return (
    <svg viewBox="0 0 160 120" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M58 108V58l8-14h28l8 14v50z" fill="#F1DFB5" />
      <path d="M66 44V30M94 44V30M58 58h44" />
      <path d="M52 30c4-14 18-20 28-20s24 6 28 20z" fill="#F4F0E1" />
      <path d="M46 30h68" />
      <path d="M78 16l2-6 2 6" />
      <circle cx="120" cy="104" r="6" fill="#FFFDF7" />
      <path d="M30 112h100" strokeDasharray="4 6" stroke="#A67843" />
    </svg>
  );
}
