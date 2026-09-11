import { useScrollReveal } from '../../hooks/useScrollReveal'
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

const CAPABILITIES = [
  {
    icon: RetrievalIcon,
    title: 'Retrieval over your own data',
    description: 'RAG built directly on the Gold layer — answers grounded in governed, up-to-date data, not a static document dump.',
  },
  {
    icon: AgentIcon,
    title: 'Internal agents',
    description: 'Agents that automate operational workflows against your systems — not chatbots, task-completing tools.',
  },
  {
    icon: DeliveryIcon,
    title: 'End-to-end delivery',
    description: 'Data pipeline, backend, and UI shipped as one system — a working application, not a notebook demo.',
  },
  {
    icon: AzureIcon,
    title: 'Azure-native integration',
    description: 'Built on the same Azure estate as the data platform — Azure AI services, identity, and networking already in place.',
  },
]

export default function AISection() {
  const { ref, visible } = useScrollReveal(0.1)

  return (
    <section id="ai" className="ai-section">
      <div className="section-inner" ref={ref}>
        <div className={`reveal-group${visible ? ' visible' : ''}`}>
          <p className="section-tag">AI</p>
          <h2 className="section-title">
            AI applications built on <span>solid data ground</span>
          </h2>
          <p className="section-desc">
            Most AI projects fail on messy, ungoverned data. Ten years of Data Engineering
            means the AI layer sits on a foundation that was already built to be trusted.
          </p>
        </div>

        <div className="ai-grid">
          {CAPABILITIES.map((c, i) => {
            const Icon = c.icon
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
