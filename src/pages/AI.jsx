import { useEffect } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal.js'

const AI_PROJECTS = [
  {
    id: 'portfolio',
    index: '01',
    status: 'Active',
    label: 'Currently',
    title: 'AI-Augmented Portfolio Build',
    headline: 'Using AI to accelerate execution so I can focus on product strategy and human-centered problem solving.',
    image: '/images/ai/currently.png',
    body: [
      { text: "I built this portfolio entirely through vibe coding, using AI to generate, refine, and ship directly in code." },
      { text: "What would typically take two to three months to build and polish took closer to two weeks. Without the usual constraints of design tools, I was able to move faster, iterate more freely, and focus on what actually matters." },
      { text: "Within that same window, I also rebuilt two prototypes using Figma Make, translating ideas into working experiences much more quickly than traditional workflows allow." },
      { text: "The shift isn't just speed. It's where that speed gets reinvested." },
      { text: "Less time producing artifacts. More time defining problems, shaping product direction, and making decisions about how things should work." },
      { text: "", bold: "We're not just designing faster. We're designing differently." },
    ],
    learnings: [
      "The output is never 1:1. It's a starting point, not a final comp",
      "The quality of the design lives or dies in how well you articulate intent",
      "It rewards designers who think in systems, not just screens",
    ],
    tools: [
      { name: 'Claude Code', role: 'Primary build environment', icon: '⬡' },
      { name: 'Figma', role: 'Design conversions + artifact repository', icon: '◈' },
      { name: 'ChatGPT', role: 'Historical prompting + ideation', icon: '◎' },
    ],
  },
]

export default function AI() {
  useScrollReveal()

  useEffect(() => {
    document.title = 'My AI Work · Sivan Baum'
  }, [])

  return (
    <div className="pg ai-pg">

      {/* ── Page header ── */}
      <header className="ai-header">
        <div className="ai-header-inner">
          <p className="ai-header-label sr">My AI Work</p>
          <h1 className="ai-header-h1 sr d1">
            Building faster<br />so I can think deeper.
          </h1>
          <p className="ai-header-sub sr d2">
            A running log of what I'm making and learning at the
            intersection of product design and AI tools.
          </p>
        </div>
      </header>

      {/* ── Project list ── */}
      <section className="ai-list">
        {AI_PROJECTS.map((p) => (
          <article key={p.id} className="ai-entry sr">

            {/* Entry header row */}
            <div className="ai-entry-meta">
              <span className="ai-entry-num">{p.index}</span>
              <span className="ai-entry-status">{p.status}</span>
            </div>

            <div className="ai-entry-body">

              {/* Left: text content */}
              <div className="ai-entry-text">
                <p className="ai-entry-label sr d1">{p.label}</p>
                <h2 className="ai-entry-h2 sr d2">{p.headline}</h2>

                <div className="ai-entry-paras">
                  {p.body.map((b, i) => (
                    <p key={i} className="ai-entry-p sr d3">
                      {b.text}{b.bold && <> <strong>{b.bold}</strong></>}
                    </p>
                  ))}
                </div>

                {/* What I'm learning */}
                <div className="ai-learning sr d4">
                  <p className="ai-learning-heading">What I'm learning</p>
                  <ol className="ai-learning-list">
                    {p.learnings.map((l, i) => (
                      <li key={i} className="ai-learning-item">
                        <span className="ai-learning-num">{String(i + 1).padStart(2, '0')}</span>
                        <span>{l}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                {/* Tools */}
                <div className="ai-tools sr d4">
                  <p className="ai-tools-heading">Tools</p>
                  <ul className="ai-tools-list">
                    {p.tools.map((t, i) => (
                      <li key={i} className="ai-tool-item">
                        <span className="ai-tool-icon">{t.icon}</span>
                        <span className="ai-tool-info">
                          <span className="ai-tool-name">{t.name}</span>
                          <span className="ai-tool-role">{t.role}</span>
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Right: image */}
              <div className="ai-entry-img-wrap">
                <div className="ai-entry-img-block">
                  <img src={p.image} alt={p.title} className="ai-entry-img" />
                </div>
              </div>

            </div>
          </article>
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
              I'm actively experimenting with new AI-assisted workflows,
              from design systems generation to research synthesis.
              New projects will appear here as they develop.
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
