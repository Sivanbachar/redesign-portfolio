import { useState, useEffect, useCallback, useRef, Fragment } from 'react'
import '../styles/mastercard.css'

const TOTAL = 10

// ── DATA ──────────────────────────────────────────────────────────
const NEEDS = [
  'Keep shared balances accurate without manual bookkeeping',
  'Reduce awkward conversations around money',
  'Trust that everyone sees the same financial picture',
  'Make recurring expenses effortless',
  'Spend less time managing finances and more time living',
]

const FRICTIONS = [
  { title: 'Transparency breaks down', desc: "Users lose confidence when they can't understand who owes what or when balances changed." },
  { title: 'Manual bookkeeping is exhausting', desc: 'Forgotten expenses and recurring bills create constant, error-prone maintenance.' },
  { title: 'Money creates social tension', desc: 'People dislike chasing roommates for repayment and often become the household "finance parent."' },
  { title: 'Trust is fragile', desc: 'Hidden calculations, sync issues, and unexpected charges quickly erode shared confidence.' },
  { title: 'Existing apps solve math — not relationships', desc: 'Most products calculate balances well but do little to reduce emotional friction.' },
]

const AFFINITY_CARDS = [
  { emoji: '🧾', label: 'Transparency' },
  { emoji: '⇄',  label: 'Manual Tracking' },
  { emoji: '💬', label: 'Social Friction' },
  { emoji: '🤝', label: 'Trust' },
  { emoji: '⏱', label: 'Cognitive Load' },
]

const INSIGHTS = [
  {
    finding: 'Balances are confusing, not just unknown.',
    evidence: '"I just never look at Splitwise anymore because I can never figure out why it says what it says." — App Store review',
    impl: '→ Every balance needs a one-tap explanation.',
  },
  {
    finding: 'One person always becomes the household accountant.',
    evidence: '"My roommate never logs anything. I\'ve just accepted that I track everything for both of us." — Reddit r/personalfinance',
    impl: '→ Design for the tracked, not just the tracker.',
  },
  {
    finding: 'Asking for money feels confrontational.',
    evidence: '"I just paid the whole thing to avoid the conversation." — Reddit',
    impl: '→ Reframe requests as shared updates, not demands.',
  },
  {
    finding: 'Manual entry leads to drift and forgotten expenses.',
    evidence: '"I stopped tracking because it was more work than it was worth." — App Store review',
    impl: '→ Reduce entry to the minimum viable interaction.',
  },
  {
    finding: 'Settlement paralysis grows with balance size.',
    evidence: '"We\'ve had this $200 balance for three months. At this point it\'s awkward to bring up." — Reddit',
    impl: '→ Surface balances early. Make small settlements feel natural.',
  },
]

const PATTERNS = [
  { pattern: 'Running balances', why: 'Simplest mental model for shared debt', opp: 'Keep — industry-standard expectation' },
  { pattern: 'Manual expense entry', why: 'Low-friction build, maximum flexibility', opp: 'Reduce — largest single pain point' },
  { pattern: 'Group-first organization', why: 'Logical container for shared costs', opp: 'Expand to full household context' },
  { pattern: 'Separate settlement flow', why: 'Regulatory simplicity, less liability', opp: 'Simplify — close the two-app gap' },
  { pattern: 'Transaction-only activity feed', why: 'Shows what happened', opp: 'Improve with "why" and ownership context' },
  { pattern: 'Notification-based nudges', why: 'Reactive, familiar pattern', opp: 'Rethink — proactive, relationship-aware language' },
]

const STORY_STEPS = [
  { action: <><strong>Sarah</strong> pays the electricity bill.</>, accent: false },
  { action: <>She opens the app and adds the expense with a receipt photo.</>, accent: false },
  { action: <>Assigns it to the household. Split defaults to equal.</>, accent: false },
  { action: <>The shared household balance updates immediately — for both of them.</>, accent: true },
  { action: <>Alex opens the app and sees:</>, callout: '"You owe Sarah $46 for December Electricity."', accent: false },
  { action: <>Alex taps <strong>Settle</strong>. Payment initiates from within the app.</>, accent: false },
]

