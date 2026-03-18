"use client"

export type CaseStudy = {
  id: number
  title: string
  category: string
  categoryColor: string
  description: string
  users: string
  platform: string
  meta: { role: string; duration: string; team: string; year?: string }
  imageSrc: string
  imageAlt: string
  imageBg: string
  imagePosition: "left" | "right"
  href?: string
}

import { useState } from "react"
import Link from "next/link"

type Props = { studies: CaseStudy[] }

/* ── Collapsed strip ─────────────────────────────────────────────────────── */
function CollapsedStrip({
  study,
  index,
  visible,
}: {
  study: CaseStudy
  index: number
  visible: boolean
}) {
  return (
    <div
      className="absolute inset-0 flex flex-col items-center py-7 gap-0"
      style={{
        opacity:       visible ? 1 : 0,
        transition:    "opacity 0.18s ease",
        pointerEvents: visible ? "auto" : "none",
        overflow:      "hidden",
      }}
    >
      {/* Index */}
      <span
        className="text-[11px] font-bold tracking-[2.5px] tabular-nums flex-shrink-0"
        style={{ color: "rgba(255,255,255,0.22)" }}
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      {/* Preview image — 20–30% larger than before */}
      <div
        className="mt-5 rounded-xl overflow-hidden flex-shrink-0"
        style={{
          width:               "92px",
          height:              "66px",
          backgroundColor:     study.imageBg,
          backgroundImage:     `url(${study.imageSrc})`,
          backgroundSize:      "cover",
          backgroundPosition:  "center",
          opacity:             0.88,
          border:              "1px solid rgba(255,255,255,0.1)",
        }}
      />

      {/* Rotated title */}
      <div
        className="flex-1 flex items-center justify-center mt-4"
        style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
      >
        <span
          className="text-[13px] font-semibold tracking-[0.8px] whitespace-nowrap leading-none"
          style={{
            fontFamily: "'The Last Shuriken', sans-serif",
            color:      "rgba(234,234,234,0.78)",
          }}
        >
          {study.title}
        </span>
      </div>

      {/* Category pill */}
      <span
        className="flex-shrink-0 mt-4 rounded-full text-[8.5px] font-bold tracking-[1.8px] uppercase px-2 py-[4px]"
        style={{
          background:   `${study.categoryColor}44`,
          color:        "rgba(255,255,255,0.65)",
          border:       `1px solid ${study.categoryColor}66`,
          writingMode:  "horizontal-tb",
          transform:    "none",
        }}
      >
        {study.category.split(" ")[0]}
      </span>
    </div>
  )
}

/* ── Expanded panel ──────────────────────────────────────────────────────── */
function ExpandedPanel({
  study,
  index,
  visible,
}: {
  study: CaseStudy
  index: number
  visible: boolean
}) {
  return (
    <div
      className="absolute inset-0 flex"
      style={{
        opacity:       visible ? 1 : 0,
        transition:    "opacity 0.22s ease 0.14s",
        pointerEvents: visible ? "auto" : "none",
      }}
    >
      {/* ── Left: text content ── */}
      <div
        className="flex flex-col justify-center gap-[18px] px-10 py-10 flex-shrink-0"
        style={{ width: "42%" }}
      >
        {/* Index + category */}
        <div className="flex items-center gap-3">
          <span
            className="text-[11px] font-bold tracking-[2.5px] tabular-nums"
            style={{ color: "rgba(255,255,255,0.2)" }}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          <span
            className="px-3 py-[4px] rounded-full text-[9px] font-bold tracking-[1.6px] uppercase text-white"
            style={{ background: study.categoryColor }}
          >
            {study.category}
          </span>
        </div>

        {/* Title */}
        <h3
          className="text-[#eaeaea] leading-[1.05] tracking-wide"
          style={{
            fontFamily: "'The Last Shuriken', sans-serif",
            fontSize:   "clamp(22px, 2.4vw, 32px)",
          }}
        >
          {study.title}
        </h3>

        {/* Meta row */}
        <div className="flex flex-wrap gap-x-6 gap-y-2 pt-4 border-t border-white/[0.06]">
          {[
            { label: "Role",     value: study.meta.role },
            { label: "Year",     value: study.meta.year ?? "" },
            { label: "Duration", value: study.meta.duration },
          ].map(({ label, value }) => (
            <div key={label} className="flex flex-col gap-[2px]">
              <span
                className="text-[9px] font-semibold tracking-[1.4px] uppercase"
                style={{ color: "rgba(255,255,255,0.25)" }}
              >
                {label}
              </span>
              <span
                className="text-[12px] font-medium whitespace-nowrap"
                style={{ color: "rgba(255,255,255,0.8)" }}
              >
                {value}
              </span>
            </div>
          ))}
        </div>

        {/* Description */}
        <p
          className="text-[13px] leading-[1.75]"
          style={{
            color:              "rgba(138,143,152,0.85)",
            display:            "-webkit-box",
            WebkitLineClamp:    3,
            WebkitBoxOrient:    "vertical",
            overflow:           "hidden",
          }}
        >
          {study.description}
        </p>

        {/* CTA */}
        {study.href && (
          <div onClick={e => e.stopPropagation()}>
            <Link
              href={study.href}
              className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[1.8px] uppercase transition-colors duration-200"
              style={{ color: "#D4AF37" }}
              onMouseEnter={e => { e.currentTarget.style.color = "#ffffff" }}
              onMouseLeave={e => { e.currentTarget.style.color = "#D4AF37" }}
            >
              View Case Study
              <span className="text-sm leading-none">→</span>
            </Link>
          </div>
        )}
      </div>

      {/* ── Right: image ── */}
      <div
        className="flex-1 relative overflow-hidden"
        style={{ backgroundColor: study.imageBg }}
      >
        <div className="absolute inset-y-0 left-0 w-px" style={{ background: "rgba(255,255,255,0.05)" }} />
        <div
          className="absolute inset-0 bg-contain bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${study.imageSrc})` }}
        />
      </div>
    </div>
  )
}

