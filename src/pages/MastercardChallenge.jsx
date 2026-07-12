import { useState, useEffect, useCallback, useRef } from 'react'
import '../styles/mastercard.css'

// ── DATA ──────────────────────────────────────────────────────────

const DAYS = [
  { day: 'Mon', label: 'Understanding\nPeople', desc: 'User forums, App Store reviews, Reddit threads, Trustpilot' },
  { day: 'Tue', label: 'Reviewing\nProducts', desc: 'Splitwise, Venmo, Tricount, Honeydue, Copilot Money' },
  { day: 'Wed', label: 'Finding\nPatterns', desc: 'Six recurring industry patterns across all five products' },
  { day: 'Thu', label: 'Exploring\nConcepts', desc: 'Multiple directions tested against five core user needs' },
  { day: 'Fri', label: 'Refining and\nPrioritizing', desc: 'One direction forward, features ordered by user confidence' },
]

const OBSERVATIONS = [
  'Balances become difficult to trust when history is hidden.',
  'One person becomes the household accountant by default.',
  'Asking for money is socially uncomfortable in every product.',
]

const PATTERNS = [
  { pattern: 'Running balances',            why: 'Simplest model for shared debt',         opp: 'Keep. Expected by everyone.' },
  { pattern: 'Manual expense entry',         why: 'Low friction to build',                   opp: 'Reduce. Biggest reason people quit.' },
  { pattern: 'Group first organization',     why: 'Logical container for shared costs',      opp: 'Expand to full household view.' },
  { pattern: 'Separate settlement flow',     why: 'Regulatory simplicity',                   opp: 'Simplify. Close the two app gap.' },
  { pattern: 'Transaction only feed',        why: 'Shows what happened',                     opp: 'Add "why" and ownership context.' },
  { pattern: 'Notification based nudges',    why: 'Reactive and familiar',                   opp: 'Rethink. People tune them out.' },
]

const PRINCIPLES = [
  {
    icon: '💡',
    name: 'Question before action',
    desc: 'The interface should explain balances before asking people to pay them. People do not act on numbers they do not trust.',
    eg: 'One tap balance explanation. Edit history behind every transaction.',
  },
  {
    icon: '💬',
    name: 'Money conversations stay in context',
    desc: 'Discussions belong with expenses, not in text messages. The app should be the single place where money and context live together.',
    eg: 'Expense level comments. In context payment requests. Shared notes.',
  },
  {
    icon: '🔄',
    name: 'The system remembers',
    desc: 'Recurring costs, ownership, and defaults should never require repeated manual work. The product should carry the memory so people do not have to.',
    eg: 'Recurring templates. Auto detected bills. Remembered splits.',
  },
]

const OPPORTUNITIES = [
  { finding: 'Unexpected expenses create distrust', opp: 'Help people understand why they owe money', feature: 'Require receipts for one-time expenses' },
  { finding: 'Nobody knows who is responsible for what', opp: 'Nobody should become the household accountant', feature: 'Show who added every expense with a dual-perspective view' },
  { finding: 'Manual tracking gets abandoned', opp: 'People should not have to remember recurring expenses', feature: 'Auto detect recurring bills and pre-fill templates' },
  { finding: 'Asking for money feels confrontational', opp: 'Money requests belong next to the expense, not in a text', feature: 'Quiet in-context settlement tied directly to each expense' },
  { finding: 'Settlement requires leaving the app', opp: 'Close the gap between seeing a balance and resolving it', feature: 'Complete settlement from balance to payment in one flow' },
]

const METRICS = [
  { metric: 'Time to settle expenses',           type: 'Product',   target: '40% reduction vs baseline' },
  { metric: 'Both members active per household', type: 'Behavior',  target: 'Over 60% of households' },
  { metric: 'Manual edits per expense',          type: 'Product',   target: 'Under 1 edit per 10 expenses' },
  { metric: 'Expense to payment time',           type: 'Behavior',  target: 'Under 48 hours median' },
  { metric: 'In app settlement rate',            type: 'Business',  target: 'Over 50% of settlements' },
]

