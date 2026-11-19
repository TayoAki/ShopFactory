import type { Metadata } from 'next';
import Image from 'next/image';
import { BundleBuilder } from '@/components/BundleBuilder';
import { FeatureRow } from '@/components/FeatureRow';
import { media } from '@/data/media';
import { products } from '@/data/products';
import { bundleTiers } from '@/lib/pricing';

export const metadata: Metadata = {
  title: 'Bring Your Golf Buddy',
  description: 'Save 10% on any 2 Bogey Baby golf hats and 15% on 3 or more. US shipping and 30-day returns.',
  robots: { index: false, follow: false },
};

export default function GolfBuddyPage() {
  const pair = bundleTiers.find((t) => t.minQty === 2)!;
  const four = bundleTiers.find((t) => t.minQty === 3)!;
  return (
    <>
      <section className="section" style={{ paddingTop: 28 }}>
        <div className="container split" style={{ alignItems: 'start' }}>
          <div>
            <span className="eyebrow">The Golf Buddy Pair</span>
            <h1>Two hats. One for you, one for your golf buddy.</h1>
            <p className="lead" style={{ marginTop: 14 }}>
              Save {pair.percentOff}% on 2 ready-designed Bogey Baby hats and {four.percentOff}% on 3 or more. Mix styles and colors. Standard US shipping is $7, or free from $120 after discounts. Personalized orders are priced separately; see our 30-day return terms.
            </p>
            <div className="media-frame" style={{ marginTop: 20 }}>
              <Image src={media.cartFriends.src} alt={media.cartFriends.alt} width={media.cartFriends.width} height={media.cartFriends.height} sizes="(min-width: 900px) 50vw, 100vw" priority />
            </div>
          </div>
          <BundleBuilder
            products={products}
            defaults={[
              { handle: 'cream-rope-cap', color: 'cream' },
              { handle: 'front-nine-ponytail-cap', color: 'sage' },
              { handle: 'small-fit-performance-cap', color: 'sage' },
            ]}
          />
        </div>
      </section>

      <section className="section section--paper2">
        <div className="container">
          <div className="section-head">
            <h2>Golf&apos;s better with your people. Your hats should be too.</h2>
            <p className="lead" style={{ marginTop: 12 }}>Someone always shows up in a baggy pro-shop cap. This time, the whole group matches the photo.</p>
          </div>
          <FeatureRow
            items={[
              { icon: 'gift', title: 'Any 2 hats, 10% off', text: 'Any styles, any colors. Three or more saves 15%.' },
              { icon: 'truck', title: 'Free US shipping $120+', text: '$7 below $120; threshold applies after discounts.' },
              { icon: 'calendar', title: '$5 refund fee', text: 'Store-credit returns are free. Eligibility applies.' },
              { icon: 'calendar', title: '30-day returns', text: 'Not right? Send it back.' },
            ]}
          />
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <div className="media-frame">
            <Image src={media.nineteenth.src} alt={media.nineteenth.alt} width={media.nineteenth.width} height={media.nineteenth.height} sizes="(min-width: 900px) 50vw, 100vw" />
          </div>
          <div>
            <h2>The 30-day fit promise</h2>
            <p className="lead" style={{ marginTop: 12 }}>Request a return within 30 days of ordering. Hats must be unused with tags and packaging. Store-credit returns are free; a $5 fee applies to refunds.</p>
            <div className="accordion">
              <details><summary>Can we pick different styles and colors?</summary><div className="acc-body">Yes. Any hats in your bag count toward the bundle savings.</div></details>
              <details><summary>Can I ship one to my friend?</summary><div className="acc-body">Both hats ship together to one address for now.</div></details>
              <details><summary>How fast will they arrive?</summary><div className="acc-body">Each hat is made to order and ships within 10 business days.</div></details>
            </div>
            <a href="#main" className="btn" style={{ marginTop: 20 }}>Build my pair</a>
          </div>
        </div>
      </section>
    </>
  );
}
