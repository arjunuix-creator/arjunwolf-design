'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
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

/* ── Problem card ────────────────────────────────────────────────────────── */
function ProblemCard({ title, description, index }: {
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

/* ── Objective card ──────────────────────────────────────────────────────── */
function ObjectiveCard({ title, description, icon }: {
  title: string;
  description: string;
  icon: string;
}) {
  return (
    <div className="border border-[#1e2028] rounded-2xl p-6 bg-[#0c0d10] hover:border-[#02112b]/60 transition-colors duration-300 group">
      <span className="text-[2rem] mb-4 block">{icon}</span>
      <h3 className="font-['The_Last_Shuriken',sans-serif] text-[1.2rem] text-[#eaeaea] mb-2">
        {title}
      </h3>
      <p className="font-['Blast_Dragon',sans-serif] text-[13px] leading-[1.8] text-[#8a8f98]">
        {description}
      </p>
    </div>
  );
}

/* ── Metric card ─────────────────────────────────────────────────────────── */
function MetricCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="border border-[#1e2028] rounded-2xl p-6 bg-[#0c0d10] text-center">
      <p className="font-['The_Last_Shuriken',sans-serif] text-[2.5rem] md:text-[3rem] text-[#e10600] leading-none mb-2">
        {value}
      </p>
      <p className="font-['Blast_Dragon',sans-serif] text-[12px] tracking-[3px] text-[#8a8f98] uppercase">
        {label}
      </p>
    </div>
  );
}

/* ── Workflow step ───────────────────────────────────────────────────────── */
function WorkflowStep({ step, title, description, isLast }: {
  step: string;
  title: string;
  description: string;
  isLast?: boolean;
}) {
  return (
    <div className="flex gap-5">
      <div className="flex flex-col items-center">
        <div className="w-10 h-10 rounded-full border border-[#e10600] flex items-center justify-center shrink-0">
          <span className="font-['Blast_Dragon',sans-serif] text-[11px] text-[#e10600] tracking-[2px]">
            {step}
          </span>
        </div>
        {!isLast && <div className="w-px flex-1 bg-gradient-to-b from-[#e10600]/40 to-transparent mt-2" />}
      </div>
      <div className="pb-10">
        <h4 className="font-['The_Last_Shuriken',sans-serif] text-[1.1rem] text-[#eaeaea] mb-2">
          {title}
        </h4>
        <p className="font-['Blast_Dragon',sans-serif] text-[13px] leading-[1.8] text-[#8a8f98]">
          {description}
        </p>
      </div>
    </div>
  );
}

/* ── Tech badge ──────────────────────────────────────────────────────────── */
function TechBadge({ name, category }: { name: string; category: string }) {
  return (
    <div className="border border-[#1e2028] rounded-xl px-5 py-4 bg-[#0c0d10] hover:border-[#e10600]/30 transition-colors duration-300">
      <p className="font-['Blast_Dragon',sans-serif] text-[10px] tracking-[2px] text-[#e10600] uppercase mb-1">
        {category}
      </p>
      <p className="font-['The_Last_Shuriken',sans-serif] text-[1.1rem] text-[#eaeaea]">
        {name}
      </p>
    </div>
  );
}

