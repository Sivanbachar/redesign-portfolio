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
        <p className="cs-tag">Amazon · Kindle · Swift Shift · 2022 to Present</p>
        <h1 className="cs-h1">Designing with AI</h1>
        <p className="cs-subtitle sr">Three products. Three different ways AI can earn trust — or lose it.</p>
        <p className="cs-lead">Across three products and several years, I designed experiences where AI or automated messaging sat at the center of the user interaction. Not as a feature layer on top of something else. As the primary mechanism the product depended on to work. Each one taught me something different about how people form trust with systems that think for them, and what breaks that trust before it ever forms.</p>
        <div className="cs-biz-strip sr">
          <div className="cs-biz-cell">
            <p className="cs-biz-label">The through line</p>
            <p className="cs-biz-val">Users will adopt AI-driven surfaces when the system is transparent about what it knows, honest about what it does not, and gives users control before asking for engagement. All three products were really solving the same underlying problem from different angles.</p>
          </div>
          <div className="cs-biz-cell">
            <p className="cs-biz-label">What this covers</p>
            <p className="cs-biz-val">SwiftShift bot messaging for healthcare shift coverage. Kindle natural language search. Contextual Layers, an inline reading knowledge layer. Each case is framed using Situation, Task, Action, Result.</p>
          </div>
        </div>
      </div>

      <div className="cs-meta-row">
        {[
          ['Companies', 'Amazon · Kindle\nSwift Shift'],
          ['Surfaces', 'iOS · Android\nDesktop Web · E-ink'],
          ['AI Types', 'LLM · NL Search\nBot Messaging · On-device'],
          ['Scope', '3 Products\n2022 to Present'],
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
          <h2 className="cs-h2 sr">AI in a product is not a design decision. It is a trust decision.</h2>
          <div className="cs-2col">
            <div>
              <p className="cs-p sr">Every AI feature starts with a user who has no prior relationship with it. They do not know what it knows, what it is going to do with that knowledge, or whether they can trust the result. Designing the feature is only part of the job. Designing the conditions under which someone will try it at all is the harder part.</p>
              <p className="cs-p sr">The three products in this case study all failed at this in early versions. Nurses ignored automated messages because they felt impersonal. Readers distrusted search results they could not explain. Contextual insights went unused because they appeared without invitation. In each case, the solution was not better AI. It was a better relationship between the user and the system.</p>
            </div>
            <div>
              <div className="cs-callout sr">
                <p>What I learned across these projects is that the interaction model around AI matters more than the AI itself. Opt-in beats opt-out. Shown reasoning beats hidden results. Graceful failure beats false confidence. These are not UX preferences. They are the conditions for adoption.</p>
              </div>
              <div className="cs-finding-grid sr" style={{ marginTop: 32 }}>
                {[
                  { tag: 'Product 01', b: 'SwiftShift · Bot Messaging for healthcare shift coverage' },
                  { tag: 'Product 02', b: 'Kindle · Natural language search across library and book content' },
                  { tag: 'Product 03', b: 'Kindle · Contextual Layers, inline reading knowledge surface' },
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
            <p style={{ fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--txt3)', marginBottom: 10 }}>Swift Shift · 2022 · Sole Designer</p>
            <h3 style={{ fontFamily: 'var(--sans)', fontSize: 22, fontWeight: 600, color: 'var(--txt)', marginBottom: 0, lineHeight: 1.2 }}>Bot Messaging for Healthcare Shift Coverage</h3>
          </div>
        </div>

        <div className="cs-section">
          <span className="cs-section-label sr">Situation</span>
          <h2 className="cs-h2 sr">A nurse calls out. A scheduler picks up the phone. For hours.</h2>
          <div className="cs-2col">
            <div>
              <p className="cs-p sr">When a home healthcare nurse called out of a shift, the coverage process started immediately and manually. A scheduler would pull a list of eligible nurses, then call or text them one at a time. Each outreach was a separate conversation. Most went unanswered. Of the ones that were answered, many declined because they had no idea what patient they would be covering, what the neighborhood was like, or what the pay would actually look like after the shift.</p>
              <p className="cs-p sr">A single call-out could take a scheduler two to three hours to resolve. During that window, a patient might be without coverage.</p>
            </div>
            <div>
              <div className="cs-callout sr">
                <p>The coordination model was built on the assumption that nurses would respond to any outreach if you reached them. The reality was different. Nurses were making a decision about whether the work was worth the uncertainty. No information meant no. Manual outreach gave them no information.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="cs-section">
          <span className="cs-section-label sr">Task</span>
          <h2 className="cs-h2 sr">Design a messaging system that nurses would actually respond to.</h2>
          <p className="cs-p sr">The challenge was not automating the outreach. That part was straightforward. The challenge was designing messages that felt worth responding to when they arrived from a system rather than a person, and doing it within a strict privacy constraint: we could not expose patient details.</p>
          <div className="cs-finding-grid sr" style={{ marginTop: 40 }}>
            {[
              { tag: 'Constraint 01', h: 'No patient details', b: 'We could not include patient name, condition, or specific address in nurse-facing messages. Privacy compliance was non-negotiable.' },
              { tag: 'Constraint 02', h: 'Context still required', b: 'Nurses needed enough information to say yes with confidence. A message with no context would be ignored. Too little information was the same as no message.' },
              { tag: 'Constraint 03', h: 'Speed was the point', b: 'A shift coverage system that took more than 30 minutes to fill a vacancy was not meaningfully better than manual. The design had to enable fast decisions, not just replace phone calls.' },
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
          <h2 className="cs-h2 sr">Structured group outreach with just enough context to decide.</h2>
          <div className="cs-2col">
            <div>
              <p className="cs-p sr">I designed a group-based push notification model that sent simultaneous outreach to a pool of eligible nurses instead of sequential individual calls. The message was structured around the minimum information a nurse needed to make a decision: shift time, neighborhood area rather than specific address, estimated pay, and an urgency signal that communicated how much time was left to respond.</p>
              <p className="cs-p sr">The response flow collapsed what had been a multi-step back-and-forth into a single in-app confirmation. The first nurse to claim it locked the shift. No scheduler had to be involved until after the vacancy was filled.</p>
            </div>
            <div>
              <p className="cs-p sr">The message format went through several rounds before it felt right. Early versions read like generic system alerts. Nurses ignored them. The shift was in how the information was ordered. Urgency first, because if the shift starts in four hours and the nurse is not available, nothing else matters. Pay second, because this was the factor nurses said they needed to trust the decision. Location context third, phrased in a way that gave area without exposing patient detail.</p>
              <div className="cs-insight sr" style={{ marginTop: 32 }}>
                <span className="cs-insight-label">Key Design Decision</span>
                <p className="cs-insight-text">The bot did not replace the scheduler relationship. It handled the coordination so schedulers could focus on the cases that required judgment. Nurses still knew a real person was behind the system. That distinction mattered.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="cs-section">
          <span className="cs-section-label sr">Result</span>
          <h2 className="cs-h2 sr">Schedulers stopped living on their phones.</h2>
          <div className="cs-outcome-row sr">
            {[
              { label: 'Shift fill ease', val: '60% easier\nReported by schedulers post-launch' },
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
            <p><strong>What the bot design taught me:</strong> Automation earns trust through transparency, not just speed. Nurses were not resisting technology. They were resisting uncertainty. The moment we gave them enough context to make an informed decision, response rates changed. The bot was not the product. The information architecture of the message was.</p>
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
            <h3 style={{ fontFamily: 'var(--sans)', fontSize: 22, fontWeight: 600, color: 'var(--txt)', marginBottom: 0, lineHeight: 1.2 }}>Natural Language Search Across Library and Book Content</h3>
          </div>
        </div>

        <div className="cs-section">
          <span className="cs-section-label sr">Situation</span>
          <h2 className="cs-h2 sr">Readers knew what they were looking for. The product did not.</h2>
          <div className="cs-2col">
            <div>
              <p className="cs-p sr">Kindle's search was built on exact keyword matching. If a reader remembered the title or the author, it worked. But readers frequently do not search that way. They remember a feeling. A scene. A vague concept. Someone telling them about a book set in Japan that made them cry. Keyword search had nothing to offer them.</p>
              <p className="cs-p sr">The problem was broader than library search. Readers also struggled to find specific content within a book they were reading. A quote they wanted to share. A scene they needed to revisit. A character detail they had forgotten. Scrolling back through hundreds of pages was the only option.</p>
            </div>
            <div>
              <p className="cs-p sr">And on the discovery side, readers trying to find something like a book they had already loved had no good path in the product. They were leaving Kindle to search Reddit or Goodreads instead, getting recommendations there, then coming back to purchase. The platform was losing the moment of intent.</p>
              <div className="cs-callout sr" style={{ marginTop: 24 }}>
                <p>Four distinct search problems. One broken interaction model underlying all of them. Keyword search was not the right tool for any of them.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="cs-section">
          <span className="cs-section-label sr">Task</span>
          <h2 className="cs-h2 sr">Design a search experience that understood intent, not just strings.</h2>
          <p className="cs-p sr">I led design on a team rebuilding Kindle's search surface to handle natural language across all four query types: finding a vaguely remembered book, searching within a book for a scene or quote, discovering books by mood or theme, and searching across highlights and notes in a reader's library. The AI underneath could handle it. The design challenge was making the results feel trustworthy when they came back.</p>
          <div className="cs-finding-grid sr" style={{ marginTop: 40 }}>
            {[
              { tag: 'Query type 01', h: 'Vague memory search', b: 'Reader searches for a book they can half-describe. AI interprets partial title, plot detail, or author memory and surfaces candidates.' },
              { tag: 'Query type 02', h: 'In-book search', b: 'Reader searches within the book they are reading for a specific scene, character moment, or quote. AI finds the passage, not just the word.' },
              { tag: 'Query type 03', h: 'Mood and theme discovery', b: 'Reader searches for something that feels like a book they loved, or fits a specific emotional need. AI matches on concept and tone rather than metadata.' },
              { tag: 'Query type 04', h: 'Cross-library search', b: 'Reader searches across their highlights, notes, and saved passages to find something they marked months ago and cannot locate.' },
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
          <h2 className="cs-h2 sr">The trust layer was the real design problem.</h2>
          <div className="cs-2col">
            <div>
              <p className="cs-p sr">When AI interprets intent rather than matching exact strings, the results can feel arbitrary. A reader who searched for a specific scene and gets back three passages has no way of knowing if the right one is there unless they understand why those three were returned.</p>
              <p className="cs-p sr">We designed the match reason into every result. Not as a technical explanation, but as a reader-legible signal. A result surfaced because of a character name the reader mentioned. Because the passage contained the emotional beat they described. Because the book matched the themes in their query. Each result had a one-line reason anchored to the reader's own words.</p>
            </div>
            <div>
              <p className="cs-p sr">For low-confidence results, we designed explicit confidence signals rather than suppressing the uncertainty. A result that was a weaker match was labeled as such. The product did not pretend to be more certain than it was. That honesty turned out to be better for trust than a cleaner-looking result set.</p>
              <p className="cs-p sr">Fallback states were treated as a feature, not an edge case. When the AI could not find a strong match, the experience offered an explicit alternative path: try a different phrasing, browse by category, or switch to keyword. The dead end was designed out.</p>
              <div className="cs-insight sr" style={{ marginTop: 32 }}>
                <span className="cs-insight-label">Key Design Decision</span>
                <p className="cs-insight-text">We resisted the temptation to show a confident, clean result set when the AI was uncertain. Readers who discovered a bad result forgave the product less than readers who were told upfront that the match was approximate.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="cs-section">
          <span className="cs-section-label sr">Result</span>
          <h2 className="cs-h2 sr">Readers found what they were looking for. And stayed longer looking.</h2>
          <div className="cs-2col">
            <div>
              <div className="cs-outcome-row sr" style={{ flexDirection: 'column' }}>
                {[
                  { label: 'Search success rate', val: 'Improved post-launch\nMore readers reaching a result they acted on' },
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
                <p><strong>What this taught me:</strong> Trustworthy AI results are not the same as accurate AI results. Accuracy is a model problem. Trust is a design problem. Showing readers why a result appeared changed their relationship with the uncertainty. They were not confused by imperfect results. They were confused when imperfect results were presented as definitive. The design had to be honest about what the AI knew and did not know.</p>
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
            <p style={{ fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--txt3)', marginBottom: 10 }}>Amazon · Kindle · 2026 · Sole Designer · Concept Originator</p>
            <h3 style={{ fontFamily: 'var(--sans)', fontSize: 22, fontWeight: 600, color: 'var(--txt)', marginBottom: 0, lineHeight: 1.2 }}>Contextual Layers: Inline Knowledge Within the Reading Experience</h3>
          </div>
        </div>

        <div className="cs-section">
          <span className="cs-section-label sr">Situation</span>
          <h2 className="cs-h2 sr">The content existed. The interaction model made it invisible.</h2>
          <div className="cs-2col">
            <div>
              <p className="cs-p sr">Kindle had years of investment in supplemental content: X-Ray, Dictionary, Wikipedia integrations, translations. A fraction of readers ever used them. The tools required the reader to know they existed, remember to look for them, and navigate away from reading to access them. The pull model created a discoverability gap the product had never measured directly.</p>
            </div>
            <div>
              <p className="cs-p sr">Readers encountering something they did not understand were leaving Kindle and searching externally, then returning. The platform had the answers. The delivery model could not surface them at the right moment.</p>
            </div>
          </div>
        </div>

        <div className="cs-section">
          <span className="cs-section-label sr">Task</span>
          <h2 className="cs-h2 sr">This project did not exist. I created it.</h2>
          <p className="cs-p sr">Leadership needed a three-year product vision. I designed and ran a cross-functional workshop that surfaced reader failure patterns no one had framed as a product problem yet. The opportunity I identified became the funded project. Two years later, when AI made it technically viable, the concept was already built out. I was the sole designer from the original workshop through the MLP beta.</p>
        </div>

        <div className="cs-section">
          <span className="cs-section-label sr">Action</span>
          <h2 className="cs-h2 sr">Replace the model. Not the features.</h2>
          <div className="cs-2col">
            <div>
              <p className="cs-p sr">Rather than improving individual features, I redefined how supplemental content should exist inside a reading experience. The solution was a layered interaction model: inline markers embedded in the text, a reader-controlled toggle, and a bottom sheet that surfaced content without removing the reading surface. The text became the interface.</p>
              <p className="cs-p sr">The opt-in design was a deliberate trust decision. Push-by-default would have inflated early engagement numbers and generated complaints that could have killed the feature. Opt-in gave readers control before asking for engagement, and gave us clean behavioral signal to evaluate the model against.</p>
            </div>
            <div>
              <p className="cs-p sr">The placement engine was designed to surface 2 to 4 contextually relevant entities per page rather than annotating everything recognizable. Coverage was not the goal. Relevance was. A reading surface that looked annotated had already failed the core constraint: reading continuity comes first.</p>
              <div className="cs-insight sr" style={{ marginTop: 32 }}>
                <span className="cs-insight-label">Key Design Decision</span>
                <p className="cs-insight-text">The framework I built was designed for AI-generated content from day one, even though phase one shipped with curated content only. Validating the delivery model before introducing content quality variables was the disciplined sequencing.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="cs-section">
          <span className="cs-section-label sr">Result</span>
          <h2 className="cs-h2 sr">A platform, not a feature.</h2>
          <div className="cs-outcome-row sr">
            {[
              { label: 'Engagement', val: 'Up post-experiment\nPush-based delivery outperformed pull baseline' },
              { label: 'Reading duration', val: 'Stable\nCore guardrail held across experiment cohorts' },
              { label: 'Platform outcome', val: 'MLP shipped\nFramework adopted by subsequent feature teams' },
              { label: 'Design role', val: 'Concept to beta\nSole designer across the full arc' },
            ].map(({ label, val }) => (
              <div className="cs-outcome-cell" key={label}>
                <p className="cs-outcome-label">{label}</p>
                <p className="cs-outcome-val" style={{ whiteSpace: 'pre-line' }}>{val}</p>
              </div>
            ))}
          </div>
          <div className="cs-callout sr" style={{ marginTop: 40 }}>
            <p><strong>What this reinforced:</strong> The interaction model around AI matters as much as the AI itself. Contextual Layers succeeded not because the content was good, but because the delivery model earned the right to exist on the reading surface. Opt-in, controlled density, and the reading-first constraint were design decisions that determined adoption before any content quality question was even relevant.</p>
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
          <h2 className="cs-h2 sr">The same four things kept showing up across all three products.</h2>
          <div className="cs-2col" style={{ marginBottom: 40 }}>
            <div>
              <p className="cs-p sr">These were not conclusions I started with. They emerged from watching the same failure pattern repeat in different product contexts with different constraints and different users. Each product added a layer to the same underlying model.</p>
            </div>
            <div>
              <p className="cs-p sr">I do not think of these as design rules. I think of them as observations about how people form trust with systems that make decisions on their behalf. That context changes the design problem in every domain where AI is involved.</p>
            </div>
          </div>

          {[
            {
              n: '01',
              h: 'Control before engagement',
              p1: 'In all three products, users who were given control before being asked to engage were significantly more likely to actually engage. The opt-in toggle in Contextual Layers. The nurse response flow in SwiftShift. The ability to retry or switch search mode in NL Search.',
              p2: 'Push-first approaches consistently generated resistance before generating adoption. The instinct to maximize early exposure to an AI feature trades short-term activation for long-term trust. It is almost always the wrong trade.',
            },
            {
              n: '02',
              h: 'Shown reasoning changes the relationship with uncertainty',
              p1: 'Every AI system surfaces uncertain results. The design decision is whether to hide that uncertainty behind a clean UI or acknowledge it directly. In all three products, acknowledging uncertainty outperformed hiding it.',
              p2: 'In NL Search, readers who saw why a result appeared forgave imperfect results. Nurses who understood why they were being contacted responded faster. Readers who chose to activate Contextual Layers engaged more deeply than those exposed to it without context. Transparency is not a disclosure requirement. It is a conversion mechanism.',
            },
            {
              n: '03',
              h: 'Embedded AI outperforms adjacent AI',
              p1: 'Features that put AI results inside an existing workflow consistently outperformed features that created a new surface for the AI to live on. SwiftShift\'s bot messages arrived in the same channel nurses already used. NL Search replaced the existing search bar, not a separate discovery tab. Contextual Layers lived inside the reading surface, not alongside it.',
              p2: 'Creating a new AI surface asks users to change their behavior before they have any evidence the feature is worth the change. Embedding inside an existing behavior lowers that cost to nearly zero.',
            },
            {
              n: '04',
              h: 'Failure states are the product',
              p1: 'The clearest signal that an AI feature is trusted is not what happens when it works. It is what happens when it does not. In every product I designed in this space, the failure state was the place where trust was either built or permanently lost.',
              p2: 'SwiftShift nurses who got a message with too little information did not try again. NL Search readers who hit a dead end without an alternative path stopped searching. Contextual Layers readers who got irrelevant insights turned the feature off and did not return. Designing the failure state as carefully as the success state is not defensive design. It is the primary design challenge.',
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
              { tag: 'Swift Shift', b: 'The full 0 to 1 build: scheduling platform, nurse app, call-out redistribution model, and design system.', path: '/projects/swiftshift' },
              { tag: 'Contextual Layers', b: 'The full case study: workshop origin, six design directions explored, system impact, and experiment design.', path: '/projects/contextual-layers' },
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
