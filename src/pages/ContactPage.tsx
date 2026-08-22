import { useState } from 'react'
import { useReveal } from '../hooks/useReveal'

export default function ContactPage() {
  const headerReveal = useReveal()
  const formReveal = useReveal()

  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
  }

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

  return (
    <div style={{ backgroundColor: '#F3F0E9', color: '#111111', paddingTop: '80px' }}>
      {/* Hero */}
      <section className="px-6 md:px-10 py-16 md:py-24">
        <div ref={headerReveal} className="reveal">
          <div
            className="flex flex-col md:flex-row md:items-end md:justify-between mb-14"
            style={{ borderTop: '1px solid rgba(17,17,17,0.12)', paddingTop: '24px' }}
          >
            <div>
              <span className="font-mono" style={{ fontSize: '9px', letterSpacing: '0.32em', color: '#7A756D' }}>CONTACT —</span>
              <h1
                className="font-black uppercase leading-none mt-1"
                style={{ fontSize: 'clamp(40px, 7vw, 100px)', letterSpacing: '-0.04em', color: '#111111' }}
              >
                HAVE AN IDEA?<br />LET'S BUILD<br />SOMETHING.
              </h1>
            </div>
          </div>

          {/* Available for */}
          <div className="mb-14">
            <span className="font-mono block mb-5" style={{ fontSize: '9px', letterSpacing: '0.28em', color: '#7A756D' }}>
              AVAILABLE FOR
            </span>
            <div className="flex flex-wrap gap-3">
              {['UI/UX DESIGN', 'PRODUCT DESIGN', 'FRONTEND DEVELOPMENT', 'AI AUTOMATION', 'CREATIVE PROJECTS', 'FREELANCE'].map(item => (
                <span
                  key={item}
                  className="font-mono"
                  style={{
                    fontSize: '10px',
                    letterSpacing: '0.15em',
                    color: '#111111',
                    border: '1px solid rgba(17,17,17,0.18)',
                    padding: '6px 12px',
                  }}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Direct links */}
          <div className="flex flex-col gap-4">
            <a
              href="mailto:imran@example.com"
              className="group flex items-center gap-4 py-4 transition-colors duration-200"
              style={{ borderTop: '1px solid rgba(17,17,17,0.1)', color: '#111111' }}
            >
              <span className="font-mono" style={{ fontSize: '9px', letterSpacing: '0.22em', color: '#7A756D', width: '5rem' }}>EMAIL</span>
              <span
                className="font-bold uppercase transition-colors duration-200"
                style={{ fontSize: 'clamp(18px, 3vw, 32px)', letterSpacing: '-0.02em' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#C85F32' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = '#111111' }}
              >
                EMAIL ME →
               
              </span>
            </a>
            {[
              { label: 'LINKEDIN', href: 'https://linkedin.com/in/imrankhan8183', text: 'LINKEDIN →' },
              { label: 'BEHANCE', href: 'https://www.behance.net/ImranKhanPathaan', text: 'BEHANCE →' },
              { label: 'GITHUB', href: 'https://github.com/', text: 'GITHUB →' },
            ].map(({ label, href, text }) => (
              <a
                key={label}
                href={href}
                className="flex items-center gap-4 py-4 transition-colors duration-200"
                style={{ borderTop: '1px solid rgba(17,17,17,0.1)', color: '#111111' }}
              >
                <span className="font-mono" style={{ fontSize: '9px', letterSpacing: '0.22em', color: '#7A756D', width: '5rem' }}>{label}</span>
                <span
                  className="font-bold uppercase transition-colors duration-200"
                  style={{ fontSize: 'clamp(18px, 3vw, 32px)', letterSpacing: '-0.02em' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#C85F32' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = '#111111' }}
                >
                  {text}
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Contact form */}
      <section
        className="px-6 md:px-10 py-16 md:py-24"
        style={{ borderTop: '1px solid rgba(17,17,17,0.1)' }}
      >
        <div ref={formReveal} className="reveal">
          <div className="max-w-2xl">
            <span className="font-mono block mb-10" style={{ fontSize: '9px', letterSpacing: '0.28em', color: '#7A756D' }}>
              OR SEND A MESSAGE
            </span>

            {sent ? (
              <div className="py-16">
                <div
                  className="font-mono mb-3"
                  style={{ fontSize: '9px', letterSpacing: '0.25em', color: '#C85F32' }}
                >
                  MESSAGE SENT
                </div>
                <h3
                  className="font-bold uppercase leading-tight"
                  style={{ fontSize: 'clamp(24px, 4vw, 48px)', letterSpacing: '-0.03em', color: '#111111' }}
                >
                  I'll be in touch.
                </h3>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-10">
                <div>
                  <label className="font-mono block mb-2" style={{ fontSize: '9px', letterSpacing: '0.22em', color: '#7A756D' }}>
                    YOUR NAME
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    style={inputStyle}
                    placeholder="How should I address you?"
                    onFocus={e => { (e.currentTarget as HTMLElement).style.borderBottomColor = '#111111' }}
                    onBlur={e => { (e.currentTarget as HTMLElement).style.borderBottomColor = 'rgba(17,17,17,0.2)' }}
                  />
                </div>
                <div>
                  <label className="font-mono block mb-2" style={{ fontSize: '9px', letterSpacing: '0.22em', color: '#7A756D' }}>
                    EMAIL
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    style={inputStyle}
                    placeholder="Where should I reply?"
                    onFocus={e => { (e.currentTarget as HTMLElement).style.borderBottomColor = '#111111' }}
                    onBlur={e => { (e.currentTarget as HTMLElement).style.borderBottomColor = 'rgba(17,17,17,0.2)' }}
                  />
                </div>
                <div>
                  <label className="font-mono block mb-2" style={{ fontSize: '9px', letterSpacing: '0.22em', color: '#7A756D' }}>
                    MESSAGE
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                    style={{ ...inputStyle, resize: 'none' }}
                    placeholder="What's on your mind?"
                    onFocus={e => { (e.currentTarget as HTMLElement).style.borderBottomColor = '#111111' }}
                    onBlur={e => { (e.currentTarget as HTMLElement).style.borderBottomColor = 'rgba(17,17,17,0.2)' }}
                  />
                </div>
                <div>
                  <button
                    type="submit"
                    className="font-mono transition-all duration-300"
                    style={{
                      fontSize: '10px',
                      letterSpacing: '0.22em',
                      border: '1px solid #111111',
                      padding: '14px 28px',
                      color: '#111111',
                      backgroundColor: 'transparent',
                    }}
                    onMouseEnter={e => {
                      const el = e.currentTarget
                      el.style.backgroundColor = '#111111'
                      el.style.color = '#F3F0E9'
                    }}
                    onMouseLeave={e => {
                      const el = e.currentTarget
                      el.style.backgroundColor = 'transparent'
                      el.style.color = '#111111'
                    }}
                  >
                    SEND MESSAGE →
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
