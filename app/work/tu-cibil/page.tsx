'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/app/components/Navbar';
import SmoothScroll from '@/app/components/SmoothScroll';

/* ── Design tokens (match globals.css + existing components) ─────────────── */
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* ── Count-up hook (same pattern as Impact.tsx) ──────────────────────────── */
function useCountUp(target: number, duration: number, trigger: boolean) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    let start: number | null = null;
    const step = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.floor(target * eased));
      if (p < 1) requestAnimationFrame(step);
      else setValue(target);
    };
    requestAnimationFrame(step);
  }, [trigger, target, duration]);
  return value;
}

/* ── Shared scroll-reveal wrapper (same as SectionReveal.tsx) ────────────── */
function Reveal({
  children,
  className = '',
  delay = 0,
  y = 52,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-6% 0px' });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}

/* ── Section chrome (label + heading + optional subtitle) ────────────────── */
function SectionHeader({
  label,
  title,
  subtitle,
  align = 'center',
}: {
  label: string;
  title: React.ReactNode;
  subtitle?: string;
  align?: 'left' | 'center';
}) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-6% 0px' });
  const center = align === 'center';
  return (
    <motion.div
      ref={ref}
      className={`section-header ${center ? '' : 'items-start text-left !mb-10'}`}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.85, ease: EASE }}
    >
      <p className="font-['Blast_Dragon',sans-serif] text-[13px] text-[#e10600] tracking-[4px] uppercase">
        {label}
      </p>
      <h2 className={`font-['The_Last_Shuriken',sans-serif] text-[34px] sm:text-[44px] md:text-[52px] text-white leading-none ${center ? 'text-center' : ''}`}>
        {title}
      </h2>
      <div className={`flex items-center gap-4 mt-1 ${center ? '' : ''}`}>
        {center && <span className="w-10 h-px bg-gradient-to-r from-transparent to-[#e10600]/30" />}
        <p className="font-['Blast_Dragon',sans-serif] text-[12px] text-[#8a8f98] tracking-[3px] uppercase">
          Tu CIBIL · 2025
        </p>
        {center && <span className="w-10 h-px bg-gradient-to-l from-transparent to-[#e10600]/30" />}
      </div>
      {subtitle && (
        <p className={`font-['Blast_Dragon',sans-serif] text-[13px] text-[#8a8f98]/70 tracking-[0.5px] mt-3 leading-relaxed max-w-[560px] ${center ? 'text-center' : ''}`}>
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}

/* ── Full-width image block ───────────────────────────────────────────────── */
function FullImage({
  src,
  alt,
  aspect = 'aspect-[16/8]',
  delay = 0,
}: {
  src: string;
  alt: string;
  aspect?: string;
  delay?: number;
}) {
  return (
    <Reveal delay={delay}>
      <div
        className={`relative w-full ${aspect} overflow-hidden rounded-[20px]`}
        style={{
          background: 'rgba(255,255,255,0.02)',
          border:     '1px solid rgba(255,255,255,0.06)',
          boxShadow:  '0 24px 80px rgba(0,0,0,0.55)',
        }}
      >
        <Image src={src} alt={alt} fill className="object-cover object-top" sizes="100vw" />
      </div>
    </Reveal>
  );
}

/* ── Stat card with count-up (same pattern as Impact.tsx StatCard) ───────── */
function StatCard({
  value,
  suffix,
  label,
  description,
  inView,
  delay,
}: {
  value: number;
  suffix: string;
  label: string;
  description: string;
  inView: boolean;
  delay: number;
}) {
  const [hovered, setHovered] = useState(false);
  const count = useCountUp(value, 1500, inView);

  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: EASE }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="relative flex flex-col gap-5 cursor-default p-5 md:p-7"
      style={{
        background:   'rgba(255,255,255,0.02)',
        border:       hovered ? '1px solid rgba(225,6,0,0.28)' : '1px solid rgba(255,255,255,0.06)',
        borderRadius: 16,
        boxShadow:    hovered ? '0 0 28px rgba(225,6,0,0.08), 0 14px 44px rgba(0,0,0,0.45)' : '0 4px 24px rgba(0,0,0,0.2)',
        transform:    hovered ? 'translateY(-6px)' : 'translateY(0)',
        transition:   'border 0.35s ease, box-shadow 0.35s ease, transform 0.35s ease',
      }}
    >
      <span
        className="absolute top-0 left-6 right-6 h-px rounded-full pointer-events-none"
        style={{
          background: `linear-gradient(90deg, transparent, rgba(225,6,0,${hovered ? 0.45 : 0}), transparent)`,
          transition: 'background 0.4s ease',
        }}
      />
      <div className="flex flex-col gap-1">
        <span
          className="font-['The_Last_Shuriken',sans-serif] text-[56px] leading-none"
          style={{ color: hovered ? '#ffffff' : '#eaeaea', transition: 'color 0.3s ease' }}
        >
          {count}{suffix}
        </span>
        <span
          className="font-['Blast_Dragon',sans-serif] text-[11px] tracking-[2.5px] uppercase"
          style={{ color: hovered ? '#e10600' : 'rgba(225,6,0,0.7)', transition: 'color 0.3s ease' }}
        >
          {label}
        </span>
      </div>
      <div
        className="h-px rounded-full"
        style={{ width: hovered ? 56 : 32, background: 'rgba(225,6,0,0.35)', transition: 'width 0.45s ease' }}
      />
      <p
        className="font-['Kanzuri',serif] text-[13px] leading-[24px] tracking-[0.3px]"
        style={{ color: hovered ? 'rgba(138,143,152,0.9)' : 'rgba(138,143,152,0.6)', transition: 'color 0.3s ease' }}
      >
        {description}
      </p>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════ */

export default function TuCibilPage() {
  return (
    <SmoothScroll>
      <div className="min-h-screen w-full bg-[#070707] overflow-x-hidden">
        <Navbar />

        {/* ════════════════════════════════════════════════════════════════════
            1. HERO
        ════════════════════════════════════════════════════════════════════ */}
        <section className="relative w-full overflow-hidden pt-[120px] pb-[80px]">

          {/* Ambient glow — deep navy matching CIBIL brand */}
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse 80% 60% at 65% 40%, rgba(0,37,99,0.18) 0%, transparent 65%)',
            }}
          />
          {/* Red bleed from top-left */}
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse 45% 40% at 5% 10%, rgba(179,0,0,0.12) 0%, transparent 60%)',
            }}
          />

          {/* Two-column layout */}
          <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 sm:px-8 md:px-12 lg:px-[120px]
            flex flex-col lg:flex-row items-stretch gap-10 lg:gap-16">

            {/* ── Left: text content ───────────────────────────────────────── */}
            <div className="flex flex-col justify-center flex-1 min-w-0">

              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.25, ease: EASE }}
              >
                <span
                  className="inline-flex items-center gap-2 px-4 py-[7px] rounded-full
                    font-['Blast_Dragon',sans-serif] text-[11px] tracking-[2.5px] uppercase text-white mb-6"
                  style={{
                    background: 'rgba(0,37,99,0.7)',
                    border:     '1px solid rgba(0,74,200,0.35)',
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  <span className="w-[6px] h-[6px] rounded-full bg-[#e10600] inline-block" />
                  FinTech Case Study
                </span>
              </motion.div>

              {/* Title */}
              <motion.h1
                initial={{ opacity: 0, y: 36 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.95, delay: 0.35, ease: EASE }}
                className="font-['The_Last_Shuriken',sans-serif] text-white
                  text-[38px] sm:text-[50px] md:text-[60px] lg:text-[68px]
                  leading-[0.95] tracking-tight mb-6"
              >
                Modernizing Credit{' '}
                <span style={{ color: '#D4AF37', textShadow: '0 0 32px rgba(212,175,55,0.3)' }}>
                  Intelligence
                </span>{' '}
                Platform
              </motion.h1>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.85, delay: 0.48, ease: EASE }}
                className="font-['Blast_Dragon',sans-serif] text-[14px] sm:text-[15px]
                  text-[#8a8f98] leading-[30px] tracking-[0.3px] max-w-[500px] mb-10"
              >
                Led end-to-end UX strategy for TransUnion CIBIL — a national credit bureau platform
                used by banking professionals to evaluate creditworthiness and make loan decisions.
              </motion.p>

              {/* Meta row */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6, ease: EASE }}
                className="flex flex-wrap gap-x-8 gap-y-4 pt-7 border-t border-white/[0.08]"
              >
                {[
                  { label: 'Role',     value: 'Lead UI/UX Designer'       },
                  { label: 'Duration', value: '36 Months'                 },
                  { label: 'Platform', value: 'Desktop · Tablet · Mobile' },
                  { label: 'Team',     value: 'Solo Designer'             },
                  { label: 'Year',     value: '2025'                      },
                ].map((m, i) => (
                  <motion.div
                    key={m.label}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.65 + i * 0.06, ease: EASE }}
                    className="flex flex-col gap-[5px]"
                  >
                    <span className="font-['Blast_Dragon',sans-serif] text-[10px] tracking-[2.5px] uppercase text-white/30">
                      {m.label}
                    </span>
                    <span className="font-['Blast_Dragon',sans-serif] text-[13px] font-semibold text-white/90 whitespace-nowrap">
                      {m.value}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* ── Right: hero image ─────────────────────────────────────────── */}
            <motion.div
              initial={{ opacity: 0, x: 32, scale: 1.03 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.15, ease: EASE }}
              className="relative flex-1 min-h-[340px] lg:min-h-0 rounded-[20px] overflow-hidden"
              style={{
                background: 'rgba(0,37,99,0.12)',
                border:     '1px solid rgba(255,255,255,0.06)',
                boxShadow:  '0 32px 80px rgba(0,0,0,0.55)',
              }}
            >
              <Image
                src="/designs/tu-cibil/hero-image.png"
                alt="Tu CIBIL — Credit Intelligence Platform"
                fill
                priority
                className="object-cover object-top"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </motion.div>

          </div>
        </section>


        {/* ════════════════════════════════════════════════════════════════════
            2. THE PROBLEM
        ════════════════════════════════════════════════════════════════════ */}
        <section className="flex flex-col items-center px-4 sm:px-8 md:px-12 lg:px-[120px] w-full">

          <SectionHeader
            label="The Problem"
            title="The system worked — but it did not empower users."
            subtitle="Bank managers and financial analysts spent unnecessary time navigating complex forms and interpreting dense credit reports — slowing down decisions that required speed and clarity."
          />

          {/* Three problem cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 card-grid w-full max-w-[1260px]">
            {[
              {
                number: '01',
                title:  'Static Long Forms',
                body:   'Single-page forms exposed every field simultaneously. High cognitive load, no sense of progress, and no contextual guidance led to errors and abandonment during critical data entry.',
              },
              {
                number: '02',
                title:  'Data-Dense Reports',
                body:   'Credit score dashboards delivered raw numbers without visual hierarchy. Loan managers could not quickly locate risk signals, extending decision cycles unnecessarily.',
              },
              {
                number: '03',
                title:  'Cognitive Overload',
                body:   'Navigation assumed users had memorised workflows. No grouping by frequency or task type meant every session started with reorientation instead of action.',
              },
            ].map((card, i) => (
              <Reveal key={card.number} delay={i * 0.1}>
                <div
                  className="flex flex-col gap-5 h-full p-6 md:p-8 rounded-[16px]"
                  style={{
                    background: 'rgba(255,255,255,0.02)',
                    border:     '1px solid rgba(255,255,255,0.06)',
                  }}
                >
                  <span className="font-['Blast_Dragon',sans-serif] text-[11px] tracking-[3px] text-[#e10600] uppercase">
                    {card.number}
                  </span>
                  <h3 className="font-['The_Last_Shuriken',sans-serif] text-white text-[22px] leading-tight">
                    {card.title}
                  </h3>
                  <div className="h-px w-8 bg-[#e10600]/30 rounded-full" />
                  <p className="font-['Kanzuri',serif] text-[13px] text-[#8a8f98]/80 leading-[26px] flex-1">
                    {card.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>


        {/* ════════════════════════════════════════════════════════════════════
            3. LEGACY VS MODERN
        ════════════════════════════════════════════════════════════════════ */}
        <section className="flex flex-col items-center px-4 sm:px-8 md:px-12 lg:px-[120px] w-full">

          <SectionHeader
            label="Before & After"
            title="Legacy vs Modern"
            subtitle="Side-by-side comparison of the old experience against the redesigned system — from dense, form-heavy interfaces to clean, decision-optimised workflows."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-[1260px]">
            {[
              { src: '/designs/tu-cibil/before-image.png', tag: 'Before',  label: 'Legacy Interface', accent: 'rgba(225,6,0,0.15)',    border: 'rgba(225,6,0,0.22)'   },
              { src: '/designs/tu-cibil/after-image.png',  tag: 'After',   label: 'Redesigned System', accent: 'rgba(0,180,120,0.08)', border: 'rgba(0,180,120,0.22)' },
            ].map((item, i) => (
              <Reveal key={item.tag} delay={i * 0.12}>
                <div className="flex flex-col gap-3">
                  <div
                    className="relative overflow-hidden rounded-[16px]"
                    style={{ border: `1px solid ${item.border}` }}
                  >
                    {/* Tag pill */}
                    <div className="absolute top-4 left-4 z-10">
                      <span
                        className="font-['Blast_Dragon',sans-serif] text-[10px] tracking-[2px] uppercase px-3 py-[5px] rounded-full text-white"
                        style={{ background: item.accent, border: `1px solid ${item.border}`, backdropFilter: 'blur(6px)' }}
                      >
                        {item.label}
                      </span>
                    </div>
                    <div className="aspect-[4/3] relative">
                      <Image
                        src={item.src}
                        alt={`${item.tag} — ${item.label}`}
                        fill
                        className="object-cover object-top"
                        sizes="(max-width:768px) 100vw, 50vw"
                      />
                    </div>
                  </div>
                  <p className="font-['Blast_Dragon',sans-serif] text-[11px] tracking-[2px] uppercase text-[#8a8f98] text-center">
                    {item.tag}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>


        {/* ════════════════════════════════════════════════════════════════════
            4. KEY DESIGN DECISIONS
        ════════════════════════════════════════════════════════════════════ */}
        <section className="flex flex-col items-center px-4 sm:px-8 md:px-12 lg:px-[120px] w-full">

          <SectionHeader
            label="UX Strategy"
            title="Key Design Decisions"
            subtitle="Each decision was rooted in observed user behaviour and validated through rapid testing sessions with bank managers and financial analysts."
          />

          <div className="flex flex-col gap-24 w-full max-w-[1260px]">
            {[
              {
                number: '01',
                title:  'Progressive Stepper Forms',
                body:   'Replaced overwhelming single-page forms with a stepped multi-stage flow. Each step surfaces only the fields relevant to that stage, providing clear progress feedback and reducing cognitive load. Error rates dropped significantly as users knew exactly where they were in the process.',
                image:  '/designs/tu-cibil/progressive-stepper-image.png',
                flip:   false,
              },
              {
                number: '02',
                title:  'Dashboard Based Reports',
                body:   'Transformed raw, tabular credit data into visual score dashboards with colour-coded risk tiers and summary cards. Loan managers could identify risk signals in seconds rather than minutes, enabling faster and more confident decision-making across high-volume sessions.',
                image:  '/designs/tu-cibil/dashboard-image.png',
                flip:   true,
              },
              {
                number: '03',
                title:  'Data Hierarchy Optimization',
                body:   'Restructured the information architecture around actual task frequency and analyst mental models. Primary actions were surfaced to the top level; secondary and administrative tasks were contextualised and tucked away — reducing the number of clicks required to reach any key action.',
                image:  '/designs/tu-cibil/data-hierarchy-imagepng.png',
                flip:   false,
              },
            ].map((item, i) => (
              <Reveal key={item.number} delay={0}>
                <div className={`flex flex-col ${item.flip ? 'md:flex-row-reverse' : 'md:flex-row'} gap-10 md:gap-16 items-center`}>

                  {/* Image side */}
                  <div className="w-full md:w-[58%] flex-shrink-0">
                    <div
                      className="relative aspect-[16/10] overflow-hidden rounded-[16px]"
                      style={{
                        background: 'rgba(255,255,255,0.02)',
                        border:     '1px solid rgba(255,255,255,0.06)',
                        boxShadow:  '0 24px 80px rgba(0,0,0,0.5)',
                      }}
                    >
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover object-top"
                        sizes="(max-width:768px) 100vw, 58vw"
                      />
                    </div>
                  </div>

                  {/* Text side */}
                  <div className="w-full md:w-[42%] flex flex-col gap-5">
                    <span className="font-['Blast_Dragon',sans-serif] text-[11px] tracking-[3px] text-[#e10600] uppercase">
                      Decision {item.number}
                    </span>
                    <h3 className="font-['The_Last_Shuriken',sans-serif] text-white text-[28px] sm:text-[34px] leading-tight">
                      {item.title}
                    </h3>
                    <div className="h-px w-10 bg-[#e10600]/30 rounded-full" />
                    <p className="font-['Kanzuri',serif] text-[14px] text-[#8a8f98] leading-[28px] tracking-[0.3px]">
                      {item.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>


        {/* ════════════════════════════════════════════════════════════════════
            5. SYSTEM THINKING
        ════════════════════════════════════════════════════════════════════ */}
        <section className="flex flex-col items-center px-4 sm:px-8 md:px-12 lg:px-[120px] w-full">

          <SectionHeader
            label="Design System"
            title="System Thinking"
            subtitle="The platform expanded from an initial 25–30 desktop screens to a comprehensive 150+ screen system spanning every module — loan applications, credit summaries, audit trails, user management, and mobile field workflows."
          />

          {/* System badges */}
          <Reveal className="w-full max-w-[1260px] mb-12">
            <div className="flex flex-wrap gap-3 justify-center">
              {[
                'Typography Scale', 'Colour Tokens', 'Spacing System',
                'Component Library', 'Motion Principles', 'Accessibility',
                'Responsive Grid', 'Form Patterns', 'Data Visualisation',
              ].map((badge) => (
                <span
                  key={badge}
                  className="font-['Blast_Dragon',sans-serif] text-[10px] tracking-[1.5px] uppercase px-4 py-[7px] rounded-full"
                  style={{
                    background: 'rgba(225,6,0,0.07)',
                    border:     '1px solid rgba(225,6,0,0.2)',
                    color:      'rgba(225,6,0,0.8)',
                  }}
                >
                  {badge}
                </span>
              ))}
            </div>
          </Reveal>

          {/* Stats strip */}
          <Reveal className="w-full max-w-[1260px]" delay={0.1}>
            <div
              className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/[0.06] rounded-[16px] overflow-hidden"
              style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}
            >
              {[
                { value: '150+', label: 'Screens Designed'  },
                { value: '4',    label: 'Core Modules'      },
                { value: '3',    label: 'Device Breakpoints'},
                { value: '36',   label: 'Months of Design'  },
              ].map((s) => (
                <div key={s.label} className="flex flex-col items-center gap-2 py-8 px-4">
                  <span className="font-['The_Last_Shuriken',sans-serif] text-[44px] leading-none text-white">
                    {s.value}
                  </span>
                  <span className="font-['Blast_Dragon',sans-serif] text-[10px] tracking-[2px] uppercase text-[#8a8f98] text-center">
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>
        </section>


        {/* ════════════════════════════════════════════════════════════════════
            6. RESPONSIVE DESIGN
        ════════════════════════════════════════════════════════════════════ */}
        <section className="flex flex-col items-center px-4 sm:px-8 md:px-12 lg:px-[120px] w-full">

          <SectionHeader
            label="Multi-Device"
            title="Every Screen, Every Device"
            subtitle="Designed desktop-first with a rigorous component library, then scaled down to tablet and mobile for field agents — ensuring consistent logic and hierarchy across all form factors without redesigning from scratch."
          />

          <FullImage
            src="/designs/tu-cibil/responsive-image.png"
            alt="Tu CIBIL responsive layouts across devices"
            aspect="aspect-[21/9]"
          />
        </section>


        {/* ════════════════════════════════════════════════════════════════════
            7. SCREEN SHOWCASE
        ════════════════════════════════════════════════════════════════════ */}
        <section className="flex flex-col items-center px-4 sm:px-8 md:px-12 lg:px-[120px] w-full">

          <SectionHeader
            label="Product UI"
            title="The Final Experience"
            subtitle="A curated selection of production screens — desktop dashboards, tablet workflows, and mobile views — showing the full depth of the platform."
          />

          <div className="flex flex-col gap-6 w-full max-w-[1260px]">
            {/* Desktop */}
            <FullImage
              src="/designs/tu-cibil/desktop-images.png"
              alt="Tu CIBIL desktop screens"
              aspect="aspect-[21/10]"
            />
            {/* Mobile */}
            <FullImage
              src="/designs/tu-cibil/mobile-images.png"
              alt="Tu CIBIL mobile screens"
              aspect="aspect-[16/7]"
              delay={0.1}
            />
          </div>
        </section>


        {/* ════════════════════════════════════════════════════════════════════
            8. WIREFRAMES
        ════════════════════════════════════════════════════════════════════ */}
        <section className="flex flex-col items-center px-4 sm:px-8 md:px-12 lg:px-[120px] w-full">

          <SectionHeader
            label="Process"
            title="Wireframes"
            subtitle="Low-fidelity wireframes were used to validate structure and user flow before any visual design decisions were made — keeping the focus on logic, not aesthetics."
          />

          <FullImage
            src="/designs/tu-cibil/wireframe-image.png"
            alt="Tu CIBIL wireframes — early exploration"
            aspect="aspect-[16/7]"
          />
        </section>


        {/* ════════════════════════════════════════════════════════════════════
            9. OUTCOMES
        ════════════════════════════════════════════════════════════════════ */}
        <OutcomesSection />


        {/* ════════════════════════════════════════════════════════════════════
            10. FINAL QUOTE
        ════════════════════════════════════════════════════════════════════ */}
        <section className="flex flex-col items-center px-4 sm:px-8 md:px-12 lg:px-[120px] w-full">
          <Reveal className="w-full max-w-[900px] mx-auto text-center">
            <div
              className="relative py-16 px-8 md:px-16 rounded-[20px] overflow-hidden"
              style={{
                background: 'rgba(255,255,255,0.015)',
                border:     '1px solid rgba(255,255,255,0.07)',
              }}
            >
              {/* Decorative quote mark */}
              <span
                className="absolute top-6 left-8 font-['The_Last_Shuriken',sans-serif] text-[120px] leading-none select-none pointer-events-none"
                style={{ color: 'rgba(225,6,0,0.06)' }}
              >
                "
              </span>

              <blockquote className="relative z-10 font-['The_Last_Shuriken',sans-serif] text-white text-[24px] sm:text-[30px] md:text-[36px] leading-[1.35] mb-6">
                "The system wasn&apos;t broken functionally — it was overwhelming cognitively.{' '}
                <span style={{ color: '#D4AF37' }}>We fixed that.</span>"
              </blockquote>

              <p className="font-['Blast_Dragon',sans-serif] text-[11px] tracking-[2.5px] uppercase text-[#8a8f98]/60">
                Arjun CR · Lead UI/UX Designer · TransUnion CIBIL
              </p>
            </div>
          </Reveal>
        </section>


        {/* ════════════════════════════════════════════════════════════════════
            BACK CTA
        ════════════════════════════════════════════════════════════════════ */}
        <section className="flex flex-col items-center px-4 sm:px-8 md:px-12 lg:px-[120px] w-full pb-[80px]">
          <Reveal className="text-center">
            <p className="font-['Blast_Dragon',sans-serif] text-[11px] text-[#e10600] tracking-[4px] uppercase mb-4">
              Next
            </p>
            <h2 className="font-['The_Last_Shuriken',sans-serif] text-white text-[36px] sm:text-[48px] leading-none mb-6">
              Explore More Work
            </h2>
            <p className="font-['Blast_Dragon',sans-serif] text-[13px] text-[#8a8f98] leading-[26px] max-w-[380px] mx-auto mb-10">
              See how the same principles of clarity, hierarchy and empathy were applied
              across logistics, health and SaaS products.
            </p>
            <Link
              href="/#works"
              className="inline-flex items-center gap-3 px-8 h-[52px] rounded-[10px]
                font-['Blast_Dragon',sans-serif] text-[13px] tracking-[1.5px] uppercase text-white
                transition-all duration-300"
              style={{
                background: '#B30000',
                boxShadow:  '0 0 24px rgba(179,0,0,0.35), 0 0 48px rgba(179,0,0,0.1)',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget;
                el.style.background  = '#CC0000';
                el.style.boxShadow   = '0 6px 32px rgba(255,42,42,0.5), 0 0 60px rgba(179,0,0,0.2)';
              }}
              onMouseLeave={e => {
                const el = e.currentTarget;
                el.style.background  = '#B30000';
                el.style.boxShadow   = '0 0 24px rgba(179,0,0,0.35), 0 0 48px rgba(179,0,0,0.1)';
              }}
            >
              ← Back to Portfolio
            </Link>
          </Reveal>
        </section>

        {/* Footer strip */}
        <div className="border-t border-white/[0.05] py-7">
          <p
            className="font-['Inter',sans-serif] font-light text-[12px] tracking-[0.3px] text-center"
            style={{ color: 'rgba(138,143,152,0.4)' }}
          >
            © 2026 Arjun CR — Tu CIBIL Case Study
          </p>
        </div>

      </div>
    </SmoothScroll>
  );
}


/* ── Outcomes section (own component so inView ref works correctly) ───────── */
function OutcomesSection() {
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });

  return (
    <section
      ref={ref}
      className="flex flex-col items-center px-4 sm:px-8 md:px-12 lg:px-[120px] w-full"
    >
      {/* Ambient gold glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-0 right-0 h-[600px]"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(212,175,55,0.04) 0%, transparent 70%)',
        }}
      />

      <motion.div
        className="section-header relative z-10"
        initial={{ opacity: 0, y: 28 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.85, ease: EASE }}
      >
        <p className="font-['Blast_Dragon',sans-serif] text-[13px] text-[#e10600] tracking-[4px] uppercase">
          Results
        </p>
        <h2 className="font-['The_Last_Shuriken',sans-serif] text-[34px] sm:text-[44px] md:text-[52px] text-white text-center leading-none">
          Measurable Impact
        </h2>
        <div className="flex items-center gap-4 mt-1">
          <span className="w-10 h-px bg-gradient-to-r from-transparent to-[#e10600]/30" />
          <p className="font-['Blast_Dragon',sans-serif] text-[12px] text-[#8a8f98] tracking-[3px] uppercase">
            Tu CIBIL · Outcomes
          </p>
          <span className="w-10 h-px bg-gradient-to-l from-transparent to-[#e10600]/30" />
        </div>
        <p className="font-['Blast_Dragon',sans-serif] text-[12px] text-[#8a8f98]/60 tracking-[0.5px] mt-3 text-center max-w-[500px] leading-relaxed">
          Validated through usability testing and post-launch analytics across the banking partner network.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 card-grid w-full max-w-[1260px] relative z-10">
        <StatCard
          value={40}   suffix="%" label="Faster Task Completion"
          description="Bank managers completed loan review workflows 40% faster after the stepper and dashboard redesign."
          inView={inView} delay={0}
        />
        <StatCard
          value={150}  suffix="+" label="Screens Designed"
          description="A comprehensive system of 150+ screens covering every module across desktop, tablet and mobile."
          inView={inView} delay={0.1}
        />
        <StatCard
          value={60}   suffix="%" label="Reduced Cognitive Load"
          description="Self-reported cognitive effort dropped 60% in post-test interviews — users described the redesigned system as 'obvious'."
          inView={inView} delay={0.2}
        />
      </div>
    </section>
  );
}
