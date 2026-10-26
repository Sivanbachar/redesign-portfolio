# Mastercard Design Challenge — Webpage Experience Plan
**Shared Expense Tracking | Senior Product Designer Brief**

---

## The Concept Frame

> "The problem isn't the math. It's the moment before you ask."

This reframe is the spine of the entire presentation. Every section flows from it. The challenge isn't building a better calculator — it's designing a system that removes the financial anxiety that lives between people who share a life or a lease.

---

## Part 1 — Complete Webpage Outline

The page is a single-scroll linear narrative. No sidebar, no nav, no links out. Think: Apple product keynote crossed with a long-form editorial piece from The Pudding or Bloomberg Businessweek. Every section transitions naturally into the next. Readers should never wonder what's coming.

---

### Section 1 — Hero

**Purpose:** Set the tone. Establish seriousness and intentionality in the first 3 seconds.

**Layout:** Full viewport height. Content vertically centered. Extremely sparse.

**Elements:**
- Small badge (top-left, 9pt): `Mastercard · Design Challenge · 2025`
- Challenge prompt headline (40–52pt, editorial serif): "Design a better way to share what life costs."
- Metadata strip below (small mono type, muted): `Role: Solo Designer · Timeline: 72hrs · Format: End-to-end Product Design`
- Subtle scroll indicator (bottom center): small downward chevron, slow fade pulse

**Copy direction:**
The headline should NOT be the literal prompt. It should be your editorial interpretation of what the problem is really about. The literal prompt ("Design a digital experience that helps people who share expenses…") becomes a tooltip or footer note — not the opening.

**Suggested headline options:**
- "Design a better way to share what life costs." (clean, direct)
- "Shared money shouldn't cost the relationship." (punchy, emotional)
- "The math is solved. The tension isn't." (strategic reframe)

**Interaction:** Elements fade in line by line with 150ms stagger. Hero text appears at ~80% viewport height threshold on load (not on scroll — it should be visible immediately).

**Transition into Section 2:** As user scrolls, hero pinches down slightly (transform scale, very subtle) and the next section slides up underneath. No parallax. No color shift.

