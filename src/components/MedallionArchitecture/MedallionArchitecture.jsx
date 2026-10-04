import { useScrollReveal } from '../../hooks/useScrollReveal'
import { useLanguage } from '../../context/LanguageContext'
import pipelineIcon from '../../assets/icons/fabric/pipeline_48_item.svg'
import copyIcon from '../../assets/icons/fabric/copy_job_48_item.svg'
import notebookIcon from '../../assets/icons/fabric/notebook_48_item.svg'
import lakehouseIcon from '../../assets/icons/fabric/lakehouse_48_item.svg'
import semanticIcon from '../../assets/icons/fabric/semantic_model_48_item.svg'
import ontologyIcon from '../../assets/icons/fabric/graph_intelligence_48_color.svg'
import powerBiIcon from '../../assets/icons/fabric/power_bi_48_color.svg'
import copilotIcon from '../../assets/icons/fabric/copilot_48_color.svg'
import agentIcon from '../../assets/icons/fabric/data_agent_48_item.svg'
import './MedallionArchitecture.css'

const SOURCES = ['SAP', 'Salesforce', 'Odoo', 'WMS']

// Non-translatable per-layer data: Medallion colors, notebook names, Delta traits.
const LAYER_META = {
  bronze: { color: 'var(--bronze)', notebook: 'nb_bronze_ingest', traits: ['Delta', 'append-only', 'schema-on-read'] },
  silver: { color: 'var(--silver)', notebook: 'nb_silver_clean', traits: ['dedup', 'validation', 'schema-on-write'] },
  gold: { color: 'var(--gold)', notebook: 'nb_gold_model', traits: ['star schema', 'aggregates', 'Direct Lake'] },
}

const OUTPUT_ICONS = [powerBiIcon, copilotIcon, agentIcon]

function Icon({ src, size = 28 }) {
  return <img src={src} alt="" width={size} height={size} loading="lazy" />
}

export default function MedallionArchitecture() {
  const { ref, visible } = useScrollReveal(0.1)
  const { t } = useLanguage()
  const m = t.medallion
  const layers = m.layers.map(layer => ({ ...layer, ...LAYER_META[layer.id] }))

  return (
    <section id="architecture" className="medallion">
      <div className="section-inner" ref={ref}>
        <div className={`medallion-header reveal-group${visible ? ' visible' : ''}`}>
          <p className="section-tag">{m.eyebrow}</p>
          <h2 className="section-title">
            {m.titlePre}<span>{m.titleHighlight}</span>{m.titlePost}
          </h2>
          <p className="section-desc">{m.desc}</p>
        </div>

        <div className={`flow${visible ? ' visible' : ''}`}>
          {/* 1 · Extract */}
          <div className="flow-stage">
            <span className="stage-label">{m.stages.extract.label}</span>
            <div className="extract-row">
              <div className="extract-sources">
                <span className="mini-label">{m.stages.extract.sourcesLabel}</span>
                <div className="chip-row">
                  {SOURCES.map(s => <span key={s} className="chip">{s}</span>)}
                </div>
              </div>
              <span className="flow-arrow h" aria-hidden="true" />
              <div className="stage-card">
                <div className="card-title-row">
                  <Icon src={pipelineIcon} />
                  <div>
                    <h3 className="stage-title">{m.stages.extract.title}</h3>
                    <p className="stage-desc">{m.stages.extract.desc}</p>
                  </div>
                </div>
                <div className="activity">
                  <Icon src={copyIcon} size={20} />
                  <span>{m.stages.extract.activity}</span>
                </div>
              </div>
            </div>
          </div>

          <span className="flow-arrow v" aria-hidden="true" />

          {/* 2 · Transform: notebooks chained in a DAG */}
          <div className="flow-stage">
            <span className="stage-label">{m.stages.dag.label}</span>
            <div className="dag">
              <div className="dag-head">
                <span className="dag-badge">DAG</span>
                <div>
                  <h3 className="stage-title">{m.stages.dag.title}</h3>
                  <p className="stage-desc">{m.stages.dag.desc}</p>
                </div>
              </div>
              <div className="layers">
                {layers.map((layer, i) => (
                  <div key={layer.id} className="layer-wrap">
                    <div className="layer" style={{ '--layer-color': layer.color, animationDelay: `${i * 0.15}s` }}>
                      <div className="layer-top">
                        <span className="layer-label">{layer.label}</span>
                        <Icon src={lakehouseIcon} size={22} />
                      </div>
                      <span className="layer-subtitle">{layer.subtitle}</span>
                      <p className="layer-desc">{layer.description}</p>
                      <div className="layer-notebook">
                        <Icon src={notebookIcon} size={18} />
                        <code>{layer.notebook}</code>
                      </div>
                      <div className="chip-row">
                        {layer.traits.map(x => <span key={x} className="chip small">{x}</span>)}
                      </div>
                    </div>
                    {i < layers.length - 1 && <span className="flow-arrow h in-dag" aria-hidden="true" />}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <span className="flow-arrow v" aria-hidden="true" />

          {/* 3 · Consume & AI */}
          <div className="flow-stage">
            <span className="stage-label">{m.stages.consume.label}</span>
            <div className="consume">
              <div className="consume-head">
                <h3 className="stage-title">{m.stages.consume.title}</h3>
                <p className="stage-desc">{m.stages.consume.desc}</p>
              </div>
              <div className="consume-items">
                {m.stages.consume.items.map((item, i) => (
                  <div key={item.title} className="stage-card">
                    <div className="card-title-row">
                      <Icon src={i === 0 ? semanticIcon : ontologyIcon} />
                      <div>
                        <h4 className="item-title">{item.title}</h4>
                        <p className="stage-desc">{item.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="outputs">
                {m.stages.consume.outputs.map((o, i) => (
                  <span key={o} className="output">
                    <Icon src={OUTPUT_ICONS[i]} size={20} />
                    {o}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className={`arch-stats${visible ? ' visible' : ''}`}>
          {m.stats.map((s, i) => (
            <div
              key={s.label}
              className="arch-stat"
              style={{ '--stat-color': ['var(--bronze)', 'var(--silver)', 'var(--gold)', 'var(--cyan)'][i] }}
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
