const LINKEDIN = 'https://www.linkedin.com/in/sivanbachar/'
const EMAIL    = 'mailto:builtbysivan@gmail.com'

const LinkedInIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
    <path
      d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"
      stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"
    />
    <rect x="2" y="9" width="4" height="12"
      stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"
    />
    <circle cx="4" cy="4" r="2"
      stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"
    />
  </svg>
)

const MailIcon = () => (
  <svg width="18" height="15" viewBox="0 0 24 20" fill="none">
    <rect x="2" y="2" width="20" height="16" rx="2"
      stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"
    />
    <path d="M2 6l10 7 10-7"
      stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"
    />
  </svg>
)

export default function Footer() {
  const backToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <footer style={{
      background:    'var(--bg)',
      borderTop:     '1px solid var(--bdr)',
      padding:       '28px clamp(20px,5vw,80px)',
      display:       'grid',
      gridTemplateColumns: '1fr auto 1fr',
      alignItems:    'center',
      gap:            16,
    }}>

      {/* Left — copyright */}
      <p style={{
        fontFamily:    'var(--mono)',
        fontSize:       10,
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        color:         'var(--txt3)',
        whiteSpace:    'nowrap',
      }}>
        © Sivan Baum {new Date().getFullYear()}
      </p>

      {/* Center — social icons */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
        <a
          href={LINKEDIN}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          style={{
            color:      'var(--txt3)',
            display:    'flex',
            alignItems: 'center',
            transition: 'color 0.2s',
          }}
          onMouseEnter={e => e.currentTarget.style.color = 'var(--txt)'}
          onMouseLeave={e => e.currentTarget.style.color = 'var(--txt3)'}
        >
          <LinkedInIcon />
        </a>

        <a
          href={EMAIL}
          aria-label="Email"
          style={{
            color:      'var(--txt3)',
            display:    'flex',
            alignItems: 'center',
            transition: 'color 0.2s',
          }}
          onMouseEnter={e => e.currentTarget.style.color = 'var(--txt)'}
          onMouseLeave={e => e.currentTarget.style.color = 'var(--txt3)'}
        >
          <MailIcon />
        </a>
      </div>

      {/* Right — back to top */}
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button
          onClick={backToTop}
          style={{
            fontFamily:    'var(--mono)',
            fontSize:       10,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color:         'var(--txt3)',
            background:    'none',
            border:        'none',
            cursor:        'pointer',
            display:       'flex',
            alignItems:    'center',
            gap:            7,
            transition:    'color 0.2s',
            whiteSpace:    'nowrap',
          }}
          onMouseEnter={e => e.currentTarget.style.color = 'var(--txt)'}
          onMouseLeave={e => e.currentTarget.style.color = 'var(--txt3)'}
        >
          Back to top
          <svg width="10" height="12" viewBox="0 0 10 14" fill="none">
            <path d="M5 13V1M1 5l4-4 4 4"
              stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

    </footer>
  )
}
