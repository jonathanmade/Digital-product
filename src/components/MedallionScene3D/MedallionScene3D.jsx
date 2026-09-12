import { useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'
import dataFactoryIconUrl from '../../assets/icons/service-data-factory.svg'
import notebookIconUrl from '../../assets/icons/service-notebook.svg'
import pipelineIconUrl from '../../assets/icons/service-pipeline.svg'
import powerBiIconUrl from '../../assets/icons/service-power-bi.svg'
import { useLanguage } from '../../context/LanguageContext'
import './MedallionScene3D.css'

// 5 nodes: the 4 real Medallion layers (from `layers`) plus a final,
// decorative Dashboard node. Same 4.5-unit spacing as before, just one more.
const NODE_X = [-9, -4.5, 0, 4.5, 9]
const SPEED_STEPS = [
  { key: 'slow', value: 0.5 },
  { key: 'normal', value: 1 },
  { key: 'fast', value: 2 },
]
const PARTICLES_PER_CONNECTION = 14
const ICON_BASE_EMISSIVE = 0.45
const ICON_SELECTED_EMISSIVE = 1.1
// Tilts flat badge/panel planes toward the fixed, elevated camera so they
// read face-on instead of edge-on (camera sits ~24° above the scene).
const CAMERA_FACING_TILT = -0.42

// Landing is ingested via ADF; Bronze/Silver/Gold are all PySpark/notebook
// transforms, so they share the same Notebook icon.
const SERVICE_ICON_BY_LAYER_ID = {
  landing: 'dataFactory',
  bronze: 'notebook',
  silver: 'notebook',
  gold: 'notebook',
}

function resolveCssColor(value, fallback) {
  const match = /var\((--[\w-]+)\)/.exec(value ?? '')
  if (!match) return value || fallback
  const resolved = getComputedStyle(document.documentElement).getPropertyValue(match[1]).trim()
  return resolved || fallback
}

function makeTextSprite(text, colorHex) {
  const lines = text.split(', ')
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  const longest = Math.max(...lines.map(l => l.length))
  const fontSize = Math.max(22, 40 - Math.max(0, longest - 8) * 1.6)
  const lineHeight = fontSize * 1.15

  ctx.font = `700 ${fontSize}px 'JetBrains Mono', monospace`
  const textWidth = Math.max(...lines.map(l => ctx.measureText(l).width))
  canvas.width = Math.ceil(textWidth) + 40
  canvas.height = Math.ceil(lineHeight * lines.length) + 24
  // Canvas resize clears the context — reapply font/state after sizing.
  ctx.font = `700 ${fontSize}px 'JetBrains Mono', monospace`
  ctx.fillStyle = colorHex
  ctx.textBaseline = 'middle'
  ctx.textAlign = 'center'
  ctx.shadowColor = colorHex
  ctx.shadowBlur = 16

  const startY = canvas.height / 2 - ((lines.length - 1) * lineHeight) / 2
  lines.forEach((line, i) => {
    ctx.fillText(line, canvas.width / 2, startY + i * lineHeight)
  })

  const texture = new THREE.CanvasTexture(canvas)
  texture.needsUpdate = true
  const material = new THREE.SpriteMaterial({ map: texture, transparent: true, depthWrite: false })
  const sprite = new THREE.Sprite(material)
  const scale = 0.015
  sprite.scale.set(canvas.width * scale, canvas.height * scale, 1)
  return { sprite, texture, material }
}

// The database icon IS each layer node now (no platform underneath it):
// a short cylinder body with a couple of thin torus rings, the classic
// stacked-disk DB silhouette. Geometry is shared across layers; only the
// material — tinted with the layer's own emissive color — is per-node.
function createDatabaseIcon(colorInt, bodyGeo, ringGeo) {
  const material = new THREE.MeshStandardMaterial({
    color: 0x0d1321,
    emissive: colorInt,
    emissiveIntensity: ICON_BASE_EMISSIVE,
    metalness: 0.25,
    roughness: 0.4,
    transparent: true,
    opacity: 0.92,
  })

  const group = new THREE.Group()
  const body = new THREE.Mesh(bodyGeo, material)
  group.add(body)

  ;[0.22, 0, -0.22].forEach(y => {
    const ring = new THREE.Mesh(ringGeo, material)
    ring.rotation.x = Math.PI / 2
    ring.position.y = y
    group.add(ring)
  })

  return { group, material }
}

// Small texture-plane badge (a service logo) on a dark backing chip — the
// chip keeps the logo legible regardless of theme, since several of the
// official icons wash out against a light background on their own.
function createIconBadge(texture, planeSize, backingRadius) {
  const geo = new THREE.PlaneGeometry(planeSize, planeSize)
  const backingGeo = new THREE.CircleGeometry(backingRadius, 24)
  const backingMat = new THREE.MeshBasicMaterial({ color: 0x0d1321, transparent: true, opacity: 0.6 })
  const backing = new THREE.Mesh(backingGeo, backingMat)
  backing.position.z = -0.02

  const planeMat = new THREE.MeshBasicMaterial({ map: texture, transparent: true, depthWrite: false, opacity: 0.92 })
  const plane = new THREE.Mesh(geo, planeMat)

  const group = new THREE.Group()
  group.add(backing, plane)

  return { group, planeMat, backingMat, geometries: [geo, backingGeo] }
}

export default function MedallionScene3D({ layers }) {
  const containerRef = useRef(null)
  const canvasRef = useRef(null)
  const sceneApiRef = useRef(null)
  const [selectedId, setSelectedId] = useState(null)
  const [paused, setPaused] = useState(false)
  const [speedIndex, setSpeedIndex] = useState(1)
  const { lang, t } = useLanguage()

  const dateLabel = useMemo(
    () => new Date().toLocaleDateString(lang === 'es' ? 'es-ES' : 'en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
    [lang]
  )

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    const disposables = []

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(container.clientWidth, container.clientHeight)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 100)
    camera.position.set(0, 7.5, 17.5)
    camera.lookAt(0, 1, 0)

    scene.add(new THREE.AmbientLight(0xffffff, 0.5))
    const dirLight = new THREE.DirectionalLight(0xffffff, 0.6)
    dirLight.position.set(4, 10, 6)
    scene.add(dirLight)

    const group = new THREE.Group()
    scene.add(group)

    // Shared geometry for the per-layer database icon.
    const dbBodyGeo = new THREE.CylinderGeometry(0.42, 0.42, 0.55, 24)
    const dbRingGeo = new THREE.TorusGeometry(0.425, 0.035, 8, 28)
    disposables.push(() => dbBodyGeo.dispose(), () => dbRingGeo.dispose())

    const textureLoader = new THREE.TextureLoader()
    const dataFactoryTexture = textureLoader.load(dataFactoryIconUrl)
    const notebookTexture = textureLoader.load(notebookIconUrl)
    const pipelineTexture = textureLoader.load(pipelineIconUrl)
    const powerBiTexture = textureLoader.load(powerBiIconUrl)
    disposables.push(
      () => dataFactoryTexture.dispose(),
      () => notebookTexture.dispose(),
      () => pipelineTexture.dispose(),
      () => powerBiTexture.dispose()
    )
    const serviceTextureByKey = { dataFactory: dataFactoryTexture, notebook: notebookTexture }

    const nodes = layers.map((layer, i) => {
      const colorHex = resolveCssColor(layer.color, '#00F5FF')
      const colorInt = new THREE.Color(colorHex)

      const nodeGroup = new THREE.Group()
      nodeGroup.position.set(NODE_X[i], 0, 0)
      group.add(nodeGroup)

      // iconGroup holds everything that highlights/scales together when this
      // layer is selected from the HUD (DB icon + its service badge).
      const iconGroup = new THREE.Group()
      nodeGroup.add(iconGroup)

      const { group: dbGroup, material: dbMaterial } = createDatabaseIcon(colorInt, dbBodyGeo, dbRingGeo)
      dbGroup.position.y = 0.3
      iconGroup.add(dbGroup)
      disposables.push(() => dbMaterial.dispose())

      const glowLight = new THREE.PointLight(colorInt, 1.2, 6)
      glowLight.position.set(0, 0.6, 0)
      nodeGroup.add(glowLight)

      const serviceKey = SERVICE_ICON_BY_LAYER_ID[layer.id]
      const serviceTexture = serviceKey && serviceTextureByKey[serviceKey]
      if (serviceTexture) {
        const { group: badgeGroup, planeMat, backingMat, geometries } = createIconBadge(serviceTexture, 0.55, 0.38)
        badgeGroup.position.set(0, 0.95, 0)
        badgeGroup.rotation.x = CAMERA_FACING_TILT
        iconGroup.add(badgeGroup)
        disposables.push(() => planeMat.dispose(), () => backingMat.dispose(), ...geometries.map(g => () => g.dispose()))
      }

      const { sprite, texture, material: spriteMat } = makeTextSprite(layer.subtitle.toUpperCase(), colorHex)
      sprite.position.set(0, 1.85, 0)
      nodeGroup.add(sprite)
      disposables.push(() => texture.dispose(), () => spriteMat.dispose())

      return { id: layer.id, iconGroup, dbGroup, dbMaterial, bobPhase: i * 0.8 }
    })

    // Overarching Pipeline badge, centered above the 4 real layers (not the
    // dashboard) — represents orchestration of the whole ETL flow.
    const pipelineX = NODE_X.slice(0, layers.length).reduce((a, b) => a + b, 0) / layers.length
    const {
      group: pipelineGroup,
      planeMat: pipelinePlaneMat,
      backingMat: pipelineBackingMat,
      geometries: pipelineGeos,
    } = createIconBadge(pipelineTexture, 0.95, 0.62)
    pipelineGroup.position.set(pipelineX, 3.1, 0)
    pipelineGroup.rotation.x = CAMERA_FACING_TILT
    group.add(pipelineGroup)
    disposables.push(
      () => pipelinePlaneMat.dispose(),
      () => pipelineBackingMat.dispose(),
      ...pipelineGeos.map(g => () => g.dispose())
    )

    // Final decorative node: a dark "powered-off screen" panel with a
    // Power BI badge above it. Not part of `layers` — no HUD pill.
    const dashboardGroup = new THREE.Group()
    dashboardGroup.position.set(NODE_X[4], 0, 0)
    group.add(dashboardGroup)

    const screenGeo = new THREE.BoxGeometry(1.6, 1, 0.08)
    const screenMat = new THREE.MeshStandardMaterial({
      color: 0x0d1321,
      emissive: new THREE.Color(0x00f5ff),
      emissiveIntensity: 0.08,
      metalness: 0.4,
      roughness: 0.35,
    })
    const screenMesh = new THREE.Mesh(screenGeo, screenMat)
    screenMesh.position.y = 0.55
    screenMesh.rotation.x = CAMERA_FACING_TILT
    dashboardGroup.add(screenMesh)
    disposables.push(() => screenGeo.dispose(), () => screenMat.dispose())

    const {
      group: powerBiGroup,
      planeMat: powerBiPlaneMat,
      backingMat: powerBiBackingMat,
      geometries: powerBiGeos,
    } = createIconBadge(powerBiTexture, 0.55, 0.38)
    powerBiGroup.position.set(0, 1.35, 0)
    powerBiGroup.rotation.x = CAMERA_FACING_TILT
    dashboardGroup.add(powerBiGroup)
    disposables.push(
      () => powerBiPlaneMat.dispose(),
      () => powerBiBackingMat.dispose(),
      ...powerBiGeos.map(g => () => g.dispose())
    )

    // 4 connections across the 5 nodes: landing-bronze-silver-gold-dashboard.
    const connections = []
    for (let i = 0; i < NODE_X.length - 1; i++) {
      const start = new THREE.Vector3(NODE_X[i], 0.3, 0)
      const end = new THREE.Vector3(NODE_X[i + 1], 0.3, 0)
      const mid = new THREE.Vector3((start.x + end.x) / 2, 1, 0)
      const curve = new THREE.QuadraticBezierCurve3(start, mid, end)

      const tubeGeo = new THREE.TubeGeometry(curve, 24, 0.03, 8, false)
      const tubeMat = new THREE.MeshBasicMaterial({ color: 0x00f5ff, transparent: true, opacity: 0.22 })
      const tube = new THREE.Mesh(tubeGeo, tubeMat)
      group.add(tube)
      disposables.push(() => tubeGeo.dispose(), () => tubeMat.dispose())

      const particleGeo = new THREE.BufferGeometry()
      const positions = new Float32Array(PARTICLES_PER_CONNECTION * 3)
      particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
      const particleMat = new THREE.PointsMaterial({
        color: 0x00f5ff,
        size: 0.14,
        transparent: true,
        opacity: 0.9,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      })
      const points = new THREE.Points(particleGeo, particleMat)
      group.add(points)
      disposables.push(() => particleGeo.dispose(), () => particleMat.dispose())

      const offsets = Array.from({ length: PARTICLES_PER_CONNECTION }, (_, k) => k / PARTICLES_PER_CONNECTION)
      connections.push({ curve, points, offsets })
    }

    sceneApiRef.current = { nodes, connections }

    let rafId = null
    let lastTime = performance.now()
    let idlePhase = 0

    const animate = (now) => {
      rafId = requestAnimationFrame(animate)
      const dt = Math.min((now - lastTime) / 1000, 0.1)
      lastTime = now

      idlePhase += dt
      group.rotation.y = Math.sin(idlePhase * 0.2) * 0.06
      pipelineGroup.position.y = 3.1 + Math.sin(idlePhase * 0.9) * 0.08
      powerBiGroup.position.y = 1.35 + Math.sin(idlePhase * 0.9 + 1.5) * 0.06

      const speed = sceneApiRef.current.speed ?? 1
      const isPaused = sceneApiRef.current.paused ?? false

      if (!isPaused) {
        connections.forEach(conn => {
          conn.offsets = conn.offsets.map(t => (t + dt * 0.18 * speed) % 1)
          const pos = conn.points.geometry.attributes.position.array
          conn.offsets.forEach((t, idx) => {
            const p = conn.curve.getPoint(t)
            pos[idx * 3] = p.x
            pos[idx * 3 + 1] = p.y
            pos[idx * 3 + 2] = p.z
          })
          conn.points.geometry.attributes.position.needsUpdate = true
        })
      }

      const currentSelected = sceneApiRef.current.selectedId
      nodes.forEach(n => {
        const isSelected = n.id === currentSelected
        const targetEmissive = isSelected ? ICON_SELECTED_EMISSIVE : ICON_BASE_EMISSIVE
        const targetScale = isSelected ? 1.08 : 1

        n.dbMaterial.emissiveIntensity += (targetEmissive - n.dbMaterial.emissiveIntensity) * 0.12
        const s = n.iconGroup.scale.x + (targetScale - n.iconGroup.scale.x) * 0.15
        n.iconGroup.scale.set(s, s, s)

        n.dbGroup.position.y = 0.3 + Math.sin(idlePhase * 1.3 + n.bobPhase) * 0.06
        n.dbGroup.rotation.y += dt * 0.5
      })

      renderer.render(scene, camera)
    }

    let running = false
    const start = () => {
      if (running) return
      running = true
      lastTime = performance.now()
      rafId = requestAnimationFrame(animate)
    }
    const stop = () => {
      running = false
      if (rafId) cancelAnimationFrame(rafId)
      rafId = null
    }

    const onVisibility = () => { if (document.hidden) stop(); else start() }
    document.addEventListener('visibilitychange', onVisibility)
    if (!document.hidden) start()

    const resizeObserver = new ResizeObserver(() => {
      const w = container.clientWidth
      const h = container.clientHeight
      if (w === 0 || h === 0) return
      renderer.setSize(w, h)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
    })
    resizeObserver.observe(container)

    return () => {
      stop()
      document.removeEventListener('visibilitychange', onVisibility)
      resizeObserver.disconnect()
      disposables.forEach(dispose => dispose())
      renderer.dispose()
      sceneApiRef.current = null
    }
  }, [layers])

  // Bridge React state to the imperative Three.js loop without re-running setup.
  useEffect(() => {
    if (!sceneApiRef.current) return
    sceneApiRef.current.selectedId = selectedId
    sceneApiRef.current.paused = paused
    sceneApiRef.current.speed = SPEED_STEPS[speedIndex].value
  }, [selectedId, paused, speedIndex])

  const selectedLayer = layers.find(l => l.id === selectedId) ?? null

  const handleReset = () => {
    setSelectedId(null)
    setPaused(false)
    setSpeedIndex(1)
  }

  return (
    <div className="scene3d-wrap">
      <div className="scene3d-canvas-area" ref={containerRef}>
        <canvas ref={canvasRef} className="scene3d-canvas" />
        <div className="scene3d-labels">
          {layers.map(l => (
            <div key={l.id} className="scene3d-label" style={{ '--label-color': l.color }}>
              <span className="scene3d-label-title">{l.label}</span>
              <span className="scene3d-label-sub">{l.subtitle}</span>
            </div>
          ))}
          <div className="scene3d-label" style={{ '--label-color': 'var(--cyan)' }}>
            <span className="scene3d-label-title">DASHBOARD</span>
            <span className="scene3d-label-sub">Power BI Reports</span>
          </div>
        </div>
      </div>

      <aside className="scene3d-hud">
        <div className="hud-header">
          <span className="hud-title">{t.medallionHud.title}</span>
          <span className="hud-date">{dateLabel}</span>
        </div>

        <div className="hud-panel">
          <span className="hud-panel-title">{t.medallionHud.serviceStatus}</span>
          <ul className="hud-status-list">
            {t.medallionHud.serviceStatusItems.map(s => (
              <li key={s.name}>
                <span className={`hud-status-dot status-${s.statusKey}`} />
                {s.name}
                <span className="hud-status-value">{s.status}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="hud-panel">
          <span className="hud-panel-title">{t.medallionHud.layerMetadata}</span>
          <div className="hud-pills">
            {layers.map(l => (
              <button
                key={l.id}
                className={`hud-pill${selectedId === l.id ? ' active' : ''}`}
                style={{ '--pill-color': l.color }}
                onClick={() => setSelectedId(id => (id === l.id ? null : l.id))}
              >
                {l.label}
              </button>
            ))}
          </div>

          {selectedLayer && (
            <div className="hud-selected" style={{ '--pill-color': selectedLayer.color }}>
              <span className="hud-selected-title">{t.medallionHud.selected(selectedLayer.label)}</span>
              <dl className="hud-selected-meta">
                <div><dt>{t.medallionHud.dataFormat}</dt><dd>{selectedLayer.dataFormat}</dd></div>
                <div><dt>{t.medallionHud.storage}</dt><dd>{selectedLayer.storage}</dd></div>
                <div><dt>{t.medallionHud.transform}</dt><dd>{selectedLayer.transform}</dd></div>
                <div><dt>{t.medallionHud.status}</dt><dd>{selectedLayer.status}</dd></div>
              </dl>
            </div>
          )}
        </div>

        <div className="hud-panel">
          <span className="hud-panel-title">{t.medallionHud.controls}</span>
          <div className="hud-controls">
            <button className="hud-btn" onClick={handleReset}>{t.medallionHud.resetView}</button>
            <button className="hud-btn" onClick={() => setPaused(p => !p)}>
              {t.medallionHud.toggleFlow(paused)}
            </button>
            <button className="hud-btn" onClick={() => setSpeedIndex(i => (i + 1) % SPEED_STEPS.length)}>
              {t.medallionHud.speed(t.medallionHud.speedLabels[SPEED_STEPS[speedIndex].key])}
            </button>
          </div>
        </div>
      </aside>
    </div>
  )
}
