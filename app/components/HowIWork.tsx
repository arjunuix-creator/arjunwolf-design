'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const cards = [
  {
    number: '01',
    title: 'Clarity Before Complexity',
    description:
      'I work with product managers and engineers to frame the right problem first. Clear problem definition prevents wasted effort and leads to better solutions.',
  },
  {
    number: '02',
    title: 'Design With Systems',
    description:
      'Instead of isolated screens, I focus on scalable design systems that help teams move faster while maintaining consistency across products.',
  },
  {
    number: '03',
    title: 'Alignment Across Teams',
    description:
      'Good UX happens when product, engineering, and business move in the same direction. I facilitate workshops and discussions that build shared understanding.',
  },
];

function WorkCard({ card, index, inView }: { card: typeof cards[number]; index: number; inView: boolean }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.14, ease: EASE }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{
        background:    'rgba(255,255,255,0.02)',
        border:        hovered
          ? '1px solid rgba(225,6,0,0.35)'
          : '1px solid rgba(255,255,255,0.06)',
        borderRadius:  16,
        padding:       28,
        boxShadow:     hovered
          ? '0 0 28px rgba(225,6,0,0.08), 0 16px 48px rgba(0,0,0,0.4)'
          : '0 4px 20px rgba(0,0,0,0.15)',
        transform:     hovered ? 'translateY(-6px)' : 'translateY(0px)',
        transition:    'border 0.35s ease, box-shadow 0.35s ease, transform 0.35s ease',
      }}
      className="flex flex-col gap-5"
    >
      {/* Number + accent dot */}
      <div className="flex items-center gap-3">
        <span
          className="font-['Blast_Dragon',sans-serif] text-[11px] tracking-[3px] text-[#e10600]"
        >
          {card.number}
        </span>
        <motion.div
          className="h-px flex-1"
          initial={{ scaleX: 0, originX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: index * 0.14 + 0.3, ease: EASE }}
          style={{ background: 'rgba(225,6,0,0.2)' }}
        />
      </div>

      {/* Title */}
      <h3
        className="font-['The_Last_Shuriken',sans-serif] text-[22px] text-[#eaeaea] leading-tight"
      >
        {card.title}
      </h3>

      {/* Divider */}
      <div
        className="h-px w-10 transition-all duration-500"
        style={{ background: hovered ? 'rgba(225,6,0,0.6)' : 'rgba(255,255,255,0.08)' }}
      />

      {/* Description */}
      <p
        className="font-['Blast_Dragon',sans-serif] text-[13px] leading-[1.8] tracking-[0.3px]"
        style={{ color: hovered ? '#b0b5be' : 'rgba(138,143,152,0.8)' }}
      >
        {card.description}
      </p>
    </motion.div>
  );
}

export default function HowIWork() {
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-8% 0px' });

  return (
    <section
      ref={ref}
      className="flex flex-col items-center px-4 sm:px-8 md:px-12 lg:px-[120px] w-full"
    >
      {/* ── Header ── */}
      <motion.div
        className="section-header w-full"
        initial={{ opacity: 0, y: 28 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.75, ease: EASE }}
      >
        <p className="font-['Blast_Dragon',sans-serif] text-[13px] text-[#e10600] tracking-[4px] uppercase">
          Process
        </p>
        <h2 className="font-['The_Last_Shuriken',sans-serif] text-[34px] sm:text-[44px] md:text-[56px] text-[#eaeaea] text-center leading-none">
          How I Work
        </h2>
        <div className="flex items-center justify-center gap-4 mt-1 mx-auto max-w-[600px] px-5 md:px-0">
          <span className="w-10 h-px bg-gradient-to-r from-transparent to-[#e10600]/30 flex-shrink-0" />
          <p className="font-['Blast_Dragon',sans-serif] text-[12px] text-[#8a8f98] tracking-[3px] uppercase text-center">
            Design leadership in practice
          </p>
          <span className="w-10 h-px bg-gradient-to-l from-transparent to-[#e10600]/30 flex-shrink-0" />
        </div>
        <p className="font-['Blast_Dragon',sans-serif] text-[12px] text-[#8a8f98]/65 tracking-[0.4px] mt-3 text-center max-w-[560px] leading-relaxed">
          Great products emerge from collaboration, clarity, and disciplined execution.
          My role is not only to design interfaces but to align teams, simplify complexity,
          and guide products toward meaningful outcomes.
        </p>
      </motion.div>

      {/* ── Cards ── */}
      <div className="w-full max-w-[1200px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 card-grid">
        {cards.map((card, i) => (
          <WorkCard key={card.number} card={card} index={i} inView={inView} />
        ))}
      </div>
    </section>
  );
}
