'use client'

import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  const springX = useSpring(cursorX, { stiffness: 500, damping: 40 })
  const springY = useSpring(cursorY, { stiffness: 500, damping: 40 })

  const ringX = useSpring(cursorX, { stiffness: 120, damping: 25 })
  const ringY = useSpring(cursorY, { stiffness: 120, damping: 25 })

  const isHovering = useRef(false)
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
    }

    const handleHoverIn = () => {
      if (dotRef.current) dotRef.current.style.transform = 'translate(-50%, -50%) scale(0.5)'
      if (ringRef.current) {
        ringRef.current.style.width = '60px'
        ringRef.current.style.height = '60px'
        ringRef.current.style.opacity = '0.2'
      }
    }

    const handleHoverOut = () => {
      if (dotRef.current) dotRef.current.style.transform = 'translate(-50%, -50%) scale(1)'
      if (ringRef.current) {
        ringRef.current.style.width = '36px'
        ringRef.current.style.height = '36px'
        ringRef.current.style.opacity = '0.5'
      }
    }

    window.addEventListener('mousemove', moveCursor)

    const interactives = document.querySelectorAll('a, button, [data-cursor]')
    interactives.forEach(el => {
      el.addEventListener('mouseenter', handleHoverIn)
      el.addEventListener('mouseleave', handleHoverOut)
    })

    const observer = new MutationObserver(() => {
      const els = document.querySelectorAll('a, button, [data-cursor]')
      els.forEach(el => {
        el.addEventListener('mouseenter', handleHoverIn)
        el.addEventListener('mouseleave', handleHoverOut)
      })
    })
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener('mousemove', moveCursor)
      observer.disconnect()
    }
  }, [cursorX, cursorY])

  return (
    <>
      {/* Dot */}
      <motion.div
        ref={dotRef}
        style={{
          position: 'fixed',
          left: springX,
          top: springY,
          width: 10,
          height: 10,
          background: 'var(--gold)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9999,
          transform: 'translate(-50%, -50%)',
          transition: 'transform 0.3s, width 0.3s, height 0.3s',
          mixBlendMode: 'normal',
        }}
      />
      {/* Ring */}
      <motion.div
        ref={ringRef}
        style={{
          position: 'fixed',
          left: ringX,
          top: ringY,
          width: 36,
          height: 36,
          border: '1px solid var(--gold)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9998,
          transform: 'translate(-50%, -50%)',
          opacity: 0.5,
          transition: 'width 0.3s, height 0.3s, opacity 0.3s',
        }}
      />
    </>
  )
}