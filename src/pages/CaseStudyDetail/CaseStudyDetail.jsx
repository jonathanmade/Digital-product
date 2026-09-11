import { useParams, Link } from 'react-router-dom'
import './CaseStudyDetail.css'

export default function CaseStudyDetail() {
  const { slug } = useParams()

  return (
    <section className="case-study-detail">
      <div className="section-inner">
        <Link to="/#work" className="back-link">← Back to case studies</Link>
        <h1 className="section-title">Case study: {slug}</h1>
        <p className="section-desc">Content coming soon.</p>
      </div>
    </section>
  )
}
