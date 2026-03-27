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
    <p className="text-[11px] text-[#B91C1C] tracking-[4px] uppercase mb-3">
      {children}
    </p>
  );
}

/* ── Section heading ─────────────────────────────────────────────────────── */
function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-[2.2rem] md:text-[3rem] text-[#111827] leading-[1.1] mb-6">
      {children}
    </h2>
  );
}

/* ── Divider ─────────────────────────────────────────────────────────────── */
function Divider() {
  return (
    <div className="w-full h-px bg-gradient-to-r from-transparent via-[#E5E7EB] to-transparent" />
  );
}

/* ── Challenge card ───────────────────────────────────────────────────────── */
function ChallengeCard({ title, description, index }: {
  title: string;
  description: string;
  index: number;
}) {
  return (
    <div className="border border-[#E5E7EB] rounded-2xl p-7 bg-white hover:border-[#B91C1C]/30 transition-colors duration-300">
      <p className="text-[10px] tracking-[3px] text-[#B91C1C] uppercase mb-4">
        0{index + 1}
      </p>
      <h3 className="text-[1.3rem] text-[#111827] mb-3">
        {title}
      </h3>
      <p className="text-[13px] leading-[1.8] text-[#6B7280]">
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
    <div className="border border-[#E5E7EB] rounded-2xl p-7 bg-white hover:border-[#B91C1C]/30 transition-colors duration-300">
      <p className="text-[10px] tracking-[3px] text-[#B91C1C] uppercase mb-4">
        {String(index + 1).padStart(2, '0')}
      </p>
      <h3 className="text-[1.2rem] text-[#111827] mb-3">
        {title}
      </h3>
      <p className="text-[13px] leading-[1.8] text-[#6B7280]">
        {description}
      </p>
    </div>
  );
}

/* ── Metric card ─────────────────────────────────────────────────────────── */
function MetricCard({ value, label, explanation }: { value: string; label: string; explanation: string }) {
  return (
    <div className="border border-[#E5E7EB] rounded-2xl p-8 text-center bg-white hover:border-[#B91C1C]/40 transition-colors duration-300 flex flex-col items-center">
      <p className="text-[2.8rem] md:text-[3.5rem] text-[#B91C1C] leading-none mb-3">
        {value}
      </p>
      <p className="text-[11px] tracking-[3px] text-[#111827] uppercase mb-4">
        {label}
      </p>
      <p className="text-[12px] leading-[1.8] text-[#6B7280] max-w-[200px]">
        {explanation}
      </p>
    </div>
  );
}

