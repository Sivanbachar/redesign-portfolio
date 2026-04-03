import { useState, useEffect, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { PROJECTS } from '../data/projects.js'

export default function Nav() {
  const navigate = useNavigate()
  const location = useLocation()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const timerRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mega menu on route change
  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  const openMenu = () => { clearTimeout(timerRef.current); setOpen(true) }
  const closeMenu = () => { timerRef.current = setTimeout(() => setOpen(false), 180) }

  const isProjectsActive = location.pathname.startsWith('/projects')

  return (
    <>
      <nav className={`nav${scrolled ? ' sc' : ''}`}>
        <button
          className="nav-logo"
          onClick={() => navigate('/')}
          aria-label="Home"
        >
          <img src="/logo.svg" alt="Sivan Baum" style={{ width: 24, height: 24, display: 'block' }} />
        </button>
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
          <p className="mega-label">Selected Work</p>
          <div className="mega-row">
            {PROJECTS.map((p) => (
              <div
                key={p.id}
                className="mega-thumb"
                onClick={() => {
                  navigate(`/projects/${p.id}`)
                  setOpen(false)
                }}
              >
                <div className="mega-thumb-img" style={{ background: p.thumbBg }}>
                  {p.thumbImg ? (
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
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className={`mega-overlay${open ? ' open' : ''}`} onClick={() => setOpen(false)} />
    </>
  )
}
