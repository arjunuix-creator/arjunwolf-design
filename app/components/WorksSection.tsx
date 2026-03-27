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
import { useTheme } from "./ThemeProvider"

type Props = { studies: CaseStudy[] }

/* ── Collapsed strip ─────────────────────────────────────────────────────── */
function CollapsedStrip({
  study,
  index,
  visible,
  isDark,
}: {
  study: CaseStudy
  index: number
  visible: boolean
  isDark: boolean
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
        className="text-[11px] font-semibold tracking-[2.5px] tabular-nums flex-shrink-0"
        style={{ color: isDark ? "rgba(237,237,245,0.3)" : "rgba(17,24,39,0.3)" }}
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      {/* Preview image */}
      <div
        className="mt-5 rounded-lg overflow-hidden flex-shrink-0"
        style={{
          width:               "88px",
          height:              "62px",
          backgroundColor:     study.imageBg,
          backgroundImage:     `url(${study.imageSrc})`,
          backgroundSize:      "cover",
          backgroundPosition:  "center",
          opacity:             0.9,
          border:              `1px solid ${isDark ? "#1C1D2A" : "#E5E7EB"}`,
        }}
      />

      {/* Rotated title */}
      <div
        className="flex-1 flex items-center justify-center mt-4"
        style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
      >
        <span
          className="text-[13px] font-semibold tracking-[0.5px] whitespace-nowrap leading-none text-[#374151]"
        >
          {study.title}
        </span>
      </div>

      {/* Category pill */}
      <span
        className="flex-shrink-0 mt-4 rounded-full text-[8px] font-semibold tracking-[1.5px] uppercase px-2 py-[4px]
          bg-[#F3F4F6] text-[#6B7280] border border-[#E5E7EB]"
        style={{ writingMode: "horizontal-tb" }}
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
  isDark,
}: {
  study: CaseStudy
  index: number
  visible: boolean
  isDark: boolean
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
      {/* Left: text content */}
      <div
        className="flex flex-col justify-center gap-5 px-9 py-9 flex-shrink-0"
        style={{ width: "42%" }}
      >
        {/* Index + category */}
        <div className="flex items-center gap-3">
          <span
            className="text-[11px] font-semibold tracking-[2.5px] tabular-nums text-[#9CA3AF]"
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          <span
            className="px-2.5 py-[3px] rounded-full text-[9px] font-semibold tracking-[1.4px] uppercase text-white"
            style={{ backgroundColor: study.categoryColor }}
          >
            {study.category}
          </span>
        </div>

        {/* Title */}
        <h3
          className="font-bold text-[#111827] leading-tight tracking-tight"
          style={{ fontSize: "clamp(20px, 2.2vw, 28px)" }}
        >
          {study.title}
        </h3>

        {/* Meta row */}
        <div className="flex flex-wrap gap-x-6 gap-y-2 pt-4 border-t border-[#E5E7EB]">
          {[
            { label: "Role",     value: study.meta.role },
            { label: "Year",     value: study.meta.year ?? "" },
            { label: "Duration", value: study.meta.duration },
          ].map(({ label, value }) => (
            <div key={label} className="flex flex-col gap-[3px]">
              <span className="text-[9px] font-semibold tracking-[1.4px] uppercase text-[#9CA3AF]">
                {label}
              </span>
              <span className="text-[12px] font-medium text-[#374151] whitespace-nowrap">
                {value}
              </span>
            </div>
          ))}
        </div>

        {/* Description */}
        <p
          className="text-[13px] leading-[1.7] text-[#6B7280]"
          style={{
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
              className="inline-flex items-center gap-2 text-[12px] font-semibold text-[#B91C1C]
                tracking-[1px] uppercase transition-all duration-200 hover:text-[#991B1B]
                hover:-translate-y-[1px] group"
            >
              View Case Study
              <span className="text-sm leading-none inline-block transition-transform duration-200 group-hover:translate-x-[4px]">→</span>
            </Link>
          </div>
        )}
      </div>

      {/* Right: image */}
      <div
        className="flex-1 relative overflow-hidden"
        style={{ backgroundColor: isDark ? '#0E0F16' : study.imageBg }}
      >
        <div className="absolute inset-y-0 left-0 w-px" style={{ backgroundColor: isDark ? '#1C1D2A' : '#E5E7EB' }} />
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 ease-out"
          style={{
            backgroundImage: `url(${study.imageSrc})`,
            transform: visible ? 'scale(1.03)' : 'scale(1)',
          }}
        />
      </div>
    </div>
  )
}

/* ── Mobile card ─────────────────────────────────────────────────────────── */
function MobileCard({ study, index, isDark }: { study: CaseStudy; index: number; isDark: boolean }) {
  return (
    <div
      className="group rounded-xl overflow-hidden flex flex-col border border-[#E5E7EB] bg-white
        transition-all duration-[250ms] ease-out hover:scale-[1.02] hover:shadow-[0_12px_32px_rgba(0,0,0,0.09)] hover:border-[#D1D5DB]"
    >
      <div
        className="w-full overflow-hidden"
        style={{ height: "200px", backgroundColor: isDark ? '#0E0F16' : study.imageBg }}
      >
        <div
          className="w-full h-full transition-transform duration-500 ease-out group-hover:scale-[1.04]"
          style={{
            backgroundImage:    `url(${study.imageSrc})`,
            backgroundSize:     "cover",
            backgroundPosition: "center",
            backgroundRepeat:   "no-repeat",
          }}
        />
      </div>
      <div className="h-px bg-[#E5E7EB]" />
      <div className="flex flex-col gap-4 p-6">
        <div className="flex items-center gap-3">
          <span className="text-[11px] font-semibold tracking-[2.5px] tabular-nums text-[#9CA3AF]">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span
            className="px-2.5 py-[3px] rounded-full text-[9px] font-semibold tracking-[1.4px] uppercase text-white"
            style={{ backgroundColor: study.categoryColor }}
          >
            {study.category}
          </span>
        </div>
        <h3 className="text-[20px] font-bold text-[#111827] leading-snug">
          {study.title}
        </h3>
        <div className="flex flex-wrap gap-x-5 gap-y-2 pt-3 border-t border-[#E5E7EB]">
          {[
            { label: "Role",     value: study.meta.role },
            { label: "Duration", value: study.meta.duration },
            { label: "Year",     value: study.meta.year ?? "" },
          ].map(({ label, value }) => (
            <div key={label} className="flex flex-col gap-[3px]">
              <span className="text-[9px] font-semibold tracking-[1.4px] uppercase text-[#9CA3AF]">
                {label}
              </span>
              <span className="text-[12px] font-medium text-[#374151]">
                {value}
              </span>
            </div>
          ))}
        </div>
        <p className="text-[13px] leading-[1.7] text-[#6B7280]">
          {study.description}
        </p>
        {study.href && (
          <Link
            href={study.href}
            className="inline-flex items-center gap-2 text-[12px] font-semibold text-[#B91C1C]
              tracking-[1px] uppercase mt-1 hover:text-[#991B1B]
              transition-all duration-200 hover:-translate-y-[1px] group"
          >
            View Case Study
            <span className="inline-block transition-transform duration-200 group-hover:translate-x-[4px]">→</span>
          </Link>
        )}
      </div>
    </div>
  )
}

/* ── WorksSection ────────────────────────────────────────────────────────── */
export default function WorksSection({ studies }: Props) {
  const [active, setActive] = useState(0)
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  const TRANSITION = "flex 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94), box-shadow 0.4s ease, border-color 0.4s ease, opacity 0.4s ease"

  const panelBg   = isDark ? "#07080D" : "#FFFFFF"
  const gapColor  = isDark ? "#1C1D2A" : "#E5E7EB"
  const dotInactive = isDark ? "#3A3A50" : "#D1D5DB"
  const hintInactive = isDark ? "#52526A" : "#9CA3AF"

  return (
    <section id="works" className="bg-white overflow-x-hidden">

      {/* Section header */}
      <div className="text-center mb-12 px-6">
        <p className="text-[12px] font-semibold tracking-[3px] uppercase text-[#B91C1C] mb-3">
          Selected Work
        </p>
        <h2 className="text-[36px] sm:text-[44px] font-bold text-[#111827] leading-tight mb-3">
          Case Studies
        </h2>
        <p className="text-[16px] text-[#6B7280] leading-[1.7] max-w-[480px] mx-auto">
          End-to-end design work across fintech, logistics, healthcare, and SaaS.
        </p>
      </div>

      {/* Desktop: horizontal accordion */}
      <div className="hidden md:block px-6 max-w-[1300px] mx-auto">
        <div
          className="flex flex-row border rounded-xl overflow-hidden"
          style={{ height: "620px", gap: "2px", backgroundColor: gapColor, borderColor: gapColor }}
        >
          {studies.map((study, i) => {
            const isActive = active === i

            return (
              <div
                key={study.id}
                className="relative overflow-hidden"
                style={{
                  flex:       isActive ? 6 : 1,
                  minWidth:   0,
                  cursor:     isActive ? "default" : "pointer",
                  zIndex:     isActive ? 10 : 1,
                  opacity:    isActive ? 1 : 0.92,
                  backgroundColor: panelBg,
                  transition: TRANSITION,
                }}
                onMouseEnter={() => { if (!isActive) setActive(i) }}
                onClick={() => setActive(i)}
              >
                <CollapsedStrip study={study} index={i} visible={!isActive} isDark={isDark} />
                <ExpandedPanel  study={study} index={i} visible={isActive} isDark={isDark} />
              </div>
            )
          })}
        </div>

        {/* Hint row */}
        <div className="flex mt-3" style={{ gap: "2px" }}>
          {studies.map((study, i) => (
            <div
              key={study.id}
              onClick={() => setActive(i)}
              className={`flex items-center gap-2 cursor-pointer py-2 ${active === i ? "justify-start" : "justify-center"}`}
              style={{
                flex:       active === i ? 6 : 1,
                minWidth:   0,
                overflow:   "hidden",
                opacity:    active === i ? 1 : 0.4,
                transition: "flex 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.4s ease",
              }}
            >
              <div
                className="w-[5px] h-[5px] rounded-full flex-shrink-0"
                style={{
                  backgroundColor: active === i ? "#B91C1C" : dotInactive,
                  transition: "background-color 0.25s ease",
                }}
              />
              <span
                className="text-[10px] font-semibold tracking-[1.5px] uppercase whitespace-nowrap overflow-hidden"
                style={{
                  color:      active === i ? "#B91C1C" : hintInactive,
                  transition: "color 0.25s ease",
                }}
              >
                {study.title}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile: vertical stack */}
      <div className="md:hidden flex flex-col gap-6 px-5">
        {studies.map((study, i) => (
          <MobileCard key={study.id} study={study} index={i} isDark={isDark} />
        ))}
      </div>

      {/* View all */}
      <div className="flex justify-center px-6 mt-14">
        <a
          href="https://www.behance.net/arjunwolfdesigns"
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-3 px-6 py-3 rounded-full text-[13px] font-semibold
            border border-[#E5E7EB] text-[#374151] bg-white
            hover:border-[#B91C1C] hover:text-[#B91C1C]
            hover:-translate-y-[3px] hover:shadow-[0_8px_24px_rgba(185,28,28,0.12)]
            active:translate-y-0 transition-all duration-200 ease-out"
        >
          View All Case Studies
          <span className="inline-block transition-transform duration-200 group-hover:translate-x-[5px]">→</span>
        </a>
      </div>

    </section>
  )
}
