import type { Metadata } from 'next';
import { SearchTracker } from '@/components/SearchTracker';
import { ProductCard } from '@/components/ProductCard';
import { products } from '@/data/products';
import { bestSellers } from '@/lib/catalog';

export const metadata: Metadata = { title: 'Search', robots: { index: false } };

function matches(q: string) {
  const terms = q.toLowerCase().split(/\s+/).filter(Boolean);
  return products.filter((p) => {
    const hay = [p.title, p.subtitle, p.description, p.style, ...p.colors.map((c) => c.name), ...p.collections, p.features.ponytail ? 'ponytail' : '', p.features.upf50 ? 'upf sun' : '', p.features.smallFit ? 'small fit' : '']
      .join(' ')
      .toLowerCase();
    return terms.every((t) => hay.includes(t));
  });
}

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q = '' } = await searchParams;
  const results = q ? matches(q) : [];
  return (
    <section className="section">
      <div className="container">
        <h1>Search</h1>
        <form action="/search" role="search" className="input-row" style={{ maxWidth: 560, marginTop: 16 }}>
          <label className="sr-only" htmlFor="q">Search hats</label>
          <input id="q" name="q" className="input" defaultValue={q} placeholder="Try 'ponytail', 'visor' or 'sage'" autoFocus />
          <button className="btn btn--sm" type="submit">Search</button>
        </form>
        {q && <SearchTracker key={q} resultCount={results.length} />}
        {q && (
          <p className="muted" style={{ marginTop: 16 }} role="status">
            {results.length ? `${results.length} ${results.length === 1 ? 'hat' : 'hats'} for “${q}”` : `No hats match “${q}”. Try “cap”, “visor” or a color.`}
          </p>
        )}
        <div className="grid grid--4" style={{ marginTop: 20 }}>
          {(results.length ? results : bestSellers()).map((p) => <ProductCard key={p.handle} product={p} />)}
        </div>
      </div>
    </section>
  );
}
