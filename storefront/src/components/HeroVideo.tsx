'use client';

import { useEffect, useRef, useState } from 'react';

type Cut = { mp4: string; webm: string };

/**
 * Background video for the homepage hero. The poster image underneath is rendered on the server and stays the
 * largest paint; the video loads after the page has finished loading, fades in once it is actually playing,
 * plays once and stops on its last frame. Phones get a 9:16 cut and desktops a 4:3 cut, each reframed shot by
 * shot. Skipped for reduced motion and Save-Data.
 */
export function HeroVideo({ mobile, desktop }: { mobile: Cut; desktop: Cut }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [cut, setCut] = useState<Cut | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    if (conn?.saveData) return;
    const pick = () => setCut(window.matchMedia('(max-width: 899px)').matches ? mobile : desktop);
    if (document.readyState === 'complete') pick();
    else {
      window.addEventListener('load', pick, { once: true });
      return () => window.removeEventListener('load', pick);
    }
  }, [mobile, desktop]);

  useEffect(() => {
    const v = ref.current;
    if (!v || !cut) return;
    v.muted = true;
    v.play().catch(() => undefined);
  }, [cut]);

  if (!cut) return null;

  return (
    <video
      ref={ref}
      className={`hero__video${visible ? ' is-playing' : ''}`}
      muted
      playsInline
      autoPlay
      preload="auto"
      aria-hidden="true"
      tabIndex={-1}
      onPlaying={() => setVisible(true)}
    >
      <source src={cut.webm} type="video/webm" />
      <source src={cut.mp4} type="video/mp4" />
    </video>
  );
}
