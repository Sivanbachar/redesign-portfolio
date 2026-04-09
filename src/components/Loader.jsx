import { useState, useEffect } from 'react'

export default function Loader() {
  const [fading,  setFading]  = useState(false)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const t1 = setTimeout(() => setFading(true),  1600) // start fade
    const t2 = setTimeout(() => setVisible(false), 2200) // remove from DOM
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  if (!visible) return null

  return (
    <>
      {/* Spin keyframe — injected once, no global.css change needed */}
      <style>{`
        @keyframes sb-loader-spin {
          to { transform: rotate(360deg); }
        }
      `}</style>

      <div style={{
        position:   'fixed',
        inset:       0,
        zIndex:      9999,
        background: '#0A0A0A',
        display:    'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity:    fading ? 0 : 1,
        transition: 'opacity 0.55s cubic-bezier(0.4,0,0.2,1)',
        pointerEvents: 'none',
      }}>

        {/* Outer ring + logo container */}
        <div style={{ position: 'relative', width: 92, height: 92 }}>

          {/* ── Spinning gradient arc ── */}
          <svg
            viewBox="0 0 100 100"
            style={{
              position: 'absolute', inset: 0,
              width: '100%', height: '100%',
              animation: 'sb-loader-spin 1.5s linear infinite',
            }}
          >
            <defs>
              <linearGradient id="sb-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%"   stopColor="#7C3AED" stopOpacity="0"/>
                <stop offset="35%"  stopColor="#8B5CF6"/>
                <stop offset="100%" stopColor="#22D3EE"/>
              </linearGradient>
            </defs>
            {/* Background ring (very faint) */}
            <circle
              cx="50" cy="50" r="44"
              fill="none"
              stroke="rgba(255,255,255,0.06)"
              strokeWidth="1.2"
            />
            {/* Gradient arc — dasharray creates the gap at the tail */}
            <circle
              cx="50" cy="50" r="44"
              fill="none"
              stroke="url(#sb-grad)"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeDasharray="235 45"
              strokeDashoffset="0"
            />
          </svg>

          {/* ── SB Monogram (same paths as LogoMark) ── */}
          <div style={{
            position: 'absolute', inset: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg
              width="30" height="30"
              viewBox="0 0 228 226"
              fill="none"
            >
              {/* bottom-left */}
              <path
                d="M116 171C116 171 116 171 66.4628 171C16.9256 171 5 171 5 171C5 201.376 29.8482 226 60.5 226C91.1518 226 116 201.376 116 171Z"
                fill="white" fillOpacity="0.82"
              />
              {/* top-left */}
              <path
                d="M116.75 0.000976562C85.1086 0.135665 59.5 25.827 59.5 57.5C59.5 89.173 85.1086 114.863 116.75 114.998C116.667 114.998 116.583 115 116.5 115H57.5C25.7436 115 0 89.2564 0 57.5C0 25.7436 25.7436 3.2213e-07 57.5 0H116.5C116.583 8.45745e-10 116.667 0.000622011 116.75 0.000976562Z"
                fill="white" fillOpacity="0.82"
              />
              {/* bottom-right */}
              <path
                d="M111.25 111.001C142.891 111.136 168.5 136.827 168.5 168.5C168.5 200.173 142.891 225.863 111.25 225.998C111.333 225.998 111.417 226 111.5 226H170.5C202.256 226 228 200.256 228 168.5C228 136.744 202.256 111 170.5 111H111.5C111.417 111 111.333 111.001 111.25 111.001Z"
                fill="white" fillOpacity="0.82"
              />
              {/* top-right */}
              <path
                d="M228 58C228 58 228 58 178.463 58C128.926 58 117 58 117 58C117 27.6243 141.848 3 172.5 3C203.152 3 228 27.6243 228 58Z"
                fill="white" fillOpacity="0.82"
              />
            </svg>
          </div>

        </div>
      </div>
    </>
  )
}
