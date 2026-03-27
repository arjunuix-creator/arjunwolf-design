'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTheme } from './ThemeProvider';
import Image from 'next/image';

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const stats = [
  { value: '12+', label: 'Years of craft'   },
  { value: '40+', label: 'Products shipped' },
  { value: '4',   label: 'Industries'       },
];

// Wolf display size for About section
const WOLF_W   = 400;
const WOLF_H   = Math.round(400 * (402 / 381)); // ≈ 422
// Eye positions scaled from SVG viewBox 381×402 → 400px wide
const EYE_L    = { x: 145, y: 257 };
const EYE_R    = { x: 254, y: 257.5 };
const EYE_R_PX = 16;
const PUP_R_PX = 6;
const MAX_MOVE = 8;

function WolfEyeTracker({ isDark }: { isDark: boolean }) {
  const containerRef                = useRef<HTMLDivElement>(null);
  const [leftPupil,  setLeftPupil]  = useState({ x: 0, y: 0 });
  const [rightPupil, setRightPupil] = useState({ x: 0, y: 0 });
  const [flipped,    setFlipped]    = useState(false);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (flipped) return;
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const track = (eye: { x: number; y: number }) => {
        const dx = e.clientX - (rect.left + eye.x);
        const dy = e.clientY - (rect.top  + eye.y);
        const dist   = Math.sqrt(dx * dx + dy * dy);
        const travel = Math.min(dist / 40, 1) * MAX_MOVE;
        const angle  = Math.atan2(dy, dx);
        return { x: Math.cos(angle) * travel, y: Math.sin(angle) * travel };
      };
      setLeftPupil(track(EYE_L));
      setRightPupil(track(EYE_R));
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, [flipped]);

  return (
    <div className="flex flex-col items-center gap-3">
      {/* 3D flip card */}
      <div
        style={{ width: WOLF_W, height: WOLF_H, perspective: '1000px', cursor: 'pointer' }}
        onClick={() => setFlipped(v => !v)}
      >
        <motion.div
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{ width: '100%', height: '100%', position: 'relative', transformStyle: 'preserve-3d' }}
        >
          {/* Front — wolf + eyes */}
          <div
            ref={containerRef}
            className="absolute inset-0 select-none"
            style={{ backfaceVisibility: 'hidden' }}
          >
            <img
              src="/wolf.svg"
              alt="Ōkami wolf"
              width={WOLF_W}
              height={WOLF_H}
              className="absolute inset-0 w-full h-full object-contain pointer-events-none"
              draggable={false}
            />
            {/* Left eye */}
            <div
              className="absolute rounded-full overflow-hidden"
              style={{ width: EYE_R_PX * 2, height: EYE_R_PX * 2, left: EYE_L.x - EYE_R_PX, top: EYE_L.y - EYE_R_PX }}
            >
              <div
                className="absolute rounded-full"
                style={{
                  width: 5, height: 5, top: '50%', left: '50%',
                  backgroundColor: 'rgb(204, 0, 0)',
                  boxShadow: 'rgba(255,42,42,0.9) 0px 0px 6px 2px, rgba(179,0,0,0.55) 0px 0px 14px 4px',
                  transform: `translate(calc(-50% + ${leftPupil.x}px), calc(-50% + ${leftPupil.y}px))`,
                  transition: 'transform 0.12s ease-out',
                }}
              />
            </div>
            {/* Right eye */}
            <div
              className="absolute rounded-full overflow-hidden"
              style={{ width: EYE_R_PX * 2, height: EYE_R_PX * 2, left: EYE_R.x - EYE_R_PX, top: EYE_R.y - EYE_R_PX }}
            >
              <div
                className="absolute rounded-full"
                style={{
                  width: 5, height: 5, top: '50%', left: '50%',
                  backgroundColor: 'rgb(204, 0, 0)',
                  boxShadow: 'rgba(255,42,42,0.9) 0px 0px 6px 2px, rgba(179,0,0,0.55) 0px 0px 14px 4px',
                  transform: `translate(calc(-50% + ${rightPupil.x}px), calc(-50% + ${rightPupil.y}px))`,
                  transition: 'transform 0.12s ease-out',
                }}
              />
            </div>
          </div>

          {/* Back — flip.png */}
          <div
            className="absolute inset-0 select-none"
            style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
          >
            <Image
              src="/flip.png"
              alt="Flip side"
              fill
              quality={100}
              className="object-contain pointer-events-none"
              draggable={false}
            />
          </div>
        </motion.div>
      </div>

      {/* Ōkami label */}
      <p
        className="text-[64px] tracking-[8px] select-none"
        style={{
          color: isDark ? '#FFFFFF' : '#111827',
          fontFamily: "'Gingsul Demo', 'Inter', system-ui, sans-serif",
        }}
      >
        Ōkami
      </p>
    </div>
  );
}

export default function About() {
  const sectionRef    = useRef<HTMLElement>(null);
  const inView        = useInView(sectionRef, { once: true, margin: '-12% 0px' });
  const { theme }     = useTheme();
  const isDark        = theme === 'dark';

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative w-full px-6 md:px-10 lg:px-[120px]"
    >
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] items-center gap-14 lg:gap-20 max-w-[1200px] mx-auto">

        {/* Left — wolf with eye tracking */}
        <motion.div
          className="flex flex-col items-center lg:items-start"
          initial={{ opacity: 0, x: -24 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 6, ease: 'easeInOut', repeat: Infinity }}
          >
            <WolfEyeTracker isDark={isDark} />
          </motion.div>
        </motion.div>

        {/* Right — Bio */}
        <motion.div
          className="flex flex-col gap-6 max-w-[600px]"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.12, ease: EASE }}
        >
          <p className="text-[12px] font-semibold tracking-[3px] uppercase text-[#B91C1C]">
            About Me
          </p>

          <h2 className="text-[36px] sm:text-[44px] font-bold leading-tight text-[#111827]">
            12+ Years Designing Digital Products
          </h2>

          <p className="text-[16px] leading-[1.7] text-[#6B7280]">
            I specialize in simplifying complex systems and creating meaningful user experiences.
            I currently lead UX initiatives across fintech and enterprise platforms, collaborating
            with cross-functional teams to design scalable and impactful solutions.
          </p>

          <blockquote
            className="text-[16px] italic leading-[1.8] text-[#374151] border-l-2 border-[#B91C1C] pl-4"
          >
            Great design is not decoration.
            It is structure. It is restraint. It is clarity.
          </blockquote>

          <div className="flex items-center gap-10 pt-6 border-t border-[#E5E7EB]">
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col gap-1">
                <span className="text-[32px] font-bold text-[#111827] leading-none">
                  {s.value}
                </span>
                <span className="text-[12px] font-medium text-[#9CA3AF] tracking-[1.5px] uppercase">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
