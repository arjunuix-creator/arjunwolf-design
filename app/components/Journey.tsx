'use client'

import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const milestones = [
  {
    period : '2023 — Present',
    role   : 'Lead UX Designer',
    company: 'Saksoft',
    tag    : 'Leadership',
    description: 'Leading end-to-end UX strategy across high-security fintech platforms. Overseeing design systems, product vision, and cross-functional execution.',
  },
  {
    period : '2020 — 2023',
    role   : 'Senior UX Designer',
    company: 'Product Platforms',
    tag    : 'Product Design',
    description: 'Designed financial platforms and credit-score experiences at scale. Established design processes and mentored junior designers.',
  },
  {
    period : '2018 — 2020',
    role   : 'UI / UX Designer',
    company: 'Enterprise Applications',
    tag    : 'Interaction Design',
    description: 'Focused on interaction design, product flows, and user research. Built component libraries and methodologies for enterprise software.',
  },
  {
    period : '2015 — 2018',
    role   : 'UI Designer',
    company: 'Early Career',
    tag    : 'Foundation',
    description: 'Transitioned from animation into UI/UX, discovering the language of digital product through hands-on interface design work.',
  },
  {
    period : '2013 — 2015',
    role   : 'Motion Designer',
    company: 'Animation Studio',
    tag    : 'Origins',
    description: 'Began in animation — storytelling, motion, and visual narrative shaped the foundation for a career in design.',
  },
]

/* ─── Sub-component ────────────────────────────────────────────────────── */

function MilestoneCard({
  item,
  align,
}: {
  item : typeof milestones[0]
  align: 'left' | 'right'
}) {
  const isRight = align === 'right'
  return (
    /* Always left-aligned on mobile; right-aligned on desktop when isRight */
    <div className={`flex flex-col gap-3 items-start text-left ${isRight ? 'md:items-end md:text-right' : ''}`}>
      {/* Tag */}
      <span className="text-[10px] font-semibold tracking-[2.5px] uppercase text-[#D4AF37]/60">
        {item.tag}
      </span>

      {/* Role */}
      <h3
        className="text-white text-[22px] md:text-[28px] leading-[1.1]"
        style={{ fontFamily: "'The Last Shuriken', sans-serif" }}
      >
        {item.role}
      </h3>

      {/* Company · Period */}
      <div className={`flex items-center gap-2 ${isRight ? 'md:flex-row-reverse' : ''}`}>
        <span className="text-[12px] font-medium text-white/40 tracking-wide">
          {item.company}
        </span>
        <span className="w-[3px] h-[3px] rounded-full bg-white/20 flex-shrink-0" />
        <span className="text-[11px] font-bold text-[#D4AF37] tracking-[1.5px]">
          {item.period}
        </span>
      </div>

      {/* Description */}
      <p className={`text-[13px] leading-[1.75] text-white/35 md:max-w-[320px] ${isRight ? 'md:ml-auto' : ''}`}>
        {item.description}
      </p>

      {/* Connector hairline */}
      <div
        className={`h-px w-10 bg-gradient-to-r from-[#D4AF37]/30 to-transparent ${isRight ? 'md:from-transparent md:to-[#D4AF37]/30' : ''} mt-1`}
      />
    </div>
  )
}

/* ─── Main section ─────────────────────────────────────────────────────── */

