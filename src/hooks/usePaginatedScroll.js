import { useEffect } from 'react'

export function usePaginatedScroll(active = true) {
  useEffect(() => {
    if (!active) return
    if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) return

    const COOLDOWN = 800
    const THRESHOLD = 15
    let lastNav = 0
    let currentIdx = 0

    // Only project panels + about are snap targets.
    // Hero / intro / log scroll naturally so the melt effect can play.
    const getSections = () =>
      [
        ...Array.from(document.querySelectorAll('.proj-panel')),
        document.querySelector('.about-band'),
      ].filter(Boolean)

    const docTop = (el) => el.getBoundingClientRect().top + window.scrollY

    const syncIdx = () => {
      const sections = getSections()
      const mid = window.scrollY + window.innerHeight * 0.4
      let best = 0
      sections.forEach((s, i) => {
        if (docTop(s) <= mid) best = i
      })
      currentIdx = best
    }
    syncIdx()
    window.addEventListener('load', syncIdx, { once: true })

    // Only intercept wheel/key once the user is in the projects area
    const inProjectsArea = () => {
      const sections = getSections()
      if (!sections.length) return false
      return window.scrollY + window.innerHeight * 0.6 >= docTop(sections[0])
    }

    const goTo = (idx) => {
      const now = Date.now()
      if (now - lastNav < COOLDOWN) return
      const sections = getSections()
      if (idx < 0 || idx >= sections.length) return
      lastNav = now
      currentIdx = idx
      window.scrollTo({ top: docTop(sections[idx]), behavior: 'smooth' })
    }

    const onWheel = (e) => {
      if (Math.abs(e.deltaY) < THRESHOLD) return
      const dir = e.deltaY > 0 ? 1 : -1
      syncIdx()
      const nextIdx = currentIdx + dir

      // Scrolling up from first project — let natural scroll take user back
      if (nextIdx < 0) return

      // Not yet in projects area and scrolling down — let natural scroll carry them in
      if (!inProjectsArea() && dir > 0) return

      // Not in projects area at all — natural scroll
      if (!inProjectsArea()) return

      e.preventDefault()
      goTo(nextIdx)
    }

    const onKey = (e) => {
      if (!inProjectsArea()) return
      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault()
        syncIdx()
        goTo(currentIdx + 1)
      }
      if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault()
        syncIdx()
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