// ── SHARED SHELL ──────────────────────────────────────────────────
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

// ── SLIDE 1 · THE CHALLENGE ───────────────────────────────────────
function Slide1() {
  return (
    <SlideShell>
      <h1 className="mc-h1 mc-a1">The Challenge</h1>
      <div className="mc-divider mc-a2" />
      <div className="mc-challenge-body">
        <div className="mc-prompt-box mc-a3" style={{ gridColumn: '1 / -1' }}>
          <p>"Design a digital experience that helps people who share frequent day to day expenses with others (roommates or a partner) and track and manage these costs with clarity."</p>
        </div>
        <div className="mc-meta-pair mc-a4">
          <p className="mc-meta-key">Timeline</p>
          <p className="mc-meta-val">5 days · Solo designer</p>
        </div>
        <div className="mc-meta-pair mc-a4">
          <p className="mc-meta-key">Deliverables</p>
          <p className="mc-meta-val">End to end UX · Research · Strategy · Prototype</p>
        </div>
        <div className="mc-objective mc-a5" style={{ gridColumn: '1 / -1' }}>
          <span className="mc-objective-key">Design Goal</span>
          <p className="mc-objective-val">Create a shared expense experience that helps people understand where they stand financially, without creating more work or awkward conversations.</p>
        </div>
      </div>
    </SlideShell>
  )
}

