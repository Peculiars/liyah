'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
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

export default function PieceCard({
  piece,
  priority = false,
  size = 'medium',
}: PieceCardProps) {
  const [hovered, setHovered] = useState(false)

  const heights = {
    large: 540,
    medium: 360,
    small: 260,
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
      {/* Media */}
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
              <Image
                src={piece.thumbnailUrl}
                alt={piece.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{
                  objectFit: 'cover',
                  transform: hovered ? 'scale(1.06)' : 'scale(1)',
                  transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
                priority={priority}
              />
              {/* Video play indicator */}
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: 48,
                  height: 48,
                  background: 'rgba(184,150,90,0.9)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  opacity: hovered ? 1 : 0.6,
                  transition: 'opacity 0.3s, transform 0.3s',
                  zIndex: 2,
                }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="var(--dark)">
                  <path d="M4 2l10 6-10 6V2z" />
                </svg>
              </div>
            </>
          ) : (
            <Image
              src={piece.mediaUrl}
              alt={piece.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
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
                'linear-gradient(to top, rgba(13,11,9,0.95) 0%, rgba(13,11,9,0.2) 50%, transparent 100%)',
              zIndex: 1,
            }}
          />

          {/* Gender badge */}
          <div
            style={{
              position: 'absolute',
              top: 16,
              left: 16,
              fontSize: 9,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              padding: '6px 12px',
              background: 'rgba(13,11,9,0.7)',
              border: '1px solid rgba(184,150,90,0.3)',
              color: 'rgba(184,150,90,0.9)',
              backdropFilter: 'blur(8px)',
              zIndex: 3,
            }}
          >
            {piece.gender}
          </div>

          {/* Book This Style button */}
          <motion.div
            animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : -8 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'absolute',
              top: 16,
              right: 16,
              zIndex: 3,
            }}
          >
            <BookThisStyle piece={piece} />
          </motion.div>

          {/* Card label */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              padding: '20px 20px 20px',
              zIndex: 2,
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-cormorant)',
                fontSize: 18,
                fontWeight: 400,
                color: 'var(--cream)',
                display: 'block',
                marginBottom: 4,
                letterSpacing: '0.02em',
              }}
            >
              {piece.title}
            </span>
            <span
              style={{
                fontSize: 10,
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
    window.open(
      `https://wa.me/2348000000000?text=${encodeURIComponent(text)}`,
      '_blank'
    )
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
        padding: '8px 14px',
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