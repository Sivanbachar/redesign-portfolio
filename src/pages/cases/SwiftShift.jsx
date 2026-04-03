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
        <p className="cs-tag">Swift Shift · Healthcare SaaS · 0→1 Cross-Platform · 2020</p>
        <h1 className="cs-h1">Swift Shift</h1>
        <p className="cs-lead">Cross platform SaaS helping hospitals, agencies and caregivers staff home health care cases.</p>
      </div>

      <div className="cs-meta-row">
        {[
          ['Year', '2020'],
          ['Role', 'User Research\nVisual Design\nInteraction Design'],
          ['Devices', 'Mobile\nDesktop\nTablet'],
          ['My Role', 'Sole Researcher\n& Designer'],
        ].map(([l, v]) => (
          <div className="cs-meta-cell sr" key={l}>
            <p className="cs-meta-label">{l}</p>
            <p className="cs-meta-val">{v}</p>
          </div>
        ))}
      </div>

      <div className="cs-body">
        <div className="cs-section sr">
          <VP label="Hero: Multi-Platform Overview" desc="Three-device mockup: caregiver mobile app (job matching), agency desktop dashboard (staffing board), hospital TCM tablet portal. Horizontal device lineup on dark background." height={440} />
        </div>

        {/* HOME HEALTH CARE STAFFING */}
        <div className="cs-section">
          <span className="cs-section-label sr">The System Problem</span>
          <h2 className="cs-h2 sr">Home Health Care Staffing</h2>
          <div className="cs-2col">
            <div>
              <p className="cs-p sr">The home health care staffing industry has long withstood the test of time, but with the growing demand for technological advance and superb user experience, its old methods of success have begun to fall short. As a multi-faceted system with participation from hospitals, agencies, caregivers and patients, home health care staffing falls further and further behind its competitors in the staffing space.</p>
            </div>
            <div>
              <p className="cs-p sr">After extensive user research, our team identified the source of the growing issues in home health care staffing: We found that hospitals operate at 120% capacity, resulting in fewer beds for incoming patients who need care and an over-extended schedule for hospital employees.</p>
              <p className="cs-p sr">Additionally, agencies, who have, until now, provided home health care staff for these patients, often reject new cases in order to boost their own success rates. Concurrently, with the current shortage of home health care nurses and caregivers, patients find themselves waiting in hospitals long after their discharge date.</p>
            </div>
          </div>
          <div className="cs-insight sr">
            <span className="cs-insight-label">The Root Cause</span>
            <p className="cs-insight-text">We found that with the staffing shortage and caregivers' limited access to new opportunities, patient delayed discharge and readmission rates are higher than ever. Thus home health care staffing suffers from its <strong>cyclical dependence on all parties involved.</strong></p>
          </div>
          <div className="cs-kpi-row sr" style={{ marginTop: 28 }}>
            {[
              ['120%', 'Hospital Capacity', 'the operational baseline we were designing around'],
              ['3', 'User Types', 'with fundamentally different goals, workflows, and device contexts — all in one system'],
              ['0', 'Existing Tools', 'that served the full staffing chain from discharge to caregiver placement'],
            ].map(([n, l, d]) => (
              <div className="cs-kpi" key={l}>
                <p className="cs-kpi-num">{n}</p>
                <p className="cs-kpi-label">{l}</p>
                <p className="cs-kpi-desc">{d}</p>
              </div>
            ))}
          </div>
        </div>

        {/* IN THIS ROLE */}
        <div className="cs-section">
          <span className="cs-section-label sr">In This Role</span>
          <h2 className="cs-h2 sr">Built from the ground up.</h2>
          <div className="cs-2col">
            <div>
              <p className="cs-p sr">As sole researcher and designer, I built the mobile, desktop and tablet platforms from the ground up, using primary and secondary research as guides. Some of the main methods of research used in this process were strategic planning, stakeholder interviews, design studios, feature prioritization, empathy mapping, user journeys, story boarding, user surveys/subsequent interviews, ethnographic research, affinity mapping, persona creations, interaction/UI design, user testing &amp; continuous iterations.</p>
            </div>
            <div>
              <div className="cs-callout sr">
                <p>My process is different in every project and is determined by many factors such as the project goals, business needs, complexity of the problem, time, etc.</p>
              </div>
            </div>
          </div>
        </div>

        {/* PHASE I — RESEARCH */}
        <div className="cs-section">
          <span className="cs-section-label sr">Phase I — Research</span>
          <h2 className="cs-h2 sr">Reaching the actual users, not the assumed ones.</h2>
          <div className="cs-2col">
            <div>
              <p className="cs-p sr">At the outset, I needed a clearer picture of our users, and after reviewing our quantitative data, I sought qualitative data to supplement some of the information we had. I sat down with our users to better understand how caregivers and agencies in the field currently work.</p>
              <div className="cs-method-row sr" style={{ marginTop: 24 }}>
                {[
                  ['🗂', '4 Discussion Guides', 'co-created with stakeholders'],
                  ['🎙', '20+ User Interviews', 'in-depth sessions with all user types'],
                  ['📋', '100+ User Surveys', 'to gauge and filter target audience'],
                ].map(([g, n, c]) => (
                  <div className="cs-method-card" key={n}>
                    <span className="cs-method-glyph">{g}</span>
                    <p className="cs-method-name">{n}</p>
                    <p className="cs-method-count">{c}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <VP label="Research Synthesis Board" desc="Affinity map organized by user type (caregiver / agency / hospital) with key pain point clusters labeled." height={280} />
              <div className="cs-finding-grid sr" style={{ marginTop: 24, gridTemplateColumns: '1fr' }}>
                {[
                  { tag: 'Affinity Mapping', b: 'After over 20 user interviews, I had a lot of information to sift through. Affinity mapping helped transform these interviews into data.' },
                  { tag: 'Rainbow Synthesis', b: 'I used rainbow synthesis to quantify patterns amongst our users, learning more from their aggregated behaviors.' },
                  { tag: 'Empathy / Journey Maps', b: 'This tool helped both myself and stakeholders truly understand our users behaviors while using the Swift Shift app.' },
                  { tag: '7 Personas', b: 'These were used repetitively throughout the design process, to always direct product decisions towards benefitting our users.' },
                  { tag: '30+ Prototypes', b: 'I created various prototypes to test ideas from both our stakeholders\' and users\' feedback.' },
                ].map(({ tag, b }) => (
                  <div className="cs-finding" key={tag}>
                    <span className="cs-finding-tag">{tag}</span>
                    <p className="cs-finding-body">{b}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div style={{ marginTop: 48 }}>
            <h3 className="cs-h3 sr" style={{ marginBottom: 28 }}>Clarifying Objectives</h3>
            <div className="cs-finding-grid sr">
              {[
                { tag: 'For the Hospitals', issue: '⚡️Issue: Not being able to discharge patients home when they are ready due to minimal - no at home care plan', hmw: 'How might we create a better, more accountable process in providing patients with proper home care that will reduce readmission rates for hospitals and provide patients with caregivers that can properly care for them.' },
                { tag: 'For the Caregivers', issue: '⚡️Issue: Finding work to meet their monetary goals that fit with their schedules', hmw: 'How might we attract nurses and caregivers to home health care cases based on their preferences and needs.' },
                { tag: 'For the Agencies', issue: '⚡️Issue: Day-to-day staffing operations and quality of staff', hmw: 'How might we provide agencies with the right information to conduct their processes of recruiting, hiring and scheduling caregivers to home health care cases.' },
              ].map(({ tag, issue, hmw }) => (
                <div className="cs-finding sr" key={tag}>
                  <span className="cs-finding-tag">{tag}</span>
                  <p className="cs-finding-body" style={{ fontSize: 12, color: 'var(--txt3)', marginBottom: 10 }}>{issue}</p>
                  <p className="cs-finding-body">{hmw}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* PHASE II — PLANNING & DESIGN */}
        <div className="cs-section">
          <span className="cs-section-label sr">Phase II — Planning &amp; Design</span>
          <h2 className="cs-h2 sr">From research to execution.</h2>
          <div className="cs-2col">
            <div>
              <div style={{ marginBottom: 40 }}>
                <h3 className="cs-h3 sr" style={{ marginBottom: 12 }}>Feature Priority Matrix</h3>
                <p className="cs-p sr">I was constantly inundated with new ideas of how to create "the next best thing." It became a struggle to pick out which features take priority. Creating a Feature Priority Matrix allowed everyone to focus on what would take priority each sprint.</p>
                <VP label="Feature Priority Matrix" desc="Priority matrix mapping features against impact and effort. Highlights sprint priorities across all three platforms." height={240} />
              </div>
              <div>
                <h3 className="cs-h3 sr" style={{ marginBottom: 12 }}>Gantt Chart</h3>
                <p className="cs-p sr">Gantt charts are used for planning projects of all sizes and they are a useful way of showing what work is scheduled to be done on a specific day. With so many different teams, a gantt chart was useful for me and other parties involved to manage design expectations.</p>
                <VP label="Gantt Chart" desc="Project Gantt chart showing design phases, milestones, and team dependencies across the full project timeline." height={220} />
              </div>
            </div>
            <div>
              <div style={{ marginBottom: 40 }}>
                <h3 className="cs-h3 sr" style={{ marginBottom: 12 }}>Sketches &amp; Wireframes</h3>
                <p className="cs-p sr">The first step in the design process is to rapidly create concept designs that could satisfy the problem statements, user feedback and of course, the business requirements. For each design task, I began by collaborating with relevant stakeholders to make sure we understood requirements and focused our efforts on the end users. Together, we drew up concepts that captured all of our different expertise. These concept designs were then taken to low-fidelity wireframes, which would eventually, through iterations and testing, become high fidelity clickable prototypes.</p>
                <VP label="Sketches & Wireframes" desc="Progression from rough concept sketches to lo-fi wireframes across the three platform types." height={260} />
              </div>
              <div>
                <h3 className="cs-h3 sr" style={{ marginBottom: 12 }}>Prototyping &amp; Testing</h3>
                <p className="cs-p sr">After iterative designs in low - medium fidelity, I created a high fidelity mock-up that functioned almost like an actual app. The clickable prototype included animations and graphics to further actualize the experience, so that when users sat down with me to test the product, I was getting feedback on designs that were one step closer to the final experience.</p>
              </div>
            </div>
          </div>
        </div>

        {/* METRICS */}
        <div className="cs-section">
          <span className="cs-section-label sr">Metrics</span>
          <h2 className="cs-h2 sr">How did we know we were successful?</h2>
          <div className="cs-finding-grid sr">
            {[
              { tag: 'Monthly Active Users (MAU)', b: 'Over the course of the months, we would analyze new users, where they came from, and their journeys through the app to learn their behaviors.' },
              { tag: 'User Abandonment', b: 'Alongside a recruiting funnel, we monitored users from onboarding to application submission. We followed their paths and identified areas of friction based on abandonment of task after certain level of commitment.' },
              { tag: 'Time On Task', b: 'I learned directly from users that Swift Shift was primarily used to find supplemental work, and therefore was used for two main user journeys: looking for new work and applying to new opportunities to fit their needs. Time on task was crucial to make sure the users needs were met timely and efficiently.' },
            ].map(({ tag, b }) => (
              <div className="cs-finding sr" key={tag}>
                <span className="cs-finding-tag">{tag}</span>
                <p className="cs-finding-body">{b}</p>
              </div>
            ))}
          </div>
        </div>

        {/* KEY PROJECTS */}
        <div className="cs-section">
          <span className="cs-section-label sr">Key Projects</span>
          <h2 className="cs-h2 sr">A look at some cool projects I got to work on.</h2>

          <div style={{ marginBottom: 60 }}>
            <h3 className="cs-h3 sr" style={{ marginBottom: 16 }}>Desktop Recruiting Platform</h3>
            <div className="cs-2col">
              <div>
                <p className="cs-p sr">Though our model depended solely on the UX metrics of our healthcare users, our primary goal as a business was to replace the recruiting process as it stands today entirely. This would allow Swift Shift to own the process from patient release to in home care and the longevity of their care at home.</p>
                <p className="cs-p sr">To do this, we needed to learn how the staffing agencies worked, what was important to them in a Dashboard view, and how they managed constantly fluctuating teams.</p>
              </div>
              <VP label="Desktop Recruiting Platform" desc="Agency desktop dashboard showing staffing board, caregiver pool, case management, and recruitment pipeline views." height={320} />
            </div>
          </div>

          <div style={{ marginBottom: 60 }}>
            <h3 className="cs-h3 sr" style={{ marginBottom: 16 }}>TCM Portal — Tablet</h3>
            <div className="cs-2col">
              <div>
                <p className="cs-p sr">In efforts to bridge the gap in the industry between hospitals and caregivers, we created an app that would service the Transitional Care Managers responsible for finding care for patients ready to be discharged.</p>
                <p className="cs-p sr">High readmission rates, extra cost and poor staffing, as we discovered, was due to agency being the bottleneck in the staffing process. Thus, we created a tablet portal where patients could bypass the agencies and staff their own cases themselves.</p>
              </div>
              <VP label="TCM Portal — Tablet" desc="Tablet UI for Transitional Care Managers: patient queue, discharge planning workflow, case assignment to caregivers direct from hospital." height={320} />
            </div>
          </div>

          <div style={{ marginBottom: 60 }}>
            <h3 className="cs-h3 sr" style={{ marginBottom: 16 }}>"Swiftpay"</h3>
            <div className="cs-2col">
              <div>
                <p className="cs-p sr">Satisfying both a business and user need, I created concept designs for Swiftpay, a same-day payment tool that would allow field staff to withdraw their earnings the same day they work. Field staff would often lament over the debt they accrued because of the wait time between pay checks. The money that was theirs was not accessible when they needed it.</p>
                <p className="cs-p sr">However, after each complaint, they would simply reason, "that is how this industry has always been." It was this sentiment exactly that prompted our team to create a solution to a problem our users never thought could be solved.</p>
              </div>
              <VP label="Swiftpay — Same-Day Payment" desc="Caregiver mobile app: Swiftpay flow showing earnings balance, instant withdrawal UI, and confirmation screen." height={320} />
            </div>
          </div>

          <div style={{ marginBottom: 60 }}>
            <h3 className="cs-h3 sr" style={{ marginBottom: 16 }}>Bot (AI) Assistance — "Swifty Bot"</h3>
            <div className="cs-2col">
              <div>
                <p className="cs-p sr">There are a lot of complexities that we simplified and made more efficient through Swift Shift. However, we are not naive to think users will not run into questions or issues along the way. Thus, we designed and created "Swifty Bot," an AI chat bot assistant, to help users with common questions.</p>
                <p className="cs-p sr">Swifty Bot would allow for quick answers in case a representative at Swift Shift could not assist them immediately. I did my own research in microcopy and AI interaction design to make sure users were aware of and comfortable talking to Swifty.</p>
              </div>
              <VP label="Swifty Bot — AI Assistant" desc="Chatbot conversation UI within the caregiver app. Shows bot personality, common question flows, and escalation path to human support." height={280} />
            </div>
          </div>

          <div style={{ marginBottom: 60 }}>
            <h3 className="cs-h3 sr" style={{ marginBottom: 16 }}>State Screens</h3>
            <p className="cs-p sr">To account for every user journey, not only the users' happy path, I created various screen states ranging from "empty state" to "no content" screens.</p>
            <VP label="State Screens" desc="Collection of empty state, error, loading, and no-results screen designs across all three platforms." height={280} />
          </div>

          <div>
            <h3 className="cs-h3 sr" style={{ marginBottom: 16 }}>Design Language System</h3>
            <p className="cs-p sr">Satisfying both a business and user need, I created concept designs for Swiftpay, a same-day payment tool that would allow field staff to withdraw their earnings the same day they work. Field staff would often lament over the debt they accrued because of the wait time between pay checks. The money that was theirs was not accessible when they needed it. However, after each complaint, they would simply reason, "that is how this industry has always been." It was this sentiment exactly that prompted our team to create a solution to a problem our users never thought could be solved.</p>
            <VP label="Design Language System" desc="Component library and style guide: color tokens, typography, iconography, and reusable component patterns across mobile, desktop, and tablet." height={320} />
          </div>
        </div>

        {/* FINAL DESIGNS */}
        <div className="cs-section">
          <span className="cs-section-label sr">Final Designs</span>
          <h2 className="cs-h2 sr">Built around what users actually needed.</h2>
          <p className="cs-p sr">The final designs reflect feedback from users through user research and testings. Much of their feedback had to do with information hierarchy and what data points were most valuable to them in looking for work. Through several iterations and consequent data analysis, I was able to create a version of the app that was most useful, usable and valuable to our users, satisfying all areas of heuristics.</p>
          <div className="cs-callout sr">
            <p>Due to NDA, the prototype below reflects a conceptual version of Swift Shift that is not deployed.</p>
          </div>
          <VP label="Final Designs — All Platforms" desc="Complete final design screens: caregiver mobile (job matching, profile, Swiftpay), agency desktop (staffing dashboard, caregiver roster), TCM tablet (patient queue, discharge planning)." height={500} />
        </div>

        {/* LEARNINGS */}
        <div className="cs-section">
          <span className="cs-section-label sr">What I'm Taking With Me</span>
          <h2 className="cs-h2 sr">Project learnings.</h2>
          <div className="cs-finding-grid sr">
            {[
              { h: 'Stick to process', b: 'There were many times that other teams at Swift Shift had ideas for improving the product. However, a lot of these ideas were not validated, and although they expected change overnight, I needed to remind them and myself that there is a process in place to ensure new ideas should be validated before investing time and design effort.' },
              { h: 'Fail fast and learn faster', b: 'There is no progress in design if you do not learn from your failures. In all my failures, I learned to be more diligent in both my research and design efforts.' },
              { h: 'Document everything', b: 'As a researcher, I get excited when I speak to users and begin to draw out incredible insights from conversations. In every interview and test, I made sure there was a notetaker and proper documentation to validate all new insights and learnings.' },
            ].map(({ h, b }) => (
              <div className="cs-finding" key={h}>
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
        <button className="nav-btn" onClick={() => navigate('/projects/hotspots')}>Back to Top ↑</button>
      </footer>
    </div>
  )
}
