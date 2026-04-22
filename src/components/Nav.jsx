import { useState, useEffect, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { PROJECTS } from '../data/projects.js'
import LogoMark from './LogoMark.jsx'

export default function Nav() {
  const navigate = useNavigate()
  const location = useLocation()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const timerRef = useRef(null)
  const lastY = useRef(0)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 20)
      // Hide on scroll down, reveal on scroll up; ignore tiny jitter
      if (Math.abs(y - lastY.current) > 4) {
        setHidden(y > lastY.current && y > 80)
        lastY.current = y
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mega menu on route change
  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  // Blur page content when mega menu is open
  useEffect(() => {
    document.body.classList.toggle('mega-open', open)
    return () => document.body.classList.remove('mega-open')
  }, [open])

  const openMenu = () => { clearTimeout(timerRef.current); setOpen(true) }
  const closeMenu = () => { timerRef.current = setTimeout(() => setOpen(false), 180) }

  const isProjectsActive = location.pathname.startsWith('/projects')

  return (
    <>
      <nav className={`nav${scrolled ? ' sc' : ''}${hidden && !open ? ' nav-hidden' : ''}`}>
        <LogoMark onClick={() => navigate('/')} />
        <div className="nav-links">
          <button
            className={`nav-btn${open || isProjectsActive ? ' act' : ''}`}
            onMouseEnter={openMenu}
            onMouseLeave={closeMenu}
            onClick={() => setOpen((o) => !o)}
          >
            Projects
          </button>
          <button
            className={`nav-btn${location.pathname === '/about' ? ' act' : ''}`}
            onClick={() => navigate('/about')}
          >
            Resume
          </button>
        </div>
      </nav>

      <div
        className={`mega${open ? ' open' : ''}`}
        onMouseEnter={openMenu}
        onMouseLeave={closeMenu}
      >
        <div className="mega-inner">
          <div className="mega-cols">

            {/* Selected Work */}
            <div className="mega-col mega-col--work">
              <p className="mega-label">Selected Work</p>
              <div className="mega-row">
                {PROJECTS.filter(p => !p.hidden).map((p) => (
                  <div
                    key={p.id}
                    className="mega-thumb"
                    onClick={() => {
                      navigate(`/projects/${p.id}`)
                      setOpen(false)
                    }}
                  >
                    <div className="mega-thumb-img" style={{ background: p.thumbBg }}>
                      {p.locked ? (
                        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.2)' }}>
                          <svg width="16" height="18" viewBox="0 0 18 20" fill="none">
                            <rect x="3" y="9" width="12" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
                            <path d="M6 9V6a3 3 0 0 1 6 0v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                          </svg>
                        </div>
                      ) : p.thumbImg ? (
                        <img
                          src={`/${p.thumbImg}`}
                          alt={p.title}
                          style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 4 }}
                        />
                      ) : (
                        <span className="mega-thumb-icon">{p.thumbIcon}</span>
                      )}
                    </div>
                    <p className="mega-thumb-company">{p.company}</p>
                    <p className="mega-thumb-name">{p.title}</p>
                    {p.type && <p className="mega-thumb-type">{p.type}</p>}
                  </div>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div className="mega-divider" />

            {/* AI Work */}
            <div className="mega-col mega-col--ai">
              <p className="mega-label">My AI Work</p>
              <div
                className="mega-ai-card"
                onClick={() => { navigate('/ai'); setOpen(false) }}
              >
                <div className="mega-ai-img">
                  <img src="/images/ai/currently.png" alt="AI-Augmented Design" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 4 }} />
                </div>
                <p className="mega-thumb-company">Personal · Ongoing</p>
                <p className="mega-thumb-name">AI Augmented Design</p>
                <p className="mega-ai-sub">Building and learning at the edge of AI + product design</p>
              </div>
            </div>

          </div>
        </div>
      </div>
      <div className={`mega-overlay${open ? ' open' : ''}`} onClick={() => setOpen(false)} />
    </>
  )
}
