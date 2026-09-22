import { useParams, Link } from 'react-router-dom'
import { getCaseStudy, CASE_STUDY_INDEX } from '../../data/caseStudies'
import MedallionScene3D from '../../components/MedallionScene3D/MedallionScene3D'
import EmbedFlowDiagram from '../../components/EmbedFlowDiagram/EmbedFlowDiagram'
import { useLanguage } from '../../context/LanguageContext'
import './CaseStudyDetail.css'

function BackIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 12H5M12 19l-7-7 7-7" />
    </svg>
  )
}

function NotFound() {
  const { t } = useLanguage()
  return (
    <section className="case-study-detail not-found">
      <div className="section-inner">
        <Link to="/#work" className="back-link"><BackIcon /> {t.caseStudyDetail.backLink}</Link>
        <h1 className="section-title">{t.caseStudyDetail.notFoundTitle}</h1>
        <p className="section-desc">{t.caseStudyDetail.notFoundDesc}</p>
      </div>
    </section>
  )
}

export default function CaseStudyDetail() {
  const { slug } = useParams()
  const { lang, t } = useLanguage()
  const study = getCaseStudy(slug)

  if (!study) return <NotFound />

  return (
    <section className="case-study-detail">
      <div className="section-inner">
        <Link to="/#work" className="back-link"><BackIcon /> {t.caseStudyDetail.backLink}</Link>

        <header className="cs-header">
          <h1 className="section-title">{study.title}</h1>
          <p className="cs-client">{study.client}</p>
          <div className="cs-tags">
            {study.tags.map(tag => <span key={tag} className="p-tag">{tag}</span>)}
          </div>
        </header>

        <div className="cs-hero-visual">
          {study.heroVisual === 'embed-flow'
            ? <EmbedFlowDiagram />
            : <MedallionScene3D layers={study.layers} />}
          <p className="cs-summary">{study.summary[lang]}</p>
        </div>

        <div className="cs-section">
          <h2 className="cs-h2">{t.caseStudyDetail.challengeTitle}</h2>
          <p className="cs-body">{study.challenge[lang]}</p>

          {study.process && (
            <div className="cs-process">
              <h3 className="cs-process-title">{t.caseStudyDetail.processTitle}</h3>
              <ol className="cs-process-steps">
                {study.process.map((step, i) => (
                  <li key={step.title.en} className="cs-process-step">
                    <span className="cs-process-marker">{String(i + 1).padStart(2, '0')}</span>
                    <div className="cs-process-content">
                      <h4 className="cs-process-step-title">{step.title[lang]}</h4>
                      <p className="cs-process-step-desc">{step.description[lang]}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>

        <div className="cs-section">
          <h2 className="cs-h2">{t.caseStudyDetail.architectureTitle}</h2>
          <div className="cs-layers-grid">
            {study.layers.map(layer => (
              <div key={layer.id} className="cs-layer-card" style={{ '--layer-color': layer.color }}>
                <span className="cs-layer-label">{layer.label}</span>
                <span className="cs-layer-subtitle">{layer.subtitle}</span>
                <dl className="cs-layer-meta">
                  {layer.meta ? (
                    layer.meta.map(m => (
                      <div key={m.label.en}><dt>{m.label[lang]}</dt><dd>{m.value}</dd></div>
                    ))
                  ) : (
                    <>
                      <div><dt>{t.caseStudyDetail.layerMeta.dataFormat}</dt><dd>{layer.dataFormat}</dd></div>
                      <div><dt>{t.caseStudyDetail.layerMeta.storage}</dt><dd>{layer.storage}</dd></div>
                      <div><dt>{t.caseStudyDetail.layerMeta.transform}</dt><dd>{layer.transform}</dd></div>
                      <div><dt>{t.caseStudyDetail.layerMeta.status}</dt><dd>{layer.status}</dd></div>
                    </>
                  )}
                </dl>
              </div>
            ))}
          </div>
        </div>

        {study.codeSnippets && (
          <div className="cs-section">
            <h2 className="cs-h2">{t.caseStudyDetail.implementationTitle}</h2>
            <div className="cs-code-grid">
              {study.codeSnippets.map(snippet => (
                <figure key={snippet.title.en} className="cs-code-card">
                  <figcaption className="cs-code-title">
                    <span>{snippet.title[lang]}</span>
                    <span className="cs-code-lang">{snippet.language}</span>
                  </figcaption>
                  <pre className="cs-code"><code>{snippet.code}</code></pre>
                </figure>
              ))}
            </div>
          </div>
        )}

        <div className="cs-section">
          <h2 className="cs-h2">{t.caseStudyDetail.techStackTitle}</h2>
          <div className="cs-tags">
            {study.techStack.map(tech => <span key={tech} className="p-tag">{tech}</span>)}
          </div>
        </div>

        <div className="cs-section">
          <h2 className="cs-h2">{t.caseStudyDetail.resultsTitle}</h2>
          {study.resultsPending && (
            <p className="cs-results-note">
              <span className="pending-badge">{t.caseStudyDetail.pendingLabel}</span>
              {t.caseStudyDetail.resultsPendingNote}
            </p>
          )}
          <div className="cs-results-grid">
            {study.results.map(r => (
              <div key={r.label[lang]} className="cs-result-card">
                <div className="cs-result-value">{r.value}</div>
                <div className="cs-result-label">{r.label[lang]}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="cs-cta-section">
          <h2 className="cs-h2">{t.caseStudyDetail.ctaTitle}</h2>
          <div className="cs-cta-row">
            <Link to="/#contact" className="btn-neon primary">{t.caseStudyDetail.ctaButton}</Link>
          </div>

          <div className="cs-other-studies">
            <span className="cs-other-label">{t.caseStudyDetail.otherStudiesLabel}</span>
            <div className="cs-other-list">
              {CASE_STUDY_INDEX.filter(cs => cs.slug !== slug).map(cs => (
                cs.slug ? (
                  <Link key={cs.title} to={`/case-studies/${cs.slug}`} className="cs-other-item">
                    {cs.title}
                  </Link>
                ) : (
                  <span key={cs.title} className="cs-other-item disabled">
                    {cs.title} <span className="pending-badge">{t.caseStudyDetail.comingSoon}</span>
                  </span>
                )
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