// ── SLIDE 2 · UNDERSTANDING THE PROBLEM ──────────────────────────
function Slide2() {
  return (
    <SlideShell>
      <h1 className="mc-h1 mc-a1">Understanding the Problem</h1>
      <div className="mc-divider mc-a2" />
      <div className="mc-understanding-layout">
        <div className="mc-a3">
          <p className="mc-problem-setup">Managing shared expenses isn't primarily a payment problem.</p>
          <p className="mc-problem-punchline">It's a confidence problem.</p>
          <p className="mc-problem-narrative">
            During research I expected to find complaints about splitting money. Instead, people repeatedly described something else:
          </p>
          <p className="mc-problem-reveal">
            They weren't unsure how much they owed. They were unsure whether they could trust what they were seeing.
          </p>
        </div>
        <div className="mc-a4">
          <p className="mc-not-asking">People weren't asking...</p>
          <p className="mc-not-asking-q">"How do I split this?"</p>
          <p className="mc-were-asking">They were asking...</p>
          {[
            'Why do I owe this?',
            'Who paid?',
            'Is this still accurate?',
            'Are we looking at the same information?',
          ].map((q, i) => (
            <div key={i} className="mc-understanding-q">
              <span className="mc-understanding-dot" />
              <span>{q}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="mc-design-goal mc-a5">
        <span className="mc-design-goal-key">Design Goal</span>
        <p className="mc-design-goal-val">Create confidence through transparency.</p>
      </div>
    </SlideShell>
  )
}

// ── SLIDE 3 · HOW I SPENT FIVE DAYS ──────────────────────────────
function Slide3() {
  return (
    <SlideShell>
      <h1 className="mc-h1 mc-a1">How I Spent Five Days</h1>
      <div className="mc-divider mc-a2" />
      <div className="mc-timeline-wrap mc-a3">
        <div className="mc-timeline-track">
          <div className="mc-tl-line" />
          {DAYS.map((day, i) => (
            <div key={i} className="mc-timeline-node">
              <p className="mc-tl-day">{day.day}</p>
              <div className="mc-tl-dot" />
              <p className="mc-tl-label" style={{ whiteSpace: 'pre-line' }}>{day.label}</p>
              <p className="mc-tl-desc">{day.desc}</p>
            </div>
          ))}
        </div>
        <p className="mc-timeline-note mc-a4">
          Given the five day timeline, secondary research and competitive analysis allowed rapid understanding of both user behavior and current market approaches before designing anything.
        </p>
      </div>
    </SlideShell>
  )
}

// ── SLIDE 4 · USER INSIGHTS ───────────────────────────────────────
function Slide4() {
  return (
    <SlideShell>
      <h1 className="mc-h1 mc-a1">User Insights</h1>
      <div className="mc-divider mc-a2" />
      <div className="mc-insight-split">
        <div className="mc-a3">
          <span className="mc-pull-mark">"</span>
          <p className="mc-pull-quote">I never know if Splitwise is actually right.</p>
          <p className="mc-pull-source">App Store Review</p>
        </div>
        <div className="mc-insight-vdivider" />
        <div className="mc-a4">
          <p className="mc-obs-label">Three things came up in every product, across every community</p>
          {OBSERVATIONS.map((obs, i) => (
            <div key={i} className="mc-obs-item">
              <span className="mc-obs-dot" />
              <span>{obs}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="mc-research-takeaway mc-a5">
        <span className="mc-rt-key">Research Takeaway</span>
        <p className="mc-rt-text">People weren't questioning the math. They were questioning whether they could trust it.</p>
      </div>
    </SlideShell>
  )
}

// ── SLIDE 5 · COMPETITIVE LANDSCAPE ──────────────────────────────
function Slide5() {
  const products = ['Splitwise', 'Venmo', 'Tricount', 'Honeydue', 'Copilot Money']
  return (
    <SlideShell>
      <h1 className="mc-h1 mc-a1">Competitive Landscape</h1>
      <div className="mc-comp-products mc-a2">
        {products.map(p => <span key={p} className="mc-product-badge">{p}</span>)}
      </div>
      <table className="mc-pattern-table mc-a3">
        <thead>
          <tr>
            <th>Industry Pattern</th>
            <th>Why It Exists</th>
            <th className="mc-opp-th">Opportunity</th>
          </tr>
        </thead>
        <tbody>
          {PATTERNS.map((row, i) => (
            <tr key={i}>
              <td className="mc-col-name">{row.pattern}</td>
              <td>{row.why}</td>
              <td className="mc-opp-col">{row.opp}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="mc-comp-statement mc-a4">
        Every competitor solved the transaction. None solved the relationship.
      </p>
    </SlideShell>
  )
}

// ── SLIDE 6 · THE SHIFT ───────────────────────────────────────────
function Slide6() {
  return (
    <SlideShell>
      <h1 className="mc-h1 mc-a1">The Shift</h1>
      <div className="mc-shift-layout">
        <p className="mc-shift-statement mc-a2">
          Research changed the product I thought I was designing.
        </p>
        <p className="mc-shift-bridge mc-a3">Instead of another expense tracker...</p>
        <p className="mc-shift-result mc-a3">
          I designed a shared <span>financial dashboard</span>.
        </p>
        <div className="mc-illus-placeholder mc-a4">
          <p className="mc-illus-label">Illustration Placeholder</p>
          <p className="mc-illus-label">Shared Financial Dashboard Concept</p>
        </div>
      </div>
    </SlideShell>
  )
}

// ── SLIDE 7 · PRODUCT PRINCIPLES ─────────────────────────────────
function Slide7() {
  return (
    <SlideShell>
      <h1 className="mc-h1 mc-a1">Product Principles</h1>
      <div className="mc-divider mc-a2" />
      <div className="mc-principles-grid">
        {PRINCIPLES.map((p, i) => (
          <div key={i} className={`mc-principle-card mc-a${i + 3}`}>
            <div className="mc-principle-icon">{p.icon}</div>
            <p className="mc-principle-name">{p.name}</p>
            <p className="mc-principle-desc">{p.desc}</p>
            <p className="mc-principle-eg">{p.eg}</p>
          </div>
        ))}
      </div>
    </SlideShell>
  )
}

// ── SLIDE 8 · PRIORITIZATION ──────────────────────────────────────
function Slide8() {
  return (
    <SlideShell>
      <h1 className="mc-h1 mc-a1">Prioritization</h1>
      <div className="mc-divider mc-a2" />
      <div className="mc-priority-cols">
        <div className="mc-priority-col mc-priority-col--now mc-a3">
          <p className="mc-priority-col-label mc-priority-col-label--now">MVP · Launch</p>
          <p className="mc-priority-group-label">Household Core</p>
          {['Shared household dashboard', 'Running balance visible to both people', 'Expense entry with receipt upload', 'Equal and custom split options', 'Expense history with edit log'].map((f, i) => (
            <p key={i} className="mc-priority-item">{f}</p>
          ))}
          <p className="mc-priority-group-label" style={{ marginTop: 12 }}>Recurring</p>
          {['Recurring expense templates', 'Payment status tracking'].map((f, i) => (
            <p key={i} className="mc-priority-item">{f}</p>
          ))}
        </div>
        <div className="mc-priority-col mc-priority-col--next mc-a4">
          <p className="mc-priority-col-label mc-priority-col-label--next">Next</p>
          {['AI receipt extraction', 'Smart payment reminders', 'Expense commenting', 'Search and filtering', 'Automatic recurring detection'].map((f, i) => (
            <p key={i} className="mc-priority-item">{f}</p>
          ))}
        </div>
        <div className="mc-priority-col mc-priority-col--future mc-a5">
          <p className="mc-priority-col-label mc-priority-col-label--future">Future Vision</p>
          {['Bank and card integration', 'Predictive settlements', 'Household financial insights', 'AI anomaly detection', 'Multi household support'].map((f, i) => (
            <p key={i} className="mc-priority-item">{f}</p>
          ))}
        </div>
      </div>
      <div className="mc-deferred-note mc-a6">
        Future features assume a trust level and behavioral richness that does not exist at launch. Earn confidence with core clarity first, then expand.
      </div>
    </SlideShell>
  )
}

// ── SLIDE 9 · DESIGN OPPORTUNITIES ───────────────────────────────
function Slide9() {
  return (
    <SlideShell>
      <h1 className="mc-h1 mc-a1">Design Opportunities</h1>
      <div className="mc-divider mc-a2" />
      <div className="mc-lanes">
        {OPPORTUNITIES.map((opp, i) => (
          <div key={i} className={`mc-lane mc-a${i + 3}`}>
            <div className="mc-lane-finding">
              <p className="mc-lane-seg-label">Research Finding</p>
              <p className="mc-lane-text">{opp.finding}</p>
            </div>
            <div className="mc-lane-arrow">›</div>
            <div className="mc-lane-opp">
              <p className="mc-lane-seg-label">Opportunity</p>
              <p className="mc-lane-text">{opp.opp}</p>
            </div>
            <div className="mc-lane-arrow">›</div>
            <div className="mc-lane-feature">
              <p className="mc-lane-seg-label">Feature</p>
              <p className="mc-lane-text">{opp.feature}</p>
            </div>
          </div>
        ))}
      </div>
    </SlideShell>
  )
}

// ── SLIDE 10 · EXPERIENCE WALKTHROUGH ────────────────────────────
function Slide10() {
  const row1 = ['Sarah pays electricity', 'Uploads receipt', 'AI extracts amount', 'Assigns household', 'Split defaults to equal', 'Balance updates instantly']
  const row2 = ['Alex opens app', '"You owe Sarah $46"', 'Views bill details', 'Pays Sarah', 'Household balanced']

  return (
    <SlideShell>
      <h1 className="mc-h1 mc-a1">Experience Walkthrough</h1>
      <div className="mc-divider mc-a2" />
      <div className="mc-uf-container">
        <div className="mc-uf-person-row mc-a3">
          <p className="mc-uf-person-label">Sarah</p>
          <div className="mc-uf-steps">
            {row1.map((step, i) => (
              <>
                <div
                  key={step}
                  className="mc-uf-rect"
                  style={{ animationDelay: `${0.28 + i * 0.06}s` }}
                >
                  {step}
                </div>
                {i < row1.length - 1 && <span key={`a${i}`} className="mc-uf-arr">›</span>}
              </>
            ))}
          </div>
        </div>

        <div className="mc-uf-bridge mc-a4">
          <div className="mc-uf-bridge-line" />
          <p className="mc-uf-bridge-label">Alex receives notification</p>
          <div className="mc-uf-bridge-line" />
        </div>

        <div className="mc-uf-person-row mc-a4">
          <p className="mc-uf-person-label">Alex</p>
          <div className="mc-uf-steps">
            {row2.map((step, i) => (
              <>
                <div
                  key={step}
                  className={`mc-uf-rect ${step.includes('owe') ? 'mc-uf-rect--accent' : ''} ${step.includes('balanced') ? 'mc-uf-rect--end' : ''}`}
                  style={{ animationDelay: `${0.42 + i * 0.06}s` }}
                >
                  {step}
                </div>
                {i < row2.length - 1 && <span key={`b${i}`} className="mc-uf-arr">›</span>}
              </>
            ))}
          </div>
        </div>

        <div className="mc-uf-proto-placeholder mc-a5">
          Figma prototype animation placeholder
        </div>
      </div>
    </SlideShell>
  )
}

// ── SLIDE 11 · PROTOTYPE ──────────────────────────────────────────
function SlidePrototype() {
  return (
    <SlideShell>
      <h1 className="mc-h1 mc-a1">Prototype</h1>
      <p className="mc-sub mc-a2">
        The following prototype demonstrates the core household experience informed by research.
      </p>
      <div className="mc-figma-embed mc-a3">
        <p className="mc-figma-label">Figma Prototype Embed</p>
      </div>
      <div className="mc-prototype-cols mc-a4">
        <div>
          <p className="mc-proto-col-label">What I'd Validate</p>
          {['Reminder timing', 'Couples vs roommates', 'Receipt friction', 'Notification tone'].map((item, i) => (
            <div key={i} className="mc-validate-item">
              <span className="mc-validate-dot" />
              <span>{item}</span>
            </div>
          ))}
        </div>
        <div>
          <p className="mc-proto-col-label">Success Metrics</p>
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
      <p className="mc-closing-statement mc-af">
        Transparency isn't about showing more information. It's about showing the right information, at the moment people need confidence.
      </p>
    </SlideShell>
  )
}

// ── SLIDES ARRAY ──────────────────────────────────────────────────
const SLIDES = [
  Slide1,
  Slide2,
  Slide3,
  Slide4,
  Slide5,
  Slide6,
  Slide7,
  Slide8,
  Slide9,
  Slide10,
  SlidePrototype,
]
const ACTUAL_TOTAL = SLIDES.length

// ── MAIN COMPONENT ────────────────────────────────────────────────
export default function MastercardChallenge() {
  const [current, setCurrent] = useState(0)
  const [keys,    setKeys]    = useState(() => Array(SLIDES.length).fill(0))
  const [prevSlide, setPrev]  = useState(null)
  const [locked,  setLocked]  = useState(false)

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

  useEffect(() => {
    const h = (e) => {
      if (['ArrowDown', 'ArrowRight', ' '].includes(e.key)) { e.preventDefault(); goNext() }
      if (['ArrowUp', 'ArrowLeft'].includes(e.key)) { e.preventDefault(); goPrev() }
    }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [goNext, goPrev])

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

  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [])

  return (
    <div className="mc-shell">
      <div className="mc-progress-bar" style={{ width: `${((current + 1) / ACTUAL_TOTAL) * 100}%` }} />

      {SLIDES.map((SlideComp, i) => (
        <div
          key={i}
          className={[
            'mc-slide',
            i === current  ? 'mc-slide--active' : '',
            i === prevSlide ? 'mc-slide--prev'  : '',
          ].join(' ')}
        >
          <div key={keys[i]} className="mc-anim-root">
            <SlideComp />
          </div>
        </div>
      ))}

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

      <div className="mc-key-hint">
        <span className="mc-key">↑</span>
        <span className="mc-key">↓</span>
        <span style={{ marginLeft: 4 }}>navigate</span>
        <span style={{ marginLeft: 10, marginRight: 4 }}>·</span>
        <span className="mc-key">Space</span>
        <span style={{ marginLeft: 4 }}>advance</span>
      </div>
    </div>
  )
}
