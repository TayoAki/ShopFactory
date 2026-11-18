import Image from 'next/image';
import Link from 'next/link';
import { CartDrawer } from '@/components/CartDrawer';
import { Toast } from '@/components/Toast';
import { LandingBag } from './LandingBag';

/** Minimal chrome for ad landing pages (listicle, offer page): no navigation to pull visitors away. */
export default function LandingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className="header">
        <div className="container minimal-header">
          <Link href="/" aria-label="Bogey Baby home">
            <Image className="wordmark-embroidered" src="/brand/wordmark-embroidered.webp" alt="Bogey Baby" width={1200} height={164} sizes="170px" style={{ width: 170, height: 'auto' }} priority />
          </Link>
          <LandingBag />
        </div>
      </header>
      <main id="main">{children}</main>
      <footer className="footer" style={{ paddingTop: 28 }}>
        <div className="container footer__bottom" style={{ marginTop: 0, borderTop: 0 }}>
          <span>© {new Date().getFullYear()} Bogey Baby</span>
          <ul>
            <li><Link href="/pages/shipping-returns">Shipping &amp; Returns</Link></li>
            <li><Link href="/pages/privacy">Privacy</Link></li>
            <li><Link href="/pages/terms">Terms</Link></li>
            <li><Link href="/pages/privacy-choices">Your Privacy Choices</Link></li>
          </ul>
        </div>
      </footer>
      <CartDrawer />
      <Toast />
    </>
  );
}
