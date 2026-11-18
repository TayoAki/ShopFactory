'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useCart } from '@/lib/cart';
import { site } from '@/lib/site';
import { Icon } from './Icon';

const shopLinks = [
  { href: '/collections/all', label: 'Shop all hats' },
  { href: '/products/cream-rope-cap', label: 'The Cream Rope Cap' },
  { href: '/collections/embroidered', label: 'Embroidered classics' },
  { href: '/collections/performance', label: 'Performance (UPF 50+)' },
  { href: '/collections/ponytail-caps', label: 'Ponytail caps' },
];
const styleLinks = [
  { href: '/collections/caps', label: 'Caps' },
  { href: '/collections/rope-caps', label: 'Rope caps' },
  { href: '/collections/visors', label: 'Visors' },
  { href: '/collections/bucket-hats', label: 'Bucket hats' },
  { href: '/collections/beanies', label: 'Beanies' },
];

/**
 * Twill header with no text menu: the menu button (every screen size) opens the drawer with all the links.
 * Desktop: the crest patch sits in the middle, half on the bar and half hanging below it at the top of the page,
 * shrinking into the bar once the page scrolls. Phones: the embroidered BOGEY BABY wordmark in the middle; search lives in the drawer.
 */
export function Header() {
  const cart = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('keydown', onKey);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <>
      <header className={`header${scrolled ? ' is-scrolled' : ''}`}>
        <div className="container header__bar">
          <div className="header__left">
            <button className="icon-btn menu-toggle" aria-label="Open menu" aria-expanded={menuOpen} onClick={() => setMenuOpen(true)}>
              <Icon name="menu" />
            </button>
          </div>
          <Link href="/" className="header__brand" aria-label="Bogey Baby home">
            <Image className="header__badge" src="/brand/golfer-badge-384.webp" alt="" width={384} height={384} sizes="168px" priority />
            <Image className="header__wordmark header__wordmark--mobile" src="/brand/wordmark-embroidered.webp" alt="Bogey Baby" width={1400} height={191} sizes="230px" priority />
          </Link>
          <div className="header__right">
            <Link href="/search" className="icon-btn header__search" aria-label="Search">
              <Icon name="search" />
            </Link>
            <Link href="/account" className="icon-btn hide-mobile" aria-label="Account">
              <Icon name="user" />
            </Link>
            {!site.dropMode && (
              <button className="icon-btn" onClick={cart.open} aria-label={`Shopping bag, ${cart.count} ${cart.count === 1 ? 'item' : 'items'}`}>
                <Icon name="bag" />
                {cart.count > 0 && <span className="bag-count">{cart.count}</span>}
              </button>
            )}
          </div>
        </div>
      </header>

      <div className="overlay" data-open={menuOpen} onClick={() => setMenuOpen(false)} aria-hidden="true" />
      <aside className="drawer drawer--left" data-open={menuOpen} aria-label="Menu" aria-hidden={!menuOpen} inert={!menuOpen}>
        <div className="drawer__head">
          <Image className="wordmark-embroidered" src="/brand/wordmark-embroidered.webp" alt="Bogey Baby" width={1400} height={191} sizes="180px" style={{ width: 180, height: 'auto' }} />
          <button className="icon-btn" aria-label="Close menu" onClick={() => setMenuOpen(false)}>
            <Icon name="close" />
          </button>
        </div>
        <div className="drawer__body">
          <form action="/search" role="search" style={{ marginBottom: 12 }}>
            <label className="sr-only" htmlFor="menu-search">Search hats</label>
            <input id="menu-search" className="input" name="q" placeholder="Search hats" />
          </form>
          <ul className="mobile-nav">
            {shopLinks.map((l) => <li key={l.href}><Link href={l.href}>{l.label}<Icon name="chevron" width={18} /></Link></li>)}
            {styleLinks.map((l) => <li key={l.href} className="sub"><Link href={l.href}>{l.label}</Link></li>)}
            <li><Link href="/pages/golf-buddy">Bring your golf buddy<Icon name="chevron" width={18} /></Link></li>
            <li><Link href="/pages/fit-guide">Fit Guide<Icon name="chevron" width={18} /></Link></li>
            <li><Link href="/pages/reviews">Reviews<Icon name="chevron" width={18} /></Link></li>
            <li><Link href="/pages/about-us">Our Story<Icon name="chevron" width={18} /></Link></li>
            <li><Link href="/account">Account<Icon name="chevron" width={18} /></Link></li>
          </ul>
        </div>
        <div className="drawer__foot small">Free US shipping · Free fit exchanges · 30-day returns</div>
      </aside>
    </>
  );
}
