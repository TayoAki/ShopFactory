import type { Metadata } from 'next';
import Link from 'next/link';
import { ProductCard } from '@/components/ProductCard';
import { getProduct } from '@/lib/catalog';
import { bundleTiers } from '@/lib/pricing';

export const metadata: Metadata = {
  title: 'Golf Hat Gift Guide',
  description: 'Golf hats for your favorite playing partner. Shop embroidered classics, ponytail caps and sunny-round picks from Bogey Baby.',
};
const gifts = [
  { title: 'For her first Bogey Baby hat', text: 'Start with an embroidered classic.', handles: ['cream-rope-cap', 'sunwashed-rope-cap', 'tee-time-dad-cap'] },
  { title: 'For the hair-up golfer', text: 'Ponytail openings and an open-crown visor.', handles: ['front-nine-ponytail-cap', 'back-nine-ponytail-cap', 'clubhouse-visor'] },
  { title: 'For sunny rounds', text: 'Picks with UPF 50+ fabric.', handles: ['small-fit-performance-cap', '19th-hole-bucket', 'back-nine-ponytail-cap'] },
];

export default function GiftGuidePage() {
  const pair = bundleTiers.find(tier => tier.minQty === 2)!;
  const group = bundleTiers.find(tier => tier.minQty === 3)!;
  return (
    <>
      <section className="section">
        <div className="container">
          <div className="section-head">
            <h1>Gift Guide</h1>
            <p className="lead" style={{ marginTop: 14 }}>For the friend who always books the next tee time.</p>
          </div>
          <p>Not sure which fit she likes? <Link className="link" href="/pages/fit-quiz">Try the Fit Quiz</Link> or <Link className="link" href="/pages/fit-guide">check the Fit Guide</Link>.</p>
        </div>
      </section>
      {gifts.map((group, index) => (
        <section className={index % 2 ? 'section' : 'section section--paper2'} key={group.title}>
          <div className="container">
            <div className="section-head"><h2>{group.title}</h2><p className="muted" style={{ marginTop: 12 }}>{group.text}</p></div>
            <div className="grid grid--3">
              {group.handles.map(handle => <ProductCard key={handle} product={getProduct(handle)!} />)}
            </div>
          </div>
        </section>
      ))}
      <section className="section section--pine">
        <div className="container">
          <h2>One for her. One for you.</h2>
          <p className="lead" style={{ marginTop: 14 }}>Save {pair.percentOff}% on any 2 hats, or {group.percentOff}% on 3 or more. Mix styles and colors.</p>
          <Link href="/pages/golf-buddy" className="btn btn--cream" style={{ marginTop: 20 }}>Build your golf buddy bundle</Link>
        </div>
      </section>
    </>
  );
}
