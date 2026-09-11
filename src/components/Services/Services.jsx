import { useScrollReveal } from '../../hooks/useScrollReveal'
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

const SERVICES = [
  {
    icon: PipelineIcon,
    title: 'Data Engineering & Architecture',
    description:
      'Enterprise-scale pipelines built on Medallion Architecture — from raw ingestion across your source systems to governed, business-ready data.',
    bullets: [
      'Bronze/Silver/Gold pipeline design (Databricks, PySpark, Delta Lake)',
      'Enterprise source integration — SAP, Salesforce, Odoo, Zinc',
      'Data quality, governance, and SLA-backed pipelines',
      'Azure-native architecture (ADF, ADLS Gen2, Event Hubs)',
    ],
    engagement: 'Engagement: 6–12 weeks · fixed scope or embedded',
  },
  {
    icon: DashboardIcon,
    title: 'BI & Data Architecture',
    description:
      'Power BI Embedded and Direct Lake solutions that scale to hundreds of concurrent users without sacrificing query performance.',
    bullets: [
      'Power BI Embedded with row-level security',
      'Direct Lake semantic models for sub-second queries',
      'DAX modeling & paginated reports',
      'Multi-tenant analytics architecture',
    ],
    engagement: 'Engagement: 4–8 weeks · dashboard suite or platform',
  },
  {
    icon: AIIcon,
    title: 'AI-Powered Applications',
    description:
      'End-to-end AI applications built on solid data foundations — production systems that plug into your existing data estate, not prototypes.',
    bullets: [
      'Retrieval over your own governed data (RAG on the Gold layer)',
      'Internal agents for operational workflows',
      'End-to-end delivery: data, backend, and UI',
      'Native integration with Azure AI services',
    ],
    engagement: 'Engagement: scoped pilot → production rollout',
  },
]

function ServiceCard({ service, index, visible }) {
  const Icon = service.icon
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

  return (
    <section id="services" className="services">
      <div className="section-inner" ref={ref}>
        <div className={`reveal-group${visible ? ' visible' : ''}`}>
          <p className="section-tag">Services</p>
          <h2 className="section-title">
            Where I <span>add value</span>
          </h2>
          <p className="section-desc">
            Three ways to engage — from enterprise pipelines to the AI layer built on top of them.
          </p>
        </div>

        <div className="services-grid">
          {SERVICES.map((s, i) => (
            <ServiceCard key={s.title} service={s} index={i} visible={visible} />
          ))}
        </div>
      </div>
    </section>
  )
}
