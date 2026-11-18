'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { track } from '@/lib/analytics';

/** Tracks 25/50/75/100% scroll depth and shows a sticky mobile CTA once the reader is past the hero. */
export function ScrollDepth({ stickyText, stickyHref, stickyCta }: { stickyText?: string; stickyHref?: string; stickyCta?: string }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const hit = new Set<number>();
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const pct = max > 0 ? (window.scrollY / max) * 100 : 100;
      for (const m of [25, 50, 75, 100]) {
        if (pct >= m - 1 && !hit.has(m)) {
          hit.add(m);
          track('scroll', { percent: m });
        }
      }
      setShow(window.scrollY > window.innerHeight * 0.9 && pct < 96);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  if (!stickyHref) return null;
  return (
    <div className="sticky-atc" data-show={show} aria-hidden={!show}>
      <div className="sticky-atc__info">
        <strong>{stickyText}</strong>
        <span>Free shipping · Free fit exchanges</span>
      </div>
      <Link href={stickyHref} className="btn btn--sm" tabIndex={show ? 0 : -1}>
        {stickyCta}
      </Link>
    </div>
  );
}
