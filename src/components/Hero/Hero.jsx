import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { useLanguage } from '../../context/LanguageContext'
import './Hero.css'

function ParticleCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(canvas.clientWidth, canvas.clientHeight)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, canvas.clientWidth / canvas.clientHeight, 0.1, 1000)
    camera.position.z = 80

    const NODE_COUNT = 60
    const positions = new Float32Array(NODE_COUNT * 3)
    const nodeData = []
    for (let i = 0; i < NODE_COUNT; i++) {
      const x = (Math.random() - 0.5) * 180
      const y = (Math.random() - 0.5) * 100
      const z = (Math.random() - 0.5) * 60
      positions[i * 3] = x
      positions[i * 3 + 1] = y
      positions[i * 3 + 2] = z
      nodeData.push({ x, y, z, vx: (Math.random() - 0.5) * 0.024, vy: (Math.random() - 0.5) * 0.012 })
    }

    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    const mat = new THREE.PointsMaterial({ color: 0x00F5FF, size: 0.56, transparent: true, opacity: 0.6 })
    const points = new THREE.Points(geo, mat)
    scene.add(points)

    // Lines between close nodes
    const linePairs = []
    for (let i = 0; i < NODE_COUNT; i++) {
      for (let j = i + 1; j < NODE_COUNT; j++) {
        const dx = nodeData[i].x - nodeData[j].x
        const dy = nodeData[i].y - nodeData[j].y
        const dz = nodeData[i].z - nodeData[j].z
        if (Math.sqrt(dx * dx + dy * dy + dz * dz) < 28) {
          linePairs.push([i, j])
        }
      }
    }

    const linePositions = new Float32Array(linePairs.length * 6)
    const lineGeo = new THREE.BufferGeometry()
    lineGeo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3))
    const lineMat = new THREE.LineBasicMaterial({ color: 0x00F5FF, transparent: true, opacity: 0.08 })
    const lines = new THREE.LineSegments(lineGeo, lineMat)
    scene.add(lines)

    let frame
    const animate = () => {
      frame = requestAnimationFrame(animate)
      const pos = geo.attributes.position.array
      for (let i = 0; i < NODE_COUNT; i++) {
        nodeData[i].x += nodeData[i].vx
        nodeData[i].y += nodeData[i].vy
        if (Math.abs(nodeData[i].x) > 90) nodeData[i].vx *= -1
        if (Math.abs(nodeData[i].y) > 50) nodeData[i].vy *= -1
        pos[i * 3] = nodeData[i].x
        pos[i * 3 + 1] = nodeData[i].y
      }
      geo.attributes.position.needsUpdate = true

      const lp = lineGeo.attributes.position.array
      for (let k = 0; k < linePairs.length; k++) {
        const [a, b] = linePairs[k]
        lp[k * 6] = nodeData[a].x; lp[k * 6 + 1] = nodeData[a].y; lp[k * 6 + 2] = nodeData[a].z
        lp[k * 6 + 3] = nodeData[b].x; lp[k * 6 + 4] = nodeData[b].y; lp[k * 6 + 5] = nodeData[b].z
      }
      lineGeo.attributes.position.needsUpdate = true

      points.rotation.y += 0.0005
      lines.rotation.y += 0.0005
      renderer.render(scene, camera)
    }

    animate()

    const onResize = () => {
      renderer.setSize(canvas.clientWidth, canvas.clientHeight)
      camera.aspect = canvas.clientWidth / canvas.clientHeight
      camera.updateProjectionMatrix()
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', onResize)
      renderer.dispose()
    }
  }, [])

  return <canvas ref={canvasRef} className="hero-canvas" />
}

function Typewriter({ strings }) {
  const [idx, setIdx] = useState(0)
  const [text, setText] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const full = strings[idx % strings.length]
    let timeout
    if (!deleting && text.length < full.length) {
      timeout = setTimeout(() => setText(full.slice(0, text.length + 1)), 60)
    } else if (!deleting && text.length === full.length) {
      timeout = setTimeout(() => setDeleting(true), 2200)
    } else if (deleting && text.length > 0) {
      timeout = setTimeout(() => setText(text.slice(0, -1)), 30)
    } else if (deleting && text.length === 0) {
      setDeleting(false)
      setIdx(i => (i + 1) % strings.length)
    }
    return () => clearTimeout(timeout)
  }, [text, deleting, idx, strings])

  return (
    <span className="typewriter">
      {text}
      <span className="cursor-blink">|</span>
    </span>
  )
}

export default function Hero() {
  const { lang, t } = useLanguage()

  return (
    <section className="hero" id="hero">
      <ParticleCanvas />
      <div className="hero-content">
        <div className="hero-tag">
          <span className="tag-dot" />
          <span>{t.hero.tag}</span>
        </div>
        <p className="hero-role">
          <Typewriter key={lang} strings={t.hero.typewriter} />
        </p>
        <h1 className="hero-headline">
          {t.hero.headlinePre}<span className="hero-surname">{t.hero.headlineHighlight}</span>{t.hero.headlinePost}
        </h1>
        <p className="hero-subheadline">
          {t.hero.subheadline}
        </p>
        <div className="hero-ctas">
          <a href="#contact" className="btn-neon primary">
            {t.hero.ctaPrimary}
          </a>
          <a href="#work" className="btn-neon outline">
            {t.hero.ctaSecondary}
          </a>
        </div>
        <div className="hero-credibility">
          {t.hero.credibility.map(c => (
            <div key={c.label} className="cred-item">
              <span className="cred-value">{c.value}</span>
              <span className="cred-label">{c.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="scroll-indicator">
        <span className="scroll-text">{t.hero.scroll}</span>
        <div className="scroll-bar">
          <div className="scroll-bar-fill" />
        </div>
      </div>
    </section>
  )
}
