import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Icon } from '@/components/Icon';
import { ProductCard } from '@/components/ProductCard';
import { ScrollDepth } from '@/components/ScrollDepth';
import { TrustLine } from '@/components/TrustLine';
import { media } from '@/data/media';
import { getProduct, productsIn } from '@/lib/catalog';
import { bundleTiers } from '@/lib/pricing';

export const metadata: Metadata = {
  title: 'Finally, Golf Hats Made for Women',
  description: '5 reasons women golfers are switching to Bogey Baby: a true small fit, room for your ponytail, UPF 50+ and a golfer who looks like you.',
  robots: { index: false, follow: false },
};

const SHOP = '/products/cream-rope-cap?src=listicle';

export default function FiveReasonsPage() {
  const smallFit = getProduct('small-fit-performance-cap')!;
  const picks = ['cream-rope-cap', 'front-nine-ponytail-cap', 'small-fit-performance-cap'].map((h) => getProduct(h)!);
  const ponytailCount = productsIn('ponytail-caps').length;
  const pair = bundleTiers.find((t) => t.minQty === 2)!;
  const four = bundleTiers.find((t) => t.minQty === 3)!;

  return (
    <article className="section" style={{ paddingTop: 28 }}>
      <div className="container article">
        <span className="eyebrow">For women who golf</span>
        <h1>Finally, Golf Hats Made for Women: Not Shrunk and Pinked</h1>
        <p className="lead" style={{ marginTop: 16 }}>
          5 reasons women golfers are switching to Bogey Baby: a true small fit, room for your hair, UPF 50+ for sunny rounds, and a golfer who finally looks like you.
        </p>
        <p className="article__byline">By Bogey Baby · 4 min read</p>
        <div className="media-frame">
          <Image src={media.groupTee.src} alt={media.groupTee.alt} width={media.groupTee.width} height={media.groupTee.height} sizes="(min-width: 800px) 760px, 100vw" priority />
        </div>
        <div className="btn-row" style={{ marginTop: 20 }}>
          <Link href={SHOP} className="btn">See the hats <Icon name="arrow" width={20} /></Link>
        </div>
        <TrustLine />

        <section className="reason" style={{ marginTop: 34 }}>
          <p className="lead" style={{ color: 'var(--ink)' }}>
            Walk into most pro shops and the women&apos;s section is a shelf of men&apos;s caps in smaller boxes, plus one pink one. They slide over your sunglasses, squash your bun and end up in your bag by the 4th hole. You&apos;ve been making do with hats that were never chosen for you.
          </p>
          <figure className="media-frame">
            <Image src={media.problem.src} alt={media.problem.alt} width={media.problem.width} height={media.problem.height} sizes="(min-width: 800px) 760px, 100vw" />
          </figure>
        </section>

        <section className="reason">
          <span className="reason__num">1</span>
          <h2>There&apos;s a true small fit, not a youth size</h2>
          <p>
            The {smallFit.title} is made in a small fit for smaller heads, so the brim sits where it should instead of resting on your sunglasses. It&apos;s also UPF 50+ and moisture-wicking.
          </p>
          <figure className="media-frame">
            <Image src={smallFit.colors[0].image.src} alt={smallFit.colors[0].image.alt} width={smallFit.colors[0].image.width} height={smallFit.colors[0].image.height} sizes="(min-width: 800px) 760px, 100vw" />
          </figure>
        </section>

        <section className="reason">
          <span className="reason__num">2</span>
          <h2>Your ponytail gets its own door</h2>
          <p>
            {ponytailCount} of our caps are made for hair that&apos;s up: concealed ponytail openings on the Front Nine, Range Day, Cart Path and Turn caps, and an open back with elastic bands on the Back Nine. Wear your hair how you want; the hat works around it.
          </p>
          <figure className="media-frame">
            <Image src={media.ponytailBack.src} alt={media.ponytailBack.alt} width={media.ponytailBack.width} height={media.ponytailBack.height} sizes="(min-width: 800px) 760px, 100vw" />
          </figure>
        </section>

        <section className="reason">
          <span className="reason__num">3</span>
          <h2>It stays cool for all 18</h2>
          <p>
            Our performance hats are rated UPF 50+ and use moisture-wicking fabric with a sweatband that keeps the hat on your head instead of in your bag. Several caps have makeup-resistant sweatbands, too.
          </p>
          <figure className="media-frame">
            <Image src={media.bucketOnHead.src} alt={media.bucketOnHead.alt} width={media.bucketOnHead.width} height={media.bucketOnHead.height} sizes="(min-width: 800px) 760px, 100vw" />
          </figure>
          <div className="btn-row" style={{ marginTop: 20 }}>
            <Link href="/collections/performance" className="btn btn--secondary">See the performance hats</Link>
          </div>
        </section>

        <section className="reason">
          <span className="reason__num">4</span>
          <h2>Our golfer looks like you</h2>
          <p>
            The golfer on every Bogey Baby hat is one of us: mid-swing, sunglasses on, sweater tied at the shoulders. On our embroidered classics she&apos;s stitched in thread, so she&apos;ll be there long after the scorecard&apos;s forgotten.
          </p>
          <figure className="media-frame">
            <Image src="/images/products/flagship-cream-macro.webp" alt="Close-up of the golfer embroidered on the Cream Rope Cap" width={928} height={1152} sizes="(min-width: 800px) 760px, 100vw" />
          </figure>
        </section>

        <section className="reason">
          <span className="reason__num">5</span>
          <h2>You&apos;ll look like you belong, whatever you shoot</h2>
          <p>
            We called it Bogey Baby because nobody plays pretty every hole. You can still look put-together from the first tee to the 19th-hole photo.
          </p>
          <figure className="media-frame">
            <Image src={media.celebrate.src} alt={media.celebrate.alt} width={media.celebrate.width} height={media.celebrate.height} sizes="(min-width: 800px) 760px, 100vw" />
          </figure>
        </section>

        <section className="reason">
          <span className="eyebrow">Pick your hats</span>
          <h2>Start with these three</h2>
          <p>
            Bring your golf buddy: save {pair.percentOff}% on any 2 hats and {four.percentOff}% on 3 or more. Free US shipping on orders $120+ after discounts, and 30-day returns; refund fee applies.
          </p>
          <div className="grid grid--3" style={{ marginTop: 18 }}>
            {picks.map((p) => <ProductCard key={p.handle} product={p} sizes="(min-width: 800px) 240px, 50vw" />)}
          </div>
        </section>

        <section className="reason">
          <h2>Questions</h2>
          <div className="accordion" style={{ marginTop: 10 }}>
            <details><summary>Will it fit my small head?</summary><div className="acc-body">The Small Fit Performance Cap is made in a small fit, and most of our caps adjust. If the fit is off, see our 30-day return policy for eligibility and fees.</div></details>
            <details><summary>Does it work with a ponytail?</summary><div className="acc-body">Yes, on five caps: the Front Nine, Range Day, Cart Path and Turn caps have concealed ponytail openings, and the Back Nine has an open back.</div></details>
            <details><summary>How do I wash it?</summary><div className="acc-body">Spot clean or hand wash cold, reshape and air dry.</div></details>
            <details><summary>How fast will it arrive?</summary><div className="acc-body">Every hat is made to order and ships within 10 business days, to US addresses. Shipping is free on orders $120+ after discounts.</div></details>
          </div>
        </section>

        <section className="reason center">
          <h2>Bogeys happen. Bad hat days don&apos;t.</h2>
          <div className="btn-row" style={{ justifyContent: 'center', marginTop: 18 }}>
            <Link href="/collections/all?src=listicle" className="btn">Shop Bogey Baby <Icon name="arrow" width={20} /></Link>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}><TrustLine /></div>
        </section>
      </div>
      <ScrollDepth stickyText="Golf hats made for us" stickyHref={SHOP} stickyCta="See the hats" />
    </article>
  );
}
