import { useScrollReveal } from '../../hooks/useScrollReveal'
import { useLanguage } from '../../context/LanguageContext'
import fabric from '../../assets/icons/fabric/fabric_48_color.svg'
import oneLake from '../../assets/icons/fabric/one_lake_48_color.svg'
import dataFactory from '../../assets/icons/fabric/data_factory_48_color.svg'
import dataEngineering from '../../assets/icons/fabric/data_engineering_48_color.svg'
import lakehouse from '../../assets/icons/fabric/lakehouse_48_item.svg'
import warehouse from '../../assets/icons/fabric/data_warehouse_48_color.svg'
import notebook from '../../assets/icons/fabric/notebook_48_item.svg'
import pipeline from '../../assets/icons/fabric/pipeline_48_item.svg'
import realTime from '../../assets/icons/fabric/real_time_intelligence_48_color.svg'
import dataScience from '../../assets/icons/fabric/data_science_48_color.svg'
import semanticModel from '../../assets/icons/fabric/semantic_model_48_item.svg'
import powerBi from '../../assets/icons/fabric/power_bi_48_color.svg'
import './TechStack.css'

// Microsoft Fabric experiences and items (official icons, MIT; see
// src/assets/icons/fabric/ICONS_LICENSE.md). Product names are not translated.
const FABRIC_TOOLS = [
  { name: 'Microsoft Fabric', icon: fabric },
  { name: 'OneLake', icon: oneLake },
  { name: 'Data Factory', icon: dataFactory },
  { name: 'Data Engineering', icon: dataEngineering },
  { name: 'Lakehouse', icon: lakehouse },
  { name: 'Data Warehouse', icon: warehouse },
  { name: 'Notebooks', icon: notebook },
  { name: 'Pipelines', icon: pipeline },
  { name: 'Real-Time Intelligence', icon: realTime },
  { name: 'Data Science', icon: dataScience },
  { name: 'Semantic Models', icon: semanticModel },
  { name: 'Power BI', icon: powerBi },
]

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

        <ul className="tool-grid">
          {FABRIC_TOOLS.map((tool, i) => (
            <li
              key={tool.name}
              className={`tool-tile${visible ? ' visible' : ''}`}
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              <img src={tool.icon} alt="" width="44" height="44" loading="lazy" />
              <span className="tool-name">{tool.name}</span>
            </li>
          ))}
        </ul>

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
