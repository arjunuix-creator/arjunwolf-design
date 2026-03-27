'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const CONTACTS = [
  {
    label: 'Email',
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
    label: 'Phone',
    value: '+91 96119 87730',
    href:  'tel:+919611987730',
    icon:  (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M2 2.5C2 2.5 3 1 4.5 1C5 1 5.5 1.5 6 2.5L6.5 4C6.7 4.5 6.5 5 6 5.5L5 6.5C5.5 7.5 6.5 8.5 7.5 9L8.5 8C9 7.5 9.5 7.3 10 7.5L11.5 8C12.5 8.5 13 9 13 9.5C13 11 11.5 12 11.5 12C9 14 1 7 2 2.5Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    label: 'Location',
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
  { label: 'LinkedIn',  href: 'https://www.linkedin.com/in/arjuncr/'           },
  { label: 'Medium',    href: 'https://medium.com/@arjunuix'                   },
  { label: 'Behance',   href: 'https://www.behance.net/arjunwolfdesigns'       },
  { label: 'Instagram', href: 'https://www.instagram.com/arjunwolf.design/'    },
];

export default function Footer() {
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-5% 0px' });

  return (
    <footer
      ref={ref}
      id="contact"
      className="relative flex flex-col items-center px-4 sm:px-8 md:px-12 lg:px-[120px] pt-20 pb-14 w-full border-t border-[#E5E7EB]"
    >

      {/* Main CTA block */}
      <div className="flex flex-col items-center gap-7 mb-20 text-center max-w-[640px]">

        <motion.p
          className="text-[12px] font-semibold tracking-[3px] uppercase text-[#B91C1C]"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: EASE }}
        >
          Let&apos;s Connect
        </motion.p>

        <motion.h2
          className="text-[40px] sm:text-[52px] md:text-[64px] font-bold text-[#111827] leading-[1.05] tracking-tight"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.08, ease: EASE }}
        >
          Let&apos;s Build Something{' '}
          <span className="text-[#B91C1C]">Meaningful.</span>
        </motion.h2>

        <motion.p
          className="text-[14px] text-[#9CA3AF] tracking-[1.5px] uppercase font-medium"
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.14, ease: EASE }}
        >
          Based in Bangalore. Working globally.
        </motion.p>

        <motion.p
          className="text-[16px] text-[#6B7280] leading-[1.7] max-w-[480px]"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.18, ease: EASE }}
        >
          Open to collaborating on thoughtful digital products, fintech platforms, and complex enterprise systems.
          Available for select projects and strategic UX leadership roles.
        </motion.p>

        {/* Availability badge */}
        <motion.div
          className="flex items-center gap-2 px-4 py-2 rounded-full border border-[#BBF7D0] bg-[#F0FDF4]"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.45, delay: 0.24, ease: EASE }}
        >
          <span className="relative flex h-[7px] w-[7px]">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22c55e] opacity-60" />
            <span className="relative inline-flex rounded-full h-[7px] w-[7px] bg-[#22c55e]" />
          </span>
          <span className="text-[12px] font-medium text-[#16a34a] tracking-[1px]">
            Available for Select Projects
          </span>
        </motion.div>

        {/* Primary CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.28, ease: EASE }}
        >
          <a
            href="mailto:arjunuix@gmail.com"
            className="inline-flex items-center justify-center gap-3 px-7 py-3.5 rounded-[10px]
              bg-[#B91C1C] text-white font-semibold text-[15px]
              shadow-[0_2px_10px_rgba(185,28,28,0.28)]
              hover:bg-[#991B1B] hover:-translate-y-[4px]
              hover:shadow-[0_12px_32px_rgba(185,28,28,0.50)]
              active:translate-y-0 active:shadow-[0_2px_10px_rgba(185,28,28,0.28)]
              transition-all duration-200 ease-out group"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="transition-transform duration-200 group-hover:-translate-y-[1px]">
              <rect x="1" y="3.5" width="14" height="9" rx="1.5" stroke="white" strokeWidth="1.3"/>
              <path d="M1 5.5L8 10L15 5.5" stroke="white" strokeWidth="1.3" strokeLinecap="round"/>
            </svg>
            Email Me
          </a>
        </motion.div>

        {/* Contact details */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-8 mt-4"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.38, ease: EASE }}
        >
          {CONTACTS.map((item) => {
            const inner = (
              <div className="flex flex-col items-center gap-2 group">
                <span className="text-[#9CA3AF] group-hover:text-[#B91C1C] transition-colors duration-200">
                  {item.icon}
                </span>
                <span className="text-[10px] font-semibold tracking-[2px] uppercase text-[#9CA3AF] group-hover:text-[#B91C1C] transition-colors">
                  {item.label}
                </span>
                <span className="text-[13px] text-[#6B7280] group-hover:text-[#B91C1C] transition-colors duration-200">
                  {item.value}
                </span>
              </div>
            );
            return item.href ? (
              <a key={item.label} href={item.href}>{inner}</a>
            ) : (
              <div key={item.label}>{inner}</div>
            );
          })}
        </motion.div>
      </div>

      {/* Bottom bar */}
      <motion.div
        className="w-full max-w-[1200px]"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
      >
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between border-t border-[#E5E7EB] pt-10">
          <div className="flex flex-col gap-2">
            <span className="text-[22px] font-bold text-[#111827] leading-none">
              Arjun CR
            </span>
            <span className="text-[11px] font-semibold text-[#B91C1C] tracking-[2px] uppercase">
              Lead UI / UX Designer
            </span>
            <p className="text-[13px] text-[#9CA3AF] leading-[1.6] max-w-[260px] mt-1">
              Designing enterprise UX systems with clarity, empathy, and discipline.
            </p>
          </div>

          <div className="flex items-center gap-6">
            {SOCIAL.map(link => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[13px] font-medium text-[#6B7280]
                  hover:text-[#B91C1C] hover:-translate-y-[2px]
                  transition-all duration-200 ease-out inline-block"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 pt-5 border-t border-[#E5E7EB] flex justify-end">
          <p className="text-[12px] text-[#9CA3AF]">
            © 2026 Arjun CR — Designed with discipline.
          </p>
        </div>
      </motion.div>
    </footer>
  );
}
