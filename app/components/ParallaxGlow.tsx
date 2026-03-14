'use client';

import { useScroll, useTransform, motion } from 'framer-motion';

export default function ParallaxGlow() {
  const { scrollYProgress } = useScroll();

  /* Shift -80px across the full page scroll — extremely gradual */
  const y = useTransform(scrollYProgress, [0, 1], [0, -80]);

  return (
    <motion.div
      aria-hidden="true"
      style={{
        y,
        position:      'fixed',
        inset:         0,
        zIndex:        0,
        pointerEvents: 'none',
        /* Two-layer glow: top-centre red bloom + lower-centre warm halo */
        background: `
          radial-gradient(ellipse 75% 55% at 50% 0%,   rgba(225,6,0,0.045)   0%, transparent 68%),
          radial-gradient(ellipse 55% 40% at 50% 55%,  rgba(180,4,0,0.022)   0%, transparent 70%)
        `,
      }}
    />
  );
}
