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

/* ── Gradient divider ────────────────────────────────────────────────────── */
function Divider() {
  return (
    <div className="w-full h-px bg-gradient-to-r from-transparent via-[#E5E7EB] to-transparent" />
  );
}

/* ── Full-width image block ──────────────────────────────────────────────── */
function ImageBlock({ src, alt, width = 1400, height = 900 }: {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}) {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className="w-full h-auto object-contain rounded-[12px] block mx-auto max-w-[1000px]"
      style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.06)' }}
    />
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

/* ── Problem card ────────────────────────────────────────────────────────── */
function ProblemCard({ title, description, index }: { title: string; description: string; index: number }) {
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

/* ════════════════════════════════════════════════════════════════════════════
   PAGE
═══════════════════════════════════════════════════════════════════════════ */
export default function RmtHolotrackCaseStudy() {
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

            {/* Title + meta */}
            <Reveal className="mb-10">
              <Label>Logistics Platform Case Study</Label>
              <h1 className="text-[3rem] md:text-[4.5rem] lg:text-[5.5rem] text-[#111827] leading-[1.05] mb-4">
                Re-Engineering Warehouse Operations
              </h1>
              <p className="text-[14px] leading-[2] text-[#6B7280] mb-6 max-w-[640px]">
                A modular platform designed to simplify warehouse operations, enable remote
                asset monitoring, and provide real-time operational insights for logistics
                teams managing large scale distribution environments.
              </p>

              {/* Metadata row */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
                {[
                  { label: 'Role',     value: 'Lead UI/UX Designer' },
                  { label: 'Duration', value: '12 Months' },
                  { label: 'Platform', value: 'Desktop / Tablet' },
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

            {/* Hero image — full width below title */}
            <Reveal delay={0.15}>
              <ImageBlock
                src="/designs/rmt/hero-image.png"
                alt="RMT Holotrack — Hero"
                width={1400}
                height={800}
              />
            </Reveal>
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
                    A large-scale warehouse operations platform lacked real-time asset visibility, unified operational tooling, and role-based control — forcing logistics teams to rely on manual processes and fragmented systems for critical operational decisions.
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="border border-[#E5E7EB] rounded-2xl p-6 bg-white">
                  <p className="text-[10px] tracking-[3px] text-[#B91C1C] uppercase mb-2">Role</p>
                  <p className="text-[13px] leading-[1.8] text-[#111827]">Lead UI/UX Designer responsible for UX strategy and end-to-end design execution.</p>
                </div>
                <div className="border border-[#E5E7EB] rounded-2xl p-6 bg-white">
                  <p className="text-[10px] tracking-[3px] text-[#B91C1C] uppercase mb-2">Platform</p>
                  <p className="text-[13px] leading-[1.8] text-[#111827]">Desktop-first logistics platform with tablet and mobile extensions.</p>
                </div>
                <div className="border border-[#E5E7EB] rounded-2xl p-6 bg-white">
                  <p className="text-[10px] tracking-[3px] text-[#B91C1C] uppercase mb-2">Duration</p>
                  <p className="text-[13px] leading-[1.8] text-[#111827]">12 months</p>
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
                  process — from discovery through to engineering handoff — while designing
                  a platform that needed to work reliably across warehouse floors and
                  operations centres.
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <ul className="flex flex-col gap-4 lg:mt-[5.5rem]">
                  {[
                    'Led UX strategy for logistics operations platform',
                    'Designed modular system architecture for warehouse workflows',
                    'Built dashboards for operational visibility',
                    'Designed scalable component library',
                    'Ensured system worked across desktop and tablet environments',
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
              3. PROBLEM
          ══════════════════════════════════════════════════════════════ */}
          <section className="py-12 md:py-20">
            <Reveal className="mb-8">
              <Label>Challenge</Label>
              <SectionHeading>Operations ran on gut instinct, not real-time data.</SectionHeading>
              <p className="text-[14px] leading-[2] text-[#6B7280] max-w-[640px]">
                Warehouse teams were making critical operational decisions without the data
                infrastructure to support them — leading to inefficiency, asset loss, and
                reactive rather than proactive management.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <ProblemCard
                  index={0}
                  title="Operational Blind Spots"
                  description="Warehouse managers lacked real-time visibility into fleet and asset status."
                />
                <ProblemCard
                  index={1}
                  title="Fragmented Systems"
                  description="Multiple disconnected tools forced teams to manually consolidate data."
                />
                <ProblemCard
                  index={2}
                  title="Workflow Inefficiency"
                  description="Manual processes slowed down operational decision making."
                />
              </div>
            </Reveal>
          </section>

          <Divider />

          {/* ══════════════════════════════════════════════════════════════
              4. SYSTEM THINKING
          ══════════════════════════════════════════════════════════════ */}
          <section className="py-12 md:py-20">
            <Reveal className="mb-10">
              <Label>System Thinking</Label>
              <SectionHeading>How the Design Addressed Platform Complexity</SectionHeading>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
                <p className="text-[14px] leading-[2] text-[#6B7280]">
                  The platform was architected as a set of independent operational modules —
                  each addressing a distinct function within the warehouse lifecycle. Rather
                  than a monolithic application, every layer was designed to work in
                  isolation and compose cleanly with the others.
                </p>
                <p className="text-[14px] leading-[2] text-[#6B7280]">
                  This modularity allowed the operations team to deploy and scale specific
                  capabilities without disrupting existing workflows — reducing implementation
                  risk while enabling incremental adoption across the distribution network.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.1} className="mb-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {[
                  {
                    num: '01',
                    title: 'Role-Based Operational Dashboards',
                    body: 'Warehouse supervisors, operations directors, and field teams each receive tailored dashboard views — surfacing only the data and controls relevant to their operational responsibilities.',
                  },
                  {
                    num: '02',
                    title: 'Scalable Component Architecture',
                    body: 'A modular component library built for reuse across all five operational modules — ensuring visual consistency and reducing design overhead as the platform expanded.',
                  },
                  {
                    num: '03',
                    title: 'Data Hierarchy Simplification',
                    body: 'Fleet status, asset location, and exception alerts are layered in clear priority order — critical decisions surfaced at the top, granular operational detail accessible on demand.',
                  },
                  {
                    num: '04',
                    title: 'Workflow Orchestration',
                    body: 'Complex warehouse workflows — goods receipt, pick-and-pack, dispatch, and exception handling — redesigned as guided task flows with sequential stages and contextual validation.',
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
            <Reveal delay={0.15}>
              <ImageBlock
                src="/designs/rmt/system-architecture.png"
                alt="RMT Holotrack — System Architecture"
                width={1400}
                height={900}
              />
            </Reveal>
          </section>

          <Divider />

          {/* ══════════════════════════════════════════════════════════════
              5. DESIGN PROCESS
          ══════════════════════════════════════════════════════════════ */}
          <section className="py-12 md:py-20">
            <Reveal className="mb-10">
              <Label>Methodology</Label>
              <SectionHeading>Design Process</SectionHeading>
              <p className="text-[14px] leading-[2] text-[#6B7280] max-w-[560px]">
                A structured, iterative process — grounded in field research and
                validated at every milestone through stakeholder reviews and usability testing.
              </p>
            </Reveal>

            {/* Timeline */}
            <Reveal delay={0.1} className="mb-10">
              {/* Desktop horizontal */}
              <div className="hidden md:flex items-start gap-0 relative">
                <div className="absolute top-5 left-[40px] right-[40px] h-px bg-gradient-to-r from-[#B91C1C]/30 via-[#B91C1C]/20 to-[#B91C1C]/30" />
                {[
                  { step: '01', label: 'Research' },
                  { step: '02', label: 'Task Analysis' },
                  { step: '03', label: 'Wireframes' },
                  { step: '04', label: 'Prototyping' },
                  { step: '05', label: 'Visual Design' },
                  { step: '06', label: 'Testing' },
                ].map(({ step, label }) => (
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

              {/* Mobile vertical */}
              <div className="flex md:hidden flex-col gap-0 relative pl-8">
                <div className="absolute left-[15px] top-5 bottom-5 w-px bg-gradient-to-b from-[#B91C1C]/30 via-[#B91C1C]/20 to-[#B91C1C]/30" />
                {[
                  { step: '01', label: 'Research' },
                  { step: '02', label: 'Task Analysis' },
                  { step: '03', label: 'Wireframes' },
                  { step: '04', label: 'Prototyping' },
                  { step: '05', label: 'Visual Design' },
                  { step: '06', label: 'Testing' },
                ].map(({ step, label }) => (
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

            {/* Wireframe image */}
            <Reveal delay={0.15}>
              <ImageBlock
                src="/designs/rmt/rmt-wireframe.png"
                alt="RMT Holotrack — Wireframes"
                width={1400}
                height={800}
              />
            </Reveal>
          </section>

          <Divider />

          {/* ══════════════════════════════════════════════════════════════
              6. CORE DESIGN PILLARS
          ══════════════════════════════════════════════════════════════ */}
          <section className="py-12 md:py-20">
            <Reveal className="mb-12">
              <Label>Design Approach</Label>
              <SectionHeading>Core Design Pillars</SectionHeading>
            </Reveal>

            {/* Pillar 01 — text left / image right */}
            <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-8 lg:gap-12 items-center mb-16 md:mb-24">
              <Reveal>
                <Label>Pillar 01</Label>
                <h3 className="text-[1.8rem] md:text-[2.4rem] text-[#111827] leading-[1.1] mb-5">
                  Control Tower Dashboard
                </h3>
                <p className="text-[13px] leading-[2] text-[#6B7280]">
                  The control tower dashboard gives operations managers a unified view of
                  all warehouse activity from a single screen. Key metrics — fleet status,
                  active orders, resource utilisation, and exception alerts — are surfaced
                  at the top level so that critical decisions can be made in seconds without
                  drilling through multiple tools or reports.
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <ImageBlock
                  src="/designs/rmt/dashboard.png"
                  alt="Control Tower Dashboard"
                  width={1400}
                  height={900}
                />
              </Reveal>
            </div>

            {/* Pillar 02 — image left / text right */}
            <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-8 lg:gap-12 items-center mb-16 md:mb-24">
              <Reveal className="order-2 lg:order-1">
                <ImageBlock
                  src="/designs/rmt/role-based.png"
                  alt="Role Based Access Architecture"
                  width={1400}
                  height={900}
                />
              </Reveal>
              <Reveal delay={0.1} className="order-1 lg:order-2">
                <Label>Pillar 02</Label>
                <h3 className="text-[1.8rem] md:text-[2.4rem] text-[#111827] leading-[1.1] mb-5">
                  Role Based Access Architecture
                </h3>
                <p className="text-[13px] leading-[2] text-[#6B7280]">
                  Different operational roles require fundamentally different views of the
                  same data. Warehouse supervisors need granular task-level detail;
                  operations directors need high-level performance trends. The role-based
                  architecture tailors the interface to each user type — surfacing only
                  what is relevant, reducing noise, and ensuring the right people have
                  access to the right controls.
                </p>
              </Reveal>
            </div>

            {/* Pillar 03 — text left / image right */}
            <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-8 lg:gap-12 items-center">
              <Reveal>
                <Label>Pillar 03</Label>
                <h3 className="text-[1.8rem] md:text-[2.4rem] text-[#111827] leading-[1.1] mb-5">
                  Workflow Simplification
                </h3>
                <p className="text-[13px] leading-[2] text-[#6B7280]">
                  Complex warehouse workflows — goods receipt, pick-and-pack, dispatch,
                  and exception handling — were mapped, analysed, and redesigned as
                  guided task flows. Multi-step processes were broken into clear sequential
                  stages with contextual validation and inline guidance, reducing training
                  overhead and cutting task completion time across the operations team.
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <ImageBlock
                  src="/designs/rmt/workflow-simp.png"
                  alt="Workflow Simplification"
                  width={1400}
                  height={900}
                />
              </Reveal>
            </div>
          </section>

          <Divider />

          {/* ══════════════════════════════════════════════════════════════
              7. OPERATIONAL MONITORING
          ══════════════════════════════════════════════════════════════ */}
          <section className="py-12 md:py-20">
            <Reveal className="mb-8">
              <Label>Remote Asset Monitoring</Label>
              <SectionHeading>Operational Awareness at a Glance</SectionHeading>
              <p className="text-[14px] leading-[2] text-[#6B7280] max-w-[640px]">
                The asset monitoring module gives logistics teams continuous visibility
                into fleet location, equipment status, and movement patterns — all
                updated in real time. Teams can track assets across multiple warehouse
                zones simultaneously, receive alerts on exceptions, and act on
                operational issues before they escalate into costly disruptions.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <ImageBlock
                src="/designs/rmt/remote-asset-mon.png"
                alt="Remote Asset Monitoring"
                width={1400}
                height={800}
              />
            </Reveal>
          </section>

          <Divider />

          {/* ══════════════════════════════════════════════════════════════
              8. COMPONENT LIBRARY
          ══════════════════════════════════════════════════════════════ */}
          <section className="py-12 md:py-20">
            <Reveal className="mb-8">
              <Label>Scalability</Label>
              <SectionHeading>Component Library</SectionHeading>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
                <p className="text-[14px] leading-[2] text-[#6B7280]">
                  The platform's growth from core modules to a full operational suite was
                  only possible because of a component library built for scale from the
                  start. Every element was designed to compose cleanly — ensuring visual
                  and functional consistency as the product expanded.
                </p>
                <p className="text-[14px] leading-[2] text-[#6B7280]">
                  All components were documented for engineering handoff, covering interaction
                  states, data-binding patterns, and responsive behaviour across desktop
                  and tablet breakpoints.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                {[
                  {
                    category: 'Buttons',
                    description: 'Primary action, secondary, ghost, and destructive variants — all with loading and disabled states for operational contexts.',
                    items: ['Primary', 'Secondary', 'Ghost', 'Destructive'],
                  },
                  {
                    category: 'Data Cards',
                    description: 'Modular cards for surfacing operational metrics, fleet status, and task summaries with configurable data bindings.',
                    items: ['Metric', 'Fleet Status', 'Task Summary', 'Alert'],
                  },
                  {
                    category: 'Filters',
                    description: 'Multi-select, date range, and status filters designed for high-frequency operational use with persistent state.',
                    items: ['Multi-Select', 'Date Range', 'Status', 'Search'],
                  },
                  {
                    category: 'Operational Dashboards',
                    description: 'Composable dashboard panels combining charts, tables, and KPIs into role-specific operational views.',
                    items: ['Charts', 'Tables', 'KPI Panels', 'Map Views'],
                  },
                ].map(({ category, description, items }) => (
                  <div
                    key={category}
                    className="border border-[#E5E7EB] rounded-2xl p-7 bg-white hover:border-[#B91C1C]/30 transition-colors duration-300"
                  >
                    <h4 className="text-[1.2rem] text-[#B91C1C] mb-3">
                      {category}
                    </h4>
                    <p className="text-[12px] leading-[1.8] text-[#6B7280] mb-4">
                      {description}
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
            </Reveal>
          </section>

          <Divider />

          {/* ══════════════════════════════════════════════════════════════
              9. FINAL SCREENS
          ══════════════════════════════════════════════════════════════ */}
          <section className="py-12 md:py-20">
            <Reveal className="mb-10">
              <Label>Final Product</Label>
              <SectionHeading>Desktop &amp; Mobile System</SectionHeading>
              <p className="text-[14px] leading-[2] text-[#6B7280] max-w-[560px]">
                High-fidelity screens from the shipped product — representing the full
                breadth of the RMT Holotrack design system across desktop and mobile
                form factors.
              </p>
            </Reveal>

            <div className="flex flex-col gap-10">
              {/* Desktop screens */}
              <Reveal>
                <p className="text-[10px] tracking-[3px] text-[#6B7280] uppercase mb-4">
                  Desktop Screens
                </p>
                <ImageBlock
                  src="/designs/rmt/desktop-screens.png"
                  alt="RMT Holotrack — Desktop Screens"
                  width={1400}
                  height={900}
                />
              </Reveal>

              {/* Mobile screens */}
              <Reveal delay={0.1}>
                <p className="text-[10px] tracking-[3px] text-[#6B7280] uppercase mb-4">
                  Mobile Screens
                </p>
                <ImageBlock
                  src="/designs/rmt/mobile-screens.png"
                  alt="RMT Holotrack — Mobile Screens"
                  width={1400}
                  height={900}
                />
              </Reveal>
            </div>
          </section>

          <Divider />

          {/* ══════════════════════════════════════════════════════════════
              10. IMPACT
          ══════════════════════════════════════════════════════════════ */}
          <section className="py-12 md:py-20">
            <Reveal className="mb-8">
              <Label>Results</Label>
              <SectionHeading>Impact</SectionHeading>
              <p className="text-[14px] leading-[2] text-[#6B7280] max-w-[560px]">
                The platform delivered measurable improvements across visibility,
                efficiency, and operational cohesion — replacing fragmented tooling
                with a unified system built around how teams actually work.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <MetricCard
                  value="100%"
                  label="Operational Visibility"
                  explanation="Real-time asset and fleet tracking replaced manual check-ins and spreadsheet-based reporting across all warehouse zones."
                />
                <MetricCard
                  value="70%"
                  label="Workflow Efficiency Improvement"
                  explanation="Guided task flows and unified dashboards reduced the time operations staff spent switching between tools and reconciling data manually."
                />
                <MetricCard
                  value="5"
                  label="Major Operational Modules Unified"
                  explanation="Fleet tracking, asset monitoring, order management, role access, and reporting consolidated into one coherent platform."
                />
              </div>
            </Reveal>

            {/* Qualitative outcome cards */}
            <Reveal delay={0.15}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                {[
                  {
                    title: 'Real-Time Warehouse Operations Platform',
                    description: 'Transformed fragmented manual processes into a unified, real-time operations platform — giving logistics teams live visibility into every aspect of warehouse activity.',
                  },
                  {
                    title: 'Fleet and Asset Monitoring Dashboards',
                    description: 'Designed dedicated monitoring dashboards that surface fleet location, equipment status, and movement patterns in real time across multiple warehouse zones.',
                  },
                  {
                    title: 'Role-Based Operational Control for Logistics Teams',
                    description: 'Built a role-based access architecture that tailors the interface to each user type — warehouse supervisors, operations directors, and field teams — surfacing only what is relevant.',
                  },
                  {
                    title: 'Improved Visibility Across Distributed Warehouse Systems',
                    description: 'Replaced disconnected tooling with a single source of truth — enabling operations managers to act on exceptions and make data-driven decisions across distributed warehouse networks.',
                  },
                ].map(({ title, description }) => (
                  <div
                    key={title}
                    className="border border-[#E5E7EB] rounded-2xl p-7 bg-white hover:border-[#B91C1C]/30 transition-colors duration-300"
                  >
                    <div className="w-6 h-6 rounded-full border border-[#B91C1C]/40 flex items-center justify-center mb-4">
                      <span className="w-2 h-2 rounded-full bg-[#B91C1C]" />
                    </div>
                    <h3 className="text-[1.2rem] text-[#111827] mb-3">
                      {title}
                    </h3>
                    <p className="text-[13px] leading-[1.8] text-[#6B7280]">
                      {description}
                    </p>
                  </div>
                ))}
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
                    PH Aware
                  </h2>
                  <p className="text-[13px] text-[#6B7280]">
                    Health Tech · Mental Wellness Platform
                  </p>
                </div>
                <Link
                  href="/work/ph-aware"
                  className="group inline-flex items-center gap-3 text-[11px] tracking-[3px] uppercase px-8 py-4 border border-[#B91C1C] text-[#B91C1C] rounded-full hover:bg-[#B91C1C] hover:text-white transition-all duration-300"
                >
                  PH Aware →
                  <span className="inline-block transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </Reveal>

        </main>
      </div>
    </SmoothScroll>
  );
}
