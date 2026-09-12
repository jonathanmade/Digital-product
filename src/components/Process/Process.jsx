import { useScrollReveal } from '../../hooks/useScrollReveal'
import { useLanguage } from '../../context/LanguageContext'
import './Process.css'

export default function Process() {
  const { ref, visible } = useScrollReveal(0.1)
  const { t } = useLanguage()

  return (
    <section id="process" className="process">
      <div className="section-inner" ref={ref}>
        <div className={`reveal-group${visible ? ' visible' : ''}`}>
          <p className="section-tag">{t.process.eyebrow}</p>
          <h2 className="section-title">
            {t.process.titlePre}<span>{t.process.titleHighlight}</span>{t.process.titlePost}
          </h2>
          <p className="section-desc">
            {t.process.desc}
          </p>
        </div>

        <div className={`process-timeline${visible ? ' visible' : ''}`}>
          {t.process.steps.map((step, i) => (
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
