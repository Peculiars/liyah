'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import AutoplayVideo from '@/components/AutoPlayVideo'
import type { Piece } from '@/types'

interface PieceCardProps {
  piece: Piece
  priority?: boolean
  size?: 'large' | 'medium' | 'small'
}

const categoryLabels: Record<string, string> = {
  bridal: 'Bridal',
  evening: 'Evening & Occasions',
  corporate: 'Corporate',
  everyday: 'Everyday',
  'coord-sets': 'Coord Sets',
  custom: 'Custom',
}

export default function PieceCard({ piece, priority = false, size = 'medium' }: PieceCardProps) {
  const [hovered, setHovered] = useState(false)

  const heights = {
    large: 'clamp(320px, 45vw, 540px)',
    medium: 'clamp(220px, 30vw, 360px)',
    small: 'clamp(180px, 22vw, 260px)',
  }

  return (
    <motion.div
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{
        position: 'relative',
        overflow: 'hidden',
        background: '#1A1714',
        display: 'block',
      }}
      data-cursor="pointer"
    >
      <Link href={`/portfolio/${piece._id}`} style={{ display: 'block' }}>
        <div
          style={{
            position: 'relative',
            height: heights[size],
            overflow: 'hidden',
          }}
        >
          {piece.mediaType === 'video' ? (
            <>
              <AutoplayVideo
                src={piece.mediaUrl}
                poster={piece.thumbnailUrl}
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transform: hovered ? 'scale(1.04)' : 'scale(1)',
                  transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              />
              {/* Video badge */}
              <div
                style={{
                  position: 'absolute',
                  top: 16,
                  right: 16,
                  width: 36,
                  height: 36,
                  background: 'rgba(184,150,90,0.85)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 2,
                  opacity: hovered ? 0 : 0.8,
                  transition: 'opacity 0.3s',
                }}
              >
                <svg width="12" height="12" viewBox="0 0 16 16" fill="var(--dark)">
                  <path d="M4 2l10 6-10 6V2z" />
                </svg>
              </div>
            </>
          ) : (
            <Image
              src={piece.mediaUrl}
              alt={piece.title}
              fill
              sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"
              style={{
                objectFit: 'cover',
                transform: hovered ? 'scale(1.06)' : 'scale(1)',
                transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
              priority={priority}
            />
          )}

          {/* Overlay gradient */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(to top, rgba(13,11,9,0.95) 0%, rgba(13,11,9,0.15) 50%, transparent 100%)',
              zIndex: 1,
            }}
          />

          {/* Gender badge */}
          <div
            style={{
              position: 'absolute',
              top: 14,
              left: 14,
              fontSize: 9,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              padding: '5px 10px',
              background: 'rgba(13,11,9,0.7)',
              border: '1px solid rgba(184,150,90,0.3)',
              color: 'rgba(184,150,90,0.9)',
              backdropFilter: 'blur(8px)',
              zIndex: 3,
            }}
          >
            {piece.gender}
          </div>

          {/* Book This Style — appears on hover */}
          <motion.div
            animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : -8 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'absolute',
              top: 14,
              right: 14,
              zIndex: 3,
            }}
          >
            <BookThisStyle piece={piece} />
          </motion.div>

          {/* Title + category */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              padding: '16px 16px 18px',
              zIndex: 2,
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-cormorant)',
                fontSize: 'clamp(15px, 2.5vw, 18px)',
                fontWeight: 400,
                color: 'var(--cream)',
                display: 'block',
                marginBottom: 3,
                letterSpacing: '0.02em',
              }}
            >
              {piece.title}
            </span>
            <span
              style={{
                fontSize: 9,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--gold)',
                opacity: 0.8,
              }}
            >
              {categoryLabels[piece.category] || piece.category}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

function BookThisStyle({ piece }: { piece: Piece }) {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    const text = `Hi Liyah! I'd love something like your *${piece.title}* piece. Here's what I have in mind:\n\n`
    window.open(`https://wa.me/+2348060995158?text=${encodeURIComponent(text)}`, '_blank')
  }

  return (
    <button
      onClick={handleClick}
      style={{
        background: 'var(--gold)',
        color: 'var(--dark)',
        fontSize: 9,
        letterSpacing: '0.2em',
        textTransform: 'uppercase',
        padding: '7px 12px',
        border: 'none',
        fontFamily: 'var(--font-dm-sans)',
        fontWeight: 500,
        whiteSpace: 'nowrap',
      }}
    >
      Book This Style
    </button>
  )
}