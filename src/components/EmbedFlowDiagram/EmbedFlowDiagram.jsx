import { useLanguage } from '../../context/LanguageContext'
import './EmbedFlowDiagram.css'

// HUD-style sequence of the app-owns-data embed flow. Nodes are fixed;
// only the step captions are translated.
const NODES = [
  { id: 'user', label: 'PHARMACY USER', sub: 'Browser', color: 'var(--cyan)' },
  { id: 'api', label: 'TOKEN API', sub: 'Node.js · MSAL', color: 'var(--cyan)' },
  { id: 'entra', label: 'ENTRA ID', sub: 'Service principal', color: 'var(--azure)' },
  { id: 'pbi', label: 'POWER BI', sub: 'REST · Capacity · RLS', color: 'var(--pbi)' },
]

export default function EmbedFlowDiagram() {
  const { t } = useLanguage()
  const steps = t.embedFlow.steps

  return (
    <figure className="embed-flow" aria-label={t.embedFlow.title}>
      <header className="embed-flow-head">
        <span className="embed-flow-title">{t.embedFlow.title}</span>
        <span className="embed-flow-status"><i />{t.embedFlow.status}</span>
      </header>

      <div className="embed-flow-nodes">
        {NODES.map((n, i) => (
          <div key={n.id} className="embed-flow-node" style={{ '--node-color': n.color }}>
            <span className="embed-flow-index">{String(i + 1).padStart(2, '0')}</span>
            <span className="embed-flow-label">{n.label}</span>
            <span className="embed-flow-sub">{n.sub}</span>
          </div>
        ))}
      </div>

      <ol className="embed-flow-steps">
        {steps.map((s, i) => (
          <li
            key={s.text}
            className={`embed-flow-step${s.to < s.from ? ' back' : ''}`}
            style={{ animationDelay: `${i * 0.12}s` }}
          >
            <span className="embed-flow-step-n">{i + 1}</span>
            <span className="embed-flow-track" aria-hidden="true">
              <span
                className="embed-flow-arrow"
                style={{ gridColumn: `${Math.min(s.from, s.to)} / ${Math.max(s.from, s.to) + 1}` }}
              />
            </span>
            <span className="embed-flow-step-text">{s.text}</span>
          </li>
        ))}
      </ol>
    </figure>
  )
}
