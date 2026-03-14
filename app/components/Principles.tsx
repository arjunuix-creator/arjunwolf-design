'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const principles = [
  {
    icon:   '↑',
    kanji:  '歩',
    ritual: 'Morning Walks',
    value:  'Clarity of Mind',
    detail: 'Before screens, I walk. Movement clears mental noise so the important ideas surface.',
  },
  {
    icon:   '◎',
    kanji:  '禅',
    ritual: 'Meditation',
    value:  'Focus & Awareness',
    detail: 'Ten minutes of stillness before work. Presence sharpens thinking — distraction dulls it.',
  },
  {
    icon:   '⬡',
    kanji:  '茶',
    ritual: 'Tea Ritual',
    value:  'Patience & Calm',
    detail: 'Brewing tea is a reminder to slow down. The best designs emerge from patience.',
  },
  {
    icon:   '◉',
    kanji:  '観',
    ritual: 'Observation',
    value:  'Understanding People',
    detail: 'I observe how people move through the world — their hesitations, habits, and small joys. That\'s where design begins.',
  },
];

// Card-level stagger delays — cards begin entering as kanji fades in
const CARD_DELAYS = [0.1, 0.25, 0.4, 0.55];

type Principle = typeof principles[number];

// ── Ink brush stroke SVG path — organic, tapered left→right ──
const BRUSH_PATH =
  'M4,20 C10,12 30,9 60,12 C95,15 135,17 168,14 C182,12 198,14 199,20 C199,27 183,30 168,28 C135,31 95,30 60,28 C30,26 10,26 4,24 Z';

function PrincipleCard({ p, i, inView }: { p: Principle; i: number; inView: boolean }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className="relative flex flex-col items-center text-center group overflow-hidden"
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{
        y: -8,
        transition: { duration: 0.35, ease: 'easeOut' },
      }}
    >
      {/* ── Layer 1: kanji — opacity wrapper (hover: 0.05 → 0.12) ── */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        style={{ zIndex: 1 }}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: hovered ? 0.12 : 0.05 } : { opacity: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        {/* Inner wrapper drives scale reveal + infinite y drift independently */}
        <motion.div
          initial={{ scale: 1.05 }}
          animate={inView ? { scale: 1, y: [0, -6, 0] } : {}}
          transition={{
            scale: { duration: 0.8, ease: 'easeOut' },
            y: { duration: 8, ease: 'easeInOut', repeat: Infinity, delay: 0.8 },
          }}
        >
          <span className="font-['Gingsul_Demo',serif] text-[140px] text-[#D4AF37]">
            {p.kanji}
          </span>
        </motion.div>
      </motion.div>

      {/* ── Layer 2: card content — slides up after kanji ── */}
      <motion.div
        className="relative flex flex-col items-center gap-5 w-full"
        style={{ zIndex: 2 }}
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.75, delay: CARD_DELAYS[i], ease: EASE }}
      >
        {/* Icon node */}
        <div
          className="w-[56px] h-[56px] rounded-full border flex items-center justify-center
            transition-all duration-500"
          style={{
            borderColor:     hovered ? 'rgba(212,175,55,0.7)' : 'rgba(212,175,55,0.3)',
            background:      hovered ? '#181c22' : '#14171c',
            boxShadow:       hovered ? '0 0 18px rgba(212,175,55,0.18)' : 'none',
          }}
        >
          <span
            className="text-[20px] transition-all duration-300"
            style={{
              color:      hovered ? '#D4AF37' : 'rgba(212,175,55,0.7)',
              textShadow: hovered ? '0 0 12px rgba(212,175,55,0.5)' : 'none',
            }}
          >
            {p.icon}
          </span>
        </div>

        {/* Ritual label + title + red accent line */}
        <div className="flex flex-col items-center gap-1">
          <span className="font-['Blast_Dragon',sans-serif] text-[13px] text-[#D4AF37] tracking-[2.5px] uppercase">
            {p.ritual}
          </span>

          {/* Title with ink brush stroke layer */}
          <div className="relative flex items-center justify-center px-4 py-1">

            {/* ── Brush stroke — z-index 0, grows left → right on hover ── */}
            <motion.div
              aria-hidden="true"
              className="absolute inset-0 pointer-events-none"
              style={{ zIndex: 0, originX: 0, originY: 0.5 }}
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{
                scaleX: hovered ? 1 : 0,
                opacity: hovered ? 1 : 0,
              }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <svg
                viewBox="0 0 200 40"
                preserveAspectRatio="none"
                className="w-full h-full"
                aria-hidden="true"
              >
                <path d={BRUSH_PATH} fill="rgba(180,0,0,0.25)" />
              </svg>
            </motion.div>

            {/* ── Title — z-index 1, sits above brush ── */}
            <h3
              className="font-['The_Last_Shuriken',sans-serif] text-[22px] text-[#eaeaea] leading-tight"
              style={{ position: 'relative', zIndex: 1 }}
            >
              {p.value}
            </h3>
          </div>

          <motion.div
            className="h-[1px] mt-2"
            initial={{ width: 0 }}
            animate={inView ? { width: hovered ? '64px' : '40px' } : {}}
            transition={{ duration: hovered ? 0.4 : 0.5, delay: inView && !hovered ? CARD_DELAYS[i] + 0.2 : 0, ease: EASE }}
            style={{ background: hovered ? 'rgba(225,6,0,0.7)' : '#B30000' }}
          />
        </div>

        {/* Detail */}
        <p
          className="font-['Kanzuri',serif] text-[14px] leading-[26px] tracking-[0.3px] transition-colors duration-400"
          style={{ color: hovered ? '#b0b5be' : 'rgba(138,143,152,0.75)' }}
        >
          {p.detail}
        </p>
      </motion.div>
    </motion.div>
  );
}

export default function Principles() {
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section
      ref={ref}
      className="flex flex-col items-center px-4 sm:px-8 md:px-12 lg:px-[120px] w-full"
    >
      {/* ── Heading block ── */}
      <motion.div
        className="flex flex-col items-center gap-3"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: EASE }}
      >
        <p className="font-['Blast_Dragon',sans-serif] text-[13px] text-[#D4AF37] tracking-[4px] uppercase">
          How I Live
        </p>
        <h2 className="font-['The_Last_Shuriken',sans-serif] text-[34px] sm:text-[44px] md:text-[56px] text-[#eaeaea] text-center leading-none">
          Principles I Live By
        </h2>
        <p className="font-['Kanzuri',serif] text-[18px] text-[#8a8f98] text-center max-w-[520px] leading-[32px] mt-[40px]">
          Clarity of work begins in how you live. These daily rituals shape the way I design.
        </p>
      </motion.div>

      {/* ── Cards ── */}
      <div className="relative w-full max-w-[1280px] mt-[48px]">

        {/* Horizontal connecting line */}
        <motion.div
          className="hidden lg:block absolute top-[56px] left-[12.5%] right-[12.5%] h-[1px]
            bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={inView ? { scaleX: 1, opacity: 1 } : {}}
          transition={{ duration: 1.4, delay: 0.3, ease: EASE }}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 card-grid">
          {principles.map((p, i) => (
            <PrincipleCard key={p.ritual} p={p} i={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
