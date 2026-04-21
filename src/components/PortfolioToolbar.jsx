import { useState, useEffect, useRef } from 'react'

// ─── TRACKS ──────────────────────────────────────────────────────────────────
const TRACKS = [
  { src: '/audio/Jungle - Julia.mp3',                            artist: 'Jungle',       title: 'Julia' },
  { src: '/audio/Rhye - Open.mp3',                               artist: 'Rhye',         title: 'Open' },
  { src: '/audio/Parcels - Yougotmefeeling (Lyric Video).mp3',   artist: 'Parcels',      title: 'Yougotmefeeling' },
  { src: '/audio/Lana Del Rey - Blue Jeans.mp3',                 artist: 'Lana Del Rey', title: 'Blue Jeans' },
]

// ─── ICONS ───────────────────────────────────────────────────────────────────
const IconPrev = () => (
  <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
    <path d="M10 2L5 6.5 10 11V2z" fill="currentColor"/>
    <rect x="2" y="2" width="2" height="9" rx="1" fill="currentColor"/>
  </svg>
)
const IconNext = () => (
  <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
    <path d="M3 2l5 4.5L3 11V2z" fill="currentColor"/>
    <rect x="9" y="2" width="2" height="9" rx="1" fill="currentColor"/>
  </svg>
)
const IconPlay = () => (
  <svg width="12" height="14" viewBox="0 0 12 14" fill="none">
    <path d="M1.5 1.5l10 5-10 5V1.5z" fill="currentColor"/>
  </svg>
)
const IconPause = () => (
  <svg width="12" height="14" viewBox="0 0 12 14" fill="none">
    <rect x="1" y="1" width="3.5" height="12" rx="1.2" fill="currentColor"/>
    <rect x="7.5" y="1" width="3.5" height="12" rx="1.2" fill="currentColor"/>
  </svg>
)
const IconNote = () => (
  <svg width="13" height="14" viewBox="0 0 13 14" fill="none">
    <rect x="1" y="1" width="11" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.15"/>
    <path d="M3.5 5h6M3.5 7.5h6M3.5 10h3.5" stroke="currentColor" strokeWidth="1.15" strokeLinecap="round"/>
  </svg>
)
const IconClose = () => (
  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
    <path d="M1 1l8 8M9 1L1 9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
  </svg>
)
const IconSend = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
    <path d="M1 1l10 5-10 5V7l7-1-7-1V1z" fill="currentColor"/>
  </svg>
)

