'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/app/components/Navbar';
import SmoothScroll from '@/app/components/SmoothScroll';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* ── Reveal wrapper ──────────────────────────────────────────────────────── */
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
    <h2 className="font-['The_Last_Shuriken',sans-serif] text-[2.2rem] md:text-[3rem] text-[#eaeaea] leading-[1.1] mb-6">
      {children}
    </h2>
  );
}

/* ── Gradient divider ────────────────────────────────────────────────────── */
function Divider() {
  return (
    <div className="w-full h-px bg-gradient-to-r from-transparent via-[#333] to-transparent my-10 md:my-14" />
  );
}

/* ── Metric card ─────────────────────────────────────────────────────────── */
function MetricCard({ value, label, explanation }: { value: string; label: string; explanation: string }) {
  return (
    <div className="flex-1 min-w-[200px] border border-[#1e2028] rounded-2xl p-8 text-center bg-[#0c0d10] hover:border-[#D4AF37]/40 transition-colors duration-300 flex flex-col items-center">
      <p className="font-['The_Last_Shuriken',sans-serif] text-[2.8rem] md:text-[3.5rem] text-[#D4AF37] leading-none mb-3">
        {value}
      </p>
      <p className="font-['Blast_Dragon',sans-serif] text-[11px] tracking-[3px] text-[#eaeaea] uppercase mb-4">
        {label}
      </p>
      <p className="font-['Blast_Dragon',sans-serif] text-[12px] leading-[1.8] text-[#8a8f98] max-w-[200px]">
        {explanation}
      </p>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════════════
   PAGE
═══════════════════════════════════════════════════════════════════════════ */
export default function TuCibilCaseStudy() {
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
          <section className="pt-10 pb-11 md:pb-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">

              {/* Left — text */}
              <Reveal>
                <Label>Case Study</Label>
                <h1 className="font-['The_Last_Shuriken',sans-serif] text-[3.5rem] md:text-[5rem] lg:text-[6rem] text-[#eaeaea] leading-[1.05] mb-5">
                  TI Credit Report
                </h1>


                {/* Metadata grid */}
                <div className="grid grid-cols-2 gap-x-8 gap-y-5">
                  {[
                    { label: 'Role',     value: 'Lead UI/UX Designer' },
                    { label: 'Duration', value: '36 Months' },
                    { label: 'Domain',   value: 'FinTech · Credit Intelligence' },
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
              <Reveal delay={0.15} className="w-full">
                <div className="img-case-study-wrap">
                  <Image
                    src="/designs/tu-cibil/hero-image.png?v=2"
                    alt="TI Credit Report Hero"
                    width={1000}
                    height={700}
                    className="w-full h-auto object-contain rounded-xl"
                    priority
                  />
                </div>
              </Reveal>
            </div>
          </section>

          <Divider />

          {/* ══════════════════════════════════════════════════════════════
              2. CONTEXT
          ══════════════════════════════════════════════════════════════ */}
          <section className="pb-11 md:pb-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
              <Reveal>
                <Label>Context</Label>
                <SectionHeading>The Platform</SectionHeading>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="font-['Blast_Dragon',sans-serif] text-[14px] leading-[2] text-[#8a8f98] mb-5">
                  TI Credit Report is an enterprise credit intelligence platform serving
                  banks, financial institutions, and lending teams. Its primary users are
                  bank managers and financial analysts who process hundreds of credit
                  applications per week.
                </p>
                <p className="font-['Blast_Dragon',sans-serif] text-[14px] leading-[2] text-[#8a8f98] mb-5">
                  Every workflow, every data point, and every UI state has a direct
                  impact on whether a loan is approved or declined. Clarity isn&apos;t a
                  preference here — it&apos;s a professional requirement. Errors carry
                  financial and reputational consequences.
                </p>
                <p className="font-['Blast_Dragon',sans-serif] text-[14px] leading-[2] text-[#8a8f98]">
                  The redesign had to earn trust through precision, not novelty. Every
                  decision was made against the backdrop of regulatory obligations and
                  the expertise of domain professionals who would notice any misstep.
                </p>
              </Reveal>
            </div>

            {/* Context strip */}
            <Reveal delay={0.15} className="mt-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: 'Platform',  value: 'Enterprise Credit Intelligence' },
                  { label: 'Users',     value: 'Bank Managers, Financial Analysts' },
                  { label: 'Scope',     value: '150+ Screens, 4 User Journeys' },
                  { label: 'Stakes',    value: 'High — Lending Decisions' },
                ].map(({ label, value }) => (
                  <div key={label} className="border border-[#1e2028] rounded-2xl p-5 bg-[#0c0d10]">
                    <p className="font-['Blast_Dragon',sans-serif] text-[10px] tracking-[3px] text-[#e10600] uppercase mb-2">
                      {label}
                    </p>
                    <p className="font-['Blast_Dragon',sans-serif] text-[12px] leading-[1.7] text-[#eaeaea]">
                      {value}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
          </section>

          <Divider />

          {/* ══════════════════════════════════════════════════════════════
              3. PROBLEM
          ══════════════════════════════════════════════════════════════ */}
          <section className="pb-11 md:pb-16">
            <Reveal>
              <Label>Problem</Label>
              <SectionHeading>What Was Broken</SectionHeading>
              <p className="font-['Blast_Dragon',sans-serif] text-[14px] leading-[2] text-[#8a8f98] max-w-[640px] mb-6">
                The legacy platform wasn&apos;t just outdated visually — it was actively
                slowing down banking professionals. Three compounding failures caused
                friction at every step of the credit lifecycle.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="flex flex-col md:flex-row gap-5">
                {[
                  {
                    index: 0,
                    title: 'Static Long Forms',
                    description: 'Monolithic forms with 40+ simultaneous fields caused high abandonment and input errors. Analysts had to hold too much context in their heads to complete a single workflow.',
                  },
                  {
                    index: 1,
                    title: 'Unstructured Data Reports',
                    description: 'Credit reports were raw numerical tables with no grouping, no hierarchy, and no insight surfacing. Extracting a single meaningful data point required significant manual effort.',
                  },
                  {
                    index: 2,
                    title: 'Cognitive Overload at Scale',
                    description: 'Users processing hundreds of applications weekly faced decision paralysis. The interface demanded maximum mental effort for minimum output — unsustainable at operational scale.',
                  },
                ].map(({ index, title, description }) => (
                  <div
                    key={index}
                    className="flex-1 min-w-[220px] border border-[#1e2028] rounded-2xl p-7 bg-[#0c0d10] hover:border-[#e10600]/30 transition-colors duration-300"
                  >
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
                ))}
              </div>
            </Reveal>
          </section>

          <Divider />

          {/* ══════════════════════════════════════════════════════════════
              4. THE REAL CHALLENGE
          ══════════════════════════════════════════════════════════════ */}
          <section className="pb-11 md:pb-16">
            <Reveal>
              <Label>The Real Challenge</Label>
              <SectionHeading>Why This Was Hard</SectionHeading>
              <p className="font-['Blast_Dragon',sans-serif] text-[14px] leading-[2] text-[#8a8f98] max-w-[640px] mb-6">
                The problem wasn&apos;t bad UI — it was that simplification was genuinely
                constrained. Four factors made every design decision load-bearing.
                Getting any one of them wrong would have broken the product.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {[
                  {
                    num:   '01',
                    title: 'Regulatory Compliance Was Non-Negotiable',
                    body:  'Every workflow had to satisfy enterprise compliance frameworks, financial regulatory requirements, and legal audit-trail standards. UI patterns that reduced steps could not, under any circumstance, compromise data integrity or break compliance trails.',
                  },
                  {
                    num:   '02',
                    title: 'Legacy Infrastructure Locked the Design Space',
                    body:  'Fixed API contracts and aging backend systems meant I had to design within existing data structures. No new endpoints. No redesigned payloads. Every visual simplification had to map to a data model I couldn\'t change.',
                  },
                  {
                    num:   '03',
                    title: 'Users Were Domain Experts, Not Novices',
                    body:  'Analysts and bank managers have years of domain experience and deeply entrenched mental models. Over-simplifying for general usability would have slowed them down. The design had to match their expertise — not flatten it.',
                  },
                  {
                    num:   '04',
                    title: 'Zero Tolerance for Ambiguity',
                    body:  'Credit decisions carry financial and legal consequences. Ambiguous UI states, unclear validation, or misleading data visualizations were not acceptable failure modes. Every interaction had to be unambiguous under pressure.',
                  },
                ].map(({ num, title, body }) => (
                  <div
                    key={num}
                    className="border border-[#e10600]/20 hover:border-[#e10600]/50 rounded-2xl p-7 bg-[#0c0d10] transition-colors duration-300"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <span className="w-2 h-2 rounded-full bg-[#e10600] shrink-0" />
                      <p className="font-['Blast_Dragon',sans-serif] text-[10px] tracking-[3px] text-[#e10600] uppercase">
                        Challenge {num}
                      </p>
                    </div>
                    <h3 className="font-['The_Last_Shuriken',sans-serif] text-[1.2rem] text-[#eaeaea] mb-3">
                      {title}
                    </h3>
                    <p className="font-['Blast_Dragon',sans-serif] text-[13px] leading-[1.9] text-[#8a8f98]">
                      {body}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
          </section>

          <Divider />

          {/* ══════════════════════════════════════════════════════════════
              5. MY APPROACH
          ══════════════════════════════════════════════════════════════ */}
          <section className="pb-11 md:pb-16">
            <Reveal>
              <Label>My Approach</Label>
              <SectionHeading>How I Solved It</SectionHeading>
              <p className="font-['Blast_Dragon',sans-serif] text-[14px] leading-[2] text-[#8a8f98] max-w-[640px] mb-10">
                Each decision below was a deliberate trade-off — not a preference. I had to
                choose what to simplify, what to preserve, and what to restructure entirely.
              </p>
            </Reveal>

            {/* Decision 01 — Progressive Stepper */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-12">
              <Reveal className="order-2 lg:order-1">
                <Label>Decision 01</Label>
                <h3 className="font-['The_Last_Shuriken',sans-serif] text-[1.8rem] md:text-[2.2rem] text-[#eaeaea] mb-4">
                  Progressive Stepper Forms
                </h3>
                <p className="font-['Blast_Dragon',sans-serif] text-[13px] leading-[2] text-[#8a8f98] mb-4">
                  I replaced monolithic form layouts with a contextual stepper. The decision
                  was to chunk the workflow by task intent — not by data category — so
                  each step only exposed fields relevant to that stage.
                </p>
                <p className="font-['Blast_Dragon',sans-serif] text-[13px] leading-[2] text-[#8a8f98]">
                  This reduced perceived complexity and maintained compliance because
                  every field was still captured — just sequenced around how analysts
                  actually think, not how the legacy system stored data.
                </p>
              </Reveal>
              <Reveal delay={0.1} className="order-1 lg:order-2">
                <div className="w-full overflow-hidden rounded-xl">
                  <Image
                    src="/designs/tu-cibil/progressive-stepper-image.png?v=2"
                    alt="Progressive Stepper Forms"
                    width={800}
                    height={540}
                    className="w-full h-auto object-contain"
                  />
                </div>
              </Reveal>
            </div>

            {/* Decision 02 — Dashboard Reports */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-12">
              <Reveal delay={0.1}>
                <div className="w-full overflow-hidden rounded-xl">
                  <Image
                    src="/designs/tu-cibil/dashboard-image.png?v=2"
                    alt="Dashboard Based Reports"
                    width={800}
                    height={540}
                    className="w-full h-auto object-contain"
                  />
                </div>
              </Reveal>
              <Reveal>
                <Label>Decision 02</Label>
                <h3 className="font-['The_Last_Shuriken',sans-serif] text-[1.8rem] md:text-[2.2rem] text-[#eaeaea] mb-4">
                  Dashboard-Based Reports
                </h3>
                <p className="font-['Blast_Dragon',sans-serif] text-[13px] leading-[2] text-[#8a8f98] mb-4">
                  I restructured raw tabular credit data into structured, scannable
                  dashboards. The key decision was to elevate insight over completeness —
                  score indicators, trend charts, and segmented panels surfaced what
                  analysts needed to act, not everything the database returned.
                </p>
                <p className="font-['Blast_Dragon',sans-serif] text-[13px] leading-[2] text-[#8a8f98]">
                  This worked within the fixed API contracts: I reorganised existing
                  data fields visually rather than requesting new data structures.
                </p>
              </Reveal>
            </div>

            {/* Decision 03 — Data Hierarchy */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-12">
              <Reveal className="order-2 lg:order-1">
                <Label>Decision 03</Label>
                <h3 className="font-['The_Last_Shuriken',sans-serif] text-[1.8rem] md:text-[2.2rem] text-[#eaeaea] mb-4">
                  Data Hierarchy Optimization
                </h3>
                <p className="font-['Blast_Dragon',sans-serif] text-[13px] leading-[2] text-[#8a8f98] mb-4">
                  I established a strict visual hierarchy across all data-heavy screens:
                  primary metrics at the top, secondary context in the middle, granular
                  detail accessible on demand. This wasn&apos;t a style choice — it was
                  an information architecture decision.
                </p>
                <p className="font-['Blast_Dragon',sans-serif] text-[13px] leading-[2] text-[#8a8f98]">
                  The challenge was that expert users still needed access to all the
                  underlying data. Progressive disclosure preserved completeness while
                  reducing the default cognitive load.
                </p>
              </Reveal>
              <Reveal delay={0.1} className="order-1 lg:order-2">
                <div className="w-full overflow-hidden rounded-xl">
                  <Image
                    src="/designs/tu-cibil/data-hierarchy-imagepng.png?v=2"
                    alt="Data Hierarchy Optimization"
                    width={800}
                    height={540}
                    className="w-full h-auto object-contain"
                  />
                </div>
              </Reveal>
            </div>

            {/* Decision 04 — Systems Thinking */}
            <Reveal delay={0.1}>
              <div className="border border-[#1e2028] rounded-2xl p-8 bg-[#0c0d10]">
                <Label>Decision 04</Label>
                <h3 className="font-['The_Last_Shuriken',sans-serif] text-[1.8rem] md:text-[2.2rem] text-[#eaeaea] mb-5">
                  Building for Scale, Not Just the MVP
                </h3>
                <p className="font-['Blast_Dragon',sans-serif] text-[14px] leading-[2] text-[#8a8f98] mb-6 max-w-[700px]">
                  From the start, I chose to invest in a design system rather than
                  screen-by-screen execution. This was a strategic bet: the platform
                  was scoped at 25 screens but I could see it would grow. A unified
                  component architecture was the only way to scale without design drift.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    {
                      title: 'Role-Based User Journeys',
                      body:  'Four distinct journeys — analysts, compliance managers, bank partners, consumers — each designed with tailored hierarchy matching their domain responsibilities.',
                    },
                    {
                      title: 'Scalable Component Architecture',
                      body:  'A unified design system that scaled from 25 to 150+ screens across all user journeys without visual or functional inconsistency.',
                    },
                    {
                      title: 'Guided Multi-Step Workflows',
                      body:  'Credit workflows restructured as stepper flows with contextual validation — matching how banking professionals actually process applications.',
                    },
                    {
                      title: 'Wireframe-First Information Architecture',
                      body:  'Every screen was mapped as a low-fidelity structure before any visual work. This uncovered hidden workflow complexity before it became expensive to fix.',
                    },
                  ].map(({ title, body }) => (
                    <div key={title} className="flex items-start gap-4">
                      <span className="mt-[7px] w-1.5 h-1.5 rounded-full bg-[#e10600] shrink-0" />
                      <div>
                        <p className="font-['The_Last_Shuriken',sans-serif] text-[1rem] text-[#eaeaea] mb-1">
                          {title}
                        </p>
                        <p className="font-['Blast_Dragon',sans-serif] text-[12px] leading-[1.9] text-[#8a8f98]">
                          {body}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </section>

          <Divider />

          {/* ══════════════════════════════════════════════════════════════
              6. BEFORE VS AFTER
          ══════════════════════════════════════════════════════════════ */}
          <section className="pb-11 md:pb-16">
            <Reveal>
              <Label>Before vs After</Label>
              <SectionHeading>Legacy vs Modern</SectionHeading>
              <p className="font-['Blast_Dragon',sans-serif] text-[14px] leading-[2] text-[#8a8f98] max-w-[600px] mb-6">
                The same task — submitting a credit application — went from an overwhelming
                wall of simultaneous inputs to a structured, guided multi-step flow.
              </p>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Reveal delay={0} className="flex flex-col gap-4">
                <div className="w-full overflow-hidden rounded-xl">
                  <Image
                    src="/designs/tu-cibil/before-image.png?v=2"
                    alt="Before — Legacy platform"
                    width={800}
                    height={540}
                    className="w-full h-auto object-contain"
                  />
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-[#e10600] shrink-0" />
                  <p className="font-['Blast_Dragon',sans-serif] text-[12px] tracking-[2px] text-[#8a8f98] uppercase">
                    Before — 40+ simultaneous fields, no hierarchy
                  </p>
                </div>
              </Reveal>
              <Reveal delay={0.12} className="flex flex-col gap-4">
                <div className="w-full overflow-hidden rounded-xl">
                  <Image
                    src="/designs/tu-cibil/after-image.png?v=2"
                    alt="After — Redesigned TI Credit Report"
                    width={800}
                    height={540}
                    className="w-full h-auto object-contain"
                  />
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-[#D4AF37] shrink-0" />
                  <p className="font-['Blast_Dragon',sans-serif] text-[12px] tracking-[2px] text-[#8a8f98] uppercase">
                    After — Progressive stepper with structured hierarchy
                  </p>
                </div>
              </Reveal>
            </div>
          </section>

          <Divider />

          {/* ══════════════════════════════════════════════════════════════
              7. IMPACT
          ══════════════════════════════════════════════════════════════ */}
          <section className="pb-11 md:pb-16">
            <Reveal>
              <Label>Impact</Label>
              <SectionHeading>Measurable Outcomes</SectionHeading>
              <p className="font-['Blast_Dragon',sans-serif] text-[14px] leading-[2] text-[#8a8f98] max-w-[560px] mb-6">
                Outcomes validated through post-launch usability studies and
                stakeholder feedback across the banking teams using the platform daily.
              </p>
            </Reveal>

            {/* Metric cards */}
            <Reveal delay={0.1}>
              <div className="flex flex-col md:flex-row gap-5 mb-5">
                <MetricCard
                  value="40%"
                  label="Faster Task Completion"
                  explanation="Credit workflows that previously took analysts an average of 18 minutes were reduced to under 11 minutes through progressive disclosure and smarter task sequencing."
                />
                <MetricCard
                  value="150+"
                  label="Screens Shipped"
                  explanation="A single, unified design system scaled from an initial 25-screen scope to cover all four user journeys — analysts, managers, bank partners, and end consumers."
                />
                <MetricCard
                  value="60%"
                  label="Reduced Cognitive Load"
                  explanation="Post-launch usability studies measured a 60% reduction in decision errors and user-reported mental effort — attributed to improved information hierarchy and progressive disclosure."
                />
              </div>
            </Reveal>

            {/* Qualitative outcome cards */}
            <Reveal delay={0.15}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
                {[
                  {
                    title: 'Trusted by Banking Analysts Nationwide',
                    description: 'The redesigned platform is used by bank managers and financial analysts to evaluate creditworthiness and make high-stakes lending decisions at scale — daily.',
                  },
                  {
                    title: 'Complex Workflows Made Navigable',
                    description: 'Dense reports and monolithic forms became structured dashboards and stepper flows that match how analysts actually think — not how legacy systems stored data.',
                  },
                  {
                    title: 'Design System That Survived the Team Growing',
                    description: 'The component architecture and token system I built absorbed 6× scope growth — from 25 to 150+ screens — without visual drift or inconsistency.',
                  },
                  {
                    title: 'Compliance Maintained Throughout',
                    description: 'Every simplification was validated against regulatory requirements. No workflow was streamlined at the cost of audit-trail integrity or data accuracy standards.',
                  },
                ].map(({ title, description }) => (
                  <div
                    key={title}
                    className="border border-[#1e2028] rounded-2xl p-7 bg-[#0c0d10] hover:border-[#D4AF37]/30 transition-colors duration-300"
                  >
                    <div className="w-6 h-6 rounded-full border border-[#D4AF37]/40 flex items-center justify-center mb-4">
                      <span className="w-2 h-2 rounded-full bg-[#D4AF37]" />
                    </div>
                    <h3 className="font-['The_Last_Shuriken',sans-serif] text-[1.2rem] text-[#eaeaea] mb-3">
                      {title}
                    </h3>
                    <p className="font-['Blast_Dragon',sans-serif] text-[13px] leading-[1.8] text-[#8a8f98]">
                      {description}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>

            {/* Final screens */}
            <div className="flex flex-col gap-8">
              <Reveal>
                <p className="font-['Blast_Dragon',sans-serif] text-[10px] tracking-[3px] text-[#8a8f98] uppercase mb-3">
                  Shipped — Desktop Screens
                </p>
                <div className="w-full overflow-hidden rounded-xl">
                  <Image
                    src="/designs/tu-cibil/desktop-images.png?v=2"
                    alt="TI Credit Report — Desktop screens"
                    width={1400}
                    height={900}
                    className="w-full h-auto object-contain"
                  />
                </div>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="font-['Blast_Dragon',sans-serif] text-[10px] tracking-[3px] text-[#8a8f98] uppercase mb-3">
                  Shipped — Mobile Screens
                </p>
                <div className="w-full overflow-hidden rounded-xl">
                  <Image
                    src="/designs/tu-cibil/mobile-images.png?v=2"
                    alt="TI Credit Report — Mobile screens"
                    width={1400}
                    height={900}
                    className="w-full h-auto object-contain"
                  />
                </div>
              </Reveal>
            </div>
          </section>

          <Divider />

          {/* ══════════════════════════════════════════════════════════════
              8. MY ROLE AS LEAD
          ══════════════════════════════════════════════════════════════ */}
          <section className="pb-11 md:pb-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-start">
              <Reveal>
                <Label>My Role as Lead</Label>
                <SectionHeading>What I Actually Did</SectionHeading>
                <p className="font-['Blast_Dragon',sans-serif] text-[14px] leading-[2] text-[#8a8f98]">
                  As the sole designer on this engagement for 36 months, I wasn&apos;t
                  executing a spec — I was making the decisions. Every choice about
                  structure, hierarchy, workflow, and scope came from me. That
                  required navigating regulatory constraints, legacy infrastructure,
                  and expert stakeholders simultaneously.
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <ul className="flex flex-col gap-5 mt-2">
                  {[
                    'Set the UX strategy for the entire platform — defined which problems to solve first and why',
                    'Decided to invest in a design system from day one, before scope justified it — a call that absorbed 6× growth without regression',
                    'Mapped four distinct user journeys from scratch: analysts, compliance officers, bank partners, and consumers',
                    'Resolved the tension between compliance requirements and usability — finding the minimum friction path that still passed regulatory review',
                    'Managed design reviews directly with product managers and engineering teams without a design manager above me',
                    'Designed 150+ screens across desktop, tablet, and mobile — all within a single coherent system I built and maintained solo',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-4">
                      <span className="mt-[7px] w-1.5 h-1.5 rounded-full bg-[#e10600] shrink-0" />
                      <p className="font-['Blast_Dragon',sans-serif] text-[13px] leading-[1.9] text-[#8a8f98]">
                        {item}
                      </p>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </section>

          {/* ── Next Project CTA ───────────────────────────────────────────── */}
          <Reveal>
            <div className="border-t border-[#1e2028] pt-10 pb-11 md:pb-16">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
                <div>
                  <p className="font-['Blast_Dragon',sans-serif] text-[10px] tracking-[4px] text-[#8a8f98] uppercase mb-3">
                    Next Case Study
                  </p>
                  <h2 className="font-['The_Last_Shuriken',sans-serif] text-[2rem] md:text-[2.8rem] text-[#eaeaea] leading-[1.1] mb-2">
                    RMT Holotrack
                  </h2>
                  <p className="font-['Blast_Dragon',sans-serif] text-[13px] text-[#8a8f98]">
                    Industrial IoT · Spatial Data Visualization
                  </p>
                </div>
                <Link
                  href="/work/rmt-holotrack"
                  className="group inline-flex items-center gap-3 font-['Blast_Dragon',sans-serif] text-[11px] tracking-[3px] uppercase px-8 py-4 border border-[#e10600] text-[#e10600] rounded-full hover:bg-[#e10600] hover:text-white transition-all duration-300"
                >
                  View Next Project
                  <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </div>
            </div>
          </Reveal>

        </main>
      </div>
    </SmoothScroll>
  );
}
