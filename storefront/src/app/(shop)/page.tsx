import {JournalBrowser} from '@/components/JournalBrowser';
import Image from 'next/image';
import Link from 'next/link';
import { ArtImage } from '@/components/ArtImage';
import { EmailCapture } from '@/components/EmailCapture';
import { FeatureRow } from '@/components/FeatureRow';
import { HeroVideo } from '@/components/HeroVideo';
import { Icon } from '@/components/Icon';
import { HomeProductRail } from '@/components/HomeProductRail';
import { TrustLine } from '@/components/TrustLine';
import { media } from '@/data/media';
import { journal } from '@/data/journal';
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
      <section id="hero" className="hero" aria-labelledby="hero-title">
        <div className="hero__media">
          <ArtImage mobile={media.heroVideoMobile} desktop={media.heroVideoDesktop} alt={media.heroVideoMobile.alt} priority />
          <HeroVideo
            mobile={{ webm: '/video/see-you-out-there-natural-mobile.webm', mp4: '/video/see-you-out-there-natural-mobile.mp4' }}
            desktop={{ webm: '/video/see-you-out-there-natural-desktop.webm', mp4: '/video/see-you-out-there-natural-desktop.mp4' }}
          />
        </div>
        <div className="hero__content container">
          <h1 id="hero-title" className="hero__headline">
            <Image src="/brand/hero-headline-stitched.webp" alt="Good company. Better hats." width={1400} height={405} sizes="(min-width: 900px) 640px, 90vw" loading="eager" />
          </h1>
          <p className="hero__line">For women who bring their own style to the course.</p>
          <div className="hero__actions"><Link href="/custom-rope-hats" className="hero__custom" data-umami-event="home_custom_hats">Add your name or logo →</Link></div>
        </div>
      </section>

      <HomeProductRail products={bestSellers()} />

      {site.dropMode && (
        <section id="waitlist" className="section section--paper2">
          <div className="container" style={{ maxWidth: 720, textAlign: 'center' }}>
            <h2>{site.dropDate ? `The first drop lands ${site.dropDate}.` : 'The first drop is almost here.'}</h2>
            <p className="lead">Join the list for 24 hours of early access and first pick of every color.</p>
            <EmailCapture source="hero" cta="Save my spot" />
            <p className="consent">One email when it drops. No spam.</p>
          </div>
        </section>
      )}

      {/* 3. Shop by what matters */}
      <section className="section section--tight">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Find your hat</span>
            <h2>Functional Fashion</h2>
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

      <section className="fit-finder" aria-labelledby="fit-finder-title">
        <div className="fit-finder__image"><Image src="/images/editorial/find-your-fit.webp" alt="Cream and sage Bogey Baby hats beside a measuring tape" width={1200} height={900} sizes="(min-width:900px) 50vw, 100vw" /></div>
        <div className="fit-finder__content"><Image src="/brand/golfer-badge-192.webp" alt="" width={96} height={96} /><span className="eyebrow">Made to feel like you</span><h2 id="fit-finder-title">Find your fit.</h2><p>Small fit or standard? Hair up or down? Three quick questions, and we’ll point you toward your next favorite golf hat.</p><Link href="/pages/fit-quiz" className="btn" data-umami-event="home_fit_quiz">Take the quiz →</Link></div>
      </section>

      {/* 4. Why it's better (problem + solution) */}
      <section className="section section--paper2">
        <div className="container">
          <div className="split">
            <div>
              <span className="eyebrow">Why Bogey Baby</span>
              <h2>Not shrunk. Not pinked. Drawn for us.</h2>
              <p className="lead" style={{ marginTop: 16 }}>
                Most golf hats are men&apos;s hats in smaller boxes, plus one pink one. We started over.
              </p>
            </div>
            <div className="media-frame">
              <Image src={media.homeCartOverTheShoulder.src} alt={media.homeCartOverTheShoulder.alt} width={media.homeCartOverTheShoulder.width} height={media.homeCartOverTheShoulder.height} sizes="(min-width: 900px) 50vw, 100vw" />
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
              <Link href="/products/cream-rope-cap" className="btn" data-umami-event="home_shop_flagship">{site.dropMode ? 'See the details' : `Shop it · ${money(flagship.price)}`}</Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Bundle promo (offer) */}
      {!site.dropMode && (
        <section className="section section--pine">
          <div className="container split">
            <div className="media-frame">
              <Image src={media.homeGoodCompany.src} alt={media.homeGoodCompany.alt} width={media.homeGoodCompany.width} height={media.homeGoodCompany.height} sizes="(min-width: 900px) 50vw, 100vw" />
            </div>
            <div>
              <span className="badge">{pair.badge}</span>
              <h2 style={{ marginTop: 14 }}>Bring your golf buddy.</h2>
              <p className="lead" style={{ marginTop: 14 }}>
                Save {pair.percentOff}% on any 2 hats and {four.percentOff}% on 3 or more. One for you, one for whoever makes you book the next tee time. Mix any styles and colors.
              </p>
              <div className="btn-row" style={{ marginTop: 22 }}>
                <Link href="/pages/golf-buddy" className="btn btn--cream" data-umami-event="home_golf_buddy">Get the Golf Buddy Pair <Icon name="arrow" width={20} /></Link>
              </div>
              <TrustLine light />
            </div>
          </div>
        </section>
      )}

      <section className="section" aria-labelledby="journal-title">
        <div className="container">
          <div className="releases__head"><h2 id="journal-title">The Bogey Baby Journal</h2><Link href="/journal" className="link link--cta">All stories →</Link></div>
          <JournalBrowser posts={journal}/>
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
              <div className="acc-body">Most of our caps adjust with a strap or snapback, and the Small Fit Performance Cap is made for smaller heads. Not sure? See our 30-day return policy for eligibility and fees. See the <Link className="link" href="/pages/fit-guide">Fit Guide</Link>.</div>
            </details>
            <details>
              <summary>Can I wear a ponytail?</summary>
              <div className="acc-body">Yes. Five of our caps have a ponytail opening: the Front Nine, Range Day, Cart Path, Turn Cord and Back Nine caps.</div>
            </details>
            <details>
              <summary>How fast does it ship?</summary>
              <div className="acc-body">Every hat is made to order and ships within 10 business days. Standard US shipping is free on orders of $120+ after discounts.</div>
            </details>
            <details>
              <summary>What if I don&apos;t love it?</summary>
              <div className="acc-body">Request a return within 30 days of ordering. Items must be unused with tags and packaging; refunds have a $5 fee. <Link className="link" href="/pages/shipping-returns">Shipping &amp; Returns</Link></div>
            </details>
          </div>
        </div>
      </section>
    </>
  );
}
