import { useState, useEffect, useRef, useCallback } from "react";

// ─────────────────────────────────────────────────────────────
// GLOBAL STYLES
// Exact design spec from graceguo.io:
//   Satoshi (geometric sans) → body, ALL headings
//   Cormorant Garamond       → hero display name ONLY
//   DM Mono                  → nav, labels, tags, counters
//   bg: #0A0A0A, text: #FFFFFF, near-mono palette
// ─────────────────────────────────────────────────────────────
const CSS = `
@import url('https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=DM+Mono:wght@400;500&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --bg:      #0A0A0A;
  --bg1:     #111111;
  --bg2:     #161616;
  --txt:     #FFFFFF;
  --txt2:    rgba(255,255,255,0.5);
  --txt3:    rgba(255,255,255,0.22);
  --bdr:     rgba(255,255,255,0.08);
  --bdr2:    rgba(255,255,255,0.15);
  --hover:   rgba(255,255,255,0.04);
  --sans:    'Satoshi', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --display: 'Cormorant Garamond', Georgia, serif;
  --mono:    'DM Mono', 'Courier New', monospace;
  --pad:     clamp(24px, 5vw, 80px);
  --max:     1200px;
  --nav:     68px;
}

html { scroll-behavior: smooth; font-size: 16px; }
body {
  background: var(--bg);
  color: var(--txt);
  font-family: var(--sans);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow-x: hidden;
}
::-webkit-scrollbar { width: 2px; }
::-webkit-scrollbar-track { background: var(--bg); }
::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.15); }

/* ── Grid overlay (exact graceguo.io pattern) ── */
.grid-bg {
  position: fixed; inset: 0; pointer-events: none; z-index: 0;
  background-image:
    linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
  background-size: 80px 80px;
}

/* ── Scroll reveal ── */
.sr {
  opacity: 0; transform: translateY(24px);
  transition: opacity 0.75s cubic-bezier(0.16,1,0.3,1),
              transform 0.75s cubic-bezier(0.16,1,0.3,1);
}
.sr.vis { opacity: 1; transform: none; }
.sr.d1  { transition-delay: 0.08s; }
.sr.d2  { transition-delay: 0.16s; }
.sr.d3  { transition-delay: 0.26s; }
.sr.d4  { transition-delay: 0.38s; }
.sr.d5  { transition-delay: 0.52s; }

/* ── Page transition ── */
.pg { animation: pgIn 0.5s cubic-bezier(0.16,1,0.3,1) both; }
@keyframes pgIn { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:none; } }

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   NAV
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
.nav {
  position: fixed; top:0; left:0; right:0; z-index:500;
  height: var(--nav);
  display: flex; align-items: center; justify-content: space-between;
  padding: 0 var(--pad);
  transition: background 0.35s, border-color 0.35s;
  border-bottom: 1px solid transparent;
}
.nav.sc {
  background: rgba(10,10,10,0.92);
  backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
  border-color: var(--bdr);
}
.nav-logo {
  font-family: var(--display); font-size: 20px; font-weight: 400;
  letter-spacing: -0.02em; color: var(--txt);
  cursor: pointer; background: none; border: none; padding: 0;
  position: relative; z-index: 10;
  transition: opacity 0.2s;
}
.nav-logo:hover { opacity: 0.6; }
.nav-links { display: flex; align-items: center; gap: 32px; position: relative; z-index: 10; }
.nav-btn {
  font-family: var(--mono); font-size: 11px; font-weight: 500;
  letter-spacing: 0.04em; text-transform: uppercase;
  color: var(--txt2); cursor: pointer;
  background: none; border: none; padding: 0;
  transition: color 0.2s; position: relative;
}
.nav-btn:hover, .nav-btn.act { color: var(--txt); }

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   MEGA MENU — horizontal thumbnail strip (graceguo.io exact pattern)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
.mega {
  position: fixed; top: var(--nav); left:0; right:0; z-index:490;
  background: rgba(10,10,10,0.95);
  backdrop-filter: blur(24px); -webkit-backdrop-filter: blur(24px);
  border-bottom: 1px solid var(--bdr);
  padding: 32px var(--pad) 36px;
  opacity: 0; transform: translateY(-8px);
  pointer-events: none;
  transition: opacity 0.2s ease, transform 0.28s cubic-bezier(0.16,1,0.3,1);
}
.mega.open { opacity: 1; transform: none; pointer-events: all; }
.mega-inner { max-width: var(--max); margin: 0 auto; }
.mega-row {
  display: flex; gap: 16px; align-items: flex-start; overflow-x: auto;
  scrollbar-width: none; -ms-overflow-style: none;
}
.mega-row::-webkit-scrollbar { display: none; }
.mega-thumb {
  flex: 0 0 220px; cursor: pointer;
  transition: opacity 0.2s;
}
.mega-thumb:hover { opacity: 0.7; }
.mega-thumb-img {
  width: 100%; aspect-ratio: 4/3; border-radius: 6px; overflow: hidden;
  background: var(--bg2); border: 1px solid var(--bdr);
  display: flex; align-items: center; justify-content: center;
  margin-bottom: 12px; position: relative;
  transition: transform 0.3s cubic-bezier(0.16,1,0.3,1);
}
.mega-thumb:hover .mega-thumb-img { transform: scale(0.97); }
.mega-thumb-placeholder {
  font-size: 28px; opacity: 0.15;
}
.mega-thumb-name {
  font-family: var(--mono); font-size: 10px; font-weight: 500;
  letter-spacing: 0.08em; text-transform: uppercase; color: var(--txt2);
}
.mega-thumb.dim { opacity: 0.35; cursor: default; }
.mega-thumb.dim:hover { opacity: 0.35; }
.mega-overlay {
  position: fixed; inset: 0; z-index: 480;
  background: rgba(0,0,0,0.5);
  opacity: 0; pointer-events: none; transition: opacity 0.25s;
}
.mega-overlay.open { opacity: 1; pointer-events: all; }

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   HERO
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
.hero {
  min-height: 100vh; padding-top: var(--nav);
  display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  text-align: center; position: relative; z-index: 2;
  padding-left: var(--pad); padding-right: var(--pad); padding-bottom: 60px;
}
.hero-name {
  font-family: var(--display); font-weight: 300;
  font-size: clamp(80px, 13vw, 180px);
  line-height: 0.9; letter-spacing: -0.03em;
  color: var(--txt); margin-bottom: 28px;
  position: relative; z-index: 2; user-select: none;
}
.hero-tagline {
  font-family: var(--mono); font-size: clamp(10px,1.1vw,12px);
  letter-spacing: 0.18em; text-transform: uppercase;
  color: var(--txt2); margin-bottom: 56px;
  position: relative; z-index: 2; min-height: 1.5em;
}
.hero-desc {
  max-width: 480px; font-size: clamp(16px,1.6vw,19px);
  color: var(--txt2); line-height: 1.7; margin-bottom: 44px;
  position: relative; z-index: 2; font-weight: 400;
}
.hero-desc strong { color: var(--txt); font-weight: 500; }
.hero-btns {
  display: flex; gap: 12px; justify-content: center;
  flex-wrap: wrap; position: relative; z-index: 2;
}
.btn-white {
  font-family: var(--mono); font-size: 11px; font-weight: 500;
  letter-spacing: 0.08em; text-transform: uppercase;
  color: var(--bg); background: var(--txt);
  border: none; padding: 13px 28px; border-radius: 2px;
  cursor: pointer; transition: background 0.2s, opacity 0.2s;
}
.btn-white:hover { opacity: 0.85; }
.btn-ghost {
  font-family: var(--mono); font-size: 11px; font-weight: 500;
  letter-spacing: 0.08em; text-transform: uppercase;
  color: var(--txt); background: transparent;
  border: 1px solid var(--bdr2); padding: 13px 28px; border-radius: 2px;
  cursor: pointer; transition: background 0.2s, border-color 0.2s;
}
.btn-ghost:hover { background: var(--hover); border-color: rgba(255,255,255,0.3); }
.hero-scroll {
  position: absolute; bottom: 32px; left: 50%;
  transform: translateX(-50%);
  display: flex; flex-direction: column; align-items: center; gap: 8px;
  font-family: var(--mono); font-size: 9px;
  letter-spacing: 0.2em; text-transform: uppercase; color: var(--txt3);
  animation: fadeIn 1s ease 1.5s both;
}
@keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
.hero-scroll-line {
  width: 1px; height: 40px;
  background: linear-gradient(to bottom, rgba(255,255,255,0.2), transparent);
  animation: scrollPulse 2.2s ease-in-out infinite;
}
@keyframes scrollPulse { 0%,100%{opacity:0.3} 50%{opacity:1} }

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   INTRO STATEMENT (graceguo.io: "Shipping soulful digital experiences")
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
.intro-sec {
  border-top: 1px solid var(--bdr); position: relative; z-index: 2;
  padding: 120px var(--pad);
}
.intro-inner { max-width: var(--max); margin: 0 auto; }
.intro-statement {
  font-family: var(--sans); font-weight: 500;
  font-size: clamp(36px, 5.5vw, 72px);
  line-height: 1.1; letter-spacing: -0.03em;
  color: var(--txt); max-width: 840px;
}
.intro-statement em { color: var(--txt2); font-style: normal; }

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   PROJECTS — full-viewport scroll sections (graceguo.io pattern)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
.projects-sec { position: relative; z-index: 2; }

.proj-panel {
  border-top: 1px solid var(--bdr);
  min-height: 90vh; position: relative; overflow: hidden;
  cursor: pointer; display: flex; align-items: stretch;
}
.proj-panel-inner {
  display: grid; grid-template-columns: 1fr 1fr;
  width: 100%; max-width: var(--max); margin: 0 auto;
  padding: 0 var(--pad); gap: 0; align-items: center;
}
.proj-text {
  padding: 80px 64px 80px 0;
  display: flex; flex-direction: column; justify-content: flex-end;
  min-height: 90vh;
}
.proj-counter {
  font-family: var(--mono); font-size: 10px; font-weight: 500;
  letter-spacing: 0.1em; text-transform: uppercase;
  color: var(--txt3); margin-bottom: 20px;
}
.proj-type {
  font-family: var(--mono); font-size: 10px; font-weight: 500;
  letter-spacing: 0.08em; text-transform: uppercase;
  color: var(--txt3); margin-bottom: 14px;
}
.proj-company {
  font-family: var(--mono); font-size: 11px; font-weight: 500;
  letter-spacing: 0.06em; text-transform: uppercase;
  color: var(--txt2); margin-bottom: 16px;
}
.proj-title {
  font-family: var(--sans); font-weight: 500;
  font-size: clamp(36px, 4.5vw, 58px);
  line-height: 1.05; letter-spacing: -0.025em;
  color: var(--txt); margin-bottom: 20px;
}
.proj-desc {
  font-size: 15px; color: var(--txt2); line-height: 1.75;
  max-width: 400px; margin-bottom: 36px; font-weight: 400;
}
.proj-cta {
  display: inline-flex; align-items: center; gap: 10px;
  font-family: var(--mono); font-size: 11px; font-weight: 500;
  letter-spacing: 0.08em; text-transform: uppercase;
  color: var(--txt); background: none; border: none;
  cursor: pointer; padding: 0;
  transition: gap 0.2s ease, opacity 0.2s;
}
.proj-cta:hover { gap: 16px; }
.proj-cta.off { color: var(--txt3); pointer-events: none; }
.proj-img-col {
  position: relative; height: 100%;
  display: flex; align-items: center; justify-content: center;
  padding: 60px 0;
}
.proj-img-box {
  width: 100%;
  aspect-ratio: 4/3; border-radius: 8px; overflow: hidden;
  border: 1px solid var(--bdr);
  display: flex; flex-direction: column; align-items: center;
  justify-content: center; gap: 10px;
  font-family: var(--mono); font-size: 10px; letter-spacing: 0.08em;
  text-transform: uppercase; color: var(--txt3);
  transition: transform 0.6s cubic-bezier(0.16,1,0.3,1),
              border-color 0.3s;
  position: relative; overflow: hidden;
}
.proj-img-box-bg {
  position: absolute; inset: 0; opacity: 0.06; transition: opacity 0.3s;
}
.proj-panel:hover .proj-img-box { transform: translateY(-6px); border-color: var(--bdr2); }
.proj-panel:hover .proj-img-box-bg { opacity: 0.1; }
.proj-img-icon { font-size: 32px; opacity: 0.12; position: relative; z-index: 1; }
.proj-img-label { position: relative; z-index: 1; }

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   CURRENTLY SECTION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
.currently {
  border-top: 1px solid var(--bdr); position: relative; z-index: 2;
  padding: 100px var(--pad);
}
.currently-in { max-width: var(--max); margin: 0 auto; }
.currently-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: start; }
.sec-label {
  font-family: var(--mono); font-size: 10px; font-weight: 500;
  letter-spacing: 0.1em; text-transform: uppercase; color: var(--txt3);
}
.currently-h {
  font-family: var(--sans); font-weight: 500;
  font-size: clamp(24px, 3vw, 38px);
  line-height: 1.2; letter-spacing: -0.02em; color: var(--txt);
  margin-bottom: 24px; margin-top: 20px;
}
.currently-p {
  font-size: 15px; color: var(--txt2); line-height: 1.85; margin-bottom: 14px;
}
.learnings { margin-top: 36px; display: flex; flex-direction: column; gap: 16px; }
.learning { display: grid; grid-template-columns: 28px 1fr; gap: 12px; }
.l-n { font-family: var(--mono); font-size: 10px; color: var(--txt3); padding-top: 2px; }
.l-t { font-size: 14px; color: var(--txt2); line-height: 1.7; }
.tool-cards { display: flex; flex-direction: column; gap: 1px; background: var(--bdr); border-radius: 6px; overflow: hidden; margin-top: 20px; }
.tool-card {
  display: flex; align-items: flex-start; gap: 14px;
  padding: 18px 20px; background: var(--bg1);
  transition: background 0.2s;
}
.tool-card:hover { background: var(--bg2); }
.tc-icon {
  width: 34px; height: 34px; border-radius: 6px;
  background: rgba(255,255,255,0.06); border: 1px solid var(--bdr);
  display: flex; align-items: center; justify-content: center;
  font-size: 15px; flex-shrink: 0;
}
.tc-name { font-size: 13px; font-weight: 500; color: var(--txt); margin-bottom: 2px; letter-spacing: -0.01em; }
.tc-desc { font-size: 12px; color: var(--txt3); line-height: 1.5; }

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   FOOTER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
.footer { border-top: 1px solid var(--bdr); position: relative; z-index: 2; }
.footer-in {
  max-width: var(--max); margin: 0 auto;
  padding: 80px var(--pad) 40px;
  display: grid; grid-template-columns: 1fr auto; align-items: end; gap: 40px;
}
.footer-cta {
  font-family: var(--sans); font-weight: 500;
  font-size: clamp(28px,4.5vw,60px);
  line-height: 1.05; letter-spacing: -0.03em;
  color: var(--txt); margin-bottom: 24px;
}
.footer-cta em { color: var(--txt2); font-style: normal; }
.footer-email {
  font-size: 14px; color: var(--txt2); text-decoration: none;
  display: inline-flex; align-items: center; gap: 6px;
  border-bottom: 1px solid var(--bdr); padding-bottom: 2px;
  transition: color 0.2s, border-color 0.2s; font-family: var(--mono); font-size: 12px;
}
.footer-email:hover { color: var(--txt); border-color: var(--bdr2); }
.footer-links { display: flex; flex-direction: column; align-items: flex-end; gap: 14px; }
.footer-link {
  font-family: var(--mono); font-size: 10px; font-weight: 500;
  letter-spacing: 0.08em; text-transform: uppercase;
  color: var(--txt3); background: none; border: none;
  cursor: pointer; transition: color 0.2s;
}
.footer-link:hover { color: var(--txt); }
.footer-bar {
  border-top: 1px solid var(--bdr); max-width: var(--max); margin: 0 auto;
  padding: 20px var(--pad);
  display: flex; justify-content: space-between; align-items: center;
}
.footer-copy { font-family: var(--mono); font-size: 9px; letter-spacing: 0.08em; text-transform: uppercase; color: var(--txt3); }
.back-top {
  font-family: var(--mono); font-size: 9px; font-weight: 500;
  letter-spacing: 0.1em; text-transform: uppercase;
  color: var(--txt3); background: none; border: none;
  cursor: pointer; transition: color 0.2s; display: flex; align-items: center; gap: 5px;
}
.back-top:hover { color: var(--txt); }

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   CASE STUDY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
.cs-prog {
  position: fixed; top: 0; left: 0; height: 1px;
  background: rgba(255,255,255,0.5); z-index: 600; transition: width 0.1s linear;
}
.cs-pg { padding-top: var(--nav); position: relative; z-index: 2; }
.cs-hero {
  padding: 80px var(--pad) 100px;
  max-width: var(--max); margin: 0 auto; border-bottom: 1px solid var(--bdr);
}
.cs-back {
  display: inline-flex; align-items: center; gap: 8px;
  font-family: var(--mono); font-size: 11px; font-weight: 500;
  letter-spacing: 0.08em; text-transform: uppercase;
  color: var(--txt3); background: none; border: none;
  cursor: pointer; margin-bottom: 60px;
  transition: color 0.2s, gap 0.2s; padding: 0;
}
.cs-back:hover { color: var(--txt); gap: 13px; }
.cs-tags { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 24px; }
.cs-tag {
  font-family: var(--mono); font-size: 10px; font-weight: 500;
  letter-spacing: 0.07em; text-transform: uppercase;
  color: var(--txt3); border: 1px solid var(--bdr);
  padding: 5px 12px; border-radius: 2px;
}
.cs-title {
  font-family: var(--sans); font-weight: 500;
  font-size: clamp(48px, 8vw, 108px);
  line-height: 0.97; letter-spacing: -0.04em;
  color: var(--txt); margin-bottom: 32px; max-width: 820px;
}
.cs-tagline {
  font-size: clamp(16px,1.8vw,20px); color: var(--txt2);
  line-height: 1.65; max-width: 620px; margin-bottom: 60px;
  font-weight: 400;
}
.cs-meta {
  display: grid; grid-template-columns: repeat(auto-fit,minmax(140px,1fr));
  gap: 32px; padding-top: 40px; border-top: 1px solid var(--bdr);
}
.cs-meta-l {
  font-family: var(--mono); font-size: 9px; font-weight: 500;
  letter-spacing: 0.14em; text-transform: uppercase; color: var(--txt3); margin-bottom: 8px;
}
.cs-meta-v { font-size: 13px; color: var(--txt); font-weight: 500; line-height: 1.5; }
.cs-media {
  width: 100%; aspect-ratio: 16/9; background: var(--bg2); border: 1px solid var(--bdr);
  border-radius: 6px; display: flex; flex-direction: column;
  align-items: center; justify-content: center; gap: 8px;
  color: var(--txt3); font-family: var(--mono); font-size: 10px;
  letter-spacing: 0.08em; text-transform: uppercase;
}
.cs-media-icon { font-size: 32px; opacity: 0.08; }

/* Case study section blocks */
.cs-s {
  max-width: var(--max); margin: 0 auto;
  padding: 96px var(--pad); border-bottom: 1px solid var(--bdr);
}
.cs-s-eyebrow {
  font-family: var(--mono); font-size: 10px; font-weight: 500;
  letter-spacing: 0.12em; text-transform: uppercase;
  color: var(--txt3); margin-bottom: 40px;
  display: flex; align-items: center; gap: 12px;
}
.cs-s-eyebrow::before { content:''; width:14px; height:1px; background:var(--txt3); }
/* KEY CHANGE: all CS headings now Satoshi (geometric sans), not serif */
.cs-h1 {
  font-family: var(--sans); font-weight: 500;
  font-size: clamp(28px,4vw,52px);
  line-height: 1.08; letter-spacing: -0.03em; color: var(--txt); margin-bottom: 6px;
}
.cs-h1-sub {
  font-family: var(--sans); font-weight: 400;
  font-size: clamp(18px,2vw,24px);
  color: var(--txt2); margin-bottom: 36px; line-height: 1.35;
}
.cs-body {
  font-size: 16px; color: var(--txt2); line-height: 1.85;
  max-width: 680px; margin-bottom: 16px; font-weight: 400;
}
.cs-body strong { color: var(--txt); font-weight: 500; }
.cs-2col { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: start; }

/* Symptom cards */
.cs-syms { display: flex; flex-direction: column; gap: 1px; background: var(--bdr); border-radius: 4px; overflow: hidden; margin-top: 40px; }
.cs-sym {
  background: var(--bg1); padding: 24px 28px;
  display: grid; grid-template-columns: 64px 1fr; gap: 20px;
}
.cs-sym-l {
  font-family: var(--mono); font-size: 9px; letter-spacing: 0.1em;
  text-transform: uppercase; color: var(--txt3); padding-top: 3px;
}
.cs-sym-title { font-size: 14px; font-weight: 500; color: var(--txt); margin-bottom: 4px; letter-spacing: -0.01em; }
.cs-sym-body { font-size: 13px; color: var(--txt2); line-height: 1.6; }

/* HMW */
.cs-hmw {
  background: var(--bg1); border: 1px solid var(--bdr);
  border-left: 2px solid rgba(255,255,255,0.4); border-radius: 4px;
  padding: 36px 44px; margin-top: 44px;
}
.cs-hmw-l { font-family: var(--mono); font-size: 9px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--txt3); margin-bottom: 12px; }
.cs-hmw-txt { font-family: var(--sans); font-size: clamp(16px,1.8vw,22px); font-weight: 500; color: var(--txt); line-height: 1.4; letter-spacing: -0.01em; }

/* Pillars */
.cs-pillars { display: grid; grid-template-columns: repeat(3,1fr); gap: 1px; background: var(--bdr); border-radius: 4px; overflow: hidden; margin-top: 44px; }
.cs-pillar { background: var(--bg1); padding: 28px 24px; }
.cs-pillar-t { font-size: 13px; font-weight: 600; color: var(--txt); margin-bottom: 8px; letter-spacing: -0.01em; }
.cs-pillar-b { font-size: 13px; color: var(--txt2); line-height: 1.65; }

/* Decisions */
.cs-decs { margin-top: 44px; }
.cs-dec {
  display: grid; grid-template-columns: 56px 1fr; gap: 28px;
  padding: 52px 0; border-bottom: 1px solid var(--bdr);
}
.cs-dec:last-child { border-bottom: none; padding-bottom: 0; }
.cs-dec-n {
  font-family: var(--sans); font-weight: 700;
  font-size: 52px; color: rgba(255,255,255,0.08);
  line-height: 0.9; letter-spacing: -0.04em; padding-top: 4px;
}
.cs-dec-title {
  font-family: var(--sans); font-weight: 500;
  font-size: clamp(17px,1.8vw,22px);
  color: var(--txt); margin-bottom: 12px; line-height: 1.25; letter-spacing: -0.015em;
}
.cs-dec-body { font-size: 15px; color: var(--txt2); line-height: 1.85; }

/* Tradeoff */
.cs-tradeoff {
  background: var(--bg1); border: 1px solid var(--bdr); border-radius: 4px;
  padding: 36px 40px; margin-top: 36px;
}
.cs-to-title { font-size: 14px; font-weight: 600; color: var(--txt); margin-bottom: 12px; letter-spacing: -0.01em; }
.cs-to-body { font-size: 15px; color: var(--txt2); line-height: 1.85; }
.cs-to-body + .cs-to-body { margin-top: 10px; }

/* Principles */
.cs-prin-block {
  background: var(--bg1); border: 1px solid var(--bdr); border-radius: 4px;
  padding: 36px 40px; margin-bottom: 36px;
}
.cs-prin-eyebrow { font-family: var(--mono); font-size: 9px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--txt3); margin-bottom: 12px; }
.cs-prin-quote { font-family: var(--sans); font-size: clamp(16px,1.8vw,21px); font-weight: 500; color: var(--txt); line-height: 1.4; letter-spacing: -0.01em; }
.cs-prins { display: flex; flex-direction: column; gap: 14px; margin-top: 36px; }
.cs-prin { display: grid; grid-template-columns: 28px 1fr; gap: 12px; }
.cs-prin-n { font-family: var(--mono); font-size: 10px; color: var(--txt3); padding-top: 1px; }
.cs-prin-t { font-size: 15px; color: var(--txt2); line-height: 1.65; }

/* Steps */
.cs-steps { display: flex; flex-direction: column; gap: 1px; background: var(--bdr); border-radius: 4px; overflow: hidden; margin-top: 44px; }
.cs-step {
  background: var(--bg1); padding: 26px 28px;
  display: grid; grid-template-columns: 40px 1fr; gap: 20px; align-items: start;
}
.cs-step-n {
  font-family: var(--mono); font-size: 10px; font-weight: 500; color: var(--txt3);
  background: rgba(255,255,255,0.05); border: 1px solid var(--bdr);
  border-radius: 3px; padding: 4px 6px; text-align: center; letter-spacing: 0.06em;
}
.cs-step-title { font-size: 13px; font-weight: 600; color: var(--txt); margin-bottom: 4px; letter-spacing: -0.01em; }
.cs-step-body { font-size: 13px; color: var(--txt2); line-height: 1.65; }

/* Impact */
.cs-impact { display: grid; grid-template-columns: 1fr 1fr; gap: 1px; background: var(--bdr); border-radius: 4px; overflow: hidden; margin-top: 44px; }
.cs-impact-item { background: var(--bg1); padding: 28px 28px; }
.cs-impact-title { font-size: 13px; font-weight: 600; color: var(--txt); margin-bottom: 7px; letter-spacing: -0.01em; }
.cs-impact-body { font-size: 13px; color: var(--txt2); line-height: 1.65; }

/* Metrics */
.cs-metrics { display: grid; grid-template-columns: repeat(3,1fr); gap: 1px; background: var(--bdr); border-radius: 4px; overflow: hidden; margin-top: 44px; }
.cs-mc { background: var(--bg1); padding: 28px 24px; }
.cs-mc-t { font-family: var(--mono); font-size: 9px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--txt3); margin-bottom: 16px; }
.cs-ml { display: flex; flex-direction: column; gap: 8px; }
.cs-m {
  font-size: 13px; color: var(--txt2); line-height: 1.5; padding-left: 13px; position: relative;
}
.cs-m::before { content:''; position:absolute; left:0; top:7px; width:3px; height:3px; background:var(--txt3); border-radius:50%; }

/* Outcome stats */
.cs-stats {
  display: grid; grid-template-columns: repeat(3,1fr); gap: 1px;
  background: var(--bdr); border-radius: 4px; overflow: hidden; margin: 36px 0;
}
.cs-stat { background: var(--bg1); padding: 28px 24px; }
.cs-stat-l { font-family: var(--mono); font-size: 9px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--txt3); margin-bottom: 10px; }
.cs-stat-v { font-family: var(--sans); font-size: 18px; font-weight: 500; color: var(--txt); line-height: 1.35; }

/* Next project */
.cs-next {
  max-width: var(--max); margin: 0 auto; padding: 72px var(--pad);
  display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 24px;
}
.cs-next-l { font-family: var(--mono); font-size: 9px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--txt3); margin-bottom: 8px; }
.cs-next-title { font-family: var(--sans); font-weight: 500; font-size: clamp(20px,2.5vw,30px); color: var(--txt); letter-spacing: -0.02em; }

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   ABOUT PAGE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
.about-pg { padding-top: var(--nav); position: relative; z-index: 2; }
.about-hero {
  padding: 80px var(--pad) 96px; max-width: var(--max); margin: 0 auto; border-bottom: 1px solid var(--bdr);
}
.about-h {
  font-family: var(--sans); font-weight: 500;
  font-size: clamp(36px,5.5vw,72px);
  line-height: 1.05; letter-spacing: -0.03em; color: var(--txt);
  max-width: 760px; margin-bottom: 36px;
}
.about-h em { color: var(--txt2); font-style: normal; }
.about-bio { font-size: 16px; color: var(--txt2); line-height: 1.85; max-width: 600px; margin-bottom: 14px; }
.about-grid {
  display: grid; grid-template-columns: 1fr 1fr; gap: 80px;
  max-width: var(--max); margin: 0 auto; padding: 96px var(--pad); border-bottom: 1px solid var(--bdr);
}
.acol-title { font-family: var(--mono); font-size: 9px; font-weight: 500; letter-spacing: 0.18em; text-transform: uppercase; color: var(--txt3); margin-bottom: 36px; }
.exp-list { display: flex; flex-direction: column; gap: 48px; }
.exp-role { font-size: 15px; font-weight: 600; color: var(--txt); margin-bottom: 2px; letter-spacing: -0.01em; }
.exp-co { font-family: var(--mono); font-size: 10px; letter-spacing: 0.06em; text-transform: uppercase; color: var(--txt3); margin-bottom: 2px; }
.exp-dates { font-family: var(--mono); font-size: 10px; color: rgba(255,255,255,0.2); letter-spacing: 0.06em; margin-bottom: 12px; }
.exp-buls { display: flex; flex-direction: column; gap: 8px; }
.exp-bul { font-size: 13px; color: var(--txt2); line-height: 1.65; padding-left: 14px; position: relative; }
.exp-bul::before { content:'—'; position:absolute; left:0; color:var(--txt3); font-size:10px; top:3px; }
.skills-area { max-width: var(--max); margin: 0 auto; padding: 80px var(--pad); border-bottom: 1px solid var(--bdr); }
.skills-g { display: grid; grid-template-columns: repeat(4,1fr); gap: 1px; background: var(--bdr); border-radius: 4px; overflow: hidden; margin-top: 32px; }
.skill-col { background: var(--bg1); padding: 24px 20px; }
.skill-col-t { font-family: var(--mono); font-size: 9px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--txt3); margin-bottom: 14px; }
.skill-list { display: flex; flex-direction: column; gap: 6px; }
.skill-i { font-size: 12px; color: var(--txt2); line-height: 1.4; }
.outside-area { max-width: var(--max); margin: 0 auto; padding: 80px var(--pad); }
.outside-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 1px; background: var(--bdr); border-radius: 4px; overflow: hidden; margin-top: 32px; }
.int-card { background: var(--bg1); padding: 28px 24px; }
.int-emoji { font-size: 20px; margin-bottom: 14px; display: block; }
.int-title { font-size: 14px; font-weight: 600; color: var(--txt); margin-bottom: 6px; letter-spacing: -0.01em; }
.int-body { font-size: 13px; color: var(--txt2); line-height: 1.65; }
.find-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 1px; background: var(--bdr); border-radius: 4px; overflow: hidden; margin-top: 32px; }
.find-item { background: var(--bg1); padding: 24px; }
.find-em { font-size: 18px; margin-bottom: 10px; display: block; }
.find-label { font-size: 13px; font-weight: 500; color: var(--txt); margin-bottom: 4px; }
.find-status {
  font-family: var(--mono); font-size: 9px; letter-spacing: 0.1em; text-transform: uppercase;
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   RESPONSIVE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
@media (max-width: 900px) {
  .mega-row { gap: 12px; }
  .mega-thumb { flex: 0 0 160px; }
  .proj-panel-inner { grid-template-columns: 1fr; }
  .proj-img-col { display: none; }
  .proj-text { padding: 60px 0; min-height: auto; }
  .currently-grid { grid-template-columns: 1fr; gap: 48px; }
  .cs-2col { grid-template-columns: 1fr; gap: 36px; }
  .cs-pillars { grid-template-columns: 1fr; }
  .cs-metrics { grid-template-columns: 1fr 1fr; }
  .cs-impact { grid-template-columns: 1fr; }
  .cs-stats { grid-template-columns: 1fr 1fr; }
  .about-grid { grid-template-columns: 1fr; gap: 56px; }
  .skills-g { grid-template-columns: 1fr 1fr; }
  .outside-grid { grid-template-columns: 1fr 1fr; }
  .find-grid { grid-template-columns: repeat(2,1fr); }
  .footer-in { grid-template-columns: 1fr; }
  .footer-links { align-items: flex-start; flex-direction: row; flex-wrap: wrap; gap: 20px; }
}
@media (max-width: 640px) {
  :root { --pad: 20px; }
  .nav-links { gap: 20px; }
  .hero-btns { flex-direction: column; align-items: center; }
  .cs-dec { grid-template-columns: 1fr; gap: 8px; }
  .cs-dec-n { font-size: 36px; }
  .cs-sym { grid-template-columns: 1fr; gap: 6px; }
  .cs-step { grid-template-columns: 1fr; }
  .cs-metrics { grid-template-columns: 1fr; }
  .cs-stats { grid-template-columns: 1fr; }
  .skills-g { grid-template-columns: 1fr; }
  .outside-grid { grid-template-columns: 1fr; }
  .find-grid { grid-template-columns: 1fr 1fr; }
  .footer-bar { flex-direction: column; gap: 10px; text-align: center; }
  .intro-statement { font-size: clamp(28px, 8vw, 48px); }
}
`;