// ─── COMPONENT ───────────────────────────────────────────────────────────────
export default function PortfolioToolbar() {
  // ── Music state ───────────────────────────────────────────────────────────
  const [playing,   setPlaying]   = useState(false)
  const [trackIdx,  setTrackIdx]  = useState(0)
  const [progress,  setProgress]  = useState(0)   // 0–1
  const audioRef    = useRef(null)
  const progressRef = useRef(null)

  useEffect(() => {
    const audio = new Audio(TRACKS[0].src)
    audio.volume = 0.4
    audioRef.current = audio

    const onTime = () => {
      if (audio.duration) setProgress(audio.currentTime / audio.duration)
    }
    const onEnd = () => {
      setTrackIdx(i => {
        const next = (i + 1) % TRACKS.length
        audio.src = TRACKS[next].src
        audio.volume = 0.4
        audio.play().catch(() => {})
        return next
      })
      setProgress(0)
    }

    audio.addEventListener('timeupdate', onTime)
    audio.addEventListener('ended', onEnd)
    return () => {
      audio.removeEventListener('timeupdate', onTime)
      audio.removeEventListener('ended', onEnd)
      audio.pause()
      audio.src = ''
    }
  }, [])

  const fade = (target, done) => {
    const audio = audioRef.current
    if (!audio) return
    const step = target > audio.volume ? 0.03 : -0.05
    const id = setInterval(() => {
      const v = audio.volume + step
      if ((step > 0 && v >= target) || (step < 0 && v <= target)) {
        audio.volume = Math.max(0, Math.min(1, target))
        clearInterval(id)
        done?.()
      } else {
        audio.volume = Math.max(0, Math.min(1, v))
      }
    }, 25)
  }

  const togglePlay = () => {
    const audio = audioRef.current
    if (!audio) return
    if (playing) {
      fade(0, () => audio.pause())
      setPlaying(false)
    } else {
      audio.volume = 0
      audio.play().catch(() => {})
      fade(0.4)
      setPlaying(true)
    }
  }

  const goToTrack = (idx) => {
    const audio = audioRef.current
    if (!audio) return
    audio.src = TRACKS[idx].src
    setTrackIdx(idx)
    setProgress(0)
    if (playing) {
      audio.volume = 0.4
      audio.play().catch(() => {})
    }
  }

  const seekTo = (e) => {
    const audio = audioRef.current
    if (!audio || !audio.duration || !progressRef.current) return
    const rect = progressRef.current.getBoundingClientRect()
    const frac = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
    audio.currentTime = frac * audio.duration
    setProgress(frac)
  }

  // ── Notes state ───────────────────────────────────────────────────────────
  const [notesOpen,  setNotesOpen]  = useState(false)
  const [notes,      setNotes]      = useState(() => {
    try { return localStorage.getItem('sivan-portfolio-notes') || '' } catch { return '' }
  })
  const [emailStep,  setEmailStep]  = useState(false)
  const [email,      setEmail]      = useState('')
  const [sent,       setSent]       = useState(false)
  const textareaRef  = useRef(null)

  useEffect(() => {
    try { localStorage.setItem('sivan-portfolio-notes', notes) } catch {}
  }, [notes])

  useEffect(() => {
    if (notesOpen) setTimeout(() => textareaRef.current?.focus(), 80)
  }, [notesOpen])

  const sendEmail = () => {
    if (!email.trim() || !notes.trim()) return
    const subject = encodeURIComponent('Portfolio Notes')
    const body    = encodeURIComponent(notes)
    window.open(`mailto:${email}?subject=${subject}&body=${body}`)
    setSent(true)
    setTimeout(() => { setSent(false); setEmailStep(false) }, 3000)
  }

  const track = TRACKS[trackIdx]

  return (
    <>
      {/* ── NOTES PANEL ──────────────────────────────────────────────────── */}
      <div style={{
        position: 'fixed',
        bottom: notesOpen ? 57 : -260,
        right: 24,
        width: 320,
        background: 'rgba(12,12,12,0.97)',
        border: '1px solid rgba(255,255,255,0.09)',
        borderBottom: 'none',
        borderRadius: '10px 10px 0 0',
        padding: '14px 16px 12px',
        zIndex: 998,
        boxShadow: '0 -8px 48px rgba(0,0,0,0.55)',
        fontFamily: 'var(--sans)',
        transition: 'bottom 0.32s cubic-bezier(0.16,1,0.3,1)',
      }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
          <span style={{
            fontFamily: 'var(--mono)', fontSize: 9,
            letterSpacing: '0.18em', textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.28)',
          }}>Notes</span>
          <button
            onClick={() => { setNotesOpen(false); setEmailStep(false) }}
            style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.3)', cursor: 'pointer', padding: 2, display: 'flex' }}
          ><IconClose /></button>
        </div>

        {/* Textarea */}
        <textarea
          ref={textareaRef}
          value={notes}
          onChange={e => setNotes(e.target.value)}
          placeholder="Jot something down…"
          style={{
            width: '100%', height: 110,
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 6,
            color: 'rgba(255,255,255,0.75)',
            fontFamily: 'var(--sans)', fontSize: 13, lineHeight: 1.65,
            padding: '9px 11px', resize: 'none', outline: 'none',
            boxSizing: 'border-box',
          }}
        />

        {/* Email row */}
        <div style={{ marginTop: 10 }}>
          {sent ? (
            <p style={{
              fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.13em',
              color: 'rgba(255,255,255,0.38)', textAlign: 'center', padding: '8px 0',
            }}>Opening your email client…</p>
          ) : emailStep ? (
            <div style={{ display: 'flex', gap: 7 }}>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && sendEmail()}
                placeholder="your@email.com"
                autoFocus
                style={{
                  flex: 1, background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  borderRadius: 5, color: 'rgba(255,255,255,0.75)',
                  fontFamily: 'var(--sans)', fontSize: 12,
                  padding: '7px 10px', outline: 'none',
                }}
              />
              <button
                onClick={sendEmail}
                style={{
                  background: 'rgba(255,255,255,0.07)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  borderRadius: 5, color: 'rgba(255,255,255,0.6)',
                  cursor: 'pointer', padding: '7px 11px',
                  display: 'flex', alignItems: 'center',
                }}
              ><IconSend /></button>
            </div>
          ) : (
            <button
              onClick={() => notes.trim() && setEmailStep(true)}
              style={{
                width: '100%',
                fontFamily: 'var(--mono)', fontSize: 9,
                letterSpacing: '0.14em', textTransform: 'uppercase',
                cursor: notes.trim() ? 'pointer' : 'default',
                color: notes.trim() ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.14)',
                background: 'none',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: 5, padding: '8px 12px',
                transition: 'color 0.2s, border-color 0.2s',
              }}
            >✉ Email notes to myself</button>
          )}
        </div>
      </div>

      {/* Equalizer keyframe */}
      <style>{`
        @keyframes eqBar {
          0%, 100% { height: 3px; }
          50%       { height: 11px; }
        }
      `}</style>

      {/* ── TOOLBAR ──────────────────────────────────────────────────────── */}
      <div style={{
        position: 'fixed', bottom: 0, left: 0, right: 0,
        height: 56,
        background: 'rgba(18,18,18,0.97)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderTop: '1px solid rgba(255,255,255,0.14)',
        boxShadow: '0 -1px 0 rgba(255,255,255,0.04), 0 -16px 48px rgba(0,0,0,0.7)',
        display: 'flex', alignItems: 'center',
        padding: '0 20px',
        zIndex: 999,
        fontFamily: 'var(--sans)',
      }}>

        {/* ── LEFT: Music player ────────────────────────────────────── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, flex: 1, minWidth: 0 }}>

          {/* Spotify logo */}
          <img
            src="/images/toolbar/spotify_logo.png"
            alt="Spotify"
            style={{
              height: 18, width: 18,
              objectFit: 'contain',
              opacity: 0.7,
              flexShrink: 0,
            }}
          />

          {/* Prev / Play / Next */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 2, flexShrink: 0 }}>
            <TBtn onClick={() => goToTrack((trackIdx - 1 + TRACKS.length) % TRACKS.length)} label="Previous">
              <IconPrev />
            </TBtn>
            <TBtn onClick={togglePlay} label={playing ? 'Pause' : 'Play'} accent>
              {playing ? <IconPause /> : <IconPlay />}
            </TBtn>
            <TBtn onClick={() => goToTrack((trackIdx + 1) % TRACKS.length)} label="Next">
              <IconNext />
            </TBtn>
          </div>

          {/* Track info + progress */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, minWidth: 0, flex: 1, maxWidth: 320 }}>

            {/* Top row: label + equalizer + track name */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 0 }}>
              {/* "Now Playing" label — only when playing */}
              <span style={{
                fontFamily: 'var(--mono)', fontSize: 8,
                letterSpacing: '0.18em', textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.3)',
                whiteSpace: 'nowrap', flexShrink: 0,
                opacity: playing ? 1 : 0,
                transition: 'opacity 0.4s',
              }}>Now Playing</span>

              {/* Animated equalizer bars */}
              {playing && (
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: 2, height: 12, flexShrink: 0 }}>
                  {[
                    'eqBar 0.9s ease-in-out infinite',
                    'eqBar 0.9s ease-in-out 0.3s infinite',
                    'eqBar 0.9s ease-in-out 0.6s infinite',
                  ].map((anim, i) => (
                    <div key={i} style={{
                      width: 2, borderRadius: 1,
                      background: 'rgba(255,255,255,0.5)',
                      animation: anim,
                      height: 8,
                    }} />
                  ))}
                </div>
              )}

              {/* Track name */}
              <span style={{
                fontFamily: 'var(--sans)', fontSize: 12, fontWeight: 500,
                letterSpacing: '-0.01em',
                color: playing ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.4)',
                whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                transition: 'color 0.4s',
              }}>
                {track.artist} <span style={{ fontWeight: 400, color: playing ? 'rgba(255,255,255,0.45)' : 'rgba(255,255,255,0.25)' }}>— {track.title}</span>
              </span>
            </div>

            {/* Progress bar */}
            <div
              ref={progressRef}
              onClick={seekTo}
              style={{
                height: 2, background: 'rgba(255,255,255,0.09)',
                borderRadius: 1, cursor: 'pointer', position: 'relative',
              }}
            >
              <div style={{
                position: 'absolute', top: 0, left: 0,
                height: '100%', width: `${progress * 100}%`,
                background: playing ? 'rgba(255,255,255,0.65)' : 'rgba(255,255,255,0.25)',
                borderRadius: 1,
                transition: 'background 0.4s',
              }} />
            </div>
          </div>
        </div>

        {/* Divider */}
        <div style={{ width: 1, height: 22, background: 'rgba(255,255,255,0.12)', marginLeft: 20, flexShrink: 0 }} />

        {/* ── RIGHT: Notes ─────────────────────────────────────────── */}
        <div style={{ marginLeft: 20, flexShrink: 0 }}>
          <button
            onClick={() => { setNotesOpen(o => !o); setEmailStep(false) }}
            aria-label={notesOpen ? 'Close notes' : 'Open notes'}
            style={{
              display: 'flex', alignItems: 'center', gap: 8,
              background: notesOpen ? 'rgba(255,255,255,0.07)' : 'none',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 6, padding: '6px 11px',
              cursor: 'pointer',
              color: notes.trim() ? 'rgba(255,255,255,0.65)' : 'rgba(255,255,255,0.38)',
              transition: 'background 0.2s, color 0.2s',
            }}
          >
            <IconNote />
            <span style={{
              fontFamily: 'var(--mono)', fontSize: 9,
              letterSpacing: '0.14em', textTransform: 'uppercase',
              whiteSpace: 'nowrap',
            }}>
  Take Notes
            </span>
            {/* Dot if notes exist */}
            {notes.trim() && (
              <span style={{
                width: 5, height: 5, borderRadius: '50%',
                background: 'rgba(255,255,255,0.45)',
                flexShrink: 0,
              }} />
            )}
          </button>
        </div>

      </div>
    </>
  )
}

// ── TOOLBAR BUTTON ────────────────────────────────────────────────────────────
function TBtn({ onClick, label, accent, children }) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      style={{
        padding: 0,
        width: accent ? 34 : 28, height: accent ? 34 : 28,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer',
        borderRadius: accent ? '50%' : 5,
        background: accent ? 'rgba(255,255,255,0.1)' : 'none',
        border: accent ? '1px solid rgba(255,255,255,0.14)' : 'none',
        color: accent ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.45)',
        transition: 'color 0.15s, background 0.15s',
        flexShrink: 0,
      }}
    >{children}</button>
  )
}
