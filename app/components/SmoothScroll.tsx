'use client';

import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Navbar height offset — keep in sync with Navbar.tsx height: '80px'
const NAV_OFFSET = -88;

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  // Ref guard prevents double-init in React StrictMode (dev double-effect)
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // ── Guard: never create more than one instance ───────────────────────────
    if (lenisRef.current) return;

    // ── Single Lenis instance ────────────────────────────────────────────────
    // lerp mode: one continuous interpolation per frame, no fixed duration.
    // This is the stable pattern for Lenis + GSAP — do NOT mix lerp with duration.
    const lenis = new Lenis({
      lerp           : 0.08,   // smoothness (0 = instant, 1 = never arrives)
      touchMultiplier: 1.5,    // mobile feel
      infinite       : false,
    });

    lenisRef.current = lenis;

    // ── Sync Lenis → GSAP ScrollTrigger every frame ──────────────────────────
    // Must call ScrollTrigger.update() on the Lenis scroll event so pinning
    // and trigger calculations use Lenis's virtual scroll position, not the
    // delayed native scroll event.
    lenis.on('scroll', ScrollTrigger.update);

    // ── Drive Lenis from GSAP's ticker — one shared RAF loop ─────────────────
    // GSAP ticker time is in seconds; lenis.raf() expects milliseconds.
    // lagSmoothing(0) stops GSAP from "catching up" after the tab loses focus,
    // which would otherwise cause a sudden lurch when the user returns.
    const tickerFn = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tickerFn);
    gsap.ticker.lagSmoothing(0);

    // ── Custom event bus: lenis:scrollTo ─────────────────────────────────────
    // Components dispatch this instead of calling scrollIntoView or window.scrollTo,
    // keeping Lenis as the single scroll authority.
    //
    //   window.dispatchEvent(new CustomEvent('lenis:scrollTo', {
    //     detail: { target: el | '#id', offset?: number }
    //   }))
    const onScrollTo = (e: Event) => {
      const detail = (e as CustomEvent<{ target: string | HTMLElement; offset?: number }>).detail;
      lenis.scrollTo(detail.target as HTMLElement, {
        offset: detail.offset ?? NAV_OFFSET,
        lerp  : 0.08,
      });
    };
    window.addEventListener('lenis:scrollTo', onScrollTo);

    // ── Intercept <a href="#..."> clicks ─────────────────────────────────────
    // preventDefault stops the browser's native instant-jump;
    // Lenis handles the animated scroll to the target element.
    const onAnchorClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (!anchor) return;
      const hash = anchor.getAttribute('href');
      if (!hash || hash === '#') return;
      const target = document.querySelector(hash);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target as HTMLElement, {
        offset: NAV_OFFSET,
        lerp  : 0.08,
      });
    };
    document.addEventListener('click', onAnchorClick);

    // ── Cleanup ───────────────────────────────────────────────────────────────
    return () => {
      window.removeEventListener('lenis:scrollTo', onScrollTo);
      document.removeEventListener('click', onAnchorClick);
      gsap.ticker.remove(tickerFn);
      lenis.destroy();
      lenisRef.current = null;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>{children}</>;
}
