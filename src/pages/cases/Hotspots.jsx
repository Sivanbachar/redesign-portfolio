import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useScrollReveal } from '../../hooks/useScrollReveal.js'
import { useReadingProgress } from '../../hooks/useReadingProgress.js'
import VP from '../../components/VP.jsx'

const PASSWORD = 'helloworld'

export default function Hotspots() {
  const navigate = useNavigate()
  useScrollReveal()
  const pct = useReadingProgress()

  const [unlocked, setUnlocked] = useState(() => sessionStorage.getItem('hs_unlock') === '1')
  const [pwd, setPwd] = useState('')
  const [error, setError] = useState(false)
  const gateRef = useRef(null)
  const inputRef = useRef(null)

  // Block scrolling past the gate when locked
  useEffect(() => {
    if (unlocked) return
    const onWheel = (e) => {
      if (e.deltaY <= 0) return
      const gate = gateRef.current
      if (!gate) return
      const rect = gate.getBoundingClientRect()
      if (rect.top < window.innerHeight + 60) {
        e.preventDefault()
        gate.scrollIntoView({ behavior: 'smooth', block: 'center' })
        setTimeout(() => inputRef.current?.focus(), 450)
      }
    }
    window.addEventListener('wheel', onWheel, { passive: false })
    return () => window.removeEventListener('wheel', onWheel)
  }, [unlocked])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (pwd === PASSWORD) {
      sessionStorage.setItem('hs_unlock', '1')
      setUnlocked(true)
    } else {
      setError(true)
      setPwd('')
      setTimeout(() => setError(false), 1400)
      inputRef.current?.focus()
    }
  }

  return (
    <div className="pg cs-wrap">
      <div className="progress-bar" style={{ transform: `scaleX(${pct})` }} />
      <button className="cs-back" onClick={() => navigate('/')}>← All Work</button>

      <div className="cs-hero sr">
        <p className="cs-tag">Amazon · Kindle · AI-Powered Experience · Sole Designer · 2026</p>
        <h1 className="cs-h1">Content<br />Hotspots</h1>
        <p className="cs-lead">A layered reading model that delivers contextual knowledge on demand without interrupting the act of reading.</p>
      </div>

      <div className="cs-meta-row">
        {[
          ['Role', 'Sole Designer\nConcept Originator'],
          ['Platform', 'Kindle iOS & Android\nE-ink'],
          ['Technology', 'AI-Powered\nOn-device + cloud inference'],
          ['Scope', 'Concept → Beta\nMulti-tranche experiment'],
        ].map(([l, v]) => (
          <div className="cs-meta-cell sr" key={l}>
            <p className="cs-meta-label">{l}</p>
            <p className="cs-meta-val">{v}</p>
          </div>
        ))}
      </div>

      <div className="cs-body">

        {/* ── Always visible: first section ── */}
        <div className="cs-section sr">
          <VP label="Kindle UI" desc="[Replace with Kindle UI screenshot]" height={480} />
        </div>

        {/* ── Password gate ── */}
        {!unlocked && (
          <div ref={gateRef} className="hs-gate">
            <div className="hs-gate-fade" />
            <div className="hs-gate-card">
              <div className="hs-gate-lock">
                <svg width="18" height="22" viewBox="0 0 18 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="1" y="9" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M4 9V6a5 5 0 0110 0v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  <circle cx="9" cy="15" r="1.5" fill="currentColor"/>
                </svg>
              </div>
              <p className="hs-gate-title">Password protected</p>
              <p className="hs-gate-sub">This case study requires a password to continue</p>
              <form onSubmit={handleSubmit} className="hs-gate-form">
                <input
                  ref={inputRef}
                  type="password"
                  value={pwd}
                  onChange={(e) => { setPwd(e.target.value); setError(false) }}
                  placeholder="Enter password"
                  className={`hs-gate-input${error ? ' err' : ''}`}
                  autoComplete="off"
                />
                <button type="submit" className="btn-white hs-gate-btn">
                  Unlock →
                </button>
              </form>
              {error && <p className="hs-gate-error">Incorrect password. Try again.</p>}
            </div>
          </div>
        )}

        {/* ── Locked content hidden until unlocked ── */}
        {unlocked && <>

          {/* CONTEXT */}
          <div className="cs-section">
            <span className="cs-section-label sr">Context</span>
            <h2 className="cs-h2 sr">The content existed.<br />The delivery model failed.</h2>
            <div className="cs-2col">
              <div>
                <p className="cs-p sr">Kindle had spent years building supplemental content, X-Ray, Dictionary, Wikipedia, translations. The investment was real. The engagement wasn't.</p>
                <p className="cs-p sr">Only a fraction of readers actively used these features. The problem wasn't what was available. It was how, and when it surfaced.</p>
                <p className="cs-p sr">Readers were leaving Kindle mid session to search externally. The content existed inside the product, but the interaction model couldn't bridge the gap.</p>
              </div>
              <div>
                <p className="cs-p sr">This project originated as part of a three year product vision for the reading experience. It didn't get prioritized the first time. Two years later, AI made it viable, and the gap in reader behavior made it urgent.</p>
                <div className="cs-callout sr">
                  <p>The root cause was structural: Kindle's supplemental features operated on a pull model. Readers had to know features existed, remember to use them, and navigate to find them. That friction was invisible in product reviews and catastrophic in real behavior.</p>
                </div>
              </div>
            </div>
          </div>

          {/* PROBLEM */}
          <div className="cs-section">
            <span className="cs-section-label sr">Problem</span>
            <h2 className="cs-h2 sr">A discoverability and delivery problem,<br />not a content problem.</h2>
            <p className="cs-p sr">Supplemental content was difficult to discover, fragmented across inconsistent interaction patterns, buried in menus, and entirely disconnected from reading position. The features weren't broken. The model was.</p>
            <div className="cs-finding-grid sr">
              {[
                { tag: 'Symptom', h: 'Low feature engagement', b: 'High value tools, X-Ray, Dictionary, Wikipedia, used by a small percentage of readers despite being available on every page.' },
                { tag: 'Symptom', h: 'External abandonment', b: 'Readers leaving Kindle mid session to search Google or ChatGPT, a direct signal that in product discovery was failing.' },
                { tag: 'Symptom', h: 'Inconsistent patterns', b: 'Each supplemental feature had its own entry point, menu placement, and interaction model. No unified layer. No coherent system.' },
              ].map(({ tag, h, b }) => (
                <div className="cs-finding sr" key={h}>
                  <span className="cs-finding-tag">{tag}</span>
                  <p className="cs-finding-headline">{h}</p>
                  <p className="cs-finding-body">{b}</p>
                </div>
              ))}
            </div>
            <div className="cs-callout sr" style={{ marginTop: 28 }}>
              <p><strong>How might we</strong> deliver relevant, contextual information within the reading experience in a way that enhances understanding without disrupting the act of reading?</p>
            </div>
          </div>

          {/* STRATEGY */}
          <div className="cs-section">
            <span className="cs-section-label sr">Strategy</span>
            <h2 className="cs-h2 sr">Framework over feature.</h2>
            <div className="cs-2col">
              <div>
                <p className="cs-p sr">The temptation was to fix the specific underperforming features. Better X-Ray. A smarter dictionary. That approach would have produced incremental improvements to a broken model.</p>
                <p className="cs-p sr">The real opportunity was structural: replace the pull model entirely. Build a unified delivery layer that makes contextual content findable without requiring the reader to look for it.</p>
              </div>
              <div>
                {[
                  { tag: 'Unified delivery layer', b: 'One interaction model for all supplemental content types, characters, places, terms and annotations. Learnable once. Extensible indefinitely.' },
                  { tag: 'Push over pull', b: 'Surface content based on what the reader is currently reading, not where they navigate. Remove the discovery cost entirely.' },
                  { tag: 'Reading first constraint', b: 'Any design that breaks reading continuity fails regardless of content quality. The reading experience is the primary product. Everything else is secondary.' },
                ].map(({ tag, b }) => (
                  <div key={tag} style={{ padding: '20px 0', borderTop: '1px solid var(--bdr)' }}>
                    <p style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--txt3)', marginBottom: 10 }}>{tag}</p>
                    <p className="cs-p" style={{ marginBottom: 0 }}>{b}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* KEY DECISIONS */}
          <div className="cs-section">
            <span className="cs-section-label sr">Key Decisions</span>
            <h2 className="cs-h2 sr">Four decision points that shaped the product.</h2>
            {[
              { n: '01', h: 'Toggle model: opt in by default', p1: 'Hotspots launches in an off state. Readers activate it. This removed the most significant objection: that push content would feel intrusive.', p2: 'The opt in model also provided a clean signal for engagement analysis. Every activation was an intentional choice, not an accidental interaction.' },
              { n: '02', h: 'Bottom sheet over overlay', p1: 'Competing directions included a floating overlay anchored near the tapped entity. The bottom sheet was chosen because it preserves the full reading surface, the text remains visible and in context while the card is open.', p2: 'This also aligned with established platform patterns on iOS and Android, reducing the cognitive load of learning a new interaction.' },
              { n: '03', h: 'Smart entity selection, not highlight everything', p1: 'Early prototypes marked every recognizable entity in the text. The reading surface looked annotated, not layered. The quality bar shifted from coverage to relevance.', p2: 'The placement engine was redesigned to surface 2 to 4 hotspots per page, those most likely to benefit comprehension without fragmenting attention.' },
              { n: '04', h: 'Reader controlled density', p1: 'Beyond the global toggle, readers can long press any hotspot to suppress that entity type across the book. Character fatigue is real. The control is local and persistent.', p2: 'This extended the trust model: the product earns its place on the reading surface session by session, not by default.' },
            ].map(({ n, h, p1, p2 }) => (
              <div className="sr" key={n} style={{ padding: '40px 0', borderTop: '1px solid var(--bdr)' }}>
                <div style={{ display: 'flex', gap: 40, alignItems: 'flex-start' }}>
                  <p className="cs-num" style={{ flexShrink: 0, minWidth: 40 }}>{n}</p>
                  <div style={{ flex: 1 }}>
                    <h3 className="cs-h3" style={{ marginBottom: 20 }}>{h}</h3>
                    <div className="cs-2col" style={{ gap: 32 }}>
                      <p className="cs-p" style={{ marginBottom: 0 }}>{p1}</p>
                      <p className="cs-p" style={{ marginBottom: 0 }}>{p2}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* TRADEOFFS */}
          <div className="cs-section">
            <span className="cs-section-label sr">Tradeoffs</span>
            <h2 className="cs-h2 sr">What we chose not to do.</h2>
            <div className="cs-2col">
              <div>
                <p className="cs-p sr">The opt in model meant lower initial activation rates. A push by default approach would have inflated early engagement numbers and almost certainly generated complaints about intrusion that would have killed the feature before it could prove its value.</p>
                <p className="cs-p sr">Lower initial numbers were the correct tradeoff for long-term trust.</p>
              </div>
              <div>
                <p className="cs-p sr">We also chose not to include AI generated content in the MLP. The model could absorb it that was the architectural bet but validating delivery behavior before introducing content quality variables was the disciplined path.</p>
                <div className="cs-callout sr"><p>Phase 1 proved the interaction. Phase 2 proved the content. The sequencing was intentional.</p></div>
              </div>
            </div>
          </div>

          {/* EXPLORATION */}
          <div className="cs-section">
            <span className="cs-section-label">Exploration</span>
            <h2 className="cs-h2 sr">Multiple strong directions. One constraint.</h2>
            <p className="cs-p sr">The constraint that eliminated most directions: any solution that requires the reader to leave the reading surface fails. That ruled out panels, modals and menu based access before they reached hi fi.</p>
            <div className="cs-insight sr">
              <span className="cs-insight-label">Design Principle</span>
              <p className="cs-insight-text">Features should exist within reading, not alongside it.</p>
            </div>
            <div className="cs-2col">
              <div>
                <p className="cs-p sr">The design breakthrough wasn't a UI solution it was a reframe. Every direction we'd explored placed supplemental content adjacent to reading. A panel. A menu. A button. All of them asked the reader to leave the text.</p>
                <p className="cs-p sr">The layered model treated the text itself as the interface. Hotspots live inside the reading surface. Content emerges from the words not from chrome around them. Readers never leave the page.</p>
              </div>
              <div>
                {[
                  ['01', 'The reading experience is the primary product. Supplemental content is a guest.'],
                  ['02', "Discoverability that requires effort isn't discoverability."],
                  ['03', 'Trust is earned per session. The off-state must be as considered as the on-state.'],
                ].map(([n, t]) => (
                  <div key={n} className="sr" style={{ display: 'flex', gap: 20, padding: '16px 0', borderTop: '1px solid var(--bdr)' }}>
                    <p className="cs-num" style={{ flexShrink: 0, fontSize: 12 }}>{n}</p>
                    <p className="cs-p" style={{ marginBottom: 0 }}>{t}</p>
                  </div>
                ))}
              </div>
            </div>
            <VP label="Exploration Rejected Directions" desc="Grid of rejected direction sketches: floating overlay, side panel, menu-based access. Annotations showing why each fails the reading-continuity constraint." height={360} />
          </div>

          {/* SOLUTION */}
          <div className="cs-section">
            <span className="cs-section-label sr">Solution</span>
            <h2 className="cs-h2 sr">The layered reading model.</h2>
            <p className="cs-p sr">Hotspots surfaces contextual content without changing the reading surface. Readers activate a single toggle. Inline markers appear on relevant entities characters, places, key terms. A tap opens a bottom sheet. The text stays visible. One dismiss returns the reader to their exact position.</p>
            <VP label="Hotspots Reading Surface" desc="Kindle reading page with inline hotspot markers visible on 2-3 entities. Shows the toggle pill in the reading corner in the on state." height={440} />
            <div className="cs-decision-grid sr" style={{ marginTop: 40 }}>
              {[
                ['01 Toggle on', 'Reader activates Hotspots via the toggle pill in the reading corner. The surface shifts inline markers appear on 2 to 4 entities per screen.'],
                ['02 Tap a hotspot', 'Reader taps a marked entity. A bottom sheet rises over the lower portion of the reading page. Text above remains visible and in position.'],
                ['03 Read the card', 'Card displays entity summary, type (character / place / term), and relevant context. Navigation to related entities is available within the card.'],
                ['04 Return to page', 'Reader dismisses the sheet. Reading surface restores to the exact position. No scroll reset. No context loss. Reading continues.'],
              ].map(([h, d]) => (
                <div className="cs-decision-cell" key={h}>
                  <p className="cs-num">{h.split('|')[0]}</p>
                  <h3 className="cs-h3">{h.split('|')[1]}</h3>
                  <p className="cs-p" style={{ maxWidth: 'none', fontSize: 14, marginBottom: 0 }}>{d}</p>
                </div>
              ))}
            </div>
          </div>

          {/* SYSTEM IMPACT */}
          <div className="cs-section">
            <span className="cs-section-label sr">System Impact</span>
            <h2 className="cs-h2 sr">One model. Platform wide implications.</h2>
            <p className="cs-p sr">Hotspots wasn't just a feature, it established the architecture for how in reading features behave. The placement engine, rendering layer, and tracking infrastructure became reusable across content types. New content no longer needs a new interaction pattern. It inherits the framework.</p>
            <div className="cs-finding-grid two-col sr" style={{ marginTop: 32 }}>
              {[
                { tag: 'Scalability', b: 'Placement, rendering, and engagement tracking shared across all supplemental content types. Engineering cost per new content type dropped significantly.' },
                { tag: 'Unified interaction', b: 'Characters, places, terms, author annotations all accessible through a single learnable gesture. One tap. One card. One dismiss.' },
                { tag: 'AI integration', b: 'The framework was designed to ingest AI generated content from day one. Hotspots set the delivery surface. AI enriches the payload over time.' },
                { tag: 'Feature to system shift', b: 'Hotspots changed how the team thinks about building on Kindle. The question shifted from which feature to does this extend the framework.' },
              ].map(({ tag, b }) => (
                <div className="cs-finding" key={tag}>
                  <span className="cs-finding-tag">{tag}</span>
                  <p className="cs-finding-body">{b}</p>
                </div>
              ))}
            </div>
          </div>

          {/* METRICS */}
          <div className="cs-section">
            <span className="cs-section-label sr">Metrics &amp; Validation</span>
            <h2 className="cs-h2 sr">Defined success before building.<br />Measured what mattered.</h2>
            <p className="cs-p sr">The experiment was designed to validate one question above all others: does push based delivery improve engagement without degrading the reading experience? That guardrail shaped every metric we tracked.</p>
            <div className="cs-3col sr" style={{ marginTop: 32, gap: 1, border: '1px solid var(--bdr)', borderRadius: 4, overflow: 'hidden' }}>
              {[
                { label: 'Behavioral', items: ['Discovery rate: did readers find hotspots?', 'Sustained engagement: repeat interactions per session', 'Repeat usage: return rate across sessions', 'Opt out rate: trust signal for the model', 'Time spent on content card'] },
                { label: 'Content Quality', items: ['Entity recognition precision / recall', 'Summary faithfulness', 'Comprehensiveness score', 'Spoiler avoidance rate', 'Coverage across book catalog'] },
                { label: 'Guardrails', items: ['Reading session duration: must not decrease', 'Pages per session: core reading health', 'Book completion rate: long term retention signal'] },
              ].map(({ label, items }) => (
                <div key={label} style={{ padding: '28px 24px', background: 'var(--bg1)', borderRight: '1px solid var(--bdr)' }}>
                  <p style={{ fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--txt3)', marginBottom: 20 }}>{label}</p>
                  {items.map((item) => (
                    <p key={item} style={{ fontSize: 13, color: 'var(--txt2)', lineHeight: 1.6, paddingTop: 10, borderTop: '1px solid var(--bdr)', marginBottom: 0 }}>{item}</p>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* OUTCOME */}
          <div className="cs-section">
            <span className="cs-section-label sr">Outcome</span>
            <h2 className="cs-h2 sr">A new model.<br />Not just a new feature.</h2>
            <div className="cs-2col">
              <div>
                <p className="cs-p sr">Hotspots validated that push based content delivery improves engagement without degrading reading. The interaction model proved learnable, the content surface proved trustworthy, and the guardrails held.</p>
                <p className="cs-p sr">More durably: it shifted Kindle's product thinking. Features that previously lived outside the reading experience now had a path inside it. The framework created an integration surface that subsequent teams inherited rather than rebuilt.</p>
                <p className="cs-p sr">The work is ongoing. The MLP was designed to be expanded. AI powered content generation, personalized entity selection, and author contributed annotations are all paths the framework can absorb. The model was built for it.</p>
              </div>
              <div>
                <div className="cs-outcome-row sr" style={{ flexDirection: 'column' }}>
                  {[
                    ['Experiment type', 'Multi tranche beta · Holdout design'],
                    ['Success signal', 'Engagement ↑ · Reading duration stable'],
                    ['Product outcome', 'MLP shipped · Framework adopted by subsequent features'],
                    ['Design role', 'Concept to beta · Sole designer'],
                  ].map(([l, v]) => (
                    <div className="cs-outcome-cell" key={l} style={{ borderRight: 'none', borderBottom: '1px solid var(--bdr)' }}>
                      <p className="cs-outcome-label">{l}</p>
                      <p className="cs-outcome-val">{v}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </>}
      </div>

      <footer className="footer" style={{ marginTop: 80 }}>
        <button className="cs-back" style={{ padding: 0 }} onClick={() => navigate('/')}>← All Work</button>
        <button className="nav-btn" onClick={() => navigate('/projects/bookpins')}>Next: Book Pins →</button>
      </footer>
    </div>
  )
}
