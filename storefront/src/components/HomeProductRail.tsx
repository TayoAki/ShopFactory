'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/data/products';
import { useCart } from '@/lib/cart';
import { money } from '@/lib/money';
import { site } from '@/lib/site';

function FeaturedHat({ product }: { product: Product }) {
  const [showModel, setShowModel] = useState(false);
  const { add } = useCart();
  const color = product.colors[0];
  const model = product.gallery.find((i) => i.src.includes('/models/'));
  return (
    <article className="release-card" data-handle={product.handle}>
      <div className={`release-card__media${showModel ? ' is-model' : ''}`}>
        <Link href={`/products/${product.handle}`} aria-label={`View ${product.title}`}>
          <Image className="release-card__product" src={color.image.src} alt={color.image.alt} width={color.image.width} height={color.image.height} sizes="(min-width: 900px) 25vw, 75vw" />
          {model && <Image className="release-card__model" src={model.src} alt={model.alt} width={model.width} height={model.height} sizes="(min-width: 900px) 25vw, 75vw" />}
        </Link>
        {product.badge && <span className="badge release-card__badge">{product.badge}</span>}
        {model && <button type="button" className="release-card__view" aria-label={`${showModel ? 'Show product' : 'Show model'} for ${product.title}`} aria-pressed={showModel} onClick={() => setShowModel(!showModel)}>{showModel ? 'Product' : 'On model'}</button>}
        {site.dropMode ? <Link className="release-card__add" href={`/products/${product.handle}`}>View hat →</Link> : <button type="button" className="release-card__add" aria-label={`Add ${product.title} in ${color.name} to bag`} onClick={() => add([{handle:product.handle,color:color.slug}],{source:'home_latest_releases'})}>＋ Quick add</button>}
      </div>
      <div className="release-card__heading"><Link href={`/products/${product.handle}`}>{product.title}</Link><span>{money(product.price)}</span></div>
      <p>{color.name}</p><p>{product.subtitle}</p>
      <div className="dots" aria-label={`${product.colors.length} ${product.colors.length === 1 ? 'color' : 'colors'} available`}>{product.colors.map((c) => <span className="dot" key={c.slug} style={{backgroundColor:c.swatch}} title={c.name} />)}</div>
    </article>
  );
}

export function HomeProductRail({ products }: { products: Product[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const move = (direction: number) => {
    const rail = ref.current;
    if (rail) rail.scrollBy({left:direction * (rail.firstElementChild?.getBoundingClientRect().width ?? 300),behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'});
  };
  return (
    <section className="section releases" aria-labelledby="releases-title">
      <div className="container">
        <div className="releases__head"><h2 id="releases-title">Latest releases</h2><Link href="/collections/all" className="btn btn--outline" data-umami-event="home_shop_all">Shop all</Link></div>
        <div ref={ref} className="releases__rail" tabIndex={0} role="region" aria-label="Featured hats; scroll to see more">{products.map((p) => <FeaturedHat key={p.handle} product={p} />)}</div>
        <div className="releases__controls"><span>Find your next round favorite.</span><div><button type="button" onClick={() => move(-1)} aria-label="Previous hats">←</button><button type="button" onClick={() => move(1)} aria-label="Next hats">→</button></div></div>
      </div>
    </section>
  );
}
