'use client'

import { motion } from 'framer-motion'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import BookingForm from '@/components/BookingForm'
import { mockSettings } from '@/lib/mockData'

const steps = [
  {
    num: '01',
    title: 'Share Your Vision',
    body: 'Tell Liyah your occasion, style preferences, colours, and anything that inspires you.',
  },
  {
    num: '02',
    title: 'WhatsApp Consultation',
    body: 'Liyah responds personally to discuss details, measurements, timeline, and pricing.',
  },
  {
    num: '03',
    title: 'Deposit & Creation',
    body: 'A deposit secures your slot. Then the magic begins — fabric sourcing, fittings, and construction.',
  },
  {
    num: '04',
    title: 'Your Piece, Delivered',
    body: 'Your custom creation is delivered, perfectly finished and ready to wear.',
  },
]

export default function BookPage() {
  return (
    <main style={{ background: 'var(--charcoal)', minHeight: '100vh' }}>
      <Navbar />

      {/* Page header */}
      <section
        style={{
          paddingTop: 160,
          paddingBottom: 80,
          paddingLeft: 48,
          paddingRight: 48,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(ellipse 70% 80% at 80% 40%, rgba(184,150,90,0.06) 0%, transparent 70%)',
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

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          style={{ position: 'relative', zIndex: 1 }}
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
            Commission a Piece
          </div>
          <h1
            style={{
              fontFamily: 'var(--font-cormorant)',
              fontSize: 'clamp(52px, 7vw, 96px)',
              fontWeight: 300,
              lineHeight: 0.95,
              marginBottom: 28,
            }}
          >
            Let's Create
            <br />
            <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>
              Something Yours
            </em>
          </h1>
          <p
            style={{
              fontSize: 14,
              lineHeight: 1.9,
              color: 'rgba(249,245,239,0.5)',
              maxWidth: 460,
            }}
          >
            Every Stylique piece begins with a conversation. Fill in the form
            below and Liyah will reach out via WhatsApp personally.
          </p>
        </motion.div>
      </section>

      {/* ─── PROCESS STEPS ─── */}
      <section
        style={{
          padding: '0 48px 80px',
          borderBottom: '1px solid rgba(184,150,90,0.08)',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 1,
            background: 'rgba(184,150,90,0.08)',
          }}
          className="steps-grid"
        >
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              style={{
                padding: '40px 32px',
                background: 'var(--charcoal)',
                position: 'relative',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-cormorant)',
                  fontSize: 56,
                  fontWeight: 300,
                  color: 'rgba(184,150,90,0.1)',
                  lineHeight: 1,
                  marginBottom: 20,
                  letterSpacing: '-0.02em',
                }}
              >
                {step.num}
              </div>
              <h3
                style={{
                  fontFamily: 'var(--font-cormorant)',
                  fontSize: 22,
                  fontWeight: 400,
                  color: 'var(--cream)',
                  marginBottom: 12,
                  lineHeight: 1.2,
                }}
              >
                {step.title}
              </h3>
              <p
                style={{
                  fontSize: 13,
                  lineHeight: 1.8,
                  color: 'rgba(249,245,239,0.45)',
                }}
              >
                {step.body}
              </p>

              {/* Connector arrow */}
              {i < steps.length - 1 && (
                <div
                  style={{
                    position: 'absolute',
                    right: -12,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: 'rgba(184,150,90,0.3)',
                    fontSize: 16,
                    zIndex: 1,
                  }}
                  className="step-arrow"
                >
                  →
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── FORM SECTION ─── */}
      <section
        style={{
          padding: '80px 48px 120px',
          display: 'grid',
          gridTemplateColumns: '1fr 560px',
          gap: 80,
          alignItems: 'start',
        }}
        className="book-grid"
      >
        {/* Left — context */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <div
            style={{
              fontFamily: 'var(--font-cormorant)',
              fontSize: 'clamp(36px, 4vw, 52px)',
              fontWeight: 300,
              lineHeight: 1.15,
              marginBottom: 28,
            }}
          >
            Tell Liyah{' '}
            <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>
              everything
            </em>
          </div>
          <p
            style={{
              fontSize: 14,
              lineHeight: 1.9,
              color: 'rgba(249,245,239,0.5)',
              marginBottom: 48,
              maxWidth: 420,
            }}
          >
            The more you share, the better. Occasion, silhouette, colours,
            fabrics you love, photos that inspire you, your timeline — nothing
            is too much detail.
          </p>

          {/* Divider */}
          <div
            style={{
              width: 1,
              height: 80,
              background:
                'linear-gradient(to bottom, rgba(184,150,90,0.4), transparent)',
              marginBottom: 40,
            }}
          />

          {/* What to include */}
          <div>
            <div
              style={{
                fontSize: 10,
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: 'var(--gold)',
                opacity: 0.7,
                marginBottom: 20,
              }}
            >
              Great messages include:
            </div>
            <ul
              style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: 14,
              }}
            >
              {[
                'The occasion (wedding, dinner, birthday, corporate)',
                'Your preferred silhouette or fit style',
                'Colour palette or fabric preferences',
                'Your timeline / when you need it',
                'Any reference photos or styles you love',
                'Your approximate budget range',
              ].map((item) => (
                <li
                  key={item}
                  style={{
                    fontSize: 13,
                    lineHeight: 1.6,
                    color: 'rgba(249,245,239,0.5)',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 12,
                  }}
                >
                  <span
                    style={{
                      color: 'var(--gold)',
                      fontSize: 10,
                      marginTop: 3,
                      flexShrink: 0,
                    }}
                  >
                    ✦
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Social connect */}
          <div
            style={{
              marginTop: 64,
              padding: '28px 32px',
              border: '1px solid rgba(184,150,90,0.12)',
              background: 'rgba(184,150,90,0.03)',
            }}
          >
            <div
              style={{
                fontSize: 10,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'rgba(249,245,239,0.35)',
                marginBottom: 14,
              }}
            >
              Or reach Liyah directly
            </div>
            <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
              {[
                {
                  label: 'Instagram',
                  href: mockSettings.instagramUrl,
                  handle: '@liyahss_kouture',
                },
                {
                  label: 'TikTok',
                  href: mockSettings.tiktokUrl,
                  handle: '@liyahss_kouture',
                },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    textDecoration: 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 4,
                  }}
                >
                  <span
                    style={{
                      fontSize: 10,
                      letterSpacing: '0.2em',
                      textTransform: 'uppercase',
                      color: 'var(--gold)',
                      opacity: 0.7,
                    }}
                  >
                    {s.label}
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-cormorant)',
                      fontSize: 16,
                      fontStyle: 'italic',
                      color: 'rgba(249,245,239,0.6)',
                    }}
                  >
                    {s.handle}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Right — form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'sticky',
            top: 100,
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(184,150,90,0.12)',
            padding: '48px',
          }}
        >
          <div
            style={{
              fontFamily: 'var(--font-cormorant)',
              fontSize: 32,
              fontWeight: 300,
              lineHeight: 1.2,
              marginBottom: 8,
            }}
          >
            Book Your{' '}
            <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>
              Consultation
            </em>
          </div>
          <p
            style={{
              fontSize: 13,
              color: 'rgba(249,245,239,0.35)',
              lineHeight: 1.7,
              marginBottom: 36,
            }}
          >
            Free and no-obligation. Liyah responds personally.
          </p>
          <BookingForm whatsappNumber={mockSettings.whatsappNumber} />
        </motion.div>
      </section>

      <Footer />

      <style>{`
        @media (max-width: 1100px) {
          .book-grid {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 700px) {
          .steps-grid {
            grid-template-columns: 1fr 1fr !important;
          }
          .step-arrow {
            display: none !important;
          }
        }
        @media (max-width: 460px) {
          .steps-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </main>
  )
}