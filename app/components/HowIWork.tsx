'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTheme } from './ThemeProvider';

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

export default function HowIWork() {
  const ref        = useRef<HTMLElement>(null);
  const inView     = useInView(ref, { once: true, margin: '-8% 0px' });
  const { theme }  = useTheme();
  const isDark     = theme === 'dark';

  return (
    <section
      ref={ref}
      className="flex flex-col items-center px-4 sm:px-8 md:px-12 lg:px-[120px] w-full"
    >
      {/* Header */}
      <motion.div
        className="section-header w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.65, ease: EASE }}
      >
        <p className="text-[12px] font-semibold tracking-[3px] uppercase text-[#B91C1C]">
          Process
        </p>
        <h2 className="text-[28px] sm:text-[36px] font-bold text-[#111827] text-center leading-tight">
          How I Work
        </h2>
        <p className="text-[16px] text-[#6B7280] text-center leading-[1.7] max-w-[520px] mt-2">
          Great products emerge from collaboration, clarity, and disciplined execution.
        </p>
      </motion.div>

      {/* Cards */}
      <div className="w-full max-w-[1200px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 card-grid">
        {cards.map((card, i) => (
          <motion.div
            key={card.number}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: i * 0.12, ease: EASE }}
            className="group rounded-xl p-7 transition-all duration-250 hover:-translate-y-[3px] hover:shadow-sm flex flex-col gap-4"
            style={{
              background:   isDark ? '#0E0F16' : '#FFFFFF',
              border:       `1px solid ${isDark ? '#1C1D2A' : '#E5E7EB'}`,
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(185,28,28,0.3)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = isDark ? '#1C1D2A' : '#E5E7EB' }}
          >
            {/* Number line */}
            <div className="flex items-center gap-3">
              <span className="text-[11px] font-semibold tracking-[3px] uppercase text-[#B91C1C]">
                {card.number}
              </span>
              <motion.div
                className="h-px flex-1"
                style={{ backgroundColor: isDark ? '#1C1D2A' : '#E5E7EB' }}
                initial={{ scaleX: 0, originX: 0 }}
                animate={inView ? { scaleX: 1 } : {}}
                transition={{ duration: 0.7, delay: i * 0.12 + 0.25, ease: EASE }}
              />
            </div>

            {/* Title */}
            <h3 className="text-[18px] font-semibold leading-snug" style={{ color: isDark ? '#EDEDF5' : '#111827' }}>
              {card.title}
            </h3>

            {/* Divider */}
            <div className="h-px w-8 group-hover:bg-[#B91C1C]/30 transition-colors duration-300"
              style={{ backgroundColor: isDark ? '#1C1D2A' : '#E5E7EB' }} />

            {/* Description */}
            <p className="text-[14px] leading-[1.7] text-[#6B7280]">
              {card.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
