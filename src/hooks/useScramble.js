import { useState, useEffect } from 'react'

export function useScramble(target, duration = 1600, delay = 600) {
  const [display, setDisplay] = useState('')
  const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789·+—'

  useEffect(() => {
    let t = setTimeout(() => {
      const start = Date.now()
      const animate = () => {
        const elapsed = Date.now() - start
        const progress = Math.min(elapsed / duration, 1)
        const resolved = Math.floor(progress * target.length)
        let result = ''
        for (let i = 0; i < target.length; i++) {
          if (i < resolved) result += target[i]
          else result += target[i] === ' ' ? ' ' : CHARS[Math.floor(Math.random() * CHARS.length)]
        }
        setDisplay(result)
        if (progress < 1) requestAnimationFrame(animate)
        else setDisplay(target)
      }
      requestAnimationFrame(animate)
    }, delay)
    return () => clearTimeout(t)
  }, [target])

  return display
}
