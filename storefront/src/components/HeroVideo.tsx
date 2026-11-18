'use client';

import { useEffect, useRef, useState } from 'react';

type Cut = { mp4: string; webm: string };

/**
 * Background video for the homepage hero. The poster image underneath is rendered on the server and stays the
 * largest paint; the video loads after the page has finished loading and fades in once it is actually playing.
 * Phones get a 9:16 cut and desktops a 4:3 cut, each reframed shot by shot. Skipped for reduced motion and
 * Save-Data. A pause button is always shown while the video is in use (WCAG 2.2.2).
 */
export function HeroVideo({ mobile, desktop }: { mobile: Cut; desktop: Cut }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [cut, setCut] = useState<Cut | null>(null);
  const [visible, setVisible] = useState(false);
  const [paused, setPaused] = useState(false);

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
    v.play().catch(() => setPaused(true));
  }, [cut]);

  if (!cut) return null;

  const toggle = () => {
    const v = ref.current;
    if (!v) return;
    if (v.paused) {
      v.play().catch(() => undefined);
      setPaused(false);
    } else {
      v.pause();
      setPaused(true);
    }
  };

  return (
    <>
      <video
        ref={ref}
        className={`hero__video${visible ? ' is-playing' : ''}`}
        muted
        loop
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
      <button type="button" className="hero__pause" onClick={toggle} aria-label={paused ? 'Play background video' : 'Pause background video'}>
        {paused ? (
          <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M8 5.5v13l10.5-6.5z" fill="currentColor" /></svg>
        ) : (
          <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" fill="currentColor" /></svg>
        )}
      </button>
    </>
  );
}
