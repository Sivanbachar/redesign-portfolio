import { useEffect } from 'react'

// Skip canvas + rAF loop entirely on touch/mobile — GPU compositing causes blank screens on Safari
const isTouch = () =>
  typeof window !== 'undefined' &&
  (('ontouchstart' in window) || window.matchMedia('(pointer: coarse)').matches)

export default function ElectricGrid() {
  useEffect(() => {
    if (isTouch()) return  // no cursor on mobile — bail immediately

    const GRID = 56
    let sparks = []
    let mouse = { x: -9999, y: -9999 }
    let animId

    const sections = []
    ;['.hero-wrap', '.intro-sec'].forEach((sel) => {
      const el = document.querySelector(sel)
      if (!el) return
      const cv = document.createElement('canvas')
      cv.style.cssText = 'position:absolute;top:0;left:0;pointer-events:none;z-index:2;'
      el.appendChild(cv)
      const ctx = cv.getContext('2d')
      if (!ctx) { el.removeChild(cv); return }  // guard: getContext can return null on some devices
      sections.push({ el, cv, ctx })
    })

    if (!sections.length) return

    const resize = () => {
      sections.forEach(({ el, cv }) => {
        cv.width = el.offsetWidth
        cv.height = el.offsetHeight
      })
    }

    const spawn = () => {
      sections.forEach(({ el }) => {
        const r = el.getBoundingClientRect()
        if (mouse.x < r.left || mouse.x > r.right || mouse.y < r.top || mouse.y > r.bottom) return

        const lx = mouse.x - r.left
        const ly = mouse.y - r.top
        const gx = Math.round(lx / GRID) * GRID
        const gy = Math.round(ly / GRID) * GRID

        if (Math.random() < 0.22) {
          const lineY = gy + (Math.round(Math.random() * 6) - 3) * GRID
          const spd = (2.2 + Math.random() * 3.0) * (Math.random() < 0.5 ? 1 : -1)
          sparks.push({
            sec: el, type: 'h',
            line: lineY, pos: gx, vel: spd,
            tail: 40 + Math.random() * 60,
            life: 0, max: 60 + Math.random() * 50,
            peak: 0.20 + Math.random() * 0.14,
          })
        }
        if (Math.random() < 0.22) {
          const lineX = gx + (Math.round(Math.random() * 6) - 3) * GRID
          const spd = (2.2 + Math.random() * 3.0) * (Math.random() < 0.5 ? 1 : -1)
          sparks.push({
            sec: el, type: 'v',
            line: lineX, pos: gy, vel: spd,
            tail: 40 + Math.random() * 60,
            life: 0, max: 60 + Math.random() * 50,
            peak: 0.20 + Math.random() * 0.14,
          })
        }
        if (sparks.length > 120) sparks.splice(0, sparks.length - 120)
      })
    }

    const draw = () => {
      animId = requestAnimationFrame(draw)
      spawn()
      sparks = sparks.filter((s) => s.life < s.max)

      sections.forEach(({ cv, ctx }) => ctx.clearRect(0, 0, cv.width, cv.height))

      sparks.forEach((s) => {
        s.life++
        s.pos += s.vel

        const t = s.life / s.max
        const alpha = s.peak * Math.sin(t * Math.PI)
        if (alpha < 0.006) return

        const entry = sections.find(({ el }) => el === s.sec)
        if (!entry) return
        const { ctx } = entry

        const tailDir = s.vel > 0 ? -1 : 1
        const hx = s.type === 'h' ? s.pos : s.line
        const hy = s.type === 'h' ? s.line : s.pos
        const tx = s.type === 'h' ? s.pos + tailDir * s.tail : s.line
        const ty = s.type === 'h' ? s.line : s.pos + tailDir * s.tail

        const g = ctx.createLinearGradient(tx, ty, hx, hy)
        g.addColorStop(0, 'rgba(160,205,255,0)')
        g.addColorStop(0.55, `rgba(185,218,255,${alpha * 0.38})`)
        g.addColorStop(1, `rgba(215,233,255,${alpha})`)

        ctx.save()
        ctx.strokeStyle = g
        ctx.lineWidth = 0.8
        ctx.shadowColor = `rgba(150,195,255,${alpha * 0.55})`
        ctx.shadowBlur = 4
        ctx.beginPath()
        ctx.moveTo(tx, ty)
        ctx.lineTo(hx, hy)
        ctx.stroke()
        ctx.restore()
      })
    }

    resize()
    const onMove = (e) => { mouse.x = e.clientX; mouse.y = e.clientY }
    const onResize = () => resize()
    window.addEventListener('mousemove', onMove)
    window.addEventListener('resize', onResize)
    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('resize', onResize)
      sections.forEach(({ cv }) => cv.parentNode?.removeChild(cv))
    }
  }, [])

  return null
}
