import { useEffect, useState } from 'react'
import type { Page } from '../App'

interface NavProps {
  page: Page
  navigate: (to: Page) => void
  scrollToSection: (id: string) => void
}

export default function Nav({ page, navigate, scrollToSection }: NavProps) {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('projects')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60)

      const sections = ['contact', 'lab', 'about', 'projects']
      for (const id of sections) {
        const el = document.getElementById(id)
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= 120) {
            setActiveSection(id)
            break
          }
        }
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isHome = page === 'home'

 const navLinks = [
  {
    label: 'PROJECTS',
    action: () => scrollToSection('projects'),
    id: 'projects'
  },
  {
    label: 'ABOUT',
    action: () => scrollToSection('about'),
    id: 'about'
  },
  {
    label: 'CONTACT',
    action: () => scrollToSection('contact'),
    id: 'contact'
  },
]

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 py-5 transition-all duration-500"
      style={{
        backgroundColor: scrolled ? 'rgba(243,240,233,0.96)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(17,17,17,0.08)' : '1px solid transparent',
      }}
    >
      

      {/* Navigation + Resume */}
<div className="relative flex items-center w-full">

  {/* Left navigation links */}
  <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-6 md:gap-8">
    {navLinks.map(({ label, action, id }) => {
      const isActive = isHome && activeSection === id

      return (
        <button
          key={label}
          onClick={action}
          className="hidden md:block font-mono text-[10px] tracking-[0.18em] uppercase transition-all duration-200"
          style={{
            color: isActive ? '#C85F32' : '#111111',
            opacity: isActive ? 1 : 0.5,
          }}
        >
          {label}
        </button>
      )
    })}
  </div>

  {/* Resume pushed completely to the right */}
  <a
    href="Imran_CV.pdf"
    className="ml-auto font-mono text-[18px] tracking-[0.18em] uppercase border transition-all duration-200 px-3 py-1.5"
    style={{
      color: '#111111',
      borderColor: 'rgba(17,17,17,0.2)',
      borderRadius: '4px',
    }}
    onMouseEnter={e => {
      const el = e.currentTarget
      el.style.borderColor = '#111111'
      el.style.backgroundColor = '#8B0000'
      el.style.color = '#F3F0E9'
    }}
    onMouseLeave={e => {
      const el = e.currentTarget
      el.style.borderColor = 'rgba(17,17,17,0.2)'
      el.style.backgroundColor = 'transparent'
      el.style.color = '#111111'
    }}
  >
    RESUME
  </a>
  {/* IK Logo */}
<button
  onClick={() => {
    navigate('home')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }}
  className="absolute left-6 md:left-0 font-black select-none"
  style={{
    fontSize: '20px',
    letterSpacing: '-0.08em',
    color: '#8B0000',
    lineHeight: 1,
  }}
  aria-label="Home"
>
  IK
</button>

  {/* Mobile hamburger */}
  <div className="flex flex-col gap-1 md:hidden ml-4">
    <div className="w-5 h-px" style={{ backgroundColor: '#111111' }} />
    <div className="w-3 h-px" style={{ backgroundColor: '#111111' }} />
  </div>

</div>
</nav>
  )
}


