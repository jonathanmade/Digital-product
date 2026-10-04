import { useScrollReveal } from '../../hooks/useScrollReveal'
import { useLanguage } from '../../context/LanguageContext'
import './Testimonials.css'

const PLACEHOLDERS = [1, 2]

export default function Testimonials() {
  const { ref, visible } = useScrollReveal(0.1)
  const { t } = useLanguage()

  return (
    <section id="testimonials" className="testimonials">
      <div className="section-inner" ref={ref}>
        <div className={`reveal-group${visible ? ' visible' : ''}`}>
          <p className="section-tag">{t.testimonials.eyebrow}</p>
          <h2 className="section-title">
            {t.testimonials.titlePre}<span>{t.testimonials.titleHighlight}</span>{t.testimonials.titlePost}
          </h2>
        </div>

        <div className="testimonials-grid">
          {PLACEHOLDERS.map(id => (
            <div key={id} className="testimonial-card">
              <p className="testimonial-quote">{t.testimonials.quotePending}</p>
              <div className="testimonial-author">
                <span className="testimonial-name">{t.testimonials.namePending}</span>
                <span className="testimonial-role">{t.testimonials.rolePending}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
