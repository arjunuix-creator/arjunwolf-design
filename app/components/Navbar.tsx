'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const logoSrc =
  'https://www.figma.com/api/mcp/asset/96a4012b-a656-414b-81fc-f50208b3f7bb';

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const navLinks = [
  { label: 'About',      href: '#about',   sectionId: 'about'   },
  { label: 'Work',       href: '#works',   sectionId: 'works'   },
  { label: 'Experience', href: '#journey', sectionId: 'journey' },
  { label: 'Writing',    href: '#writing', sectionId: 'writing' },
];

export default function Navbar() {
  const [scrolled,   setScrolled]   = useState(false);
  const [menuOpen,   setMenuOpen]   = useState(false);
  const [activeId,   setActiveId]   = useState<string>('');

  // Scroll-past-80px → frosted glass
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on desktop resize
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMenuOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // IntersectionObserver — fires when a section crosses the middle of the viewport
  useEffect(() => {
    const ids = [...navLinks.map(l => l.sectionId), 'contact'];

    const observers: IntersectionObserver[] = [];

    // Track which sections are currently intersecting so we can pick
    // the topmost one when multiple are visible at once.
    const visible = new Set<string>();

    const pick = () => {
      // Choose the section whose element is highest on screen (smallest offsetTop)
      let best = '';
      let bestTop = Infinity;
      visible.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
          const top = el.getBoundingClientRect().top;
          if (top < bestTop) { bestTop = top; best = id; }
        }
      });
      setActiveId(best);
    };

    ids.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;

      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) visible.add(id);
          else visible.delete(id);
          pick();
        },
        {
          // Fire when the section occupies the middle 50% of the viewport
          rootMargin: '-20% 0px -50% 0px',
          threshold : 0,
        }
      );

      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach(o => o.disconnect());
  }, []);

  const isActive = (sectionId: string) => activeId === sectionId;
  const isContactActive = activeId === 'contact';

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50"
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
        style={{
          background: scrolled ? 'rgba(0,0,0,0.35)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px) saturate(160%)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(12px) saturate(160%)' : 'none',
          borderBottom: scrolled
            ? '1px solid rgba(255,255,255,0.05)'
            : '1px solid transparent',
          boxShadow: scrolled ? '0 4px 32px rgba(0,0,0,0.28)' : 'none',
          transition: 'background 0.45s ease, border-color 0.45s ease, box-shadow 0.45s ease, backdrop-filter 0.45s ease',
          height: '80px',
        }}
      >
        {/* Inner container — matches hero max-width + padding */}
        <div className="flex items-center justify-between w-full h-full max-w-[1400px] mx-auto px-6 md:px-12">

          {/* Logo */}
          <motion.a
            href="#"
            className="shrink-0 block h-[56px] w-[44px]"
            whileHover={{ scale: 1.06 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            <img
              alt="Arjun CR logo"
              className="h-full w-full object-contain mix-blend-screen"
              src={logoSrc}
            />
          </motion.a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(link => {
              const active = isActive(link.sectionId);
              return (
                <a
                  key={link.label}
                  href={link.href}
                  className="relative flex items-center h-[36px] whitespace-nowrap
                    font-['Blast_Dragon',sans-serif] text-[14px]
                    tracking-[0.08em] transition-all duration-300 group"
                  style={{
                    color  : active ? '#FF2A2A' : '#eaeaea',
                    opacity: active ? 1 : 0.6,
                    fontWeight: active ? 600 : 400,
                  }}
                >
                  {link.label}
                  {/* Underline — always full-width when active, expands on hover otherwise */}
                  <span
                    className="absolute bottom-0 left-0 h-[1px] bg-[#FF2A2A] transition-all duration-300 ease-out"
                    style={{ width: active ? '100%' : '0%' }}
                  />
                </a>
              );
            })}

            <motion.a
              href="#contact"
              className="flex items-center justify-center px-[22px] h-[38px] rounded-[7px]
                font-['Blast_Dragon',sans-serif] text-[14px] tracking-[0.06em] whitespace-nowrap
                transition-all duration-300"
              style={{
                border         : isContactActive ? '1px solid #FF2A2A' : '1px solid #B30000',
                backgroundColor: isContactActive ? '#B30000'           : 'transparent',
                color          : '#eaeaea',
                boxShadow      : isContactActive ? '0 0 12px rgba(179,0,0,0.6)' : 'none',
              }}
              whileHover={{
                backgroundColor: '#B30000',
                color          : '#ffffff',
                boxShadow      : '0 0 12px rgba(179,0,0,0.6)',
              }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
            >
              Contact
            </motion.a>
          </div>

          {/* Hamburger (mobile) */}
          <button
            className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-[5px]"
            onClick={() => setMenuOpen(v => !v)}
            aria-label="Toggle menu"
          >
            <motion.span
              className="block w-6 h-[1.5px] bg-[#eaeaea] origin-center"
              animate={menuOpen ? { rotate: 45, y: 6.5 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.25 }}
            />
            <motion.span
              className="block w-6 h-[1.5px] bg-[#eaeaea]"
              animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.15 }}
            />
            <motion.span
              className="block w-6 h-[1.5px] bg-[#eaeaea] origin-center"
              animate={menuOpen ? { rotate: -45, y: -6.5 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.25 }}
            />
          </button>
        </div>
      </motion.nav>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed top-[80px] left-0 right-0 z-40 flex flex-col md:hidden"
            style={{
              background        : 'rgba(0,0,0,0.88)',
              backdropFilter    : 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              borderBottom      : '1px solid rgba(255,255,255,0.05)',
            }}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: EASE }}
          >
            {navLinks.map(link => {
              const active = isActive(link.sectionId);
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="px-6 py-4 font-['Blast_Dragon',sans-serif] text-[15px] tracking-[0.08em]
                    border-b border-white/5 transition-all duration-200"
                  style={{
                    color     : active ? '#FF2A2A' : '#eaeaea',
                    opacity   : active ? 1 : 0.7,
                    fontWeight: active ? 600 : 400,
                  }}
                >
                  {link.label}
                </a>
              );
            })}
            <a
              href="#contact"
              onClick={() => setMenuOpen(false)}
              className="px-6 py-4 font-['Blast_Dragon',sans-serif] text-[15px] tracking-[0.08em]
                transition-colors duration-200"
              style={{ color: isContactActive ? '#ffffff' : '#FF2A2A' }}
            >
              Contact
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
