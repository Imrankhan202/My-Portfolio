import { useState, useEffect, useRef, useCallback } from 'react'
import type { Page } from '../App'
import { projects, allTags } from '../data/projects'
import { useReveal } from '../hooks/useReveal'

function ContactForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
  })

  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)

  const inputStyle: React.CSSProperties = {
    width: '100%',
    backgroundColor: 'transparent',
    border: 'none',
    borderBottom: '1px solid rgba(17,17,17,0.2)',
    padding: '12px 0',
    fontSize: '15px',
    color: '#111111',
    fontFamily: 'Inter, sans-serif',
    outline: 'none',
    transition: 'border-color 0.2s ease',
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSending(true)

    try {
      const response = await fetch('https://formspree.io/f/mgawqdzj', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
        }),
      })

      if (response.ok) {
        setSent(true)
        setForm({
          name: '',
          email: '',
          message: '',
        })
      } else {
        alert('Something went wrong. Please try again.')
      }
    } catch (error) {
      alert('Unable to send message. Please check your internet connection.')
    } finally {
      setSending(false)
    }
  }

  if (sent) {
    return (
      <div className="py-10">
        <span
          className="font-mono block mb-2"
          style={{
            fontSize: '9px',
            letterSpacing: '0.25em',
            color: '#C85F32',
          }}
        >
          MESSAGE SENT
        </span>

        <p
          className="font-bold uppercase"
          style={{
            fontSize: '24px',
            letterSpacing: '-0.02em',
            color: '#111111',
          }}
        >
          I'll be in touch.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8">

      {/* NAME */}
      <div>
        <label
          className="font-mono block mb-2"
          style={{
            fontSize: '9px',
            letterSpacing: '0.22em',
            color: '#7A756D',
          }}
        >
          YOUR NAME
        </label>

        <input
          type="text"
          required
          value={form.name}
          placeholder="How should I address you?"
          onChange={e =>
            setForm({
              ...form,
              name: e.target.value,
            })
          }
          style={inputStyle}
          onFocus={e => {
            e.currentTarget.style.borderBottomColor = '#111111'
          }}
          onBlur={e => {
            e.currentTarget.style.borderBottomColor =
              'rgba(17,17,17,0.2)'
          }}
        />
      </div>

      {/* EMAIL */}
      <div>
        <label
          className="font-mono block mb-2"
          style={{
            fontSize: '9px',
            letterSpacing: '0.22em',
            color: '#7A756D',
          }}
        >
          EMAIL
        </label>

        <input
          type="email"
          required
          value={form.email}
          placeholder="Where should I reply?"
          onChange={e =>
            setForm({
              ...form,
              email: e.target.value,
            })
          }
          style={inputStyle}
          onFocus={e => {
            e.currentTarget.style.borderBottomColor = '#111111'
          }}
          onBlur={e => {
            e.currentTarget.style.borderBottomColor =
              'rgba(17,17,17,0.2)'
          }}
        />
      </div>

      {/* MESSAGE */}
      <div>
        <label
          className="font-mono block mb-2"
          style={{
            fontSize: '9px',
            letterSpacing: '0.22em',
            color: '#7A756D',
          }}
        >
          MESSAGE
        </label>

        <textarea
          required
          rows={4}
          value={form.message}
          placeholder="What's on your mind?"
          onChange={e =>
            setForm({
              ...form,
              message: e.target.value,
            })
          }
          style={{
            ...inputStyle,
            resize: 'none',
          }}
          onFocus={e => {
            e.currentTarget.style.borderBottomColor = '#111111'
          }}
          onBlur={e => {
            e.currentTarget.style.borderBottomColor =
              'rgba(17,17,17,0.2)'
          }}
        />
      </div>

      {/* BUTTON */}
      <div>
        <button
          type="submit"
          disabled={sending}
          className="font-mono transition-all duration-300"
          style={{
            fontSize: '10px',
            letterSpacing: '0.22em',
            border: '1px solid #111111',
            padding: '13px 26px',
            color: '#111111',
            backgroundColor: 'transparent',
            opacity: sending ? 0.6 : 1,
            cursor: sending ? 'wait' : 'pointer',
          }}
          onMouseEnter={e => {
            if (!sending) {
              const el = e.currentTarget
              el.style.backgroundColor = '#111111'
              el.style.color = '#F3F0E9'
            }
          }}
          onMouseLeave={e => {
            const el = e.currentTarget
            el.style.backgroundColor = 'transparent'
            el.style.color = '#111111'
          }}
        >
          {sending ? 'SENDING...' : 'SEND MESSAGE →'}
        </button>
      </div>

    </form>
  )
}

