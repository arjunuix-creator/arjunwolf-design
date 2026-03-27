'use client';

import { motion } from 'framer-motion';
import { useTheme } from './ThemeProvider';
import MagneticButton from './MagneticButton';

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

const bullets = [
  'Simplified complex financial workflows',
  'Reduced user errors in data-heavy systems',
  'Built scalable design systems',
];

// Waypoints for the floating red comet that sweeps across the hero
const TRAIL_CX = [60, 200, 420, 660, 880, 1060, 1180, 1210, 1190, 1080, 880, 640, 380, 180, 60];
const TRAIL_CY = [760, 650, 540, 450, 390,  368,  372,  400,  438,  462,  490, 530, 600, 670, 760];

const TRAIL_TIMES = [0, 0.07, 0.14, 0.21, 0.29, 0.37, 0.44, 0.50, 0.57, 0.64, 0.71, 0.79, 0.86, 0.93, 1];

// Static ink particles orbiting the enso
const INK_PARTICLES = [
  { id: 0, angle: 15,  r: 185, size: 2,   delay: 0.00, dur: 3.2 },
  { id: 1, angle: 62,  r: 195, size: 1.5, delay: 0.55, dur: 4.1 },
  { id: 2, angle: 108, r: 178, size: 2.5, delay: 1.10, dur: 3.8 },
  { id: 3, angle: 152, r: 200, size: 1.5, delay: 1.65, dur: 4.5 },
  { id: 4, angle: 195, r: 188, size: 2,   delay: 2.20, dur: 3.5 },
  { id: 5, angle: 238, r: 192, size: 1.5, delay: 2.75, dur: 4.2 },
  { id: 6, angle: 282, r: 181, size: 2,   delay: 3.30, dur: 3.9 },
  { id: 7, angle: 328, r: 198, size: 1.5, delay: 3.85, dur: 4.0 },
];

// ── Noise SVG overlay ─────────────────────────────────────────────────────
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

// ── Animated red comet sweeping across the hero ───────────────────────────
function RedLightTrail() {
  const t = {
    duration: 38,
    repeat: Infinity,
    ease: 'easeInOut' as const,
    times: TRAIL_TIMES,
  };
  return (
    <div aria-hidden="true" className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 3 }}>
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1280 800" preserveAspectRatio="xMidYMid slice" fill="none">
        <defs>
          <radialGradient id="rg-trail" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="#FF2A2A" stopOpacity="1" />
            <stop offset="45%"  stopColor="#CC0000" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#800000" stopOpacity="0" />
          </radialGradient>
          <filter id="f-halo" x="-200%" y="-200%" width="500%" height="500%">
            <feGaussianBlur stdDeviation="28" />
          </filter>
          <filter id="f-glow" x="-150%" y="-150%" width="400%" height="400%">
            <feGaussianBlur stdDeviation="9" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="f-core" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>
        {/* Outer ambient halo */}
        <motion.circle r={58} fill="url(#rg-trail)" filter="url(#f-halo)" opacity={0.11}
          initial={{ cx: TRAIL_CX[0], cy: TRAIL_CY[0] }} animate={{ cx: TRAIL_CX, cy: TRAIL_CY }} transition={t} />
        {/* Mid glow */}
        <motion.circle r={22} fill="url(#rg-trail)" filter="url(#f-glow)" opacity={0.31}
          initial={{ cx: TRAIL_CX[0], cy: TRAIL_CY[0] }} animate={{ cx: TRAIL_CX, cy: TRAIL_CY }} transition={t} />
        {/* Bright core */}
        <motion.circle r={4.5} fill="#FF3A3A" filter="url(#f-core)" opacity={0.55}
          initial={{ cx: TRAIL_CX[0], cy: TRAIL_CY[0] }} animate={{ cx: TRAIL_CX, cy: TRAIL_CY }} transition={t} />
        {/* Comet tail */}
        <motion.circle r={14} fill="url(#rg-trail)" filter="url(#f-glow)" opacity={0.17}
          initial={{ cx: TRAIL_CX[0], cy: TRAIL_CY[0] }} animate={{ cx: TRAIL_CX, cy: TRAIL_CY }}
          transition={{ ...t, delay: 0.55 }} />
      </svg>
    </div>
  );
}

