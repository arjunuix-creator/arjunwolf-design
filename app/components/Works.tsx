import WorksSection, { CaseStudy } from './WorksSection';

/* ─── Local preview images (public/designs/) ────────────────────────────── */
const tucibilScreenSrc  = '/designs/tu-cibil.png?v=2';
const holotrakScreenSrc = '/designs/rmt-holotrack.png';
const phawareSrc        = '/designs/ph-aware.png';
const finovaScreenSrc   = '/designs/finov-ai.png';

const studies: CaseStudy[] = [
  {
    id            : 1,
    title         : 'TI Credit Report',
    category      : 'FinTech Case Study',
    categoryColor : '#002563',
    description   : 'I led the end-to-end UX strategy and execution for a high-security enterprise credit intelligence platform used by banking professionals to evaluate creditworthiness and make loan decisions. The challenge was to modernize a legacy, compliance-heavy system without compromising regulatory integrity.',
    users         : 'Bank Managers, Financial Analysts, Loan Managers',
    platform      : 'Desktop-first (25–30 screens), expanded to 150+ screens including mobile and tablet',
    meta          : { role: 'Lead UI/UX Designer', duration: '36 Months', team: 'Solo Designer', year: '2025' },
    imageSrc      : tucibilScreenSrc,
    imageAlt      : 'TI Credit Report app screens',
    imageBg       : '#002563',
    imagePosition : 'left',
    href          : '/work/tu-cibil',
  },
  {
    id            : 2,
    title         : 'RMT Holotrack',
    category      : 'Logistics Case Study',
    categoryColor : '#2ac19f',
    description   : 'Transformed manual, fragmented warehouse workflows into a real-time operational platform — HoloTrak gives logistics teams centralized visibility, asset tracking, and IoT-powered remote monitoring.',
    users         : 'Warehouse & Fleet Ops',
    platform      : 'Desktop & Tablet',
    meta          : { role: 'Lead UI/UX Designer', duration: '12 Months', team: 'Solo Designer', year: '2022' },
    imageSrc      : holotrakScreenSrc,
    imageAlt      : 'RMT Holotrack screens',
    imageBg       : '#2ac19f',
    imagePosition : 'right',
    href          : '/work/rmt-holotrack',
  },
  {
    id            : 3,
    title         : 'PH-Aware',
    category      : 'Medi-Tech Case Study',
    categoryColor : '#fe626c',
    description   : 'I led the end-to-end UX strategy and execution for a high-security national credit bureau platform used by banking professionals to evaluate creditworthiness and make loan decisions. The challenge was to modernize a legacy, compliance-heavy system without compromising regulatory integrity.',
    users         : 'Bank Managers, Financial Analysts, Loan Managers',
    platform      : 'Desktop-first (25–30 screens), expanded to 150+ screens including mobile and tablet',
    meta          : { role: 'Senior UI/UX Designer', duration: '36 Months', team: 'Solo Designer', year: '2025' },
    imageSrc      : phawareSrc,
    imageAlt      : 'PH Aware screens',
    imageBg       : '#fe626c',
    imagePosition : 'left',
    href          : '/work/ph-aware',
  },
  {
    id            : 4,
    title         : 'Finova Expense Tracker',
    category      : 'Vibe Coding SaaS App',
    categoryColor : '#02112b',
    description   : 'Transformed manual, fragmented warehouse workflows into a real-time operational platform — HoloTrak gives logistics teams centralized visibility, asset tracking, and IoT-powered remote monitoring.',
    users         : 'Warehouse & Fleet Ops',
    platform      : 'Desktop & Tablet',
    meta          : { role: 'Lead UI/UX Designer', duration: '6 hours', team: 'Solo Designer', year: '2026' },
    imageSrc      : finovaScreenSrc,
    imageAlt      : 'Finova Expense Tracker screens',
    imageBg       : '#02112b',
    imagePosition : 'right',
    href          : '/work/finova-expense-tracker',
  },
];

export default function Works() {
  return <WorksSection studies={studies} />;
}
