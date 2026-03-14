'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];
const DUR  = 1.0; // seconds — line reveal + spark travel duration

export default function GoldSeparator() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-8% 0px' });

  return (
    <div className="flex items-center justify-center px-4 sm:px-8 md:px-12 lg:px-[120px] py-[32px] w-full">

      {/* Track — holds the line and the travelling spark */}
      <div
        ref={ref}
        style={{ position: 'relative', width: '100%', maxWidth: '1280px', height: '4px' }}
      >

        {/* ── Gold line — reveals left-to-right behind the spark ── */}
        <motion.div
          style={{
            position: 'absolute',
            top: '50%',
            left: 0,
            width: '100%',
            height: '1px',
            translateY: '-50%',
            background: 'linear-gradient(90deg, transparent 0%, #D4AF37 30%, #D4AF37 70%, transparent 100%)',
            transformOrigin: 'left center',
            opacity: 0.65,
          }}
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          whileHover={{ opacity: 0.95, boxShadow: '0 0 8px rgba(212,175,55,0.5)' }}
          transition={{
            scaleX:    { duration: DUR, ease: EASE },
            opacity:   { duration: 0.35 },
            boxShadow: { duration: 0.35 },
          }}
        />

        {/* ── Spark — travels left to right ── */}
        {inView && (
          <>
            {/* Outer soft halo */}
            <motion.div
              style={{
                position: 'absolute',
                top: '50%',
                width: '14px',
                height: '14px',
                borderRadius: '50%',
                translateX: '-50%',
                translateY: '-50%',
                background: 'radial-gradient(circle, rgba(212,175,55,0.55) 0%, transparent 70%)',
                filter: 'blur(4px)',
                pointerEvents: 'none',
              }}
              initial={{ left: '0%', opacity: 0 }}
              animate={{ left: ['0%', '100%'], opacity: [0, 0.9, 0.9, 0] }}
              transition={{
                left:    { duration: DUR, ease: EASE },
                opacity: { duration: DUR, times: [0, 0.04, 0.88, 1], ease: 'linear' },
              }}
            />

            {/* Bright core dot */}
            <motion.div
              style={{
                position: 'absolute',
                top: '50%',
                width: '4px',
                height: '4px',
                borderRadius: '50%',
                translateX: '-50%',
                translateY: '-50%',
                backgroundColor: '#D4AF37',
                boxShadow: '0 0 6px 2px rgba(212,175,55,0.9), 0 0 14px 4px rgba(212,175,55,0.4)',
                pointerEvents: 'none',
              }}
              initial={{ left: '0%', opacity: 0 }}
              animate={{ left: ['0%', '100%'], opacity: [0, 1, 1, 0] }}
              transition={{
                left:    { duration: DUR, ease: EASE },
                opacity: { duration: DUR, times: [0, 0.04, 0.88, 1], ease: 'linear' },
              }}
            />

            {/* Particle tail — slightly behind the core */}
            <motion.div
              style={{
                position: 'absolute',
                top: '50%',
                width: '8px',
                height: '2px',
                borderRadius: '2px',
                translateX: '-100%',
                translateY: '-50%',
                background: 'linear-gradient(to left, rgba(212,175,55,0.6), transparent)',
                filter: 'blur(1px)',
                pointerEvents: 'none',
              }}
              initial={{ left: '0%', opacity: 0 }}
              animate={{ left: ['0%', '100%'], opacity: [0, 0.7, 0.7, 0] }}
              transition={{
                left:    { duration: DUR, ease: EASE },
                opacity: { duration: DUR, times: [0, 0.06, 0.88, 1], ease: 'linear' },
              }}
            />
          </>
        )}
      </div>
    </div>
  );
}
