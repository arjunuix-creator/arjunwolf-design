import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import DesignPhilosophy from './components/DesignPhilosophy';
import WorksSection from './components/WorksSection';
import Journey from './components/Journey';
import HowIWork from './components/HowIWork';
import Skills from './components/Skills';
import Japanese from './components/Japanese';
import DesignThoughts from './components/DesignThoughts';
import Principles from './components/Principles';
import Testimonials from './components/Testimonials';
import Clients from './components/Clients';
import Impact from './components/Impact';
import Footer from './components/Footer';
import SmoothScroll from './components/SmoothScroll';
import SectionDivider from './components/SectionDivider';
import ScrollIndicator from './components/ScrollIndicator';
import SectionReveal from './components/SectionReveal';
import ParallaxGlow from './components/ParallaxGlow';

const studies = [
  {
    id: 1,
    title: 'Tu CIBIL',
    category: 'FinTech Case Study',
    categoryColor: '#002563',
    imageBg: '#002563',
    imageSrc: '/designs/tu-cibil.png',
    imageAlt: 'Tu CIBIL preview',
    imagePosition: 'left' as const,
    description: 'I led the end-to-end UX strategy and execution for a high-security national credit bureau platform used by banking professionals to evaluate creditworthiness and make loan decisions. The challenge was to modernize a legacy, compliance-heavy system without compromising regulatory integrity.',
    users: 'Bank Managers, Financial Analysts, Loan Managers',
    platform: 'Desktop-first (25–30 screens), expanded to 150+ screens including mobile and tablet',
    meta: { role: 'Lead UI/UX Designer', duration: '36 Months', team: 'Solo Designer', year: '2025' },
  },
  {
    id: 2,
    title: 'RMT Holotrack',
    category: 'Logistics Case Study',
    categoryColor: '#2ac19f',
    imageBg: '#2ac19f',
    imageSrc: '/designs/rmt-holotrack.png',
    imageAlt: 'RMT Holotrack preview',
    imagePosition: 'right' as const,
    description: 'Transformed manual, fragmented warehouse workflows into a real-time operational platform — HoloTrak gives logistics teams centralized visibility, asset tracking, and IoT-powered remote monitoring.',
    users: 'Warehouse & Fleet Ops',
    platform: 'Desktop & Tablet',
    meta: { role: 'Lead UI/UX Designer', duration: '12 Months', team: 'Solo Designer', year: '2022' },
  },
  {
    id: 3,
    title: 'PH-Aware',
    category: 'Medi-Tech Case Study',
    categoryColor: '#fe626c',
    imageBg: '#fe626c',
    imageSrc: '/designs/ph-aware.png',
    imageAlt: 'PH-Aware preview',
    imagePosition: 'left' as const,
    description: 'I led the end-to-end UX strategy and execution for a high-security national credit bureau platform used by banking professionals to evaluate creditworthiness and make loan decisions. The challenge was to modernize a legacy, compliance-heavy system without compromising regulatory integrity.',
    users: 'Bank Managers, Financial Analysts, Loan Managers',
    platform: 'Desktop-first (25–30 screens), expanded to 150+ screens including mobile and tablet',
    meta: { role: 'Lead UI/UX Designer', duration: '36 Months', team: 'Solo Designer', year: '2025' },
  },
  {
    id: 4,
    title: 'Finova Expense Tracker',
    category: 'Vibe Coding SaaS App',
    categoryColor: '#02112b',
    imageBg: '#02112b',
    imageSrc: '/designs/finov-ai.png',
    imageAlt: 'Finova Expense Tracker preview',
    imagePosition: 'right' as const,
    description: 'Transformed manual, fragmented warehouse workflows into a real-time operational platform — HoloTrak gives logistics teams centralized visibility, asset tracking, and IoT-powered remote monitoring.',
    users: 'Warehouse & Fleet Ops',
    platform: 'Desktop & Tablet',
    meta: { role: 'Lead UI/UX Designer', duration: '6 hours', team: 'Solo Designer', year: '2026' },
  },
];

export default function Home() {
  return (
    <SmoothScroll>
      <div className="min-h-screen w-full bg-[#070707] overflow-x-hidden">

        {/* ── Parallax red glow — fixed, scroll-driven ────────────────────── */}
        <ParallaxGlow />

        <Navbar />
        <ScrollIndicator />

        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <div id="hero" className="relative">
          <Hero />
        </div>

        <SectionDivider />

        {/* ── About / Design Philosophy — neutral ─────────────────────────── */}
        <About />
        <SectionDivider />
        <DesignPhilosophy />
        <SectionDivider />

        {/* ── Works ───────────────────────────────────────────────────────── */}
        <div id="works" className="relative">
          <SectionReveal>
            <WorksSection studies={studies} />
          </SectionReveal>
        </div>

        <SectionDivider />

        {/* ── How I Work ──────────────────────────────────────────────────── */}
        <SectionReveal>
          <HowIWork />
        </SectionReveal>

        <SectionDivider />

        {/* ── Journey ─────────────────────────────────────────────────────── */}
        <div id="journey" className="relative">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-0"
            style={{
              background:
                'radial-gradient(ellipse 60% 50% at 50% 100%, rgba(212,175,55,0.03) 0%, transparent 70%)',
            }}
          />
          <SectionReveal>
            <Journey />
          </SectionReveal>
        </div>

        <SectionDivider />

        {/* ── Capabilities ────────────────────────────────────────────────── */}
        <div className="relative">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-0"
            style={{
              background:
                'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(77,158,255,0.022) 0%, transparent 70%)',
            }}
          />
          <SectionReveal>
            <Skills />
          </SectionReveal>
        </div>

        <SectionDivider />

        {/* ── Design Philosophy ───────────────────────────────────────────── */}
        <div id="japanese-habits" className="relative">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-0"
            style={{
              background:
                'radial-gradient(ellipse 65% 55% at 50% 50%, rgba(225,6,0,0.035) 0%, transparent 65%)',
            }}
          />
          <SectionReveal>
            <Japanese />
          </SectionReveal>
        </div>

        <SectionDivider />

        {/* ── Design Thoughts ─────────────────────────────────────────────── */}
        <SectionReveal>
          <DesignThoughts />
        </SectionReveal>

        <SectionDivider />

        {/* ── Principles ──────────────────────────────────────────────────── */}
        <SectionReveal>
          <Principles />
        </SectionReveal>

        <SectionDivider />

        {/* ── Testimonials ────────────────────────────────────────────────── */}
        <SectionReveal>
          <Testimonials />
        </SectionReveal>

        <SectionDivider />

        {/* ── Impact ──────────────────────────────────────────────────────── */}
        <SectionReveal>
          <Impact />
        </SectionReveal>

        <SectionDivider />

        {/* ── Clients ─────────────────────────────────────────────────────── */}
        <SectionReveal>
          <Clients />
        </SectionReveal>

        {/* ── Contact / Footer ────────────────────────────────────────────── */}
        <div id="contact">
          <Footer />
        </div>

      </div>
    </SmoothScroll>
  );
}
