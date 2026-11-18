import Image from 'next/image';
import Link from 'next/link';
import { ArtImage } from '@/components/ArtImage';
import { EmailCapture } from '@/components/EmailCapture';
import { FeatureRow } from '@/components/FeatureRow';
import { HeroVideo } from '@/components/HeroVideo';
import { Icon } from '@/components/Icon';
import { ProductCard } from '@/components/ProductCard';
import { TrustLine } from '@/components/TrustLine';
import { media } from '@/data/media';
import { bestSellers, getProduct, benefitBullets, productsIn } from '@/lib/catalog';
import { money } from '@/lib/money';
import { bundleTiers } from '@/lib/pricing';
import { site } from '@/lib/site';

export default function HomePage() {
  const flagship = getProduct('cream-rope-cap')!;
  const pair = bundleTiers.find((t) => t.minQty === 2)!;
  const four = bundleTiers.find((t) => t.minQty === 3)!;
  const ponytailCount = productsIn('ponytail-caps').length;

  return (
    <>
      {/* 1. Hero */}
      {/* The two lines wait for the film's first play-through (data-intro="pending" hides them); HeroVideo reveals them. */}
      <section id="hero" className="hero" data-intro="pending" aria-labelledby="hero-title">
        <noscript dangerouslySetInnerHTML={{ __html: '<style>.hero[data-intro] .hero__content{opacity:1;transform:none;pointer-events:auto}.hero[data-intro] .hero__media::after{opacity:1}</style>' }} />
        <div className="hero__media">
          <ArtImage mobile={media.heroVideoMobile} desktop={media.heroVideoDesktop} alt={media.heroVideoMobile.alt} priority />
          <HeroVideo
            heroId="hero"
            mobile={{ webm: '/video/hero-mobile.webm', mp4: '/video/hero-mobile.mp4' }}
            desktop={{ webm: '/video/hero-desktop.webm', mp4: '/video/hero-desktop.mp4' }}
          />
        </div>
        <div className="hero__content container">
          <h1 id="hero-title">Good company. Better hats.</h1>
          <p className="hero__line">For women who bring their own style to the course.</p>
        </div>
      </section>

      {site.dropMode && (
        <section id="waitlist" className="section section--paper2">
          <div className="container" style={{ maxWidth: 720, textAlign: 'center' }}>
            <h2>{site.dropDate ? `The first drop lands ${site.dropDate}.` : 'The first drop is almost here.'}</h2>
            <p className="lead">Join the list for 24 hours of early access and first pick of every color.</p>
            <EmailCapture source="hero" cta="Save my spot" showPhone successText="You're on the list. We'll email you the moment it drops." />
            <p className="consent">One email when it drops. No spam.</p>
          </div>
        </section>
      )}

      {/* 2. Best sellers */}
      <section className="section">
        <div className="container">
          <div className="section-head" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', gap: 16, maxWidth: 'none', flexWrap: 'wrap' }}>
            <div>
              <span className="eyebrow">Best sellers</span>
              <h2>Start with these</h2>
            </div>
            <Link href="/collections/all" className="link link--cta">Shop all {productsIn('all').length} hats →</Link>
          </div>
          <div className="grid grid--4">
            {bestSellers().map((p, i) => (
              <ProductCard key={p.handle} product={p} priority={i < 2} />
            ))}
          </div>
        </div>
      </section>

      {/* 3. Shop by what matters */}
      <section className="section section--tight">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Find your hat</span>
            <h2>Shop by what matters to you</h2>
          </div>
          <div className="grid grid--3">
            <Link href="/collections/ponytail-caps" className="tile-link">
              <Image src={media.ponytailBack.src} alt="" width={media.ponytailBack.width} height={media.ponytailBack.height} sizes="(min-width: 900px) 33vw, 50vw" />
              <span>Ponytail caps →</span>
            </Link>
            <Link href="/collections/performance" className="tile-link">
              <Image src={media.bucketOnHead.src} alt="" width={media.bucketOnHead.width} height={media.bucketOnHead.height} sizes="(min-width: 900px) 33vw, 50vw" />
              <span>UPF 50+ performance →</span>
            </Link>
            <Link href="/collections/embroidered" className="tile-link" style={{ gridColumn: 'span 1' }}>
              <Image src={media.flagshipOnHead.src} alt="" width={media.flagshipOnHead.width} height={media.flagshipOnHead.height} sizes="(min-width: 900px) 33vw, 50vw" />
              <span>Embroidered classics →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 4. Why it's better (problem + solution) */}
      <section className="section section--paper2">
        <div className="container">
          <div className="split">
            <div>
              <span className="eyebrow">Why Bogey Baby</span>
              <h2>Not shrunk. Not pinked. Drawn for us.</h2>
              <p className="lead" style={{ marginTop: 16 }}>
                Most golf hats are men&apos;s hats in smaller boxes, plus one pink one. We started over, with a golfer who looks like us and hats chosen for how women actually play.
              </p>
            </div>
            <div className="media-frame">
              <Image src={media.groupTee.src} alt="Four women golfers in Bogey Baby hats laughing on the first tee" width={media.groupTee.width} height={media.groupTee.height} sizes="(min-width: 900px) 50vw, 100vw" />
            </div>
          </div>
          <div style={{ marginTop: 48 }}>
            <FeatureRow
              items={[
                { icon: 'ponytail', title: 'Room for your ponytail', text: `${ponytailCount} of our caps have a ponytail opening, so your hat works around your hair.` },
                { icon: 'smallfit', title: 'A true small fit', text: 'The Small Fit Performance Cap is made for smaller heads, so the brim sits right.' },
                { icon: 'sun', title: 'UPF 50+ for sunny rounds', text: 'Our performance caps and bucket hat are rated UPF 50+.' },
                { icon: 'needle', title: 'Our golfer, stitched', text: 'Embroidered classics carry her in thread, not print, so she lasts.' },
              ]}
            />
          </div>
        </div>
      </section>

      {/* 5. Flagship spotlight */}
      <section className="section">
        <div className="container split split--reverse">
          <div className="media-frame">
            <Image src={flagship.colors[0].image.src} alt={flagship.colors[0].image.alt} width={flagship.colors[0].image.width} height={flagship.colors[0].image.height} sizes="(min-width: 900px) 50vw, 100vw" />
          </div>
          <div>
            <span className="badge">The one that started it</span>
            <h2 style={{ marginTop: 14 }}>{flagship.title}</h2>
            <p className="lead" style={{ marginTop: 14 }}>{flagship.description}</p>
            <ul className="check-list" style={{ margin: '20px 0 26px' }}>
              {benefitBullets(flagship).map((b) => (
                <li key={b.title}><Icon name="check" /><span><strong>{b.title}.</strong> {b.text}</span></li>
              ))}
            </ul>
            <div className="btn-row">
              <Link href="/products/cream-rope-cap" className="btn">{site.dropMode ? 'See the details' : `Shop it · ${money(flagship.price)}`}</Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Bundle promo (offer) */}
      {!site.dropMode && (
        <section className="section section--pine">
          <div className="container split">
            <div className="media-frame">
              <Image src={media.cartFriends.src} alt="Two friends in Cream Rope Caps laugh beside a golf cart" width={media.cartFriends.width} height={media.cartFriends.height} sizes="(min-width: 900px) 50vw, 100vw" />
            </div>
            <div>
              <span className="badge">{pair.badge}</span>
              <h2 style={{ marginTop: 14 }}>Bring your golf buddy.</h2>
              <p className="lead" style={{ marginTop: 14 }}>
                Save {pair.percentOff}% on any 2 hats and {four.percentOff}% on 3 or more. One for you, one for whoever makes you book the next tee time. Mix any styles and colors.
              </p>
              <div className="btn-row" style={{ marginTop: 22 }}>
                <Link href="/pages/golf-buddy" className="btn btn--cream">Get the Golf Buddy Pair <Icon name="arrow" width={20} /></Link>
              </div>
              <TrustLine light />
            </div>
          </div>
        </section>
      )}

      {/* 7. Good company (community) */}
      <section className="section">
        <div className="container">
          <div className="section-head section-head--center">
            <span className="eyebrow">Good company</span>
            <h2>Made for the whole group</h2>
            <p className="lead" style={{ marginTop: 12 }}>Range days, league nights, girls&apos; trips and the 19th hole. Brand new this season: tag your first round and tell us how it fits.</p>
          </div>
          <div className="grid grid--3">
            {[media.range, media.nineteenth, media.visorOnHead].map((m) => (
              <div className="media-frame" key={m.src} style={{ aspectRatio: '4 / 5' }}>
                <Image src={m.src} alt={m.alt} width={m.width} height={m.height} sizes="(min-width: 900px) 33vw, 50vw" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Our story (authority) */}
      <section className="section section--paper2">
        <div className="container split">
          <div style={{ display: 'grid', placeItems: 'center' }}>
            <Image src="/brand/golfer-badge-384.webp" alt="The Bogey Baby golfer badge" width={384} height={384} style={{ width: 'min(320px, 70vw)' }} />
          </div>
          <div>
            <span className="eyebrow">Our story</span>
            <h2>Made for the people we want to see more of on the course.</h2>
            <p className="lead" style={{ marginTop: 14 }}>
              We center women and Black golfers, from the first bucket at the range to the last tee time of the day. Our golfer is caught in her follow-through, in sunglasses and a green striped sweater, and she sets the colors for everything we make: pine, cream and old gold.
            </p>
            <Link href="/pages/about-us" className="link link--cta">Read our story →</Link>
          </div>
        </div>
      </section>

      {/* 9. Final CTA + mini FAQ */}
      <section className="section">
        <div className="container split">
          <div>
            <h2>Good rounds start here.</h2>
            <p className="lead" style={{ marginTop: 14 }}>Early tee times, long lunches, and the friends who make you book the next round before you&apos;ve finished this one.</p>
            <div className="btn-row" style={{ marginTop: 20 }}>
              <Link href="/collections/all" className="btn">Join the good company <Icon name="arrow" width={20} /></Link>
            </div>
            <TrustLine />
          </div>
          <div className="accordion" style={{ marginTop: 0 }}>
            <details>
              <summary>Will it fit my head?</summary>
              <div className="acc-body">Most of our caps adjust with a strap or snapback, and the Small Fit Performance Cap is made for smaller heads. Not sure? Exchanges are free within 30 days. See the <Link className="link" href="/pages/fit-guide">Fit Guide</Link>.</div>
            </details>
            <details>
              <summary>Can I wear a ponytail?</summary>
              <div className="acc-body">Yes. Five of our caps have a ponytail opening: the Front Nine, Range Day, Cart Path, Turn Cord and Back Nine caps.</div>
            </details>
            <details>
              <summary>How fast does it ship?</summary>
              <div className="acc-body">Every hat is made to order and ships within 10 business days. US shipping is free on every order.</div>
            </details>
            <details>
              <summary>What if I don&apos;t love it?</summary>
              <div className="acc-body">Swap the fit for free, or return it within 30 days. <Link className="link" href="/pages/shipping-returns">Shipping &amp; Returns</Link></div>
            </details>
          </div>
        </div>
      </section>
    </>
  );
}
