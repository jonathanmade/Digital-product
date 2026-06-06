import { useEffect } from 'react'

export function useCustomCursor() {
  useEffect(() => {
    const dot = document.querySelector('.cursor-dot')
    const ring = document.querySelector('.cursor-ring')
    if (!dot || !ring) return

    let ringX = 0, ringY = 0
    let mouseX = 0, mouseY = 0

    const move = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      dot.style.left = mouseX + 'px'
      dot.style.top = mouseY + 'px'
    }

    const animateRing = () => {
      ringX += (mouseX - ringX) * 0.12
      ringY += (mouseY - ringY) * 0.12
      ring.style.left = ringX + 'px'
      ring.style.top = ringY + 'px'
      requestAnimationFrame(animateRing)
    }

    const addHover = () => { dot.classList.add('hover'); ring.classList.add('hover') }
    const removeHover = () => { dot.classList.remove('hover'); ring.classList.remove('hover') }

    window.addEventListener('mousemove', move)
    document.querySelectorAll('a, button, [data-cursor-hover]').forEach(el => {
      el.addEventListener('mouseenter', addHover)
      el.addEventListener('mouseleave', removeHover)
    })

    animateRing()
    return () => window.removeEventListener('mousemove', move)
  }, [])
}
