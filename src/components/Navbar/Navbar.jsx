import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useTheme } from '../../hooks/useTheme'
import { useLanguage } from '../../context/LanguageContext'
import { openCalendlyPopup, CALENDLY_URL } from '../../utils/calendly'
import './Navbar.css'

function SunIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4.5" />
      <path d="M12 2.5v2.5M12 19v2.5M4.2 4.2l1.8 1.8M18 18l1.8 1.8M2.5 12H5M19 12h2.5M4.2 19.8L6 18M18 6l1.8-1.8" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 14.2A8.5 8.5 0 1 1 9.8 4a6.7 6.7 0 0 0 10.2 10.2z" />
    </svg>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('hero')
  const [menuOpen, setMenuOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const { lang, toggleLanguage, t } = useLanguage()

  const links = [
    { href: '#hero', label: t.nav.links.home },
    { href: '#services', label: t.nav.links.services },
    { href: '#process', label: t.nav.links.process },
    { href: '#work', label: t.nav.links.work },
    { href: '#ai', label: t.nav.links.ai },
    { href: '#contact', label: t.nav.links.contact },
  ]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleBookCall = (e) => {
    // Opens Calendly as an in-page popup; falls back to the real href
    // (new tab) if the widget script hasn't loaded for any reason.
    if (openCalendlyPopup(CALENDLY_URL)) e.preventDefault()
  }

  return (
    <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
      <div className="nav-inner">
        <Link className="nav-logo" to="/">
          <span className="logo-bracket">[</span>JM<span className="logo-bracket">]</span>
          <span className="logo-sub"> data_engineer</span>
        </Link>

        <div className="nav-right">
          <ul className={`nav-links${menuOpen ? ' open' : ''}`}>
            {links.map(l => (
              <li key={l.href}>
                <Link
                  to={`/${l.href}`}
                  className={active === l.href.slice(1) ? 'active' : ''}
                  onClick={() => { setActive(l.href.slice(1)); setMenuOpen(false) }}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="nav-actions">
            <div className="lang-toggle" role="group" aria-label={t.nav.langToggleLabel}>
              <button
                className={lang === 'en' ? 'active' : ''}
                onClick={() => lang !== 'en' && toggleLanguage()}
              >
                EN
              </button>
              <button
                className={lang === 'es' ? 'active' : ''}
                onClick={() => lang !== 'es' && toggleLanguage()}
              >
                ES
              </button>
            </div>
            <button
              className="theme-toggle"
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? t.nav.themeToggleToLight : t.nav.themeToggleToDark}
            >
              {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
            </button>
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-neon outline nav-cta"
              onClick={handleBookCall}
            >
              {t.nav.bookCall}
            </a>
          </div>

          <button
            className={`nav-hamburger${menuOpen ? ' open' : ''}`}
            onClick={() => setMenuOpen(v => !v)}
            aria-label={t.nav.toggleMenu}
          >
            <span /><span /><span />
          </button>
        </div>
      </div>
    </nav>
  )
}
