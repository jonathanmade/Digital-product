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
    this._onVisibility = this._onVisibility.bind(this)
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
    document.addEventListener('visibilitychange', this._onVisibility)
    if (!document.hidden) {
      this.rafId = requestAnimationFrame(this._loop)
    }
  }

  destroy() {
    cancelAnimationFrame(this.rafId)
    window.removeEventListener('scroll', this._onScroll)
    window.removeEventListener('resize', this._onResize)
    document.removeEventListener('visibilitychange', this._onVisibility)
    if (this.canvas && this.canvas.parentNode) {
      this.canvas.parentNode.removeChild(this.canvas)
    }
  }

  _onVisibility() {
    if (document.hidden) {
      this.pause()
    } else {
      this.resume()
    }
  }

  // Pause/resume the RAF loop without tearing down the canvas — used to
  // free up the main thread while a heavier overlay (e.g. the Calendly
  // popup) is open and animating on top of the page, since a continuously
  // repainting fixed canvas underneath competes with its event handlers
  // and shows up as slow interactions (INP) on the overlay's own controls.
  pause() {
    if (this.rafId) {
      cancelAnimationFrame(this.rafId)
      this.rafId = null
    }
  }

  resume() {
    if (!this.rafId && !document.hidden) {
      this.rafId = requestAnimationFrame(this._loop)
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
    let count

    if (v < 2) {
      count = Math.random() < 0.06 ? 1 : 0
    } else if (v < 15) {
      count = Math.floor(1 + (v / 15) * 1.5)
    } else {
      count = Math.floor(3 + Math.min(v / 8, 3))
    }

    for (let i = 0; i < count; i++) {
      if (this.particles.length >= 40) {
        this.particles.splice(0, 1)
      }

      // Floating dot
      this.particles.push({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.3,
        vy: -(0.3 + Math.random() * 0.9),
        r: 1 + Math.random() * 1.5,
        alpha: 0.08 + Math.random() * 0.22,
        born: performance.now(),
        life: 400 + Math.random() * 400,
      })
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

      return true
    })
  }
}

export const storm = new StormSystem()
