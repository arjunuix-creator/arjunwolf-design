'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/app/components/Navbar';
import SmoothScroll from '@/app/components/SmoothScroll';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* ── Reveal ──────────────────────────────────────────────────────────────── */
function Reveal({ children, className = '', delay = 0 }: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-8% 0px' });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.85, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/* ── Label ───────────────────────────────────────────────────────────────── */
function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-['Blast_Dragon',sans-serif] text-[11px] text-[#e10600] tracking-[4px] uppercase mb-3">
      {children}
    </p>
  );
}

/* ── Section heading ─────────────────────────────────────────────────────── */
function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-['The_Last_Shuriken',sans-serif] text-[2.2rem] md:text-[3rem] text-[#eaeaea] leading-[1.1] mb-6">
      {children}
    </h2>
  );
}

/* ── Divider ─────────────────────────────────────────────────────────────── */
function Divider() {
  return (
    <div className="w-full h-px bg-gradient-to-r from-transparent via-[#333] to-transparent" />
  );
}

/* ── Challenge card (matches RMT problem card) ───────────────────────────── */
function ChallengeCard({ title, description, index }: {
  title: string;
  description: string;
  index: number;
}) {
  return (
    <div className="border border-[#1e2028] rounded-2xl p-7 bg-[#0c0d10] hover:border-[#e10600]/30 transition-colors duration-300">
      <p className="font-['Blast_Dragon',sans-serif] text-[10px] tracking-[3px] text-[#e10600] uppercase mb-4">
        0{index + 1}
      </p>
      <h3 className="font-['The_Last_Shuriken',sans-serif] text-[1.3rem] text-[#eaeaea] mb-3">
        {title}
      </h3>
      <p className="font-['Blast_Dragon',sans-serif] text-[13px] leading-[1.8] text-[#8a8f98]">
        {description}
      </p>
    </div>
  );
}

/* ── Strategy card ───────────────────────────────────────────────────────── */
function StrategyCard({ title, description, index }: {
  title: string;
  description: string;
  index: number;
}) {
  return (
    <div className="border border-[#1e2028] rounded-2xl p-7 bg-[#0c0d10] hover:border-[#D4AF37]/30 transition-colors duration-300">
      <p className="font-['Blast_Dragon',sans-serif] text-[10px] tracking-[3px] text-[#D4AF37] uppercase mb-4">
        {String(index + 1).padStart(2, '0')}
      </p>
      <h3 className="font-['The_Last_Shuriken',sans-serif] text-[1.2rem] text-[#eaeaea] mb-3">
        {title}
      </h3>
      <p className="font-['Blast_Dragon',sans-serif] text-[13px] leading-[1.8] text-[#8a8f98]">
        {description}
      </p>
    </div>
  );
}

/* ── Impact card ─────────────────────────────────────────────────────────── */
function ImpactCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="border border-[#1e2028] rounded-2xl p-8 bg-[#0c0d10] hover:border-[#D4AF37]/40 transition-colors duration-300 flex flex-col">
      <div className="w-8 h-8 rounded-full border border-[#D4AF37]/40 flex items-center justify-center mb-5">
        <span className="w-2 h-2 rounded-full bg-[#D4AF37]" />
      </div>
      <h3 className="font-['The_Last_Shuriken',sans-serif] text-[1.4rem] text-[#eaeaea] mb-3">
        {title}
      </h3>
      <p className="font-['Blast_Dragon',sans-serif] text-[13px] leading-[1.8] text-[#8a8f98]">
        {description}
      </p>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════════════
   PAGE
