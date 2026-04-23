import { useState, useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

// ─── TRACKS ──────────────────────────────────────────────────────────────────
const TRACKS = [
  { src: '/audio/Jungle - Julia.mp3',                            artist: 'Jungle',          title: 'Julia' },
  { src: '/audio/Rhye - Open.mp3',                               artist: 'Rhye',            title: 'Open' },
  { src: '/audio/Parcels - Yougotmefeeling (Lyric Video).mp3',   artist: 'Parcels',         title: 'Yougotmefeeling' },
  { src: '/audio/Lana Del Rey - Blue Jeans.mp3',                 artist: 'Lana Del Rey',    title: 'Blue Jeans' },
  { src: "/audio/L'Impératrice  AGITATIONS TROPICALES.mp3",      artist: "L'Impératrice",   title: 'Agitations Tropicales' },
  { src: '/audio/Muse - Uprising  Lyrics.mp3',                   artist: 'Muse',            title: 'Uprising' },
  { src: '/audio/Roosevelt - Ordinary Love (Official Audio).mp3', artist: 'Roosevelt',      title: 'Ordinary Love' },
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
    answer: `I create the most value when I'm helping teams define what should exist in the first place.\n\nFraming problems, shaping direction, thinking through systems, and bringing the user's perspective into product decisions earlier on. That's where I've consistently had the most impact.\n\nWhere I'm less differentiated is purely production-focused design work. Things like turning around decks, marketing assets, or visual polish on tight timelines. I can do that work, but it's not where I'm strongest or where I spend most of my time.\n\nAI is making that distinction even clearer. As more execution work becomes faster to generate, the role shifts toward judgment, prioritization, and strategy. Product designers and product managers are already starting to overlap more in that space.\n\nThat's the direction I'm leaning into, and where I've found I'm most effective.`,
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
const IconNote = () => (
  <svg width="13" height="14" viewBox="0 0 13 14" fill="none">
    <rect x="1" y="1" width="11" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.15"/>
    <path d="M3.5 5h6M3.5 7.5h6M3.5 10h3.5" stroke="currentColor" strokeWidth="1.15" strokeLinecap="round"/>
  </svg>
)
const IconChat = () => (
  <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
    <circle cx="7" cy="5" r="2.3" stroke="currentColor" strokeWidth="1.15"/>
    <path d="M2 13c0-2.76 2.24-4.5 5-4.5s5 1.74 5 4.5" stroke="currentColor" strokeWidth="1.15" strokeLinecap="round"/>
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
  const [playing,   setPlaying]   = useState(false)
  const [trackIdx,  setTrackIdx]  = useState(0)
  const [progress,  setProgress]  = useState(0)
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
  const [notesOpen, setNotesOpen] = useState(false)
  const [notes,     setNotes]     = useState(() => {
    try { return localStorage.getItem('sivan-portfolio-notes') || '' } catch { return '' }
  })
  const [emailStep, setEmailStep] = useState(false)
  const [email,     setEmail]     = useState('')
  const [sent,      setSent]      = useState(false)
  const textareaRef = useRef(null)

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

  // ── Interview / Chat state ────────────────────────────────────────────────
  const [chatOpen,     setChatOpen]     = useState(false)
  const [messages,     setMessages]     = useState([])
  const [askedIds,     setAskedIds]     = useState(new Set())
  const [typing,       setTyping]       = useState(false)
  const [formStatus,   setFormStatus]   = useState('idle')
  const [ownQuestion,  setOwnQuestion]  = useState('')
  const [ownEmail,     setOwnEmail]     = useState('')
  const chatBottomRef = useRef(null)

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
    if (messages.length > 0 || typing) {
      setTimeout(() => chatBottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' }), 60)
    }
  }, [messages, typing])

  // Mutual exclusivity — opening one closes the other
  const openChat = () => {
    setNotesOpen(false)
    setEmailStep(false)
    setChatOpen(o => !o)
  }
  const openNotes = () => {
    setChatOpen(false)
    setNotesOpen(o => !o)
    setEmailStep(false)
  }

  const track = TRACKS[trackIdx]

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
        @keyframes panelUp {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes msgIn {
          from { opacity: 0; transform: translateY(5px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .chat-prompt-btn:hover { background: rgba(255,255,255,0.06) !important; }
        .toolbar-action-btn:hover { background: rgba(255,255,255,0.07) !important; }
      `}</style>

      {/* ── NOTES PANEL ──────────────────────────────────────────────────── */}
      <div style={{
        position: 'fixed',
        bottom: notesOpen ? 57 : -300,
        right: 24,
        width: 320,
        background: 'rgba(12,12,12,0.97)',
        border: '1px solid rgba(255,255,255,0.09)',
        borderBottom: 'none',
        borderRadius: '10px 10px 0 0',
        padding: '14px 16px 12px',
        zIndex: 1200,
        boxShadow: '0 -8px 48px rgba(0,0,0,0.55)',
        fontFamily: 'var(--sans)',
        transition: 'bottom 0.32s cubic-bezier(0.16,1,0.3,1)',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
          <span style={{ fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.28)' }}>Notes</span>
          <button onClick={() => { setNotesOpen(false); setEmailStep(false) }} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.3)', cursor: 'pointer', padding: 2, display: 'flex' }}>
            <IconClose />
          </button>
        </div>
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
        <div style={{ marginTop: 10 }}>
          {sent ? (
            <p style={{ fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.13em', color: 'rgba(255,255,255,0.38)', textAlign: 'center', padding: '8px 0' }}>Opening your email client…</p>
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
              <button onClick={sendEmail} style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 5, color: 'rgba(255,255,255,0.6)', cursor: 'pointer', padding: '7px 11px', display: 'flex', alignItems: 'center' }}>
                <IconSend />
              </button>
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

      {/* ── CHAT PANEL ───────────────────────────────────────────────────── */}
      {chatOpen && (
        <div
          onWheel={e => e.stopPropagation()}
          onTouchMove={e => e.stopPropagation()}
          style={{
            position: 'fixed',
            bottom: 64,
            right: 24,
            width: 'clamp(300px, 90vw, 380px)',
            maxHeight: 'min(520px, calc(100vh - 140px))',
            background: 'rgba(10,10,10,0.98)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 14,
            boxShadow: '0 -8px 48px rgba(0,0,0,0.6), 0 24px 64px rgba(0,0,0,0.5)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            zIndex: 1200,
            animation: 'panelUp 0.22s cubic-bezier(0.16,1,0.3,1)',
          }}
        >
          {/* Chat header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '13px 16px', borderBottom: '1px solid rgba(255,255,255,0.07)', flexShrink: 0 }}>
            <img src={PROFILE_IMG} alt="Sivan Baum" style={{ width: 30, height: 30, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 13, fontWeight: 500, color: 'rgba(255,255,255,0.85)', margin: 0, letterSpacing: '-0.01em' }}>Sivan Baum</p>
              <p style={{ fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', margin: 0 }}>Interview me</p>
            </div>
            <button onClick={() => setChatOpen(false)} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.3)', cursor: 'pointer', padding: 4, display: 'flex', borderRadius: 4 }}>
              <IconClose />
            </button>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: 'auto', overscrollBehavior: 'contain', padding: '14px 16px 8px', display: 'flex', flexDirection: 'column', gap: 4, scrollbarWidth: 'none' }}>
            {messages.length === 0 && (
              <div style={{ display: 'flex', gap: 10, alignItems: 'flex-end', animation: 'msgIn 0.2s ease', paddingBottom: 6 }}>
                <img src={PROFILE_IMG} alt="" style={{ width: 26, height: 26, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />
                <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px 12px 12px 3px', padding: '9px 13px', maxWidth: '82%' }}>
                  <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', lineHeight: 1.55, margin: 0 }}>Hi. Select a question below and I'll answer it.</p>
                </div>
              </div>
            )}
            {messages.map((msg) =>
              msg.type === 'question' ? (
                <div key={`q-${msg.id}`} style={{ display: 'flex', justifyContent: 'flex-end', animation: 'msgIn 0.18s ease', padding: '3px 0' }}>
                  <div style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px 12px 3px 12px', padding: '9px 13px', maxWidth: '82%' }}>
                    <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.75)', lineHeight: 1.5, margin: 0 }}>{msg.text}</p>
                  </div>
                </div>
              ) : (
                <div key={`a-${msg.id}`} style={{ display: 'flex', gap: 10, alignItems: 'flex-end', animation: 'msgIn 0.2s ease', padding: '3px 0' }}>
                  <img src={PROFILE_IMG} alt="" style={{ width: 26, height: 26, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />
                  <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px 12px 12px 3px', padding: '10px 13px', maxWidth: '82%' }}>
                    {msg.text.split('\n\n').map((para, i) => (
                      <p key={i} style={{ fontSize: 12, color: 'rgba(255,255,255,0.65)', lineHeight: 1.65, margin: 0, marginTop: i > 0 ? 10 : 0 }}>{para}</p>
                    ))}
                  </div>
                </div>
              )
            )}
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
                    <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)', lineHeight: 1.4 }}>{item.question}</span>
                    <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: 11, flexShrink: 0 }}>↗</span>
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
                      color: 'rgba(255,255,255,0.7)', fontSize: 12, lineHeight: 1.55,
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
                        color: 'rgba(255,255,255,0.7)', fontSize: 12,
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

        {/* ── LEFT: Music player ───────────────────────────────────── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, flex: 1, minWidth: 0 }}>
          <img src="/images/toolbar/spotify_logo.png" alt="Spotify" style={{ height: 18, width: 18, objectFit: 'contain', opacity: 0.7, flexShrink: 0 }} />

          <div style={{ display: 'flex', alignItems: 'center', gap: 2, flexShrink: 0 }}>
            <TBtn onClick={() => goToTrack((trackIdx - 1 + TRACKS.length) % TRACKS.length)} label="Previous"><IconPrev /></TBtn>
            <TBtn onClick={togglePlay} label={playing ? 'Pause' : 'Play'} accent>{playing ? <IconPause /> : <IconPlay />}</TBtn>
            <TBtn onClick={() => goToTrack((trackIdx + 1) % TRACKS.length)} label="Next"><IconNext /></TBtn>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, minWidth: 0, flex: 1, maxWidth: 320 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 0 }}>
              <span style={{ fontFamily: 'var(--mono)', fontSize: 8, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', whiteSpace: 'nowrap', flexShrink: 0, opacity: playing ? 1 : 0, transition: 'opacity 0.4s' }}>Now Playing</span>
              {playing && (
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: 2, height: 12, flexShrink: 0 }}>
                  {['eqBar 0.9s ease-in-out infinite', 'eqBar 0.9s ease-in-out 0.3s infinite', 'eqBar 0.9s ease-in-out 0.6s infinite'].map((anim, i) => (
                    <div key={i} style={{ width: 2, borderRadius: 1, background: 'rgba(255,255,255,0.5)', animation: anim, height: 8 }} />
                  ))}
                </div>
              )}
              <span style={{ fontFamily: 'var(--sans)', fontSize: 12, fontWeight: 500, letterSpacing: '-0.01em', color: playing ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.4)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', transition: 'color 0.4s' }}>
                {track.artist} <span style={{ fontWeight: 400, color: playing ? 'rgba(255,255,255,0.45)' : 'rgba(255,255,255,0.25)' }}>— {track.title}</span>
              </span>
            </div>
            <div ref={progressRef} onClick={seekTo} style={{ height: 2, background: 'rgba(255,255,255,0.09)', borderRadius: 1, cursor: 'pointer', position: 'relative' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, height: '100%', width: `${progress * 100}%`, background: playing ? 'rgba(255,255,255,0.65)' : 'rgba(255,255,255,0.25)', borderRadius: 1, transition: 'background 0.4s' }} />
            </div>
          </div>
        </div>

        {/* Divider */}
        <div style={{ width: 1, height: 22, background: 'rgba(255,255,255,0.12)', marginLeft: 20, flexShrink: 0 }} />

        {/* ── RIGHT: Interview Me + Notes ──────────────────────── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginLeft: 16, flexShrink: 0 }}>

          {/* Interview Me button */}
          <ActionButton
            active={chatOpen}
            onClick={openChat}
            label={chatOpen ? 'Close interview' : 'Interview me'}
            dot={messages.length > 0}
          >
            <IconChat />
            <span style={{ fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>Interview Me</span>
          </ActionButton>

          {/* Divider */}
          <div style={{ width: 1, height: 16, background: 'rgba(255,255,255,0.1)', flexShrink: 0 }} />

          {/* Take Notes button */}
          <ActionButton
            active={notesOpen}
            onClick={openNotes}
            label={notesOpen ? 'Close notes' : 'Open notes'}
            dot={notes.trim().length > 0}
          >
            <IconNote />
            <span style={{ fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>Take Notes</span>
          </ActionButton>

        </div>
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

// ── ACTION BUTTON (Interview Me / Take Notes) ─────────────────────────────────
function ActionButton({ onClick, label, active, dot, children }) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className="toolbar-action-btn"
      style={{
        display: 'flex', alignItems: 'center', gap: 7,
        background: active ? 'rgba(255,255,255,0.07)' : 'none',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: 6, padding: '6px 11px',
        cursor: 'pointer',
        color: active ? 'rgba(255,255,255,0.75)' : 'rgba(255,255,255,0.38)',
        transition: 'background 0.2s, color 0.2s',
        flexShrink: 0,
      }}
    >
      {children}
      {dot && (
        <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'rgba(255,255,255,0.45)', flexShrink: 0 }} />
      )}
    </button>
  )
}
