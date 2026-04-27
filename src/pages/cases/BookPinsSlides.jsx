import { useState, useEffect, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useScrollReveal } from '../../hooks/useScrollReveal.js'
import { useReadingProgress } from '../../hooks/useReadingProgress.js'

// ─── Shared style tokens ──────────────────────────────────────────────────────
const label = (n) => ({
  fontFamily: 'var(--mono)',
  fontSize: 9,
  letterSpacing: '0.22em',
  textTransform: 'uppercase',
  color: 'rgba(255,255,255,0.28)',
  marginBottom: 0,
  ...(n ? { marginBottom: n } : {}),
})
const slideNum = {
  fontFamily: 'var(--mono)',
  fontSize: 10,
  letterSpacing: '0.18em',
  color: 'rgba(255,255,255,0.14)',
  marginBottom: 0,
}

const DIVIDER = { borderTop: '1px solid rgba(255,255,255,0.06)' }
const PAD     = { padding: '100px 80px' }

const SLIDE_IDS = [
  'slide-cover',
  'slide-problem',
  'slide-insight',
  'slide-research',
  'slide-iterations',
  'slide-solution',
  'slide-impact',
  'slide-voices',
  'slide-learnings',
]

export default function BookPinsSlides() {
  const navigate  = useNavigate()
  const [active, setActive] = useState(0)
  const scrollingRef = useRef(false)
  useScrollReveal()
  const pct = useReadingProgress()

  // Track active slide via IntersectionObserver
  useEffect(() => {
    const observers = []
    SLIDE_IDS.forEach((id, i) => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(i) },
        { threshold: 0.35 }
      )
      obs.observe(el)
      observers.push(obs)
    })
    return () => observers.forEach(o => o.disconnect())
  }, [])

  const goTo = useCallback((index) => {
    const el = document.getElementById(SLIDE_IDS[index])
    if (!el) return
    scrollingRef.current = true
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setTimeout(() => { scrollingRef.current = false }, 800)
  }, [])

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e) => {
      if (['ArrowDown', 'ArrowRight', 'PageDown'].includes(e.key)) {
        e.preventDefault()
        setActive(prev => { const next = Math.min(prev + 1, SLIDE_IDS.length - 1); goTo(next); return next })
      }
      if (['ArrowUp', 'ArrowLeft', 'PageUp'].includes(e.key)) {
        e.preventDefault()
        setActive(prev => { const next = Math.max(prev - 1, 0); goTo(next); return next })
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [goTo])

  return (
    <div style={{ background: '#070707', minHeight: '100vh', fontFamily: 'var(--sans)', paddingBottom: 56 }}>

      {/* Reading progress */}
      <div className="progress-bar" style={{ transform: `scaleX(${pct})` }} />

      {/* ── DOT NAV — fixed right side ── */}
      <nav style={{
        position: 'fixed', right: 24, top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 700,
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
      }}>
        {SLIDE_IDS.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            style={{
              width: active === i ? 6 : 4,
              height: active === i ? 6 : 4,
              borderRadius: '50%',
              background: active === i ? 'rgba(255,255,255,0.75)' : 'rgba(255,255,255,0.18)',
              border: 'none', padding: 0, cursor: 'pointer',
              transition: 'all 0.25s cubic-bezier(0.16,1,0.3,1)',
              flexShrink: 0,
            }}
          />
        ))}
      </nav>

      {/* ── PREV / NEXT arrows — fixed bottom center ── */}
      <div style={{
        position: 'fixed', bottom: 72, left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 700,
        display: 'flex', alignItems: 'center', gap: 8,
      }}>
        <button
          onClick={() => goTo(Math.max(active - 1, 0))}
          disabled={active === 0}
          aria-label="Previous slide"
          style={{
            width: 38, height: 38,
            borderRadius: '50%',
            background: 'rgba(14,14,14,0.9)',
            border: '1px solid rgba(255,255,255,0.1)',
            color: active === 0 ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.55)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: active === 0 ? 'default' : 'pointer',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            transition: 'color 0.2s, border-color 0.2s',
          }}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M6 10L2 6l4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* Slide counter */}
        <span style={{
          fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.18em',
          color: 'rgba(255,255,255,0.28)',
          background: 'rgba(14,14,14,0.9)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 20, padding: '8px 14px',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          userSelect: 'none',
        }}>
          {String(active + 1).padStart(2, '0')} / {String(SLIDE_IDS.length).padStart(2, '0')}
        </span>

        <button
          onClick={() => goTo(Math.min(active + 1, SLIDE_IDS.length - 1))}
          disabled={active === SLIDE_IDS.length - 1}
          aria-label="Next slide"
          style={{
            width: 38, height: 38,
            borderRadius: '50%',
            background: 'rgba(14,14,14,0.9)',
            border: '1px solid rgba(255,255,255,0.1)',
            color: active === SLIDE_IDS.length - 1 ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.55)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: active === SLIDE_IDS.length - 1 ? 'default' : 'pointer',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            transition: 'color 0.2s, border-color 0.2s',
          }}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {/* Fixed back pill */}
      <button
        onClick={() => navigate('/projects/bookpins')}
        style={{
          position: 'fixed', top: 76, left: 28, zIndex: 700,
          fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.45)',
          background: 'rgba(10,10,10,0.88)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: 8, padding: '8px 14px',
          cursor: 'pointer',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
        }}
      >← Case Study</button>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          01 / COVER
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section id="slide-cover" style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        padding: '0 80px 100px',
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(160deg, #060606 40%, #0f0f0f 100%)',
      }}>
        {/* Hero image, fading right */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'url(/images/pins/pinnable-content-hero.jpg?v=3)',
          backgroundSize: 'cover',
          backgroundPosition: 'center right',
          opacity: 0.13,
          maskImage: 'linear-gradient(to right, transparent 20%, black 80%)',
          WebkitMaskImage: 'linear-gradient(to right, transparent 20%, black 80%)',
        }} />

        {/* Subtle grid texture */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }} />

        <div style={{ position: 'relative', maxWidth: 1200 }}>
          <p className="sr" style={{ ...label(48), marginBottom: 48 }}>Amazon · Kindle · UX Lead Initiative · 2024</p>

          <h1 className="sr" style={{
            fontSize: 'clamp(72px, 12vw, 160px)',
            fontWeight: 700,
            letterSpacing: '-0.045em',
            lineHeight: 0.9,
            color: '#fff',
            marginBottom: 40,
          }}>
            Book<br />Pins
          </h1>

          <p className="sr" style={{
            fontSize: 'clamp(15px, 1.6vw, 20px)',
            color: 'rgba(255,255,255,0.42)',
            maxWidth: 500,
            lineHeight: 1.6,
            marginBottom: 72,
          }}>
            Redesigning how readers reference content in Kindle — shifting from linear reading to a model that supports studying, comparing, and revisiting in context.
          </p>

          <div className="sr" style={{ display: 'flex', gap: 56, alignItems: 'flex-end' }}>
            {[
              ['446K+', 'Users reached'],
              ['950K+', 'Pins created'],
              ['UX Lead', 'Role'],
            ].map(([n, l]) => (
              <div key={l}>
                <p style={{ fontSize: 'clamp(20px, 2.5vw, 30px)', fontWeight: 600, letterSpacing: '-0.03em', color: 'rgba(255,255,255,0.88)', marginBottom: 6 }}>{n}</p>
                <p style={{ ...label(), marginBottom: 0 }}>{l}</p>
              </div>
            ))}
          </div>
        </div>

        <p style={{ ...slideNum, position: 'absolute', bottom: 100, right: 80 }}>01 / 09</p>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          02 / THE PROBLEM
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section id="slide-problem" style={{
        minHeight: '100vh',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        ...DIVIDER,
        background: '#080808',
        position: 'relative',
      }}>
        {/* Left */}
        <div style={{ padding: '100px 64px 100px 80px', display: 'flex', flexDirection: 'column', justifyContent: 'center', borderRight: '1px solid rgba(255,255,255,0.06)' }}>
          <p className="sr" style={{ ...label(28), marginBottom: 28 }}>02 — The Problem</p>
          <h2 className="sr" style={{
            fontSize: 'clamp(32px, 3.5vw, 50px)',
            fontWeight: 600, letterSpacing: '-0.03em', lineHeight: 1.1,
            color: '#fff', marginBottom: 32,
          }}>
            Reading shouldn't require leaving the page.
          </h2>
          <p className="sr" style={{ fontSize: 16, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, marginBottom: 48, maxWidth: 440 }}>
            Referencing saved content required 6+ disconnected steps, forcing readers to exit the reading experience and navigate across multiple surfaces.
          </p>

          {/* Stat card */}
          <div className="sr" style={{
            display: 'inline-flex', flexDirection: 'column',
            padding: '28px 36px',
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 14,
            maxWidth: 300,
          }}>
            <p style={{ fontSize: 'clamp(52px, 6vw, 80px)', fontWeight: 700, letterSpacing: '-0.05em', color: '#fff', lineHeight: 1, marginBottom: 10 }}>6+</p>
            <p style={{ ...label(), marginBottom: 0 }}>Steps to reference a single piece of saved content</p>
          </div>
        </div>

        {/* Right — diagram */}
        <div className="sr" style={{ padding: '80px 80px 80px 56px', display: 'flex', alignItems: 'center' }}>
          <img
            src="/images/pins/diagram_1.jpg?v=3"
            alt="Diagram showing 6+ steps to reference saved content"
            style={{ width: '100%', borderRadius: 10, border: '1px solid rgba(255,255,255,0.08)', display: 'block' }}
          />
        </div>

        <p style={{ ...slideNum, gridColumn: '1 / -1', textAlign: 'right', padding: '0 80px 40px' }}>02 / 09</p>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          03 / CRITICAL INSIGHT
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section id="slide-insight" style={{
        minHeight: '80vh',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: '120px 80px',
        background: '#050505',
        ...DIVIDER,
        textAlign: 'center',
        position: 'relative',
      }}>
        <p className="sr" style={{ ...label(44), marginBottom: 44 }}>03 — Critical Insight</p>

        <div style={{ width: 32, height: 1, background: 'rgba(255,255,255,0.18)', margin: '0 auto 48px' }} />

        <blockquote className="sr" style={{
          fontSize: 'clamp(20px, 3.2vw, 40px)',
          fontWeight: 500,
          letterSpacing: '-0.02em',
          lineHeight: 1.38,
          color: 'rgba(255,255,255,0.82)',
          maxWidth: 860,
          margin: '0 auto',
          fontStyle: 'normal',
        }}>
          "Content was treated as something to save and retrieve{' '}
          <em style={{ fontStyle: 'italic', color: 'rgba(255,255,255,0.38)' }}>later</em>{' '}
          — rather than something to use{' '}
          <em style={{ fontStyle: 'italic', color: 'rgba(255,255,255,0.38)' }}>in context</em>,
          alongside the reading experience."
        </blockquote>

        <div style={{ width: 32, height: 1, background: 'rgba(255,255,255,0.18)', margin: '48px auto 40px' }} />

        <p className="sr" style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.22)' }}>
          This reframed the problem entirely
        </p>

        <p style={{ ...slideNum, position: 'absolute', bottom: 48, right: 80 }}>03 / 09</p>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          04 / RESEARCH
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section id="slide-research" style={{
        minHeight: '100vh',
        display: 'grid',
        gridTemplateColumns: '360px 1fr',
        ...DIVIDER,
        background: '#080808',
        position: 'relative',
      }}>
        {/* Left sticky column */}
        <div style={{
          padding: '100px 48px 100px 80px',
          borderRight: '1px solid rgba(255,255,255,0.06)',
          display: 'flex', flexDirection: 'column', justifyContent: 'center',
        }}>
          <p className="sr" style={{ ...label(28), marginBottom: 28 }}>04 — Research</p>
          <h2 className="sr" style={{
            fontSize: 'clamp(28px, 2.8vw, 40px)',
            fontWeight: 600, letterSpacing: '-0.03em', lineHeight: 1.15,
            color: '#fff', marginBottom: 24,
          }}>
            Five methods.<br />One clear direction.
          </h2>
          <p className="sr" style={{ fontSize: 14, color: 'rgba(255,255,255,0.38)', lineHeight: 1.7 }}>
            Cross-functional discovery across behavioral patterns, competitive products, and direct user feedback.
          </p>
        </div>

        {/* Right — method list */}
        <div style={{ padding: '100px 80px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          {[
            ['01', 'Cross-functional Workshops', 'Brought together product, engineering, and design to surface reading pain points and align on problem framing.'],
            ['02', 'Behavioral Analysis', 'Studied reading and annotation patterns to understand how users actually interacted with saved content.'],
            ['03', 'Competitive Analysis', 'Examined Apple Books, Notion, Google Docs, and Netflix for patterns in reference and overlay UX.'],
            ['04', 'Customer Interviews & Surveys', 'Direct feedback on referencing habits, friction points, and unmet needs in the reading experience.'],
            ['05', 'Two Rounds of Usability Testing', 'Validated interaction models with real users before and after the design pivot.'],
          ].map(([n, title, desc]) => (
            <div key={n} className="sr" style={{
              display: 'grid',
              gridTemplateColumns: '48px 1fr',
              gap: '0 24px',
              padding: '28px 0',
              borderTop: '1px solid rgba(255,255,255,0.07)',
            }}>
              <p style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'rgba(255,255,255,0.2)', marginTop: 2 }}>{n}</p>
              <div>
                <p style={{ fontSize: 17, fontWeight: 500, color: 'rgba(255,255,255,0.82)', marginBottom: 7, letterSpacing: '-0.01em' }}>{title}</p>
                <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)', lineHeight: 1.65 }}>{desc}</p>
              </div>
            </div>
          ))}
        </div>

        <p style={{ ...slideNum, gridColumn: '1 / -1', textAlign: 'right', padding: '0 80px 40px' }}>04 / 09</p>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          05 / ITERATIONS
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section id="slide-iterations" style={{
        minHeight: '100vh',
        ...PAD,
        ...DIVIDER,
        background: '#0a0a0a',
        position: 'relative',
      }}>
        <p className="sr" style={{ ...label(24), marginBottom: 24 }}>05 — Design Iterations</p>
        <h2 className="sr" style={{
          fontSize: 'clamp(30px, 3.8vw, 52px)',
          fontWeight: 600, letterSpacing: '-0.03em', lineHeight: 1.08,
          color: '#fff', marginBottom: 16, maxWidth: 680,
        }}>
          Three directions. One that changed the model.
        </h2>
        <p className="sr" style={{ fontSize: 15, color: 'rgba(255,255,255,0.38)', marginBottom: 64, maxWidth: 560, lineHeight: 1.65 }}>
          Early explorations placed features around reading. The pivot came when we stopped designing for it and started designing within it.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
          {[
            {
              tag: '01', name: 'Floating PiP Overlay',
              img: '/images/pins/iteration_1.png',
              status: 'Set aside',
              reason: 'Improved visibility but created gesture complexity and competed with reading. Better for glancing, not deeper interaction.',
              selected: false,
            },
            {
              tag: '02', name: 'Anchored Panel',
              img: '/images/pins/iteration_2.png',
              status: 'Set aside',
              reason: 'Too much persistent interface for launch scope — over-engineered for an MLP that wasn\'t ready to give up real estate.',
              selected: false,
            },
            {
              tag: '03', name: 'Layered Model',
              img: '/images/pins/iteration_3.png',
              status: 'Selected ✓',
              reason: 'Lightweight, dismissible, on-demand. Keeps the reading surface clean by default. Scales as a framework for future features.',
              selected: true,
            },
          ].map(iter => (
            <div key={iter.tag} className="sr" style={{
              background: iter.selected ? 'rgba(134,239,172,0.03)' : 'rgba(255,255,255,0.02)',
              border: `1px solid ${iter.selected ? 'rgba(134,239,172,0.2)' : 'rgba(255,255,255,0.07)'}`,
              borderRadius: 14,
              overflow: 'hidden',
              display: 'flex', flexDirection: 'column',
            }}>
              {/* Image zone */}
              <div style={{ background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid rgba(255,255,255,0.07)', padding: 20 }}>
                <img src={iter.img} alt={iter.name} style={{ width: '100%', borderRadius: 6, display: 'block' }} />
              </div>
              {/* Meta */}
              <div style={{ padding: '20px 24px 28px', flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <p style={{ fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.22)' }}>{iter.tag}</p>
                  <p style={{ fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', color: iter.selected ? 'rgba(134,239,172,0.75)' : 'rgba(255,255,255,0.22)' }}>{iter.status}</p>
                </div>
                <p style={{ fontSize: 15, fontWeight: 500, color: 'rgba(255,255,255,0.82)', letterSpacing: '-0.01em' }}>{iter.name}</p>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.38)', lineHeight: 1.65 }}>{iter.reason}</p>
              </div>
            </div>
          ))}
        </div>

        <p style={{ ...slideNum, position: 'absolute', bottom: 48, right: 80 }}>05 / 09</p>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          06 / THE SOLUTION
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section id="slide-solution" style={{
        minHeight: '100vh',
        ...PAD,
        ...DIVIDER,
        background: '#080808',
        position: 'relative',
      }}>
        <p className="sr" style={{ ...label(24), marginBottom: 24 }}>06 — The Solution</p>
        <h2 className="sr" style={{
          fontSize: 'clamp(36px, 5vw, 68px)',
          fontWeight: 700, letterSpacing: '-0.04em', lineHeight: 1.0,
          color: '#fff', marginBottom: 20,
        }}>
          Reference in context.<br />No page exits.
        </h2>
        <p className="sr" style={{ fontSize: 16, color: 'rgba(255,255,255,0.42)', marginBottom: 64, maxWidth: 520, lineHeight: 1.6 }}>
          Book Pins introduces a new interaction model that allows readers to surface and interact with saved content directly within the reading experience.
        </p>

        {/* Video — centered, tall */}
        <div className="sr" style={{ display: 'flex', justifyContent: 'center', marginBottom: 72 }}>
          <video
            src="/images/pins/solution_video.mp4"
            autoPlay loop muted playsInline
            style={{
              maxHeight: '56vh', width: 'auto', maxWidth: '100%',
              borderRadius: 14,
              border: '1px solid rgba(255,255,255,0.09)',
              display: 'block',
              boxShadow: '0 32px 80px rgba(0,0,0,0.6)',
            }}
          />
        </div>

        {/* 4-step row */}
        <div className="sr" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0, borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          {[
            ['Collapsed', 'A minimal anchored entry point keeps the experience unobtrusive by default.'],
            ['Expand', 'Opens a dedicated interaction layer for the pinned content.'],
            ['Interact', 'Scroll, zoom, and explore content without leaving the page.'],
            ['Dismiss', 'One action returns seamlessly to the reading flow.'],
          ].map(([title, desc], i) => (
            <div key={title} style={{
              padding: '28px 0',
              paddingRight: i < 3 ? 40 : 0,
              borderRight: i < 3 ? '1px solid rgba(255,255,255,0.07)' : 'none',
              paddingLeft: i > 0 ? 40 : 0,
            }}>
              <p style={{ fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.18)', marginBottom: 14 }}>Step {String(i + 1).padStart(2, '0')}</p>
              <p style={{ fontSize: 15, fontWeight: 500, color: 'rgba(255,255,255,0.78)', marginBottom: 10, letterSpacing: '-0.01em' }}>{title}</p>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.36)', lineHeight: 1.65 }}>{desc}</p>
            </div>
          ))}
        </div>

        <p style={{ ...slideNum, position: 'absolute', bottom: 48, right: 80 }}>06 / 09</p>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          07 / IMPACT
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section id="slide-impact" style={{
        minHeight: '80vh',
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
        ...PAD,
        ...DIVIDER,
        background: '#050505',
        position: 'relative',
      }}>
        <p className="sr" style={{ ...label(28), marginBottom: 28 }}>07 — Impact</p>
        <h2 className="sr" style={{
          fontSize: 'clamp(22px, 2.8vw, 36px)',
          fontWeight: 500, letterSpacing: '-0.02em',
          color: 'rgba(255,255,255,0.5)', marginBottom: 72, maxWidth: 560,
        }}>
          Book Pins changed how readers interact with information.
        </h2>

        {/* Giant KPIs */}
        <div className="sr" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          {[
            ['950K+', 'Pins created', 'across the user base'],
            ['45%',   'Repeat usage', 'after first pin'],
            ['56%',   'Pin interaction rate', 'engagement with pinned content'],
          ].map(([n, l, d], i) => (
            <div key={l} style={{
              padding: '56px 0',
              borderRight: i < 2 ? '1px solid rgba(255,255,255,0.08)' : 'none',
              paddingRight: i < 2 ? 64 : 0,
              paddingLeft: i > 0 ? 64 : 0,
            }}>
              <p style={{
                fontSize: 'clamp(52px, 7vw, 104px)',
                fontWeight: 700, letterSpacing: '-0.05em',
                color: '#fff', lineHeight: 1, marginBottom: 18,
              }}>{n}</p>
              <p style={{ fontSize: 17, fontWeight: 500, color: 'rgba(255,255,255,0.65)', marginBottom: 6 }}>{l}</p>
              <p style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.26)' }}>{d}</p>
            </div>
          ))}
        </div>

        <p style={{ ...slideNum, position: 'absolute', bottom: 48, right: 80 }}>07 / 09</p>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          08 / USER VOICES
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section id="slide-voices" style={{
        minHeight: '100vh',
        ...PAD,
        ...DIVIDER,
        background: '#080808',
        position: 'relative',
      }}>
        <p className="sr" style={{ ...label(24), marginBottom: 24 }}>08 — User Voices</p>
        <h2 className="sr" style={{
          fontSize: 'clamp(28px, 3.6vw, 50px)',
          fontWeight: 600, letterSpacing: '-0.03em', lineHeight: 1.1,
          color: '#fff', marginBottom: 16, maxWidth: 640,
        }}>
          Readers found use cases we didn't fully anticipate.
        </h2>
        <p className="sr" style={{ fontSize: 15, color: 'rgba(255,255,255,0.38)', marginBottom: 56, maxWidth: 500, lineHeight: 1.65 }}>
          From religious study plans to fantasy map referencing — the interaction model was flexible enough for diverse reading behaviors.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          {[
            '"This is the best new feature in a long time. I\'m always hunting for bookmarks for pronunciation guides, glossaries, maps — especially for fantasy books. I love this. You can even zoom in on images right within the pop up."',
            '"I started using the pin feature to make it easier to hop back-and-forth between chapters in my Bible reading plan. I really appreciate it, and your post gives me hope there are other uses I haven\'t even imagined."',
            '"Well as an avid historical fiction and fantasy reader this is a game changer. I always had to go back so I just preferred to read those books in paper form. Very nice."',
            '"This pin feature is truly a game changer. I usually take a photo of any maps I need to reference — now I don\'t have to leave the book to find it."',
          ].map((quote, i) => (
            <div key={i} className="sr" style={{
              padding: '32px 36px',
              background: 'rgba(255,255,255,0.025)',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: 14,
              display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 32,
            }}>
              <p style={{ fontSize: 17, fontStyle: 'italic', color: 'rgba(255,255,255,0.58)', lineHeight: 1.7 }}>{quote}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#FF4500', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="14" height="14" viewBox="0 0 20 20" fill="white">
                    <path d="M20 10c0-1.1-.9-2-2-2-.5 0-1 .2-1.4.5C15 7.4 13.1 7 11 6.9l.9-4.1 2.7.6c0 .7.6 1.3 1.3 1.3.8 0 1.4-.6 1.4-1.4s-.6-1.4-1.4-1.4c-.5 0-1 .3-1.2.8L11.8 2c-.1 0-.2.1-.2.2l-1 4.6c-2.2.1-4.1.5-5.5 1.6-.4-.3-.9-.5-1.4-.5C2.6 7.9 1.7 8.8 1.7 10c0 .8.4 1.5 1.1 1.8 0 .2-.1.4-.1.6 0 3 3.3 5.4 7.3 5.4s7.3-2.4 7.3-5.4c0-.2 0-.4-.1-.6.6-.4 1-1 1-1.8zM6.1 11.4c0-.7.6-1.3 1.3-1.3.7 0 1.3.6 1.3 1.3 0 .7-.6 1.3-1.3 1.3-.7 0-1.3-.6-1.3-1.3zm7.4 3.2c-.8.8-2.1 1.2-3.5 1.2-1.4 0-2.7-.4-3.5-1.2-.1-.1-.1-.3 0-.4.1-.1.3-.1.4 0 .7.7 1.8 1 3.1 1s2.4-.3 3.1-1c.1-.1.3-.1.4 0 .1.1.1.3 0 .4zm-.3-1.9c-.7 0-1.3-.6-1.3-1.3 0-.7.6-1.3 1.3-1.3.7 0 1.3.6 1.3 1.3 0 .7-.6 1.3-1.3 1.3z"/>
                  </svg>
                </div>
                <p style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'rgba(255,255,255,0.28)', letterSpacing: '0.1em' }}>Reddit · r/kindle</p>
              </div>
            </div>
          ))}
        </div>

        <p style={{ ...slideNum, position: 'absolute', bottom: 48, right: 80 }}>08 / 09</p>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          09 / LEARNINGS
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section id="slide-learnings" style={{
        minHeight: '90vh',
        padding: '100px 80px 140px',
        ...DIVIDER,
        background: '#0a0a0a',
        position: 'relative',
      }}>
        <p className="sr" style={{ ...label(24), marginBottom: 24 }}>09 — Learnings</p>
        <h2 className="sr" style={{
          fontSize: 'clamp(30px, 3.8vw, 52px)',
          fontWeight: 600, letterSpacing: '-0.03em', lineHeight: 1.08,
          color: '#fff', marginBottom: 72, maxWidth: 560,
        }}>
          What this project taught me.
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 48 }}>
          {[
            ['Breaking and rebuilding is part of the process', 'Some of the most important progress came from stepping back and rethinking entirely. Letting go of early directions made space for a stronger, more intentional solution.'],
            ['There\'s no substitute for real user feedback', 'Assumptions only go so far. It wasn\'t until we saw how people actually used the experience that the right direction became clear.'],
            ['Your first idea is rarely the right one', 'The solution we shipped looked nothing like our early concepts. That\'s not failure — that\'s how design works at its best.'],
          ].map(([h, b], i) => (
            <div key={i} className="sr" style={{ paddingTop: 32, borderTop: '2px solid rgba(255,255,255,0.07)' }}>
              <p style={{ fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)', marginBottom: 20 }}>
                Learning {String(i + 1).padStart(2, '0')}
              </p>
              <p style={{ fontSize: 18, fontWeight: 500, color: 'rgba(255,255,255,0.82)', lineHeight: 1.35, marginBottom: 16, letterSpacing: '-0.015em' }}>{h}</p>
              <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)', lineHeight: 1.7 }}>{b}</p>
            </div>
          ))}
        </div>

        {/* CTA row */}
        <div className="sr" style={{ marginTop: 80, display: 'flex', gap: 16, alignItems: 'center' }}>
          <button
            onClick={() => navigate('/projects/bookpins')}
            style={{
              fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.16em', textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.55)',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 8, padding: '12px 22px',
              cursor: 'pointer',
            }}
          >← Full Case Study</button>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            style={{
              fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.16em', textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.3)',
              background: 'none',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: 8, padding: '12px 22px',
              cursor: 'pointer',
            }}
          >↑ Back to top</button>
        </div>

        <p style={{ ...slideNum, position: 'absolute', bottom: 56, right: 80 }}>09 / 09</p>
      </section>

    </div>
  )
}
