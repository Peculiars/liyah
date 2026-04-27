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
          padding: scrolled ? '16px 48px' : '28px 48px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          transition: 'padding 0.4s ease, background 0.4s ease',
          background: scrolled
            ? 'rgba(13, 11, 9, 0.92)'
            : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled
            ? '1px solid rgba(184, 150, 90, 0.1)'
            : '1px solid transparent',
        }}
      >
        <Link
          href="/"
          style={{
            fontFamily: 'var(--font-cormorant)',
            fontSize: 22,
            fontWeight: 300,
            letterSpacing: '0.12em',
            color: 'var(--cream)',
            textDecoration: 'none',
          }}
        >
          Stylique{' '}
          <span style={{ color: 'var(--gold)' }}>by Liyah</span>
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
          className="hidden md:flex"
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
                  ((e.target as HTMLElement).style.color =
                    'rgba(249,245,239,0.7)')
                }
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <Link
          href="/book"
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
          }}
          className="hidden md:inline-block"
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

        {/* Mobile hamburger */}
        <button
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            background: 'none',
            border: 'none',
            padding: 8,
            display: 'flex',
            flexDirection: 'column',
            gap: 5,
          }}
          aria-label="Toggle menu"
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

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(13,11,9,0.97)',
              zIndex: 99,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 40,
            }}
          >
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                style={{
                  fontFamily: 'var(--font-cormorant)',
                  fontSize: 48,
                  fontWeight: 300,
                  fontStyle: 'italic',
                  color: 'var(--cream)',
                  textDecoration: 'none',
                  letterSpacing: '0.05em',
                }}
              >
                {l.label}
              </Link>
            ))}
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
                padding: '14px 32px',
                marginTop: 20,
              }}
            >
              Book a Piece
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}