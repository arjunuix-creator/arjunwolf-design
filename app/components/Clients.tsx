'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* ─────────────────────────────────────────────────────────────────────────────
   DATA
───────────────────────────────────────────────────────────────────────────── */

const clients = [
  { name: 'TransUnion CIBIL',        src: '/designs/tu-logo.png',     float: { dur: 6.0, delay: 0.0 } },
  { name: 'Acer',                    src: '/designs/acer-logo.png',   float: { dur: 5.5, delay: 0.8 } },
  { name: 'ASUS',                    src: '/designs/asus-logo.png',   float: { dur: 7.0, delay: 1.4 } },
  { name: 'Colt Technology Services',src: '/designs/Colt-logo.png',   float: { dur: 5.8, delay: 0.4 } },
  { name: 'DS Group',                src: '/designs/ds-logo.png',     float: { dur: 6.5, delay: 1.1 } },
  { name: 'ITC Limited',             src: '/designs/itc-logo.png',    float: { dur: 5.2, delay: 1.8 } },
  { name: 'Lenovo',                  src: '/designs/lenovo-logo.png', float: { dur: 6.8, delay: 0.6 } },
  { name: 'Mountain Leverage',       src: '/designs/ml-logo.png',     float: { dur: 5.6, delay: 1.3 } },
];

/* ─────────────────────────────────────────────────────────────────────────────
   LOGO CARD
───────────────────────────────────────────────────────────────────────────── */

const cardReveal = {
  hidden:  { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
};

function LogoCard({ client }: { client: typeof clients[number] }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      variants={cardReveal}
      /* Continuous float */
      animate={{ y: [0, -4, 0] }}
      transition={{
        y: {
          duration:   client.float.dur,
          delay:      client.float.delay,
          ease:       'easeInOut',
          repeat:     Infinity,
          repeatType: 'loop',
        },
      }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="relative flex items-center justify-center cursor-default"
      style={{
        height:       90,
        borderRadius: 16,
        background:   'rgba(255,255,255,0.02)',
        border:       hovered
          ? '1px solid rgba(225,6,0,0.35)'
          : '1px solid rgba(255,255,255,0.06)',
        boxShadow:    hovered
          ? '0 0 24px rgba(225,6,0,0.1), 0 12px 40px rgba(0,0,0,0.5)'
          : '0 4px 20px rgba(0,0,0,0.2)',
        transform:    hovered ? 'scale(1.06)' : 'scale(1)',
        transition:   'border 0.35s ease, box-shadow 0.35s ease, transform 0.35s ease',
        padding:      '0 20px',
      }}
    >
      <motion.div
        className="relative w-full"
        style={{ height: 46 }}
        animate={{
          filter:  hovered ? 'grayscale(0%) brightness(1)' : 'grayscale(100%) brightness(6)',
          opacity: hovered ? 1 : 0.55,
        }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
      >
        <Image
          src={client.src}
          alt={client.name}
          fill
          className="object-contain"
          sizes="(max-width: 640px) 140px, (max-width: 1024px) 180px, 160px"
        />
      </motion.div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   SECTION
───────────────────────────────────────────────────────────────────────────── */

const gridReveal = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.08 } },
};

export default function Clients() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView     = useInView(sectionRef, { once: true, margin: '-8% 0px' });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const gridY = useTransform(scrollYProgress, [0, 1], [0, -18]);

  return (
    <section
      ref={sectionRef}
      className="relative flex flex-col items-center px-4 sm:px-8 md:px-12 lg:px-[120px] w-full"
    >
      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <motion.div
        className="relative z-10 section-header"
        initial={{ opacity: 0, y: 28 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.85, ease: EASE }}
      >
        <p className="font-['Blast_Dragon',sans-serif] text-[13px] text-[#e10600] tracking-[4px] uppercase">
          Trusted By Global Brands
        </p>
        <h2 className="font-['The_Last_Shuriken',sans-serif] text-[56px] text-white text-center leading-none">
          Clients
        </h2>
        <div className="flex items-center gap-4 mt-1">
          <span className="w-10 h-px bg-gradient-to-r from-transparent to-[#e10600]/30" />
          <p className="font-['Blast_Dragon',sans-serif] text-[12px] text-[#8a8f98] tracking-[3px] uppercase">
            Global Enterprises
          </p>
          <span className="w-10 h-px bg-gradient-to-l from-transparent to-[#e10600]/30" />
        </div>
        <p className="font-['Blast_Dragon',sans-serif] text-[12px] text-[#8a8f98]/55 tracking-[0.5px] mt-3 text-center max-w-[480px] leading-relaxed">
          Designing enterprise platforms and digital products for global organizations.
        </p>
      </motion.div>

      {/* ── Logo grid ──────────────────────────────────────────────────────── */}
      <motion.div
        style={{ y: gridY }}
        className="relative z-10 w-full max-w-[1200px]"
      >
        <motion.div
          variants={gridReveal}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 logo-grid"
        >
          {clients.map((client) => (
            <LogoCard key={client.name} client={client} />
          ))}
        </motion.div>
      </motion.div>

      {/* ── Trust line ─────────────────────────────────────────────────────── */}
      <motion.p
        className="relative z-10 font-['Blast_Dragon',sans-serif] text-[11px] text-[#8a8f98]/50
          tracking-[0.8px] text-center mt-12 max-w-[560px] leading-relaxed"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: 0.8, ease: EASE }}
      >
        Enterprise products designed for fintech, telecom, logistics, and global consumer brands.
      </motion.p>

    </section>
  );
}
