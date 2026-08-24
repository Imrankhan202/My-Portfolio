import { useState, useEffect, useRef } from 'react'
import { projects } from '../data/projects'
import type { Page } from '../App'
import { useReveal } from '../hooks/useReveal'

interface ProjectPageProps {
  id: number
  navigate: (to: Page) => void
}

export default function ProjectPage({ id, navigate }: ProjectPageProps) {
  const project = projects.find(p => p.id === id)
  const nextProject = projects.find(p => p.id === id + 1) ?? projects[0]
  const [activeSection, setActiveSection] = useState(0)
  const sectionsRef = useRef<HTMLDivElement[]>([])

  const heroReveal = useReveal()
  const contextReveal = useReveal()
  const processReveal = useReveal()
  const outcomeReveal = useReveal()

  const sections = ['CONTEXT', 'PROBLEM', 'PROCESS', 'OUTCOME', 'LEARNINGS']

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const idx = sectionsRef.current.indexOf(entry.target as HTMLDivElement)
            if (idx !== -1) setActiveSection(idx)
          }
        })
      },
      { threshold: 0.4 }
    )
    sectionsRef.current.forEach(el => el && observer.observe(el))
    return () => observer.disconnect()
  }, [])

  if (!project) {
    return (
      <div className="flex items-center justify-center h-screen" style={{ backgroundColor: '#F3F0E9' }}>
        <button onClick={() => navigate('home')} className="font-mono" style={{ fontSize: '11px', letterSpacing: '0.2em', color: '#7A756D' }}>
          ← BACK TO PROJECTS
        </button>
      </div>
    )
  }

  return (
    <div style={{ backgroundColor: '#F3F0E9', color: '#111111', paddingTop: '80px' }}>
      {/* Sticky section progress — desktop */}
      <div
        className="hidden md:flex flex-col gap-2 fixed right-8 top-1/2 -translate-y-1/2 z-40"
        style={{ pointerEvents: 'none' }}
      >
        {sections.map((s, i) => (
          <div key={s} className="flex items-center gap-2">
            <div
              style={{
                width: '1px',
                height: '20px',
                backgroundColor: i === activeSection ? '#C85F32' : 'rgba(17,17,17,0.2)',
                transition: 'background-color 0.3s ease',
              }}
            />
            <span
              className="font-mono"
              style={{
                fontSize: '8px',
                letterSpacing: '0.18em',
                color: i === activeSection ? '#C85F32' : 'rgba(17,17,17,0.3)',
                transition: 'color 0.3s ease',
              }}
            >
              {String(i + 1).padStart(2, '0')} {s}
            </span>
          </div>
        ))}
      </div>

      {/* Back nav */}
      <div className="px-6 md:px-10 pt-6 pb-0">
        <button
          onClick={() => navigate('home')}
          className="font-mono transition-colors duration-200"
          style={{ fontSize: '9px', letterSpacing: '0.22em', color: '#7A756D' }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#111111' }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = '#7A756D' }}
        >
          ← PROJECTS
        </button>
      </div>

      {/* Hero */}
      <section className="px-6 md:px-10 py-12 md:py-20">
        <div ref={heroReveal} className="reveal">
          {/* Meta row */}
          <div className="flex flex-wrap gap-4 mb-8">
            <span className="font-mono" style={{ fontSize: '9px', letterSpacing: '0.22em', color: '#7A756D' }}>
              {project.number}
            </span>
            <span className="font-mono" style={{ fontSize: '9px', letterSpacing: '0.22em', color: '#7A756D' }}>
              {project.category}
            </span>
            <span className="font-mono" style={{ fontSize: '9px', letterSpacing: '0.22em', color: '#7A756D' }}>
              {project.year}
            </span>
            <span
              className="font-mono"
              style={{
                fontSize: '8px',
                letterSpacing: '0.15em',
                color: '#C85F32',
                border: '1px solid rgba(200,95,50,0.35)',
                padding: '2px 8px',
              }}
            >
              {project.type}
            </span>
          </div>

          <h1
            className="font-black uppercase leading-none mb-4"
            style={{ fontSize: 'clamp(40px, 7vw, 96px)', letterSpacing: '-0.04em', color: '#111111' }}
          >
            {project.title}
          </h1>
          <p
            className="mb-10"
            style={{ fontSize: '17px', color: '#7A756D', lineHeight: 1.7, fontWeight: 300, maxWidth: '640px' }}
          >
            {project.description}
          </p>

          {/* Role + Tools */}
          <div className="flex flex-wrap gap-10">
            <div>
              <span className="font-mono block mb-2" style={{ fontSize: '9px', letterSpacing: '0.22em', color: '#7A756D' }}>ROLE</span>
              <span style={{ fontSize: '14px', color: '#111111', fontWeight: 500 }}>{project.role}</span>
            </div>
            <div>
              <span className="font-mono block mb-2" style={{ fontSize: '9px', letterSpacing: '0.22em', color: '#7A756D' }}>TOOLS</span>
              <div className="flex flex-wrap gap-2">
                {project.tools.map(tool => (
                  <span
                    key={tool}
                    className="font-mono"
                    style={{
                      fontSize: '9px',
                      letterSpacing: '0.12em',
                      color: '#7A756D',
                      border: '1px solid rgba(17,17,17,0.18)',
                      padding: '3px 7px',
                    }}
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hero image */}
      <div
        className="mx-6 md:mx-10 mb-0 overflow-hidden"
        style={{ backgroundColor: '#111111', aspectRatio: '16/7' }}
        data-cursor="open"
      >
        <img
          src={project.heroImage}
          alt={project.title}
          className="w-full h-full object-cover"
          style={{ opacity: 0.85 }}
        />
      </div>

      {/* Case study content */}
      <div className="px-6 md:px-10 max-w-4xl">
        {/* Context */}
        <div
          ref={el => { if (el) { sectionsRef.current[0] = el } }}
        >
          <div ref={contextReveal} className="reveal py-16 md:py-20" style={{ borderTop: '1px solid rgba(17,17,17,0.1)', marginTop: '48px' }}>
            <span className="font-mono block mb-6" style={{ fontSize: '9px', letterSpacing: '0.28em', color: '#C85F32' }}>
              01 / CONTEXT
            </span>
            <h2
              className="font-bold uppercase leading-tight mb-6"
              style={{ fontSize: 'clamp(20px, 3vw, 36px)', letterSpacing: '-0.03em', color: '#111111' }}
            >
              THE CONTEXT
            </h2>
            <p style={{ fontSize: '16px', color: '#111111', lineHeight: 1.8, fontWeight: 300 }}>
              {project.context}
            </p>
          </div>
        </div>

        {/* Problem */}
        <div ref={el => { if (el) sectionsRef.current[1] = el }}>
          <div className="py-16 md:py-20" style={{ borderTop: '1px solid rgba(17,17,17,0.1)' }}>
            <span className="font-mono block mb-6" style={{ fontSize: '9px', letterSpacing: '0.28em', color: '#C85F32' }}>
              02 / PROBLEM
            </span>
            <h2
              className="font-bold uppercase leading-tight mb-6"
              style={{ fontSize: 'clamp(20px, 3vw, 36px)', letterSpacing: '-0.03em', color: '#111111' }}
            >
              THE PROBLEM
            </h2>
            <p style={{ fontSize: '16px', color: '#111111', lineHeight: 1.8, fontWeight: 300 }}>
              {project.problem}
            </p>
          </div>
        </div>

        {/* Objective */}
        <div
          className="py-12 px-8 mb-12"
          style={{ backgroundColor: '#8b0000', color: '#F3F0E9' }}
        >
          <span className="font-mono block mb-4" style={{ fontSize: '9px', letterSpacing: '0.28em', color: '#7A756D' }}>
            OBJECTIVE
          </span>
          <p style={{ fontSize: '16px', color: '#F3F0E9', lineHeight: 1.8, fontWeight: 300 }}>
            {project.objective}
          </p>
        </div>

        {/* Process */}
        <div ref={el => { if (el) sectionsRef.current[2] = el }}>
          <div ref={processReveal} className="reveal py-16 md:py-20" style={{ borderTop: '1px solid rgba(17,17,17,0.1)' }}>
            <span className="font-mono block mb-6" style={{ fontSize: '9px', letterSpacing: '0.28em', color: '#C85F32' }}>
              03 / PROCESS
            </span>
            <h2
              className="font-bold uppercase leading-tight mb-6"
              style={{ fontSize: 'clamp(20px, 3vw, 36px)', letterSpacing: '-0.03em', color: '#111111' }}
            >
              THE PROCESS
            </h2>
            <p style={{ fontSize: '16px', color: '#111111', lineHeight: 1.8, fontWeight: 300 }}>
              {project.process}
            </p>
          </div>
        </div>

        {/* Outcome + Learnings */}
        <div ref={el => { if (el) sectionsRef.current[3] = el }}>
          <div ref={outcomeReveal} className="reveal py-16 md:py-20" style={{ borderTop: '1px solid rgba(17,17,17,0.1)' }}>
            <span className="font-mono block mb-6" style={{ fontSize: '9px', letterSpacing: '0.28em', color: '#C85F32' }}>
              04 / OUTCOME
            </span>
            <h2
              className="font-bold uppercase leading-tight mb-6"
              style={{ fontSize: 'clamp(20px, 3vw, 36px)', letterSpacing: '-0.03em', color: '#111111' }}
            >
              THE OUTCOME
            </h2>
            <p style={{ fontSize: '16px', color: '#111111', lineHeight: 1.8, fontWeight: 300 }}>
              {project.outcome}
            </p>
          </div>
        </div>

        <div ref={el => { if (el) sectionsRef.current[4] = el }}>
          <div className="py-16 md:py-20" style={{ borderTop: '1px solid rgba(17,17,17,0.1)' }}>
            <span className="font-mono block mb-6" style={{ fontSize: '9px', letterSpacing: '0.28em', color: '#C85F32' }}>
              05 / LEARNINGS
            </span>
            <h2
              className="font-bold uppercase leading-tight mb-6"
              style={{ fontSize: 'clamp(20px, 3vw, 36px)', letterSpacing: '-0.03em', color: '#111111' }}
            >
              LEARNINGS
            </h2>
            <p style={{ fontSize: '16px', color: '#111111', lineHeight: 1.8, fontWeight: 300, fontStyle: 'italic' }}>
              "{project.learnings}"
            </p>
          </div>
        </div>
      </div>

      {/* Next project */}
      <div
        className="mx-6 md:mx-10 mb-0 p-8 md:p-12 flex flex-col md:flex-row items-start md:items-end justify-between gap-6 border-t cursor-pointer group"
        style={{ borderColor: 'rgba(17,17,17,0.12)', backgroundColor: '#8b0000' }}
        onClick={() => navigate({ type: 'project', id: nextProject.id })}
        data-cursor="view"
        role="button"
        tabIndex={0}
        onKeyDown={e => e.key === 'Enter' && navigate({ type: 'project', id: nextProject.id })}
        aria-label={`Next project: ${nextProject.title}`}
      >
        <div>
          <span className="font-mono block mb-3" style={{ fontSize: '9px', letterSpacing: '0.28em', color: '#ffffff' }}>
            NEXT PROJECT
          </span>
          <h3
            className="font-black uppercase leading-none"
            style={{ fontSize: 'clamp(28px, 5vw, 64px)', letterSpacing: '-0.04em', color: '#F3F0E9' }}
          >
            {nextProject.title}
          </h3>
          <span className="font-mono block mt-2" style={{ fontSize: '9px', letterSpacing: '0.18em', color: '#ffffff' }}>
            {nextProject.category} — {nextProject.year}
          </span>
        </div>
        <span
          className="font-black transition-transform duration-300 group-hover:translate-x-2"
          style={{ fontSize: '32px', color: '#C85F32' }}
        >
          →
        </span>
      </div>
    </div>
  )
}
