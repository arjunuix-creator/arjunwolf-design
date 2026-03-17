'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const philosophies = [
  {
    kanji: '間',
    romanji: 'MA',
    title: 'Space Creates Clarity',
    description:
      'Emptiness is not absence — it is intention. Whitespace reduces cognitive load, guides the eye, and lets the important breathe. The pause between notes makes the music.',
    index: '01',
  },
  {
    kanji: '改善',
    romanji: 'KAIZEN',
    title: 'Continuous UX Improvement',
    description:
      'Design is never finished. Every release is a hypothesis. I embrace iteration — not as failure, but as the only path to products that truly serve people over time.',
    index: '02',
  },
  {
    kanji: '侘寂',
    romanji: 'WABI-SABI',
    title: 'Beauty in Simplicity',
    description:
      'Calm, meaningful experiences emerge from restraint. I find elegance not in ornamentation, but in the removal of everything that doesn\'t belong.',
    index: '03',
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.18 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 48 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

export default function DesignPhilosophy() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-15% 0px' });

  return (
    <section
      ref={ref}
      id="philosophy"
      className="flex flex-col items-center px-4 sm:px-8 md:px-12 lg:px-[120px] w-full"
    >
      {/* Header */}
      <motion.div
        className="flex flex-col items-center gap-3 mb-20"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
      >
        <p className="font-['Blast_Dragon',sans-serif] text-[13px] text-[#e10600] tracking-[4px] uppercase">
          Design Philosophy
        </p>
        <h2 className="font-['The_Last_Shuriken',sans-serif] text-[34px] text-[#eaeaea] text-center leading-none">
          Three Principles
        </h2>
        <p className="font-['Kanzuri',serif] text-[18px] text-[#8a8f98] text-center tracking-[1px] mt-2 max-w-[500px] leading-[32px]">
          Rooted in Japanese philosophy. Applied to digital craft.
        </p>
      </motion.div>

      {/* Cards */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[2px] w-full max-w-[1280px]"
      >
        {philosophies.map((p, i) => (
          <motion.div
            key={p.romanji}
            variants={cardVariants}
            className="group relative bg-[#14171c] p-[52px] flex flex-col gap-6 overflow-hidden
              hover:bg-[#181c22] transition-colors duration-500"
            style={{
              borderLeft: i > 0 ? '1px solid rgba(138,143,152,0.12)' : undefined,
            }}
          >
            {/* Index */}
            <span className="font-['Inter',sans-serif] text-[11px] text-[#8a8f98]/40 tracking-[3px] uppercase">
              {p.index}
            </span>

            {/* Kanji — large background character */}
            <div
              className="absolute right-6 top-8 font-['Gingsul_Demo',serif] text-[120px] leading-none
                text-white/[0.03] group-hover:text-white/[0.06] transition-all duration-700
                select-none pointer-events-none"
            >
              {p.kanji}
            </div>

            {/* Romanji accent */}
            <p className="font-['Blast_Dragon',sans-serif] text-[12px] text-[#e10600] tracking-[4px] uppercase">
              {p.romanji}
            </p>

            {/* Title */}
            <h3 className="font-['The_Last_Shuriken',sans-serif] text-[28px] text-[#eaeaea] leading-tight">
              {p.title}
            </h3>

            {/* Bottom line accent */}
            <div className="w-8 h-[1px] bg-[#e10600]/40 group-hover:w-16 transition-all duration-500" />

            {/* Description */}
            <p className="font-['Kanzuri',serif] text-[16px] text-[#8a8f98] leading-[30px] tracking-[0.4px]">
              {p.description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
