import { useEffect } from 'react'

export function usePaginatedScroll(active = true) {
  useEffect(() => {
    if (!active) return

    const COOLDOWN = 800
    const THRESHOLD = 15
    let lastNav = 0
    let currentIdx = 0

    const getSections = () =>
      [
        document.querySelector('.hero-wrap'),
        document.querySelector('.intro-sec'),
        ...Array.from(document.querySelectorAll('.proj-panel')),
        document.querySelector('.about-band'),
      ].filter(Boolean)

    const syncIdx = () => {
      const sections = getSections()
      const mid = window.scrollY + window.innerHeight * 0.4
      let best = 0
      sections.forEach((s, i) => {
        if (s.offsetTop <= mid) best = i
      })
      currentIdx = best
    }
    syncIdx()

    const goTo = (idx) => {
      const now = Date.now()
      if (now - lastNav < COOLDOWN) return
      const sections = getSections()
      if (idx < 0 || idx >= sections.length) return
      lastNav = now
      currentIdx = idx
      window.scrollTo({ top: sections[idx].offsetTop, behavior: 'smooth' })
    }

    const onWheel = (e) => {
      e.preventDefault()
      if (Math.abs(e.deltaY) < THRESHOLD) return
      goTo(currentIdx + (e.deltaY > 0 ? 1 : -1))
    }

    const onKey = (e) => {
      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault()
        goTo(currentIdx + 1)
      }
      if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault()
        goTo(currentIdx - 1)
      }
    }

    window.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('keydown', onKey)
    }
  }, [active])
}
