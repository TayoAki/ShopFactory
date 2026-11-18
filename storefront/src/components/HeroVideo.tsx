'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

type Cut = { mp4: string; webm: string; end: string };

const SEEN_KEY = 'bb_hero_seen';

/**
 * The homepage hero film. It plays once, with sound when the browser allows it, and the hero copy (hidden by
 * `data-intro="pending"` on the section) fades in when it ends.
 *
 * - Sound is on by default. Browsers refuse autoplay with sound until a visitor has interacted with the site; if
 *   the unmuted start is refused, the film plays muted and the sound comes on with the visitor's first tap, click
 *   or key press anywhere on the page. A speaker icon toggles it either way.
 * - The copy shows straight away if motion is reduced, Save-Data is on, the film can't play, it hasn't started
 *   within 6 seconds, or the visitor already watched it this session (they see its final frame instead).
 * - The server-rendered poster underneath stays the largest paint.
 */
export function HeroVideo({ heroId, mobile, desktop }: { heroId: string; mobile: Cut; desktop: Cut }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [cut, setCut] = useState<Cut | null>(null);
  const [still, setStill] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);
  const [muted, setMuted] = useState(true);
  const [ended, setEnded] = useState(false);
  const timer = useRef<number | undefined>(undefined);
  const userChose = useRef(false);

  const reveal = useCallback(() => {
    document.getElementById(heroId)?.setAttribute('data-intro', 'done');
  }, [heroId]);

  useEffect(() => {
    const isMobile = window.matchMedia('(max-width: 899px)').matches;
    const chosen = isMobile ? mobile : desktop;
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || conn?.saveData) {
      reveal();
      return;
    }
    let seen = false;
    try {
      seen = sessionStorage.getItem(SEEN_KEY) === '1';
    } catch {}
    if (seen) {
      setStill(chosen.end);
      reveal();
      return;
    }
    setCut(chosen);
    timer.current = window.setTimeout(reveal, 6000);
    return () => window.clearTimeout(timer.current);
  }, [mobile, desktop, reveal]);

  useEffect(() => {
    const v = ref.current;
    if (!v || !cut) return;
    v.muted = false;
    v.play()
      .then(() => setMuted(false))
      .catch(() => {
        v.muted = true;
        setMuted(true);
        v.play().catch(() => {
          setCut(null);
          reveal();
        });
      });
  }, [cut, reveal]);

  // Sound on with the first real interaction, if the browser started the film muted. Only events that carry user
  // activation may unmute: unmuting without it makes Chrome pause the film.
  useEffect(() => {
    if (!cut) return;
    const events = ['click', 'keydown', 'touchend'] as const;
    const stop = () => events.forEach((n) => document.removeEventListener(n, onGesture, true));
    function onGesture(e: Event) {
      const v = ref.current;
      if (!v || v.ended || userChose.current) return stop();
      if ((e.target as Element | null)?.closest?.('.hero__sound')) return; // the toggle handles itself
      const activation = (navigator as Navigator & { userActivation?: { isActive: boolean } }).userActivation;
      if (activation ? !activation.isActive : e.type === 'touchend') return;
      if (v.muted) {
        v.muted = false;
        setMuted(false);
        if (v.paused) v.play().catch(() => undefined);
      }
      stop();
    }
    events.forEach((n) => document.addEventListener(n, onGesture, true));
    return stop;
  }, [cut]);

  if (still) return <img className="hero__video is-playing" src={still} alt="" aria-hidden="true" />;
  if (!cut) return null;

  const toggleSound = () => {
    const v = ref.current;
    if (!v) return;
    userChose.current = true;
    v.muted = !v.muted;
    setMuted(v.muted);
    if (v.paused && !v.ended) v.play().catch(() => undefined);
  };

  return (
    <>
      <video
        ref={ref}
        className={`hero__video${visible ? ' is-playing' : ''}`}
        playsInline
        preload="auto"
        aria-hidden="true"
        tabIndex={-1}
        onPlaying={() => {
          setVisible(true);
          window.clearTimeout(timer.current);
        }}
        onEnded={() => {
          setEnded(true);
          reveal();
          try {
            sessionStorage.setItem(SEEN_KEY, '1');
          } catch {}
        }}
        onError={reveal}
      >
        <source src={cut.webm} type="video/webm" />
        <source src={cut.mp4} type="video/mp4" />
      </video>
      {visible && !ended && (
        <button type="button" className="hero__sound" onClick={toggleSound} aria-label={muted ? 'Turn sound on' : 'Turn sound off'}>
          {muted ? (
            <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M4 9h4l5-4v14l-5-4H4z" fill="currentColor" /><path d="M17 9l4 6M21 9l-4 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
          ) : (
            <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M4 9h4l5-4v14l-5-4H4z" fill="currentColor" /><path d="M16.5 8.5a5 5 0 0 1 0 7M19 6a8.5 8.5 0 0 1 0 12" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" /></svg>
          )}
        </button>
      )}
    </>
  );
}
