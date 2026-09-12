import { useScrollReveal } from '../../hooks/useScrollReveal'
import { useLanguage } from '../../context/LanguageContext'
import './AISection.css'

function RetrievalIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="M20 20l-4.8-4.8" />
    </svg>
  )
}

function AgentIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="8" width="16" height="11" rx="2" />
      <path d="M12 8V4M9 4h6" />
      <circle cx="9" cy="13.5" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="15" cy="13.5" r="1.2" fill="currentColor" stroke="none" />
      <path d="M9 17h6" />
    </svg>
  )
}

function DeliveryIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 6l8-3 8 3v6c0 5-3.4 8.4-8 9-4.6-.6-8-4-8-9V6z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  )
}

function AzureIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 4h4l-5 11h7l-9 6 3-8H5l4-9z" />
    </svg>
  )
}

const ICONS = [RetrievalIcon, AgentIcon, DeliveryIcon, AzureIcon]

export default function AISection() {
  const { ref, visible } = useScrollReveal(0.1)
  const { t } = useLanguage()

  return (
    <section id="ai" className="ai-section">
      <div className="section-inner" ref={ref}>
        <div className={`reveal-group${visible ? ' visible' : ''}`}>
          <p className="section-tag">{t.ai.eyebrow}</p>
          <h2 className="section-title">
            {t.ai.titlePre}<span>{t.ai.titleHighlight}</span>{t.ai.titlePost}
          </h2>
          <p className="section-desc">
            {t.ai.desc}
          </p>
        </div>

        <div className="ai-grid">
          {t.ai.capabilities.map((c, i) => {
            const Icon = ICONS[i]
            return (
              <div key={c.title} className={`ai-card${visible ? ' visible' : ''}`} style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="ai-icon"><Icon /></div>
                <h3 className="ai-card-title">{c.title}</h3>
                <p className="ai-card-desc">{c.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
