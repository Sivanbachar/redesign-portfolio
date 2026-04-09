import { useNavigate } from 'react-router-dom'
import { useScrollReveal } from '../../hooks/useScrollReveal.js'
import { useReadingProgress } from '../../hooks/useReadingProgress.js'
import VP from '../../components/VP.jsx'

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
        <p className="cs-lead">Improving ad performance through experimentation, not redesign. This wasn't about redesigning an ad unit. It was about understanding what actually drives action and systematically improving it.</p>
      </div>

      <div className="cs-meta-row">
        {[
          ['Year', '2021'],
          ['Role', 'Design Direction\nExperimentation Strategy\nTeam Mentorship'],
          ['Devices', 'Mobile\nDesktop'],
          ['Impact', '+25–30% conversion\nper impression across key experiments'],
        ].map(([l, v]) => (
          <div className="cs-meta-cell sr" key={l}>
            <p className="cs-meta-label">{l}</p>
            <p className="cs-meta-val">{v}</p>
          </div>
        ))}
      </div>

      <div className="cs-body">
        <div className="cs-section sr">
          <VP label="Rokt Ad Experience Overview" desc="Ad placement UI across partner checkout flows. Mobile and desktop frames." height={440} />
        </div>

        {/* BUSINESS CONTEXT */}
        <div className="cs-section">
          <span className="cs-section-label sr">The Business Context</span>
          <h2 className="cs-h2 sr">Scale wasn't the problem.<br />Effectiveness was.</h2>
          <div className="cs-2col">
            <div>
              <p className="cs-p sr">At Rokt, every transaction is an opportunity to generate revenue through relevant offers. But while overall revenue was increasing, performance at the product level had plateaued.</p>
              <p className="cs-p sr">The core metric — revenue per transaction — had seen little improvement over time. The problem wasn't scale. It was effectiveness.</p>
            </div>
            <div>
              <p className="cs-p sr">Improving performance meant navigating a constant tension: more visibility created higher revenue potential, but more friction created a worse user experience.</p>
              <div className="cs-callout sr">
                <p>Ads are inherently interruptive. The goal wasn't to remove them. It was to make them more relevant, more understandable, and easier to engage with.</p>
              </div>
            </div>
          </div>
        </div>

        {/* MY ROLE */}
        <div className="cs-section">
          <span className="cs-section-label sr">My Role</span>
          <h2 className="cs-h2 sr">Design direction and experimentation strategy.</h2>
          <div className="cs-2col">
            <div>
              <p className="cs-p sr">I led design direction and experimentation strategy for improving ad performance across key partners, while mentoring a designer through execution and iteration.</p>
            </div>
            <div>
              {[
                ['Defining', 'what to test and why'],
                ['Shaping', 'design directions across multiple partners'],
                ['Guiding', 'iterations based on experiment results'],
                ['Collaborating', 'closely with product, data, and account teams'],
              ].map(([tag, b]) => (
                <div key={tag} style={{ padding: '16px 0', borderTop: '1px solid var(--bdr)' }}>
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
              <p className="cs-p sr">Instead of treating this as a design problem, we treated it as a system of experiments.</p>
              <p className="cs-p sr">We established a repeatable loop: design variations based on hypotheses, test across partner environments, measure performance, then feed learnings into the next iteration.</p>
              <p className="cs-p sr">Over time, this shifted the team from shipping static designs to continuously improving performance.</p>
            </div>
            <div>
              <div className="cs-insight sr">
                <span className="cs-insight-label">Design Principle</span>
                <p className="cs-insight-text">The question isn't what should we design. It's what should we learn next.</p>
              </div>
              <div className="cs-callout sr" style={{ marginTop: 16 }}>
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
          <div className="cs-2col">
            <div>
              <p className="cs-p sr">I surveyed and screened over 100 users to interview 50 regarding their general experience shopping online and encountering ads in their journey. These interviews consisted of questions to probe users about their experience while going through actual websites they enjoy shopping on.</p>
              <div className="cs-method-row sr" style={{ marginTop: 24 }}>
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
              <div className="cs-dot-matrix sr" style={{ marginTop: 24 }}>
                <div className="cs-dot-grid">
                  {Array.from({ length: 100 }).map((_, i) => (
                    <div className={`cs-dot${i >= 50 ? ' empty' : ''}`} key={i} />
                  ))}
                </div>
                <p className="cs-dot-fraction">50 <span>/ 100+</span></p>
                <p className="cs-dot-label">users screened — 50 selected for in-depth sessions based on shopping behavior and ad engagement patterns</p>
              </div>
            </div>
            <div>
              <div className="cs-pullquote sr">
                <p className="cs-pullquote-text">"I don't even see them anymore. My brain just skips past anything that looks like an ad."</p>
                <p className="cs-pullquote-attr">User interview · Discovery research</p>
              </div>
              <div className="cs-insight sr" style={{ marginTop: 24 }}>
                <span className="cs-insight-label">Central Finding</span>
                <p className="cs-insight-text">Users aren't passively ignoring ads. They are actively and consciously avoiding them regardless of relevance. The question became: how do we earn the right to be there at all?</p>
              </div>
            </div>
          </div>
        </div>

        {/* KEY EXPERIMENTS */}
        <div className="cs-section">
          <span className="cs-section-label sr">Key Experiments</span>
          <h2 className="cs-h2 sr">34 designs. 7 verticals. 200+ user tests.</h2>
          <div className="cs-kpi-row sr">
            {[
              ['+25%', 'Imagery', 'conversion per impression with functional and contextual images'],
              ['Mixed', 'Content Structure', 'slight revenue lift with improved clarity through benefit lists'],
              ['+30%', 'Interaction Control', 'conversion per impression by introducing offer navigation'],
            ].map(([n, l, d]) => (
              <div className="cs-kpi" key={l}>
                <p className="cs-kpi-num">{n}</p>
                <p className="cs-kpi-label">{l}</p>
                <p className="cs-kpi-desc">{d}</p>
              </div>
            ))}
          </div>
          <div className="cs-finding-grid sr" style={{ marginTop: 40 }}>
            {[
              { tag: 'Experiment · Imagery', h: 'Overcoming hesitation around visuals', b: 'There was initial hesitation around using images due to historically poor performance. We tested functional and contextual imagery and saw a significant increase in engagement. Result: +25% conversion per impression.' },
              { tag: 'Experiment · Content Structure', h: 'Designing for how users actually read', b: 'Users tend to scan rather than read, especially in transactional moments. We introduced structured benefit lists to make offers easier to parse. Result: mixed impact, but improved clarity and a slight lift in revenue.' },
              { tag: 'Experiment · Interaction Control', h: 'Giving users agency over the experience', b: 'Previously, once a user skipped an offer, they couldn\'t revisit it. We introduced navigation between offers, giving users more control over what they engaged with. Result: +30% conversion per impression.' },
            ].map(({ tag, h, b }) => (
              <div className="cs-finding sr" key={tag}>
                <span className="cs-finding-tag">{tag}</span>
                <p className="cs-finding-headline">{h}</p>
                <p className="cs-finding-body">{b}</p>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 40 }}>
            <VP label="Design Variant Grid" desc="Grid of ad variants across key experiments with hypothesis labels and result annotations." height={440} />
          </div>
        </div>

        {/* IMPACT */}
        <div className="cs-section">
          <span className="cs-section-label sr">Impact</span>
          <h2 className="cs-h2 sr">More than incremental improvements.</h2>
          <div className="cs-2col">
            <div>
              <p className="cs-p sr">Over time, this work led to outcomes beyond individual experiment results.</p>
              <p className="cs-p sr">Increased revenue per transaction across major partners. A new standard for ad unit design. A playbook of best practices grounded in real performance data.</p>
            </div>
            <div>
              {[
                ['Experimentation velocity', 'Doubled the speed of experimentation — monthly cycles became biweekly'],
                ['Design standard', 'Defined a reusable framework for ad unit design across partner verticals'],
                ['Business impact', 'Increased revenue per transaction across major partners'],
              ].map(([tag, b]) => (
                <div key={tag} style={{ padding: '16px 0', borderTop: '1px solid var(--bdr)' }}>
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
              { h: 'Ads are inevitable. Relevance is the opportunity.', b: 'Balancing business and user needs isn\'t about choosing one over the other. The opportunity is in making ads feel relevant and useful rather than intrusive.' },
              { h: 'The best improvements come from systems, not solutions.', b: 'The most effective improvements didn\'t come from a single design decision. They came from building a system that could continuously learn and adapt based on real performance data.' },
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

      <footer className="footer" style={{ marginTop: 80 }}>
        <button className="cs-back" style={{ padding: 0 }} onClick={() => navigate('/')}>← All Work</button>
        <button className="nav-btn" onClick={() => navigate('/projects/swiftshift')}>Next: Swift Shift →</button>
      </footer>
    </div>
  )
}
