'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

const slides = [
  {
    id: 1,
    mediaType: 'image' as const,
    src: 'https://res.cloudinary.com/deym5qcv5/image/upload/v1777398262/stylique/pieces/fp51pudev8lntwznwq1e.jpg',
    headline: ['Where Fabric', 'Becomes', 'Feeling.'],
    italicIndex: 2,
    sub: 'Bespoke creations crafted for those who refuse to be dressed — only adorned.',
  },
  {
    id: 2,
    mediaType: 'image' as const,
    src: 'https://res.cloudinary.com/deym5qcv5/image/upload/v1777398203/stylique/pieces/glz0dcvwoye5pbvn5gdw.jpg',
    headline: ['Crafted for', 'Curves,', 'Culture & Class.'],
    italicIndex: 1,
    sub: 'Every commission begins with a conversation and ends with a masterpiece.',
  },
  {
    id: 3,
    mediaType: 'image' as const,
    src: 'https://res.cloudinary.com/deym5qcv5/image/upload/v1777398183/stylique/pieces/hx7aaipxit1ygufwbeks.jpg',
    headline: ['Tailored', 'to Slay,', 'Made Not Bought.'],
    italicIndex: 0,
    sub: 'From Lagos with love — where African elegance meets contemporary couture.',
  },
]

