'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const philosophies = [
  {
    label: 'MA — Space',
    title: 'Space Creates Clarity',
    description:
      'Emptiness is not absence — it is intention. Whitespace reduces cognitive load, guides the eye, and lets the important breathe.',
    index: '01',
  },
  {
    label: 'KAIZEN — Improvement',
    title: 'Continuous UX Improvement',
    description:
      'Design is never finished. Every release is a hypothesis. I embrace iteration — not as failure, but as the only path to products that truly serve people over time.',
    index: '02',
  },
  {
    label: 'WABI-SABI — Simplicity',
    title: 'Beauty in Simplicity',
    description:
      'Calm, meaningful experiences emerge from restraint. Elegance comes not from ornamentation, but from removing everything that doesn\'t belong.',
    index: '03',
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
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
        className="flex flex-col items-center gap-3 mb-14"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
      >
        <p className="text-[12px] font-semibold tracking-[3px] uppercase text-[#B91C1C]">
          Design Philosophy
        </p>
        <h2 className="text-[28px] sm:text-[36px] font-bold text-[#111827] text-center leading-tight">
          Three Principles
        </h2>
        <p className="text-[16px] text-[#6B7280] text-center leading-[1.7] max-w-[460px] mt-1">
          Rooted in timeless principles. Applied to digital craft.
        </p>
      </motion.div>

      {/* Cards */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px w-full max-w-[1200px] border border-[#E5E7EB] rounded-xl overflow-hidden bg-[#E5E7EB]"
      >
        {philosophies.map((p) => (
          <motion.div
            key={p.label}
            variants={cardVariants}
            className="group bg-white p-10 flex flex-col gap-5 hover:bg-[#FAFAFA] transition-colors duration-300"
          >
            {/* Index */}
            <span className="text-[11px] font-semibold text-[#9CA3AF] tracking-[3px] uppercase">
              {p.index}
            </span>

            {/* Label */}
            <p className="text-[12px] font-semibold text-[#B91C1C] tracking-[2px] uppercase">
              {p.label}
            </p>

            {/* Title */}
            <h3 className="text-[20px] font-bold text-[#111827] leading-snug">
              {p.title}
            </h3>

            {/* Divider */}
            <div className="w-8 h-px bg-[#E5E7EB] group-hover:bg-[#B91C1C]/30 transition-colors duration-400" />

            {/* Description */}
            <p className="text-[15px] text-[#6B7280] leading-[1.7]">
              {p.description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
