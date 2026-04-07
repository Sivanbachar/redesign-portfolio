import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useScrollReveal } from '../../hooks/useScrollReveal.js'
import { useReadingProgress } from '../../hooks/useReadingProgress.js'
import VP from '../../components/VP.jsx'

const ITERATIONS = [
  {
    id: 'floating-pip',
    name: 'Floating PiP Overlay',
    tag: 'Iteration 01',
    img: '/images/pins/iteration_1.png',
    behavior: 'Pinned content floats above the page as a picture-in-picture overlay, visible at all times while reading.',
    rejected: 'Improved visibility but created gesture complexity, cognitive load, and overlapping interactions. The floating layer competed with reading rather than supporting it. Better for glancing, not deeper interaction.',
  },
  {
    id: 'anchored-panel',
    name: 'Anchored Panel',
    tag: 'Iteration 02',
    img: '/images/pins/iteration_2.png',
    behavior: 'Content anchored to a fixed side panel, stable and always accessible alongside the reading surface.',
    rejected: 'Better than floating but over-engineered for an MLP. Too much persistent interface for the initial launch scope — required real estate the reading experience wasn\'t ready to give up.',
  },
  {
    id: 'layered-model',
    name: 'Layered Model',
    tag: 'Iteration 03',
    img: '/images/pins/iteration_3.png',
    behavior: 'A lightweight, dismissible layer that expands on demand. Collapsed entry point keeps the interface minimal until needed, then enables full interaction.',
    outcome: 'Selected. Keeps the reading surface clean by default. Readers engage only when they choose to. Easily dismissed to return to context. Scalable as a framework for future in-reading features.',
    selected: true,
  },
]

const REDDIT_POSTS = [
  {
    quote: '"This is the best new feature in a long time. I\'m always hunting for my bookmarks for pronunciation guides, glossaries, maps, etc., especially for fantasy books. I love this! You can even zoom in on images right within the pop up"',
    upvotes: '1.6K upvotes',
    comments: '134 comments',
  },
  {
    quote: '"I\'m following a Bible reading plan that includes one chapter from the Old Testament and one chapter from the New Testament each day, I started using the pin feature to make it easier to hop back-and-forth. I really appreciate it, and your post gives me hope that there are other uses for it that I haven\'t even imagined."',
    upvotes: '89 upvotes',
    comments: '4 comments',
  },
  {
    quote: '"Well as a avid historical fiction and fantasy reader this is a game changer lol. Had always to go back so I just preferred to read those books in paper form. Very nice."',
    upvotes: '94 upvotes',
    comments: '13 likes',
  },
  {
    quote: '"This pin feature is truly a game changer. I usually take a photo on my phone of any maps I need to reference and just pull them up when I need to picture the area the author is referencing."',
    upvotes: '40 upvotes',
    comments: null,
  },
]

