export default function VP({ label, desc, height = 280 }) {
  return (
    <div className="visual-placeholder" style={{ minHeight: height }}>
      <span className="vp-label">[ Visual: {label} ]</span>
      <p className="vp-desc">{desc}</p>
    </div>
  )
}
