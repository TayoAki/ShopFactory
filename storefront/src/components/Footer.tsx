import {CookieSettingsButton} from './CookieBanner';
import Image from 'next/image';
import Link from 'next/link';
import { EmailCapture } from './EmailCapture';

export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div>
            <div className="footer__brand">
              <Image src="/brand/golfer-badge-192.webp" alt="" width={64} height={64} />
              <Image src="/brand/wordmark-cream-300.webp" alt="Bogey Baby" width={180} height={32} />
            </div>
            <p>Golf hats for every round, made for women golfers and the friends who play with them.</p>
            <p className="small" style={{ fontWeight: 700, marginBottom: 8 }}>Get new colors before anyone else</p>
            <EmailCapture source="footer" cta="Join" />
          </div>
          <div>
            <h2>Shop</h2>
            <ul>
              <li><Link href="/collections/all">All hats</Link></li>
              <li><Link href="/collections/embroidered">Embroidered classics</Link></li>
              <li><Link href="/collections/performance">Performance</Link></li>
              <li><Link href="/collections/ponytail-caps">Ponytail caps</Link></li>
              <li><Link href="/pages/golf-buddy">Golf Buddy Pair</Link></li>
            </ul>
          </div>
          <div>
            <h2>Help</h2>
            <ul>
              <li><Link href="/pages/fit-guide">Fit Guide</Link></li>
              <li><Link href="/pages/faq">FAQ</Link></li>
              <li><Link href="/pages/shipping-returns">Shipping &amp; Returns</Link></li>
              <li><Link href="/pages/contact">Request a return</Link></li>
              <li><Link href="/pages/contact">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h2>About</h2>
            <ul>
              <li><Link href="/pages/about-us">Our Story</Link></li>
              <li><Link href="/journal">The Journal</Link></li>
              <li><Link href="/pages/reviews">Reviews</Link></li>
            </ul>
          </div>
        </div>
        <div className="footer__bottom">
          <span>© {new Date().getFullYear()} Bogey Baby</span>
          <ul>
            <li><Link href="/pages/privacy">Privacy</Link></li>
            <li><CookieSettingsButton /></li>
            <li><Link href="/pages/terms">Terms</Link></li>
            <li><Link href="/pages/accessibility">Accessibility</Link></li>
            <li><Link href="/pages/privacy-choices">Your Privacy Choices</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