interface HomePageProps {
  navigate: (to: Page) => void
}

// Subtle editorial grid background
function GridBackground() {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-0"
      style={{
        backgroundImage: `
          linear-gradient(rgba(17,17,17,0.035) 1px, transparent 1px),
          linear-gradient(90deg, rgba(17,17,17,0.035) 1px, transparent 1px)
        `,
        backgroundSize: '72px 72px',
      }}
    />
  )
}

export default function HomePage({ navigate }: HomePageProps) {
  // Hero parallax
  const [mouse, setMouse] = useState({ x: 0, y: 0 })
  const heroRef = useRef<HTMLDivElement>(null)

  // Project hover state
  const [hoveredId, setHoveredId] = useState<number | null>(null)
  const [groupHovered, setGroupHovered] = useState(false)
  const [cursor, setCursor] = useState({ x: 0, y: 0 })

  // Filter
  const [activeFilter, setActiveFilter] = useState('ALL')
  const filtered = activeFilter === 'ALL' ? projects : projects.filter(p => p.tags.includes(activeFilter))

  // Reveal refs
  const indexReveal = useReveal()
  const buildingReveal = useReveal()
  const howReveal = useReveal()
  const dcReveal = useReveal()
  const aiReveal = useReveal()
  const ctaReveal = useReveal()
  const aboutReveal = useReveal()
  const labReveal = useReveal()
  const contactReveal = useReveal()

  const handleHeroMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = heroRef.current?.getBoundingClientRect()
    if (!rect) return
    setMouse({
      x: (e.clientX - rect.left) / rect.width - 0.5,
      y: (e.clientY - rect.top) / rect.height - 0.5,
    })
  }, [])

  const handleProjectMove = useCallback((e: React.MouseEvent) => {
    setCursor({ x: e.clientX, y: e.clientY })
  }, [])

  // Scroll progress line
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement
      const pct = (window.scrollY / (doc.scrollHeight - doc.clientHeight)) * 100
      setProgress(pct)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div style={{ backgroundColor: '#F3F0E9', color: '#111111', position: 'relative' }}>
      <GridBackground />

      {/* Scroll progress */}
      <div
        className="fixed top-0 left-0 h-px z-[60] transition-all duration-100"
        style={{ width: `${progress}%`, backgroundColor: '#C85F32' }}
      />

      {/* ────────── HERO ────────── */}
      <section
        id="index"
        ref={heroRef}
        className="relative h-screen flex flex-col justify-end z-10 overflow-hidden"
        onMouseMove={handleHeroMove}
        aria-label="Introduction"
      >
        {/* Vertical rotated label */}
        <div
  
  className="absolute top-1/2 select-none z-20"
  style={{
    right: '-160px',
    transform: 'translateY(-50%) rotate(90deg)',
    transformOrigin: 'center center',
  }}
>
  <span
    className="font-mono whitespace-nowrap"
    style={{
      fontSize: '12px',
      letterSpacing: '0.4em',
      color: '#7A756D',
    }}
  >
    SOFTWARE ENGINEER / UI/UX DESIGNER
  </span>
