'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { site } from '@/lib/site';
import { bundleTiers } from '@/lib/pricing';

const pair = bundleTiers.find((t) => t.minQty === 2)!;
const messages = site.dropMode
  ? [{ text: site.dropDate ? `The first drop lands ${site.dropDate}. Join the list →` : 'The first drop is coming. Join the list →', href: '/#waitlist' }]
  : [
      { text: 'Free US shipping on orders $120+', href: '/pages/shipping-returns' },
      { text: '30-day returns; refund fee applies', href: '/pages/shipping-returns' },
      { text: `Bring your golf buddy: save ${pair.percentOff}% on 2 hats →`, href: '/pages/golf-buddy' },
    ];

export function AnnouncementBar() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused || messages.length < 2) return;
    const id = window.setInterval(() => setI((n) => (n + 1) % messages.length), 5000);
    return () => window.clearInterval(id);
  }, [paused]);
  const m = messages[i];
  return (
    <div className="announce" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocus={() => setPaused(true)} onBlur={() => setPaused(false)}>
      <Link href={m.href} aria-live="polite">
        {m.text}
      </Link>
    </div>
  );
}
