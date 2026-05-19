export const AI_PROJECTS = [
  {
    id: 'portfolio',
    title: 'This Portfolio',
    type: 'Vibe Coded Build',
    tagline: 'A full React SPA built from scratch using AI as the primary execution layer.',
    thumbBg: 'linear-gradient(135deg, #12181f 0%, #0a0f14 100%)',
    thumbImg: 'images/ai/currently.png',
    thumbIcon: '◈',
    route: '/ai/portfolio',
    toolIcons: ['claude', 'google-stitch', 'react', 'vercel'],

    // Hero
    heroImg: 'images/ai/currently.png',
    description: 'A production React portfolio built end-to-end using AI as the execution layer — designed, coded, and shipped in two weeks.',

    // What / Problem / Why
    about: [
      'This site is a working React SPA with routing, animations, password-gated case studies, a canvas loader, and a responsive design system — all built through vibe coding with Claude Code.',
      'The typical blocker for a portfolio isn\'t ideas. It\'s execution time. Translating design decisions into production-quality code usually takes months of iteration, especially without dedicated engineering support.',
      'I built this to prove that execution time is no longer the constraint — and to free up the mental space that normally goes to production to focus on what actually matters: what to build and why.',
    ],

    // Tools
    tools: [
      { name: 'Claude Code', note: 'Primary build environment — all code generated and iterated here' },
      { name: 'Google Stitch / Figma Make', note: 'UI prototyping — I alternate based on output quality for the task' },
      { name: 'Vite + React', note: 'Build tooling and component framework' },
      { name: 'Vercel', note: 'Deployment and analytics' },
    ],

    // Build time
    builtWithAI: '~2 weeks',
    estimatedWithout: '2–3 months',
    timeNote: 'The difference isn\'t just speed — it\'s scope. Without AI, a portfolio this complete would require compromises: fewer animations, simpler interactions, less polish. With AI handling execution, nothing gets cut for time.',

    // Learnings
    learnings: [
      { heading: 'Prompting is designing', body: 'The quality of the output is directly tied to how clearly you articulate intent. Vague prompts produce generic results. Precise prompts — where you describe behavior, edge cases, and tradeoffs — produce work that actually fits.' },
      { heading: 'Iteration cycles collapse', body: 'What used to take a day of back-and-forth with an engineer takes minutes. That changes how you think about trying things. You stop filtering ideas based on cost and start evaluating them on merit.' },
      { heading: 'Judgment is still the bottleneck', body: 'AI doesn\'t know if the layout feels right, if the copy is too long, or if a feature adds friction. Every decision about what to keep, cut, or adjust is still a human call. The designer\'s job shifts from making to deciding.' },
      { heading: 'Systems thinking matters more', body: 'AI produces components, not systems. If you don\'t have a mental model of how pieces connect — state, routing, data flow — the output becomes hard to maintain. The more fluent you are in structure, the better the output.' },
      { heading: 'This changes what designers can own', body: 'The traditional gap between design and production narrows significantly. Designers who understand how products are built can now close that gap themselves — not by becoming engineers, but by using AI as a capable execution partner.' },
    ],
  },

  {
    id: 'gramercy',
    title: 'Gramercy Investment Group',
    type: 'AI-Built Client Website',
    tagline: 'Designed and launched a full investment firm website using AI as the build layer — from sitemap to production in days.',
    thumbBg: 'linear-gradient(135deg, #0f1a14 0%, #080f0a 100%)',
    thumbIcon: '◈',
    thumbImg: 'images/ai/gramercy_thumbnail.jpg',
    route: '/ai/gramercy',
    toolIcons: ['claude', 'chatgpt', 'netlify'],

    heroImg: null,
    description: 'A fully designed and launched website for a real investment group client — built using AI tooling from competitive analysis through production deployment.',

    liveUrl: 'https://gramercyinvestors.com',

    about: [
      'Gramercy Investment Group needed a web presence that would establish credibility and clearly communicate their value to prospective investors and partners. The engagement covered everything: brand positioning, information architecture, design system, and production build.',
      'I started with a competitive analysis of comparable investment firm sites to understand what signals trust, what creates friction, and where most firms leave value on the table. From that, I defined the sitemap and prioritized workflows based on the user behavior I wanted to drive — getting the right visitor to the right action with as little friction as possible.',
      'The design system — typography, color, spacing, component logic — was defined by me. ChatGPT helped sharpen positioning copy and stress-test structural decisions. Claude Code handled the implementation, translating design decisions into production-quality code. I used it to iterate on animations, refine responsive behavior, and push polish across every state.',
      'The site is hosted and deployed on Netlify. What would typically be a multi-week agency engagement was completed in days — without compromising on quality.',
    ],

    tools: [
      { name: 'Claude Code', note: 'Primary build environment — code generation, animation refinement, responsive polish, and iteration' },
      { name: 'ChatGPT', note: 'Positioning copy, structural feedback, and stress-testing information hierarchy decisions' },
      { name: 'Netlify', note: 'Production hosting and continuous deployment' },
    ],

    builtWithAI: '~4 days',
    estimatedWithout: '3–5 weeks',
    timeNote: 'The speed wasn\'t the point — the quality was. AI compressed execution so I could stay focused on the decisions that mattered: what the site needed to communicate, in what order, and to whom.',

    learnings: [
      { heading: 'Competitive analysis still drives architecture', body: 'AI didn\'t define the sitemap or the content hierarchy — I did, based on patterns I found across comparable firms. The research phase is still entirely human. What changed is how fast the output of that thinking can be turned into a working site.' },
      { heading: 'Design systems are the foundation', body: 'The quality of the build came from having a clear design system before touching code. When spacing, color, and typography are decided, AI can execute cleanly. When they\'re vague, AI fills in the gaps in ways that feel generic.' },
      { heading: 'Client work demands precision prompting', body: 'With a real client, there\'s no room for "close enough." Getting AI to produce work that actually fits the brief required detailed, specific prompts — more like writing a spec than having a conversation. That discipline makes the output better.' },
      { heading: 'Animations and motion are now in scope', body: 'Transitions, entrance animations, hover states — things that used to be cut for time or handed off to a motion designer — I was able to define and implement directly. AI makes motion accessible to any designer who can describe what they want.' },
      { heading: 'Netlify deployment closes the loop', body: 'Being able to go from code to live URL without an engineering handoff changes the nature of the engagement. I could show the client a live site, get real feedback, and push changes the same day.' },
    ],
  },

  {
    id: 'reseller',
    title: 'Reseller App',
    type: 'AI-Assisted App Design',
    tagline: 'One listing, every platform. An adaptive form that posts to multiple resale marketplaces without repeating work.',
    thumbBg: 'linear-gradient(135deg, #1a1625 0%, #0d0a14 100%)',
    thumbImg: 'images/ai/Resell app.png',
    thumbIcon: '⊞',
    route: '/ai/reseller',
    toolIcons: ['google-stitch', 'chatgpt'],

    // Hero
    heroImg: null,
    description: 'An app designed to eliminate the repetition of multi-platform resale posting — one adaptive listing, every marketplace.',

    // What / Problem / Why
    about: [
      'Resellers who operate across platforms like Depop, Poshmark, eBay, and Facebook Marketplace face a constant grind: the same item has to be listed from scratch on every platform, in different formats, with different required fields. It\'s not creative work — it\'s data entry, repeated.',
      'The real challenge wasn\'t aggregation, it was data parity. Each platform has its own schema — some require dimensions, some demand brand fields, some enforce condition taxonomies. A single flat form would either bloat the experience for simpler platforms or silently fail on more demanding ones.',
      'The solution was an adaptive listing form that captures the maximum possible data upfront, then surfaces only the relevant fields per target platform. Post to one place and the form trims itself. Add a second platform and the extra fields appear inline. One listing, shaped differently for each destination.',
    ],

    // Tools
    tools: [
      { name: 'Google Stitch', note: 'Primary UI design and prototyping — generated initial layouts and component structures' },
      { name: 'ChatGPT', note: 'Prompt refinement — used to sharpen UX copy, clarify form logic, and stress-test edge cases' },
    ],

    // Prototype embed
    prototype: 'https://stitch.withgoogle.com/preview/10338839281982439021?node-id=8c1fb39898a540e4980bb3a5b1787bc7',

    // Build time
    builtWithAI: '~1 day',
    estimatedWithout: '1–2 weeks',
    timeNote: 'The form logic and adaptive field system were the hardest parts to think through — but having AI to quickly prototype variations meant I could test the interaction model in hours, not days.',

    // Learnings
    learnings: [
      { heading: 'AI speeds up the hard middle', body: 'The concept was clear quickly. What usually takes time is the in-between — translating a mental model into screens. Stitch collapsed that gap significantly, generating usable UI from high-level prompts and letting me focus on refining rather than constructing.' },
      { heading: 'Prompting sharpens product thinking', body: 'Using ChatGPT to refine the UX logic forced me to articulate decisions I would normally leave implicit — which fields are required, what happens when platforms conflict, how errors surface. Writing prompts good enough to get useful output is really just writing a product spec.' },
      { heading: 'Adaptive forms are a systems problem', body: 'The interesting design challenge wasn\'t visual — it was data modeling. Which platform is the "most detailed"? What happens if two platforms want the same field in different formats? Solving that made the rest of the UI much simpler to design.' },
      { heading: 'Design tools that generate are still design tools', body: 'Stitch doesn\'t remove design judgment. It removes keystroke work. I still had to evaluate every screen it generated — whether the hierarchy was right, whether the form felt approachable, whether the adaptive logic was legible to a user who doesn\'t know it\'s happening.' },
      { heading: 'AI takes liberties', body: 'Left to its own interpretation, AI will make decisions — about layout, copy, hierarchy, flow — that aren\'t wrong, but aren\'t yours. Getting it to the right place required significant back and forth, and even then the final output doesn\'t fully capture the intended experience. Better prompting helps constrain this, but the gap between what you picture and what gets generated is real. Precision in prompting is a skill that has to be developed deliberately.' },
    ],
  },
]
