'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import type { SiteSettings } from '@/types'

const values = [
  {
    num: '01',
    title: 'Obsessive Fit',
    body: 'Every garment is constructed around your exact body — not an approximation of it. We take time to understand posture, proportion, and movement.',
  },
  {
    num: '02',
    title: 'Cultural Identity',
    body: "African heritage isn't a trend here — it's a foundation. We weave culture into silhouette, fabric, and detail in a way that feels modern and personal.",
  },
  {
    num: '03',
    title: 'Quiet Luxury',
    body: 'We believe in garments that whisper rather than shout. Premium fabric, expert construction, and restraint — the hallmarks of true luxury.',
  },
  {
    num: '04',
    title: 'Personal Relationship',
    body: "You're not a ticket number. Liyah speaks with every client personally. Your vision is heard, refined, and brought to life collaboratively.",
  },
]

export default function AboutPage() {
  const [settings, setSettings] = useState<SiteSettings | null>(null)

  useEffect(() => {
    async function loadSettings() {
      try {
        const res = await fetch('/api/settings')
        const data = await res.json()
        if (data.success) setSettings(data.data)
      } catch (err) {
        console.error('Failed to load settings:', err)
      }
    }
    loadSettings()
  }, [])

  const brandBio = settings?.brandBio ?? 'Liyahss Kouture is a Lagos-born couture studio where every commission begins with a conversation.'

  return (
    <main style={{ background: 'var(--charcoal)', minHeight: '100vh' }}>
      <Navbar />

      {/* ─── HERO ─── */}
      <section
        style={{
          position: 'relative',
          height: '80vh',
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
        }}
      >
        <Image
          src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1400&q=85"
          alt="Stylique by Liyah atelier"
          fill
          style={{ objectFit: 'cover', objectPosition: 'center 30%' }}
          priority
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(to right, rgba(13,11,9,0.95) 0%, rgba(13,11,9,0.5) 60%, rgba(13,11,9,0.1) 100%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(ellipse 60% 80% at 20% 50%, rgba(184,150,90,0.06) 0%, transparent 70%)',
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'relative',
            zIndex: 2,
            padding: '0 48px',
            maxWidth: 680,
          }}
        >
          <div
            style={{
              fontSize: 10,
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: 'var(--gold)',
              marginBottom: 24,
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
              }}
            />
            The Story
          </div>
          <h1
            style={{
              fontFamily: 'var(--font-cormorant)',
              fontSize: 'clamp(52px, 7vw, 96px)',
              fontWeight: 300,
              lineHeight: 0.95,
              letterSpacing: '-0.01em',
            }}
          >
            Behind{' '}
            <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>
              the Thread
            </em>
          </h1>
        </motion.div>
      </section>

      {/* ─── STORY SECTION ─── */}
      <section
        style={{
          padding: '100px 48px',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 80,
          alignItems: 'center',
        }}
        className="story-grid"
      >
        {/* Image */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          style={{ position: 'relative', height: 580 }}
        >
          <div
            style={{
              position: 'absolute',
              inset: '40px 0 0 40px',
              border: '1px solid rgba(184,150,90,0.15)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              inset: '0 40px 40px 0',
              overflow: 'hidden',
            }}
          >
            <Image
              src="https://images.unsplash.com/photo-1619975044655-21e0af601c74?w=700&q=80"
              alt="Kasumu Aliyah Oyinkansola — designer"
              fill
              style={{ objectFit: 'cover', objectPosition: 'top center' }}
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'linear-gradient(to bottom, transparent 60%, rgba(13,11,9,0.5) 100%)',
              }}
            />
          </div>
          {/* Gold accent line */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              width: 40,
              height: 1,
              background: 'var(--gold)',
              opacity: 0.5,
            }}
          />
        </motion.div>

        {/* Text */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          <div
            style={{
              fontFamily: 'var(--font-cormorant)',
              fontSize: 120,
              fontWeight: 300,
              color: 'rgba(184,150,90,0.06)',
              lineHeight: 1,
              marginBottom: -30,
              letterSpacing: '-0.05em',
              userSelect: 'none',
            }}
          >
            Liyah
          </div>
          <h2
            style={{
              fontFamily: 'var(--font-cormorant)',
              fontSize: 'clamp(32px, 4vw, 48px)',
              fontWeight: 300,
              lineHeight: 1.2,
              marginBottom: 28,
            }}
          >
            Kasumu Aliyah{' '}
            <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>
              Oyinkansola
            </em>
          </h2>

          {[
            'Liyah is a Lagos-based couture designer with a singular obsession: making women and men feel like the most intentional version of themselves. Her journey started with a sewing machine, a sketchbook, and an unwavering belief that African fashion deserved its own vocabulary of luxury.',
            'Every piece she creates begins the same way — with a conversation. She believes that a garment tells the story of the person wearing it, and her job is simply to be a skilled translator between vision and fabric.',
            'With 12K followers across social media and hundreds of custom commissions across Nigeria, Stylique has grown from a personal passion into one of Lagos\'s most sought-after bespoke studios.',
          ].map((p, i) => (
            <p
              key={i}
              style={{
                fontSize: 14,
                lineHeight: 1.9,
                color: 'rgba(249,245,239,0.55)',
                marginBottom: 20,
                maxWidth: 480,
              }}
            >
              {p}
            </p>
          ))}

          <div
            style={{
              marginTop: 40,
              paddingTop: 40,
              borderTop: '1px solid rgba(184,150,90,0.12)',
              display: 'flex',
              gap: 48,
            }}
          >
            {[
              { num: '12K+', label: 'Followers' },
              { num: '381', label: 'Pieces Made' },
              { num: '5+', label: 'Years Creating' },
            ].map((s) => (
              <div key={s.label}>
                <span
                  style={{
                    fontFamily: 'var(--font-cormorant)',
                    fontSize: 40,
                    fontWeight: 300,
                    color: 'var(--gold)',
                    display: 'block',
                    lineHeight: 1,
                  }}
                >
                  {s.num}
                </span>
                <span
                  style={{
                    fontSize: 10,
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: 'rgba(249,245,239,0.35)',
                    marginTop: 6,
                    display: 'block',
                  }}
                >
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ─── VALUES ─── */}
      <section
        style={{
          padding: '0 48px 100px',
          borderTop: '1px solid rgba(184,150,90,0.08)',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ padding: '80px 0 56px' }}
        >
          <div
            style={{
              fontSize: 10,
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: 'var(--gold)',
              marginBottom: 20,
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
              }}
            />
            What We Stand For
          </div>
          <h2
            style={{
              fontFamily: 'var(--font-cormorant)',
              fontSize: 'clamp(36px, 4vw, 56px)',
              fontWeight: 300,
            }}
          >
            The Stylique{' '}
            <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>
              Philosophy
            </em>
          </h2>
        </motion.div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 1,
            background: 'rgba(184,150,90,0.08)',
          }}
          className="values-grid"
        >
          {values.map((v, i) => (
            <motion.div
              key={v.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              style={{
                padding: '56px 48px',
                background: 'var(--charcoal)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: -20,
                  right: 24,
                  fontFamily: 'var(--font-cormorant)',
                  fontSize: 100,
                  fontWeight: 300,
                  color: 'rgba(184,150,90,0.05)',
                  lineHeight: 1,
                  letterSpacing: '-0.02em',
                  userSelect: 'none',
                }}
              >
                {v.num}
              </div>
              <h3
                style={{
                  fontFamily: 'var(--font-cormorant)',
                  fontSize: 28,
                  fontWeight: 400,
                  color: 'var(--cream)',
                  marginBottom: 16,
                  lineHeight: 1.2,
                  position: 'relative',
                }}
              >
                {v.title}
              </h3>
              <p
                style={{
                  fontSize: 14,
                  lineHeight: 1.85,
                  color: 'rgba(249,245,239,0.5)',
                  maxWidth: 360,
                  position: 'relative',
                }}
              >
                {v.body}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section
        style={{
          padding: '80px 48px 120px',
          textAlign: 'center',
          borderTop: '1px solid rgba(184,150,90,0.08)',
          background:
            'linear-gradient(135deg, rgba(184,150,90,0.04) 0%, transparent 60%)',
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
              fontFamily: 'var(--font-cormorant)',
              fontSize: 'clamp(36px, 5vw, 64px)',
              fontWeight: 300,
              lineHeight: 1.1,
              marginBottom: 32,
            }}
          >
            Ready to wear something{' '}
            <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>
              made for you?
            </em>
          </p>
          <div
            style={{
              display: 'flex',
              gap: 20,
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
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
                padding: '16px 40px',
                fontSize: 11,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                fontFamily: 'var(--font-dm-sans)',
                color: 'var(--gold)',
                border: '1px solid rgba(184,150,90,0.4)',
                display: 'inline-block',
                transition: 'all 0.3s',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement
                el.style.background = 'rgba(184,150,90,0.08)'
                el.style.borderColor = 'var(--gold)'
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement
                el.style.background = 'transparent'
                el.style.borderColor = 'rgba(184,150,90,0.4)'
              }}
            >
              View Portfolio
            </Link>
          </div>
        </motion.div>
      </section>

      <Footer />

      <style>{`
        @media (max-width: 900px) {
          .story-grid {
            grid-template-columns: 1fr !important;
          }
          .values-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </main>
  )
}