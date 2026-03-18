'use client';

import { motion } from 'framer-motion';
import MagneticButton from './MagneticButton';

const ensoSrc =
  'https://www.figma.com/api/mcp/asset/8a556390-e4e9-4d7f-adfa-c7b0fa7ca72c';

// Static ink particle data — no Math.random() to prevent hydration mismatch
const INK_PARTICLES = [
  { id: 0, angle: 15,  r: 205, size: 2,   delay: 0.00, dur: 3.2 },
  { id: 1, angle: 62,  r: 215, size: 1.5, delay: 0.55, dur: 4.1 },
  { id: 2, angle: 108, r: 198, size: 2.5, delay: 1.10, dur: 3.8 },
  { id: 3, angle: 152, r: 220, size: 1.5, delay: 1.65, dur: 4.5 },
  { id: 4, angle: 195, r: 208, size: 2,   delay: 2.20, dur: 3.5 },
  { id: 5, angle: 238, r: 212, size: 1.5, delay: 2.75, dur: 4.2 },
  { id: 6, angle: 282, r: 201, size: 2,   delay: 3.30, dur: 3.9 },
  { id: 7, angle: 328, r: 218, size: 1.5, delay: 3.85, dur: 4.0 },
];

// Brush-stroke waypoints — sweep from lower-left toward the Enso center (~1200, 400)
// then arc around it and retreat, like a calligraphic ink stroke
const TRAIL_CX = [60, 200, 420, 660, 880, 1060, 1180, 1210, 1190, 1080, 880, 640, 380, 180, 60];
const TRAIL_CY = [760, 650, 540, 450, 390,  368,  372,  400,  438,  462,  490, 530, 600, 670, 760];

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.13 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } },
};

function NoiseOverlay() {
  return (
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 2, opacity: 0.038, mixBlendMode: 'overlay' }}
    >
      <filter id="hero-noise">
        <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#hero-noise)" />
    </svg>
  );
}

function RedLightTrail() {
  const transition = {
    duration: 38,
    repeat: Infinity,
    ease: 'easeInOut' as const,
    times: [0, 0.07, 0.14, 0.21, 0.29, 0.37, 0.44, 0.50, 0.57, 0.64, 0.71, 0.79, 0.86, 0.93, 1],
  };

  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 3 }}
    >
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1280 800"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Radial gradient for the glow body */}
          <radialGradient id="rg-trail" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="#FF2A2A" stopOpacity="1" />
            <stop offset="45%"  stopColor="#CC0000" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#800000" stopOpacity="0" />
          </radialGradient>

          {/* Outer ambient halo — very soft, large spread */}
          <filter id="f-halo" x="-200%" y="-200%" width="500%" height="500%">
            <feGaussianBlur stdDeviation="28" />
          </filter>

          {/* Mid soft glow */}
          <filter id="f-glow" x="-150%" y="-150%" width="400%" height="400%">
            <feGaussianBlur stdDeviation="9" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Sharp core with micro bloom */}
          <filter id="f-core" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Layer 1 — outer ambient halo */}
        <motion.circle
          r={58}
          fill="url(#rg-trail)"
          filter="url(#f-halo)"
          opacity={0.11}
          initial={{ cx: TRAIL_CX[0], cy: TRAIL_CY[0] }}
          animate={{ cx: TRAIL_CX, cy: TRAIL_CY }}
          transition={transition}
        />

        {/* Layer 2 — mid soft glow */}
        <motion.circle
          r={22}
          fill="url(#rg-trail)"
          filter="url(#f-glow)"
          opacity={0.31}
          initial={{ cx: TRAIL_CX[0], cy: TRAIL_CY[0] }}
          animate={{ cx: TRAIL_CX, cy: TRAIL_CY }}
          transition={transition}
        />

        {/* Layer 3 — bright core */}
        <motion.circle
          r={4.5}
          fill="#FF3A3A"
          filter="url(#f-core)"
          opacity={0.55}
          initial={{ cx: TRAIL_CX[0], cy: TRAIL_CY[0] }}
          animate={{ cx: TRAIL_CX, cy: TRAIL_CY }}
          transition={transition}
        />

        {/* Layer 4 — comet tail (slightly behind, fades out) */}
        <motion.circle
          r={14}
          fill="url(#rg-trail)"
          filter="url(#f-glow)"
          opacity={0.17}
          initial={{ cx: TRAIL_CX[0], cy: TRAIL_CY[0] }}
          animate={{ cx: TRAIL_CX, cy: TRAIL_CY }}
          transition={{ ...transition, delay: 0.55 }}
        />
      </svg>
    </div>
  );
}

