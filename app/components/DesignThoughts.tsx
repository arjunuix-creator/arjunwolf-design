'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import MagneticButton from './MagneticButton';

const easing: [number, number, number, number] = [0.22, 1, 0.36, 1];

const articles = [
  {
    tag: 'AI × Design',
    title: 'Building a Fintech Dashboard with AI in One Day',
    excerpt:
      'How AI tools like Claude, Supabase, and Next.js compress the design-to-deployment workflow.',
    readTime: '5 min read',
    cta: 'Read on Medium →',
    href: 'https://medium.com/@arjunuix/i-built-a-fintech-dashboard-using-ai-in-one-day-heres-the-workflow-80d53359c85e',
    isPlaceholder: false,
  },
  {
    tag: 'Design Strategy',
    title: 'Modern UI in 2026: Why Trends Don\'t Matter',
    excerpt:
      'Why modern UI is shifting from visual trends to intelligent systems and adaptive interfaces.',
    readTime: '3 min read',
    cta: 'Read on Medium →',
    href: 'https://medium.com/@arjunuix/modern-ui-in-2026-why-trends-dont-matter-anymore-a2a5fa2487e8',
    isPlaceholder: false,
  },
  {
    tag: 'Writing',
    title: 'More Design Essays Coming Soon',
    excerpt:
      'I write about UX systems, AI-assisted workflows, and product design thinking.',
    readTime: null,
    cta: 'Follow on Medium →',
    href: 'https://medium.com/@arjunuix',
    isPlaceholder: true,
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
  hidden:   { opacity: 0, y: 36 },
  visible:  { opacity: 1, y: 0, transition: { duration: 0.75, ease: easing } },
};

export default function DesignThoughts() {
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });

  return (
    <section
      ref={ref}
      className="flex flex-col items-center px-6 w-full"
    >

      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <motion.div
        className="section-header w-full max-w-[1200px]"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: easing }}
      >
        <p className="text-[13px] font-semibold text-[#B91C1C] tracking-[4px] uppercase">
          Writing
        </p>
        <h2 className="font-bold text-[26px] sm:text-[32px] md:text-[38px] text-[#111827] text-center leading-none">
          Design Essays
        </h2>
        <div className="flex items-center gap-4 mt-1">
          <span className="w-10 h-px bg-gradient-to-r from-transparent to-[#B91C1C]/12" />
          <p className="text-[12px] text-[#6B7280] tracking-[3px] uppercase">
            Medium
          </p>
          <span className="w-10 h-px bg-gradient-to-l from-transparent to-[#B91C1C]/12" />
        </div>
        <p className="text-[12px] text-[#9CA3AF] tracking-[0.5px] mt-3 text-center max-w-[480px] leading-relaxed">
          Occasionally writing about design systems, AI workflows, and product thinking.
        </p>
      </motion.div>

      {/* ── Cards ──────────────────────────────────────────────────────────── */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="grid grid-cols-1 md:grid-cols-3 card-grid w-full max-w-[1280px]"
      >
        {articles.map((a) => (
          <motion.a
            key={a.title}
            variants={itemVariants}
            href={a.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`
              group relative flex flex-col gap-5 rounded-2xl p-8 cursor-pointer
              border transition-all duration-300 ease-out
              hover:-translate-y-[6px]
              ${a.isPlaceholder
                ? 'border-dashed border-[#E5E7EB] bg-[#F9FAFB]'
                : 'border-[#E5E7EB] bg-white'
              }
            `}
            whileHover={{
              boxShadow: '0 0 0 1px rgba(185,28,28,0.06), 0 16px 40px rgba(0,0,0,0.08)',
            }}
            transition={{ duration: 0.3, ease: easing }}
          >
            {/* Top accent line on hover */}
            <span
              className="absolute top-0 left-6 right-6 h-px rounded-full
                bg-gradient-to-r from-transparent via-[#B91C1C]/0 to-transparent
                group-hover:via-[#B91C1C]/40
                transition-all duration-500 ease-out"
            />

            {/* Tag row */}
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-semibold text-[#B91C1C] tracking-[3px] uppercase">
                {a.tag}
              </span>
              {a.readTime && (
                <span className="text-[10px] text-[#9CA3AF] tracking-[1px]">
                  {a.readTime}
                </span>
              )}
            </div>

            {/* Title */}
            <h3
              className={`
                font-bold text-[22px] leading-[1.25]
                transition-colors duration-300
                ${a.isPlaceholder
                  ? 'text-[#6B7280] group-hover:text-[#374151]'
                  : 'text-[#111827] group-hover:text-[#111827]'
                }
              `}
            >
              {a.title}
            </h3>

            {/* Divider */}
            <div className="w-8 h-px bg-[#E5E7EB] group-hover:w-14 group-hover:bg-[#B91C1C]/30 transition-all duration-500 ease-out" />

            {/* Excerpt */}
            <p className="italic text-[14px] text-[#6B7280] leading-[26px] flex-1">
              {a.excerpt}
            </p>

            {/* CTA */}
            <div className="flex items-center mt-2">
              <MagneticButton maxShift={4}>
                <span
                  className="text-[11px] font-semibold tracking-[1.5px] uppercase
                    text-[#9CA3AF] group-hover:text-[#B91C1C]
                    transition-all duration-300 ease-out inline-flex items-center gap-[6px]"
                >
                  {a.cta}
                  <span className="inline-block transition-transform duration-250 group-hover:translate-x-[4px]">→</span>
                </span>
              </MagneticButton>
            </div>

          </motion.a>
        ))}
      </motion.div>

    </section>
  );
}
