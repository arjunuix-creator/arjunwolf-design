import Navbar from './components/Navbar';
import Hero from './components/Hero';
import LeadershipImpact from './components/LeadershipImpact';
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

const studies = [
  {
    id: 1,
    title: 'TI Credit Report',
    category: 'FinTech Case Study',
    categoryColor: '#002563',
    imageBg: '#EFF6FF',
    imageSrc: '/designs/tu-cibil.png?v=2',
    imageAlt: 'TI Credit Report preview',
    imagePosition: 'left' as const,
    description: 'Modernized a legacy credit intelligence platform for banking professionals — replacing a compliance-heavy system with a clear, decision-ready interface.',
    users: 'Bank Managers, Financial Analysts, Loan Managers',
    platform: 'Desktop-first (150+ screens including mobile and tablet)',
    meta: { role: 'Lead UI/UX Designer', duration: '36 Months', team: 'Solo Designer', year: '2025' },
    href: '/work/tu-cibil',
  },
  {
    id: 2,
    title: 'RMT Holotrack',
    category: 'Logistics Case Study',
    categoryColor: '#065F46',
    imageBg: '#ECFDF5',
    imageSrc: '/designs/rmt-holotrack.png',
    imageAlt: 'RMT Holotrack preview',
    imagePosition: 'right' as const,
    description: 'Transformed fragmented warehouse workflows into a real-time operational platform — giving logistics teams centralized visibility and IoT-powered monitoring.',
    users: 'Warehouse & Fleet Ops',
    platform: 'Desktop & Tablet',
    meta: { role: 'Lead UI/UX Designer', duration: '12 Months', team: 'Solo Designer', year: '2022' },
    href: '/work/rmt-holotrack',
  },
  {
    id: 3,
    title: 'PH-Aware',
    category: 'Medi-Tech Case Study',
    categoryColor: '#9F1239',
    imageBg: '#FFF1F2',
    imageSrc: '/designs/ph-aware.png',
    imageAlt: 'PH-Aware preview',
    imagePosition: 'left' as const,
    description: 'Designed a digital health platform that simplifies complex medical information and improves patient engagement through a mobile-first experience.',
    users: 'Patients, Caregivers',
    platform: 'Mobile-first application',
    meta: { role: 'Product Designer', duration: '6 Months', team: 'Solo Designer', year: '2024' },
    href: '/work/ph-aware',
  },
  {
    id: 4,
    title: 'Finova Expense Tracker',
    category: 'SaaS App',
    categoryColor: '#1E3A5F',
    imageBg: '#EFF6FF',
    imageSrc: '/designs/finov-ai.png',
    imageAlt: 'Finova Expense Tracker preview',
    imagePosition: 'right' as const,
    description: 'Designed a modern financial dashboard to help users track expenses, visualize spending patterns, and make informed financial decisions.',
    users: 'Individuals, Finance users',
    platform: 'Web + Mobile',
    meta: { role: 'Lead UI/UX Designer', duration: 'Concept Project', team: 'Solo Designer', year: '2026' },
    href: '/work/finova',
  },
];

export default function Home() {
  return (
    <SmoothScroll>
      <div className="min-h-screen w-full bg-[#FAFAFA] overflow-x-hidden">

        <Navbar />
        <ScrollIndicator />

        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <div id="hero" className="relative">
          <Hero />
        </div>

        <SectionDivider />

        {/* ── Leadership Impact ────────────────────────────────────────────── */}
        <div id="next-section">
          <SectionReveal>
            <LeadershipImpact />
          </SectionReveal>
        </div>

        <SectionDivider />

        {/* ── About ────────────────────────────────────────────────────────── */}
        <div id="about">
          <About />
        </div>
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
        <div id="experience" className="relative">
          <SectionReveal>
            <Journey />
          </SectionReveal>
        </div>

        <SectionDivider />

        {/* ── Capabilities ────────────────────────────────────────────────── */}
        <SectionReveal>
          <Skills />
        </SectionReveal>

        <SectionDivider />

        {/* ── Design Philosophy ───────────────────────────────────────────── */}
        <div id="japanese-habits" className="relative bg-[#F9FAFB]">
          <SectionReveal>
            <Japanese />
          </SectionReveal>
        </div>

        <SectionDivider />

        {/* ── Design Thoughts ─────────────────────────────────────────────── */}
        <div id="writing">
          <SectionReveal>
            <DesignThoughts />
          </SectionReveal>
        </div>

        <SectionDivider />

        {/* ── Principles ──────────────────────────────────────────────────── */}
        <SectionReveal>
          <Principles />
        </SectionReveal>

        <SectionDivider />

        {/* ── Testimonials ────────────────────────────────────────────────── */}
        <div className="bg-[#F9FAFB]">
          <SectionReveal>
            <Testimonials />
          </SectionReveal>
        </div>

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
        <div id="contact" className="bg-[#F9FAFB]">
          <Footer />
        </div>

      </div>
    </SmoothScroll>
  );
}
