import './Logo.css'

// DFG monogram: a delta (Δ) outline with a solid forged core, followed by
// the initials. Colors come from theme variables so it works in both themes.
export function DFGMark({ size = 26 }) {
  return (
    <svg
      className="dfg-mark"
      width={size}
      height={size}
      viewBox="0 0 32 32"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M16 3.5 L29 27 H3 Z"
        fill="none"
        stroke="var(--cyan)"
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
      <path d="M16 13 L21.4 22.5 H10.6 Z" fill="var(--cyan)" opacity="0.85" />
    </svg>
  )
}

export default function Logo({ size = 26, showName = false }) {
  return (
    <span className="dfg-logo">
      <DFGMark size={size} />
      <span className="dfg-initials">DFG</span>
      {showName && <span className="dfg-name">DeltaForge Gold</span>}
    </span>
  )
}