const METRICS = [
  { metric: 'Time to settle expenses',           type: 'Product',   target: '↓ 40% vs. baseline' },
  { metric: 'Both members active (households)',   type: 'Behavior',  target: '> 60% of households' },
  { metric: 'Manual edits per expense',          type: 'Product',   target: '< 1 edit per 10 expenses' },
  { metric: 'Expense → payment time',            type: 'Behavior',  target: '< 48 hours median' },
  { metric: 'Recurring bills configured',        type: 'Behavior',  target: '> 3 per household' },
  { metric: 'In-app settlement rate',            type: 'Business',  target: '> 50% of settlements' },
]

// ── SLIDE COMPONENTS ──────────────────────────────────────────────

function SlideShell({ children }) {
  return (
    <>
      <div className="mc-meta mc-a0">
        <p className="mc-badge">Mastercard · Design Challenge · 2025</p>
      </div>
      {children}
    </>
  )
}

function Slide1() {
  return (
    <SlideShell>
      <h1 className="mc-h1 mc-a1">The Challenge</h1>
      <div className="mc-divider mc-a2" />
      <div className="mc-challenge-body">
        <div className="mc-prompt-box mc-a3" style={{ gridColumn: '1 / -1' }}>
          <p>"Design a digital experience that helps people who share frequent day-to-day expenses with others — roommates or a partner — track and manage these costs with clarity."</p>
        </div>
        <div className="mc-meta-pair mc-a4">
          <p className="mc-meta-key">Timeline</p>
          <p className="mc-meta-val">5 days · Solo designer</p>
        </div>
        <div className="mc-meta-pair mc-a4">
          <p className="mc-meta-key">Deliverables</p>
          <p className="mc-meta-val">End-to-end UX · Research · Strategy · Prototype</p>
        </div>
        <div className="mc-objective mc-a5" style={{ gridColumn: '1 / -1' }}>
          <span className="mc-objective-key">Objective</span>
          <p className="mc-objective-val">Create a shared expense experience that reduces ambiguity and makes day-to-day finances transparent for people living or spending together.</p>
        </div>
      </div>
    </SlideShell>
  )
}

function Slide2() {
  return (
    <SlideShell>
      <h1 className="mc-h1 mc-a1">Understanding the Problem</h1>
      <div className="mc-divider mc-a2" />
      <div className="mc-reframe-layout mc-a3" style={{ flex: 1 }}>
        <div>
          <p className="mc-observation-label">Observation</p>
          <p className="mc-reframe-statement">
            Managing shared expenses isn't primarily a payment problem.<br />
            <strong>It's a transparency problem.</strong>
          </p>
          <div className="mc-design-goal mc-a5">
            <span className="mc-design-goal-key">Design Goal</span>
            <p className="mc-design-goal-val">Create confidence through transparency.</p>
          </div>
        </div>
        <div className="mc-questions-col">
          <p className="mc-not-asking">People aren't asking "How do I split this?" — they're asking:</p>
          {[
            'Who owes what?',
            'Why?',
            'Has it already been paid?',
            'Is everyone looking at the same information?',
          ].map((q, i) => (
            <div key={i} className="mc-q-item">
              <span className="mc-q-dot" />
              {q}
            </div>
          ))}
        </div>
      </div>
    </SlideShell>
  )
}

function Slide3() {
  const steps = [
    { num: '01', name: 'Secondary Research', details: 'Reddit · App Store · Google Play · Trustpilot · Finance forums\n\nFocused on behavioral patterns and recurring frustrations across existing tools.' },
    { num: '02', name: 'Competitive Analysis', details: 'Splitwise · Venmo · Tricount · Honeydue · Copilot Money\n\nReviewed key flows: onboarding, expense entry, balance view, settlement.' },
    { num: '03', name: 'Synthesis', details: 'Identified 5 recurring behavior patterns and 6 industry-standard interaction models.\n\nSeparated what\'s proven from what\'s missing.' },
    { num: '04', name: 'Opportunity Areas', details: '5 design opportunities mapped to user needs — not features.\n\nEach tied directly to a research finding.' },
  ]

  return (
    <SlideShell>
      <h1 className="mc-h1 mc-a1">Research Approach</h1>
      <div className="mc-divider mc-a2" />
      <div className="mc-flow-row mc-a3">
        {steps.flatMap((step, i) => [
          <div key={step.num} className="mc-flow-step">
            <p className="mc-flow-num">{step.num}</p>
            <p className="mc-flow-name">{step.name}</p>
            <p className="mc-flow-details" style={{ whiteSpace: 'pre-line' }}>{step.details}</p>
          </div>,
          i < steps.length - 1 ? (
            <div key={`arrow-${i}`} className="mc-flow-arrow">›</div>
          ) : null,
        ]).filter(Boolean)}
      </div>
      <div className="mc-approach-note mc-a4">
        Given a five-day timeline, secondary research across user forums and existing products allowed rapid understanding of both user needs and current market approaches — without the time cost of primary research.
      </div>
    </SlideShell>
  )
}

