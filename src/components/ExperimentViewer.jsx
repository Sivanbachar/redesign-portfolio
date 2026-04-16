import { useState, useCallback } from 'react'

// ─── CONFIGURATION ──────────────────────────────────────────────────────────
// When you have real assets, update the paths below and adjust slotPosition
// to match where the ad placement sits inside your screen image.
//
// slotPosition values are percentages of the screen container's dimensions:
//   top / left / width / height  (e.g. top: 38 means 38% from the top)

const SCREEN_IMAGE = null // e.g. '/images/rokt/screen_bg.png'

const SLOT_POSITION = {
  top:    38,   // % from top of screen container
  left:   62,   // % from left
  width:  34,   // % of screen container width
  height: 48,   // % of screen container height
}

const variants = [
  {
    id:         'variant-a',
    label:      '01',
    title:      'Visual Context',
    hypothesis: 'Added contextual imagery to reinforce offer value',
    result:     '+25% conversion per impression',
    image:      null, // '/images/rokt/variant-a.png'
    accent:     'rgba(255,255,255,0.06)',
  },
  {
    id:         'variant-b',
    label:      '02',
    title:      'Content Clarity',
    hypothesis: 'Replaced dense copy with structured benefit lists',
    result:     'Incremental lift + improved clarity scores',
    image:      null, // '/images/rokt/variant-b.png'
    accent:     'rgba(255,255,255,0.04)',
  },
  {
    id:         'variant-c',
    label:      '03',
    title:      'Interaction Control',
    hypothesis: 'Navigation between offers to support active exploration',
    result:     '+30% conversion per impression',
    image:      null, // '/images/rokt/variant-c.png'
    accent:     'rgba(255,255,255,0.06)',
  },
  {
    id:         'variant-d',
    label:      '04',
    title:      'Visual Trust',
    hypothesis: 'UI mirrored host site visual language to extend brand trust',
    result:     'Increased ad content engagement',
    image:      null, // '/images/rokt/variant-d.png'
    accent:     'rgba(255,255,255,0.04)',
  },
]

// ─── STYLES ─────────────────────────────────────────────────────────────────

