'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const logoSrc =
  'https://www.figma.com/api/mcp/asset/96a4012b-a656-414b-81fc-f50208b3f7bb';

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const navLinks = [
  { label: 'Works',      href: '#works'      },
  { label: 'About',      href: '#about'      },
  { label: 'Journey',    href: '#journey'    },
  { label: 'Philosophy', href: '#japanese-habits' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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
            {navLinks.map(link => (
              <a
                key={link.label}
                href={link.href}
                className="relative flex items-center h-[36px] whitespace-nowrap
                  font-['Blast_Dragon',sans-serif] text-[14px] text-[#eaeaea]
                  tracking-[0.08em] opacity-60 hover:opacity-100 hover:text-[#FF2A2A]
                  transition-all duration-300 group"
              >
                {link.label}
                <span
                  className="absolute bottom-0 left-0 h-[1px] w-0 bg-[#FF2A2A]
                    group-hover:w-full transition-all duration-300 ease-out"
                />
              </a>
            ))}

            <motion.a
              href="#contact"
              className="flex items-center justify-center px-[22px] h-[38px] rounded-[7px]
                font-['Blast_Dragon',sans-serif] text-[14px] tracking-[0.06em] whitespace-nowrap"
              style={{
                border: '1px solid #B30000',
                backgroundColor: 'transparent',
                color: '#eaeaea',
              }}
              whileHover={{
                backgroundColor: '#B30000',
                color: '#ffffff',
                boxShadow: '0 0 12px rgba(179,0,0,0.6)',
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
              background: 'rgba(0,0,0,0.88)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              borderBottom: '1px solid rgba(255,255,255,0.05)',
            }}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: EASE }}
          >
            {navLinks.map(link => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="px-6 py-4 font-['Blast_Dragon',sans-serif] text-[15px] tracking-[0.08em]
                  text-[#eaeaea] opacity-70 hover:opacity-100 hover:text-[#FF2A2A]
                  border-b border-white/5 transition-all duration-200"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setMenuOpen(false)}
              className="px-6 py-4 font-['Blast_Dragon',sans-serif] text-[15px] tracking-[0.08em]
                text-[#FF2A2A] hover:text-[#eaeaea] transition-colors duration-200"
            >
              Contact
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
