import { useNavigate } from 'react-router-dom'
import { useScrollReveal } from '../hooks/useScrollReveal.js'

const skills = [
  {
    group: 'Design',
    items: [
      'Interaction & Visual Design', 'Design Systems', 'Rapid Prototyping',
      'Native Mobile (iOS/Android)', 'Information Architecture',
      'Accessibility (WCAG)', 'Design Thinking & Facilitation',
    ],
  },
  {
    group: 'Strategy',
    items: [
      'Product Strategy & Discovery', '0→1 Product Design', 'Cross Functional Leadership',
      'Stakeholder Alignment', 'User Research', 'Research Synthesis',
      'Experimentation & A/B Testing', 'AI Assisted Workflows',
    ],
  },
  {
    group: 'Tools',
    items: ['Figma', 'FigJam', 'Protopie', 'Framer', 'Miro', 'Jira', 'Claude', 'Cursor'],
  },
  {
    group: 'AI Tools',
    items: ['Claude Code', 'Kiro (Amazon)', 'GitHub Copilot', 'Vercel AI', 'Figma Make', 'Google Stitch'],
  },
]

const experience = [
  {
    logo: '/images/resume/amazon_logo.jpg',
    role: 'Senior Product Designer (UX Designer II)',
    company: 'Amazon · Kindle',
    location: 'New York',
    date: 'Aug 2022 to Present',
    bullets: [
      'Defined and drove product vision for emerging customer experiences, influencing roadmap priorities and investment decisions across initiatives serving millions of readers.',
      'Led user research and discovery efforts, synthesizing customer insights into product opportunities, long-term strategy, and roadmap decisions.',
      'Presented product strategy, research findings, and design recommendations to senior leadership, earning alignment and support for new product directions across multiple initiatives.',
      'Facilitated cross-functional workshops and product discovery efforts across design, product, and engineering organizations, aligning stakeholders around customer needs, product strategy, and investment priorities.',
      'Built more than 60 interactive prototypes to pressure test concepts, align stakeholders, and reduce the time from idea to decision by up to two months.',
      'Led the design of AI-powered reading experiences that integrated large language models into Kindle and shipped to millions of readers, helping them understand characters, places, and concepts while preserving trust and immersion.',
      'Designed reusable interaction patterns and design system frameworks that improved consistency, strengthened accessibility, and accelerated future product development.',
    ],
  },
  {
    logo: '/images/resume/getuwell_logo.jpg',
    role: 'Service and UX Design Lead (Consultant)',
    company: 'Getuwell',
    location: 'New York',
    date: 'Nov 2021 to Aug 2022',
    bullets: [
      'Led product and service design initiatives supporting more than 600,000 patients across healthcare operations.',
      'Increased patient throughput by 56% through workflow redesign, operational simplification, and service improvements.',
      'Designed service experiences end to end, spanning multiple user groups, operational teams, and touchpoints.',
      'Conducted research across patients, providers, and operational stakeholders to identify opportunities and prioritize investments; partnered with leadership to deliver scalable, efficient solutions.',
    ],
  },
  {
    logo: '/images/resume/rokt_logo.webp',
    role: 'UX Designer',
    company: 'Rokt',
    location: 'New York',
    date: 'Oct 2020 to Nov 2021',
    bullets: [
      'Designed customer experiences across millions of e-commerce transactions, improving conversion and engagement through experimentation, behavioral analysis, and iterative A/B testing.',
      'Improved conversion and reduced drop-off by 15 to 25% through workflow simplification, customer journey optimization, and data-informed design decisions.',
      'Partnered with product, engineering, and analytics teams to define experiments and measure business impact; translated behavioral insights into scalable interaction systems and experimentation frameworks.',
    ],
  },
  {
    logo: '/images/resume/swift_shift_logo.png',
    role: 'Founding UX Designer',
    company: 'Swift Shift',
    location: 'New York',
    date: 'Feb 2019 to Oct 2020',
    bullets: [
      'Led product design from concept through launch for a healthcare staffing platform spanning internal workforce management systems and mobile experiences for healthcare professionals.',
      'Designed complex operational workflows used by staffing coordinators to manage scheduling, workforce allocation, and shift fulfillment, ensuring decisions translated seamlessly into the nurse experience.',
      'Conducted research across coordinators, facilities, and nurses; partnered directly with founders and engineers to define product direction and establish scalable product foundations that supported platform growth.',
    ],
  },
]

const previousExperience = [
  { company: 'Outfront Media', role: 'UX Designer', date: '2017 to 2019' },
  { company: 'Agents of Change | Wellb', role: 'UX Designer', date: '2016 to 2017' },
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
              Senior Product Designer with 10 years of experience across fintech, healthcare, and consumer products.
            </p>
            <p className="resume-bio">
              I lead complex, cross-functional initiatives from discovery through launch, translating ambiguous business and customer problems into scalable products, workflows, and services. I partner with product, engineering, and executive stakeholders to define strategy, drive alignment, and deliver measurable business outcomes.
            </p>
            <p className="resume-bio">
              I don't wait for a brief. I write it. I use AI to compress execution time so more of my energy goes toward the decisions that actually shape what gets built and why.
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
                <p className="edu-degree">B.S., Psychology &amp; Management</p>
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
              <div className="edu-entry">
                <p className="edu-degree">Certification, UX Analytics</p>
                <p className="edu-school">Nielsen Norman Group (NNG)</p>
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
                    <img src={e.logo} alt={e.company} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 7 }} />
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

            {/* Previous experience */}
            <div style={{ marginTop: 40 }} className="sr">
              <h2 className="resume-h">Previous Experience</h2>
              {previousExperience.map((e) => (
                <div key={e.company} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '10px 0', borderBottom: '1px solid var(--bdr)' }}>
                  <div>
                    <span className="exp-role" style={{ fontSize: 14 }}>{e.company}</span>
                    <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--txt3)', marginLeft: 10 }}>{e.role}</span>
                  </div>
                  <span className="exp-date">{e.date}</span>
                </div>
              ))}
            </div>

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

    </div>
  )
}
