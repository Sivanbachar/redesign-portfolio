import { useState, useEffect, useRef } from 'react'

const LOGO_SVG = `<svg width="72" height="72" viewBox="0 0 228 226" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M116 171C116 171 116 171 66.4628 171C16.9256 171 5 171 5 171C5 201.376 29.8482 226 60.5 226C91.1518 226 116 201.376 116 171Z" fill="white" fill-opacity="1"/>
  <path d="M116.75 0.000976562C85.1086 0.135665 59.5 25.827 59.5 57.5C59.5 89.173 85.1086 114.863 116.75 114.998C116.667 114.998 116.583 115 116.5 115H57.5C25.7436 115 0 89.2564 0 57.5C0 25.7436 25.7436 0 57.5 0H116.5C116.583 0 116.667 0.000622011 116.75 0.000976562Z" fill="white" fill-opacity="1"/>
  <path d="M111.25 111.001C142.891 111.136 168.5 136.827 168.5 168.5C168.5 200.173 142.891 225.863 111.25 225.998C111.333 225.998 111.417 226 111.5 226H170.5C202.256 226 228 200.256 228 168.5C228 136.744 202.256 111 170.5 111H111.5C111.417 111 111.333 111.001 111.25 111.001Z" fill="white" fill-opacity="1"/>
  <path d="M228 58C228 58 228 58 178.463 58C128.926 58 117 58 117 58C117 27.6243 141.848 3 172.5 3C203.152 3 228 27.6243 228 58Z" fill="white" fill-opacity="1"/>
</svg>`

export default function Loader() {
  const [fading,  setFading]  = useState(false)
  const [visible, setVisible] = useState(true)
  const canvasRef = useRef(null)
  const animRef   = useRef(null)

  useEffect(() => {
    const t1 = setTimeout(() => setFading(true),  1800)
    const t2 = setTimeout(() => setVisible(false), 2500)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // ── Retina / HiDPI correction ──
    const dpr = window.devicePixelRatio || 1
    const SIZE = 280
    canvas.width  = SIZE * dpr
    canvas.height = SIZE * dpr
    canvas.style.width  = `${SIZE}px`
    canvas.style.height = `${SIZE}px`

    const ctx = canvas.getContext('2d')
    ctx.scale(dpr, dpr)

    const cx = SIZE / 2
    const cy = SIZE / 2

    const LOGO_SIZE = 72
    const STEP      = 2

    const off    = document.createElement('canvas')
    off.width    = LOGO_SIZE
    off.height   = LOGO_SIZE
    const offCtx = off.getContext('2d')

    const blob = new Blob([LOGO_SVG], { type: 'image/svg+xml' })
    const url  = URL.createObjectURL(blob)
    const img  = new Image()

    img.onload = () => {
      offCtx.drawImage(img, 0, 0, LOGO_SIZE, LOGO_SIZE)
      URL.revokeObjectURL(url)

      const { data } = offCtx.getImageData(0, 0, LOGO_SIZE, LOGO_SIZE)
      const particles = []
      const ox = cx - LOGO_SIZE / 2
      const oy = cy - LOGO_SIZE / 2

      for (let y = 0; y < LOGO_SIZE; y += STEP) {
        for (let x = 0; x < LOGO_SIZE; x += STEP) {
          if (data[(y * LOGO_SIZE + x) * 4 + 3] > 40) {
            const angle = Math.random() * Math.PI * 2
            const dist  = 48 + Math.random() * 72
            // Each particle gets a small random phase shift (0–12% of cycle)
            // so they stagger naturally instead of all moving in lockstep
            const phaseShift = Math.random() * 0.12
            particles.push({
              hx: ox + x,
              hy: oy + y,
              dx: cx + Math.cos(angle) * dist,
              dy: cy + Math.sin(angle) * dist,
              phaseShift,
              // Slight size variation for depth
              r: 0.9 + Math.random() * 0.5,
            })
          }
        }
      }

      // ── Pure sine-wave animation — no hard phase transitions ──
      // dispersion = (1 - cos(2πt)) / 2
      // → smoothly 0 at t=0, peaks at 1 at t=0.5, returns to 0 at t=1
      // The cosine derivative is 0 at both extremes, so it naturally
      // lingers at fully-assembled and fully-dispersed without a hard hold.
      const CYCLE = 2600  // ms per loop
      let start = null

      function frame(ts) {
        if (!start) start = ts
        ctx.clearRect(0, 0, SIZE, SIZE)

        for (const p of particles) {
          // Per-particle time offset creates a gentle staggered wave
          const t  = (((ts - start) / CYCLE) + p.phaseShift) % 1
          const d  = (1 - Math.cos(t * Math.PI * 2)) / 2   // 0 → 1 → 0, smooth

          const px    = p.hx + (p.dx - p.hx) * d
          const py    = p.hy + (p.dy - p.hy) * d
          const alpha = 0.9 - d * 0.45           // fade gently when dispersed
          const r     = p.r * (1 + d * 0.4)      // grow slightly when dispersed

          ctx.beginPath()
          ctx.arc(px, py, r, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(255,255,255,${alpha.toFixed(3)})`
          ctx.fill()
        }

        animRef.current = requestAnimationFrame(frame)
      }

      animRef.current = requestAnimationFrame(frame)
    }

    img.src = url
    return () => { if (animRef.current) cancelAnimationFrame(animRef.current) }
  }, [])

  if (!visible) return null

  return (
    <div style={{
      position:       'fixed',
      inset:           0,
      zIndex:          9999,
      background:     '#0A0A0A',
      display:        'flex',
      alignItems:     'center',
      justifyContent: 'center',
      opacity:        fading ? 0 : 1,
      transition:     'opacity 0.6s cubic-bezier(0.4,0,0.2,1)',
      pointerEvents:  'none',
    }}>
      <canvas ref={canvasRef} />
    </div>
  )
}
