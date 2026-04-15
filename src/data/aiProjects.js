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
]
