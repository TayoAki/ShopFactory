import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { EmailCapture } from '@/components/EmailCapture';
import { JsonLd } from '@/components/JsonLd';
import { CollectionBrowser } from '@/components/CollectionBrowser';
import { TrustLine } from '@/components/TrustLine';
import { collections } from '@/data/products';
import { getCollection, productsIn } from '@/lib/catalog';
import { site } from '@/lib/site';

export function generateStaticParams() {
  return collections.map((c) => ({ handle: c.handle }));
}

export async function generateMetadata({ params }: { params: Promise<{ handle: string }> }): Promise<Metadata> {
  const { handle } = await params;
  const c = getCollection(handle);
  if (!c) return {};
  return { title: c.handle === 'all' ? "Women's Golf Hats" : `${c.title} for Women Golfers`, description: c.description, alternates: { canonical: `/collections/${c.handle}` } };
}

const filters = [
  { handle: 'all', label: 'All' },
  { handle: 'embroidered', label: 'Embroidered' },
  { handle: 'performance', label: 'Performance' },
  { handle: 'ponytail-caps', label: 'Ponytail' },
  { handle: 'caps', label: 'Caps' },
  { handle: 'visors', label: 'Visors' },
  { handle: 'bucket-hats', label: 'Bucket hats' },
  { handle: 'beanies', label: 'Beanies' },
];

export default async function CollectionPage({ params }: { params: Promise<{ handle: string }> }) {
  const { handle } = await params;
  const c = getCollection(handle);
  if (!c) notFound();
  const items = productsIn(handle);

  return (
    <>
      <div className="container" style={{ paddingTop: 20 }}>
        <div className="banner">
          <Image src={c.image.src} alt="" width={c.image.width} height={c.image.height} sizes="(min-width: 1300px) 1300px, 100vw" priority />
          <div className="banner__content">
            <h1>{c.title}</h1>
            <p style={{ marginTop: 10, color: '#f3ecd2' }}>{c.description}</p>
            <TrustLine light />
          </div>
        </div>
      </div>

      <section className="section section--tight">
        <div className="container">
          <nav aria-label="Filter hats" className="pill-row" style={{ marginBottom: 24 }}>
            {filters.map((f) => (
              <Link key={f.handle} href={`/collections/${f.handle}`} className="pill" aria-current={f.handle === handle ? 'page' : undefined}>
                {f.label}
              </Link>
            ))}
          </nav>
          <CollectionBrowser key={handle} products={items} />
        </div>
      </section>

      <section className="section section--paper2">
        <div className="container split">
          <div className="prose">
            <h2 style={{ marginTop: 0 }}>Golf hats made for women who play</h2>
            <p>
              Bogey Baby makes golf hats for women golfers and the friends they play with: embroidered rope caps and dad caps, ponytail caps with concealed openings, a true small-fit cap for smaller heads, and UPF 50+ performance hats for long, sunny rounds. Every hat carries our golfer, caught mid-swing.
            </p>
          </div>
          <div>
            <h3 style={{ marginBottom: 10 }}>Get new colors before anyone else</h3>
            <EmailCapture source="collection" cta="Join" />
          </div>
        </div>
      </section>

      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: c.title,
          description: c.description,
          mainEntity: {
            '@type': 'ItemList',
            itemListElement: items.map((p, i) => ({ '@type': 'ListItem', position: i + 1, url: `${site.url}/products/${p.handle}`, name: p.title })),
          },
        }}
      />
    </>
  );
}
