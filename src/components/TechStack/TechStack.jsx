import { useScrollReveal } from '../../hooks/useScrollReveal'
import './TechStack.css'

const SKILLS = [
  { name: 'Microsoft Fabric', level: 95, color: '#00F5FF', category: 'Platform' },
  { name: 'Power BI', level: 93, color: '#FFB800', category: 'BI' },
  { name: 'Databricks', level: 88, color: '#FF3621', category: 'Processing' },
  { name: 'PySpark', level: 87, color: '#E25A1C', category: 'Processing' },
  { name: 'Delta Lake', level: 90, color: '#00ADD8', category: 'Storage' },
  { name: 'Azure Data Factory', level: 85, color: '#0089D6', category: 'Orchestration' },
  { name: 'Python', level: 90, color: '#FFD43B', category: 'Language' },
  { name: 'SQL / T-SQL', level: 92, color: '#7B2FFF', category: 'Language' },
  { name: 'Azure', level: 83, color: '#008AD7', category: 'Cloud' },
]

function ArcGauge({ level, color, size = 100 }) {
  const r = 36
  const cx = size / 2
  const cy = size / 2
  const circumference = 2 * Math.PI * r
  const arcLen = circumference * 0.75
  const fill = arcLen * (level / 100)
  const rotation = 135

  return (
    <svg width={size} height={size} className="arc-gauge">
      {/* Track */}
      <circle
        cx={cx} cy={cy} r={r}
        fill="none"
        stroke="rgba(255,255,255,0.06)"
        strokeWidth="5"
        strokeDasharray={`${arcLen} ${circumference - arcLen}`}
        strokeDashoffset={0}
        strokeLinecap="round"
        transform={`rotate(${rotation} ${cx} ${cy})`}
      />
      {/* Fill */}
      <circle
        cx={cx} cy={cy} r={r}
        fill="none"
        stroke={color}
        strokeWidth="5"
        strokeDasharray={`${fill} ${circumference - fill}`}
        strokeDashoffset={0}
        strokeLinecap="round"
        transform={`rotate(${rotation} ${cx} ${cy})`}
        className="arc-fill"
        style={{ filter: `drop-shadow(0 0 4px ${color})` }}
      />
      {/* Label */}
      <text x={cx} y={cy + 5} textAnchor="middle" fontSize="14" fontWeight="700" fill={color} fontFamily="'JetBrains Mono', monospace">
        {level}
      </text>
    </svg>
  )
}

function SkillCard({ skill, index, visible }) {
  return (
    <div
      className={`skill-card${visible ? ' visible' : ''}`}
      style={{ '--skill-color': skill.color, animationDelay: `${index * 0.07}s` }}
      data-cursor-hover
    >
      <div className="skill-top">
        <ArcGauge level={skill.level} color={skill.color} size={90} />
      </div>
      <div className="skill-name">{skill.name}</div>
      <div className="skill-category">{skill.category}</div>
    </div>
  )
}

export default function TechStack() {
  const { ref, visible } = useScrollReveal(0.1)

  return (
    <section id="stack" className="techstack">
      <div className="section-inner" ref={ref}>
        <div className={`reveal-group${visible ? ' visible' : ''}`}>
          <p className="section-tag">03 · Tech Stack</p>
          <h2 className="section-title">
            Tools & <span>Technologies</span>
          </h2>
          <p className="section-desc">
            Enterprise data engineering with battle-tested platforms. Each skill backed by production deployments at scale.
          </p>
        </div>

        <div className="skills-grid">
          {SKILLS.map((skill, i) => (
            <SkillCard key={skill.name} skill={skill} index={i} visible={visible} />
          ))}
        </div>

        <div className={`also-know${visible ? ' visible' : ''}`}>
          <span className="also-label">Also proficient in:</span>
          {['dbt', 'Apache Kafka', 'Synapse Analytics', 'Power Automate', 'Git', 'Docker', 'DAX', 'M Query'].map(t => (
            <span key={t} className="also-tag">{t}</span>
          ))}
        </div>
      </div>
    </section>
  )
}
