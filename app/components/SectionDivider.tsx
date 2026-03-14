'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function SectionDivider() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });

  return (
    <div
      className="flex items-center justify-center px-4 sm:px-8 md:px-12 lg:px-[120px] w-full
        mt-8 mb-8 sm:mt-12 sm:mb-12 lg:mt-[56px] lg:mb-[56px]"
    >
      <div ref={ref} style={{ position: 'relative', width: '100%', maxWidth: '1280px' }}>
        <motion.div
          style={{
            height:          '1px',
            background:      'linear-gradient(to right, transparent, rgba(255,40,40,0.35), transparent)',
            boxShadow:       '0 0 12px rgba(255,40,40,0.15)',
            transformOrigin: 'center',
          }}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={inView ? { scaleX: 1, opacity: 1 } : {}}
          transition={{ duration: 1.1, ease: EASE }}
        />
      </div>
    </div>
  );
}
