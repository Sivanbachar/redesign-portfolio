import { useState, useEffect, useCallback, useRef, useContext, createContext, useMemo } from 'react'
import '../styles/mastercard.css'

// ── VIEWER CONTEXT ────────────────────────────────────────────────
const ViewerContext = createContext('')
const SlideIndexContext = createContext(0)

// ── TYPEWRITER HOOK ───────────────────────────────────────────────
function useTypewriter(text, speed = 32, delay = 600) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)
  useEffect(() => {
    setDisplayed('')
    setDone(false)
    let i = 0
    const timeout = setTimeout(() => {
      const iv = setInterval(() => {
        i++
        setDisplayed(text.slice(0, i))
        if (i >= text.length) { clearInterval(iv); setDone(true) }
      }, speed)
      return () => clearInterval(iv)
    }, delay)
    return () => clearTimeout(timeout)
  }, [text, speed, delay])
  return { displayed, done }
}

// ── NAME ENTRY GATE ───────────────────────────────────────────────
function NameEntry({ onSubmit }) {
  const [name, setName] = useState('')
  const handle = (e) => {
    e.preventDefault()
    if (name.trim()) onSubmit(name.trim())
  }
  return (
    <div className="mc-shell">
      <div className="mc-entry-wrap">
        <p className="mc-badge mc-a0">Mastercard · Design Challenge · 2026</p>
        <h1 className="mc-entry-heading mc-a1">Before we begin</h1>
        <form className="mc-entry-form mc-a2" onSubmit={handle}>
          <p className="mc-entry-prompt">What's your name?</p>
          <div className="mc-entry-row">
            <input
              className="mc-entry-input"
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Your name"
              autoFocus
            />
            <button className="mc-entry-btn" type="submit" disabled={!name.trim()}>
              Let's go →
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

// ── SLIDE 0 · GREETING ────────────────────────────────────────────
function SlideGreeting() {
  const name = useContext(ViewerContext)
  const text = `Hi ${name}, welcome to my Mastercard design challenge. It's really great to have you here.`
  const { displayed, done } = useTypewriter(text, 30, 600)
  return (
    <SlideShell>
      <div className="mc-greeting-wrap">
        <p className="mc-greeting-text">
          {displayed}
          <span className={`mc-cursor${done ? ' mc-cursor--done' : ''}`}>|</span>
        </p>
        {done && (
          <p className="mc-greeting-continue mc-af">Press Space or ↓ to begin</p>
        )}
      </div>
    </SlideShell>
  )
}

// ── DATA ──────────────────────────────────────────────────────────

const DAYS = [
  { day: 'Day 1', label: 'Understanding\nPeople', desc: 'User forums, App Store reviews, Reddit threads, Trustpilot' },
  { day: 'Day 2', label: 'Competitive\nAnalysis', desc: 'Splitwise, Venmo, Tricount, Honeydue, Copilot Money' },
  { day: 'Day 3', label: 'Designing and\nPrioritizing', desc: 'Concepts tested against core user needs, one direction forward' },
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
  const index = useContext(SlideIndexContext)
  const phase = SLIDE_PHASES[index]
  return (
    <>
      <div className="mc-meta mc-a0">
        <p className="mc-badge">Mastercard · Design Challenge · 2026</p>
        {phase && <span className="mc-phase-badge">{phase}</span>}
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
        <p className="mc-prompt mc-a3">
          "Design a digital experience that helps people who share frequent day to day expenses with others (roommates or a partner) and track and manage these costs with clarity."
        </p>
        <div className="mc-meta-row mc-a4">
          <div className="mc-meta-item">
            <span className="mc-meta-key">Timeline</span>
            <span className="mc-meta-val">3 days · Solo designer</span>
          </div>
          <div className="mc-meta-item">
            <span className="mc-meta-key">Deliverables</span>
            <span className="mc-meta-val">End to end UX · Research · Strategy · Prototype</span>
          </div>
        </div>
        <div className="mc-callout mc-a5">
          <span className="mc-callout-label">Design Goal</span>
          <p className="mc-callout-text">Create a shared expense experience that helps people understand where they stand financially, without creating more work or awkward conversations.</p>
        </div>
      </div>
    </SlideShell>
  )
}

// ── SLIDE 2 · UNDERSTANDING THE CHALLENGE ────────────────────────
function Slide2() {
  return (
    <SlideShell>
      <h1 className="mc-h1 mc-a1">Understanding the Challenge</h1>
      <div className="mc-divider mc-a2" />
      <div className="mc-problem-stack mc-a3">
        <p className="mc-problem-setup">Managing shared expenses isn't just a payment problem.</p>
        <p className="mc-problem-punchline" style={{ margin: 0 }}>It's a confidence problem.</p>
        <p className="mc-problem-body-p">
          When people share expenses, they're not just tracking who owes whom. They're trying to maintain a shared understanding of what actually happened.
        </p>
        <p className="mc-problem-body-p mc-problem-body-p--evidence">
          Across community discussions and app reviews, users consistently described uncertainty around missing expenses, forgotten recurring bills, edits made after the fact, and contributions submitted without supporting evidence. These moments force people to mentally reconstruct transactions, double-check balances, or rely on conversations outside the app.
        </p>
        <p className="mc-problem-reveal" style={{ margin: 0 }}>
          The resulting friction isn't caused by the calculations themselves. It's caused by the confidence required to believe the record is complete, accurate, and fair.
        </p>
        <p className="mc-problem-tension" style={{ margin: 0 }}>
          Every forgotten receipt. Every unexplained expense. Every manual correction. Every follow-up message asking, "Does this look right?" is a small signal that the system still depends on human bookkeeping rather than shared confidence.
        </p>
      </div>
      <div className="mc-spine-callout mc-a5">
        <span className="mc-spine-label">The Opportunity</span>
        <p className="mc-spine-text">
          The opportunity isn't simply to help people split expenses more accurately. It's to reduce the cognitive and social burden of managing shared finances by helping people{' '}
          <em>trust the record from the start</em>.
        </p>
      </div>
    </SlideShell>
  )
}

// ── SLIDE 3 · HOW I SPENT THREE DAYS ─────────────────────────────
function Slide3() {
  return (
    <SlideShell>
      <h1 className="mc-h1 mc-a1">How I Spent Three Days</h1>
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
          Given the three day timeline, secondary research and competitive analysis allowed rapid understanding of both user behavior and current market approaches before designing anything.
        </p>
      </div>
    </SlideShell>
  )
}

// ── SLIDE 4 · USER RESEARCH ───────────────────────────────────────
function Slide4() {
  return (
    <SlideShell>
      <h1 className="mc-h1 mc-a1">User Research</h1>
      <div className="mc-divider mc-a2" />
      <div className="mc-research-full mc-a3">
        <div className="mc-research-approach-row">
          <div className="mc-research-approach-left">
            <p className="mc-approach-method-label">Approach</p>
            <p className="mc-approach-intro">
              I focused on secondary research to map existing user sentiment at scale, reading across App Store reviews, Reddit communities, Trustpilot, and product forums. I wasn't starting with a hypothesis. I wanted to understand why the problem persisted despite a crowded market of tools already trying to solve it.
            </p>
          </div>
          <div className="mc-research-approach-right">
            <p className="mc-approach-method-label">Sources</p>
            <div className="mc-source-tags mc-source-tags--stacked">
              {['App Store Reviews', 'Reddit', 'Trustpilot', 'Product Forums', 'User Blogs'].map(s => (
                <span key={s} className="mc-source-tag">{s}</span>
              ))}
            </div>
          </div>
        </div>
        <div className="mc-obs-rule" />
        <p className="mc-obs-label mc-a4">Three things came up across every product and every community</p>
        <div className="mc-obs-three mc-a4">
          {OBSERVATIONS.map((obs, i) => (
            <div key={i} className="mc-obs-card">
              <span className="mc-obs-dot" />
              <span>{obs}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="mc-research-takeaway mc-a5">
        <span className="mc-rt-key">Research Takeaway</span>
        <p className="mc-rt-text">People weren't questioning the math. They were questioning whether the record was complete, whether the system was working for both of them equally, and whether what they owed was actually fair.</p>
      </div>
    </SlideShell>
  )
}

// ── SLIDE 5 · COMPETITIVE LANDSCAPE ──────────────────────────────
const COMP_SCREENS = [
  { name: 'Splitwise', file: 'splitwise.png' },
  { name: 'Venmo',     file: 'venmo.png' },
  { name: 'Tricount',  file: 'tricount.webp' },
  { name: 'Honeydue',  file: 'honeydue.png' },
  { name: 'Copilot',   file: 'copilot.png' },
]

function Slide5() {
  return (
    <SlideShell>
      <h1 className="mc-h1 mc-a1">Competitive Landscape</h1>
      <div className="mc-comp-layout mc-a2">
        <div className="mc-comp-screens">
          {COMP_SCREENS.map((app, i) => (
            <div key={app.name} className="mc-comp-screen-col" style={{ animationDelay: `${0.28 + i * 0.06}s` }}>
              <div className="mc-comp-screen-frame">
                <img
                  src={`/images/challenge/comp/${app.file}`}
                  alt={app.name}
                  className="mc-comp-screen-img"
                  onError={e => { e.target.style.display = 'none'; e.target.parentElement.setAttribute('data-empty', '1') }}
                />
              </div>
              <p className="mc-comp-screen-label">{app.name}</p>
            </div>
          ))}
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
      </div>
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
        <div className="mc-shift-text mc-a2">
          <p className="mc-shift-statement">
            Research changed the product I thought I was designing.
          </p>
          <p className="mc-shift-bridge-context">Confidence in the record, accountability for who added what, and the social burden of asking for money — these weren't tracker problems. They were relationship problems.</p>
          <p className="mc-shift-bridge">Instead of another expense tracker...</p>
          <p className="mc-shift-result">
            I designed a shared <span>financial dashboard</span>.
          </p>
        </div>
        <div className="mc-shift-visual mc-a3">
          <img
            src="/images/toolbar/the_shift_slide.png"
            alt="Shared Financial Dashboard"
            className="mc-shift-img"
          />
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
      <div className="mc-principles-list">
        {PRINCIPLES.map((p, i) => (
          <div key={i} className={`mc-principle-item mc-a${i + 3}`}>
            <span className="mc-principle-num">0{i + 1}</span>
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
            {row1.flatMap((step, i) => [
              <div
                key={step}
                className="mc-uf-rect"
                style={{ animationDelay: `${0.28 + i * 0.06}s` }}
              >
                {step}
              </div>,
              i < row1.length - 1 && <span key={`a${i}`} className="mc-uf-connector" />,
            ])}
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
            {row2.flatMap((step, i) => [
              <div
                key={step}
                className={`mc-uf-rect ${step.includes('owe') ? 'mc-uf-rect--accent' : ''} ${step.includes('balanced') ? 'mc-uf-rect--end' : ''}`}
                style={{ animationDelay: `${0.42 + i * 0.06}s` }}
              >
                {step}
              </div>,
              i < row2.length - 1 && <span key={`b${i}`} className="mc-uf-connector" />,
            ])}
          </div>
        </div>

      </div>
    </SlideShell>
  )
}

// ── SLIDE 11 · PROTOTYPE ──────────────────────────────────────────
const USER_FLOWS = [
  { n: '01', label: 'View household' },
  { n: '02', label: 'View expense' },
  { n: '03', label: 'Create new expense' },
  { n: '04', label: 'Review monthly expenses (fixed)' },
]

function SlidePrototype() {
  return (
    <SlideShell>
      <div className="mc-proto-layout">
        {/* LEFT: flows to test */}
        <div className="mc-proto-left">
          <h1 className="mc-h1 mc-a1">Prototype</h1>
          <p className="mc-proto-col-label mc-a2" style={{ marginBottom: 20 }}>User flows to test</p>
          <div className="mc-flow-list">
            {USER_FLOWS.map((f, i) => (
              <div key={i} className={`mc-flow-item mc-a${i + 3}`}>
                <span className="mc-flow-num">{f.n}</span>
                <span className="mc-flow-label">{f.label}</span>
              </div>
            ))}
          </div>
        </div>
        {/* RIGHT: phone frame + interactive hint below */}
        <div className="mc-proto-right">
          <div className="mc-phone-frame">
            <iframe
              src="https://wagon-source-57534990.figma.site"
              className="mc-proto-iframe"
              allowFullScreen
              allow="fullscreen"
              title="Mastercard Household Expense Prototype"
            />
          </div>
          <div className="mc-proto-interactive-hint mc-a5">
            <span className="mc-proto-pulse-dot" />
            Interactive · tap &amp; scroll to explore
          </div>
        </div>
      </div>
    </SlideShell>
  )
}

// ── SLIDE 12 · VALIDATE & METRICS ─────────────────────────────────
function SlideValidate() {
  return (
    <SlideShell>
      <h1 className="mc-h1 mc-a1">What I'd Do Next</h1>
      <div className="mc-divider mc-a2" />
      <div className="mc-prototype-cols mc-a3">
        <div>
          <p className="mc-proto-col-label">Areas to Test</p>
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
                  <td style={{ fontFamily: 'var(--mc-mono)', fontSize: '13px', color: 'var(--mc-txt-m)' }}>{m.type}</td>
                  <td style={{ color: 'var(--mc-accent)', fontStyle: 'italic' }}>{m.target}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <p className="mc-closing-statement mc-a4">
        The goal was never transparency for its own sake. It was confidence — a record both people can look at and say, without hesitation, "this is right."
      </p>
    </SlideShell>
  )
}

// ── SLIDE 13 · THANK YOU ──────────────────────────────────────────
function SlideThankYou() {
  const name = useContext(ViewerContext)
  return (
    <SlideShell>
      <div className="mc-ty-layout">
        <h1 className="mc-ty-heading mc-a1">{name ? `Thank you, ${name}.` : 'Thank you.'}</h1>
        <div className="mc-ty-profile mc-a2">
          <img
            src="/images/resume/profile.png"
            alt="Sivan Baum"
            className="mc-ty-avatar"
          />
          <div className="mc-ty-info">
            <p className="mc-ty-name">Sivan Baum</p>
            <p className="mc-ty-role">Senior Product Designer</p>
            <a
              href="https://builtbysivan.com"
              className="mc-ty-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              builtbysivan.com ↗
            </a>
          </div>
        </div>
      </div>
    </SlideShell>
  )
}

// ── SLIDES ARRAY (greeting prepended dynamically in component) ────
const SLIDES_BASE = [
  SlideGreeting,
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
  SlideValidate,
  SlideThankYou,
]

const SLIDE_NAMES = [
  'Welcome',
  'The Challenge',
  'Understanding the Challenge',
  'How I Spent Three Days',
  'User Research',
  'Competitive Landscape',
  'The Shift',
  'Product Principles',
  'Prioritization',
  'Design Opportunities',
  'Experience Walkthrough',
  'Prototype',
  "What I'd Do Next",
  'Thank You',
]

const SLIDE_PHASES = [
  null,          // 0  Welcome
  null,          // 1  The Challenge
  'Discovery',   // 2  Understanding the Problem
  'Discovery',   // 3  How I Spent Three Days
  'Research',    // 4  User Research
  'Research',    // 5  Competitive Landscape
  'Exploration', // 6  The Shift
  'Exploration', // 7  Product Principles
  'Exploration', // 8  Prioritization
  'Exploration', // 9  Design Opportunities
  'Design',      // 10 Experience Walkthrough
  'Design',      // 11 Prototype
  "What's Next", // 12 What I'd Validate
  null,          // 13 Thank You
]

// ── SLIDE TOC ─────────────────────────────────────────────────────
function SlideTOC({ current, goTo, open, setOpen }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [setOpen])

  return (
    <>
      {/* Toggle button — bottom left */}
      <button
        onClick={() => setOpen(o => !o)}
        className="mc-toc-btn"
        aria-label="Slide navigation"
      >
        <svg width="17" height="13" viewBox="0 0 17 13" fill="none">
          <circle cx="1.5" cy="1.5"  r="1.5" fill="currentColor" fillOpacity="0.65"/>
          <rect   x="5"   y="0.75"  width="12" height="1.5" rx="0.75" fill="currentColor" fillOpacity="0.4"/>
          <circle cx="1.5" cy="6.5"  r="1.5" fill="currentColor" fillOpacity="0.65"/>
          <rect   x="5"   y="5.75"  width="12" height="1.5" rx="0.75" fill="currentColor" fillOpacity="0.4"/>
          <circle cx="1.5" cy="11.5" r="1.5" fill="currentColor" fillOpacity="0.65"/>
          <rect   x="5"   y="10.75" width="12" height="1.5" rx="0.75" fill="currentColor" fillOpacity="0.4"/>
        </svg>
      </button>

      {/* Backdrop */}
      <div
        onClick={() => setOpen(false)}
        className={`mc-toc-backdrop${open ? ' mc-toc-backdrop--open' : ''}`}
      />

      {/* Slide-out panel */}
      <nav className={`mc-toc-panel${open ? ' mc-toc-panel--open' : ''}`}>
        <p className="mc-toc-header">Slides</p>
        {SLIDE_NAMES.map((name, i) => {
          const isActive = i === current
          const phase = SLIDE_PHASES[i]
          return (
            <button
              key={i}
              onClick={() => { goTo(i); setOpen(false) }}
              className={`mc-toc-item${isActive ? ' mc-toc-item--active' : ''}`}
            >
              <span className={`mc-toc-dot${isActive ? ' mc-toc-dot--active' : ''}`} />
              <span className="mc-toc-num">{String(i + 1).padStart(2, '0')}</span>
              <span className="mc-toc-label">{name}</span>
              {phase && <span className="mc-toc-phase">{phase}</span>}
            </button>
          )
        })}
      </nav>
    </>
  )
}

// ── MAIN COMPONENT ────────────────────────────────────────────────
export default function MastercardChallenge() {
  const [viewerName, setViewerName] = useState(() => {
    try { return localStorage.getItem('mc-viewer-name') || '' } catch { return '' }
  })
  const [current,    setCurrent]    = useState(0)
  const [keys,       setKeys]       = useState(() => Array(SLIDES_BASE.length).fill(0))
  const [prevSlide,  setPrev]       = useState(null)
  const [locked,     setLocked]     = useState(false)
  const tocOpenRef = useRef(false)
  const [tocOpen,  setTocOpenState] = useState(false)
  const setTocOpen = useCallback((v) => {
    const next = typeof v === 'function' ? v(tocOpenRef.current) : v
    tocOpenRef.current = next
    setTocOpenState(next)
  }, [])

  const TOTAL = SLIDES_BASE.length

  const goTo = useCallback((idx) => {
    if (idx < 0 || idx >= TOTAL || locked) return
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
      if (tocOpenRef.current) return
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
      if (tocOpenRef.current || wheelCooldown.current) return
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
      if (tocOpenRef.current) { touchStart.current = null; return }
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

  const handleNameSubmit = useCallback((name) => {
    try { localStorage.setItem('mc-viewer-name', name) } catch {}
    setViewerName(name)
  }, [])

  if (!viewerName) return <NameEntry onSubmit={handleNameSubmit} />

  return (
    <SlideIndexContext.Provider value={current}>
    <ViewerContext.Provider value={viewerName}>
    <div className="mc-shell">
      <div className="mc-progress-bar" style={{ width: `${((current + 1) / TOTAL) * 100}%` }} />

      {SLIDES_BASE.map((SlideComp, i) => (
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
        {SLIDES_BASE.map((_, i) => (
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

      <SlideTOC current={current} goTo={goTo} open={tocOpen} setOpen={setTocOpen} />
    </div>
    </ViewerContext.Provider>
    </SlideIndexContext.Provider>
  )
}