function Slide4() {
  return (
    <SlideShell>
      <h1 className="mc-h1 mc-a1">User Insights</h1>
      <div className="mc-divider mc-a2" />
      <div className="mc-insights-grid">
        {INSIGHTS.map((ins, i) => (
          <div key={i} className={`mc-insight-card mc-a${i + 3}`}>
            <p className="mc-insight-num">0{i + 1}</p>
            <p className="mc-insight-finding">{ins.finding}</p>
            <p className="mc-insight-evidence">{ins.evidence}</p>
            <div className="mc-insight-divider" />
            <p className="mc-insight-impl">{ins.impl}</p>
          </div>
        ))}
      </div>
    </SlideShell>
  )
}

function Slide5() {
  return (
    <SlideShell>
      <h1 className="mc-h1 mc-a1">Competitive Landscape</h1>
      <p className="mc-sub mc-a2">Reviewed across Splitwise, Venmo, Tricount, Honeydue, and Copilot Money · Organized by pattern, not product.</p>
      <table className="mc-pattern-table mc-a3">
        <thead>
          <tr>
            <th>Industry Pattern</th>
            <th>Why It Exists</th>
            <th>Opportunity</th>
          </tr>
        </thead>
        <tbody>
          {PATTERNS.map((row, i) => (
            <tr key={i}>
              <td className="mc-pattern-col-1">{row.pattern}</td>
              <td>{row.why}</td>
              <td className="mc-opp-col">{row.opp}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="mc-comp-caption mc-a4">
        Five apps reviewed. One consistent gap: the experience ends at the transaction — not the relationship.
      </p>
    </SlideShell>
  )
}

function Slide6() {
  const principles = [
    {
      name: 'Transparency First',
      desc: 'Every balance is immediately understandable. No hidden calculations. No ambiguity about who owes what or why.',
      eg: 'Shows up as: one-tap balance explanation, full edit history, real-time sync.',
    },
    {
      name: 'Shared Accountability',
      desc: 'Both parties have equal clarity and agency — not just the person who tracked the expense.',
      eg: 'Shows up as: dual-perspective balance view, shared notifications, mutual confirmation.',
    },
    {
      name: 'Reduce Bookkeeping',
      desc: 'Every time the product can automate a decision, apply a default, or pre-fill a field — it should.',
      eg: 'Shows up as: recurring expense detection, smart split defaults, automatic reminders.',
    },
  ]

  return (
    <SlideShell>
      <h1 className="mc-h1 mc-a1">Product Strategy</h1>
      <div className="mc-divider mc-a2" />
      <div className="mc-vision-statement mc-a3">
        <p className="mc-vision-eyebrow">Product Vision</p>
        <p className="mc-vision-text">
          A shared <span>financial dashboard</span> — not an expense tracker.
        </p>
      </div>
      <div className="mc-principles-grid">
        {principles.map((p, i) => (
          <div key={i} className={`mc-principle-card mc-a${i + 4}`}>
            <p className="mc-principle-num">0{i + 1}</p>
            <p className="mc-principle-name">{p.name}</p>
            <p className="mc-principle-desc">{p.desc}</p>
            <p className="mc-principle-eg">{p.eg}</p>
          </div>
        ))}
      </div>
    </SlideShell>
  )
}

function Slide7() {
  return (
    <SlideShell>
      <h1 className="mc-h1 mc-a1">Prioritization</h1>
      <div className="mc-divider mc-a2" />
      <div className="mc-priority-cols">
        {/* MVP */}
        <div className="mc-priority-col mc-priority-col--now mc-a3">
          <p className="mc-priority-col-label mc-priority-col-label--now">MVP — Launch</p>
          <p className="mc-priority-group-label">Household Core</p>
          {['Shared household dashboard', 'Running balance (both parties)', 'Expense entry with receipt upload', 'Equal and custom split options', 'Expense history with edit log'].map((f, i) => (
            <p key={i} className="mc-priority-item">{f}</p>
          ))}
          <p className="mc-priority-group-label" style={{ marginTop: 14 }}>Recurring</p>
          {['Recurring expense templates', 'Payment status tracking'].map((f, i) => (
            <p key={i} className="mc-priority-item">{f}</p>
          ))}
        </div>
        {/* Next */}
        <div className="mc-priority-col mc-a4">
          <p className="mc-priority-col-label mc-priority-col-label--next">Next</p>
          {['AI receipt extraction', 'Smart payment reminders', 'Expense commenting', 'Search and filtering', 'Automatic recurring detection'].map((f, i) => (
            <p key={i} className="mc-priority-item">{f}</p>
          ))}
        </div>
        {/* Future */}
        <div className="mc-priority-col mc-a5">
          <p className="mc-priority-col-label mc-priority-col-label--future">Future Vision</p>
          {['Bank / card integration', 'Predictive settlements', 'Household financial insights', 'AI anomaly detection', 'Multi-household support'].map((f, i) => (
            <p key={i} className="mc-priority-item">{f}</p>
          ))}
        </div>
      </div>
      <div className="mc-deferred-note mc-a6">
        Future features assume a trust level and behavioral data richness that doesn't exist at launch. Earn confidence with core clarity first — then expand.
      </div>
    </SlideShell>
  )
}

function Slide8() {
  return (
    <SlideShell>
      <h1 className="mc-h1 mc-a1">Experience Walkthrough</h1>
      <p className="mc-sub mc-a2">One story. End to end.</p>
      <div className="mc-story-layout mc-a3">
        <div>
          <div className="mc-story-who">
            <p className="mc-story-who-label">Scenario</p>
            <p className="mc-story-who-name">Sarah &amp; Alex</p>
            <p className="mc-story-who-desc">Roommates splitting monthly household bills. Sarah pays first, Alex settles later.</p>
          </div>
        </div>
        <div className="mc-story-steps">
          {STORY_STEPS.map((step, i) => (
            <div key={i} className="mc-story-step">
              <div className="mc-step-spine">
                <div className={`mc-step-dot ${step.accent ? 'mc-step-dot--accent' : ''}`} />
                {i < STORY_STEPS.length - 1 && <div className="mc-step-line" />}
              </div>
              <div className="mc-step-body">
                <p className="mc-step-action">{step.action}</p>
                {step.callout && <span className="mc-step-callout">{step.callout}</span>}
              </div>
            </div>
          ))}
          <div className="mc-story-resolution">
            <span className="mc-story-resolution-icon">✓</span>
            <p>Household returns to balanced. No awkward conversation required.</p>
          </div>
        </div>
      </div>
    </SlideShell>
  )
}

function Slide9() {
  const themes = [
    { name: 'Household Overview', desc: 'Shared dashboard. Running balance visible to both parties.' },
    { name: 'Transparency', desc: 'Every balance is traceable. One-tap history behind any number.' },
    { name: 'Adding Expenses', desc: 'Receipt upload, smart defaults, three-tap happy path.' },
    { name: 'Recurring Bills', desc: 'Auto-detected templates. Effortless monthly tracking.' },
    { name: 'Payments', desc: 'Settlement in-app. From balance visible to balance resolved.' },
  ]

  return (
    <SlideShell>
      <h1 className="mc-h1 mc-a1">Final Solution</h1>
      <p className="mc-sub mc-a2">Organized by design theme, not screen order.</p>
      <div className="mc-solution-grid mc-a3">
        {themes.map((t, i) => (
          <div key={i} className="mc-solution-theme">
            <div className="mc-solution-theme-header">
              <p className="mc-solution-theme-name">{t.name}</p>
              <p className="mc-solution-theme-desc">{t.desc}</p>
            </div>
            <div className="mc-solution-placeholder">
              <p className="mc-solution-placeholder-label">Add your<br />screens here</p>
            </div>
          </div>
        ))}
      </div>
    </SlideShell>
  )
}

function Slide10() {
  const validate = [
    { tag: 'Research', item: 'Does financial transparency reduce conflict — or increase awareness of it?' },
    { tag: 'Research', item: 'Do couples and roommates have meaningfully different sharing behaviors?' },
    { tag: 'Testing', item: 'How often do users expect reminder notifications — and what tone lands best?' },
    { tag: 'Testing', item: 'Does receipt upload increase trust, or add friction?' },
    { tag: 'Assumption', item: 'Both parties want shared visibility. May be false for privacy-conscious users.' },
  ]

  return (
    <SlideShell>
      <h1 className="mc-h1 mc-a1">Reflection</h1>
      <div className="mc-divider mc-a2" />
      <div className="mc-reflection-cols">
        <div className="mc-a3">
          <p className="mc-reflect-col-label">What I'd Validate</p>
          {validate.map((v, i) => (
            <div key={i} className="mc-reflect-item">
              <span className="mc-reflect-tag">{v.tag}</span>
              {v.item}
            </div>
          ))}
        </div>
        <div className="mc-a4">
          <p className="mc-reflect-col-label">Success Metrics</p>
          <table className="mc-metrics-table">
            <thead>
              <tr>
                <th>Metric</th>
                <th>Type</th>
                <th>Target</th>
              </tr>
            </thead>
            <tbody>
              {METRICS.map((m, i) => (
                <tr key={i}>
                  <td>{m.metric}</td>
                  <td style={{ fontFamily: 'var(--mc-mono)', fontSize: '10px', color: 'var(--mc-txt-m)' }}>{m.type}</td>
                  <td style={{ color: 'var(--mc-amber)', fontStyle: 'italic' }}>{m.target}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </SlideShell>
  )
}

// Research findings slides (from original request)
function SlideResearch() {
  return (
    <SlideShell>
      <h1 className="mc-h1 mc-a1" style={{ fontSize: 'clamp(20px, 2.2vw, 28px)' }}>
        Cross-Product Research: Where Shared Expense Apps Still Fall Short
      </h1>
      <p className="mc-sub mc-a2">
        Insights synthesized from Reddit, App Store &amp; Google Play reviews, Trustpilot, and finance communities across Splitwise, Venmo, Honeydue, Tricount, and Monarch/Copilot.
      </p>
      <div className="mc-divider mc-a2" />
      <div className="mc-cols mc-a3">
        <div>
          <p className="mc-label mc-label--amber mc-col-header">Users are trying to…</p>
          <div className="mc-needs">
            {NEEDS.map((n, i) => (
              <div key={i} className="mc-need">
                <span className="mc-need-dot" />
                {n}
              </div>
            ))}
          </div>
        </div>
        <div className="mc-vdivider" />
        <div>
          <p className="mc-label mc-label--muted mc-col-header">Research revealed recurring friction</p>
          <div className="mc-frictions">
            {FRICTIONS.map((f, i) => (
              <p key={i} className="mc-friction">
                <strong>{f.title}</strong> — {f.desc}
              </p>
            ))}
          </div>
        </div>
      </div>
      <div className="mc-affinity-section mc-a4">
        <div className="mc-affinity-row">
          {AFFINITY_CARDS.map((card, i) => (
            <div key={i} className="mc-affinity-card-wrap">
              <div className="mc-card">
                <span className="mc-card-emoji">{card.emoji}</span>
                <span className="mc-card-label">{card.label}</span>
              </div>
            </div>
          ))}
        </div>
        <p className="mc-caption mc-af">
          "Patterns observed consistently across community discussions, app reviews, and user feedback — not isolated product complaints."
        </p>
      </div>
    </SlideShell>
  )
}

function SlideOpportunities() {
  const rows = [
    ['Confidence',    'Users question balances and edits',         'Increase visibility and explainability'],
    ['Accountability','Difficult to know who is responsible',       'Make ownership explicit throughout the experience'],
    ['Low Effort',   'Manual expense tracking is tedious',          'Reduce bookkeeping overhead'],
    ['Harmony',      'Money conversations become awkward',          'Design to reduce interpersonal friction'],
    ['Predictability','Unexpected costs create distrust',           'Increase transparency around recurring and one-off expenses'],
  ]

  return (
    <SlideShell>
      <h1 className="mc-h1 mc-a1">Design Opportunities Identified Through Research</h1>
      <div className="mc-divider mc-a2" />
      <table className="mc-opp-table mc-a3">
        <thead>
          <tr>
            <th>User Need</th>
            <th>Observed Pain</th>
            <th>Design Opportunity</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([need, pain, opp], i) => (
            <tr key={i}>
              <td className="mc-need-col">{need}</td>
              <td>{pain}</td>
              <td>{opp}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mc-takeaway mc-a4">
        <p>"The opportunity isn't better expense splitting — it's reducing the emotional and cognitive cost of managing shared finances."</p>
      </div>
    </SlideShell>
  )
}

// ── ALL SLIDES IN ORDER ───────────────────────────────────────────
const SLIDES = [
  Slide1,
  Slide2,
  Slide3,
  Slide4,
  Slide5,
  SlideResearch,
  Slide6,
  Slide7,
  SlideOpportunities,
  Slide8,
  // Slide9,   ← uncomment when final UI screens are ready
  Slide10,
]
const ACTUAL_TOTAL = SLIDES.length

// ── MAIN COMPONENT ────────────────────────────────────────────────
export default function MastercardChallenge() {
  const [current, setCurrent]   = useState(0)
  const [keys, setKeys]         = useState(() => Array(SLIDES.length).fill(0))
  const [prevSlide, setPrev]    = useState(null)
  const [locked, setLocked]     = useState(false)

  const goTo = useCallback((idx) => {
    if (idx < 0 || idx >= ACTUAL_TOTAL || locked) return
    setLocked(true)
    setPrev(current)
    setCurrent(idx)
    setKeys(k => { const n = [...k]; n[idx] = n[idx] + 1; return n })
    setTimeout(() => { setLocked(false); setPrev(null) }, 750)
  }, [current, locked])

  const goNext = useCallback(() => goTo(current + 1), [current, goTo])
  const goPrev = useCallback(() => goTo(current - 1), [current, goTo])

  // Keyboard
  useEffect(() => {
    const h = (e) => {
      if (['ArrowDown', 'ArrowRight', ' '].includes(e.key)) { e.preventDefault(); goNext() }
      if (['ArrowUp', 'ArrowLeft'].includes(e.key)) { e.preventDefault(); goPrev() }
    }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [goNext, goPrev])

  // Wheel
  const wheelCooldown = useRef(false)
  useEffect(() => {
    const h = (e) => {
      e.preventDefault()
      if (wheelCooldown.current) return
      wheelCooldown.current = true
      if (e.deltaY > 20) goNext()
      else if (e.deltaY < -20) goPrev()
      setTimeout(() => { wheelCooldown.current = false }, 900)
    }
    window.addEventListener('wheel', h, { passive: false })
    return () => window.removeEventListener('wheel', h)
  }, [goNext, goPrev])

  // Touch
  const touchStart = useRef(null)
  useEffect(() => {
    const ts = (e) => { touchStart.current = e.touches[0].clientY }
    const te = (e) => {
      if (!touchStart.current) return
      const delta = touchStart.current - e.changedTouches[0].clientY
      if (Math.abs(delta) > 50) { delta > 0 ? goNext() : goPrev() }
      touchStart.current = null
    }
    window.addEventListener('touchstart', ts)
    window.addEventListener('touchend', te)
    return () => { window.removeEventListener('touchstart', ts); window.removeEventListener('touchend', te) }
  }, [goNext, goPrev])

  // Lock body scroll
  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [])

  const progress = ((current + 1) / ACTUAL_TOTAL) * 100

  return (
    <div className="mc-shell">
      {/* Progress */}
      <div className="mc-progress-bar" style={{ width: `${progress}%` }} />

      {/* Slides */}
      {SLIDES.map((SlideComp, i) => {
        const isActive = i === current
        const isPrev   = i === prevSlide
        return (
          <div
            key={i}
            className={[
              'mc-slide',
              isActive ? 'mc-slide--active' : '',
              isPrev   ? 'mc-slide--prev'   : '',
            ].join(' ')}
          >
            <div key={keys[i]} className="mc-anim-root">
              <SlideComp />
            </div>
          </div>
        )
      })}

      {/* Nav dots */}
      <nav className="mc-nav-dots" aria-label="Slide navigation">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            className={`mc-nav-dot ${i === current ? 'mc-nav-dot--active' : ''}`}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </nav>

      {/* Keyboard hint */}
      <div className="mc-key-hint">
        <span className="mc-key">↑</span>
        <span className="mc-key">↓</span>
        <span style={{ marginLeft: 4 }}>navigate</span>
        <span style={{ marginLeft: 12, marginRight: 4 }}>·</span>
        <span className="mc-key">Space</span>
        <span style={{ marginLeft: 4 }}>advance</span>
      </div>
    </div>
  )
}