/* ── Dashboard metric block ──────────────────────────────────────────────── */
function DashMetric({ label, value, change, positive }: {
  label: string;
  value: string;
  change: string;
  positive: boolean;
}) {
  return (
    <div className="border border-[#1e2028] rounded-xl p-5 bg-[#0d0e12]">
      <p className="font-['Blast_Dragon',sans-serif] text-[11px] tracking-[2px] text-[#8a8f98] uppercase mb-3">
        {label}
      </p>
      <p className="font-['The_Last_Shuriken',sans-serif] text-[1.8rem] text-[#eaeaea] leading-none mb-2">
        {value}
      </p>
      <p className={`font-['Blast_Dragon',sans-serif] text-[12px] ${positive ? 'text-[#2ac19f]' : 'text-[#e10600]'}`}>
        {change}
      </p>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════════════
   PAGE
════════════════════════════════════════════════════════════════════════════ */
export default function FinovaPage() {
  return (
    <SmoothScroll>
      <div className="min-h-screen w-full bg-[#070707] overflow-x-hidden">
        <Navbar />

        {/* ── HERO ────────────────────────────────────────────────────────── */}
        <section className="pt-[120px] pb-12 md:pb-20 px-6 md:px-12 max-w-[1400px] mx-auto">
          <Reveal>
            <Label>Vibe Coding · SaaS App · 2026</Label>
            <h1 className="font-['The_Last_Shuriken',sans-serif] text-[3rem] md:text-[5rem] lg:text-[6.5rem] text-[#eaeaea] leading-[1.0] mb-6 max-w-[900px]">
              Finova — AI Assisted Fintech Dashboard
            </h1>
            <p className="font-['Blast_Dragon',sans-serif] text-[15px] md:text-[17px] leading-[1.9] text-[#8a8f98] max-w-[680px] mb-10">
              Designing and deploying a modern financial dashboard — from Figma prototype to live production app in a single day using Claude Code, Next.js, and Supabase.
            </p>
          </Reveal>

          {/* Meta */}
          <Reveal delay={0.1}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
              {[
                { label: 'Role',     value: 'Lead UX Designer' },
                { label: 'Tools',    value: 'Figma · Claude Code · Next.js' },
                { label: 'Timeline', value: '1 Day Experiment' },
                { label: 'Year',     value: '2026' },
              ].map(item => (
                <div key={item.label} className="border-l-2 border-[#e10600] pl-4">
                  <p className="font-['Blast_Dragon',sans-serif] text-[10px] tracking-[3px] text-[#e10600] uppercase mb-1">
                    {item.label}
                  </p>
                  <p className="font-['Blast_Dragon',sans-serif] text-[13px] text-[#eaeaea] leading-[1.6]">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Dashboard mockup */}
          <Reveal delay={0.15}>
            <div className="w-full rounded-2xl border border-[#1e2028] bg-[#0c0d10] p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-3 h-3 rounded-full bg-[#e10600]" />
                <div className="w-3 h-3 rounded-full bg-[#D4AF37]" />
                <div className="w-3 h-3 rounded-full bg-[#2ac19f]" />
                <span className="font-['Blast_Dragon',sans-serif] text-[11px] text-[#8a8f98] tracking-[2px] ml-2">
                  finova.app · dashboard
                </span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <DashMetric label="Balance"  value="$24,563" change="↑ +12.4% this month" positive={true} />
                <DashMetric label="Income"   value="$8,350"  change="↑ +8.2% vs last month" positive={true} />
                <DashMetric label="Expenses" value="$3,820"  change="↓ -3.1% vs last month" positive={false} />
                <DashMetric label="Savings"  value="$4,530"  change="↑ +21.6% this month" positive={true} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2 border border-[#1e2028] rounded-xl p-5 bg-[#0d0e12]">
                  <p className="font-['Blast_Dragon',sans-serif] text-[11px] tracking-[2px] text-[#8a8f98] uppercase mb-4">
                    Income vs Expenses
                  </p>
                  <div className="flex items-end gap-2 h-[80px]">
                    {[65, 45, 80, 55, 90, 40, 75, 60, 85, 50, 95, 70].map((h, i) => (
                      <div key={i} className="flex-1 flex flex-col gap-1 items-center">
                        <div className="w-full rounded-sm bg-[#2ac19f]/60" style={{ height: `${h * 0.5}px` }} />
                        <div className="w-full rounded-sm bg-[#e10600]/60" style={{ height: `${(100 - h) * 0.3}px` }} />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="border border-[#1e2028] rounded-xl p-5 bg-[#0d0e12]">
                  <p className="font-['Blast_Dragon',sans-serif] text-[11px] tracking-[2px] text-[#8a8f98] uppercase mb-4">
                    Categories
                  </p>
                  {[
                    { name: 'Housing',       pct: 35, color: '#e10600' },
                    { name: 'Food',          pct: 22, color: '#D4AF37' },
                    { name: 'Transport',     pct: 18, color: '#2ac19f' },
                    { name: 'Entertainment', pct: 15, color: '#4d9eff' },
                    { name: 'Other',         pct: 10, color: '#8a8f98' },
                  ].map(cat => (
                    <div key={cat.name} className="flex items-center gap-3 mb-2">
                      <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: cat.color }} />
                      <p className="font-['Blast_Dragon',sans-serif] text-[12px] text-[#8a8f98] flex-1">{cat.name}</p>
                      <p className="font-['Blast_Dragon',sans-serif] text-[12px] text-[#eaeaea]">{cat.pct}%</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        <Divider />

        {/* ── OVERVIEW ────────────────────────────────────────────────────── */}
        <section className="py-12 md:py-20 px-6 md:px-12 max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <Reveal>
              <Label>Overview</Label>
              <SectionHeading>A Complete Financial Dashboard Experience</SectionHeading>
              <p className="font-['Blast_Dragon',sans-serif] text-[14px] leading-[1.9] text-[#8a8f98] mb-6">
                Finova started as a personal experiment: can a designer ship a fully functional, production-ready SaaS app in a single day? The answer was yes — combining Figma for design, Claude Code for development, and modern deployment infrastructure.
              </p>
              <p className="font-['Blast_Dragon',sans-serif] text-[14px] leading-[1.9] text-[#8a8f98]">
                The result is a live financial dashboard with real-time expense tracking, analytics, and a clean, modern interface — built entirely by a designer with no traditional hand-off to a developer.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="grid grid-cols-1 gap-4">
                {[
                  { label: 'Role',     value: 'Lead UX Designer' },
                  { label: 'Tools',    value: 'Figma, Claude Code, Next.js, Supabase, Vercel' },
                  { label: 'Timeline', value: '1 Day Experiment' },
                  { label: 'Type',     value: 'Vibe Coding · SaaS App' },
                ].map(item => (
                  <div key={item.label} className="flex gap-4 border-b border-[#1e2028] pb-4">
                    <p className="font-['Blast_Dragon',sans-serif] text-[11px] tracking-[3px] text-[#e10600] uppercase w-24 shrink-0 pt-0.5">
                      {item.label}
                    </p>
                    <p className="font-['Blast_Dragon',sans-serif] text-[13px] leading-[1.7] text-[#8a8f98]">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <Divider />

        {/* ── PROBLEM ─────────────────────────────────────────────────────── */}
        <section className="py-12 md:py-20 px-6 md:px-12 max-w-[1400px] mx-auto">
          <Reveal>
            <Label>The Problem</Label>
            <SectionHeading>Designers Stop at Prototypes</SectionHeading>
            <p className="font-['Blast_Dragon',sans-serif] text-[14px] leading-[1.9] text-[#8a8f98] max-w-[680px] mb-12">
              Traditional design workflows end at the handoff. Designers create beautiful prototypes that live inside Figma forever — never reaching real users, never validating interaction patterns at scale.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'Static Design Prototypes',
                description: 'Figma prototypes simulate interactions but can\'t replicate real data, actual performance, or live API responses. The gap between prototype and product is massive.',
              },
              {
                title: 'Limited Interaction Validation',
                description: 'Without a real build, it\'s impossible to test loading states, error handling, edge cases, or how the design holds up under actual usage conditions.',
              },
              {
                title: 'Slow Design-to-Dev Workflows',
                description: 'Traditional handoffs involve extensive documentation, revision cycles, and developer interpretation — adding weeks between design completion and users seeing the product.',
              },
            ].map((card, i) => (
              <Reveal key={card.title} delay={i * 0.08}>
                <ProblemCard title={card.title} description={card.description} index={i} />
              </Reveal>
            ))}
          </div>
        </section>

        <Divider />

        {/* ── OBJECTIVE ───────────────────────────────────────────────────── */}
        <section className="py-12 md:py-20 px-6 md:px-12 max-w-[1400px] mx-auto">
          <Reveal>
            <Label>Objective</Label>
            <SectionHeading>Build a Live Dashboard in One Day</SectionHeading>
            <p className="font-['Blast_Dragon',sans-serif] text-[14px] leading-[1.9] text-[#8a8f98] max-w-[680px] mb-12">
              The goal was clear: design a complete financial dashboard and ship it to production within 24 hours — covering all core features a real fintech app would need.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'Expense Tracking',
                description: 'Real-time transaction logging with category tagging and budget monitoring.',
                icon: '💳',
              },
              {
                title: 'Financial Analytics',
                description: 'Income vs expenses charts, monthly trends, and spending pattern visualisation.',
                icon: '📊',
              },
              {
                title: 'Category Insights',
                description: 'Breakdown of spend across housing, food, transport, and custom categories.',
                icon: '🎯',
              },
              {
                title: 'Transaction History',
                description: 'Filterable, searchable transaction table with live data from Supabase.',
                icon: '📋',
              },
            ].map((obj, i) => (
              <Reveal key={obj.title} delay={i * 0.08}>
                <ObjectiveCard title={obj.title} description={obj.description} icon={obj.icon} />
              </Reveal>
            ))}
          </div>
        </section>

        <Divider />

        {/* ── WORKFLOW ────────────────────────────────────────────────────── */}
        <section className="py-12 md:py-20 px-6 md:px-12 max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <Reveal>
              <Label>Workflow</Label>
              <SectionHeading>From Idea to Production</SectionHeading>
              <p className="font-['Blast_Dragon',sans-serif] text-[14px] leading-[1.9] text-[#8a8f98]">
                A six-step pipeline — from initial concept to deployed product — executed in a single continuous session. Each step feeds directly into the next with minimal friction.
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="pt-2">
                {[
                  {
                    step: '01',
                    title: 'Idea',
                    description: 'Define the product scope, user needs, and core feature set before touching any design tool.',
                  },
                  {
                    step: '02',
                    title: 'Claude Prompt',
                    description: 'Structure a precise prompt describing the architecture, data model, and component requirements.',
                  },
                  {
                    step: '03',
                    title: 'Figma Cleanup',
                    description: 'Design the UI in Figma — establishing visual identity, component library, and layout system.',
                  },
                  {
                    step: '04',
                    title: 'Next.js Build',
                    description: 'Claude Code generates the full Next.js application from the Figma design and structured prompt.',
                  },
                  {
                    step: '05',
                    title: 'Supabase',
                    description: 'Connect live data — transactions, categories, and user data — via Supabase PostgreSQL backend.',
                  },
                  {
                    step: '06',
                    title: 'Vercel Deploy',
                    description: 'Push to production with zero-config deployment on Vercel\'s global edge network.',
                    isLast: true,
                  },
                ].map(step => (
                  <WorkflowStep
                    key={step.step}
                    step={step.step}
                    title={step.title}
                    description={step.description}
                    isLast={step.isLast}
                  />
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <Divider />

        {/* ── INTERFACE ───────────────────────────────────────────────────── */}
        <section className="py-12 md:py-20 px-6 md:px-12 max-w-[1400px] mx-auto">
          <Reveal>
            <Label>Interface</Label>
            <SectionHeading>Dashboard Screens</SectionHeading>
            <p className="font-['Blast_Dragon',sans-serif] text-[14px] leading-[1.9] text-[#8a8f98] max-w-[680px] mb-12">
              Four core screens designed for clarity and speed — giving users an immediate sense of their financial health without cognitive overload.
            </p>
          </Reveal>

          {/* Transaction table mockup */}
          <Reveal delay={0.1}>
            <div className="w-full rounded-2xl border border-[#1e2028] bg-[#0c0d10] p-6 md:p-8 mb-8">
              <p className="font-['Blast_Dragon',sans-serif] text-[11px] tracking-[3px] text-[#e10600] uppercase mb-6">
                Transaction History
              </p>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[500px]">
                  <thead>
                    <tr className="border-b border-[#1e2028]">
                      {['Date', 'Description', 'Category', 'Amount', 'Status'].map(h => (
                        <th key={h} className="pb-3 text-left font-['Blast_Dragon',sans-serif] text-[10px] tracking-[2px] text-[#8a8f98] uppercase">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { date: 'Mar 15', desc: 'Netflix Subscription',   cat: 'Entertainment', amount: '-$15.99',   status: 'Completed', pos: false },
                      { date: 'Mar 14', desc: 'Salary Deposit',          cat: 'Income',        amount: '+$8,350.00', status: 'Completed', pos: true },
                      { date: 'Mar 13', desc: 'Whole Foods Market',      cat: 'Food',          amount: '-$124.50',  status: 'Completed', pos: false },
                      { date: 'Mar 12', desc: 'Uber Ride',               cat: 'Transport',     amount: '-$23.40',   status: 'Completed', pos: false },
                      { date: 'Mar 11', desc: 'Freelance Payment',       cat: 'Income',        amount: '+$1,200.00', status: 'Pending',   pos: true },
                    ].map((row, i) => (
                      <tr key={i} className="border-b border-[#1e2028]/50 hover:bg-[#0d0e12] transition-colors">
                        <td className="py-3 font-['Blast_Dragon',sans-serif] text-[12px] text-[#8a8f98]">{row.date}</td>
                        <td className="py-3 font-['Blast_Dragon',sans-serif] text-[12px] text-[#eaeaea]">{row.desc}</td>
                        <td className="py-3">
                          <span className="font-['Blast_Dragon',sans-serif] text-[10px] tracking-[1px] text-[#8a8f98] border border-[#1e2028] rounded px-2 py-1">
                            {row.cat}
                          </span>
                        </td>
                        <td className={`py-3 font-['Blast_Dragon',sans-serif] text-[13px] ${row.pos ? 'text-[#2ac19f]' : 'text-[#eaeaea]'}`}>
                          {row.amount}
                        </td>
                        <td className="py-3">
                          <span className={`font-['Blast_Dragon',sans-serif] text-[10px] tracking-[1px] rounded px-2 py-1 ${
                            row.status === 'Completed'
                              ? 'bg-[#2ac19f]/10 text-[#2ac19f]'
                              : 'bg-[#D4AF37]/10 text-[#D4AF37]'
                          }`}>
                            {row.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Reveal>
        </section>

        <Divider />

        {/* ── MICRO INTERACTIONS ──────────────────────────────────────────── */}
        <section className="py-12 md:py-20 px-6 md:px-12 max-w-[1400px] mx-auto">
          <Reveal>
            <Label>Micro Interactions</Label>
            <SectionHeading>Details That Make It Feel Alive</SectionHeading>
            <p className="font-['Blast_Dragon',sans-serif] text-[14px] leading-[1.9] text-[#8a8f98] max-w-[680px] mb-12">
              Every interaction was considered — from the moment the page loads to how users explore their data. Subtle animations and feedback states elevate the experience from functional to delightful.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'Animated Metric Counters',
                description: 'Numbers count up from zero on page load — giving users a satisfying sense of their balance being "calculated" in real time.',
              },
              {
                title: 'Chart Hover Tooltips',
                description: 'Hovering over chart bars reveals precise values with smooth fade-in tooltips, encouraging deeper exploration of the data.',
              },
              {
                title: 'Skeleton Loading States',
                description: 'Content placeholders animate while data loads from Supabase — no blank screens, no layout shifts.',
              },
              {
                title: 'Card Hover Animations',
                description: 'Metric cards respond to hover with subtle scale and glow effects, reinforcing interactivity without distracting from content.',
              },
            ].map((item, i) => (
              <Reveal key={item.title} delay={i * 0.08}>
                <div className="border border-[#1e2028] rounded-2xl p-6 bg-[#0c0d10] hover:border-[#e10600]/30 transition-colors duration-300">
                  <div className="w-8 h-8 rounded-lg bg-[#e10600]/10 border border-[#e10600]/20 flex items-center justify-center mb-4">
                    <div className="w-2 h-2 rounded-full bg-[#e10600]" />
                  </div>
                  <h3 className="font-['The_Last_Shuriken',sans-serif] text-[1.1rem] text-[#eaeaea] mb-3">
                    {item.title}
                  </h3>
                  <p className="font-['Blast_Dragon',sans-serif] text-[13px] leading-[1.8] text-[#8a8f98]">
                    {item.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <Divider />

        {/* ── TECH STACK ──────────────────────────────────────────────────── */}
        <section className="py-12 md:py-20 px-6 md:px-12 max-w-[1400px] mx-auto">
          <Reveal>
            <Label>Tech Stack</Label>
            <SectionHeading>Built With the Right Tools</SectionHeading>
            <p className="font-['Blast_Dragon',sans-serif] text-[14px] leading-[1.9] text-[#8a8f98] max-w-[680px] mb-12">
              Every tool in the stack was chosen for speed, developer experience, and production readiness — enabling a solo designer to ship a full-stack app in hours.
            </p>
          </Reveal>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              { name: 'Next.js',      category: 'Framework'   },
              { name: 'Supabase',     category: 'Database'    },
              { name: 'Tailwind CSS', category: 'Styling'     },
              { name: 'Recharts',     category: 'Charts'      },
              { name: 'Framer Motion', category: 'Animation'  },
              { name: 'Vercel',       category: 'Deployment'  },
              { name: 'Claude Code',  category: 'AI Dev Tool' },
              { name: 'Figma',        category: 'Design'      },
            ].map((tech, i) => (
              <Reveal key={tech.name} delay={i * 0.05}>
                <TechBadge name={tech.name} category={tech.category} />
              </Reveal>
            ))}
          </div>
        </section>

        <Divider />

        {/* ── DEPLOYMENT ──────────────────────────────────────────────────── */}
        <section className="py-12 md:py-20 px-6 md:px-12 max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <Reveal>
              <Label>Deployment</Label>
              <SectionHeading>Live on Global Edge</SectionHeading>
              <p className="font-['Blast_Dragon',sans-serif] text-[14px] leading-[1.9] text-[#8a8f98]">
                Deployed to Vercel's global edge network in 42 seconds. The entire bundle is 287KB — optimised for performance with a Lighthouse score of 96.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="grid grid-cols-2 gap-4">
                <MetricCard value="42s"   label="Build Time"      />
                <MetricCard value="287KB" label="Bundle Size"     />
                <MetricCard value="96"    label="Lighthouse Score" />
                <MetricCard value="Edge"  label="Global CDN"      />
              </div>
            </Reveal>
          </div>
        </section>

        <Divider />

        {/* ── OUTCOME ─────────────────────────────────────────────────────── */}
        <section className="py-12 md:py-20 px-6 md:px-12 max-w-[1400px] mx-auto">
          <Reveal>
            <Label>Outcome</Label>
            <SectionHeading>Concept to Production in One Day</SectionHeading>
            <p className="font-['Blast_Dragon',sans-serif] text-[14px] leading-[1.9] text-[#8a8f98] max-w-[680px] mb-12">
              Finova proves that the boundary between designer and developer is collapsing. With the right AI tools, a designer can own the full product lifecycle.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              { value: '1 Day',   label: 'Concept to Production' },
              { value: '100%',    label: 'Designer-Led Build'    },
              { value: 'Live',    label: 'Real Product'          },
            ].map((m, i) => (
              <Reveal key={m.label} delay={i * 0.08}>
                <MetricCard value={m.value} label={m.label} />
              </Reveal>
            ))}
          </div>

          {/* Live demo links */}
          <Reveal delay={0.2}>
            <div className="flex flex-col sm:flex-row gap-4 mb-5">
              <a
                href="https://finova-demo.vercel.app/login"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-xl
                  font-['Blast_Dragon',sans-serif] text-[13px] tracking-[2px] uppercase
                  bg-[#e10600] text-white hover:bg-[#b30000] transition-colors duration-300"
              >
                <span>Live Application</span>
                <span>→</span>
              </a>
              <a
                href="https://github.com/arjunuix-creator/claude-figma-flow"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-xl
                  font-['Blast_Dragon',sans-serif] text-[13px] tracking-[2px] uppercase
                  border border-[#1e2028] text-[#eaeaea] hover:border-[#e10600]/40 transition-colors duration-300"
              >
                <span>GitHub Repository</span>
                <span>↗</span>
              </a>
            </div>
            <div className="flex items-center gap-6 border border-[#1e2028] rounded-xl px-6 py-4 bg-[#0c0d10] w-fit">
              <p className="font-['Blast_Dragon',sans-serif] text-[10px] tracking-[3px] text-[#e10600] uppercase">
                Demo Login
              </p>
              <div className="w-px h-4 bg-[#1e2028]" />
              <p className="font-['Blast_Dragon',sans-serif] text-[12px] text-[#8a8f98]">
                <span className="text-[#eaeaea]">Username:</span> test@test.com
              </p>
              <div className="w-px h-4 bg-[#1e2028]" />
              <p className="font-['Blast_Dragon',sans-serif] text-[12px] text-[#8a8f98]">
                <span className="text-[#eaeaea]">Password:</span> 12345678
              </p>
            </div>
          </Reveal>
        </section>

        <Divider />

        {/* ── NEXT PROJECT CTA ────────────────────────────────────────────── */}
        <section className="py-20 md:py-32 px-6 md:px-12 max-w-[1400px] mx-auto">
          <Reveal>
            <div className="text-center">
              <Label>Next Project</Label>
              <h2 className="font-['The_Last_Shuriken',sans-serif] text-[2.5rem] md:text-[4rem] text-[#eaeaea] leading-[1.1] mb-6">
                See More Work
              </h2>
              <p className="font-['Blast_Dragon',sans-serif] text-[14px] leading-[1.9] text-[#8a8f98] max-w-[480px] mx-auto mb-10">
                Explore the full portfolio — case studies spanning FinTech, Logistics, and MedTech.
              </p>
              <Link
                href="/#works"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-xl
                  font-['Blast_Dragon',sans-serif] text-[13px] tracking-[2px] uppercase
                  border border-[#e10600] text-[#eaeaea] hover:bg-[#e10600] transition-colors duration-300"
              >
                View All Work
                <span>→</span>
              </Link>
            </div>
          </Reveal>
        </section>

      </div>
    </SmoothScroll>
  );
}
