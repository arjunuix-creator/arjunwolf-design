'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const testimonials = [
  {
    highlight: "Arjun doesn't just design screens — he designs outcomes.",
    body: "His ability to translate complex business requirements into intuitive interfaces is exceptional. Every deliverable came with clear thinking and strong intent.",
    name: "Charudatt Sawant",
    role: "AVP, Product Development",
    initials: "CS",
    avatarColor: "#1a0a0a",
    accentColor: "#e10600",
    linkedin: "https://www.linkedin.com/in/charudatt-sawant-8a76254/",
  },
  {
    highlight: "Working with Arjun brings clarity, not just deliverables.",
    body: "He consistently simplifies complex systems and focuses on what truly matters for users and business.",
    name: "Arun Roy",
    role: "Entrepreneur",
    initials: "AR",
    avatarColor: "#0e1208",
    accentColor: "#D4AF37",
    linkedin: "https://www.linkedin.com/in/arunroypeter/",
  },
  {
    highlight: "Arjun's discipline and depth of thinking set him apart.",
    body: "His structured approach to solving product problems makes collaboration smooth and outcomes impactful.",
    name: "Lalith Prasad GJ",
    role: "Sr. Delivery Director",
    initials: "LP",
    avatarColor: "#0a0e1a",
    accentColor: "#e10600",
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
function Avatar({ initials, accentColor, avatarColor }: { initials: string; accentColor: string; avatarColor: string }) {
  return (
    <div
      className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 border"
      style={{
        background:  `linear-gradient(135deg, ${avatarColor} 0%, #111418 100%)`,
        borderColor: `${accentColor}30`,
      }}
    >
      <span
        className="font-['Blast_Dragon',sans-serif] text-[11px] tracking-[1px]"
        style={{ color: accentColor }}
      >
        {initials}
      </span>
    </div>
  );
}

/* ── Card ───────────────────────────────────────────────────────────────── */
function TestimonialCard({ t }: { t: typeof testimonials[number] }) {
  return (
    <motion.div
      variants={cardVariants}
      className="group relative flex flex-col gap-5 md:gap-7 rounded-2xl p-6 md:p-10 cursor-default
        border border-white/[0.055]
        transition-all duration-300 ease-out
        hover:-translate-y-[6px]"
      style={{ background: 'linear-gradient(145deg, #111418 0%, #0d1014 100%)' }}
      whileHover={{
        boxShadow: '0 0 0 1px rgba(255,255,255,0.07), 0 20px 50px rgba(0,0,0,0.55)',
      }}
      transition={{ duration: 0.3, ease: EASE }}
    >

      {/* Top accent line on hover */}
      <span
        className="absolute top-0 left-6 right-6 h-px rounded-full pointer-events-none
          bg-gradient-to-r from-transparent via-[#e10600]/0 to-transparent
          group-hover:via-[#e10600]/35
          transition-all duration-500"
        style={{ borderRadius: '999px' }}
      />

      {/* Open quote mark */}
      <span
        className="font-['Kanzuri',serif] text-[64px] leading-none select-none"
        style={{ color: t.accentColor, opacity: 0.18, marginBottom: '-24px' }}
        aria-hidden
      >
        &ldquo;
      </span>

      {/* Highlighted key quote */}
      <p
        className="font-['The_Last_Shuriken',sans-serif] text-[19px] text-[#eaeaea] leading-[1.35]
          group-hover:text-white transition-colors duration-300"
      >
        {t.highlight}
      </p>

      {/* Divider */}
      <div
        className="w-8 h-px transition-all duration-500 ease-out group-hover:w-14"
        style={{ background: `${t.accentColor}50` }}
      />

      {/* Supporting body */}
      <p
        className="font-['Kanzuri',serif] text-[13.5px] text-[#8a8f98]/75 leading-[26px] tracking-[0.3px] flex-1
          group-hover:text-[#8a8f98] transition-colors duration-300"
      >
        {t.body}
      </p>

      {/* Author row */}
      <div className="flex items-center gap-3.5 pt-2 border-t border-white/[0.05]">
        <Avatar
          initials={t.initials}
          accentColor={t.accentColor}
          avatarColor={t.avatarColor}
        />
        <div className="flex flex-col gap-[3px]">
          {t.linkedin ? (
            <a
              href={t.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="font-['Blast_Dragon',sans-serif] text-[14px] text-[#eaeaea] tracking-[0.3px]
                hover:text-white transition-colors duration-200 underline-offset-2 hover:underline"
            >
              {t.name}
            </a>
          ) : (
            <span className="font-['Blast_Dragon',sans-serif] text-[14px] text-[#eaeaea] tracking-[0.3px] group-hover:text-white transition-colors duration-300">
              {t.name}
            </span>
          )}
          <span className="font-['Blast_Dragon',sans-serif] text-[10px] text-[#8a8f98]/60 tracking-[1.5px] uppercase">
            {t.role}
          </span>
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
      className="flex flex-col items-center px-4 sm:px-8 md:px-12 lg:px-[120px] w-full"
    >

      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: EASE }}
      >
        <p className="font-['Blast_Dragon',sans-serif] text-[13px] text-[#e10600] tracking-[4px] uppercase">
          People I've Worked With
        </p>
        <h2 className="font-['The_Last_Shuriken',sans-serif] text-[34px] sm:text-[44px] md:text-[56px] text-white text-center leading-none">
          What Colleagues Say
        </h2>
        <div className="flex items-center gap-4 mt-1">
          <span className="w-10 h-px bg-gradient-to-r from-transparent to-[#e10600]/30" />
          <p className="font-['Blast_Dragon',sans-serif] text-[12px] text-[#8a8f98] tracking-[3px] uppercase">
            Testimonials
          </p>
          <span className="w-10 h-px bg-gradient-to-l from-transparent to-[#e10600]/30" />
        </div>
      </motion.div>

      {/* ── Cards ──────────────────────────────────────────────────────────── */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="grid grid-cols-1 md:grid-cols-3 card-grid w-full max-w-[1280px]"
      >
        {testimonials.map((t) => (
          <TestimonialCard key={t.name} t={t} />
        ))}
      </motion.div>

    </section>
  );
}
