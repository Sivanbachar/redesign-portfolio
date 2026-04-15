import { useEffect } from 'react'
import { useScrollReveal } from '../../hooks/useScrollReveal.js'
import { AI_PROJECTS } from '../../data/aiProjects.js'

const p = AI_PROJECTS.find(x => x.id === 'reseller')

export default function AIResellerApp() {
  useScrollReveal()

  useEffect(() => {
    document.title = `${p.title} · AI Projects · Sivan Baum`
  }, [])

  return (
    <div className="pg aip-pg">

      {/* ── A. Hero ── */}
      <header className="aip-hero">
        <div className="aip-hero-inner">
          <p className="aip-breadcrumb sr">AI Projects</p>
          <h1 className="aip-title sr d1">{p.title}</h1>
          <p className="aip-description sr d2">{p.description}</p>
        </div>
      </header>

      <div className="aip-body">

        {/* ── B. Project Description ── */}
        <section className="aip-section sr">
          <div className="aip-section-label">
            <span className="cs-section-label">About</span>
          </div>
          <div className="aip-section-content">
            {p.about.map((para, i) => (
              <p key={i} className="aip-para sr d1">{para}</p>
            ))}
          </div>
        </section>

        {/* ── C. Prototype ── */}
        <section className="aip-section sr">
          <div className="aip-section-label">
            <span className="cs-section-label">Prototype</span>
          </div>
          <div className="aip-section-content">
            <a
              href={p.prototype}
              target="_blank"
              rel="noopener noreferrer"
              className="aip-proto-cta sr d1"
            >
              <div className="aip-proto-cta-inner">
                <div className="aip-proto-cta-left">
                  <p className="aip-proto-cta-label">Interactive Prototype</p>
                  <p className="aip-proto-cta-name">{p.title}</p>
                  <p className="aip-proto-cta-sub">Designed in Google Stitch · Opens in new tab</p>
                </div>
                <span className="aip-proto-cta-btn">View Prototype ↗</span>
              </div>
            </a>
          </div>
        </section>

        {/* ── D. Tools Used ── */}
        <section className="aip-section sr">
          <div className="aip-section-label">
            <span className="cs-section-label">Tools</span>
          </div>
          <div className="aip-section-content">
            <ul className="aip-tools-list">
              {p.tools.map((t, i) => (
                <li key={i} className="aip-tool-row sr d1">
                  <span className="aip-tool-name">{t.name}</span>
                  <span className="aip-tool-note">{t.note}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── E. Build Time Comparison ── */}
        <section className="aip-section sr">
          <div className="aip-section-label">
            <span className="cs-section-label">Time</span>
          </div>
          <div className="aip-section-content">
            <div className="aip-time-compare sr d1">
              <div className="aip-time-block aip-time-block--ai">
                <span className="aip-time-label">Built with AI</span>
                <span className="aip-time-value">{p.builtWithAI}</span>
              </div>
              <div className="aip-time-divider" />
              <div className="aip-time-block aip-time-block--no-ai">
                <span className="aip-time-label">Estimated without</span>
                <span className="aip-time-value aip-time-value--dim">{p.estimatedWithout}</span>
              </div>
            </div>
            <p className="aip-para aip-time-note sr d2">{p.timeNote}</p>
          </div>
        </section>

        {/* ── F. Learnings ── */}
        <section className="aip-section sr">
          <div className="aip-section-label">
            <span className="cs-section-label">Learnings</span>
          </div>
          <div className="aip-section-content">
            {p.learnings.map((l, i) => (
              <div key={i} className="aip-learning sr d1" style={{ '--delay': `${i * 0.06}s` }}>
                <p className="aip-learning-heading">{l.heading}</p>
                <p className="aip-learning-body">{l.body}</p>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  )
}
