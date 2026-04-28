import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import PieceCard from '@/components/PieceCard'
import BookingForm from '@/components/BookingForm'
import { connectDB } from '@/lib/mongodb'
import Piece from '@/models/Piece'
import SiteSettings from '@/models/Settings'
import type { Piece as PieceType } from '@/types'

const categoryLabels: Record<string, string> = {
  bridal: 'Bridal',
  evening: 'Evening & Occasions',
  corporate: 'Corporate',
  everyday: 'Everyday & Casual',
  'coord-sets': 'Coord Sets',
  custom: 'Custom Request',
}

export default async function PieceDetailPage({
  params,
}: {
  params: { id: string }
}) {
  await connectDB()
  const pieceDoc = await Piece.findById(params.id).lean()
  if (!pieceDoc) notFound()

  let settings = await SiteSettings.findOne().lean()
  if (!settings) {
    const created = await SiteSettings.create({})
    settings = created.toObject()
  }

  const whatsappNumber = settings.whatsappNumber ?? '+2348060995158'

  const piece = {
    _id: pieceDoc._id.toString(),
    title: pieceDoc.title,
    description: pieceDoc.description,
    category: pieceDoc.category,
    gender: pieceDoc.gender,
    mediaType: pieceDoc.mediaType,
    mediaUrl: pieceDoc.mediaUrl,
    thumbnailUrl: pieceDoc.thumbnailUrl,
    tags: pieceDoc.tags || [],
    isFeatured: pieceDoc.isFeatured,
    createdAt: pieceDoc.createdAt ? pieceDoc.createdAt.toISOString() : '',
  } as unknown as PieceType & { createdAt: string }

  const allPieces = await Piece.find().lean()
  const related = (allPieces as any[])
    .filter(
      (p) =>
        p._id.toString() !== piece._id.toString() &&
        (p.category === piece.category || p.gender === piece.gender)
    )
    .slice(0, 3)

  return (
    <main style={{ background: 'var(--charcoal)', minHeight: '100vh' }}>
      <Navbar />

      {/* ─── HERO MEDIA ─── */}
      <section
        style={{
          position: 'relative',
          height: '90vh',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'flex-end',
        }}
      >
        {piece.mediaType === 'video' ? (
          <video
            src={piece.mediaUrl}
            autoPlay
            loop
            muted
            playsInline
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        ) : (
          <Image
            src={piece.mediaUrl}
            alt={piece.title}
            fill
            style={{ objectFit: 'cover', objectPosition: 'top center' }}
            priority
          />
        )}

        {/* Overlays */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(to top, rgba(13,11,9,0.98) 0%, rgba(13,11,9,0.3) 50%, rgba(13,11,9,0.1) 100%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(ellipse 80% 60% at 50% 80%, rgba(184,150,90,0.05) 0%, transparent 70%)',
          }}
        />

        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          style={{
            position: 'absolute',
            top: 120,
            left: 48,
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            fontSize: 11,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
          }}
        >
          <Link
            href="/portfolio"
            style={{
              color: 'rgba(249,245,239,0.4)',
              textDecoration: 'none',
              transition: 'color 0.3s',
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.color = 'var(--gold)')
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.color =
                'rgba(249,245,239,0.4)')
            }
          >
            Portfolio
          </Link>
          <span style={{ color: 'rgba(184,150,90,0.4)' }}>›</span>
          <span style={{ color: 'rgba(249,245,239,0.6)' }}>{piece.title}</span>
        </motion.div>

        {/* Hero text */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'relative',
            zIndex: 2,
            padding: '0 48px 64px',
            width: '100%',
          }}
        >
          <div
            style={{
              display: 'flex',
              gap: 10,
              marginBottom: 20,
              flexWrap: 'wrap',
            }}
          >
            <span
              style={{
                fontSize: 9,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                padding: '6px 12px',
                background: 'rgba(13,11,9,0.7)',
                border: '1px solid rgba(184,150,90,0.3)',
                color: 'rgba(184,150,90,0.9)',
                backdropFilter: 'blur(8px)',
              }}
            >
              {piece.gender}
            </span>
            <span
              style={{
                fontSize: 9,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                padding: '6px 12px',
                background: 'rgba(13,11,9,0.7)',
                border: '1px solid rgba(184,150,90,0.15)',
                color: 'rgba(249,245,239,0.6)',
                backdropFilter: 'blur(8px)',
              }}
            >
              {categoryLabels[piece.category] || piece.category}
            </span>
          </div>

          <h1
            style={{
              fontFamily: 'var(--font-cormorant)',
              fontSize: 'clamp(44px, 6vw, 80px)',
              fontWeight: 300,
              lineHeight: 1,
              letterSpacing: '-0.01em',
              maxWidth: 700,
            }}
          >
            {piece.title}
          </h1>
        </motion.div>
      </section>

      {/* ─── CONTENT ─── */}
      <section
        style={{
          padding: '80px 48px',
          display: 'grid',
          gridTemplateColumns: '1fr 440px',
          gap: 80,
          alignItems: 'start',
        }}
        className="detail-grid"
      >
        {/* Left — details */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Description */}
          <div style={{ marginBottom: 56 }}>
            <div
              style={{
                fontSize: 10,
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: 'var(--gold)',
                opacity: 0.8,
                marginBottom: 20,
                display: 'flex',
                alignItems: 'center',
                gap: 12,
              }}
            >
              <span
                style={{
                  display: 'block',
                  width: 20,
                  height: 1,
                  background: 'var(--gold)',
                  opacity: 0.6,
                }}
              />
              About This Piece
            </div>
            <p
              style={{
                fontFamily: 'var(--font-cormorant)',
                fontSize: 20,
                fontWeight: 300,
                lineHeight: 1.7,
                color: 'rgba(249,245,239,0.8)',
                maxWidth: 600,
              }}
            >
              {piece.description}
            </p>
          </div>

          {/* Tags */}
          <div style={{ marginBottom: 56 }}>
            <div
              style={{
                fontSize: 10,
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: 'rgba(249,245,239,0.3)',
                marginBottom: 16,
              }}
            >
              Tags
            </div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {piece.tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontSize: 10,
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    padding: '6px 14px',
                    border: '1px solid rgba(184,150,90,0.15)',
                    color: 'rgba(249,245,239,0.4)',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Details grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 1,
              background: 'rgba(184,150,90,0.1)',
              marginBottom: 56,
            }}
          >
            {[
              { label: 'Gender', value: piece.gender.charAt(0).toUpperCase() + piece.gender.slice(1) },
              { label: 'Category', value: categoryLabels[piece.category] || piece.category },
              { label: 'Type', value: piece.mediaType === 'video' ? 'Video Showcase' : 'Photography' },
            ].map((d) => (
              <div
                key={d.label}
                style={{
                  padding: '24px',
                  background: 'var(--charcoal)',
                }}
              >
                <span
                  style={{
                    fontSize: 10,
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: 'rgba(249,245,239,0.3)',
                    display: 'block',
                    marginBottom: 8,
                  }}
                >
                  {d.label}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-cormorant)',
                    fontSize: 18,
                    color: 'var(--cream)',
                  }}
                >
                  {d.value}
                </span>
              </div>
            ))}
          </div>

          {/* Back link */}
          <Link
            href="/portfolio"
            style={{
              fontSize: 11,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'rgba(249,245,239,0.4)',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              transition: 'color 0.3s',
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.color = 'var(--gold)')
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.color =
                'rgba(249,245,239,0.4)')
            }
          >
            ← Back to Portfolio
          </Link>
        </motion.div>

        {/* Right — booking form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          style={{
            position: 'sticky',
            top: 100,
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(184,150,90,0.12)',
            padding: '40px',
          }}
        >
          <div
            style={{
              fontFamily: 'var(--font-cormorant)',
              fontSize: 28,
              fontWeight: 300,
              lineHeight: 1.2,
              marginBottom: 8,
            }}
          >
            Love This{' '}
            <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>
              Piece?
            </em>
          </div>
          <p
            style={{
              fontSize: 13,
              color: 'rgba(249,245,239,0.4)',
              lineHeight: 1.7,
              marginBottom: 32,
            }}
          >
            Tell Liyah your vision and she'll craft something just for you.
          </p>
          <BookingForm
            piece={piece}
            whatsappNumber={whatsappNumber}
          />
        </motion.div>
      </section>

      {/* ─── RELATED PIECES ─── */}
      {related.length > 0 && (
        <section
          style={{
            padding: '0 48px 120px',
            borderTop: '1px solid rgba(184,150,90,0.08)',
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={{ padding: '64px 0 40px' }}
          >
            <h2
              style={{
                fontFamily: 'var(--font-cormorant)',
                fontSize: 'clamp(32px, 4vw, 48px)',
                fontWeight: 300,
              }}
            >
              You Might Also{' '}
              <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>
                Love
              </em>
            </h2>
          </motion.div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 20,
            }}
            className="related-grid"
          >
            {related.map((p, i) => (
              <motion.div
                key={p._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.1 }}
              >
                <PieceCard piece={p} size="medium" />
              </motion.div>
            ))}
          </div>
        </section>
      )}

      <Footer />

      <style>{`
        @media (max-width: 1024px) {
          .detail-grid {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 700px) {
          .related-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </main>
  )
}