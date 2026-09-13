import { useMemo, useState } from 'react'
import fabricIconUrl from '../../assets/icons/fabric/fabric_48_color.svg'
import dataFactoryIconUrl from '../../assets/icons/fabric/data_factory_48_color.svg'
import notebookIconUrl from '../../assets/icons/fabric/notebook_48_item.svg'
import pipelineIconUrl from '../../assets/icons/fabric/pipeline_48_item.svg'
import powerBiIconUrl from '../../assets/icons/fabric/power_bi_48_color.svg'
import { useLanguage } from '../../context/LanguageContext'
import './MedallionScene3D.css'

// Flow-duration per speed step, in seconds per lap (smaller = faster).
const SPEED_STEPS = [
  { key: 'slow', duration: 2.4 },
  { key: 'normal', duration: 1.4 },
  { key: 'fast', duration: 0.7 },
]

// Data-format / transform captions shown on each connector, source → dashboard.
// These are fixed technical vocabulary (same rule as `layers`), not translated.
const CONNECTOR_FORMATS = ['Batch / CDC', 'Delta init', 'PySpark clean', 'Agg · DAX', 'Direct Lake']

function RackIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round">
      <rect x="4" y="3" width="16" height="6" rx="1" />
      <rect x="4" y="10" width="16" height="6" rx="1" />
      <rect x="4" y="17" width="16" height="4" rx="1" />
      <circle cx="7" cy="6" r="0.6" fill="currentColor" stroke="none" />
      <circle cx="7" cy="13" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  )
}

function DbCylinder({ color }) {
  return (
    <div className="flow-cyl-wrap">
      <div className="flow-cyl" style={{ '--node-color': color }}>
        <div className="flow-cyl-bottom" />
        <div className="flow-cyl-body" />
        <div className="flow-cyl-ridge" style={{ top: '17px' }} />
        <div className="flow-cyl-ridge" style={{ top: '32px' }} />
        <div className="flow-cyl-top" />
      </div>
    </div>
  )
}

function Connector({ fromColor, toColor, format }) {
  return (
    <div
      className="flow-connector"
      style={{ '--c-from': fromColor, '--c-to': toColor }}
    >
      <span className="flow-format">{format}</span>
      <span className="flow-dot" style={{ animationDelay: '0s' }} />
      <span className="flow-dot" style={{ animationDelay: 'calc(var(--flow-duration, 1.3s) * -0.33)' }} />
      <span className="flow-dot" style={{ animationDelay: 'calc(var(--flow-duration, 1.3s) * -0.66)' }} />
    </div>
  )
}

