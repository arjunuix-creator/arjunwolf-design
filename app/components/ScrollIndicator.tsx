'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const SECTIONS = [
  { id: 'hero',            label: 'Hero'         },
  { id: 'works',           label: 'Works'        },
  { id: 'journey',         label: 'Journey'      },
  { id: 'skills',          label: 'Capabilities' },
  { id: 'japanese-habits', label: 'Philosophy'   },
  { id: 'contact',         label: 'Contact'      },
]

const easing: [number, number, number, number] = [0.22, 1, 0.36, 1]

export default function ScrollIndicator() {
  const [activeId, setActiveId] = useState<string>('')
  const [show,     setShow]     = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      setShow(scrollY > window.innerHeight * 0.4)

      /* Scroll-position based detection — works with GSAP-pinned sections */
      let current = SECTIONS[0].id
      for (const { id } of SECTIONS) {
        const el = document.getElementById(id)
        if (!el) continue
        /* offsetTop relative to document — not affected by GSAP pin transforms */
        const top = el.getBoundingClientRect().top + scrollY
        if (scrollY >= top - window.innerHeight * 0.45) {
          current = id
        }
      }
      setActiveId(current)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    // Route through Lenis — never use native scrollIntoView alongside Lenis
    window.dispatchEvent(
      new CustomEvent('lenis:scrollTo', { detail: { target: el } })
    );
  }

  /* Only render on large screens via CSS — avoids SSR mismatch */
  return (
    <AnimatePresence>
      {show && (
        <motion.nav
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.5, ease: easing }}
          aria-label="Section navigation"
          className="fixed right-16 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col items-end gap-[22px]"
        >
          {/* Vertical rail */}
          <div className="absolute right-[3.5px] top-0 bottom-0 w-px bg-[#E5E7EB] rounded-full" />

          {SECTIONS.map(({ id, label }) => {
            const isActive = activeId === id

            return (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                aria-label={`Navigate to ${label}`}
                className="group relative flex items-center gap-[10px] cursor-pointer"
              >
                {/* Label — slides in from right on hover / always visible when active */}
                <motion.span
                  animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : 4 }}
                  whileHover={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  className={`
                    text-[9px] font-semibold tracking-[2.5px] uppercase select-none
                    ${isActive ? 'text-[#B91C1C]' : 'text-[#6B7280]'}
                  `}
                >
                  {label}
                </motion.span>

                {/* Dot */}
                <motion.span
                  animate={
                    isActive
                      ? { width: 8, height: 8, backgroundColor: '#B91C1C' }
                      : { width: 5, height: 5, backgroundColor: '#D1D5DB' }
                  }
                  whileHover={{ backgroundColor: '#9CA3AF', scale: 1.3 }}
                  transition={{ duration: 0.3, ease: easing }}
                  className="rounded-full flex-shrink-0"
                  style={
                    isActive
                      ? { boxShadow: '0 0 0 3px rgba(185,28,28,0.12), 0 0 14px rgba(185,28,28,0.25)' }
                      : undefined
                  }
                />
              </button>
            )
          })}
        </motion.nav>
      )}
    </AnimatePresence>
  )
}
