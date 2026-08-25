import { useState, useEffect, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useScrollReveal } from '../../hooks/useScrollReveal.js'
import { useReadingProgress } from '../../hooks/useReadingProgress.js'
import ExperimentViewer from '../../components/ExperimentViewer.jsx'

// ── Style tokens ──────────────────────────────────────────────────────────────
const mono = (extra = {}) => ({
  fontFamily: 'var(--mono)',
  fontSize: 9,
  letterSpacing: '0.22em',
  textTransform: 'uppercase',
  color: 'rgba(255,255,255,0.28)',
  ...extra,
})
const slideNum = {
  fontFamily: 'var(--mono)',
  fontSize: 10,
  letterSpacing: '0.18em',
  color: 'rgba(255,255,255,0.14)',
  marginBottom: 0,
}
const DIVIDER = { borderTop: '1px solid rgba(255,255,255,0.06)' }
const PAD     = { padding: '100px 200px' }
const H2 = (extra = {}) => ({
  fontWeight: 600,
  letterSpacing: '-0.03em',
  lineHeight: 1.1,
  color: '#fff',
  ...extra,
})
const BODY = { fontSize: 18, color: 'rgba(255,255,255,0.78)', lineHeight: 1.75 }

const SLIDE_IDS = [
  'slide-cover',
  'slide-context',
  'slide-problem',
  'slide-my-role',
  'slide-discovery',
  'slide-insight',
  'slide-strategy',
  'slide-system',
  'slide-exp-visual',
  'slide-exp-clarity',
  'slide-exp-control',
  'slide-exp-trust',
  'slide-variants',
  'slide-tradeoffs',
  'slide-impact',
  'slide-reflection',
  'slide-outfront',
]
const TOTAL = SLIDE_IDS.length

