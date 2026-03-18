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

/* ── Problem card ────────────────────────────────────────────────────────── */
function ProblemCard({ title, description, index }: { title: string; description: string; index: number }) {
  return (
    <div className="flex-1 min-w-[220px] border border-[#1e2028] rounded-2xl p-7 bg-[#0c0d10] hover:border-[#e10600]/30 transition-colors duration-300">
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
              1. HERO SECTION
          ══════════════════════════════════════════════════════════════ */}
          <section className="pt-10 pb-11 md:pb-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">

              {/* Left — text */}
              <Reveal>
                <Label>Context</Label>
                <h1 className="font-['The_Last_Shuriken',sans-serif] text-[3.5rem] md:text-[5rem] lg:text-[6rem] text-[#eaeaea] leading-[1.05] mb-4">
                  TI Credit Report
                </h1>
                <p className="font-['Blast_Dragon',sans-serif] text-[14px] leading-[2] text-[#8a8f98] mb-6 max-w-[500px]">
                  Modernizing an enterprise credit intelligence platform — redesigning
                  complex financial workflows, dense data reports, and multi-step forms into
                  an intuitive, scalable product experience trusted by banking professionals.
                </p>

                {/* Metadata grid */}
                <div className="grid grid-cols-2 gap-x-8 gap-y-5">
                  {[
                    { label: 'Role',     value: 'Lead UI/UX Designer' },
                    { label: 'Duration', value: '36 Months' },
                    { label: 'Platform', value: 'Desktop / Tablet / Mobile' },
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

          {/* ── Quick Summary Strip ────────────────────────────────────────── */}
          <Reveal>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-11 md:mb-16">
              {[
                { label: 'Platform', value: 'FinTech Credit Intelligence' },
                { label: 'Users',    value: 'Bank Managers, Financial Analysts' },
                { label: 'Scope',    value: '150+ Screens' },
                { label: 'Impact',   value: '40% Faster Task Completion' },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  className="border border-[#1e2028] rounded-2xl p-5 bg-[#0c0d10]"
                >
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

          <Divider />

          {/* ══════════════════════════════════════════════════════════════
              PROJECT OVERVIEW
          ══════════════════════════════════════════════════════════════ */}
          <section className="pb-11 md:pb-16">
            <Reveal className="mb-8">
              <Label>Project Overview</Label>
              <SectionHeading>At a Glance</SectionHeading>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="mb-5">
                <div className="border border-[#1e2028] rounded-2xl p-7 bg-[#0c0d10]">
                  <p className="font-['Blast_Dragon',sans-serif] text-[10px] tracking-[3px] text-[#e10600] uppercase mb-3">Problem</p>
                  <p className="font-['Blast_Dragon',sans-serif] text-[14px] leading-[2] text-[#eaeaea]">
                    A compliance-heavy enterprise platform used by banking analysts needed a modern, scalable UX system — one that could simplify complex credit workflows, dense data reporting, and multi-step forms without compromising regulatory requirements or data integrity.
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="border border-[#1e2028] rounded-2xl p-6 bg-[#0c0d10]">
                  <p className="font-['Blast_Dragon',sans-serif] text-[10px] tracking-[3px] text-[#e10600] uppercase mb-2">Role</p>
                  <p className="font-['Blast_Dragon',sans-serif] text-[13px] leading-[1.8] text-[#eaeaea]">Lead UI/UX Designer responsible for UX strategy and end-to-end design execution.</p>
                </div>
                <div className="border border-[#1e2028] rounded-2xl p-6 bg-[#0c0d10]">
                  <p className="font-['Blast_Dragon',sans-serif] text-[10px] tracking-[3px] text-[#e10600] uppercase mb-2">Platform</p>
                  <p className="font-['Blast_Dragon',sans-serif] text-[13px] leading-[1.8] text-[#eaeaea]">Desktop-first enterprise platform with tablet and mobile extensions.</p>
                </div>
                <div className="border border-[#1e2028] rounded-2xl p-6 bg-[#0c0d10]">
                  <p className="font-['Blast_Dragon',sans-serif] text-[10px] tracking-[3px] text-[#e10600] uppercase mb-2">Duration</p>
                  <p className="font-['Blast_Dragon',sans-serif] text-[13px] leading-[1.8] text-[#eaeaea]">36 months</p>
                </div>
              </div>
            </Reveal>
          </section>

          <Divider />

          {/* ══════════════════════════════════════════════════════════════
              MY ROLE
          ══════════════════════════════════════════════════════════════ */}
          <section className="pb-11 md:pb-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-start">
              <Reveal>
                <Label>Leadership</Label>
                <SectionHeading>My Role</SectionHeading>
                <p className="font-['Blast_Dragon',sans-serif] text-[14px] leading-[2] text-[#8a8f98]">
                  As the sole designer on this engagement, I owned the end-to-end UX
                  process — from discovery through to engineering handoff — while navigating
                  a complex set of regulatory, technical, and organisational constraints.
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <ul className="flex flex-col gap-4 mt-2">
                  {[
                    'Led UX strategy for the credit intelligence platform across all four user journeys',
                    'Redesigned core workflows used daily by banking professionals and compliance officers',
                    'Established scalable design patterns and a unified component system across 150+ screens',
                    'Collaborated directly with product managers and engineering teams through weekly reviews',
                    'Ensured every design decision respected enterprise regulatory constraints and audit-trail requirements',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-4">
                      <span className="mt-[6px] w-1.5 h-1.5 rounded-full bg-[#e10600] shrink-0" />
                      <p className="font-['Blast_Dragon',sans-serif] text-[13px] leading-[1.9] text-[#8a8f98]">
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
              PRODUCT CONTEXT
          ══════════════════════════════════════════════════════════════ */}
          <section className="pb-11 md:pb-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-start">
              <Reveal>
                <Label>Background</Label>
                <SectionHeading>Product Context</SectionHeading>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="font-['Blast_Dragon',sans-serif] text-[14px] leading-[2] text-[#8a8f98] mb-6">
                  TI Credit Report is an enterprise credit intelligence platform serving
                  banks, financial institutions, and lending teams with the structured data
                  they need to evaluate borrower creditworthiness and make high-stakes
                  lending decisions.
                </p>
                <p className="font-['Blast_Dragon',sans-serif] text-[14px] leading-[2] text-[#8a8f98] mb-6">
                  The platform is used by bank managers and financial analysts who process
                  hundreds of credit applications per week. Every workflow, every data point,
                  and every UI state has a direct impact on whether a loan is approved or
                  declined — making clarity in financial data not a preference, but a
                  professional requirement.
                </p>
                <p className="font-['Blast_Dragon',sans-serif] text-[14px] leading-[2] text-[#8a8f98]">
                  Errors in this context don&apos;t just create friction — they carry financial
                  and reputational consequences. The redesign had to earn trust through
                  precision, not novelty.
                </p>
              </Reveal>
            </div>
          </section>

          <Divider />

          {/* ══════════════════════════════════════════════════════════════
              2. PROBLEM SECTION
          ══════════════════════════════════════════════════════════════ */}
          <section className="pb-11 md:pb-16">
            <Reveal>
              <Label>Challenge</Label>
              <SectionHeading>The Problem</SectionHeading>
              <p className="font-['Blast_Dragon',sans-serif] text-[14px] leading-[2] text-[#8a8f98] max-w-[640px] mb-6">
                The legacy platform suffered from three core usability failures
                that caused friction at every touchpoint across the credit lifecycle.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="flex flex-col md:flex-row gap-5">
                <ProblemCard
                  index={0}
                  title="Static Long Forms"
                  description="Monolithic single-page forms with 40+ fields displayed simultaneously, causing high abandonment rates and input errors among financial analysts."
                />
                <ProblemCard
                  index={1}
                  title="Data Dense Reports"
                  description="Credit reports lacked visual hierarchy — raw numerical tables with no grouping, no progressive disclosure, and no actionable insight surfacing."
                />
                <ProblemCard
                  index={2}
                  title="Cognitive Overload"
                  description="Users faced decision paralysis navigating between workflows. The mental load of interpreting data while completing tasks was unsustainable at scale."
                />
              </div>
            </Reveal>
          </section>

          <Divider />

          {/* ══════════════════════════════════════════════════════════════
              KEY CHALLENGES
          ══════════════════════════════════════════════════════════════ */}
          <section className="pb-11 md:pb-16">
            <Reveal>
              <Label>What Made This Hard</Label>
              <SectionHeading>Key Challenges</SectionHeading>
              <p className="font-['Blast_Dragon',sans-serif] text-[14px] leading-[2] text-[#8a8f98] max-w-[600px] mb-6">
                Four compounding challenges shaped every design decision and demanded
                a fundamentally different approach to simplification.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {[
                  {
                    num:   '01',
                    title: 'Regulatory Compliance Constraints',
                    body:  'Every workflow had to satisfy enterprise compliance frameworks, financial regulatory requirements, and legal audit-trail standards. Simplification could never come at the cost of compliance.',
                    color: 'border-[#e10600]/20 hover:border-[#e10600]/50',
                    dot:   'bg-[#e10600]',
                  },
                  {
                    num:   '02',
                    title: 'Complex Financial Data Structures',
                    body:  'Credit data is inherently nested, relational, and time-sensitive. Presenting it clearly without losing fidelity required deep information architecture work.',
                    color: 'border-[#e10600]/20 hover:border-[#e10600]/50',
                    dot:   'bg-[#e10600]',
                  },
                  {
                    num:   '03',
                    title: 'Experienced Power Users',
                    body:  'Analysts and bank managers are domain experts with established mental models. Oversimplification would slow them down. The design had to match their expertise, not bypass it.',
                    color: 'border-[#e10600]/20 hover:border-[#e10600]/50',
                    dot:   'bg-[#e10600]',
                  },
                  {
                    num:   '04',
                    title: 'Legacy System Limitations',
                    body:  'Fixed API contracts and aging infrastructure meant designs had to work within existing data structures — no new endpoints, no redesigned payloads.',
                    color: 'border-[#e10600]/20 hover:border-[#e10600]/50',
                    dot:   'bg-[#e10600]',
                  },
                ].map(({ num, title, body, color, dot }) => (
                  <div
                    key={num}
                    className={`border ${color} rounded-2xl p-7 bg-[#0c0d10] transition-colors duration-300`}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <span className={`w-2 h-2 rounded-full ${dot} shrink-0`} />
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
              3. CONSTRAINTS
          ══════════════════════════════════════════════════════════════ */}
          <section className="pb-11 md:pb-16">
            <Reveal>
              <Label>Design Context</Label>
              <SectionHeading>Constraints</SectionHeading>
              <p className="font-['Blast_Dragon',sans-serif] text-[14px] leading-[2] text-[#8a8f98] max-w-[640px] mb-6">
                Every design decision was shaped by a demanding set of real-world constraints.
                These were not obstacles to work around — they were the design brief.
                Understanding them was the prerequisite for any meaningful solution.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {[
                  {
                    index: '01',
                    title: 'Regulatory Compliance',
                    description:
                      'All workflows had to meet enterprise compliance frameworks and financial regulatory standards. UI patterns that simplified inputs could not compromise legal audit trails or data integrity requirements.',
                  },
                  {
                    index: '02',
                    title: 'Legacy Infrastructure',
                    description:
                      'The platform ran on aging backend systems with fixed API response structures. Designs had to work within those data contracts — no new endpoints could be created for UX convenience.',
                  },
                  {
                    index: '03',
                    title: 'High Data Accuracy Requirements',
                    description:
                      'Credit decisions carry financial and legal consequences. Ambiguous UI states, unclear validation, or misleading visualizations were not acceptable failure modes.',
                  },
                  {
                    index: '04',
                    title: 'Experienced Banking Professionals',
                    description:
                      'Primary users were senior analysts and compliance officers — not general consumers. Solutions had to respect their mental models and vocabulary rather than over-simplify at the cost of efficiency.',
                  },
                ].map(({ index, title, description }) => (
                  <div
                    key={index}
                    className="border border-[#1e2028] rounded-2xl p-7 bg-[#0c0d10] hover:border-[#D4AF37]/30 transition-colors duration-300"
                  >
                    <p className="font-['Blast_Dragon',sans-serif] text-[10px] tracking-[3px] text-[#D4AF37] uppercase mb-4">
                      {index}
                    </p>
                    <h3 className="font-['The_Last_Shuriken',sans-serif] text-[1.2rem] text-[#eaeaea] mb-3">
                      {title}
                    </h3>
                    <p className="font-['Blast_Dragon',sans-serif] text-[13px] leading-[1.9] text-[#8a8f98]">
                      {description}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
          </section>

          <Divider />

          {/* ══════════════════════════════════════════════════════════════
              4. TRANSFORMATION SECTION
          ══════════════════════════════════════════════════════════════ */}
          <section className="pb-11 md:pb-16">
            <Reveal>
              <Label>Before vs After</Label>
              <SectionHeading>Legacy vs Modern</SectionHeading>
              <p className="font-['Blast_Dragon',sans-serif] text-[14px] leading-[2] text-[#8a8f98] max-w-[600px] mb-6">
                A deliberate, research-backed transformation — from overwhelming complexity
                to purposeful clarity at every interaction point.
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
                    Before — Long static forms with excessive fields
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
                    After — Progressive stepper workflow with structured hierarchy
                  </p>
                </div>
              </Reveal>
            </div>
          </section>

          <Divider />

          {/* ══════════════════════════════════════════════════════════════
              5. UX STRATEGY
          ══════════════════════════════════════════════════════════════ */}
          <section className="pb-11 md:pb-16">
            <Reveal>
              <Label>Design Approach</Label>
              <SectionHeading>Strategic Design Decisions</SectionHeading>
            </Reveal>

            {/* A — Progressive Stepper (image right) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center mt-8 mb-10">
              <Reveal className="order-2 lg:order-1">
                <Label>Decision 01</Label>
                <h3 className="font-['The_Last_Shuriken',sans-serif] text-[1.8rem] md:text-[2.2rem] text-[#eaeaea] mb-5">
                  Progressive Stepper Forms
                </h3>
                <p className="font-['Blast_Dragon',sans-serif] text-[13px] leading-[2] text-[#8a8f98]">
                  Replaced monolithic form layouts with a contextual, step-by-step stepper.
                  Each stage surfaces only the fields relevant to the current step —
                  reducing perceived complexity and guiding users through credit workflows
                  with clear progress indicators and inline validation feedback.
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

            {/* B — Dashboard Reports (image left) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-10">
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
                <h3 className="font-['The_Last_Shuriken',sans-serif] text-[1.8rem] md:text-[2.2rem] text-[#eaeaea] mb-5">
                  Dashboard Based Reports
                </h3>
                <p className="font-['Blast_Dragon',sans-serif] text-[13px] leading-[2] text-[#8a8f98]">
                  Transformed raw tabular credit data into structured, scannable dashboards.
                  Key metrics are elevated through visual hierarchy — score indicators,
                  trend charts, and segmented panels allow analysts to extract insight
                  in seconds rather than minutes.
                </p>
              </Reveal>
            </div>

            {/* C — Data Hierarchy (image right) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <Reveal className="order-2 lg:order-1">
                <Label>Decision 03</Label>
                <h3 className="font-['The_Last_Shuriken',sans-serif] text-[1.8rem] md:text-[2.2rem] text-[#eaeaea] mb-5">
                  Data Hierarchy Optimization
                </h3>
                <p className="font-['Blast_Dragon',sans-serif] text-[13px] leading-[2] text-[#8a8f98]">
                  Established a strict visual hierarchy across all data-heavy screens —
                  primary metrics at the top, secondary context in the middle, granular
                  detail accessible on demand. This reduced cognitive load by guiding
                  attention through intentional type scale and spatial grouping.
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
          </section>

          <Divider />

          {/* ══════════════════════════════════════════════════════════════
              SYSTEM THINKING
          ══════════════════════════════════════════════════════════════ */}
          <section className="pb-11 md:pb-16">
            <Reveal className="mb-8">
              <Label>System Thinking</Label>
              <SectionHeading>How the Design Addressed Platform Complexity</SectionHeading>
              <p className="font-['Blast_Dragon',sans-serif] text-[14px] leading-[2] text-[#8a8f98] max-w-[640px]">
                Solving complexity at scale required more than good screens — it demanded a systemic approach to information architecture, user roles, component reuse, and workflow orchestration.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {[
                  {
                    num: '01',
                    title: 'Role-Based User Journeys',
                    body: 'Four distinct user journeys — analysts, compliance managers, bank partners, and consumers — each designed with tailored information hierarchy and task flows appropriate to their domain expertise and responsibilities.',
                  },
                  {
                    num: '02',
                    title: 'Scalable Component Architecture',
                    body: 'A unified design system built to scale from 25 to 150+ screens across all user journeys — ensuring visual and functional consistency without design drift as the platform grew.',
                  },
                  {
                    num: '03',
                    title: 'Data Hierarchy Simplification',
                    body: 'Primary metrics surfaced first, secondary context in the middle, granular detail accessible on demand — reducing cognitive load by guiding analyst attention through intentional structure rather than overwhelming data density.',
                  },
                  {
                    num: '04',
                    title: 'Workflow Orchestration',
                    body: 'Multi-step credit workflows restructured into guided stepper flows with contextual validation and clear progress indicators — matching how banking professionals actually process applications rather than how legacy systems presented them.',
                  },
                ].map(({ num, title, body }) => (
                  <div
                    key={num}
                    className="border border-[#1e2028] rounded-2xl p-7 bg-[#0c0d10] hover:border-[#e10600]/30 transition-colors duration-300"
                  >
                    <p className="font-['Blast_Dragon',sans-serif] text-[10px] tracking-[3px] text-[#e10600] uppercase mb-4">
                      {num}
                    </p>
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
              6. DESIGN SYSTEM
          ══════════════════════════════════════════════════════════════ */}
          <section className="pb-11 md:pb-16">
            <Reveal>
              <Label>Scalable Design System</Label>
              <SectionHeading>Design System</SectionHeading>
              <p className="font-['Blast_Dragon',sans-serif] text-[14px] leading-[2] text-[#8a8f98] max-w-[640px] mb-4">
                The platform started at 25 screens. By the end of the engagement it had
                grown to 150+ — spanning four distinct user journeys across analysts,
                compliance managers, bank partners, and end consumers. That growth was only
                possible because of a design system built to scale from day one.
              </p>
              <p className="font-['Blast_Dragon',sans-serif] text-[14px] leading-[2] text-[#8a8f98] max-w-[640px] mb-6">
                Every component, token, and pattern was designed to compose — ensuring
                visual and functional consistency without design drift as the product
                grew. The system covered a 6-level type scale, a semantic color palette,
                a full component library, spacing tokens, and interaction guidelines,
                all documented for engineering handoff.
              </p>
            </Reveal>

            {/* System pillars — rich three-column cards */}
            <Reveal delay={0.1}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">

                {/* ── Typography card ── */}
                <div className="border border-[#1e2028] rounded-2xl p-7 bg-[#0c0d10] hover:border-[#D4AF37]/30 transition-colors flex flex-col">
                  <h4 className="font-['The_Last_Shuriken',sans-serif] text-[1.2rem] text-[#D4AF37] mb-4">
                    Typography
                  </h4>
                  <div className="flex flex-col gap-5 flex-1">
                    {[
                      { name: 'Display',   size: '48px', weight: 'Bold',      scale: 'text-[2.4rem]' },
                      { name: 'Heading 1', size: '36px', weight: 'Semi Bold', scale: 'text-[1.8rem]' },
                      { name: 'Heading 2', size: '24px', weight: 'Semi Bold', scale: 'text-[1.2rem]' },
                      { name: 'Body',      size: '16px', weight: 'Regular',   scale: 'text-[1rem]'   },
                      { name: 'Caption',   size: '12px', weight: 'Medium',    scale: 'text-[0.75rem]'},
                    ].map(({ name, size, weight, scale }) => (
                      <div key={name} className="flex items-baseline justify-between gap-3 border-b border-[#1e2028] pb-4 last:border-0 last:pb-0">
                        <div className="flex-1 min-w-0">
                          <p className={`${scale} font-['The_Last_Shuriken',sans-serif] text-[#eaeaea] leading-tight truncate`}>
                            {name}
                          </p>
                        </div>
                        <div className="shrink-0 text-right">
                          <p className="font-['Blast_Dragon',sans-serif] text-[10px] tracking-[1px] text-[#D4AF37]">
                            {size}
                          </p>
                          <p className="font-['Blast_Dragon',sans-serif] text-[9px] tracking-[1px] text-[#8a8f98] mt-0.5">
                            {weight}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ── Color Palette card ── */}
                <div className="border border-[#1e2028] rounded-2xl p-7 bg-[#0c0d10] hover:border-[#D4AF37]/30 transition-colors flex flex-col">
                  <h4 className="font-['The_Last_Shuriken',sans-serif] text-[1.2rem] text-[#D4AF37] mb-4">
                    Color Palette
                  </h4>
                  <div className="flex flex-col gap-3 flex-1">
                    {[
                      { label: 'Primary',       hex: '#014163', bg: 'bg-[#014163]' },
                      { label: 'Secondary',     hex: '#FCD800', bg: 'bg-[#FCD800]' },
                      { label: 'Neutral Dark',  hex: '#333333', bg: 'bg-[#333333]' },
                      { label: 'Neutral Mid',   hex: '#919191', bg: 'bg-[#919191]' },
                      { label: 'Neutral Light', hex: '#F2F2F5', bg: 'bg-[#F2F2F5]' },
                      { label: 'Accent',        hex: '#307DA2', bg: 'bg-[#307DA2]' },
                    ].map(({ label, hex, bg }) => (
                      <div key={hex} className="flex items-center gap-3">
                        <div className={`${bg} w-9 h-9 rounded-lg shrink-0 border border-white/10`} />
                        <div>
                          <p className="font-['Blast_Dragon',sans-serif] text-[11px] text-[#eaeaea] leading-tight">
                            {label}
                          </p>
                          <p className="font-['Blast_Dragon',sans-serif] text-[10px] tracking-[1px] text-[#8a8f98] mt-0.5">
                            {hex}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ── Components card ── */}
                <div className="border border-[#1e2028] rounded-2xl p-7 bg-[#0c0d10] hover:border-[#D4AF37]/30 transition-colors flex flex-col">
                  <h4 className="font-['The_Last_Shuriken',sans-serif] text-[1.2rem] text-[#D4AF37] mb-4">
                    Components
                  </h4>
                  <div className="flex flex-col gap-5 flex-1">
                    {[
                      { category: 'Buttons',     items: ['Primary', 'Secondary', 'Ghost'] },
                      { category: 'Form Fields',  items: ['Input', 'Select', 'Checkbox'] },
                      { category: 'Data Cards',   items: ['Metric', 'Chart', 'Summary'] },
                      { category: 'Navigation',   items: ['Sidebar', 'Tabs', 'Breadcrumbs'] },
                    ].map(({ category, items }) => (
                      <div key={category} className="border-b border-[#1e2028] pb-4 last:border-0 last:pb-0">
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

            {/* Stat callout */}
            <Reveal delay={0.15}>
              <div className="border border-[#1e2028] rounded-2xl p-8 md:p-12 bg-[#0c0d10] text-center">
                <p className="font-['The_Last_Shuriken',sans-serif] text-[4rem] md:text-[6rem] text-[#D4AF37] leading-none">
                  150+
                </p>
                <p className="font-['Blast_Dragon',sans-serif] text-[11px] tracking-[4px] text-[#8a8f98] uppercase mt-3">
                  Screens Designed with a Single Unified System
                </p>
              </div>
            </Reveal>
          </section>

          <Divider />

          {/* ══════════════════════════════════════════════════════════════
              7. RESPONSIVE DESIGN
          ══════════════════════════════════════════════════════════════ */}
          <section className="pb-11 md:pb-16">
            <Reveal>
              <Label>Multi-Device</Label>
              <SectionHeading>Every Screen, Every Device</SectionHeading>
              <p className="font-['Blast_Dragon',sans-serif] text-[14px] leading-[2] text-[#8a8f98] max-w-[600px] mb-6">
                From enterprise desktops to field tablets and consumer mobile — the
                TI Credit Report experience adapts fluidly across breakpoints, preserving
                information hierarchy and interaction quality on every device.
              </p>
            </Reveal>

            {/* Responsive overview — single full-width image */}
            <Reveal delay={0.1}>
              <div className="w-full overflow-hidden rounded-xl">
                <Image
                  src="/designs/tu-cibil/responsive-image.png?v=2"
                  alt="TI Credit Report — responsive design across devices"
                  width={1400}
                  height={800}
                  className="w-full h-auto object-contain"
                />
              </div>
            </Reveal>
          </section>

          <Divider />

          {/* ══════════════════════════════════════════════════════════════
              8. PLANNING / WIREFRAMES
          ══════════════════════════════════════════════════════════════ */}
          <section className="pb-11 md:pb-16">
            <Reveal>
              <Label>Information Architecture</Label>
              <SectionHeading>Planning</SectionHeading>
              <p className="font-['Blast_Dragon',sans-serif] text-[14px] leading-[2] text-[#8a8f98] max-w-[640px] mb-4">
                Wireframes were the foundation — not decoration. Before any visual
                decisions, every screen was mapped as a low-fidelity structure to
                validate navigation logic, content priority, and task flow.
              </p>
              <p className="font-['Blast_Dragon',sans-serif] text-[14px] leading-[2] text-[#8a8f98] max-w-[640px] mb-6">
                This process uncovered hidden complexity in multi-step credit workflows,
                drove the decision to adopt the progressive stepper pattern, and established
                the information architecture that the final design system was built upon.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="w-full overflow-hidden rounded-xl">
                <Image
                  src="/designs/tu-cibil/wireframe-image.png?v=2"
                  alt="Wireframes — Information Architecture"
                  width={1400}
                  height={800}
                  className="w-full h-auto object-contain"
                />
              </div>
            </Reveal>
          </section>

          <Divider />

          {/* ══════════════════════════════════════════════════════════════
              9. DESIGN PROCESS
          ══════════════════════════════════════════════════════════════ */}
          <section className="pb-11 md:pb-16">
            <Reveal>
              <Label>Methodology</Label>
              <SectionHeading>Design Process</SectionHeading>
              <p className="font-['Blast_Dragon',sans-serif] text-[14px] leading-[2] text-[#8a8f98] max-w-[560px] mb-6">
                A structured, iterative process — grounded in user research and
                validated at every milestone through stakeholder reviews and usability testing.
              </p>
            </Reveal>

            {/* Timeline */}
            <Reveal delay={0.1}>
              {/* Desktop horizontal */}
              <div className="hidden md:flex items-start gap-0 relative">
                {/* connecting line */}
                <div className="absolute top-5 left-[40px] right-[40px] h-px bg-gradient-to-r from-[#e10600]/40 via-[#D4AF37]/40 to-[#e10600]/40" />
                {[
                  { step: '01', label: 'Research' },
                  { step: '02', label: 'Task Analysis' },
                  { step: '03', label: 'Wireframes' },
                  { step: '04', label: 'Prototyping' },
                  { step: '05', label: 'Visual Design' },
                  { step: '06', label: 'Testing' },
                ].map(({ step, label }, i) => (
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

              {/* Mobile vertical */}
              <div className="flex md:hidden flex-col gap-0 relative pl-8">
                <div className="absolute left-[15px] top-5 bottom-5 w-px bg-gradient-to-b from-[#e10600]/40 via-[#D4AF37]/40 to-[#e10600]/40" />
                {[
                  { step: '01', label: 'Research' },
                  { step: '02', label: 'Task Analysis' },
                  { step: '03', label: 'Wireframes' },
                  { step: '04', label: 'Prototyping' },
                  { step: '05', label: 'Visual Design' },
                  { step: '06', label: 'Testing' },
                ].map(({ step, label }) => (
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
          </section>

          <Divider />

          {/* ══════════════════════════════════════════════════════════════
              10. OUTCOMES
          ══════════════════════════════════════════════════════════════ */}
          <section className="pb-11 md:pb-16">
            <Reveal>
              <Label>Results</Label>
              <SectionHeading>Measurable Impact</SectionHeading>
              <p className="font-['Blast_Dragon',sans-serif] text-[14px] leading-[2] text-[#8a8f98] max-w-[560px] mb-6">
                The redesign delivered tangible improvements across efficiency, scale,
                and user wellbeing — validated through post-launch usability studies
                and stakeholder feedback.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="flex flex-col md:flex-row gap-5">
                <MetricCard
                  value="40%"
                  label="Faster Task Completion"
                  explanation="Credit workflows that previously took analysts an average of 18 minutes were reduced to under 11 minutes through progressive disclosure and smarter task sequencing."
                />
                <MetricCard
                  value="150+"
                  label="Screens Designed"
                  explanation="A single, unified design system scaled from an initial 25-screen scope to cover all four user journeys — analysts, managers, bank partners, and end consumers."
                />
                <MetricCard
                  value="60%"
                  label="Reduced Cognitive Load"
                  explanation="Post-launch usability studies measured a 60% reduction in decision errors and user-reported mental effort, attributed to improved information hierarchy and progressive disclosure."
                />
              </div>
            </Reveal>

            {/* Qualitative outcome cards */}
            <Reveal delay={0.15}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
                {[
                  {
                    title: '150+ Production Screens Designed',
                    description: 'From an initial 25-screen scope, the platform grew to 150+ production screens across four distinct user journeys — all within a single unified design system.',
                  },
                  {
                    title: 'Platform Used by Banking Analysts Nationwide',
                    description: 'The redesigned platform is trusted by bank managers and financial analysts to evaluate creditworthiness and make high-stakes lending decisions at scale.',
                  },
                  {
                    title: 'Simplified Complex Credit Reporting Workflows',
                    description: 'Dense data reports and monolithic forms were transformed into structured, scannable dashboards and progressive stepper flows that match how analysts actually think.',
                  },
                  {
                    title: 'Improved Operational Efficiency for Financial Decision Makers',
                    description: 'By reducing cognitive load and streamlining multi-step workflows, the redesign enabled analysts to process more applications accurately and with less effort.',
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
          </section>

          <Divider />

          {/* ══════════════════════════════════════════════════════════════
              11. FINAL SCREENS
          ══════════════════════════════════════════════════════════════ */}
          <section className="pb-11 md:pb-16">
            <Reveal>
              <Label>Final Product</Label>
              <SectionHeading>Final Screens</SectionHeading>
              <p className="font-['Blast_Dragon',sans-serif] text-[14px] leading-[2] text-[#8a8f98] max-w-[560px] mb-6">
                High-fidelity screens from the shipped product — desktop and mobile —
                representing the full breadth of the TI Credit Report design system in production.
              </p>
            </Reveal>

            <div className="flex flex-col gap-8">
              {/* Desktop screens */}
              <Reveal>
                <p className="font-['Blast_Dragon',sans-serif] text-[10px] tracking-[3px] text-[#8a8f98] uppercase mb-3">
                  Desktop Screens
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

              {/* Mobile screens */}
              <Reveal delay={0.1}>
                <p className="font-['Blast_Dragon',sans-serif] text-[10px] tracking-[3px] text-[#8a8f98] uppercase mb-3">
                  Mobile Screens
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
