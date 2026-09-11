import { useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js'
import './MedallionScene3D.css'

const PLATFORM_X = [-6.75, -2.25, 2.25, 6.75]
const SPEED_STEPS = [
  { label: 'Slow', value: 0.5 },
  { label: 'Normal', value: 1 },
  { label: 'Fast', value: 2 },
]
const PARTICLES_PER_CONNECTION = 14

const SERVICE_STATUS = [
  { name: 'Data Factory', status: 'Active' },
  { name: 'Synapse', status: 'Active' },
  { name: 'OneLake', status: 'Syncing' },
  { name: 'Power BI', status: 'Connected' },
]

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

export default function MedallionScene3D({ layers }) {
  const containerRef = useRef(null)
  const canvasRef = useRef(null)
  const sceneApiRef = useRef(null)
  const [selectedId, setSelectedId] = useState(null)
  const [paused, setPaused] = useState(false)
  const [speedIndex, setSpeedIndex] = useState(1)

  const dateLabel = useMemo(
    () => new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' }),
    []
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
    camera.position.set(0, 7.5, 15)
    camera.lookAt(0, 0.5, 0)

    scene.add(new THREE.AmbientLight(0xffffff, 0.5))
    const dirLight = new THREE.DirectionalLight(0xffffff, 0.6)
    dirLight.position.set(4, 10, 6)
    scene.add(dirLight)

    const group = new THREE.Group()
    scene.add(group)

    const grid = new THREE.GridHelper(28, 20, 0x00f5ff, 0x1a2540)
    grid.position.y = -1.1
    grid.material.transparent = true
    grid.material.opacity = 0.15
    group.add(grid)
    disposables.push(() => grid.geometry.dispose(), () => grid.material.dispose())

    const platforms = layers.map((layer, i) => {
      const colorHex = resolveCssColor(layer.color, '#00F5FF')
      const colorInt = new THREE.Color(colorHex)

      const geo = new RoundedBoxGeometry(3, 0.35, 2, 4, 0.15)
      const mat = new THREE.MeshStandardMaterial({
        color: 0x0d1321,
        emissive: colorInt,
        emissiveIntensity: 0.35,
        metalness: 0.3,
        roughness: 0.45,
        transparent: true,
        opacity: 0.94,
      })
      const mesh = new THREE.Mesh(geo, mat)
      mesh.position.set(PLATFORM_X[i], 0, 0)
      mesh.userData.id = layer.id
      group.add(mesh)
      disposables.push(() => geo.dispose(), () => mat.dispose())

      const edgeGeo = new THREE.EdgesGeometry(geo)
      const edgeMat = new THREE.LineBasicMaterial({ color: colorInt, transparent: true, opacity: 0.6 })
      const edges = new THREE.LineSegments(edgeGeo, edgeMat)
      mesh.add(edges)
      disposables.push(() => edgeGeo.dispose(), () => edgeMat.dispose())

      const glowLight = new THREE.PointLight(colorInt, 1.2, 6)
      glowLight.position.set(PLATFORM_X[i], 1.2, 0)
      group.add(glowLight)

      const { sprite, texture, material: spriteMat } = makeTextSprite(layer.subtitle.toUpperCase(), colorHex)
      sprite.position.set(PLATFORM_X[i], 1.6, 0)
      group.add(sprite)
      disposables.push(() => texture.dispose(), () => spriteMat.dispose())

      return { id: layer.id, mesh, material: mat, glowLight, baseEmissive: 0.35, targetEmissive: 0.35, targetScale: 1 }
    })

    const connections = []
    for (let i = 0; i < platforms.length - 1; i++) {
      const start = new THREE.Vector3(PLATFORM_X[i], 0.2, 0)
      const end = new THREE.Vector3(PLATFORM_X[i + 1], 0.2, 0)
      const mid = new THREE.Vector3((start.x + end.x) / 2, 0.9, 0)
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

    sceneApiRef.current = { platforms, connections }

    let rafId = null
    let lastTime = performance.now()
    let idlePhase = 0

    const animate = (now) => {
      rafId = requestAnimationFrame(animate)
      const dt = Math.min((now - lastTime) / 1000, 0.1)
      lastTime = now

      idlePhase += dt
      group.rotation.y = Math.sin(idlePhase * 0.2) * 0.06

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
      platforms.forEach(p => {
        p.targetEmissive = p.id === currentSelected ? 0.9 : p.baseEmissive
        p.targetScale = p.id === currentSelected ? 1.08 : 1
        p.material.emissiveIntensity += (p.targetEmissive - p.material.emissiveIntensity) * 0.12
        const s = p.mesh.scale.x + (p.targetScale - p.mesh.scale.x) * 0.15
        p.mesh.scale.set(s, s, s)
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
        </div>
      </div>

      <aside className="scene3d-hud">
        <div className="hud-header">
          <span className="hud-title">MEDALLION ARCHITECTURE · V1.0</span>
          <span className="hud-date">{dateLabel}</span>
        </div>

        <div className="hud-panel">
          <span className="hud-panel-title">Service Status</span>
          <ul className="hud-status-list">
            {SERVICE_STATUS.map(s => (
              <li key={s.name}>
                <span className={`hud-status-dot status-${s.status.toLowerCase()}`} />
                {s.name}
                <span className="hud-status-value">{s.status}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="hud-panel">
          <span className="hud-panel-title">Layer Metadata</span>
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
              <span className="hud-selected-title">Selected: {selectedLayer.label} LAYER</span>
              <dl className="hud-selected-meta">
                <div><dt>Data Format</dt><dd>{selectedLayer.dataFormat}</dd></div>
                <div><dt>Storage</dt><dd>{selectedLayer.storage}</dd></div>
                <div><dt>Transform</dt><dd>{selectedLayer.transform}</dd></div>
                <div><dt>Status</dt><dd>{selectedLayer.status}</dd></div>
              </dl>
            </div>
          )}
        </div>

        <div className="hud-panel">
          <span className="hud-panel-title">Controls</span>
          <div className="hud-controls">
            <button className="hud-btn" onClick={handleReset}>Reset View</button>
            <button className="hud-btn" onClick={() => setPaused(p => !p)}>
              {paused ? 'Resume Flow' : 'Pause Flow'}
            </button>
            <button className="hud-btn" onClick={() => setSpeedIndex(i => (i + 1) % SPEED_STEPS.length)}>
              Speed: {SPEED_STEPS[speedIndex].label}
            </button>
          </div>
        </div>
      </aside>
    </div>
  )
}