export default function RoktSlides() {
  const navigate       = useNavigate()
  const [active, setActive] = useState(0)
  const activeRef      = useRef(0)
  const scrollingRef   = useRef(false)
  useScrollReveal()
  const pct = useReadingProgress()

  useEffect(() => {
    const observers = []
    SLIDE_IDS.forEach((id, i) => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) { setActive(i); activeRef.current = i } },
        { threshold: 0.3 }
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
    setActive(index)
    activeRef.current = index
    setTimeout(() => { scrollingRef.current = false }, 800)
  }, [])

  useEffect(() => {
    const onKey = (e) => {
      if (['ArrowDown', 'ArrowRight', 'PageDown'].includes(e.key)) {
        e.preventDefault(); goTo(Math.min(activeRef.current + 1, TOTAL - 1))
      }
      if (['ArrowUp', 'ArrowLeft', 'PageUp'].includes(e.key)) {
        e.preventDefault(); goTo(Math.max(activeRef.current - 1, 0))
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [goTo])

  return (
    <div style={{ background: '#070707', minHeight: '100vh', fontFamily: 'var(--sans)', paddingBottom: 56 }}>

      {/* Reading progress */}
      <div className="progress-bar" style={{ transform: `scaleX(${pct})` }} />

      {/* Dot nav */}
      <nav style={{
        position: 'fixed', right: 24, top: '50%',
        transform: 'translateY(-50%)', zIndex: 700,
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
      }}>
        {SLIDE_IDS.map((_, i) => (
          <button key={i} onClick={() => goTo(i)} aria-label={`Slide ${i + 1}`} style={{
            width: active === i ? 6 : 4, height: active === i ? 6 : 4,
            borderRadius: '50%',
            background: active === i ? 'rgba(255,255,255,0.75)' : 'rgba(255,255,255,0.18)',
            border: 'none', padding: 0, cursor: 'pointer',
            transition: 'all 0.25s cubic-bezier(0.16,1,0.3,1)', flexShrink: 0,
          }} />
        ))}
      </nav>

      {/* Prev / next */}
      <div style={{
        position: 'fixed', bottom: 72, left: '50%', transform: 'translateX(-50%)',
        zIndex: 700, display: 'flex', alignItems: 'center', gap: 8,
      }}>
        {[
          { dir: -1, label: 'Previous', icon: <path d="M6 10L2 6l4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/> },
          { dir:  1, label: 'Next',     icon: <path d="M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/> },
        ].map(({ dir, label, icon }, i) => {
          const atEdge = dir === -1 ? active === 0 : active === TOTAL - 1
          return i === 0 ? (
            <button key={label} onClick={() => goTo(Math.max(active - 1, 0))} disabled={atEdge} aria-label={label} style={{
              width: 38, height: 38, borderRadius: '50%',
              background: 'rgba(14,14,14,0.9)', border: '1px solid rgba(255,255,255,0.1)',
              color: atEdge ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.55)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: atEdge ? 'default' : 'pointer',
              backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
              transition: 'color 0.2s',
            }}><svg width="12" height="12" viewBox="0 0 12 12" fill="none">{icon}</svg></button>
          ) : (
            <>
              <span style={{
                fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.18em',
                color: 'rgba(255,255,255,0.28)',
                background: 'rgba(14,14,14,0.9)', border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 20, padding: '8px 14px',
                backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
                userSelect: 'none',
              }}>{String(active + 1).padStart(2, '0')} / {String(TOTAL).padStart(2, '0')}</span>
              <button key={label} onClick={() => goTo(Math.min(active + 1, TOTAL - 1))} disabled={atEdge} aria-label={label} style={{
                width: 38, height: 38, borderRadius: '50%',
                background: 'rgba(14,14,14,0.9)', border: '1px solid rgba(255,255,255,0.1)',
                color: atEdge ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.55)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: atEdge ? 'default' : 'pointer',
                backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
                transition: 'color 0.2s',
              }}><svg width="12" height="12" viewBox="0 0 12 12" fill="none">{icon}</svg></button>
            </>
          )
        })}
      </div>

      {/* Back pill */}
      <button onClick={() => navigate('/projects/rokt')} style={{
        position: 'fixed', top: 76, left: 28, zIndex: 700,
        fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase',
        color: 'rgba(255,255,255,0.65)',
        background: 'rgba(10,10,10,0.88)', border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: 8, padding: '8px 14px', cursor: 'pointer',
        backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
      }}>← Case Study</button>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          01 / COVER
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section id="slide-cover" style={{
        minHeight: '100vh', display: 'flex', flexDirection: 'column',
        justifyContent: 'flex-end', padding: '0 200px 100px',
        position: 'relative', overflow: 'hidden',
        background: 'linear-gradient(160deg, #060606 40%, #0d0d0d 100%)',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'url(/images/rokt/rokt_hero.jpg)',
          backgroundSize: 'cover', backgroundPosition: 'center right',
          opacity: 0.1,
          maskImage: 'linear-gradient(to right, transparent 15%, black 75%)',
          WebkitMaskImage: 'linear-gradient(to right, transparent 15%, black 75%)',
        }} />
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.012) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.012) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }} />
        {/* Phone visual — top right */}
        <div style={{
          position: 'absolute', top: 0, right: 200, bottom: 0,
          display: 'flex', alignItems: 'center',
          pointerEvents: 'none',
        }}>
          <img
            src="/images/rokt/background_video.gif"
            alt="Rokt ad experience on mobile"
            style={{
              height: '75vh', width: 'auto',
              opacity: 0.35,
              borderRadius: 24,
              maskImage: 'linear-gradient(to bottom, transparent 2%, black 15%, black 85%, transparent 98%)',
              WebkitMaskImage: 'linear-gradient(to bottom, transparent 2%, black 15%, black 85%, transparent 98%)',
            }}
          />
        </div>

        <div style={{ position: 'relative', maxWidth: 700 }}>
          <p className="sr" style={{ ...mono({ marginBottom: 48 }) }}>Rokt · E-Commerce Ad-Tech · Experimentation &amp; Design · 2021</p>
          <h1 className="sr" style={{
            fontSize: 'clamp(72px, 12vw, 160px)', fontWeight: 700,
            letterSpacing: '-0.045em', lineHeight: 0.9, color: '#fff', marginBottom: 40,
          }}>ROKT</h1>
          <p className="sr" style={{
            fontSize: 'clamp(16px, 1.6vw, 22px)',
            color: 'rgba(255,255,255,0.72)', maxWidth: 520, lineHeight: 1.6, marginBottom: 72,
          }}>
            How I turned a design team into a learning system, building the experimentation infrastructure
            that drove 25 to 30% conversion lift across key ad experiences.
          </p>
          <div className="sr" style={{ display: 'flex', gap: 56, alignItems: 'flex-end' }}>
            {[
              ['+25 to 30%', 'Conversion lift per impression'],
              ['40+', 'Experiments across 7 verticals'],
              ['2×', 'Experiment velocity over 18 months'],
            ].map(([n, l]) => (
              <div key={l}>
                <p style={{ fontSize: 'clamp(20px, 2.5vw, 30px)', fontWeight: 600, letterSpacing: '-0.03em', color: 'rgba(255,255,255,0.88)', marginBottom: 6 }}>{n}</p>
                <p style={{ ...mono(), marginBottom: 0 }}>{l}</p>
              </div>
            ))}
          </div>
        </div>
        <p style={{ ...slideNum, position: 'absolute', bottom: 100, right: 200 }}>01 / {TOTAL}</p>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          02 / CONTEXT
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section id="slide-context" style={{
        minHeight: '100vh', display: 'grid', gridTemplateColumns: '1fr 1fr',
        ...DIVIDER, background: '#080808', position: 'relative',
      }}>
        <div style={{ padding: '100px 80px 100px 200px', display: 'flex', flexDirection: 'column', justifyContent: 'center', borderRight: '1px solid rgba(255,255,255,0.06)' }}>
          <p className="sr" style={{ ...mono({ marginBottom: 28 }) }}>02: What Is Rokt</p>
          <h2 className="sr" style={{ ...H2({ fontSize: 'clamp(30px, 3.4vw, 46px)', marginBottom: 32 }) }}>
            Ads shown at the highest-intent moment in e-commerce.
          </h2>
          <p className="sr" style={{ ...BODY, marginBottom: 20 }}>
            Rokt places ads and offers on the confirmation pages of companies like Ticketmaster, Uber, and
            Domino's. After a customer completes a purchase, they see a carefully matched offer from a relevant advertiser.
          </p>
          <p className="sr" style={{ ...BODY }}>
            Because the customer just transacted, their intent is unusually high. That makes the Rokt placement
            one of the most valuable moments in the entire e-commerce funnel.
          </p>
        </div>
        <div style={{ padding: '100px 200px 100px 80px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 0 }}>
          {[
            ['The mechanic', 'Customer completes a purchase → confirmation page shows a matched ad → customer engages with the offer → the host site earns revenue from the advertiser.'],
            ['The key metric', 'Revenue Per Transaction (RPT). At scale, even a $0.10 improvement per transaction adds $10,000 per 100,000 transactions. RPT is how Rokt measures whether the product is actually working.'],
            ['The stakes', 'On major retail sites, ad revenue at checkout can exceed $300,000 in a single day. At that scale, design decisions have a direct, measurable dollar impact.'],
          ].map(([heading, body]) => (
            <div key={heading} className="sr" style={{ padding: '24px 0', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
              <p style={{ ...mono({ marginBottom: 10 }) }}>{heading}</p>
              <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.72)', lineHeight: 1.7 }}>{body}</p>
            </div>
          ))}
        </div>
        <p style={{ ...slideNum, gridColumn: '1 / -1', textAlign: 'right', padding: '0 200px 40px' }}>02 / {TOTAL}</p>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          03 / THE PROBLEM
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section id="slide-problem" style={{
        minHeight: '100vh', display: 'grid', gridTemplateColumns: '1fr 1fr',
        ...DIVIDER, background: '#080808', position: 'relative',
      }}>
        <div style={{ padding: '100px 80px 100px 200px', display: 'flex', flexDirection: 'column', justifyContent: 'center', borderRight: '1px solid rgba(255,255,255,0.06)' }}>
          <p className="sr" style={{ ...mono({ marginBottom: 28 }) }}>03: The Problem</p>
          <h2 className="sr" style={{ ...H2({ fontSize: 'clamp(30px, 3.4vw, 46px)', marginBottom: 32 }) }}>
            The platform was growing. The product was not getting more effective.
          </h2>
          <p className="sr" style={{ ...BODY, marginBottom: 20 }}>
            Rokt was onboarding more partners and growing total revenue, but RPT had stagnated.
            The system was scaling, but the ad experience itself wasn't improving.
          </p>
          <p className="sr" style={{ ...BODY, marginBottom: 32 }}>
            The design team was shipping. But without a system to connect what was shipped to what was
            working, they were essentially operating blind. Insights lived in decks and conversations.
            Teams repeated work. The same problems got solved multiple times.
          </p>
          <div className="sr" style={{
            display: 'inline-flex', flexDirection: 'column', padding: '28px 36px',
            background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 14, maxWidth: 320,
          }}>
            <p style={{ fontSize: 'clamp(38px, 4.5vw, 56px)', fontWeight: 700, letterSpacing: '-0.04em', color: '#fff', lineHeight: 1, marginBottom: 10 }}>
              RPT flat
            </p>
            <p style={{ ...mono(), marginBottom: 0 }}>Despite growing partner volume, revenue per transaction wasn't improving</p>
          </div>
        </div>
        <div style={{ padding: '100px 200px 100px 80px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 0 }}>
          {[
            ['Why this was hard', 'The ad placement worked. Revenue was growing. There was no obvious crisis, which made it difficult to justify a fundamental rethink of how the team operated.'],
            ['The real gap', 'Without a structured way to learn from experiments, every design was a one-off. There was no feedback loop connecting what shipped to what changed performance.'],
            ['What was needed', 'Not just better designs. A system for generating, testing, and capturing design knowledge at scale so improvements could compound rather than reset with each project.'],
          ].map(([heading, body]) => (
            <div key={heading} className="sr" style={{ padding: '24px 0', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
              <p style={{ ...mono({ marginBottom: 10 }) }}>{heading}</p>
              <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.72)', lineHeight: 1.7 }}>{body}</p>
            </div>
          ))}
        </div>
        <p style={{ ...slideNum, gridColumn: '1 / -1', textAlign: 'right', padding: '0 200px 40px' }}>03 / {TOTAL}</p>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          04 / MY ROLE
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section id="slide-my-role" style={{
        minHeight: '100vh', ...PAD, ...DIVIDER, background: '#050505', position: 'relative',
      }}>
        <p className="sr" style={{ ...mono({ marginBottom: 24 }) }}>04: My Role &amp; Ownership</p>
        <h2 className="sr" style={{ ...H2({ fontSize: 'clamp(30px, 3.8vw, 52px)', marginBottom: 16, maxWidth: 680 }) }}>
          I built the system that made the team smarter over time.
        </h2>
        <p className="sr" style={{ fontSize: 16, color: 'rgba(255,255,255,0.60)', marginBottom: 72, maxWidth: 560, lineHeight: 1.6 }}>
          There was no structured experimentation process when I arrived. I didn't just run experiments. I defined how the team would learn.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 1, background: 'rgba(255,255,255,0.06)' }}>
          {[
            { owner: 'I owned', items: [
              ['Experimentation strategy', 'Defining what to test, how to structure each hypothesis, and how to sequence experiments across verticals.'],
              ['Metrics framework', 'Creating the performance definitions (CTR, conversion per impression, RPT contribution) used to evaluate every experiment.'],
              ['Feedback loop design', 'Building the system that connected results across partner environments so learnings compounded rather than stayed siloed.'],
              ['Design mentorship', 'Establishing a structure that scaled my thinking to a second designer, so the system could run without being bottlenecked by me.'],
            ]},
            { owner: 'In partnership with', items: [
              ['Product', 'Aligned on which verticals and partner environments to prioritize for testing, and how to sequence experiments against business goals.'],
              ['Engineering', 'Worked within platform constraints to determine which design variations were testable within existing infrastructure.'],
              ['Data & Analytics', 'Co-defined what signals to measure, reviewed experiment results together, and used data to determine when a result was conclusive.'],
              ['Partner success', 'Understood partner-specific constraints, including visual brand requirements and placement rules, that shaped what could be tested in each environment.'],
            ]},
          ].map(({ owner, items }) => (
            <div key={owner} style={{ background: '#080808', padding: '48px 56px' }}>
              <p style={{ ...mono({ color: owner === 'I owned' ? 'rgba(100,180,255,0.6)' : 'rgba(255,255,255,0.28)', marginBottom: 32 }) }}>{owner}</p>
              {items.map(([tag, body]) => (
                <div key={tag} style={{ padding: '16px 0', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                  <p style={{ fontSize: 14, fontWeight: 500, color: 'rgba(255,255,255,0.75)', marginBottom: 6 }}>{tag}</p>
                  <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.68)', lineHeight: 1.65 }}>{body}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
        <p style={{ ...slideNum, position: 'absolute', bottom: 48, right: 200 }}>04 / {TOTAL}</p>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          05 / DISCOVERY
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section id="slide-discovery" style={{
        minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center',
        padding: '100px 200px', ...DIVIDER, background: '#080808', position: 'relative',
      }}>
        {/* Header */}
        <p className="sr" style={{ ...mono({ marginBottom: 20 }) }}>05: Discovery &amp; Research</p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 64 }}>
          <h2 className="sr" style={{ ...H2({ fontSize: 'clamp(32px, 3.5vw, 54px)', maxWidth: 600 }) }}>
            I went to users before I went to the design.
          </h2>
          <div className="sr" style={{ display: 'flex', gap: 48, flexShrink: 0, paddingLeft: 48 }}>
            {[['100+', 'Users screened'], ['50', 'In-depth sessions'], ['3', 'Methods']].map(([n, l]) => (
              <div key={l} style={{ textAlign: 'right' }}>
                <p style={{ fontSize: 32, fontWeight: 700, letterSpacing: '-0.04em', color: '#fff', marginBottom: 4 }}>{n}</p>
                <p style={{ ...mono({ fontSize: 8 }), marginBottom: 0 }}>{l}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Method cards — 3 columns */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1, background: 'rgba(255,255,255,0.06)' }}>
          {[
            ['01', 'Behavioral Data Audit', 'Tableau + Business Analytics', 'Analyzed performance data across partner environments to identify where and when users were dropping, engaging, or converting. Surfaced patterns that couldn\'t be explained by the existing designs alone.'],
            ['02', 'User Surveys', '100+ screened respondents', 'Recruited users who regularly shopped online and had encountered ads at checkout. Screened for variety in shopping behaviors and ad engagement patterns.'],
            ['03', 'In-Depth Interviews', '50 sessions on live sites', 'Conducted sessions on sites they actually use, watching them encounter ads in real context. Probed how they notice, process, and respond to ads at different moments in the journey.'],
          ].map(([n, title, sub, desc]) => (
            <div key={n} className="sr" style={{ background: '#080808', padding: '36px 40px' }}>
              <p style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'rgba(255,255,255,0.2)', marginBottom: 16 }}>{n}</p>
              <p style={{ fontSize: 18, fontWeight: 600, color: 'rgba(255,255,255,0.88)', marginBottom: 6, letterSpacing: '-0.01em', lineHeight: 1.25 }}>{title}</p>
              <p style={{ ...mono({ fontSize: 8, marginBottom: 16 }) }}>{sub}</p>
              <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.62)', lineHeight: 1.7 }}>{desc}</p>
            </div>
          ))}
        </div>

        <p style={{ ...slideNum, position: 'absolute', bottom: 40, right: 200 }}>05 / {TOTAL}</p>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          06 / CENTRAL INSIGHT
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section id="slide-insight" style={{
        minHeight: '80vh', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: '120px 200px', background: '#050505', ...DIVIDER,
        textAlign: 'center', position: 'relative',
      }}>
        <p className="sr" style={{ ...mono({ marginBottom: 44 }) }}>06: Central Finding</p>
        <div style={{ width: 32, height: 1, background: 'rgba(255,255,255,0.18)', margin: '0 auto 48px' }} />
        <blockquote className="sr" style={{
          fontSize: 'clamp(20px, 3.2vw, 40px)', fontWeight: 500,
          letterSpacing: '-0.02em', lineHeight: 1.38,
          color: 'rgba(255,255,255,0.82)', maxWidth: 860, margin: '0 auto', fontStyle: 'normal',
        }}>
          "Users aren't{' '}
          <em style={{ fontStyle: 'italic', color: 'rgba(255,255,255,0.60)' }}>passively ignoring</em>{' '}
          ads. They're{' '}
          <em style={{ fontStyle: 'italic', color: 'rgba(255,255,255,0.60)' }}>actively avoiding</em>{' '}
          them, regardless of relevance."
        </blockquote>
        <div style={{ width: 32, height: 1, background: 'rgba(255,255,255,0.18)', margin: '48px auto 40px' }} />
        <p className="sr" style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.22)' }}>
          The question became: how do we earn the right to be there at all?
        </p>
        <p style={{ ...slideNum, position: 'absolute', bottom: 48, right: 200 }}>06 / {TOTAL}</p>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          07 / STRATEGY
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section id="slide-strategy" style={{
        minHeight: '100vh', ...PAD, ...DIVIDER, background: '#080808', position: 'relative',
      }}>
        <p className="sr" style={{ ...mono({ marginBottom: 24 }) }}>07: Strategy</p>
        <h2 className="sr" style={{ ...H2({ fontSize: 'clamp(30px, 3.8vw, 52px)', marginBottom: 16, maxWidth: 700 }) }}>
          I reframed the question the team was asking.
        </h2>
        <p className="sr" style={{ fontSize: 16, color: 'rgba(255,255,255,0.60)', marginBottom: 72, maxWidth: 560, lineHeight: 1.6 }}>
          From: <em style={{ color: 'rgba(255,255,255,0.25)' }}>"What should we design?"</em> &nbsp;→&nbsp;
          To: <em style={{ color: 'rgba(255,255,255,0.7)' }}>"What should we learn next?"</em>
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1, background: 'rgba(255,255,255,0.06)' }}>
          {[
            {
              n: '01', label: 'Visual Context',
              thesis: 'If an ad feels relevant to what the user just purchased, it earns attention rather than triggering avoidance.',
              test: 'Test contextual and functional imagery vs. text-only and decorative visuals.',
              color: 'rgba(100,180,255,0.12)',
            },
            {
              n: '02', label: 'Content Clarity',
              thesis: 'Users in post-purchase flows process information quickly. Clarity outperforms persuasion.',
              test: 'Test structured benefit lists and scannable layouts vs. dense copy.',
              color: 'rgba(180,160,255,0.12)',
            },
            {
              n: '03', label: 'Interaction Control',
              thesis: 'Giving users agency in the experience, rather than passive exposure, shifts the dynamic from interruption to exploration.',
              test: 'Test navigation between offers vs. single fixed ad placement.',
              color: 'rgba(255,180,100,0.12)',
            },
          ].map(({ n, label, thesis, test, color }) => (
            <div key={n} className="sr" style={{ background: '#080808', padding: '48px 40px', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', inset: 0, background: color, opacity: 0.4 }} />
              <div style={{ position: 'relative' }}>
                <p style={{ ...mono({ fontSize: 8, marginBottom: 20 }) }}>{n} · {label}</p>
                <p style={{ fontSize: 16, fontWeight: 500, color: 'rgba(255,255,255,0.82)', marginBottom: 20, lineHeight: 1.4, letterSpacing: '-0.01em' }}>{thesis}</p>
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 20 }}>
                  <p style={{ ...mono({ fontSize: 8, marginBottom: 8 }) }}>How we'd test it</p>
                  <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.68)', lineHeight: 1.65 }}>{test}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="sr" style={{
          marginTop: 40, padding: '24px 32px',
          background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 10,
        }}>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', lineHeight: 1.65 }}>
            A fourth hypothesis, <strong style={{ color: 'rgba(255,255,255,0.65)' }}>Visual Trust</strong>, emerged from early experimentation: when the ad UI mirrors the host site's visual language, users extend their trust in the brand they just purchased from to the ad content alongside it.
          </p>
        </div>
        <p style={{ ...slideNum, position: 'absolute', bottom: 48, right: 200 }}>07 / {TOTAL}</p>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          08 / THE SYSTEM
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section id="slide-system" style={{
        minHeight: '100vh', ...PAD, ...DIVIDER, background: '#050505', position: 'relative',
      }}>
        <p className="sr" style={{ ...mono({ marginBottom: 24 }) }}>08: The Experimentation System</p>
        <h2 className="sr" style={{ ...H2({ fontSize: 'clamp(30px, 3.8vw, 52px)', marginBottom: 16, maxWidth: 680 }) }}>
          I converted a design team into a learning system.
        </h2>
        <p className="sr" style={{ fontSize: 15, color: 'rgba(255,255,255,0.60)', marginBottom: 48, maxWidth: 600, lineHeight: 1.6 }}>
          Before this work, the team shipped designs. I built the operating mechanism that turned shipping into compounding. Over 18 months: twice the experiment cadence, cross-vertical learnings, and a feedback loop that made each experiment smarter than the last.
        </p>

        <div style={{
          padding: '40px 20px 28px',
          background: 'rgba(255,255,255,0.015)',
          border: '1px solid rgba(255,255,255,0.07)',
          borderRadius: 6, overflow: 'hidden',
        }}>
          <p style={{
            fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.18em',
            textTransform: 'uppercase', color: 'rgba(255,255,255,0.28)',
            marginBottom: 0, textAlign: 'center',
          }}>Experimentation Loop · System Overview</p>
          <svg viewBox="0 120 1000 740" style={{ width: '100%', height: 'auto', display: 'block' }}>
            <defs>
              <marker id="arr-rokt" markerWidth="9" markerHeight="7" refX="8" refY="3.5" orient="auto" markerUnits="strokeWidth">
                <polygon points="0 0.5, 8 3.5, 0 6.5" fill="#5B8BD4"/>
              </marker>
            </defs>
            <path d="M 577.3,212.2 A 250,250 0 0,1 667.3,264.2" fill="none" stroke="#5B8BD4" strokeWidth="1.3" markerEnd="url(#arr-rokt)" opacity="0.7"/>
            <path d="M 744.5,398.0 A 250,250 0 0,1 744.5,502.0" fill="none" stroke="#5B8BD4" strokeWidth="1.3" markerEnd="url(#arr-rokt)" opacity="0.7"/>
            <path d="M 667.3,635.8 A 250,250 0 0,1 577.3,687.8" fill="none" stroke="#5B8BD4" strokeWidth="1.3" markerEnd="url(#arr-rokt)" opacity="0.7"/>
            <path d="M 422.7,687.8 A 250,250 0 0,1 332.7,635.8" fill="none" stroke="#5B8BD4" strokeWidth="1.3" markerEnd="url(#arr-rokt)" opacity="0.7"/>
            <path d="M 255.5,502.0 A 250,250 0 0,1 255.5,398.0" fill="none" stroke="#5B8BD4" strokeWidth="1.3" markerEnd="url(#arr-rokt)" opacity="0.7"/>
            <path d="M 332.7,264.2 A 250,250 0 0,1 422.7,212.2" fill="none" stroke="#5B8BD4" strokeWidth="1.3" markerEnd="url(#arr-rokt)" opacity="0.7"/>
            <text x="500" y="157" textAnchor="middle" fill="rgba(255,255,255,0.2)"  fontSize={8}  fontFamily="'DM Mono','Courier New',monospace" letterSpacing="0.18em">01</text>
            <text x="500" y="175" textAnchor="middle" fill="rgba(255,255,255,0.88)" fontSize={15} fontWeight="500" fontFamily="'Satoshi','Inter',sans-serif">Hypothesis</text>
            <text x="500" y="192" textAnchor="middle" fill="rgba(255,255,255,0.4)"  fontSize={10} fontFamily="'Satoshi','Inter',sans-serif">Based on observed behavior</text>
            <text x="500" y="206" textAnchor="middle" fill="rgba(255,255,255,0.4)"  fontSize={10} fontFamily="'Satoshi','Inter',sans-serif">or performance gaps</text>
            <text x="740" y="293" textAnchor="start" fill="rgba(255,255,255,0.2)"  fontSize={8}  fontFamily="'DM Mono','Courier New',monospace" letterSpacing="0.18em">02</text>
            <text x="740" y="311" textAnchor="start" fill="rgba(255,255,255,0.88)" fontSize={15} fontWeight="500" fontFamily="'Satoshi','Inter',sans-serif">Design Variation</text>
            <text x="740" y="328" textAnchor="start" fill="rgba(255,255,255,0.4)"  fontSize={10} fontFamily="'Satoshi','Inter',sans-serif">Imagery, layout, content,</text>
            <text x="740" y="342" textAnchor="start" fill="rgba(255,255,255,0.4)"  fontSize={10} fontFamily="'Satoshi','Inter',sans-serif">or interaction pattern</text>
            <text x="740" y="550" textAnchor="start" fill="rgba(255,255,255,0.2)"  fontSize={8}  fontFamily="'DM Mono','Courier New',monospace" letterSpacing="0.18em">03</text>
            <text x="740" y="568" textAnchor="start" fill="rgba(255,255,255,0.88)" fontSize={15} fontWeight="500" fontFamily="'Satoshi','Inter',sans-serif">Experiment</text>
            <text x="740" y="585" textAnchor="start" fill="rgba(255,255,255,0.4)"  fontSize={10} fontFamily="'Satoshi','Inter',sans-serif">A/B tested across real users</text>
            <text x="740" y="599" textAnchor="start" fill="rgba(255,255,255,0.4)"  fontSize={10} fontFamily="'Satoshi','Inter',sans-serif">and partner environments</text>
            <text x="500" y="722" textAnchor="middle" fill="rgba(255,255,255,0.2)"  fontSize={8}  fontFamily="'DM Mono','Courier New',monospace" letterSpacing="0.18em">04</text>
            <text x="500" y="740" textAnchor="middle" fill="rgba(255,255,255,0.88)" fontSize={15} fontWeight="500" fontFamily="'Satoshi','Inter',sans-serif">Measure</text>
            <text x="500" y="757" textAnchor="middle" fill="rgba(255,255,255,0.4)"  fontSize={10} fontFamily="'Satoshi','Inter',sans-serif">CTR · conversion rate · revenue per transaction</text>
            <text x="260" y="550" textAnchor="end" fill="rgba(255,255,255,0.2)"  fontSize={8}  fontFamily="'DM Mono','Courier New',monospace" letterSpacing="0.18em">05</text>
            <text x="260" y="568" textAnchor="end" fill="rgba(255,255,255,0.88)" fontSize={15} fontWeight="500" fontFamily="'Satoshi','Inter',sans-serif">Learn</text>
            <text x="260" y="585" textAnchor="end" fill="rgba(255,255,255,0.4)"  fontSize={10} fontFamily="'Satoshi','Inter',sans-serif">What influenced behavior?</text>
            <text x="260" y="599" textAnchor="end" fill="rgba(255,255,255,0.4)"  fontSize={10} fontFamily="'Satoshi','Inter',sans-serif">What increased engagement?</text>
            <text x="260" y="293" textAnchor="end" fill="rgba(255,255,255,0.2)"  fontSize={8}  fontFamily="'DM Mono','Courier New',monospace" letterSpacing="0.18em">06</text>
            <text x="260" y="311" textAnchor="end" fill="rgba(255,255,255,0.88)" fontSize={15} fontWeight="500" fontFamily="'Satoshi','Inter',sans-serif">Iterate</text>
            <text x="260" y="328" textAnchor="end" fill="rgba(255,255,255,0.4)"  fontSize={10} fontFamily="'Satoshi','Inter',sans-serif">Insights feed the next</text>
            <text x="260" y="342" textAnchor="end" fill="rgba(255,255,255,0.4)"  fontSize={10} fontFamily="'Satoshi','Inter',sans-serif">set of hypotheses</text>
            <text x="500" y="437" textAnchor="middle" fill="rgba(255,255,255,0.1)" fontSize={8}  fontFamily="'DM Mono','Courier New',monospace" letterSpacing="0.14em">CONTINUOUS</text>
            <text x="500" y="452" textAnchor="middle" fill="rgba(255,255,255,0.1)" fontSize={8}  fontFamily="'DM Mono','Courier New',monospace" letterSpacing="0.14em">IMPROVEMENT</text>
            <text x="500" y="470" textAnchor="middle" fill="rgba(255,255,255,0.12)" fontSize={16} fontFamily="'Satoshi','Inter',sans-serif">↻</text>
            <text x="94"  y="424" textAnchor="middle" fill="rgba(255,255,255,0.22)" fontSize={8.5} fontFamily="'Satoshi','Inter',sans-serif">40+ experiments</text>
            <text x="94"  y="438" textAnchor="middle" fill="rgba(255,255,255,0.22)" fontSize={8.5} fontFamily="'Satoshi','Inter',sans-serif">across 10+ design</text>
            <text x="94"  y="452" textAnchor="middle" fill="rgba(255,255,255,0.22)" fontSize={8.5} fontFamily="'Satoshi','Inter',sans-serif">directions</text>
            <line x1="150" y1="438" x2="163" y2="438" stroke="rgba(255,255,255,0.1)" strokeWidth="0.6"/>
            <text x="906" y="424" textAnchor="middle" fill="rgba(255,255,255,0.22)" fontSize={8.5} fontFamily="'Satoshi','Inter',sans-serif">Experiment velocity</text>
            <text x="906" y="438" textAnchor="middle" fill="rgba(255,255,255,0.22)" fontSize={8.5} fontFamily="'Satoshi','Inter',sans-serif">monthly → biweekly</text>
            <line x1="837" y1="438" x2="850" y2="438" stroke="rgba(255,255,255,0.1)" strokeWidth="0.6"/>
            <text x="500" y="800" textAnchor="middle" fill="rgba(255,255,255,0.22)" fontSize={8.5} fontFamily="'Satoshi','Inter',sans-serif">↑  Improved revenue per transaction</text>
          </svg>
        </div>
        {/* Key experiments visual */}
        <div className="sr" style={{ marginTop: 40 }}>
          <p style={{ ...mono({ marginBottom: 16 }) }}>Experiment output · 34 experiments, 7 verticals</p>
          <img
            src="/images/rokt/key_experiments.png"
            alt="Key experiment variants overview"
            style={{
              width: '100%', borderRadius: 10,
              border: '1px solid rgba(255,255,255,0.08)',
              display: 'block',
            }}
          />
        </div>

        <p style={{ ...slideNum, position: 'absolute', bottom: 48, right: 200 }}>08 / {TOTAL}</p>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          09 / EXPERIMENT: VISUAL CONTEXT
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section id="slide-exp-visual" style={{
        minHeight: '100vh', display: 'grid', gridTemplateColumns: '1fr 1fr',
        ...DIVIDER, background: '#080808', position: 'relative',
      }}>
        <div style={{ padding: '100px 80px 100px 200px', display: 'flex', flexDirection: 'column', justifyContent: 'center', borderRight: '1px solid rgba(255,255,255,0.06)' }}>
          <p className="sr" style={{ ...mono({ marginBottom: 12 }) }}>09: Experiment · Visual Context</p>
          <div className="sr" style={{
            display: 'inline-block', padding: '4px 10px', borderRadius: 4,
            background: 'rgba(100,180,255,0.1)', border: '1px solid rgba(100,180,255,0.2)',
            marginBottom: 28,
          }}>
            <span style={{ fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(100,180,255,0.75)' }}>Result: +25% conversion per impression</span>
          </div>
          <h2 className="sr" style={{ ...H2({ fontSize: 'clamp(28px, 3vw, 42px)', marginBottom: 24 }) }}>
            Relevance mattered more than visual restraint.
          </h2>
          <p className="sr" style={{ ...BODY, marginBottom: 20 }}>
            The assumption on the team was that imagery hurt performance. Historical data showed
            poorly matched visuals underperformed plain text, so imagery had largely been avoided.
          </p>
          <p className="sr" style={{ ...BODY, marginBottom: 20 }}>
            My hypothesis: the problem wasn't imagery. It was <em>irrelevant</em> imagery. Contextual
            and functional visuals that reinforced the offer's value would perform differently.
          </p>
        </div>
        <div style={{ padding: '100px 200px 100px 80px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          {[
            ['The existing assumption', 'Imagery = visual noise. Teams had been avoiding visuals to keep ads "clean."'],
            ['What we tested', 'Contextual product imagery (showing what the offer is) vs. decorative imagery vs. text-only. Variants 3, 4, and 9 in the experiment suite.'],
            ['What the data showed', 'When imagery was functionally relevant to the offer, it increased conversion per impression by 25%. Users were more likely to engage when they could see what they were clicking to.'],
            ['The product decision this changed', 'Imagery became a standard design direction across verticals, not just for select partners, with one clear rule: relevance is the filter, not restraint.'],
          ].map(([heading, body]) => (
            <div key={heading} className="sr" style={{ padding: '20px 0', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
              <p style={{ ...mono({ fontSize: 8, marginBottom: 8 }) }}>{heading}</p>
              <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.72)', lineHeight: 1.7 }}>{body}</p>
            </div>
          ))}
        </div>
        <p style={{ ...slideNum, gridColumn: '1 / -1', textAlign: 'right', padding: '0 200px 40px' }}>09 / {TOTAL}</p>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          10 / EXPERIMENT: CONTENT CLARITY
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section id="slide-exp-clarity" style={{
        minHeight: '100vh', display: 'grid', gridTemplateColumns: '1fr 1fr',
        ...DIVIDER, background: '#0a0a0a', position: 'relative',
      }}>
        <div style={{ padding: '100px 80px 100px 200px', display: 'flex', flexDirection: 'column', justifyContent: 'center', borderRight: '1px solid rgba(255,255,255,0.06)' }}>
          <p className="sr" style={{ ...mono({ marginBottom: 12 }) }}>10: Experiment · Content Clarity</p>
          <div className="sr" style={{
            display: 'inline-block', padding: '4px 10px', borderRadius: 4,
            background: 'rgba(180,160,255,0.1)', border: '1px solid rgba(180,160,255,0.2)',
            marginBottom: 28,
          }}>
            <span style={{ fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(180,160,255,0.75)' }}>Result: Incremental performance lift</span>
          </div>
          <h2 className="sr" style={{ ...H2({ fontSize: 'clamp(28px, 3vw, 42px)', marginBottom: 24 }) }}>
            Users in post-purchase flows scan. They don't read.
          </h2>
          <p className="sr" style={{ ...BODY, marginBottom: 20 }}>
            In a transactional context, users are in "done" mode. They've just completed a purchase
            and their attention is low. Dense persuasive copy, the default for ad creative, wasn't
            suited to the moment.
          </p>
          <p className="sr" style={{ ...BODY }}>
            Replacing dense copy with structured benefit lists made offers easier to evaluate at a
            glance, matching how users actually process information in these high-speed moments.
          </p>
        </div>
        <div style={{ padding: '100px 200px 100px 80px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          {[
            ['What we tested', 'Compact single-line layouts, expanded copy with inline CTAs, structured benefit lists, systematically varying how much information was present and how it was organized.'],
            ['Collaboration moment', 'Data & Insights helped us define "clarity score" as a proxy metric alongside conversion, giving us a way to evaluate comprehension rather than just clicks before performance was conclusive.'],
            ['What changed', 'Structured layouts that surfaced the offer\'s value proposition in the fewest possible words consistently outperformed dense or persuasive copy in post-purchase contexts.'],
            ['How this generalizes', 'Matching information density to attention level became a cross-vertical design rule that shaped how we briefed advertisers on creative requirements.'],
          ].map(([heading, body]) => (
            <div key={heading} className="sr" style={{ padding: '20px 0', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
              <p style={{ ...mono({ fontSize: 8, marginBottom: 8 }) }}>{heading}</p>
              <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.72)', lineHeight: 1.7 }}>{body}</p>
            </div>
          ))}
        </div>
        <p style={{ ...slideNum, gridColumn: '1 / -1', textAlign: 'right', padding: '0 200px 40px' }}>10 / {TOTAL}</p>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          11 / EXPERIMENT: INTERACTION CONTROL
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section id="slide-exp-control" style={{
        minHeight: '100vh', display: 'grid', gridTemplateColumns: '1fr 1fr',
        ...DIVIDER, background: '#080808', position: 'relative',
      }}>
        <div style={{ padding: '100px 80px 100px 200px', display: 'flex', flexDirection: 'column', justifyContent: 'center', borderRight: '1px solid rgba(255,255,255,0.06)' }}>
          <p className="sr" style={{ ...mono({ marginBottom: 12 }) }}>11: Experiment · Interaction Control</p>
          <div className="sr" style={{
            display: 'inline-block', padding: '4px 10px', borderRadius: 4,
            background: 'rgba(255,180,100,0.1)', border: '1px solid rgba(255,180,100,0.2)',
            marginBottom: 28,
          }}>
            <span style={{ fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,180,100,0.75)' }}>Result: +30% conversion per impression</span>
          </div>
          <h2 className="sr" style={{ ...H2({ fontSize: 'clamp(28px, 3vw, 42px)', marginBottom: 24 }) }}>
            Agency shifted the experience from interruption to exploration.
          </h2>
          <p className="sr" style={{ ...BODY, marginBottom: 20 }}>
            Once a user dismissed an offer, they couldn't return to it. If they missed something, it was
            gone. This created a one-shot experience where disengagement was permanent.
          </p>
          <p className="sr" style={{ ...BODY }}>
            Adding navigation between offers let users explore at their own pace, fundamentally changing the
            dynamic from passive exposure to active browsing. Users who had previously dismissed ads stayed
            engaged longer once they had control.
          </p>
        </div>
        <div style={{ padding: '100px 200px 100px 80px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          {[
            ['The tension', 'Product was concerned that navigation would increase complexity and distract from the primary conversion action. Engineering flagged that multi-offer navigation required infra changes.'],
            ['How we resolved it', 'We ran a scoped experiment with navigation on a single partner environment before proposing it as a platform feature. The +30% result made the case for investing in the infra work.'],
            ['What this teaches', 'Experimentation wasn\'t just a design validation tool. It was the mechanism for resolving cross-functional debates. Data moved the conversation faster than alignment sessions.'],
            ['The broader implication', 'This changed how we thought about the ad slot entirely, shifting it from a single placement to a browsable experience with multiple offers surfaced in sequence.'],
          ].map(([heading, body]) => (
            <div key={heading} className="sr" style={{ padding: '20px 0', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
              <p style={{ ...mono({ fontSize: 8, marginBottom: 8 }) }}>{heading}</p>
              <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.72)', lineHeight: 1.7 }}>{body}</p>
            </div>
          ))}
        </div>
        <p style={{ ...slideNum, gridColumn: '1 / -1', textAlign: 'right', padding: '0 200px 40px' }}>11 / {TOTAL}</p>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          12 / EXPERIMENT: VISUAL TRUST
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section id="slide-exp-trust" style={{
        minHeight: '100vh', display: 'grid', gridTemplateColumns: '1fr 1fr',
        ...DIVIDER, background: '#0a0a0a', position: 'relative',
      }}>
        <div style={{ padding: '100px 80px 100px 200px', display: 'flex', flexDirection: 'column', justifyContent: 'center', borderRight: '1px solid rgba(255,255,255,0.06)' }}>
          <p className="sr" style={{ ...mono({ marginBottom: 12 }) }}>12: Experiment · Visual Trust</p>
          <div className="sr" style={{
            display: 'inline-block', padding: '4px 10px', borderRadius: 4,
            background: 'rgba(100,220,160,0.1)', border: '1px solid rgba(100,220,160,0.2)',
            marginBottom: 28,
          }}>
            <span style={{ fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(100,220,160,0.75)' }}>Result: Increased content engagement</span>
          </div>
          <h2 className="sr" style={{ ...H2({ fontSize: 'clamp(28px, 3vw, 42px)', marginBottom: 24 }) }}>
            Brand trust is transferable, but only if you earn it visually.
          </h2>
          <p className="sr" style={{ ...BODY, marginBottom: 20 }}>
            The research surfaced something unexpected: users extended trust from the brand they had
            just purchased from to ad content alongside it, but only when the ad UI felt visually
            consistent with the host experience.
          </p>
          <p className="sr" style={{ ...BODY }}>
            Ads that felt native to the host page weren't perceived as interruptions. They read as
            endorsed. Ads that looked foreign were treated with the same avoidance reflex as banner ads.
          </p>
        </div>
        <div style={{ padding: '100px 200px 100px 80px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          {[
            ['What we tested', 'Restrained palette versions that mirrored host site visual language vs. generic Rokt-branded treatments. Variants 7 and 8.'],
            ['The design principle', 'Camouflage by relevance, not by deception. The goal wasn\'t to hide the ad. It was to make the ad feel like it belonged to the same ecosystem of quality the user had just experienced.'],
            ['The product implication', 'This informed how we worked with partners on creative direction, pushing for visuals and typography that adapted to each host context rather than defaulting to advertiser brand templates.'],
            ['A constraint this surfaced', 'Some advertisers had brand guidelines that made native-style adaptation difficult. This became an ongoing conversation with partner success and product about how much creative flexibility we could require.'],
          ].map(([heading, body]) => (
            <div key={heading} className="sr" style={{ padding: '20px 0', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
              <p style={{ ...mono({ fontSize: 8, marginBottom: 8 }) }}>{heading}</p>
              <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.72)', lineHeight: 1.7 }}>{body}</p>
            </div>
          ))}
        </div>
        <p style={{ ...slideNum, gridColumn: '1 / -1', textAlign: 'right', padding: '0 200px 40px' }}>12 / {TOTAL}</p>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          13 / DESIGN VARIANTS (interactive)
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section id="slide-variants" style={{
        minHeight: '100vh', ...PAD, ...DIVIDER, background: '#050505', position: 'relative',
      }}>
        <p className="sr" style={{ ...mono({ marginBottom: 24 }) }}>13: The Design Variants</p>
        <h2 className="sr" style={{ ...H2({ fontSize: 'clamp(28px, 3.4vw, 46px)', marginBottom: 16, maxWidth: 680 }) }}>
          34 experiments. 11 design directions. One interactive viewer.
        </h2>
        <p className="sr" style={{ fontSize: 15, color: 'rgba(255,255,255,0.60)', marginBottom: 48, maxWidth: 560, lineHeight: 1.6 }}>
          Each variant represents a hypothesis. Select any to see the design direction, the hypothesis it tested, and what the data showed.
        </p>
        <ExperimentViewer />
        <p style={{ ...slideNum, position: 'absolute', bottom: 48, right: 200 }}>13 / {TOTAL}</p>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          14 / TRADEOFFS
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section id="slide-tradeoffs" style={{
        minHeight: '100vh', ...PAD, ...DIVIDER, background: '#080808', position: 'relative',
      }}>
        <p className="sr" style={{ ...mono({ marginBottom: 24 }) }}>14: Tradeoffs &amp; Collaboration</p>
        <h2 className="sr" style={{ ...H2({ fontSize: 'clamp(28px, 3.4vw, 46px)', marginBottom: 16, maxWidth: 680 }) }}>
          Three moments where collaboration materially changed the work.
        </h2>
        <p className="sr" style={{ fontSize: 15, color: 'rgba(255,255,255,0.60)', marginBottom: 56, maxWidth: 540, lineHeight: 1.6 }}>
          Decisions didn't live in design. They emerged from the intersection of product priorities, engineering constraints, and data signals.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 1, background: 'rgba(255,255,255,0.06)' }}>
          {[
            {
              tension: 'Shipping designs vs. building a learning system',
              who: 'Product + Design leadership',
              decision: 'Invest in experimentation infrastructure before optimizing individual designs.',
              why: 'Without a learning loop, design improvements would keep resetting. Product aligned on this once we showed how siloed results were costing the team repeated effort.',
            },
            {
              tension: 'Multi-offer navigation vs. technical feasibility',
              who: 'Engineering + Product + Design',
              decision: 'Run a scoped experiment on one partner before requesting platform infra investment.',
              why: 'Engineering flagged the cost of navigation changes. Rather than arguing the case in the abstract, we tested on a constrained environment. +30% conversion made the business case for the investment.',
            },
            {
              tension: 'Native visual treatment vs. advertiser brand guidelines',
              who: 'Design + Partner Success + Advertisers',
              decision: 'Establish a "native adaptation tier" with flexible brand guidelines for Rokt placements.',
              why: 'Advertisers resisted deviation from their master brand. We needed to show them performance data from native-style tests before they\'d consider updating their creative requirements.',
            },
          ].map(({ tension, who, decision, why }) => (
            <div key={tension} className="sr" style={{ background: '#080808', padding: '36px 48px', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 32 }}>
              <div>
                <p style={{ ...mono({ fontSize: 8, marginBottom: 10 }) }}>The tension</p>
                <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.72)', lineHeight: 1.5, fontWeight: 500 }}>{tension}</p>
              </div>
              <div>
                <p style={{ ...mono({ fontSize: 8, marginBottom: 10 }) }}>Who was involved</p>
                <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.70)', lineHeight: 1.6 }}>{who}</p>
              </div>
              <div>
                <p style={{ ...mono({ fontSize: 8, marginBottom: 10 }) }}>The decision</p>
                <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.70)', lineHeight: 1.6 }}>{decision}</p>
              </div>
              <div>
                <p style={{ ...mono({ fontSize: 8, marginBottom: 10 }) }}>Why</p>
                <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.70)', lineHeight: 1.6 }}>{why}</p>
              </div>
            </div>
          ))}
        </div>
        <p style={{ ...slideNum, position: 'absolute', bottom: 48, right: 200 }}>14 / {TOTAL}</p>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          15 / IMPACT
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section id="slide-impact" style={{
        minHeight: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'center',
        ...PAD, ...DIVIDER, background: '#050505', position: 'relative',
      }}>
        <p className="sr" style={{ ...mono({ marginBottom: 28 }) }}>15: Impact</p>
        <h2 className="sr" style={{
          fontSize: 'clamp(22px, 2.8vw, 36px)', fontWeight: 500, letterSpacing: '-0.02em',
          color: 'rgba(255,255,255,0.5)', marginBottom: 72, maxWidth: 560,
        }}>
          Not 40 experiments. An operating mechanism that didn't exist before.
        </h2>
        <div className="sr" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          {[
            ['+25 to 30%', 'Conversion per impression', 'Across key experiment categories'],
            ['40+', 'Experiments shipped', 'Across 7 verticals in 18 months'],
            ['2×', 'Experiment velocity', 'Monthly cadence → biweekly'],
            ['Cross-vertical', 'Learning library', 'Insights shared across all partner environments'],
          ].map(([n, l, d], i) => (
            <div key={l} style={{
              padding: '56px 0',
              borderRight: i < 3 ? '1px solid rgba(255,255,255,0.08)' : 'none',
              paddingRight: i < 3 ? 48 : 0,
              paddingLeft: i > 0 ? 48 : 0,
            }}>
              <p style={{
                fontSize: 'clamp(36px, 5vw, 72px)', fontWeight: 700, letterSpacing: '-0.05em',
                color: '#fff', lineHeight: 1, marginBottom: 18,
              }}>{n}</p>
              <p style={{ fontSize: 15, fontWeight: 500, color: 'rgba(255,255,255,0.65)', marginBottom: 6 }}>{l}</p>
              <p style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.26)' }}>{d}</p>
            </div>
          ))}
        </div>
        <div className="sr" style={{
          marginTop: 56, padding: '24px 32px',
          background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 10,
          maxWidth: 680,
        }}>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', lineHeight: 1.7 }}>
            Performance improvements now compound over time, not because any single design was brilliant,
            but because the system I built keeps getting smarter. I elevated design's role from
            an execution function to the engine of performance improvement.
          </p>
        </div>
        <p style={{ ...slideNum, position: 'absolute', bottom: 48, right: 200 }}>15 / {TOTAL}</p>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          16 / REFLECTION
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section id="slide-reflection" style={{
        minHeight: '90vh', padding: '100px 200px 140px', ...DIVIDER, background: '#0a0a0a', position: 'relative',
      }}>
        <p className="sr" style={{ ...mono({ marginBottom: 24 }) }}>16: Reflection</p>
        <h2 className="sr" style={{ ...H2({ fontSize: 'clamp(30px, 3.8vw, 52px)', marginBottom: 72, maxWidth: 560 }) }}>
          What I'd approach differently.
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 48 }}>
          {[
            ['The most effective products aren\'t defined by solutions. They\'re defined by how well they learn.', 'In high-intent environments, small design changes can have outsized revenue impact. The leverage isn\'t in predicting the right answer. It\'s in building systems that discover it faster than the competition.'],
            ['Design\'s role is most powerful when it\'s connected to outcomes, not just outputs.', 'The work that mattered most wasn\'t any individual design decision. It was building the learning infrastructure and positioning design as the engine of that improvement, not a downstream executor.'],
            ['I\'d instrument the qualitative side earlier.', 'We built strong quantitative measurement. But qualitative insight about why a variant worked often came too late to influence the next round of hypotheses. I\'d build that loop in from the start.'],
          ].map(([h, b], i) => (
            <div key={i} className="sr" style={{ paddingTop: 32, borderTop: '2px solid rgba(255,255,255,0.07)' }}>
              <p style={{ ...mono({ marginBottom: 20 }) }}>
                {i < 2 ? `Learning ${String(i + 1).padStart(2, '0')}` : 'What I\'d do differently'}
              </p>
              <p style={{ fontSize: 17, fontWeight: 500, color: 'rgba(255,255,255,0.82)', lineHeight: 1.35, marginBottom: 16, letterSpacing: '-0.015em' }}>{h}</p>
              <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.62)', lineHeight: 1.7 }}>{b}</p>
            </div>
          ))}
        </div>
        <p style={{ ...slideNum, position: 'absolute', bottom: 56, right: 200 }}>16 / {TOTAL}</p>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          17 / OUTFRONT
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section id="slide-outfront" style={{
        minHeight: '90vh', display: 'grid', gridTemplateColumns: '1fr 1fr',
        ...DIVIDER, background: '#080808', position: 'relative',
      }}>
        <div style={{ padding: '100px 80px 100px 200px', display: 'flex', flexDirection: 'column', justifyContent: 'center', borderRight: '1px solid rgba(255,255,255,0.06)' }}>
          <p className="sr" style={{ ...mono({ marginBottom: 16 }) }}>17: Additional Advertising Experience</p>
          <div className="sr" style={{
            display: 'inline-block', padding: '4px 10px', borderRadius: 4,
            background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)',
            marginBottom: 28,
          }}>
            <span style={{ fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)' }}>OUTFRONT Media · Internal Tooling</span>
          </div>
          <h2 className="sr" style={{ ...H2({ fontSize: 'clamp(28px, 3vw, 42px)', marginBottom: 24 }) }}>
            Both sides of the advertising ecosystem.
          </h2>
          <p className="sr" style={{ ...BODY, marginBottom: 24 }}>
            At Rokt, I worked on the <strong style={{ color: 'rgba(255,255,255,0.75)' }}>external customer-facing experience</strong>: the ad itself, its performance, and how design decisions influenced conversion.
          </p>
          <p className="sr" style={{ ...BODY, marginBottom: 24 }}>
            At OUTFRONT Media, I worked on the <strong style={{ color: 'rgba(255,255,255,0.75)' }}>internal advertiser tooling</strong>: the platform marketers use to plan, configure, and manage campaigns for digital out-of-home advertising across the United States.
          </p>
          <p className="sr" style={{ fontSize: 14, color: 'rgba(255,255,255,0.35)', lineHeight: 1.65, fontStyle: 'italic' }}>
            Consumer-facing ad experience + experimentation at Rokt →<br />
            Internal advertiser tooling + operational workflows at OUTFRONT.
          </p>
        </div>
        <div style={{ padding: '100px 200px 100px 80px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          {/* Image placeholder — swap in OUTFRONT screenshot */}
          <div className="sr" style={{
            width: '100%', aspectRatio: '16/10',
            background: 'rgba(255,255,255,0.03)',
            border: '1px dashed rgba(255,255,255,0.12)',
            borderRadius: 12,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            marginBottom: 32,
          }}>
            <p style={{ fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)', textAlign: 'center' }}>
              ↑ Add OUTFRONT Ads Manager screenshot here<br/>
              <span style={{ opacity: 0.5 }}>Replace this placeholder with your tool visual</span>
            </p>
          </div>
          {[
            ['The problem', 'Campaign creation depended on manual coordination, including conversations around inventory, bidding, placement timing, and creative requirements. The process was slow and hard to scale.'],
            ['What I designed', 'An Ads Manager platform helping marketers define audience, location, campaign requirements, placement duration, and performance considerations. Self-service, without manual handoffs.'],
            ['The shift', 'From manual coordination to autonomous campaign creation, reducing dependence on back-and-forth and giving marketers direct control over digital billboard inventory across the US.'],
          ].map(([heading, body]) => (
            <div key={heading} className="sr" style={{ padding: '18px 0', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
              <p style={{ ...mono({ fontSize: 8, marginBottom: 8 }) }}>{heading}</p>
              <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.72)', lineHeight: 1.7 }}>{body}</p>
            </div>
          ))}
        </div>

        {/* CTA row */}
        <div className="sr" style={{ gridColumn: '1 / -1', padding: '0 200px 80px', display: 'flex', gap: 16, alignItems: 'center' }}>
          <button onClick={() => navigate('/projects/rokt')} style={{
            fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.16em', textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.55)', background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, padding: '12px 22px', cursor: 'pointer',
          }}>← Full Case Study</button>
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} style={{
            fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.16em', textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.3)', background: 'none',
            border: '1px solid rgba(255,255,255,0.07)', borderRadius: 8, padding: '12px 22px', cursor: 'pointer',
          }}>↑ Back to top</button>
        </div>

        <p style={{ ...slideNum, gridColumn: '1 / -1', textAlign: 'right', padding: '0 200px 40px' }}>17 / {TOTAL}</p>
      </section>

    </div>
  )
}
