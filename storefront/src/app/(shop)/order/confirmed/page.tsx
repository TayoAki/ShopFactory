import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { media } from '@/data/media';
import { ConfirmedDetails } from './ConfirmedDetails';

export const metadata: Metadata = { title: 'Order confirmed', robots: { index: false } };

export default function OrderConfirmedPage() {
  return (
    <section className="section">
      <div className="container split">
        <div>
          <ConfirmedDetails />
          <div className="panel" style={{ marginTop: 20 }}>
            <h2 className="h3">A fit tip for when it arrives</h2>
            <p style={{ margin: '8px 0 0' }}>Adjust the strap before your first round. Need another fit? Contact us within 30 days of ordering; keep the hat unused with tags and packaging.</p>
          </div>
          <div className="btn-row" style={{ marginTop: 22 }}>
            <Link href="/collections/all" className="btn">Keep shopping</Link>
            <Link href="/pages/fit-guide" className="btn btn--secondary">Fit Guide</Link>
          </div>
        </div>
        <div className="media-frame">
          <Image src={media.celebrate.src} alt={media.celebrate.alt} width={media.celebrate.width} height={media.celebrate.height} sizes="(min-width: 900px) 50vw, 100vw" />
        </div>
      </div>
    </section>
  );
}
