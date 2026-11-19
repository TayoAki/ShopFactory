'use client';

import Image from 'next/image';
import { useEffect, useMemo, useRef, useState } from 'react';
import type { Product, ProductImage } from '@/data/products';
import { useCart } from '@/lib/cart';
import { money } from '@/lib/money';
import { bundleTiers, tierPrice, shippingFor } from '@/lib/pricing';
import { site } from '@/lib/site';
import { track } from '@/lib/analytics';
import { EmailCapture } from './EmailCapture';
import { Icon } from './Icon';
import { fitEvidence } from '@/data/fit-evidence';
import Link from 'next/link';

type Bullet = { icon: string; title: string; text: string };

const qtyOptions = [1, ...[...bundleTiers].reverse().map((t) => t.minQty)] as number[];

export function ProductView({ product, bullets }: { product: Product; bullets: Bullet[] }) {
  const cart = useCart();
  const startColor = product.colors[0].slug;
  const [qty, setQty] = useState<number>(1);
  const [colors, setColors] = useState<string[]>([startColor, startColor, startColor]);
  const [active, setActive] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const [showSticky, setShowSticky] = useState(false);

  const images: ProductImage[] = useMemo(() => {
    const colorImgs = product.colors.map((c) => c.image);
    return [...colorImgs, ...product.gallery];
  }, [product]);

  const selected = product.colors.find((c) => c.slug === colors[0]) ?? product.colors[0];
  const { total, saved } = tierPrice(product.price, qty);
  const shipping = shippingFor(total);
  const fit = fitEvidence[product.handle];

  useEffect(() => {
    track('view_item', { item_id: product.handle, price: product.price / 100 });
    // Deep links from ads and emails: ?color=sage&bundle=2 (read after hydration so the page stays static).
    const sp = new URLSearchParams(window.location.search);
    const c = sp.get('color');
    const b = Number(sp.get('bundle'));
    if (c && product.colors.some((x) => x.slug === c)) {
      setColors([c, c, c]);
      const idx = product.colors.findIndex((x) => x.slug === c);
      window.requestAnimationFrame(() => trackRef.current?.scrollTo({ left: (trackRef.current?.clientWidth ?? 0) * idx }));
      setActive(idx);
    }
    if (qtyOptions.includes(b)) setQty(b);
  }, [product.handle, product.price, product.colors]);

  useEffect(() => {
    const el = ctaRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setShowSticky(!e.isIntersecting), { threshold: 0 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  function goTo(i: number) {
    setActive(i);
    const t = trackRef.current;
    if (t) t.scrollTo({ left: t.clientWidth * i, behavior: 'smooth' });
  }

  function chooseColor(hat: number, slug: string) {
    setColors((prev) => prev.map((c, i) => (i === hat ? slug : c)));
    if (hat === 0) {
      const idx = product.colors.findIndex((c) => c.slug === slug);
      if (idx >= 0) goTo(idx);
      track('select_item', { item_id: product.handle, color: slug });
    }
  }

  function addToBag() {
    const items = Array.from({ length: qty }, (_, i) => ({ handle: product.handle, color: colors[i] ?? colors[0] }));
    cart.add(items, { source: 'pdp' });
  }

  return (
    <div className="pdp">
      {/* Gallery */}
      <div className="gallery">
        <div className="gallery__thumbs" role="tablist" aria-label="Product images">
          {images.map((im, i) => (
            <button key={im.src} className="gallery__thumb" aria-current={i === active} aria-label={`Show image ${i + 1}`} onClick={() => goTo(i)} type="button">
              <Image src={im.src} alt="" width={im.width} height={im.height} sizes="88px" />
            </button>
          ))}
        </div>
        <div style={{ position: 'relative' }}>
          <div
            className="gallery__track"
            ref={trackRef}
            onScroll={(e) => {
              const t = e.currentTarget;
              const i = Math.round(t.scrollLeft / t.clientWidth);
              if (i !== active) setActive(i);
            }}
          >
            {images.map((im, i) => (
              <div className="gallery__slide" key={im.src}>
                <Image src={im.src} alt={im.alt} width={im.width} height={im.height} sizes="(min-width: 1024px) 55vw, 100vw" priority={i === 0} />
              </div>
            ))}
          </div>
          <span className="gallery__count">{active + 1} / {images.length}</span>
        </div>
      </div>

      {/* Buy box */}
      <div className="pdp__buy">
        <span className="badge">{product.line === 'performance' ? 'Performance' : 'Made for women golfers'}</span>
        <h1 className="buy__title">{product.title}</h1>
        <div className="buy__price">
          <span>{money(total)}</span>
          {saved > 0 && <s>{money(product.price * qty)}</s>}
          {saved > 0 && <span className="badge">Save {money(saved)}</span>}
        </div>
        <p className="buy__delivered">{money(total + shipping)} with US shipping, before tax{shipping ? ` · ${money(shipping)} shipping` : ' · free shipping'}.</p>
        <p className="buy__delivery">Made to order. Ships within 10 business days; delivery time is additional.</p>
        {fit && <p className="buy__fit"><strong>Fits hat sizes {fit.hatSizes}.</strong> <a href={fit.source} target="_blank" rel="noreferrer">Manufacturer size guide</a> · <Link href="/pages/fit-guide">How to measure</Link></p>}


        {product.colors.length > 1 && qty === 1 && (
          <fieldset className="opt">
            <legend>Color: <span>{selected.name}</span></legend>
            <Swatches product={product} value={colors[0]} onChange={(s) => chooseColor(0, s)} label="Color" />
          </fieldset>
        )}

        <div className="buy__cta" ref={ctaRef}>
          {site.dropMode ? (
            <div className="panel">
              <p style={{ fontWeight: 700, marginBottom: 8 }}>{site.dropDate ? `Drops ${site.dropDate}.` : 'Dropping soon.'} Get first access.</p>
              <EmailCapture source="pdp" productHandle={product.handle} cta="Notify me" />
            </div>
          ) : (
            <button type="button" className="btn btn--block" onClick={addToBag}>
              {qty === 1 ? 'Add to bag' : `Add ${qty} to bag`} · {money(total)}
            </button>
          )}
        </div>
        <p className="ship-note">US shipping $7 below $120 after discounts; free at $120+. Request returns within 30 days of ordering; unused items only, $5 per-item refund fee. <Link href="/pages/shipping-returns">Shipping &amp; returns</Link></p>
        {!site.dropMode && <details className="buy__bundles"><summary>{qty === 1 ? 'Buying for your golf buddy? Save on 2 or more' : `${qty} hats selected · change your bundle`}</summary><div>
        {!site.dropMode && (
          <fieldset className="opt">
            <legend>How many?</legend>
            <div className="tiles" role="radiogroup" aria-label="Bundle size">
              {qtyOptions.map((q) => {
                const tier = bundleTiers.find((t) => t.minQty === q);
                const tp = tierPrice(product.price, q);
                return (
                  <button
                    key={q}
                    type="button"
                    role="radio"
                    aria-checked={qty === q}
                    className="tile"
                    onClick={() => {
                      setQty(q);
                      track('select_promotion', { promotion_id: tier?.name ?? 'single', item_id: product.handle });
                    }}
                  >
                    {tier && <span className="badge">{tier.badge}</span>}
                    <span className="tile__radio" aria-hidden="true" />
                    <span>
                      <span className="tile__name">{q === 1 ? '1 hat' : `${q} hats: ${tier?.name}`}</span>
                      <span className="tile__sub">{q === 1 ? 'Just for you' : q === 2 ? `One for your golf buddy · ${tier?.percentOff}% off` : `Enough for the foursome · ${tier?.percentOff}% off`}</span>
                    </span>
                    <span className="tile__price">
                      {money(tp.total)}
                      {tp.saved > 0 && <s>{money(product.price * q)}</s>}
                    </span>
                  </button>
                );
              })}
            </div>
          </fieldset>
        )}

        {qty > 1 && product.colors.length > 1 && (
          <div className="opt">
            {Array.from({ length: qty }, (_, i) => (
              <fieldset key={i} className="opt" style={{ marginTop: i === 0 ? 0 : 14 }}>
                <legend>
                  Hat {i + 1}: <span>{product.colors.find((c) => c.slug === colors[i])?.name}</span>
                </legend>
                <Swatches product={product} value={colors[i]} onChange={(s) => chooseColor(i, s)} label={`Hat ${i + 1} color`} />
              </fieldset>
            ))}
            <p className="small muted" style={{ marginTop: 10 }}>Want a different style? Bundle savings apply across any hats in your bag.</p>
          </div>
        )}

        </div></details>}
        <ul className="buy__bullets">
          {bullets.slice(0, 4).map((b) => (
            <li key={b.title}>
              <Icon name={b.icon} />
              <span><strong>{b.title}.</strong> {b.text}</span>
            </li>
          ))}
        </ul>
      </div>

      {!site.dropMode && (
        <div className="sticky-atc" data-show={showSticky} aria-hidden={!showSticky}>
          <Image src={selected.image.src} alt="" width={44} height={55} style={{ borderRadius: 6 }} />
          <div className="sticky-atc__info">
            <strong>{product.title}</strong>
            <span>{money(total + shipping)} delivered before tax</span>
          </div>
          <button type="button" className="btn btn--sm" onClick={addToBag} tabIndex={showSticky ? 0 : -1}>
            Add to bag
          </button>
        </div>
      )}
    </div>
  );
}

function Swatches({ product, value, onChange, label }: { product: Product; value: string; onChange: (s: string) => void; label: string }) {
  return (
    <div className="swatches" role="radiogroup" aria-label={label}>
      {product.colors.map((c) => (
        <button
          key={c.slug}
          type="button"
          role="radio"
          aria-checked={value === c.slug}
          aria-label={c.name}
          title={c.name}
          className="swatch"
          style={{ background: c.swatch }}
          onClick={() => onChange(c.slug)}
        />
      ))}
    </div>
  );
}
