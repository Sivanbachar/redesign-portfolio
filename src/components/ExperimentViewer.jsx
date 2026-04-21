import { useState, useCallback, useEffect } from 'react'

// ─── ASSETS ─────────────────────────────────────────────────────────────────
const SCREEN_IMAGE = '/images/rokt/variants/screen.jpg'

// Position of the ad slot as % of the screen container dimensions.
// Derived from the grey box in screen.jpg (original 5760×4096px).
const SLOT = {
  top:   22.36,  // % from top
  left:   7.36,  // % from left
  width: 80.85,  // % of container width
}

// ─── VARIANT DATA ────────────────────────────────────────────────────────────
// Update title / hypothesis / result as needed.
const variants = [
  {
    id: 'v1',
    image: '/images/rokt/variants/variant1.jpg',
    tag: 'Content Clarity',
    title: 'Compact single-line layout',
    hypothesis: 'Minimal copy with a single clear CTA reduces friction and improves scan time',
    result: 'Baseline',
  },
  {
    id: 'v2',
    image: '/images/rokt/variants/variant2.jpg',
    tag: 'Content Clarity',
    title: 'Expanded copy, inline CTA',
    hypothesis: 'Adding a second line of supporting copy increases perceived value before the CTA',
    result: 'Incremental lift',
  },
  {
    id: 'v3',
    image: '/images/rokt/variants/variant3.jpg',
    tag: 'Visual Context',
    title: 'Card image left, structured copy',
    hypothesis: 'Contextual product imagery reinforces offer relevance at a glance',
    result: '+25% conversion per impression',
  },
  {
    id: 'v4',
    image: '/images/rokt/variants/variant4.jpg',
    tag: 'Visual Context',
    title: 'Larger card image, expanded layout',
    hypothesis: 'Increasing image prominence drives stronger visual association with the offer',
    result: '+25% conversion per impression',
  },
  {
    id: 'v5',
    image: '/images/rokt/variants/variant5.jpg',
    tag: 'Content Clarity',
    title: 'Condensed banner, text-forward',
    hypothesis: 'Text-first layout with muted visual hierarchy focuses attention on the offer value',
    result: 'Incremental lift',
  },
  {
    id: 'v6',
    image: '/images/rokt/variants/variant6.jpg',
    tag: 'Content Clarity',
    title: 'Structured benefit layout',
    hypothesis: 'Breaking copy into a benefit list improves clarity scores in transactional flows',
    result: 'Incremental lift',
  },
  {
    id: 'v7',
    image: '/images/rokt/variants/variant7.jpg',
    tag: 'Visual Trust',
    title: 'Restrained palette, site-mirrored UI',
    hypothesis: "Matching the host site's visual language extends brand trust to ad content",
    result: 'Increased content engagement',
  },
  {
    id: 'v8',
    image: '/images/rokt/variants/variant8.jpg',
    tag: 'Visual Trust',
    title: 'Native UI treatment, expanded',
    hypothesis: 'Deeper visual alignment with the host page reduces ad recognition and avoidance',
    result: 'Increased content engagement',
  },
  {
    id: 'v9',
    image: '/images/rokt/variants/variant9.jpg',
    tag: 'Visual Context',
    title: 'Multi-card stacked imagery',
    hypothesis: 'Showing a product family rather than a single card signals greater offer scope',
    result: '+25% conversion per impression',
  },
  {
    id: 'v10',
    image: '/images/rokt/variants/variant10.jpg',
    tag: 'Interaction Control',
    title: 'Navigation-enabled layout',
    hypothesis: 'Allowing users to move between offers shifts the experience from passive to active',
    result: '+30% conversion per impression',
  },
  {
    id: 'v11',
    image: '/images/rokt/variants/variant11.jpg',
    tag: 'Interaction Control',
    title: 'Multi-offer explorer, expanded view',
    hypothesis: 'Wider offer exploration reduces early dismissal and increases time with content',
    result: '+30% conversion per impression',
  },
]

// ─── TAG ACCENT COLORS ───────────────────────────────────────────────────────
const TAG_COLORS = {
  'Content Clarity':    'rgba(180,160,255,0.15)',
  'Visual Context':     'rgba(100,180,255,0.15)',
  'Visual Trust':       'rgba(100,220,160,0.15)',
  'Interaction Control':'rgba(255,180,100,0.15)',
}
const TAG_TEXT = {
  'Content Clarity':    'rgba(180,160,255,0.75)',
  'Visual Context':     'rgba(100,180,255,0.75)',
  'Visual Trust':       'rgba(100,220,160,0.75)',
  'Interaction Control':'rgba(255,180,100,0.75)',
}

