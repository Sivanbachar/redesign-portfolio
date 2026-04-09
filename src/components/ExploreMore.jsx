import { useLocation, useNavigate } from 'react-router-dom'
import { PROJECTS } from '../data/projects.js'

export default function ExploreMore() {
  const location = useLocation()
  const navigate = useNavigate()

  // Derive current project id from URL
  const currentId = location.pathname.replace('/projects/', '')

  // Show all other non-hidden projects
  const others = PROJECTS.filter(p => p.id !== currentId && !p.hidden)
  if (!others.length) return null

  return (
    <section style={{
      background:  'var(--bg)',
      padding:     'clamp(72px,8vw,112px) clamp(20px,5vw,80px) 0',
      borderTop:   '1px solid var(--bdr)',
    }}>
      {/* Heading */}
      <h2 style={{
        fontFamily:    'var(--sans)',
        fontWeight:     500,
        fontSize:      'clamp(32px,4vw,56px)',
        letterSpacing: '-0.025em',
        color:         'var(--txt)',
        marginBottom:  'clamp(36px,4vw,56px)',
        lineHeight:     1.05,
      }}>
        Explore More
      </h2>

      {/* Project cards */}
      <div style={{
        display:             'grid',
        gridTemplateColumns: `repeat(${Math.min(others.length, 3)}, 1fr)`,
        gap:                 'clamp(16px,2vw,24px)',
      }}>
        {others.map(p => (
          <button
            key={p.id}
            onClick={() => navigate(`/projects/${p.id}`)}
            style={{
              background:  'transparent',
              border:      'none',
              cursor:      'pointer',
              textAlign:   'left',
              padding:      0,
            }}
          >
            {/* Thumbnail */}
            <div style={{
              width:        '100%',
              aspectRatio:  '4/3',
              background:    p.thumbBg,
              borderRadius:  12,
              overflow:     'hidden',
              display:      'flex',
              alignItems:   'center',
              justifyContent: 'center',
              marginBottom:  16,
              transition:   'transform 0.3s cubic-bezier(0.4,0,0.2,1), opacity 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(0.975)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
            >
              {p.locked ? (
                /* Lock icon for locked projects */
                <svg width="28" height="32" viewBox="0 0 18 20" fill="none" style={{ opacity: 0.2 }}>
                  <rect x="3" y="9" width="12" height="10" rx="1.5" stroke="white" strokeWidth="1.5"/>
                  <path d="M6 9V6a3 3 0 0 1 6 0v3" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              ) : p.thumbImg ? (
                <img
                  src={`/${p.thumbImg}`}
                  alt={p.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              ) : (
                <span style={{ fontSize: 40, opacity: 0.08 }}>{p.thumbIcon}</span>
              )}
            </div>

            {/* Title */}
            <p style={{
              fontFamily:    'var(--sans)',
              fontWeight:     500,
              fontSize:      'clamp(16px,1.4vw,20px)',
              letterSpacing: '-0.015em',
              color:         'var(--txt)',
              marginBottom:   6,
            }}>{p.title}</p>

            {/* Type */}
            <p style={{
              fontFamily:    'var(--mono)',
              fontSize:       10,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color:         'var(--txt3)',
            }}>{p.type}</p>
          </button>
        ))}
      </div>
    </section>
  )
}
