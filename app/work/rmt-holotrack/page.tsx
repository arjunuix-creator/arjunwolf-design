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
export default function RmtHolotrackCaseStudy() {
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
          <section className="pt-10 pb-14 md:pb-20">
            {/* Top — text content */}
            <Reveal className="mb-8">
              <Label>Logistics Platform Case Study</Label>
              <h1 className="font-['The_Last_Shuriken',sans-serif] text-[3rem] md:text-[4.5rem] lg:text-[5.5rem] text-[#eaeaea] leading-[1.05] mb-6">
                Re-Engineering Warehouse Operations
              </h1>
              <p className="font-['Blast_Dragon',sans-serif] text-[14px] leading-[2] text-[#8a8f98] mb-8 max-w-[680px]">
                A modular platform designed to simplify warehouse operations, enable remote
                asset monitoring, and provide real-time operational insights for logistics
                teams managing large scale distribution environments.
              </p>
              {/* Metadata row */}
              <div className="flex flex-wrap gap-x-10 gap-y-5">
                {[
                  { label: 'Role',     value: 'Lead UI/UX Designer' },
                  { label: 'Duration', value: '12 Months' },
                  { label: 'Platform', value: 'Desktop / Tablet' },
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

            {/* Bottom — hero image full width */}
            <Reveal delay={0.15} className="w-full">
              <div className="relative w-full rounded-2xl overflow-hidden border border-[#1e2028]">
                <Image
                  src="/designs/rmt/hero-image.png"
                  alt="RMT Holotrack Hero"
                  width={1400}
                  height={800}
                  className="w-full h-auto object-contain"
                  priority
                />
              </div>
            </Reveal>
          </section>

          <Divider />

          {/* ══════════════════════════════════════════════════════════════
              2. MY ROLE
          ══════════════════════════════════════════════════════════════ */}
          <section className="pb-14 md:pb-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-start">
              <Reveal>
                <Label>Leadership</Label>
                <SectionHeading>My Role</SectionHeading>
                <p className="font-['Blast_Dragon',sans-serif] text-[14px] leading-[2] text-[#8a8f98]">
                  As the sole designer on this engagement, I owned the end-to-end UX
                  process — from discovery through to engineering handoff — while designing
                  a platform that needed to work reliably across warehouse floors and
                  operations centres.
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <ul className="flex flex-col gap-4 mt-2">
                  {[
                    'Led UX strategy for logistics operations platform',
                    'Designed modular system architecture for warehouse workflows',
                    'Built dashboards for operational visibility',
                    'Designed scalable component library',
                    'Ensured system worked across desktop and tablet environments',
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
              3. PROBLEM SECTION
          ══════════════════════════════════════════════════════════════ */}
          <section className="pb-14 md:pb-20">
            <Reveal>
              <Label>Challenge</Label>
              <SectionHeading>Operations ran on gut instinct, not real-time data.</SectionHeading>
              <p className="font-['Blast_Dragon',sans-serif] text-[14px] leading-[2] text-[#8a8f98] max-w-[640px] mb-6">
                Warehouse teams were making critical operational decisions without the data
                infrastructure to support them — leading to inefficiency, asset loss, and
                reactive rather than proactive management.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="flex flex-col md:flex-row gap-5">
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
              4. MODULAR PLATFORM DESIGN
          ══════════════════════════════════════════════════════════════ */}
          <section className="pb-14 md:pb-20">
            <Reveal>
              <Label>System Thinking</Label>
              <SectionHeading>Modular Platform Design</SectionHeading>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 mb-10">
                <p className="font-['Blast_Dragon',sans-serif] text-[14px] leading-[2] text-[#8a8f98]">
                  The platform was architected as a set of independent operational modules —
                  each addressing a distinct function within the warehouse lifecycle. Rather
                  than a monolithic application, every layer was designed to work in
                  isolation and compose cleanly with the others.
                </p>
                <p className="font-['Blast_Dragon',sans-serif] text-[14px] leading-[2] text-[#8a8f98]">
                  This modularity allowed the operations team to deploy and scale specific
                  capabilities without disrupting existing workflows — reducing implementation
                  risk while enabling incremental adoption across the distribution network.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="rounded-2xl overflow-hidden border border-[#1e2028] bg-[#0c0d10]">
                <Image
                  src="/designs/rmt/system-architecture.png"
                  alt="RMT Holotrack — System Architecture"
                  width={1400}
                  height={900}
                  className="w-full h-auto object-contain"
                />
              </div>
            </Reveal>
          </section>

          <Divider />

          {/* ══════════════════════════════════════════════════════════════
              5. DESIGN PROCESS
          ══════════════════════════════════════════════════════════════ */}
          <section className="pb-14 md:pb-20">
            <Reveal>
              <Label>Methodology</Label>
              <SectionHeading>Design Process</SectionHeading>
              <p className="font-['Blast_Dragon',sans-serif] text-[14px] leading-[2] text-[#8a8f98] max-w-[560px] mb-6">
                A structured, iterative process — grounded in field research and
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
                ].map(({ step, label }) => (
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

            {/* Wireframe image */}
            <Reveal delay={0.15} className="mt-10">
              <div className="rounded-2xl overflow-hidden border border-[#1e2028] bg-[#0c0d10]">
                <Image
                  src="/designs/rmt/rmt-wireframe.png"
                  alt="RMT Holotrack — Wireframes"
                  width={1400}
                  height={800}
                  className="w-full h-auto object-contain"
                />
              </div>
            </Reveal>
          </section>

          <Divider />

          {/* ══════════════════════════════════════════════════════════════
              6. CORE DESIGN PILLARS
          ══════════════════════════════════════════════════════════════ */}
          <section className="pb-14 md:pb-20">
            <Reveal>
              <Label>Design Approach</Label>
              <SectionHeading>Core Design Pillars</SectionHeading>
            </Reveal>

            {/* A — Control Tower Dashboard */}
            <div className="mt-8 mb-14">
              <Reveal>
                <Label>Pillar 01</Label>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 mb-8">
                  <h3 className="font-['The_Last_Shuriken',sans-serif] text-[1.8rem] md:text-[2.5rem] text-[#eaeaea] leading-[1.1]">
                    Control Tower Dashboard
                  </h3>
                  <p className="font-['Blast_Dragon',sans-serif] text-[13px] leading-[2] text-[#8a8f98] self-end">
                    The control tower dashboard gives operations managers a unified view of
                    all warehouse activity from a single screen. Key metrics — fleet status,
                    active orders, resource utilisation, and exception alerts — are surfaced
                    at the top level so that critical decisions can be made in seconds without
                    drilling through multiple tools or reports.
                  </p>
                </div>
              </Reveal>
              <Reveal delay={0.1}>
                <div className="rounded-2xl overflow-hidden border border-[#1e2028] bg-[#0c0d10]">
                  <Image
                    src="/designs/rmt/dashboard.png"
                    alt="Control Tower Dashboard"
                    width={1400}
                    height={900}
                    className="w-full h-auto object-contain"
                  />
                </div>
              </Reveal>
            </div>

            {/* B — Role Based Access Architecture */}
            <div className="mb-14">
              <Reveal>
                <Label>Pillar 02</Label>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 mb-8">
                  <h3 className="font-['The_Last_Shuriken',sans-serif] text-[1.8rem] md:text-[2.5rem] text-[#eaeaea] leading-[1.1]">
                    Role Based Access Architecture
                  </h3>
                  <p className="font-['Blast_Dragon',sans-serif] text-[13px] leading-[2] text-[#8a8f98] self-end">
                    Different operational roles require fundamentally different views of the
                    same data. Warehouse supervisors need granular task-level detail;
                    operations directors need high-level performance trends. The role-based
                    architecture tailors the interface to each user type — surfacing only
                    what is relevant, reducing noise, and ensuring the right people have
                    access to the right controls.
                  </p>
                </div>
              </Reveal>
              <Reveal delay={0.1}>
                <div className="rounded-2xl overflow-hidden border border-[#1e2028] bg-[#0c0d10]">
                  <Image
                    src="/designs/rmt/role-based.png"
                    alt="Role Based Access Architecture"
                    width={1400}
                    height={900}
                    className="w-full h-auto object-contain"
                  />
                </div>
              </Reveal>
            </div>

            {/* C — Workflow Simplification */}
            <div>
              <Reveal>
                <Label>Pillar 03</Label>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 mb-8">
                  <h3 className="font-['The_Last_Shuriken',sans-serif] text-[1.8rem] md:text-[2.5rem] text-[#eaeaea] leading-[1.1]">
                    Workflow Simplification
                  </h3>
                  <p className="font-['Blast_Dragon',sans-serif] text-[13px] leading-[2] text-[#8a8f98] self-end">
                    Complex warehouse workflows — goods receipt, pick-and-pack, dispatch,
                    and exception handling — were mapped, analysed, and redesigned as
                    guided task flows. Multi-step processes were broken into clear sequential
                    stages with contextual validation and inline guidance, reducing training
                    overhead and cutting task completion time across the operations team.
                  </p>
                </div>
              </Reveal>
              <Reveal delay={0.1}>
                <div className="rounded-2xl overflow-hidden border border-[#1e2028] bg-[#0c0d10]">
                  <Image
                    src="/designs/rmt/workflow-simp.png"
                    alt="Workflow Simplification"
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
              7. OPERATIONAL MONITORING
          ══════════════════════════════════════════════════════════════ */}
          <section className="pb-14 md:pb-20">
            <Reveal>
              <Label>Remote Asset Monitoring</Label>
              <SectionHeading>Operational Awareness at a Glance</SectionHeading>
              <p className="font-['Blast_Dragon',sans-serif] text-[14px] leading-[2] text-[#8a8f98] max-w-[640px] mb-6">
                The asset monitoring module gives logistics teams continuous visibility
                into fleet location, equipment status, and movement patterns — all
                updated in real time. Teams can track assets across multiple warehouse
                zones simultaneously, receive alerts on exceptions, and act on
                operational issues before they escalate into costly disruptions.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="rounded-2xl overflow-hidden border border-[#1e2028] bg-[#0c0d10]">
                <Image
                  src="/designs/rmt/remote-asset-mon.png"
                  alt="Remote Asset Monitoring"
                  width={1400}
                  height={800}
                  className="w-full h-auto object-contain"
                />
              </div>
            </Reveal>
          </section>

          <Divider />

          {/* ══════════════════════════════════════════════════════════════
              8. COMPONENT LIBRARY
          ══════════════════════════════════════════════════════════════ */}
          <section className="pb-14 md:pb-20">
            <Reveal>
              <Label>Scalability</Label>
              <SectionHeading>Component Library</SectionHeading>
              <p className="font-['Blast_Dragon',sans-serif] text-[14px] leading-[2] text-[#8a8f98] max-w-[640px] mb-4">
                The platform's growth from core modules to a full operational suite was
                only possible because of a component library built for scale from the
                start. Every element was designed to compose cleanly — ensuring visual
                and functional consistency as the product expanded.
              </p>
              <p className="font-['Blast_Dragon',sans-serif] text-[14px] leading-[2] text-[#8a8f98] max-w-[640px] mb-6">
                All components were documented for engineering handoff, covering interaction
                states, data-binding patterns, and responsive behaviour across desktop
                and tablet breakpoints.
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
                    className="border border-[#1e2028] rounded-2xl p-7 bg-[#0c0d10] hover:border-[#D4AF37]/30 transition-colors duration-300"
                  >
                    <h4 className="font-['The_Last_Shuriken',sans-serif] text-[1.2rem] text-[#D4AF37] mb-3">
                      {category}
                    </h4>
                    <p className="font-['Blast_Dragon',sans-serif] text-[12px] leading-[1.8] text-[#8a8f98] mb-4">
                      {description}
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
            </Reveal>
          </section>

          <Divider />

          {/* ══════════════════════════════════════════════════════════════
              9. FINAL SCREENS
          ══════════════════════════════════════════════════════════════ */}
          <section className="pb-14 md:pb-20">
            <Reveal>
              <Label>Final Product</Label>
              <SectionHeading>Desktop &amp; Mobile System</SectionHeading>
              <p className="font-['Blast_Dragon',sans-serif] text-[14px] leading-[2] text-[#8a8f98] max-w-[560px] mb-6">
                High-fidelity screens from the shipped product — representing the full
                breadth of the RMT Holotrack design system across desktop and mobile
                form factors.
              </p>
            </Reveal>

            <div className="flex flex-col gap-8">
              {/* Desktop screens */}
              <Reveal>
                <p className="font-['Blast_Dragon',sans-serif] text-[10px] tracking-[3px] text-[#8a8f98] uppercase mb-3">
                  Desktop Screens
                </p>
                <div className="rounded-2xl overflow-hidden border border-[#1e2028] bg-[#0c0d10]">
                  <Image
                    src="/designs/rmt/desktop-screens.png"
                    alt="RMT Holotrack — Desktop Screens"
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
                <div className="rounded-2xl overflow-hidden border border-[#1e2028] bg-[#0c0d10]">
                  <Image
                    src="/designs/rmt/mobile-screens.png"
                    alt="RMT Holotrack — Mobile Screens"
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
              10. IMPACT
          ══════════════════════════════════════════════════════════════ */}
          <section className="pb-14 md:pb-20">
            <Reveal>
              <Label>Results</Label>
              <SectionHeading>Impact</SectionHeading>
              <p className="font-['Blast_Dragon',sans-serif] text-[14px] leading-[2] text-[#8a8f98] max-w-[560px] mb-6">
                The platform delivered measurable improvements across visibility,
                efficiency, and operational cohesion — replacing fragmented tooling
                with a unified system built around how teams actually work.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="flex flex-col md:flex-row gap-5">
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
          </section>

          {/* ── Next Project CTA ───────────────────────────────────────────── */}
          <Reveal>
            <div className="border-t border-[#1e2028] pt-10 pb-14 md:pb-20">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
                <div>
                  <p className="font-['Blast_Dragon',sans-serif] text-[10px] tracking-[4px] text-[#8a8f98] uppercase mb-3">
                    Next Case Study
                  </p>
                  <h2 className="font-['The_Last_Shuriken',sans-serif] text-[2rem] md:text-[2.8rem] text-[#eaeaea] leading-[1.1] mb-2">
                    PH Aware
                  </h2>
                  <p className="font-['Blast_Dragon',sans-serif] text-[13px] text-[#8a8f98]">
                    Health Tech · Mental Wellness Platform
                  </p>
                </div>
                <Link
                  href="/work/ph-aware"
                  className="group inline-flex items-center gap-3 font-['Blast_Dragon',sans-serif] text-[11px] tracking-[3px] uppercase px-8 py-4 border border-[#e10600] text-[#e10600] rounded-full hover:bg-[#e10600] hover:text-white transition-all duration-300"
                >
                  PH Aware →
                  <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
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
