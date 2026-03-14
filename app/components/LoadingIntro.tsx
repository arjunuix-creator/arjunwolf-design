'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function LoadingIntro() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    /* Start fade-out at 1.2 s — exit transition itself takes 0.45 s */
    const t = setTimeout(() => setShow(false), 1200);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="intro"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: 'easeInOut' }}
          aria-hidden="true"
          style={{
            position:       'fixed',
            inset:          0,
            zIndex:         99999,
            backgroundColor:'#070707',
            display:        'flex',
            flexDirection:  'column',
            alignItems:     'center',
            justifyContent: 'center',
            gap:            '18px',
            pointerEvents:  'all',
          }}
        >
          {/* Ambient red glow */}
          <div
            style={{
              position:      'absolute',
              inset:         0,
              background:    'radial-gradient(ellipse 65% 55% at 50% 50%, rgba(225,6,0,0.07) 0%, transparent 68%)',
              pointerEvents: 'none',
            }}
          />

          {/* ── ARJUN CR ── */}
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            style={{
              fontFamily:    "'The Last Shuriken', sans-serif",
              fontSize:      'clamp(38px, 7vw, 78px)',
              color:         '#eaeaea',
              letterSpacing: '10px',
              lineHeight:    1,
              position:      'relative',
              zIndex:        1,
              margin:        0,
            }}
          >
            ARJUN CR
          </motion.h1>

          {/* Thin red accent line */}
          <motion.span
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3, ease: EASE }}
            style={{
              display:         'block',
              width:           '48px',
              height:          '1px',
              background:      'rgba(225,6,0,0.6)',
              boxShadow:       '0 0 8px rgba(225,6,0,0.4)',
              transformOrigin: 'center',
              position:        'relative',
              zIndex:          1,
            }}
          />

          {/* ── Subtext ── */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.5, ease: EASE }}
            style={{
              fontFamily:    "'Blast Dragon', sans-serif",
              fontSize:      '11px',
              color:         'rgba(138,143,152,0.65)',
              letterSpacing: '4px',
              textTransform: 'uppercase',
              position:      'relative',
              zIndex:        1,
              margin:        0,
            }}
          >
            Designing Digital Experiences
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
