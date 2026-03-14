'use client'

import { useRef, useEffect, useState, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/* ─────────────────────────────────────────────────────────────────────────────
   CAPABILITY DATA
───────────────────────────────────────────────────────────────────────────── */

const pillars = [
  {
    index: '01',
    category: 'UX Strategy',
    tagline: 'Research-led design that starts with understanding people.',
    items: [
      { name: 'User Research & Insights',  desc: 'Discover real user behavior and unmet needs'        },
      { name: 'Information Architecture',  desc: 'Structure content for intuitive navigation'          },
      { name: 'Journey Mapping',           desc: 'Visualize end-to-end user experiences'               },
      { name: 'Experience Audits',         desc: 'Identify friction and improvement opportunities'     },
    ],
  },
  {
    index: '02',
    category: 'Product Design',
    tagline: 'Crafting interfaces that are intuitive, elegant, and scalable.',
    items: [
      { name: 'Interaction Design',        desc: 'Craft flows that feel effortless and intentional'    },
      { name: 'Visual Interface Design',   desc: 'Build interfaces that communicate at a glance'       },
      { name: 'Design Systems',            desc: 'Scale consistency across products and teams'         },
      { name: 'Prototyping & Validation',  desc: 'Test ideas before a single line of code is written'  },
    ],
  },
  {
    index: '03',
    category: 'Product Thinking',
    tagline: 'Connecting design decisions to business and user value.',
    items: [
      { name: 'Problem Framing',           desc: 'Define the right problem before designing solutions' },
      { name: 'Stakeholder Alignment',     desc: 'Build consensus across teams and leadership'         },
      { name: 'MVP Definition',            desc: 'Focus on what matters most for early value'          },
      { name: 'Product Roadmapping',       desc: 'Translate vision into actionable milestones'         },
    ],
  },
  {
    index: '04',
    category: 'Leadership',
    tagline: 'Growing design culture, teams, and cross-functional trust.',
    items: [
      { name: 'Design Leadership',              desc: 'Set direction, standards, and design culture'    },
      { name: 'Cross-functional Collaboration', desc: 'Partner with product, engineering, and business' },
      { name: 'Workshop Facilitation',          desc: 'Drive alignment and ideation with teams'         },
      { name: 'Mentoring Designers',            desc: 'Grow design talent and build team capability'    },
    ],
  },
]

/* ─────────────────────────────────────────────────────────────────────────────
   TOOL ICONS — clean inline SVGs
───────────────────────────────────────────────────────────────────────────── */

function IconFigma({ color }: { color: string }) {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <rect x="6" y="2" width="10" height="10" rx="5" fill={color} opacity="0.85"/>
      <rect x="16" y="2" width="10" height="10" rx="3" fill={color} opacity="0.5"/>
      <rect x="6" y="12" width="10" height="10" rx="3" fill={color} opacity="0.65"/>
      <circle cx="21" cy="17" r="5" fill={color} opacity="0.4"/>
      <rect x="6" y="22" width="10" height="8" rx="4" fill={color} opacity="0.5"/>
    </svg>
  )
}

function IconFigJam({ color }: { color: string }) {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <rect x="3" y="5" width="26" height="20" rx="3" stroke={color} strokeWidth="1.5" opacity="0.6"/>
      <rect x="9" y="10" width="6" height="6" rx="1.5" fill={color} opacity="0.7"/>
      <rect x="18" y="10" width="6" height="6" rx="1.5" fill={color} opacity="0.5"/>
      <rect x="9" y="19" width="14" height="2" rx="1" fill={color} opacity="0.35"/>
      <line x1="16" y1="1" x2="16" y2="5" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.5"/>
    </svg>
  )
}

function IconFramer({ color }: { color: string }) {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <path d="M6 4h20v10H16L6 4z" fill={color} opacity="0.85"/>
      <path d="M6 14h10l10 10H6V14z" fill={color} opacity="0.55"/>
      <path d="M6 24l10-10v14H6V24z" fill={color} opacity="0.35"/>
    </svg>
  )
}

function IconSpline({ color }: { color: string }) {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <ellipse cx="16" cy="16" rx="13" ry="6" stroke={color} strokeWidth="1.5" opacity="0.5"/>
      <circle cx="16" cy="16" r="7" fill={color} opacity="0.25"/>
      <circle cx="16" cy="16" r="3.5" fill={color} opacity="0.75"/>
      <ellipse cx="16" cy="16" rx="13" ry="13" stroke={color} strokeWidth="1" opacity="0.2"/>
    </svg>
  )
}

