import { useLanguage } from '../../context/LanguageContext'
import './Footer.css'

export default function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <span className="footer-name">
          <span style={{ color: 'var(--cyan)' }}>[</span>JM<span style={{ color: 'var(--cyan)' }}>]</span>
        </span>
        <span className="footer-text">{t.footer.tagline}</span>
        <span className="footer-year">© {new Date().getFullYear()}</span>
      </div>
    </footer>
  )
}
