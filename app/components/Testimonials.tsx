'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTheme } from './ThemeProvider';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const testimonials = [
  {
    highlight: "Arjun doesn't just design screens — he designs outcomes.",
    body: "His ability to translate complex business requirements into intuitive interfaces is exceptional. Every deliverable came with clear thinking and strong intent.",
    name: "Charudatt Sawant",
    role: "AVP, Product Development",
    initials: "CS",
    avatarColor: "#FEF2F2",
    accentColor: "#B91C1C",
    linkedin: "https://www.linkedin.com/in/charudatt-sawant-8a76254/",
  },
  {
    highlight: "Working with Arjun brings clarity, not just deliverables.",
    body: "He consistently simplifies complex systems and focuses on what truly matters for users and business.",
    name: "Arun Roy",
    role: "Entrepreneur",
    initials: "AR",
    avatarColor: "#F0FDF4",
    accentColor: "#B91C1C",
    linkedin: "https://www.linkedin.com/in/arunroypeter/",
  },
  {
    highlight: "Arjun's discipline and depth of thinking set him apart.",
    body: "His structured approach to solving product problems makes collaboration smooth and outcomes impactful.",
    name: "Lalith Prasad GJ",
    role: "Sr. Delivery Director",
    initials: "LP",
    avatarColor: "#EFF6FF",
    accentColor: "#B91C1C",
    linkedin: "https://www.linkedin.com/in/lalithgj/",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14 } },
};

const cardVariants = {
  hidden:   { opacity: 0, y: 40 },
  visible:  { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

/* ── Avatar ─────────────────────────────────────────────────────────────── */
function Avatar({ initials, accentColor, avatarColor, isDark }: { initials: string; accentColor: string; avatarColor: string; isDark: boolean }) {
  return (
    <div
      className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 border"
      style={{
        background:  isDark ? '#140606' : avatarColor,
        borderColor: `${accentColor}30`,
      }}
    >
      <span
        className="text-[11px] font-semibold tracking-[1px]"
        style={{ color: accentColor }}
      >
        {initials}
      </span>
    </div>
  );
}

/* ── Card ───────────────────────────────────────────────────────────────── */
function TestimonialCard({ t }: { t: typeof testimonials[number] }) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <motion.div
      variants={cardVariants}
      className="group relative flex flex-col justify-between rounded-2xl p-8 cursor-default
        transition-all duration-300 ease-out
        hover:-translate-y-[6px]"
      style={{
        background:   isDark ? '#0E0F16' : '#FFFFFF',
        border:       `1px solid ${isDark ? '#1C1D2A' : '#E5E7EB'}`,
      }}
      whileHover={{
        boxShadow: '0 0 0 1px rgba(185,28,28,0.08), 0 12px 32px rgba(0,0,0,0.08)',
      }}
      transition={{ duration: 0.3, ease: EASE }}
    >

      {/* Top accent line on hover */}
      <span
        className="absolute top-0 left-6 right-6 h-px rounded-full pointer-events-none
          bg-gradient-to-r from-transparent via-[#B91C1C]/0 to-transparent
          group-hover:via-[#B91C1C]/35
          transition-all duration-500"
        style={{ borderRadius: '999px' }}
      />

      {/* Main content — grows to fill */}
      <div className="flex flex-col gap-5 flex-1 pb-6">
        {/* Open quote mark */}
        <span
          className="italic text-[64px] leading-none select-none"
          style={{ color: t.accentColor, opacity: 0.18, marginBottom: '-24px' }}
          aria-hidden
        >
          &ldquo;
        </span>

        {/* Highlighted key quote */}
        <p
          className="font-bold text-[19px] leading-[1.35] transition-colors duration-300"
          style={{ color: isDark ? '#EDEDF5' : '#111827' }}
        >
          {t.highlight}
        </p>

        {/* Small accent divider */}
        <div
          className="w-8 h-px transition-all duration-500 ease-out group-hover:w-14"
          style={{ background: `${t.accentColor}50` }}
        />

        {/* Supporting body */}
        <p
          className="italic text-[13.5px] leading-[26px] tracking-[0.3px] transition-colors duration-300"
          style={{ color: isDark ? '#7A7A92' : '#6B7280' }}
        >
          {t.body}
        </p>
      </div>

      {/* Footer — always at bottom */}
      <div>
        {/* 60% width divider */}
        <div className="w-[60%] h-px mb-4" style={{ background: isDark ? '#1C1D2A' : '#E5E7EB' }} />

        {/* Avatar + name + role */}
        <div className="flex items-center gap-[12px]">
          <Avatar
            initials={t.initials}
            accentColor={t.accentColor}
            avatarColor={t.avatarColor}
            isDark={isDark}
          />
          <div className="flex flex-col gap-[3px]">
            {t.linkedin ? (
              <a
                href={t.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[14px] font-semibold tracking-[0.3px]
                  hover:text-[#B91C1C] transition-colors duration-200 underline-offset-2 hover:underline"
                style={{ color: isDark ? '#EDEDF5' : '#111827' }}
              >
                {t.name}
              </a>
            ) : (
              <span
                className="text-[14px] font-semibold tracking-[0.3px] transition-colors duration-300"
                style={{ color: isDark ? '#EDEDF5' : '#111827' }}
              >
                {t.name}
              </span>
            )}
            <span className="text-[10px] tracking-[1.5px] uppercase text-[#9CA3AF]">
              {t.role}
            </span>
          </div>
        </div>
      </div>

    </motion.div>
  );
}

/* ── Section ─────────────────────────────────────────────────────────────── */
export default function Testimonials() {
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });

  return (
    <section
      ref={ref}
      className="flex flex-col items-center px-6 md:px-6 w-full"
    >

      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <motion.div
        className="section-header w-full max-w-[1200px]"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: EASE }}
      >
        <p className="text-[13px] font-semibold text-[#B91C1C] tracking-[4px] uppercase">
          People I've Worked With
        </p>
        <h2 className="font-bold text-[26px] sm:text-[32px] md:text-[38px] text-[#111827] text-center leading-none">
          What Colleagues Say
        </h2>
        <div className="flex items-center gap-4 mt-1">
          <span className="w-10 h-px bg-gradient-to-r from-transparent to-[#B91C1C]/12" />
          <p className="text-[12px] text-[#6B7280] tracking-[3px] uppercase">
            Testimonials
          </p>
          <span className="w-10 h-px bg-gradient-to-l from-transparent to-[#B91C1C]/12" />
        </div>
      </motion.div>

      {/* ── Cards ──────────────────────────────────────────────────────────── */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="grid grid-cols-1 md:grid-cols-3 card-grid w-full max-w-[1200px]"
      >
        {testimonials.map((t) => (
          <TestimonialCard key={t.name} t={t} />
        ))}
      </motion.div>

    </section>
  );
}
