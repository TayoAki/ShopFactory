'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useCart } from '@/lib/cart';
import { site } from '@/lib/site';
import { Icon } from './Icon';

const shopLinks = [
  { href: '/collections/all', label: 'Shop all hats' },
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

export function Header() {
  const cart = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const megaRef = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    setMenuOpen(false);
    if (megaRef.current) megaRef.current.open = false;
  }, [pathname]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenuOpen(false);
        if (megaRef.current) megaRef.current.open = false;
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <>
      <header className="header">
        <div className="container header__bar">
          <div className="header__left">
            <button className="icon-btn menu-toggle" aria-label="Open menu" aria-expanded={menuOpen} onClick={() => setMenuOpen(true)}>
              <Icon name="menu" />
            </button>
            <nav className="nav" aria-label="Main">
              <details className="mega" ref={megaRef}>
                <summary>Shop</summary>
                <div className="mega__panel">
                  <div className="mega__col">
                    <h4>Shop</h4>
                    <ul>{shopLinks.map((l) => <li key={l.href}><Link href={l.href}>{l.label}</Link></li>)}</ul>
                  </div>
                  <div className="mega__col">
                    <h4>By style</h4>
                    <ul>{styleLinks.map((l) => <li key={l.href}><Link href={l.href}>{l.label}</Link></li>)}</ul>
                  </div>
                  <Link href="/pages/golf-buddy" className="mega__promo">
                    <Image src="/images/lifestyle/cart-friends.webp" alt="" width={1350} height={900} sizes="240px" style={{ borderRadius: 8, width: '100%', height: 'auto' }} />
                    <strong>Bring your golf buddy</strong>
                    <span>Save 10% on 2 hats, 15% on 3 or more →</span>
                  </Link>
                </div>
              </details>
              <Link href="/products/cream-rope-cap">The Cream Rope Cap</Link>
            </nav>
          </div>
          <Link href="/" className="header__brand" aria-label="Bogey Baby home">
            <Image className="header__badge" src="/brand/golfer-badge-192.webp" alt="" width={192} height={192} priority />
            <Image className="header__wordmark header__wordmark--mobile" src="/brand/wordmark-embroidered.webp" alt="Bogey Baby" width={1200} height={164} sizes="160px" priority />
          </Link>
          <div className="header__right">
            <nav className="nav" aria-label="Help">
              <Link href="/pages/fit-guide">Fit Guide</Link>
              <Link href="/pages/about-us">Our Story</Link>
            </nav>
            <Link href="/search" className="icon-btn" aria-label="Search">
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
          <Image className="wordmark-embroidered" src="/brand/wordmark-embroidered.webp" alt="Bogey Baby" width={1200} height={164} sizes="150px" style={{ width: 150, height: 'auto' }} />
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