**Background:** Very dark warm near-black (#0C0C0B). Off-white type (#F0EDE8).

---

### Section 2 — Reframing the Problem

**Purpose:** Demonstrate strategic lens. This is what separates a senior designer from a junior who jumps straight to wireframes.

**Layout:** Centered editorial column, 720px wide, generous vertical padding (140px top/bottom).

**Elements:**
- Section label (small caps, monospaced, muted, sticky as you scroll through): `01 — Reframe`
- Large editorial pullquote (52–60pt): "The challenge isn't tracking money. It's the silence before you ask."
- 2–3 supporting paragraphs (16–18pt body text)
- A single visual moment: a small annotated diagram showing the "gap" between transaction → tension → resolution that existing apps ignore

**Copy direction:**
Explain the insight clearly. Most expense apps are payment utilities disguised as relationship tools. They're optimized for the transaction, not the social dynamic that follows. The real product opportunity is designing for the space between people — not the ledger between accounts.

**Suggested supporting paragraphs:**
> "Most shared expense apps solve the wrong problem. They track who owes what — but they don't address why asking for that money feels uncomfortable, or why balances left unresolved slowly erode trust. The math is trivially easy. The social cost of the math is not."

> "Every feature decision in this project flows from a single belief: that the right product doesn't just calculate — it communicates."

**Interaction:** Pullquote fades in from opacity 0 as it enters viewport (60% threshold). No translateY. Pure opacity dissolve feels more editorial than movement here.

---

### Section 3 — Research

**Purpose:** Show that the problem framing is grounded in evidence, not opinion.

**Layout:** Two-column grid (desktop) / single column (mobile). Editorial width.

**Elements:**
- Section label: `02 — Research`
- Methodology note (tiny, muted): "Secondary research across Reddit, App Store, Google Play, and Trustpilot — synthesized into behavioral patterns."
- 4 Behavior Themes (each gets a number, theme name, 2-sentence synthesis, and a supporting data point)
- 3–4 Pull quotes (Reddit/App Store reviews styled as editorial quotes — no avatars, no star ratings, just the words)
- At bottom: a summary callout: "What users actually want isn't a better app — it's less friction with the people they live with."

**The 4 Behavior Themes:**
1. **Avoidance over accuracy** — People stop tracking because the effort of logging outweighs the value of knowing. "I just Venmo my roommate $50 a month and call it even."
2. **Transparency anxiety** — Balance screens are hard to interpret. Users don't trust the number if they can't trace how it was calculated.
3. **The Finance Parent** — In every household, one person becomes responsible for tracking, reminding, and settling. They resent it. The other person feels monitored.
4. **Settlement paralysis** — People let balances accumulate because settling feels like an argument. The longer it waits, the harder it gets.

**Pull quotes (edit for your actual research):**
> "I finally just paid the whole thing to avoid the conversation." — Reddit, r/personalfinance

> "Splitwise is great until you have to ask someone to actually pay you." — App Store review

> "I stopped tracking because every time I opened the app I felt like a debt collector." — Reddit, r/frugal

**Interaction:** Theme cards slide in one at a time as user scrolls, with 100ms stagger. Pull quotes are static (no animation — they should feel calm, like reading a newspaper).

**Stats as typographic moments:** If you have any quantitative data (e.g., "73% of shared expense disputes occur among people who live together"), treat the number at 80pt with a 14pt label beneath it. These should count up when they enter viewport.

---

### Section 4 — Competitive Landscape

**Purpose:** Show you understand the market. NOT: "here are apps I reviewed." YES: "here's what the market has normalized and where the gap is."

**Layout:** Full-width breakout table on desktop. Horizontal scroll on mobile. Sticky first column (App name).

**Apps reviewed:** Splitwise, Venmo, Tricount, Honeydue, Copilot Money

**Columns (5 dimensions):**
1. What it optimizes for
2. Best interaction pattern
3. Biggest weakness
4. Social design quality (Low / Medium / High)
5. Best idea to borrow

**Below the table:** An insight-driven pattern summary — NOT a feature list. Example format:

| Pattern | Seen In | Takeaway |
|---|---|---|
| Running balances | Splitwise, Tricount, Honeydue | Industry-standard mental model. Keep it. |
| Manual expense entry | All five | Largest friction point. Core opportunity. |
| Settlement separated from tracking | All five | The two-app problem. Biggest gap. |
| Social/relationship layer | Honeydue only | Underexplored. Meaningful differentiator. |
| Recurring expense support | Splitwise, Honeydue | Expected by households. Must-have. |

**Copy framing for this section:** "Five apps reviewed. One consistent gap: the experience ends at the transaction, not the relationship."

**Interaction:** Table columns animate in from right as user scrolls. Hover on any row reveals a brief "Key insight" tooltip. Opportunity column cells have a subtle amber left-border to draw the eye.

---

### Section 5 — Key Insights

**Purpose:** Bridge research to design. Each insight should feel like a door opening.

**Layout:** Numbered vertical stack. Full editorial width. Each insight is its own typographic moment.

**Format for each of 4 insights:**
- Large number (120pt, very muted): `01`
- Insight headline (28pt, bold): "People don't avoid settling — they avoid the conversation."
- Evidence (14pt, muted): 1–2 sentences of supporting context
- Design implication (amber accent, small caps): `→ Design for the moment after the expense, not just the moment of entry.`

**The 4 Insights:**
1. **People don't avoid settling — they avoid the conversation.** The friction isn't financial, it's social. Requesting money from someone you live with feels confrontational. → Design to reduce the social cost of requesting payment.

2. **No one trusts a balance they can't explain.** When users can't trace why a balance changed, they stop trusting the number entirely. → Every balance needs a clear, scannable history behind it.

3. **One person always ends up doing the work.** Shared finances create asymmetric responsibility. The person who tracks becomes the person who polices. → Distribute financial awareness, don't centralize it.

4. **The two-app problem kills follow-through.** Every app in the market asks users to switch apps to actually settle. That context switch is where money stays uncollected. → Reduce the distance from "balance visible" to "balance settled."

**Interaction:** Each insight scrolls into view with opacity fade + 20px translateY, 500ms. The number should appear first (100ms), then the headline (200ms delay), then description (300ms delay). This creates a controlled reading rhythm.

---

### Section 6 — Product Principles

**Purpose:** Show that design decisions have a philosophy behind them — not just "it felt right."

**Layout:** 3-column grid (desktop) / stacked (mobile). Each principle: name + 2-sentence explanation + one example of how it shows up in the product.

**3 Principles:**

**1. Transparency by default.**
Every balance, every edit, every transaction has an auditable trail. Nothing is hidden to simplify — complexity is surfaced elegantly, not suppressed. *Shows up in:* Activity feed with "why did this change?" explainability built in.

**2. Reduce the ask.**
Every time the product can automate a decision, prompt a reminder, or pre-fill a default, it should. The ideal interaction is the one that doesn't require one. *Shows up in:* Smart split defaults, recurring expense detection, automated nudges.

**3. Design for both people.**
Most expense apps are designed for the person who logs. This product is designed for both the person who logs and the person who owes — giving both sides clarity, agency, and dignity. *Shows up in:* Dual-perspective balance views, notification design that informs without shaming.

**Interaction:** Principles fade in with 200ms stagger between columns. Static after entrance — no hover state needed here, keep it calm.

---

### Section 7 — Opportunity Areas

**Purpose:** Show how research → principles → specific product opportunities. This is the bridge to the solution.

**Layout:** Left-right pairing. Research insight on left, opportunity on right, connected by a thin horizontal rule.

**5 Opportunity Areas:**

| User Need | Design Opportunity |
|---|---|
| Confidence | Make every balance instantly traceable — show the "why" behind any number |
| Accountability | Assign clear ownership to every expense — no ambiguity about who owes whom |
| Low effort | Reduce the cognitive overhead of adding and splitting expenses |
| Harmony | Remove the social cost of requesting payment between people who care about each other |
| Predictability | Surface recurring and upcoming costs before they become surprises |

**Below the table:** A single line, large, centered: "The opportunity isn't better expense splitting. It's a shared financial layer that serves the relationship."

**Interaction:** Left items and right items fade in simultaneously as pairs, 100ms apart.

---

### Section 8 — Prioritization

**Purpose:** Demonstrate strategic judgment. Not everything gets built — and explaining why is as important as knowing what.

**Layout:** Two stacked zones, clearly labeled. MVP zone / Future Vision zone.

**MVP (Build First):**
Frame as "What solves the 4 core insights immediately?"

| Feature | Insight it solves | Why first |
|---|---|---|
| Expense entry with smart split defaults | Low effort | Lowest-friction path to core value |
| Real-time shared balance view (both parties) | Transparency + Confidence | The #1 reason people open the app |
| Auditable expense history | Confidence | Builds trust in the balance number |
| In-app settlement request (reduce two-app problem) | Harmony + Low effort | Closes the most critical gap in the market |
| Recurring expense detection | Predictability | Highest-frequency use case for households |

**Future Vision (Intentionally Postponed):**
- AI receipt parsing (requires ML infrastructure + accuracy bar not met in MVP)
- Smart reminders (requires behavior data that doesn't exist at launch)
- Predictive settlement recommendations (same — needs usage history)
- Household financial health insights (scope expansion beyond core job-to-be-done)
- Bank/card integration (partnership/trust threshold must be established first)

**Why postponed:** "These features assume a trust level and data richness that doesn't exist at day one. The right order is: earn trust with core clarity, then expand."

**Interaction:** MVP zone slides in from left, Future Vision from right. A simple animated line between them labeled "launch" creates a visual timeline moment.

---

### Section 9 — Solution

**Purpose:** The product reveal. This should feel like a keynote moment.

**Layout:** Full-width section. Dark background shifts to a slightly different dark tone (very subtle) to signal a chapter change.

**Elements:**
- Product name (large, centered, editorial serif): e.g. *"Even"* or *"Ledger"* or your chosen name
- Product positioning statement (20pt): "A shared financial layer that tracks expenses, reduces friction, and makes it easier to stay even with the people you live with."
- 3 core value propositions (3-column grid): Clarity / Accountability / Ease
- Teaser device mockup: partial reveal of the main balance screen — just enough to intrigue, not enough to explain everything yet

**Interaction:** Product name fades in first. Then positioning statement at 200ms delay. Then the device mockup slides up from below the fold, 400ms delay. The reveal should feel like a curtain lifting.

---

### Section 10 — Core User Flow

**Purpose:** Walk through the product experience. Every interaction choice is explained.

**Layout:** Alternating left/right panels. Left = device frame with prototype video. Right = explanation of why this interaction works.

**Recommended steps to walk through (6–8):**

1. **Onboarding** — "We designed onboarding to take 60 seconds, not 6 minutes. You don't need an account to see the value first." → Prototype: invite-first flow, no sign-up wall

2. **Creating a group** — "One tap to create a space. Inviting someone is a text message, not a registration form." → Prototype: share-link join (like Tricount, but with identity verification option for trust)

3. **Adding an expense** — "The form knows your patterns. It pre-fills the split based on what you've done before." → Prototype: smart default split, tap to adjust, 3-tap happy path

4. **Viewing the balance** — "Both parties see the same number. And can tap into exactly why that number is what it is." → Prototype: balance screen with expandable history

5. **Recurring expenses** — "The product notices you added 'Netflix' last month. It offers to track it automatically." → Prototype: smart detection prompt, one-tap confirm

6. **Settling** — "Settlement is one tap from the balance screen. No app switching." → Prototype: in-product payment initiation (Venmo/bank link)

7. **Notification design** — "We don't say 'Alex owes you $47.50.' We say 'Your electric bill is ready to settle.' One sounds like a debt. The other sounds like a reminder." → Side-by-side language comparison

**Prototype embed guidance:** Each step should have a 10–20 second Figma prototype video recorded in Origami/Protopie, displayed in a phone device frame (iPhone 15 proportions), auto-plays muted when scrolled to 40% viewport visibility. Clicking the video plays with sound.

---

### Section 11 — Why This Is Better

**Purpose:** Competitive differentiation, framed as principles — not a feature checklist.

**Layout:** Side-by-side split. "What the market built" vs. "What we built." Not a table — a narrative.

| The Market | This Product |
|---|---|
| Optimizes for logging speed | Optimizes for shared understanding |
| One person tracks, one person owes | Both people have equal clarity |
| Settlement is a separate app | Settlement lives in the balance view |
| Reminders feel like demands | Reminders feel like FYIs |
| History is a log | History is an explanation |

**Below:** Pull the 4 insights back: "Each of these decisions directly addresses a research insight — not a competitor feature."

**Interaction:** Left column fades in, then right column, then the insight linkage at the bottom. Slow, deliberate entrance. No movement after.

---

### Section 12 — Success Metrics

**Purpose:** Demonstrate business acumen. Show you understand how to measure product success, not just user satisfaction.

**Layout:** 3-column grid. Product / Behavior / Business.

**Metrics:**

**Product (Are we building the right thing?)**
- North star: Time from expense added → expense settled (target: ↓ 40%)
- % of households where both members actively use the product (not just the "tracker")
- Balance explainability score (% of users who can find why a balance changed without help)

**Behavior (Are people using it right?)**
- Retention at Day 7, Day 30, Day 90
- Recurring expense detection acceptance rate (> 60% target)
- Settlement initiation rate from within the app (vs. external payment)

**Business (Does this create value for Mastercard?)**
- Transaction volume routed through Mastercard rails
- Partner acquisition (household finance partnerships)
- Net Promoter Score among household users (target: > 45)

**Qualitative success markers:** "Users stop calling it 'the money app' and start calling it 'ours.' That's when you know it's working."

---

### Section 13 — Reflection

**Purpose:** Intellectual honesty. This section makes you look more senior, not less.

**Layout:** Single editorial column. Personal voice. No bullets — full prose paragraphs.

**Elements:**
- "What I'd test first" (2–3 priorities)
- "What I assumed" (3–4 explicit assumptions)
- "What I'd do differently with more time"
- "The open question I'm still thinking about"

**Copy direction:**
> "If I had another week, I'd spend it on the notification system. Getting the language right on payment reminders — the exact words, the timing, the tone — matters more than any visual decision I made. A bad nudge doesn't just fail; it damages the relationship the product is trying to support."

> "My biggest assumption: that people want financial transparency with the people they live with. That's probably true for partners. It may be less true for roommates, where privacy and independence are more valued. That split deserves its own research."

> "The question I haven't answered: what does success look like for the person who doesn't initiate? The person who's always being nudged. That experience needs as much design attention as the tracker's view — and I only sketched it."

---

## Part 2 — Wireframe Hierarchy

### Layout Logic by Section

```
Section 1: Hero
├── Full-viewport height container
├── Center-aligned content block (max-width 960px)
│   ├── Badge (small, top)
│   ├── H1 headline (editorial serif, 48–60pt)
│   ├── Metadata strip (mono, small)
│   └── Scroll indicator (bottom)
└── Background: solid dark

Section 2: Reframe
├── Full-width container, content-width inner (720px)
├── Sticky section label (left edge, small caps)
├── Pullquote block (large type, center or left-aligned)
├── Body text (3 paragraphs, 16–18pt)
└── Small annotated diagram (SVG, 480px wide, centered)

Section 3: Research
├── Section label
├── Methodology note
├── 2-column theme grid (desktop) / stacked (mobile)
│   ├── Theme card × 4 (number, name, synthesis, stat)
│   └── Pull quote column (3–4 quotes)
└── Summary callout (full-width, amber accent line left)

Section 4: Competitive Landscape
├── Section label
├── Intro paragraph (insight framing)
├── Table container (full-width breakout, horizontal scroll mobile)
│   ├── Sticky first column (app name)
│   └── 5 columns × 5 rows
├── Pattern insight table (editorial width)
└── Closing insight statement

Section 5: Key Insights
├── Section label
└── Insight stack × 4
    ├── Large number (120pt, muted, right-aligned)
    ├── Insight headline (28pt, bold)
    ├── Evidence text (14pt, muted)
    └── Design implication (amber, small caps, 12pt)

Section 6: Product Principles
├── Section label
├── 3-column principle grid
│   └── Principle card × 3
│       ├── Principle name (20pt, bold)
│       ├── Explanation (14pt)
│       └── "Shows up as" example (12pt, muted italic)
└── Spacer

Section 7: Opportunity Areas
├── Section label
├── Paired rows × 5
│   ├── Left: User Need (14pt, muted label)
│   └── Right: Design Opportunity (16pt, primary)
└── Full-width insight statement (24pt, centered)

Section 8: Prioritization
├── Section label
├── MVP zone (dark surface card, full-width)
│   ├── Label: "Launch"
│   └── Feature table × 5 rows
├── Animated timeline divider
└── Future vision zone (lighter surface, slightly different tone)
    ├── Label: "Next chapter"
    └── Feature list × 5 with "Why postponed" annotation

Section 9: Solution
├── Chapter shift (subtle background change)
├── Product name (large, centered, serif)
├── Positioning statement (20pt, centered)
├── 3-column value prop grid
└── Device mockup reveal (centered, full-width breakout)

Section 10: Core User Flow
├── Section label
└── Flow steps × 6–8
    ├── Step number (small, muted)
    ├── Step headline (20pt)
    ├── Device frame + prototype video (left OR right, alternating)
    └── Explanation text (opposite side from device)

Section 11: Why Better
├── Section label
├── Split narrative (two columns)
│   ├── "The market" column (muted text)
│   └── "This product" column (primary text, amber accents)
└── Research insight callback (bottom, full-width)

Section 12: Success Metrics
├── Section label
├── 3-column metrics grid
│   └── Metric group × 3 (north star + 2–3 supporting)
└── Qualitative marker (italic, centered)

Section 13: Reflection
├── Section label
├── Full editorial column (720px wide)
├── 4 reflection topics (prose, not bullets)
└── Closing line (small, personal, muted)
```

---

## Part 3 — Component Inventory

### Core Layout
- `<SectionContainer>` — Full-width section with configurable top/bottom padding (80 / 120 / 160px)
- `<ContentWidth>` — Inner wrapper: editorial (720px) / standard (960px) / wide (1120px) / full
- `<SectionLabel>` — Small caps, monospaced, sticky-within-section, muted color

### Typography
- `<EditorialHeadline>` — Serif, 48–60pt, primary color
- `<SectionHeadline>` — Serif, 28–36pt, primary color
- `<Pullquote>` — Serif italic, 44–56pt, primary color
- `<BodyText>` — Sans, 16–18pt, primary/secondary color
- `<MetaText>` — Mono, 11–12pt, muted color, letter-spaced
- `<InsightImplication>` — Mono, 11pt, amber, small caps, letter-spaced

### Interactive
- `<PrototypeEmbed>` — Video + device frame container, auto-plays muted on scroll
- `<AnimatedStat>` — Large number (60–80pt) that counts up from 0 on viewport entry
- `<CompetitorTable>` — Full-width horizontal scroll table with sticky column
- `<InsightCard>` — Number + headline + evidence + implication, scroll-animated
- `<PrincipleCard>` — Name + explanation + example, 3-column grid item

### Visual
- `<Divider>` — 1px rule, muted, 40px top/bottom margin
- `<PullquoteBlock>` — Text quote with left border (amber, 2px), generous left padding
- `<DeviceFrame>` — iPhone 15 proportions, clean border, drop shadow
- `<AmbientStat>` — Large muted number in background (decorative, not readable at normal reading distance)
- `<ThemeCard>` — Research theme with number, name, synthesis paragraph, and stat

### Navigation / Orientation
- `<ProgressBar>` — Thin (2px) amber line at very top of viewport, advances as user scrolls (0% → 100%)
- No other navigation elements

---

## Part 4 — Interaction Specifications

### Scroll-Triggered Entrance (Standard)
Applied to: most content elements
```
Trigger: IntersectionObserver, threshold 0.15 (15% visible)
Animation: opacity 0 → 1, translateY 24px → 0
Duration: 600ms
Easing: cubic-bezier(0.16, 1, 0.3, 1)  [ease-out spring]
Stagger between sibling elements: 100ms
```

### Insight Cards (Staggered)
Applied to: Section 5 insight components
```
Trigger: IntersectionObserver, threshold 0.1
Sequence: number first (0ms), headline (+100ms), evidence (+200ms), implication (+350ms)
Opacity: 0 → 1
translateY: 16px → 0 for number, 24px → 0 for headline
Duration: 500ms each
```

### Animated Stats (Count-Up)
Applied to: Large numeric data points in Section 3
```
Trigger: IntersectionObserver, threshold 0.5 (fully in view)
Animation: Count from 0 to target value
Duration: 1200ms
Easing: ease-out cubic
Format: apply number formatting on each frame (%, $, etc.)
```

### Competitor Table
Applied to: Section 4 table
```
Desktop: table with sticky left column (position: sticky, left: 0)
Mobile: overflow-x: scroll, -webkit-overflow-scrolling: touch
Hover on row: background opacity shift (10% lighter), 150ms transition
Opportunity column: amber left-border (2px) on each cell
```

### Prototype Video
Applied to: Section 10 device frames
```
Autoplay: muted, when scrolled to 40% viewport visibility
Click: unmutes, shows controls
Device frame: position: relative, video: position: absolute, inset with border-radius
Play indicator: subtle pulsing dot in corner while paused
```

### Section Label (Sticky)
Applied to: All section labels
```
Position: sticky, top: 40px
Behavior: stays in place while content scrolls past
Opacity: 0 on initial load → 1 when parent section enters viewport
Opacity: 1 → 0 when parent section exits viewport
Transition: 200ms opacity
```

### Progress Bar
Applied to: Global top of page
```
Position: fixed, top: 0, left: 0
Width: calculated from (scrollY / (documentHeight - viewportHeight)) * 100
Height: 2px
Color: amber (#E8A838)
z-index: 9999
No border-radius — clean line
```

---

## Part 5 — Animation System

### The Core Rule
> Every animation must serve communication, not decoration. If you can't describe what the animation is communicating, remove it.

### What to Animate
- Entrance of content (opacity fade + subtle translateY)
- Stats counting up (reinforces that these are real numbers, not static)
- Progress bar (orients the reader within the narrative)
- Section label fade (tells you which chapter you're in)
- Video autoplay (invites engagement without demanding it)
- Competitor table hover (makes the data feel interactive, not static)

### What NOT to Animate
- Page transitions (no full-page fades or slides between sections — this is scroll, not slides)
- Parallax on text (makes reading harder)
- Background color shifts on scroll (trendy, distracting)
- Hover effects on non-interactive elements
- Loading skeletons (the page should load fast enough that this isn't needed)
- Text scramble / typewriter effects on body copy (only acceptable on the hero headline if at all)

### Timing Values
```
Fast (micro):     150ms  — hover states, focus rings
Standard:         300ms  — small element entrances
Medium:           500ms  — insight cards, principles
Slow:             700ms  — device frame reveal, hero entrance
Very slow:        1200ms — stat count-up
```

### Easing
```
Entrance elements:  cubic-bezier(0.16, 1, 0.3, 1)   — feels like settling into place
Exit elements:      cubic-bezier(0.7, 0, 1, 0.3)     — feels like pulling away
UI interactions:    cubic-bezier(0.4, 0, 0.2, 1)     — Material standard, reliable
Count-up:           ease-out                          — decelerates as it reaches target
```

### Reduced Motion
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.001ms !important;
    transition-duration: 0.001ms !important;
  }
}
```
All content must be visible without animation. Never hide content behind animation-dependent reveals.

---

## Part 6 — Pacing Guide

### Section Heights and Reading Times

| # | Section | Scroll Height | Est. Read Time | Notes |
|---|---|---|---|---|
| 1 | Hero | 100vh (740px) | 5 sec | Immediate impact, quick through |
| 2 | Reframe | 1,400px | 45 sec | Slow down here. Dense ideas. |
| 3 | Research | 2,200px | 90 sec | Most content. 4 themes + quotes. |
| 4 | Competitive Landscape | 1,800px | 75 sec | Table requires attention. |
| 5 | Key Insights | 2,400px | 90 sec | 4 insights × ~600px each |
| 6 | Product Principles | 900px | 30 sec | Short but important |
| 7 | Opportunity Areas | 800px | 25 sec | Bridge section, scan-friendly |
| 8 | Prioritization | 1,400px | 60 sec | Two zones, decision logic |
| 9 | Solution | 1,100px | 40 sec | The reveal — give it space |
| 10 | Core User Flow | 5,200px | 3–4 min | Longest section. Prototype-heavy. |
| 11 | Why Better | 900px | 30 sec | Punchy comparison |
| 12 | Success Metrics | 800px | 25 sec | Scannable grid |
| 13 | Reflection | 1,000px | 45 sec | Slow finish |

**Total scroll depth:** ~20,000px / ~18–22 viewport heights
**Total reading time:** 9–12 minutes at engaged pace (fast scrollers: 5 min)
**Rhythm note:** Sections 2–5 are the heaviest cognitive lift. Sections 6–8 should feel faster. Section 9 (solution reveal) should feel like a release. Section 10 is long but visually driven. Sections 11–13 are the cool-down.

### The Pacing Arc
```
SLOW   → Reframe (earn the reader's attention)
MEDIUM → Research (build the evidence)
SLOW   → Insights (let each one land)
FAST   → Principles, Opportunities (momentum building)
PAUSE  → Solution reveal (the moment)
MEDIUM → Flow walkthrough (satisfying detail)
FAST   → Why Better, Metrics (confidence)
SLOW   → Reflection (close with honesty)
```

---

## Part 7 — Prototype Video Placement

### Recommended Embed Points

**Section 9 (Solution Reveal) — Overview Video**
- Placement: Full-width, centered below the product name and positioning statement
- Content: 25–35 second overview of the core experience (onboarding → balance view → expense add → settle)
- Device frame: iPhone 15, clean white or dark chrome
- Autoplay: Yes, muted, looping
- Click behavior: Pause / play (no sound needed for overview)
- Size: 360px device width, centered on desktop

**Section 10 (Core User Flow) — Step Videos**
- 6–8 individual clips, 10–20 seconds each
- Placement: Alternating left/right (device left on odd steps, right on even steps)
- Each clip: one discrete interaction (add expense, view balance, settle, etc.)
- Content visible beside video: Step number, step headline, "Why we made this choice" paragraph
- Autoplay: Yes, muted, when scrolled to 40% threshold
- Click: Pause/play

### Video Production Recommendations
- Record from Figma Prototype mode (or Origami/ProtoPie for richer transitions)
- Resolution: 2× Retina (750px device width source)
- Format: MP4 (h.264), < 5MB per clip
- Remove Figma chrome before recording (use browser fullscreen mode in prototype)
- Add a 500ms pause at the beginning and end of each clip before looping
- Use a dark phone device frame (matches the dark page aesthetic)

### Device Frame CSS
```css
.device-frame {
  width: 320px;
  aspect-ratio: 9/19.5;
  border-radius: 44px;
  border: 12px solid #1A1917;
  box-shadow:
    0 0 0 1px rgba(255,255,255,0.08),
    0 32px 64px rgba(0,0,0,0.6),
    0 8px 24px rgba(0,0,0,0.4);
  overflow: hidden;
  position: relative;
}
.device-frame video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 32px;
}
```

---

## Part 8 — Premium vs. PowerPoint: 15 Differentiators

1. **No slide chrome.** A scroll narrative has no "slide 4 of 13" indicator, no deck branding in corners. The reader is inside a document, not watching a presentation.

2. **Large typographic moments.** Stats at 80pt, insights at 60pt — these create the visual rhythm a deck never achieves.

3. **Editorial pull quotes.** Content from real users, styled like a magazine quote, is infinitely more persuasive than a bullet point that says "users said they were frustrated."

4. **Stats that count up.** A number that animates to its value on entry feels alive in a way a static slide never does.

5. **Prototype in-context.** Embedding your actual prototype video inside the design walkthrough (not in a separate slide with "here's a link") keeps the reader in the story.

6. **Device frame quality.** The difference between a screenshot on a plain background and a prototype inside a precision-designed device frame signals craft immediately.

7. **Section labels that stick.** As users scroll through your Research section, seeing "02 — Research" stay in the corner tells them exactly where they are without a nav bar.

8. **Competitor table is interactive.** Hover states, horizontal scroll on mobile — the table behaves like a real product, not a static grid.

9. **Whitespace is content.** 120px of empty space before a section headline communicates "this is important" better than a horizontal rule ever could.

10. **One typeface family.** All weights from the same family (e.g., Fraunces for headings, Fraunces Light for body) creates cohesion a deck made in 20 minutes never has.

11. **Color is restrained.** Two colors maximum: your near-black base and a single accent. Any more and it looks designed; fewer looks intentional.

12. **Reflection section exists.** No PowerPoint deck has a slide that says "here's what I assumed that I know isn't proven yet." That honesty is a senior designer's signature.

13. **Research is synthesized, not presented.** Behavior themes, not methods. Pull quotes, not survey results. The form communicates that you've processed the data, not just collected it.

14. **Progress bar.** A 2px amber line at the top of the viewport that fills as you scroll is the only wayfinding the page needs. It's enough.

15. **The page works without scrolling.** The hero section should communicate the entire thesis on its own. If someone only sees Section 1, they understand what you were trying to do. That's editorial design.

---

## Part 9 — Senior-Level Thinking Moments

These are the specific places in the presentation where a hiring panel will think: "this person operates above execution."

1. **The reframe in Section 2.** Starting with "the problem isn't what you think it is" is a senior move. Junior designers present solutions. Senior designers redefine the problem first.

2. **Four synthesized behavior themes instead of raw methods.** Not "I did secondary research." "Here's what I found, organized into four patterns that directly influenced the design."

3. **The Finance Parent insight.** This is the most emotionally intelligent insight in the deck. It reframes the problem as an equity issue (one person does more work) rather than just a UX issue. That's systems thinking.

4. **Framing the competitor gap as a two-app problem.** Most competitive analyses compare features. Identifying a structural gap (you track here, you pay somewhere else) is analytical thinking above the feature level.

5. **Product principles with a "shows up as" example.** Every design challenge has principles. The ones that show examples of how a principle manifests in actual product decisions demonstrate that your principles aren't aspirational — they're operational.

6. **Explicit "why postponed" logic in the prioritization.** Saying "we're not building AI receipt parsing because the trust threshold isn't established at launch" shows you understand product strategy, not just UX.

7. **Success metrics in three tiers.** Product / Behavior / Business. Any designer can name a DAU. Naming a "% of households where both members are active users" shows you're thinking about the actual product problem, not vanity metrics.

8. **Notification language design in Section 10.** Showing the difference between "Alex owes you $47.50" and "Your electric bill is ready to settle" in your flow walkthrough demonstrates understanding of voice, tone, and emotional design at a level most designers don't explicitly address.

9. **Designing for both parties, not just the tracker.** Explicitly naming "we designed this for both the person who logs and the person who owes" shows you've thought about the full user ecosystem, not just the primary user path.

10. **The reflection section.** Naming your assumptions. Admitting the question you haven't answered. This is what the most senior designers do — they build confidence by acknowledging uncertainty honestly, rather than hiding it.

---

## Part 10 — Design Language

### Color Palette
```
Background (primary):   #0C0C0B  — near-black warm (dominant)
Background (surface):   #161412  — card / section surfaces
Background (highlight): #1C1608  — amber-tinted accent surfaces
Text (primary):         #F0EDE8  — warm off-white
Text (secondary):       #B8B3AC  — warm light gray
Text (muted):           #5C5956  — labels, captions, metadata
Accent:                 #E8A838  — warm amber (used sparingly)
Border:                 #262320  — subtle dividers
```

**Usage rules:**
- Amber (`#E8A838`) appears on: progress bar, section label accents, insight implications, opportunity column in competitor table, highlight box border. Nowhere else.
- Never use amber on a large area — it's an accent, not a base.
- All backgrounds are warm (slightly yellow-tinted neutrals), never cool grays. This creates a cohesive, intentional warmth that feels editorial and premium.

### Typography
```
Display / Headings:  Fraunces (serif, variable — available on Google Fonts)
                     Weight: 700 for headlines, 400 for pullquotes
Body / UI:           Inter (or Calibri for PPTX versions)
                     Weight: 400 for body, 600 for bold emphasis
Mono / Labels:       JetBrains Mono (or IBM Plex Mono)
                     Used for: section labels, metadata, insight implications
```

**Fallback stack:**
```css
font-family: 'Fraunces', 'Georgia', serif;           /* display */
font-family: 'Inter', 'Helvetica Neue', sans-serif;  /* body */
font-family: 'JetBrains Mono', 'Courier New', mono;  /* labels */
```

**Type scale:**
```
10px — Meta, smallest labels
12px — Captions, metadata
14px — Secondary body, table content
16px — Primary body text
18px — Emphasis body
24px — Small section heads
32px — Sub-headlines
44px — Section headlines
56px — Pullquotes
72px — Hero headline
120px — Decorative numbers (insights section)
```

**Line heights:**
```
Display (72px+):   1.05
Headlines (32-56): 1.15
Body (14-18px):    1.65
Captions (10-12):  1.5
```

### Spacing System
```
Base unit: 8px
Scale: 8, 16, 24, 32, 48, 64, 80, 120, 160
Section vertical padding:  120px (standard), 160px (hero/reveal), 80px (fast sections)
Content max-widths:         720px (editorial), 960px (standard), 1120px (wide), 100vw (breakout)
Side margins:               max(24px, 5vw)  — generous on large screens, safe on small
```

### Grid
```
12-column grid inside 1120px max-width
Column gap: 24px
Common configurations:
  Full:          12 columns (full-width content)
  Two halves:    6 | 6  (competitor split, why better)
  One-third:     4 | 8  (insight implication | insight text)
  Thirds:        4 | 4 | 4  (principles, metrics)
  Two-thirds:    8 | 4  (flow step, device frame)
```

### Borders and Surfaces
```
All borders:      1px solid #262320
Card surfaces:    background #161412, border-radius: 8px
Highlight box:    background #1C1608, border: 1px solid #E8A838, border-radius: 8px
Dividers:         1px #262320, no margin tricks — use padding on sections instead
```

---

## Technical Implementation Notes (React)

### Component Architecture
```
/src
  /pages
    /cases
      mastercard.jsx        ← The case study page (standalone route)
  /components
    /mastercard
      Hero.jsx
      Reframe.jsx
      Research.jsx
      CompetitorTable.jsx
      Insights.jsx
      Principles.jsx
      Opportunities.jsx
      Prioritization.jsx
      Solution.jsx
      CoreFlow.jsx
      WhyBetter.jsx
      Metrics.jsx
      Reflection.jsx
      ProgressBar.jsx       ← Fixed position, reads scroll progress
      SectionLabel.jsx      ← Sticky within parent
      PrototypeEmbed.jsx    ← Video with device frame + IntersectionObserver
      AnimatedStat.jsx      ← Count-up on entry
  /styles
    mastercard.css           ← Scoped styles for this case only
```

### Routing (React Router v6)
```jsx
// In App.jsx, add:
<Route path="/mastercard" element={<MastercardCase />} />
// OR: use a completely standalone HTML file served from /public/mastercard/
```

**Important:** This page should have NO layout wrapper (no `<Nav>`, no `<Footer>`). The case study is its own complete experience. Either exclude the layout in the route, or create a standalone page outside the React SPA entirely.

### IntersectionObserver Pattern
```javascript
// Reusable hook for scroll-triggered entrance
function useScrollReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, visible];
}
```

### Animated Stat Pattern
```javascript
function AnimatedStat({ target, suffix = '', duration = 1200 }) {
  const [value, setValue] = useState(0);
  const [ref, visible] = useScrollReveal(0.5);

  useEffect(() => {
    if (!visible) return;
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - t, 3); // ease-out cubic
      setValue(Math.round(target * ease));
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [visible, target, duration]);

  return <span ref={ref}>{value}{suffix}</span>;
}
```

---

*This plan covers all structural, visual, interactive, and strategic decisions needed to build the case study page. The actual design solution — wireframes, UI decisions, prototype content — is yours to design based on your research and principles. This document gives you the container; you fill it.*
