import { useState, useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

// ─── TRACKS ──────────────────────────────────────────────────────────────────
const TRACKS = [
  { src: '/audio/Jungle - Julia.mp3',                             artist: 'Jungle',         title: 'Julia',                art: '/images/toolbar/Jungle_julia.jpg' },
  { src: '/audio/Rhye - Open.mp3',                                artist: 'Rhye',           title: 'Open',                 art: '/images/toolbar/rhye_open.jpg' },
  { src: '/audio/Parcels - Yougotmefeeling (Lyric Video).mp3',    artist: 'Parcels',        title: 'Yougotmefeeling',      art: '/images/toolbar/parcels_yougotmefeeling.jpg' },
  { src: '/audio/Lana Del Rey - Blue Jeans.mp3',                  artist: 'Lana Del Rey',   title: 'Blue Jeans',           art: '/images/toolbar/lana_del_rey_blue_jeans.webp' },
  { src: "/audio/L'Impératrice  AGITATIONS TROPICALES.mp3",       artist: "L'Impératrice",  title: 'Agitations Tropicales', art: '/images/toolbar/limperatrice_tropicales.jpg' },
  { src: '/audio/Muse - Uprising  Lyrics.mp3',                    artist: 'Muse',           title: 'Uprising',             art: '/images/toolbar/muse_uprising.jpg' },
  { src: '/audio/Roosevelt - Ordinary Love (Official Audio).mp3', artist: 'Roosevelt',      title: 'Ordinary Love',        art: '/images/toolbar/roosevelt_ordinarylove.jpg' },
]

// ─── INTERVIEW DATA ───────────────────────────────────────────────────────────
const PROFILE_IMG = '/images/resume/profile.png'

const INTERVIEW_DATA = [
  {
    id: 'ai-role',
    question: 'How do you think AI is changing the role of designers?',
    answer: `I think AI is accelerating a shift that was already happening.\n\nA lot of the execution work that designers traditionally owned is becoming faster and more accessible. That doesn't make design less important, but it does change where the value is.\n\nThe work I've found myself doing, and where I've been most effective, is less about producing screens and more about defining the problem, shaping the direction, and making decisions about how a product should behave.\n\nBecause of that, I think the line between UX and product is going to continue to blur. Designers who can think in systems, understand tradeoffs, and help define strategy are going to have more impact than those focused purely on output.\n\nThat's also the direction I want to keep growing in. A lot of my work has already been in that space, working through ambiguity and helping teams make decisions. Moving further into product strategy feels like a natural extension of that, not a shift away from design.`,
  },
  {
    id: 'ambiguous',
    question: 'How do you approach ambiguous problems?',
    answer: `Most of the work I do starts before there's a clear problem definition.\n\nI'm usually walking into situations where there are a lot of opinions, partial ideas, and pressure to move quickly, but no shared understanding of what actually needs to be solved.\n\nThe first thing I try to do is create clarity. That means talking to people across the system, looking at where things are breaking down, and identifying what's actually causing friction.\n\nFrom there, I'm not trying to jump straight to solutions. I'm trying to define the shape of the problem well enough that the team can make good decisions. Once that's clear, the design work becomes much more focused.`,
  },
  {
    id: 'balance',
    question: 'How do you balance user needs with business goals?',
    answer: `I don't think of those as opposing forces.\n\nIf there's tension, it usually means something hasn't been defined correctly yet.\n\nThe way I approach it is by making tradeoffs visible. What does the business actually need? What does the user actually care about? Where are we forcing one at the expense of the other?\n\nIn a lot of cases, the solution isn't choosing one side. It's reframing the problem so both can be addressed more directly.`,
  },
  {
    id: 'difficult-decision',
    question: 'Tell me about a difficult product decision',
    answer: `On the Contextual Layers project, the hardest part wasn't what content to show, it was how to introduce it without breaking reading.\n\nWe explored a number of directions that worked in isolation, like overlays or panels, but each of them introduced friction or pulled the reader out of context.\n\nThe decision we ended up making was to treat this as a system problem instead of a UI problem. That's what led to the layered model with inline markers, a toggle, and a bottom sheet.`,
  },
  {
    id: 'done',
    question: 'How do you know when a design is done?',
    answer: `I don't really think of design as something that's ever fully done.\n\nIf people are using it, it's still evolving.\n\nWhat I look for is whether the product is doing what we intended it to do. Are people actually using it? Are we seeing shifts in behavior? Is it solving the problem we set out to solve?\n\nThat's where experimentation comes in. Once something is out in the world, it becomes less about finishing and more about learning. You start to see where people engage, where they drop off, and what needs to change.\n\nSo instead of thinking about done, I think about whether we've reached a point where we can learn from it. From there, it's just iteration.`,
  },
  {
    id: 'enjoy',
    question: 'What kind of problems do you enjoy working on?',
    answer: `I'm drawn to problems where the path isn't obvious.\n\nEspecially ones that sit across multiple parts of a system, where solving them requires more than just designing a single interface.`,
  },
  {
    id: 'ai-usage',
    question: 'How are you actually using AI in your design work?',
    answer: `I'm using AI across both design and build workflows, depending on what stage the work is in.\n\nThis portfolio itself was built using a mix of Google Stitch, Figma Make, Claude Code, and ChatGPT for narrative framing. I've been using these tools to move from idea to something tangible much faster than traditional workflows usually allow.\n\nWhat's been most valuable isn't just speed for the sake of speed. It's that these tools free up more time to focus on the things that actually matter: influencing product strategy, shaping direction earlier, and bringing the user's perspective further upstream into decision-making.\n\nI still think the quality of the thinking matters more than the output. AI just makes it easier to test, reject, refine, and move faster without getting stuck in production.`,
  },
  {
    id: 'why-not',
    question: "Where do you create the most value and where don't you?",
    answer: `I create the most value when I'm helping teams define what should exist in the first place.\n\nThat includes framing problems, shaping direction, thinking through systems, and bringing the user's perspective into product decisions earlier on. That's where I've consistently had the most impact.\n\nI also spend a meaningful amount of time in execution. Designing flows, refining interactions, and making sure ideas hold up in real product experiences. That work is critical, and I see it as closely connected to strategy, not separate from it.\n\nWhere I tend to differentiate most is in connecting those two. Using execution to inform direction, and using direction to guide what gets built.\n\nAI is starting to shift that balance even further. As production work becomes faster to generate, more of the value moves toward judgment, prioritization, and product thinking. Product designers and product managers are already starting to overlap more in that space.\n\nThat's where I've been leaning, and where I've found I can contribute the most.`,
  },
]

const DEFAULT_INITIAL_IDS = ['why-not', 'ai-usage', 'ai-role', 'ambiguous']
const ROUTE_INITIAL_IDS = {
  '/projects/rokt':              ['ai-usage', 'difficult-decision', 'balance', 'ai-role'],
  '/projects/contextual-layers': ['difficult-decision', 'ambiguous', 'enjoy', 'ai-role'],
  '/projects/bookpins':          ['difficult-decision', 'ambiguous', 'balance', 'done'],
  '/projects/swiftshift':        ['balance', 'done', 'enjoy', 'ambiguous'],
  '/about':                      ['why-not', 'ai-usage', 'ai-role', 'balance'],
}
const TYPING_DELAY = 1100

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
const IconClose = () => (
  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
    <path d="M1 1l8 8M9 1L1 9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
  </svg>
)

// ─── TYPING DOTS ─────────────────────────────────────────────────────────────
function TypingDots() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '4px 0' }}>
      <img src={PROFILE_IMG} alt="" style={{ width: 26, height: 26, borderRadius: '50%', objectFit: 'cover', flexShrink: 0, opacity: 0.9 }} />
      <div style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '9px 13px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px 12px 12px 3px' }}>
        {[0, 1, 2].map(i => (
          <span key={i} style={{
            width: 5, height: 5, borderRadius: '50%',
            background: 'rgba(255,255,255,0.35)',
            display: 'inline-block',
            animation: `typingDot 1.2s ease-in-out ${i * 0.2}s infinite`,
          }} />
        ))}
      </div>
    </div>
  )
}

