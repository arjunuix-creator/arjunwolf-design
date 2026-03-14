'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const principles = [
  {
    kanji: '改善',
    romanji: 'KAIZEN',
    english: 'Continuous Improvement',
    description: 'Every design is a draft. Every iteration is progress.',
  },
  {
    kanji: '腹八分',
    romanji: 'HARAHACHI BU',
    english: 'Restraint',
    description: 'I stop before overdesign. Simplicity creates power.',
  },
  {
    kanji: '我慢',
    romanji: 'GAMAN',
    english: 'Endurance',
    description: 'Complex systems require patience. Leadership requires composure.',
  },
  {
    kanji: '金継ぎ',
    romanji: 'KINTSUGI',
    english: 'Growth Through Flaws',
    description: 'Every project teaches something. Every failure strengthens the system.',
  },
  {
    kanji: '生き甲斐',
    romanji: 'IKIGAI',
    english: 'Purpose',
    description: 'Design is not a job. It is the intersection of passion, mission, and mastery.',
  },
  {
    kanji: '侘寂',
    romanji: 'WABI-SABI',
    english: 'Beauty in Imperfection',
    description: 'I embrace iteration and learning. Perfection is found in progress.',
  },
  {
    kanji: '思いやり',
    romanji: 'OMOIYARI',
    english: 'Empathy',
    description: 'Design begins with understanding, not assumptions.',
  },
  {
    kanji: '森林浴',
    romanji: 'SHINRIN-YOKU',
    english: 'Clarity Through Space',
    description: 'White space is not emptiness. It is breathing room.',
  },
];

const easing: [number, number, number, number] = [0.22, 1, 0.36, 1];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 36 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.72, ease: easing },
  },
};

export default function Japanese() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-8% 0px' });

  return (
    <section
      ref={ref}
      id="japanese-habits"
      className="relative flex flex-col items-center px-4 sm:px-8 md:px-12 lg:px-[120px] w-full overflow-hidden"
    >

      {/* ── Zen breathing rings ────────────────────────────────────────────── */}
      <ZenBreath />

      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: easing }}
      >
        <p className="font-['Blast_Dragon',sans-serif] text-[13px] text-[#e10600] tracking-[4px] uppercase">
          Eastern Wisdom
        </p>
        <h2 className="font-['The_Last_Shuriken',sans-serif] text-[34px] sm:text-[44px] md:text-[56px] text-white text-center leading-none">
          Design Philosophy
        </h2>
        <div className="flex items-center gap-4 mt-1">
          <span className="w-10 h-px bg-gradient-to-r from-transparent to-[#e10600]/30" />
          <p className="font-['Blast_Dragon',sans-serif] text-[12px] text-[#8a8f98] tracking-[3px] uppercase">
            Inspired by Japanese principles
          </p>
          <span className="w-10 h-px bg-gradient-to-l from-transparent to-[#e10600]/30" />
        </div>
        <p className="font-['Blast_Dragon',sans-serif] text-[12px] text-[#8a8f98]/60 tracking-[0.5px] mt-3 text-center max-w-[520px] leading-relaxed">
          Eight philosophies that shape how I think about design, systems, and product experiences.
        </p>
      </motion.div>

      {/* ── Card grid ──────────────────────────────────────────────────────── */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-6 lg:gap-x-6 lg:gap-y-10 w-full max-w-[1280px]"
      >
        {principles.map((p) => (
          <PhilosophyCard key={p.romanji} principle={p} />
        ))}
      </motion.div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   ZEN BREATHING ANIMATION
───────────────────────────────────────────────────────────────────────────── */

const RINGS = [
  { delay: 0,   duration: 7 },
  { delay: 2.3, duration: 7 },
  { delay: 4.6, duration: 7 },
]

function ZenBreath() {
  return (
    <div
      className="absolute inset-0 flex items-center justify-center pointer-events-none"
      aria-hidden
    >
      {RINGS.map((ring, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full"
          style={{
            width: 320,
            height: 320,
            border: '1px solid rgba(225, 6, 0, 0.12)',
            background:
              'radial-gradient(circle, rgba(225,6,0,0.03) 0%, transparent 70%)',
          }}
          animate={{
            scale:   [1, 2.8, 1],
            opacity: [0.6, 0, 0.6],
          }}
          transition={{
            duration: ring.duration,
            delay:    ring.delay,
            ease:     'easeInOut',
            repeat:   Infinity,
            repeatType: 'loop',
          }}
        />
      ))}
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   CARD
───────────────────────────────────────────────────────────────────────────── */

function PhilosophyCard({
  principle,
}: {
  principle: (typeof principles)[number];
}) {
  return (
    <motion.div
      variants={cardVariants}
      className="group relative flex flex-col gap-5 p-5 md:p-8 rounded-2xl overflow-hidden cursor-default
        border border-white/[0.055]
        transition-all duration-300 ease-out
        hover:-translate-y-[6px]"
      style={{
        background: 'linear-gradient(145deg, #111418 0%, #0d1014 100%)',
      }}
      whileHover={{
        boxShadow: '0 0 0 1px rgba(225,6,0,0.18), 0 12px 40px rgba(0,0,0,0.5)',
      }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
    >

      {/* ── Ghost kanji ────────────────────────────────────────────────────── */}
      <div
        className="absolute inset-0 flex items-center justify-center
          select-none pointer-events-none overflow-hidden"
        aria-hidden
      >
        <span
          className="font-['Gingsul_Demo',serif] text-[160px] leading-none text-white
            opacity-[0.032] group-hover:opacity-[0.06]
            transition-opacity duration-500 ease-out
            translate-x-6 translate-y-4"
        >
          {principle.kanji}
        </span>
      </div>

      {/* ── Top red accent line ─────────────────────────────────────────────── */}
      <span
        className="absolute top-0 left-6 right-6 h-[1px] rounded-full
          bg-gradient-to-r from-transparent via-[#e10600]/0 to-transparent
          group-hover:via-[#e10600]/50
          transition-all duration-500 ease-out"
      />

      {/* ── Content ─────────────────────────────────────────────────────────── */}
      <div className="relative z-10 flex flex-col gap-5">

        {/* Romanji label */}
        <span className="font-['Blast_Dragon',sans-serif] text-[11px] text-[#e10600] tracking-[3.5px] uppercase leading-none">
          {principle.romanji}
        </span>

        {/* English concept title — strongest text on the card */}
        <h3 className="font-['The_Last_Shuriken',sans-serif] text-[26px] text-[#eaeaea] leading-[1.15]
          group-hover:text-white transition-colors duration-300">
          {principle.english}
        </h3>

        {/* Red divider — expands on hover */}
        <div className="w-6 h-px bg-[#e10600]/35 group-hover:w-14 transition-all duration-500 ease-out" />

        {/* Description — lightest layer */}
        <p className="font-['Kanzuri',serif] text-[12.5px] text-[#8a8f98]/80 leading-[22px] tracking-[0.3px]
          group-hover:text-[#a0a5ae] transition-colors duration-300">
          {principle.description}
        </p>

      </div>

    </motion.div>
  );
}
