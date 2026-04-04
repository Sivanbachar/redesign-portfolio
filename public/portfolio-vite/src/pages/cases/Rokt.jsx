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
        <p className="cs-tag">Rokt · E-Commerce Ad-Tech · UX Research &amp; Design · 2021</p>
        <h1 className="cs-h1">ROKT</h1>
        <p className="cs-lead">As Rokt NY's sole UX researcher and designer, my work focused on optimizing the end-users experience in interacting with Rokt's ad placements across various partnering websites during their transaction journey. My contribution in research, experimentation and designs directly resulted in higher Value Per Transaction (VPT) and greater Lifetime Value (LTV) for our partners customers. My work also provided insight across the company as to our users' attitudes towards online ad placements, and how, through purposeful design, we could provide a more valuable, enriching and appreciated experience for users.</p>
      </div>

      <div className="cs-meta-row">
        {[
          ['Year', '2021'],
          ['Role', 'User Research\nVisual Design\nInteraction Design'],
          ['Devices', 'Mobile\nDesktop'],
          ['Impact', 'Higher VPT\nGreater LTV for partner customers'],
        ].map(([l, v]) => (
          <div className="cs-meta-cell sr" key={l}>
            <p className="cs-meta-label">{l}</p>
            <p className="cs-meta-val">{v}</p>
          </div>
        ))}
      </div>

      <div className="cs-body">
        <div className="cs-section sr">
          <VP label="Rokt Ad Experience Overview" desc="Hero: ad placement UI across partner checkout flows. Mobile and desktop frames." height={440} />
        </div>

        {/* E-COMMERCE AD-TECH CONTEXT */}
        <div className="cs-section">
          <span className="cs-section-label sr">The Business Context</span>
          <h2 className="cs-h2 sr">E-Commerce AD-Tech</h2>
          <div className="cs-2col">
            <div>
              <p className="cs-p sr">Rokt is a B2B e-commerce marketing technology that utilizes machine learning to target users at different touch points of their online purchase journey. Rokt's mission aims to increase customers' Lifetime Value (LTV) by capturing their attention during a vulnerable moment in their purchase flow, a crucial moment the company has coined as the customer's "Transaction Moment."</p>
            </div>
            <div>
              <p className="cs-p sr">My work focused on researching general users' behaviors during their online shopping experience and their overall attitude to ads throughout their purchase journey. This research informed key design decisions that resulted in higher Value Per Transaction (VPT) amongst Rokt's targeted users.</p>
              <div className="cs-callout sr">
                <p>UX was new to Rokt NY. The dominant model was satisfying partner requests, not investigating user needs. My first task was making the case that understanding the user wasn't a nice-to-have <strong>it was the lever for everything the business was trying to achieve.</strong></p>
              </div>
            </div>
          </div>
        </div>

        {/* PHASE I DISCOVERY */}
        <div className="cs-section">
          <span className="cs-section-label sr">Phase I: Discovery</span>
          <h2 className="cs-h2 sr">The finding that changed everything.</h2>
          <div className="cs-2col">
            <div>
              <h3 className="cs-h3" style={{ marginBottom: 16 }}>Understanding the Business</h3>
              <p className="cs-p sr">It all begins with an idea. Maybe you want to launch a business. Maybe you want to turn a hobby into something more. Or maybe you have a creative project to share with the world.</p>

              <h3 className="cs-h3" style={{ marginTop: 32, marginBottom: 16 }}>Data Audit</h3>
              <p className="cs-p sr">Wanting to get a clearer picture of the users' current journey and potential bottlenecks, I took a look through data that existed within the company. I used existing Tableau reports and worked closely with Business Analytics team to create reports that could inform my team's KPIs. For example, an invaluable insight from this audit informed my team's lever to lower the amount of clicks it would take a user to understand and claim an offer during a purchase.</p>

              <h3 className="cs-h3" style={{ marginTop: 32, marginBottom: 16 }}>Assumptions / Hypotheses</h3>
              <p className="cs-p sr">Based on what I understood of the users from the key stakeholders in the business and existing data about users activities/behaviors, I began to form assumptions that would create a launchpoint for further research and experimentation.</p>
            </div>
            <div>
              <h3 className="cs-h3" style={{ marginBottom: 16 }}>User Interviews</h3>
              <p className="cs-p sr">I surveyed and screened over 100 users to interview 50 regarding their general experience shopping online and encountering ads in their journey. These interviews consisted of questions to probe users about their experience while going through actual websites they enjoy shopping on, so that their feedback could be more authentic and less staged. These interviews/tests were conducted remotely during the pandemic.</p>
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
                <p className="cs-dot-label">users screened 50 selected for in-depth sessions based on shopping behavior and ad engagement patterns</p>
              </div>
            </div>
          </div>

          <div style={{ marginTop: 48 }}>
            <h3 className="cs-h3 sr" style={{ marginBottom: 20 }}>The Challenge</h3>
            <div className="cs-2col">
              <div>
                <p className="cs-p sr">The e-commerce ad-tech space is dynamic, changing its approach and content constantly from one moment to the next based on user data. In speaking directly with users, and walking through a few typical websites featuring ads, I learned quickly that users are consciously and subconsciously averse to advertisements, and skilled in avoiding them at all costs despite how relevant the ads might be to the user.</p>
              </div>
              <div>
                <p className="cs-p sr">This posed as a large challenge in my discovery since the task at hand was to continue designing ad placements under the assumption users were interested in relevant advertisements. However, this assumption was certainly false according to first-hand accounts from our users. It became clear that overtime users become hyper-attuned to ad placements, and how to avoid them.</p>
              </div>
            </div>
            <div className="cs-pullquote sr">
              <p className="cs-pullquote-text">"I don't even see them anymore. My brain just skips past anything that looks like an ad."</p>
              <p className="cs-pullquote-attr">User interview Discovery research</p>
            </div>
            <div className="cs-insight sr">
              <span className="cs-insight-label">Central Finding</span>
              <p className="cs-insight-text">Users are not passively ignoring ads. They are <strong>actively, consciously, and skillfully avoiding them</strong> regardless of relevance. The question became: how do we earn the right to be there at all?</p>
            </div>
            <div className="cs-callout sr">
              <p><strong>Company KPI:</strong> Increase Lifetime Value (LTV) of current customers for our brand partners. To do so we needed to increase: Value Per Transaction what are the users buying and the average spend? Is there a way to increase this number and at the same time increase the customer's LTV?</p>
            </div>
          </div>
        </div>

        {/* STAKEHOLDER ALIGNMENT */}
        <div className="cs-section">
          <span className="cs-section-label sr">Stakeholder Alignment</span>
          <h2 className="cs-h2 sr">Aligning on Shared Goals (Business meets UX)</h2>
          <div className="cs-2col">
            <div>
              <p className="cs-p sr">To kick-off research and have all stakeholder invested in the success of these new designs, I lead a Lean UX Canvas exercise consisting of key stakeholders from different teams in Product, Customer Success, Account Management, Business Analytics and Leadership to better understand what we understood about our users, the "business problem" we currently faced, and what we would want to learn from our assumptions.</p>
              <p className="cs-p sr">This exercise was paramount in focusing different decision makers ideas into one place, which allowed our team to leave the exercise with not only a clear next step, but next phases of experimentation as well.</p>
            </div>
            <div>
              <div className="cs-pullquote sr">
                <p className="cs-pullquote-text">"We need to be able to take the design decisions away from the powerful person in the room and give it back to the users"</p>
                <p className="cs-pullquote-attr">Jeff Gothelf, Lean UX Founder and Author</p>
              </div>
              <VP label="Lean UX Canvas Workshop" desc="Lean UX Canvas output: assumptions mapped, business problem framed, HMW questions prioritized by stakeholders across Product, CS, Account Management, Analytics, and Leadership." height={280} />
            </div>
          </div>
          <div className="cs-callout sr" style={{ marginTop: 24 }}>
            <p><strong>Emerging Problem Statement:</strong> How might we design alluring and actionable ad experiences within the users purchase journey without interrupting their purchase flow and contributes positively to the users experience across multiple brands?</p>
          </div>
        </div>

        {/* PHASE II EXPERIMENTATION */}
        <div className="cs-section">
          <span className="cs-section-label sr">Phase II: Experimentation &amp; Design Variants</span>
          <h2 className="cs-h2 sr">34 designs. 7 verticals. 200+ user tests.</h2>
          <div className="cs-kpi-row sr">
            {[
              ['34', 'Designs', 'shipped across 7 ad verticals'],
              ['200+', 'User Tests', 'conducted across design experiments'],
              ['7', 'Ad Verticals', 'credit cards, insurance, gift cards, events, financing, parking, BNPL'],
            ].map(([n, l, d]) => (
              <div className="cs-kpi" key={l}>
                <p className="cs-kpi-num">{n}</p>
                <p className="cs-kpi-label">{l}</p>
                <p className="cs-kpi-desc">{d}</p>
              </div>
            ))}
          </div>
          <div className="cs-tag-cloud sr" style={{ marginTop: 28 }}>
            <span className="cs-tag-cloud-label">Ad verticals covered</span>
            <div className="cs-tag-cloud-chips">
              {['Credit Cards', 'Insurance', 'Gift Cards', 'Events', 'Financing / BNPL', 'Parking', 'Buy Now Pay Later'].map((t) => (
                <span className="cs-tag-chip" key={t}>{t}</span>
              ))}
            </div>
          </div>
        </div>

        {/* UX METRICS */}
        <div className="cs-section">
          <span className="cs-section-label sr">UX Metrics</span>
          <h2 className="cs-h2 sr">What we measured to determine success.</h2>
          <div className="cs-finding-grid sr">
            {[
              { tag: '⏱ Time on Task', h: 'Compared to current benchmarks, we wanted to learn the amount of time spent on each task throughout the users purchase journey, from product selection to order confirmation. Prolonged processes affect UX negatively.' },
              { tag: '🚫 User Errors', h: 'During a given task, we wanted to document the number of error opportunities to understand the heuristics of our ad designs. Depending on the frequency and type of errors, we evaluated the UX and usability of a potential ad design in our experiments.' },
              { tag: '🏄‍♂️ Navigation', h: 'In creating desired user flows for customers, we had to consider edge cases that allowed them to navigate to and out of ad experiences. The goal was never to take away from the shopper\'s experience, and so our designs always featured navigation tasks.' },
            ].map(({ tag, h }) => (
              <div className="cs-finding sr" key={tag}>
                <span className="cs-finding-tag">{tag}</span>
                <p className="cs-finding-body">{h}</p>
              </div>
            ))}
          </div>
          <div className="cs-finding-grid sr" style={{ marginTop: 1 }}>
            {[
              { tag: '🤝 Credibility', h: 'This was a surprisingly powerful metric for me in creating designs. Users spoke at length to seeing advertisements as scams, so it was a delicate balance creating more ads for users that they would actually enjoy engaging with. In our experiments, we probed users to speak to us about their perceptions of the ad, if there were any constraints given their look/brand association to validate trust.' },
              { tag: '🤩 Customer Satisfaction', h: 'At the onset of our user testing, we devoted a section in our follow-up questions that surrounded the users satisfaction not only interacting with the ad, but seeing the ad on a partner\'s website. Questions included whether the users trusted the ad on the partners website, did it take away from the value of their purchase or add to their experience as whole.' },
              { tag: '✅ Task Success Rate', h: 'Overall we wanted to determine when a user engages with an ad, can they successfully opt-in/opt-out to complete the success flow for a user interacting with one of Rokt\'s ad placements. This relied not only on the design, but the placement on the page and in the flow as well.' },
            ].map(({ tag, h }) => (
              <div className="cs-finding sr" key={tag}>
                <span className="cs-finding-tag">{tag}</span>
                <p className="cs-finding-body">{h}</p>
              </div>
            ))}
          </div>
          <div className="cs-pullquote sr" style={{ marginTop: 40 }}>
            <p className="cs-pullquote-text">"Observe what people do, not what they say"</p>
            <p className="cs-pullquote-attr">Design like a Scientist Navin Iyengar, Product Design at Netflix</p>
          </div>
        </div>

        {/* DESIGN EXPERIMENTS */}
        <div className="cs-section">
          <span className="cs-section-label sr">Design Experiments</span>
          <h2 className="cs-h2 sr">Testing hypotheses across every vertical.</h2>
          <div className="cs-2col">
            <div>
              <p className="cs-p sr">Alongside extensive secondary research, including best practice design principles in ad tech and competitive market analysis to understand what the best in class ad-tech companies have accomplished already, I began to create new designs for our partners to test and generate direct user feedback.</p>
              <p className="cs-p sr">These design tests help prove/disprove many hypotheses our team had around our users wants/needs/behaviors, and better informed design decisions based on real user feedback.</p>
              <p className="cs-p sr">I drafted 5+ variants across every ad vertical (credit cards, insurance, gift card, etc.) to gauge users reactions and test a few hypotheses.</p>
            </div>
            <div>
              <div className="cs-callout sr">
                <p><strong>Why experiment?</strong> Testing our ideas can save a lot of time to design and ship a product that could potentially fail. Experimenting (A/B testing &amp; Multivariate testing) allows us to know with higher certainty what has actual impact on customer satisfaction.</p>
              </div>
            </div>
          </div>
          <div className="cs-finding-grid sr" style={{ marginTop: 40 }}>
            {[
              { tag: 'Insurance Vertical', h: 'Testing hyper-personalization', b: 'One hypothesis featured in this design example: Personalizing the experience with the users name will result in higher engagement with ads from users.' },
              { tag: 'Events / Parking Vertical', h: 'Testing visual guides and added data points', b: 'One hypothesis featured in this design example: Adding visual aids (map view) and what we assumed could be helpful data points, users would be able to make a more informed and quick decision based on comparison.' },
              { tag: 'Financing / Credit Cards / BNPL', h: 'Positive reinforcements to visualize offer', b: 'One hypothesis featured in this design example: If we offer less explanatory text and instead visualize the offer for users, we will see higher click-rate.' },
            ].map(({ tag, h, b }) => (
              <div className="cs-finding sr" key={tag}>
                <span className="cs-finding-tag">{tag}</span>
                <p className="cs-finding-headline">{h}</p>
                <p className="cs-finding-body">{b}</p>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 40 }}>
            <VP label="Design Variant Grid" desc="Grid of ad variants across 3 verticals with hypothesis labels. 3x3 mobile mockup grid with hypothesis annotations." height={440} />
          </div>
        </div>

        {/* KEY PROJECTS */}
        <div className="cs-section">
          <span className="cs-section-label sr">Key Projects</span>
          <h2 className="cs-h2 sr">Geek out with me.</h2>

          <div style={{ marginBottom: 56 }}>
            <h3 className="cs-h3 sr" style={{ marginBottom: 16 }}>Lean UX Canvas Kick-off</h3>
            <div className="cs-2col">
              <div>
                <p className="cs-p sr">Stakeholder buy-in from the beginning of UX frontier was crucial, and lended itself to unexpected perks, such as more autonomy on new design hypotheses for our partners. Partners who knew about our research relied on our expertise to define new opportunities for their ad space.</p>
              </div>
              <VP label="Lean UX Canvas" desc="Whiteboard photo of completed Lean UX Canvas with stakeholder notes across all sections." height={280} />
            </div>
          </div>

          <div style={{ marginBottom: 56 }}>
            <h3 className="cs-h3 sr" style={{ marginBottom: 16 }}>Concept Testing</h3>
            <div className="cs-2col">
              <div>
                <p className="cs-p sr">One in particular I enjoyed testing and learning from was animated ads. Based on my experience in the ad-tech space, I learned a lot about what attracted the users eye despite their aversion to advertisements. One being the strength of movement and its affect on user behavior.</p>
              </div>
              <VP label="Animated Ad Concepts" desc="Animated ad concept frames showing motion design hypothesis across multiple partner verticals." height={280} />
            </div>
          </div>

          <div>
            <h3 className="cs-h3 sr" style={{ marginBottom: 16 }}>Alternative Payment Methods</h3>
            <p className="cs-p sr">We listened to our users and learned that a large percentage would be more inclined to complete a purchase if they were offered options for alternative pay. We then partnered with payment providers to test this hypothesis across several verticals.</p>
          </div>
        </div>

        {/* LEARNINGS */}
        <div className="cs-section">
          <span className="cs-section-label sr">What I'm Taking With Me</span>
          <h2 className="cs-h2 sr">Advocate for your users.</h2>
          <div className="cs-finding-grid sr">
            {[
              { h: 'Advocation', b: 'UX for the users was fairly new to the New York branch, whose main focus was satisfying partners needs. Including stakeholders in more UX workshops and design sessions helped them understand that satisfying the end-users needs in turn would contribute to the company\'s bottom line.' },
              { h: 'Failed experiments does not mean failure', b: 'In fact, it should be looked at as success. Running design tests and disproving theories means you can learn faster what works with users before expending time/resources/budget.' },
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
