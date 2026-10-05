import { useEffect, useState } from 'react'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import { useLanguage } from '../../context/LanguageContext'
import powerBiIcon from '../../assets/icons/fabric/power_bi_48_color.svg'
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
    <div className="pbi-card">
      <div className="pbi-card-value">{format(count)}</div>
      <div className="pbi-card-label">{label}</div>
      <div className="pbi-card-note">
        {delta == null ? trendText : `${delta >= 0 ? '▲' : '▼'} ${Math.abs(delta).toFixed(0)}% ${trendText}`}
      </div>
    </div>
  )
}

function Visual({ title, className = '', children }) {
  return (
    <div className={`pbi-visual ${className}`}>
      <div className="pbi-visual-head">
        <span className="pbi-visual-title">{title}</span>
        <span className="pbi-visual-more" aria-hidden="true">···</span>
      </div>
      {children}
    </div>
  )
}

function SeasonChart({ title, months, legend, series, active }) {
  const max = Math.max(...series.all)
  const W = 560, H = 190, padL = 34, padB = 22, padT = 8
  const x = (i) => padL + (i / 11) * (W - padL - 8)
  const y = (v) => padT + (1 - v / max) * (H - padT - padB)
  const line = (arr) => arr.map((v, i) => `${x(i)},${y(v)}`).join(' ')
  const ticks = [0, 0.5, 1].map(f => Math.round(max * f))
  return (
    <Visual title={title}>
      <div className="season-legend">
        <span><i className="dot m" />{legend.member}</span>
        <span><i className="dot c" />{legend.casual}</span>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} className="season-svg" preserveAspectRatio="none">
        {ticks.map(t => (
          <g key={t}>
            <line x1={padL} x2={W - 8} y1={y(t)} y2={y(t)} className="grid" />
            <text x={padL - 6} y={y(t)} className="axis" textAnchor="end" dy="0.32em">{t}</text>
          </g>
        ))}
        {months.map((m, i) => (
          <text key={i} x={x(i)} y={H - 6} className="axis" textAnchor="middle">{m}</text>
        ))}
        {sum(series.member) > 0 && <polyline key={`m${series.member.join()}`} points={line(series.member)} className={`s-line m${active ? ' draw' : ''}`} />}
        {sum(series.casual) > 0 && <polyline key={`c${series.casual.join()}`} points={line(series.casual)} className={`s-line c${active ? ' draw' : ''}`} />}
      </svg>
    </Visual>
  )
}

function BarChart({ active, label, data, labels, casual, stacked }) {
  const max = Math.max(...data)
  return (
    <Visual title={label}>
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
    </Visual>
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
    <Visual title={label} className="donut-box">
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
    </Visual>
  )
}

export default function PowerBIDemo() {
  const { ref, visible } = useScrollReveal(0.15)
  const { t } = useLanguage()
  const p = t.powerbi
  const [type, setType] = useState('all')
  const [page, setPage] = useState(0)
  const d = compute(type)
  const delta = (v, base) => (type === 'all' ? null : ((v - base) / base) * 100)
  const trendText = type === 'all' ? p.baseline : p.vsAll

  const kpis = [
    { label: p.kpis[0], value: d.total, format: n => n.toLocaleString(), delta: delta(d.total, ALL.total) },
    { label: p.kpis[1], value: Math.round(d.avgMin * 10), format: n => (n / 10).toFixed(1), delta: delta(d.avgMin, ALL.avgMin) },
    { label: p.kpis[2], value: Math.round(d.weekend), format: n => `${n}%`, delta: delta(d.weekend, ALL.weekend) },
    { label: p.kpis[3], value: Math.round(d.bikes[1]), format: n => `${n}%`, delta: delta(d.bikes[1], ALL.bikes[1]) },
  ]
  const peakIdx = d.monthly.indexOf(Math.max(...d.monthly))
  const summerPct = Math.round((sum(d.monthly.slice(5, 8)) / sum(d.monthly)) * 100)
  const seasonKpis = [
    { label: p.peakMonth, value: peakIdx, format: () => p.monthNames[peakIdx], delta: null },
    { label: p.summerShare, value: summerPct, format: n => `${n}%`, delta: null },
  ]
  const seasonSeries = {
    all: d.monthly,
    member: type === 'casual' ? d.monthly.map(() => 0) : MONTHLY.member,
    casual: type === 'member' ? d.monthly.map(() => 0) : MONTHLY.casual,
  }

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
          <div className="pbi-appbar">
            <img src={powerBiIcon} alt="" width="20" height="20" />
            <span className="pbi-app">{p.appName}</span>
            <span className="pbi-crumb">{p.workspace} <i>›</i> {p.shellTitle}</span>
            <span className="pbi-badge">{p.liveBadge}</span>
          </div>

          <div className="pbi-ribbon">
            <span className="pbi-report-name">{p.shellTitle}</span>
            <span className="pbi-menu" aria-hidden="true">
              {p.menu.map(m => <span key={m}>{m}</span>)}
            </span>
            <button type="button" className="pbi-reset" onClick={() => setType('all')} disabled={type === 'all'}>
              {p.resetFilters}
            </button>
          </div>

          <div className="pbi-canvas">
            <div className="pbi-visual pbi-slicer" role="group" aria-label={p.slicerLabel}>
              <div className="pbi-visual-head">
                <span className="pbi-visual-title">{p.slicerLabel}</span>
                <span className="pbi-visual-more" aria-hidden="true">···</span>
              </div>
              {['all', 'member', 'casual'].map(k => (
                <button
                  key={k}
                  type="button"
                  className={`slicer-opt${type === k ? ' active' : ''}`}
                  aria-pressed={type === k}
                  onClick={() => setType(k)}
                >
                  <span className="check" aria-hidden="true" />
                  {p.slicer[k]}
                </button>
              ))}
            </div>

            {page === 0 ? (
              <div className="pbi-page">
                <div className="pbi-cards">
                  {kpis.map(k => <KPICard key={k.label} {...k} trendText={trendText} active={visible} />)}
                </div>
                <div className="pbi-charts">
                  <BarChart active={visible} label={p.barChartLabel} data={d.weekday} casual={d.casualWeekday} stacked={type === 'all'} labels={p.weekdays} />
                  <DonutChart label={p.donutLabel} centerLabel={p.donutCenter} names={p.bikeTypes} values={d.bikes} />
                </div>
              </div>
            ) : (
              <div className="pbi-page">
                <div className="pbi-cards two">
                  {seasonKpis.map(k => <KPICard key={k.label} {...k} trendText="" active={visible} />)}
                </div>
                <SeasonChart title={p.seasonTitle} months={p.months} legend={p.legend} series={seasonSeries} active={visible} />
              </div>
            )}
          </div>

          <p className="pbi-insight" aria-live="polite">{p.insights[type]}</p>

          <div className="pbi-pages" role="tablist">
            {p.tabs.map((tab, i) => (
              <button
                key={tab}
                type="button"
                role="tab"
                aria-selected={page === i}
                className={`pbi-tab${page === i ? ' active' : ''}`}
                onClick={() => setPage(i)}
              >
                {tab}
              </button>
            ))}
            <span className="pbi-status">{p.pageLabel} {page + 1} {p.ofLabel} {p.tabs.length} · {p.footer.note}</span>
          </div>
        </div>
      </div>
    </section>
  )
}
