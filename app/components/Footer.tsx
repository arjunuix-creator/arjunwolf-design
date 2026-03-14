'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import MagneticButton from './MagneticButton';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const CONTACTS = [
  {
    label: 'EMAIL',
    value: 'arjunuix@gmail.com',
    href:  'mailto:arjunuix@gmail.com',
    icon:  (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <rect x="1" y="3" width="12" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.2"/>
        <path d="M1 4.5L7 8.5L13 4.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    label: 'PHONE',
    value: '+91 96119 87730',
    href:  'tel:+919611987730',
    icon:  (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M2 2.5C2 2.5 3 1 4.5 1C5 1 5.5 1.5 6 2.5L6.5 4C6.7 4.5 6.5 5 6 5.5L5 6.5C5.5 7.5 6.5 8.5 7.5 9L8.5 8C9 7.5 9.5 7.3 10 7.5L11.5 8C12.5 8.5 13 9 13 9.5C13 11 11.5 12 11.5 12C9 14 1 7 2 2.5Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    label: 'LOCATION',
    value: 'Bangalore, India',
    href:  null,
    icon:  (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M7 1C4.8 1 3 2.8 3 5C3 8 7 13 7 13C7 13 11 8 11 5C11 2.8 9.2 1 7 1Z" stroke="currentColor" strokeWidth="1.2"/>
        <circle cx="7" cy="5" r="1.5" stroke="currentColor" strokeWidth="1.2"/>
      </svg>
    ),
  },
];

const SOCIAL = [
  { label: 'LinkedIn',  href: 'https://www.linkedin.com/in/arjuncr/'              },
  { label: 'Medium',    href: 'https://medium.com/@arjunuix'                    },
  { label: 'Behance',   href: 'https://www.behance.net/arjunwolfdesigns'        },
  { label: 'Instagram', href: 'https://www.instagram.com/arjunwolf.design/'     },
];

/* ── Contact item ────────────────────────────────────────────────────────── */
function ContactItem({ item, delay }: { item: typeof CONTACTS[number]; delay: number }) {
  const [hovered, setHovered] = useState(false);
  const inner = (
    <motion.div
      className="flex flex-col items-center gap-[10px]"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay, ease: EASE }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{ cursor: item.href ? 'pointer' : 'default' }}
    >
      {/* Icon */}
      <span
        className="transition-all duration-300"
        style={{
          color:      hovered ? '#e10600' : 'rgba(138,143,152,0.5)',
          filter:     hovered ? 'drop-shadow(0 0 6px rgba(225,6,0,0.5))' : 'none',
        }}
      >
        {item.icon}
      </span>

      {/* Label */}
      <span
        className="font-['Blast_Dragon',sans-serif] text-[9px] tracking-[2.5px] uppercase transition-colors duration-300"
        style={{ color: hovered ? '#e10600' : 'rgba(138,143,152,0.45)' }}
      >
        {item.label}
      </span>

      {/* Value */}
      <div className="relative flex flex-col items-center">
        <span
          className="font-['Inter',sans-serif] text-[13px] font-light tracking-[0.3px] transition-colors duration-300"
          style={{ color: hovered ? '#ffffff' : '#8a8f98' }}
        >
          {item.value}
        </span>
        {/* Underline animation */}
        <motion.span
          className="absolute -bottom-[3px] left-0 right-0 h-px rounded-full"
          style={{ background: '#e10600' }}
          animate={{ scaleX: hovered ? 1 : 0, originX: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        />
      </div>
    </motion.div>
  );

  return item.href ? (
    <a href={item.href}>{inner}</a>
  ) : (
    <div>{inner}</div>
  );
}

/* ── Social link ─────────────────────────────────────────────────────────── */
function SocialLink({ link }: { link: typeof SOCIAL[number] }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.a
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      className="font-['Blast_Dragon',sans-serif] text-[12px] tracking-[1.5px] uppercase transition-all duration-300"
      style={{ color: hovered ? '#e10600' : '#8a8f98' }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      animate={{ x: hovered ? 4 : 0 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
    >
      {link.label}
    </motion.a>
  );
}

/* ── Footer ──────────────────────────────────────────────────────────────── */
export default function Footer() {
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-5% 0px' });

  return (
    <footer
      ref={ref}
      id="contact"
      className="relative flex flex-col items-center px-4 sm:px-8 md:px-12 lg:px-[120px] pt-[80px] pb-[60px] w-full overflow-hidden"
    >
      {/* Subtle red ambient behind CTA */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 left-0 right-0 h-[480px]"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(225,6,0,0.05) 0%, transparent 70%)',
        }}
      />

      {/* ── Main CTA block ─────────────────────────────────────────────────── */}
      <div className="relative z-10 flex flex-col items-center gap-8 mb-[100px] text-center max-w-[720px]">

        {/* Section label */}
        <motion.p
          className="font-['Blast_Dragon',sans-serif] text-[13px] text-[#e10600] tracking-[4px] uppercase"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: EASE }}
        >
          Let&apos;s Connect
        </motion.p>

        {/* Heading */}
        <motion.h2
          className="font-['The_Last_Shuriken',sans-serif] text-[40px] sm:text-[60px] md:text-[80px] text-white leading-[1.05]"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
        >
          Let&apos;s Build Something<br />
          <span className="text-[#e10600]">Meaningful.</span>
        </motion.h2>

        {/* Location line */}
        <motion.p
          className="font-['Blast_Dragon',sans-serif] text-[12px] text-[#8a8f98]/50 tracking-[2px] uppercase"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.18, ease: EASE }}
        >
          Based in Bangalore. Working globally.
        </motion.p>

        {/* Subtext */}
        <motion.p
          className="font-['Blast_Dragon',sans-serif] text-[13px] text-[#8a8f98] leading-[26px] tracking-[0.5px] max-w-[500px]"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
        >
          Open to collaborating on thoughtful digital products, fintech platforms, and complex enterprise systems.
          <br /><br />
          Available for select projects and strategic UX leadership roles.
        </motion.p>

        {/* Availability badge */}
        <motion.div
          className="flex items-center gap-2 px-4 py-[7px] rounded-full"
          style={{
            background:   'rgba(34,197,94,0.07)',
            border:       '1px solid rgba(34,197,94,0.2)',
          }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.3, ease: EASE }}
        >
          {/* Pulsing green dot */}
          <span className="relative flex h-[7px] w-[7px]">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22c55e] opacity-60" />
            <span className="relative inline-flex rounded-full h-[7px] w-[7px] bg-[#22c55e]" />
          </span>
          <span className="font-['Blast_Dragon',sans-serif] text-[10px] text-[#22c55e] tracking-[2px] uppercase">
            Available for Select Projects
          </span>
        </motion.div>

        {/* Primary CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.35, ease: EASE }}
        >
          <MagneticButton maxShift={7}>
            <a
              href="mailto:arjunuix@gmail.com"
              className="flex items-center justify-center gap-3 px-[44px] h-[54px] rounded-[10px]
                font-['Blast_Dragon',sans-serif] text-[15px] text-white tracking-[1.5px] uppercase
                transition-all duration-300"
              style={{
                background: '#B30000',
                boxShadow:  '0 0 24px rgba(179,0,0,0.4), 0 0 48px rgba(179,0,0,0.15)',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLAnchorElement).style.background = '#CC0000';
                (e.currentTarget as HTMLAnchorElement).style.boxShadow  = '0 6px 32px rgba(255,42,42,0.55), 0 0 60px rgba(179,0,0,0.25)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLAnchorElement).style.background = '#B30000';
                (e.currentTarget as HTMLAnchorElement).style.boxShadow  = '0 0 24px rgba(179,0,0,0.4), 0 0 48px rgba(179,0,0,0.15)';
              }}
            >
              {/* Envelope icon */}
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <rect x="1" y="3.5" width="14" height="9" rx="1.5" stroke="white" strokeWidth="1.3"/>
                <path d="M1 5.5L8 10L15 5.5" stroke="white" strokeWidth="1.3" strokeLinecap="round"/>
              </svg>
              Email Me
            </a>
          </MagneticButton>
        </motion.div>

        {/* Secondary contact items */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-10 mt-4"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.5, ease: EASE }}
        >
          {CONTACTS.map((item, i) => (
            <ContactItem key={item.label} item={item} delay={0.55 + i * 0.1} />
          ))}
        </motion.div>
      </div>

      {/* ── Bottom bar ─────────────────────────────────────────────────────── */}
      <motion.div
        className="relative z-10 w-full max-w-[1200px]"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.5, ease: 'easeOut' }}
      >
        {/* Row 1 — identity + social */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between border-t border-white/[0.06] pt-[48px]">

          {/* Identity */}
          <div className="flex flex-col gap-[12px]">
            <span className="font-['The_Last_Shuriken',sans-serif] text-[26px] text-[#eaeaea] leading-none">
              Arjun CR
            </span>
            <span className="font-['Blast_Dragon',sans-serif] text-[11px] text-[#e10600] tracking-[2px] uppercase">
              Lead UI / UX Designer
            </span>
            <p className="font-['Blast_Dragon',sans-serif] text-[12px] text-[#8a8f98]/60 leading-[22px] tracking-[0.3px] max-w-[280px]">
              Designing enterprise UX systems with clarity, empathy, and discipline.
            </p>
          </div>

          {/* Social links */}
          <div className="flex items-center gap-6">
            {SOCIAL.map(link => (
              <SocialLink key={link.label} link={link} />
            ))}
          </div>
        </div>

        {/* Row 2 — copyright */}
        <div className="mt-[40px] pt-[20px] border-t border-white/[0.06] flex justify-end">
          <p className="font-['Inter',sans-serif] font-light text-[12px] tracking-[0.3px]"
            style={{ color: 'rgba(138,143,152,0.5)' }}>
            © 2026 Arjun CR — Designed with discipline.
          </p>
        </div>
      </motion.div>
    </footer>
  );
}
