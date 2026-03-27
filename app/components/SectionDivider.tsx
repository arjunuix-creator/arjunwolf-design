'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function SectionDivider() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });

  return (
    <div className="flex items-center justify-center px-6 w-full">
      <div ref={ref} style={{ position: 'relative', width: '100%', maxWidth: '1200px' }}>
        <motion.div
          style={{
            height:          '1px',
            background:      'linear-gradient(to right, transparent, #E5E7EB, transparent)',
            transformOrigin: 'center',
          }}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={inView ? { scaleX: 1, opacity: 1 } : {}}
          transition={{ duration: 0.9, ease: EASE }}
        />
      </div>
    </div>
  );
}
