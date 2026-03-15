"use client"

export type CaseStudy = {
  id: number
  title: string
  category: string
  categoryColor: string
  description: string
  users: string
  platform: string
  meta: {
    role: string
    duration: string
    team: string
    year?: string
  }
  imageSrc: string
  imageAlt: string
  imageBg: string
  imagePosition: "left" | "right"
  href: string
}


import { useRef, useEffect, useState } from "react"
import Link from "next/link"
import MagneticButton from "./MagneticButton"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)


type Props = {
  studies: CaseStudy[]
}

function MetaItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-[3px]">
      <span className="text-[10px] font-semibold tracking-[1.2px] uppercase text-white/30">
        {label}
      </span>
      <span className="text-[13px] font-medium text-white/90 whitespace-nowrap">
        {value}
      </span>
    </div>
  )
}

function StudyCard({ study, index }: { study: CaseStudy; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const imgRef  = useRef<HTMLDivElement>(null)

  // ── Hover: lift + glow (pointer devices) ────────────────────────────────
  const onEnter = () => {
    const card = cardRef.current
    if (!card) return
    gsap.to(card, { scale: 1.02, duration: 0.45, ease: "power2.out" })
    card.style.boxShadow = `0 0 0 1px rgba(255,255,255,0.06), 0 0 60px rgba(255,255,255,0.08), 0 0 120px rgba(212,175,55,0.12), 0 48px 100px rgba(0,0,0,0.7)`
  }

  const onLeave = () => {
    const card = cardRef.current
    const img  = imgRef.current
    if (!card) return
    gsap.to(card, { scale: 1, duration: 0.45, ease: "power2.out" })
    card.style.boxShadow = "0 32px 80px rgba(0,0,0,0.5)"
    if (img) gsap.to(img, { x: 0, y: 0, duration: 0.6, ease: "power2.out" })
  }

  // ── Touch: subtle press feedback (mobile) ───────────────────────────────
  const onTouchStart = () => {
    const card = cardRef.current
    if (!card) return
    gsap.to(card, { scale: 0.98, duration: 0.2, ease: "power2.out" })
  }

  const onTouchEnd = () => {
    const card = cardRef.current
    if (!card) return
    gsap.to(card, { scale: 1, duration: 0.2, ease: "power2.out" })
  }

  // ── Hover: image parallax ───────────────────────────────────────────────
  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current
    const img  = imgRef.current
    if (!card || !img) return
    const r  = card.getBoundingClientRect()
    const dx = ((e.clientX - r.left) / r.width  - 0.5) * 2   // -1 → +1
    const dy = ((e.clientY - r.top)  / r.height - 0.5) * 2   // -1 → +1
    gsap.to(img, { x: dx * -14, y: dy * -8, duration: 0.5, ease: "power2.out" })
  }

  const imagePanel = (
    /* order-first keeps image on top on mobile regardless of imageRight DOM order */
    <div className="order-first md:order-none w-full h-[240px] md:h-auto md:w-[55%] flex-shrink-0 relative overflow-hidden">
      {/* Parallax target — slightly oversized so edges stay covered */}
      <div
        ref={imgRef}
        className="absolute inset-[-4%] bg-cover bg-center"
        style={{
          backgroundColor: study.imageBg,
          backgroundImage: `url(${study.imageSrc})`,
        }}
      />
      {/* Desktop: right-edge gradient; Mobile: bottom-edge gradient */}
      <div className="hidden md:block absolute inset-y-0 right-0 w-32 bg-gradient-to-r from-[#14171c]/0 to-[#14171c] pointer-events-none" />
      <div className="md:hidden absolute inset-x-0 bottom-0 h-16 bg-gradient-to-b from-[#14171c]/0 to-[#14171c] pointer-events-none" />
    </div>
  )

  const contentPanel = (
    <div className="w-full md:w-[45%] flex flex-col justify-center px-5 py-6 md:px-16 gap-3 md:gap-5 flex-shrink-0 overflow-y-auto">
      <span
        className="px-4 py-[6px] rounded-full text-[11px] font-semibold tracking-[1.6px] uppercase text-white w-fit"
        style={{ background: study.categoryColor }}
      >
        {study.category}
      </span>

      <h3
        className="text-white text-[22px] md:text-[30px] leading-[1.15] tracking-wide"
        style={{ fontFamily: "'The Last Shuriken', sans-serif" }}
      >
        {study.title}
      </h3>

      <div className="flex gap-4 md:gap-6 items-start pt-1 border-t border-white/[0.06] overflow-x-auto scrollbar-hidden">
       <MetaItem label="Role" value={study.meta.role} />
       <MetaItem label="Duration" value={study.meta.duration} />
       <MetaItem label="Team" value={study.meta.team} />
       <MetaItem label="Year" value={study.meta.year ?? ""} />
      </div>

      <p className="text-[13px] leading-[1.7] text-white/50 md:max-w-[380px]">
        {study.description}
      </p>

      <div className="flex flex-col gap-3 pt-1 border-t border-white/[0.06]">
        <div className="flex flex-col gap-[3px]">
          <span className="text-[10px] font-semibold tracking-[1.2px] uppercase text-white/30">Users</span>
          <span className="text-[13px] font-medium text-white/80">{study.users}</span>
        </div>
        <div className="flex flex-col gap-[3px]">
          <span className="text-[10px] font-semibold tracking-[1.2px] uppercase text-white/30">Platform</span>
          <span className="text-[13px] font-medium text-white/80">{study.platform}</span>
        </div>
      </div>

      <div className="pt-1">
        <MagneticButton maxShift={5}>
          <Link
            href={study.href}
            className="inline-flex items-center gap-2 text-[12px] font-semibold tracking-[1.4px] uppercase text-[#D4AF37]"
          >
            View Case Study <span className="text-base leading-none">→</span>
          </Link>
        </MagneticButton>
      </div>
    </div>
  )

  return (
    <div
      ref={cardRef}
      className="case-card w-full max-w-[1400px] mx-auto bg-[#14171c] rounded-[20px] md:rounded-[24px] flex flex-col md:flex-row overflow-hidden md:h-[720px]"
      style={{ boxShadow: "0 32px 80px rgba(0,0,0,0.5)" }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onMouseMove={onMove}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onTouchCancel={onTouchEnd}
    >
      {study.imagePosition === "right" ? (
  <>{contentPanel}{imagePanel}</>
) : (
  <>{imagePanel}{contentPanel}</>
)}
    </div>
  )
}

export default function WorksSection({ studies }: Props) {
  const sectionRef  = useRef<HTMLElement>(null)
  const stackRef    = useRef<HTMLDivElement>(null)
  const stepperRef  = useRef<HTMLDivElement>(null)
  const dotsRef     = useRef<HTMLDivElement>(null)

  // isMobile starts false (SSR-safe) and is set after mount
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  useEffect(() => {
    // Kill any existing ScrollTriggers when switching to mobile
    if (isMobile) {
      ScrollTrigger.getAll().forEach(t => t.kill())
      return
    }

    const ctx = gsap.context(() => {
      const wrappers = gsap.utils.toArray<HTMLElement>(".stack-wrapper", stackRef.current)
      const steps    = gsap.utils.toArray<HTMLElement>(".case-step",     stepperRef.current)
      const dots     = gsap.utils.toArray<HTMLElement>(".progress-dot",  dotsRef.current)
      if (wrappers.length < 2) return

      gsap.set(wrappers.slice(1), { yPercent: 100 })
      gsap.set(wrappers, { scale: 1, transformOrigin: "top center" })

      // Initialise stepper + dots — first step active
      const setActive = (active: number) => {
        steps.forEach((step, i) => {
          const num   = step.querySelector<HTMLElement>(".step-num")
          const label = step.querySelector<HTMLElement>(".step-label")
          const isActive = i === active
          gsap.to(step,  { opacity: isActive ? 1   : 0.3,  duration: 0.3, ease: "power2.out" })
          if (num)   gsap.to(num,   { color: isActive ? "#D4AF37" : "#ffffff", duration: 0.3 })
          if (label) gsap.to(label, { color: isActive ? "#ffffff" : "#ffffff", duration: 0.3 })
        })
        dots.forEach((dot, i) => {
          const isActive = i === active
          gsap.to(dot, {
            scale:   isActive ? 1   : 0.5,
            opacity: isActive ? 1   : 0.35,
            backgroundColor: isActive ? "#D4AF37" : "#ffffff",
            duration: 0.35,
            ease: "power2.out",
          })
        })
      }
      setActive(0)

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${(wrappers.length - 1) * window.innerHeight}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const active = Math.min(
              Math.round(self.progress * (wrappers.length - 1)),
              wrappers.length - 1
            )
            setActive(active)
          },
        },
      })

      wrappers.slice(1).forEach((wrapper, idx) => {
        tl.to(wrapper, { yPercent: 0, ease: "power2.inOut", duration: 1 }, idx)

        for (let j = 0; j <= idx; j++) {
          const depth = idx + 1 - j
          tl.to(wrappers[j], {
            scale: 1 - 0.04 * depth,
            ease: "power2.inOut",
            duration: 1,
          }, idx)
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [isMobile])

  const viewAllButton = (
    <div className="flex-shrink-0 flex justify-center items-center py-5 z-50 px-5 md:px-0">
      <a
        href="https://www.behance.net/arjunwolfdesigns"
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-3 px-7 py-3 rounded-full text-[12px] font-semibold tracking-[2px] uppercase transition-all duration-300"
        style={{
          border:      '1px solid rgba(212,175,55,0.3)',
          color:       '#D4AF37',
          background:  'rgba(212,175,55,0.04)',
          boxShadow:   '0 0 0px rgba(212,175,55,0)',
        }}
        onMouseEnter={e => {
          const el = e.currentTarget
          el.style.border     = '1px solid rgba(212,175,55,0.7)'
          el.style.background = 'rgba(212,175,55,0.08)'
          el.style.boxShadow  = '0 0 24px rgba(212,175,55,0.15)'
        }}
        onMouseLeave={e => {
          const el = e.currentTarget
          el.style.border     = '1px solid rgba(212,175,55,0.3)'
          el.style.background = 'rgba(212,175,55,0.04)'
          el.style.boxShadow  = '0 0 0px rgba(212,175,55,0)'
        }}
      >
        View All Case Studies
        <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
      </a>
    </div>
  )

  const sectionHeader = (
    <div className="section-header text-center flex-shrink-0 !mb-0 pb-6 px-5 md:px-0">
      <p className="text-[#D4AF37] text-[10px] tracking-[4px] uppercase mb-2">
        Selected Work
      </p>
      <h2
        className="text-white text-[44px] leading-none"
        style={{ fontFamily: "'The Last Shuriken', sans-serif" }}
      >
        Works
      </h2>
      <p className="text-[#8a8f98] text-[13px] tracking-[3px] uppercase mt-2">
        Case Studies
      </p>
    </div>
  )

  // ── Mobile layout: normal vertical cards, no GSAP pinning ───────────────
  if (isMobile) {
    return (
      <section
        ref={sectionRef}
        id="works"
        className="bg-[#070707] flex flex-col overflow-x-hidden"
      >
        {sectionHeader}
        <div className="w-full mx-auto flex flex-col gap-10 px-5 pb-6">
          {studies.map((study, i) => (
            <StudyCard key={study.id} study={study} index={i} />
          ))}
        </div>
        {viewAllButton}
      </section>
    )
  }

  // ── Desktop layout: stacked scroll animation ─────────────────────────────
  return (
    <section
      ref={sectionRef}
      id="works"
      className="bg-[#070707] flex flex-col overflow-x-hidden"
      style={{ height: "100vh" }}
    >
      {sectionHeader}

      {/* Stepper */}
      <div
        ref={stepperRef}
        className="flex items-center justify-center gap-5 pb-6 flex-shrink-0
          overflow-x-auto scrollbar-hidden px-5 whitespace-nowrap"
      >
        {studies.map((study, i) => (
          <div key={study.id} className="flex items-center gap-5">
            <div className="case-step flex items-center gap-2 opacity-30">
              <span className="step-num text-[11px] font-bold tracking-[2px] text-white">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="step-label text-[11px] font-medium tracking-[2px] uppercase text-white">
                {study.title}
              </span>
            </div>
            {i < studies.length - 1 && (
              <span className="text-white/20 text-[8px]">●</span>
            )}
          </div>
        ))}
      </div>

      <div ref={stackRef} className="stack-area relative flex-1 overflow-hidden">
        {studies.map((study, i) => (
          <div
            key={study.id}
            className="stack-wrapper absolute inset-0 flex items-center justify-center px-6 py-0"
            style={{ zIndex: i + 1 }}
          >
            <StudyCard study={study} index={i} />
          </div>
        ))}

        {/* Side progress dots */}
        <div
          ref={dotsRef}
          className="progress-dots absolute right-6 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-50"
        >
          {studies.map((_, i) => (
            <div
              key={i}
              className="progress-dot w-[7px] h-[7px] rounded-full bg-white"
              style={{ opacity: 0.35, scale: "0.5" }}
            />
          ))}
        </div>
      </div>

      {viewAllButton}
    </section>
  )
}
