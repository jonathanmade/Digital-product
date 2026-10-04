import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import { useLanguage } from '../../context/LanguageContext'
import './Work.css'

// Non-translatable per-card data (tech names, slugs, colors) kept local,
// matched by index with the translated copy in the language dictionaries.
const CARD_META = [
  {
    slug: 'pharma-medallion-fabric',
    tags: ['Microsoft Fabric', 'SAP', 'PySpark', 'Power BI', 'Delta Lake', 'Azure'],
    gradient: 'linear-gradient(135deg, var(--cyan), rgba(var(--cyan-rgb), 0.3))',
    accentColor: 'var(--cyan)',
  },
  {
    slug: 'powerbi-embedded-pharmacy',
    tags: ['Power BI Embedded', 'RLS', 'Node.js', 'Entra ID', 'DAX'],
    gradient: 'linear-gradient(135deg, var(--cyan), rgba(var(--cyan-rgb), 0.3))',
    accentColor: 'var(--cyan)',
  },
  {
    tags: ['Databricks', 'Delta Live Tables', 'Salesforce', 'Odoo', 'Kafka', 'PySpark'],
    gradient: 'linear-gradient(135deg, var(--cyan), rgba(var(--cyan-rgb), 0.3))',
    accentColor: 'var(--cyan)',
  },
]

const AI_PLACEHOLDER_TAGS = ['RAG', 'Azure AI', 'Agents']

function CaseStudyCard({ project, index, visible }) {
  const cardRef = useRef(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [hovered, setHovered] = useState(false)

  const onMove = (e) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 12
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -12
    setTilt({ x, y })
  }

  return (
    <div
      ref={cardRef}
      className={`project-card${visible ? ' visible' : ''}${hovered ? ' hovered' : ''}`}
      style={{
        '--project-color': project.accentColor,
        '--gradient': project.gradient,
        transform: hovered ? `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg) translateY(-6px)` : 'none',
        animationDelay: `${index * 0.15}s`,
      }}
      onMouseMove={onMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setTilt({ x: 0, y: 0 }) }}
    >
      <div className="card-gradient-border" />
      <div className="card-inner">
        <div className="card-header">
          <span className="card-label">{project.label}</span>
          <div className="card-dot" />
        </div>
        <h3 className="card-title">{project.title}</h3>
        <p className="card-desc">{project.description}</p>

        <div className="card-metrics">
          {project.metrics.map(m => (
            <div key={m.label} className="metric">
              <div className="metric-value">{m.value}</div>
              <div className="metric-label">{m.label}</div>
            </div>
          ))}
        </div>

        <div className="card-tags">
          {project.tags.map(t => (
            <span key={t} className="p-tag">{t}</span>
          ))}
        </div>

        {project.slug ? (
          <Link to={`/case-studies/${project.slug}`} className="view-more-link">
            {project.viewMore}
          </Link>
        ) : (
          <span className="view-more-link disabled">{project.comingSoon}</span>
        )}
      </div>
    </div>
  )
}

function AIPlaceholderCard({ project, index, visible }) {
  return (
    <div
      className={`project-card ai-placeholder-card${visible ? ' visible' : ''}`}
      style={{ animationDelay: `${index * 0.15}s` }}
    >
      <div className="card-inner">
        <div className="card-header">
          <span className="card-label">{project.label}</span>
          <span className="pending-badge">{project.badge}</span>
        </div>
        <h3 className="card-title">{project.title}</h3>
        <p className="card-desc">{project.description}</p>
        <div className="card-tags">
          {project.tags.map(t => (
            <span key={t} className="p-tag">{t}</span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Work() {
  const { ref, visible } = useScrollReveal(0.1)
  const { t } = useLanguage()

  const caseStudies = t.work.cards.map((card, i) => ({
    ...card,
    ...CARD_META[i],
    label: t.work.caseStudyLabel(String(i + 1).padStart(2, '0')),
    viewMore: t.work.viewMore,
    comingSoon: t.work.comingSoon,
  }))

  const aiPlaceholder = {
    ...t.work.aiPlaceholder,
    label: t.work.caseStudyLabel(String(caseStudies.length + 1).padStart(2, '0')),
    tags: AI_PLACEHOLDER_TAGS,
  }

  return (
    <section id="work" className="projects">
      <div className="section-inner" ref={ref}>
        <div className={`reveal-group${visible ? ' visible' : ''}`}>
          <p className="section-tag">{t.work.eyebrow}</p>
          <h2 className="section-title">
            {t.work.titlePre}<span>{t.work.titleHighlight}</span>{t.work.titlePost}
          </h2>
          <p className="section-desc">
            {t.work.desc}
          </p>
        </div>

        <div className="projects-grid">
          {caseStudies.map((p, i) => (
            <CaseStudyCard key={p.slug ?? p.title} project={p} index={i} visible={visible} />
          ))}
          <AIPlaceholderCard project={aiPlaceholder} index={caseStudies.length} visible={visible} />
        </div>
      </div>
    </section>
  )
}
