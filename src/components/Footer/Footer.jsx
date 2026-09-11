import './Footer.css'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <span className="footer-name">
          <span style={{ color: 'var(--cyan)' }}>[</span>JM<span style={{ color: 'var(--cyan)' }}>]</span>
        </span>
        <span className="footer-text">Jonatan Marín · Data & AI Engineering · Barcelona</span>
        <span className="footer-year">© {new Date().getFullYear()}</span>
      </div>
    </footer>
  )
}
