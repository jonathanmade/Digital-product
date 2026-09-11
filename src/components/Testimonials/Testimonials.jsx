import { useScrollReveal } from '../../hooks/useScrollReveal'
import './Testimonials.css'

const PLACEHOLDERS = [1, 2]

export default function Testimonials() {
  const { ref, visible } = useScrollReveal(0.1)

  return (
    <section id="testimonials" className="testimonials">
      <div className="section-inner" ref={ref}>
        <div className={`reveal-group${visible ? ' visible' : ''}`}>
          <p className="section-tag">Testimonials</p>
          <h2 className="section-title">
            What <span>clients</span> say
          </h2>
        </div>

        <div className="testimonials-grid">
          {PLACEHOLDERS.map(id => (
            <div key={id} className="testimonial-card">
              <p className="testimonial-quote">[Testimonial pending]</p>
              <div className="testimonial-author">
                <span className="testimonial-name">[Name pending]</span>
                <span className="testimonial-role">[Role / company pending]</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