═══════════════════════════════════════════════════════════════════════════ */
export default function PhAwareCaseStudy() {
  const processSteps = [
    {
      step: '01',
      label: 'Research',
      description: 'Understanding patient needs and healthcare information gaps.',
    },
    {
      step: '02',
      label: 'Concept',
      description: 'Designing a platform centered around awareness and accessibility.',
    },
    {
      step: '03',
      label: 'Wireframes',
      description: 'Structuring information and navigation flows.',
    },
    {
      step: '04',
      label: 'Prototype',
      description: 'Interactive flows for education and awareness modules.',
    },
    {
      step: '05',
      label: 'Visual Design',
      description: 'Calming UI style with strong readability.',
    },
    {
      step: '06',
      label: 'Testing',
      description: 'Ensuring clarity and usability.',
    },
  ];

  return (
    <SmoothScroll>
      <div className="min-h-screen bg-[#070707] text-[#eaeaea]">
        <Navbar />

        {/* ── Back link ──────────────────────────────────────────────────── */}
        <div className="pt-24 pb-0 px-6 max-w-[1100px] mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-['Blast_Dragon',sans-serif] text-[11px] tracking-[3px] text-[#8a8f98] uppercase hover:text-[#e10600] transition-colors"
          >
            ← Back to Work
          </Link>
        </div>

        <main className="px-6 max-w-[1100px] mx-auto">

          {/* ══════════════════════════════════════════════════════════════
              1. HERO
          ══════════════════════════════════════════════════════════════ */}
          <section className="pt-10 pb-16 md:pb-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

              {/* Left — text */}
              <Reveal>
                <Label>Health Tech · Mobile App</Label>
                <h1 className="font-['The_Last_Shuriken',sans-serif] text-[2.8rem] md:text-[3.8rem] lg:text-[4.4rem] text-[#eaeaea] leading-[1.05] mb-6">
                  Designing a Digital Awareness Platform for Pulmonary Arterial Hypertension
                </h1>
                <p className="font-['Blast_Dragon',sans-serif] text-[14px] leading-[2] text-[#8a8f98] mb-8 max-w-[480px]">
                  A patient-focused platform that helps people understand symptoms,
                  manage treatment awareness, and access reliable health information.
                </p>

                {/* Metadata */}
                <div className="grid grid-cols-2 gap-x-8 gap-y-5">
                  {[
                    { label: 'Role',     value: 'Product Designer' },
                    { label: 'Duration', value: '6 Months' },
                    { label: 'Platform', value: 'Mobile App' },
                    { label: 'Team',     value: 'Solo Designer' },
                  ].map(({ label, value }) => (
                    <div key={label}>
                      <p className="font-['Blast_Dragon',sans-serif] text-[10px] tracking-[3px] text-[#e10600] uppercase mb-1">
                        {label}
                      </p>
                      <p className="font-['Blast_Dragon',sans-serif] text-[13px] text-[#eaeaea]">
                        {value}
                      </p>
                    </div>
                  ))}
                </div>
              </Reveal>

              {/* Right — hero image */}
              <Reveal delay={0.15}>
                <Image
                  src="/designs/ph-aware/hero-image.png"
                  alt="PH Aware — Hero"
                  width={800}
                  height={900}
                  className="w-full h-auto object-contain rounded-2xl block mx-auto"
                  priority
                />
              </Reveal>
            </div>
          </section>

          <Divider />

          {/* ══════════════════════════════════════════════════════════════
              2. REAL-WORLD CHALLENGES
          ══════════════════════════════════════════════════════════════ */}
          <section className="py-16 md:py-24">
            <Reveal className="mb-8">
              <Label>The Problem</Label>
              <SectionHeading>Real-World Challenges Faced by PAH Patients</SectionHeading>
              <p className="font-['Blast_Dragon',sans-serif] text-[14px] leading-[2] text-[#8a8f98] max-w-[640px]">
                Pulmonary Arterial Hypertension is a rare and complex condition. Patients
                face significant barriers in understanding their diagnosis, accessing
                reliable information, and managing the emotional weight of a chronic illness.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <ChallengeCard
                  index={0}
                  title="Delayed Diagnosis"
                  description="Symptoms are often misunderstood leading to late detection."
                />
                <ChallengeCard
                  index={1}
                  title="Information Gap"
                  description="Patients struggle to access simple explanations about the condition."
                />
                <ChallengeCard
                  index={2}
                  title="Emotional Stress"
                  description="Managing a chronic condition causes anxiety and uncertainty."
                />
              </div>
            </Reveal>
          </section>

          <Divider />

          {/* ══════════════════════════════════════════════════════════════
              3. SEEING THROUGH USERS' EYES
          ══════════════════════════════════════════════════════════════ */}
          <section className="py-16 md:py-24">
            <Reveal className="mb-10">
              <Label>User Research</Label>
              <SectionHeading>Seeing the World Through Their Eyes</SectionHeading>
            </Reveal>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Patient Pain Points */}
              <Reveal>
                <div className="border border-[#1e2028] rounded-2xl p-8 bg-[#0c0d10] h-full hover:border-[#e10600]/30 transition-colors duration-300">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="w-2 h-2 rounded-full bg-[#e10600] shrink-0" />
                    <p className="font-['Blast_Dragon',sans-serif] text-[10px] tracking-[3px] text-[#e10600] uppercase">
                      Patient Pain Points
                    </p>
                  </div>
                  <ul className="flex flex-col gap-5">
                    {[
                      'Lack of clear education about the condition',
                      'Confusing medical terminology in existing resources',
                      'Limited emotional support during diagnosis and treatment',
                    ].map((point) => (
                      <li key={point} className="flex items-start gap-4">
                        <span className="mt-[7px] w-1.5 h-1.5 rounded-full bg-[#e10600]/60 shrink-0" />
                        <p className="font-['Blast_Dragon',sans-serif] text-[13px] leading-[1.9] text-[#8a8f98]">
                          {point}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>

              {/* Design Opportunities */}
              <Reveal delay={0.1}>
                <div className="border border-[#1e2028] rounded-2xl p-8 bg-[#0c0d10] h-full hover:border-[#D4AF37]/30 transition-colors duration-300">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="w-2 h-2 rounded-full bg-[#D4AF37] shrink-0" />
                    <p className="font-['Blast_Dragon',sans-serif] text-[10px] tracking-[3px] text-[#D4AF37] uppercase">
                      Design Opportunities
                    </p>
                  </div>
                  <ul className="flex flex-col gap-5">
                    {[
                      'Simplify medical knowledge through visual storytelling',
                      'Visualise treatment journeys as guided, step-by-step flows',
                      'Empower patient self-awareness through accessible tools',
                    ].map((opp) => (
                      <li key={opp} className="flex items-start gap-4">
                        <span className="mt-[7px] w-1.5 h-1.5 rounded-full bg-[#D4AF37]/60 shrink-0" />
                        <p className="font-['Blast_Dragon',sans-serif] text-[13px] leading-[1.9] text-[#8a8f98]">
                          {opp}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </div>
          </section>

          <Divider />

          {/* ══════════════════════════════════════════════════════════════
              4. STRATEGY ROOTED IN EMPATHY
          ══════════════════════════════════════════════════════════════ */}
          <section className="py-16 md:py-24">
            <Reveal className="mb-8">
              <Label>Design Strategy</Label>
              <SectionHeading>Strategy Rooted in Empathy</SectionHeading>
              <p className="font-['Blast_Dragon',sans-serif] text-[14px] leading-[2] text-[#8a8f98] max-w-[640px]">
                Every design decision was anchored in patient needs — prioritising clarity,
                emotional safety, and accessibility over aesthetic novelty.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    title: 'Accessible Health Information',
                    description: 'Use simple language and visual storytelling to make complex medical content approachable for patients of all backgrounds.',
                  },
                  {
                    title: 'Guided Patient Journey',
                    description: 'Break complex medical processes into easy, digestible steps that reduce overwhelm and build confidence.',
                  },
                  {
                    title: 'Emotional Support',
                    description: 'Use a reassuring tone and calm visuals to create a safe, supportive environment throughout the experience.',
                  },
                  {
                    title: 'Mobile First Design',
                    description: 'Patients access information primarily on mobile — every screen was designed for thumb-friendly, on-the-go use.',
                  },
                ].map((card, i) => (
                  <StrategyCard
                    key={card.title}
                    index={i}
                    title={card.title}
                    description={card.description}
                  />
                ))}
              </div>
            </Reveal>
          </section>

          <Divider />

          {/* ══════════════════════════════════════════════════════════════
              5. FROM RESEARCH TO REALITY
          ══════════════════════════════════════════════════════════════ */}
          <section className="py-16 md:py-24">
            <Reveal className="mb-10">
              <Label>Methodology</Label>
              <SectionHeading>From Research to Reality</SectionHeading>
              <p className="font-['Blast_Dragon',sans-serif] text-[14px] leading-[2] text-[#8a8f98] max-w-[560px]">
                A structured, patient-centred process — from discovery through to a
                tested, high-fidelity mobile experience.
              </p>
            </Reveal>

            {/* Desktop timeline */}
            <Reveal delay={0.1}>
              <div className="hidden md:block relative mb-10">
                {/* Connecting line */}
                <div className="absolute top-5 left-[40px] right-[40px] h-px bg-gradient-to-r from-[#e10600]/40 via-[#D4AF37]/40 to-[#e10600]/40" />
                <div className="flex items-start gap-0">
                  {processSteps.map(({ step, label }) => (
                    <div key={step} className="flex-1 flex flex-col items-center text-center relative z-10">
                      <div className="w-10 h-10 rounded-full border-2 border-[#e10600] bg-[#070707] flex items-center justify-center mb-4">
                        <span className="font-['Blast_Dragon',sans-serif] text-[9px] tracking-[1px] text-[#e10600]">
                          {step}
                        </span>
                      </div>
                      <p className="font-['Blast_Dragon',sans-serif] text-[11px] tracking-[2px] text-[#eaeaea] uppercase">
                        {label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mobile timeline with descriptions */}
              <div className="flex md:hidden flex-col gap-0 relative pl-8 mb-10">
                <div className="absolute left-[15px] top-5 bottom-5 w-px bg-gradient-to-b from-[#e10600]/40 via-[#D4AF37]/40 to-[#e10600]/40" />
                {processSteps.map(({ step, label }) => (
                  <div key={step} className="flex items-center gap-5 mb-7 relative z-10">
                    <div className="w-[30px] h-[30px] shrink-0 rounded-full border-2 border-[#e10600] bg-[#070707] flex items-center justify-center">
                      <span className="font-['Blast_Dragon',sans-serif] text-[9px] text-[#e10600]">
                        {step}
                      </span>
                    </div>
                    <p className="font-['Blast_Dragon',sans-serif] text-[12px] tracking-[2px] text-[#eaeaea] uppercase">
                      {label}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>

            {/* Process descriptions — desktop only */}
            <Reveal delay={0.15}>
              <div className="hidden md:grid grid-cols-3 gap-6">
                {processSteps.map(({ step, label, description }) => (
                  <div
                    key={step}
                    className="border border-[#1e2028] rounded-2xl p-6 bg-[#0c0d10]"
                  >
                    <p className="font-['Blast_Dragon',sans-serif] text-[10px] tracking-[3px] text-[#e10600] uppercase mb-3">
                      {step} — {label}
                    </p>
                    <p className="font-['Blast_Dragon',sans-serif] text-[13px] leading-[1.8] text-[#8a8f98]">
                      {description}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
          </section>

          <Divider />

          {/* ══════════════════════════════════════════════════════════════
              6. VISUAL IDENTITY
          ══════════════════════════════════════════════════════════════ */}
          <section className="py-16 md:py-24">
            <Reveal className="mb-8">
              <Label>Design System</Label>
              <SectionHeading>A Visual Identity That Builds Trust</SectionHeading>
              <p className="font-['Blast_Dragon',sans-serif] text-[14px] leading-[2] text-[#8a8f98] max-w-[640px]">
                Every visual decision — from type scale to colour palette — was made to
                lower anxiety and raise confidence. The system needed to feel clinical
                enough to be credible and warm enough to feel human.
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                {/* Typography */}
                <div className="border border-[#1e2028] rounded-2xl p-7 bg-[#0c0d10] hover:border-[#D4AF37]/30 transition-colors flex flex-col">
                  <h4 className="font-['The_Last_Shuriken',sans-serif] text-[1.2rem] text-[#D4AF37] mb-4">
                    Typography
                  </h4>
                  <p className="font-['Blast_Dragon',sans-serif] text-[12px] leading-[1.8] text-[#8a8f98] mb-5">
                    Clean, readable UI typefaces chosen for health information — legible
                    at small sizes, calming at large display sizes.
                  </p>
                  <div className="flex flex-col gap-3 mt-auto">
                    {[
                      { name: 'Display',   weight: 'Bold',    size: '32px' },
                      { name: 'Heading',   weight: 'SemiBold', size: '24px' },
                      { name: 'Body',      weight: 'Regular', size: '16px' },
                      { name: 'Caption',   weight: 'Medium',  size: '12px' },
                    ].map(({ name, weight, size }) => (
                      <div key={name} className="flex items-center justify-between border-b border-[#1e2028] pb-2 last:border-0 last:pb-0">
                        <p className="font-['Blast_Dragon',sans-serif] text-[11px] text-[#eaeaea]">{name}</p>
                        <div className="text-right">
                          <p className="font-['Blast_Dragon',sans-serif] text-[10px] tracking-[1px] text-[#D4AF37]">{size}</p>
                          <p className="font-['Blast_Dragon',sans-serif] text-[9px] text-[#8a8f98]">{weight}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Color Strategy */}
                <div className="border border-[#1e2028] rounded-2xl p-7 bg-[#0c0d10] hover:border-[#D4AF37]/30 transition-colors flex flex-col">
                  <h4 className="font-['The_Last_Shuriken',sans-serif] text-[1.2rem] text-[#D4AF37] mb-4">
                    Color Strategy
                  </h4>
                  <p className="font-['Blast_Dragon',sans-serif] text-[12px] leading-[1.8] text-[#8a8f98] mb-5">
                    Soft reds and neutrals that evoke calm and trust — carefully calibrated
                    to feel reassuring rather than alarming.
                  </p>
                  <div className="flex flex-col gap-3 mt-auto">
                    {[
                      { label: 'Primary',   hex: '#C0392B', bg: 'bg-[#C0392B]' },
                      { label: 'Soft Red',  hex: '#E8827A', bg: 'bg-[#E8827A]' },
                      { label: 'Warm White',hex: '#F5F0EF', bg: 'bg-[#F5F0EF]' },
                      { label: 'Mid Neutral',hex: '#8A8F98', bg: 'bg-[#8A8F98]' },
                      { label: 'Deep BG',  hex: '#0D0E11', bg: 'bg-[#0D0E11]' },
                    ].map(({ label, hex, bg }) => (
                      <div key={hex} className="flex items-center gap-3">
                        <div className={`${bg} w-8 h-8 rounded-lg shrink-0 border border-white/10`} />
                        <div>
                          <p className="font-['Blast_Dragon',sans-serif] text-[11px] text-[#eaeaea] leading-tight">{label}</p>
                          <p className="font-['Blast_Dragon',sans-serif] text-[10px] tracking-[1px] text-[#8a8f98] mt-0.5">{hex}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Component System */}
                <div className="border border-[#1e2028] rounded-2xl p-7 bg-[#0c0d10] hover:border-[#D4AF37]/30 transition-colors flex flex-col">
                  <h4 className="font-['The_Last_Shuriken',sans-serif] text-[1.2rem] text-[#D4AF37] mb-4">
                    Component System
                  </h4>
                  <p className="font-['Blast_Dragon',sans-serif] text-[12px] leading-[1.8] text-[#8a8f98] mb-5">
                    Reusable cards and modules built for content-heavy health information —
                    composable, accessible, and consistent across all screens.
                  </p>
                  <div className="flex flex-col gap-4 mt-auto">
                    {[
                      { category: 'Info Cards',    items: ['Symptom', 'Treatment', 'FAQ'] },
                      { category: 'Navigation',    items: ['Tab Bar', 'Breadcrumb', 'Back'] },
                      { category: 'Actions',       items: ['Primary', 'Ghost', 'Link'] },
                    ].map(({ category, items }) => (
                      <div key={category} className="border-b border-[#1e2028] pb-3 last:border-0 last:pb-0">
                        <p className="font-['Blast_Dragon',sans-serif] text-[10px] tracking-[2px] text-[#D4AF37] uppercase mb-2">
                          {category}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {items.map((item) => (
                            <span
                              key={item}
                              className="font-['Blast_Dragon',sans-serif] text-[10px] tracking-[1px] text-[#8a8f98] border border-[#2a2d36] rounded-md px-2 py-1"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </Reveal>
          </section>

          <Divider />

          {/* ══════════════════════════════════════════════════════════════
              7. KEY SCREENS
          ══════════════════════════════════════════════════════════════ */}
          <section className="py-16 md:py-24">
            <Reveal className="mb-10">
              <Label>Final Product</Label>
              <SectionHeading>Key Screens That Tell the Story</SectionHeading>
              <p className="font-['Blast_Dragon',sans-serif] text-[14px] leading-[2] text-[#8a8f98] max-w-[560px]">
                High-fidelity screens from the shipped product — showing the core patient
                education, awareness, and navigation flows across the mobile app.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <Image
                src="/designs/ph-aware/key-screens.png"
                alt="PH Aware — Key Screens"
                width={1400}
                height={900}
                className="w-full h-auto object-contain rounded-2xl block mx-auto max-w-[1200px]"
              />
            </Reveal>
          </section>

          <Divider />

          {/* ══════════════════════════════════════════════════════════════
              8. DESIGNING FOR IMPACT
          ══════════════════════════════════════════════════════════════ */}
          <section className="py-16 md:py-24">
            <Reveal className="mb-8">
              <Label>Outcomes</Label>
              <SectionHeading>Designing for Real Impact</SectionHeading>
              <p className="font-['Blast_Dragon',sans-serif] text-[14px] leading-[2] text-[#8a8f98] max-w-[560px]">
                The platform created a measurable shift in how patients engage with their
                health — moving from confusion and anxiety to clarity and confidence.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <ImpactCard
                  title="Improved Awareness"
                  description="Patients better understand their symptoms and treatment pathways through clear, visual health content."
                />
                <ImpactCard
                  title="Simplified Education"
                  description="Complex health information made accessible through plain language, guided flows, and visual storytelling."
                />
                <ImpactCard
                  title="Empowered Patients"
                  description="Users gain confidence managing their health journey — reducing anxiety and improving treatment adherence."
                />
              </div>
            </Reveal>
          </section>

          {/* ── Next Project CTA ───────────────────────────────────────────── */}
          <Reveal>
            <div className="border-t border-[#1e2028] pt-10 pb-16 md:pb-24">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
                <div>
                  <p className="font-['Blast_Dragon',sans-serif] text-[10px] tracking-[4px] text-[#8a8f98] uppercase mb-3">
                    Next Case Study
                  </p>
                  <h2 className="font-['The_Last_Shuriken',sans-serif] text-[2rem] md:text-[2.8rem] text-[#eaeaea] leading-[1.1] mb-2">
                    Finova Expense Tracker
                  </h2>
                  <p className="font-['Blast_Dragon',sans-serif] text-[13px] text-[#8a8f98]">
                    Vibe Coding · SaaS Finance App
                  </p>
                </div>
                <Link
                  href="/work/finova"
                  className="group inline-flex items-center gap-3 font-['Blast_Dragon',sans-serif] text-[11px] tracking-[3px] uppercase px-8 py-4 border border-[#e10600] text-[#e10600] rounded-full hover:bg-[#e10600] hover:text-white transition-all duration-300"
                >
                  Next Case Study
                  <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
                </Link>
              </div>
            </div>
          </Reveal>

        </main>
      </div>
    </SmoothScroll>
  );
}