const S = {
  wrap: {
    width: '100%',
    fontFamily: "var(--sans, -apple-system, sans-serif)",
  },

  // Screen mock
  screenWrap: {
    position: 'relative',
    width: '100%',
    background: '#0e0e0e',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: 8,
    overflow: 'hidden',
  },
  chromebar: {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    padding: '10px 14px',
    borderBottom: '1px solid rgba(255,255,255,0.06)',
    background: '#111',
  },
  dot: (color) => ({
    width: 8, height: 8, borderRadius: '50%', background: color, flexShrink: 0,
  }),
  urlbar: {
    flex: 1,
    height: 20,
    borderRadius: 4,
    background: 'rgba(255,255,255,0.04)',
    marginLeft: 8,
    maxWidth: 320,
  },

  // Screen content area
  screenContent: {
    position: 'relative',
    width: '100%',
    aspectRatio: '16/9',
    overflow: 'hidden',
  },
  screenBg: (image) => ({
    position: 'absolute',
    inset: 0,
    backgroundImage: image ? `url(${image})` : undefined,
    backgroundSize: 'cover',
    backgroundPosition: 'center top',
  }),

  // Ad slot
  adSlot: (pos, fadingIn) => ({
    position: 'absolute',
    top:    `${pos.top}%`,
    left:   `${pos.left}%`,
    width:  `${pos.width}%`,
    height: `${pos.height}%`,
    border: '1px solid rgba(255,255,255,0.15)',
    borderRadius: 3,
    overflow: 'hidden',
    transition: 'opacity 0.25s ease',
    opacity: fadingIn ? 0 : 1,
  }),

  // Controls row
  controls: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '20px 0 0',
    borderTop: '1px solid rgba(255,255,255,0.07)',
    marginTop: 1,
  },
  counter: {
    fontFamily: "var(--mono, monospace)",
    fontSize: 10,
    letterSpacing: '0.16em',
    textTransform: 'uppercase',
    color: 'rgba(255,255,255,0.35)',
    minWidth: 48,
  },
  dots: {
    display: 'flex',
    gap: 6,
    alignItems: 'center',
  },
  navDot: (active) => ({
    width: active ? 18 : 6,
    height: 6,
    borderRadius: 3,
    background: active ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.15)',
    transition: 'width 0.25s ease, background 0.25s ease',
    cursor: 'pointer',
    border: 'none',
    padding: 0,
    flexShrink: 0,
  }),
  arrows: {
    display: 'flex',
    gap: 6,
  },
  arrowBtn: (disabled) => ({
    width: 34,
    height: 34,
    borderRadius: 4,
    border: '1px solid rgba(255,255,255,0.1)',
    background: disabled ? 'transparent' : 'rgba(255,255,255,0.03)',
    color: disabled ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.7)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: disabled ? 'not-allowed' : 'pointer',
    fontSize: 14,
    transition: 'background 0.15s, color 0.15s',
    flexShrink: 0,
  }),

  // Metadata card
  meta: {
    padding: '24px 0 0',
  },
  metaInner: {
    display: 'grid',
    gridTemplateColumns: '1fr auto',
    gap: '16px 32px',
    alignItems: 'start',
  },
  variantTitle: {
    fontFamily: "var(--sans, sans-serif)",
    fontWeight: 500,
    fontSize: 15,
    letterSpacing: '-0.01em',
    color: 'rgba(255,255,255,0.88)',
    marginBottom: 8,
    lineHeight: 1.3,
  },
  hypothesis: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.5)',
    lineHeight: 1.6,
  },
  resultPill: {
    fontFamily: "var(--mono, monospace)",
    fontSize: 10,
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    color: 'rgba(255,255,255,0.55)',
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: 3,
    padding: '6px 10px',
    whiteSpace: 'nowrap',
    lineHeight: 1.4,
    textAlign: 'right',
  },
}

// ─── PLACEHOLDER SCREEN (shown when no SCREEN_IMAGE provided) ───────────────
function PlaceholderScreen({ variant }) {
  return (
    <div style={{
      position: 'absolute', inset: 0,
      background: '#0d0d0d',
      display: 'flex',
    }}>
      {/* Left content column */}
      <div style={{ flex: '0 0 60%', padding: '5% 4%', display: 'flex', flexDirection: 'column', gap: '3%' }}>
        <div style={{ height: '6%', width: '45%', background: 'rgba(255,255,255,0.05)', borderRadius: 2 }} />
        <div style={{ height: '3%', width: '72%', background: 'rgba(255,255,255,0.04)', borderRadius: 2 }} />
        <div style={{ height: '3%', width: '60%', background: 'rgba(255,255,255,0.03)', borderRadius: 2 }} />
        <div style={{ height: '12%', width: '80%', background: 'rgba(255,255,255,0.03)', borderRadius: 3, marginTop: '4%' }} />
        <div style={{ display: 'flex', gap: '3%', marginTop: '4%' }}>
          {[40, 55, 38].map((w, i) => (
            <div key={i} style={{ height: '3%', width: `${w}%`, background: 'rgba(255,255,255,0.04)', borderRadius: 2 }} />
          ))}
        </div>
        <div style={{ height: '28%', width: '88%', background: 'rgba(255,255,255,0.025)', borderRadius: 4, marginTop: 'auto' }} />
      </div>

      {/* Right: ad placement simulation */}
      <div style={{
        flex: '0 0 40%',
        padding: '5% 4%',
        display: 'flex',
        flexDirection: 'column',
        borderLeft: '1px solid rgba(255,255,255,0.04)',
      }}>
        <div style={{ height: '4%', width: '60%', background: 'rgba(255,255,255,0.04)', borderRadius: 2, marginBottom: '4%' }} />
        <div style={{
          flex: 1,
          background: variant.accent,
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 4,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          gap: 8,
        }}>
          <p style={{
            fontFamily: 'var(--mono, monospace)',
            fontSize: 9,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.18)',
          }}>Ad Placement</p>
          <p style={{
            fontFamily: 'var(--sans, sans-serif)',
            fontWeight: 500,
            fontSize: 11,
            color: 'rgba(255,255,255,0.28)',
            textAlign: 'center',
            padding: '0 12px',
            lineHeight: 1.4,
          }}>{variant.title}</p>
        </div>
        <div style={{ height: '6%', marginTop: '4%', background: 'rgba(255,255,255,0.03)', borderRadius: 2 }} />
      </div>
    </div>
  )
}

