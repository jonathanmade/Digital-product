import { useRef, useState, useEffect } from 'react'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import './MedallionArchitecture.css'

const LAYERS = [
  {
    id: 'bronze',
    color: '#b87333',
    glow: 'rgba(184,115,51,0.4)',
    dim: 'rgba(184,115,51,0.08)',
    label: 'BRONZE LAYER',
    emoji: '🥉',
    subtitle: 'Raw Ingestion',
    description: 'Unprocessed data as-is from enterprise systems. Schema-on-read, full history preserved, no transformations applied.',
    nodes: ['SAP ERP', 'Salesforce CRM', 'Odoo ERP', 'Zinc WMS'],
    tech: ['Azure Data Factory', 'Event Hubs', 'ADLS Gen2', 'Delta Lake'],
  },
  {
    id: 'silver',
    color: '#C0C0C0',
    glow: 'rgba(192,192,192,0.4)',
    dim: 'rgba(192,192,192,0.06)',
    label: 'SILVER LAYER',
    emoji: '🥈',
    subtitle: 'Cleanse & Validate',
    description: 'Cleaned, deduplicated and standardized data. Business rules enforced, schema-on-write, referential integrity validated.',
    nodes: ['PySpark Jobs', 'Delta Live Tables', 'Data Quality', 'Deduplication'],
    tech: ['Databricks', 'PySpark', 'Delta Lake', 'Great Expectations'],
  },
  {
    id: 'gold',
    color: '#FFB800',
    glow: 'rgba(255,184,0,0.4)',
    dim: 'rgba(255,184,0,0.08)',
    label: 'GOLD LAYER',
    emoji: '🥇',
    subtitle: 'Business Ready',
    description: 'Aggregated, optimized semantic models. Direct Lake mode for Power BI — sub-second query response on millions of rows.',
    nodes: ['Power BI Embedded', 'Direct Lake Mode', 'Semantic Models', 'KPI Dashboards'],
    tech: ['Microsoft Fabric', 'Power BI', 'DAX', 'Direct Lake'],
  },
]

const FLOW_PATHS = [
  { id: 'flow-1', color: '#b87333' },
  { id: 'flow-2', color: '#C0C0C0' },
]

export default function MedallionArchitecture() {
  const { ref, visible } = useScrollReveal(0.1)
  const [activeLayer, setActiveLayer] = useState(null)
  const [animKey, setAnimKey] = useState(0)

  useEffect(() => {
    if (visible) {
      const t = setInterval(() => setAnimKey(k => k + 1), 3000)
      return () => clearInterval(t)
    }
  }, [visible])

  return (
    <section id="architecture" className="medallion">
      <div className="section-inner" ref={ref}>
        <div className={`medallion-header reveal-group${visible ? ' visible' : ''}`}>
          <p className="section-tag">02 · Architecture</p>
          <h2 className="section-title">
            Medallion <span>Architecture</span>
          </h2>
          <p className="section-desc">
            Enterprise-scale data pipeline processing millions of events daily.
            Bronze → Silver → Gold — from raw ingestion to Power BI Direct Lake.
          </p>
        </div>

        <div className={`medallion-diagram${visible ? ' visible' : ''}`}>

          {/* Flow connector lines */}
          <div className="flow-connectors">
            <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <marker id="arrow-bronze" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
                  <path d="M0,0 L6,3 L0,6 Z" fill="#b87333" />
                </marker>
                <marker id="arrow-silver" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
                  <path d="M0,0 L6,3 L0,6 Z" fill="#C0C0C0" />
                </marker>
                <filter id="glow-b">
                  <feGaussianBlur stdDeviation="1.5" result="blur" />
                  <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
                </filter>
              </defs>

              {/* Bronze to Silver connector */}
              <path
                key={`flow1-${animKey}`}
                d="M 50 33 L 50 39"
                stroke="#b87333"
                strokeWidth="0.6"
                fill="none"
                strokeDasharray="8 3"
                markerEnd="url(#arrow-bronze)"
                filter="url(#glow-b)"
                className="flow-path"
              />
              {/* Silver to Gold connector */}
              <path
                key={`flow2-${animKey}`}
                d="M 50 65 L 50 71"
                stroke="#C0C0C0"
                strokeWidth="0.6"
                fill="none"
                strokeDasharray="8 3"
                markerEnd="url(#arrow-silver)"
                className="flow-path"
                style={{ animationDelay: '0.5s' }}
              />
            </svg>
          </div>

          {LAYERS.map((layer, i) => (
            <div
              key={layer.id}
              className={`layer-card layer-${layer.id}${activeLayer === layer.id ? ' active' : ''}${visible ? ' visible' : ''}`}
              style={{ animationDelay: `${i * 0.2}s`, '--layer-color': layer.color, '--layer-glow': layer.glow, '--layer-dim': layer.dim }}
              onMouseEnter={() => setActiveLayer(layer.id)}
              onMouseLeave={() => setActiveLayer(null)}
              data-cursor-hover
            >
              <div className="layer-header">
                <div className="layer-indicator">
                  <div className="layer-dot-outer">
                    <div className="layer-dot-inner" />
                  </div>
                </div>
                <div className="layer-title-group">
                  <span className="layer-emoji">{layer.emoji}</span>
                  <div>
                    <div className="layer-label">{layer.label}</div>
                    <div className="layer-subtitle">{layer.subtitle}</div>
                  </div>
                </div>
                <div className="layer-expand-icon">{activeLayer === layer.id ? '−' : '+'}</div>
              </div>

              <div className="layer-body">
                <p className="layer-desc-text">{layer.description}</p>
                <div className="layer-nodes">
                  <span className="nodes-label">Sources / Outputs</span>
                  <div className="nodes-list">
                    {layer.nodes.map(n => (
                      <span key={n} className="node-tag">{n}</span>
                    ))}
                  </div>
                </div>
                <div className="layer-tech">
                  <span className="nodes-label">Technologies</span>
                  <div className="nodes-list">
                    {layer.tech.map(t => (
                      <span key={t} className="tech-tag">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats row */}
        <div className={`arch-stats${visible ? ' visible' : ''}`}>
          {[
            { value: '4+', label: 'Data Sources', color: 'var(--bronze)' },
            { value: '50M+', label: 'Events / Day', color: 'var(--silver)' },
            { value: '<1s', label: 'Query Latency', color: 'var(--gold)' },
            { value: '99.9%', label: 'Pipeline SLA', color: 'var(--cyan)' },
          ].map((s, i) => (
            <div key={s.label} className="arch-stat" style={{ '--stat-color': s.color, animationDelay: `${i * 0.1 + 0.5}s` }}>
              <div className="stat-value">{s.value}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