/* ── Mobile card ─────────────────────────────────────────────────────────── */
function MobileCard({ study, index }: { study: CaseStudy; index: number }) {
  const isPrimary = index === 0
  return (
    <div
      className="rounded-2xl overflow-hidden flex flex-col"
      style={{
        background: "#0f1115",
        border:     isPrimary
          ? "1px solid rgba(212,175,55,0.13)"
          : "1px solid rgba(255,255,255,0.05)",
        opacity: isPrimary ? 1 : 0.88,
      }}
    >
      <div
        className="w-full"
        style={{
          height:              "210px",
          backgroundColor:     study.imageBg,
          backgroundImage:     `url(${study.imageSrc})`,
          backgroundSize:      "contain",
          backgroundPosition:  "center",
          backgroundRepeat:    "no-repeat",
        }}
      />
      <div style={{ height: "1px", background: "rgba(255,255,255,0.05)" }} />
      <div className="flex flex-col gap-4 p-6">
        <div className="flex items-center gap-3">
          <span
            className="text-[11px] font-bold tracking-[2.5px] tabular-nums"
            style={{ color: "rgba(255,255,255,0.2)" }}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          <span
            className="px-3 py-[4px] rounded-full text-[9px] font-bold tracking-[1.6px] uppercase text-white"
            style={{ background: study.categoryColor }}
          >
            {study.category}
          </span>
        </div>
        <h3
          className="text-[#eaeaea] text-[22px] leading-[1.1] tracking-wide"
          style={{ fontFamily: "'The Last Shuriken', sans-serif" }}
        >
          {study.title}
        </h3>
        <div className="flex flex-wrap gap-x-5 gap-y-2 pt-3 border-t border-white/[0.06]">
          {[
            { label: "Role",     value: study.meta.role },
            { label: "Duration", value: study.meta.duration },
            { label: "Year",     value: study.meta.year ?? "" },
          ].map(({ label, value }) => (
            <div key={label} className="flex flex-col gap-[2px]">
              <span className="text-[9px] font-semibold tracking-[1.4px] uppercase" style={{ color: "rgba(255,255,255,0.25)" }}>
                {label}
              </span>
              <span className="text-[12px] font-medium" style={{ color: "rgba(255,255,255,0.75)" }}>
                {value}
              </span>
            </div>
          ))}
        </div>
        <p className="text-[13px] leading-[1.7]" style={{ color: "rgba(138,143,152,0.8)" }}>
          {study.description}
        </p>
        {study.href && (
          <Link
            href={study.href}
            className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[1.8px] uppercase mt-1"
            style={{ color: "#D4AF37" }}
          >
            View Case Study <span>→</span>
          </Link>
        )}
      </div>
    </div>
  )
}

