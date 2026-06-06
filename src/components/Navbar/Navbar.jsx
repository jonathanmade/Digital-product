import { useState, useEffect } from 'react'
import './Navbar.css'

const links = [
  { href: '#hero', label: 'Home' },
  { href: '#architecture', label: 'Architecture' },
  { href: '#stack', label: 'Stack' },
  { href: '#projects', label: 'Projects' },
  { href: '#powerbi', label: 'Power BI' },
  { href: '#contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('hero')
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
      <div className="nav-inner">
        <a className="nav-logo" href="#hero">
          <span className="logo-bracket">[</span>JM<span className="logo-bracket">]</span>
          <span className="logo-sub"> data_engineer</span>
        </a>

        <button
          className={`nav-hamburger${menuOpen ? ' open' : ''}`}
          onClick={() => setMenuOpen(v => !v)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>

        <ul className={`nav-links${menuOpen ? ' open' : ''}`}>
          {links.map(l => (
            <li key={l.href}>
              <a
                href={l.href}
                className={active === l.href.slice(1) ? 'active' : ''}
                onClick={() => { setActive(l.href.slice(1)); setMenuOpen(false) }}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
