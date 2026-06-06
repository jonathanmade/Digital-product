export class StormSystem {
  constructor() {
    this.canvas = null
    this.ctx = null
    this.particles = []
    this.rafId = null
    this.lastScrollY = 0
    this.scrollVelocity = 0
    this.scrollTimeout = null
    this._onScroll = this._onScroll.bind(this)
    this._onResize = this._onResize.bind(this)
    this._loop = this._loop.bind(this)
  }

  init() {
    this.canvas = document.createElement('canvas')
    this.canvas.style.cssText = 'position:fixed;top:0;left:0;width:100vw;height:100vh;pointer-events:none;z-index:9999;will-change:transform;'
    this.canvas.width = window.innerWidth
    this.canvas.height = window.innerHeight
    document.body.appendChild(this.canvas)
    this.ctx = this.canvas.getContext('2d')

    window.addEventListener('scroll', this._onScroll, { passive: true })
    window.addEventListener('resize', this._onResize)
    this.rafId = requestAnimationFrame(this._loop)
  }

  destroy() {
    cancelAnimationFrame(this.rafId)
    window.removeEventListener('scroll', this._onScroll)
    window.removeEventListener('resize', this._onResize)
    if (this.canvas && this.canvas.parentNode) {
      this.canvas.parentNode.removeChild(this.canvas)
    }
  }

  _onScroll() {
    const currentY = window.scrollY
    this.scrollVelocity = Math.abs(currentY - this.lastScrollY)
    this.lastScrollY = currentY
    clearTimeout(this.scrollTimeout)
    this.scrollTimeout = setTimeout(() => { this.scrollVelocity = 0 }, 150)
  }

  _onResize() {
    if (this.canvas) {
      this.canvas.width = window.innerWidth
      this.canvas.height = window.innerHeight
    }
  }

  _emitParticles() {
    const v = this.scrollVelocity
    const W = this.canvas.width
    const H = this.canvas.height
    let count = 0

    if (v < 2) {
      count = Math.random() < 0.15 ? 1 : 0
    } else if (v < 15) {
      count = Math.floor(2 + (v / 15) * 3)
    } else {
      count = Math.floor(8 + Math.min(v / 5, 7))
    }

    for (let i = 0; i < count; i++) {
      if (this.particles.length >= 80) {
        this.particles.splice(0, 1)
      }

      if (v > 8 && Math.random() < 0.4) {
        // Type B — lightning bolt
        const segs = Math.floor(3 + Math.random() * 3)
        const pts = [{ x: Math.random() * W, y: Math.random() < 0.7 ? 0 : Math.random() * H }]
        let angle = (Math.PI / 2) + (Math.random() - 0.5) * (Math.PI / 2)
        for (let s = 0; s < segs; s++) {
          const len = 15 + Math.random() * 30
          angle += (Math.random() - 0.5) * 1.2
          pts.push({
            x: pts[pts.length - 1].x + Math.cos(angle) * len,
            y: pts[pts.length - 1].y + Math.sin(angle) * len,
          })
        }
        this.particles.push({
          type: 'bolt',
          pts,
          alpha: 0.4 + Math.random() * 0.5,
          width: 1 + Math.random(),
          born: performance.now(),
          life: 150 + Math.random() * 250,
        })
      } else {
        // Type A — floating dot
        this.particles.push({
          type: 'dot',
          x: Math.random() * W,
          y: Math.random() * H,
          vx: (Math.random() - 0.5) * 0.4,
          vy: -(0.4 + Math.random() * 1.2),
          r: 1 + Math.random() * 2,
          alpha: 0.15 + Math.random() * 0.5,
          born: performance.now(),
          life: 400 + Math.random() * 400,
        })
      }
    }
  }

  _loop(now) {
    this.rafId = requestAnimationFrame(this._loop)
    const ctx = this.ctx
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

    this._emitParticles()

    this.particles = this.particles.filter(p => {
      const age = now - p.born
      const progress = age / p.life
      if (progress >= 1) return false

      const fade = progress < 0.15
        ? progress / 0.15
        : 1 - (progress - 0.15) / 0.85

      if (p.type === 'dot') {
        p.x += p.vx
        p.y += p.vy
        ctx.save()
        ctx.globalAlpha = p.alpha * fade
        ctx.shadowBlur = 8
        ctx.shadowColor = '#00F5FF'
        ctx.fillStyle = '#00F5FF'
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      } else {
        ctx.save()
        ctx.globalAlpha = p.alpha * fade
        ctx.shadowBlur = 10
        ctx.shadowColor = '#00F5FF'
        ctx.strokeStyle = '#00F5FF'
        ctx.lineWidth = p.width
        ctx.lineCap = 'round'
        ctx.lineJoin = 'round'
        ctx.beginPath()
        ctx.moveTo(p.pts[0].x, p.pts[0].y)
        for (let i = 1; i < p.pts.length; i++) {
          ctx.lineTo(p.pts[i].x, p.pts[i].y)
        }
        ctx.stroke()
        ctx.restore()
      }

      return true
    })
  }
}

export const storm = new StormSystem()
