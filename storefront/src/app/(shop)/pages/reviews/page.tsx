import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { media } from '@/data/media';

export const metadata: Metadata = { title: 'Reviews', description: 'Reviews from verified Bogey Baby customers.' };

/** Reviews are shown only once they are real (plan: ratings appear at 10+ verified reviews). */
export default function ReviewsPage() {
  return (
    <section className="section">
      <div className="container split">
        <div>
          <span className="eyebrow">Reviews</span>
          <h1>Good company, coming soon.</h1>
          <p className="lead" style={{ marginTop: 14 }}>
            We&apos;re brand new this season, so our first reviews arrive with our first orders. Every review here will come from a verified buyer, tagged with head size, hair type and handicap so you can find golfers like you.
          </p>
          <p>Bought a hat? You&apos;ll get an email two weeks after delivery asking how it fits.</p>
          <div className="btn-row" style={{ marginTop: 18 }}>
            <Link href="/collections/all" className="btn">Be one of the first</Link>
          </div>
        </div>
        <div className="media-frame">
          <Image src={media.nineteenth.src} alt={media.nineteenth.alt} width={media.nineteenth.width} height={media.nineteenth.height} sizes="(min-width: 900px) 50vw, 100vw" />
        </div>
      </div>
    </section>
  );
}
