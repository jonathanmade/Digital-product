import { useScrollReveal } from '../../hooks/useScrollReveal'
import './TrustBar.css'

const STACK = [
  'Microsoft Fabric',
  'Power BI',
  'Databricks',
  'PySpark',
  'Delta Lake',
  'Azure Data Factory',
  'Python',
  'SQL',
  'Azure',
]

export default function TrustBar() {
  const { ref, visible } = useScrollReveal(0.1)

  return (
    <section id="trust" className="trust-bar">
      <div className={`section-inner trust-inner${visible ? ' visible' : ''}`} ref={ref}>
        <span className="trust-label">Built with</span>
        <div className="trust-chips">
          {STACK.map(t => (
            <span key={t} className="trust-chip">{t}</span>
          ))}
        </div>
      </div>
    </section>
  )
}
