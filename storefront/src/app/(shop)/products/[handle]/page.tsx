import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { JsonLd } from '@/components/JsonLd';
import { ProductCard } from '@/components/ProductCard';
import { ProductView } from '@/components/ProductView';
import { products } from '@/data/products';
import { benefitBullets, getProduct } from '@/lib/catalog';
import { site } from '@/lib/site';

export function generateStaticParams() {
  return products.map((p) => ({ handle: p.handle }));
}

export async function generateMetadata({ params }: { params: Promise<{ handle: string }> }): Promise<Metadata> {
  const { handle } = await params;
  const p = getProduct(handle);
  if (!p) return {};
  const img = p.colors[0].image;
  return {
    title: `${p.title} | ${p.style === 'cap' ? "Women's Golf Cap" : p.style === 'visor' ? "Women's Golf Visor" : p.style === 'bucket' ? "Women's Golf Bucket Hat" : "Women's Golf Beanie"}`,
    description: `${p.description.split('. ')[0]}. Free US shipping and free fit exchanges.`,
    alternates: { canonical: `/products/${p.handle}` },
    openGraph: { images: [{ url: img.src, width: img.width, height: img.height, alt: img.alt }] },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ handle: string }> }) {
  const { handle } = await params;
  const p = getProduct(handle);
  if (!p) notFound();
  const bullets = benefitBullets(p);
  const related = products.filter((x) => x.handle !== p.handle && (x.line === p.line || x.collections.some((c) => p.collections.includes(c) && c !== 'all'))).slice(0, 4);
  const hasPonytail = Boolean(p.features.ponytail);

  const compareRows: { label: string; ours: string; typical: string }[] = [];
  if (p.features.smallFit) compareRows.push({ label: 'Fit', ours: 'Small fit for smaller heads', typical: 'Usually one size' });
  if (hasPonytail) compareRows.push({ label: 'Ponytail', ours: p.features.ponytail === 'concealed' ? 'Concealed ponytail opening' : 'Open back with elastic bands', typical: 'Rarely' });
  if (p.features.upf50) compareRows.push({ label: 'Sun', ours: 'UPF 50+ fabric', typical: 'Often not rated' });
  if (p.features.makeupResistant) compareRows.push({ label: 'Sweatband', ours: 'Makeup-resistant', typical: 'Standard band' });
  compareRows.push({ label: 'The golfer', ours: 'A woman golfer who looks like us', typical: '—' });
  compareRows.push({ label: 'Fit exchanges', ours: 'Free within 30 days', typical: 'Varies' });

  return (
    <>
      <div className="container">
        <nav aria-label="Breadcrumb">
          <ol className="crumbs">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/collections/all">Golf hats</Link></li>
            <li aria-current="page">{p.title}</li>
          </ol>
        </nav>
        <ProductView product={p} bullets={bullets} />

        <section className="section--tight" style={{ maxWidth: 820 }}>
          <div className="accordion">
            <details open>
              <summary>Details and materials</summary>
              <div className="acc-body">
                <p>{p.description}</p>
                <table className="spec">
                  <tbody>
                    {p.details.map((d) => (
                      <tr key={d.label}><th scope="row">{d.label}</th><td>{d.value}</td></tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </details>
            <details>
              <summary>Fit and sizing</summary>
              <div className="acc-body">
                <p>{p.fit}</p>
                <p>Between sizes or not sure? Pick the hat you love; if the fit is off, exchanges are free within 30 days. <Link className="link" href="/pages/fit-guide">Fit Guide</Link></p>
              </div>
            </details>
            <details>
              <summary>Care</summary>
              <div className="acc-body">Spot clean with cool water and a soft brush, or hand wash cold. Reshape and air dry. Don&apos;t machine dry.</div>
            </details>
            <details>
              <summary>Shipping and exchanges</summary>
              <div className="acc-body">Made to order and shipped within 10 business days. Free US shipping on every order. Free fit exchanges and returns within 30 days of delivery. <Link className="link" href="/pages/shipping-returns">Shipping &amp; Returns</Link></div>
            </details>
            <details>
              <summary>About our golfer</summary>
              <div className="acc-body">Our golfer is caught in her follow-through, in sunglasses and a green striped sweater. Her badge sets the colors for the brand: pine, cream and old gold. {p.decoration === 'embroidery' ? 'On this hat she is embroidered in thread.' : 'On this hat she is printed in full color.'}</div>
            </details>
          </div>
        </section>
      </div>

      <section className="section section--paper2">
        <div className="container split">
          <div>
            <span className="eyebrow">Find your fit</span>
            <h2>Find your fit in 10 seconds.</h2>
            <p className="lead" style={{ marginTop: 12 }}>Measure around your head just above the ears. {p.features.smallFit ? 'This cap is made in a small fit for smaller heads.' : 'This hat adjusts to fit most heads.'} Between sizes or unsure? Exchanges are free.</p>
            <Link href="/pages/fit-guide" className="link link--cta">Open the Fit Guide →</Link>
          </div>
          <div className="panel">
            <h3 style={{ marginBottom: 12 }}>Not your pro-shop cap</h3>
            <table className="spec">
              <thead><tr><th scope="col"> </th><th scope="col">Bogey Baby</th><th scope="col">Typical cap</th></tr></thead>
              <tbody>
                {compareRows.map((r) => (
                  <tr key={r.label}><th scope="row">{r.label}</th><td><strong>{r.ours}</strong></td><td className="muted">{r.typical}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="section section--tight">
        <div className="container">
          <div className="panel panel--line" style={{ display: 'flex', gap: 18, alignItems: 'center', flexWrap: 'wrap' }}>
            <Image src="/brand/golfer-badge-96.webp" alt="" width={72} height={72} />
            <div style={{ flex: 1, minWidth: 240 }}>
              <h3>The 30-day fit promise</h3>
              <p style={{ margin: 0 }} className="muted">If it doesn&apos;t fit, swap it free. Don&apos;t love it? Send it back within 30 days.</p>
            </div>
            <Link href="/pages/shipping-returns" className="btn btn--secondary">How it works</Link>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="section section--tight">
          <div className="container">
            <div className="section-head">
              <span className="eyebrow">Bring your golf buddy</span>
              <h2>Complete the set</h2>
              <p className="muted" style={{ marginTop: 8 }}>Save 10% on any 2 hats and 15% on 3 or more, across any styles.</p>
            </div>
            <div className="grid grid--4">
              {related.map((r) => <ProductCard key={r.handle} product={r} />)}
            </div>
          </div>
        </section>
      )}

      <JsonLd
        data={[
          {
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: p.title,
            description: p.description,
            image: p.colors.map((c) => `${site.url}${c.image.src}`),
            brand: { '@type': 'Brand', name: site.name },
            offers: p.colors.map((c) => ({
              '@type': 'Offer',
              price: (p.price / 100).toFixed(2),
              priceCurrency: 'USD',
              availability: site.dropMode ? 'https://schema.org/PreOrder' : 'https://schema.org/InStock',
              url: `${site.url}/products/${p.handle}?color=${c.slug}`,
              name: `${p.title} - ${c.name}`,
            })),
          },
          {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: site.url },
              { '@type': 'ListItem', position: 2, name: 'Golf hats', item: `${site.url}/collections/all` },
              { '@type': 'ListItem', position: 3, name: p.title, item: `${site.url}/products/${p.handle}` },
            ],
          },
        ]}
      />
    </>
  );
}
