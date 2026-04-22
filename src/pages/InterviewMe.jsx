import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

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
    question: "Why shouldn't I hire you?",
    answer: `If what you need is a pure graphic designer, I'm probably not the right fit.\n\nA lot of product designers still end up functioning like production designers, turning around decks, marketing material, and visual artifacts on demand. I can do that work, but it's not where I create the most value.\n\nThe work I'm strongest at is defining what should exist in the first place. Framing problems, shaping direction, thinking through systems, and helping teams make better product decisions.\n\nAI is only making that clearer. As more execution work becomes faster and easier to generate, I think product designers and product managers are going to work much more closely and in some cases start to blend. The value shifts away from artifact production and more toward judgment, prioritization, and strategy.\n\nThat's the space I'm most interested in and where I've already done some of my best work.`,
  },
]

const INITIAL_IDS = ['why-not', 'ai-usage', 'ai-role', 'ambiguous']

export default function InterviewMe() {
  const navigate = useNavigate()
  const [messages, setMessages] = useState([])
  const [askedIds, setAskedIds] = useState(new Set())
  const bottomRef = useRef(null)
  const [formStatus, setFormStatus] = useState('idle') // idle | sending | sent | error

  const currentPrompts = askedIds.size === 0
    ? INTERVIEW_DATA.filter(item => INITIAL_IDS.includes(item.id))
    : INTERVIEW_DATA.filter(item => !askedIds.has(item.id)).slice(0, 4)

  const handleSelect = (item) => {
    if (askedIds.has(item.id)) return
    setMessages(prev => [
      ...prev,
      { type: 'question', text: item.question, id: item.id },
      { type: 'answer', text: item.answer, id: item.id },
    ])
    setAskedIds(prev => new Set([...prev, item.id]))
  }

  const handleReset = () => {
    setMessages([])
    setAskedIds(new Set())
    setFormStatus('idle')
  }

  const handleContactSubmit = async (e) => {
    e.preventDefault()
    const form = e.target
    const email = form.email.value.trim()
    const message = form.message.value.trim()
    if (!email || !message) return
    setFormStatus('sending')
    try {
      const res = await fetch('https://formspree.io/f/xvzvygyg', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ email, message }),
      })
      if (res.ok) {
        setFormStatus('sent')
      } else {
        setFormStatus('error')
      }
    } catch {
      setFormStatus('error')
    }
  }

  useEffect(() => {
    if (messages.length > 0) {
      setTimeout(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
      }, 80)
    }
  }, [messages])

  return (
    <div className="pg im-wrap">
      {/* Page header */}
      <header className="im-header">
        <p className="im-label">Interview Me</p>
        <h1 className="im-title">Ask me anything.</h1>
        <p className="im-sub">Select a question to start the conversation. No typing required.</p>
      </header>

      {/* Chat thread */}
      <div className="im-chat">

        {messages.map((msg, i) =>
          msg.type === 'question' ? (
            <div key={`q-${msg.id}`} className="im-msg-q im-appear">
              <span className="im-bubble">{msg.text}</span>
            </div>
          ) : (
            <div key={`a-${msg.id}`} className="im-msg-a im-appear">
              <img src={PROFILE_IMG} alt="Sivan Baum" className="im-avatar" />
              <div className="im-answer">
                {msg.text.split('\n\n').map((para, j) => (
                  <p key={j} className="im-para">{para}</p>
                ))}
              </div>
            </div>
          )
        )}

        {/* Prompt suggestions */}
        {currentPrompts.length > 0 && (
          <div className={`im-prompts${messages.length > 0 ? ' im-prompts--reply' : ''}`}>
            {messages.length === 0 && (
              <p className="im-prompt-hint">Select a question to begin</p>
            )}
            {messages.length > 0 && (
              <p className="im-prompt-hint">Continue the conversation</p>
            )}
            <div className="im-prompt-list">
              {currentPrompts.map(item => (
                <button
                  key={item.id}
                  className="im-prompt-row"
                  onClick={() => handleSelect(item)}
                >
                  <span className="im-prompt-text">{item.question}</span>
                  <span className="im-prompt-arrow">↗</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* All questions asked — contact form */}
        {currentPrompts.length === 0 && messages.length > 0 && (
          <div className="im-end im-appear">
            <div className="im-contact-card">
              {formStatus === 'sent' ? (
                <div className="im-contact-sent">
                  <p className="im-contact-sent-title">Got it.</p>
                  <p className="im-contact-sent-sub">Your question is in my inbox. I'll follow up shortly.</p>
                </div>
              ) : (
                <>
                  <div className="im-contact-header">
                    <p className="im-contact-label">Got more questions?</p>
                    <p className="im-contact-sub">Your question goes right to my inbox.</p>
                  </div>
                  <form className="im-contact-form" onSubmit={handleContactSubmit}>
                    <textarea
                      className="im-contact-textarea"
                      name="message"
                      placeholder="Ask me anything..."
                      rows={3}
                      required
                    />
                    <div className="im-contact-row">
                      <input
                        className="im-contact-input"
                        type="email"
                        name="email"
                        placeholder="Your email"
                        required
                      />
                      <button
                        type="submit"
                        className="im-contact-send"
                        disabled={formStatus === 'sending'}
                      >
                        {formStatus === 'sending' ? 'Sending...' : 'Send →'}
                      </button>
                    </div>
                    {formStatus === 'error' && (
                      <p className="im-contact-error">Something went wrong. Email me directly at builtbysivan@gmail.com</p>
                    )}
                  </form>
                </>
              )}
            </div>
            <button className="im-restart" onClick={handleReset}>Start over</button>
          </div>
        )}

        <div ref={bottomRef} style={{ height: 1 }} />
      </div>
    </div>
  )
}
