import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function CaseStudyOutline() {
  const location  = useLocation()
  const [open,     setOpen]     = useState(false)
  const [sections, setSections] = useState([])
  const [activeId, setActiveId] = useState(null)
  const [visible,  setVisible]  = useState(false)

  const isCaseStudy = location.pathname.startsWith('/projects/')

  // Show button only after scrolling past the hero
  useEffect(() => {
    if (!isCaseStudy) { setVisible(false); return }
    const onScroll = () => setVisible(window.scrollY > 220)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [isCaseStudy])

  // Auto-discover sections from cs-section-label elements
  useEffect(() => {
    if (!isCaseStudy) { setSections([]); setOpen(false); return }

    const discover = () => {
      const labels  = document.querySelectorAll('.cs-section-label')
      const found   = []

      // Always add Overview → scrolls to top
      found.push({ id: 'cs-outline-top', label: 'Overview' })

      labels.forEach((label, i) => {
        const section = label.closest('.cs-section')
        if (!section) return
        const id = `cs-outline-${i}`
        section.setAttribute('id', id)
        found.push({ id, label: label.textContent.trim() })
      })

      setSections(found)
      setActiveId(found[0]?.id ?? null)
    }

    // Slight delay for React to finish rendering
    const t = setTimeout(discover, 150)
    return () => clearTimeout(t)
  }, [location.pathname, isCaseStudy])

  // IntersectionObserver: track active section
  useEffect(() => {
    if (!sections.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the topmost intersecting entry
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible.length) setActiveId(visible[0].target.id)
      },
      { rootMargin: '-15% 0px -55% 0px', threshold: 0 }
    )

    sections.forEach(s => {
      if (s.id === 'cs-outline-top') return
      const el = document.getElementById(s.id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [sections])

  // Close on route change
  useEffect(() => { setOpen(false) }, [location.pathname])

  // Close on Escape
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const scrollTo = (id) => {
    if (id === 'cs-outline-top') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      const el = document.getElementById(id)
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
    setOpen(false)
  }

  if (!isCaseStudy) return null

  return (
    <>
      {/* ── Toggle button — fixed bottom-left ── */}
      <button
        onClick={() => setOpen(o => !o)}
        aria-label="Case study outline"
        style={{
          position:   'fixed',
          bottom:      72,
          left:        28,
          zIndex:      600,
          width:       48,
          height:      48,
          borderRadius: 14,
          background:  'rgba(22,22,22,0.92)',
          border:      '1px solid rgba(255,255,255,0.09)',
          backdropFilter:        'blur(14px)',
          WebkitBackdropFilter:  'blur(14px)',
          display:     'flex',
          alignItems:  'center',
          justifyContent: 'center',
          cursor:      'pointer',
          boxShadow:   '0 8px 32px rgba(0,0,0,0.5)',
          opacity:     visible ? 1 : 0,
          transform:   visible ? 'translateY(0) scale(1)' : 'translateY(8px) scale(0.95)',
          transition:  'opacity 0.25s, transform 0.25s',
          pointerEvents: visible ? 'auto' : 'none',
        }}
      >
        {/* Bullet-list icon matching reference */}
        <svg width="17" height="13" viewBox="0 0 17 13" fill="none">
          <circle cx="1.5" cy="1.5"  r="1.5" fill="rgba(255,255,255,0.45)"/>
          <rect   x="5"   y="0.75"  width="12" height="1.5" rx="0.75" fill="rgba(255,255,255,0.35)"/>
          <circle cx="1.5" cy="6.5"  r="1.5" fill="rgba(255,255,255,0.45)"/>
          <rect   x="5"   y="5.75"  width="12" height="1.5" rx="0.75" fill="rgba(255,255,255,0.35)"/>
          <circle cx="1.5" cy="11.5" r="1.5" fill="rgba(255,255,255,0.45)"/>
          <rect   x="5"   y="10.75" width="12" height="1.5" rx="0.75" fill="rgba(255,255,255,0.35)"/>
        </svg>
      </button>

      {/* ── Backdrop ── */}
      <div
        onClick={() => setOpen(false)}
        style={{
          position: 'fixed', inset: 0,
          zIndex:   598,
          background: 'rgba(0,0,0,0.25)',
          opacity:  open ? 1 : 0,
          pointerEvents: open ? 'auto' : 'none',
          transition: 'opacity 0.25s',
        }}
      />

      {/* ── Sidebar ── */}
      <nav
        style={{
          position:  'fixed',
          left: 0, top: 0, bottom: 0,
          width:      280,
          zIndex:     599,
          background: '#0d0d0d',
          borderRight: '1px solid rgba(255,255,255,0.07)',
          transform: open ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.3s cubic-bezier(0.4,0,0.2,1)',
          display:   'flex',
          flexDirection: 'column',
          paddingTop: 80,
          overflowY: 'auto',
        }}
      >
        {/* Header label */}
        <p style={{
          fontFamily:    'var(--mono)',
          fontSize:       9,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color:         'rgba(255,255,255,0.28)',
          padding:       '0 32px',
          marginBottom:   32,
        }}>Case Study</p>

        {/* Section items */}
        {sections.map(s => {
          const isActive = activeId === s.id
          return (
            <button
              key={s.id}
              onClick={() => scrollTo(s.id)}
              style={{
                textAlign:   'left',
                background:  isActive ? 'rgba(255,255,255,0.055)' : 'transparent',
                border:      'none',
                borderRadius: isActive ? 6 : 0,
                margin:      isActive ? '2px 12px' : '0',
                width:       isActive ? 'calc(100% - 24px)' : '100%',
                padding:     '13px 20px',
                cursor:      'pointer',
                display:     'flex',
                alignItems:  'center',
                gap:          14,
                transition:  'background 0.15s',
              }}
            >
              <span style={{
                width:        5,
                height:       5,
                borderRadius: '50%',
                background:   isActive
                  ? 'rgba(255,255,255,0.75)'
                  : 'rgba(255,255,255,0.2)',
                flexShrink:   0,
                transition:   'background 0.15s',
              }}/>
              <span style={{
                fontFamily:    'var(--mono)',
                fontSize:       10.5,
                letterSpacing: '0.13em',
                textTransform: 'uppercase',
                color:         isActive
                  ? 'rgba(255,255,255,0.88)'
                  : 'rgba(255,255,255,0.38)',
                transition:    'color 0.15s',
                lineHeight:     1.3,
              }}>
                {s.label}
              </span>
            </button>
          )
        })}
      </nav>
    </>
  )
}