// ── Animated enso circle containing 円 ───────────────────────────────────
function AnimatedEnsoWithWolf({ isDark }: { isDark: boolean }) {
  return (
    <div className="relative flex items-center justify-center w-[420px] h-[420px] shrink-0">

      {/* Soft red glow at center */}
      <div
        aria-hidden="true"
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(179,0,0,0.1) 0%, transparent 65%)',
          filter: 'blur(32px)',
        }}
      />

      {/* Outer enso — slow clockwise rotation */}
      <motion.div
        className="absolute inset-0"
        animate={{ rotate: 360, scale: [1, 1.025, 1] }}
        transition={{
          rotate: { duration: 70, repeat: Infinity, ease: 'linear' },
          scale:  { duration: 5, repeat: Infinity, ease: 'easeInOut' },
        }}
        style={{ willChange: 'transform' }}
      >
        <img
          alt=""
          src="/enzo.svg"
          className="w-full h-full object-contain"
          style={{ opacity: 0.42 }}
          draggable={false}
        />
      </motion.div>

      {/* Inner enso — slow counter-rotation */}
      <motion.div
        className="absolute inset-[20%]"
        animate={{ rotate: -360 }}
        transition={{ duration: 100, repeat: Infinity, ease: 'linear' }}
        style={{ willChange: 'transform' }}
      >
        <img
          alt=""
          src="/enzo.svg"
          className="w-full h-full object-contain"
          style={{ opacity: 0.08 }}
          draggable={false}
        />
      </motion.div>

      {/* Red circle trace animation */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 420 420" fill="none">
        <motion.circle
          cx="210" cy="210" r="175"
          stroke="#FF2A2A" strokeWidth="1" strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 0.72, opacity: [0, 0.18, 0.18, 0] }}
          transition={{
            pathLength: { duration: 2.2, delay: 0.6, ease: EASE },
            opacity: { duration: 3.8, delay: 0.6, times: [0, 0.15, 0.65, 1] },
          }}
        />
      </svg>

      {/* Ink particles orbiting */}
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
            animate={{ x: [px, px + 5, px], y: [py, py - 9, py], opacity: [0, 0.45, 0], scale: [0.3, 1, 0.3] }}
            transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
          />
        );
      })}

      {/* 円 kanji centered */}
      <motion.div
        className="relative z-10 flex items-center justify-center"
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, delay: 0.8, ease: EASE }}
      >
        <span
          className="select-none leading-none"
          style={{
            fontSize: '64px',
            fontFamily: "'The Last Shuriken', 'Inter', system-ui, sans-serif",
            color: isDark ? '#EDEDF5' : '#111827',
            opacity: 0.85,
            display: 'block',
          }}
        >
          円
        </span>
      </motion.div>

    </div>
  );
}

