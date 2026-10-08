import { useEffect, useMemo, useState } from 'react'
import { useLanguage } from '../../context/LanguageContext'
import './Article.css'

function LayersGrid({ layers, meta }) {
  return (
    <div className="cs-layers-grid art-layers">
      {layers.map(layer => (
        <div key={layer.id} className="cs-layer-card" style={{ '--layer-color': layer.color }}>
          <span className="cs-layer-label">{layer.label}</span>
          <span className="cs-layer-subtitle">{layer.subtitle}</span>
          <dl className="cs-layer-meta">
            <div><dt>{meta.dataFormat}</dt><dd>{layer.dataFormat}</dd></div>
            <div><dt>{meta.storage}</dt><dd>{layer.storage}</dd></div>
            <div><dt>{meta.transform}</dt><dd>{layer.transform}</dd></div>
          </dl>
        </div>
      ))}
    </div>
  )
}

function Block({ block, lang, t, layers }) {
  const a = t.caseStudyDetail.article
  switch (block.type) {
    case 'p':
      return <p className="art-p">{block.text[lang]}</p>
    case 'ul':
      return <ul className="art-ul">{block.items.map(i => <li key={i.en}>{i[lang]}</li>)}</ul>
    case 'checklist':
      return (
        <ul className="art-check">
          {block.items.map(i => (
            <li key={i.en}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12l5 5L20 7" /></svg>
              <span>{i[lang]}</span>
            </li>
          ))}
        </ul>
      )
    case 'callout':
      return (
        <aside className="art-callout">
          <span className="art-callout-label">{block.label[lang]}</span>
          <p>{block.text[lang]}</p>
        </aside>
      )
    case 'spec':
      return (
        <figure className="art-spec">
          <figcaption>{block.title[lang]}</figcaption>
          <div className="art-table-wrap">
            <table>
              <thead><tr>{block.head.map(h => <th key={h.en}>{h[lang]}</th>)}</tr></thead>
              <tbody>
                {block.rows.map(r => (
                  <tr key={r.id}>
                    <td className="art-id">{r.id}</td>
                    {r.cells.map(c => <td key={c.en}>{c[lang]}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </figure>
      )
    case 'options':
      return (
        <div className="art-options">
          {block.items.map(o => (
            <div key={o.name.en} className={`art-option${o.chosen ? ' chosen' : ''}`}>
              <div className="art-option-head">
                <h4>{o.name[lang]}</h4>
                <span className="art-verdict">{o.chosen ? a.chosen : o.verdict[lang]}</span>
              </div>
              <p><strong>{a.pros}:</strong> {o.pros[lang]}</p>
              <p><strong>{a.cons}:</strong> {o.cons[lang]}</p>
            </div>
          ))}
        </div>
      )
    case 'steps':
      return (
        <ol className="art-steps">
          {block.items.map((s, i) => (
            <li key={s.title.en}>
              <span className="art-step-n">{String(i + 1).padStart(2, '0')}</span>
              <div><h4>{s.title[lang]}</h4><p>{s.text[lang]}</p></div>
            </li>
          ))}
        </ol>
      )
    case 'code':
      return (
        <figure className="cs-code-card art-code">
          <figcaption className="cs-code-title">
            <span>{block.title[lang]}</span>
            <span className="cs-code-lang">{block.language} · {a.illustrative}</span>
          </figcaption>
          <pre className="cs-code" tabIndex={0}><code>{block.code}</code></pre>
        </figure>
      )
    case 'envflow':
      return (
        <ol className="art-env" aria-label={a.stages}>
          {block.stages.map((s, i) => (
            <li key={s.name}>
              <span className="art-env-name">{s.name}</span>
              <span className="art-env-where">{s.where[lang]}</span>
              <p>{s.text[lang]}</p>
              {i < block.stages.length - 1 && <span className="art-env-arrow" aria-hidden="true">→</span>}
            </li>
          ))}
        </ol>
      )
    case 'layers':
      return <LayersGrid layers={layers} meta={t.caseStudyDetail.layerMeta} />
    default:
      return null
  }
}

export default function ArticleBody({ article, layers }) {
  const { lang, t } = useLanguage()
  const [active, setActive] = useState(article.sections[0].id)
  const ids = useMemo(() => article.sections.map(s => s.id), [article])

  useEffect(() => {
    const els = ids.map(id => document.getElementById(id)).filter(Boolean)
    const io = new IntersectionObserver((entries) => {
      const visible = entries.filter(e => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
      if (visible[0]) setActive(visible[0].target.id)
    }, { rootMargin: '-96px 0px -65% 0px' })
    els.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [ids])

  return (
    <div className="art-layout">
      <nav className="art-toc" aria-label={t.caseStudyDetail.article.toc}>
        <span className="art-toc-title">{t.caseStudyDetail.article.toc}</span>
        <ol>
          {article.sections.map((s, i) => (
            <li key={s.id}>
              <a href={`#${s.id}`} className={active === s.id ? 'active' : ''}>
                <span>{String(i + 1).padStart(2, '0')}</span>{s.title[lang]}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <article className="art-body">
        <p className="art-lede">{article.intro[lang]}</p>
        {article.sections.map((s, i) => (
          <section key={s.id} id={s.id} className="art-section">
            <h2 className="art-h2"><span>{String(i + 1).padStart(2, '0')}</span>{s.title[lang]}</h2>
            {s.blocks.map((b, j) => <Block key={j} block={b} lang={lang} t={t} layers={layers} />)}
          </section>
        ))}
      </article>
    </div>
  )
}
