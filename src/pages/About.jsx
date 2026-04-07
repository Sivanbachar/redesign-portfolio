import { useNavigate } from 'react-router-dom'
import { useScrollReveal } from '../hooks/useScrollReveal.js'

const skills = [
  {
    group: 'Design',
    items: ['Product Design', 'Interaction Design', 'UX Frameworks', 'Visual Design', 'Rapid Prototyping', 'Interaction Modeling'],
  },
  {
    group: 'Strategy',
    items: ['Product Strategy 0→1', 'Product Discovery', 'Experimentation', 'Stakeholder Alignment', 'Product Systems'],
  },
  {
    group: 'AI Workflows',
    items: ['AI Prototyping', 'Agentic Workflows', 'Prompt Design', 'Code-Assisted Design'],
  },
  {
    group: 'Tools',
    items: ['Figma', 'Framer', 'Claude Code', 'Kiro', 'Jira', 'Asana'],
  },
]

const experience = [
  {
    logo: 'A',
    role: 'UX Designer II',
    company: 'Amazon · Kindle',
    location: 'New York',
    date: 'Aug 2022 to Present',
    bullets: [
      'Defined and secured leadership adoption of a 3-year vision for the core Kindle reading experience across mobile and e-reader platforms, shaping roadmap investment and enabling new in-book content capabilities.',
      'Led end-to-end design and launch of four customer-facing features Pinnable Content, Link Preview, Hotspots, and Entity Cards improving discoverability and engagement across millions of reading sessions.',
      'Architected a scalable UX framework for contextual content, increasing feature development velocity and reducing time-to-launch for new reading capabilities.',
      'Used AI-assisted prototyping via Kiro to build functional, production-like prototypes, shortening iteration cycles and reducing engineering rework through earlier stakeholder alignment.',
    ],
  },
  {
    logo: 'G',
    role: 'Head of Service & Product Design',
    company: 'Getuwell',
    location: 'New York',
    date: 'Nov 2021 to Aug 2022',
    bullets: [
      'Led launch and scale of a high-volume COVID-19 testing service, designing integrated digital and operational systems across physical and digital touchpoints.',
      'Ran on-site workflow diagnostics and redesigned intake processes, increasing daily patient throughput and clearing operational bottlenecks.',
      'Designed and launched patient-facing digital experiences that streamlined scheduling and improved visit efficiency end to end.',
    ],
  },
  {
    logo: 'R',
    role: 'UX Designer',
    company: 'Rokt',
    location: 'New York',
    date: 'Oct 2020 to Nov 2021',
    bullets: [
      'Led experimentation-driven optimization of checkout cross-sell experiences, designing and testing variations in placement, messaging, and interaction patterns.',
      'Ran multivariate experiments that improved click-through and conversion rates by double-digit percentages, directly informing product and monetization strategy.',
    ],
  },
  {
    logo: 'S',
    role: 'UX Designer',
    company: 'Swift Shift',
    location: 'New York',
    date: 'Feb 2019 to Oct 2020',
    bullets: [
      'Served as sole designer across three products, establishing structured UX research practices and scalable experience frameworks from scratch.',
      'Conducted research with schedulers and nurses to digitize manual coordination workflows, increasing nurse application rates while reducing scheduler workload.',
    ],
  },
]