function StyleSheet() {
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = CSS;
    document.head.appendChild(style);
    document.title = "Sivan Baum — Product Designer";
    return () => style.remove();
  }, []);
  return null;
}

// ─────────────────────────────────────────────────────────────
// HOOKS
// ─────────────────────────────────────────────────────────────
function useScrolled(t = 20) {
  const [s, setS] = useState(false);
  useEffect(() => {
    const fn = () => setS(window.scrollY > t);
    window.addEventListener("scroll", fn, { passive: true });
    fn();
    return () => window.removeEventListener("scroll", fn);
  }, [t]);
  return s;
}

function useScrollReveal() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("vis"); obs.unobserve(e.target); } }),
      { threshold: 0.08, rootMargin: "0px 0px -48px 0px" }
    );
    document.querySelectorAll(".sr").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  });
}

function useReadingProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const fn = () => {
      const el = document.documentElement;
      const top = el.scrollTop || document.body.scrollTop;
      const h = el.scrollHeight - el.clientHeight;
      setP(h > 0 ? (top / h) * 100 : 0);
    };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return p;
}

// Scramble-decode (graceguo.io signature interaction)
function useScramble(target, duration = 1600, delay = 600) {
  const [display, setDisplay] = useState("");
  const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789·+—";
  useEffect(() => {
    let t;
    t = setTimeout(() => {
      const start = Date.now();
      const animate = () => {
        const elapsed = Date.now() - start;
        const progress = Math.min(elapsed / duration, 1);
        const resolved = Math.floor(progress * target.length);
        let result = "";
        for (let i = 0; i < target.length; i++) {
          if (i < resolved) result += target[i];
          else result += target[i] === " " ? " " : CHARS[Math.floor(Math.random() * CHARS.length)];
        }
        setDisplay(result);
        if (progress < 1) requestAnimationFrame(animate);
        else setDisplay(target);
      };
      requestAnimationFrame(animate);
    }, delay);
    return () => clearTimeout(t);
  }, [target]);
  return display;
}

