import { useRef, useState } from 'react'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import './Projects.css'

const PROJECTS = [
  {
    id: 1,
    label: 'Case Study 01',
    title: 'Medallion Architecture · Uriach Group',
    description:
      'End-to-end Medallion pipeline for a multinational pharma company. SAP data ingested via ADF into Bronze, PySpark transforms through Silver, Power BI Direct Lake reports for 200+ users.',
    tags: ['Microsoft Fabric', 'SAP', 'PySpark', 'Power BI', 'Delta Lake', 'Azure'],
    metrics: [
      { label: 'Data sources', value: '4' },
      { label: 'Daily events', value: '50M+' },
      { label: 'Report latency', value: '<1s' },
    ],
    gradient: 'linear-gradient(135deg, #b87333, #7B2FFF)',
    accentColor: '#b87333',
  },
  {
    id: 2,
    label: 'Case Study 02',
    title: 'Power BI Embedded Dashboard Suite',
    description:
      'Row-level security embedded analytics platform serving 500+ concurrent users. Custom visual components, paginated reports, and multi-tenant architecture with Direct Lake mode.',
    tags: ['Power BI Embedded', 'Direct Lake', 'RLS', 'DAX', 'Azure AD B2C'],
    metrics: [
      { label: 'Concurrent users', value: '500+' },
      { label: 'Report types', value: '28' },
      { label: 'Query p95', value: '0.4s' },
    ],
    gradient: 'linear-gradient(135deg, #FFB800, #00F5FF)',
    accentColor: '#FFB800',
  },
  {
    id: 3,
    label: 'Case Study 03',
    title: 'Real-time Pipeline · Databricks',
    description:
      'Streaming data pipeline processing Salesforce and Odoo events in near real-time. Delta Live Tables with schema evolution, automated data quality assertions, and SLA monitoring.',
    tags: ['Databricks', 'Delta Live Tables', 'Salesforce', 'Odoo', 'Kafka', 'PySpark'],
    metrics: [
      { label: 'Event latency', value: '<5s' },
      { label: 'Tables managed', value: '120+' },
      { label: 'Uptime SLA', value: '99.9%' },
    ],
    gradient: 'linear-gradient(135deg, #00F5FF, #7B2FFF)',
    accentColor: '#00F5FF',
  },
]

function ProjectCard({ project, index, visible }) {
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
      data-cursor-hover
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
      </div>
    </div>
  )
}

export default function Projects() {
  const { ref, visible } = useScrollReveal(0.1)

  return (
    <section id="projects" className="projects">
      <div className="section-inner" ref={ref}>
        <div className={`reveal-group${visible ? ' visible' : ''}`}>
          <p className="section-tag">04 · Projects</p>
          <h2 className="section-title">
            Featured <span>Work</span>
          </h2>
          <p className="section-desc">
            Enterprise-scale data engineering projects driving real business impact.
            Hover each card to explore.
          </p>
        </div>

        <div className="projects-grid">
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} visible={visible} />
          ))}
        </div>
      </div>
    </section>
  )
}
