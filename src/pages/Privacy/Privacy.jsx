import { Link } from 'react-router-dom'
import { useLanguage } from '../../context/LanguageContext'
import { useSeo } from '../../hooks/useSeo'
import { legal, PRIVACY_UPDATED } from '../../i18n/legal'
import './Privacy.css'

export default function Privacy() {
  const { lang } = useLanguage()
  const p = legal[lang].privacy
  useSeo({ title: `${p.title} | DeltaForge Gold`, description: p.description, path: '/privacy' })

  return (
    <section className="privacy-page">
      <div className="section-inner">
        <Link to="/" className="privacy-back">← {p.back}</Link>
        <h1 className="section-title">{p.title}</h1>
        <p className="privacy-updated">{p.updatedLabel}: {PRIVACY_UPDATED}</p>

        {p.sections.map(section => (
          <div key={section.h} className="privacy-section">
            <h2 className="privacy-h2">{section.h}</h2>
            {section.p.map(text => <p key={text} className="privacy-text">{text}</p>)}
            {section.h === p.sections[3].h && (
              <div className="privacy-table-wrap">
                <table className="privacy-table">
                  <thead>
                    <tr>{p.cookiesTable.headers.map(h => <th key={h}>{h}</th>)}</tr>
                  </thead>
                  <tbody>
                    {p.cookiesTable.rows.map(row => (
                      <tr key={row[0]}>{row.map((cell, i) => <td key={i}>{cell}</td>)}</tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
