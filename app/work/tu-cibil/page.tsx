'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/app/components/Navbar';
import SmoothScroll from '@/app/components/SmoothScroll';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeUp = {
  hidden:  { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.85, ease: EASE } },
};

const stagger = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.12 } },
};

/* ── Reusable reveal wrapper ─────────────────────────────────────────────── */
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

/* ── Section label ───────────────────────────────────────────────────────── */
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
    <h2 className="font-['The_Last_Shuriken',sans-serif] text-white text-[36px] sm:text-[44px] md:text-[56px] leading-none mb-6">
      {children}
    </h2>
  );
}

/* ── Divider ─────────────────────────────────────────────────────────────── */
function Divider() {
  return (
    <div className="w-full h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent my-24" />
  );
}

/* ── Full-width image block ──────────────────────────────────────────────── */
function FullImage({ src, alt, aspect = '16/7' }: { src: string; alt: string; aspect?: string }) {
  return (
    <Reveal>
      <div
        className="w-full relative overflow-hidden rounded-2xl bg-[#0e1117] border border-white/[0.06]"
        style={{ aspectRatio: aspect }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover object-top"
          sizes="100vw"
        />
      </div>
    </Reveal>
  );
}

/* ── Strategy pill ───────────────────────────────────────────────────────── */
function StrategyPill({ number, title, body }: { number: string; title: string; body: string }) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-8% 0px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, ease: EASE }}
      className="flex gap-5 items-start bg-[#0e1117] border border-white/[0.06] rounded-2xl p-7
        hover:border-[#e10600]/20 transition-colors duration-300"
    >
      <span className="font-['Blast_Dragon',sans-serif] text-[11px] text-[#e10600] tracking-[3px] mt-[3px] shrink-0">
        {number}
      </span>
      <div className="flex flex-col gap-2">
        <h3 className="font-['The_Last_Shuriken',sans-serif] text-white text-[20px] leading-tight">
          {title}
        </h3>
        <p className="font-['Blast_Dragon',sans-serif] text-[13px] text-[#8a8f98] leading-[26px] tracking-[0.3px]">
          {body}
        </p>
      </div>
    </motion.div>
  );
}

/* ── Impact stat ─────────────────────────────────────────────────────────── */
function ImpactStat({ value, label, delay }: { value: string; label: string; delay: number }) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-8% 0px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.75, delay, ease: EASE }}
      className="flex flex-col items-center gap-3 text-center"
    >
      <span
        className="font-['The_Last_Shuriken',sans-serif] text-[72px] sm:text-[88px] leading-none"
        style={{ color: '#D4AF37', textShadow: '0 0 40px rgba(212,175,55,0.3)' }}
      >
        {value}
      </span>
      <p className="font-['Blast_Dragon',sans-serif] text-[12px] text-[#8a8f98] tracking-[2px] uppercase max-w-[180px] leading-[22px]">
        {label}
      </p>
    </motion.div>
  );
}

/* ── Learning card ───────────────────────────────────────────────────────── */
function LearningCard({ title, body }: { title: string; body: string }) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-8% 0px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, ease: EASE }}
      className="flex flex-col gap-3 border-l-2 border-[#e10600]/40 pl-6 py-1"
    >
      <h3 className="font-['The_Last_Shuriken',sans-serif] text-white text-[20px] leading-tight">
        {title}
      </h3>
      <p className="font-['Blast_Dragon',sans-serif] text-[13px] text-[#8a8f98] leading-[26px] tracking-[0.3px]">
        {body}
      </p>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════ */