</div>

        {/* Main title block */}
        <div className="px-6 md:px-10 pb-10 relative z-10">
          {/* IMRAN */}
          <div
            className="overflow-hidden"
            style={{
              transform: `translate(${mouse.x * -50}px, ${mouse.y * -50}px)`,
              transition: 'transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            }}
          >
            <h1
              className="font-black uppercase leading-none select-none"
              style={{
                fontSize: 'clamp(72px, 17vw, 300px)',
                letterSpacing: '-0.045em',
                color: '#8B0000',
                lineHeight: 1.6,
              }}
            >
              PORTFOLIO
            </h1>
          </div>

          {/* KHAN + roles row */}
          <div className="flex items-end justify-between flex-wrap gap-4">
           
  

            {/* Roles */}
            <div
              className="flex flex-col items-end gap-1 mb-1 md:mb-3"
              style={{
                transform: `translate(${mouse.x * -10}px, ${mouse.y * -4}px)`,
                transition: 'transform 1.1s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              }}
            >
              <span className="font-mono" style={{ fontSize: '11px', letterSpacing: '0.22em', color: '#7A756D' }}>
                DESIGNING DIGITAL EXPERIENCES.
              </span>
              <span className="font-mono" style={{ fontSize: '11px', letterSpacing: '0.22em', color: '#7A756D' }}>
                BUILDING SOFTWARE.
              </span>
              <span className="font-mono" style={{ fontSize: '11px', letterSpacing: '0.22em', color: '#8B0000' }}>
                EXPLORING AI.
              </span>
            </div>
          </div>

          {/* Bottom meta bar */}
          <div className="flex items-center justify-between mt-10 pt-5" style={{ borderTop: '1px solid rgba(17,17,17,0.1)' }}>
            <div className="flex flex-col gap-1.5">
              <div className="w-5 h-px" style={{ backgroundColor: 'rgba(17,17,17,0.35)' }} />
              <span className="font-mono" style={{ fontSize: '9px', letterSpacing: '0.28em', color: '#7A756D' }}>
                SCROLL TO EXPLORE
              </span>
            </div>
            <span className="font-mono" style={{ fontSize: '10px', letterSpacing: '0.2em', color: '#7A756D' }}>
              IMRAN KHAN / IN PROGRESS...
            </span>
            <span className="font-mono" style={{ fontSize: '10px', letterSpacing: '0.2em', color: '#111111' }}>
              01 / 04
            </span>
          </div>
        </div>

        {/* Bottom fade line */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none"
          style={{ width: '1px', height: '64px', background: 'linear-gradient(to bottom, transparent, rgba(17,17,17,0.25))' }}
        />
      </section>

      {/* ────────── THE Projects ────────── */}
     <section
  id="projects"
  className="relative z-10 px-6 md:px-10 py-20 md:py-28"
  onMouseMove={handleProjectMove}
>
        <div ref={indexReveal}>
          {/* Header */}
          <div
            className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 pt-6"
            style={{ borderTop: '1px solid rgba(17,17,17,0.12)' }}
          >
            <div>
              <span className="font-mono" style={{ fontSize: '9px', letterSpacing: '0.32em', color: '#7A756D' }}>02 —</span>
              <h2
                className="font-black uppercase leading-none mt-1"
                style={{ fontSize: 'clamp(48px, 8vw, 110px)', letterSpacing: '-0.04em', color: '#111111' }}
              >
                PROJECTS
              </h2>
            </div>
            <span className="font-mono mt- md:mt-0" style={{ fontSize: '9px', letterSpacing: '0.28em', color: '#8B0000' }}>
              WORK / IN PROGRESS...
            </span>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2 mb-10">
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => setActiveFilter(tag)}
                className="font-mono transition-all duration-200"
                style={{
                  fontSize: '9px',
                  letterSpacing: '0.18em',
                  padding: '5px 10px',
                  border: `1px solid ${activeFilter === tag ? '#C85F32' : 'rgba(17,17,17,0.18)'}`,
                  color: activeFilter === tag ? '#C85F32' : '#7A756D',
                  backgroundColor: 'transparent',
                }}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Project rows */}
          <div
            onMouseEnter={() => setGroupHovered(true)}
            onMouseLeave={() => { setGroupHovered(false); setHoveredId(null) }}
          >
            {filtered.map((project) => {
              const isHovered = hoveredId === project.id
              const dimmed = groupHovered && !isHovered
              return (
                <div
                  key={project.id}
                  className="group"
                  style={{
                    borderTop: '1px solid rgba(17,17,17,0.1)',
                    opacity: dimmed ? 0.32 : 1,
                    transition: 'opacity 0.3s ease',
                  }}
                  onMouseEnter={() => setHoveredId(project.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  onClick={() => navigate({ type: 'project', id: project.id })}
                  data-cursor="view"
                  role="button"
                  tabIndex={0}
                  onKeyDown={e => e.key === 'Enter' && navigate({ type: 'project', id: project.id })}
                  aria-label={`View ${project.title}`}
                >
                  <div className="flex items-center py-4 md:py-5 gap-3 md:gap-0">
                    {/* Number */}
                    <span
                      className="font-mono shrink-0"
                      style={{ fontSize: '10px', color: '#7A756D', width: '2.5rem' }}
                    >
                      {project.number}
                    </span>

                    {/* Title */}
                    <span
                      className="flex-1 font-bold uppercase transition-colors duration-200"
                      style={{
                        fontSize: 'clamp(18px, 2.8vw, 34px)',
                        letterSpacing: '-0.02em',
                        color: isHovered ? '#C85F32' : '#111111',
                      }}
                    >
                      {project.title}
                    </span>

                    {/* Meta */}
                    <span
                      className="hidden md:block font-mono shrink-0"
                      style={{ fontSize: '10px', color: '#7A756D', width: '11rem' }}
                    >
                      {project.category}
                    </span>
                    <span
                      className="hidden md:block font-mono shrink-0"
                      style={{ fontSize: '10px', color: '#7A756D', width: '4rem' }}
                    >
                      {project.year}
                    </span>
                    <span
                      className="hidden md:block font-mono shrink-0"
                      style={{ fontSize: '10px', color: '#7A756D', width: '9rem' }}
                    >
                      {project.role}
                    </span>

                    {/* Type badge */}
                    <span
                      className="hidden md:block font-mono shrink-0"
                      style={{
                        fontSize: '8px',
                        letterSpacing: '0.12em',
                        color: '#7A756D',
                        border: '1px solid rgba(17,17,17,0.18)',
                        padding: '3px 7px',
                      }}
                    >
                      {project.type}
                    </span>

                    {/* Arrow */}
                    <span
                      className="font-mono ml-2 shrink-0 transition-all duration-200"
                      style={{
                        fontSize: '13px',
                        color: '#C85F32',
                        opacity: isHovered ? 1 : 0,
                        transform: isHovered ? 'translateX(0)' : 'translateX(-6px)',
                      }}
                    >
                      →
                    </span>
                  </div>
                </div>
              )
            })}
            <div style={{ borderTop: '1px solid rgba(17,17,17,0.1)' }} />
          </div>
        </div>

        {/* Floating preview */}
        {hoveredId !== null && (
          <div
            className="fixed pointer-events-none z-50 overflow-hidden"
            style={{
              left: cursor.x + 28,
              top: cursor.y - 72,
              width: '280px',
              height: '180px',
              border: '1px solid rgba(17,17,17,0.15)',
              backgroundColor: '#111111',
              transition: 'left 0.06s linear, top 0.06s linear',
            }}
            aria-hidden="true"
          >
            <img
              src={projects.find(p => p.id === hoveredId)?.previewImage}
              alt=""
              className="w-full h-full object-cover"
              style={{ opacity: 0.85 }}
            />
            <div
              className="absolute bottom-0 left-0 right-0 p-3"
              style={{ background: 'linear-gradient(to top, rgba(17,17,17,0.7), transparent)' }}
            >
              <span className="font-mono" style={{ fontSize: '9px', letterSpacing: '0.2em', color: '#F3F0E9' }}>
                {projects.find(p => p.id === hoveredId)?.category}
              </span>
            </div>
          </div>
        )}
      </section>

      {/* ────────── CURRENTLY BUILDING ────────── */}
      <section
        className="relative z-10 px-6 md:px-10 py-20 md:py-28"
        style={{ borderTop: '1px solid rgba(17,17,17,0.1)' }}
      >
        <div ref={buildingReveal} className="reveal">
          <div
            className="flex flex-col md:flex-row md:items-end md:justify-between mb-14"
          >
            <div>
              <span className="font-mono" style={{ fontSize: '9px', letterSpacing: '0.32em', color: '#7A756D' }}>03 —</span>
              <h2
                className="font-black uppercase leading-none mt-1"
                style={{ fontSize: 'clamp(38px, 6vw, 80px)', letterSpacing: '-0.04em', color: '#111111' }}
              >
                CURRENTLY<br />BUILDING
              </h2>
            </div>
            <span className="font-mono mt-3 md:mt-0" style={{ fontSize: '9px', letterSpacing: '0.28em', color: '#C85F32' }}>
              IDEAS / IN PROGRESS...
            </span>
          </div>

          <div
            className="grid grid-cols-1 md:grid-cols-3"
            style={{ borderTop: '1px solid rgba(17,17,17,0.12)' }}
          >
            {[
              {
                status: 'DESIGNING',
                idea: 'AI PRODUCT INTERFACE',
                desc: 'Exploring interaction patterns for AI-native products. How should an interface feel when the core logic is probabilistic?',
                color: '#C85F32',
              },
              {
                status: 'BUILDING',
                idea: 'DESIGN SYSTEM',
                desc: 'A token-based system built in Figma and implemented in React. Built for real use — not a portfolio showcase.',
                color: '#111111',
              },
              {
                status: 'EXPLORING',
                idea: 'AUTOMATION WORKFLOWS',
                desc: 'Using n8n to map and remove repetitive tasks from design and development workflows.',
                color: '#7A756D',
              },
            ].map((item, i) => (
              <div
                key={i}
                className="p-7 md:p-8"
                style={{
                  borderLeft: i === 0 ? 'none' : '1px solid rgba(17,17,17,0.12)',
                  borderTop: '1px solid rgba(17,17,17,0.12)',
                }}
              >
                {/* Status pill */}
                <span
                  className="font-mono"
                  style={{
                    fontSize: '8px',
                    letterSpacing: '0.25em',
                    color: item.color,
                    border: `1px solid ${item.color}40`,
                    padding: '3px 8px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '5px',
                  }}
                >
                  <span
                    className="pulse-dot rounded-full inline-block"
                    style={{ width: '4px', height: '4px', backgroundColor: item.color }}
                  />
                  {item.status}
                </span>

                <h3
                  className="font-bold uppercase leading-tight mt-6 mb-4"
                  style={{ fontSize: 'clamp(16px, 2vw, 22px)', letterSpacing: '-0.02em', color: '#111111' }}
                >
                  {item.idea}
                </h3>
                <p style={{ fontSize: '13px', color: '#7A756D', lineHeight: 1.7, fontWeight: 300 }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ────────── HOW I THINK ────────── */}
      <section
        className="relative z-10 px-6 md:px-10 py-20 md:py-28"
        style={{ borderTop: '1px solid rgba(17,17,17,0.1)' }}
      >
        <div ref={howReveal} className="reveal">
          <div className="mb-14">
            <span className="font-mono" style={{ fontSize: '9px', letterSpacing: '0.32em', color: '#7A756D' }}>04 —</span>
            <h2
              className="font-black uppercase leading-none mt-1"
              style={{ fontSize: 'clamp(38px, 6vw, 80px)', letterSpacing: '-0.04em', color: '#111111' }}
            >
              HOW I THINK
            </h2>
          </div>

          <div>
            {[
              {
                num: '01',
                title: 'MAKE COMPLEX THINGS FEEL SIMPLE.',
                text: 'Good design is invisible. It removes confusion before the user encounters it. Every layer of complexity I introduce must earn its place — most don\'t.',
              },
              {
                num: '02',
                title: 'DESIGN WITH PURPOSE.',
                text: 'Aesthetics follow intent. I do not start with how something looks. I start with what it must do, and why it matters to the person using it.',
              },
              {
                num: '03',
                title: 'BUILD, TEST, LEARN, REPEAT.',
                text: 'No design survives first contact with a real user unchanged. The faster I can put something in front of someone, the less time I waste on assumptions.',
              },
            ].map((item, i) => (
              <div
                key={i}
                className="flex gap-6 md:gap-14 py-8 md:py-10"
                style={{ borderTop: '1px solid rgba(17,17,17,0.1)' }}
              >
                <span
                  className="font-mono shrink-0 mt-1"
                  style={{ fontSize: '10px', color: '#7A756D', width: '1.5rem' }}
                >
                  {item.num}
                </span>
                <div className="flex-1 md:flex md:items-start md:gap-16">
                  <h3
                    className="font-bold uppercase leading-tight mb-4 md:mb-0 shrink-0"
                    style={{
                      fontSize: 'clamp(16px, 2vw, 24px)',
                      letterSpacing: '-0.02em',
                      color: '#111111',
                      width: 'min(320px, 100%)',
                    }}
                  >
                    {item.title}
                  </h3>
                  <p
                    style={{
                      fontSize: '14px',
                      color: '#7A756D',
                      lineHeight: 1.8,
                      fontWeight: 300,
                      maxWidth: '440px',
                    }}
                  >
                    {item.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ────────── DESIGN × CODE ────────── */}
      <section
        className="relative z-10 overflow-hidden"
        style={{ borderTop: '1px solid rgba(17,17,17,0.1)' }}
      >
        <div ref={dcReveal} className="reveal">
          <div className="grid grid-cols-2 md:grid-cols-[1fr_80px_1fr]">
            {/* DESIGN */}
            <div
              className="px-6 md:px-10 pt-12 pb-16"
              style={{ borderRight: '1px solid rgba(17,17,17,0.1)' }}
            >
              <h2
                className="font-black uppercase leading-none mb-10"
                style={{ fontSize: 'clamp(40px, 6vw, 88px)', letterSpacing: '-0.04em', color: '#111111' }}
              >
                DESIGN
              </h2>
              <div className="flex flex-col gap-2">
                {[
                  { label: 'UI/UX', size: '20px' },
                  { label: 'Product Design', size: '17px' },
                  { label: 'Wireframing', size: '15px' },
                  { label: 'Prototyping', size: '15px' },
                  { label: 'Design Systems', size: '13px' },
                  { label: 'Visual Design', size: '13px' },
                ].map(({ label, size }, i) => (
                  <div key={label} className="flex items-center gap-3">
                    <div
                      className="rounded-full shrink-0"
                      style={{ width: '4px', height: '4px', backgroundColor: i < 2 ? '#C85F32' : 'rgba(17,17,17,0.25)' }}
                    />
                    <span style={{ fontSize: size, color: i < 3 ? '#111111' : '#7A756D', fontWeight: 300 }}>
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* × center — hidden on mobile */}
            <div className="hidden md:flex items-center justify-center">
              <span
                className="font-black select-none"
                style={{ fontSize: '56px', color: '#C85F32', lineHeight: 1 }}
              >
                ×
              </span>
            </div>

            {/* CODE */}
            <div className="px-6 md:px-10 pt-12 pb-16">
              <h2
                className="font-black uppercase leading-none mb-10 text-right"
                style={{ fontSize: 'clamp(40px, 6vw, 88px)', letterSpacing: '-0.04em', color: '#111111' }}
              >
                CODE
              </h2>
              <div className="flex flex-col gap-2 items-end">
                {[
                  { label: 'HTML', size: '20px' },
                  { label: 'CSS', size: '17px' },
                  { label: 'JavaScript', size: '17px' },
                  { label: 'React', size: '15px' },
                  { label: 'Node.js', size: '14px' },
                  { label: 'MongoDB', size: '13px' },
                  { label: 'Git', size: '12px' },
                ].map(({ label, size }, i) => (
                  <div key={label} className="flex items-center gap-3">
                    <span style={{ fontSize: size, color: i < 3 ? '#111111' : '#7A756D', fontWeight: 300 }}>
                      {label}
                    </span>
                    <div
                      className="rounded-full shrink-0"
                      style={{ width: '4px', height: '4px', backgroundColor: i < 2 ? 'rgba(17,17,17,0.4)' : 'rgba(17,17,17,0.18)' }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Also: AI/Automation */}
          <div
className="px-6 md:px-10 py-10 flex flex-wrap justify-center gap-3"
            style={{ borderTop: '1px solid rgba(17,17,17,0.1)' }}
          >
            <span className="font-mono" style={{ fontSize: '9px', letterSpacing: '0.25em', color: '#7A756D' }}></span>
            {['AI Tools', 'n8n', 'Workflow Automation', 'Photoshop', 'After Effects', 'Blender', 'Figma'].map(tool => (
              <span
                key={tool}
                className="font-mono"
                style={{
                  fontSize: '10px',
                  letterSpacing: '0.15em',
                  color: '#8B0000',
                  border: '1px solid rgba(17,17,17,0.15)',
                  padding: '3px 8px',
                }}
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      </section>

     
      {/* ────────── CTA ────────── */}
      <section
        className="relative z-10 px-6 md:px-10 py-20 md:py-28"
        style={{ borderTop: '1px solid rgba(17,17,17,0.1)' }}
      >
        <div ref={ctaReveal} className="reveal">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
            <div>
              <h2
                className="font-black uppercase leading-none"
                style={{ fontSize: 'clamp(40px, 7vw, 100px)', letterSpacing: '-0.04em', color: '#111111' }}
              >
                LET'S BUILD<br />SOMETHING.
              </h2>
            </div>
            <button
onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} 
             className="font-mono transition-all duration-300 shrink-0"
              style={{
                fontSize: '10px',
                letterSpacing: '0.22em',
                border: '1px solid #111111',
                borderRadius: '6px',
                padding: '12px 24px',
                color: '#111111',
                backgroundColor: 'transparent',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget
                el.style.backgroundColor = '#8b0000'
                el.style.color = '#F3F0E9'
              }}
              onMouseLeave={e => {
                const el = e.currentTarget
                el.style.backgroundColor = 'transparent'
                el.style.color = '#111111'
              }}
            >
              GET IN TOUCH →
            </button>
          </div>
        </div>
      </section>

      {/* ────────── ABOUT ────────── */}
      <section
        id="about"
        className="relative z-10 px-6 md:px-10 py-20 md:py-28"
        style={{ borderTop: '1px solid rgba(17,17,17,0.1)' }}
      >
        <div className="reveal" ref={aboutReveal}>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-14" style={{ borderTop: '1px solid rgba(17,17,17,0.12)', paddingTop: '24px' }}>
            <div>
              <span className="font-mono" style={{ fontSize: '9px', letterSpacing: '0.32em', color: '#7A756D' }}>ABOUT </span>
              <h2 className="font-black uppercase leading-none mt-1" style={{ fontSize: 'clamp(48px, 8vw, 100px)', letterSpacing: '-0.04em', color: '#111111' }}>
                ABOUT IMRAN
              </h2>
            </div>
            <span className="font-mono mt-3 md:mt-0" style={{ fontSize: '9px', letterSpacing: '0.28em', color: '#C85F32' }}>PROFILE / IN PROGRESS...</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 mb-16">
            <div>
              <p style={{ fontSize: '18px', lineHeight: 1.8, color: '#111111', fontWeight: 300, marginBottom: '20px' }}>
                I'm a software engineer and product designer with a focus on building useful, well-crafted digital experiences. My work sits at the intersection of design and engineering — I'm equally comfortable in Figma and in a code editor.
              </p>
              <p style={{ fontSize: '15px', lineHeight: 1.8, color: '#7A756D', fontWeight: 300, marginBottom: '20px' }}>
                I graduated with a degree in Software Engineering and have spent my time building a range of products — from healthcare platforms for rural communities to AI-powered learning tools.
              </p>
              <p style={{ fontSize: '15px', lineHeight: 1.8, color: '#7A756D', fontWeight: 300 }}>
                I'm particularly interested in how AI changes the nature of product design — not as a feature to add, but as a fundamentally different way of thinking about what software can do.
              </p>
            </div>
              <div className="flex flex-col gap-8 md:pl-65">              {[
                { label: 'WHAT I DO', items: ['UI/UX Design', 'Frontend Development', 'Product Design', 'AI & Automation'] },
                { label: 'WHAT I AM LEARNING', items: ['AI product design patterns', 'n8n workflow automation', 'Advanced React patterns', 'Motion design'] },
                { label: 'WHAT I CARE ABOUT', items: ['Clarity over complexity', 'Real-world impact', 'Craft at every scale', 'Building things that last'] },
              ].map(({ label, items }) => (
                <div key={label}>
                  <span className="font-mono block mb-3" style={{ fontSize: '9px', letterSpacing: '0.28em', color: '#C85F32' }}>{label}</span>
                  <div className="flex flex-col gap-1.5">
                    {items.map(item => (
                      <div key={item} className="flex items-center gap-3">
                        <div className="rounded-full shrink-0" style={{ width: '3px', height: '3px', backgroundColor: 'rgba(17,17,17,0.4)' }} />
                        <span style={{ fontSize: '14px', color: '#111111', fontWeight: 300 }}>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Experience timeline */}
          <div style={{ borderTop: '1px solid rgba(17,17,17,0.1)', paddingTop: '48px' }}>
            <span className="font-mono block mb-8" style={{ fontSize: '9px', letterSpacing: '0.28em', color: '#7A756D' }}>EXPERIENCE </span>
            {[
              { year: '2026–Present', role: 'UI/UX DESIGNER & Graphic Designer', company: 'DevSynt', desc: 'Worked on user flows, interface layouts, prototypes, and design systems while collaborating with developers to ensure accurate implementation.' },
              { year: '2025', role: 'FINAL YEAR PROJECT', company: 'University', desc: 'Designed and developed PriceWise, a full-stack price comparison platform. Responsible for the entire design system, frontend architecture, and backend API.' },
              { year: '2026', role: 'PRODUCT DESIGNER', company: 'Allah Nawaz Hospital (freelance)', desc: 'Led product design for a rural healthcare application serving a community in Pakistan. Conducted on-site user research and produced a developer-ready design system.' },              
              { year: '2025–2026', role: 'UI/UX DESIGNER', company: 'CodeCelix', desc: 'Designed user-friendly and visually engaging digital interfaces. Created wireframes, prototypes, and high-fidelity designs in Figma while focusing on usability, consistency, and responsive design.' },
               { year: '2022–2026', role: 'BS SOFTWARE ENGINEERING', company: 'University', desc: 'Studied software engineering with a focus on HCI, web technologies, and software architecture.' },
            ].map((item, i) => (
              <div key={i} className="flex gap-10 md:gap-14 py-7" style={{ borderTop: '2px solid rgba(17,17,17,0.08)' }}>
                <span className="font-mono shrink-0" style={{ fontSize: '10px', letterSpacing: '0.12em', color: '#C85F32', width: '5rem', paddingTop: '2px' }}>{item.year}</span>
                <div>
                  <div className="flex flex-col md:flex-row md:items-center md:gap-6 mb-2">
                    <span className="font-bold uppercase" style={{ fontSize: '14px', letterSpacing: '-0.01em', color: '#111111' }}>{item.role}</span>
                    <span className="font-mono" style={{ fontSize: '12px', color: '#7A756D', letterSpacing: '0.1em' }}>{item.company}</span>
                  </div>
                  <p style={{ fontSize: '14px', color: '#7A756D', lineHeight: 1.7, fontWeight: 300, maxWidth: '520px' }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Skills */}
          <div style={{ borderTop: '1px solid rgba(17,17,17,0.1)', paddingTop: '48px', marginTop: '32px' }}>
            <span className="font-mono block mb-8" style={{ fontSize: '9px', letterSpacing: '0.28em', color: '#7A756D' }}>CAPABILITIES</span>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-6">
              {[
                { cat: 'DESIGN', skills: [{ n: 'UI/UX', s: '20px', w: 600 }, { n: 'Product Design', s: '17px', w: 400 }, { n: 'Wireframing', s: '15px', w: 300 }, { n: 'Prototyping', s: '14px', w: 300 }, { n: 'Design Systems', s: '13px', w: 300 }] },
                { cat: 'DEV', skills: [{ n: 'HTML', s: '20px', w: 600 }, { n: 'CSS', s: '18px', w: 500 }, { n: 'JavaScript', s: '16px', w: 400 }, { n: 'React', s: '15px', w: 400 }, { n: 'Node.js', s: '14px', w: 300 }, { n: 'MongoDB', s: '13px', w: 300 }] },
                { cat: 'AI / AUTO', skills: [{ n: 'n8n', s: '20px', w: 600 }, { n: 'AI Product Design', s: '15px', w: 400 }, { n: 'Workflow Auto.', s: '13px', w: 300 }, { n: 'AI Interfaces', s: '13px', w: 300 }] },
                { cat: 'CREATIVE', skills: [{ n: 'Figma', s: '20px', w: 600 }, { n: 'Photoshop', s: '16px', w: 400 }, { n: 'Illustrator', s: '15px', w: 300 }, { n: 'After Effects', s: '13px', w: 300 }, { n: 'Blender', s: '12px', w: 300 }] },
              ].map(({ cat, skills }) => (
                <div key={cat}>
                  <span className="font-mono block mb-4" style={{ fontSize: '9px', letterSpacing: '0.28em', color: '#C85F32' }}>{cat}</span>
                  <div className="flex flex-col gap-1">
                    {skills.map(({ n, s, w }) => (
                      <span key={n} style={{ fontSize: s, fontWeight: w, color: '#111111', lineHeight: 1.5 }}>{n}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

     

      {/* ────────── CONTACT ────────── */}
      <section
        id="contact"
        className="relative z-10 px-6 md:px-10 py-20 md:py-28"
        style={{ borderTop: '1px solid rgba(17,17,17,0.1)' }}
      >
        <div className="reveal" ref={contactReveal}>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-14" style={{ borderTop: '1px solid rgba(17,17,17,0.12)', paddingTop: '24px' }}>
            <div>
              <span className="font-mono" style={{ fontSize: '9px', letterSpacing: '0.32em', color: '#7A756D' }}>CONTACT —</span>
              <h2 className="font-black uppercase leading-none mt-1" style={{ fontSize: 'clamp(40px, 7vw, 80px)', letterSpacing: '-0.04em', color: '#111111' }}>
                HAVE AN IDEA? LET'S BUILD SOMETHING.
              </h2>
            </div>
          </div>

          <div className="mb-12">
            <span className="font-mono block mb-5" style={{ fontSize: '9px', letterSpacing: '0.28em', color: '#7A756D' }}>AVAILABLE FOR</span>
            <div className="flex flex-wrap gap-3">
              {['UI/UX DESIGN', 'PRODUCT DESIGN', 'FRONTEND DEVELOPMENT', 'AI AUTOMATION', 'CREATIVE PROJECTS', 'FREELANCE'].map(item => (
                <span key={item} className="font-mono" style={{ fontSize: '10px', letterSpacing: '0.15em', color: '#111111', border: '1px solid rgba(17,17,17,0.18)', padding: '6px 12px' }}>{item}</span>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-0 mb-16">
            {[
              { label: 'EMAIL', text: 'EMAIL ME →', href: 'mailto:itsimranengineer@gmail.com' },
              { label: 'LINKEDIN', text: 'LINKEDIN →', href: 'https://www.linkedin.com/in/imrankhan8183' },
              { label: 'BEHANCE', text: 'BEHANCE →', href: 'https://www.behance.net/ImranKhanPathaan' },
              { label: 'GITHUB', text: 'GITHUB →', href: 'https://github.com/' },
            ].map(({ label, text, href }) => (
              <a key={label} href={href} className="flex items-center gap-6 py-4" style={{ borderTop: '1px solid rgba(17,17,17,0.1)', color: '#111111', textDecoration: 'none' }}>
                <span className="font-mono shrink-0" style={{ fontSize: '9px', letterSpacing: '0.22em', color: '#7A756D', width: '5rem' }}>{label}</span>
                <span className="font-bold uppercase transition-colors duration-200" style={{ fontSize: 'clamp(18px, 3vw, 32px)', letterSpacing: '-0.02em' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#C85F32' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = '#111111' }}
                >{text}</span>
              </a>
            ))}
          </div>

          {/* Form */}
          <div className="max-w-2xl">
            <span className="font-mono block mb-8" style={{ fontSize: '9px', letterSpacing: '0.28em', color: '#7A756D' }}>OR SEND A MESSAGE</span>
            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  )
}
