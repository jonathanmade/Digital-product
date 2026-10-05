import { useEffect, useState } from 'react'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import { useLanguage } from '../../context/LanguageContext'
import './PowerBIDemo.css'

function useCounter(target, duration = 1800, active) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    if (!active) return
    let start = null
    const step = (ts) => {
      if (!start) start = ts
      const p = Math.min((ts - start) / duration, 1)
      const ease = 1 - Math.pow(1 - p, 3)
      setValue(Math.floor(ease * target))
      if (p < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [active, target, duration])
  return value
}

// Illustrative sample data modelled on the Cyclistic bike-share case study.
// Rides in thousands per month, per rider type.
const MONTHLY = {
  member: [118, 125, 170, 255, 340, 420, 460, 450, 410, 330, 215, 140],
  casual: [28, 32, 60, 120, 210, 320, 380, 365, 270, 150, 60, 35],
}
// Share of rides per weekday (Mon..Sun), percent.
const WEEKDAY_SHARE = {
  member: [15.6, 16.4, 16.8, 16.6, 15.8, 10.4, 8.4],
  casual: [11, 9.5, 10, 11, 13.5, 23, 22],
}
// Bike type mix (classic, electric, docked), percent.
const BIKE_MIX = { member: [56, 44, 0], casual: [47, 40, 13] }
// Average ride length in minutes.
const AVG_MIN = { member: 12.4, casual: 27.8 }

const sum = (a) => a.reduce((x, y) => x + y, 0)

function compute(type) {
  const types = type === 'all' ? ['member', 'casual'] : [type]
  const monthly = MONTHLY.member.map((_, i) => sum(types.map(k => MONTHLY[k][i])))
  const total = sum(monthly)
  const weekday = WEEKDAY_SHARE.member.map((_, d) =>
    sum(types.map(k => sum(MONTHLY[k]) * WEEKDAY_SHARE[k][d] / 100)))
  const casualWeekday = WEEKDAY_SHARE.casual.map((sh) =>
    types.includes('casual') ? sum(MONTHLY.casual) * sh / 100 : 0)
  const weigh = (fn) => sum(types.map(k => sum(MONTHLY[k]) * fn(k))) / total
  return {
    monthly,
    weekday,
    casualWeekday,
    total: Math.round(total * 1000),
    avgMin: weigh(k => AVG_MIN[k]),
    weekend: weigh(k => (WEEKDAY_SHARE[k][5] + WEEKDAY_SHARE[k][6])),
    bikes: [0, 1, 2].map(b => weigh(k => BIKE_MIX[k][b])),
  }
}

const ALL = compute('all')

function KPICard({ label, value, format, delta, trendText, active }) {
  const count = useCounter(value, 900, active)
  return (
    <div className="kpi-card" style={{ '--kpi-color': 'var(--cyan)' }}>
      <div className="kpi-value">{format(count)}</div>
      <div className="kpi-label">{label}</div>
      <div className="kpi-trend flat">
        {delta == null ? trendText : `${delta >= 0 ? '↑' : '↓'} ${Math.abs(delta).toFixed(0)}% ${trendText}`}
      </div>
    </div>
  )
}