export default function Journey() {
  const sectionRef  = useRef<HTMLElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)
  const lineFillRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {

      /* 1 ── Scroll-scrubbed line fill ──────────────────────────────────── */
      gsap.fromTo(
        lineFillRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: timelineRef.current,
            start  : 'top 55%',
            end    : 'bottom 60%',
            scrub  : true,
          },
        }
      )

      /* 2 ── Animate each milestone row ─────────────────────────────────── */
      const rows = gsap.utils.toArray<HTMLElement>('.milestone-row', timelineRef.current)

      rows.forEach((row, i) => {
        const card = row.querySelector<HTMLElement>('.milestone-card')
        const dot  = row.querySelector<HTMLElement>('.milestone-dot')
        const ring = row.querySelector<HTMLElement>('.milestone-ring')
        const isLeft = i % 2 === 0

        /* Card slide-in */
        if (card) {
          gsap.fromTo(
            card,
            { opacity: 0, x: isLeft ? -48 : 48, y: 20 },
            {
              opacity: 1,
              x      : 0,
              y      : 0,
              duration: 0.9,
              ease   : 'power3.out',
              scrollTrigger: {
                trigger: row,
                start  : 'top 80%',
              },
            }
          )
        }

        /* Dot pop-in + ring pulse */
        if (dot) {
          gsap.fromTo(
            dot,
            { scale: 0, opacity: 0 },
            {
              scale   : 1,
              opacity : 1,
              duration: 0.5,
              ease    : 'back.out(2)',
              scrollTrigger: {
                trigger: row,
                start  : 'top 80%',
                onEnter: () => {
                  if (ring) {
                    gsap.fromTo(
                      ring,
                      { scale: 1, opacity: 0.7 },
                      {
                        scale   : 2.8,
                        opacity : 0,
                        duration: 1.8,
                        repeat  : -1,
                        ease    : 'power2.out',
                      }
                    )
                  }
                },
              },
            }
          )
        }

        /* Active brightness — brighten card while it's in the center viewport */
        if (card) {
          ScrollTrigger.create({
            trigger      : row,
            start        : 'top 65%',
            end          : 'bottom 40%',
            onEnter      : () => gsap.to(card, { opacity: 1,   duration: 0.4 }),
            onLeave      : () => gsap.to(card, { opacity: 0.45, duration: 0.4 }),
            onEnterBack  : () => gsap.to(card, { opacity: 1,   duration: 0.4 }),
            onLeaveBack  : () => gsap.to(card, { opacity: 0.45, duration: 0.4 }),
          })
        }
      })

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="journey"
      className="bg-[#070707] w-full"
    >
      {/* ── Section header ────────────────────────────────────────────────── */}
      <div className="section-header text-center px-4">
        <p className="text-[#D4AF37] text-[10px] tracking-[5px] uppercase mb-3">
          Experience
        </p>
        <h2
          className="text-white text-[34px] sm:text-[44px] md:text-[52px] leading-none mb-4"
          style={{ fontFamily: "'The Last Shuriken', sans-serif" }}
        >
          The Journey
        </h2>
        <div className="flex items-center justify-center gap-4">
          <span className="w-12 h-px bg-gradient-to-r from-transparent to-[#D4AF37]/40" />
          <p className="text-[#8a8f98] text-[12px] tracking-[4px] uppercase">
            The Sword Path
          </p>
          <span className="w-12 h-px bg-gradient-to-l from-transparent to-[#D4AF37]/40" />
        </div>
      </div>

      {/* ── Timeline ──────────────────────────────────────────────────────── */}
      <div ref={timelineRef} className="relative max-w-[1000px] mx-auto px-4 sm:px-6">

        {/* Background line — left-6 on mobile, centered on desktop */}
        <div className="absolute left-6 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/8 to-transparent" />

        {/* Scroll-driven gold fill */}
        <div
          ref={lineFillRef}
          className="absolute left-6 md:left-1/2 md:-translate-x-px top-0 w-px origin-top"
          style={{
            height    : '100%',
            transform : 'scaleY(0)',
            background: 'linear-gradient(to bottom, #D4AF37ee, #D4AF3766, transparent)',
          }}
        />

        {/* Milestone rows */}
        <div className="flex flex-col gap-16 md:gap-24">
          {milestones.map((item, i) => {
            const isLeft = i % 2 === 0
            return (
              /* Mobile: single column with left padding for the dot/line
                 Desktop: three-column alternating layout               */
              <div key={i} className="milestone-row relative flex items-start flex-col md:flex-row pl-10 md:pl-0">

                {/* Left slot — visible (full-width) on mobile only when isLeft */}
                <div className={`
                  ${isLeft ? 'flex' : 'hidden md:flex'}
                  w-full md:w-[calc(50%-32px)] md:pr-12 md:justify-end flex-shrink-0
                `}>
                  {isLeft && (
                    <div className="milestone-card opacity-45 w-full md:max-w-[380px]">
                      <MilestoneCard item={item} align="right" />
                    </div>
                  )}
                </div>

                {/* Center dot — desktop only (GSAP targets these) */}
                <div className="hidden md:flex w-16 flex-shrink-0 justify-center pt-4">
                  <div className="relative flex items-center justify-center">
                    <div className="absolute w-8 h-8 rounded-full bg-[#D4AF37]/[0.06]" />
                    <div className="milestone-ring absolute w-3 h-3 rounded-full bg-[#D4AF37]/50" />
                    <div
                      className="milestone-dot relative w-3 h-3 rounded-full bg-[#D4AF37] z-10"
                      style={{
                        boxShadow: '0 0 12px rgba(212,175,55,0.8), 0 0 24px rgba(212,175,55,0.3)',
                        transform : 'scale(0)',
                        opacity   : 0,
                      }}
                    />
                  </div>
                </div>

                {/* Right slot — visible (full-width) on mobile only when !isLeft */}
                <div className={`
                  ${!isLeft ? 'flex' : 'hidden md:flex'}
                  w-full md:w-[calc(50%-32px)] md:pl-12 flex-shrink-0
                `}>
                  {!isLeft && (
                    <div className="milestone-card opacity-45 w-full md:max-w-[380px]">
                      <MilestoneCard item={item} align="left" />
                    </div>
                  )}
                </div>

                {/* Mobile-only dot — absolutely positioned on the left, no GSAP */}
                <div className="md:hidden absolute left-6 top-4 -translate-x-1/2 flex items-center justify-center">
                  <div className="relative flex items-center justify-center">
                    <div className="absolute w-8 h-8 rounded-full bg-[#D4AF37]/[0.06]" />
                    <div className="relative w-3 h-3 rounded-full bg-[#D4AF37] z-10"
                      style={{ boxShadow: '0 0 12px rgba(212,175,55,0.8), 0 0 24px rgba(212,175,55,0.3)' }}
                    />
                  </div>
                </div>

              </div>
            )
          })}
        </div>

        {/* End cap */}
        <div className="flex justify-center mt-16">
          <div className="w-px h-16 bg-gradient-to-b from-[#D4AF37]/30 to-transparent" />
        </div>
      </div>
    </section>
  )
}
