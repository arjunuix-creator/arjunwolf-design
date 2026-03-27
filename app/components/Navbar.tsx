'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useTheme } from './ThemeProvider';

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const navLinks = [
  { label: 'About',      hash: '#about',      sectionId: 'about'      },
  { label: 'Work',       hash: '#works',      sectionId: 'works'      },
  { label: 'Experience', hash: '#experience', sectionId: 'experience' },
  { label: 'Writing',    hash: '#writing',    sectionId: 'writing'    },
];

function SunIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
      <circle cx="7.5" cy="7.5" r="2.8" stroke="currentColor" strokeWidth="1.2"/>
      <path d="M7.5 1v1.5M7.5 12.5V14M1 7.5h1.5M12.5 7.5H14M3.1 3.1l1.1 1.1M10.8 10.8l1.1 1.1M3.1 11.9l1.1-1.1M10.8 4.2l1.1-1.1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
      <path d="M12.5 9.5c-3.6 0-6.5-2.9-6.5-6.5 0-.5.1-.9.2-1.4C3.1 2.1 1 4.6 1 7.5c0 3.6 2.9 6.5 6.5 6.5 2.9 0 5.4-2.1 6.2-4.7-.4.1-.8.2-1.2.2z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export default function Navbar() {
  const pathname  = usePathname();
  const isHome    = pathname === '/';
  const { theme, toggle } = useTheme();
  const isDark    = theme === 'dark';

  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const [activeId,  setActiveId]  = useState<string>('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMenuOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    const ids = [...navLinks.map(l => l.sectionId), 'contact'];
    const observers: IntersectionObserver[] = [];
    const visible = new Set<string>();

    const pick = () => {
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
        { rootMargin: '-20% 0px -50% 0px', threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach(o => o.disconnect());
  }, []);

  const isActive        = (sectionId: string) => activeId === sectionId;
  const isContactActive = activeId === 'contact';

  const hardNav = (hash: string) => (e: React.MouseEvent) => {
    if (!isHome) {
      e.preventDefault();
      window.location.href = `/${hash}`;
    }
  };

  const navBg     = scrolled
    ? isDark ? 'rgba(13,13,18,0.80)' : 'rgba(255,255,255,0.75)'
    : 'transparent';
  const navBorder = scrolled
    ? isDark ? '#1C1D2A' : 'rgba(229,231,235,0.6)'
    : 'transparent';
  const navShadow = scrolled
    ? isDark ? '0 1px 12px rgba(0,0,0,0.4)' : '0 1px 12px rgba(0,0,0,0.06)'
    : 'none';

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50"
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
        style={{
          background:           navBg,
          backdropFilter:       scrolled ? 'blur(16px) saturate(200%)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(16px) saturate(200%)' : 'none',
          borderBottom:         `1px solid ${navBorder}`,
          boxShadow:            navShadow,
          transition:           'background 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease',
          height:               '64px',
        }}
      >
        <div className="flex items-center justify-between w-full h-full max-w-[1200px] mx-auto px-6 md:px-8">

          {/* Logo */}
          <motion.a
            href={isHome ? '#' : '/'}
            className="shrink-0 block h-[22px] w-[22px]"
            whileHover={{ scale: 1.06 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            <Image
              src="/logo.svg"
              alt="Arjun CR Logo"
              width={22}
              height={22}
              priority
              className={`object-contain ${isDark ? 'brightness-0 invert' : 'brightness-0'}`}
            />
          </motion.a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-7">
            {navLinks.map(link => {
              const active = isActive(link.sectionId);
              const href   = isHome ? link.hash : `/${link.hash}`;
              return (
                <a
                  key={link.label}
                  href={href}
                  onClick={hardNav(link.hash)}
                  className={`relative flex items-center h-[34px] whitespace-nowrap
                    text-[13px] font-medium tracking-[1.5px] transition-all duration-200 group
                    ${active
                      ? 'text-[#B91C1C]'
                      : isDark
                        ? 'text-[#9090A8] hover:text-[#B91C1C]'
                        : 'text-[#4B5563] hover:text-[#B91C1C]'
                    }`}
                  style={{ fontFamily: "'The Last Shuriken', 'Inter', system-ui, sans-serif" }}
                >
                  {link.label}
                  {/* Animated bottom bar */}
                  <span
                    className={`absolute bottom-0 left-0 right-0 h-[1.5px] rounded-full bg-[#B91C1C]
                      transition-all duration-300 ease-out origin-left
                      ${active ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-70'}`}
                  />
                </a>
              );
            })}

            {/* Theme toggle */}
            <button
              onClick={toggle}
              aria-label="Toggle theme"
              className={`flex items-center justify-center w-[32px] h-[32px] rounded-full
                transition-all duration-200
                ${isDark
                  ? 'text-[#9090A8] hover:text-[#EDEDF5] hover:bg-white/10'
                  : 'text-[#6B7280] hover:text-[#111827] hover:bg-black/5'
                }`}
            >
              {isDark ? <SunIcon /> : <MoonIcon />}
            </button>

            <a
              href={isHome ? '#contact' : '/#contact'}
              onClick={hardNav('#contact')}
              className={`flex items-center justify-center px-5 h-[36px] rounded-[7px]
                text-[14px] font-medium whitespace-nowrap transition-all duration-200
                ${isContactActive
                  ? 'bg-[#B91C1C] text-white border border-[#B91C1C]'
                  : 'border border-[#B91C1C] text-[#B91C1C] hover:bg-[#B91C1C] hover:text-white'
                }`}
            >
              Contact
            </a>
          </div>

          {/* Mobile: toggle + hamburger */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={toggle}
              aria-label="Toggle theme"
              className={`flex items-center justify-center w-[36px] h-[36px] rounded-full
                transition-colors duration-200
                ${isDark ? 'text-[#9090A8]' : 'text-[#6B7280]'}`}
            >
              {isDark ? <SunIcon /> : <MoonIcon />}
            </button>

            <button
              className="flex flex-col justify-center items-center w-10 h-10 gap-[5px]"
              onClick={() => setMenuOpen(v => !v)}
              aria-label="Toggle menu"
            >
              <motion.span
                className={`block w-5 h-[1.5px] origin-center ${isDark ? 'bg-[#EDEDF5]' : 'bg-[#374151]'}`}
                animate={menuOpen ? { rotate: 45, y: 6.5 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.25 }}
              />
              <motion.span
                className={`block w-5 h-[1.5px] ${isDark ? 'bg-[#EDEDF5]' : 'bg-[#374151]'}`}
                animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
                transition={{ duration: 0.15 }}
              />
              <motion.span
                className={`block w-5 h-[1.5px] origin-center ${isDark ? 'bg-[#EDEDF5]' : 'bg-[#374151]'}`}
                animate={menuOpen ? { rotate: -45, y: -6.5 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.25 }}
              />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className={`fixed top-[64px] left-0 right-0 z-40 flex flex-col md:hidden border-b
              ${isDark ? 'bg-[#07080D] border-[#1C1D2A]' : 'bg-white border-[#E5E7EB]'}`}
            style={{ boxShadow: isDark ? '0 4px 16px rgba(0,0,0,0.3)' : '0 4px 16px rgba(0,0,0,0.06)' }}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: EASE }}
          >
            {navLinks.map(link => {
              const active = isActive(link.sectionId);
              const href   = isHome ? link.hash : `/${link.hash}`;
              return (
                <a
                  key={link.label}
                  href={href}
                  onClick={(e) => { hardNav(link.hash)(e); setMenuOpen(false); }}
                  className={`px-6 py-4 text-[15px] font-medium transition-colors duration-150
                    ${isDark ? 'border-b border-[#1E1F28]' : 'border-b border-[#F3F4F6]'}`}
                  style={{ color: active ? '#B91C1C' : isDark ? '#C0C0D4' : '#374151' }}
                >
                  {link.label}
                </a>
              );
            })}
            <a
              href={isHome ? '#contact' : '/#contact'}
              onClick={(e) => { hardNav('#contact')(e); setMenuOpen(false); }}
              className="px-6 py-4 text-[15px] font-medium text-[#B91C1C] transition-colors duration-150"
            >
              Contact
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
