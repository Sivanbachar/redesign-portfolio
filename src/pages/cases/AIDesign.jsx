import { useNavigate } from 'react-router-dom'
import { useScrollReveal } from '../../hooks/useScrollReveal.js'
import { useReadingProgress } from '../../hooks/useReadingProgress.js'

export default function AIDesign() {
  const navigate = useNavigate()
  useScrollReveal()
  const pct = useReadingProgress()

  return (
    <div className="pg cs-wrap">
      <div className="progress-bar" style={{ transform: `scaleX(${pct})` }} />
      <button className="cs-back" onClick={() => navigate('/')}>← All Work</button>

      {/* ── HERO ── */}
      <div className="cs-hero sr">
        <p className="cs-tag">Amazon · Kindle · Swift Shift · 2019 to Present</p>
        <h1 className="cs-h1">Designing with AI</h1>
        <p className="cs-subtitle sr">Three projects where automated or intelligent systems were central to how the product worked.</p>
        <p className="cs-lead">Swift Shift used rules-based automation to coordinate healthcare shift coverage. Kindle natural language search let readers find books and passages by describing what they remembered. Contextual Layers surfaced relevant information inline while reading. In each case, the design challenge was figuring out how to make the system useful in the context the user was already in.</p>
      </div>

      <div className="cs-meta-row">
        {[
          ['Companies', 'Amazon · Kindle\nSwift Shift'],
          ['Surfaces', 'iOS · Android\nDesktop Web · E-ink'],
          ['Interaction types', 'Automated messaging\nNL Search · Inline context'],
          ['Scope', '3 Products\n2019 to Present'],
        ].map(([l, v]) => (
          <div className="cs-meta-cell sr" key={l}>
            <p className="cs-meta-label">{l}</p>
            <p className="cs-meta-val">{v}</p>
          </div>
        ))}
      </div>

      <div className="cs-body">

        {/* ─────────────────────────────────────────────────────────────────── */}
        {/* CHAPTER 1: SWIFTSHIFT */}
        {/* ─────────────────────────────────────────────────────────────────── */}

        <div className="cs-section">
          <div className="sr" style={{ padding: '24px 28px', border: '1px solid var(--bdr)', borderRadius: 8, background: 'var(--bg1)', marginBottom: 40 }}>
            <p style={{ fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--txt3)', marginBottom: 10 }}>Swift Shift · 2019 to 2020 · Sole Designer</p>
            <h3 style={{ fontFamily: 'var(--sans)', fontSize: 22, fontWeight: 600, color: 'var(--txt)', marginBottom: 0, lineHeight: 1.2 }}>Helping nurses respond to open shifts</h3>
          </div>
        </div>

        <div className="cs-section">
          <h2 className="cs-h2 sr">Coverage was manual. A single callout took hours to fill.</h2>
          <div className="cs-2col">
            <div>
              <p className="cs-p sr">When a home healthcare nurse called out, a scheduler worked through a list of eligible nurses one at a time by phone or text. Most messages went unanswered. Nurses who did respond often declined because they had no information to go on: no neighborhood, no pay estimate, no sense of urgency. A single callout could take two to three hours to resolve, leaving patients without coverage in the meantime.</p>
            </div>
            <div>
              <div className="cs-callout sr">
                <p>Nurses were not refusing to work. They were refusing to respond to messages that gave them no reason to say yes. The information problem was the scheduling problem.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="cs-section">
          <h2 className="cs-h2 sr">Structured group outreach with the minimum information needed to decide.</h2>
          <div className="cs-2col">
            <div>
              <p className="cs-p sr">I designed a group notification system that sent simultaneous outreach to a pool of eligible nurses instead of sequential individual messages. The message included shift time, pay estimate, and a neighborhood area rather than a specific address. Patient details could not be shared for privacy reasons, so I worked within that constraint to find the right level of context.</p>
              <p className="cs-p sr">The message format went through several rounds. Early versions read like generic alerts and were ignored. The ordering mattered: urgency first, pay second, location third. The first nurse to respond claimed the shift. Schedulers were notified after the vacancy was filled.</p>
            </div>
            <div>
              <div className="cs-insight sr">
                <span className="cs-insight-label">Key decision</span>
                <p className="cs-insight-text">The automated system handled coordination, not the relationship. Nurses still knew a real scheduler was behind it. That distinction mattered for how nurses felt about responding, and we kept it visible in the design.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="cs-section">
          <div className="cs-outcome-row sr">
            {[
              { label: 'Shift fill ease', val: '60% easier\nReported by schedulers post launch' },
              { label: 'Manager savings', val: '$5,120 / year\nPer manager, from reduced manual outreach' },
              { label: 'Nurse autonomy', val: '75% improvement\nIn perceived control over shift selection' },
              { label: 'Retention signal', val: '33% improvement\nIn nurse retention rate over 6 months' },
            ].map(({ label, val }) => (
              <div className="cs-outcome-cell" key={label}>
                <p className="cs-outcome-label">{label}</p>
                <p className="cs-outcome-val" style={{ whiteSpace: 'pre-line' }}>{val}</p>
              </div>
            ))}
          </div>
          <div className="sr" style={{ marginTop: 48 }}>
            <p style={{ fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--txt3)', marginBottom: 8 }}>Interactive prototype</p>
            <p style={{ fontFamily: 'var(--sans)', fontSize: 14, color: 'var(--txt2)', lineHeight: 1.6, marginBottom: 20 }}>Explore the nurse notification flow. Notice what information appears and in what order.</p>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
                <div style={{ border: '1px solid var(--bdr)', borderRadius: 12, overflow: 'hidden', background: 'var(--bg1)' }}>
                  <iframe
                    src="https://taupe-grub-97399753.figma.site"
                    style={{ width: 390, height: 700, border: 'none', display: 'block' }}
                    allowFullScreen
                    title="SwiftShift Bot Messaging Interactive Prototype"
                  />
                </div>
                <p style={{ fontFamily: 'var(--mono)', fontSize: 8, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--txt3)', marginBottom: 0 }}>Rebuilt in Figma Make · Represents final interaction model</p>
              </div>
            </div>
          </div>
          <div className="sr" style={{ marginTop: 24, display: 'flex', justifyContent: 'flex-end' }}>
            <button
              onClick={() => window.location.href = '/projects/swiftshift'}
              style={{ fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--txt3)', background: 'none', border: '1px solid var(--bdr)', borderRadius: 6, padding: '10px 16px', cursor: 'pointer' }}
            >
              Full Swift Shift Case Study →
            </button>
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────────── */}
        {/* CHAPTER 2: KINDLE NL SEARCH */}
        {/* ─────────────────────────────────────────────────────────────────── */}

        <div className="cs-section">
          <div className="sr" style={{ padding: '24px 28px', border: '1px solid var(--bdr)', borderRadius: 8, background: 'var(--bg1)', marginBottom: 40 }}>
            <p style={{ fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--txt3)', marginBottom: 10 }}>Amazon · Kindle · 2023 · Lead Designer</p>
            <h3 style={{ fontFamily: 'var(--sans)', fontSize: 22, fontWeight: 600, color: 'var(--txt)', marginBottom: 0, lineHeight: 1.2 }}>Finding books and information with natural language</h3>
          </div>
        </div>

        <div className="cs-section">
          <h2 className="cs-h2 sr">Keyword search could not match how readers actually remember books.</h2>
          <div className="cs-2col">
            <div>
              <p className="cs-p sr">Kindle's search was built on exact keyword matching. Readers frequently search differently: by a vague memory, a feeling, a scene they want to revisit, or a theme they're in the mood for. The system had no answer for any of those queries. Readers who couldn't find what they were looking for were leaving Kindle to search Reddit or Goodreads, then returning to purchase.</p>
            </div>
            <div>
              <p className="cs-p sr">The same problem appeared in multiple contexts: finding a half-remembered book, searching within a book for a specific passage, discovering books similar to something they'd loved, and searching across personal highlights and notes. Keyword matching was the wrong model for all of them.</p>
            </div>
          </div>
        </div>

        <div className="cs-section">
          <h2 className="cs-h2 sr">Led design across four query types. The main challenge was making results legible.</h2>
          <div className="cs-2col">
            <div>
              <p className="cs-p sr">I led design on a team rebuilding Kindle's search surface to handle natural language queries. The AI could interpret intent. The design problem was helping readers evaluate results when the system was doing something more than matching exact words.</p>
              <p className="cs-p sr">We added a short explanation to each result, written in plain language and anchored to the reader's query. When confidence was low, we showed that rather than presenting a weak result as definitive. When the system couldn't find a strong match, the experience offered a clear next step rather than a dead end.</p>
            </div>
            <div>
              <div className="cs-finding-grid sr">
                {[
                  { tag: 'Query type 01', h: 'Vague memory search', b: 'Partial title, plot detail, or author memory.' },
                  { tag: 'Query type 02', h: 'In book search', b: 'Scene, passage, or character detail within a book.' },
                  { tag: 'Query type 03', h: 'Mood and theme discovery', b: 'Books matching a concept, tone, or feeling.' },
                  { tag: 'Query type 04', h: 'Cross library search', b: 'Highlights and notes across the reader\'s library.' },
                ].map(({ tag, h, b }) => (
                  <div className="cs-finding sr" key={tag}>
                    <span className="cs-finding-tag">{tag}</span>
                    <p className="cs-finding-headline">{h}</p>
                    <p className="cs-finding-body">{b}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="cs-section">
          <div className="cs-outcome-row sr" style={{ marginBottom: 48 }}>
            {[
              { label: 'Search success rate', val: 'Improved post launch\nMore readers reaching a result they acted on' },
              { label: 'Search session length', val: 'Increased meaningfully\nReaders engaging more deeply before abandoning' },
              { label: 'Status', val: 'Shipped\nLive in production across Kindle surfaces' },
            ].map(({ label, val }) => (
              <div className="cs-outcome-cell" key={label}>
                <p className="cs-outcome-label">{label}</p>
                <p className="cs-outcome-val" style={{ whiteSpace: 'pre-line' }}>{val}</p>
              </div>
            ))}
          </div>
          <p style={{ fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--txt3)', marginBottom: 8 }}>Interactive prototype</p>
          <p style={{ fontFamily: 'var(--sans)', fontSize: 14, color: 'var(--txt2)', lineHeight: 1.6, marginBottom: 20 }}>Try a query. Notice how the result explains why it appeared, and what the experience offers when there's no strong match.</p>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
              <div style={{ border: '1px solid var(--bdr)', borderRadius: 12, overflow: 'hidden', background: 'var(--bg1)' }}>
                <iframe
                  src="https://flat-spoke-02237962.figma.site"
                  style={{ width: 390, height: 700, border: 'none', display: 'block' }}
                  allowFullScreen
                  title="Kindle Natural Language Search Interactive Prototype"
                />
              </div>
              <p style={{ fontFamily: 'var(--mono)', fontSize: 8, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--txt3)', marginBottom: 0 }}>Rebuilt in Figma Make · Represents final interaction model</p>
            </div>
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────────── */}
        {/* CHAPTER 3: CONTEXTUAL LAYERS */}
        {/* ─────────────────────────────────────────────────────────────────── */}

        <div className="cs-section">
          <div className="sr" style={{ padding: '24px 28px', border: '1px solid var(--bdr)', borderRadius: 8, background: 'var(--bg1)', marginBottom: 40 }}>
            <p style={{ fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--txt3)', marginBottom: 10 }}>Amazon · Kindle · 2026 · Concept Originator · Sole Designer · MLP Beta</p>
            <h3 style={{ fontFamily: 'var(--sans)', fontSize: 22, fontWeight: 600, color: 'var(--txt)', marginBottom: 0, lineHeight: 1.2 }}>Bringing context into the reading experience</h3>
          </div>
        </div>

        <div className="cs-section">
          <h2 className="cs-h2 sr">Kindle had supplemental content. Readers weren't using it.</h2>
          <div className="cs-2col">
            <div>
              <p className="cs-p sr">Kindle had invested in supplemental features for years: X-Ray, Dictionary, Wikipedia, translations. A fraction of readers ever used them. The features required readers to know they existed, remember to look, and navigate away from the page to access them. Readers who encountered something unfamiliar while reading were leaving Kindle to search externally, then returning. The product had the answers. The delivery model couldn't surface them at the right moment.</p>
            </div>
            <div>
              <div className="cs-callout sr">
                <p>This project didn't exist. I originated it. Leadership needed a five-year product vision. I ran a cross functional workshop that surfaced the opportunity, secured funding, and built the prioritization framework the team worked from. Two years later, when AI made the concept viable, I was the sole designer from concept through MLP beta.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="cs-section">
          <h2 className="cs-h2 sr">Six interaction models. One constraint ruled out five.</h2>
          <div className="cs-2col">
            <div>
              <p className="cs-p sr">I set one constraint early: any design that moved readers off the reading surface had already failed. Reading continuity was the primary product. I explored six directions against that constraint: a menu toggle, a persistent carousel, section level indicators, an anchored side panel, a bottom peek drawer, and a layered inline model. The first five all required readers to leave the text in some way. The layered inline model didn't.</p>
              <p className="cs-p sr">The final design had three parts: inline markers in the text, a reader controlled toggle, and a bottom sheet that surfaced content without displacing the reading surface. The placement engine surfaced 2 to 4 relevant entities per page, not everything recognizable, because a page that looked heavily annotated had already broken the reading first constraint.</p>
            </div>
            <div>
              <div className="cs-finding-grid sr">
                {[
                  { tag: 'Decision 01', h: 'Opt in by default', b: 'Push by default would have inflated early numbers and generated complaints before the feature proved its value. Opt in gave readers control and gave us clean signal.' },
                  { tag: 'Decision 02', h: 'Bottom sheet over overlay', b: 'A floating overlay would have covered the text the reader just tapped. The bottom sheet keeps the reading surface visible while the card is open.' },
                  { tag: 'Decision 03', h: 'Relevance over coverage', b: '2 to 4 hotspots per page, those most likely to help comprehension. Not every recognizable entity.' },
                  { tag: 'Decision 04', h: 'Phase one: curated content', b: 'The framework was built for AI generated content from the start. But validating delivery before introducing content quality as a variable was the right sequencing.' },
                ].map(({ tag, h, b }) => (
                  <div className="cs-finding sr" key={tag}>
                    <span className="cs-finding-tag">{tag}</span>
                    <p className="cs-finding-headline">{h}</p>
                    <p className="cs-finding-body">{b}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="cs-section">
          <div className="cs-outcome-row sr">
            {[
              { label: 'Engagement', val: 'Up post experiment\nPush based delivery outperformed pull baseline' },
              { label: 'Reading duration', val: 'Stable\nCore guardrail held across experiment cohorts' },
              { label: 'Platform outcome', val: 'MLP beta shipped\nFramework adopted by subsequent feature teams' },
              { label: 'Design role', val: 'Concept to beta\nSole designer across the full arc' },
            ].map(({ label, val }) => (
              <div className="cs-outcome-cell" key={label}>
                <p className="cs-outcome-label">{label}</p>
                <p className="cs-outcome-val" style={{ whiteSpace: 'pre-line' }}>{val}</p>
              </div>
            ))}
          </div>
          <div className="sr" style={{ marginTop: 48 }}>
            <p style={{ fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--txt3)', marginBottom: 8 }}>Interactive prototype</p>
            <p style={{ fontFamily: 'var(--sans)', fontSize: 14, color: 'var(--txt2)', lineHeight: 1.6, marginBottom: 20 }}>Tap an inline marker and see what the reader can access without leaving the page.</p>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
                <div style={{ border: '1px solid var(--bdr)', borderRadius: 12, overflow: 'hidden', background: 'var(--bg1)' }}>
                  <iframe
                    src="https://adjust-fleck-61194520.figma.site"
                    style={{ width: 390, height: 700, border: 'none', display: 'block' }}
                    allowFullScreen
                    title="Contextual Layers Interactive Prototype"
                  />
                </div>
                <p style={{ fontFamily: 'var(--mono)', fontSize: 8, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--txt3)', marginBottom: 0 }}>Rebuilt in Figma Make · Represents final interaction model</p>
              </div>
            </div>
          </div>
          <div className="sr" style={{ marginTop: 24, display: 'flex', justifyContent: 'flex-end' }}>
            <button
              onClick={() => window.location.href = '/projects/contextual-layers'}
              style={{ fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--txt3)', background: 'none', border: '1px solid var(--bdr)', borderRadius: 6, padding: '10px 16px', cursor: 'pointer' }}
            >
              Full Contextual Layers Case Study →
            </button>
          </div>
        </div>

        {/* ── LINKS ── */}
        <div className="cs-section">
          <div className="cs-finding-grid sr" style={{ marginTop: 24 }}>
            {[
              { tag: 'Swift Shift', b: 'Scheduling platform, nurse app, callout redistribution model, and design system.', path: '/projects/swiftshift' },
              { tag: 'Contextual Layers', b: 'Workshop origin, six directions explored, system design, and experiment results.', path: '/projects/contextual-layers' },
              { tag: 'Contextual Layers Slides', b: 'Presentation format, built for interviews.', path: '/projects/contextual-layers/slides' },
            ].map(({ tag, b, path }) => (
              <div
                className="cs-finding sr"
                key={tag}
                onClick={() => window.location.href = path}
                style={{ cursor: 'pointer' }}
              >
                <span className="cs-finding-tag">{tag}</span>
                <p className="cs-finding-body">{b}</p>
                <p style={{ fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--txt3)', marginBottom: 0, marginTop: 12 }}>View →</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