export default function MedallionScene3D({ layers }) {
  const [selectedId, setSelectedId] = useState(null)
  const [paused, setPaused] = useState(false)
  const [speedIndex, setSpeedIndex] = useState(1)
  const { lang, t } = useLanguage()

  const dateLabel = useMemo(
    () => new Date().toLocaleDateString(lang === 'es' ? 'es-ES' : 'en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
    [lang]
  )

  const selectedLayer = layers.find(l => l.id === selectedId) ?? null

  const handleReset = () => {
    setSelectedId(null)
    setPaused(false)
    setSpeedIndex(1)
  }

  // Source + <real layers, incl. Landing> + Dashboard, in display order.
  const nodes = [
    { id: 'source', kind: 'icon', color: 'var(--azure)', icon: dataFactoryIconUrl, title: 'AZURE DATA FACTORY', sub: 'SAP · Salesforce · Odoo · Zinc' },
    ...layers.map(l => ({
      id: l.id,
      kind: 'db',
      color: l.color,
      title: l.label,
      sub: l.subtitle,
      hasRack: l.id === 'landing',
      hasNotebook: l.id !== 'landing',
    })),
    { id: 'dashboard', kind: 'screen', color: 'var(--pbi)', icon: powerBiIconUrl, title: 'DASHBOARD', sub: 'Power BI Reports' },
  ]

  const diagramStyle = {
    '--flow-duration': `${SPEED_STEPS[speedIndex].duration}s`,
    '--flow-play': paused ? 'paused' : 'running',
  }

  return (
    <div className="scene3d-wrap">
      <div className="scene3d-canvas-area">
        <div className="flow-diagram" style={diagramStyle}>
          <div className="pipeline-badge">
            <img src={pipelineIconUrl} alt="" />
            <span>Pipeline · ETL Orchestration</span>
          </div>
          <div className="fabric-mark">
            <img src={fabricIconUrl} alt="Microsoft Fabric" />
          </div>
          <div className="fabric-caption">Microsoft Fabric · OneLake</div>
          <div className="fabric-governance">RBAC · Purview Governance</div>

          <div className="node-row">
            {nodes.map((n, i) => (
              <div key={n.id} style={{ display: 'contents' }}>
                {i > 0 && (
                  <Connector
                    fromColor={nodes[i - 1].color}
                    toColor={n.color}
                    format={CONNECTOR_FORMATS[i - 1]}
                  />
                )}
                <div
                  className={`flow-node${selectedId === n.id ? ' is-selected' : ''}`}
                  style={{ '--node-color': n.color, '--node-glow': `color-mix(in srgb, ${n.color} 45%, transparent)` }}
                >
                  {n.kind === 'icon' && (
                    <div className="flow-icon-badge">
                      <img src={n.icon} alt="" />
                    </div>
                  )}

                  {n.kind === 'db' && <DbCylinder color={n.color} />}

                  {n.kind === 'screen' && (
                    <div className="flow-screen-wrap">
                      <div className="flow-screen">
                        <div className="flow-screen-inner">
                          <img src={n.icon} alt="" />
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flow-node-footer">
                    <div className="flow-node-label">
                      <div className="flow-node-title">{n.title}</div>
                      <div className="flow-node-sub">{n.sub}</div>
                    </div>

                    {n.hasRack && (
                      <>
                        <div className="flow-rack" title="ADLS Gen2 landing containers"><RackIcon /></div>
                        <div className="flow-substorage">ADLS Gen2</div>
                      </>
                    )}
                    {n.hasNotebook && (
                      <>
                        <div className="flow-notebook">
                          <img src={notebookIconUrl} alt="" />
                        </div>
                        <div className="flow-substorage">OneLake</div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <aside className="scene3d-hud">
        <div className="hud-header">
          <span className="hud-title">{t.medallionHud.title}</span>
          <span className="hud-date">{dateLabel}</span>
        </div>

        <div className="hud-panel">
          <span className="hud-panel-title">{t.medallionHud.serviceStatus}</span>
          <ul className="hud-status-list">
            {t.medallionHud.serviceStatusItems.map(s => (
              <li key={s.name}>
                <span className={`hud-status-dot status-${s.statusKey}`} />
                {s.name}
                <span className="hud-status-value">{s.status}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="hud-panel">
          <span className="hud-panel-title">{t.medallionHud.vendor}</span>
          <div className="hud-vendor-chips">
            <span className="hud-vendor-chip" style={{ '--vendor-color': 'var(--azure)' }}>Azure</span>
            <span className="hud-vendor-chip" style={{ '--vendor-color': 'var(--fabric)' }}>Fabric</span>
            <span className="hud-vendor-chip" style={{ '--vendor-color': 'var(--pbi)' }}>Power BI</span>
          </div>
        </div>

        <div className="hud-panel">
          <span className="hud-panel-title">{t.medallionHud.layerMetadata}</span>
          <div className="hud-pills">
            {layers.map(l => (
              <button
                key={l.id}
                className={`hud-pill${selectedId === l.id ? ' active' : ''}`}
                style={{ '--pill-color': l.color }}
                onClick={() => setSelectedId(id => (id === l.id ? null : l.id))}
              >
                {l.label}
              </button>
            ))}
          </div>

          {selectedLayer && (
            <div className="hud-selected" style={{ '--pill-color': selectedLayer.color }}>
              <span className="hud-selected-title">{t.medallionHud.selected(selectedLayer.label)}</span>
              <dl className="hud-selected-meta">
                <div><dt>{t.medallionHud.dataFormat}</dt><dd>{selectedLayer.dataFormat}</dd></div>
                <div><dt>{t.medallionHud.storage}</dt><dd>{selectedLayer.storage}</dd></div>
                <div><dt>{t.medallionHud.transform}</dt><dd>{selectedLayer.transform}</dd></div>
                <div><dt>{t.medallionHud.status}</dt><dd>{selectedLayer.status}</dd></div>
              </dl>
            </div>
          )}
        </div>

        <div className="hud-panel">
          <span className="hud-panel-title">{t.medallionHud.controls}</span>
          <div className="hud-controls">
            <button className="hud-btn" onClick={handleReset}>{t.medallionHud.resetView}</button>
            <button className="hud-btn" onClick={() => setPaused(p => !p)}>
              {t.medallionHud.toggleFlow(paused)}
            </button>
            <button className="hud-btn" onClick={() => setSpeedIndex(i => (i + 1) % SPEED_STEPS.length)}>
              {t.medallionHud.speed(t.medallionHud.speedLabels[SPEED_STEPS[speedIndex].key])}
            </button>
          </div>
        </div>
      </aside>
    </div>
  )
}
