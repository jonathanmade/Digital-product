import { useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'
import fabricIconUrl from '../../assets/icons/fabric/fabric_48_color.svg'
import dataFactoryIconUrl from '../../assets/icons/fabric/data_factory_48_color.svg'
import notebookIconUrl from '../../assets/icons/fabric/notebook_48_item.svg'
import pipelineIconUrl from '../../assets/icons/fabric/pipeline_48_item.svg'
import powerBiIconUrl from '../../assets/icons/fabric/power_bi_48_color.svg'
import { useLanguage } from '../../context/LanguageContext'
import './MedallionScene3D.css'

// 6 nodes, evenly spaced: Source (ADF entry point) → Landing (raw ADLS Gen2
// storage, synthetic) → the real Medallion layers (from `layers`) → Dashboard
// (decorative Power BI node).
const NODE_SPACING = 4.5
const SPEED_STEPS = [
  { key: 'slow', value: 0.5 },
  { key: 'normal', value: 1 },
  { key: 'fast', value: 2 },
]
const PARTICLES_PER_CONNECTION = 14
const ICON_BASE_EMISSIVE = 0.45
const ICON_SELECTED_EMISSIVE = 1.1
// Tilts flat endpoint panels toward the fixed, elevated camera so they read
// face-on instead of edge-on (camera sits ~24° above the scene). Icon sprites
// don't need this — sprites always billboard toward the camera already.
const CAMERA_FACING_TILT = -0.42

function resolveCssColor(value, fallback) {
  const match = /var\((--[\w-]+)\)/.exec(value ?? '')
  if (!match) return value || fallback
  const resolved = getComputedStyle(document.documentElement).getPropertyValue(match[1]).trim()
  return resolved || fallback
}

function resolveCssRgbTriplet(varName, fallback) {
  const resolved = getComputedStyle(document.documentElement).getPropertyValue(varName).trim()
  return resolved || fallback
}

function makeTextSprite(text, colorHex, scale = 0.015) {
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
  sprite.scale.set(canvas.width * scale, canvas.height * scale, 1)
  return { sprite, texture, material }
}

// Vector icon SVGs are cheap to keep loaded for the lifetime of the module —
// caching the Image avoids re-fetching/re-decoding the same icon each time it
// is reused across nodes (e.g. the Notebook icon on Bronze/Silver/Gold).
const iconImageCache = new Map()
function loadCachedIconImage(url) {
  if (!iconImageCache.has(url)) {
    const img = new Image()
    img.src = url
    iconImageCache.set(url, img)
  }
  return iconImageCache.get(url)
}

// Vector service/product logo as a billboard sprite (always faces the fixed
// camera, unlike a tilted plane mesh) — drawn into an offscreen canvas well
// above the SVG's own intrinsic size so it stays crisp at any scale, on a
// dark backing chip so the logo reads on either theme.
function makeIconSprite(svgUrl, worldSize = 0.6, canvasSize = 256) {
  const canvas = document.createElement('canvas')
  canvas.width = canvasSize
  canvas.height = canvasSize
  const ctx = canvas.getContext('2d')

  const panelRgb = resolveCssRgbTriplet('--panel-rgb', '13, 19, 33')
  ctx.beginPath()
  ctx.arc(canvasSize / 2, canvasSize / 2, canvasSize * 0.47, 0, Math.PI * 2)
  ctx.fillStyle = `rgba(${panelRgb}, 0.6)`
  ctx.fill()

  const texture = new THREE.CanvasTexture(canvas)
  texture.needsUpdate = true
  const material = new THREE.SpriteMaterial({ map: texture, transparent: true, depthWrite: false })
  const sprite = new THREE.Sprite(material)
  sprite.scale.set(worldSize, worldSize, 1)

  const drawIcon = () => {
    const pad = canvasSize * 0.15
    ctx.drawImage(img, pad, pad, canvasSize - pad * 2, canvasSize - pad * 2)
    texture.needsUpdate = true
  }

  const img = loadCachedIconImage(svgUrl)
  if (img.complete && img.naturalWidth) drawIcon()
  else img.addEventListener('load', drawIcon, { once: true })

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

// Three thin stacked plates under the Landing node — a schematic server rack,
// standing in for the physical ADLS Gen2 storage behind the raw drop zone.
function createServerRack(colorInt) {
  const geometry = new THREE.BoxGeometry(0.62, 0.08, 0.4)
  const material = new THREE.MeshStandardMaterial({
    color: 0x0d1321,
    emissive: colorInt,
    emissiveIntensity: 0.35,
    metalness: 0.6,
    roughness: 0.3,
  })

  const group = new THREE.Group()
  ;[0.11, 0, -0.11].forEach(y => {
    const plate = new THREE.Mesh(geometry, material)
    plate.position.y = y
    group.add(plate)
  })

  return { group, material, geometry }
}

// Flat "screen" panel used for the two non-Medallion bookend nodes (Source /
// Dashboard) — a dark chip tilted to face the camera, tinted per node.
function createEndpointPanel(colorInt) {
  const geometry = new THREE.BoxGeometry(1.6, 1, 0.08)
  const material = new THREE.MeshStandardMaterial({
    color: 0x0d1321,
    emissive: colorInt,
    emissiveIntensity: 0.12,
    metalness: 0.4,
    roughness: 0.35,
  })
  const mesh = new THREE.Mesh(geometry, material)
  mesh.rotation.x = CAMERA_FACING_TILT
  return { mesh, material, geometry }
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
    const camera = new THREE.PerspectiveCamera(46, container.clientWidth / container.clientHeight, 0.1, 100)
    camera.position.set(0, 8.5, 20)
    camera.lookAt(0, 1.2, 0)

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

    // Source + <real layers, incl. Landing> + Dashboard, evenly spaced and centered.
    const totalNodes = layers.length + 2
    const NODE_X = Array.from({ length: totalNodes }, (_, i) => (i - (totalNodes - 1) / 2) * NODE_SPACING)
    const sourceX = NODE_X[0]
    const dashboardX = NODE_X[totalNodes - 1]

    const azureColorHex = resolveCssColor('var(--azure)', '#0078D4')
    const azureColorInt = new THREE.Color(azureColorHex)
    const pbiColorHex = resolveCssColor('var(--pbi)', '#F2C811')
    const pbiColorInt = new THREE.Color(pbiColorHex)

    // `layers` is Landing/Bronze/Silver/Gold (in that order) for this case
    // study. Landing gets the server-rack mesh (physical ADLS Gen2 storage);
    // the rest get the Notebook badge (PySpark transforms).
    const dbSpecs = layers.map(l => ({
      id: l.id,
      color: l.color,
      label: l.subtitle.toUpperCase(),
      hasRack: l.id === 'landing',
      serviceIcon: l.id === 'landing' ? null : 'notebook',
    }))

    const nodes = dbSpecs.map((spec, i) => {
      const colorHex = resolveCssColor(spec.color, '#00F5FF')
      const colorInt = new THREE.Color(colorHex)
      const x = NODE_X[i + 1]

      const nodeGroup = new THREE.Group()
      nodeGroup.position.set(x, 0, 0)
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

      if (spec.hasRack) {
        const { group: rackGroup, material: rackMaterial, geometry: rackGeo } = createServerRack(colorInt)
        rackGroup.position.y = -0.35
        nodeGroup.add(rackGroup)
        disposables.push(() => rackMaterial.dispose(), () => rackGeo.dispose())
      }

      if (spec.serviceIcon === 'notebook') {
        const { sprite, texture, material } = makeIconSprite(notebookIconUrl, 0.5)
        sprite.position.set(0, 0.95, 0)
        iconGroup.add(sprite)
        disposables.push(() => texture.dispose(), () => material.dispose())
      }

      const { sprite, texture, material: spriteMat } = makeTextSprite(spec.label, colorHex)
      sprite.position.set(0, 1.85, 0)
      nodeGroup.add(sprite)
      disposables.push(() => texture.dispose(), () => spriteMat.dispose())

      return { id: spec.id, iconGroup, dbGroup, dbMaterial, bobPhase: i * 0.8 }
    })

    // Overarching Microsoft Fabric badge, centered above the whole scene —
    // the platform all 4 storage/compute nodes run on.
    const { sprite: fabricSprite, texture: fabricTex, material: fabricMat } = makeIconSprite(fabricIconUrl, 0.95)
    fabricSprite.position.set(0, 2.55, 0)
    group.add(fabricSprite)
    disposables.push(() => fabricTex.dispose(), () => fabricMat.dispose())

    // Pipeline badge sits above the Fabric badge — the orchestrator
    // coordinating Landing → Bronze → Silver → Gold — with a short label.
    const { sprite: pipelineSprite, texture: pipelineTex, material: pipelineMat } = makeIconSprite(pipelineIconUrl, 0.85)
    pipelineSprite.position.set(-0.85, 3.55, 0)
    group.add(pipelineSprite)
    disposables.push(() => pipelineTex.dispose(), () => pipelineMat.dispose())

    // Small text-sprite scale (vs. the 0.015 default used for layer labels) —
    // "PIPELINE" only needs to sit compactly beside its icon, not span a node.
    const { sprite: pipelineLabel, texture: pipelineLabelTex, material: pipelineLabelMat } = makeTextSprite('PIPELINE', resolveCssColor('var(--cyan)', '#00F5FF'), 0.009)
    pipelineLabel.position.set(0.95, 3.55, 0)
    group.add(pipelineLabel)
    disposables.push(() => pipelineLabelTex.dispose(), () => pipelineLabelMat.dispose())

    // Source node: Azure Data Factory ingesting from the enterprise systems,
    // the entry point before Landing. Decorative — not part of `layers`.
    const sourceGroup = new THREE.Group()
    sourceGroup.position.set(sourceX, 0, 0)
    group.add(sourceGroup)

    const { mesh: sourcePanelMesh, material: sourcePanelMat, geometry: sourcePanelGeo } = createEndpointPanel(azureColorInt)
    sourcePanelMesh.position.y = 0.55
    sourceGroup.add(sourcePanelMesh)
    disposables.push(() => sourcePanelMat.dispose(), () => sourcePanelGeo.dispose())

    const { sprite: adfSprite, texture: adfTex, material: adfMat } = makeIconSprite(dataFactoryIconUrl, 0.55)
    adfSprite.position.set(0, 1.35, 0)
    sourceGroup.add(adfSprite)
    disposables.push(() => adfTex.dispose(), () => adfMat.dispose())

    const sourceGlow = new THREE.PointLight(azureColorInt, 1, 6)
    sourceGlow.position.set(0, 0.6, 0)
    sourceGroup.add(sourceGlow)

    // Final decorative node: a dark panel with a Power BI badge above it.
    // Not part of `layers` — no HUD pill.
    const dashboardGroup = new THREE.Group()
    dashboardGroup.position.set(dashboardX, 0, 0)
    group.add(dashboardGroup)

    const { mesh: dashboardPanelMesh, material: dashboardPanelMat, geometry: dashboardPanelGeo } = createEndpointPanel(pbiColorInt)
    dashboardPanelMesh.position.y = 0.55
    dashboardGroup.add(dashboardPanelMesh)
    disposables.push(() => dashboardPanelMat.dispose(), () => dashboardPanelGeo.dispose())

    const { sprite: powerBiSprite, texture: powerBiTex, material: powerBiMat } = makeIconSprite(powerBiIconUrl, 0.55)
    powerBiSprite.position.set(0, 1.35, 0)
    dashboardGroup.add(powerBiSprite)
    disposables.push(() => powerBiTex.dispose(), () => powerBiMat.dispose())

    const dashboardGlow = new THREE.PointLight(pbiColorInt, 1, 6)
    dashboardGlow.position.set(0, 0.6, 0)
    dashboardGroup.add(dashboardGlow)

    // Connections across every adjacent pair, source through dashboard — the
    // "nodes/network" particle flow already reads well as a data pipeline.
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
      fabricSprite.position.y = 2.55 + Math.sin(idlePhase * 0.9) * 0.07
      pipelineSprite.position.y = 3.55 + Math.sin(idlePhase * 0.9 + 1.1) * 0.08
      pipelineLabel.position.y = 3.55 + Math.sin(idlePhase * 0.9 + 1.1) * 0.08
      adfSprite.position.y = 1.35 + Math.sin(idlePhase * 0.9 + 0.6) * 0.06
      powerBiSprite.position.y = 1.35 + Math.sin(idlePhase * 0.9 + 1.5) * 0.06

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
          <div className="scene3d-label" style={{ '--label-color': 'var(--azure)' }}>
            <span className="scene3d-label-title">SOURCE</span>
            <span className="scene3d-label-sub">SAP · Salesforce · Odoo · Zinc</span>
          </div>
          {layers.map(l => (
            <div key={l.id} className="scene3d-label" style={{ '--label-color': l.color }}>
              <span className="scene3d-label-title">{l.label}</span>
              <span className="scene3d-label-sub">{l.subtitle}</span>
            </div>
          ))}
          <div className="scene3d-label" style={{ '--label-color': 'var(--pbi)' }}>
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
          <span className="hud-panel-title">{t.medallionHud.vendor}</span>
          <div className="hud-vendor-chips">
            <span className="hud-vendor-chip" style={{ '--vendor-color': 'var(--azure)' }}>Azure</span>
            <span className="hud-vendor-chip" style={{ '--vendor-color': 'var(--fabric)' }}>Fabric</span>
            <span className="hud-vendor-chip" style={{ '--vendor-color': 'var(--pbi)' }}>Power BI</span>
          </div>
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
