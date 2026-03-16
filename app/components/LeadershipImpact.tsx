'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const cards = [
  {
    num: '01',
    title: 'Strategic UX Leadership',
    description:
      'Led end-to-end UX strategy across fintech, enterprise, and data-driven platforms.',
    accentColor: '#e10600',
    borderHover: 'hover:border-[#e10600]/30',
  },
  {
    num: '02',
    title: 'System Thinking',
    description:
      'Designed scalable design systems and structured information architectures for complex products.',
    accentColor: '#D4AF37',
    borderHover: 'hover:border-[#D4AF37]/30',
  },
  {
    num: '03',
    title: 'Cross-Functional Collaboration',
    description:
      'Worked closely with product managers, engineers, and stakeholders to align product vision.',
    accentColor: '#e10600',
    borderHover: 'hover:border-[#e10600]/30',
  },
  {
    num: '04',
    title: 'Outcome-Focused Design',
    description:
      'Focused on measurable outcomes instead of just visual deliverables.',
    accentColor: '#D4AF37',
    borderHover: 'hover:border-[#D4AF37]/30',
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const cardVariants = {
  hidden:  { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

export default function LeadershipImpact() {
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });

  return (
    <section
      ref={ref}
      className="flex flex-col items-center px-4 sm:px-8 md:px-12 lg:px-[120px] w-full"
    >

      {/* ── Header ──────────────────────────────────────────────────────────── */}
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: EASE }}
      >
        <p className="font-['Blast_Dragon',sans-serif] text-[13px] text-[#e10600] tracking-[4px] uppercase">
          12+ Years of Experience
        </p>
        <h2 className="font-['The_Last_Shuriken',sans-serif] text-[34px] sm:text-[44px] md:text-[56px] text-white text-center leading-none">
          Design Leadership Impact
        </h2>
        <div className="flex items-center gap-4 mt-1">
          <span className="w-10 h-px bg-gradient-to-r from-transparent to-[#e10600]/30" />
          <p className="font-['Blast_Dragon',sans-serif] text-[12px] text-[#8a8f98] tracking-[3px] uppercase">
            What I Bring
          </p>
          <span className="w-10 h-px bg-gradient-to-l from-transparent to-[#e10600]/30" />
        </div>
        <p className="font-['Blast_Dragon',sans-serif] text-[14px] text-center text-[#8a8f98] leading-[1.9] max-w-[660px] mt-2">
          Over the past decade I have led UX strategy for complex enterprise systems, translating
          business requirements into scalable design frameworks used by product teams and decision makers.
        </p>
      </motion.div>

      {/* ── Cards ───────────────────────────────────────────────────────────── */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="grid grid-cols-1 sm:grid-cols-2 card-grid w-full max-w-[1200px]"
      >
        {cards.map((card) => (
          <motion.div
            key={card.num}
            variants={cardVariants}
            className={`group border border-white/[0.055] ${card.borderHover} rounded-2xl p-8 md:p-10
              bg-[#0c0d10] transition-all duration-300 hover:-translate-y-[4px]
              flex flex-col gap-4`}
          >
            {/* Number label */}
            <p
              className="font-['Blast_Dragon',sans-serif] text-[10px] tracking-[3px] uppercase"
              style={{ color: card.accentColor }}
            >
              {card.num}
            </p>

            {/* Title */}
            <h3 className="font-['The_Last_Shuriken',sans-serif] text-[1.4rem] md:text-[1.6rem] text-[#eaeaea] leading-[1.2]
              group-hover:text-white transition-colors duration-300">
              {card.title}
            </h3>

            {/* Accent divider */}
            <div
              className="w-8 h-px"
              style={{ background: `${card.accentColor}40` }}
            />

            {/* Description */}
            <p className="font-['Blast_Dragon',sans-serif] text-[13px] leading-[1.9] text-[#8a8f98]
              group-hover:text-[#a0a5ae] transition-colors duration-300">
              {card.description}
            </p>
          </motion.div>
        ))}
      </motion.div>

    </section>
  );
}
