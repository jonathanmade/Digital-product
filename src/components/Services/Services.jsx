import { useScrollReveal } from '../../hooks/useScrollReveal'
import { useLanguage } from '../../context/LanguageContext'
import './Services.css'

function PipelineIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="5" rx="8" ry="3" />
      <path d="M4 5v6c0 1.66 3.58 3 8 3s8-1.34 8-3V5" />
      <path d="M4 11v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6" />
    </svg>
  )
}

function DashboardIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M8 17V11M12 17V7M16 17v-4" />
    </svg>
  )
}

function AIIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" />
    </svg>
  )
}

const ICONS = [PipelineIcon, DashboardIcon, AIIcon]

function ServiceCard({ service, icon: Icon, index, visible }) {
  return (
    <div className={`service-card${visible ? ' visible' : ''}`} style={{ animationDelay: `${index * 0.12}s` }}>
      <div className="service-icon"><Icon /></div>
      <h3 className="service-title">{service.title}</h3>
      <p className="service-desc">{service.description}</p>
      <ul className="service-bullets">
        {service.bullets.map(b => <li key={b}>{b}</li>)}
      </ul>
      <span className="service-tag">{service.engagement}</span>
    </div>
  )
}

export default function Services() {
  const { ref, visible } = useScrollReveal(0.1)
  const { t } = useLanguage()

  return (
    <section id="services" className="services">
      <div className="section-inner" ref={ref}>
        <div className={`reveal-group${visible ? ' visible' : ''}`}>
          <p className="section-tag">{t.services.eyebrow}</p>
          <h2 className="section-title">
            {t.services.titlePre}<span>{t.services.titleHighlight}</span>{t.services.titlePost}
          </h2>
          <p className="section-desc">
            {t.services.desc}
          </p>
        </div>

        <div className="services-grid">
          {t.services.cards.map((s, i) => (
            <ServiceCard key={s.title} service={s} icon={ICONS[i]} index={i} visible={visible} />
          ))}
        </div>
      </div>
    </section>
  )
}
