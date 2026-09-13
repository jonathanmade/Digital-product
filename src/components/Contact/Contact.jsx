import { useScrollReveal } from '../../hooks/useScrollReveal'
import { useLanguage } from '../../context/LanguageContext'
import { openCalendlyPopup, CALENDLY_URL } from '../../utils/calendly'
import './Contact.css'

const CONTACT_EMAIL = 'contact@jonatanmarin.dev'

function CalendarIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 10h18" />
      <path d="M8 3v4M16 3v4" />
      <circle cx="8.5" cy="14.5" r="1" fill="currentColor" stroke="none" />
      <circle cx="12" cy="14.5" r="1" fill="currentColor" stroke="none" />
      <circle cx="15.5" cy="14.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

function MailIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </svg>
  )
}

export default function Contact() {
  const { ref, visible } = useScrollReveal(0.1)
  const { t } = useLanguage()

  const handleBookCall = (e) => {
    // Opens Calendly as an in-page popup; falls back to the real href
    // (new tab) if the widget script hasn't loaded for any reason.
    if (openCalendlyPopup(CALENDLY_URL)) e.preventDefault()
  }

  return (
    <section id="contact" className="contact">
      <div className="section-inner" ref={ref}>
        <div className={`reveal-group${visible ? ' visible' : ''}`}>
          <p className="section-tag">{t.contact.eyebrow}</p>
          <h2 className="section-title">
            {t.contact.titlePre}<span>{t.contact.titleHighlight}</span>{t.contact.titlePost}
          </h2>
          <p className="section-desc">
            {t.contact.desc}
          </p>
        </div>

        <div className={`contact-cta-row${visible ? ' visible' : ''}`}>
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-neon primary contact-cta"
            onClick={handleBookCall}
          >
            <CalendarIcon />
            {t.contact.ctaPrimary}
          </a>
          <a href={`mailto:${CONTACT_EMAIL}`} className="btn-neon outline contact-cta">
            <MailIcon />
            {CONTACT_EMAIL}
          </a>
        </div>
        <p className="calendly-note">
          {t.contact.calendlyNote}
        </p>

        <div className="social-links">
          <a
            href="https://linkedin.com/in/jonatanmarin"
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
            LinkedIn
          </a>
          <a
            href="https://github.com/jonathanmade"
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
            </svg>
            GitHub
          </a>
        </div>
      </div>
    </section>
  )
}
