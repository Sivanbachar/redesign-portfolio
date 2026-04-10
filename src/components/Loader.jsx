import { useState, useEffect, useRef } from 'react'

// SVG string used to sample pixel positions of the logo
const LOGO_SVG = `<svg width="72" height="72" viewBox="0 0 228 226" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M116 171C116 171 116 171 66.4628 171C16.9256 171 5 171 5 171C5 201.376 29.8482 226 60.5 226C91.1518 226 116 201.376 116 171Z" fill="white" fill-opacity="1"/>
  <path d="M116.75 0.000976562C85.1086 0.135665 59.5 25.827 59.5 57.5C59.5 89.173 85.1086 114.863 116.75 114.998C116.667 114.998 116.583 115 116.5 115H57.5C25.7436 115 0 89.2564 0 57.5C0 25.7436 25.7436 0 57.5 0H116.5C116.583 0 116.667 0.000622011 116.75 0.000976562Z" fill="white" fill-opacity="1"/>
  <path d="M111.25 111.001C142.891 111.136 168.5 136.827 168.5 168.5C168.5 200.173 142.891 225.863 111.25 225.998C111.333 225.998 111.417 226 111.5 226H170.5C202.256 226 228 200.256 228 168.5C228 136.744 202.256 111 170.5 111H111.5C111.417 111 111.333 111.001 111.25 111.001Z" fill="white" fill-opacity="1"/>
  <path d="M228 58C228 58 228 58 178.463 58C128.926 58 117 58 117 58C117 27.6243 141.848 3 172.5 3C203.152 3 228 27.6243 228 58Z" fill="white" fill-opacity="1"/>
</svg>`

function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}

export default function Loader() {
  const [fading,  setFading]  = useState(false)
  const [visible, setVisible] = useState(true)
  const canvasRef = useRef(null)
  const animRef   = useRef(null)

  // Fade out & unmount timers
  useEffect(() => {
    const t1 = setTimeout(() => setFading(true),  1600)
    const t2 = setTimeout(() => setVisible(false), 2200)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  // Particle animation
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const W = canvas.width   // 260
    const H = canvas.height  // 260
    const cx = W / 2
    const cy = H / 2

    const LOGO_SIZE = 72
    const STEP      = 2   // sample every 2px → ~300–400 particles

    // Render SVG into an offscreen canvas to read pixel data
    const off = document.createElement('canvas')
    off.width  = LOGO_SIZE
    off.height = LOGO_SIZE
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
            // Each particle gets a random "exploded" destination
            const angle = Math.random() * Math.PI * 2
            const dist  = 55 + Math.random() * 75
            particles.push({
              hx: ox + x,          // home x
              hy: oy + y,          // home y
              dx: cx + Math.cos(angle) * dist,  // dispersed x
              dy: cy + Math.sin(angle) * dist,  // dispersed y
            })
          }
        }
      }

      // ── Animation loop ──
      // Cycle: 0.0–0.3 = hold assembled
      //        0.3–0.6 = disperse out
      //        0.6–0.75 = hold dispersed
      //        0.75–1.0 = come back together
      const CYCLE = 2200 // ms per loop
      let start = null

      function frame(ts) {
        if (!start) start = ts
        const t = ((ts - start) % CYCLE) / CYCLE  // 0→1 looping

        let d = 0  // dispersion factor 0 = assembled, 1 = dispersed
        if (t < 0.3) {
          d = 0
        } else if (t < 0.6) {
          d = easeInOutCubic((t - 0.3) / 0.3)
        } else if (t < 0.75) {
          d = 1
        } else {
          d = 1 - easeInOutCubic((t - 0.75) / 0.25)
        }

        ctx.clearRect(0, 0, W, H)

        for (const p of particles) {
          const px   = p.hx + (p.dx - p.hx) * d
          const py   = p.hy + (p.dy - p.hy) * d
          const size = 1.5 + d * 0.8
          // Fade slightly when fully dispersed
          const alpha = 0.88 - d * 0.35
          ctx.fillStyle = `rgba(255,255,255,${alpha.toFixed(2)})`
          ctx.fillRect(px, py, size, size)
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
      transition:     'opacity 0.55s cubic-bezier(0.4,0,0.2,1)',
      pointerEvents:  'none',
    }}>
      <canvas ref={canvasRef} width={260} height={260} />
    </div>
  )
}