// ─── COMPONENT ──────────────────────────────────────────────────────────────
export default function ExperimentViewer() {
  const [index, setIndex]   = useState(0)
  const [fading, setFading] = useState(false)

  const total   = variants.length
  const current = variants[index]

  const goTo = useCallback((next) => {
    if (next === index) return
    setFading(true)
    setTimeout(() => {
      setIndex(next)
      setFading(false)
    }, 220)
  }, [index])

  const prev = () => goTo(index > 0 ? index - 1 : total - 1)
  const next = () => goTo(index < total - 1 ? index + 1 : 0)

  // Keyboard navigation
  const handleKey = (e) => {
    if (e.key === 'ArrowLeft')  prev()
    if (e.key === 'ArrowRight') next()
  }

  return (
    <div style={S.wrap} onKeyDown={handleKey} tabIndex={0}
      role="region" aria-label="Experiment variants viewer">

      {/* ── SCREEN MOCK ── */}
      <div style={S.screenWrap}>
        {/* Browser chrome */}
        <div style={S.chromebar}>
          <div style={S.dot('rgba(255,255,255,0.12)')} />
          <div style={S.dot('rgba(255,255,255,0.08)')} />
          <div style={S.dot('rgba(255,255,255,0.06)')} />
          <div style={S.urlbar} />
        </div>

        {/* Screen content */}
        <div style={S.screenContent}>
          {/* Background */}
          <div style={S.screenBg(SCREEN_IMAGE)}>
            {!SCREEN_IMAGE && <PlaceholderScreen variant={current} />}
          </div>

          {/* Ad slot — only shown when SCREEN_IMAGE is set */}
          {SCREEN_IMAGE && (
            <div style={S.adSlot(SLOT_POSITION, fading)}>
              {current.image
                ? <img src={current.image} alt={current.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                : <div style={{
                    width: '100%', height: '100%',
                    background: current.accent,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <p style={{ fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.14em',
                      textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)' }}>
                      {current.title}
                    </p>
                  </div>
              }
            </div>
          )}
        </div>
      </div>

      {/* ── CONTROLS ── */}
      <div style={S.controls}>
        {/* Counter */}
        <span style={S.counter}>
          {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </span>

        {/* Dot indicators */}
        <div style={S.dots} role="tablist" aria-label="Variant selector">
          {variants.map((v, i) => (
            <button
              key={v.id}
              style={S.navDot(i === index)}
              onClick={() => goTo(i)}
              role="tab"
              aria-selected={i === index}
              aria-label={v.title}
            />
          ))}
        </div>

        {/* Arrows */}
        <div style={S.arrows}>
          <button style={S.arrowBtn(false)} onClick={prev}
            aria-label="Previous variant">←</button>
          <button style={S.arrowBtn(false)} onClick={next}
            aria-label="Next variant">→</button>
        </div>
      </div>

      {/* ── METADATA ── */}
      <div style={S.meta} role="tabpanel">
        <div style={{
          ...S.metaInner,
          opacity: fading ? 0 : 1,
          transition: 'opacity 0.25s ease',
        }}>
          <div>
            <p style={S.variantTitle}>{current.title}</p>
            <p style={S.hypothesis}>{current.hypothesis}</p>
          </div>
          <div style={S.resultPill}>{current.result}</div>
        </div>
      </div>

    </div>
  )
}
