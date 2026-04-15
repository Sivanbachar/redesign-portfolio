const TOOLS = {
  'claude': {
    label: 'Claude Code',
    src: '/images/ai/claude-ai-icon.webp',
  },
  'chatgpt': {
    label: 'ChatGPT',
    src: '/images/ai/chatgpt_icon.jpg',
  },
  'google-stitch': {
    label: 'Google Stitch',
    src: '/images/ai/google_stitch.png',
  },
  'figma': {
    label: 'Figma',
    src: '/images/ai/Figma_logo.png',
  },
  'vercel': {
    label: 'Vercel',
    src: `https://cdn.simpleicons.org/vercel/ffffff`,
  },
  'react': {
    label: 'React',
    src: `https://cdn.simpleicons.org/react/61DAFB`,
  },
  'vite': {
    label: 'Vite',
    src: `https://cdn.simpleicons.org/vite/646CFF`,
  },
}

export default function ToolIcon({ tool }) {
  const t = TOOLS[tool]
  if (!t) return null
  return (
    <span className="tool-icon-chip" title={t.label} aria-label={t.label}>
      <img
        src={t.src}
        alt={t.label}
        className="tool-icon-img"
        width="14"
        height="14"
        loading="lazy"
      />
    </span>
  )
}