const AUTOPLAY_DELAY = 5500

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const goTo = useCallback(
    (index: number, dir?: number) => {
      setDirection(dir ?? (index > current ? 1 : -1))
      setCurrent(index)
    },
    [current]
  )

  const next = useCallback(() => {
    const n = (current + 1) % slides.length
    goTo(n, 1)
  }, [current, goTo])

  useEffect(() => {
    timerRef.current = setInterval(next, AUTOPLAY_DELAY)
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [next])

  const slide = slides[current]

  return (
    <section
      style={{
        position: 'relative',
        height: '100svh',
        minHeight: 560,
        overflow: 'hidden',
        background: 'var(--dark)',
      }}
    >
      {/* Background slides */}
      <AnimatePresence mode="sync" initial={false} custom={direction}>
        <motion.div
          key={slide.id}
          custom={direction}
          variants={{
            enter: (d: number) => ({ x: d > 0 ? '100%' : '-100%', opacity: 0 }),
            center: { x: 0, opacity: 1 },
            exit: (d: number) => ({ x: d > 0 ? '-8%' : '8%', opacity: 0 }),
          }}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
          style={{ position: 'absolute', inset: 0, zIndex: 1 }}
        >
          <Image
            src={slide.src}
            alt=""
            fill
            style={{ objectFit: 'cover', objectPosition: 'center top' }}
            priority
          />
          {/* Dark overlay — heavier so text always readable */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(105deg, rgba(13,11,9,0.82) 0%, rgba(13,11,9,0.55) 55%, rgba(13,11,9,0.3) 100%)',
            }}
          />
          {/* Bottom fade */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '35%',
              background: 'linear-gradient(to top, var(--charcoal) 0%, transparent 100%)',
            }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 3,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: 'clamp(24px, 5vw, 80px)',
          paddingTop: 'calc(clamp(24px, 5vw, 80px) + 80px)',
          maxWidth: 860,
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={`text-${slide.id}`}
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Label */}
            <div
              style={{
                fontSize: 'clamp(9px, 1.5vw, 11px)',
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                color: 'var(--gold)',
                marginBottom: 'clamp(16px, 3vw, 28px)',
                display: 'flex',
                alignItems: 'center',
                gap: 14,
              }}
            >
              <span
                style={{
                  display: 'block',
                  width: 32,
                  height: 1,
                  background: 'var(--gold)',
                  opacity: 0.7,
                  flexShrink: 0,
                }}
              />
              Couture Reimagined
            </div>

            {/* Headline */}
            <h1
              style={{
                fontFamily: 'var(--font-cormorant)',
                fontSize: 'clamp(44px, 9vw, 112px)',
                fontWeight: 300,
                lineHeight: 0.9,
                letterSpacing: '-0.01em',
                margin: 0,
                marginBottom: 'clamp(20px, 3.5vw, 40px)',
              }}
            >
              {slide.headline.map((line, i) => (
                <span key={i} style={{ display: 'block' }}>
                  <span
                    style={{
                      fontStyle: i === slide.italicIndex ? 'italic' : 'normal',
                      color: i === slide.italicIndex ? 'var(--gold)' : 'var(--cream)',
                    }}
                  >
                    {line}
                  </span>
                </span>
              ))}
            </h1>

            {/* Sub */}
            <p
              style={{
                fontSize: 'clamp(12px, 1.8vw, 14px)',
                letterSpacing: '0.05em',
                lineHeight: 1.9,
                color: 'rgba(249,245,239,0.55)',
                maxWidth: 400,
                marginBottom: 'clamp(28px, 5vw, 52px)',
              }}
            >
              {slide.sub}
            </p>

            {/* CTAs */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'clamp(16px, 4vw, 32px)',
                flexWrap: 'wrap',
              }}
            >
              <Link
                href="/book"
                style={{
                  background: 'var(--gold)',
                  color: 'var(--dark)',
                  padding: 'clamp(12px, 2vw, 16px) clamp(24px, 4vw, 40px)',
                  fontSize: 'clamp(10px, 1.5vw, 11px)',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  fontFamily: 'var(--font-dm-sans)',
                  fontWeight: 500,
                  display: 'inline-block',
                  transition: 'background 0.3s',
                  whiteSpace: 'nowrap',
                }}
              >
                Book a Consultation
              </Link>
              <Link
                href="/portfolio"
                style={{
                  fontSize: 'clamp(10px, 1.5vw, 11px)',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: 'rgba(249,245,239,0.6)',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  transition: 'color 0.3s',
                  whiteSpace: 'nowrap',
                }}
              >
                View Portfolio →
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Slide indicators */}
      <div
        style={{
          position: 'absolute',
          bottom: 'clamp(24px, 4vw, 44px)',
          left: 'clamp(24px, 5vw, 80px)',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          zIndex: 4,
        }}
      >
        {slides.map((s, i) => (
          <button
            key={s.id}
            onClick={() => {
              if (timerRef.current) clearInterval(timerRef.current)
              goTo(i)
              timerRef.current = setInterval(next, AUTOPLAY_DELAY)
            }}
            aria-label={`Slide ${i + 1}`}
            style={{
              background: 'none',
              border: 'none',
              padding: 0,
              cursor: 'none',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <span
              style={{
                display: 'block',
                height: 1,
                width: i === current ? 36 : 16,
                background: i === current ? 'var(--gold)' : 'rgba(249,245,239,0.3)',
                transition: 'all 0.5s ease',
              }}
            />
          </button>
        ))}
        <span
          style={{
            fontSize: 10,
            letterSpacing: '0.15em',
            color: 'rgba(249,245,239,0.25)',
            marginLeft: 8,
          }}
        >
          0{current + 1} / 0{slides.length}
        </span>
      </div>

      {/* Scroll hint */}
      <div
        style={{
          position: 'absolute',
          bottom: 'clamp(24px, 4vw, 44px)',
          right: 'clamp(24px, 5vw, 48px)',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          zIndex: 4,
        }}
        className="hero-scroll-hint"
      >
        <div
          style={{
            width: 1,
            height: 48,
            background: 'linear-gradient(to bottom, transparent, var(--gold))',
            animation: 'scrollPulse 2s ease-in-out infinite',
          }}
        />
        <span
          style={{
            fontSize: 9,
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: 'rgba(249,245,239,0.3)',
            writingMode: 'vertical-lr',
          }}
        >
          Scroll
        </span>
      </div>
    </section>
  )
}
