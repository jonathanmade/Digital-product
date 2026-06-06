import { useEffect, useRef, useState } from 'react'
import { useScrollReveal } from '../../hooks/useScrollReveal'
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

function KPICard({ kpi, active }) {
  const count = useCounter(kpi.target, 1800, active)

  return (
    <div className="kpi-card" style={{ '--kpi-color': kpi.color }}>
      <div className="kpi-icon">{kpi.icon}</div>
      <div className="kpi-value">
        {kpi.prefix}{count.toLocaleString()}{kpi.suffix}
      </div>
      <div className="kpi-label">{kpi.label}</div>
      <div className={`kpi-trend ${kpi.trendUp ? 'up' : 'down'}`}>
        {kpi.trendUp ? '↑' : '↓'} {kpi.trend}
      </div>
    </div>
  )
}

const BAR_DATA = [42, 68, 55, 80, 73, 91, 64, 88, 77, 95, 82, 100]
const MONTHS = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D']

function BarChart({ active }) {
  return (
    <div className="chart-box">
      <div className="chart-label">Pipeline Volume · Monthly</div>
      <div className="bar-chart">
        {BAR_DATA.map((h, i) => (
          <div key={i} className="bar-col">
            <div
              className={`bar-fill${active ? ' animated' : ''}`}
              style={{ '--bar-height': `${h}%`, animationDelay: `${i * 0.06}s` }}
            />
            <span className="bar-month">{MONTHS[i]}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

const LINE_POINTS = [20, 35, 28, 50, 42, 65, 58, 72, 68, 85, 78, 92]

function LineChart({ active }) {
  const pts = LINE_POINTS.map((y, i) => `${(i / (LINE_POINTS.length - 1)) * 280},${90 - y * 0.8}`).join(' ')
  return (
    <div className="chart-box">
      <div className="chart-label">Latency Trend (ms)</div>
      <svg width="100%" height="100" viewBox="0 0 280 90" preserveAspectRatio="none" className="line-chart">
        <defs>
          <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00F5FF" />
            <stop offset="100%" stopColor="#7B2FFF" />
          </linearGradient>
          <linearGradient id="area-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#00F5FF" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#00F5FF" stopOpacity="0" />
          </linearGradient>
        </defs>
        <polygon
          points={`0,90 ${pts} 280,90`}
          fill="url(#area-gradient)"
        />
        <polyline
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

const DONUT_SEGMENTS = [
  { label: 'SAP', pct: 42, color: '#FFB800' },
  { label: 'Salesforce', pct: 28, color: '#00F5FF' },
  { label: 'Odoo', pct: 18, color: '#7B2FFF' },
  { label: 'Zinc', pct: 12, color: '#b87333' },
]

function DonutChart() {
  const r = 36, cx = 50, cy = 50
  const circ = 2 * Math.PI * r
  let offset = 0
  return (
    <div className="chart-box donut-box">
      <div className="chart-label">Source Distribution</div>
      <div className="donut-wrap">
        <svg width="100" height="100" viewBox="0 0 100 100">
          {DONUT_SEGMENTS.map((s, i) => {
            const dashLen = circ * (s.pct / 100)
            const seg = (
              <circle
                key={s.label}
                cx={cx} cy={cy} r={r}
                fill="none"
                stroke={s.color}
                strokeWidth="14"
                strokeDasharray={`${dashLen} ${circ - dashLen}`}
                strokeDashoffset={-offset}
                transform={`rotate(-90 ${cx} ${cy})`}
                style={{ filter: `drop-shadow(0 0 3px ${s.color})` }}
              />
            )
            offset += dashLen
            return seg
          })}
          <text x={cx} y={cy} textAnchor="middle" dy="0.35em" fontSize="11" fill="white" fontFamily="'JetBrains Mono', monospace" fontWeight="700">
            4 src
          </text>
        </svg>
        <div className="donut-legend">
          {DONUT_SEGMENTS.map(s => (
            <div key={s.label} className="legend-item">
              <span className="legend-dot" style={{ background: s.color }} />
              <span className="legend-label">{s.label}</span>
              <span className="legend-pct">{s.pct}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const KPIS = [
  { icon: '💰', label: 'Revenue Processed', target: 4872340, prefix: '€', suffix: '', color: '#FFB800', trend: '+12.4% MoM', trendUp: true },
  { icon: '⚡', label: 'Pipelines Active', target: 247, prefix: '', suffix: '', color: '#00F5FF', trend: '+8 this week', trendUp: true },
  { icon: '👥', label: 'Active Users', target: 532, prefix: '', suffix: '', color: '#7B2FFF', trend: '+3.1% WoW', trendUp: true },
  { icon: '⏱', label: 'Avg Latency (ms)', target: 380, prefix: '', suffix: 'ms', color: '#b87333', trend: '-45ms', trendUp: false },
]

export default function PowerBIDemo() {
  const { ref, visible } = useScrollReveal(0.15)

  return (
    <section id="powerbi" className="powerbi">
      <div className="section-inner" ref={ref}>
        <div className={`reveal-group${visible ? ' visible' : ''}`}>
          <p className="section-tag">05 · Power BI Demo</p>
          <h2 className="section-title">
            Live Data <span>Dashboard</span>
          </h2>
          <p className="section-desc">
            Simulated Power BI Embedded environment showcasing Direct Lake analytics.
          </p>
        </div>

        <div className={`pbi-shell${visible ? ' visible' : ''}`}>
          {/* Shell header */}
          <div className="pbi-topbar">
            <div className="pbi-dots">
              <span style={{ background: '#ff5f57' }} />
              <span style={{ background: '#febc2e' }} />
              <span style={{ background: '#28c840' }} />
            </div>
            <div className="pbi-title">Jonatan Marín · Analytics Suite</div>
            <div className="pbi-badge">
              <span className="live-dot" />
              Live Data · Direct Lake Mode
            </div>
          </div>

          {/* KPI row */}
          <div className="kpi-row">
            {KPIS.map(kpi => (
              <KPICard key={kpi.label} kpi={kpi} active={visible} />
            ))}
          </div>

          {/* Charts row */}
          <div className="charts-row">
            <BarChart active={visible} />
            <LineChart active={visible} />
            <DonutChart />
          </div>

          {/* Watermark */}
          <div className="pbi-footer">
            <span>Last refresh: <strong>just now</strong></span>
            <span>·</span>
            <span>Microsoft Fabric · Direct Lake</span>
            <span>·</span>
            <span>Medallion v3.1</span>
          </div>
        </div>
      </div>
    </section>
  )
}