// ─── COMPONENT ───────────────────────────────────────────────────────────────
export default function ExperimentViewer() {
  const [index, setIndex]   = useState(0)
  const [fading, setFading] = useState(false)
  const total   = variants.length
  const current = variants[index]

  const goTo = useCallback((next) => {
    if (next === index) return
    setFading(true)
    setTimeout(() => { setIndex(next); setFading(false) }, 200)
  }, [index])

  const prev = () => goTo((index - 1 + total) % total)
  const next = () => goTo((index + 1) % total)

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowLeft')  prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [index])

  return (
    <div style={{ width: '100%', fontFamily: 'var(--sans)' }}>

      {/* ── HEADER ROW ──────────────────────────────────────────────────── */}
      <div style={{
        display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', marginBottom: 12,
      }}>
        <span style={{
          fontFamily: 'var(--mono)', fontSize: 9,
          letterSpacing: '0.18em', textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.3)',
        }}>Interactive — Ad Placement Variants</span>
        <span style={{
          fontFamily: 'var(--mono)', fontSize: 9,
          letterSpacing: '0.14em', textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.22)',
          display: 'flex', alignItems: 'center', gap: 6,
        }}>
          <span style={{ fontSize: 13, letterSpacing: 0 }}>←→</span> use arrows or keyboard to explore
        </span>
      </div>

      {/* ── SCREEN MOCK ─────────────────────────────────────────────────── */}
      <div style={{
        position: 'relative',
        width: '100%',
        background: '#111',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 8,
        overflow: 'hidden',
      }}>
        {/* Browser chrome */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 6,
          padding: '9px 14px',
          background: '#161616',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}>
          {['rgba(255,255,255,0.14)', 'rgba(255,255,255,0.08)', 'rgba(255,255,255,0.05)'].map((c, i) => (
            <div key={i} style={{ width: 8, height: 8, borderRadius: '50%', background: c }} />
          ))}
          <div style={{
            flex: 1, height: 18, borderRadius: 3,
            background: 'rgba(255,255,255,0.04)',
            marginLeft: 8, maxWidth: 280,
          }} />
        </div>

        {/* Screen image + slot overlay */}
        <div style={{ position: 'relative', width: '100%' }}>
          <img
            src={SCREEN_IMAGE}
            alt="Checkout page context"
            style={{ width: '100%', display: 'block' }}
            draggable={false}
          />

          {/* Scrim — softens screen content behind the ad slot */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(0,0,0,0.22)',
            zIndex: 1,
            pointerEvents: 'none',
          }} />

          {/* Ad slot — overlaid exactly on the grey box, floats above scrim */}
          <div style={{
            position: 'absolute',
            top:   `${SLOT.top}%`,
            left:  `${SLOT.left}%`,
            width: `${SLOT.width}%`,
            zIndex: 2,
            transition: 'opacity 0.2s ease',
            opacity: fading ? 0 : 1,
            boxShadow: '0 16px 48px rgba(0,0,0,0.75), 0 4px 16px rgba(0,0,0,0.5)',
            borderRadius: 4,
            overflow: 'hidden',
          }}>
            <img
              key={current.id}
              src={current.image}
              alt={current.title}
              style={{ width: '100%', height: 'auto', display: 'block' }}
              draggable={false}
            />
          </div>
        </div>
      </div>

      {/* ── CONTROLS + COUNTER ──────────────────────────────────────────── */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px 0',
        borderTop: '1px solid rgba(255,255,255,0.07)',
        marginTop: 1,
      }}>
        {/* Counter */}
        <span style={{
          fontFamily: 'var(--mono)',
          fontSize: 10,
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.3)',
        }}>
          {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </span>

        {/* Dots */}
        <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
          {variants.map((v, i) => (
            <button
              key={v.id}
              onClick={() => goTo(i)}
              aria-label={v.title}
              style={{
                width: i === index ? 20 : 6,
                height: 6,
                borderRadius: 3,
                background: i === index ? 'rgba(255,255,255,0.65)' : 'rgba(255,255,255,0.12)',
                transition: 'width 0.22s ease, background 0.22s ease',
                border: 'none',
                padding: 0,
                cursor: 'pointer',
                flexShrink: 0,
              }}
            />
          ))}
        </div>

        {/* Arrows */}
        <div style={{ display: 'flex', gap: 6 }}>
          {[['←', prev, 'Previous'], ['→', next, 'Next']].map(([label, fn, ariaLabel]) => (
            <button
              key={label}
              onClick={fn}
              aria-label={`${ariaLabel} variant`}
              style={{
                width: 32, height: 32,
                borderRadius: 4,
                border: '1px solid rgba(255,255,255,0.1)',
                background: 'rgba(255,255,255,0.03)',
                color: 'rgba(255,255,255,0.65)',
                fontSize: 13,
                cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'background 0.15s',
              }}
            >{label}</button>
          ))}
        </div>
      </div>

      {/* ── VARIANT METADATA ────────────────────────────────────────────── */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr auto',
        gap: '12px 24px',
        alignItems: 'start',
        padding: '16px 0 0',
        opacity: fading ? 0 : 1,
        transition: 'opacity 0.2s ease',
      }}>
        <div>
          {/* Tag */}
          <span style={{
            display: 'inline-block',
            fontFamily: 'var(--mono)',
            fontSize: 9,
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: TAG_TEXT[current.tag],
            background: TAG_COLORS[current.tag],
            borderRadius: 3,
            padding: '3px 8px',
            marginBottom: 10,
          }}>{current.tag}</span>

          {/* Title */}
          <p style={{
            fontFamily: 'var(--sans)',
            fontWeight: 500,
            fontSize: 14,
            color: 'rgba(255,255,255,0.85)',
            letterSpacing: '-0.01em',
            marginBottom: 6,
            lineHeight: 1.35,
          }}>{current.title}</p>

          {/* Hypothesis */}
          <p style={{
            fontSize: 13,
            color: 'rgba(255,255,255,0.45)',
            lineHeight: 1.6,
          }}>{current.hypothesis}</p>
        </div>

        {/* Result pill */}
        <div style={{
          fontFamily: 'var(--mono)',
          fontSize: 10,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.5)',
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 3,
          padding: '8px 12px',
          whiteSpace: 'nowrap',
          lineHeight: 1.5,
          textAlign: 'right',
          marginTop: 2,
        }}>{current.result}</div>
      </div>

    </div>
  )
}