function IconClaudeAI({ color }: { color: string }) {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <path d="M16 4L28 26H4L16 4z" stroke={color} strokeWidth="1.5" opacity="0.6" fill="none"/>
      <path d="M10 20h12" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.8"/>
      <circle cx="16" cy="14" r="2.5" fill={color} opacity="0.75"/>
      <path d="M16 4 C 10 12, 8 18, 10 22" stroke={color} strokeWidth="1" opacity="0.3"/>
      <path d="M16 4 C 22 12, 24 18, 22 22" stroke={color} strokeWidth="1" opacity="0.3"/>
    </svg>
  )
}

function IconChatGPT({ color }: { color: string }) {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="12" stroke={color} strokeWidth="1.5" opacity="0.5"/>
      <path d="M8 16 C8 10 24 10 24 16 C24 22 8 22 8 16z" fill={color} opacity="0.2"/>
      <circle cx="11" cy="14" r="1.5" fill={color} opacity="0.8"/>
      <circle cx="21" cy="14" r="1.5" fill={color} opacity="0.8"/>
      <path d="M12 19 Q16 22 20 19" stroke={color} strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.8"/>
    </svg>
  )
}

function IconNotion({ color }: { color: string }) {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <rect x="5" y="3" width="22" height="26" rx="3" stroke={color} strokeWidth="1.5" opacity="0.5"/>
      <path d="M10 10h12M10 15h12M10 20h8" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.7"/>
      <path d="M5 3 L11 3 L5 9z" fill={color} opacity="0.3"/>
    </svg>
  )
}

function IconJira({ color }: { color: string }) {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <path d="M16 4L28 16L16 28L4 16L16 4z" stroke={color} strokeWidth="1.5" opacity="0.5" fill="none"/>
      <path d="M16 4L28 16" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.8"/>
      <path d="M16 28L4 16" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.4"/>
      <circle cx="16" cy="16" r="3.5" fill={color} opacity="0.7"/>
    </svg>
  )
}

function IconMiro({ color }: { color: string }) {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <rect x="3" y="6" width="26" height="20" rx="3" stroke={color} strokeWidth="1.5" opacity="0.5"/>
      <circle cx="10" cy="13" r="2.5" fill={color} opacity="0.7"/>
      <circle cx="22" cy="13" r="2.5" fill={color} opacity="0.5"/>
      <path d="M10 13 Q16 22 22 13" stroke={color} strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.6"/>
    </svg>
  )
}