export default function TuCibilCaseStudy() {
  const heroRef = useRef<HTMLElement>(null);

  return (
    <SmoothScroll>
      <div className="min-h-screen w-full bg-[#070707] overflow-x-hidden">
        <Navbar />

        {/* ── 1. HERO – PROJECT OVERVIEW ───────────────────────────────────── */}
        <section ref={heroRef} className="relative w-full min-h-screen flex flex-col justify-center pt-[120px] pb-[80px] overflow-hidden">

          {/* Background glow */}
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse 70% 60% at 60% 40%, rgba(0,37,99,0.35) 0%, transparent 65%)',
            }}
          />

          <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12">

            {/* Tag */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
            >
              <span className="inline-flex items-center px-4 py-[7px] rounded-full
                font-['Blast_Dragon',sans-serif] text-[11px] tracking-[2px] uppercase text-white
                bg-[#002563] border border-[#002563]/60 mb-8">
                FinTech Case Study
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.3, ease: EASE }}
              className="font-['The_Last_Shuriken',sans-serif] text-white
                text-[52px] sm:text-[72px] md:text-[96px] lg:text-[112px]
                leading-[1.0] tracking-tight mb-5 max-w-[900px]"
            >
              TU{' '}
              <span style={{ color: '#D4AF37' }}>CIBIL</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.38, ease: EASE }}
              className="font-['The_Last_Shuriken',sans-serif] text-white/40 text-[18px] sm:text-[22px] leading-tight mb-6 max-w-[700px]"
            >
              Modernizing India's credit decision infrastructure
            </motion.p>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.46, ease: EASE }}
              className="font-['Blast_Dragon',sans-serif] text-[14px] sm:text-[16px] text-[#8a8f98]
                leading-[30px] tracking-[0.3px] max-w-[560px] mb-12"
            >
              A ground-up redesign of India's national credit bureau platform — a high-security
              enterprise system used daily by banks and financial institutions to evaluate
              creditworthiness, manage risk, and make real-time lending decisions at scale.
            </motion.p>

            {/* Meta + Responsibilities */}
            <motion.div
              variants={stagger}
              initial="hidden"
              animate="visible"
              className="flex flex-col gap-8 pt-8 border-t border-white/[0.06]"
            >
              {/* Meta row */}
              <div className="flex flex-wrap gap-x-10 gap-y-5">
                {[
                  { label: 'Role',     value: 'Lead UX Designer' },
                  { label: 'Duration', value: '36 Months'        },
                  { label: 'Team',     value: 'Solo Designer'    },
                ].map(m => (
                  <motion.div key={m.label} variants={fadeUp} className="flex flex-col gap-[5px]">
                    <span className="font-['Blast_Dragon',sans-serif] text-[10px] tracking-[2px] uppercase text-white/30">
                      {m.label}
                    </span>
                    <span className="font-['Blast_Dragon',sans-serif] text-[14px] font-semibold text-white/90 whitespace-nowrap">
                      {m.value}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* My Responsibility */}
              <motion.div variants={fadeUp} className="flex flex-col gap-3">
                <span className="font-['Blast_Dragon',sans-serif] text-[10px] tracking-[2px] uppercase text-white/30">
                  My Responsibility
                </span>
                <div className="flex flex-wrap gap-2">
                  {[
                    'UX Strategy',
                    'Product Architecture',
                    'Design System',
                    'Interaction Design',
                    'Stakeholder Alignment',
                  ].map(r => (
                    <span
                      key={r}
                      className="font-['Blast_Dragon',sans-serif] text-[11px] tracking-[1.5px] uppercase
                        px-4 py-[6px] rounded-full text-white/70 border border-white/[0.08] bg-white/[0.03]"
                    >
                      {r}
                    </span>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Hero image */}
          <motion.div
            initial={{ opacity: 0, y: 48 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.6, ease: EASE }}
            className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 mt-20"
          >
            <div className="w-full aspect-[16/7] relative overflow-hidden rounded-2xl bg-[#0e1117] border border-white/[0.06]"
              style={{ boxShadow: '0 40px 100px rgba(0,0,0,0.7)' }}
            >
              <Image
                src="/designs/tu-cibil/hero-image.png"
                alt="TU CIBIL — Credit Intelligence Platform"
                fill
                priority
                className="object-cover object-center"
                sizes="100vw"
              />
              <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#070707] to-transparent pointer-events-none" />
            </div>
          </motion.div>
        </section>

        {/* ── 2. THE PROBLEM – LEGACY SYSTEM ───────────────────────────────── */}
        <section className="relative w-full py-24">
          <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12">

            <Reveal>
              <Label>The Problem</Label>
              <SectionHeading>
                A legacy system{' '}
                <span style={{ color: '#e10600' }}>holding decisions hostage.</span>
              </SectionHeading>
              <p className="font-['Blast_Dragon',sans-serif] text-[14px] sm:text-[16px] text-[#8a8f98]
                leading-[30px] tracking-[0.3px] max-w-[680px] mb-14">
                India's credit ecosystem ran on a platform built for an earlier era. Bank managers
                and financial analysts — operating under real-time pressure to approve or reject
                loans worth crores — were fighting an interface that actively worked against them.
                Every extra click, every broken workflow, every missed signal had a direct cost:
                delayed decisions, compliance exposure, and lost lending opportunity.
              </p>
            </Reveal>

            {/* Problem points */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
              {[
                { tag: '01', title: 'Fragmented Workflows',    body: 'Related tasks were scattered across disconnected modules with no unifying logic. Switching between a customer record, their credit history, and the decision screen required navigating through three separate contexts.' },
                { tag: '02', title: 'Outdated UI Patterns',    body: 'The interface mirrored the underlying database structure rather than the user\'s workflow. Dense forms, no visual hierarchy, no progress feedback — the mental model was the user\'s problem to solve.' },
                { tag: '03', title: 'Slow Data Discovery',     body: 'Critical credit signals were buried in flat, unsorted tables. No scoring visualization, no risk categorization — analysts had to manually interpret raw data under time pressure.' },
                { tag: '04', title: 'Difficult Navigation',    body: 'No logical information grouping across credit records, search filters, or bulk actions. Users built workarounds and memorized broken pathways rather than discovering flows naturally.' },
                { tag: '05', title: 'Compliance-Heavy Flows',  body: 'Mandatory regulatory checkpoints were embedded mid-task with no contextual guidance. Errors were common, rework was frequent, and audit trails were incomplete.' },
              ].map(p => (
                <Reveal key={p.tag}>
                  <div className="flex flex-col gap-3 bg-[#0e1117] border border-white/[0.06] rounded-2xl p-7
                    hover:border-[#e10600]/20 transition-colors duration-300 h-full">
                    <span className="font-['Blast_Dragon',sans-serif] text-[10px] text-[#e10600] tracking-[3px] uppercase">
                      {p.tag}
                    </span>
                    <h3 className="font-['The_Last_Shuriken',sans-serif] text-white text-[20px] leading-tight">
                      {p.title}
                    </h3>
                    <p className="font-['Blast_Dragon',sans-serif] text-[13px] text-[#8a8f98] leading-[26px] tracking-[0.3px]">
                      {p.body}
                    </p>
                  </div>
                </Reveal>
              ))}
              {/* Why it mattered card */}
              <Reveal>
                <div className="flex flex-col gap-3 bg-[#0e1117] border border-[#e10600]/20 rounded-2xl p-7 h-full">
                  <span className="font-['Blast_Dragon',sans-serif] text-[10px] text-[#e10600] tracking-[3px] uppercase">
                    Why It Mattered
                  </span>
                  <p className="font-['Blast_Dragon',sans-serif] text-[13px] text-[#8a8f98] leading-[26px] tracking-[0.3px]">
                    Financial institutions process thousands of credit queries daily through this
                    platform. Each friction point directly translates to delayed lending decisions,
                    increased compliance risk, and lost revenue. For the product team, modernization
                    wasn't a cosmetic exercise — it was a business-critical mandate tied to
                    institutional performance metrics.
                  </p>
                </div>
              </Reveal>
            </div>

            <FullImage
              src="/designs/tu-cibil/before-image.png"
              alt="TU CIBIL legacy interface — before redesign"
              aspect="16/7"
            />
            <Reveal>
              <p className="font-['Blast_Dragon',sans-serif] text-[11px] tracking-[2px] uppercase text-[#8a8f98] mt-4 text-center">
                Legacy Interface — Before Redesign
              </p>
            </Reveal>
          </div>
        </section>

        <Divider />

        {/* ── 3. UNDERSTANDING THE SYSTEM ──────────────────────────────────── */}
        <section className="relative w-full py-24">
          <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12">

            <Reveal>
              <Label>System Thinking</Label>
              <SectionHeading>
                More than a UI redesign —{' '}
                <span style={{ color: '#D4AF37' }}>a systems challenge.</span>
              </SectionHeading>
              <p className="font-['Blast_Dragon',sans-serif] text-[14px] sm:text-[16px] text-[#8a8f98]
                leading-[30px] tracking-[0.3px] max-w-[680px] mb-14">
                Before sketching a single screen, I spent weeks mapping the entire data ecosystem.
                A credit bureau platform isn't a form with buttons — it's a living web of entities,
                scores, histories, dispute records, and regulatory flows that all reference each
                other. Getting the information architecture right meant understanding how each
                data relationship actually served a decision-making moment. The UI was the last
                thing to design, not the first.
              </p>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
              {[
                {
                  role: 'Bank Managers',
                  need: 'Decisive overview. They need risk signals at a glance to approve or escalate — not raw tables requiring interpretation. Speed and confidence are the design target.',
                },
                {
                  role: 'Credit Analysts',
                  need: 'Deep investigation capability. They need to navigate credit history, dispute records, and detailed score breakdowns without losing context across sections.',
                },
                {
                  role: 'Lenders & Approvers',
                  need: 'Workflow clarity. They need step-by-step guidance through multi-stage application flows and compliance gates without ambiguity about what comes next.',
                },
              ].map(u => (
                <Reveal key={u.role}>
                  <div className="flex flex-col gap-3 border border-white/[0.06] rounded-2xl p-7 bg-[#0e1117]
                    hover:border-[#D4AF37]/20 transition-colors duration-300">
                    <span className="font-['Blast_Dragon',sans-serif] text-[10px] tracking-[3px] uppercase"
                      style={{ color: '#D4AF37' }}>
                      User Role
                    </span>
                    <h3 className="font-['The_Last_Shuriken',sans-serif] text-white text-[20px] leading-tight">
                      {u.role}
                    </h3>
                    <p className="font-['Blast_Dragon',sans-serif] text-[13px] text-[#8a8f98] leading-[26px] tracking-[0.3px]">
                      {u.need}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>

            <FullImage
              src="/designs/tu-cibil/data-hierarchy-imagepng.png"
              alt="TU CIBIL — data hierarchy and information architecture"
              aspect="16/7"
            />
            <Reveal>
              <p className="font-['Blast_Dragon',sans-serif] text-[11px] tracking-[2px] uppercase text-[#8a8f98] mt-4 text-center">
                Information Architecture — Data Hierarchy Mapping
              </p>
            </Reveal>
          </div>
        </section>

        <Divider />

        {/* ── 4. UX STRATEGY ───────────────────────────────────────────────── */}
        <section className="relative w-full py-24">
          <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12">

            <Reveal>
              <Label>UX Strategy</Label>
              <SectionHeading>
                Five principles that{' '}
                <span style={{ color: '#e10600' }}>guided every decision.</span>
              </SectionHeading>
              <p className="font-['Blast_Dragon',sans-serif] text-[14px] sm:text-[16px] text-[#8a8f98]
                leading-[30px] tracking-[0.3px] max-w-[600px] mb-14">
                Redesigning a regulated financial platform meant making hard calls. Every design
                decision involved tradeoffs between user efficiency, data depth, regulatory
                requirements, and institutional risk tolerance. To keep the team aligned and
                scope controlled, I defined five non-negotiable principles that acted as the
                decision filter throughout the entire 36-month engagement.
              </p>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <StrategyPill
                number="01"
                title="Simplify Complex Credit Data"
                body="Multi-layered numerical data had to become scannable visual hierarchy. The design goal: a user should read risk signal in seconds — not after minutes of table parsing. Every data view was audited and restructured around this standard."
              />
              <StrategyPill
                number="02"
                title="Prioritize Critical Insights"
                body="Not all data is equal. The most decision-relevant information had to live at the entry point of every screen. Secondary and supporting data belongs behind progressive disclosure — never competing for attention with the primary signal."
              />
              <StrategyPill
                number="03"
                title="Reduce Cognitive Load"
                body="Complex multi-step flows were decomposed into guided, focused stages. Unnecessary fields were cut. Context was surfaced at the right moment. Error prevention was designed in — not patched in after usability testing."
              />
              <StrategyPill
                number="04"
                title="Support Faster Credit Decisions"
                body="Every pattern — from dashboard layout to filter placement to navigation depth — was evaluated against a single business outcome: enabling faster, more confident lending decisions. If a pattern didn't serve that outcome, it was cut."
              />
              <StrategyPill
                number="05"
                title="Ensure Regulatory Compliance"
                body="Compliance requirements were treated as design inputs, not obstacles. Mandatory regulatory steps were redesigned as structured contextual guidance embedded naturally within task flows — correct and usable, not one or the other."
              />
            </div>
          </div>
        </section>

        <Divider />

        {/* ── 5. UX EXPLORATION ────────────────────────────────────────────── */}
        <section className="relative w-full py-24">
          <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12">

            <Reveal>
              <Label>UX Exploration</Label>
              <SectionHeading>
                Structure first.{' '}
                <span style={{ color: '#e10600' }}>Visual polish later.</span>
              </SectionHeading>
              <p className="font-['Blast_Dragon',sans-serif] text-[14px] sm:text-[16px] text-[#8a8f98]
                leading-[30px] tracking-[0.3px] max-w-[640px] mb-14">
                Low-fidelity wireframes were the primary tool for stress-testing the architecture.
                Before investing in visual design, I needed to validate three things: did the layout
                structure match how users actually think about credit data, did the proposed workflow
                reduce steps versus the legacy system, and did information prioritization hold up
                under real task scenarios. Wireframes surfaced the structural failures quickly —
                and cheaply — before any pixel work began.
              </p>
            </Reveal>

            <FullImage
              src="/designs/tu-cibil/wireframe-image.png"
              alt="TU CIBIL — wireframe exploration"
              aspect="16/7"
            />
            <Reveal>
              <p className="font-['Blast_Dragon',sans-serif] text-[11px] tracking-[2px] uppercase text-[#8a8f98] mt-4 text-center">
                Low-Fidelity Wireframes — Structural Exploration
              </p>
            </Reveal>
          </div>
        </section>

        <Divider />

        {/* ── 6. INTERACTION DESIGN ────────────────────────────────────────── */}
        <section className="relative w-full py-24">
          <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12">

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

              <Reveal>
                <Label>Interaction Design</Label>
                <SectionHeading>
                  Progressive stepper —{' '}
                  <span style={{ color: '#D4AF37' }}>one step at a time.</span>
                </SectionHeading>
                <p className="font-['Blast_Dragon',sans-serif] text-[14px] sm:text-[16px] text-[#8a8f98]
                  leading-[30px] tracking-[0.3px] mb-10">
                  The most consequential interaction pattern introduced in this redesign. The legacy
                  system presented entire credit application workflows as a single overwhelming
                  page — dozens of fields, no progress context, no logical grouping. I replaced
                  this with a progressive stepper model: sequential, focused stages where each
                  step surfaces only what that moment in the workflow requires. Confusion dropped.
                  Completion rates improved. Errors moved earlier, where they were cheaper to fix.
                </p>

                <div className="flex flex-col gap-4">
                  {[
                    { title: 'Application Processing', body: 'Multi-field applications restructured into logical, labelled stages. Users always know how far they are and what comes next — eliminating the anxiety of an unmarked form.' },
                    { title: 'Credit Evaluation Workflow', body: 'Risk assessment steps presented in a defined sequence. Analysts move through data layers methodically, with full context retained across every step transition.' },
                    { title: 'Decision Gates', body: 'Mandatory compliance checkpoints are embedded as natural waypoints within the flow — not interruptions. Users complete them correctly because the context makes the requirement clear.' },
                  ].map((item, i) => (
                    <Reveal key={item.title} delay={i * 0.1}>
                      <div className="flex gap-4 items-start">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#e10600] mt-[9px] shrink-0" />
                        <div>
                          <p className="font-['The_Last_Shuriken',sans-serif] text-white text-[17px] mb-1">{item.title}</p>
                          <p className="font-['Blast_Dragon',sans-serif] text-[13px] text-[#8a8f98] leading-[24px] tracking-[0.3px]">{item.body}</p>
                        </div>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </Reveal>

              <Reveal delay={0.15}>
                <div className="w-full relative overflow-hidden rounded-2xl bg-[#0e1117] border border-white/[0.06]"
                  style={{ aspectRatio: '4/5' }}>
                  <Image
                    src="/designs/tu-cibil/progressive-stepper-image.png"
                    alt="TU CIBIL — progressive stepper interaction"
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              </Reveal>

            </div>
          </div>
        </section>

        <Divider />

        {/* ── 7. FINAL PRODUCT ─────────────────────────────────────────────── */}
        <section className="relative w-full py-24">
          <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12">

            <Reveal>
              <Label>Final Product</Label>
              <SectionHeading>
                A platform built for{' '}
                <span style={{ color: '#D4AF37' }}>decisions, not data entry.</span>
              </SectionHeading>
              <p className="font-['Blast_Dragon',sans-serif] text-[14px] sm:text-[16px] text-[#8a8f98]
                leading-[30px] tracking-[0.3px] max-w-[640px] mb-14">
                The redesigned platform replaced information overwhelm with structured decision
                clarity. Every screen was built around a single design question: what does this
                user need to act on right now — and what should stay out of their way until they
                need it? The result is a system that feels proportionate to its domain: powerful
                without being intimidating, comprehensive without being cluttered.
              </p>
            </Reveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
              {[
                { title: 'Clear Data Hierarchy',     body: 'Risk signals surface at the primary view. Secondary and supporting data live behind progressive disclosure — present when needed, invisible when not.' },
                { title: 'Faster Navigation',         body: 'Role-based entry points and persistent context menus reduced navigation depth across all core workflows. Less clicking, more deciding.' },
                { title: 'Improved Report Access',    body: 'Credit reports restructured as visual dashboards with score cards, trend indicators, and risk categorisation — from raw data to readable insight.' },
                { title: 'Simplified Dashboards',     body: 'At-a-glance summaries engineered for quick confident decisions. Drill-down capability intact without cluttering the primary decision layer.' },
              ].map(f => (
                <Reveal key={f.title}>
                  <div className="flex flex-col gap-3 bg-[#0e1117] border border-white/[0.06] rounded-2xl p-6
                    hover:border-[#D4AF37]/20 transition-colors duration-300 h-full">
                    <div className="w-6 h-0.5 bg-[#D4AF37]" />
                    <h3 className="font-['The_Last_Shuriken',sans-serif] text-white text-[18px] leading-tight">
                      {f.title}
                    </h3>
                    <p className="font-['Blast_Dragon',sans-serif] text-[13px] text-[#8a8f98] leading-[26px] tracking-[0.3px]">
                      {f.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>

            <FullImage
              src="/designs/tu-cibil/dashboard-image.png"
              alt="TU CIBIL — redesigned dashboard"
              aspect="16/7"
            />
            <Reveal>
              <p className="font-['Blast_Dragon',sans-serif] text-[11px] tracking-[2px] uppercase text-[#8a8f98] mt-4 text-center">
                Redesigned Platform — Dashboard View
              </p>
            </Reveal>
          </div>
        </section>

        <Divider />

        {/* ── 8. PLATFORM SCALE ────────────────────────────────────────────── */}
        <section className="relative w-full py-24 overflow-hidden">
          <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12">

            <Reveal className="text-center mb-16">
              <Label>Platform Scale</Label>
              <SectionHeading>Built for every context.</SectionHeading>
              <p className="font-['Blast_Dragon',sans-serif] text-[14px] text-[#8a8f98]
                leading-[28px] tracking-[0.3px] max-w-[520px] mx-auto">
                The system was designed desktop-first — where primary credit workflows demand
                the full workspace — then extended to mobile for field access and quick
                decision lookups. The result is a consistent, responsive enterprise UI system
                spanning 150+ screens across every breakpoint.
              </p>
            </Reveal>

            {/* Desktop */}
            <Reveal className="mb-8">
              <div className="w-full relative overflow-hidden rounded-2xl bg-[#0e1117] border border-white/[0.06]">
                <div className="aspect-[21/9] relative">
                  <Image
                    src="/designs/tu-cibil/desktop-images.png"
                    alt="TU CIBIL — desktop screens"
                    fill
                    className="object-cover object-top"
                    sizes="100vw"
                  />
                </div>
              </div>
              <p className="font-['Blast_Dragon',sans-serif] text-[11px] tracking-[2px] uppercase text-[#8a8f98] mt-3 text-center">
                Desktop — Primary Workspace
              </p>
            </Reveal>

            {/* Mobile + Responsive */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Reveal>
                <div className="w-full relative overflow-hidden rounded-2xl bg-[#0e1117] border border-white/[0.06]">
                  <div className="aspect-[4/3] relative">
                    <Image
                      src="/designs/tu-cibil/mobile-images.png"
                      alt="TU CIBIL — mobile screens"
                      fill
                      className="object-cover object-top"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                </div>
                <p className="font-['Blast_Dragon',sans-serif] text-[11px] tracking-[2px] uppercase text-[#8a8f98] mt-3 text-center">
                  Mobile — Quick Insights Access
                </p>
              </Reveal>
              <Reveal delay={0.12}>
                <div className="w-full relative overflow-hidden rounded-2xl bg-[#0e1117] border border-white/[0.06]">
                  <div className="aspect-[4/3] relative">
                    <Image
                      src="/designs/tu-cibil/responsive-image.png"
                      alt="TU CIBIL — responsive layout"
                      fill
                      className="object-cover object-top"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                </div>
                <p className="font-['Blast_Dragon',sans-serif] text-[11px] tracking-[2px] uppercase text-[#8a8f98] mt-3 text-center">
                  Responsive Enterprise UI System
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        <Divider />

        {/* ── 9. IMPACT ────────────────────────────────────────────────────── */}
        <section className="relative w-full py-24 overflow-hidden">

          {/* Ambient glow */}
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(212,175,55,0.05) 0%, transparent 70%)',
            }}
          />

          <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12">

            <Reveal className="text-center">
              <Label>Impact</Label>
              <SectionHeading>Results that moved the needle.</SectionHeading>
              <p className="font-['Blast_Dragon',sans-serif] text-[14px] text-[#8a8f98]
                leading-[28px] tracking-[0.3px] max-w-[520px] mx-auto mb-20">
                Outcomes validated through structured usability testing, task completion
                benchmarking, and post-launch feedback collected across the banking partner
                network. The numbers reflect a platform that analysts and managers actually
                wanted to use.
              </p>
            </Reveal>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 max-w-[900px] mx-auto mb-20">
              <ImpactStat value="40%"  label="Reduction in workflow friction across core lending tasks"  delay={0}    />
              <ImpactStat value="150+" label="Screens designed across desktop, tablet and mobile"         delay={0.12} />
              <ImpactStat value="40%"  label="Faster credit decision-making reported by bank managers"   delay={0.24} />
            </div>

            {/* Impact statements */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-[900px] mx-auto mb-16">
              {[
                'Improved credit decision efficiency — structured dashboards cut the time from login to decision-ready insight.',
                'Reduced workflow friction — redundant navigation steps and unnecessary form fields systematically removed across all core flows.',
                'Faster data discovery — prioritised information hierarchy and contextual filtering replaced flat table parsing.',
                'Improved analyst usability — role-aware entry points and task-oriented navigation tailored to how each user type actually works.',
              ].map((s, i) => (
                <Reveal key={i} delay={i * 0.08}>
                  <div className="flex gap-4 items-start bg-[#0e1117] border border-white/[0.06] rounded-xl p-6">
                    <div className="w-1.5 h-1.5 rounded-full mt-[9px] shrink-0" style={{ background: '#D4AF37' }} />
                    <p className="font-['Blast_Dragon',sans-serif] text-[13px] text-[#8a8f98] leading-[26px] tracking-[0.3px]">
                      {s}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>

            <FullImage
              src="/designs/tu-cibil/after-image.png"
              alt="TU CIBIL — redesigned system after launch"
              aspect="16/7"
            />
            <Reveal>
              <p className="font-['Blast_Dragon',sans-serif] text-[11px] tracking-[2px] uppercase text-[#8a8f98] mt-4 text-center">
                Redesigned System — Final Delivered State
              </p>
            </Reveal>
          </div>
        </section>

        <Divider />

        {/* ── 10. KEY LEARNINGS ────────────────────────────────────────────── */}
        <section className="relative w-full py-24">
          <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12">

            <Reveal>
              <Label>Key Learnings</Label>
              <SectionHeading>
                What 36 months in fintech{' '}
                <span style={{ color: '#e10600' }}>taught me.</span>
              </SectionHeading>
              <p className="font-['Blast_Dragon',sans-serif] text-[14px] sm:text-[16px] text-[#8a8f98]
                leading-[30px] tracking-[0.3px] max-w-[600px] mb-16">
                Working as the sole designer on a regulated, high-stakes national platform pushed
                every dimension of product design leadership — from systems thinking and stakeholder
                management to the craft of making genuinely complex things feel simple.
              </p>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10 max-w-[1000px]">
              <LearningCard
                title="Designing for Regulated Industries"
                body="Compliance constraints are not obstacles to route around — they are design inputs to design with. The best outcomes came from understanding the intent behind each regulatory requirement. When compliance steps made sense to users, they completed them correctly. That's a design problem, not a legal one."
              />
              <LearningCard
                title="Balancing Complexity with Clarity"
                body="The designer's job in fintech is not to simplify the domain — it's to simplify the experience of a domain that will always be complex. Progressive disclosure, smart defaults, and task-oriented navigation are the tools. The discipline is knowing when to stop simplifying before you lose the depth the user actually needs."
              />
              <LearningCard
                title="Information Architecture as a Business Decision"
                body="In financial platforms, IA decisions have direct business consequences. A misplaced risk signal means a slower lending decision. A buried compliance step means rework and audit exposure. Every navigation and grouping decision had to be grounded in actual task flows — not assumed information logic."
              />
              <LearningCard
                title="Design Leadership Without a Team"
                body="Being the only designer meant owning the entire design system, research process, stakeholder alignment, and delivery simultaneously. The learning: design leadership is as much about protecting good decisions under pressure as it is about generating them. Translating UX rationale into business outcomes was what made those decisions stick."
              />
            </div>
          </div>
        </section>

        <Divider />

        {/* ── BACK TO PORTFOLIO ────────────────────────────────────────────── */}
        <section className="relative w-full py-24">
          <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col items-center text-center gap-8">

            <Reveal>
              <p className="font-['Blast_Dragon',sans-serif] text-[11px] text-[#e10600] tracking-[4px] uppercase mb-2">
                Next Steps
              </p>
              <h2 className="font-['The_Last_Shuriken',sans-serif] text-white text-[36px] sm:text-[48px] leading-none mb-6">
                Explore More Work
              </h2>
              <p className="font-['Blast_Dragon',sans-serif] text-[13px] text-[#8a8f98] tracking-[0.5px] max-w-[400px] leading-[26px]">
                See how the same principles of clarity, hierarchy, and empathy
                were applied across logistics, health, and SaaS products.
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <Link
                href="/#works"
                className="inline-flex items-center gap-3 px-8 h-[52px] rounded-[10px]
                  font-['Blast_Dragon',sans-serif] text-[14px] text-white tracking-[1.5px] uppercase
                  transition-all duration-300"
                style={{
                  background:  '#B30000',
                  boxShadow:   '0 0 24px rgba(179,0,0,0.35), 0 0 48px rgba(179,0,0,0.1)',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLAnchorElement).style.background   = '#CC0000';
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow    = '0 6px 32px rgba(255,42,42,0.5)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLAnchorElement).style.background   = '#B30000';
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow    = '0 0 24px rgba(179,0,0,0.35), 0 0 48px rgba(179,0,0,0.1)';
                }}
              >
                ← Back to Portfolio
              </Link>
            </Reveal>
          </div>
        </section>

        {/* Footer strip */}
        <div className="border-t border-white/[0.05] py-8">
          <p className="font-['Inter',sans-serif] font-light text-[12px] text-center"
            style={{ color: 'rgba(138,143,152,0.4)' }}>
            © 2026 Arjun CR — TU CIBIL Case Study
          </p>
        </div>

      </div>
    </SmoothScroll>
  );
}
