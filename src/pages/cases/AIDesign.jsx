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
        <p className="cs-subtitle sr">Three projects. Three different ways people interact with intelligent or automated systems.</p>
        <p className="cs-lead">My role was to figure out how each interaction should work, where it belonged in the product, and how to make it useful without adding unnecessary friction. These projects are not all AI in the same sense. One used automated messaging rules. One used natural language search. One surfaced contextual information inline with reading. The underlying design question was consistent across all three: how do you build something people will actually use when the system is making decisions on their behalf?</p>
        <div className="cs-biz-strip sr">
          <div className="cs-biz-cell">
            <p className="cs-biz-label">What I designed across these projects</p>
            <p className="cs-biz-val">The interaction model in each case. What information the user needed to act. Where the experience belonged inside the product. How to handle the moments when things did not go as expected. The specific problems were different. The discipline was the same.</p>
          </div>
          <div className="cs-biz-cell">
            <p className="cs-biz-label">What this covers</p>
            <p className="cs-biz-val">Swift Shift automated shift coverage messaging for home healthcare. Kindle natural language search across library and book content. Kindle Contextual Layers, which brings relevant information into the reading surface without requiring readers to navigate away from the page.</p>
          </div>
        </div>
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

        {/* ── OVERVIEW ── */}
        <div className="cs-section">
          <span className="cs-section-label sr">Why this matters</span>
          <h2 className="cs-h2 sr">The interaction model matters as much as what the system can do.</h2>
          <div className="cs-2col">
            <div>
              <p className="cs-p sr">In each of these products, the technology worked. Nurses were not being reached because the message gave them no reason to respond. Readers could not find what they were looking for because the search model did not match how they actually think about books. Supplemental reading features went unused because readers had no natural way to discover them while reading.</p>
              <p className="cs-p sr">Better technology was not the solution in any of these cases. The solution was a better interaction model: one that fit the context the user was already in, gave them enough information to act, and did not require them to change their behavior before they had any evidence the experience was worth it.</p>
            </div>
            <div>
              <div className="cs-callout sr">
                <p>What I learned across these projects is that the design work around an intelligent or automated system matters more than people tend to assume. How results are presented, what information is surfaced, what happens when confidence is low — these are design problems. The system performance sets a ceiling. The interaction model determines whether anyone ever reaches it.</p>
              </div>
              <div className="cs-finding-grid sr" style={{ marginTop: 32 }}>
                {[
                  { tag: 'Project 01', b: 'Swift Shift — automated messaging for healthcare shift coverage' },
                  { tag: 'Project 02', b: 'Kindle — natural language search across library and book content' },
                  { tag: 'Project 03', b: 'Kindle — Contextual Layers, inline reading knowledge surface' },
                ].map(({ tag, b }) => (
                  <div className="cs-finding sr" key={tag}>
                    <span className="cs-finding-tag">{tag}</span>
                    <p className="cs-finding-body">{b}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────────── */}
        {/* CHAPTER 1: SWIFTSHIFT */}
        {/* ─────────────────────────────────────────────────────────────────── */}

        <div className="cs-section">
          <span className="cs-section-label sr">Chapter 01</span>
          <div className="sr" style={{ padding: '24px 28px', border: '1px solid var(--bdr)', borderRadius: 8, background: 'var(--bg1)', marginBottom: 40 }}>
            <p style={{ fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--txt3)', marginBottom: 10 }}>Swift Shift · 2019 to 2020 · Sole Designer</p>
            <h3 style={{ fontFamily: 'var(--sans)', fontSize: 22, fontWeight: 600, color: 'var(--txt)', marginBottom: 0, lineHeight: 1.2 }}>Helping nurses respond to open shifts</h3>
          </div>
        </div>

        <div className="cs-section">
          <span className="cs-section-label sr">Situation</span>
          <h2 className="cs-h2 sr">When a nurse called out, a scheduler spent hours making phone calls.</h2>
          <div className="cs-2col">
            <div>
              <p className="cs-p sr">Home healthcare shift coverage was a manual process. When a nurse called out, a scheduler pulled a list of eligible nurses and contacted them one at a time by phone or text. Each outreach was a separate conversation. Most went unanswered. Of those that were answered, many nurses declined because they did not have enough information to decide: they did not know the neighborhood, the pay, or how much time was left before the shift started.</p>
              <p className="cs-p sr">A single callout could take a scheduler two to three hours to resolve. In that window, a patient could be without coverage.</p>
            </div>
            <div>
              <div className="cs-callout sr">
                <p>Nurses were not refusing to work. They were refusing uncertainty. Without enough information to evaluate the opportunity, they defaulted to no. The coordination model had no way to surface that information at the moment it was needed.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="cs-section">
          <span className="cs-section-label sr">Task</span>
          <h2 className="cs-h2 sr">Design a messaging system that gave nurses enough to decide.</h2>
          <p className="cs-p sr">The challenge was not automating the outreach. That was the easy part. The challenge was designing messages that a nurse would actually respond to when they came from a system rather than a person, while operating under a strict constraint: patient details could not be shared in nurse-facing communications.</p>
          <div className="cs-finding-grid sr" style={{ marginTop: 40 }}>
            {[
              { tag: 'Constraint 01', h: 'No patient details', b: 'Patient name, condition, and specific address could not appear in messages sent to nurses. Privacy compliance was not negotiable.' },
              { tag: 'Constraint 02', h: 'Context still required', b: 'Nurses needed enough information to say yes with confidence. A message that omitted context would be ignored. Too little information was functionally the same as no message.' },
              { tag: 'Constraint 03', h: 'Speed mattered', b: 'A system that took as long as manual outreach to fill a vacancy was not meaningfully better. The design had to support fast decisions.' },
            ].map(({ tag, h, b }) => (
              <div className="cs-finding sr" key={tag}>
                <span className="cs-finding-tag">{tag}</span>
                <p className="cs-finding-headline">{h}</p>
                <p className="cs-finding-body">{b}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="cs-section">
          <span className="cs-section-label sr">Action</span>
          <h2 className="cs-h2 sr">Structured group outreach with the minimum information needed to act.</h2>
          <div className="cs-2col">
            <div>
              <p className="cs-p sr">I designed a group based push notification model. Instead of sequential one to one outreach, the system sent simultaneous messages to a pool of eligible nurses. The message was structured around the minimum information a nurse needed to make a decision: shift time, a neighborhood area rather than a specific address, estimated pay, and an urgency signal showing how much time remained before the shift started.</p>
              <p className="cs-p sr">The response flow reduced what had been a multi step conversation into a single in app confirmation. The first nurse to claim the shift locked it. Schedulers were notified after the vacancy was filled, not during the process.</p>
            </div>
            <div>
              <p className="cs-p sr">The message format went through several iterations before it worked. Early versions read like generic system alerts and nurses ignored them. The shift was in how the information was ordered. Urgency first, because if the shift starts in four hours and the nurse is unavailable, nothing else matters. Pay second, because that was the factor nurses said they needed to make a confident decision. Area context third, phrased to convey neighborhood without identifying the patient.</p>
              <div className="cs-insight sr" style={{ marginTop: 32 }}>
                <span className="cs-insight-label">Key Design Decision</span>
                <p className="cs-insight-text">The automated system handled coordination, not the relationship. Nurses still knew a real scheduler was behind it. That distinction mattered for how nurses felt about responding, and we made sure the design preserved it.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="cs-section">
          <span className="cs-section-label sr">Result</span>
          <h2 className="cs-h2 sr">Schedulers stopped living on their phones.</h2>
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
          <div className="cs-callout sr" style={{ marginTop: 40 }}>
            <p><strong>What this taught me:</strong> Automated outreach only works if the message is worth responding to. The rules that drove the system were straightforward. The design problem was the information architecture of the message itself: what to include, what order to put it in, and how to make it feel like something a real person sent, not a system alert.</p>
          </div>
          <div className="sr" style={{ marginTop: 48 }}>
            <p style={{ fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--txt3)', marginBottom: 8 }}>Interactive prototype</p>
            <p style={{ fontFamily: 'var(--sans)', fontSize: 14, color: 'var(--txt2)', lineHeight: 1.6, marginBottom: 20 }}>Explore how a nurse receives and responds to an open shift notification. Notice the information hierarchy: what appears first, and what the nurse needs before they can say yes.</p>
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
          <span className="cs-section-label sr">Chapter 02</span>
          <div className="sr" style={{ padding: '24px 28px', border: '1px solid var(--bdr)', borderRadius: 8, background: 'var(--bg1)', marginBottom: 40 }}>
            <p style={{ fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--txt3)', marginBottom: 10 }}>Amazon · Kindle · 2023 · Lead Designer</p>
            <h3 style={{ fontFamily: 'var(--sans)', fontSize: 22, fontWeight: 600, color: 'var(--txt)', marginBottom: 0, lineHeight: 1.2 }}>Finding books and information with natural language</h3>
          </div>
        </div>

        <div className="cs-section">
          <span className="cs-section-label sr">Situation</span>
          <h2 className="cs-h2 sr">Readers knew what they were looking for. The search experience did not.</h2>
          <div className="cs-2col">
            <div>
              <p className="cs-p sr">Kindle's search was built on keyword matching. If a reader remembered the title or author, it worked. But readers frequently search by memory, feeling, or concept. A book set in Japan that made someone cry. A scene involving a specific character they want to revisit. A theme that matches a mood they are in. Keyword search could not interpret any of those queries.</p>
              <p className="cs-p sr">The problem appeared across multiple contexts. Library search. In book search for specific passages. Discovery of books similar to ones a reader had already loved. Searching through personal highlights and notes. Keyword matching was the wrong model for all of them.</p>
            </div>
            <div>
              <p className="cs-p sr">Readers who could not find what they were looking for in Kindle were leaving the product to search on Reddit, Goodreads, or Google, then returning to purchase. The platform was losing the moment of intent to external services.</p>
              <div className="cs-callout sr" style={{ marginTop: 24 }}>
                <p>Four distinct search problems. One broken underlying model. Keyword search was not designed for how readers actually remember or think about books.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="cs-section">
          <span className="cs-section-label sr">Task</span>
          <h2 className="cs-h2 sr">Design a search experience built around reader intent, not string matching.</h2>
          <p className="cs-p sr">I led design on a team rebuilding Kindle's search surface to support natural language queries across four contexts. The underlying AI could handle the interpretation. The design challenge was making the results legible enough for readers to evaluate them when the system was doing something more than matching exact words.</p>
          <div className="cs-finding-grid sr" style={{ marginTop: 40 }}>
            {[
              { tag: 'Query type 01', h: 'Vague memory search', b: 'Reader searches for a book they can partially describe. The system interprets partial title, plot detail, or fragmented memory and surfaces candidates.' },
              { tag: 'Query type 02', h: 'In book search', b: 'Reader searches within the book they are reading for a specific scene, passage, or character detail. Results point to a location in the text, not just a word match.' },
              { tag: 'Query type 03', h: 'Mood and theme discovery', b: 'Reader looks for something that feels like a book they loved, or fits a specific emotional need. The system matches on concept and tone rather than metadata.' },
              { tag: 'Query type 04', h: 'Cross library search', b: 'Reader searches across their highlights, notes, and saved passages to find something they marked and cannot locate.' },
            ].map(({ tag, h, b }) => (
              <div className="cs-finding sr" key={tag}>
                <span className="cs-finding-tag">{tag}</span>
                <p className="cs-finding-headline">{h}</p>
                <p className="cs-finding-body">{b}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="cs-section">
          <span className="cs-section-label sr">Action</span>
          <h2 className="cs-h2 sr">Helping readers evaluate results they cannot independently verify.</h2>
          <div className="cs-2col">
            <div>
              <p className="cs-p sr">When a system interprets intent rather than matching exact strings, readers have no obvious way to tell if the result is right. A reader who searches for a specific scene and gets back three passages cannot evaluate which one is correct unless they understand why each appeared.</p>
              <p className="cs-p sr">We designed match context into each result: a short explanation in plain language, anchored to the words and intent of the query. Not a technical explanation of the model, but a signal that connected the result back to what the reader asked for.</p>
            </div>
            <div>
              <p className="cs-p sr">We also designed explicit fallback states rather than dead ends. When the system could not find a strong match, the experience offered a clear alternative path: try a different phrasing, browse by category, or switch to keyword search. Readers who hit a wall with no exit tended not to try again.</p>
              <div className="cs-insight sr" style={{ marginTop: 32 }}>
                <span className="cs-insight-label">Key Design Decision</span>
                <p className="cs-insight-text">We did not clean up the result set when confidence was low. A result presented as definitive when it was approximate created a worse experience than a result presented honestly as a partial match. The presentation of uncertainty was a deliberate design choice, not an oversight.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="cs-section">
          <span className="cs-section-label sr">Result</span>
          <h2 className="cs-h2 sr">Readers found what they were looking for more often, and stayed longer searching.</h2>
          <div className="cs-2col">
            <div>
              <div className="cs-outcome-row sr" style={{ flexDirection: 'column' }}>
                {[
                  { label: 'Search success rate', val: 'Improved post launch\nMore readers reaching a result they acted on' },
                  { label: 'Search session length', val: 'Increased meaningfully\nReaders engaging more deeply before abandoning' },
                  { label: 'Status', val: 'Shipped and measured\nLive in production across Kindle surfaces' },
                ].map(({ label, val }) => (
                  <div className="cs-outcome-cell" key={label} style={{ borderRight: 'none', borderBottom: '1px solid var(--bdr)' }}>
                    <p className="cs-outcome-label">{label}</p>
                    <p className="cs-outcome-val" style={{ whiteSpace: 'pre-line' }}>{val}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="cs-callout sr">
                <p><strong>What this taught me:</strong> Search with natural language creates a design problem that keyword search does not: readers have no frame of reference for evaluating results. The design work is helping them understand what the system found and why, so they can decide whether the result is what they wanted. That requires showing your work, not hiding it.</p>
              </div>
            </div>
          </div>
          <div className="sr" style={{ marginTop: 48 }}>
            <p style={{ fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--txt3)', marginBottom: 8 }}>Interactive prototype</p>
            <p style={{ fontFamily: 'var(--sans)', fontSize: 14, color: 'var(--txt2)', lineHeight: 1.6, marginBottom: 20 }}>Try a query and see how the experience surfaces results. Notice how context is shown alongside each result, and what the experience offers when a strong match cannot be found.</p>
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
        </div>

        {/* ─────────────────────────────────────────────────────────────────── */}
        {/* CHAPTER 3: CONTEXTUAL LAYERS */}
        {/* ─────────────────────────────────────────────────────────────────── */}

        <div className="cs-section">
          <span className="cs-section-label sr">Chapter 03</span>
          <div className="sr" style={{ padding: '24px 28px', border: '1px solid var(--bdr)', borderRadius: 8, background: 'var(--bg1)', marginBottom: 40 }}>
            <p style={{ fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--txt3)', marginBottom: 10 }}>Amazon · Kindle · 2026 · Concept Originator · Sole Designer · MLP Beta</p>
            <h3 style={{ fontFamily: 'var(--sans)', fontSize: 22, fontWeight: 600, color: 'var(--txt)', marginBottom: 0, lineHeight: 1.2 }}>Bringing context into the reading experience</h3>
          </div>
        </div>

        <div className="cs-section">
          <span className="cs-section-label sr">Situation</span>
          <h2 className="cs-h2 sr">Kindle had invested in supplemental content for years. Readers were not using it.</h2>
          <div className="cs-2col">
            <div>
              <p className="cs-p sr">Kindle had built real supplemental content into the reading experience: X-Ray character and location summaries, Dictionary, Wikipedia integrations, translations. A fraction of readers ever used any of it. The features required readers to know they existed, remember to look for them, and navigate away from the page to access them. The pull model created a gap the product had not measured directly.</p>
            </div>
            <div>
              <p className="cs-p sr">Readers who encountered something unfamiliar while reading were leaving Kindle to search elsewhere, then returning. The platform had the answers. The delivery model could not surface them at the right moment.</p>
            </div>
          </div>
        </div>

        <div className="cs-section">
          <span className="cs-section-label sr">Task</span>
          <h2 className="cs-h2 sr">This project did not exist. I created it.</h2>
          <p className="cs-p sr">Leadership needed a five-year product vision and had no framework for getting there. I designed and ran a cross functional workshop that reanchored the conversation from "what should we build" to "where are readers failing today." I identified the underlying opportunity, secured leadership alignment and funding, built a prioritization matrix based on customer needs and business goals, and translated the vision into annual deliverables that Product and Engineering could execute against. Two years later, when AI made the concept technically viable, the groundwork was already in place. I was the concept originator and sole designer from the original workshop through the MLP beta.</p>
        </div>

        <div className="cs-section">
          <span className="cs-section-label sr">Action</span>
          <h2 className="cs-h2 sr">Six interaction models explored. One constraint eliminated five.</h2>
          <div className="cs-2col">
            <div>
              <p className="cs-p sr">Rather than improving individual features, I explored whether the delivery model itself could change. The constraint I set early: any design that required a reader to navigate away from the reading surface had already failed. Reading continuity was the primary product. Everything else was secondary.</p>
              <p className="cs-p sr">I worked through six distinct interaction directions: a menu toggle, a persistent carousel, section-level indicators, an anchored side panel, a bottom peek drawer, and a layered inline model. The first five were rejected against the same constraint. The layered inline model was the only direction that kept the reader inside the reading surface while making supplemental content accessible.</p>
            </div>
            <div>
              <p className="cs-p sr">The final design had three components: inline markers embedded in the text, a reader controlled toggle, and a bottom sheet that surfaced content without displacing the reading surface. The placement engine surfaced 2 to 4 relevant entities per page rather than annotating everything, because a page that looked annotated had already broken the reading first constraint.</p>
              <p className="cs-p sr">The opt in toggle was a deliberate sequencing decision. A push by default approach would have inflated early numbers and generated trust complaints that could have ended the feature before it proved its value. Giving readers control before asking for engagement gave us clean behavioral signal to measure the model against.</p>
              <div className="cs-insight sr" style={{ marginTop: 32 }}>
                <span className="cs-insight-label">Key Design Decision</span>
                <p className="cs-insight-text">The framework was designed to accept AI generated content from the start, even though the first beta shipped with curated content only. Validating the delivery model before introducing content quality as a variable was the right sequencing. Phase one proved the interaction. Phase two proved the content.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="cs-section">
          <span className="cs-section-label sr">Result</span>
          <h2 className="cs-h2 sr">The delivery model worked. The framework became the platform.</h2>
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
          <div className="cs-callout sr" style={{ marginTop: 40 }}>
            <p><strong>What this reinforced:</strong> The placement engine, rendering layer, and engagement tracking I designed are reusable across content types. New content does not require a new interaction pattern. It inherits the framework. The team's question shifted from "which feature" to "does this extend the framework." That is the difference between a product and a platform.</p>
          </div>
          <div className="sr" style={{ marginTop: 48 }}>
            <p style={{ fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--txt3)', marginBottom: 8 }}>Interactive prototype</p>
            <p style={{ fontFamily: 'var(--sans)', fontSize: 14, color: 'var(--txt2)', lineHeight: 1.6, marginBottom: 20 }}>Explore how readers discover contextual information without leaving the page. Try tapping an inline marker and notice what the reader can do without losing their place in the text.</p>
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

        {/* ─────────────────────────────────────────────────────────────────── */}
        {/* CROSS-CUTTING LEARNINGS */}
        {/* ─────────────────────────────────────────────────────────────────── */}

        <div className="cs-section">
          <span className="cs-section-label sr">What I learned</span>
          <h2 className="cs-h2 sr">The same design problems kept appearing across all three products.</h2>
          <div className="cs-2col" style={{ marginBottom: 40 }}>
            <div>
              <p className="cs-p sr">These were not principles I started with. They came from watching the same problems appear in different contexts with different constraints and different users. Each product added something to the picture.</p>
            </div>
            <div>
              <p className="cs-p sr">I am writing these as observations, not rules. The specific decisions looked different in each product. But the underlying design questions were the same.</p>
            </div>
          </div>

          {[
            {
              n: '01',
              h: 'Give users control before asking for engagement',
              p1: 'In all three products, the interaction model that gave users control before asking them to engage worked better than one that assumed they would engage automatically. The opt in toggle in Contextual Layers. The nurse response flow where the nurse claimed the shift rather than being assigned it. The ability to retry or switch modes in natural language search.',
              p2: 'Approaches that maximized early exposure to the experience consistently generated resistance before generating adoption. Giving users the option to engage is not a weaker design than pushing engagement. It is often the more durable one.',
            },
            {
              n: '02',
              h: 'Show enough that users can evaluate the result',
              p1: 'When a system does something the user cannot independently verify, they need a way to evaluate whether it worked. In automated messaging, that was the information hierarchy in the notification. In natural language search, that was showing what in the query drove the result. In Contextual Layers, that was making the inline marker meaningful rather than generic.',
              p2: 'Designing that evaluability into the experience is not always obvious as a design requirement. It becomes visible when you watch users encounter a result they cannot assess. That moment is a design gap, not a user problem.',
            },
            {
              n: '03',
              h: 'Embed the experience where the user already is',
              p1: 'Swift Shift messages arrived in the same channel nurses already used for work communication. Natural language search replaced the existing search bar rather than adding a new discovery surface. Contextual Layers lived inside the reading surface rather than alongside it.',
              p2: 'Creating a new surface for an intelligent experience asks users to change their behavior before they have evidence the experience is worth the change. Embedding inside an existing behavior reduces that cost significantly.',
            },
            {
              n: '04',
              h: 'Design the failure state as carefully as the success state',
              p1: 'In each product, the failure state was where the experience either recovered or lost the user permanently. Nurses who received a message with too little information did not try again. Readers who hit a dead end in search without a clear alternative stopped searching. Contextual Layers readers who received irrelevant suggestions turned the feature off.',
              p2: 'The failure state is not an edge case to handle after the main design is done. In experiences that involve uncertainty, partial information, or automated decision making, it is a primary design surface.',
            },
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

        {/* ── LINKS TO FULL CASE STUDIES ── */}
        <div className="cs-section">
          <span className="cs-section-label sr">Full case studies</span>
          <h2 className="cs-h2 sr">Go deeper on any of the three products.</h2>
          <div className="cs-finding-grid sr" style={{ marginTop: 40 }}>
            {[
              { tag: 'Swift Shift', b: 'The full 0 to 1 build: scheduling platform, nurse app, callout redistribution model, and design system.', path: '/projects/swiftshift' },
              { tag: 'Contextual Layers', b: 'The full case study: workshop origin, six directions explored, system impact, and experiment design.', path: '/projects/contextual-layers' },
              { tag: 'Contextual Layers Slides', b: 'Presentation-format version of the Contextual Layers case study, built for interviews.', path: '/projects/contextual-layers/slides' },
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
