import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const raw = { x: 0, y: 0 }
    const smooth = { x: 0, y: 0 }
    let raf: number

    const onMove = (e: MouseEvent) => {
      raw.x = e.clientX
      raw.y = e.clientY
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${raw.x}px, ${raw.y}px)`
      }
    }

    const tick = () => {
      smooth.x += (raw.x - smooth.x) * 0.1
      smooth.y += (raw.y - smooth.y) * 0.1
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${smooth.x}px, ${smooth.y}px)`
      }
      if (labelRef.current) {
        labelRef.current.style.transform = `translate(${smooth.x + 16}px, ${smooth.y - 6}px)`
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    window.addEventListener('mousemove', onMove)

    const setLabel = (text: string, big = false) => {
      if (!labelRef.current || !ringRef.current) return
      labelRef.current.textContent = text
      labelRef.current.style.opacity = text ? '1' : '0'
      ringRef.current.style.opacity = text ? '0' : '1'
      if (big) {
        ringRef.current.style.width = '48px'
        ringRef.current.style.height = '48px'
        ringRef.current.style.borderColor = '#C85F32'
      } else {
        ringRef.current.style.width = '22px'
        ringRef.current.style.height = '22px'
        ringRef.current.style.borderColor = 'rgba(17,17,17,0.4)'
      }
    }

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement
      if (t.closest('[data-cursor="view"]')) {
        setLabel('VIEW →')
      } else if (t.closest('[data-cursor="open"]')) {
        setLabel('OPEN')
      } else if (t.closest('button, a, [role="button"]')) {
        setLabel('', true)
      } else {
        setLabel('')
      }
    }

    document.addEventListener('mouseover', onOver)
    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      {/* Small precise dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          width: '3px',
          height: '3px',
          borderRadius: '50%',
          backgroundColor: '#111111',
          marginLeft: '-1.5px',
          marginTop: '-1.5px',
          willChange: 'transform',
        }}
      />
      {/* Lagging ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full border transition-all duration-200"
        style={{
          width: '22px',
          height: '22px',
          borderColor: 'rgba(17,17,17,0.4)',
          marginLeft: '-11px',
          marginTop: '-11px',
          willChange: 'transform',
        }}
      />
      {/* Label */}
      <div
        ref={labelRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] font-mono"
        style={{
          fontSize: '9px',
          letterSpacing: '0.2em',
          color: '#111111',
          opacity: 0,
          transition: 'opacity 0.15s ease',
          backgroundColor: '#F3F0E9',
          padding: '3px 6px',
          border: '1px solid #111111',
          whiteSpace: 'nowrap',
          marginTop: '-6px',
          willChange: 'transform',
        }}
      />
    </>
  )
}
