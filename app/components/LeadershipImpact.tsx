'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTheme } from './ThemeProvider';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const cards = [
  {
    num: '01',
    title: 'Strategic UX Leadership',
    description:
      'Led end-to-end UX strategy across fintech, enterprise, and data-driven platforms.',
  },
  {
    num: '02',
    title: 'Systems Thinking',
    description:
      'Designed scalable design systems and structured information architectures for complex products.',
  },
  {
    num: '03',
    title: 'Cross-Functional Collaboration',
    description:
      'Worked closely with product managers, engineers, and stakeholders to align product vision.',
  },
  {
    num: '04',
    title: 'Outcome-Focused Design',
    description:
      'Focused on measurable outcomes instead of just visual deliverables.',
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
};

export default function LeadershipImpact() {
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <section
      ref={ref}
      className="flex flex-col items-center px-4 sm:px-8 md:px-12 lg:px-[120px] w-full"
    >
      {/* Header */}
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.65, ease: EASE }}
      >
        <p className="text-[12px] font-semibold tracking-[3px] uppercase text-[#B91C1C]">
          12+ Years of Experience
        </p>
        <h2 className="text-[28px] sm:text-[36px] font-bold text-[#111827] text-center leading-tight">
          Design Leadership Impact
        </h2>
        <p className="text-[16px] text-center text-[#6B7280] leading-[1.7] max-w-[580px] mt-2">
          Over the past decade I have led UX strategy for complex enterprise systems, translating
          business requirements into scalable design frameworks.
        </p>
      </motion.div>

      {/* Cards */}
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
            className="group rounded-xl p-7 md:p-8 transition-all duration-250 hover:-translate-y-[3px] hover:shadow-sm flex flex-col gap-4"
            style={{
              background:   isDark ? '#0E0F16' : '#FFFFFF',
              border:       `1px solid ${isDark ? '#1C1D2A' : '#E5E7EB'}`,
            }}
          >
            {/* Number */}
            <p className="text-[11px] font-semibold tracking-[3px] uppercase text-[#B91C1C]">
              {card.num}
            </p>

            {/* Title */}
            <h3
              className="text-[18px] font-semibold leading-snug"
              style={{ color: isDark ? '#EDEDF5' : '#111827' }}
            >
              {card.title}
            </h3>

            {/* Divider */}
            <div
              className="w-8 h-px transition-colors duration-300"
              style={{ background: isDark ? '#1C1D2A' : '#E5E7EB' }}
            />

            {/* Description */}
            <p className="text-[14px] leading-[1.7] text-[#6B7280]">
              {card.description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
