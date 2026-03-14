'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      lerp           : 0.08,          // interpolation factor — lower = slower/smoother
      duration       : 1.2,           // animation duration in seconds
      easing         : (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 1.5,
      infinite       : false,
    });

    // Bridge Lenis scroll events into GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // Drive Lenis via GSAP ticker so both share the same frame loop
    const tickerFn = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tickerFn);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tickerFn);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
