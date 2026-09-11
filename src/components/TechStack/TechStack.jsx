import { useScrollReveal } from '../../hooks/useScrollReveal'
import './TechStack.css'

const CATEGORIES = [
  { name: 'Platform', items: ['Microsoft Fabric'] },
  { name: 'BI', items: ['Power BI', 'Power BI Embedded', 'DAX'] },
  { name: 'Processing', items: ['Databricks', 'PySpark', 'Delta Live Tables'] },
  { name: 'Storage', items: ['Delta Lake', 'ADLS Gen2'] },
  { name: 'Orchestration', items: ['Azure Data Factory', 'Apache Kafka'] },
  { name: 'Language', items: ['Python', 'SQL / T-SQL'] },
  { name: 'Cloud', items: ['Azure', 'Azure AD B2C', 'Synapse Analytics'] },
]

const ALSO_KNOW = ['dbt', 'Power Automate', 'Git', 'Docker', 'M Query', 'Great Expectations']

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

  return (
    <section id="stack" className="techstack">
      <div className="section-inner" ref={ref}>
        <div className={`reveal-group${visible ? ' visible' : ''}`}>
          <p className="section-tag">Capabilities</p>
          <h2 className="section-title">
            Tools & <span>Technologies</span>
          </h2>
          <p className="section-desc">
            Production-proven platforms across the full data lifecycle — from ingestion to
            Power BI Direct Lake, and increasingly AI applications layered on top.
          </p>
        </div>

        <div className="category-grid">
          {CATEGORIES.map((category, i) => (
            <CategoryGroup key={category.name} category={category} index={i} visible={visible} />
          ))}
        </div>

        <div className={`also-know${visible ? ' visible' : ''}`}>
          <span className="also-label">Also proficient in:</span>
          {ALSO_KNOW.map(t => (
            <span key={t} className="also-tag">{t}</span>
          ))}
        </div>
      </div>
    </section>
  )
}
