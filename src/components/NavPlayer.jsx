import { useState, useEffect, useRef } from 'react'

const TRACKS = [
  { src: '/audio/Jungle - Julia.mp3',                             title: 'Julia',                artist: 'Jungle' },
  { src: '/audio/Rhye - Open.mp3',                                title: 'Open',                 artist: 'Rhye' },
  { src: '/audio/Parcels - Yougotmefeeling (Lyric Video).mp3',    title: 'Yougotmefeeling',      artist: 'Parcels' },
  { src: '/audio/Lana Del Rey - Blue Jeans.mp3',                  title: 'Blue Jeans',           artist: 'Lana Del Rey' },
  { src: "/audio/L'Impératrice  AGITATIONS TROPICALES.mp3",       title: 'Agitations Tropicales', artist: "L'Impératrice" },
  { src: '/audio/Muse - Uprising  Lyrics.mp3',                    title: 'Uprising',             artist: 'Muse' },
  { src: '/audio/Roosevelt - Ordinary Love (Official Audio).mp3', title: 'Ordinary Love',        artist: 'Roosevelt' },
]

export default function NavPlayer() {
  const [playing, setPlaying]   = useState(false)
  const [trackIdx, setTrackIdx] = useState(0)
  const audioRef                = useRef(null)

  useEffect(() => {
    const audio = new Audio(TRACKS[0].src)
    audio.volume = 0.4
    audioRef.current = audio

    const onEnd = () => {
      setTrackIdx(i => {
        const next = (i + 1) % TRACKS.length
        audio.src = TRACKS[next].src
        audio.volume = 0.4
        audio.play().catch(() => {})
        return next
      })
    }
    audio.addEventListener('ended', onEnd)
    return () => {
      audio.removeEventListener('ended', onEnd)
      audio.pause()
      audio.src = ''
    }
  }, [])

  const togglePlay = () => {
    const audio = audioRef.current
    if (!audio) return
    if (playing) {
      audio.pause()
      setPlaying(false)
    } else {
      audio.play().catch(() => {})
      setPlaying(true)
    }
  }

  const track = TRACKS[trackIdx]
  const label = `${track.title}  —  ${track.artist}`

  return (
    <div className="nav-player">
      <div className={`nav-eq${playing ? ' nav-eq--on' : ''}`} aria-hidden="true">
        <span /><span /><span />
      </div>

      <div className="nav-player-marquee">
        <span className={`nav-player-label${playing ? ' nav-player-label--scroll' : ''}`}>
          {label}
        </span>
      </div>

      <button
        className="nav-player-btn"
        onClick={togglePlay}
        aria-label={playing ? 'Pause' : 'Play'}
      >
        {playing ? (
          <svg width="9" height="11" viewBox="0 0 9 11" fill="currentColor">
            <rect x="0"   y="0" width="3" height="11" rx="1" />
            <rect x="6" y="0" width="3" height="11" rx="1" />
          </svg>
        ) : (
          <svg width="10" height="11" viewBox="0 0 10 11" fill="currentColor">
            <path d="M0 0.5L10 5.5L0 10.5V0.5Z" />
          </svg>
        )}
      </button>
    </div>
  )
}
