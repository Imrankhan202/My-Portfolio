import { useReveal } from '../hooks/useReveal'

export default function AboutPage() {
  const heroReveal = useReveal()
  const expReveal = useReveal()
  const skillReveal = useReveal()

  return (
    <div style={{ backgroundColor: '#F3F0E9', color: '#111111', paddingTop: '80px' }}>
      {/* Header */}
      <section className="px-6 md:px-10 py-16 md:py-24">
        <div ref={heroReveal} className="reveal">
          <div className="flex items-start justify-between flex-wrap gap-4 mb-12" style={{ borderTop: '1px solid rgba(17,17,17,0.12)', paddingTop: '24px' }}>
            <div>
              <span className="font-mono" style={{ fontSize: '9px', letterSpacing: '0.32em', color: '#7A756D' }}>ABOUT —</span>
              <h1
                className="font-black uppercase leading-none mt-1"
                style={{ fontSize: 'clamp(48px, 8vw, 110px)', letterSpacing: '-0.04em', color: '#111111' }}
              >
                ABOUT<br />IMRAN
              </h1>
            </div>
            <span className="font-mono" style={{ fontSize: '9px', letterSpacing: '0.28em', color: '#C85F32' }}>
              PROFILE / IN PROGRESS...
            </span>
          </div>

          {/* Bio block */}
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-12 md:gap-20">
            <div>
              <p style={{ fontSize: '18px', lineHeight: 1.8, color: '#111111', fontWeight: 300, marginBottom: '20px' }}>
                I'm a software engineer and product designer with a focus on building useful, well-crafted digital experiences. My work sits at the intersection of design and engineering — I'm equally comfortable in Figma and in a code editor.
              </p>
              <p style={{ fontSize: '15px', lineHeight: 1.8, color: '#7A756D', fontWeight: 300, marginBottom: '20px' }}>
                I graduated with a degree in Software Engineering and have spent my time since building a range of products — from healthcare platforms for rural communities to AI-powered learning tools.
              </p>
              <p style={{ fontSize: '15px', lineHeight: 1.8, color: '#7A756D', fontWeight: 300 }}>
                I'm particularly interested in how AI changes the nature of product design — not as a feature to add, but as a fundamentally different way of thinking about what software can do.
              </p>
            </div>
            <div className="flex flex-col gap-8">
              {[
                {
                  label: 'WHAT I DO',
                  items: ['UI/UX Design', 'Frontend Development', 'Product Design', 'AI & Automation'],
                },
                {
                  label: 'WHAT I AM LEARNING',
                  items: ['AI product design patterns', 'n8n workflow automation', 'Advanced React patterns', 'Motion design'],
                },
                {
                  label: 'WHAT I CARE ABOUT',
                  items: ['Clarity over complexity', 'Real-world impact', 'Craft at every scale', 'Building things that last'],
                },
              ].map(({ label, items }) => (
                <div key={label}>
                  <span className="font-mono block mb-3" style={{ fontSize: '9px', letterSpacing: '0.28em', color: '#C85F32' }}>
                    {label}
                  </span>
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
        </div>
      </section>

      {/* Experience timeline */}
      <section
        className="px-6 md:px-10 py-16 md:py-24"
        style={{ borderTop: '1px solid rgba(17,17,17,0.1)' }}
      >
        <div ref={expReveal} className="reveal">
          <div className="mb-12">
            <span className="font-mono" style={{ fontSize: '9px', letterSpacing: '0.32em', color: '#7A756D' }}>EXPERIENCE —</span>
            <h2
              className="font-black uppercase leading-none mt-1"
              style={{ fontSize: 'clamp(32px, 5vw, 64px)', letterSpacing: '-0.04em', color: '#111111' }}
            >
              TIMELINE
            </h2>
          </div>

          <div>
            {[
              {
                year: '2026',
                role: 'FINAL YEAR PROJECT',
                company: 'University',
                desc: 'Designed and developed PriceWise, a full-stack price comparison platform, as a final year software engineering project. Responsible for the entire design system, frontend architecture, and backend API.',
              },
              {
                year: '2025',
                role: 'PRODUCT DESIGNER',
                company: 'Allah Nawaz Hospital (freelance)',
                desc: 'Led product design for a rural healthcare application serving a community in Pakistan. Conducted on-site user research, designed the full patient and admin experience, and produced a developer-ready design system.',
              },
              {
                year: '2024–2025',
                role: 'UI/UX DESIGNER',
                company: 'Personal Projects',
                desc: 'Designed and built a range of personal projects spanning AI tools, AR experiences, and editorial web platforms. Each project served as a self-directed learning exercise in a new problem domain.',
              },
              {
                year: '2022–2026',
                role: 'BSc SOFTWARE ENGINEERING',
                company: 'University',
                desc: 'Studied software engineering with a focus on human-computer interaction, web technologies, and software architecture. Developed strong foundations in both design thinking and engineering practice.',
              },
            ].map((item, i) => (
              <div
                key={i}
                className="flex gap-6 md:gap-16 py-8 md:py-10"
                style={{ borderTop: '1px solid rgba(17,17,17,0.1)' }}
              >
                <span
                  className="font-mono shrink-0"
                  style={{ fontSize: '10px', letterSpacing: '0.12em', color: '#C85F32', width: '5rem', paddingTop: '2px' }}
                >
                  {item.year}
                </span>
                <div>
                  <div className="flex flex-col md:flex-row md:items-center md:gap-6 mb-3">
                    <span
                      className="font-bold uppercase"
                      style={{ fontSize: '15px', letterSpacing: '-0.01em', color: '#111111' }}
                    >
                      {item.role}
                    </span>
                    <span className="font-mono" style={{ fontSize: '10px', color: '#7A756D', letterSpacing: '0.1em' }}>
                      {item.company}
                    </span>
                  </div>
                  <p style={{ fontSize: '13px', color: '#7A756D', lineHeight: 1.7, fontWeight: 300, maxWidth: '560px' }}>
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills typographic map */}
      <section
        className="px-6 md:px-10 py-16 md:py-24"
        style={{ borderTop: '1px solid rgba(17,17,17,0.1)' }}
      >
        <div ref={skillReveal} className="reveal">
          <div className="mb-12">
            <span className="font-mono" style={{ fontSize: '9px', letterSpacing: '0.32em', color: '#7A756D' }}>SKILLS —</span>
            <h2
              className="font-black uppercase leading-none mt-1"
              style={{ fontSize: 'clamp(32px, 5vw, 64px)', letterSpacing: '-0.04em', color: '#111111' }}
            >
              CAPABILITIES
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-6">
            {[
              {
                category: 'DESIGN',
                skills: [
                  { name: 'UI/UX', size: '20px', weight: 600 },
                  { name: 'Product Design', size: '17px', weight: 400 },
                  { name: 'Wireframing', size: '16px', weight: 300 },
                  { name: 'Prototyping', size: '15px', weight: 300 },
                  { name: 'Design Systems', size: '14px', weight: 300 },
                  { name: 'Visual Design', size: '13px', weight: 300 },
                ],
              },
              {
                category: 'DEVELOPMENT',
                skills: [
                  { name: 'HTML', size: '20px', weight: 600 },
                  { name: 'CSS', size: '18px', weight: 500 },
                  { name: 'JavaScript', size: '17px', weight: 400 },
                  { name: 'React', size: '16px', weight: 400 },
                  { name: 'Node.js', size: '15px', weight: 300 },
                  { name: 'MongoDB', size: '14px', weight: 300 },
                  { name: 'Express', size: '13px', weight: 300 },
                ],
              },
              {
                category: 'AI / AUTO',
                skills: [
                  { name: 'AI Product Design', size: '16px', weight: 500 },
                  { name: 'n8n', size: '18px', weight: 600 },
                  { name: 'Workflow Automation', size: '14px', weight: 300 },
                  { name: 'AI Interfaces', size: '14px', weight: 300 },
                  { name: 'Prompt Design', size: '13px', weight: 300 },
                ],
              },
              {
                category: 'CREATIVE',
                skills: [
                  { name: 'Figma', size: '20px', weight: 600 },
                  { name: 'Photoshop', size: '17px', weight: 400 },
                  { name: 'Illustrator', size: '15px', weight: 300 },
                  { name: 'After Effects', size: '14px', weight: 300 },
                  { name: 'Blender', size: '13px', weight: 300 },
                  { name: 'Canva', size: '12px', weight: 300 },
                ],
              },
            ].map(({ category, skills }) => (
              <div key={category}>
                <span className="font-mono block mb-5" style={{ fontSize: '9px', letterSpacing: '0.28em', color: '#C85F32' }}>
                  {category}
                </span>
                <div className="flex flex-col gap-1.5">
                  {skills.map(({ name, size, weight }) => (
                    <span key={name} style={{ fontSize: size, fontWeight: weight, color: '#111111', lineHeight: 1.5 }}>
                      {name}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
