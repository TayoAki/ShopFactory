'use client';

import { useEffect, useRef, useState } from 'react';

type Cut = { mp4: string; webm: string };

/** Muted background film; the server-rendered headline and poster are always visible. */
export function HeroVideo({ mobile, desktop }: { mobile: Cut; desktop: Cut }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [cut, setCut] = useState<Cut | null>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || conn?.saveData) return;
    setCut(window.matchMedia('(max-width: 899px)').matches ? mobile : desktop);
  }, [mobile.mp4, mobile.webm, desktop.mp4, desktop.webm]); // Choose one download for the initial viewport.

  useEffect(() => {
    const video = ref.current;
    if (!video || !cut) return;
    video.muted = true;
    video.play().catch(() => setVisible(false));
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) video.play().catch(() => undefined);
      else video.pause();
    });
    observer.observe(video);
    return () => observer.disconnect();
  }, [cut]);

  if (!cut) return null;
  return (
    <video ref={ref} className={`hero__video${visible ? ' is-playing' : ''}`} autoPlay muted loop playsInline preload="metadata" aria-hidden="true" tabIndex={-1} onPlaying={() => setVisible(true)} onError={() => setVisible(false)}>
      <source src={cut.webm} type="video/webm" />
      <source src={cut.mp4} type="video/mp4" />
    </video>
  );
}
