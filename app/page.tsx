'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { mockPieces, mockSettings } from '@/lib/mockData'
import Navbar from '@/components/Navbar'
import HeroCarousel from '@/components/HeroCarousel'
import PieceCard from '@/components/PieceCard'
import BookingForm from '@/components/BookingForm'
import Footer from '@/components/Footer'

const marqueeItems = [
  'Couture Reimagined', '✦', 'Curves, Culture & Class', '✦',
  'Bespoke Fashion', '✦', 'Tailored to Slay', '✦',
  'Made, Not Bought', '✦', 'Fitted to Perfection', '✦',
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
      <span style={{ display: 'block', width: 24, height: 1, background: 'var(--gold)', opacity: 0.6, flexShrink: 0 }} />
      {children}
    </div>
  )
}

export default function HomePage() {
  const featuredPieces = mockPieces.filter((p) => p.isFeatured).slice(0, 6)

  return (
    <main style={{ background: 'var(--charcoal)', minHeight: '100vh' }}>
      <Navbar />

      {/* ─── HERO CAROUSEL ─── */}
      <HeroCarousel />

      {/* ─── MARQUEE ─── */}
      <div
        style={{
          padding: '24px 0',
          borderTop: '1px solid rgba(184,150,90,0.1)',
          borderBottom: '1px solid rgba(184,150,90,0.1)',
          overflow: 'hidden',
          background: 'rgba(184,150,90,0.03)',
        }}
      >
        <div style={{ display: 'flex', animation: 'marquee 22s linear infinite', whiteSpace: 'nowrap' }}>
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span
              key={i}
              style={{
                fontFamily: item === '✦' ? 'serif' : 'var(--font-cormorant)',
                fontSize: item === '✦' ? 10 : 13,
                fontStyle: item === '✦' ? 'normal' : 'italic',
                color: item === '✦' ? 'var(--gold)' : 'rgba(184,150,90,0.5)',
                letterSpacing: '0.15em',
                padding: '0 36px',
                flexShrink: 0,
              }}
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* ─── ABOUT TEASER ─── */}
      <section className="about-section">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="about-text"
        >
          <SectionLabel>The Atelier</SectionLabel>
          <div
            style={{
              fontFamily: 'var(--font-cormorant)',
              fontSize: 'clamp(80px, 15vw, 160px)',
              fontWeight: 300,
              color: 'rgba(184,150,90,0.06)',
              lineHeight: 1,
              marginBottom: -30,
              letterSpacing: '-0.05em',
              userSelect: 'none',
            }}
          >
            01
          </div>
          <h2
            style={{
              fontFamily: 'var(--font-cormorant)',
              fontSize: 'clamp(28px, 5vw, 52px)',
              fontWeight: 300,
              lineHeight: 1.15,
              marginBottom: 24,
            }}
          >
            Crafted for those who{' '}
            <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>refuse to blend in</em>
          </h2>
          <p style={{ fontSize: 14, lineHeight: 1.9, color: 'rgba(249,245,239,0.5)', marginBottom: 16, maxWidth: 440 }}>
            {mockSettings.brandBio}
          </p>
          <p style={{ fontSize: 14, lineHeight: 1.9, color: 'rgba(249,245,239,0.5)', marginBottom: 40, maxWidth: 440 }}>
            From bridal to boardroom, every piece is constructed with obsessive attention to fit, drape, and the quiet luxury that whispers rather than shouts.
          </p>

          <div style={{ display: 'flex', gap: 'clamp(20px, 5vw, 40px)', paddingTop: 32, borderTop: '1px solid rgba(184,150,90,0.15)', flexWrap: 'wrap' }}>
            {[
              { num: '12K+', label: 'Followers' },
              { num: '381', label: 'Pieces Created' },
              { num: '100%', label: 'Bespoke' },
            ].map((s) => (
              <div key={s.label}>
                <span style={{ fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(28px, 5vw, 36px)', fontWeight: 300, color: 'var(--gold)', display: 'block' }}>
                  {s.num}
                </span>
                <span style={{ fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(249,245,239,0.4)', marginTop: 4, display: 'block' }}>
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="about-visual"
        >
          <div style={{ position: 'absolute', inset: '0 clamp(0px,5vw,60px) clamp(0px,5vw,60px) 0', overflow: 'hidden' }}>
            <Image
              src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=700&q=80"
              alt="Liyah at work"
              fill
              style={{ objectFit: 'cover' }}
            />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 60%, rgba(13,11,9,0.6) 100%)' }} />
          </div>
          <div
            style={{
              position: 'absolute',
              bottom: -10,
              right: 0,
              width: 'clamp(150px, 30vw, 200px)',
              padding: '18px 20px',
              background: 'rgba(184,150,90,0.08)',
              border: '1px solid rgba(184,150,90,0.3)',
              backdropFilter: 'blur(20px)',
            }}
          >
            <span style={{ fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 8, display: 'block' }}>
              Est. in Lagos
            </span>
            <span style={{ fontFamily: 'var(--font-cormorant)', fontSize: 14, fontStyle: 'italic', color: 'var(--cream)', lineHeight: 1.5, display: 'block' }}>
              "A symphony of curves, culture & class"
            </span>
          </div>
        </motion.div>
      </section>

      {/* ─── PORTFOLIO PREVIEW ─── */}
      <section style={{ padding: '0 clamp(16px,5vw,48px) clamp(60px,10vw,120px)' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 40, flexWrap: 'wrap', gap: 16 }}
        >
          <div>
            <SectionLabel>The Work</SectionLabel>
            <h2 style={{ fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(32px, 6vw, 64px)', fontWeight: 300, lineHeight: 1 }}>
              Selected{' '}
              <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>Pieces</em>
            </h2>
          </div>
          <Link href="/portfolio" style={{ fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(249,245,239,0.5)', textDecoration: 'none', paddingBottom: 8 }}>
            View All →
          </Link>
        </motion.div>

        {/* Responsive portfolio grid */}
        <div className="portfolio-preview-grid">
          {/* Large feature */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="portfolio-feature"
          >
            <PieceCard piece={featuredPieces[0]} size="large" priority />
          </motion.div>

          {/* 4 medium cards */}
          <div className="portfolio-side-grid">
            {[1, 2, 3, 4].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.08 }}
              >
                {featuredPieces[i] && <PieceCard piece={featuredPieces[i]} size="medium" />}
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginTop: 48 }}
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
              padding: 'clamp(12px,2vw,14px) clamp(24px,4vw,36px)',
              display: 'inline-block',
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
          background: 'linear-gradient(135deg, rgba(184,150,90,0.06) 0%, transparent 60%)',
          borderTop: '1px solid rgba(184,150,90,0.1)',
          borderBottom: '1px solid rgba(184,150,90,0.1)',
          padding: 'clamp(60px,10vw,120px) clamp(16px,5vw,48px)',
          textAlign: 'center',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p style={{ fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 20, opacity: 0.8 }}>
            Commission a Piece
          </p>
          <h2 style={{ fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(36px, 7vw, 80px)', fontWeight: 300, lineHeight: 1.05, marginBottom: 20 }}>
            Let's Create
            <br />
            <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>Something Yours</em>
          </h2>
          <p style={{ fontSize: 13, letterSpacing: '0.06em', color: 'rgba(249,245,239,0.45)', maxWidth: 440, margin: '0 auto 48px', lineHeight: 1.8 }}>
            Tell Liyah what you have in mind — the occasion, the feeling, the vision. She'll respond on WhatsApp personally.
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
        @keyframes scrollPulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.9; }
        }

        /* About section */
        .about-section {
          padding: clamp(60px, 10vw, 120px) clamp(16px, 5vw, 48px);
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(40px, 7vw, 80px);
          align-items: center;
        }
        .about-visual {
          position: relative;
          height: clamp(300px, 45vw, 520px);
        }

        /* Portfolio preview grid */
        .portfolio-preview-grid {
          display: grid;
          grid-template-columns: 5fr 7fr;
          gap: 16px;
        }
        .portfolio-feature { height: 100%; }
        .portfolio-side-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        /* Tablet */
        @media (max-width: 900px) {
          .about-section {
            grid-template-columns: 1fr !important;
          }
          .about-visual {
            height: clamp(260px, 55vw, 400px);
          }
          .portfolio-preview-grid {
            grid-template-columns: 1fr !important;
          }
          .portfolio-side-grid {
            grid-template-columns: 1fr 1fr;
          }
          .hero-scroll-hint {
            display: none;
          }
        }

        /* Mobile */
        @media (max-width: 600px) {
          .portfolio-side-grid {
            grid-template-columns: 1fr !important;
          }
          .about-visual {
            display: none;
          }
        }
      `}</style>
    </main>
  )
}