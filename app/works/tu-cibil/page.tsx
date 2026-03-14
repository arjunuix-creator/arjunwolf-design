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

/* ── Problem card ────────────────────────────────────────────────────────── */
function ProblemCard({ icon, title, body }: { icon: string; title: string; body: string }) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-8% 0px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, ease: EASE }}
      className="flex flex-col gap-4 bg-[#0e1117] border border-white/[0.06] rounded-2xl p-8
        hover:border-[#e10600]/20 transition-colors duration-300"
    >
      <span className="text-3xl">{icon}</span>
      <h3 className="font-['The_Last_Shuriken',sans-serif] text-white text-[20px] leading-tight">
        {title}
      </h3>
      <p className="font-['Blast_Dragon',sans-serif] text-[13px] text-[#8a8f98] leading-[26px] tracking-[0.3px]">
        {body}
      </p>
    </motion.div>
  );
}

/* ── Design decision card ────────────────────────────────────────────────── */
function DecisionCard({ number, title, body, image, imageAlt }: {
  number: string;
  title: string;
  body: string;
  image: string;
  imageAlt: string;
}) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-8% 0px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.85, ease: EASE }}
      className="flex flex-col gap-6"
    >
      {/* Image */}
      <div className="w-full aspect-[16/9] relative overflow-hidden rounded-2xl bg-[#0e1117] border border-white/[0.06]">
        <Image
          src={image}
          alt={imageAlt}
          fill
          className="object-cover object-top"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      {/* Text */}
      <div className="flex gap-5 items-start">
        <span className="font-['Blast_Dragon',sans-serif] text-[11px] text-[#e10600] tracking-[3px] mt-1 shrink-0">
          {number}
        </span>
        <div className="flex flex-col gap-2">
          <h3 className="font-['The_Last_Shuriken',sans-serif] text-white text-[22px] leading-tight">
            {title}
          </h3>
          <p className="font-['Blast_Dragon',sans-serif] text-[13px] text-[#8a8f98] leading-[26px] tracking-[0.3px]">
            {body}
          </p>
        </div>
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