// ── Hero ──────────────────────────────────────────────────────────────────
export default function Hero() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <section
      className={`relative w-full min-h-screen overflow-hidden flex items-center
        ${isDark ? '' : 'bg-white border-b border-[#E5E7EB]'}`}
      style={isDark ? { background: '#07080D' } : undefined}
    >
      {/* Dark-mode-only atmospheric layers */}
      {isDark && (
        <>
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(circle at 35% 50%, rgba(179,0,0,0.2) 0%, transparent 60%)',
              zIndex: 0,
            }}
          />
          <NoiseOverlay />
          <RedLightTrail />
        </>
      )}

      {/* Two-column layout */}
      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6 md:px-8
        grid grid-cols-1 lg:grid-cols-[1fr_420px] items-center
        pt-[80px] pb-[80px] gap-8 lg:gap-24">

        {/* ── Left: text ── */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-6 max-w-[680px]"
          data-cursor-safe
        >
          {/* H1 */}
          <motion.h1
            variants={fadeUp}
            className={`font-bold text-[56px] sm:text-[68px] md:text-[80px] leading-[1.0] tracking-tight
              ${isDark ? 'text-[#eaeaea]' : 'text-[#111827]'}`}
          >
            Arjun CR
          </motion.h1>

          {/* Identity label */}
          <motion.p
            variants={fadeUp}
            className="text-[11px] font-semibold tracking-[3px] uppercase text-[#B91C1C]"
          >
            Lead UI/UX Designer
          </motion.p>

          {/* Subheader */}
          <motion.p
            variants={fadeUp}
            className={`text-[20px] sm:text-[22px] leading-[1.6] max-w-[560px]
              ${isDark ? 'text-[#C0C0D4]' : 'text-[#374151]'}`}
          >
            I simplify complex products into{' '}
            <strong
              className="font-semibold text-[#B91C1C]"
            >
              clear, usable
            </strong>{' '}
            systems.
          </motion.p>

          {/* Industry tags */}
          <motion.p
            variants={fadeUp}
            className={`text-[13px] font-semibold tracking-[1.5px] ${isDark ? 'text-[#9090A8]' : 'text-[#6B7280]'}`}
          >
            Fintech&nbsp;·&nbsp;SaaS&nbsp;·&nbsp;Enterprise
          </motion.p>

          {/* CTAs */}
          <motion.div variants={fadeUp} className="flex flex-wrap gap-3 pt-2">
            <MagneticButton>
              <a
                href="#works"
                className="inline-flex items-center gap-2 justify-center px-6 py-3 rounded-[8px]
                  bg-[#B91C1C] text-white font-medium text-[14px] whitespace-nowrap
                  shadow-[0_2px_8px_rgba(185,28,28,0.25)]
                  hover:bg-[#991B1B] hover:-translate-y-[3px] hover:shadow-[0_8px_24px_rgba(185,28,28,0.45)]
                  active:translate-y-0 active:shadow-[0_2px_8px_rgba(185,28,28,0.25)]
                  transition-all duration-200 ease-out group"
              >
                View Work
                <span className="inline-block transition-transform duration-200 group-hover:translate-x-[3px]">→</span>
              </a>
            </MagneticButton>
            <MagneticButton>
              <a
                href="#contact"
                className={`inline-flex items-center gap-2 justify-center px-6 py-3 rounded-[8px]
                  font-medium text-[14px] whitespace-nowrap border
                  hover:-translate-y-[3px] hover:shadow-[0_8px_20px_rgba(0,0,0,0.08)]
                  active:translate-y-0 transition-all duration-200 ease-out group
                  ${isDark
                    ? 'border-[#1C1D2A] text-[#9090A8] hover:border-[#B91C1C] hover:text-[#B91C1C] hover:shadow-[0_8px_20px_rgba(185,28,28,0.12)]'
                    : 'border-[#E5E7EB] text-[#374151] hover:border-[#B91C1C] hover:text-[#B91C1C] hover:shadow-[0_8px_20px_rgba(185,28,28,0.10)]'
                  }`}
              >
                Get in Touch
                <span className="inline-block transition-transform duration-200 group-hover:translate-x-[3px]">→</span>
              </a>
            </MagneticButton>
          </motion.div>
        </motion.div>

        {/* ── Right: Enso + Wolf ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: isDark ? 0.9 : 0.6, scale: 1 }}
          transition={{ duration: 1.4, delay: 0.4, ease: EASE }}
          className="hidden lg:flex items-center justify-center pointer-events-none
            translate-x-[60px] -translate-y-[20px]"
        >
          <AnimatedEnsoWithWolf isDark={isDark} />
        </motion.div>
      </div>

      {/* Explore my world */}
      <motion.a
        href="#next-section"
        aria-label="Explore my world"
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10 group"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2, ease: EASE }}
      >
        <span
          className={`text-[10px] font-semibold tracking-[3px] uppercase transition-colors duration-200
            ${isDark ? 'text-[#52526A] group-hover:text-[#B91C1C]' : 'text-[#9CA3AF] group-hover:text-[#B91C1C]'}`}
          style={{ fontFamily: "'The Last Shuriken', system-ui, sans-serif" }}
        >
          Explore my world
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <svg
            width="16" height="16" viewBox="0 0 16 16" fill="none"
            className={`transition-colors duration-200 ${isDark ? 'text-[#52526A] group-hover:text-[#B91C1C]' : 'text-[#9CA3AF] group-hover:text-[#B91C1C]'}`}
          >
            <path d="M8 3v10M3.5 8.5l4.5 4.5 4.5-4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.div>
      </motion.a>

      {/* Dark-mode bottom fade */}
      {isDark && (
        <div
          aria-hidden="true"
          className="absolute bottom-0 left-0 right-0 h-[120px] pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, transparent, rgba(13,14,20,0.95))',
            zIndex: 5,
          }}
        />
      )}
    </section>
  );
}