// ─────────────────────────────────────────────────────────────
// SHARED
// ─────────────────────────────────────────────────────────────
function GridBg() { return <div className="grid-bg" />; }

function MediaPlaceholder({ label = "Replace with image", aspectRatio = "16/9" }) {
  return (
    <div className="cs-media" style={{ aspectRatio }}>
      <span className="cs-media-icon">⬜</span>
      <span>{label}</span>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// NAV + MEGA MENU (horizontal thumbnail strip — exact graceguo.io pattern)
// ─────────────────────────────────────────────────────────────
function Nav({ page, navigate, projects }) {
  const scrolled = useScrolled();
  const [open, setOpen] = useState(false);
  const closeRef = useRef(null);

  const show = () => { clearTimeout(closeRef.current); setOpen(true); };
  const hide = (delay = 160) => { closeRef.current = setTimeout(() => setOpen(false), delay); };

  return (
    <>
      <nav className={`nav${scrolled ? " sc" : ""}`}>
        <button className="nav-logo" onClick={() => navigate("home")}>SB</button>
        <div className="nav-links">
          <div onMouseEnter={show} onMouseLeave={() => hide()}>
            <button className={`nav-btn${["hotspots","pinnable"].includes(page) ? " act" : ""}`}>
              Projects
            </button>
          </div>
          <button className={`nav-btn${page === "about" ? " act" : ""}`} onClick={() => navigate("about")}>About</button>
          <a href="https://www.linkedin.com/in/sivanbachar/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
            <button className="nav-btn">Résumé ↗</button>
          </a>
          <a href="mailto:builtbysivan@gmail.com" style={{ textDecoration: "none" }}>
            <button className="nav-btn">Contact</button>
          </a>
        </div>
      </nav>

      <div className={`mega-overlay${open ? " open" : ""}`} onClick={() => setOpen(false)} />

      <div className={`mega${open ? " open" : ""}`} onMouseEnter={show} onMouseLeave={() => hide()}>
        <div className="mega-inner">
          <div className="mega-row">
            {projects.map((p) => (
              <div
                key={p.id}
                className={`mega-thumb${p.status !== "available" ? " dim" : ""}`}
                onClick={() => { if (p.status === "available") { navigate(p.id); setOpen(false); } }}
              >
                <div className="mega-thumb-img" style={{ background: p.thumbBg }}>
                  <span className="mega-thumb-placeholder">{p.thumbIcon}</span>
                </div>
                <div className="mega-thumb-name">{p.title} {p.status !== "available" && "— Soon"}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

// ─────────────────────────────────────────────────────────────
// FOOTER
// ─────────────────────────────────────────────────────────────
function Footer({ navigate }) {
  return (
    <footer className="footer">
      <div className="footer-in">
        <div>
          <div className="footer-cta sr">
            Let's build something<br /><em>worth using.</em>
          </div>
          <a href="mailto:builtbysivan@gmail.com" className="footer-email sr d1">
            builtbysivan@gmail.com ↗
          </a>
        </div>
        <div className="footer-links sr d2">
          <button className="footer-link" onClick={() => navigate("home")}>Home</button>
          <button className="footer-link" onClick={() => navigate("about")}>About</button>
          <button className="footer-link" onClick={() => navigate("hotspots")}>Content Hotspots</button>
          <a href="https://www.linkedin.com/in/sivanbachar/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
            <button className="footer-link">LinkedIn ↗</button>
          </a>
        </div>
      </div>
      <div className="footer-bar">
        <span className="footer-copy">© 2026 Sivan Baum — Product Designer, Amazon</span>
        <button className="back-top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          Back to top ↑
        </button>
      </div>
    </footer>
  );
}

// ─────────────────────────────────────────────────────────────
// HOME PAGE
// ─────────────────────────────────────────────────────────────
function HomePage({ navigate, projects }) {
  useScrollReveal();
  const tagline = useScramble("PRODUCT DESIGNER · AMAZON KINDLE · SEATTLE", 1800, 500);

  return (
    <div className="pg">
      {/* ── HERO ── */}
      <section className="hero">
        <h1 className="hero-name sr">Sivan<br />Baum</h1>
        <div className="hero-tagline sr d1">{tagline || "PRODUCT DESIGNER · AMAZON KINDLE · SEATTLE"}</div>
        <p className="hero-desc sr d2">
          I design product experiences that shape <strong>strategy</strong>,<br />not just interfaces.
        </p>
        <div className="hero-btns sr d3">
          <button className="btn-white" onClick={() => document.getElementById("work")?.scrollIntoView({ behavior: "smooth" })}>
            View Work
          </button>
          <button className="btn-ghost" onClick={() => navigate("about")}>
            About
          </button>
        </div>
        <div className="hero-scroll">
          Scroll
          <div className="hero-scroll-line" />
        </div>
      </section>

      {/* ── INTRO STATEMENT (graceguo.io: large sans statement) ── */}
      <section className="intro-sec">
        <div className="intro-inner">
          <p className="intro-statement sr">
            I help teams define <em>what to build</em> —{" "}
            not just how it looks.
          </p>
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section className="projects-sec" id="work">
        {projects.map((p, i) => (
          <div
            key={p.id}
            className="proj-panel"
            onClick={() => p.status === "available" && navigate(p.id)}
          >
            <div className="proj-panel-inner">
              <div className="proj-text">
                <div className="proj-counter sr">{String(i + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}</div>
                <div className="proj-type sr d1">{p.type}</div>
                <div className="proj-company sr d1">{p.company}</div>
                <h2 className="proj-title sr d2">{p.title}</h2>
                <p className="proj-desc sr d3">{p.tagline}</p>
                {p.status === "available" ? (
                  <button className="proj-cta sr d4" onClick={(e) => { e.stopPropagation(); navigate(p.id); }}>
                    View case study →
                  </button>
                ) : (
                  <span className="proj-cta off sr d4">Coming soon</span>
                )}
              </div>
              <div className="proj-img-col">
                <div className="proj-img-box sr d2">
                  <div className="proj-img-box-bg" style={{ background: p.thumbBg }} />
                  <span className="proj-img-icon">{p.thumbIcon}</span>
                  <span className="proj-img-label">Replace with UI screens</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* ── CURRENTLY ── */}
      <section className="currently">
        <div className="currently-in">
          <div className="currently-grid">
            <div>
              <div className="sec-label sr">Currently</div>
              <h2 className="currently-h sr d1">
                Using AI to accelerate execution so I can focus on what matters.
              </h2>
              <p className="currently-p sr d2">
                I've started building design in code with Claude Code and converting it directly into Figma.
                What used to take days now takes hours — and more importantly, it's freed me to focus on
                product strategy, user behavior, and the deeper decisions about what gets built and why.
              </p>
              <p className="currently-p sr d3">
                Less time in component panels. More time on design with intention, built to last.
                This portfolio is one example — built entirely in Claude Code, then converted to Figma frames.
                Not a mockup. Designed in code, structured for handoff.
              </p>
              <div className="learnings sr d4">
                <div className="sec-label" style={{ marginBottom: 16 }}>What I'm learning</div>
                {[
                  "The output is never 1:1 — it's a starting point, not a final comp",
                  "The quality of the design lives or dies in how well you articulate intent",
                  "It rewards designers who think in systems — not just screens",
                ].map((t, i) => (
                  <div key={i} className="learning">
                    <span className="l-n">0{i + 1}</span>
                    <span className="l-t">{t}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="sec-label sr" style={{ marginBottom: 20 }}>Tools</div>
              <div className="tool-cards">
                {[
                  { icon: "⚡", name: "Claude Code", desc: "Primary build environment — design in code, convert to Figma" },
                  { icon: "◈", name: "Figma", desc: "Design conversions + artifact repository" },
                  { icon: "⊡", name: "Kiro", desc: "AI-assisted prototyping — production-like flows, faster stakeholder alignment" },
                  { icon: "◎", name: "ChatGPT", desc: "Historical prompting + ideation" },
                ].map((t) => (
                  <div key={t.name} className="tool-card sr">
                    <div className="tc-icon">{t.icon}</div>
                    <div>
                      <div className="tc-name">{t.name}</div>
                      <div className="tc-desc">{t.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer navigate={navigate} />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// CASE STUDY — CONTENT HOTSPOTS
// ─────────────────────────────────────────────────────────────
function CaseStudyHotspots({ navigate }) {
  useScrollReveal();
  const progress = useReadingProgress();

  return (
    <div className="cs-pg pg">
      <div className="cs-prog" style={{ width: `${progress}%` }} />

      {/* ── HERO ── */}
      <div className="cs-hero">
        <button className="cs-back" onClick={() => { navigate("home"); window.scrollTo(0,0); }}>
          ← All work
        </button>
        <div className="cs-tags sr">
          {["0→1 Product Design", "UX Strategy", "Interaction Design", "Systems"].map(t => (
            <span key={t} className="cs-tag">{t}</span>
          ))}
        </div>
        <h1 className="cs-title sr d1">Content<br />Hotspots</h1>
        <p className="cs-tagline sr d2">
          A layered reading model that delivers contextual knowledge on demand,
          without interrupting the act of reading.
        </p>
        <div className="cs-meta sr d3">
          {[
            { l: "Company", v: "Amazon · Kindle" },
            { l: "My Role", v: "UX Design Lead\nConcept Originator" },
            { l: "Scope", v: "End to end UX strategy\nDiscovery → Launch\nExperimentation rollout" },
            { l: "Timeline", v: "2026 launch" },
          ].map(m => (
            <div key={m.l}>
              <div className="cs-meta-l">{m.l}</div>
              <div className="cs-meta-v" style={{ whiteSpace: "pre-line" }}>{m.v}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Media */}
      <div style={{ maxWidth: "var(--max)", margin: "0 auto", padding: "64px var(--pad)" }}>
        <MediaPlaceholder label="Replace with Kindle UI screenshot" />
      </div>

      {/* ── CONTEXT ── */}
      <div className="cs-s">
        <div className="cs-s-eyebrow sr">Context</div>
        <h2 className="cs-h1 sr d1">The content existed.</h2>
        <p className="cs-h1-sub sr d2">The delivery model failed.</p>
        <div className="cs-2col">
          <div>
            <p className="cs-body sr d2">Kindle had spent years building supplemental content — X-Ray, Dictionary, Wikipedia, translations. The investment was real. The engagement wasn't.</p>
            <p className="cs-body sr d3">Only a fraction of readers actively used these features. The problem wasn't what was available. It was <strong>how, and when it surfaced.</strong></p>
            <p className="cs-body sr d3">Readers were leaving Kindle mid-session to search externally. The content existed inside the product, but the interaction model couldn't bridge the gap.</p>
          </div>
          <div>
            <p className="cs-body sr d2">This project originated as part of a three-year product vision for the reading experience. It didn't get prioritized the first time. Two years later, AI made it viable, and the gap in reader behavior made it urgent.</p>
            <p className="cs-body sr d3">The root cause was structural: Kindle's supplemental features operated on a <strong>pull model</strong>. Readers had to know features existed, remember to use them, and navigate to find them. That friction was invisible in product reviews and catastrophic in real behavior.</p>
          </div>
        </div>
      </div>

      {/* ── PROBLEM ── */}
      <div className="cs-s">
        <div className="cs-s-eyebrow sr">Problem</div>
        <h2 className="cs-h1 sr d1">A discoverability and delivery problem —</h2>
        <p className="cs-h1-sub sr d2">not a content problem.</p>
        <p className="cs-body sr d3">Supplemental content was difficult to discover, fragmented across inconsistent interaction patterns, buried in menus, and entirely disconnected from reading position. The features weren't broken. The model was.</p>
        <div className="cs-syms sr d4">
          {[
            { label: "Symptom", title: "Low feature engagement", body: "High-value tools — X-Ray, Dictionary, Wikipedia — used by a small percentage of readers despite being available on every page." },
            { label: "Symptom", title: "External abandonment", body: "Readers leaving Kindle mid-session to search Google or ChatGPT, a direct signal that in-product discovery was failing." },
            { label: "Symptom", title: "Inconsistent patterns", body: "Each supplemental feature had its own entry point, menu placement, and interaction model. No unified layer. No coherent system." },
          ].map(s => (
            <div key={s.title} className="cs-sym">
              <div className="cs-sym-l">{s.label}</div>
              <div>
                <div className="cs-sym-title">{s.title}</div>
                <div className="cs-sym-body">{s.body}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="cs-hmw sr">
          <div className="cs-hmw-l">How might we</div>
          <div className="cs-hmw-txt">Deliver relevant, contextual information within the reading experience in a way that enhances understanding without disrupting the act of reading?</div>
        </div>
      </div>

      {/* ── STRATEGY ── */}
      <div className="cs-s">
        <div className="cs-s-eyebrow sr">Strategy</div>
        <h2 className="cs-h1 sr d1">Framework over feature.</h2>
        <p className="cs-body sr d2">The temptation was to fix the specific underperforming features. Better X-Ray. A smarter dictionary. That approach would have produced incremental improvements to a broken model.</p>
        <p className="cs-body sr d3">The real opportunity was structural: <strong>replace the pull model entirely.</strong> Build a unified delivery layer that makes contextual content findable without requiring the reader to look for it.</p>
        <div className="cs-pillars sr d4">
          {[
            { t: "Unified delivery layer", b: "One interaction model for all supplemental content types — characters, places, terms, annotations. Learnable once. Extensible indefinitely." },
            { t: "Push over pull", b: "Surface content based on what the reader is currently reading, not where they navigate. Remove the discovery cost entirely." },
            { t: "Reading first constraint", b: "Any design that breaks reading continuity fails regardless of content quality. The reading experience is the primary product. Everything else is secondary." },
          ].map(p => (
            <div key={p.t} className="cs-pillar">
              <div className="cs-pillar-t">{p.t}</div>
              <div className="cs-pillar-b">{p.b}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── KEY DECISIONS ── */}
      <div className="cs-s">
        <div className="cs-s-eyebrow sr">Key Decisions</div>
        <h2 className="cs-h1 sr d1">Four decision points</h2>
        <p className="cs-h1-sub sr d2">that shaped the product.</p>
        <div className="cs-decs">
          {[
            {
              n: "01", title: "Toggle model: opt-in by default",
              body: "Hotspots launches in an off state. Readers activate it. This removed the most significant objection: that push content would feel intrusive.\n\nThe opt-in model also provided a clean signal for engagement analysis. Every activation was an intentional choice, not an accidental interaction."
            },
            {
              n: "02", title: "Bottom sheet over overlay",
              body: "Competing directions included a floating overlay anchored near the tapped entity. The bottom sheet was chosen because it preserves the full reading surface — the text remains visible and in context while the card is open.\n\nThis also aligned with established platform patterns on iOS and Android, reducing the cognitive load of learning a new interaction."
            },
            {
              n: "03", title: "Smart entity selection, not highlight everything",
              body: "Early prototypes marked every recognizable entity in the text. The reading surface looked annotated, not layered. The quality bar shifted from coverage to relevance.\n\nThe placement engine was redesigned to surface 2–4 hotspots per page — those most likely to benefit comprehension without fragmenting attention."
            },
            {
              n: "04", title: "Reader-controlled density",
              body: "Beyond the global toggle, readers can long press any hotspot to suppress that entity type across the book. Character fatigue is real. The control is local and persistent.\n\nThis extended the trust model: the product earns its place on the reading surface session by session, not by default."
            },
          ].map(d => (
            <div key={d.n} className="cs-dec sr">
              <div className="cs-dec-n">{d.n}</div>
              <div>
                <div className="cs-dec-title">{d.title}</div>
                <div className="cs-dec-body" style={{ whiteSpace: "pre-line" }}>{d.body}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── TRADEOFFS ── */}
      <div className="cs-s">
        <div className="cs-s-eyebrow sr">Tradeoffs</div>
        <h2 className="cs-h1 sr d1">What we chose not to do.</h2>
        <div className="cs-tradeoff sr d2">
          <div className="cs-to-title">On the opt-in model</div>
          <p className="cs-to-body">The opt-in model meant lower initial activation rates. A push-by-default approach would have inflated early engagement numbers — and almost certainly generated complaints about intrusion that would have killed the feature before it could prove its value.</p>
          <p className="cs-to-body">Lower initial numbers were the correct tradeoff for long-term trust.</p>
        </div>
        <div className="cs-tradeoff sr d3" style={{ marginTop: 12 }}>
          <div className="cs-to-title">On AI-generated content in the MLP</div>
          <p className="cs-to-body">We chose not to include AI-generated content in the MLP. The model could absorb it — that was the architectural bet — but validating delivery behavior before introducing content quality variables was the disciplined path.</p>
          <p className="cs-to-body">Phase 1 proved the interaction. Phase 2 proved the content. The sequencing was intentional.</p>
        </div>
      </div>

      {/* ── EXPLORATION ── */}
      <div className="cs-s">
        <div className="cs-s-eyebrow sr">Exploration</div>
        <h2 className="cs-h1 sr d1">Multiple strong directions.</h2>
        <p className="cs-h1-sub sr d2">One constraint.</p>
        <p className="cs-body sr d3">The constraint that eliminated most directions: <strong>any solution that requires the reader to leave the reading surface fails.</strong> That ruled out panels, modals, and menu-based access before they reached hi-fi.</p>
        <div className="cs-prin-block sr d4">
          <div className="cs-prin-eyebrow">Design Principle</div>
          <div className="cs-prin-quote">Features should exist within reading, not alongside it.</div>
        </div>
        <p className="cs-body sr d3">The design breakthrough wasn't a UI solution — it was a reframe. Every direction we'd explored placed supplemental content adjacent to reading. A panel. A menu. A button. All of them asked the reader to leave the text.</p>
        <p className="cs-body sr d3">The layered model treated the text itself as the interface. Hotspots live inside the reading surface. Content emerges from the words — not from chrome around them. Readers never leave the page.</p>
        <div className="cs-prins sr d4">
          {[
            "The reading experience is the primary product. Supplemental content is a guest.",
            "Discoverability that requires effort isn't discoverability.",
            "Trust is earned per session. The off-state must be as considered as the on-state.",
          ].map((p, i) => (
            <div key={i} className="cs-prin">
              <span className="cs-prin-n">0{i + 1}</span>
              <span className="cs-prin-t">{p}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── SOLUTION ── */}
      <div className="cs-s">
        <div className="cs-s-eyebrow sr">Solution</div>
        <h2 className="cs-h1 sr d1">The layered reading model.</h2>
        <p className="cs-body sr d2">Hotspots surfaces contextual content without changing the reading surface. Readers activate a single toggle. Inline markers appear on relevant entities — characters, places, key terms. A tap opens a bottom sheet. The text stays visible. One dismiss returns the reader to their exact position.</p>
        <div className="cs-steps sr d3">
          {[
            { n: "01", title: "Toggle on", body: "Reader activates Hotspots via the toggle pill in the reading corner. The surface shifts — inline markers appear on 2–4 entities per screen." },
            { n: "02", title: "Tap a hotspot", body: "Reader taps a marked entity. A bottom sheet rises over the lower portion of the reading page. Text above remains visible and in position." },
            { n: "03", title: "Read the card", body: "Card displays entity summary, type (character / place / term), and relevant context. Navigation to related entities is available within the card." },
            { n: "04", title: "Return to page", body: "Reader dismisses the sheet. Reading surface restores to the exact position. No scroll reset. No context loss. Reading continues." },
          ].map(s => (
            <div key={s.n} className="cs-step">
              <div className="cs-step-n">{s.n}</div>
              <div>
                <div className="cs-step-title">{s.title}</div>
                <div className="cs-step-body">{s.body}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 48 }}>
          <MediaPlaceholder label="Replace with solution UI screens" />
        </div>
      </div>

      {/* ── SYSTEM IMPACT ── */}
      <div className="cs-s">
        <div className="cs-s-eyebrow sr">System Impact</div>
        <h2 className="cs-h1 sr d1">One model.</h2>
        <p className="cs-h1-sub sr d2">Platform-wide implications.</p>
        <p className="cs-body sr d3">Hotspots wasn't just a feature — it established the architecture for how in-reading features behave. The placement engine, rendering layer, and tracking infrastructure became reusable across content types. New content no longer needs a new interaction pattern. It inherits the framework.</p>
        <div className="cs-impact sr d4">
          {[
            { t: "Scalability", b: "Placement, rendering, and engagement tracking shared across all supplemental content types. Engineering cost per new content type dropped significantly." },
            { t: "Unified interaction", b: "Characters, places, terms, author annotations — all accessible through a single learnable gesture. One tap. One card. One dismiss." },
            { t: "AI integration", b: "The framework was designed to ingest AI-generated content from day one. Hotspots set the delivery surface. AI enriches the payload over time." },
            { t: "Feature to system shift", b: "Hotspots changed how the team thinks about building on Kindle. The question shifted from 'which feature' to 'does this extend the framework.'" },
          ].map(item => (
            <div key={item.t} className="cs-impact-item">
              <div className="cs-impact-title">{item.t}</div>
              <div className="cs-impact-body">{item.b}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── METRICS ── */}
      <div className="cs-s">
        <div className="cs-s-eyebrow sr">Metrics & Validation</div>
        <h2 className="cs-h1 sr d1">Defined success before building.</h2>
        <p className="cs-h1-sub sr d2">Measured what mattered.</p>
        <p className="cs-body sr d3">The experiment was designed to validate one question: does push-based delivery improve engagement without degrading the reading experience? That guardrail shaped every metric we tracked.</p>
        <div className="cs-metrics sr d4">
          <div className="cs-mc">
            <div className="cs-mc-t">Behavioral</div>
            <div className="cs-ml">
              {["Discovery rate: did readers find hotspots?","Sustained engagement: repeat interactions per session","Repeat usage: return rate across sessions","Opt-out rate: trust signal for the model","Time spent on content card"].map(m => <div key={m} className="cs-m">{m}</div>)}
            </div>
          </div>
          <div className="cs-mc">
            <div className="cs-mc-t">Content Quality</div>
            <div className="cs-ml">
              {["Entity recognition precision / recall","Summary faithfulness","Comprehensiveness score","Spoiler avoidance rate","Coverage across book catalog"].map(m => <div key={m} className="cs-m">{m}</div>)}
            </div>
          </div>
          <div className="cs-mc">
            <div className="cs-mc-t">Guardrails</div>
            <div className="cs-ml">
              {["Reading session duration: must not decrease","Pages per session: core reading health","Book completion rate: long-term retention signal"].map(m => <div key={m} className="cs-m">{m}</div>)}
            </div>
          </div>
        </div>
      </div>

      {/* ── OUTCOME ── */}
      <div className="cs-s">
        <div className="cs-s-eyebrow sr">Outcome</div>
        <h2 className="cs-h1 sr d1">A new model.</h2>
        <p className="cs-h1-sub sr d2">Not just a new feature.</p>
        <div className="cs-stats sr d2">
          {[
            { l: "Experiment type", v: "Multi-tranche beta\nHoldout design" },
            { l: "Success signal", v: "Engagement ↑\nReading duration stable" },
            { l: "Product outcome", v: "MLP shipped\nFramework adopted by subsequent features" },
          ].map(s => (
            <div key={s.l} className="cs-stat">
              <div className="cs-stat-l">{s.l}</div>
              <div className="cs-stat-v" style={{ whiteSpace: "pre-line" }}>{s.v}</div>
            </div>
          ))}
        </div>
        <p className="cs-body sr d3">Hotspots validated that push-based content delivery improves engagement without degrading reading. The interaction model proved learnable, the content surface proved trustworthy, and the guardrails held.</p>
        <p className="cs-body sr d3">More durably: it shifted Kindle's product thinking. Features that previously lived outside the reading experience now had a path inside it. The framework created an integration surface that subsequent teams inherited rather than rebuilt.</p>
        <p className="cs-body sr d3">The work is ongoing. AI-powered content generation, personalized entity selection, and author-contributed annotations are all paths the framework can absorb. The model was built for it.</p>
        <div style={{ marginTop: 16 }}>
          <span style={{ fontFamily: "var(--mono)", fontSize: 9, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--txt3)" }}>Design role</span>
          <p className="cs-body" style={{ marginTop: 6 }}>Concept to beta · Sole designer</p>
        </div>
      </div>

      {/* Next */}
      <div className="cs-next sr">
        <div>
          <div className="cs-next-l">Next Project</div>
          <div className="cs-next-title">Pinnable Content</div>
        </div>
        <span style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--txt3)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Coming soon</span>
      </div>

      <Footer navigate={navigate} />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// ABOUT PAGE
// ─────────────────────────────────────────────────────────────
function AboutPage({ navigate }) {
  useScrollReveal();
  return (
    <div className="about-pg pg">
      <div className="about-hero">
        <h1 className="about-h sr">
          Senior designer at Amazon,<br />working at the intersection<br />of <em>strategy and craft.</em>
        </h1>
        <p className="about-bio sr d1">I work on the Kindle reading experience — defining what to build, not just how it looks. I've shipped features used across millions of reading sessions and built the frameworks that let teams move faster.</p>
        <p className="about-bio sr d2">I work in complex, ambiguous spaces, using user behavior to guide product direction and design systems that scale across surfaces and teams.</p>
        <div style={{ marginTop: 32, display: "flex", gap: 12, flexWrap: "wrap" }}>
          <a href="mailto:builtbysivan@gmail.com" style={{ textDecoration: "none" }}><button className="btn-white sr d3">Get in touch</button></a>
          <a href="https://www.linkedin.com/in/sivanbachar/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}><button className="btn-ghost sr d3">LinkedIn ↗</button></a>
        </div>
      </div>

      <div className="about-grid">
        <div>
          <div className="acol-title sr">Experience</div>
          <div className="exp-list">
            {[
              { role: "UX Designer II", co: "Amazon · Kindle", dates: "Aug 2022 — Present", bullets: ["Defined and secured leadership adoption of a 3-year vision for the core Kindle reading experience across mobile and e-reader platforms, shaping roadmap investment and enabling new in-book content capabilities.", "Led end-to-end design and launch of four customer-facing features — Pinnable Content, Link Preview, Content Hotspots, and Entity Cards — improving discoverability and engagement across millions of reading sessions.", "Architected a scalable UX framework for contextual content, increasing feature development velocity and reducing time-to-launch for new reading capabilities.", "Used AI-assisted prototyping via Kiro to build functional, production-like prototypes, shortening iteration cycles and reducing engineering rework through earlier stakeholder alignment."] },
              { role: "Head of Service & Product Design", co: "Getuwell", dates: "Nov 2021 — Aug 2022", bullets: ["Led launch and scale of a high-volume COVID-19 testing service, designing integrated digital and operational systems across physical and digital touchpoints.", "Ran on-site workflow diagnostics and redesigned intake processes, increasing daily patient throughput and clearing operational bottlenecks.", "Designed and launched patient-facing digital experiences that streamlined scheduling and improved visit efficiency end-to-end."] },
              { role: "UX Designer", co: "Rokt", dates: "Oct 2020 — Nov 2021", bullets: ["Led experimentation-driven optimization of checkout cross-sell experiences, designing and testing variations in placement, messaging, and interaction patterns.", "Ran multivariate experiments that improved click-through and conversion rates by double-digit percentages, directly informing product and monetization strategy."] },
              { role: "UX Designer", co: "Swift Shift", dates: "Feb 2019 — Oct 2020", bullets: ["Served as sole designer across three products, establishing structured UX research practices and scalable experience frameworks from scratch.", "Conducted research with schedulers and nurses to digitize manual coordination workflows, increasing nurse application rates while reducing scheduler workload."] },
            ].map(e => (
              <div key={e.role} className="sr">
                <div className="exp-role">{e.role}</div>
                <div className="exp-co">{e.co}</div>
                <div className="exp-dates">{e.dates}</div>
                <div className="exp-buls">{e.bullets.map(b => <div key={b} className="exp-bul">{b}</div>)}</div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="acol-title sr">Education</div>
          <div className="sr d1" style={{ display: "flex", flexDirection: "column", gap: 28, marginBottom: 56 }}>
            {[
              { cert: "B.A., Marketing & Management", school: "Stern — Sy Syms Business School", dates: "2012 — 2016" },
              { cert: "Certification, Human-Computer Interaction", school: "General Assembly", dates: "2017" },
              { cert: "Certification, Lean UX Workshop Facilitation", school: "Lean UX", dates: "2021" },
            ].map(e => (
              <div key={e.cert}>
                <div className="exp-role">{e.cert}</div>
                <div className="exp-co">{e.school}</div>
                <div className="exp-dates">{e.dates}</div>
              </div>
            ))}
          </div>
          <div className="acol-title sr">Speaking</div>
          <div className="sr d1" style={{ marginTop: 20, marginBottom: 56 }}>
            <div className="exp-role">Panel Speaker — Designing in the Age of AI</div>
            <div className="exp-co">Amazon Conflux Design Summit · 2025</div>
            <p style={{ fontSize: 13, color: "var(--txt2)", lineHeight: 1.65, marginTop: 10, maxWidth: 400 }}>Spoke on a panel exploring how AI tools are reshaping product design workflows — covering prototyping with code agents, prompt-driven iteration, and what it means to design when the machine can build.</p>
          </div>
          <div className="acol-title sr">Languages</div>
          <div className="sr d1" style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 10 }}>
            {[{ lang: "English", level: "Native" }, { lang: "Hebrew", level: "Conversational" }].map(l => (
              <div key={l.lang} style={{ display: "flex", gap: 16, alignItems: "center" }}>
                <span style={{ fontSize: 14, fontWeight: 500, color: "var(--txt)" }}>{l.lang}</span>
                <span style={{ fontFamily: "var(--mono)", fontSize: 9, color: "var(--txt3)", letterSpacing: "0.1em", textTransform: "uppercase" }}>{l.level}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="skills-area">
        <div className="sec-label sr">Expertise</div>
        <div className="skills-g sr d1">
          {[
            { t: "Design", items: ["Product Design", "Interaction Design", "UX Frameworks", "Visual Design", "Rapid Prototyping", "Interaction Modeling"] },
            { t: "Strategy", items: ["Product Strategy 0→1", "Product Discovery", "Experimentation", "Stakeholder Alignment", "Product Systems"] },
            { t: "AI Workflows", items: ["AI Prototyping", "Agentic Workflows", "Prompt Design", "Code-Assisted Design"] },
            { t: "Tools", items: ["Figma", "Framer", "Claude Code", "Kiro", "Jira", "Asana"] },
          ].map(col => (
            <div key={col.t} className="skill-col">
              <div className="skill-col-t">{col.t}</div>
              <div className="skill-list">{col.items.map(s => <div key={s} className="skill-i">{s}</div>)}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="outside-area">
        <div className="sec-label sr">Outside Work</div>
        <div className="outside-grid sr d1">
          {[
            { emoji: "🏷️", title: "Thrift & flip", desc: "I've bought second-hand my whole life. I find pieces with good bones, restore what's worth keeping, and move on what isn't. Same eye I bring to design." },
            { emoji: "♻️", title: "Sustainable by default", desc: "Furnishing my entire home second-hand — one intentional find at a time. Nothing fast, nothing disposable. Things that last and look better with age." },
            { emoji: "🛋️", title: "Obsessed with mid-century modern", desc: "MCM gets it right: form follows function, nothing decorative for its own sake. The same principles behind good product design — clarity, purpose, restraint." },
          ].map(i => (
            <div key={i.title} className="int-card">
              <span className="int-emoji">{i.emoji}</span>
              <div className="int-title">{i.title}</div>
              <div className="int-body">{i.desc}</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 40 }}>
          <div className="sec-label sr" style={{ marginBottom: 24 }}>The hunt</div>
          <div className="find-grid sr d1">
            {[
              { em: "🪑", label: "Wassily Chair", status: "Found", found: true },
              { em: "🕐", label: "Sunburst Clock", status: "Found", found: true },
              { em: "🛏️", label: "Hairpin Bed Frame", status: "Found", found: true },
              { em: "💡", label: "Arc Lamp", status: "Hunting", found: false },
            ].map(f => (
              <div key={f.label} className="find-item">
                <span className="find-em">{f.em}</span>
                <div className="find-label">{f.label}</div>
                <div className="find-status" style={{ color: f.found ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.2)" }}>{f.status.toUpperCase()}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer navigate={navigate} />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// APP
// ─────────────────────────────────────────────────────────────
const PROJECTS = [
  {
    id: "hotspots",
    title: "Content Hotspots",
    company: "Amazon · Kindle",
    type: "0→1 Product Design",
    tagline: "A layered reading model that delivers contextual knowledge on demand, without interrupting the act of reading.",
    thumbBg: "linear-gradient(135deg, #1a2744 0%, #0d1a36 100%)",
    thumbIcon: "📖",
    status: "available",
  },
  {
    id: "pinnable",
    title: "Pinnable Content",
    company: "Amazon · Kindle",
    type: "0→1 Product Design",
    tagline: "Redesigning how readers reference content in Kindle — shifting from a linear reading experience to one that supports studying, comparing, and revisiting content in context.",
    thumbBg: "linear-gradient(135deg, #1a3030 0%, #0d2020 100%)",
    thumbIcon: "📌",
    status: "preview",
  },
];

export default function App() {
  const [page, setPage] = useState("home");
  const navigate = useCallback((p) => { setPage(p); window.scrollTo({ top: 0, behavior: "instant" }); }, []);

  return (
    <>
      <StyleSheet />
      <GridBg />
      <Nav page={page} navigate={navigate} projects={PROJECTS} />
      {page === "home"     && <HomePage navigate={navigate} projects={PROJECTS} />}
      {page === "hotspots" && <CaseStudyHotspots navigate={navigate} />}
      {page === "about"    && <AboutPage navigate={navigate} />}
    </>
  );
}
