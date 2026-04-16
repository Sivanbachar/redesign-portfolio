import { useNavigate } from 'react-router-dom'
import { useScrollReveal } from '../../hooks/useScrollReveal.js'
import { useReadingProgress } from '../../hooks/useReadingProgress.js'
import VP from '../../components/VP.jsx'
import ExperimentViewer from '../../components/ExperimentViewer.jsx'

export default function Rokt() {
  const navigate = useNavigate()
  useScrollReveal()
  const pct = useReadingProgress()

  return (
    <div className="pg cs-wrap">
      <div className="progress-bar" style={{ transform: `scaleX(${pct})` }} />
      <button className="cs-back" onClick={() => navigate('/')}>← All Work</button>

      <div className="cs-hero sr">
        <p className="cs-tag">Rokt · E-Commerce Ad-Tech · Experimentation &amp; Design · 2021</p>
        <h1 className="cs-h1">ROKT</h1>
        <p className="cs-lead">Improving revenue per transaction through experimentation</p>
        <p className="cs-lead" style={{ marginTop: 16 }}>Rokt helps companies generate additional revenue by showing ads at the moment of purchase. While overall revenue increased as more partners were added, a core metric — revenue per transaction (RPT) — had stagnated. The system was scaling, but the product itself wasn't becoming more effective.</p>
        <p className="cs-lead" style={{ marginTop: 16 }}>My focus was to improve RPT by identifying what actually drives engagement and conversion in this high-intent moment.</p>
      </div>

      <div className="cs-meta-row">
        {[
          ['Year', '2021'],
          ['Role', 'Experimentation Strategy\nDesign Direction\nTeam Mentorship'],
          ['Devices', 'Mobile\nDesktop'],
          ['Impact', '+25–30% lift in conversion per impression across key experiments, contributing to increased revenue per transaction (RPT)'],
        ].map(([l, v]) => (
          <div className="cs-meta-cell sr" key={l}>
            <p className="cs-meta-label">{l}</p>
            <p className="cs-meta-val">{v}</p>
          </div>
        ))}
      </div>

      <div className="cs-body no-dividers">
        <div className="cs-section sr">
          <img
            src="/images/rokt/rokt_hero.jpg"
            alt="Rokt Ad Experience Overview"
            style={{ width: '100%', borderRadius: 12, display: 'block' }}
          />
        </div>

        {/* BACKGROUND */}
        <div className="cs-section">
          <span className="cs-section-label sr">Background</span>
          <h2 className="cs-h2 sr">What is Rokt?</h2>
          <div className="cs-2col">
            <div>
              <p className="cs-p sr">Rokt is an ecommerce technology company that runs ads and offers on the checkout pages of Ticketmaster, Uber, Domino's and others. These ads are carefully selected so that they're relevant to the customer.</p>
              <div className="cs-callout sr" style={{ marginTop: 32 }}>
                <p><strong>Customers get ads after a purchase.</strong> On the confirmation page, every time a customer clicks on an ad, the website or app earns revenue from that advertiser. That means every transaction is an opportunity to earn revenue from ads. On the biggest US retail stores, this can reach $300k+ in a single day.</p>
              </div>
            </div>
          </div>
        </div>

        {/* BUSINESS CONTEXT */}
        <div className="cs-section">
          <span className="cs-section-label sr">The Business Context</span>
          <h2 className="cs-h2 sr">The business problem</h2>
          <div className="cs-2col">
            <div>
              <p className="cs-p sr">Ad revenue from the core product wasn't improving.</p>
              <p className="cs-p sr">Rokt's platform helps companies generate additional revenue by showing ads during high-intent moments, like after a purchase.</p>
              <p className="cs-p sr">For example, if a company earns an additional $0.10 per transaction from ads, that quickly scales. At 100,000 transactions, that's an extra $10,000 in revenue. This metric — revenue per transaction (RPT) — is a key indicator of how effective the product is.</p>
            </div>
            <div>
              <p className="cs-p sr">While overall revenue continued to grow as Rokt partnered with more companies, RPT had stagnated. The system was scaling, but the product itself wasn't becoming more effective.</p>
              <p className="cs-p sr">The goal was to meaningfully increase RPT.</p>
            </div>
          </div>
        </div>

        {/* MY ROLE */}
        <div className="cs-section">
          <span className="cs-section-label sr">My Role</span>
          <h2 className="cs-h2 sr">Design direction and experimentation strategy.</h2>
          <div className="cs-2col">
            <div>
              <p className="cs-p sr">I led design direction and experimentation strategy for improving ad performance across key partner experiences, while mentoring a designer through execution. My focus was not just designing ad units, but defining how design decisions influenced performance outcomes — work that sat at the intersection of product, data, and business.</p>
            </div>
            <div>
              {[
                ['Defining', 'what to test and how to structure each experiment'],
                ['Shaping', 'design directions that could be measured and iterated on'],
                ['Analyzing', 'how design decisions influenced performance outcomes'],
                ['Bridging', 'product, data, and business objectives across the team'],
              ].map(([tag, b]) => (
                <div key={tag} style={{ padding: '16px 0' }}>
                  <p style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--txt3)', marginBottom: 8 }}>{tag}</p>
                  <p className="cs-p" style={{ marginBottom: 0, fontSize: 14 }}>{b}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* APPROACH */}
        <div className="cs-section">
          <span className="cs-section-label sr">Approach</span>
          <h2 className="cs-h2 sr">Shifting from design to experimentation.</h2>
          <div className="cs-2col">
            <div>
              <p className="cs-p sr">Instead of treating this as a redesign effort, we reframed it as a system of continuous experimentation.</p>
              <p className="cs-p sr">We established a repeatable loop: generate hypotheses based on behavior and performance gaps, design targeted variations, test across live partner environments, measure impact on key metrics (CTR, conversion, RPT), then feed learnings into the next iteration.</p>
              <p className="cs-p sr">Over time, this shifted the team from shipping static designs to building a system that continuously improves performance.</p>
            </div>
            <div>
              <div className="cs-insight sr">
                <span className="cs-insight-label">Design Principle</span>
                <p className="cs-insight-text">The question isn't what should we design. It's what should we learn next.</p>
              </div>
              <div className="cs-callout sr" style={{ marginTop: 28 }}>
                <p><strong>Why experiment?</strong> Testing ideas before committing resources meant we could learn faster, fail cheaper, and ship with higher confidence in performance outcomes.</p>
              </div>
            </div>
          </div>

          {/* ── EXPERIMENTATION LOOP DIAGRAM ── */}
          <div className="sr" style={{
            marginTop: 72,
            padding: '40px 20px 28px',
            background: 'rgba(255,255,255,0.015)',
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: 6,
            overflow: 'hidden',
          }}>
            <p style={{
              fontFamily: 'var(--mono)',
              fontSize: 9,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.28)',
              marginBottom: 0,
              textAlign: 'center',
            }}>Experimentation Loop — System Overview</p>

            {/* SVG viewBox clips the standalone-file title block (y<120),
                showing only the loop itself. All colors adapted to dark theme. */}
            <svg
              viewBox="0 120 1000 740"
              style={{ width: '100%', height: 'auto', display: 'block' }}
            >
              <defs>
                <marker id="arr-exp" markerWidth="9" markerHeight="7" refX="8" refY="3.5" orient="auto" markerUnits="strokeWidth">
                  <polygon points="0 0.5, 8 3.5, 0 6.5" fill="#5B8BD4"/>
                </marker>
              </defs>

              {/* ── ARCS (deep blue, clockwise) ── */}
              {/* Arc 0 · Hypothesis → Design Variation  18°→42° */}
              <path d="M 577.3,212.2 A 250,250 0 0,1 667.3,264.2" fill="none" stroke="#5B8BD4" strokeWidth="1.3" markerEnd="url(#arr-exp)" opacity="0.7"/>
              {/* Arc 1 · Design Variation → Experiment  78°→102° */}
              <path d="M 744.5,398.0 A 250,250 0 0,1 744.5,502.0" fill="none" stroke="#5B8BD4" strokeWidth="1.3" markerEnd="url(#arr-exp)" opacity="0.7"/>
              {/* Arc 2 · Experiment → Measure  138°→162° */}
              <path d="M 667.3,635.8 A 250,250 0 0,1 577.3,687.8" fill="none" stroke="#5B8BD4" strokeWidth="1.3" markerEnd="url(#arr-exp)" opacity="0.7"/>
              {/* Arc 3 · Measure → Learn  198°→222° */}
              <path d="M 422.7,687.8 A 250,250 0 0,1 332.7,635.8" fill="none" stroke="#5B8BD4" strokeWidth="1.3" markerEnd="url(#arr-exp)" opacity="0.7"/>
              {/* Arc 4 · Learn → Iterate  258°→282° */}
              <path d="M 255.5,502.0 A 250,250 0 0,1 255.5,398.0" fill="none" stroke="#5B8BD4" strokeWidth="1.3" markerEnd="url(#arr-exp)" opacity="0.7"/>
              {/* Arc 5 · Iterate → Hypothesis  318°→342° */}
              <path d="M 332.7,264.2 A 250,250 0 0,1 422.7,212.2" fill="none" stroke="#5B8BD4" strokeWidth="1.3" markerEnd="url(#arr-exp)" opacity="0.7"/>

              {/* ── NODE 01 · Hypothesis (top, centered) ── */}
              <text x="500" y="157" textAnchor="middle" fill="rgba(255,255,255,0.2)"  fontSize={8}  fontFamily="'DM Mono','Courier New',monospace"    letterSpacing="0.18em">01</text>
              <text x="500" y="175" textAnchor="middle" fill="rgba(255,255,255,0.88)" fontSize={15} fontWeight="500" fontFamily="'Satoshi','Inter',sans-serif">Hypothesis</text>
              <text x="500" y="192" textAnchor="middle" fill="rgba(255,255,255,0.4)"  fontSize={10} fontFamily="'Satoshi','Inter',sans-serif">Based on observed behavior</text>
              <text x="500" y="206" textAnchor="middle" fill="rgba(255,255,255,0.4)"  fontSize={10} fontFamily="'Satoshi','Inter',sans-serif">or performance gaps</text>

              {/* ── NODE 02 · Design Variation (right-top) ── */}
              <text x="740" y="293" textAnchor="start" fill="rgba(255,255,255,0.2)"  fontSize={8}  fontFamily="'DM Mono','Courier New',monospace"    letterSpacing="0.18em">02</text>
              <text x="740" y="311" textAnchor="start" fill="rgba(255,255,255,0.88)" fontSize={15} fontWeight="500" fontFamily="'Satoshi','Inter',sans-serif">Design Variation</text>
              <text x="740" y="328" textAnchor="start" fill="rgba(255,255,255,0.4)"  fontSize={10} fontFamily="'Satoshi','Inter',sans-serif">Imagery, layout, content,</text>
              <text x="740" y="342" textAnchor="start" fill="rgba(255,255,255,0.4)"  fontSize={10} fontFamily="'Satoshi','Inter',sans-serif">or interaction pattern</text>

              {/* ── NODE 03 · Experiment (right-bottom) ── */}
              <text x="740" y="550" textAnchor="start" fill="rgba(255,255,255,0.2)"  fontSize={8}  fontFamily="'DM Mono','Courier New',monospace"    letterSpacing="0.18em">03</text>
              <text x="740" y="568" textAnchor="start" fill="rgba(255,255,255,0.88)" fontSize={15} fontWeight="500" fontFamily="'Satoshi','Inter',sans-serif">Experiment</text>
              <text x="740" y="585" textAnchor="start" fill="rgba(255,255,255,0.4)"  fontSize={10} fontFamily="'Satoshi','Inter',sans-serif">A/B tested across real users</text>
              <text x="740" y="599" textAnchor="start" fill="rgba(255,255,255,0.4)"  fontSize={10} fontFamily="'Satoshi','Inter',sans-serif">and partner environments</text>

              {/* ── NODE 04 · Measure (bottom, centered) ── */}
              <text x="500" y="722" textAnchor="middle" fill="rgba(255,255,255,0.2)"  fontSize={8}  fontFamily="'DM Mono','Courier New',monospace"    letterSpacing="0.18em">04</text>
              <text x="500" y="740" textAnchor="middle" fill="rgba(255,255,255,0.88)" fontSize={15} fontWeight="500" fontFamily="'Satoshi','Inter',sans-serif">Measure</text>
              <text x="500" y="757" textAnchor="middle" fill="rgba(255,255,255,0.4)"  fontSize={10} fontFamily="'Satoshi','Inter',sans-serif">CTR · conversion rate · revenue per transaction</text>

              {/* ── NODE 05 · Learn (left-bottom) ── */}
              <text x="260" y="550" textAnchor="end" fill="rgba(255,255,255,0.2)"  fontSize={8}  fontFamily="'DM Mono','Courier New',monospace"    letterSpacing="0.18em">05</text>
              <text x="260" y="568" textAnchor="end" fill="rgba(255,255,255,0.88)" fontSize={15} fontWeight="500" fontFamily="'Satoshi','Inter',sans-serif">Learn</text>
              <text x="260" y="585" textAnchor="end" fill="rgba(255,255,255,0.4)"  fontSize={10} fontFamily="'Satoshi','Inter',sans-serif">What influenced behavior?</text>
              <text x="260" y="599" textAnchor="end" fill="rgba(255,255,255,0.4)"  fontSize={10} fontFamily="'Satoshi','Inter',sans-serif">What increased engagement?</text>

              {/* ── NODE 06 · Iterate (left-top) ── */}
              <text x="260" y="293" textAnchor="end" fill="rgba(255,255,255,0.2)"  fontSize={8}  fontFamily="'DM Mono','Courier New',monospace"    letterSpacing="0.18em">06</text>
              <text x="260" y="311" textAnchor="end" fill="rgba(255,255,255,0.88)" fontSize={15} fontWeight="500" fontFamily="'Satoshi','Inter',sans-serif">Iterate</text>
              <text x="260" y="328" textAnchor="end" fill="rgba(255,255,255,0.4)"  fontSize={10} fontFamily="'Satoshi','Inter',sans-serif">Insights feed the next</text>
              <text x="260" y="342" textAnchor="end" fill="rgba(255,255,255,0.4)"  fontSize={10} fontFamily="'Satoshi','Inter',sans-serif">set of hypotheses</text>

              {/* ── CENTER LABEL ── */}
              <text x="500" y="437" textAnchor="middle" fill="rgba(255,255,255,0.1)" fontSize={8}  fontFamily="'DM Mono','Courier New',monospace" letterSpacing="0.14em">CONTINUOUS</text>
              <text x="500" y="452" textAnchor="middle" fill="rgba(255,255,255,0.1)" fontSize={8}  fontFamily="'DM Mono','Courier New',monospace" letterSpacing="0.14em">IMPROVEMENT</text>
              <text x="500" y="470" textAnchor="middle" fill="rgba(255,255,255,0.12)" fontSize={16} fontFamily="'Satoshi','Inter',sans-serif">↻</text>

              {/* ── ANNOTATIONS (very subtle) ── */}
              <text x="94"  y="424" textAnchor="middle" fill="rgba(255,255,255,0.22)" fontSize={8.5} fontFamily="'Satoshi','Inter',sans-serif">40+ experiments</text>
              <text x="94"  y="438" textAnchor="middle" fill="rgba(255,255,255,0.22)" fontSize={8.5} fontFamily="'Satoshi','Inter',sans-serif">across 10+ design</text>
              <text x="94"  y="452" textAnchor="middle" fill="rgba(255,255,255,0.22)" fontSize={8.5} fontFamily="'Satoshi','Inter',sans-serif">directions</text>
              <line x1="150" y1="438" x2="163" y2="438" stroke="rgba(255,255,255,0.1)" strokeWidth="0.6"/>

              <text x="906" y="424" textAnchor="middle" fill="rgba(255,255,255,0.22)" fontSize={8.5} fontFamily="'Satoshi','Inter',sans-serif">Experiment velocity</text>
              <text x="906" y="438" textAnchor="middle" fill="rgba(255,255,255,0.22)" fontSize={8.5} fontFamily="'Satoshi','Inter',sans-serif">monthly → biweekly</text>
              <line x1="837" y1="438" x2="850" y2="438" stroke="rgba(255,255,255,0.1)" strokeWidth="0.6"/>

              <text x="500" y="800" textAnchor="middle" fill="rgba(255,255,255,0.22)" fontSize={8.5} fontFamily="'Satoshi','Inter',sans-serif">↑  Improved revenue per transaction</text>
            </svg>
          </div>
        </div>

        {/* DISCOVERY */}
        <div className="cs-section">
          <span className="cs-section-label sr">User Research</span>
          <h2 className="cs-h2 sr">The finding that changed everything.</h2>

          {/* Intro + method cards */}
          <p className="cs-p sr" style={{ maxWidth: 680 }}>I surveyed and screened over 100 users to interview 50 about their experience shopping online and encountering ads. Sessions were conducted on actual sites they use — probing how they notice, process, and respond to ads at different points in the journey.</p>

          <div className="cs-method-row sr" style={{ marginTop: 40 }}>
            {[
              ['📊', 'Data Audit', 'Tableau + Business Analytics'],
              ['🎙', 'User Interviews', '50 in-depth sessions'],
              ['📋', 'User Surveys', '100+ screened respondents'],
            ].map(([g, n, c]) => (
              <div className="cs-method-card" key={n}>
                <span className="cs-method-glyph">{g}</span>
                <p className="cs-method-name">{n}</p>
                <p className="cs-method-count">{c}</p>
              </div>
            ))}
          </div>

          {/* Pullquote — full width */}
          <div className="cs-pullquote sr" style={{ marginTop: 64 }}>
            <p className="cs-pullquote-text">"I don't even see them anymore. My brain just skips past anything that looks like an ad."</p>
            <p className="cs-pullquote-attr">User interview · Discovery research</p>
          </div>

          {/* Dot matrix + central finding side by side */}
          <div className="cs-2col sr" style={{ marginTop: 0, alignItems: 'center' }}>
            <div className="cs-dot-matrix">
              <div className="cs-dot-grid">
                {Array.from({ length: 100 }).map((_, i) => (
                  <div className={`cs-dot${i >= 50 ? ' empty' : ''}`} key={i} />
                ))}
              </div>
              <p className="cs-dot-fraction">50 <span>/ 100+</span></p>
              <p className="cs-dot-label">users screened — 50 selected for in-depth sessions based on shopping behavior and ad engagement patterns</p>
            </div>
            <div className="cs-insight" style={{ margin: 0, padding: '40px 0' }}>
              <span className="cs-insight-label">Central Finding</span>
              <p className="cs-insight-text">Users aren't passively ignoring ads — they're actively avoiding them regardless of relevance. The question became: how do we earn the right to be there at all?</p>
            </div>
          </div>
        </div>

        {/* KEY EXPERIMENTS */}
        <div className="cs-section">
          <span className="cs-section-label sr">Key Experiments</span>
          <h2 className="cs-h2 sr">34 experiments · 7 verticals · 200+ tests</h2>
          <div className="cs-kpi-row sr">
            {[
              ['+25%', 'Visual Context', 'conversion per impression with functional and contextual imagery'],
              ['Incremental Lift', 'Content Clarity', 'improved performance through structured content and clearer scanning'],
              ['+30%', 'Interaction Control', 'conversion per impression by introducing navigation between offers'],
            ].map(([n, l, d]) => (
              <div className="cs-kpi" key={l}>
                <p className="cs-kpi-num">{n}</p>
                <p className="cs-kpi-label">{l}</p>
                <p className="cs-kpi-desc">{d}</p>
              </div>
            ))}
          </div>
          <div className="cs-finding-grid sr" style={{ marginTop: 64 }}>
            {[
              { tag: 'Experiment · Visual Context', h: 'Relevance mattered more than visual restraint', b: 'Imagery had been avoided due to historically poor performance. Testing functional and contextual imagery — visuals that reinforced the offer\'s value — showed that relevance and clarity outweighed assumptions about visual noise. Result: +25% conversion per impression.' },
              { tag: 'Experiment · Content Clarity', h: 'Users scan, not read', b: 'In transactional flows, users process information quickly. Replacing dense copy with structured benefit lists made offers easier to evaluate at a glance. Result: incremental performance lift and measurably improved clarity scores.' },
              { tag: 'Experiment · Interaction Control', h: 'Agency increased engagement', b: 'Once dismissed, offers could not be revisited. Adding navigation between offers let users explore at their own pace — shifting the experience from passive exposure to active exploration. Result: +30% conversion per impression.' },
              { tag: 'Experiment · Visual Trust', h: 'Brand association drove content engagement', b: "Users were more likely to engage with ad content when the UI mirrored the visual language of the host site. They extended trust from the brand they had just purchased from to the ad content alongside it. Ads that felt native weren't seen as intrusions — they were perceived as endorsed." },
            ].map(({ tag, h, b }) => (
              <div className="cs-finding sr" key={tag}>
                <span className="cs-finding-tag">{tag}</span>
                <p className="cs-finding-headline">{h}</p>
                <p className="cs-finding-body">{b}</p>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 64 }}>
            <ExperimentViewer />
          </div>
        </div>

        {/* IMPACT */}
        <div className="cs-section">
          <span className="cs-section-label sr">Impact</span>
          <h2 className="cs-h2 sr">More than incremental improvements.</h2>
          <div className="cs-2col">
            <div>
              <p className="cs-p sr">This work extended beyond individual experiment results. 40+ experiments across multiple design directions, doubled experimentation velocity from monthly to biweekly, and applied learnings across major partners.</p>
              <p className="cs-p sr">This created a system where performance improvements could compound over time — not just for a single partner, but across the platform.</p>
            </div>
            <div>
              {[
                ['Revenue impact', 'Increased revenue per transaction across partner experiences'],
                ['Framework', 'Established a repeatable experimentation framework used across the team'],
                ['Design elevation', "Elevated design's role from execution to performance driver"],
              ].map(([tag, b]) => (
                <div key={tag} style={{ padding: '16px 0' }}>
                  <p style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--txt3)', marginBottom: 8 }}>{tag}</p>
                  <p className="cs-p" style={{ marginBottom: 0, fontSize: 14 }}>{b}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* LEARNINGS */}
        <div className="cs-section">
          <span className="cs-section-label sr">What I Learned</span>
          <h2 className="cs-h2 sr">Systems learn. Designs don't.</h2>
          <div className="cs-finding-grid sr">
            {[
              { h: "The most effective products aren't defined by a single solution. They're defined by how well they learn.", b: 'In high-intent environments, small changes can have outsized impact. The key is not predicting the right answer upfront, but building systems that can discover it quickly.' },
              { h: "Design's role is most powerful when it's connected to outcomes, not just outputs.", b: "The work that mattered most wasn't any individual design decision. It was building a system that could continuously improve — and positioning design as the engine of that improvement." },
            ].map(({ h, b }) => (
              <div className="cs-finding" key={h}>
                <span className="cs-finding-tag">Key Learning</span>
                <p className="cs-finding-headline">{h}</p>
                <p className="cs-finding-body">{b}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  )
}
