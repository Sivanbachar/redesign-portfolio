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
          ['Delivered', 'Design System\nNurse App\nScheduler Tool\nCall-Out System\nClock In / Out\nAnalytics Dashboard'],
          ['Impact', '$5,120 saved / manager / yr\n60% easier shift fill\n75% improved autonomy\n33% improved retention'],
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
          <img src="/images/swiftshift/swift_shift_hero.jpg" alt="Swift Shift Platform Overview" style={{ width: '100%', borderRadius: 8, border: '1px solid var(--bdr)', display: 'block' }} />
        </div>

        {/* THE PROBLEM */}
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
          <h2 className="cs-h2 sr">I spent a week sitting with schedulers and nurses before I designed anything.</h2>
          <div className="cs-2col">
            <div>
              <p className="cs-p sr">The scheduler tool was the most operationally complex part of the system, but it was only one side of the problem.</p>
              <p className="cs-p sr">Before touching a single screen, I spent a full week in the field. I sat with schedulers to understand how they posted shifts, evaluated nurses, and navigated between systems like Epic and internal tools. But I also spent time with nurses: understanding why they were hesitant to pick up shifts in the first place.</p>
              <p className="cs-p sr">What I saw on the scheduler side was a workflow spread across systems that weren't designed to talk to each other. A lot of manual tracking. No single place to see what was urgent and what wasn't.</p>
            </div>
            <div>
              <p className="cs-p sr">What I heard from nurses was different, but just as important. They weren't just choosing between shifts, they were deciding whether the work was worth the uncertainty. They didn't know enough about the patient upfront. They didn't have clarity on how much they would actually make. And waiting for bi-weekly pay made many shifts feel like a risk.</p>
              <div className="cs-insight sr" style={{ marginTop: 24 }}>
                <span className="cs-insight-label">Field Observation</span>
                <p className="cs-insight-text">This shaped the system in a fundamental way. It wasn't just about helping schedulers fill shifts faster. It was about giving both sides enough clarity and confidence to participate at all.</p>
              </div>
            </div>
          </div>

          {/* WORKFLOW DIAGRAM */}
          <div className="sr" style={{ marginTop: 32, border: '1px solid var(--bdr)', borderRadius: 8, overflow: 'hidden' }}>
            <div style={{ padding: '24px 28px', borderBottom: '1px solid var(--bdr)' }}>
              <p style={{ fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--txt3)', marginBottom: 10 }}>Before State</p>
              <p style={{ fontFamily: 'var(--sans)', fontSize: 17, fontWeight: 600, color: 'var(--txt)', marginBottom: 6 }}>Fragmented Scheduler Workflow</p>
              <p style={{ fontFamily: 'var(--sans)', fontSize: 13, color: 'var(--txt2)', lineHeight: 1.5, marginBottom: 0 }}>To complete one shift assignment, schedulers jump between disconnected systems</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, background: 'var(--bdr)' }}>
              {[
                { num: 1, type: 'EHR System', name: 'Epic', tasks: ['Check patient schedule', 'View shift templates'] },
                { num: 2, type: 'Legacy System', name: 'Internal Staffing Tools', tasks: ['Check staff availability', 'Review time-off requests'] },
                { num: 3, type: 'Excel / Google Sheets', name: 'Spreadsheets', tasks: ['Cross-reference notes', 'Manual tracking'] },
                { num: 4, type: 'Manual Coordination', name: 'Phone Calls', tasks: ['Call clinicians', 'Confirm availability'] },
              ].map(({ num, type, name, tasks }) => (
                <div key={num} style={{ background: 'var(--bg1)', padding: '20px 24px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
                    <div style={{ width: 26, height: 26, borderRadius: '50%', background: 'var(--cobalt)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: '#fff', lineHeight: 1 }}>{num}</span>
                    </div>
                    <div style={{ width: 22, height: 22, borderRadius: '50%', border: '1px solid var(--bdr2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--txt3)' }}>?</span>
                    </div>
                  </div>
                  <p style={{ fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--txt3)', marginBottom: 5 }}>{type}</p>
                  <p style={{ fontFamily: 'var(--sans)', fontSize: 14, fontWeight: 500, color: 'var(--txt)', marginBottom: 12 }}>{name}</p>
                  {tasks.map(task => (
                    <p key={task} style={{ fontFamily: 'var(--sans)', fontSize: 12, color: 'var(--txt2)', lineHeight: 1.5, marginBottom: 4, display: 'flex', gap: 8 }}>
                      <span style={{ color: 'var(--txt3)', flexShrink: 0 }}>—</span><span>{task}</span>
                    </p>
                  ))}
                </div>
              ))}
            </div>
            <div style={{ padding: '16px 28px' }}>
              <div style={{ border: '1px solid var(--bdr2)', borderRadius: 6, padding: '16px 20px', display: 'flex', gap: 14, alignItems: 'flex-start', background: 'var(--bg2)' }}>
                <span style={{ fontSize: 15, flexShrink: 0, marginTop: 2 }}>⚠</span>
                <div>
                  <p style={{ fontFamily: 'var(--sans)', fontSize: 14, fontWeight: 500, color: 'var(--txt)', marginBottom: 4 }}>Urgency was not apparent</p>
                  <p style={{ fontFamily: 'var(--sans)', fontSize: 12, color: 'var(--txt2)', lineHeight: 1.5, marginBottom: 0 }}>Schedulers had no single view to understand which shifts needed immediate attention. Last-minute call-outs and shift changes had to be manually tracked and communicated across multiple nurses — a complex, error-prone process with no safety net.</p>
                </div>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', borderTop: '1px solid var(--bdr)' }}>
              {[
                { icon: '↻', label: 'Context Switching', desc: 'Jump between 4+ tools for one assignment' },
                { icon: '⊘', label: 'No Centralized View', desc: 'Information scattered across disconnected systems' },
                { icon: '?', label: 'Priority Unclear', desc: 'Urgent shifts discovered through manual checking' },
              ].map(({ icon, label, desc }, i) => (
                <div key={label} style={{ padding: '18px 20px', borderRight: i < 2 ? '1px solid var(--bdr)' : 'none', borderLeft: '2px solid var(--cobalt)' }}>
                  <p style={{ fontFamily: 'var(--mono)', fontSize: 14, color: 'var(--txt3)', marginBottom: 8 }}>{icon}</p>
                  <p style={{ fontFamily: 'var(--sans)', fontSize: 12, fontWeight: 500, color: 'var(--txt)', marginBottom: 4 }}>{label}</p>
                  <p style={{ fontFamily: 'var(--sans)', fontSize: 11, color: 'var(--txt2)', lineHeight: 1.5, marginBottom: 0 }}>{desc}</p>
                </div>
              ))}
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
              <img src="/images/swiftshift/swiftshift-scheduler.jpg" alt="Scheduler Dashboard" className="sr" style={{ width: '100%', borderRadius: 6, border: '1px solid var(--bdr)', display: 'block' }} />
            </div>
          </div>
          <div className="cs-2col" style={{ marginTop: 40 }}>
            <div>
              <img src="/images/swiftshift/swiftshift-create-shift.jpg" alt="Shift Creation Flow" className="sr" style={{ width: '100%', borderRadius: 6, border: '1px solid var(--bdr)', display: 'block' }} />
            </div>
            <div>
              <div className="cs-callout sr">
                <p>The goal was to reduce reliance on manual tracking and let schedulers prioritize their day through the product instead of around it. The visual states were doing real work: making the stakes of each unfilled shift legible without requiring any extra interpretation.</p>
              </div>
            </div>
          </div>

          {/* IMPACT GRID */}
          <div className="sr" style={{ marginTop: 48, border: '1px solid var(--bdr)', borderRadius: 8, overflow: 'hidden' }}>
            <div style={{ padding: '20px 28px', borderBottom: '1px solid var(--bdr)' }}>
              <p style={{ fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--txt3)', marginBottom: 0 }}>Impact on Schedulers</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, background: 'var(--bdr)' }}>
              {[
                { icon: '⚡', title: 'Share schedules and updates instantly', body: 'Push notifications go out automatically to affected nurses the moment a new or updated schedule is published. No manual outreach required.' },
                { icon: '✓', title: 'Know when workers see a shift', body: 'Shift seen confirmations let schedulers track which nurses have viewed their assigned shifts, removing the guesswork from follow-up.' },
                { icon: '◎', title: 'Centralize staffing needs and availability', body: 'Employee positions, days off, and availability all live in one place. Schedulers build from current data, not memory or disconnected spreadsheets.' },
                { icon: '↗', title: 'Fill empty shifts faster', body: 'Open shifts surface instantly to qualified nurses. Schedulers post once — the platform does the notifying.' },
              ].map(({ icon, title, body }) => (
                <div key={title} style={{ background: 'var(--bg1)', padding: '24px 28px' }}>
                  <p style={{ fontSize: 18, marginBottom: 14, lineHeight: 1 }}>{icon}</p>
                  <p style={{ fontFamily: 'var(--sans)', fontSize: 13, fontWeight: 500, color: 'var(--txt)', marginBottom: 8 }}>{title}</p>
                  <p style={{ fontFamily: 'var(--sans)', fontSize: 12, color: 'var(--txt2)', lineHeight: 1.6, marginBottom: 0 }}>{body}</p>
                </div>
              ))}
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
              <p className="cs-p sr">Every decision in this space required judgment about where that line was. What actually helps someone make a decision, and what crosses into territory that shouldn't be crossed. There was no formula. We worked through it case by case.</p>
              <div className="cs-insight sr" style={{ marginTop: 24 }}>
                <span className="cs-insight-label">Design Constraint</span>
                <p className="cs-insight-text">The privacy constraint didn't just affect what information we showed. It affected how trust was built on both sides of the platform. Nurses needed confidence in the product. Patients and operators needed confidence that nothing was being exposed carelessly.</p>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
              <div style={{ width: '100%', maxWidth: 280 }}>
                <p style={{ fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--txt3)', marginBottom: 12, textAlign: 'center' }}>Shift Detail View</p>
                <img
                  src="/images/swiftshift/ShiftDetailPage.jpg"
                  alt="Shift Detail Page"
                  className="sr"
                  style={{ width: '100%', borderRadius: 16, border: '1px solid var(--bdr)', display: 'block' }}
                />
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
            <div />
          </div>
          <div className="sr" style={{ marginTop: 48, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ border: '1px solid var(--bdr)', borderRadius: 12, overflow: 'hidden', width: '100%', maxWidth: 420 }}>
              <div style={{ padding: '10px 16px', borderBottom: '1px solid var(--bdr)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--bg2)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--cobalt)', display: 'inline-block', flexShrink: 0 }} />
                  <p style={{ fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--txt3)', marginBottom: 0 }}>Live prototype — click to interact</p>
                </div>
                <button
                  onClick={() => { const f = document.getElementById('nurse-proto'); f.src = f.src }}
                  style={{ fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--txt3)', background: 'none', border: '1px solid var(--bdr)', borderRadius: 4, padding: '4px 10px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 5 }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--txt)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--txt3)'}
                >↺ Refresh</button>
              </div>
              <div style={{ position: 'relative', overflow: 'hidden', height: 560 }}>
                <iframe
                  id="nurse-proto"
                  src="https://eagle-sauna-45279823.figma.site/"
                  style={{ position: 'absolute', top: 0, left: '50%', marginLeft: -280, width: '560px', height: '746px', border: 'none', display: 'block', transform: 'scale(0.75)', transformOrigin: 'top center' }}
                  allowFullScreen
                />
              </div>
              <div style={{ padding: '10px 16px', borderTop: '1px solid var(--bdr)', background: 'var(--bg2)' }}>
                <p style={{ fontFamily: 'var(--sans)', fontSize: 11, color: 'var(--txt3)', marginBottom: 0, textAlign: 'center' }}>Clickable prototype — tap or click through to explore the nurse-facing experience</p>
              </div>
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
          <div className="cs-2col" style={{ marginTop: 40 }}>
            <div>
              <div className="sr" style={{ display: 'flex', alignItems: 'center', gap: 16, justifyContent: 'center' }}>
                <div style={{ flex: 1, textAlign: 'center' }}>
                  <p style={{ fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--txt3)', marginBottom: 10 }}>Messaging</p>
                  <img src="/images/swiftshift/MessagingPage.jpg" alt="Group Messaging" style={{ width: '100%', maxWidth: 200, borderRadius: 8, border: '1px solid var(--bdr)', display: 'inline-block' }} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, flexShrink: 0 }}>
                  <div style={{ width: 32, height: 1, background: 'var(--cobalt)' }} />
                  <span style={{ color: 'var(--cobalt)', fontSize: 16, lineHeight: 1 }}>→</span>
                </div>
                <div style={{ flex: 1, textAlign: 'center' }}>
                  <p style={{ fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--txt3)', marginBottom: 10 }}>Call-Out</p>
                  <img src="/images/swiftshift/call-out.jpg" alt="Call-Out Screen" style={{ width: '100%', maxWidth: 200, borderRadius: 8, border: '1px solid var(--bdr)', display: 'inline-block' }} />
                </div>
              </div>
            </div>
            <div>
              <div className="cs-callout sr">
                <p>This didn't just reduce scheduler workload. It changed the relationship nurses had with the platform. They had agency over what happened when plans fell through, instead of waiting on a coordinator to fix it for them.</p>
              </div>
            </div>
          </div>
        </div>

        {/* CLOCK IN/OUT */}
        <div className="cs-section">
          <span className="cs-section-label sr">Clock In / Clock Out</span>
          <h2 className="cs-h2 sr">Designing a reliable clock in and clock out experience</h2>

          {/* Intro + image */}
          <div className="cs-2col">
            <div>
              <p className="cs-p sr">Time tracking wasn't just a system requirement. It was directly tied to trust.</p>
              <p className="cs-p sr">Through interviews with nurses, I learned that uncertainty around hours worked and pay created hesitation around picking up shifts. They wanted to feel confident that their time was being tracked accurately and that they would be paid for the work they actually completed.</p>
              <p className="cs-p sr">I designed a clock in and clock out experience that made this visible and reliable from the moment a shift started.</p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
              <div style={{ width: '100%', maxWidth: 280 }}>
                <p style={{ fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--txt3)', marginBottom: 12, textAlign: 'center' }}>Clock In / Out</p>
                <img
                  src="/images/swiftshift/cloclinout.jpg"
                  alt="Clock In and Clock Out Screen"
                  className="sr"
                  style={{ width: '100%', borderRadius: 16, display: 'block' }}
                />
              </div>
            </div>
          </div>

          {/* Design decisions */}
          <div className="sr" style={{ marginTop: 48, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1, background: 'var(--bdr)', border: '1px solid var(--bdr)', borderRadius: 8, overflow: 'hidden' }}>
            {[
              {
                icon: '⏱',
                label: 'Break-Aware Tracking',
                body: 'Nurses often moved between responsibilities throughout a shift. The system supported breaks and ensured time tracking reflected how their day actually unfolded — precise tracking of start, end, and break periods for accurate payroll.',
              },
              {
                icon: '◎',
                label: 'Location Validation',
                body: 'When a nurse attempted to clock in, the system checked whether they were physically at the expected location using GPS or geofencing. If the location did not match, the clock-in was blocked and a clear error state explained why.',
              },
              {
                icon: '↗',
                label: 'Earnings Visibility',
                body: 'After completing a shift, nurses could see how much they earned. In interviews, this was one of the most important signals of trust. Seeing their earnings immediately gave them confidence that their time was valued and accounted for.',
              },
            ].map(({ icon, label, body }) => (
              <div key={label} style={{ background: 'var(--bg1)', padding: '28px 24px' }}>
                <p style={{ fontFamily: 'var(--mono)', fontSize: 18, color: 'var(--txt3)', marginBottom: 14, lineHeight: 1 }}>{icon}</p>
                <p style={{ fontFamily: 'var(--sans)', fontSize: 13, fontWeight: 500, color: 'var(--txt)', marginBottom: 10 }}>{label}</p>
                <p style={{ fontFamily: 'var(--sans)', fontSize: 12, color: 'var(--txt2)', lineHeight: 1.65, marginBottom: 0 }}>{body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* OUTCOMES */}
        <div className="cs-section">
          <span className="cs-section-label sr">Making Performance Visible</span>
          <h2 className="cs-h2 sr">Schedulers needed to see whether the platform was actually working.</h2>
          <div className="cs-2col">
            <div>
              <p className="cs-p sr">Adoption depended on schedulers believing the platform could deliver. That belief had to be built through data, not just experience. I designed a performance dashboard that showed shifts filled, the types of nurses engaging with the platform, and fill rates over time.</p>
              <p className="cs-p sr">After launch, more schedulers started incorporating Swift Shift into their regular workflow. Seeing the numbers gave them a concrete reason to keep using it.</p>
            </div>
            <div>
              <img src="/images/swiftshift/dashboard.jpg" alt="Scheduler Analytics Dashboard" className="sr" style={{ width: '100%', borderRadius: 6, border: '1px solid var(--bdr)', display: 'block' }} />
            </div>
          </div>
        </div>

        {/* OUTCOMES */}
        <div className="cs-section">
          <span className="cs-section-label sr">Outcomes</span>
          <h2 className="cs-h2 sr">This wasn't a set of features. It was a platform that changed how the work got done.</h2>
          <div className="cs-2col">
            <div>
              <p className="cs-p sr">Schedule managers saved an average of $5,120 per year. 60% report an easier time filling work shifts. 75% report improved employee autonomy, and 33% report improved retention — outcomes that trace directly back to giving nurses more agency and schedulers a clearer system.</p>
              <p className="cs-p sr">As schedulers saw results, adoption grew. The platform wasn't just functional. It became something people relied on.</p>
            </div>
            <div>
              <p className="cs-p sr">What the design work did was create a foundation that could scale: a shared visual language and component system, defined interaction patterns across mobile and desktop, and operational workflows that reduced friction on both sides of the marketplace.</p>
              <p className="cs-p sr">When you're the only designer and the scope is this wide, the systems work matters as much as the screen work. Everything downstream depends on how well the foundation holds.</p>
            </div>
          </div>
          <div className="cs-kpi-row sr" style={{ marginTop: 48 }}>
            {[
              ['$5,120', 'Saved Yearly', 'per schedule manager on average'],
              ['60%', 'Easier Shift Fill', 'of managers report having an easier time filling work shifts'],
              ['75%', 'Employee Autonomy', 'of managers report improved employee autonomy'],
              ['33%', 'Employee Retention', 'of managers report having improved employee retention'],
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
        <button className="nav-btn" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Back to Top ↑</button>
      </footer>
    </div>
  )
}
