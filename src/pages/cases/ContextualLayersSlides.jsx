import { useState, useEffect, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useScrollReveal } from '../../hooks/useScrollReveal.js'
import { useReadingProgress } from '../../hooks/useReadingProgress.js'

// ── Style tokens ──────────────────────────────────────────────────────────────
const mono = (extra = {}) => ({
  fontFamily: 'var(--mono)',
  fontSize: 9,
  letterSpacing: '0.22em',
  textTransform: 'uppercase',
  color: 'rgba(255,255,255,0.28)',
  marginBottom: 0,
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
  marginBottom: 0,
  ...extra,
})
const BODY = { fontSize: 18, color: 'rgba(255,255,255,0.72)', lineHeight: 1.75, marginBottom: 0 }

const SLIDE_IDS = [
  'cls-cover',
  'cls-context',
  'cls-problem',
  'cls-origin',
  'cls-insight',
  'cls-strategy',
  'cls-exploration',
  'cls-solution',
  'cls-decisions',
  'cls-tradeoffs',
  'cls-system',
  'cls-metrics',
  'cls-outcome',
  'cls-reflection',
  'cls-close',
]
const TOTAL = SLIDE_IDS.length


export default function ContextualLayersSlides() {
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

      {/* Back */}
      <button
        onClick={() => navigate('/projects/contextual-layers')}
        style={{
          position: 'fixed', top: 24, left: 28, zIndex: 700,
          fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.16em',
          textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)',
          background: 'none', border: 'none', cursor: 'pointer', padding: 0,
        }}
      >
        ← Case Study
      </button>

      {/* ── 01 COVER ──────────────────────────────────────────────────────────── */}
      <section id="cls-cover" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', position: 'relative', overflow: 'hidden' }}>
        <img
          src="/images/hotspots/hotspot-hero.jpg"
          alt="Contextual Layers"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.18 }}
        />
        <div style={{ ...PAD, position: 'relative', zIndex: 1, paddingBottom: 120 }}>
          <p style={{ ...mono(), marginBottom: 28 }}>Amazon · Kindle · Sole Designer · 2026</p>
          <h1 style={{ ...H2({ fontSize: 76, marginBottom: 24 }) }}>Contextual Layers</h1>
          <p style={{ fontFamily: 'var(--sans)', fontSize: 22, color: 'rgba(255,255,255,0.5)', lineHeight: 1.5, maxWidth: 580, marginBottom: 56 }}>
            A new model for surfacing knowledge within reading, without disrupting it.
          </p>
          <div style={{ ...DIVIDER, paddingTop: 36, display: 'flex', gap: 64 }}>
            {[
              ['Role', 'Sole Designer\nConcept Originator'],
              ['Platform', 'Kindle iOS, Android, E-ink'],
              ['Scope', 'Concept to Beta'],
              ['Year', '2026'],
            ].map(([l, v]) => (
              <div key={l}>
                <p style={{ ...mono(), marginBottom: 10 }}>{l}</p>
                <p style={{ fontFamily: 'var(--sans)', fontSize: 14, color: 'rgba(255,255,255,0.6)', lineHeight: 1.55, marginBottom: 0, whiteSpace: 'pre-line' }}>{v}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 02 CONTEXT ────────────────────────────────────────────────────────── */}
      <section id="cls-context" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', ...PAD }}>
        <p style={{ ...slideNum, marginBottom: 36 }}>02 / {TOTAL}</p>
        <h2 style={{ ...H2({ fontSize: 52, marginBottom: 48 }) }}>Kindle had the content.<br />Readers weren't using it.</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, marginBottom: 56 }}>
          <div>
            <p style={BODY}>Kindle had spent years building supplemental content. X-Ray, Dictionary, Wikipedia, translations. The investment was real. The engagement wasn't.</p>
            <p style={{ ...BODY, marginTop: 24 }}>A fraction of readers ever touched these features. The content was there. The model made it invisible.</p>
          </div>
          <div>
            <p style={BODY}>Readers were leaving Kindle mid-session to look things up externally. The product had the answers. It just couldn't surface them at the right moment.</p>
            <div style={{ marginTop: 28, padding: '24px 28px', border: '1px solid rgba(255,255,255,0.07)', borderLeft: '2px solid rgba(255,255,255,0.25)', borderRadius: 8 }}>
              <p style={{ fontFamily: 'var(--sans)', fontSize: 15, color: 'rgba(255,255,255,0.5)', lineHeight: 1.75, marginBottom: 0 }}>
                The root cause was structural. Every supplemental feature operated on a pull model. Readers had to know it existed, remember to use it, and navigate to find it.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 03 PROBLEM ────────────────────────────────────────────────────────── */}
      <section id="cls-problem" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', ...PAD }}>
        <p style={{ ...slideNum, marginBottom: 36 }}>03 / {TOTAL}</p>
        <h2 style={{ ...H2({ fontSize: 52, marginBottom: 48 }) }}>A discoverability failure.<br />Not a content gap.</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 1, border: '1px solid rgba(255,255,255,0.07)', borderRadius: 8, overflow: 'hidden', marginBottom: 40 }}>
          {[
            { tag: 'Symptom 01', h: 'Low feature engagement', b: 'X-Ray, Dictionary, Wikipedia used by a fraction of readers, despite being available on every single page.' },
            { tag: 'Symptom 02', h: 'Mid-session abandonment', b: 'Readers leaving Kindle to search Google or ChatGPT. A direct signal that in-product discovery was broken.' },
            { tag: 'Symptom 03', h: 'Inconsistent patterns', b: 'Each feature had its own entry point and interaction model. No unified layer. No coherent system.' },
          ].map(({ tag, h, b }) => (
            <div key={tag} style={{ padding: '32px 28px', background: 'rgba(255,255,255,0.02)' }}>
              <p style={{ ...mono(), marginBottom: 16, color: 'rgba(255,255,255,0.2)' }}>{tag}</p>
              <p style={{ fontFamily: 'var(--sans)', fontSize: 17, fontWeight: 500, color: '#fff', marginBottom: 14, lineHeight: 1.3 }}>{h}</p>
              <p style={{ fontFamily: 'var(--sans)', fontSize: 14, color: 'rgba(255,255,255,0.5)', lineHeight: 1.65, marginBottom: 0 }}>{b}</p>
            </div>
          ))}
        </div>
        <div style={{ padding: '24px 28px', border: '1px solid rgba(255,255,255,0.07)', borderLeft: '2px solid rgba(255,255,255,0.25)', borderRadius: 8, marginBottom: 40 }}>
          <p style={{ fontFamily: 'var(--sans)', fontSize: 16, color: 'rgba(255,255,255,0.6)', lineHeight: 1.75, marginBottom: 0 }}>
            <strong style={{ color: '#fff', fontWeight: 500 }}>How might we</strong> deliver relevant, contextual information within reading in a way that improves comprehension without the reader ever leaving the page?
          </p>
        </div>
        <img
          src="/images/hotspots/before_after.png"
          alt="Reader exits Kindle to search externally vs staying in the reading surface"
          style={{ width: '100%', borderRadius: 8, border: '1px solid rgba(255,255,255,0.06)', display: 'block', marginTop: 8 }}
        />
      </section>

      {/* ── 04 ORIGIN ─────────────────────────────────────────────────────────── */}
      <section id="cls-origin" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', ...PAD }}>
        <p style={{ ...slideNum, marginBottom: 36 }}>04 / {TOTAL}</p>
        <h2 style={{ ...H2({ fontSize: 52, marginBottom: 24 }) }}>I created this project.<br />It wasn't assigned to me.</h2>
        <p style={{ ...BODY, maxWidth: 680, marginBottom: 56 }}>
          Leadership needed a three-year product vision and had no framework for getting there. I designed and ran a cross-functional workshop that reanchored the conversation from what should we build to where are readers failing today. The opportunity I surfaced became the funded project.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 1, border: '1px solid rgba(255,255,255,0.07)', borderRadius: 8, overflow: 'hidden', marginBottom: 56 }}>
          {[
            { l: 'Situation', v: 'No brief. No defined scope. Leadership needed direction and had none.' },
            { l: 'What I built', v: 'Designed and ran the workshop. Identified the opportunity. Developed the concept independently and pushed it forward after the session ended.' },
            { l: 'Outcome', v: 'The direction I originated was funded. Two years later, when AI made it viable, the foundation was already waiting.' },
          ].map(({ l, v }) => (
            <div key={l} style={{ padding: '32px 28px', background: 'rgba(255,255,255,0.02)' }}>
              <p style={{ ...mono(), marginBottom: 16 }}>{l}</p>
              <p style={{ fontFamily: 'var(--sans)', fontSize: 15, color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, marginBottom: 0 }}>{v}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 05 INSIGHT ────────────────────────────────────────────────────────── */}
      <section id="cls-insight" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', ...PAD }}>
        <p style={{ ...slideNum, marginBottom: 36 }}>05 / {TOTAL}</p>
        <h2 style={{ ...H2({ fontSize: 52, marginBottom: 48 }) }}>The text itself can<br />be the interface.</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, marginBottom: 56 }}>
          <div>
            <p style={BODY}>Every direction explored placed supplemental content adjacent to reading. A panel. A menu. A drawer. All of them asked the reader to leave the text to get more of it.</p>
            <p style={{ ...BODY, marginTop: 24 }}>The reframe: stop adding surfaces. Let the content layer live inside the reading surface. Readers never leave the page. The text becomes the entry point.</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ padding: '24px 28px', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 8 }}>
              <p style={{ ...mono(), marginBottom: 12, color: 'rgba(255,255,255,0.2)' }}>Old model</p>
              <p style={{ fontFamily: 'var(--sans)', fontSize: 14, color: 'rgba(255,255,255,0.45)', lineHeight: 1.7, marginBottom: 0 }}>
                Reader encounters something unknown. Stops. Navigates to a feature. Reads supplemental content. Loses their place. Tries to return.
              </p>
            </div>
            <div style={{ padding: '24px 28px', border: '1px solid rgba(134,239,172,0.18)', borderRadius: 8, background: 'rgba(134,239,172,0.03)' }}>
              <p style={{ ...mono(), marginBottom: 12, color: 'rgba(134,239,172,0.55)' }}>New model</p>
              <p style={{ fontFamily: 'var(--sans)', fontSize: 14, color: 'rgba(255,255,255,0.65)', lineHeight: 1.7, marginBottom: 0 }}>
                Reader encounters an entity. Taps it inline. Reads the card over the page. Dismisses it. Continues reading. No navigation. No context loss.
              </p>
            </div>
          </div>
        </div>
        <img
          src="/images/hotspots/before_after.png"
          alt="Before and after: reader leaving Kindle vs staying in reading surface"
          style={{ width: '100%', borderRadius: 8, border: '1px solid rgba(255,255,255,0.06)', display: 'block' }}
        />
      </section>

      {/* ── 06 STRATEGY ───────────────────────────────────────────────────────── */}
      <section id="cls-strategy" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', ...PAD }}>
        <p style={{ ...slideNum, marginBottom: 36 }}>06 / {TOTAL}</p>
        <h2 style={{ ...H2({ fontSize: 52, marginBottom: 48 }) }}>Replace the model.<br />Not the features.</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64 }}>
          <div>
            <p style={BODY}>The obvious path was to improve specific features. A better X-Ray. A smarter dictionary. I rejected that direction early.</p>
            <p style={{ ...BODY, marginTop: 24 }}>Improving individual features would have produced incremental gains on a structurally broken model. The goal shifted: build a unified delivery layer that surfaces contextual content without the reader needing to look for it.</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {[
              { tag: 'Unified delivery layer', b: 'One interaction model for all supplemental content types. Characters, places, terms, annotations. Learnable once, extensible indefinitely.' },
              { tag: 'Push over pull', b: 'Surface content based on what the reader is reading right now, not where they navigate. Remove the discovery cost entirely.' },
              { tag: 'Reading-first constraint', b: 'Any design that breaks reading continuity fails regardless of content quality. The reading experience is the primary product. Everything else is secondary.' },
            ].map(({ tag, b }) => (
              <div key={tag} style={{ padding: '22px 0', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                <p style={{ ...mono(), marginBottom: 10, color: 'rgba(255,255,255,0.35)' }}>{tag}</p>
                <p style={{ fontFamily: 'var(--sans)', fontSize: 15, color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, marginBottom: 0 }}>{b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 07 EXPLORATION ────────────────────────────────────────────────────── */}
      <section id="cls-exploration" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', ...PAD }}>
        <p style={{ ...slideNum, marginBottom: 36 }}>07 / {TOTAL}</p>
        <h2 style={{ ...H2({ fontSize: 52, marginBottom: 24 }) }}>Six directions.<br />One constraint eliminated five.</h2>
        <p style={{ ...BODY, maxWidth: 680, marginBottom: 48 }}>Any solution that removes the reader from the reading surface fails. No help text. No learning curve. No competing surface. That single constraint ended most directions before prototyping began.</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1, border: '1px solid rgba(255,255,255,0.07)', borderRadius: 8, overflow: 'hidden', marginBottom: 40 }}>
          {[
            { name: 'Menu Toggle', verdict: false, reason: 'All-or-nothing. Interrupts reading to manage a tool.' },
            { name: 'Persistent Carousel', verdict: false, reason: 'Visual clutter. A content strip competing with content.' },
            { name: 'Section Indicators', verdict: false, reason: 'Too subtle. Required onboarding to be discoverable at all.' },
            { name: 'Anchored Side Panel', verdict: false, reason: 'Splits reading into two surfaces. That already fails.' },
            { name: 'Bottom Peek Drawer', verdict: false, reason: 'Hidden by default. Same failure as the pull model we were replacing.' },
            { name: 'Layered Inline Model', verdict: true, reason: 'Minimal disruption. Contextual by nature. No help text needed. Scalable as a framework.' },
          ].map(({ name, verdict, reason }) => (
            <div key={name} style={{ padding: '26px 24px', background: verdict ? 'rgba(134,239,172,0.035)' : 'rgba(255,255,255,0.02)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10, gap: 8 }}>
                <p style={{ fontFamily: 'var(--sans)', fontSize: 14, fontWeight: 500, color: verdict ? 'rgba(134,239,172,0.85)' : 'rgba(255,255,255,0.65)', marginBottom: 0, lineHeight: 1.3 }}>{name}</p>
                <span style={{ fontFamily: 'var(--mono)', fontSize: 7, letterSpacing: '0.1em', textTransform: 'uppercase', color: verdict ? 'rgba(134,239,172,0.65)' : 'rgba(255,255,255,0.2)', flexShrink: 0 }}>
                  {verdict ? 'Selected' : 'Rejected'}
                </span>
              </div>
              <p style={{ fontFamily: 'var(--sans)', fontSize: 13, color: 'rgba(255,255,255,0.4)', lineHeight: 1.6, marginBottom: 0 }}>{reason}</p>
            </div>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          <div>
            <p style={{ ...mono(), marginBottom: 10, color: 'rgba(255,255,255,0.2)' }}>Rejected direction</p>
            <img src="/images/hotspots/iterations/anchored-side-panel.jpg" alt="Rejected: anchored side panel" style={{ width: '100%', borderRadius: 6, border: '1px solid rgba(255,255,255,0.06)', display: 'block', opacity: 0.45 }} />
          </div>
          <div>
            <p style={{ ...mono(), marginBottom: 10, color: 'rgba(134,239,172,0.55)' }}>Selected direction</p>
            <img src="/images/hotspots/iterations/layered-inline.jpg" alt="Selected: layered inline" style={{ width: '100%', borderRadius: 6, border: '1px solid rgba(134,239,172,0.2)', display: 'block' }} />
          </div>
        </div>
      </section>

      {/* ── 08 SOLUTION ───────────────────────────────────────────────────────── */}
      <section id="cls-solution" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', ...PAD }}>
        <p style={{ ...slideNum, marginBottom: 36 }}>08 / {TOTAL}</p>
        <h2 style={{ ...H2({ fontSize: 52, marginBottom: 24 }) }}>The layered reading model.</h2>
        <p style={{ ...BODY, maxWidth: 680, marginBottom: 48 }}>Three components: inline markers in the text, a toggle that keeps the reader in control, and a bottom sheet that surfaces content without removing the reading surface. Together they define a scalable pattern, not just a single feature.</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1, border: '1px solid rgba(255,255,255,0.07)', borderRadius: 8, overflow: 'hidden', marginBottom: 48 }}>
          {[
            ['01 Toggle on', 'Reader activates Contextual Layers. Inline markers appear on 2 to 4 entities per screen.'],
            ['02 Tap a hotspot', 'Reader taps a marked entity. A bottom sheet rises. The text above stays visible and in position.'],
            ['03 Read the card', 'Card shows entity summary, type, and context. Related entities are available within the card.'],
            ['04 Return to page', 'Reader dismisses. Reading surface restores exactly. No scroll reset. No context loss. Reading continues.'],
          ].map(([h, d]) => (
            <div key={h} style={{ padding: '28px 22px', background: 'rgba(255,255,255,0.02)' }}>
              <p style={{ ...mono(), marginBottom: 14 }}>{h}</p>
              <p style={{ fontFamily: 'var(--sans)', fontSize: 14, color: 'rgba(255,255,255,0.55)', lineHeight: 1.65, marginBottom: 0 }}>{d}</p>
            </div>
          ))}
        </div>
        <img
          src="/images/hotspots/hotspot-hero.jpg"
          alt="Contextual Layers: inline markers in reading surface with bottom sheet entity card"
          style={{ width: '100%', borderRadius: 8, border: '1px solid rgba(255,255,255,0.06)', display: 'block' }}
        />
      </section>

      {/* ── 09 DECISIONS ──────────────────────────────────────────────────────── */}
      <section id="cls-decisions" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', ...PAD }}>
        <p style={{ ...slideNum, marginBottom: 36 }}>09 / {TOTAL}</p>
        <h2 style={{ ...H2({ fontSize: 52, marginBottom: 48 }) }}>Four calls that shaped the product.</h2>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {[
            { n: '01', h: 'Opt-in by default', p: 'Push-by-default would have inflated early numbers and generated trust complaints that could have killed the feature before it proved its value. Opt-in gave us clean signal and built trust the right way.' },
            { n: '02', h: 'Bottom sheet over overlay', p: 'A floating overlay anchored near the entity would have obscured the text the reader just tapped. The bottom sheet keeps the full reading surface visible. The reader stays in context while the card is open.' },
            { n: '03', h: 'Relevance over coverage', p: 'Early prototypes marked every recognizable entity. The page looked annotated, not layered. The placement engine was redesigned to surface 2 to 4 hotspots per page, those most likely to benefit comprehension.' },
            { n: '04', h: 'Reader-controlled density', p: 'Long press any hotspot to suppress that entity type across the whole book. The product earns its place session by session. That extends the trust model beyond the initial opt-in.' },
          ].map(({ n, h, p }) => (
            <div key={n} style={{ display: 'grid', gridTemplateColumns: '48px 220px 1fr', gap: '0 40px', padding: '28px 0', borderTop: '1px solid rgba(255,255,255,0.06)', alignItems: 'start' }}>
              <p style={{ fontFamily: 'var(--mono)', fontSize: 13, color: 'rgba(255,255,255,0.14)', marginBottom: 0, paddingTop: 3 }}>{n}</p>
              <p style={{ fontFamily: 'var(--sans)', fontSize: 17, fontWeight: 500, color: '#fff', marginBottom: 0, lineHeight: 1.35 }}>{h}</p>
              <p style={{ fontFamily: 'var(--sans)', fontSize: 15, color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, marginBottom: 0 }}>{p}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 10 TRADEOFFS ──────────────────────────────────────────────────────── */}
      <section id="cls-tradeoffs" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', ...PAD }}>
        <p style={{ ...slideNum, marginBottom: 36 }}>10 / {TOTAL}</p>
        <h2 style={{ ...H2({ fontSize: 52, marginBottom: 48 }) }}>What we chose not to do.</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64 }}>
          <div>
            <p style={{ ...mono(), marginBottom: 20, color: 'rgba(255,255,255,0.35)' }}>Tradeoff 01</p>
            <p style={{ fontFamily: 'var(--sans)', fontSize: 20, fontWeight: 500, color: '#fff', marginBottom: 20, lineHeight: 1.3 }}>Lower initial activation was the right call</p>
            <p style={BODY}>The opt-in model meant fewer people would turn the feature on in the first week. A push-by-default approach would have inflated early engagement numbers and generated complaints that would have killed it before it could prove its value.</p>
            <p style={{ ...BODY, marginTop: 20 }}>Lower initial numbers were the correct tradeoff for long-term trust.</p>
          </div>
          <div>
            <p style={{ ...mono(), marginBottom: 20, color: 'rgba(255,255,255,0.35)' }}>Tradeoff 02</p>
            <p style={{ fontFamily: 'var(--sans)', fontSize: 20, fontWeight: 500, color: '#fff', marginBottom: 20, lineHeight: 1.3 }}>No AI-generated content in phase one</p>
            <p style={BODY}>The model was designed to ingest AI-generated content from day one. That was the architectural bet. But validating delivery behavior before introducing content quality variables was the disciplined path.</p>
            <div style={{ marginTop: 28, padding: '22px 24px', border: '1px solid rgba(255,255,255,0.07)', borderLeft: '2px solid rgba(255,255,255,0.2)', borderRadius: 8 }}>
              <p style={{ fontFamily: 'var(--sans)', fontSize: 15, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, marginBottom: 0 }}>Phase 1 proved the interaction. Phase 2 proved the content. The sequencing was intentional.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 11 SYSTEM IMPACT ──────────────────────────────────────────────────── */}
      <section id="cls-system" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', ...PAD }}>
        <p style={{ ...slideNum, marginBottom: 36 }}>11 / {TOTAL}</p>
        <h2 style={{ ...H2({ fontSize: 52, marginBottom: 24 }) }}>I built the platform.<br />The features came with it.</h2>
        <p style={{ ...BODY, maxWidth: 680, marginBottom: 48 }}>The placement engine, rendering layer, and tracking infrastructure I built are reusable across all content types. New content doesn't require a new interaction pattern. It inherits the framework. Engineering cost per new content type dropped significantly.</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, border: '1px solid rgba(255,255,255,0.07)', borderRadius: 8, overflow: 'hidden', marginBottom: 56 }}>
          {[
            { tag: 'Scalability', b: 'Placement, rendering, and engagement tracking shared across all supplemental content types. One implementation. Reused across every content expansion.' },
            { tag: 'Unified interaction', b: 'Characters, places, terms, author annotations. All accessible through one learnable gesture. One tap. One card. One dismiss.' },
            { tag: 'AI integration path', b: 'The framework was designed to ingest AI-generated content from day one. Contextual Layers set the delivery surface. AI enriches the payload over time.' },
            { tag: 'Feature to system shift', b: 'The team\'s question shifted from which feature to does this extend the framework. That\'s the difference between a product and a platform.' },
          ].map(({ tag, b }) => (
            <div key={tag} style={{ padding: '32px 28px', background: 'rgba(255,255,255,0.02)' }}>
              <p style={{ ...mono(), marginBottom: 14, color: 'rgba(255,255,255,0.3)' }}>{tag}</p>
              <p style={{ fontFamily: 'var(--sans)', fontSize: 15, color: 'rgba(255,255,255,0.58)', lineHeight: 1.65, marginBottom: 0 }}>{b}</p>
            </div>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginTop: 0 }}>
          {[
            { src: '/images/hotspots/iterations/menu-toggle.jpg', label: 'Menu Toggle' },
            { src: '/images/hotspots/iterations/persistent-carousel.jpg', label: 'Persistent Carousel' },
            { src: '/images/hotspots/iterations/section-level-indicators.jpg', label: 'Section Indicators' },
            { src: '/images/hotspots/iterations/anchored-side-panel.jpg', label: 'Anchored Side Panel' },
            { src: '/images/hotspots/iterations/bottom-peek-surface.jpg', label: 'Bottom Peek' },
            { src: '/images/hotspots/iterations/layered-inline.jpg', label: 'Layered Inline ✓' },
          ].map(({ src, label }) => (
            <div key={label} style={{ position: 'relative' }}>
              <img src={src} alt={label} style={{ width: '100%', borderRadius: 6, border: '1px solid rgba(255,255,255,0.06)', display: 'block', opacity: label.includes('✓') ? 1 : 0.35 }} />
              <p style={{ fontFamily: 'var(--mono)', fontSize: 8, letterSpacing: '0.12em', textTransform: 'uppercase', color: label.includes('✓') ? 'rgba(134,239,172,0.6)' : 'rgba(255,255,255,0.18)', marginTop: 8, marginBottom: 0 }}>{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 12 METRICS ────────────────────────────────────────────────────────── */}
      <section id="cls-metrics" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', ...PAD }}>
        <p style={{ ...slideNum, marginBottom: 36 }}>12 / {TOTAL}</p>
        <h2 style={{ ...H2({ fontSize: 52, marginBottom: 24 }) }}>Success was defined<br />before anything was built.</h2>
        <p style={{ ...BODY, maxWidth: 680, marginBottom: 48 }}>The experiment was built around one question: does push-based delivery improve engagement without degrading the reading experience? That guardrail shaped every metric we tracked.</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 1, border: '1px solid rgba(255,255,255,0.07)', borderRadius: 8, overflow: 'hidden' }}>
          {[
            { label: 'Behavioral', items: ['Discovery rate: did readers find hotspots?', 'Sustained engagement: repeat interactions per session', 'Return rate across sessions', 'Opt-out rate as a trust signal', 'Time spent on content cards'] },
            { label: 'Content quality', items: ['Entity recognition precision and recall', 'Summary faithfulness', 'Comprehensiveness score', 'Spoiler avoidance rate', 'Coverage across the book catalog'] },
            { label: 'Guardrails', items: ['Reading session duration: must not decrease', 'Pages per session: core reading health', 'Book completion rate: long-term retention signal'] },
          ].map(({ label, items }) => (
            <div key={label} style={{ padding: '28px 24px', background: 'rgba(255,255,255,0.02)' }}>
              <p style={{ ...mono(), marginBottom: 20 }}>{label}</p>
              {items.map((item) => (
                <p key={item} style={{ fontFamily: 'var(--sans)', fontSize: 13, color: 'rgba(255,255,255,0.5)', lineHeight: 1.6, paddingTop: 10, borderTop: '1px solid rgba(255,255,255,0.05)', marginBottom: 0 }}>{item}</p>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* ── 13 OUTCOME ────────────────────────────────────────────────────────── */}
      <section id="cls-outcome" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', ...PAD }}>
        <p style={{ ...slideNum, marginBottom: 36 }}>13 / {TOTAL}</p>
        <h2 style={{ ...H2({ fontSize: 52, marginBottom: 48 }) }}>Engagement up.<br />Reading duration held.</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64 }}>
          <div>
            <p style={BODY}>The experiment validated that push-based content delivery improves engagement without degrading reading. The interaction model proved learnable. The content surface proved trustworthy. The guardrails held.</p>
            <p style={{ ...BODY, marginTop: 24 }}>More durably: it shifted how the team builds on Kindle. Features that previously lived outside the reading experience now have a clear path inside it. The framework created an integration surface that subsequent teams inherited rather than rebuilt.</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {[
              ['Experiment type', 'Multi-tranche beta with holdout design'],
              ['Success signal', 'Engagement up, reading duration stable'],
              ['Product outcome', 'MLP shipped, framework adopted by subsequent feature teams'],
              ['Design role', 'Concept to beta, sole designer'],
            ].map(([l, v]) => (
              <div key={l} style={{ padding: '20px 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                <p style={{ ...mono(), marginBottom: 8, color: 'rgba(255,255,255,0.25)' }}>{l}</p>
                <p style={{ fontFamily: 'var(--sans)', fontSize: 15, color: 'rgba(255,255,255,0.68)', lineHeight: 1.5, marginBottom: 0 }}>{v}</p>
              </div>
            ))}
          </div>
        </div>
        <div style={{ marginTop: 56 }}>
          <p style={{ ...mono(), marginBottom: 20, color: 'rgba(255,255,255,0.25)' }}>Interactive prototype · Click to explore</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 40, alignItems: 'flex-start' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
              <div style={{ border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, overflow: 'hidden', background: '#111' }}>
                <iframe
                  src="https://adjust-fleck-61194520.figma.site"
                  style={{ width: 390, height: 700, border: 'none', display: 'block' }}
                  allowFullScreen
                  title="Contextual Layers Interactive Prototype"
                />
              </div>
              <p style={{ fontFamily: 'var(--mono)', fontSize: 8, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.15)', marginBottom: 0 }}>
                Rebuilt in Figma Make · Represents final interaction model
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 14 REFLECTION ─────────────────────────────────────────────────────── */}
      <section id="cls-reflection" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', ...PAD }}>
        <p style={{ ...slideNum, marginBottom: 36 }}>14 / {TOTAL}</p>
        <h2 style={{ ...H2({ fontSize: 52, marginBottom: 48 }) }}>The same problem<br />exists in healthcare.</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 1, border: '1px solid rgba(255,255,255,0.07)', borderRadius: 8, overflow: 'hidden', marginBottom: 56 }}>
          {[
            { tag: 'Push vs pull', b: 'Patients shouldn\'t have to hunt through a portal to find relevant information about their care. The right context, surfaced at the right moment, is the same design problem. The stakes are just higher.' },
            { tag: 'Trust is earned per session', b: 'The opt-in model worked because it gave users control before asking for engagement. That principle matters even more in mental health, where the product relationship is personal and the cost of losing trust is high.' },
            { tag: 'Pattern before feature', b: 'Talkiatry is defining AI interaction patterns that don\'t have precedents yet. That\'s exactly what this project was. The skill is in building the framework before building the thing on top of it.' },
          ].map(({ tag, b }) => (
            <div key={tag} style={{ padding: '36px 28px', background: 'rgba(255,255,255,0.02)' }}>
              <p style={{ ...mono(), marginBottom: 16 }}>{tag}</p>
              <p style={{ fontFamily: 'var(--sans)', fontSize: 15, color: 'rgba(255,255,255,0.62)', lineHeight: 1.75, marginBottom: 0 }}>{b}</p>
            </div>
          ))}
        </div>
        <p style={{ fontFamily: 'var(--sans)', fontSize: 17, color: 'rgba(255,255,255,0.38)', lineHeight: 1.7, maxWidth: 740 }}>
          I didn't come from healthcare. But I know how to design information delivery systems that earn trust, define patterns where none exist yet, and build frameworks that scale past the first feature.
        </p>
      </section>

      {/* ── 15 CLOSE ──────────────────────────────────────────────────────────── */}
      <section id="cls-close" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', ...PAD }}>
        <p style={{ ...slideNum, marginBottom: 48 }}>15 / {TOTAL}</p>
        <h2 style={{ ...H2({ fontSize: 72, marginBottom: 56 }) }}>Questions?</h2>
        <div style={{ ...DIVIDER, paddingTop: 40, display: 'flex', gap: 72 }}>
          {[
            ['Designer', 'Sivan Baum'],
            ['Case study', 'Contextual Layers · Amazon Kindle'],
            ['Portfolio', 'sivan.design'],
          ].map(([l, v]) => (
            <div key={l}>
              <p style={{ ...mono(), marginBottom: 10 }}>{l}</p>
              <p style={{ fontFamily: 'var(--sans)', fontSize: 16, color: 'rgba(255,255,255,0.58)', marginBottom: 0 }}>{v}</p>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 56, display: 'flex', gap: 14 }}>
          <button
            onClick={() => navigate('/projects/contextual-layers')}
            style={{ fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', background: 'none', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 6, padding: '12px 20px', cursor: 'pointer' }}
          >
            Case Study View
          </button>
          <button
            onClick={() => goTo(0)}
            style={{ fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', background: 'none', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 6, padding: '12px 20px', cursor: 'pointer' }}
          >
            Back to Start
          </button>
        </div>
      </section>

    </div>
  )
}
