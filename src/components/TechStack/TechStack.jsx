import { useScrollReveal } from '../../hooks/useScrollReveal'
import { useLanguage } from '../../context/LanguageContext'
import './TechStack.css'

function CategoryGroup({ category, index, visible }) {
  return (
    <div
      className={`category-group${visible ? ' visible' : ''}`}
      style={{ animationDelay: `${index * 0.08}s` }}
    >
      <span className="category-name">{category.name}</span>
      <div className="category-chips">
        {category.items.map(item => (
          <span key={item} className="capability-chip">{item}</span>
        ))}
      </div>
    </div>
  )
}

export default function TechStack() {
  const { ref, visible } = useScrollReveal(0.1)
  const { t } = useLanguage()

  return (
    <section id="stack" className="techstack">
      <div className="section-inner" ref={ref}>
        <div className={`reveal-group${visible ? ' visible' : ''}`}>
          <p className="section-tag">{t.techStack.eyebrow}</p>
          <h2 className="section-title">
            {t.techStack.titlePre}<span>{t.techStack.titleHighlight}</span>{t.techStack.titlePost}
          </h2>
          <p className="section-desc">
            {t.techStack.desc}
          </p>
        </div>

        <div className="category-grid">
          {t.techStack.categories.map((category, i) => (
            <CategoryGroup key={category.name} category={category} index={i} visible={visible} />
          ))}
        </div>

        <div className={`also-know${visible ? ' visible' : ''}`}>
          <span className="also-label">{t.techStack.alsoKnowLabel}</span>
          {t.techStack.alsoKnow.map(item => (
            <span key={item} className="also-tag">{item}</span>
          ))}
        </div>
      </div>
    </section>
  )
}
