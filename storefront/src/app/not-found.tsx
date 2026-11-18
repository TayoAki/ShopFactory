import Image from 'next/image';
import Link from 'next/link';
import { CartDrawer } from '@/components/CartDrawer';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { ProductCard } from '@/components/ProductCard';
import { media } from '@/data/media';
import { bestSellers } from '@/lib/catalog';

export default function NotFound() {
  return (
    <>
      <Header />
      <main id="main">
        <section className="section">
          <div className="container split">
            <div className="media-frame">
              <Image src={media.lostBall.src} alt={media.lostBall.alt} width={media.lostBall.width} height={media.lostBall.height} sizes="(min-width: 900px) 50vw, 100vw" priority />
            </div>
            <div>
              <span className="eyebrow">404</span>
              <h1>Lost ball.</h1>
              <p className="lead" style={{ marginTop: 14 }}>This page went out of bounds. Let&apos;s get you back on the fairway.</p>
              <div className="btn-row" style={{ marginTop: 18 }}>
                <Link href="/collections/all" className="btn">Shop hats</Link>
                <Link href="/" className="btn btn--secondary">Go home</Link>
              </div>
            </div>
          </div>
        </section>
        <section className="section section--tight">
          <div className="container grid grid--4">
            {bestSellers().map((p) => <ProductCard key={p.handle} product={p} />)}
          </div>
        </section>
      </main>
      <Footer />
      <CartDrawer />
    </>
  );
}
