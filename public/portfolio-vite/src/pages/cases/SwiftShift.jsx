import { useNavigate } from 'react-router-dom'
import { useScrollReveal } from '../../hooks/useScrollReveal.js'
import { useReadingProgress } from '../../hooks/useReadingProgress.js'
import VP from '../../components/VP.jsx'

export default function SwiftShift() {
  const navigate = useNavigate()
  useScrollReveal()
  const pct = useReadingProgress()

  return (
    <div className="pg cs-wrap">
      <div className="progress-bar" style={{ transform: `scaleX(${pct})` }} />
      <button className="cs-back" onClick={() => navigate('/')}>← All Work</button>

      <div className="cs-hero sr">
        <p className="cs-tag">Swift Shift · Home Healthcare Staffing · 0→1 Product Design · Cross-Platform</p>
        <h1 className="cs-h1">SWIFT SHIFT</h1>
        <p className="cs-lead">I was the sole designer at a startup that needed an entire product ecosystem live at once. Not one surface. Not a phased roadmap. A nurse-facing mobile app, a dense scheduling tool for coordinators, a marketing site, a brand system, and internal tooling. All at the same time, all needing to work together from day one.</p>
      </div>

      <div className="cs-meta-row">
        {[
          ['Role', 'Sole Product Designer'],
          ['Surfaces', 'iOS Mobile\nDesktop Web\nMarketing & Brand'],
          ['Delivered', 'Design System\nNurse App\nScheduler Tool\nAdvanced Pay\nCall-Out System\nAnalytics Dashboard'],
          ['Impact', '+30% shift coverage\nReduced scheduler burden\nGrowing platform adoption'],
        ].map(([l, v]) => (
          <div className="cs-meta-cell sr" key={l}>
            <p className="cs-meta-label">{l}</p>
            <p className="cs-meta-val">{v}</p>
          </div>
        ))}
      </div>

      <div className="cs-body">

        {/* HERO VISUAL */}
        <div className="cs-section sr">
          <VP
            label="Swift Shift Platform Overview"
            desc="Split view: nurse mobile app on the left, scheduler desktop tool on the right. Both showing live shift states."
            height={480}
          />
        </div>

        {/* THE REAL PROBLEM */}
        <div className="cs-section">
          <span className="cs-section-label sr">The Problem</span>
          <h2 className="cs-h2 sr">Filling shifts is the easy framing. The real problem was trust, speed, and coordination.</h2>
          <div className="cs-2col">
            <div>
              <p className="cs-p sr">Home healthcare is high-stakes and time-sensitive. Shifts need to be filled fast, but the systems holding everything together are fragmented. Schedulers are working across multiple tools with no clear way to prioritize. Nurses are hesitant because pay is inconsistent and information is sparse.</p>
              <p className="cs-p sr">Layered on top of that: strict privacy constraints. We couldn't expose patient details. That limitation shaped almost everything about how the product communicated context.</p>
            </div>
            <div>
              <div className="cs-callout sr">
                <p>The challenge wasn't just designing a product. It was designing a system that gave nurses enough context to make a decision, protected patient privacy, reduced the coordination load on schedulers, and fit into workflows that already existed at companies like Bayada. Those four constraints were often in tension with each other. The design work was about finding where they could coexist.</p>
              </div>
            </div>
          </div>
        </div>

        {/* MY ROLE */}
        <div className="cs-section">
          <span className="cs-section-label sr">My Role</span>
          <h2 className="cs-h2 sr">I was the only designer. I built everything.</h2>
          <div className="cs-2col">
            <div>
              <p className="cs-p sr">I built the design system and visual language from scratch. I reworked the brand, designed the marketing site and ad creative, and designed both the nurse-facing mobile app and the scheduler desktop tool.</p>
              <p className="cs-p sr">I also partnered directly with the CEO to define product direction, pressure-test hypotheses, and decide what to build next. There was no product manager in the room. The design and strategy work weren't separate.</p>
            </div>
            <div>
              <div className="cs-finding-grid sr">
                {[
                  { tag: 'System', b: 'Design system, visual language, component library' },
                  { tag: 'Brand', b: 'Identity, marketing site, ad creative' },
                  { tag: 'Mobile', b: 'Nurse-facing iOS app: search, shift evaluation, pay' },
                  { tag: 'Desktop', b: 'Scheduler tool: shift creation, dashboards, prioritization' },
                ].map(({ tag, b }) => (
                  <div className="cs-finding" key={tag}>
                    <span className="cs-finding-tag">{tag}</span>
                    <p className="cs-finding-body">{b}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* FIELD WORK */}
        <div className="cs-section">
          <span className="cs-section-label sr">Understanding Real Workflows</span>
          <h2 className="cs-h2 sr">I spent a week sitting with schedulers before I designed anything.</h2>
          <div className="cs-2col">
            <div>
              <p className="cs-p sr">The scheduler tool was the most operationally complex part of the system. Before touching a single screen, I spent a full week in their office watching how schedulers actually worked: how they posted shifts, how they evaluated which nurses to call, how they navigated between Epic and internal tools built for companies like Bayada.</p>
              <p className="cs-p sr">What I saw was a workflow spread across systems that weren't designed to talk to each other. A lot of manual tracking. No single place to see what was urgent and what wasn't.</p>
            </div>
            <div>
              <div className="cs-insight sr">
                <span className="cs-insight-label">Field Observation</span>
                <p className="cs-insight-text">The real bottleneck wasn't that schedulers lacked information. It was that they had no way to act on it quickly. Urgency was invisible. That shaped the entire system design.</p>
              </div>
              <VP label="Scheduler Workflow Observation" desc="Notes and workflow maps from field observation week. Annotated swim-lane showing the multi-system gap." height={240} />
            </div>
          </div>
        </div>

        {/* SCHEDULER TOOL */}
        <div className="cs-section">
          <span className="cs-section-label sr">The Scheduler Tool</span>
          <h2 className="cs-h2 sr">A system for seeing what needs attention and acting on it.</h2>
          <div className="cs-2col">
            <div>
              <p className="cs-p sr">I designed a multi-step shift creation flow that let schedulers define duration, frequency, required skills such as hoyer lift operation or diabetic care management, and fill-by dates. These weren't just form fields. They were the information nurses needed to decide whether a shift was worth taking.</p>
              <p className="cs-p sr">I also introduced clear visual states for filled versus unfilled shifts, and a dashboard view that made urgent needs visible at a glance. Schedulers could now see exactly where the gaps were without hunting across multiple tools.</p>
            </div>
            <div>
              <VP label="Scheduler Dashboard" desc="Desktop dashboard showing shift status grid: filled (white), at risk (amber), unfilled (red). Fill-by countdown visible on each shift card." height={320} />
            </div>
          </div>
          <div className="cs-2col" style={{ marginTop: 40 }}>
            <div>
              <VP label="Shift Creation Flow" desc="Multi-step shift creation: step 1 duration and frequency, step 2 required skills, step 3 fill-by date and review." height={280} />
            </div>
            <div>
              <div className="cs-callout sr">
                <p>The goal was to reduce reliance on manual tracking and let schedulers prioritize their day through the product instead of around it. The visual states were doing real work: making the stakes of each unfilled shift legible without requiring any extra interpretation.</p>
              </div>
            </div>
          </div>
        </div>

        {/* PRIVACY */}
        <div className="cs-section">
          <span className="cs-section-label sr">Privacy vs. Context</span>
          <h2 className="cs-h2 sr">We couldn't show patient details. So we had to figure out what we could show.</h2>
          <div className="cs-2col">
            <div>
              <p className="cs-p sr">Nurses needed enough information to decide whether a shift made sense for them. But we couldn't expose patient details. That constraint was non-negotiable.</p>
              <p className="cs-p sr">What we landed on was a set of contextual signals that sat just below the privacy line: general age range, broad location at the market level, and required skills. Enough for a nurse to make a reasonable judgment. Not enough to identify a patient.</p>
            </div>
            <div>
              <p className="cs-p sr">Every decision in this space required judgment about where that line was. What actually helps someone make a decision, and what crosses into territory that shouldn't be crossed. There was no formula. We worked through it case by case.</p>
              <div className="cs-insight sr">
                <span className="cs-insight-label">Design Constraint</span>
                <p className="cs-insight-text">The privacy constraint didn't just affect what information we showed. It affected how trust was built on both sides of the platform. Nurses needed confidence in the product. Patients and operators needed confidence that nothing was being exposed carelessly.</p>
              </div>
            </div>
          </div>
        </div>

        {/* NURSE APP */}
        <div className="cs-section">
          <span className="cs-section-label sr">The Nurse App</span>
          <h2 className="cs-h2 sr">One question the mobile experience had to answer: is this shift right for me?</h2>
          <div className="cs-2col">
            <div>
              <p className="cs-p sr">Nurses are busy, often mid-shift or in transit when they're evaluating new work. The mobile experience needed to answer that one question as quickly as possible: is this worth my time?</p>
              <p className="cs-p sr">I designed the search and filtering experience so nurses could narrow by location, skill requirements, and timing without friction. Shift cards surfaced the right information in the right order, with enough context to decide without digging deeper.</p>
            </div>
            <div>
              <VP label="Nurse Mobile App" desc="iOS shift feed with filter sheet open. Shift card showing skill tags, location radius, timing, and pay. Swipe-to-action visible." height={380} />
            </div>
          </div>
        </div>

        {/* CALL-OUT SYSTEM */}
        <div className="cs-section">
          <span className="cs-section-label sr">The Call-Out System</span>
          <h2 className="cs-h2 sr">Last-minute call-outs were eating scheduler time. We designed a way to redistribute that load.</h2>
          <div className="cs-2col">
            <div>
              <p className="cs-p sr">One of the biggest operational drains was what happened when a nurse called out last minute. Schedulers were spending a significant amount of time on the phone finding replacements manually. It was reactive and slow.</p>
            </div>
            <div>
              <p className="cs-p sr">I partnered with the CEO to test a different hypothesis: could nurses help fill shifts themselves? We built a group-based messaging system that organized nurses into care groups. When a nurse called out, the shift became visible to that group and nurses could pick it up directly.</p>
            </div>
          </div>
          <div className="cs-kpi-row sr" style={{ marginTop: 40 }}>
            {[
              ['+30%', 'Shift Coverage', 'increase through peer-driven fill'],
              ['Reduced', 'Scheduler Burden', 'less time on manual replacement calls'],
              ['Increased', 'Platform Trust', 'nurses felt more agency over their schedule'],
            ].map(([n, l, d]) => (
              <div className="cs-kpi" key={l}>
                <p className="cs-kpi-num">{n}</p>
                <p className="cs-kpi-label">{l}</p>
                <p className="cs-kpi-desc">{d}</p>
              </div>
            ))}
          </div>
          <div className="cs-2col" style={{ marginTop: 40 }}>
            <div>
              <VP label="Call-Out Group Messaging" desc="Mobile view: nurse calls out via app, care group receives notification, replacement nurse claims shift. Three-step flow shown inline." height={280} />
            </div>
            <div>
              <div className="cs-callout sr">
                <p>This didn't just reduce scheduler workload. It changed the relationship nurses had with the platform. They had agency over what happened when plans fell through, instead of waiting on a coordinator to fix it for them.</p>
              </div>
            </div>
          </div>
        </div>

        {/* ADVANCED PAY */}
        <div className="cs-section">
          <span className="cs-section-label sr">Advanced Pay</span>
          <h2 className="cs-h2 sr">Nurses weren't hesitant about the work. They were hesitant about waiting two weeks to get paid for it.</h2>
          <div className="cs-2col">
            <div>
              <p className="cs-p sr">Payment timing was a real barrier to adoption. Bi-weekly pay cycles don't match how a lot of home healthcare nurses manage their finances. They needed to know they'd see money sooner.</p>
              <p className="cs-p sr">I designed an advanced pay feature that let nurses request early payment, see exactly how much had been advanced, and understand what that left in their upcoming paycheck. The math was transparent. The current state was always clear.</p>
            </div>
            <div>
              <p className="cs-p sr">In user testing, this resonated more strongly than almost anything else we put in front of nurses. They understood it immediately and cited it as a genuine reason to choose Swift Shift over other work.</p>
              <div className="cs-pullquote sr">
                <p className="cs-pullquote-text">"This is how I actually think about my money."</p>
                <p className="cs-pullquote-attr">Nurse, user testing session</p>
              </div>
            </div>
          </div>
          <div style={{ marginTop: 40 }}>
            <VP label="Advanced Pay UI" desc="Mobile: pay summary card showing total earned, amount advanced, remaining in upcoming paycheck. Request advance CTA with confirmation state." height={320} />
          </div>
        </div>

        {/* ANALYTICS */}
        <div className="cs-section">
          <span className="cs-section-label sr">Making Performance Visible</span>
          <h2 className="cs-h2 sr">Schedulers needed to see whether the platform was actually working.</h2>
          <div className="cs-2col">
            <div>
              <p className="cs-p sr">Adoption depended on schedulers believing the platform could deliver. That belief had to be built through data, not just experience. I designed a performance dashboard that showed shifts filled, the types of nurses engaging with the platform, and fill rates over time.</p>
              <p className="cs-p sr">After launch, more schedulers started incorporating Swift Shift into their regular workflow. Seeing the numbers gave them a concrete reason to keep using it.</p>
            </div>
            <div>
              <VP label="Scheduler Analytics Dashboard" desc="Desktop dashboard: shifts filled chart, nurse type breakdown, fill rate trend over 30 days. Clean data layout with period selector." height={280} />
            </div>
          </div>
        </div>

        {/* OUTCOMES */}
        <div className="cs-section">
          <span className="cs-section-label sr">Outcomes</span>
          <h2 className="cs-h2 sr">This wasn't a set of features. It was a platform that changed how the work got done.</h2>
          <div className="cs-2col">
            <div>
              <p className="cs-p sr">The call-out system drove a 30% increase in shifts covered through peer-to-peer fill. Time schedulers spent on manual replacement calls dropped. Nurse trust in the platform grew, particularly around pay transparency and shift visibility.</p>
              <p className="cs-p sr">As schedulers saw results, adoption grew. The platform wasn't just functional. It became something people relied on.</p>
            </div>
            <div>
              <p className="cs-p sr">What the design work did was create a foundation that could scale: a shared visual language and component system, defined interaction patterns across mobile and desktop, and operational workflows that reduced friction on both sides of the marketplace.</p>
              <p className="cs-p sr">When you're the only designer and the scope is this wide, the systems work matters as much as the screen work. Everything downstream depends on how well the foundation holds.</p>
            </div>
          </div>
          <div className="cs-kpi-row sr" style={{ marginTop: 48 }}>
            {[
              ['+30%', 'Shift Coverage', 'peer-driven fill via call-out system'],
              ['1 Designer', 'Full System', 'brand, mobile, desktop, internal tools'],
              ['Growing', 'Scheduler Adoption', 'as platform confidence increased post-launch'],
            ].map(([n, l, d]) => (
              <div className="cs-kpi" key={l}>
                <p className="cs-kpi-num">{n}</p>
                <p className="cs-kpi-label">{l}</p>
                <p className="cs-kpi-desc">{d}</p>
              </div>
            ))}
          </div>
        </div>

      </div>

      <footer className="footer" style={{ marginTop: 80 }}>
        <button className="cs-back" style={{ padding: 0 }} onClick={() => navigate('/')}>← All Work</button>
        <button className="nav-btn" onClick={() => navigate('/projects/hotspots')}>Back to Top ↑</button>
      </footer>
    </div>
  )
}
