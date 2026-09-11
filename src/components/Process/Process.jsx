import { useScrollReveal } from '../../hooks/useScrollReveal'
import './Process.css'

const STEPS = [
  {
    n: '01',
    title: 'Discovery & Audit',
    description: 'Map your current data sources, pipelines, and reporting stack. Identify bottlenecks, gaps, and quick wins.',
  },
  {
    n: '02',
    title: 'Architecture & Design',
    description: 'Design the target Medallion architecture, semantic model, or AI application — scoped to your systems and constraints.',
  },
  {
    n: '03',
    title: 'Build & Deploy',
    description: 'Implement in short, reviewable iterations. Production-grade from day one, not a throwaway proof of concept.',
  },
  {
    n: '04',
    title: 'Handover & Support',
    description: 'Documentation, knowledge transfer to your team, and an optional support window after go-live.',
  },
]

export default function Process() {
  const { ref, visible } = useScrollReveal(0.1)

  return (
    <section id="process" className="process">
      <div className="section-inner" ref={ref}>
        <div className={`reveal-group${visible ? ' visible' : ''}`}>
          <p className="section-tag">Process</p>
          <h2 className="section-title">
            How an <span>engagement</span> runs
          </h2>
          <p className="section-desc">
            A fixed, predictable sequence — regardless of whether the scope is a pipeline, a
            dashboard suite, or an AI application.
          </p>
        </div>

        <div className={`process-timeline${visible ? ' visible' : ''}`}>
          {STEPS.map((step, i) => (
            <div key={step.n} className="process-step" style={{ animationDelay: `${i * 0.15}s` }}>
              <div className="process-step-marker">
                <span className="process-num">{step.n}</span>
              </div>
              <h3 className="process-title">{step.title}</h3>
              <p className="process-desc">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