export default function About() {
  const navigate = useNavigate()
  useScrollReveal()

  return (
    <div className="pg">
      <div className="resume-wrap">

        {/* Header photo + name + bio */}
        <div className="resume-header sr">
          <div className="resume-photo-wrap">
            <img src="/images/resume/profile.png" alt="Sivan Baum" className="resume-portrait" />
          </div>
          <div>
            <h1 className="resume-name">
              Sivan
              <br />
              Baum
            </h1>
            <p className="resume-bio">
              Senior Product Designer at Amazon, focused on the Kindle reading experience.
            </p>
            <p className="resume-bio">
              I define the interaction models and systems that products rely on, translating
              ambiguous ideas into concrete, scalable experiences. I use AI to accelerate
              exploration and reduce the cost of iteration, enabling teams to make better product
              decisions earlier.
            </p>
            <p className="resume-bio">
              My work reaches millions of users and helps teams align on what to build by making
              how it works undeniable, rapidly exploring, prototyping, and pressure testing ideas
              before they reach engineering.
            </p>
            <div className="resume-actions">
              <button
                className="btn-pdf"
                onClick={() => window.open('mailto:builtbysivan@gmail.com')}
              >
                Download Resume ↗
              </button>
              <div
                className="social-icon"
                onClick={() => window.open('https://www.linkedin.com/in/sivanbachar/', '_blank')}
                title="LinkedIn"
              >
                in
              </div>
              <div
                className="social-icon"
                onClick={() => window.open('mailto:builtbysivan@gmail.com')}
                title="Email"
              >
                @
              </div>
            </div>
          </div>
        </div>

        {/* Body two column */}
        <div className="resume-body">

          {/* LEFT COLUMN */}
          <div className="resume-left">

            {/* Education */}
            <div className="sr">
              <h2 className="resume-h">Education</h2>
              <div className="edu-entry">
                <p className="edu-degree">B.A., Marketing &amp; Management</p>
                <p className="edu-school">Stern / Sy Syms Business School, Yeshiva University</p>
                <p className="edu-year">2012 to 2016</p>
              </div>
              <div className="edu-entry">
                <p className="edu-degree">Certification, Human-Computer Interaction</p>
                <p className="edu-school">General Assembly</p>
                <p className="edu-year">2017</p>
              </div>
              <div className="edu-entry">
                <p className="edu-degree">Certification, Lean UX Workshop Facilitation</p>
                <p className="edu-school">Lean UX</p>
                <p className="edu-year">2021</p>
                <span className="edu-badge">🏅 Workshop Facilitator</span>
              </div>
            </div>

            {/* Skills */}
            <div className="sr d1">
              <h2 className="resume-h">Skills</h2>
              {skills.map(({ group, items }) => (
                <div className="skills-group" key={group}>
                  <p className="skills-group-label">{group}</p>
                  <div className="skills-pills">
                    {items.map((s) => (
                      <span className="skill-pill" key={s}>
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Languages */}
            <div className="sr d2">
              <h2 className="resume-h">Languages</h2>
              <div className="lang-entry">
                <span className="lang-name">English</span>
                <div className="lang-dots">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className={`lang-dot${i <= 5 ? ' filled' : ''}`} />
                  ))}
                </div>
              </div>
              <div className="lang-entry">
                <span className="lang-name">Hebrew</span>
                <div className="lang-dots">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className={`lang-dot${i <= 3 ? ' filled' : ''}`} />
                  ))}
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN */}
          <div className="resume-right">
            <h2 className="resume-h sr">Experience</h2>

            {experience.map((e) => (
              <div className="exp-entry sr" key={e.role + e.company}>
                <div>
                  <div className="exp-logo">
                    <span className="exp-logo-letter">{e.logo}</span>
                  </div>
                </div>
                <div className="exp-right">
                  <div className="exp-top">
                    <span className="exp-role">{e.role}</span>
                    <span className="exp-date">{e.date}</span>
                  </div>
                  <p className="exp-company">
                    <span>{e.company}</span> · {e.location}
                  </p>
                  <ul className="exp-bullets">
                    {e.bullets.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}

            {/* Leadership */}
            <div style={{ marginTop: 48 }}>
              <h2 className="resume-h sr">Leadership</h2>
              <div className="leadership-entry sr">
                <p className="leadership-badge">🎤 Panel Speaker</p>
                <p className="leadership-title">Designing in the Age of AI</p>
                <p className="leadership-meta">Amazon Conflux Design Summit · 2025</p>
                <p className="leadership-desc">
                  Spoke on a panel exploring how AI tools are reshaping product design workflows
                  covering prototyping with code agents, prompt-driven iteration, and what it
                  means to design when the machine can build.
                </p>
                <img
                  src="/images/resume/speaker.png"
                  alt="Speaking at Amazon Conflux Design Summit 2025"
                  style={{ width: '100%', maxWidth: 560, borderRadius: 8, border: '1px solid var(--bdr)', display: 'block', marginTop: 20 }}
                />
              </div>
            </div>

          </div>
        </div>

        {/* Outside work */}
        <div className="outside-sec sr">
          <h2 className="resume-h">Outside work</h2>
          <div className="outside-grid">
            <div className="outside-cell">
              <div className="outside-icon">🏷️</div>
              <p className="outside-title">Thrift &amp; flip</p>
              <p className="outside-desc">
                I've been buying second-hand for as long as I can remember. I look for pieces
                with good bones, fix what's worth keeping, and let go of what isn't. It's the
                same instinct I bring to design.
              </p>
            </div>
            <div className="outside-cell">
              <div className="outside-icon">♻️</div>
              <p className="outside-title">Sustainable by default</p>
              <p className="outside-desc">
                I've furnished my home almost entirely second hand, one intentional find at a
                time. Nothing rushed, nothing disposable. I'm drawn to things that last and
                get better with age.
              </p>
            </div>
            <div className="outside-cell">
              <div className="outside-icon">🛋️</div>
              <p className="outside-title">Obsessed with mid-century modern</p>
              <p className="outside-desc">
                I keep coming back to mid century modern because it gets the fundamentals right.
                Form follows function. Nothing extra. The same principles I care about in
                product design: clarity, purpose, restraint.
              </p>
              <div className="outside-found-list">
                {[
                  ['✓', 'Wassily chair (found)'],
                  ['✓', 'Post-modern hutch (found)'],
                  ['✓', 'Hairpin bed frame (found)'],
                  ['→', 'Arc lamp (still hunting)'],
                ].map(([status, item]) => (
                  <div className="outside-found-item" key={item}>
                    <div className="outside-found-dot" style={{ opacity: status === '→' ? 0.3 : 1 }} />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>

      <footer className="footer">
        <span className="footer-l">© 2025 Sivan Baum</span>
        <button className="nav-btn footer-r" onClick={() => navigate('/')}>
          Back to Work →
        </button>
      </footer>
    </div>
  )
}
