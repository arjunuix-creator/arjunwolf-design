'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const okamiFrontSrc  = 'https://www.figma.com/api/mcp/asset/44920a4a-12b2-48b7-bea8-9263ae4ee30d';
const okamiDetailSrc = 'https://www.figma.com/api/mcp/asset/33e434c4-32cd-40f0-88a9-f967019feb18';
const dividerSrc     = 'https://www.figma.com/api/mcp/asset/d650b40d-c639-47a2-acc6-53b441b12346';

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

// Eye overlay positions as % of the 380×402 wolf container.
// Adjust these if the illustration's eye positions differ.
const EYES = [
  { id: 'left',  top: '61%', left: '36%' },
  { id: 'right', top: '61%', left: '64%' },
];
const MAX_OFFSET = 5; // px — max pupil travel distance

const stats = [
  { value: '12+', label: 'Years of craft'   },
  { value: '40+', label: 'Products shipped' },
  { value: '4',   label: 'Industries'       },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const wolfRef    = useRef<HTMLDivElement>(null);
  const inView     = useInView(sectionRef, { once: true, margin: '-12% 0px' });
  const sectionVisible = useInView(sectionRef, { margin: '0px' });

  const [pupil, setPupil] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!sectionVisible || !wolfRef.current) return;

      const rect   = wolfRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width  / 2;
      const centerY = rect.top  + rect.height / 2;

      const dx   = e.clientX - centerX;
      const dy   = e.clientY - centerY;
      const dist = Math.sqrt(dx * dx + dy * dy) || 1;

      // Normalise direction, scale by proximity (closer = fuller offset)
      const influence = Math.min(dist / 360, 1);
      setPupil({
        x: (dx / dist) * MAX_OFFSET * influence,
        y: (dy / dist) * MAX_OFFSET * influence,
      });
    };

    const onLeave = () => setPupil({ x: 0, y: 0 });

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseleave', onLeave);
    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
    };
  }, [sectionVisible]);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative w-full px-6 md:px-10 lg:px-[120px]"
    >
      {/* Hero-to-About bleed gradient */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 h-[220px] pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, rgba(120,0,0,0.22) 0%, rgba(7,7,7,0) 100%)',
          zIndex: -1,
        }}
      />

      {/* Three-column grid: wolf | divider | bio */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1.2fr] items-center gap-10 lg:gap-0 max-w-[1280px] mx-auto">

        {/* ── Left — Okami illustration ───────────────────────────────────── */}
        <motion.div
          className="flex flex-col gap-[7px] items-center"
          initial={{ opacity: 0, x: -40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1, ease: EASE }}
        >
          {/* Floating wrapper */}
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 6, ease: 'easeInOut', repeat: Infinity }}
          >
            <motion.div
              ref={wolfRef}
              className="relative h-[280px] w-[260px] sm:h-[360px] sm:w-[340px] md:h-[402px] md:w-[380px] cursor-pointer"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            >
              {/* Wolf images — untouched */}
              <img
                alt="Okami wolf"
                className="absolute inset-0 w-full h-full object-contain transition-opacity"
                src={okamiFrontSrc}
              />
              <img
                alt="Okami wolf detail"
                className="absolute inset-[0_5%_0_5%] w-[90%] h-full object-contain transition-opacity"
                src={okamiDetailSrc}
              />

              {/* Pupil overlays — one per eye */}
              {EYES.map(eye => (
                <div
                  key={eye.id}
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    top: eye.top,
                    left: eye.left,
                    width: '18px',
                    height: '18px',
                    transform: 'translate(-50%, -50%)',
                    pointerEvents: 'none',
                  }}
                >
                  {/* Pupil dot — shifts with cursor */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      width: '5px',
                      height: '5px',
                      borderRadius: '50%',
                      backgroundColor: '#CC0000',
                      boxShadow: '0 0 6px 2px rgba(255,42,42,0.9), 0 0 14px 4px rgba(179,0,0,0.55)',
                      transform: `translate(calc(-50% + ${pupil.x}px), calc(-50% + ${pupil.y}px))`,
                      transition: 'transform 0.12s ease-out',
                    }}
                  />
                </div>
              ))}
            </motion.div>
          </motion.div>

          <p className="font-['Gingsul_Demo',serif] text-[64px] leading-[1.2] text-white text-center w-full">
            Ōkami
          </p>
        </motion.div>

        {/* ── Centre — gold vertical divider ──────────────────────────────── */}
        <motion.div
          className="hidden lg:flex items-center justify-center mx-[40px] h-[394px] w-[6px] shrink-0"
          initial={{ opacity: 0, scaleY: 0 }}
          animate={inView ? { scaleY: 1 } : {}}
          transition={{ duration: 0.9, delay: 0.3, ease: EASE }}
        >
          <motion.div
            className="h-full w-full"
            animate={inView ? { opacity: [0.7, 1, 0.7] } : { opacity: 0 }}
            transition={{ duration: 3, ease: 'easeInOut', repeat: Infinity, delay: 1.2 }}
          >
            <img alt="" className="h-[394px] w-[6px] object-cover" src={dividerSrc} />
          </motion.div>
        </motion.div>

        {/* ── Right — Bio ─────────────────────────────────────────────────── */}
        <motion.div
          className="flex flex-col gap-[28px] items-start max-w-[640px] lg:max-w-none"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.15, ease: EASE }}
        >
          <p className="font-['Blast_Dragon',sans-serif] text-[13px] text-[#e10600] tracking-[4px] uppercase">
            About Me
          </p>

          <h2 className="font-['The_Last_Shuriken',sans-serif] text-[48px] leading-tight text-[#eaeaea]">
            12+ YEARS DESIGNING<br />DIGITAL PRODUCTS
          </h2>

          <p
            className="font-['Blast_Dragon',sans-serif] text-[16px] leading-[1.6] text-[#8a8f98] opacity-80"
            style={{ maxWidth: '600px' }}
          >
            I specialize in simplifying complex systems and creating meaningful user experiences.
            I currently lead UX initiatives across fintech and enterprise platforms, collaborating
            with cross-functional teams to design scalable and impactful solutions.
          </p>

          <p
            className="font-['Kanzuri',serif] text-[17px] leading-[29px] tracking-[0.9px] text-[#8a8f98]/80"
            style={{ borderLeft: '2px solid #B30000', paddingLeft: '16px', marginTop: '8px' }}
          >
            I believe great design is not decoration.
            <br />
            It is structure. It is restraint. It is clarity.
          </p>

          <div className="flex items-center gap-[48px] mt-2 pt-8 border-t border-[#8a8f98]/10 w-full">
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col gap-1">
                <span className="font-['The_Last_Shuriken',sans-serif] text-[36px] text-[#eaeaea] leading-none">
                  {s.value}
                </span>
                <span className="font-['Blast_Dragon',sans-serif] text-[11px] text-[#8a8f98] tracking-[2px] uppercase">
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
