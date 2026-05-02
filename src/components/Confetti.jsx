import React, { useEffect, useRef } from 'react'

const PALETTE = ['#f5d77a', '#d4af37', '#e8b86a', '#5b8def', '#a3c1f5', '#7a9aef', '#e6ebf5', '#d4d8e6', '#f0abfc']

const ribbons = []
let runningRaf = null
let _ctx = null
let _W = 0
let _H = 0
let _dpr = 1
let _resize = null

export function spawnConfetti(cx, cy, count = 100) {
  for (let i = 0; i < count; i++) {
    const ang = Math.random() * Math.PI * 2
    const sp = 6 + Math.random() * 16
    const isRibbon = Math.random() > 0.25
    ribbons.push({
      x: cx,
      y: cy,
      vx: Math.cos(ang) * sp * (0.4 + Math.random() * 0.9),
      vy: Math.sin(ang) * sp * (0.4 + Math.random() * 0.9) - 5,
      w: isRibbon ? 3 + Math.random() * 4 : 5 + Math.random() * 5,
      h: isRibbon ? 14 + Math.random() * 24 : 5 + Math.random() * 5,
      color: PALETTE[Math.floor(Math.random() * PALETTE.length)],
      rot: Math.random() * Math.PI * 2,
      rotV: (Math.random() - 0.5) * 0.35,
      grav: 0.14 + Math.random() * 0.08,
      drag: 0.985 - Math.random() * 0.015,
      wob: Math.random() * Math.PI * 2,
      wobV: 0.06 + Math.random() * 0.12,
      life: 1,
      decay: 0.005 + Math.random() * 0.006,
      isRibbon
    })
  }
  if (!runningRaf) runningRaf = requestAnimationFrame(loop)
}

function loop() {
  if (!_ctx) {
    runningRaf = null
    return
  }
  // Re-calibrate if DPR changed (monitor swap) or viewport resized
  if (
    _resize &&
    (window.devicePixelRatio !== _dpr ||
      window.innerWidth !== _W ||
      window.innerHeight !== _H)
  ) {
    _resize()
  }
  _ctx.clearRect(0, 0, _W, _H)
  for (let i = ribbons.length - 1; i >= 0; i--) {
    const r = ribbons[i]
    r.vy += r.grav
    r.vx *= r.drag
    r.vy *= r.drag
    r.x += r.vx
    r.y += r.vy
    r.rot += r.rotV
    r.wob += r.wobV
    r.life -= r.decay
    if (r.life <= 0 || r.y > _H + 60) {
      ribbons.splice(i, 1)
      continue
    }
    _ctx.save()
    _ctx.translate(r.x, r.y)
    _ctx.rotate(r.rot)
    _ctx.globalAlpha = Math.min(1, r.life * 1.2)
    _ctx.fillStyle = r.color
    if (r.isRibbon) {
      const wave = Math.sin(r.wob) * 0.5
      _ctx.beginPath()
      _ctx.moveTo(-r.w / 2, -r.h / 2)
      _ctx.quadraticCurveTo(r.w * wave, 0, -r.w / 2, r.h / 2)
      _ctx.lineTo(r.w / 2, r.h / 2)
      _ctx.quadraticCurveTo(-r.w * wave, 0, r.w / 2, -r.h / 2)
      _ctx.closePath()
      _ctx.fill()
    } else {
      _ctx.fillRect(-r.w / 2, -r.h / 2, r.w, r.h)
    }
    _ctx.restore()
  }
  if (ribbons.length > 0) {
    runningRaf = requestAnimationFrame(loop)
  } else {
    runningRaf = null
  }
}

export default function ConfettiLayer() {
  const cvRef = useRef(null)
  useEffect(() => {
    const canvas = cvRef.current
    if (!canvas) return
    _ctx = canvas.getContext('2d')
    const resize = () => {
      _dpr = window.devicePixelRatio || 1
      _W = window.innerWidth
      _H = window.innerHeight
      canvas.width = _W * _dpr
      canvas.height = _H * _dpr
      _ctx.setTransform(_dpr, 0, 0, _dpr, 0, 0)
    }
    _resize = resize
    resize()
    window.addEventListener('resize', resize)
    return () => {
      window.removeEventListener('resize', resize)
      _ctx = null
      _resize = null
    }
  }, [])

  return <canvas ref={cvRef} id="confetti" />
}
