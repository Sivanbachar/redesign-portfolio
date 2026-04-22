import { useState, useEffect, useRef } from 'react'

const PROFILE_IMG = '/images/resume/profile.png'

// ─── Q&A DATA (unchanged from InterviewMe) ───────────────────────────────────
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
    question: "Where do I create the most value and where don't I?",
    answer: `I create the most value when I'm helping teams define what should exist in the first place.\n\nFraming problems, shaping direction, thinking through systems, and bringing the user's perspective into product decisions earlier on. That's where I've consistently had the most impact.\n\nWhere I'm less differentiated is purely production-focused design work. Things like turning around decks, marketing assets, or visual polish on tight timelines. I can do that work, but it's not where I'm strongest or where I spend most of my time.\n\nAI is making that distinction even clearer. As more execution work becomes faster to generate, the role shifts toward judgment, prioritization, and strategy. Product designers and product managers are already starting to overlap more in that space.\n\nThat's the direction I'm leaning into, and where I've found I'm most effective.`,
  },
]

const INITIAL_IDS = ['why-not', 'ai-usage', 'ai-role', 'ambiguous']
const TYPING_DELAY = 1100

// ─── TYPING DOTS ─────────────────────────────────────────────────────────────
function TypingDots() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '8px 0 4px' }}>
      <img src={PROFILE_IMG} alt="" style={{ width: 28, height: 28, borderRadius: '50%', objectFit: 'cover', flexShrink: 0, opacity: 0.9 }} />
      <div style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '10px 14px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '14px 14px 14px 3px' }}>
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
export default function ChatAssistant() {
  const [open, setOpen]         = useState(false)
  const [messages, setMessages] = useState([])
  const [askedIds, setAskedIds] = useState(new Set())
  const [typing, setTyping]     = useState(false)
  const bottomRef = useRef(null)
  const panelRef  = useRef(null)

  const currentPrompts = askedIds.size === 0
    ? INTERVIEW_DATA.filter(item => INITIAL_IDS.includes(item.id))
    : INTERVIEW_DATA.filter(item => !askedIds.has(item.id)).slice(0, 4)

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
  }

  // Scroll to bottom on new messages
  useEffect(() => {
    if (messages.length > 0 || typing) {
      setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' }), 60)
    }
  }, [messages, typing])

  // Close on outside click
  useEffect(() => {
    if (!open) return
    const handler = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  // Reduced motion
  const prefersReduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const BOTTOM_OFFSET = 72  // clear the 56px toolbar

  return (
    <>
      {/* ── KEYFRAMES ──────────────────────────────────────────────────── */}
      <style>{`
        @keyframes typingDot {
          0%, 60%, 100% { opacity: 0.25; transform: translateY(0); }
          30%            { opacity: 1;    transform: translateY(-3px); }
        }
        @keyframes chatPanelIn {
          from { opacity: 0; transform: translateY(12px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0)   scale(1); }
        }
        @keyframes msgIn {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .chat-prompt-row:hover { background: rgba(255,255,255,0.06) !important; }
        .chat-launcher:hover .chat-launcher-pill { background: rgba(26,26,26,0.98) !important; }
      `}</style>

      <div ref={panelRef} style={{ position: 'fixed', bottom: BOTTOM_OFFSET, right: 20, zIndex: 1100, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 12 }}>

        {/* ── CHAT PANEL ───────────────────────────────────────────────── */}
        {open && (
          <div style={{
            width: 'clamp(300px, 90vw, 380px)',
            maxHeight: 'min(540px, calc(100vh - 160px))',
            background: 'rgba(10,10,10,0.98)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 16,
            boxShadow: '0 24px 64px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.04)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            animation: prefersReduced ? 'none' : 'chatPanelIn 0.22s cubic-bezier(0.16,1,0.3,1)',
          }}>

            {/* Header */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '14px 16px',
              borderBottom: '1px solid rgba(255,255,255,0.07)',
              flexShrink: 0,
            }}>
              <img src={PROFILE_IMG} alt="Sivan Baum" style={{ width: 32, height: 32, borderRadius: '50%', objectFit: 'cover' }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: 13, fontWeight: 500, color: 'rgba(255,255,255,0.85)', margin: 0, letterSpacing: '-0.01em' }}>Sivan Baum</p>
                <p style={{ fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', margin: 0 }}>Ask me anything</p>
              </div>
              <button onClick={() => setOpen(false)} aria-label="Close" style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.3)', cursor: 'pointer', padding: 4, display: 'flex', borderRadius: 4, lineHeight: 1 }}>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>
              </button>
            </div>

            {/* Messages */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '16px 16px 8px', display: 'flex', flexDirection: 'column', gap: 4, scrollbarWidth: 'none' }}>

              {/* Intro message */}
              {messages.length === 0 && (
                <div style={{ display: 'flex', gap: 10, alignItems: 'flex-end', animation: 'msgIn 0.2s ease', paddingBottom: 8 }}>
                  <img src={PROFILE_IMG} alt="" style={{ width: 28, height: 28, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />
                  <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '14px 14px 14px 3px', padding: '10px 14px', maxWidth: '82%' }}>
                    <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', lineHeight: 1.55, margin: 0 }}>Hi. Select a question below and I'll answer it.</p>
                  </div>
                </div>
              )}

              {/* Message thread */}
              {messages.map((msg) =>
                msg.type === 'question' ? (
                  <div key={`q-${msg.id}`} style={{ display: 'flex', justifyContent: 'flex-end', animation: 'msgIn 0.18s ease', padding: '4px 0' }}>
                    <div style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '14px 14px 3px 14px', padding: '9px 13px', maxWidth: '82%' }}>
                      <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.75)', lineHeight: 1.5, margin: 0 }}>{msg.text}</p>
                    </div>
                  </div>
                ) : (
                  <div key={`a-${msg.id}`} style={{ display: 'flex', gap: 10, alignItems: 'flex-end', animation: 'msgIn 0.2s ease', padding: '4px 0' }}>
                    <img src={PROFILE_IMG} alt="" style={{ width: 28, height: 28, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />
                    <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '14px 14px 14px 3px', padding: '10px 14px', maxWidth: '82%' }}>
                      {msg.text.split('\n\n').map((para, i) => (
                        <p key={i} style={{ fontSize: 12, color: 'rgba(255,255,255,0.65)', lineHeight: 1.65, margin: 0, marginTop: i > 0 ? 10 : 0 }}>{para}</p>
                      ))}
                    </div>
                  </div>
                )
              )}

              {/* Typing indicator */}
              {typing && <TypingDots />}

              <div ref={bottomRef} style={{ height: 1 }} />
            </div>

            {/* Prompts */}
            {!typing && currentPrompts.length > 0 && (
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', padding: '10px 12px', flexShrink: 0 }}>
                <p style={{ fontFamily: 'var(--mono)', fontSize: 8, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.22)', margin: '0 0 8px 4px' }}>
                  {messages.length === 0 ? 'Select a question' : 'Continue'}
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {currentPrompts.map(item => (
                    <button
                      key={item.id}
                      className="chat-prompt-row"
                      onClick={() => handleSelect(item)}
                      style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8,
                        background: 'rgba(255,255,255,0.03)',
                        border: '1px solid rgba(255,255,255,0.07)',
                        borderRadius: 8, padding: '9px 12px',
                        cursor: 'pointer', textAlign: 'left',
                        transition: 'background 0.15s',
                        width: '100%',
                      }}
                    >
                      <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)', lineHeight: 1.4 }}>{item.question}</span>
                      <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: 11, flexShrink: 0 }}>↗</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* All done */}
            {!typing && currentPrompts.length === 0 && messages.length > 0 && (
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', padding: '14px 16px', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <p style={{ fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.13em', color: 'rgba(255,255,255,0.25)', margin: 0 }}>You've asked everything.</p>
                <button onClick={handleReset} style={{ fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.13em', textTransform: 'uppercase', background: 'none', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 4, padding: '5px 10px', color: 'rgba(255,255,255,0.35)', cursor: 'pointer' }}>Start over</button>
              </div>
            )}
          </div>
        )}

        {/* ── LAUNCHER ─────────────────────────────────────────────────── */}
        <button
          className="chat-launcher"
          onClick={() => setOpen(o => !o)}
          aria-label={open ? 'Close assistant' : 'Ask me anything'}
          style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10 }}
        >
          {/* Helper text */}
          {!open && (
            <div className="chat-launcher-pill" style={{
              background: 'rgba(16,16,16,0.97)',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: 20,
              padding: '7px 14px',
              boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
              transition: 'background 0.2s',
            }}>
              <span style={{ fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', whiteSpace: 'nowrap' }}>Ask me anything</span>
            </div>
          )}
          {/* Avatar */}
          <div style={{
            width: 44, height: 44, borderRadius: '50%',
            border: `2px solid ${open ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.15)'}`,
            overflow: 'hidden', flexShrink: 0,
            boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
            transition: 'border-color 0.2s',
          }}>
            <img src={PROFILE_IMG} alt="Sivan Baum" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        </button>

      </div>
    </>
  )
}
