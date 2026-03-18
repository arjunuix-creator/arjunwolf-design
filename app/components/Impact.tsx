'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* ─────────────────────────────────────────────────────────────────────────────
   DATA
───────────────────────────────────────────────────────────────────────────── */

const stats = [
  {
    countTo:     150,
    suffix:      '+',
    displayWord: null,
    label:       'Enterprise Screens Designed',
    description: 'Complex enterprise platforms across fintech and logistics ecosystems.',
  },
  {
    countTo:     4,
    suffix:      '+',
    displayWord: null,
    label:       'Enterprise Platforms',
    description: 'Credit platforms, logistics systems, and fintech dashboards.',
  },
  {
    countTo:     null,
    suffix:      '',
    displayWord: 'Millions',
    label:       'End Users Impacted',
    description: 'Products used by banking professionals, analysts, and enterprise teams.',
  },
  {
    countTo:     12,
    suffix:      '+',
    displayWord: null,
    label:       'Years of UX Experience',
    description: 'Designing enterprise and fintech products across multiple industries.',
  },
];

/* ─────────────────────────────────────────────────────────────────────────────
   COUNTING HOOK
───────────────────────────────────────────────────────────────────────────── */

function useCountUp(target: number | null, duration: number, trigger: boolean) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!trigger || target === null) return;

    let startTime: number | null = null;
    const startValue = 0;

    function step(timestamp: number) {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.floor(startValue + ((target ?? 0) - startValue) * eased));
      if (progress < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  }, [trigger, target, duration]);

  return value;
}

/* ─────────────────────────────────────────────────────────────────────────────
   STAT CARD
───────────────────────────────────────────────────────────────────────────── */

const cardVariants = {
  hidden:  { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

function StatCard({
  stat,
  inView,
}: {
  stat: typeof stats[number];
  inView: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const count = useCountUp(stat.countTo, 1500, inView);

  const displayValue = stat.displayWord
    ? stat.displayWord
    : `${count}${stat.suffix}`;

  return (
    <motion.div
      variants={cardVariants}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="relative flex flex-col gap-5 cursor-default p-5 md:p-7"
      style={{
        background:   'rgba(255,255,255,0.02)',
        border:       hovered
          ? '1px solid rgba(225,6,0,0.18)'
          : '1px solid rgba(255,255,255,0.06)',
        borderRadius: 16,
        boxShadow:    hovered
          ? '0 0 28px rgba(225,6,0,0.05), 0 14px 44px rgba(0,0,0,0.45)'
          : '0 4px 24px rgba(0,0,0,0.2)',
        transform:    hovered ? 'translateY(-6px)' : 'translateY(0)',
        transition:   'border 0.35s ease, box-shadow 0.35s ease, transform 0.35s ease',
      }}
    >
      {/* Top accent line — fades in on hover */}
      <span
        className="absolute top-0 left-6 right-6 h-px rounded-full pointer-events-none"
        style={{
          background: `linear-gradient(90deg, transparent, rgba(225,6,0,${hovered ? 0.45 : 0}), transparent)`,
          transition: 'background 0.4s ease',
        }}
      />

      {/* Stat number */}
      <div className="flex flex-col gap-1">
        <span
          className="font-['The_Last_Shuriken',sans-serif] leading-none"
          style={{
            fontSize: stat.displayWord ? 48 : 56,
            color:    hovered ? '#ffffff' : '#eaeaea',
            transition: 'color 0.3s ease',
          }}
        >
          {displayValue}
        </span>

        {/* Label */}
        <span
          className="font-['Blast_Dragon',sans-serif] text-[11px] tracking-[2.5px] uppercase"
          style={{
            color:      hovered ? '#e10600' : 'rgba(225,6,0,0.7)',
            transition: 'color 0.3s ease',
          }}
        >
          {stat.label}
        </span>
      </div>

      {/* Divider */}
      <div
        className="h-px rounded-full"
        style={{
          width:      hovered ? 56 : 32,
          background: 'rgba(225,6,0,0.35)',
          transition: 'width 0.45s ease',
        }}
      />

      {/* Description */}
      <p
        className="font-['Kanzuri',serif] text-[13px] leading-[24px] tracking-[0.3px]"
        style={{
          color:      hovered ? 'rgba(138,143,152,0.9)' : 'rgba(138,143,152,0.6)',
          transition: 'color 0.3s ease',
        }}
      >
        {stat.description}
      </p>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   SECTION
───────────────────────────────────────────────────────────────────────────── */

const gridVariants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.12 } },
};

export default function Impact() {
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });

  return (
    <section
      ref={ref}
      className="flex flex-col items-center px-4 sm:px-8 md:px-12 lg:px-[120px] w-full"
    >

      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: 28 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.85, ease: EASE }}
      >
        <p className="font-['Blast_Dragon',sans-serif] text-[13px] text-[#e10600] tracking-[4px] uppercase">
          Impact
        </p>
        <h2 className="font-['The_Last_Shuriken',sans-serif] text-[28px] sm:text-[36px] md:text-[46px] text-white text-center leading-none">
          Design That Drives Results
        </h2>
        <div className="flex items-center justify-center gap-4 mt-1 mx-auto max-w-[600px] px-5 md:px-0">
          <span className="w-10 h-px bg-gradient-to-r from-transparent to-[#e10600]/18 flex-shrink-0" />
          <p className="font-['Blast_Dragon',sans-serif] text-[12px] text-[#8a8f98] tracking-[3px] uppercase text-center">
            Outcomes
          </p>
          <span className="w-10 h-px bg-gradient-to-l from-transparent to-[#e10600]/18 flex-shrink-0" />
        </div>
        <p className="font-['Blast_Dragon',sans-serif] text-[12px] text-[#8a8f98]/60 tracking-[0.5px] mt-3 text-center max-w-[500px] leading-relaxed">
          Enterprise UX designed to simplify complexity, accelerate decisions, and scale digital platforms.
        </p>
      </motion.div>

      {/* ── Stat grid ──────────────────────────────────────────────────────── */}
      <motion.div
        variants={gridVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 card-grid w-full max-w-[1260px]"
      >
        {stats.map((stat) => (
          <StatCard key={stat.label} stat={stat} inView={inView} />
        ))}
      </motion.div>

    </section>
  );
}
