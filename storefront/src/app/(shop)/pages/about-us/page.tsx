import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { FeatureRow } from '@/components/FeatureRow';
import { TrustLine } from '@/components/TrustLine';
import { media } from '@/data/media';

export const metadata: Metadata = { title: 'Our Story', description: 'Bogey Baby makes golf hats for the people we want to see more of on the course: women and Black golfers, from the first bucket at the range to the last tee time.' };

export default function AboutPage() {
  return (
    <>
      <section className="section">
        <div className="container split">
          <div>
            <span className="eyebrow">Our story</span>
            <h1>Made for the people we want to see more of on the course.</h1>
            <p className="lead" style={{ marginTop: 16 }}>We center women and Black golfers, from the first bucket at the range to the last tee time of the day.</p>
          </div>
          <div className="media-frame">
            <Image src={media.groupTee.src} alt={media.groupTee.alt} width={media.groupTee.width} height={media.groupTee.height} sizes="(min-width: 900px) 50vw, 100vw" priority />
          </div>
        </div>
      </section>

      <section className="section section--paper2">
        <div className="container split split--reverse">
          <div style={{ display: 'grid', placeItems: 'center' }}>
            <Image src="/brand/golfer-badge-384.webp" alt="The Bogey Baby golfer badge" width={384} height={384} style={{ width: 'min(340px, 72vw)' }} />
          </div>
          <div className="prose">
            <h2 style={{ marginTop: 0 }}>Meet our golfer</h2>
            <p>Our golfer is caught in her follow-through, in sunglasses and a green striped sweater. Her badge sets the colors for the brand: pine, cream and old gold.</p>
            <p>Most golf hats for women are men&apos;s hats in smaller boxes, plus one pink one. We wanted the opposite: a golfer who looks like the women we play with, on hats chosen for how we actually play, with ponytail openings, a true small fit and UPF 50+ options.</p>
            <p>We called it Bogey Baby because nobody plays pretty every hole. You can still look like you belong.</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head"><h2>What we promise</h2></div>
          <FeatureRow
            cols={3}
            items={[
              { icon: 'needle', title: 'Made for us', text: 'A golfer who looks like us, on hats picked for women who play.' },
              { icon: 'smallfit', title: 'Built to fit', text: 'Ponytail openings, a true small fit and adjustable closures.' },
              { icon: 'calendar', title: 'Know your fit', text: '30-day returns on unused hats. Refund fee applies.' },
            ]}
          />
        </div>
      </section>

      <section className="section section--pine">
        <div className="container split">
          <div className="media-frame">
            <Image src={media.celebrate.src} alt={media.celebrate.alt} width={media.celebrate.width} height={media.celebrate.height} sizes="(min-width: 900px) 50vw, 100vw" />
          </div>
          <div>
            <h2>Good company.</h2>
            <p className="lead" style={{ marginTop: 12 }}>Range days, league nights, girls&apos; trips and the 19th hole. Tag your first round in a Bogey Baby hat; we&apos;d love to see it.</p>
            <Link href="/collections/all" className="btn btn--cream" style={{ marginTop: 18 }}>Shop the first drop</Link>
            <TrustLine light />
          </div>
        </div>
      </section>
    </>
  );
}
