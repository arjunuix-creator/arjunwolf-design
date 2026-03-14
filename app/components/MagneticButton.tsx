'use client';

import { useRef, useCallback } from 'react';
import { motion, useSpring } from 'framer-motion';

interface Props {
  children: React.ReactNode;
  className?: string;
  /** Maximum translation in px — default 6 */
  maxShift?: number;
}

export default function MagneticButton({ children, className, maxShift = 6 }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  /* Spring physics — responsive but not twitchy */
  const x = useSpring(0, { stiffness: 180, damping: 18, mass: 0.4 });
  const y = useSpring(0, { stiffness: 180, damping: 18, mass: 0.4 });

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      /* Map cursor offset from element center to [-maxShift, maxShift] */
      const dx = ((e.clientX - (rect.left + rect.width  / 2)) / (rect.width  / 2)) * maxShift;
      const dy = ((e.clientY - (rect.top  + rect.height / 2)) / (rect.height / 2)) * maxShift;
      x.set(dx);
      y.set(dy);
    },
    [x, y, maxShift],
  );

  const onMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ x, y, display: 'inline-flex' }}
      className={className}
      whileHover={{
        scale: 1.04,
        filter: 'drop-shadow(0 0 10px rgba(225,6,0,0.32))',
      }}
      transition={{
        scale:  { type: 'spring', stiffness: 300, damping: 22 },
        filter: { duration: 0.3, ease: 'easeOut' },
      }}
    >
      {children}
    </motion.div>
  );
}
