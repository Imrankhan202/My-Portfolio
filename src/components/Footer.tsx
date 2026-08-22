import type { Page } from '../App'

interface FooterProps {
  navigate: (to: Page) => void
  scrollToSection: (id: string) => void
}

export default function Footer({ navigate, scrollToSection }: FooterProps) {
  return (
    <footer className="relative z-10 border-t" style={{ borderColor: 'rgba(17,17,17,0.12)', backgroundColor: '#F3F0E9' }}>
<div className="px-6 md:px-10 py-20 flex flex-col md:flex-row items-center justify-between gap-12 translate-y-10">
          <div>
          <div className="font-black uppercase leading-none tracking-[-0.04em]" style={{ fontSize: 'clamp(40px, 4vw, 40px)', color: '#111111' }}>
            IMRAN KHAN
          </div>
          <div className="flex gap-6 mt-4">
            {['SOFTWARE ENGINEER', 'DESIGNER', 'BUILDER'].map((label, i) => (
              <span key={label} className="font-mono text-[10px] tracking-[0.45em] uppercase" style={{ color: i === 0 ? '#C85F32' : '#7A756D' }}>
                {label}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4 items-start md:items-end">
          <div className="flex gap-6">
            {[
              { label: 'PROJECTS', action: () => { navigate('home'); window.scrollTo({ top: 0, behavior: 'smooth' }) } },
              { label: 'ABOUT', action: () => scrollToSection('about') },
              { label: 'CONTACT', action: () => scrollToSection('contact') },
            ].map(({ label, action }) => (
              <button
                key={label}
                onClick={action}
                className="font-mono text-[10px] tracking-[0.2em] uppercase transition-opacity duration-200 hover:opacity-100"
                style={{ color: '#111111', opacity: 0.5 }}
              >
                {label}
              </button>
            ))}
          </div>
          <div className="flex gap-4">
            {[
              { label: 'GITHUB', href: 'https://github.com/' },
              { label: 'LINKEDIN', href: 'https://linkedin.com/in/imrankhan8183' },
              { label: 'BEHANCE', href: 'https://www.behance.net/ImranKhanPathaan' },
            ].map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className="font-mono text-[10px] tracking-[0.2em] uppercase transition-colors duration-200"
                style={{ color: '#7A756D' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#C85F32' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = '#7A756D' }}
              >
                {label} ↗
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="px-6 md:px-10 py-4 flex items-center justify-between border-t" style={{ borderColor: 'rgba(17,17,17,0.08)' }}>
        <span className="font-mono text-[9px] tracking-[0.2em] uppercase" style={{ color: '#7A756D' }}>© 2026 IMRAN KHAN</span>
        <span className="font-mono text-[9px] tracking-[0.2em] uppercase" style={{ color: '#C85F32' }}>IN PROGRESS...</span>
      </div>
    </footer>
  )
}
