import React, { useEffect, useRef } from 'react'

export default function Sparkles() {
  const cvRef = useRef(null)

  useEffect(() => {
    const canvas = cvRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let W = 0, H = 0, dpr = 1
    const ambient = []
    const trail = []

    const resize = () => {
      dpr = window.devicePixelRatio || 1
      W = window.innerWidth
      H = window.innerHeight
      canvas.width = W * dpr
      canvas.height = H * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ambient.length = 0
      for (let i = 0; i < 90; i++) {
        ambient.push({
          x: Math.random() * W,
          y: Math.random() * H * 2,
          r: Math.random() * 1.4 + 0.3,
          a: Math.random() * 0.5 + 0.1,
          sp: Math.random() * 0.25 + 0.05,
          ph: Math.random() * Math.PI * 2,
          hue: Math.random() > 0.7 ? 'gold' : 'blue'
        })
      }
    }

    const onMove = (e) => {
      // Always emit at least one particle, sometimes 2-3 for a denser trail
      const burst = Math.random() > 0.55 ? 3 : Math.random() > 0.25 ? 2 : 1
      for (let k = 0; k < burst; k++) {
        // Color mix: ~55% blue family, ~30% white, ~15% deep ink (black-leaning, with white halo)
        const roll = Math.random()
        let color
        let halo
        let isInk = false
        if (roll < 0.55) {
          // Blue family — vary across light/cyan/royal
          const blues = ['#5b8def', '#a3c1f5', '#7aa9f0', '#c8def7']
          color = blues[Math.floor(Math.random() * blues.length)]
          halo = color
        } else if (roll < 0.85) {
          // Pure white sparkle
          color = '#ffffff'
          halo = '#cfe1ff'
        } else {
          // Deep ink ("black") — with a bright white halo so it stays visible on dark bg
          color = '#050a18'
          halo = '#ffffff'
          isInk = true
        }
        trail.push({
          x: e.clientX + (Math.random() - 0.5) * 14,
          y: e.clientY + (Math.random() - 0.5) * 14,
          r: 1.6 + Math.random() * 2.6,
          life: 1,
          vx: (Math.random() - 0.5) * 1.4,
          vy: (Math.random() - 0.5) * 1.2 - 0.6,
          color,
          halo,
          isInk,
          // Some particles render as little 4-pointed stars rather than dots
          star: Math.random() > 0.7
        })
      }
    }

    let raf
    const draw = () => {
      // Re-calibrate when window moves to a monitor with different DPR
      // (or when zoom changes). resize() doesn't fire for either of these
      // on its own, so check every frame — it's cheap.
      if (window.devicePixelRatio !== dpr || window.innerWidth !== W || window.innerHeight !== H) {
        resize()
      }
      ctx.clearRect(0, 0, W, H)
      const t = Date.now() * 0.001
      const sy = window.scrollY
      ambient.forEach((s) => {
        const y = (((s.y - sy * s.sp * 0.4) % (H * 2)) + H * 2) % (H * 2)
        const tw = 0.5 + 0.5 * Math.sin(t * 1.2 + s.ph)
        ctx.globalAlpha = s.a * tw
        ctx.fillStyle = s.hue === 'gold' ? '#f5d77a' : '#a3c1f5'
        ctx.beginPath()
        ctx.arc(s.x, y, s.r, 0, Math.PI * 2)
        ctx.fill()
        if (s.r > 1) {
          ctx.globalAlpha = s.a * tw * 0.15
          ctx.beginPath()
          ctx.arc(s.x, y, s.r * 5, 0, Math.PI * 2)
          ctx.fill()
        }
      })
      for (let i = trail.length - 1; i >= 0; i--) {
        const p = trail[i]
        p.x += p.vx
        p.y += p.vy
        p.vy += 0.02 // slight gravity so they drift down
        p.life -= 0.018
        if (p.life <= 0) {
          trail.splice(i, 1)
          continue
        }
        ctx.globalAlpha = Math.min(1, p.life * 1.4)
        ctx.fillStyle = p.color
        ctx.shadowColor = p.halo || p.color
        ctx.shadowBlur = p.isInk ? 24 : 18
        if (p.star) {
          // Tiny 4-point sparkle
          const r = p.r * (0.7 + p.life)
          ctx.beginPath()
          ctx.moveTo(p.x, p.y - r * 1.6)
          ctx.lineTo(p.x + r * 0.5, p.y - r * 0.5)
          ctx.lineTo(p.x + r * 1.6, p.y)
          ctx.lineTo(p.x + r * 0.5, p.y + r * 0.5)
          ctx.lineTo(p.x, p.y + r * 1.6)
          ctx.lineTo(p.x - r * 0.5, p.y + r * 0.5)
          ctx.lineTo(p.x - r * 1.6, p.y)
          ctx.lineTo(p.x - r * 0.5, p.y - r * 0.5)
          ctx.closePath()
          ctx.fill()
        } else {
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.r * (0.6 + p.life * 0.6), 0, Math.PI * 2)
          ctx.fill()
        }
        ctx.shadowBlur = 0
      }
      ctx.globalAlpha = 1
      raf = requestAnimationFrame(draw)
    }

    resize()
    document.addEventListener('mousemove', onMove)
    window.addEventListener('resize', resize)
    // Window focus / visibility — happens right after dragging across monitors,
    // and is a reliable moment to re-check DPR and viewport size.
    const onFocus = () => resize()
    window.addEventListener('focus', onFocus)
    document.addEventListener('visibilitychange', onFocus)
    raf = requestAnimationFrame(draw)
    return () => {
      cancelAnimationFrame(raf)
      document.removeEventListener('mousemove', onMove)
      window.removeEventListener('resize', resize)
      window.removeEventListener('focus', onFocus)
      document.removeEventListener('visibilitychange', onFocus)
    }
  }, [])

  return <canvas ref={cvRef} id="sparkles" />
}
