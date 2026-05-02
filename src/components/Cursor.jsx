import React, { useEffect, useRef, useState } from 'react'

export default function Cursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const [hover, setHover] = useState(false)
  const [enabled, setEnabled] = useState(true)

  useEffect(() => {
    if (window.matchMedia('(hover: none)').matches || window.innerWidth < 980) {
      setEnabled(false)
      return
    }

    let mx = -100, my = -100, rx = -100, ry = -100, raf

    const onMove = (e) => {
      mx = e.clientX
      my = e.clientY
      if (dotRef.current) {
        dotRef.current.style.left = mx + 'px'
        dotRef.current.style.top = my + 'px'
      }
    }

    const tick = () => {
      rx += (mx - rx) * 0.18
      ry += (my - ry) * 0.18
      if (ringRef.current) {
        ringRef.current.style.left = rx + 'px'
        ringRef.current.style.top = ry + 'px'
      }
      raf = requestAnimationFrame(tick)
    }

    const onOver = (e) => {
      const t = e.target
      if (t.closest && t.closest('a, button, .btn, .card-strip, .strip, .magician-card, .hb, .book, .con, .play-card, .deck-card')) {
        setHover(true)
      } else {
        setHover(false)
      }
    }

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseover', onOver)
    raf = requestAnimationFrame(tick)
    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      cancelAnimationFrame(raf)
    }
  }, [])

  if (!enabled) return null

  return (
    <>
      <div ref={dotRef} className={`cursor ${hover ? 'hover' : ''}`} />
      <div ref={ringRef} className="cursor-ring" />
    </>
  )
}