// ─── COMPONENT ───────────────────────────────────────────────────────────────
export default function PortfolioToolbar() {
  const { pathname } = useLocation()

  // ── Music state ───────────────────────────────────────────────────────────
  const [playing,     setPlaying]     = useState(false)
  const [trackIdx,    setTrackIdx]    = useState(0)
  const [progress,    setProgress]    = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration,    setDuration]    = useState(0)
  const audioRef    = useRef(null)
  const progressRef = useRef(null)

  useEffect(() => {
    const audio = new Audio(TRACKS[0].src)
    audio.volume = 0.4
    audioRef.current = audio

    const onTime = () => {
      if (audio.duration) {
        setProgress(audio.currentTime / audio.duration)
        setCurrentTime(audio.currentTime)
        setDuration(audio.duration)
      }
    }
    const onLoaded = () => setDuration(audio.duration)
    audio.addEventListener('loadedmetadata', onLoaded)

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
      audio.removeEventListener('loadedmetadata', onLoaded)
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
    setCurrentTime(0)
    setDuration(0)
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

  // ── Interview / Chat state ────────────────────────────────────────────────
  const [chatOpen,    setChatOpen]    = useState(false)
  const [messages,    setMessages]    = useState([])
  const [askedIds,    setAskedIds]    = useState(new Set())
  const [typing,      setTyping]      = useState(false)
  const [formStatus,  setFormStatus]  = useState('idle')
  const [ownQuestion, setOwnQuestion] = useState('')
  const [ownEmail,    setOwnEmail]    = useState('')
  const chatBottomRef  = useRef(null)
  const lastAnswerRef  = useRef(null)

  const initialIds = ROUTE_INITIAL_IDS[pathname] || DEFAULT_INITIAL_IDS
  const currentPrompts = [
    ...INTERVIEW_DATA.filter(i =>  initialIds.includes(i.id) && !askedIds.has(i.id))
                     .sort((a, b) => initialIds.indexOf(a.id) - initialIds.indexOf(b.id)),
    ...INTERVIEW_DATA.filter(i => !initialIds.includes(i.id) && !askedIds.has(i.id)),
  ].slice(0, 4)

  const handleSelect = (item) => {
    if (askedIds.has(item.id)) return
    setMessages(prev => [...prev, { type: 'question', text: item.question, id: item.id }])
    setAskedIds(prev => new Set([...prev, item.id]))
    setTyping(true)
    setTimeout(() => {
      setTyping(false)
      setMessages(prev => [...prev, { type: 'answer', text: item.answer, id: item.id }])
    }, TYPING_DELAY)
  }

  const handleReset = () => {
    setMessages([])
    setAskedIds(new Set())
    setTyping(false)
    setFormStatus('idle')
    setOwnQuestion('')
    setOwnEmail('')
  }

  const handleContactSubmit = async (e) => {
    e.preventDefault()
    if (!ownQuestion.trim() || !ownEmail.trim()) return
    setFormStatus('sending')
    try {
      const res = await fetch('https://formspree.io/f/xvzvygyg', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ email: ownEmail, message: ownQuestion }),
      })
      setFormStatus(res.ok ? 'sent' : 'error')
    } catch {
      setFormStatus('error')
    }
  }

  useEffect(() => {
    if (typing) {
      // Show typing indicator — scroll to bottom
      setTimeout(() => chatBottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' }), 60)
    } else if (messages.length > 0) {
      const last = messages[messages.length - 1]
      if (last.type === 'answer') {
        // Scroll to the TOP of the answer so user sees it from the start
        setTimeout(() => lastAnswerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 60)
      } else {
        // Question added — scroll to bottom
        setTimeout(() => chatBottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' }), 60)
      }
    }
  }, [messages, typing])

  const track = TRACKS[trackIdx]

  const formatTime = (s) => {
    if (!s || isNaN(s)) return '0:00'
    const m = Math.floor(s / 60)
    const sec = Math.floor(s % 60)
    return `${m}:${sec.toString().padStart(2, '0')}`
  }

  // Slide deck: hide everything
  if (pathname === '/projects/bookpins/slides') return null

  // Non-home pages: show only a minimal floating play/pause button
  if (pathname !== '/') {
    return (
      <>
        <style>{`
          @keyframes miniRing {
            0%   { transform: scale(1);   opacity: 0.6; }
            70%  { transform: scale(1.5); opacity: 0; }
            100% { transform: scale(1.5); opacity: 0; }
          }
          .mini-player-btn { position: relative; }
          .mini-player-btn:hover .mini-overlay { opacity: 1 !important; }
        `}</style>
        <div style={{ position: 'fixed', bottom: 20, right: 20, zIndex: 900 }}>
          {/* Playing ring */}
          {playing && (
            <div style={{
              position: 'absolute', inset: -4, borderRadius: '50%',
              border: '1.5px solid rgba(255,255,255,0.35)',
              pointerEvents: 'none',
              animation: 'miniRing 2.4s ease-out infinite',
            }} />
          )}
          <button
            className="mini-player-btn"
            onClick={togglePlay}
            title={playing ? `Pause · ${track.title}` : `Play · ${track.title}`}
            style={{
              width: 40, height: 40, borderRadius: '50%',
              border: playing ? '2px solid rgba(255,255,255,0.25)' : '2px solid rgba(255,255,255,0.1)',
              padding: 0, cursor: 'pointer', overflow: 'hidden',
              boxShadow: playing ? '0 4px 20px rgba(0,0,0,0.6)' : '0 2px 12px rgba(0,0,0,0.4)',
              transition: 'border-color 0.2s, box-shadow 0.2s',
              position: 'relative',
              background: 'none',
            }}
          >
            <img
              key={track.art}
              src={track.art}
              alt={track.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', borderRadius: '50%' }}
            />
            {/* Hover overlay */}
            <div className="mini-overlay" style={{
              position: 'absolute', inset: 0, borderRadius: '50%',
              background: 'rgba(0,0,0,0.55)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              opacity: 0, transition: 'opacity 0.15s',
            }}>
              {playing ? (
                <svg width="12" height="12" viewBox="0 0 12 12" fill="white">
                  <rect x="2" y="1" width="3" height="10" rx="1"/>
                  <rect x="7" y="1" width="3" height="10" rx="1"/>
                </svg>
              ) : (
                <svg width="12" height="12" viewBox="0 0 12 12" fill="white">
                  <path d="M3 1.5l7 4.5-7 4.5z"/>
                </svg>
              )}
            </div>
          </button>
        </div>
      </>
    )
  }

  return (
    <>
      <style>{`
        @keyframes eqBar {
          0%, 100% { height: 3px; }
          50%       { height: 11px; }
        }
        @keyframes typingDot {
          0%, 60%, 100% { opacity: 0.25; transform: translateY(0); }
          30%            { opacity: 1;    transform: translateY(-3px); }
        }
        @keyframes chatUp {
          from { opacity: 0; transform: translateY(12px) scale(0.98); }
          to   { opacity: 1; transform: translateY(0)    scale(1); }
        }
        @keyframes msgIn {
          from { opacity: 0; transform: translateY(5px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulseRing {
          0%   { transform: scale(1);    opacity: 0.6; }
          70%  { transform: scale(1.7);  opacity: 0; }
          100% { transform: scale(1.7);  opacity: 0; }
        }
        @keyframes imEntrance {
          from { opacity: 0; transform: translateY(16px) scale(0.95); }
          to   { opacity: 1; transform: translateY(0)    scale(1); }
        }
        @keyframes sparkle {
          0%, 100% { transform: scale(1) rotate(0deg);   opacity: 1; }
          50%       { transform: scale(1.2) rotate(15deg); opacity: 0.8; }
        }
        .chat-prompt-btn:hover { background: rgba(99,102,241,0.08) !important; border-color: rgba(99,102,241,0.25) !important; }
        .im-fab:hover { box-shadow: 0 0 0 4px rgba(99,102,241,0.15), 0 16px 48px rgba(99,102,241,0.25) !important; }
      `}</style>

      {/* ── CHAT PANEL ───────────────────────────────────────────────────── */}
      {chatOpen && (
        <div
          onWheel={e => e.stopPropagation()}
          onTouchMove={e => e.stopPropagation()}
          style={{
            position: 'fixed',
            bottom: 168,
            right: 20,
            width: 'clamp(300px, 90vw, 380px)',
            maxHeight: 'min(520px, calc(100vh - 180px))',
            background: 'rgba(10,10,10,0.98)',
            border: '1px solid rgba(99,102,241,0.2)',
            borderRadius: 16,
            boxShadow: '0 24px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(99,102,241,0.08), 0 0 40px rgba(99,102,241,0.08)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            zIndex: 1100,
            animation: 'chatUp 0.25s cubic-bezier(0.16,1,0.3,1)',
          }}
        >
          {/* Gradient bar at top */}
          <div style={{ height: 3, background: 'linear-gradient(90deg, #6366f1, #8b5cf6, #a78bfa)', flexShrink: 0 }} />

          {/* Chat header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', borderBottom: '1px solid rgba(255,255,255,0.06)', flexShrink: 0, background: 'rgba(99,102,241,0.04)' }}>
            {/* Avatar + AI badge */}
            <div style={{ position: 'relative', flexShrink: 0 }}>
              <img src={PROFILE_IMG} alt="Sivan Baum" style={{ width: 36, height: 36, borderRadius: '50%', objectFit: 'cover', display: 'block', border: '2px solid rgba(99,102,241,0.4)' }} />
              <div style={{
                position: 'absolute', bottom: -2, right: -2,
                width: 16, height: 16, borderRadius: '50%',
                background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                border: '1.5px solid #0a0a0a',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <svg width="8" height="8" viewBox="0 0 16 16" fill="white">
                  <path d="M8 1l1.8 3.6L14 6l-3 2.9.7 4.1L8 11l-3.7 2 .7-4.1L2 6l4.2-.4z"/>
                </svg>
              </div>
            </div>

            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                <p style={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.92)', margin: 0, letterSpacing: '-0.01em' }}>Sivan Baum</p>
                <span style={{
                  fontFamily: 'var(--mono)', fontSize: 8, letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  background: 'linear-gradient(90deg, #6366f1, #8b5cf6)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                  padding: '2px 0',
                }}>AI</span>
              </div>
              <p style={{ fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.28)', margin: 0 }}>Sr. Product Designer · AI · Amazon Kindle</p>
            </div>
            <button onClick={() => setChatOpen(false)} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.25)', cursor: 'pointer', padding: 4, display: 'flex', borderRadius: 4 }}>
              <IconClose />
            </button>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: 'auto', overscrollBehavior: 'contain', padding: '14px 16px 8px', display: 'flex', flexDirection: 'column', gap: 4, scrollbarWidth: 'none' }}>
            {messages.length === 0 && (
              <div style={{ display: 'flex', gap: 10, alignItems: 'flex-end', animation: 'msgIn 0.2s ease', paddingBottom: 6 }}>
                <img src={PROFILE_IMG} alt="" style={{ width: 26, height: 26, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />
                <div style={{ background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)', borderRadius: '12px 12px 12px 3px', padding: '10px 14px', maxWidth: '82%' }}>
                  <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.78)', lineHeight: 1.6, margin: 0 }}>Hi, I'm Sivan. Select a question and I'll answer it — or ask me anything about my work.</p>
                </div>
              </div>
            )}

            {messages.map((msg, idx) => {
              const isLastMsg = idx === messages.length - 1
              return msg.type === 'question' ? (
                <div key={`q-${msg.id}`} style={{ display: 'flex', justifyContent: 'flex-end', animation: 'msgIn 0.18s ease', padding: '3px 0' }}>
                  <div style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px 12px 3px 12px', padding: '10px 14px', maxWidth: '82%' }}>
                    <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.75)', lineHeight: 1.55, margin: 0 }}>{msg.text}</p>
                  </div>
                </div>
              ) : (
                <div key={`a-${msg.id}`} ref={isLastMsg ? lastAnswerRef : null} style={{ display: 'flex', gap: 10, alignItems: 'flex-end', animation: 'msgIn 0.2s ease', padding: '3px 0' }}>
                  <img src={PROFILE_IMG} alt="" style={{ width: 26, height: 26, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />
                  <div style={{ background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.18)', borderRadius: '12px 12px 12px 3px', padding: '10px 14px', maxWidth: '82%' }}>
                    {msg.text.split('\n\n').map((para, i) => (
                      <p key={i} style={{ fontSize: 15, color: 'rgba(255,255,255,0.72)', lineHeight: 1.7, margin: 0, marginTop: i > 0 ? 10 : 0 }}>{para}</p>
                    ))}
                  </div>
                </div>
              )
            })}

            {typing && <TypingDots />}
            <div ref={chatBottomRef} style={{ height: 1 }} />
          </div>

          {/* Prompts */}
          {!typing && currentPrompts.length > 0 && (
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', padding: '10px 12px', flexShrink: 0 }}>
              <p style={{ fontFamily: 'var(--mono)', fontSize: 8, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.22)', margin: '0 0 7px 4px' }}>
                {messages.length === 0 ? 'Select a question' : 'Continue'}
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {currentPrompts.map(item => (
                  <button
                    key={item.id}
                    className="chat-prompt-btn"
                    onClick={() => handleSelect(item)}
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8,
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.07)',
                      borderRadius: 8, padding: '9px 12px',
                      cursor: 'pointer', textAlign: 'left',
                      transition: 'background 0.15s', width: '100%',
                    }}
                  >
                    <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', lineHeight: 1.4 }}>{item.question}</span>
                    <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: 14, flexShrink: 0 }}>↗</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Own question form */}
          {!typing && currentPrompts.length === 0 && messages.length > 0 && (
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', padding: '13px 16px', flexShrink: 0 }}>
              {formStatus === 'sent' ? (
                <div style={{ textAlign: 'center', padding: '6px 0' }}>
                  <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', margin: '0 0 4px' }}>Got it.</p>
                  <p style={{ fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.13em', color: 'rgba(255,255,255,0.28)', margin: 0 }}>Your question is in my inbox.</p>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit}>
                  <p style={{ fontFamily: 'var(--mono)', fontSize: 8, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.22)', margin: '0 0 8px' }}>Have your own question?</p>
                  <textarea
                    value={ownQuestion}
                    onChange={e => setOwnQuestion(e.target.value)}
                    placeholder="Ask me anything…"
                    rows={3}
                    required
                    style={{
                      width: '100%', boxSizing: 'border-box',
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      borderRadius: 8, padding: '9px 11px',
                      color: 'rgba(255,255,255,0.7)', fontSize: 14, lineHeight: 1.55,
                      fontFamily: 'var(--sans)', resize: 'none', outline: 'none',
                      marginBottom: 8,
                    }}
                  />
                  <div style={{ display: 'flex', gap: 7 }}>
                    <input
                      type="email"
                      value={ownEmail}
                      onChange={e => setOwnEmail(e.target.value)}
                      placeholder="Your email"
                      required
                      style={{
                        flex: 1, background: 'rgba(255,255,255,0.04)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        borderRadius: 6, padding: '8px 10px',
                        color: 'rgba(255,255,255,0.7)', fontSize: 14,
                        fontFamily: 'var(--sans)', outline: 'none',
                      }}
                    />
                    <button
                      type="submit"
                      disabled={formStatus === 'sending'}
                      style={{
                        background: 'rgba(255,255,255,0.07)',
                        border: '1px solid rgba(255,255,255,0.12)',
                        borderRadius: 6, padding: '8px 14px',
                        color: 'rgba(255,255,255,0.6)', fontSize: 12,
                        fontFamily: 'var(--sans)', cursor: 'pointer',
                      }}
                    >{formStatus === 'sending' ? '…' : 'Send →'}</button>
                  </div>
                  {formStatus === 'error' && (
                    <p style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'rgba(255,80,80,0.6)', margin: '8px 0 0' }}>Something went wrong. Try emailing me directly.</p>
                  )}
                  <button type="button" onClick={handleReset} style={{ fontFamily: 'var(--mono)', fontSize: 8, letterSpacing: '0.13em', textTransform: 'uppercase', background: 'none', border: 'none', color: 'rgba(255,255,255,0.2)', cursor: 'pointer', marginTop: 10, padding: 0 }}>Start over</button>
                </form>
              )}
            </div>
          )}
        </div>
      )}

      {/* ── FLOATING CHAT BUTTON ─────────────────────────────────────────── */}
      <div style={{
        position: 'fixed',
        bottom: 96,
        right: 20,
        zIndex: 1000,
        animation: 'imEntrance 0.4s 0.6s cubic-bezier(0.16,1,0.3,1) both',
      }}>
        {/* Subtle pulse ring */}
        {!chatOpen && (
          <div style={{
            position: 'absolute', inset: -4,
            borderRadius: '50%',
            background: 'transparent',
            border: '2px solid rgba(255,255,255,0.18)',
            pointerEvents: 'none',
            animation: 'pulseRing 3.2s ease-out 1.6s infinite',
          }} />
        )}

        <button
          className="im-fab"
          onClick={() => setChatOpen(o => !o)}
          aria-label={chatOpen ? 'Close chat' : 'Chat with Sivan'}
          style={{
            width: 52, height: 52,
            borderRadius: '50%',
            background: 'none',
            border: chatOpen
              ? '2px solid rgba(255,255,255,0.15)'
              : '2px solid rgba(255,255,255,0.12)',
            cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
            padding: 0,
            transition: 'border-color 0.2s, box-shadow 0.2s',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {chatOpen ? (
            <div style={{ width: '100%', height: '100%', borderRadius: '50%', background: 'rgba(20,20,20,0.98)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <IconClose />
            </div>
          ) : (
            <img
              src={PROFILE_IMG}
              alt="Sivan Baum"
              style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover', display: 'block' }}
            />
          )}
        </button>
      </div>

      {/* ── TOOLBAR — Spotify style ───────────────────────────────────────── */}
      <div style={{
        position: 'fixed', bottom: 0, left: 0, right: 0,
        height: 80,
        background: 'rgba(10,10,10,0.98)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        borderTop: '1px solid rgba(255,255,255,0.08)',
        boxShadow: '0 -8px 40px rgba(0,0,0,0.6)',
        display: 'grid',
        gridTemplateColumns: '1fr auto 1fr',
        alignItems: 'center',
        padding: '0 24px',
        gap: 16,
        zIndex: 999,
        fontFamily: 'var(--sans)',
      }}>

        {/* ── LEFT: album art + track info ─────────────────────────────── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, minWidth: 0 }}>
          {/* Album art */}
          <div style={{
            width: 48, height: 48, borderRadius: 4, flexShrink: 0,
            background: '#1a1a1a',
            border: '1px solid rgba(255,255,255,0.07)',
            overflow: 'hidden', position: 'relative',
          }}>
            <img
              key={track.art}
              src={track.art}
              alt={track.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
            {/* EQ overlay when playing */}
            {playing && (
              <div style={{
                position: 'absolute', inset: 0,
                background: 'rgba(0,0,0,0.45)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: 2, height: 18 }}>
                  {['eqBar 0.9s ease-in-out infinite', 'eqBar 0.9s ease-in-out 0.3s infinite', 'eqBar 0.9s ease-in-out 0.6s infinite'].map((anim, i) => (
                    <div key={i} style={{ width: 3, borderRadius: 2, background: 'rgba(255,255,255,0.85)', animation: anim, height: 12 }} />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Track name + artist */}
          <div style={{ minWidth: 0 }}>
            <p style={{
              fontSize: 13, fontWeight: 500, letterSpacing: '-0.01em',
              color: 'rgba(255,255,255,0.9)', margin: 0,
              whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
            }}>{track.title}</p>
            <p style={{
              fontSize: 11, color: 'rgba(255,255,255,0.45)', margin: 0, marginTop: 2,
              whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
            }}>{track.artist}</p>
          </div>
        </div>

        {/* ── CENTER: controls + progress ──────────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, width: 'clamp(280px, 40vw, 560px)' }}>
          {/* Transport controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <TBtn onClick={() => goToTrack((trackIdx - 1 + TRACKS.length) % TRACKS.length)} label="Previous"><IconPrev /></TBtn>
            <TBtn onClick={togglePlay} label={playing ? 'Pause' : 'Play'} accent>{playing ? <IconPause /> : <IconPlay />}</TBtn>
            <TBtn onClick={() => goToTrack((trackIdx + 1) % TRACKS.length)} label="Next"><IconNext /></TBtn>
          </div>

          {/* Progress bar + timestamps */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, width: '100%' }}>
            <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'rgba(255,255,255,0.35)', flexShrink: 0, letterSpacing: '0.04em' }}>
              {formatTime(currentTime)}
            </span>
            <div
              ref={progressRef}
              onClick={seekTo}
              style={{ flex: 1, height: 3, background: 'rgba(255,255,255,0.12)', borderRadius: 2, cursor: 'pointer', position: 'relative' }}
            >
              <div style={{
                position: 'absolute', top: 0, left: 0, height: '100%',
                width: `${progress * 100}%`,
                background: 'rgba(255,255,255,0.75)',
                borderRadius: 2,
              }} />
            </div>
            <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'rgba(255,255,255,0.35)', flexShrink: 0, letterSpacing: '0.04em' }}>
              {formatTime(duration)}
            </span>
          </div>
        </div>

        {/* ── RIGHT: empty (keeps center truly centered) ───────────────── */}
        <div />

      </div>
    </>
  )
}

// ── TOOLBAR PLAY BUTTON ───────────────────────────────────────────────────────
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
