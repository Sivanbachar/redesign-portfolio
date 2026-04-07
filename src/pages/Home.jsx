import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useScrollReveal } from '../hooks/useScrollReveal.js'
import { usePaginatedScroll } from '../hooks/usePaginatedScroll.js'
import { useScramble } from '../hooks/useScramble.js'
import ElectricGrid from '../components/ElectricGrid.jsx'
import { PROJECTS } from '../data/projects.js'

// Keyboard hint is only useful on devices with physical keyboards
const isTouch = () =>
  typeof window !== 'undefined' &&
  (('ontouchstart' in window) || window.matchMedia('(pointer: coarse)').matches)

function KeyboardHint() {
  const [vis, setVis] = useState(false)
  useEffect(() => {
    if (isTouch()) return  // no keyboard on touch — skip
    const check = () => {
      const proj = document.querySelector('.projects-sec')
      if (!proj) return
      const { top, bottom } = proj.getBoundingClientRect()
      setVis(top < window.innerHeight && bottom > 0)
    }
    window.addEventListener('scroll', check, { passive: true })
    const interval = setInterval(check, 250)
    check()
    return () => {
      window.removeEventListener('scroll', check)
      clearInterval(interval)
    }
  }, [])
  return (
    <div className={`kb-hint${vis ? ' vis' : ''}`} aria-hidden="true">
      <span className="kb-hint-text">Scroll or use</span>
      <div className="kb-keys">
        <div className="kb-key">↑</div>
        <div className="kb-key">↓</div>
      </div>
    </div>
  )
}

function InteractiveHero() {
  const heroRef = useRef(null)
  const tagline = useScramble('SENIOR PRODUCT DESIGNER · AMAZON KINDLE')

  useEffect(() => {
    if (isTouch()) return  // filter:blur() on large composited elements crashes mobile Safari
    const onScroll = () => {
      if (!heroRef.current) return
      const p = Math.min(window.scrollY / (heroRef.current.offsetHeight * 0.55), 1)
      heroRef.current.style.filter = `blur(${p * 7}px)`
      heroRef.current.style.opacity = 1 - p * 0.55
      heroRef.current.style.transform = `translateY(${-p * 36}px)`
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="hero-wrap" ref={heroRef}>
      <div className="hero-content">
        <h1 className="hero-name">
          Sivan
          <br />
          Baum
        </h1>
        <div className="hero-tagline">{tagline}</div>
        <p className="hero-desc">
          I design product experiences that shape <strong>strategy</strong>,
          <br />
          not just interfaces.
        </p>
        <div className="hero-scroll">
          <span>Scroll</span>
          <span className="hero-scroll-chevron">∨</span>
        </div>
      </div>
    </div>
  )
}

export default function Home() {
  const navigate = useNavigate()
  useScrollReveal()
  usePaginatedScroll(true)

  return (
    <div className="pg">
      <ElectricGrid />
      <KeyboardHint />
      <InteractiveHero />

      <section className="intro-sec page-section" data-section="intro">
        <div className="intro-inner">
          <p className="intro-statement sr">
            I help teams define{' '}
            <span className="intro-gradient">what to build, not just how it looks.</span>
          </p>
        </div>
      </section>

      <section className="projects-sec">
        {PROJECTS.map((p, i) => (
          <div
            key={p.id}
            className="proj-panel page-section"
            data-section={p.id}
            onClick={() => navigate(`/projects/${p.id}`)}
          >
            <div className="proj-panel-inner">
              <div className="proj-text">
                <p className="proj-counter sr">
                  {String(i + 1).padStart(2, '0')} / {String(PROJECTS.length).padStart(2, '0')}
                </p>
                <p className="proj-type sr d1">{p.type}</p>
                <p className="proj-company sr d1">{p.company}</p>
                <h2 className="proj-title sr d2">{p.title}</h2>
                <p className="proj-desc sr d3">{p.tagline}</p>
                <span className="proj-link sr d4">{p.comingSoon ? 'Preview Available →' : 'View Case Study →'}</span>
              </div>
              <div className="proj-img-wrap">
                <div className="proj-img-block" style={{ background: p.thumbBg }}>
                  {p.thumbImg ? (
                    <img src={`/${p.thumbImg}`} alt={p.title} className="proj-img-photo" />
                  ) : (
                    <span style={{ fontSize: 48, opacity: 0.08 }}>{p.thumbIcon}</span>
                  )}
                  {p.comingSoon && (
                    <div className="proj-coming-strip">
                      <span>Full case study coming soon</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      <section className="about-band page-section" data-section="about">
        <div className="about-band-inner">
          <div className="about-band-photo sr-slide-left">
            <img src="/images/resume/profile.png" alt="Sivan Baum" className="about-band-img" />
          </div>
          <div className="about-band-text">
            <p className="about-band-label sr-slide-right d1">About</p>
            <h2 className="about-band-h2 sr-slide-right d2">
              I turn ambiguity
              <br />
              into direction.
            </h2>
            <p className="about-band-bio sr-slide-right d3">
              I work on problems where the hardest part isn't designing the solution; it's defining
              what should exist in the first place.
            </p>
            <p className="about-band-bio sr-slide-right d4">
              At Amazon Kindle, I've led the definition of interaction models that shape how features
              come together, aligning teams, clarifying direction and turning abstract ideas into
              systems that scale. My work reaches millions of reading sessions, but its impact shows
              up earlier: in the interaction models and frameworks that help teams align on what to
              build and how it should work.
            </p>
            <p className="about-band-bio sr-slide-right d4">
              I operate at the intersection of product, design, and engineering, using interaction
              design to pressure test ideas, expose tradeoffs, and define how products actually
              behave. Before Amazon, I led 0→1 product work across healthcare, fintech, and ad tech,
              building systems from the ground up in fast moving environments where there was no
              clear playbook.
            </p>
            <div className="about-band-actions sr-slide-right d5">
              <button className="btn-white" onClick={() => navigate('/about')}>
                View Resume →
              </button>
              <button
                className="btn-ghost"
                onClick={() => window.open('https://www.linkedin.com/in/sivanbachar/', '_blank')}
              >
                LinkedIn ↗
              </button>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <span className="footer-l">© 2025 Sivan Baum</span>
        <span className="footer-r">Sr. Product Designer · Amazon Kindle</span>
      </footer>
    </div>
  )
}
