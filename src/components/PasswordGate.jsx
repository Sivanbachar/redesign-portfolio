import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const PASSWORD   = 'hellothere'
const STORAGE_KEY = 'pf-auth'

export default function PasswordGate({ children }) {
  const { pathname } = useLocation()
  const isHome = pathname === '/'

  const [authed, setAuthed] = useState(() => {
    try { return localStorage.getItem(STORAGE_KEY) === '1' } catch { return false }
  })
  const [visible, setVisible] = useState(false)
  const [input,   setInput]   = useState('')
  const [shake,   setShake]   = useState(false)
  const [errMsg,  setErrMsg]  = useState(false)

  // Start / cancel the 1.5 s delay based on route and auth state
  useEffect(() => {
    if (authed || isHome) {
      setVisible(false)
      return
    }
    const t = setTimeout(() => setVisible(true), 1500)
    return () => clearTimeout(t)
  }, [authed, isHome])

  // Lock body scroll while gate is up
  useEffect(() => {
    if (visible) document.body.style.overflow = 'hidden'
    else         document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [visible])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (input === PASSWORD) {
      try { localStorage.setItem(STORAGE_KEY, '1') } catch {}
      setAuthed(true)
      setVisible(false)
    } else {
      setShake(true)
      setErrMsg(true)
      setInput('')
      setTimeout(() => setShake(false), 550)
    }
  }

  return (
    <>
      {children}

      {visible && (
        <div className="pg-overlay" role="dialog" aria-modal="true" aria-label="Password required">
          <div className={`pg-card${shake ? ' pg-card--shake' : ''}`}>
            <p className="pg-eyebrow">Sivan Baum · Portfolio</p>
            <p className="pg-title">This page is password protected</p>
            <form onSubmit={handleSubmit} className="pg-form">
              <input
                className="pg-input"
                type="password"
                value={input}
                onChange={e => { setInput(e.target.value); setErrMsg(false) }}
                placeholder="Enter password"
                autoFocus
                autoComplete="current-password"
              />
              <button type="submit" className="pg-btn">Continue</button>
            </form>
            {errMsg && <p className="pg-error">Incorrect password — try again</p>}
          </div>
        </div>
      )}
    </>
  )
}
