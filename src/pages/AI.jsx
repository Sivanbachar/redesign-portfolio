import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useScrollReveal } from '../hooks/useScrollReveal.js'
import { AI_PROJECTS } from '../data/aiProjects.js'

export default function AI() {
  const navigate = useNavigate()
  useScrollReveal()

  useEffect(() => {
    document.title = 'AI Projects · Sivan Baum'
  }, [])

  return (
    <div className="pg ai-pg">

      {/* ── Page header ── */}
      <header className="ai-header">
        <div className="ai-header-inner">
          <p className="ai-header-label sr">AI Projects</p>
          <h1 className="ai-header-h1 sr d1">AI Projects</h1>
          <p className="ai-header-sub sr d2">
            I use AI to compress execution time — which frees up space for product
            thinking, strategy, and the decisions that actually shape what gets built.
            These are real builds, not concepts.
          </p>
        </div>
      </header>

      {/* ── Project grid ── */}
      <section className="ai-grid-sec">
        {AI_PROJECTS.map((p, i) => (
          <div
            key={p.id}
            className="proj-panel page-section ai-proj-panel"
            data-section={p.id}
            onClick={() => navigate(p.route)}
            style={{ cursor: 'pointer' }}
          >
            <div className="proj-panel-inner">
              <div className="proj-text">
                <p className="proj-counter sr">
                  {String(i + 1).padStart(2, '0')} / {String(AI_PROJECTS.length).padStart(2, '0')}
                </p>
                <p className="proj-type sr d1">{p.type}</p>
                <h2 className="proj-title sr d2">{p.title}</h2>
                <p className="proj-desc sr d3">{p.tagline}</p>
                <span className="proj-link sr d4">View Project →</span>
              </div>
              <div className="proj-img-wrap">
                <div className="proj-img-block" style={{ background: p.thumbBg }}>
                  {p.thumbImg ? (
                    <img src={`/${p.thumbImg}`} alt={p.title} className="proj-img-photo" />
                  ) : (
                    <span style={{ fontSize: 48, opacity: 0.08 }}>{p.thumbIcon}</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* ── More coming ── */}
      <section className="ai-more sr">
        <div className="ai-more-inner">
          <div className="ai-more-line" />
          <div className="ai-more-content">
            <p className="ai-more-label">What's next</p>
            <h2 className="ai-more-h2">More in progress.</h2>
            <p className="ai-more-p">
              Actively experimenting with new workflows — from design systems generation
              to research synthesis. New projects will appear here as they develop.
            </p>
            <div className="ai-more-dots">
              <span className="ai-dot ai-dot--active" />
              <span className="ai-dot" />
              <span className="ai-dot" />
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