/* ── Impact card ─────────────────────────────────────────────────────────── */
function ImpactCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="border border-[#E5E7EB] rounded-2xl p-8 bg-white hover:border-[#B91C1C]/40 transition-colors duration-300 flex flex-col">
      <div className="w-8 h-8 rounded-full border border-[#B91C1C]/40 flex items-center justify-center mb-5">
        <span className="w-2 h-2 rounded-full bg-[#B91C1C]" />
      </div>
      <h3 className="text-[1.4rem] text-[#111827] mb-3">
        {title}
      </h3>
      <p className="text-[13px] leading-[1.8] text-[#6B7280]">
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
      <div className="min-h-screen bg-[#FAFAFA] text-[#111827]">
        <Navbar />

        {/* ── Back link ──────────────────────────────────────────────────── */}
        <div className="pt-24 pb-0 px-6 max-w-[1100px] mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[11px] tracking-[3px] text-[#6B7280] uppercase hover:text-[#B91C1C] transition-colors"
          >
            ← Back to Work
          </Link>
        </div>

        <main className="px-6 max-w-[1100px] mx-auto">

          {/* ══════════════════════════════════════════════════════════════
              1. HERO
          ══════════════════════════════════════════════════════════════ */}
          <section className="pt-10 pb-12 md:pb-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

              {/* Left — text */}
              <Reveal>
                <Label>Health Tech · Mobile App</Label>
                <h1 className="text-[2.8rem] md:text-[3.8rem] lg:text-[4.4rem] text-[#111827] leading-[1.05] mb-4">
                  Designing a Digital Awareness Platform for Pulmonary Arterial Hypertension
                </h1>
                <p className="text-[14px] leading-[2] text-[#6B7280] mb-6 max-w-[480px]">
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
                      <p className="text-[10px] tracking-[3px] text-[#B91C1C] uppercase mb-1">
                        {label}
                      </p>
                      <p className="text-[13px] text-[#111827]">
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
                  width={1000}
                  height={900}
                  className="w-full h-auto object-contain rounded-[12px] block mx-auto max-w-[1000px]"
                  style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.06)' }}
                  priority
                />
              </Reveal>
            </div>
          </section>

          <Divider />

          {/* ══════════════════════════════════════════════════════════════
              PROJECT OVERVIEW
          ══════════════════════════════════════════════════════════════ */}
          <section className="py-12 md:py-20">
            <Reveal className="mb-8">
              <Label>Project Overview</Label>
              <SectionHeading>At a Glance</SectionHeading>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="mb-5">
                <div className="border border-[#E5E7EB] rounded-2xl p-7 bg-white">
                  <p className="text-[10px] tracking-[3px] text-[#B91C1C] uppercase mb-3">Problem</p>
                  <p className="text-[14px] leading-[2] text-[#111827]">
                    Patients with Pulmonary Arterial Hypertension lacked accessible digital tools to understand their diagnosis, navigate treatment pathways, and access reliable health information — leaving them without support during one of the most difficult periods of their lives.
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="border border-[#E5E7EB] rounded-2xl p-6 bg-white">
                  <p className="text-[10px] tracking-[3px] text-[#B91C1C] uppercase mb-2">Role</p>
                  <p className="text-[13px] leading-[1.8] text-[#111827]">Product Designer responsible for UX strategy and end-to-end design execution.</p>
                </div>
                <div className="border border-[#E5E7EB] rounded-2xl p-6 bg-white">
                  <p className="text-[10px] tracking-[3px] text-[#B91C1C] uppercase mb-2">Platform</p>
                  <p className="text-[13px] leading-[1.8] text-[#111827]">Mobile-first health awareness app (iOS & Android).</p>
                </div>
                <div className="border border-[#E5E7EB] rounded-2xl p-6 bg-white">
                  <p className="text-[10px] tracking-[3px] text-[#B91C1C] uppercase mb-2">Duration</p>
                  <p className="text-[13px] leading-[1.8] text-[#111827]">6 months</p>
                </div>
              </div>
            </Reveal>
          </section>

          <Divider />

          {/* ══════════════════════════════════════════════════════════════
              2. MY ROLE
          ══════════════════════════════════════════════════════════════ */}
          <section className="py-12 md:py-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
              <Reveal>
                <Label>Leadership</Label>
                <SectionHeading>My Role</SectionHeading>
                <p className="text-[14px] leading-[2] text-[#6B7280]">
                  As the sole designer on this engagement, I owned the end-to-end UX
                  process — from discovery through to engineering handoff — while
                  designing a platform that needed to balance clinical credibility with
                  emotional warmth for patients navigating a rare chronic illness.
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <ul className="flex flex-col gap-4 lg:mt-[5.5rem]">
                  {[
                    'Led UX strategy for a patient-facing mobile health awareness platform',
                    'Designed mobile-first experience for PAH patient education and awareness',
                    'Created a visual language that balanced clinical credibility with emotional warmth',
                    'Structured complex medical information into accessible, guided patient flows',
                    'Built a reusable component system for scalable health content delivery',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-4">
                      <span className="mt-[6px] w-1.5 h-1.5 rounded-full bg-[#B91C1C] shrink-0" />
                      <p className="text-[13px] leading-[1.9] text-[#6B7280]">
                        {item}
                      </p>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </section>

          <Divider />

          {/* ══════════════════════════════════════════════════════════════
              3. REAL-WORLD CHALLENGES
          ══════════════════════════════════════════════════════════════ */}
          <section className="py-12 md:py-20">
            <Reveal className="mb-8">
              <Label>The Problem</Label>
              <SectionHeading>Real-World Challenges Faced by PAH Patients</SectionHeading>
              <p className="text-[14px] leading-[2] text-[#6B7280] max-w-[640px]">
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
          <section className="py-12 md:py-20">
            <Reveal className="mb-10">
              <Label>User Research</Label>
              <SectionHeading>Seeing the World Through Their Eyes</SectionHeading>
            </Reveal>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Patient Pain Points */}
              <Reveal>
                <div className="border border-[#E5E7EB] rounded-2xl p-8 bg-white h-full hover:border-[#B91C1C]/30 transition-colors duration-300">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="w-2 h-2 rounded-full bg-[#B91C1C] shrink-0" />
                    <p className="text-[10px] tracking-[3px] text-[#B91C1C] uppercase">
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
                        <span className="mt-[7px] w-1.5 h-1.5 rounded-full bg-[#B91C1C]/60 shrink-0" />
                        <p className="text-[13px] leading-[1.9] text-[#6B7280]">
                          {point}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>

              {/* Design Opportunities */}
              <Reveal delay={0.1}>
                <div className="border border-[#E5E7EB] rounded-2xl p-8 bg-white h-full hover:border-[#B91C1C]/30 transition-colors duration-300">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="w-2 h-2 rounded-full bg-[#B91C1C] shrink-0" />
                    <p className="text-[10px] tracking-[3px] text-[#B91C1C] uppercase">
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
                        <span className="mt-[7px] w-1.5 h-1.5 rounded-full bg-[#B91C1C]/60 shrink-0" />
                        <p className="text-[13px] leading-[1.9] text-[#6B7280]">
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
          <section className="py-12 md:py-20">
            <Reveal className="mb-8">
              <Label>Design Strategy</Label>
              <SectionHeading>Strategy Rooted in Empathy</SectionHeading>
              <p className="text-[14px] leading-[2] text-[#6B7280] max-w-[640px]">
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
              SYSTEM THINKING
          ══════════════════════════════════════════════════════════════ */}
          <section className="py-12 md:py-20">
            <Reveal className="mb-8">
              <Label>System Thinking</Label>
              <SectionHeading>How the Design Addressed Platform Complexity</SectionHeading>
              <p className="text-[14px] leading-[2] text-[#6B7280] max-w-[640px]">
                Designing for patients navigating a rare chronic illness required more than good visuals — it demanded a structured, scalable approach to information architecture, content delivery, and emotional experience.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {[
                  {
                    num: '01',
                    title: 'Patient-Centered Information Architecture',
                    body: 'Medical content was mapped around patient needs and awareness stages — ensuring information is encountered in the right sequence, at the right depth, without overwhelming first-time users.',
                  },
                  {
                    num: '02',
                    title: 'Progressive Content Disclosure',
                    body: 'Complex medical information is broken into layered steps — foundational concepts first, detailed clinical data accessible on demand — reducing cognitive load while maintaining clinical accuracy.',
                  },
                  {
                    num: '03',
                    title: 'Scalable Component Architecture',
                    body: 'A reusable set of health content cards, navigation modules, and awareness flow components — built for consistency across all screens and extensible as new content areas are added.',
                  },
                  {
                    num: '04',
                    title: 'Guided Awareness Flows',
                    body: 'Core patient journeys — symptom awareness, treatment understanding, and support access — designed as structured, step-by-step flows that guide patients from confusion to confidence.',
                  },
                ].map(({ num, title, body }) => (
                  <div
                    key={num}
                    className="border border-[#E5E7EB] rounded-2xl p-7 bg-white hover:border-[#B91C1C]/30 transition-colors duration-300"
                  >
                    <p className="text-[10px] tracking-[3px] text-[#B91C1C] uppercase mb-4">
                      {num}
                    </p>
                    <h3 className="text-[1.2rem] text-[#111827] mb-3">
                      {title}
                    </h3>
                    <p className="text-[13px] leading-[1.9] text-[#6B7280]">
                      {body}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
          </section>

          <Divider />

          {/* ══════════════════════════════════════════════════════════════
              5. FROM RESEARCH TO REALITY
          ══════════════════════════════════════════════════════════════ */}
          <section className="py-12 md:py-20">
            <Reveal className="mb-10">
              <Label>Methodology</Label>
              <SectionHeading>From Research to Reality</SectionHeading>
              <p className="text-[14px] leading-[2] text-[#6B7280] max-w-[560px]">
                A structured, patient-centred process — from discovery through to a
                tested, high-fidelity mobile experience.
              </p>
            </Reveal>

            {/* Desktop timeline */}
            <Reveal delay={0.1}>
              <div className="hidden md:block relative mb-10">
                {/* Connecting line */}
                <div className="absolute top-5 left-[40px] right-[40px] h-px bg-gradient-to-r from-[#B91C1C]/30 via-[#B91C1C]/20 to-[#B91C1C]/30" />
                <div className="flex items-start gap-0">
                  {processSteps.map(({ step, label }) => (
                    <div key={step} className="flex-1 flex flex-col items-center text-center relative z-10">
                      <div className="w-10 h-10 rounded-full border-2 border-[#B91C1C] bg-white flex items-center justify-center mb-4">
                        <span className="text-[9px] tracking-[1px] text-[#B91C1C]">
                          {step}
                        </span>
                      </div>
                      <p className="text-[11px] tracking-[2px] text-[#111827] uppercase">
                        {label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mobile timeline with descriptions */}
              <div className="flex md:hidden flex-col gap-0 relative pl-8 mb-10">
                <div className="absolute left-[15px] top-5 bottom-5 w-px bg-gradient-to-b from-[#B91C1C]/30 via-[#B91C1C]/20 to-[#B91C1C]/30" />
                {processSteps.map(({ step, label }) => (
                  <div key={step} className="flex items-center gap-5 mb-7 relative z-10">
                    <div className="w-[30px] h-[30px] shrink-0 rounded-full border-2 border-[#B91C1C] bg-white flex items-center justify-center">
                      <span className="text-[9px] text-[#B91C1C]">
                        {step}
                      </span>
                    </div>
                    <p className="text-[12px] tracking-[2px] text-[#111827] uppercase">
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
                    className="border border-[#E5E7EB] rounded-2xl p-6 bg-white"
                  >
                    <p className="text-[10px] tracking-[3px] text-[#B91C1C] uppercase mb-3">
                      {step} — {label}
                    </p>
                    <p className="text-[13px] leading-[1.8] text-[#6B7280]">
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
          <section className="py-12 md:py-20">
            <Reveal className="mb-8">
              <Label>Design System</Label>
              <SectionHeading>A Visual Identity That Builds Trust</SectionHeading>
              <p className="text-[14px] leading-[2] text-[#6B7280] max-w-[640px]">
                Every visual decision — from type scale to colour palette — was made to
                lower anxiety and raise confidence. The system needed to feel clinical
                enough to be credible and warm enough to feel human.
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                {/* Typography */}
                <div className="border border-[#E5E7EB] rounded-2xl p-7 bg-white hover:border-[#B91C1C]/30 transition-colors flex flex-col">
                  <h4 className="text-[1.2rem] text-[#B91C1C] mb-4">
                    Typography
                  </h4>
                  <p className="text-[12px] leading-[1.8] text-[#6B7280] mb-5">
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
                      <div key={name} className="flex items-center justify-between border-b border-[#E5E7EB] pb-2 last:border-0 last:pb-0">
                        <p className="text-[11px] text-[#111827]">{name}</p>
                        <div className="text-right">
                          <p className="text-[10px] tracking-[1px] text-[#B91C1C]">{size}</p>
                          <p className="text-[9px] text-[#6B7280]">{weight}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Color Strategy */}
                <div className="border border-[#E5E7EB] rounded-2xl p-7 bg-white hover:border-[#B91C1C]/30 transition-colors flex flex-col">
                  <h4 className="text-[1.2rem] text-[#B91C1C] mb-4">
                    Color Strategy
                  </h4>
                  <p className="text-[12px] leading-[1.8] text-[#6B7280] mb-5">
                    Soft reds and neutrals that evoke calm and trust — carefully calibrated
                    to feel reassuring rather than alarming.
                  </p>
                  <div className="flex flex-col gap-3 mt-auto">
                    {[
                      { label: 'Primary',    hex: '#C0392B', bg: 'bg-[#C0392B]' },
                      { label: 'Soft Red',   hex: '#E8827A', bg: 'bg-[#E8827A]' },
                      { label: 'Warm White', hex: '#F5F0EF', bg: 'bg-[#F5F0EF]' },
                      { label: 'Mid Neutral',hex: '#8A8F98', bg: 'bg-[#8A8F98]' },
                      { label: 'Deep BG',    hex: '#0D0E11', bg: 'bg-[#0D0E11]' },
                    ].map(({ label, hex, bg }) => (
                      <div key={hex} className="flex items-center gap-3">
                        <div className={`${bg} w-8 h-8 rounded-lg shrink-0 border border-[#E5E7EB]`} />
                        <div>
                          <p className="text-[11px] text-[#111827] leading-tight">{label}</p>
                          <p className="text-[10px] tracking-[1px] text-[#6B7280] mt-0.5">{hex}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Component System */}
                <div className="border border-[#E5E7EB] rounded-2xl p-7 bg-white hover:border-[#B91C1C]/30 transition-colors flex flex-col">
                  <h4 className="text-[1.2rem] text-[#B91C1C] mb-4">
                    Component System
                  </h4>
                  <p className="text-[12px] leading-[1.8] text-[#6B7280] mb-5">
                    Reusable cards and modules built for content-heavy health information —
                    composable, accessible, and consistent across all screens.
                  </p>
                  <div className="flex flex-col gap-4 mt-auto">
                    {[
                      { category: 'Info Cards',    items: ['Symptom', 'Treatment', 'FAQ'] },
                      { category: 'Navigation',    items: ['Tab Bar', 'Breadcrumb', 'Back'] },
                      { category: 'Actions',       items: ['Primary', 'Ghost', 'Link'] },
                    ].map(({ category, items }) => (
                      <div key={category} className="border-b border-[#E5E7EB] pb-3 last:border-0 last:pb-0">
                        <p className="text-[10px] tracking-[2px] text-[#B91C1C] uppercase mb-2">
                          {category}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {items.map((item) => (
                            <span
                              key={item}
                              className="text-[10px] tracking-[1px] text-[#6B7280] border border-[#E5E7EB] rounded-md px-2 py-1"
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
          <section className="py-12 md:py-20">
            <Reveal className="mb-10">
              <Label>Final Product</Label>
              <SectionHeading>Key Screens That Tell the Story</SectionHeading>
              <p className="text-[14px] leading-[2] text-[#6B7280] max-w-[560px]">
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
                className="w-full h-auto object-contain rounded-[12px] block mx-auto max-w-[1000px]"
                style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.06)' }}
              />
            </Reveal>
          </section>

          <Divider />

          {/* ══════════════════════════════════════════════════════════════
              8. DESIGNING FOR IMPACT
          ══════════════════════════════════════════════════════════════ */}
          <section className="py-12 md:py-20">
            <Reveal className="mb-8">
              <Label>Outcomes</Label>
              <SectionHeading>Designing for Real Impact</SectionHeading>
              <p className="text-[14px] leading-[2] text-[#6B7280] max-w-[560px]">
                The platform created a measurable shift in how patients engage with their
                health — moving from confusion and anxiety to clarity and confidence.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <MetricCard
                  value="50+"
                  label="Screens Designed"
                  explanation="A complete mobile experience covering symptom awareness, treatment journeys, and patient support — all within a single unified design system."
                />
                <MetricCard
                  value="3"
                  label="Core Patient Flows"
                  explanation="Symptom awareness, treatment pathway guidance, and emotional support — structured as guided, step-by-step experiences for patients."
                />
                <MetricCard
                  value="100%"
                  label="Mobile-First Design"
                  explanation="Every screen designed for thumb-friendly, on-the-go use — ensuring patients can access critical health information wherever they are."
                />
              </div>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <ImpactCard
                  title="Improved Accessibility to Healthcare Information"
                  description="Patients better understand their symptoms and treatment pathways through clear, visual health content."
                />
                <ImpactCard
                  title="Mobile-First Awareness Platform"
                  description="Complex health information made accessible through plain language, guided flows, and visual storytelling — designed for on-the-go use."
                />
                <ImpactCard
                  title="Simplified Complex Medical Education Content"
                  description="Users gain confidence managing their health journey — reducing anxiety and improving treatment adherence through structured, approachable content."
                />
              </div>
            </Reveal>
          </section>

          {/* ── Next Project CTA ───────────────────────────────────────────── */}
          <Reveal>
            <div className="border-t border-[#E5E7EB] pt-10 pb-12 md:pb-20">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
                <div>
                  <p className="text-[10px] tracking-[4px] text-[#6B7280] uppercase mb-3">
                    Next Case Study
                  </p>
                  <h2 className="text-[2rem] md:text-[2.8rem] text-[#111827] leading-[1.1] mb-2">
                    Finova Expense Tracker
                  </h2>
                  <p className="text-[13px] text-[#6B7280]">
                    Vibe Coding · SaaS Finance App
                  </p>
                </div>
                <Link
                  href="/work/finova"
                  className="group inline-flex items-center gap-3 text-[11px] tracking-[3px] uppercase px-8 py-4 border border-[#B91C1C] text-[#B91C1C] rounded-full hover:bg-[#B91C1C] hover:text-white transition-all duration-300"
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
