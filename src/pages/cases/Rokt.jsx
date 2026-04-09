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
