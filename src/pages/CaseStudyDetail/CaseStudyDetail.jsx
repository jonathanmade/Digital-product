import { useParams, Link } from 'react-router-dom'
import { getCaseStudy, CASE_STUDY_INDEX } from '../../data/caseStudies'
import MedallionScene3D from '../../components/MedallionScene3D/MedallionScene3D'
import './CaseStudyDetail.css'

function BackIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 12H5M12 19l-7-7 7-7" />
    </svg>
  )
}

function NotFound() {
  return (
    <section className="case-study-detail not-found">
      <div className="section-inner">
        <Link to="/#work" className="back-link"><BackIcon /> Back to case studies</Link>
        <h1 className="section-title">Case study not found</h1>
        <p className="section-desc">This case study doesn't have a page yet.</p>
      </div>
    </section>
  )
}

export default function CaseStudyDetail() {
  const { slug } = useParams()
  const study = getCaseStudy(slug)

  if (!study) return <NotFound />

  return (
    <section className="case-study-detail">
      <div className="section-inner">
        <Link to="/#work" className="back-link"><BackIcon /> Back to case studies</Link>

        <header className="cs-header">
          <h1 className="section-title">{study.title}</h1>
          <p className="cs-client">{study.client}</p>
          <div className="cs-tags">
            {study.tags.map(t => <span key={t} className="p-tag">{t}</span>)}
          </div>
        </header>

        <div className="cs-hero-visual">
          <MedallionScene3D layers={study.layers} />
          <p className="cs-summary">{study.summary}</p>
        </div>

        <div className="cs-section">
          <h2 className="cs-h2">The Challenge</h2>
          <p className="cs-body">{study.challenge}</p>
        </div>

        <div className="cs-section">
          <h2 className="cs-h2">The Architecture</h2>
          <div className="cs-layers-grid">
            {study.layers.map(layer => (
              <div key={layer.id} className="cs-layer-card" style={{ '--layer-color': layer.color }}>
                <span className="cs-layer-label">{layer.label}</span>
                <span className="cs-layer-subtitle">{layer.subtitle}</span>
                <dl className="cs-layer-meta">
                  <div><dt>Data Format</dt><dd>{layer.dataFormat}</dd></div>
                  <div><dt>Storage</dt><dd>{layer.storage}</dd></div>
                  <div><dt>Transform</dt><dd>{layer.transform}</dd></div>
                  <div><dt>Status</dt><dd>{layer.status}</dd></div>
                </dl>
              </div>
            ))}
          </div>
        </div>

        <div className="cs-section">
          <h2 className="cs-h2">Tech Stack</h2>
          <div className="cs-tags">
            {study.techStack.map(t => <span key={t} className="p-tag">{t}</span>)}
          </div>
        </div>

        <div className="cs-section">
          <h2 className="cs-h2">Results</h2>
          <div className="cs-results-grid">
            {study.results.map(r => (
              <div key={r.label} className="cs-result-card">
                <div className="cs-result-value">{r.value}</div>
                <div className="cs-result-label">{r.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="cs-cta-section">
          <h2 className="cs-h2">Interested in something similar?</h2>
          <div className="cs-cta-row">
            <Link to="/#contact" className="btn-neon primary">Book a Call</Link>
          </div>

          <div className="cs-other-studies">
            <span className="cs-other-label">Other case studies</span>
            <div className="cs-other-list">
              {CASE_STUDY_INDEX.filter(cs => cs.slug !== slug).map(cs => (
                cs.slug ? (
                  <Link key={cs.title} to={`/case-studies/${cs.slug}`} className="cs-other-item">
                    {cs.title}
                  </Link>
                ) : (
                  <span key={cs.title} className="cs-other-item disabled">
                    {cs.title} <span className="pending-badge">Coming soon</span>
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
