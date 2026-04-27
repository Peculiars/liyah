'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useScroll, useTransform, Variants } from 'framer-motion'
import { mockPieces, mockSettings } from '@/lib/mockData'
import Navbar from '@/components/Navbar'
import PieceCard from '@/components/PieceCard'
import BookingForm from '@/components/BookingForm'
import Footer from '@/components/Footer'

const marqueeItems = [
  'Couture Reimagined',
  '✦',
  'Curves, Culture & Class',
  '✦',
  'Bespoke Fashion',
  '✦',
  'Tailored to Slay',
  '✦',
  'Made, Not Bought',
  '✦',
  'Fitted to Perfection',
  '✦',
]

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        fontSize: 10,
        letterSpacing: '0.3em',
        textTransform: 'uppercase',
        color: 'var(--gold)',
        marginBottom: 20,
        opacity: 0.8,
        display: 'flex',
        alignItems: 'center',
        gap: 14,
      }}
    >
      <span
        style={{
          display: 'block',
          width: 24,
          height: 1,
          background: 'var(--gold)',
          opacity: 0.6,
          flexShrink: 0,
        }}
      />
      {children}
    </div>
  )
}

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] },
  }),
}

export default function HomePage() {
  const heroRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  const featuredPieces = mockPieces.filter((p) => p.isFeatured).slice(0, 6)

  return (
    <main style={{ background: 'var(--charcoal)', minHeight: '100vh' }}>
      <Navbar />

      {/* ─── HERO ─── */}
      <section
        ref={heroRef}
        style={{
          position: 'relative',
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
        }}
      >
        {/* Atmospheric background */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(ellipse 80% 60% at 60% 50%, rgba(184,150,90,0.08) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'linear-gradient(rgba(184,150,90,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(184,150,90,0.04) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
            pointerEvents: 'none',
          }}
        />

        {/* Left — text content */}
        <motion.div
          style={{ y: heroY, opacity: heroOpacity, position: 'relative', zIndex: 2, padding: '0 48px', maxWidth: 760 }}
        >
          <motion.div
            initial="hidden"
            animate="visible"
            custom={0.4}
            variants={fadeUpVariants}
            style={{
              fontSize: 11,
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: 'var(--gold)',
              marginBottom: 28,
              display: 'flex',
              alignItems: 'center',
              gap: 16,
            }}
          >
            <span
              style={{
                display: 'block',
                width: 40,
                height: 1,
                background: 'var(--gold)',
                opacity: 0.6,
              }}
            />
            Couture Reimagined
          </motion.div>

          <h1
            style={{
              fontFamily: 'var(--font-cormorant)',
              fontSize: 'clamp(60px, 8vw, 108px)',
              fontWeight: 300,
              lineHeight: 0.92,
              letterSpacing: '-0.01em',
              marginBottom: 40,
            }}
          >
            {[
              { text: 'Where Fabric', delay: 0.5 },
              { text: 'Becomes', delay: 0.65, italic: false },
              { text: 'Feeling.', delay: 0.8, italic: true, gold: true },
            ].map((line, i) => (
              <span
                key={i}
                style={{ display: 'block', overflow: 'hidden' }}
              >
                <motion.span
                  initial={{ opacity: 0, y: '100%' }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 1,
                    delay: line.delay,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  style={{
                    display: 'block',
                    fontStyle: line.italic ? 'italic' : 'normal',
                    color: line.gold ? 'var(--gold)' : 'var(--cream)',
                  }}
                >
                  {line.text}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            initial="hidden"
            animate="visible"
            custom={1}
            variants={fadeUpVariants}
            style={{
              fontSize: 13,
              letterSpacing: '0.06em',
              lineHeight: 1.9,
              color: 'rgba(249,245,239,0.5)',
              maxWidth: 380,
              marginBottom: 52,
            }}
          >
            {mockSettings.heroSubtitle}
          </motion.p>

          <motion.div
            initial="hidden"
            animate="visible"
            custom={1.2}
            variants={fadeUpVariants}
            style={{ display: 'flex', alignItems: 'center', gap: 32 }}
          >
            <Link
              href="/book"
              style={{
                background: 'var(--gold)',
                color: 'var(--dark)',
                padding: '16px 40px',
                fontSize: 11,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                fontFamily: 'var(--font-dm-sans)',
                fontWeight: 500,
                display: 'inline-block',
                transition: 'background 0.3s',
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.background =
                  'var(--gold-light)')
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.background =
                  'var(--gold)')
              }
            >
              Book a Consultation
            </Link>
            <Link
              href="/portfolio"
              style={{
                fontSize: 11,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'rgba(249,245,239,0.6)',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                transition: 'color 0.3s',
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.color = 'var(--cream)')
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.color =
                  'rgba(249,245,239,0.6)')
              }
            >
              View Portfolio →
            </Link>
          </motion.div>
        </motion.div>

        {/* Right — hero image */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.2 }}
          style={{
            position: 'absolute',
            right: 0,
            top: 0,
            bottom: 0,
            width: '44%',
            zIndex: 1,
            overflow: 'hidden',
          }}
        >
          <Image
            src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=900&q=85"
            alt="Stylique by Liyah — Couture Fashion"
            fill
            style={{ objectFit: 'cover', objectPosition: 'top center' }}
            priority
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(to right, var(--charcoal) 0%, transparent 30%, transparent 70%, var(--charcoal) 100%)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: 48,
              left: 40,
              right: 40,
            }}
          >
            <p
              style={{
                fontFamily: 'var(--font-cormorant)',
                fontSize: 14,
                fontStyle: 'italic',
                color: 'rgba(184,150,90,0.7)',
                letterSpacing: '0.05em',
              }}
            >
              "Every thread tells a story."
            </p>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 1 }}
          style={{
            position: 'absolute',
            bottom: 40,
            left: 48,
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            zIndex: 3,
          }}
        >
          <div
            style={{
              width: 1,
              height: 60,
              background:
                'linear-gradient(to bottom, transparent, var(--gold), transparent)',
              animation: 'pulse 2s infinite',
            }}
          />
          <span
            style={{
              fontSize: 10,
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: 'rgba(249,245,239,0.35)',
              writingMode: 'vertical-lr',
            }}
          >
            Scroll
          </span>
        </motion.div>
      </section>

      {/* ─── MARQUEE ─── */}
      <div
        style={{
          padding: '28px 0',
          borderTop: '1px solid rgba(184,150,90,0.1)',
          borderBottom: '1px solid rgba(184,150,90,0.1)',
          overflow: 'hidden',
          background: 'rgba(184,150,90,0.03)',
        }}
      >
        <div
          style={{
            display: 'flex',
            animation: 'marquee 22s linear infinite',
            whiteSpace: 'nowrap',
          }}
        >
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span
              key={i}
              style={{
                fontFamily: item === '✦' ? 'serif' : 'var(--font-cormorant)',
                fontSize: item === '✦' ? 10 : 13,
                fontStyle: item === '✦' ? 'normal' : 'italic',
                color: item === '✦' ? 'var(--gold)' : 'rgba(184,150,90,0.5)',
                letterSpacing: '0.15em',
                padding: '0 40px',
                flexShrink: 0,
              }}
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* ─── ABOUT TEASER ─── */}
      <section
        style={{
          padding: '120px 48px',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 80,
          alignItems: 'center',
        }}
        className="about-grid"
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <SectionLabel>The Atelier</SectionLabel>
          <div
            style={{
              fontFamily: 'var(--font-cormorant)',
              fontSize: 160,
              fontWeight: 300,
              color: 'rgba(184,150,90,0.06)',
              lineHeight: 1,
              marginBottom: -40,
              letterSpacing: '-0.05em',
              userSelect: 'none',
            }}
          >
            01
          </div>
          <h2
            style={{
              fontFamily: 'var(--font-cormorant)',
              fontSize: 'clamp(34px, 4vw, 52px)',
              fontWeight: 300,
              lineHeight: 1.15,
              marginBottom: 28,
            }}
          >
            Crafted for those who{' '}
            <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>
              refuse to blend in
            </em>
          </h2>
          <p
            style={{
              fontSize: 14,
              lineHeight: 1.9,
              color: 'rgba(249,245,239,0.5)',
              marginBottom: 20,
              maxWidth: 440,
            }}
          >
            {mockSettings.brandBio}
          </p>
          <p
            style={{
              fontSize: 14,
              lineHeight: 1.9,
              color: 'rgba(249,245,239,0.5)',
              marginBottom: 40,
              maxWidth: 440,
            }}
          >
            From bridal to boardroom, every piece is constructed with obsessive
            attention to fit, drape, and the quiet luxury that whispers rather
            than shouts.
          </p>

          {/* Stats */}
          <div
            style={{
              display: 'flex',
              gap: 40,
              paddingTop: 36,
              borderTop: '1px solid rgba(184,150,90,0.15)',
            }}
          >
            {[
              { num: '12K+', label: 'Followers' },
              { num: '381', label: 'Pieces Created' },
              { num: '100%', label: 'Bespoke' },
            ].map((s) => (
              <div key={s.label}>
                <span
                  style={{
                    fontFamily: 'var(--font-cormorant)',
                    fontSize: 36,
                    fontWeight: 300,
                    color: 'var(--gold)',
                    display: 'block',
                  }}
                >
                  {s.num}
                </span>
                <span
                  style={{
                    fontSize: 10,
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: 'rgba(249,245,239,0.4)',
                    marginTop: 4,
                    display: 'block',
                  }}
                >
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* About visual */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          style={{ position: 'relative', height: 520 }}
        >
          <div
            style={{
              position: 'absolute',
              inset: '0 60px 60px 0',
              overflow: 'hidden',
            }}
          >
            <Image
              src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=700&q=80"
              alt="Liyah at work"
              fill
              style={{ objectFit: 'cover' }}
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'linear-gradient(to bottom, transparent 60%, rgba(13,11,9,0.6) 100%)',
              }}
            />
          </div>
          {/* Floating tag card */}
          <div
            style={{
              position: 'absolute',
              bottom: -20,
              right: 0,
              width: 200,
              padding: '20px 24px',
              background: 'rgba(184,150,90,0.08)',
              border: '1px solid rgba(184,150,90,0.3)',
              backdropFilter: 'blur(20px)',
            }}
          >
            <span
              style={{
                fontSize: 10,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--gold)',
                marginBottom: 8,
                display: 'block',
              }}
            >
              Est. in Lagos
            </span>
            <span
              style={{
                fontFamily: 'var(--font-cormorant)',
                fontSize: 15,
                fontStyle: 'italic',
                color: 'var(--cream)',
                lineHeight: 1.5,
                display: 'block',
              }}
            >
              "A symphony of curves, culture & class"
            </span>
          </div>
        </motion.div>
      </section>

      {/* ─── PORTFOLIO PREVIEW ─── */}
      <section style={{ padding: '0 48px 120px' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            marginBottom: 48,
          }}
        >
          <div>
            <SectionLabel>The Work</SectionLabel>
            <h2
              style={{
                fontFamily: 'var(--font-cormorant)',
                fontSize: 'clamp(40px, 5vw, 64px)',
                fontWeight: 300,
                lineHeight: 1,
              }}
            >
              Selected{' '}
              <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>
                Pieces
              </em>
            </h2>
          </div>
          <Link
            href="/portfolio"
            style={{
              fontSize: 11,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'rgba(249,245,239,0.5)',
              textDecoration: 'none',
              transition: 'color 0.3s',
              paddingBottom: 8,
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.color = 'var(--gold)')
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.color =
                'rgba(249,245,239,0.5)')
            }
          >
            View All →
          </Link>
        </motion.div>

        {/* Masonry-style grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: 16,
          }}
        >
          {/* Large feature piece */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0 }}
            style={{ gridColumn: 'span 5', gridRow: 'span 2' }}
          >
            <PieceCard piece={featuredPieces[0]} size="large" priority />
          </motion.div>

          {[1, 2, 3, 4].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              style={{
                gridColumn: i % 2 === 1 ? 'span 4' : 'span 3',
              }}
            >
              {featuredPieces[i] && (
                <PieceCard piece={featuredPieces[i]} size="medium" />
              )}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginTop: 64 }}
        >
          <Link
            href="/portfolio"
            style={{
              fontSize: 11,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'rgba(249,245,239,0.5)',
              textDecoration: 'none',
              border: '1px solid rgba(184,150,90,0.2)',
              padding: '14px 36px',
              display: 'inline-block',
              transition: 'all 0.4s',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement
              el.style.borderColor = 'var(--gold)'
              el.style.color = 'var(--gold)'
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement
              el.style.borderColor = 'rgba(184,150,90,0.2)'
              el.style.color = 'rgba(249,245,239,0.5)'
            }}
          >
            View Full Portfolio →
          </Link>
        </motion.div>
      </section>

      {/* ─── BOOKING CTA ─── */}
      <section
        id="book"
        style={{
          background:
            'linear-gradient(135deg, rgba(184,150,90,0.06) 0%, transparent 60%)',
          borderTop: '1px solid rgba(184,150,90,0.1)',
          borderBottom: '1px solid rgba(184,150,90,0.1)',
          padding: '120px 48px',
          textAlign: 'center',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p
            style={{
              fontSize: 10,
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: 'var(--gold)',
              marginBottom: 24,
              opacity: 0.8,
            }}
          >
            Commission a Piece
          </p>
          <h2
            style={{
              fontFamily: 'var(--font-cormorant)',
              fontSize: 'clamp(44px, 6vw, 80px)',
              fontWeight: 300,
              lineHeight: 1.05,
              marginBottom: 20,
            }}
          >
            Let's Create
            <br />
            <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>
              Something Yours
            </em>
          </h2>
          <p
            style={{
              fontSize: 13,
              letterSpacing: '0.06em',
              color: 'rgba(249,245,239,0.45)',
              marginBottom: 64,
              maxWidth: 440,
              margin: '0 auto 64px',
              lineHeight: 1.8,
            }}
          >
            Tell Liyah what you have in mind — the occasion, the feeling, the
            vision. She'll respond on WhatsApp personally.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15 }}
          style={{ maxWidth: 560, margin: '0 auto', textAlign: 'left' }}
        >
          <BookingForm whatsappNumber={mockSettings.whatsappNumber} />
        </motion.div>
      </section>

      <Footer />

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.9; }
        }
        @media (max-width: 900px) {
          .about-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </main>
  )
}