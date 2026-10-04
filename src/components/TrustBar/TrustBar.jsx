import { useScrollReveal } from '../../hooks/useScrollReveal'
import { useLanguage } from '../../context/LanguageContext'
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
  const { t } = useLanguage()

  return (
    <section id="trust" className="trust-bar">
      <div className={`section-inner trust-inner${visible ? ' visible' : ''}`} ref={ref}>
        <span className="trust-label">{t.trustBar.label}</span>
        <div className="trust-chips">
          {STACK.map(item => (
            <span key={item} className="trust-chip">{item}</span>
          ))}
        </div>
      </div>
    </section>
  )
}
