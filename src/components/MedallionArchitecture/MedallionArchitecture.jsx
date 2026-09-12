import { useState, useEffect } from 'react'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import { useLanguage } from '../../context/LanguageContext'
import './MedallionArchitecture.css'

function BronzeIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="6" rx="8" ry="3" />
      <path d="M4 6v6c0 1.66 3.58 3 8 3s8-1.34 8-3V6" />
      <path d="M4 12v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6" />
    </svg>
  )
}

function SilverIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 4h18l-7 9v6l-4 2v-8L3 4z" />
    </svg>
  )
}

function GoldIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 20V13M10 20V7M16 20V11M22 20V4" />
      <path d="M2 20h20" />
    </svg>
  )
}

// Non-translatable per-layer data (colors, icons, technology/source names)
// kept local, matched by id with the translated copy in the dictionaries.
const LAYER_META = {
  bronze: {
    color: 'var(--bronze)',
    glow: 'rgba(var(--bronze-rgb), 0.4)',
    dim: 'rgba(var(--bronze-rgb), 0.08)',
    icon: BronzeIcon,
    nodes: ['SAP ERP', 'Salesforce CRM', 'Odoo ERP', 'Zinc WMS'],
    tech: ['Azure Data Factory', 'Event Hubs', 'ADLS Gen2', 'Delta Lake'],
  },
  silver: {
    color: 'var(--silver)',
    glow: 'rgba(var(--silver-rgb), 0.4)',
    dim: 'rgba(var(--silver-rgb), 0.06)',
    icon: SilverIcon,
    nodes: ['PySpark Jobs', 'Delta Live Tables', 'Data Quality', 'Deduplication'],
    tech: ['Databricks', 'PySpark', 'Delta Lake', 'Great Expectations'],
  },
  gold: {
    color: 'var(--gold)',
    glow: 'rgba(var(--gold-rgb), 0.4)',
    dim: 'rgba(var(--gold-rgb), 0.08)',
    icon: GoldIcon,
    nodes: ['Power BI Embedded', 'Direct Lake Mode', 'Semantic Models', 'KPI Dashboards'],
    tech: ['Microsoft Fabric', 'Power BI', 'DAX', 'Direct Lake'],
  },
}

export default function MedallionArchitecture() {
  const { ref, visible } = useScrollReveal(0.1)
  const { t } = useLanguage()
  const [activeLayer, setActiveLayer] = useState(null)
  const [animKey, setAnimKey] = useState(0)

  const layers = t.medallion.layers.map(layer => ({ ...layer, ...LAYER_META[layer.id] }))

  useEffect(() => {
    if (visible) {
      const timer = setInterval(() => setAnimKey(k => k + 1), 3000)
      return () => clearInterval(timer)
    }
  }, [visible])

  return (
    <section id="architecture" className="medallion">
      <div className="section-inner" ref={ref}>
        <div className={`medallion-header reveal-group${visible ? ' visible' : ''}`}>
          <p className="section-tag">{t.medallion.eyebrow}</p>
          <h2 className="section-title">
            {t.medallion.titlePre}<span>{t.medallion.titleHighlight}</span>{t.medallion.titlePost}
          </h2>
          <p className="section-desc">
            {t.medallion.desc}
          </p>
        </div>

        <div className={`medallion-diagram${visible ? ' visible' : ''}`}>

          {/* Flow connector lines */}
          <div className="flow-connectors">
            <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <marker id="arrow-bronze" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
                  <path d="M0,0 L6,3 L0,6 Z" fill={layers[0].color} />
                </marker>
                <marker id="arrow-silver" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
                  <path d="M0,0 L6,3 L0,6 Z" fill={layers[1].color} />
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
                stroke={layers[0].color}
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
                stroke={layers[1].color}
                strokeWidth="0.6"
                fill="none"
                strokeDasharray="8 3"
                markerEnd="url(#arrow-silver)"
                className="flow-path"
                style={{ animationDelay: '0.5s' }}
              />
            </svg>
          </div>

          {layers.map((layer, i) => (
            <div
              key={layer.id}
              className={`layer-card layer-${layer.id}${activeLayer === layer.id ? ' active' : ''}${visible ? ' visible' : ''}`}
              style={{ animationDelay: `${i * 0.2}s`, '--layer-color': layer.color, '--layer-glow': layer.glow, '--layer-dim': layer.dim }}
              onMouseEnter={() => setActiveLayer(layer.id)}
              onMouseLeave={() => setActiveLayer(null)}
            >
              <div className="layer-header">
                <div className="layer-indicator">
                  <div className="layer-dot-outer">
                    <div className="layer-dot-inner" />
                  </div>
                </div>
                <div className="layer-title-group">
                  <span className="layer-icon"><layer.icon /></span>
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
                  <span className="nodes-label">{t.medallion.sourcesOutputs}</span>
                  <div className="nodes-list">
                    {layer.nodes.map(n => (
                      <span key={n} className="node-tag">{n}</span>
                    ))}
                  </div>
                </div>
                <div className="layer-tech">
                  <span className="nodes-label">{t.medallion.technologies}</span>
                  <div className="nodes-list">
                    {layer.tech.map(tech => (
                      <span key={tech} className="tech-tag">{tech}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats row */}
        <div className={`arch-stats${visible ? ' visible' : ''}`}>
          {t.medallion.stats.map((s, i) => (
            <div
              key={s.label}
              className="arch-stat"
              style={{ '--stat-color': ['var(--bronze)', 'var(--silver)', 'var(--gold)', 'var(--cyan)'][i], animationDelay: `${i * 0.1 + 0.5}s` }}
            >
              <div className="stat-value">{s.value}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