export default function BookPins() {
  const navigate = useNavigate()
  useScrollReveal()
  const pct = useReadingProgress()
  const [activeIter, setActiveIter] = useState(ITERATIONS[0])

  return (
    <div className="pg cs-wrap">
      <div className="progress-bar" style={{ transform: `scaleX(${pct})` }} />
      <button className="cs-back" onClick={() => navigate('/')}>← All Work</button>

      <div className="cs-hero sr">
        <p className="cs-tag">Amazon · Kindle · UX Lead Initiative · 2024</p>
        <h1 className="cs-h1">Book Pins</h1>
        <p className="cs-lead">Redesigning how readers reference content in Kindle, shifting from a linear reading experience to one that supports studying, comparing and revisiting content in context.</p>
      </div>

      <div className="cs-meta-row">
        {[
          ['Role', 'UX Designer'],
          ['Scope', 'End-to-end UX strategy\nDiscovery → Launch'],
          ['Launched', '2024'],
          ['Initiative', 'UX Lead initiative'],
        ].map(([l, v]) => (
          <div className="cs-meta-cell sr" key={l}>
            <p className="cs-meta-label">{l}</p>
            <p className="cs-meta-val">{v}</p>
          </div>
        ))}
      </div>

      <div className="cs-body">
        <div className="cs-section sr">
          <VP label="Book Pins Reading Surface" desc="Kindle reading UI showing pinned content layer expanded alongside the reading view. Shows the collapsed entry point and expanded interaction state." height={480} />
        </div>

        {/* OVERVIEW */}
        <div className="cs-section">
          <span className="cs-section-label sr">Overview</span>
          <h2 className="cs-h2 sr">A new interaction model for referencing content in Kindle.</h2>
          <div className="cs-2col">
            <div>
              <p className="cs-p sr">I led the design of a new interaction model for referencing content within Kindle, addressing a core gap in how readers navigate and retain information.</p>
              <p className="cs-p sr">This work introduced a scalable framework for in context reference, shifting Kindle from a linear reading experience to one that supports non linear behaviors like studying, comparing, and revisiting content.</p>
            </div>
            <div>
              <p className="cs-p sr">Partnering closely with product and engineering, I defined the product direction, drove alignment across teams, and translated an ambiguous problem space into a shippable experience used within the core reading flow.</p>
              <p className="cs-p sr">The solution enabled readers to access and interact with referenced content without leaving the page, reducing disruption to reading flow and improving comprehension for high intent use cases like learning and research.</p>
            </div>
          </div>
          <div className="cs-kpi-row sr" style={{ marginTop: 40 }}>
            {[
              ['446K+', 'Users', 'reached through the shipped experience'],
              ['950K+', 'Pins created', 'across the user base'],
              ['45%', 'Repeat usage', 'after first pin'],
              ['56%', 'Engagement', 'pin interaction rate'],
            ].map(([n, l, d]) => (
              <div className="cs-kpi" key={l}>
                <p className="cs-kpi-num">{n}</p>
                <p className="cs-kpi-label">{l}</p>
                <p className="cs-kpi-desc">{d}</p>
              </div>
            ))}
          </div>
          <div className="cs-finding-grid two-col sr" style={{ marginTop: 28 }}>
            {[
              { tag: 'Product Direction', b: 'Originated from a three-year product vision grounded in customer research and prioritized by leadership to evolve the Kindle reading experience.' },
              { tag: 'Scalable Framework', b: 'Introduced a layered approach to in reading features, enabling new capabilities without disrupting the core experience.' },
            ].map(({ tag, b }) => (
              <div className="cs-finding" key={tag}>
                <span className="cs-finding-tag">{tag}</span>
                <p className="cs-finding-body">{b}</p>
              </div>
            ))}
          </div>
        </div>

        {/* IDENTIFYING THE OPPORTUNITY */}
        <div className="cs-section">
          <span className="cs-section-label sr">Identifying the Opportunity</span>
          <h2 className="cs-h2 sr">The problem space</h2>
          <div className="cs-2col">
            <div>
              <p className="cs-p sr" style={{ fontStyle: 'italic', color: 'var(--txt)', fontSize: 16, marginBottom: 20 }}>Book Pins didn't start as a feature.</p>
              <p className="cs-p sr">It emerged from a broader effort to understand where the Kindle reading experience was breaking down for high-intent use cases like learning and reference. I led cross-functional discovery work to investigate gaps in how readers interacted with content, bringing together behavioral data, research insights, and product constraints to identify where existing tools were falling short.</p>
            </div>
            <div>
              <div className="cs-callout sr">
                <p><strong>What I uncovered:</strong> Referencing saved content required 6+ disconnected steps, forcing readers to exit the reading experience and navigate across multiple surfaces. These workflows were not only inefficient they directly conflicted with how people actually read.</p>
              </div>
              <p style={{ fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--txt3)', margin: '24px 0 14px' }}>Readers were actually</p>
              {[
                ['01', 'Revisiting earlier sections'],
                ['02', 'Comparing ideas across pages'],
                ['03', 'Referencing diagrams and key passages in real time'],
              ].map(([n, t]) => (
                <div key={n} className="sr" style={{ display: 'flex', gap: 20, padding: '12px 0', borderTop: '1px solid var(--bdr)' }}>
                  <p className="cs-num" style={{ flexShrink: 0, fontSize: 12 }}>{n}</p>
                  <p className="cs-p" style={{ marginBottom: 0 }}>{t}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="cs-insight sr">
            <span className="cs-insight-label">Critical Insight</span>
            <p className="cs-insight-text">Content was treated as something to save and retrieve later, rather than something to use in context, alongside the reading experience. This created a fundamental gap between how content was structured in the product and <strong>how readers actually needed to interact with it.</strong></p>
          </div>
          <p className="cs-p sr">This reframed the problem entirely. Rather than improving highlights, notes, or bookmarks, the opportunity was to rethink how referencing worked at a system level.</p>
          <div className="cs-callout sr" style={{ marginTop: 24 }}>
            <p><strong>How might we</strong> enable readers to reference content in context, without disrupting their reading flow?</p>
          </div>
          <div className="sr" style={{ marginTop: 40 }}>
            <img
              src="/images/pins/diagram_1.jpg"
              alt="Diagram showing the number of steps required to reference content in the original Kindle experience"
              style={{ width: '100%', borderRadius: 8, border: '1px solid var(--bdr)', display: 'block' }}
            />
          </div>
        </div>

        {/* RESEARCH */}
        <div className="cs-section">
          <span className="cs-section-label sr">Research</span>
          <h2 className="cs-h2 sr">Approach</h2>
          <div className="cs-2col">
            <div>
              {[
                '→ Cross functional workshops',
                '→ Behavioral analysis of reading and annotation patterns',
                '→ Competitive analysis (e.g Apple Books, Notion, Google Docs, Netflix)',
                '→ Customer interviews and surveys',
                '→ Two rounds of usability testing',
              ].map((item) => (
                <p key={item} className="cs-p sr" style={{ fontSize: 14, paddingBottom: 12, borderBottom: '1px solid var(--bdr)', marginBottom: 12 }}>{item}</p>
              ))}
            </div>
            <div>
              <h3 className="cs-h3" style={{ marginBottom: 16 }}>What we explored</h3>
              <p className="cs-p sr">Analyzing patterns across adjacent products revealed two key tensions: PiP patterns worked well for passive consumption where content is viewed at a glance, while interactive tools required stability and depth, especially when users needed to read, scroll or zoom.</p>
              <p className="cs-p sr">Platforms like Notion and Apple Books demonstrated that users are comfortable with on-page tooling, so long as it enhances the primary task rather than distracting from it. This challenged an existing assumption within Kindle: that preserving a "reading sanctuary" required minimizing all on page UI.</p>
              <div className="cs-callout sr" style={{ marginTop: 16 }}>
                <p><strong>What we learned from users:</strong> Content was treated as something to save and retrieve later, rather than something to use in context, alongside the reading experience. This created a fundamental gap between how content was structured in the product and how readers actually needed to interact with it.</p>
              </div>
            </div>
          </div>
        </div>

        {/* IDEATION */}
        <div className="cs-section">
          <span className="cs-section-label">Ideation</span>
          <h2 className="cs-h2 sr">Validating the interaction model</h2>
          <div className="cs-2col">
            <div>
              <h3 className="cs-h3 sr" style={{ marginBottom: 16 }}>From overlays to a layered reading model</h3>
              <p className="cs-p sr">Early exploration focused on floating and anchored UI layered on top of reading. While these approaches improved visibility, they increased cognitive load and disrupted the reading experience.</p>
              <p className="cs-p sr">This led to a fundamental shift: instead of placing features around reading, I introduced a layered model that integrates functionality into the reading experience itself, enabling new capabilities without competing with the core act of reading.</p>
              <div className="cs-callout sr" style={{ marginTop: 16 }}>
                <p><strong>The pivot:</strong> We moved away from keeping content persistently visible and instead designed for on-demand interaction allowing readers to engage deeply when needed without compromising the reading experience.</p>
              </div>
            </div>
            <div>
              <div style={{ border: '1px solid var(--bdr)', borderRadius: 10, overflow: 'hidden', background: 'var(--bg1)' }}>
                {/* Header */}
                <div style={{ padding: '12px 20px', borderBottom: '1px solid var(--bdr)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <p style={{ fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--txt3)', marginBottom: 0 }}>Design Explorations</p>
                  <p style={{ fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--txt3)', marginBottom: 0, opacity: 0.6 }}>← Click to explore</p>
                </div>
                {/* Tab row */}
                <div style={{ display: 'flex', borderBottom: '1px solid var(--bdr)' }}>
                  {ITERATIONS.map(iter => {
                    const isActive = activeIter?.id === iter.id
                    return (
                      <button
                        key={iter.id}
                        onClick={() => setActiveIter(iter)}
                        style={{
                          flex: 1, padding: '12px 16px', background: isActive ? 'rgba(255,255,255,0.06)' : 'transparent',
                          border: 'none', borderBottom: `2px solid ${isActive ? (iter.selected ? 'rgba(134,239,172,0.7)' : 'rgba(255,255,255,0.4)') : 'transparent'}`,
                          cursor: 'pointer', transition: 'background 0.15s',
                        }}
                      >
                        <p style={{ fontFamily: 'var(--mono)', fontSize: 8, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--txt3)', marginBottom: 4 }}>{iter.tag}</p>
                        <p style={{ fontFamily: 'var(--sans)', fontSize: 12, fontWeight: isActive ? 500 : 400, color: isActive ? 'var(--txt)' : 'var(--txt2)', marginBottom: 0, lineHeight: 1.3 }}>{iter.name}</p>
                      </button>
                    )
                  })}
                </div>
                {/* Image */}
                {activeIter && (
                  <div style={{ background: 'var(--bg2)', padding: 20 }}>
                    <img
                      key={activeIter.id}
                      src={activeIter.img}
                      alt={activeIter.name}
                      style={{ width: '100%', display: 'block', borderRadius: 6, border: '1px solid var(--bdr)' }}
                    />
                    <div style={{ marginTop: 20, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                      <div>
                        <p style={{ fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--txt3)', marginBottom: 8 }}>Behavior</p>
                        <p style={{ fontFamily: 'var(--sans)', fontSize: 13, color: 'var(--txt2)', lineHeight: 1.65, marginBottom: 0 }}>{activeIter.behavior}</p>
                      </div>
                      <div>
                        <p style={{ fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', color: activeIter.selected ? 'rgba(134,239,172,0.8)' : 'var(--txt3)', marginBottom: 8 }}>
                          {activeIter.selected ? 'Why it worked' : 'Why it was set aside'}
                        </p>
                        <p style={{ fontFamily: 'var(--sans)', fontSize: 13, color: 'var(--txt2)', lineHeight: 1.65, marginBottom: 0 }}>
                          {activeIter.selected ? activeIter.outcome : activeIter.rejected}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="cs-finding-grid sr" style={{ marginTop: 40 }}>
            {[
              { tag: 'Iteration 01: Floating PiP Overlay', h: 'Improved visibility, increased complexity', b: 'Pinned content floats above the page. Improved visibility but created gesture complexity, cognitive load, and overlapping interactions. Favored glancing, not deeper interaction.' },
              { tag: 'Iteration 02: Anchored Model', h: 'Anchored model, over-engineered for MLP', b: 'Content anchored to a fixed panel. Better than floating but over-engineered for a minimum loveable product. Too much interface for the initial launch scope.' },
              { tag: 'Iteration 03: Layered Model', h: 'Balanced interaction model (MLP)', b: 'A lightweight, dismissible layer that expands on demand. Keeps the interface minimal until needed, then enables full interaction. Easily dismissed to return to reading.' },
            ].map(({ tag, h, b }) => (
              <div className="cs-finding sr" key={tag}>
                <span className="cs-finding-tag">{tag}</span>
                <p className="cs-finding-headline">{h}</p>
                <p className="cs-finding-body">{b}</p>
              </div>
            ))}
          </div>
          <div className="cs-insight sr" style={{ marginBottom: 0, borderBottom: 'none' }}>
            <span className="cs-insight-label">What This Meant</span>
            <p className="cs-insight-text">This work established a <strong>layered model for reading</strong>, enabling new features to integrate seamlessly without disrupting the core experience.</p>
          </div>
        </div>

        {/* FINAL SOLUTION */}
        <div className="cs-section">
          <span className="cs-section-label sr">Final Solution</span>
          <h2 className="cs-h2 sr">Book Pins</h2>
          <p className="cs-p sr" style={{ fontSize: 16, fontStyle: 'italic', color: 'var(--txt)', marginBottom: 8 }}>Reference in context. No page exits.</p>
          <p className="cs-p sr">Book Pins introduces a new interaction model that allows readers to reference content without leaving the page. Instead of navigating to saved highlights or notes, readers can bring relevant content into view and interact with it directly within the reading experience.</p>
          <VP label="Book Pins Final Design" desc="Final solution screens: collapsed entry point state, expanded interaction layer, scroll/zoom within pins, and seamless dismissal back to reading position." height={460} />
          <div className="cs-2col" style={{ marginTop: 40 }}>
            <div>
              <p style={{ fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--txt3)', marginBottom: 16 }}>How it works</p>
              {[
                '→ Collapsed, anchored entry point keeps the experience lightweight and unobtrusive',
                '→ Expanding reveals a dedicated interaction layer for pinned content',
                '→ Readers can scroll, zoom and explore content without navigating away',
                '→ The interaction is easily dismissible, returning seamlessly to the reading experience',
              ].map((item) => (
                <p key={item} className="cs-p" style={{ fontSize: 14, paddingBottom: 12, borderBottom: '1px solid var(--bdr)', marginBottom: 12 }}>{item}</p>
              ))}
            </div>
            <div>
              {[
                { tag: 'Supports real reading behavior', b: 'Readers can reference and engage with content without breaking flow or losing context.' },
                { tag: 'Balances simplicity and depth', b: 'The interface stays out of the way until needed, then enables deeper interaction.' },
                { tag: 'Reduces cognitive load', b: 'Removing floating elements and complex gestures creates a more predictable, stable experience.' },
              ].map(({ tag, b }) => (
                <div key={tag} style={{ padding: '16px 0', borderTop: '1px solid var(--bdr)' }}>
                  <p style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--txt3)', marginBottom: 8 }}>{tag}</p>
                  <p className="cs-p" style={{ marginBottom: 0, fontSize: 14 }}>{b}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* REDDIT FEEDBACK */}
        <div className="cs-section">
          <span className="cs-section-label sr">User Feedback</span>
          <h2 className="cs-h2 sr">Hear it from readers.</h2>
          <p className="cs-p sr">Book Pins resonated immediately after launch. Readers found use cases we hadn't fully anticipated — from religious study plans to fantasy map referencing — validating that the interaction model was flexible enough to support diverse reading behaviors.</p>
          <div className="sr" style={{ marginTop: 40, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {REDDIT_POSTS.map((post, i) => (
              <div key={i} style={{
                background: 'var(--bg1)',
                border: '1px solid var(--bdr)',
                borderRadius: 10,
                padding: '28px 28px 24px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: 24,
              }}>
                <p style={{ fontFamily: 'var(--sans)', fontSize: 14, color: 'var(--txt2)', lineHeight: 1.7, marginBottom: 0 }}>{post.quote}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  {/* Reddit alien icon */}
                  <div style={{
                    width: 36, height: 36, borderRadius: '50%',
                    background: '#FF4500',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="white" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20 10c0-1.1-.9-2-2-2-.5 0-1 .2-1.4.5C15 7.4 13.1 7 11 6.9l.9-4.1 2.7.6c0 .7.6 1.3 1.3 1.3.8 0 1.4-.6 1.4-1.4s-.6-1.4-1.4-1.4c-.5 0-1 .3-1.2.8L11.8 2c-.1 0-.2.1-.2.2l-1 4.6c-2.2.1-4.1.5-5.5 1.6-.4-.3-.9-.5-1.4-.5C2.6 7.9 1.7 8.8 1.7 10c0 .8.4 1.5 1.1 1.8 0 .2-.1.4-.1.6 0 3 3.3 5.4 7.3 5.4s7.3-2.4 7.3-5.4c0-.2 0-.4-.1-.6.6-.4 1-1 1-1.8zM6.1 11.4c0-.7.6-1.3 1.3-1.3.7 0 1.3.6 1.3 1.3 0 .7-.6 1.3-1.3 1.3-.7 0-1.3-.6-1.3-1.3zm7.4 3.2c-.8.8-2.1 1.2-3.5 1.2-1.4 0-2.7-.4-3.5-1.2-.1-.1-.1-.3 0-.4.1-.1.3-.1.4 0 .7.7 1.8 1 3.1 1s2.4-.3 3.1-1c.1-.1.3-.1.4 0 .1.1.1.3 0 .4zm-.3-1.9c-.7 0-1.3-.6-1.3-1.3 0-.7.6-1.3 1.3-1.3.7 0 1.3.6 1.3 1.3 0 .7-.6 1.3-1.3 1.3z"/>
                    </svg>
                  </div>
                  <div>
                    <p style={{ fontFamily: 'var(--sans)', fontSize: 13, fontWeight: 500, color: 'var(--txt2)', marginBottom: 2 }}>Reddit User</p>
                    <p style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--txt3)', marginBottom: 0 }}>
                      {post.upvotes}{post.comments ? ` · ${post.comments}` : ''}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="sr" style={{ marginTop: 24 }}>
            <a
              href="https://www.reddit.com/r/kindle/comments/1ryxcow/new_software_pin_feature/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: 'var(--sans)', fontSize: 14, color: 'var(--txt2)',
                textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6,
                borderBottom: '1px solid var(--bdr2)', paddingBottom: 2,
                transition: 'color 0.15s, border-color 0.15s',
              }}
              onMouseEnter={e => { e.currentTarget.style.color = 'var(--txt)'; e.currentTarget.style.borderColor = 'var(--txt2)' }}
              onMouseLeave={e => { e.currentTarget.style.color = 'var(--txt2)'; e.currentTarget.style.borderColor = 'var(--bdr2)' }}
            >
              View on Reddit →
            </a>
          </div>
        </div>

        {/* IMPACT */}
        <div className="cs-section">
          <span className="cs-section-label sr">Impact</span>
          <h2 className="cs-h2 sr">Book Pins fundamentally changed how readers interact with information.</h2>
          <p className="cs-p sr">Instead of navigating away to manage saved content, readers could engage with it directly leading to deeper interaction, higher retention and new reading behaviors.</p>
          <div className="cs-kpi-row sr">
            {[
              ['950k+', 'Pins created', 'across the user base'],
              ['45%', 'Repeat usage', 'after first pin'],
              ['56%', 'Pin interaction rate', 'engagement with pinned content'],
            ].map(([n, l, d]) => (
              <div className="cs-kpi" key={l}>
                <p className="cs-kpi-num">{n}</p>
                <p className="cs-kpi-label">{l}</p>
                <p className="cs-kpi-desc">{d}</p>
              </div>
            ))}
          </div>
          <div className="cs-callout sr" style={{ marginTop: 28 }}>
            <p><strong>What this means:</strong> These metrics show that readers didn't just save content, they actively used it. Referencing became part of the reading experience, supporting behaviors like studying, comparing ideas, and revisiting key information without breaking flow.</p>
          </div>
          <div className="cs-finding-grid two-col sr" style={{ marginTop: 32 }}>
            {[
              { tag: 'Product Impact', b: 'Established a new interaction model for in-book experiences. Influenced broader investment in interactive and AI-powered reading features.' },
              { tag: 'Strategic Impact', b: 'Helped shift Kindle from linear consumption → active engagement. Drove alignment on multi-year product vision and direction.' },
            ].map(({ tag, b }) => (
              <div className="cs-finding" key={tag}>
                <span className="cs-finding-tag">{tag}</span>
                <p className="cs-finding-body">{b}</p>
              </div>
            ))}
          </div>
        </div>

        {/* LEARNINGS */}
        <div className="cs-section">
          <span className="cs-section-label sr">What I Learned From This Project</span>
          <h2 className="cs-h2 sr">What I learned from this project.</h2>
          <div className="cs-finding-grid sr">
            {[
              { h: 'Breaking and rebuilding is part of the process', b: 'Some of the most important progress came from stepping back and rethinking the approach entirely. Letting go of early directions made space for a stronger, more intentional solution.' },
              { h: 'There\'s no substitute for real user feedback', b: 'Assumptions only go so far. It wasn\'t until we saw how people actually used the experience that the right direction became clear.' },
              { h: 'Your first idea is rarely the right one', b: 'Your first idea is rarely the right one.' },
            ].map(({ h, b }) => (
              <div className="cs-finding sr" key={h}>
                <span className="cs-finding-tag">Project Learning</span>
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