function IconAdobeCC({ color }: { color: string }) {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <rect x="3" y="3" width="26" height="26" rx="4" stroke={color} strokeWidth="1.5" opacity="0.4"/>
      <path d="M9 22L14 10L17 17" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.85"/>
      <path d="M12 17h5" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.85"/>
      <path d="M20 10 C24 10 24 16 20 16 C24 16 24 22 20 22" stroke={color} strokeWidth="1.8" strokeLinecap="round" opacity="0.75"/>
    </svg>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   TOOL DATA
───────────────────────────────────────────────────────────────────────────── */

type ToolCategory = 'design' | 'ai' | 'collaboration' | 'creative'

const CATEGORY_META: Record<ToolCategory, { label: string; color: string; glow: string; bg: string }> = {
  design:        { label: 'Design',         color: '#4D9EFF', glow: 'rgba(77,158,255,0.18)',  bg: 'rgba(77,158,255,0.06)'  },
  ai:            { label: 'AI',             color: '#A855F7', glow: 'rgba(168,85,247,0.18)', bg: 'rgba(168,85,247,0.06)' },
  collaboration: { label: 'Collaboration',  color: '#22C55E', glow: 'rgba(34,197,94,0.18)',  bg: 'rgba(34,197,94,0.06)'  },
  creative:      { label: 'Creative',       color: '#F97316', glow: 'rgba(249,115,22,0.18)', bg: 'rgba(249,115,22,0.06)' },
}

interface Tool {
  name: string
  subtitle: string
  category: ToolCategory
  Icon: React.FC<{ color: string }>
}

const tools: Tool[] = [
  { name: 'Figma',     subtitle: 'Interface Design & Prototyping',   category: 'design',        Icon: IconFigma    },
  { name: 'FigJam',   subtitle: 'Workshops & Ideation',              category: 'design',        Icon: IconFigJam   },
  { name: 'Framer',   subtitle: 'Interactive Web Prototyping',       category: 'design',        Icon: IconFramer   },
  { name: 'Spline',   subtitle: '3D Interaction Design',             category: 'design',        Icon: IconSpline   },
  { name: 'Claude AI',subtitle: 'AI Assisted Design Workflow',       category: 'ai',            Icon: IconClaudeAI },
  { name: 'ChatGPT',  subtitle: 'AI Research & Ideation',            category: 'ai',            Icon: IconChatGPT  },
  { name: 'Notion',   subtitle: 'Product Documentation',             category: 'collaboration', Icon: IconNotion   },
  { name: 'Jira',     subtitle: 'Product Development Tracking',      category: 'collaboration', Icon: IconJira     },
  { name: 'Miro',     subtitle: 'Collaborative Whiteboarding',       category: 'collaboration', Icon: IconMiro     },
  { name: 'Adobe CC', subtitle: 'Creative & Visual Assets',          category: 'creative',      Icon: IconAdobeCC  },
]

/* ─────────────────────────────────────────────────────────────────────────────
   TOOL CARD
───────────────────────────────────────────────────────────────────────────── */

function ToolCard({ tool }: { tool: Tool }) {
  const meta = CATEGORY_META[tool.category]
  const { Icon } = tool

  return (
    <div
      className="tool-chip group relative flex flex-col gap-4 p-5 rounded-2xl cursor-default opacity-0
        border border-white/[0.06] transition-all duration-300 ease-out
        hover:-translate-y-[5px] hover:scale-[1.03]"
      style={{
        background: `linear-gradient(135deg, #111418 0%, #0d1014 100%)`,
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLDivElement
        el.style.boxShadow = `0 0 24px 0 ${meta.glow}, 0 8px 32px rgba(0,0,0,0.4)`
        el.style.borderColor = `${meta.color}30`
        el.style.background = `linear-gradient(135deg, #13171c 0%, #0d1014 100%)`
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLDivElement
        el.style.boxShadow = ''
        el.style.borderColor = ''
        el.style.background = `linear-gradient(135deg, #111418 0%, #0d1014 100%)`
      }}
    >
      {/* Top accent line */}
      <span
        className="absolute top-0 left-4 right-4 h-[1.5px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `linear-gradient(90deg, transparent, ${meta.color}, transparent)` }}
      />

      {/* Icon container */}
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300"
        style={{ background: meta.bg }}
      >
        <Icon color={meta.color} />
      </div>

      {/* Text */}
      <div className="flex flex-col gap-[5px]">
        <span
          className="font-['Blast_Dragon',sans-serif] text-[14px] tracking-[0.5px] text-[#c8ccd4] group-hover:text-white transition-colors duration-300"
        >
          {tool.name}
        </span>
        <span
          className="font-['Blast_Dragon',sans-serif] text-[10px] tracking-[0.3px] leading-relaxed text-[#8a8f98]/60 group-hover:text-[#8a8f98] transition-colors duration-300"
        >
          {tool.subtitle}
        </span>
      </div>

      {/* Category dot */}
      <span
        className="absolute top-4 right-4 w-[6px] h-[6px] rounded-full opacity-50 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: meta.color, boxShadow: `0 0 6px ${meta.color}` }}
      />
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────────────────────────────────────── */

export default function Skills() {
  const sectionRef     = useRef<HTMLElement>(null)
  const headerRef      = useRef<HTMLDivElement>(null)
  const explorerRef    = useRef<HTMLDivElement>(null)
  const panelRef       = useRef<HTMLDivElement>(null)
  const toolsHeaderRef = useRef<HTMLDivElement>(null)
  const toolsGridRef   = useRef<HTMLDivElement>(null)

  const [activeIndex,   setActiveIndex]   = useState(0)
  const [displayIndex,  setDisplayIndex]  = useState(0)
  const [openAccordion, setOpenAccordion] = useState<number | null>(0)
  const isAnimating = useRef(false)

  /* Switch active capability with GSAP fade-out → swap → fade-in */
  const switchCategory = useCallback((index: number) => {
    if (index === activeIndex || isAnimating.current) return
    isAnimating.current = true
    setActiveIndex(index)

    gsap.to(panelRef.current, {
      opacity: 0, y: -10, duration: 0.18, ease: 'power2.in',
      onComplete: () => {
        setDisplayIndex(index)
        requestAnimationFrame(() => {
          gsap.fromTo(panelRef.current,
            { opacity: 0, y: 24 },
            { opacity: 1, y: 0, duration: 0.45, ease: 'power3.out',
              onComplete: () => { isAnimating.current = false } }
          )
        })
      },
    })
  }, [activeIndex])

  useEffect(() => {
    const ctx = gsap.context(() => {

      gsap.fromTo(headerRef.current,
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: headerRef.current, start: 'top 82%' } }
      )

      gsap.fromTo(explorerRef.current,
        { opacity: 0, y: 36 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: explorerRef.current, start: 'top 80%' } }
      )

      gsap.fromTo(toolsHeaderRef.current,
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: toolsHeaderRef.current, start: 'top 82%' } }
      )

      /* Tool cards — staggered entry */
      const chips = gsap.utils.toArray<HTMLElement>('.tool-chip', toolsGridRef.current)
      gsap.fromTo(chips,
        { opacity: 0, y: 30, scale: 0.92 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'power3.out', stagger: 0.07,
          scrollTrigger: { trigger: toolsGridRef.current, start: 'top 80%' } }
      )

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const activePillar = pillars[displayIndex]

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="flex flex-col items-center px-4 sm:px-8 md:px-12 lg:px-[120px] w-full bg-[#070707]"
    >

      {/* ── Capabilities header ─────────────────────────────────────────────── */}
      <div ref={headerRef} className="section-header opacity-0">
        <p className="font-['Blast_Dragon',sans-serif] text-[13px] text-[#e10600] tracking-[4px] uppercase">
          Expertise
        </p>
        <h2 className="font-['The_Last_Shuriken',sans-serif] text-[56px] text-white text-center leading-none">
          Design Capabilities
        </h2>
        <div className="flex items-center gap-4 mt-1">
          <span className="w-10 h-px bg-gradient-to-r from-transparent to-[#e10600]/30" />
          <p className="font-['Blast_Dragon',sans-serif] text-[12px] text-[#8a8f98] tracking-[3px] uppercase">
            UX Design Expertise
          </p>
          <span className="w-10 h-px bg-gradient-to-l from-transparent to-[#e10600]/30" />
        </div>
      </div>

      {/* ── Desktop / Tablet Explorer ──────────────────────────────────────── */}
      <div
        ref={explorerRef}
        className="hidden md:flex w-full max-w-[1260px] mb-28 opacity-0 min-h-[420px]"
      >
        {/* Left — category list */}
        <div className="flex flex-col justify-center w-[300px] lg:w-[340px] flex-shrink-0 border-r border-white/[0.06] pr-10 lg:pr-14">
          {pillars.map((pillar, i) => (
            <button
              key={pillar.category}
              onMouseEnter={() => switchCategory(i)}
              onClick={() => switchCategory(i)}
              className={`
                group relative flex items-center gap-5 py-7 text-left w-full
                transition-opacity duration-300
                ${activeIndex === i ? 'opacity-100' : 'opacity-25 hover:opacity-50'}
              `}
            >
              <span className={`
                absolute left-0 top-1/2 -translate-y-1/2 w-[2px] rounded-full
                transition-all duration-500 ease-out
                ${activeIndex === i
                  ? 'h-[55%] bg-[#e10600] shadow-[0_0_10px_2px_rgba(225,6,0,0.35)]'
                  : 'h-0 bg-[#e10600]'}
              `} />
              <span className={`
                font-['Blast_Dragon',sans-serif] text-[11px] tracking-[2px] pl-5
                transition-colors duration-300
                ${activeIndex === i ? 'text-[#e10600]' : 'text-[#8a8f98]'}
              `}>
                {pillar.index}
              </span>
              <span className={`
                font-['The_Last_Shuriken',sans-serif] text-[22px] lg:text-[26px] leading-none
                transition-colors duration-300
                ${activeIndex === i ? 'text-white' : 'text-[#8a8f98]'}
              `}>
                {pillar.category}
              </span>
            </button>
          ))}
        </div>

        {/* Right — content panel */}
        <div ref={panelRef} className="flex-1 pl-12 lg:pl-20 flex flex-col justify-center">
          <div className="flex items-baseline gap-3 mb-3">
            <span className="font-['Blast_Dragon',sans-serif] text-[11px] text-[#e10600] tracking-[3px]">
              {activePillar.index}
            </span>
            <h3 className="font-['The_Last_Shuriken',sans-serif] text-[36px] lg:text-[44px] text-white leading-none">
              {activePillar.category}
            </h3>
          </div>
          <p className="font-['Blast_Dragon',sans-serif] text-[13px] text-[#8a8f98] tracking-[0.5px] mb-8 leading-relaxed">
            {activePillar.tagline}
          </p>
          <div className="w-full h-px bg-gradient-to-r from-[#e10600]/50 via-[#e10600]/10 to-transparent mb-10" />
          <div className="grid grid-cols-2 gap-x-14 gap-y-7">
            {activePillar.items.map((item) => (
              <div key={item.name} className="group flex flex-col gap-[6px]">
                <div className="flex items-center gap-3">
                  <span className="w-[4px] h-[4px] rounded-full bg-[#e10600]/60 flex-shrink-0 group-hover:bg-[#D4AF37] transition-colors duration-300" />
                  <span className="font-['Blast_Dragon',sans-serif] text-[15px] text-[#eaeaea] tracking-[0.3px] group-hover:text-white transition-colors duration-300">
                    {item.name}
                  </span>
                </div>
                <p className="pl-[19px] font-['Blast_Dragon',sans-serif] text-[11px] text-[#8a8f98]/60 tracking-[0.3px] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Mobile Accordion ───────────────────────────────────────────────── */}
      <div className="md:hidden w-full max-w-[560px] mb-16 flex flex-col">
        {pillars.map((pillar, i) => {
          const isOpen = openAccordion === i
          return (
            <div key={pillar.category} className="border-b border-white/[0.06]">
              <button
                className="w-full flex items-center justify-between py-5 text-left"
                onClick={() => setOpenAccordion(isOpen ? null : i)}
              >
                <div className="flex items-center gap-4">
                  <span className="font-['Blast_Dragon',sans-serif] text-[11px] text-[#e10600] tracking-[2px]">
                    {pillar.index}
                  </span>
                  <span className={`font-['The_Last_Shuriken',sans-serif] text-[22px] leading-none transition-colors duration-300 ${isOpen ? 'text-white' : 'text-[#8a8f98]'}`}>
                    {pillar.category}
                  </span>
                </div>
                <span className={`font-['Blast_Dragon',sans-serif] text-[20px] text-[#e10600] transition-transform duration-300 ease-out ${isOpen ? 'rotate-45' : 'rotate-0'}`}>
                  +
                </span>
              </button>
              <div className={`overflow-hidden transition-all duration-500 ease-out ${isOpen ? 'max-h-[500px] pb-6' : 'max-h-0'}`}>
                <div className="w-full h-px bg-gradient-to-r from-[#e10600]/40 via-[#e10600]/10 to-transparent mb-5" />
                <p className="font-['Blast_Dragon',sans-serif] text-[12px] text-[#8a8f98] tracking-[0.5px] mb-5 leading-relaxed">
                  {pillar.tagline}
                </p>
                <ul className="flex flex-col gap-5">
                  {pillar.items.map((item) => (
                    <li key={item.name} className="flex flex-col gap-1">
                      <div className="flex items-center gap-3">
                        <span className="w-[3px] h-[3px] rounded-full bg-[#e10600]/50 flex-shrink-0" />
                        <span className="font-['Blast_Dragon',sans-serif] text-[14px] text-[#eaeaea]">{item.name}</span>
                      </div>
                      <p className="pl-[18px] font-['Blast_Dragon',sans-serif] text-[11px] text-[#8a8f98]/60 tracking-[0.3px]">
                        {item.desc}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )
        })}
      </div>

      {/* ── Tools header ───────────────────────────────────────────────────── */}
      <div ref={toolsHeaderRef} className="flex flex-col items-center gap-3 mb-5 opacity-0">
        <p className="font-['Blast_Dragon',sans-serif] text-[13px] text-[#e10600] tracking-[4px] uppercase">
          Arsenal
        </p>
        <h2 className="font-['The_Last_Shuriken',sans-serif] text-[56px] text-white text-center leading-none">
          Tools
        </h2>
      </div>

      {/* Category legend */}
      <div className="flex flex-wrap items-center justify-center gap-5 mb-14">
        {(Object.entries(CATEGORY_META) as [ToolCategory, typeof CATEGORY_META[ToolCategory]][]).map(([key, meta]) => (
          <div key={key} className="flex items-center gap-2">
            <span className="w-[6px] h-[6px] rounded-full" style={{ background: meta.color, boxShadow: `0 0 6px ${meta.color}` }} />
            <span className="font-['Blast_Dragon',sans-serif] text-[10px] text-[#8a8f98] tracking-[2px] uppercase">
              {meta.label}
            </span>
          </div>
        ))}
      </div>

      {/* ── Tool cards ─────────────────────────────────────────────────────── */}
      <div
        ref={toolsGridRef}
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 card-grid w-full max-w-[1260px]"
      >
        {tools.map((tool) => (
          <ToolCard key={tool.name} tool={tool} />
        ))}
      </div>

    </section>
  )
}
