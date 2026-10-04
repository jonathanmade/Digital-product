import { useLanguage } from '../../context/LanguageContext'
import Logo from '../Logo/Logo'
import './Footer.css'

export default function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <span className="footer-name">
          <Logo size={22} />
        </span>
        <span className="footer-text">{t.footer.tagline}</span>
        <span className="footer-year">© {new Date().getFullYear()}</span>
      </div>
    </footer>
  )
}
