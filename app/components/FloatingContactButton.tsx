'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FloatingContactButton() {
  const [scrolled, setScrolled] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > window.innerHeight * 0.8);
    };
    const onResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    const onChatToggle = (e: Event) => {
      setChatOpen((e as CustomEvent<{ open: boolean }>).detail.open);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize, { passive: true });
    window.addEventListener('agent-wolf:toggle', onChatToggle);

    onScroll();
    onResize();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('agent-wolf:toggle', onChatToggle);
    };
  }, []);

  const visible = scrolled && !chatOpen;
  const bottom = isDesktop ? 90 : 82;
  const right  = isDesktop ? 32 : 16;
  const scale  = isDesktop ? 1  : 0.9;

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href="mailto:arjunuix@gmail.com"
          initial={{ opacity: 0, y: 16, scale: scale * 0.9 }}
          animate={{ opacity: 1, y: 0,  scale: scale }}
          exit={{    opacity: 0, y: 16, scale: scale * 0.9 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ scale: scale * 1.05 }}
          whileTap={{   scale: scale * 0.97 }}
          className="fixed z-[50]"
          style={{
            bottom,
            right,
            background:    '#ff2a2a',
            color:         '#ffffff',
            borderRadius:  50,
            padding:       '14px 20px',
            fontSize:      14,
            fontFamily:    "'Blast Dragon', sans-serif",
            letterSpacing: '1.5px',
            textTransform: 'uppercase',
            boxShadow:     '0 0 20px rgba(255,42,42,0.4), 0 4px 16px rgba(0,0,0,0.3)',
            display:       'flex',
            alignItems:    'center',
            gap:           8,
            textDecoration:'none',
            userSelect:    'none',
          }}
        >
          <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <rect x="1" y="3.5" width="14" height="9" rx="1.5" stroke="white" strokeWidth="1.3"/>
            <path d="M1 5.5L8 10L15 5.5" stroke="white" strokeWidth="1.3" strokeLinecap="round"/>
          </svg>
          Contact
        </motion.a>
      )}
    </AnimatePresence>
  );
}