function AnimatedEnso() {
  return (
    <div className="relative flex items-center justify-center w-[480px] h-[480px] shrink-0">
      <div
        aria-hidden="true"
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(179,0,0,0.08) 0%, transparent 68%)',
          filter: 'blur(28px)',
        }}
      />
      <motion.div
        className="absolute inset-0"
        animate={{ rotate: 360, scale: [1, 1.03, 1] }}
        transition={{
          rotate: { duration: 60, repeat: Infinity, ease: 'linear' },
          scale: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
        }}
        style={{ willChange: 'transform' }}
      >
        <img alt="Enso ink circle" className="w-full h-full object-contain" style={{ opacity: 0.45 }} src={ensoSrc} />
      </motion.div>
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 480 480"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.circle
          cx="240" cy="240" r="200"
          stroke="#FF2A2A" strokeWidth="1" strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 0.72, opacity: [0, 0.18, 0.18, 0] }}
          transition={{
            pathLength: { duration: 2.2, delay: 0.6, ease: EASE },
            opacity: { duration: 3.8, delay: 0.6, times: [0, 0.15, 0.65, 1] },
          }}
        />
      </svg>
      <motion.div
        className="absolute inset-[18%]"
        animate={{ rotate: -360 }}
        transition={{ duration: 90, repeat: Infinity, ease: 'linear' }}
        style={{ willChange: 'transform' }}
      >
        <img alt="" className="w-full h-full object-contain" style={{ opacity: 0.09 }} src={ensoSrc} />
      </motion.div>
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.4, delay: 1.2, ease: EASE }}
      >
        <span className="font-['Gingsul_Demo',serif] text-[80px] select-none" style={{ color: 'rgba(234,234,234,0.08)' }}>
          円
        </span>
      </motion.div>
      {INK_PARTICLES.map(p => {
        const rad = (p.angle * Math.PI) / 180;
        const px  = Math.cos(rad) * p.r;
        const py  = Math.sin(rad) * p.r;
        return (
          <motion.div
            key={p.id}
            aria-hidden="true"
            className="absolute rounded-full"
            style={{
              width: p.size, height: p.size,
              backgroundColor: '#B30000',
              left: '50%', top: '50%',
              marginLeft: -(p.size / 2), marginTop: -(p.size / 2),
            }}
            animate={{ x: [px, px + 6, px], y: [py, py - 10, py], opacity: [0, 0.5, 0], scale: [0.3, 1, 0.3] }}
            transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
          />
        );
      })}
      <motion.div
        aria-hidden="true"
        className="absolute w-[6px] h-[6px] rounded-full"
        style={{ top: '8%', right: '22%', backgroundColor: '#e10600' }}
        animate={{ opacity: [0.4, 1, 0.4], scale: [1, 1.5, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
}

function ScrollIndicator() {
  return (
    <div className="flex flex-col items-start gap-[6px]">
      <div className="flex items-center gap-3">
        <div className="flex flex-col gap-[3px]">
          <div className="w-[18px] h-[1px]" style={{ background: 'rgba(138,143,152,0.35)' }} />
          <div className="w-[10px] h-[1px]" style={{ background: 'rgba(138,143,152,0.2)' }} />
        </div>
        <span className="font-['Inter',sans-serif] text-[11px] tracking-[3px] uppercase" style={{ color: 'rgba(138,143,152,0.7)' }}>
          Explore My World
        </span>
      </div>
      <motion.span
        className="ml-[30px] text-[16px]"
        style={{ color: 'rgba(138,143,152,0.35)' }}
        animate={{ y: [0, 7, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
      >
        ↓
      </motion.span>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="relative w-full min-h-screen overflow-hidden flex items-center">

      {/* Layer 0 — full-bleed radial background glow */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 35% 50%, rgba(179,0,0,0.26) 0%, transparent 60%)',
          zIndex: 0,
        }}
      />

      <NoiseOverlay />
      <RedLightTrail />

      {/* Shared layout container — identical to Navbar inner container */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-5 md:px-12
        grid grid-cols-1 lg:grid-cols-[60%_40%] items-center
        pt-[80px] pb-[80px] gap-8 lg:gap-0">

        {/* ── Left — text content ── */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-[44px] lg:gap-[60px] items-start text-left translate-y-[40px]"
          data-cursor-safe
        >
          {/* Name + role */}
          <motion.div variants={fadeUp} className="flex flex-col items-start">
            <h1 className="font-['The_Last_Shuriken',sans-serif] text-[52px] sm:text-[68px] md:text-[80px] lg:text-[96px] leading-[1] text-[#eaeaea]">
              Arjun CR
            </h1>
            <p
              className="font-['Blast_Dragon',sans-serif] text-[13px] sm:text-[16px] lg:text-[22px] leading-none tracking-[3px] mt-3"
              style={{ color: '#e10600' }}
            >
              Lead UI/UX Designer
            </p>
          </motion.div>

          {/* Main statement */}
          <motion.div variants={fadeUp} className="flex flex-col gap-[12px]">
            <p className="font-['The_Last_Shuriken',sans-serif] text-[22px] sm:text-[26px] lg:text-[32px] leading-[1.45] text-[#eaeaea]">
              12+ years designing enterprise and fintech systems.
            </p>
            <p
              className="font-['Blast_Dragon',sans-serif] text-[15px] sm:text-[17px] lg:text-[18px] leading-[34px] tracking-[1.5px]"
              style={{ color: '#8a8f98' }}
            >
              Combining{' '}
              <span style={{ color: '#FF2A2A', textShadow: '0 0 24px rgba(255,42,42,0.45)' }}>
                human empathy
              </span>{' '}
              with AI-driven design to simplify complexity.
            </p>
          </motion.div>

          {/* CTA buttons */}
          <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-3 sm:gap-4">
            <MagneticButton>
              <motion.a
                href="#works"
                className="relative flex items-center justify-center px-7 py-4 rounded-[8px]
                  font-['Blast_Dragon',sans-serif] text-[14px] sm:text-[15px] text-white whitespace-nowrap"
                style={{ backgroundColor: '#B30000', boxShadow: '0 0 20px rgba(179,0,0,0.45), 0 0 40px rgba(179,0,0,0.2)' }}
                whileHover={{ scale: 1.04, backgroundColor: '#CC0000', boxShadow: '0 6px 30px rgba(255,42,42,0.65), 0 2px 60px rgba(179,0,0,0.3)' }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
              >
                View Case Studies
              </motion.a>
            </MagneticButton>
            <MagneticButton>
              <motion.a
                href="/resume/arjun_cr_resume_2026.pdf"
                download
                className="flex items-center justify-center px-7 py-4 rounded-[8px]
                  font-['Blast_Dragon',sans-serif] text-[14px] sm:text-[15px] whitespace-nowrap border"
                style={{ color: 'rgba(138,143,152,0.75)', backgroundColor: 'rgba(20,23,28,0.85)', borderColor: 'rgba(138,143,152,0.15)', boxShadow: 'none' }}
                whileHover={{ scale: 1.04, backgroundColor: 'rgba(179,0,0,0.11)', borderColor: 'rgba(179,0,0,0.4)', boxShadow: '0 0 20px rgba(179,0,0,0.2), 0 0 40px rgba(179,0,0,0.08)' }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
              >
                Download Resume
              </motion.a>
            </MagneticButton>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div variants={fadeUp}>
            <ScrollIndicator />
          </motion.div>
        </motion.div>

        {/* ── Right — animated Enso — grid cell, bleeds right ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 0.6, scale: 1 }}
          transition={{ duration: 1.4, delay: 0.4, ease: EASE }}
          className="hidden lg:flex items-center justify-center pointer-events-none translate-x-[100px] -translate-y-[40px]"
        >
          <AnimatedEnso />
        </motion.div>

      </div>

      {/* Bottom section-transition fade — blends hero into page background */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 h-[140px] pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, transparent, rgba(7,7,7,0.95))',
          zIndex: 5,
        }}
      />
    </section>
  );
}
