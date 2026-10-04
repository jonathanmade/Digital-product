import { Link } from 'react-router-dom'
import { useLanguage } from '../../context/LanguageContext'
import { useConsent } from '../../hooks/useConsent'
import { analyticsEnabled, acceptAnalytics, rejectAnalytics } from '../../utils/analytics'
import { legal } from '../../i18n/legal'
import './CookieBanner.css'

// Shown only when analytics is configured and the visitor hasn't chosen yet.
export default function CookieBanner() {
  const { lang } = useLanguage()
  const consent = useConsent()
  if (!analyticsEnabled || consent !== null) return null
  const b = legal[lang].banner

  return (
    <div className="cookie-banner" role="dialog" aria-live="polite" aria-labelledby="cookie-banner-title">
      <p id="cookie-banner-title" className="cookie-banner-title">{b.title}</p>
      <p className="cookie-banner-text">
        {b.text}{' '}
        <Link to="/privacy" className="cookie-banner-link">{b.more}</Link>
      </p>
      <div className="cookie-banner-actions">
        <button type="button" className="btn-neon outline" onClick={rejectAnalytics}>{b.reject}</button>
        <button type="button" className="btn-neon primary" onClick={acceptAnalytics}>{b.accept}</button>
      </div>
    </div>
  )
}