function BarChart({ active, label, data, labels, casual, stacked }) {
  const max = Math.max(...data)
  return (
    <div className="chart-box">
      <div className="chart-label">{label}</div>
      <div className="bar-chart">
        {data.map((v, i) => (
          <div key={i} className="bar-col">
            <div
              className={`bar-fill${active ? ' animated' : ''}`}
              style={{ '--bar-height': `${(v / max) * 100}%`, animationDelay: `${i * 0.05}s` }}
              title={`${Math.round(v)}K`}
            >
              {stacked && <span className="bar-casual" style={{ height: `${(casual[i] / v) * 100}%` }} />}
            </div>
            <span className="bar-month">{labels[i]}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function LineChart({ active, label, data }) {
  const max = Math.max(...ALL.monthly)
  const pts = data.map((v, i) => `${(i / (data.length - 1)) * 280},${86 - (v / max) * 76}`).join(' ')
  return (
    <div className="chart-box">
      <div className="chart-label">{label}</div>
      <svg width="100%" height="100" viewBox="0 0 280 90" preserveAspectRatio="none" className="line-chart">
        <defs>
          <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--cyan)" />
            <stop offset="100%" stopColor="var(--cyan)" stopOpacity="0.4" />
          </linearGradient>
          <linearGradient id="area-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="var(--cyan)" stopOpacity="0.25" />
            <stop offset="100%" stopColor="var(--cyan)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <polygon points={`0,90 ${pts} 280,90`} fill="url(#area-gradient)" />
        <polyline
          key={pts}
          points={pts}
          fill="none"
          stroke="url(#line-gradient)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={active ? 'line-draw' : ''}
        />
      </svg>
    </div>
  )
}

const DONUT_COLORS = ['var(--cyan)', 'rgba(var(--cyan-rgb), 0.55)', 'rgba(var(--cyan-rgb), 0.28)']

function DonutChart({ label, centerLabel, names, values }) {
  const r = 36, cx = 50, cy = 50
  const circ = 2 * Math.PI * r
  const segs = values.map((pct, i) => ({ name: names[i], pct, color: DONUT_COLORS[i] })).filter(s => s.pct > 0.5)
  const arcs = segs.reduce((acc, s) => {
    const dashLen = circ * (s.pct / 100)
    const offset = acc.length ? acc[acc.length - 1].offset + acc[acc.length - 1].dashLen : 0
    return [...acc, { ...s, dashLen, offset }]
  }, [])
  return (
    <div className="chart-box donut-box">
      <div className="chart-label">{label}</div>
      <div className="donut-wrap">
        <svg width="100" height="100" viewBox="0 0 100 100">
          {arcs.map((s) => (
            <circle
              key={s.name}
              cx={cx} cy={cy} r={r}
              fill="none"
              stroke={s.color}
              strokeWidth="14"
              strokeDasharray={`${s.dashLen} ${circ - s.dashLen}`}
              strokeDashoffset={-s.offset}
              transform={`rotate(-90 ${cx} ${cy})`}
            />
          ))}
          <text x={cx} y={cy} textAnchor="middle" dy="0.35em" fontSize="11" fill="var(--heading)" fontFamily="'Geist Mono', monospace" fontWeight="700">
            {centerLabel}
          </text>
        </svg>
        <div className="donut-legend">
          {arcs.map(s => (
            <div key={s.name} className="legend-item">
              <span className="legend-dot" style={{ background: s.color }} />
              <span className="legend-label">{s.name}</span>
              <span className="legend-pct">{Math.round(s.pct)}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function PowerBIDemo() {
  const { ref, visible } = useScrollReveal(0.15)
  const { t } = useLanguage()
  const p = t.powerbi
  const [type, setType] = useState('all')
  const d = compute(type)
  const delta = (v, base) => (type === 'all' ? null : ((v - base) / base) * 100)

  const kpis = [
    { label: p.kpis[0], value: d.total, format: n => n.toLocaleString(), delta: delta(d.total, ALL.total) },
    { label: p.kpis[1], value: Math.round(d.avgMin * 10), format: n => (n / 10).toFixed(1), delta: delta(d.avgMin, ALL.avgMin) },
    { label: p.kpis[2], value: Math.round(d.weekend), format: n => `${n}%`, delta: delta(d.weekend, ALL.weekend) },
    { label: p.kpis[3], value: Math.round(d.bikes[1]), format: n => `${n}%`, delta: delta(d.bikes[1], ALL.bikes[1]) },
  ]

  return (
    <section id="powerbi" className="powerbi">
      <div className="section-inner" ref={ref}>
        <div className={`reveal-group${visible ? ' visible' : ''}`}>
          <p className="section-tag">{p.eyebrow}</p>
          <h2 className="section-title">
            {p.titlePre}<span>{p.titleHighlight}</span>{p.titlePost}
          </h2>
          <p className="section-desc">{p.desc}</p>
        </div>

        <div className={`pbi-shell${visible ? ' visible' : ''}`}>
          <div className="pbi-topbar">
            <div className="pbi-dots">
              <span style={{ background: '#ff5f57' }} />
              <span style={{ background: '#febc2e' }} />
              <span style={{ background: '#28c840' }} />
            </div>
            <div className="pbi-title">{p.shellTitle}</div>
            <div className="pbi-badge">{p.liveBadge}</div>
          </div>

          <div className="pbi-slicer" role="group" aria-label={p.slicerLabel}>
            <span className="slicer-label">{p.slicerLabel}</span>
            {['all', 'member', 'casual'].map(k => (
              <button
                key={k}
                type="button"
                className={`slicer-btn${type === k ? ' active' : ''}`}
                aria-pressed={type === k}
                onClick={() => setType(k)}
              >
                {p.slicer[k]}
              </button>
            ))}
          </div>

          <div className="kpi-row">
            {kpis.map(k => (
              <KPICard key={k.label} {...k} trendText={type === 'all' ? p.baseline : p.vsAll} active={visible} />
            ))}
          </div>

          <div className="charts-row">
            <BarChart active={visible} label={p.barChartLabel} data={d.weekday} casual={d.casualWeekday} stacked={type === 'all'} labels={p.weekdays} />
            <LineChart active={visible} label={p.lineChartLabel} data={d.monthly} />
            <DonutChart label={p.donutLabel} centerLabel={p.donutCenter} names={p.bikeTypes} values={d.bikes} />
          </div>

          <p className="pbi-insight" aria-live="polite">{p.insights[type]}</p>

          <div className="pbi-footer">
            <span>{p.footer.source}</span>
            <span>·</span>
            <span><strong>{p.footer.note}</strong></span>
            <span>·</span>
            <span>{p.footer.platform}</span>
          </div>
        </div>
      </div>
    </section>
  )
}
