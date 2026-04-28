/**
 * PhoneMockup
 * -----------
 * iPhone Dynamic Island frame with a looping video inside and
 * CSS tap-circle animations synced to the video loop.
 *
 * Props
 *   src          – video source path
 *   taps         – array of { x, y, delay } where x/y are % of screen dimensions
 *                  and delay is the animation-delay in seconds
 *   videoDuration – used to repeat the tap cycle (seconds)
 */
export default function PhoneMockup({
  src = '/images/pins/solution_video.mp4',
  taps = [
    { x: 50, y: 55, delay: 0.4 },
    { x: 50, y: 38, delay: 3.2 },
    { x: 50, y: 65, delay: 6.0 },
  ],
  videoDuration = 8,
}) {
  return (
    <div style={{
      width: '100%', height: '100%',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      position: 'relative',
    }}>
      {/* ── Phone outer shell ── */}
      <div style={{
        position: 'relative',
        width: '56%',
        aspectRatio: '9 / 19.5',
        borderRadius: 44,
        background: 'linear-gradient(160deg, #2a2a2a 0%, #141414 60%, #1e1e1e 100%)',
        boxShadow: [
          'inset 0 0 0 1.5px rgba(255,255,255,0.13)',
          'inset 0 2px 4px rgba(255,255,255,0.06)',
          '0 32px 80px rgba(0,0,0,0.7)',
          '0 0 0 1px rgba(0,0,0,0.4)',
        ].join(', '),
        overflow: 'visible',
      }}>

        {/* Volume buttons — left side */}
        {[{ top: '18%', h: '6%' }, { top: '26%', h: '9%' }, { top: '37%', h: '9%' }].map((b, i) => (
          <div key={i} style={{
            position: 'absolute',
            left: -4, top: b.top, height: b.h, width: 4,
            background: 'linear-gradient(to right, #252525, #1a1a1a)',
            borderRadius: '3px 0 0 3px',
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08)',
          }} />
        ))}

        {/* Power button — right side */}
        <div style={{
          position: 'absolute',
          right: -4, top: '24%', height: '13%', width: 4,
          background: 'linear-gradient(to left, #252525, #1a1a1a)',
          borderRadius: '0 3px 3px 0',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08)',
        }} />

        {/* ── Screen area ── */}
        <div style={{
          position: 'absolute',
          inset: 6,
          borderRadius: 38,
          overflow: 'hidden',
          background: '#000',
        }}>
          {/* Video */}
          <video
            src={src}
            autoPlay
            loop
            muted
            playsInline
            style={{
              width: '100%', height: '100%',
              objectFit: 'cover',
              display: 'block',
            }}
          />

          {/* Tap circles */}
          {taps.map((tap, i) => (
            <div
              key={i}
              className="phone-tap"
              style={{
                left: `${tap.x}%`,
                top: `${tap.y}%`,
                animationDelay: `${tap.delay}s`,
                animationDuration: `${videoDuration}s`,
              }}
            />
          ))}

          {/* Dynamic Island */}
          <div style={{
            position: 'absolute',
            top: 12, left: '50%',
            transform: 'translateX(-50%)',
            width: '34%', height: 26,
            borderRadius: 20,
            background: '#000',
            zIndex: 10,
          }} />

          {/* Subtle screen glare */}
          <div style={{
            position: 'absolute', inset: 0,
            borderRadius: 'inherit',
            background: 'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, transparent 50%)',
            pointerEvents: 'none',
            zIndex: 9,
          }} />
        </div>
      </div>
    </div>
  )
}
