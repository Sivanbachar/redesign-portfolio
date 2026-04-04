import { useState } from 'react'

// The logo has 4 distinct paths that each fly outward on hover,
// while a home icon cross-fades in.
export default function LogoMark({ onClick }) {
  const [hovered, setHovered] = useState(false)

  return (
    <button
      className={`nav-logo logo-mark${hovered ? ' lm-hovered' : ''}`}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label="Home"
    >
      {/* Original SB monogram — 4 paths that disperse on hover */}
      <svg
        width="24" height="24"
        viewBox="0 0 228 226"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="lm-logo-svg"
        aria-hidden="true"
      >
        {/* bottom-left → flies down-left */}
        <path
          className="lm-p lm-p1"
          d="M116 171C116 171 116 171 66.4628 171C16.9256 171 5 171 5 171C5 201.376 29.8482 226 60.5 226C91.1518 226 116 201.376 116 171Z"
          fill="white"
        />
        {/* top-left → flies up-left */}
        <path
          className="lm-p lm-p2"
          d="M116.75 0.000976562C85.1086 0.135665 59.5 25.827 59.5 57.5C59.5 89.173 85.1086 114.863 116.75 114.998C116.667 114.998 116.583 115 116.5 115H57.5C25.7436 115 0 89.2564 0 57.5C0 25.7436 25.7436 3.2213e-07 57.5 0H116.5C116.583 8.45745e-10 116.667 0.000622011 116.75 0.000976562Z"
          fill="white"
        />
        {/* bottom-right → flies down-right */}
        <path
          className="lm-p lm-p3"
          d="M111.25 111.001C142.891 111.136 168.5 136.827 168.5 168.5C168.5 200.173 142.891 225.863 111.25 225.998C111.333 225.998 111.417 226 111.5 226H170.5C202.256 226 228 200.256 228 168.5C228 136.744 202.256 111 170.5 111H111.5C111.417 111 111.333 111.001 111.25 111.001Z"
          fill="white"
        />
        {/* top-right → flies up-right */}
        <path
          className="lm-p lm-p4"
          d="M228 58C228 58 228 58 178.463 58C128.926 58 117 58 117 58C117 27.6243 141.848 3 172.5 3C203.152 3 228 27.6243 228 58Z"
          fill="white"
        />
      </svg>

      {/* Home icon — fades in as logo disperses */}
      <svg
        width="24" height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="lm-home-svg"
        aria-hidden="true"
      >
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" fill="white" />
      </svg>
    </button>
  )
}
