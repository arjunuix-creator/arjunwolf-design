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
        <p className="font-['Blast_Dragon',sans-serif] text-[13px] text-[#e10600] tracking-[4px] uppercase">
          Writing
        </p>
        <h2 className="font-['The_Last_Shuriken',sans-serif] text-[34px] sm:text-[44px] md:text-[56px] text-[#eaeaea] text-center leading-none">
          Design Essays
        </h2>
        <div className="flex items-center gap-4 mt-1">
          <span className="w-10 h-px bg-gradient-to-r from-transparent to-[#e10600]/30" />
          <p className="font-['Blast_Dragon',sans-serif] text-[12px] text-[#8a8f98] tracking-[3px] uppercase">
            Medium
          </p>
          <span className="w-10 h-px bg-gradient-to-l from-transparent to-[#e10600]/30" />
        </div>
        <p className="font-['Blast_Dragon',sans-serif] text-[12px] text-[#8a8f98]/60 tracking-[0.5px] mt-3 text-center max-w-[480px] leading-relaxed">
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
                ? 'border-white/[0.04] bg-[#0f1215] border-dashed'
                : 'border-white/[0.06] bg-[#111418]'
              }
            `}
            whileHover={{
              boxShadow: '0 0 0 1px rgba(225,6,0,0.12), 0 16px 40px rgba(0,0,0,0.45)',
            }}
            transition={{ duration: 0.3, ease: easing }}
          >
            {/* Top accent line on hover */}
            <span
              className="absolute top-0 left-6 right-6 h-px rounded-full
                bg-gradient-to-r from-transparent via-[#e10600]/0 to-transparent
                group-hover:via-[#e10600]/40
                transition-all duration-500 ease-out"
            />

            {/* Tag row */}
            <div className="flex items-center justify-between">
              <span className="font-['Blast_Dragon',sans-serif] text-[10px] text-[#e10600] tracking-[3px] uppercase">
                {a.tag}
              </span>
              {a.readTime && (
                <span className="font-['Blast_Dragon',sans-serif] text-[10px] text-[#8a8f98]/40 tracking-[1px]">
                  {a.readTime}
                </span>
              )}
            </div>

            {/* Title */}
            <h3
              className={`
                font-['The_Last_Shuriken',sans-serif] text-[22px] leading-[1.25]
                transition-colors duration-300
                ${a.isPlaceholder
                  ? 'text-[#8a8f98]  group-hover:text-[#c0c4cc]'
                  : 'text-[#eaeaea] group-hover:text-white'
                }
              `}
            >
              {a.title}
            </h3>

            {/* Divider */}
            <div className="w-8 h-px bg-[#8a8f98]/15 group-hover:w-14 group-hover:bg-[#e10600]/30 transition-all duration-500 ease-out" />

            {/* Excerpt */}
            <p className="font-['Kanzuri',serif] text-[14px] text-[#8a8f98] leading-[26px] flex-1">
              {a.excerpt}
            </p>

            {/* CTA */}
            <div className="flex items-center mt-2">
              <MagneticButton maxShift={4}>
                <span
                  className="font-['Blast_Dragon',sans-serif] text-[11px] tracking-[1.5px]
                    text-[#8a8f98] group-hover:text-[#eaeaea]
                    transition-all duration-300 ease-out inline-flex items-center gap-1"
                >
                  {a.cta}
                </span>
              </MagneticButton>
            </div>

          </motion.a>
        ))}
      </motion.div>

    </section>
  );
}
