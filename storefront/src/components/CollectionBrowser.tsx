'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/data/products';
import { useCart } from '@/lib/cart';
import { money } from '@/lib/money';
import { site } from '@/lib/site';

const featureOptions = [
  { key: 'ponytail', label: 'Ponytail opening' },
  { key: 'upf50', label: 'UPF 50+' },
  { key: 'wicking', label: 'Moisture wicking' },
  { key: 'rope', label: 'Rope brim' },
] as const;

function CollectionHat({ product, model, activeColors, priority }: { product: Product; model: boolean; activeColors: string[]; priority: boolean }) {
  const [chosen, setChosen] = useState(product.colors[0].slug);
  const { add } = useCart();
  const available = product.colors.filter((c) => activeColors.length === 0 || activeColors.includes(c.name));
  const color = available.find((c) => c.slug === chosen) ?? available[0] ?? product.colors[0];
  // Only use a model image for the lead color pictured in the catalog gallery.
  const modelImage = color.slug === product.colors[0].slug
    ? product.gallery.find((i) => /wearing|golfer from behind/i.test(i.alt)) : undefined;
  const photo = model && modelImage ? modelImage : color.image;
  return (
    <article className="collection-hat" data-handle={product.handle}>
      <div className="collection-hat__media">
        <Link href={`/products/${product.handle}`} aria-label={`View ${product.title}`}>
          <Image src={photo.src} alt={photo.alt} width={photo.width} height={photo.height} sizes="(min-width: 1200px) 22vw, (min-width: 768px) 30vw, 50vw" priority={priority} />
        </Link>
        {product.badge && <span className="badge collection-hat__badge">{site.dropMode ? 'Drops soon' : product.badge}</span>}
        {model && !modelImage && <span className="collection-hat__photo-label">Product view</span>}
        {site.dropMode ? <Link className="collection-hat__add" href={`/products/${product.handle}`}>View hat →</Link> : (
          <button className="collection-hat__add" type="button" aria-label={`Add ${product.title} in ${color.name} to bag`} onClick={() => add([{ handle: product.handle, color: color.slug }], { source: 'collection_quick_add' })}>＋ Quick add</button>
        )}
      </div>
      <div className="collection-hat__heading"><Link href={`/products/${product.handle}`}>{product.title}</Link><span>{money(product.price)}</span></div>
      <p className="collection-hat__color">{color.name}</p>
      <p className="collection-hat__subtitle">{product.subtitle}</p>
      <div className="collection-hat__swatches" role="group" aria-label={`Colors for ${product.title}`}>
        {product.colors.map((c) => <button key={c.slug} type="button" className="collection-swatch" style={{ backgroundColor: c.swatch }} title={c.name} aria-label={c.name} aria-pressed={color.slug === c.slug} disabled={activeColors.length > 0 && !activeColors.includes(c.name)} onClick={() => setChosen(c.slug)} />)}
      </div>
    </article>
  );
}

export function CollectionBrowser({ products }: { products: Product[] }) {
  const [sort, setSort] = useState('featured');
  const [fit, setFit] = useState('all');
  const [colors, setColors] = useState<string[]>([]);
  const [features, setFeatures] = useState<string[]>([]);
  const [model, setModel] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const colorOptions = Array.from(new Map(products.flatMap((p) => p.colors.map((c) => [c.name, c] as const))).values());
  const activeCount = colors.length + features.length + Number(fit !== 'all');
  const reset = () => { setFit('all'); setColors([]); setFeatures([]); };
  const toggle = (values: string[], value: string) => values.includes(value) ? values.filter((v) => v !== value) : [...values, value];
  const items = products.filter((p) =>
    (fit === 'all' || (fit === 'small' ? p.features.smallFit : !p.features.smallFit)) &&
    (colors.length === 0 || p.colors.some((c) => colors.includes(c.name))) &&
    features.every((f) => Boolean(p.features[f as keyof Product['features']]))
  ).sort((a, b) => sort === 'price-low' ? a.price - b.price : sort === 'price-high' ? b.price - a.price : sort === 'name' ? a.title.localeCompare(b.title) : 0);
  return (
    <div className="collection-browser">
      <div className="collection-toolbar">
        <button className="collection-filter-toggle" type="button" aria-expanded={filtersOpen} aria-controls="collection-filters" onClick={() => setFiltersOpen(!filtersOpen)}>Filters{activeCount ? ` (${activeCount})` : ''} <span aria-hidden="true">{filtersOpen ? '−' : '＋'}</span></button>
        <label className="collection-sort">Sort by <select value={sort} onChange={(e) => setSort(e.target.value)}><option value="featured">Featured</option><option value="price-low">Price: low to high</option><option value="price-high">Price: high to low</option><option value="name">Name: A–Z</option></select></label>
        <div className="collection-view" role="group" aria-label="Photo view"><button type="button" aria-pressed={!model} onClick={() => setModel(false)}>Product</button><button type="button" aria-pressed={model} onClick={() => setModel(true)}>On model</button></div>
      </div>
      <div className="collection-layout">
        <aside id="collection-filters" className={`collection-filters${filtersOpen ? ' is-open' : ''}`} aria-label="Filter products">
          <div className="collection-filters__heading"><strong>Find your fit</strong>{activeCount > 0 && <button type="button" onClick={reset}>Clear all</button>}</div>
          <details open><summary>Fit</summary><div className="collection-fit" role="group" aria-label="Fit">{[{value:'all',label:'All fits'},{value:'standard',label:'Standard'},{value:'small',label:'Small fit'}].map((f) => <button key={f.value} type="button" aria-pressed={fit === f.value} onClick={() => setFit(f.value)}>{f.label}</button>)}</div></details>
          <details open><summary>Color</summary><div className="collection-colors">{colorOptions.map((c) => <button key={c.name} type="button" aria-pressed={colors.includes(c.name)} onClick={() => setColors(toggle(colors,c.name))}><span className="collection-swatch" style={{backgroundColor:c.swatch}} /><span>{c.name}</span></button>)}</div></details>
          <details open><summary>Details</summary><div className="collection-features">{featureOptions.filter((f) => products.some((p) => p.features[f.key])).map((f) => <label key={f.key}><input type="checkbox" checked={features.includes(f.key)} onChange={() => setFeatures(toggle(features,f.key))} />{f.label}</label>)}</div></details>
          <Link href="/pages/fit-quiz" className="collection-quiz">Not sure? Take the fit quiz →</Link>
        </aside>
        <div className="collection-results">
          <div className="collection-results__intro"><p role="status">{items.length} {items.length === 1 ? 'hat' : 'hats'}{activeCount > 0 ? ` of ${products.length}` : ''}</p>{model && <p>Model photos where available. Other hats show a product view.</p>}</div>
          {items.length > 0 ? <div className="collection-grid">{items.map((p,i) => <CollectionHat key={p.handle} product={p} model={model} activeColors={colors} priority={i < 2} />)}</div> : <div className="collection-empty"><h2>No hats match just yet.</h2><p>Try another color or clear your filters to see the whole collection.</p><button type="button" className="btn" onClick={reset}>Clear filters</button></div>}
          {!site.dropMode && products.length >= 4 && <Link className="collection-buddy" href="/pages/golf-buddy"><strong>Bring your golf buddy.</strong><span>Save 10% on 2 hats and 15% on 3 or more. Mix any styles. →</span></Link>}
        </div>
      </div>
    </div>
  );
}
