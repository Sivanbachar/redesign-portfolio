import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useScrollReveal } from '../hooks/useScrollReveal.js'
import { usePaginatedScroll } from '../hooks/usePaginatedScroll.js'
import { useScramble } from '../hooks/useScramble.js'
import ElectricGrid from '../components/ElectricGrid.jsx'
import { PROJECTS } from '../data/projects.js'

function InteractiveHero() {
  const heroRef = useRef(null)
  const tagline = useScramble('SENIOR PRODUCT DESIGNER · AMAZON KINDLE')

  useEffect(() => {
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
          <div className="hero-scroll-line" />
          <span>Scroll</span>
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
                <span className="proj-link sr d4">View Case Study →</span>
              </div>
              <div className="proj-img-wrap">
                <div className="proj-img-block" style={{ background: p.thumbBg }}>
                  {p.thumbImg ? (
                    <img src={`/${p.thumbImg}`} alt={p.title} className="proj-img-photo" />
                  ) : (
                    <span style={{ fontSize: 48, opacity: 0.08 }}>{p.thumbIcon}</span>
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
            <img src="/portrait.jpg" alt="Sivan Baum" className="about-band-img" />
          </div>
          <div className="about-band-text">
            <p className="about-band-label sr-slide-right d1">About</p>
            <h2 className="about-band-h2 sr-slide-right d2">
              I turn ambiguity
              <br />
              into direction.
            </h2>
            <p className="about-band-bio sr-slide-right d3">
              I tend to work on problems that don't have clear answers yet: the kind where the
              hardest part isn't designing something, it's figuring out what should exist in the
              first place. At Amazon Kindle, that's meant shaping how features come together,
              helping teams get aligned when things feel messy, and making decisions that actually
              hold up beyond a single release. The work shows up in millions of reading sessions,
              but what I care about most is the clarity it creates — giving teams a way forward
              when things aren't obvious.
            </p>
            <p className="about-band-bio sr-slide-right d4">
              I spend a lot of time in the middle of product, design and engineering: asking
              questions, pressure testing ideas, and helping turn scattered thinking into something
              concrete. Before Amazon, I worked across fintech, ad-tech, and healthcare — mostly
              in environments where things were moving fast, stakes were high, and there wasn't a
              clear playbook.
            </p>
            <div className="about-band-actions sr-slide-right d5">
              <button className="btn-white" onClick={() => navigate('/about')}>
                View Resume →
              </button>
              <button
                className="btn-ghost"
                onClick={() => window.open('https://linkedin.com/in/sivanbaum', '_blank')}
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
