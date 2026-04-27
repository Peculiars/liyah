'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const links = [
    { href: '/portfolio', label: 'Portfolio' },
    { href: '/about', label: 'About' },
    { href: '/book', label: 'Book' },
  ]

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: scrolled
            ? 'clamp(12px,2vw,16px) clamp(16px,5vw,48px)'
            : 'clamp(16px,3vw,28px) clamp(16px,5vw,48px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          transition: 'padding 0.4s ease, background 0.4s ease',
          background: scrolled ? 'rgba(13,11,9,0.93)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled
            ? '1px solid rgba(184,150,90,0.1)'
            : '1px solid transparent',
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          style={{
            fontFamily: 'var(--font-cormorant)',
            fontSize: 'clamp(17px, 3vw, 22px)',
            fontWeight: 300,
            letterSpacing: '0.1em',
            color: 'var(--cream)',
            textDecoration: 'none',
            flexShrink: 0,
          }}
        >
          Liyahss{' '}
          <span style={{ color: 'var(--gold)' }}>Kouture</span>
        </Link>

        {/* Desktop links */}
        <ul
          style={{
            display: 'flex',
            gap: 36,
            listStyle: 'none',
            margin: 0,
            padding: 0,
          }}
          className="nav-desktop-links"
        >
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                style={{
                  fontSize: 11,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: 'rgba(249,245,239,0.7)',
                  textDecoration: 'none',
                  transition: 'color 0.3s',
                }}
                onMouseEnter={(e) =>
                  ((e.target as HTMLElement).style.color = 'var(--gold)')
                }
                onMouseLeave={(e) =>
                  ((e.target as HTMLElement).style.color = 'rgba(249,245,239,0.7)')
                }
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <Link
          href="/book"
          className="nav-desktop-cta"
          style={{
            fontSize: 11,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            background: 'transparent',
            border: '1px solid rgba(184,150,90,0.5)',
            color: 'var(--gold)',
            padding: '10px 22px',
            textDecoration: 'none',
            transition: 'all 0.4s',
            display: 'inline-block',
            whiteSpace: 'nowrap',
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLElement
            el.style.background = 'var(--gold)'
            el.style.color = 'var(--dark)'
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLElement
            el.style.background = 'transparent'
            el.style.color = 'var(--gold)'
          }}
        >
          Book a Piece
        </Link>

        {/* Hamburger */}
        <button
          className="nav-hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          style={{
            background: 'none',
            border: 'none',
            padding: 8,
            display: 'none',
            flexDirection: 'column',
            gap: 5,
            zIndex: 101,
          }}
        >
          <span
            style={{
              display: 'block',
              width: 24,
              height: 1,
              background: 'var(--gold)',
              transition: 'transform 0.3s',
              transform: menuOpen ? 'rotate(45deg) translateY(6px)' : 'none',
            }}
          />
          <span
            style={{
              display: 'block',
              width: 24,
              height: 1,
              background: 'var(--gold)',
              opacity: menuOpen ? 0 : 1,
              transition: 'opacity 0.3s',
            }}
          />
          <span
            style={{
              display: 'block',
              width: 24,
              height: 1,
              background: 'var(--gold)',
              transition: 'transform 0.3s',
              transform: menuOpen ? 'rotate(-45deg) translateY(-6px)' : 'none',
            }}
          />
        </button>
      </motion.nav>

      {/* Mobile fullscreen menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            animate={{ opacity: 1, clipPath: 'inset(0 0 0% 0)' }}
            exit={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(13,11,9,0.98)',
              zIndex: 99,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 36,
            }}
          >
            {links.map((l, i) => (
              <motion.div
                key={l.href}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + i * 0.07, duration: 0.5 }}
              >
                <Link
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    fontFamily: 'var(--font-cormorant)',
                    fontSize: 'clamp(36px, 10vw, 56px)',
                    fontWeight: 300,
                    fontStyle: 'italic',
                    color: 'var(--cream)',
                    textDecoration: 'none',
                    letterSpacing: '0.04em',
                    display: 'block',
                    textAlign: 'center',
                  }}
                >
                  {l.label}
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <Link
                href="/book"
                onClick={() => setMenuOpen(false)}
                style={{
                  fontSize: 11,
                  letterSpacing: '0.25em',
                  textTransform: 'uppercase',
                  color: 'var(--gold)',
                  textDecoration: 'none',
                  border: '1px solid rgba(184,150,90,0.4)',
                  padding: '14px 36px',
                  marginTop: 16,
                  display: 'inline-block',
                }}
              >
                Book a Piece
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .nav-desktop-links { display: none !important; }
          .nav-desktop-cta { display: none !important; }
          .nav-hamburger { display: flex !important; }
        }
      `}</style>
    </>
  )
}