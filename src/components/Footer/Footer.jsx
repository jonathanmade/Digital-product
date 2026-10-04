import { Link } from 'react-router-dom'
import { useLanguage } from '../../context/LanguageContext'
import { analyticsEnabled, reopenConsent } from '../../utils/analytics'
import { legal } from '../../i18n/legal'
import Logo from '../Logo/Logo'
import './Footer.css'

export default function Footer() {
  const { t, lang } = useLanguage()
  const l = legal[lang].footer

  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <span className="footer-name">
          <Logo size={22} />
        </span>
        <span className="footer-text">{t.footer.tagline}</span>
        <nav className="footer-links" aria-label="Legal">
          <Link to="/privacy">{l.privacy}</Link>
          {analyticsEnabled && (
            <button type="button" className="footer-link-btn" onClick={reopenConsent}>{l.cookieSettings}</button>
          )}
        </nav>
        <span className="footer-year">© {new Date().getFullYear()}</span>
      </div>
    </footer>
  )
}