/* ── WorksSection ────────────────────────────────────────────────────────── */
export default function WorksSection({ studies }: Props) {
  const [active, setActive] = useState(0)

  // Shared accordion transition string
  const TRANSITION = "flex 0.55s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.55s cubic-bezier(0.25, 0.46, 0.45, 0.94), box-shadow 0.45s ease, border-color 0.45s ease, opacity 0.45s ease"

  return (
    <section
      id="works"
      className="bg-[#070707] overflow-x-hidden"
    >

      {/* Section header */}
      <div className="text-center mb-14 px-6">
        <p
          className="text-[10px] font-semibold tracking-[4px] uppercase mb-3"
          style={{ color: "#D4AF37" }}
        >
          Selected Work
        </p>
        <h2
          className="text-[#eaeaea] text-[44px] leading-none mb-3"
          style={{ fontFamily: "'The Last Shuriken', sans-serif" }}
        >
          Works
        </h2>
        <p className="text-[13px] tracking-[3px] uppercase" style={{ color: "#8a8f98" }}>
          Case Studies
        </p>
      </div>

      {/* ── Desktop: horizontal accordion ── */}
      <div className="hidden md:block px-6 max-w-[1280px] mx-auto">
        <div className="flex flex-row" style={{ height: "560px", gap: "16px" }}>
          {studies.map((study, i) => {
            const isActive  = active === i
            const isPrimary = i === 0

            return (
              <div
                key={study.id}
                className="relative rounded-2xl overflow-hidden"
                style={{
                  // flex: 6 for expanded (~13% more than previous flex:5), flex:1 for collapsed
                  flex:      isActive ? 6 : 1,
                  minWidth:  0,
                  cursor:    isActive ? "default" : "pointer",
                  background: "#0f1115",
                  border:    isActive
                    ? isPrimary
                      ? "1px solid rgba(212,175,55,0.18)"
                      : "1px solid rgba(255,255,255,0.1)"
                    : "1px solid rgba(255,255,255,0.05)",
                  // scale(1.02) elevates active; z-index keeps it on top of neighbors
                  transform:  isActive ? "scale(1.02)" : "scale(1)",
                  zIndex:     isActive ? 10 : 1,
                  // opacity: full for active, reduced for inactive
                  opacity:   isActive ? 1 : 0.86,
                  boxShadow: isActive
                    ? "0 0 40px rgba(255,0,0,0.15), 0 16px 48px rgba(0,0,0,0.55)"
                    : "0 2px 12px rgba(0,0,0,0.3)",
                  transition: TRANSITION,
                }}
                // Hover on collapsed card → expand it
                onMouseEnter={() => { if (!isActive) setActive(i) }}
                onClick={() => setActive(i)}
              >
                {/* Subtle brand-color wash on collapsed cards */}
                {!isActive && (
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{ background: `${study.imageBg}15` }}
                  />
                )}

                <CollapsedStrip study={study} index={i} visible={!isActive} />
                <ExpandedPanel  study={study} index={i} visible={isActive}  />
              </div>
            )
          })}
        </div>

        {/* Hint row — mirrors accordion flex so labels stay in sync */}
        <div className="flex mt-4" style={{ gap: "16px" }}>
          {studies.map((study, i) => (
            <div
              key={study.id}
              onClick={() => setActive(i)}
              className="flex items-center gap-2 cursor-pointer"
              style={{
                flex:       active === i ? 6 : 1,
                minWidth:   0,
                overflow:   "hidden",
                opacity:    active === i ? 1 : 0.38,
                transition: "flex 0.55s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.45s ease",
              }}
            >
              <div
                className="w-[6px] h-[6px] rounded-full flex-shrink-0"
                style={{
                  backgroundColor: active === i ? "#D4AF37" : "rgba(255,255,255,0.3)",
                  transition: "background-color 0.28s ease",
                }}
              />
              <span
                className="text-[10px] font-semibold tracking-[1.8px] uppercase whitespace-nowrap overflow-hidden"
                style={{
                  color:      active === i ? "#D4AF37" : "rgba(255,255,255,0.4)",
                  transition: "color 0.28s ease",
                }}
              >
                {study.title}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Mobile: vertical stack ── */}
      <div className="md:hidden flex flex-col gap-6 px-5">
        {studies.map((study, i) => (
          <MobileCard key={study.id} study={study} index={i} />
        ))}
      </div>

      {/* View all — extra top margin for breathing room */}
      <div className="flex justify-center px-6" style={{ marginTop: "72px" }}>
        <a
          href="https://www.behance.net/arjunwolfdesigns"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-3 px-7 py-3 rounded-full text-[12px] font-semibold tracking-[2px] uppercase"
          style={{
            border:     "1px solid rgba(212,175,55,0.3)",
            color:      "#D4AF37",
            background: "rgba(212,175,55,0.04)",
            transition: "border 0.3s ease, background 0.3s ease, box-shadow 0.3s ease",
          }}
          onMouseEnter={e => {
            const el = e.currentTarget
            el.style.border     = "1px solid rgba(212,175,55,0.7)"
            el.style.background = "rgba(212,175,55,0.08)"
            el.style.boxShadow  = "0 0 24px rgba(212,175,55,0.15)"
          }}
          onMouseLeave={e => {
            const el = e.currentTarget
            el.style.border     = "1px solid rgba(212,175,55,0.3)"
            el.style.background = "rgba(212,175,55,0.04)"
            el.style.boxShadow  = ""
          }}
        >
          View All Case Studies
          <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
        </a>
      </div>

    </section>
  )
}