/* ══════════════════════════════════════════════════════════════════════════ */
export default function TuCibilCaseStudy() {
  const heroRef = useRef<HTMLElement>(null);

  return (
    <SmoothScroll>
      <div className="min-h-screen w-full bg-[#070707] overflow-x-hidden">
        <Navbar />

        {/* ── HERO ─────────────────────────────────────────────────────────── */}
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
                text-[44px] sm:text-[60px] md:text-[76px] lg:text-[88px]
                leading-[1.0] tracking-tight mb-8 max-w-[900px]"
            >
              Modernizing Credit{' '}
              <span style={{ color: '#D4AF37' }}>Intelligence</span>{' '}
              Platform
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.42, ease: EASE }}
              className="font-['Blast_Dragon',sans-serif] text-[15px] sm:text-[17px] text-[#8a8f98]
                leading-[30px] tracking-[0.3px] max-w-[580px] mb-12"
            >
              Led end-to-end UX strategy for TransUnion CIBIL — a national credit bureau platform
              used by banking professionals to evaluate creditworthiness and make loan decisions.
            </motion.p>

            {/* Meta */}
            <motion.div
              variants={stagger}
              initial="hidden"
              animate="visible"
              className="flex flex-wrap gap-x-10 gap-y-5 pt-8 border-t border-white/[0.06]"
            >
              {[
                { label: 'Role',     value: 'Lead UI/UX Designer'     },
                { label: 'Duration', value: '36 Months'               },
                { label: 'Platform', value: 'Desktop, Tablet, Mobile' },
                { label: 'Team',     value: 'Solo Designer'           },
                { label: 'Year',     value: '2025'                    },
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
            </motion.div>
          </div>

          {/* Hero image */}
          <motion.div
            initial={{ opacity: 0, y: 48 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.55, ease: EASE }}
            className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 mt-20"
          >
            <div className="w-full aspect-[16/7] relative overflow-hidden rounded-2xl bg-[#0e1117] border border-white/[0.06]"
              style={{ boxShadow: '0 40px 100px rgba(0,0,0,0.7)' }}
            >
              <Image
                src="/designs/tu-cibil/hero-image.png"
                alt="Tu CIBIL — Credit Intelligence Platform"
                fill
                priority
                className="object-cover object-center"
                sizes="100vw"
              />
              {/* Bottom fade */}
              <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#070707] to-transparent pointer-events-none" />
            </div>
          </motion.div>
        </section>

        {/* ── THE PROBLEM ──────────────────────────────────────────────────── */}
        <section className="relative w-full py-24">
          <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12">

            <Reveal>
              <Label>The Problem</Label>
              <SectionHeading>
                The system worked —{' '}
                <span style={{ color: '#e10600' }}>but it did not empower users.</span>
              </SectionHeading>
              <p className="font-['Blast_Dragon',sans-serif] text-[14px] sm:text-[16px] text-[#8a8f98]
                leading-[30px] tracking-[0.3px] max-w-[680px] mb-16">
                Bank managers and financial analysts were spending excessive time navigating
                complex, legacy interfaces — slowing down critical credit decisions and creating
                avoidable friction at every touchpoint.
              </p>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <ProblemCard
                icon="📋"
                title="Static Long Forms"
                body="Excessive fields with high cognitive load during data entry. Users had no sense of progress, causing abandonment and errors mid-form."
              />
              <ProblemCard
                icon="📊"
                title="Unreadable Score Reports"
                body="Credit score dashboards displayed dense numerical data with no visual hierarchy — making it hard to spot risk signals quickly."
              />
              <ProblemCard
                icon="🗂️"
                title="Flat Navigation Hierarchy"
                body="No logical grouping of records, actions, or filters. Users had to memorize pathways instead of discovering them intuitively."
              />
            </div>
          </div>
        </section>

        <Divider />

        {/* ── BEFORE VS AFTER ──────────────────────────────────────────────── */}
        <section className="relative w-full py-24">
          <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12">

            <Reveal>
              <Label>Legacy vs Modern</Label>
              <SectionHeading>The Transformation</SectionHeading>
              <p className="font-['Blast_Dragon',sans-serif] text-[14px] text-[#8a8f98]
                leading-[28px] tracking-[0.3px] max-w-[560px] mb-14">
                Side-by-side comparison of the old experience versus the redesigned system —
                from dense, form-heavy interfaces to clean, decision-optimised workflows.
              </p>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { src: '/designs/tu-cibil/before-image.png', label: 'Before', tag: 'Legacy Interface', color: 'rgba(225,6,0,0.15)', border: 'rgba(225,6,0,0.2)' },
                { src: '/designs/tu-cibil/after-image.png',  label: 'After',  tag: 'Redesigned System', color: 'rgba(0,212,100,0.08)', border: 'rgba(0,212,100,0.2)' },
              ].map(item => (
                <Reveal key={item.label}>
                  <div className="flex flex-col gap-3">
                    <div className="relative overflow-hidden rounded-2xl border"
                      style={{ borderColor: item.border, background: item.color }}
                    >
                      <div className="absolute top-4 left-4 z-10">
                        <span className="font-['Blast_Dragon',sans-serif] text-[10px] tracking-[2px] uppercase px-3 py-[5px] rounded-full"
                          style={{ background: item.color, border: `1px solid ${item.border}`, color: '#eaeaea' }}>
                          {item.tag}
                        </span>
                      </div>
                      <div className="aspect-[4/3] relative">
                        <Image
                          src={item.src}
                          alt={`${item.label} — ${item.tag}`}
                          fill
                          className="object-cover object-top"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      </div>
                    </div>
                    <p className="font-['Blast_Dragon',sans-serif] text-[11px] tracking-[2px] uppercase text-[#8a8f98] text-center">
                      {item.label}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <Divider />

        {/* ── KEY DESIGN DECISIONS ─────────────────────────────────────────── */}
        <section className="relative w-full py-24">
          <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12">

            <Reveal>
              <Label>Key Design Decisions</Label>
              <SectionHeading>Solving Problems by Design</SectionHeading>
              <p className="font-['Blast_Dragon',sans-serif] text-[14px] text-[#8a8f98]
                leading-[28px] tracking-[0.3px] max-w-[580px] mb-16">
                Each design decision was rooted in observed user behaviour and validated
                through guerrilla testing with bank managers and financial analysts.
              </p>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <DecisionCard
                number="01"
                title="Progressive Stepper Forms"
                body="Replaced overwhelming single-page forms with a stepped flow. Each step reveals only relevant fields, reducing cognitive load and input errors by 40%."
                image="/designs/tu-cibil/progressive-stepper-image.png"
                imageAlt="Progressive stepper form design"
              />
              <DecisionCard
                number="02"
                title="Dashboard Score Reports"
                body="Transformed raw credit data into scannable score cards with colour-coded risk tiers. Decision time reduced significantly for loan managers."
                image="/designs/tu-cibil/dashboard-image.png"
                imageAlt="Dashboard score report design"
              />
              <DecisionCard
                number="03"
                title="Core Hierarchy Optimisation"
                body="Restructured information architecture around task frequency and mental models. Primary actions surfaced to top, secondary actions contextualised."
                image="/designs/tu-cibil/data-hierarchy-imagepng.png"
                imageAlt="Data hierarchy design"
              />
            </div>
          </div>
        </section>

        <Divider />

        {/* ── EVERY SCREEN, EVERY DEVICE ───────────────────────────────────── */}
        <section className="relative w-full py-24 overflow-hidden">
          <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12">

            <Reveal className="text-center mb-16">
              <Label>Responsive Design</Label>
              <SectionHeading>Every Screen, Every Device</SectionHeading>
              <p className="font-['Blast_Dragon',sans-serif] text-[14px] text-[#8a8f98]
                leading-[28px] tracking-[0.3px] max-w-[480px] mx-auto">
                Designed desktop-first (25–30 screens) then expanded to 150+ screens
                covering tablet and mobile workflows for field agents.
              </p>
            </Reveal>

            {/* Desktop */}
            <Reveal className="mb-8">
              <div className="w-full relative overflow-hidden rounded-2xl bg-[#0e1117] border border-white/[0.06]">
                <div className="aspect-[21/9] relative">
                  <Image
                    src="/designs/tu-cibil/desktop-images.png"
                    alt="Tu CIBIL desktop screens"
                    fill
                    className="object-cover object-top"
                    sizes="100vw"
                  />
                </div>
              </div>
            </Reveal>

            {/* Mobile + Responsive side by side */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Reveal>
                <div className="w-full relative overflow-hidden rounded-2xl bg-[#0e1117] border border-white/[0.06]">
                  <div className="aspect-[4/3] relative">
                    <Image
                      src="/designs/tu-cibil/mobile-images.png"
                      alt="Tu CIBIL mobile screens"
                      fill
                      className="object-cover object-top"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                </div>
                <p className="font-['Blast_Dragon',sans-serif] text-[11px] tracking-[2px] uppercase text-[#8a8f98] mt-3 text-center">
                  Mobile
                </p>
              </Reveal>
              <Reveal delay={0.12}>
                <div className="w-full relative overflow-hidden rounded-2xl bg-[#0e1117] border border-white/[0.06]">
                  <div className="aspect-[4/3] relative">
                    <Image
                      src="/designs/tu-cibil/responsive-image.png"
                      alt="Tu CIBIL responsive layout"
                      fill
                      className="object-cover object-top"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                </div>
                <p className="font-['Blast_Dragon',sans-serif] text-[11px] tracking-[2px] uppercase text-[#8a8f98] mt-3 text-center">
                  Responsive Layout
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        <Divider />

        {/* ── WIREFRAMES ───────────────────────────────────────────────────── */}
        <section className="relative w-full py-24">
          <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12">

            <Reveal>
              <Label>Process</Label>
              <SectionHeading>Wireframes & Thinking</SectionHeading>
              <p className="font-['Blast_Dragon',sans-serif] text-[14px] text-[#8a8f98]
                leading-[28px] tracking-[0.3px] max-w-[560px] mb-14">
                Low-fidelity wireframes were used to validate structure and flow
                before any visual design decisions were made.
              </p>
            </Reveal>

            <Reveal>
              <div className="w-full relative overflow-hidden rounded-2xl bg-[#0e1117] border border-white/[0.06]">
                <div className="aspect-[16/7] relative">
                  <Image
                    src="/designs/tu-cibil/wireframe-image.png"
                    alt="Tu CIBIL wireframes"
                    fill
                    className="object-cover object-top"
                    sizes="100vw"
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <Divider />

        {/* ── IMPACT ───────────────────────────────────────────────────────── */}
        <section className="relative w-full py-24 overflow-hidden">

          {/* Ambient glow */}
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(212,175,55,0.05) 0%, transparent 70%)',
            }}
          />

          <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 text-center">

            <Reveal>
              <Label>Memorable Impact</Label>
              <SectionHeading>Results That Moved the Needle</SectionHeading>
              <p className="font-['Blast_Dragon',sans-serif] text-[14px] text-[#8a8f98]
                leading-[28px] tracking-[0.3px] max-w-[480px] mx-auto mb-20">
                Validated through usability testing and post-launch analytics across
                the banking partner network.
              </p>
            </Reveal>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 max-w-[900px] mx-auto">
              <ImpactStat value="40%"  label="Reduction in form errors after stepper redesign"       delay={0}    />
              <ImpactStat value="150+" label="Screens designed across desktop, tablet and mobile"     delay={0.12} />
              <ImpactStat value="40%"  label="Faster loan decision-making reported by bank managers" delay={0.24} />
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
            © 2026 Arjun CR — Tu CIBIL Case Study
          </p>
        </div>

      </div>
    </SmoothScroll>
  );
}
