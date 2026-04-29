'use client'

import { useState, useMemo, useEffect } from 'react'
import Fuse from 'fuse.js'
import type { Gender, Category, Piece } from '@/types'
import Navbar from '@/components/Navbar'
import { AnimatePresence, motion } from 'framer-motion'
import PieceCard from '@/components/PieceCard'
import Footer from '@/components/Footer'

type GenderFilter = 'all' | Gender
type CategoryFilter = 'all' | Category

const categoryLabels: Record<string, string> = {
  all: 'All',
  bridal: 'Bridal',
  evening: 'Evening',
  corporate: 'Corporate',
  everyday: 'Everyday',
  'coord-sets': 'Coord Sets',
  custom: 'Custom Request',
}

const fuseOptions = {
  keys: [
    { name: 'title', weight: 0.4 },
    { name: 'tags', weight: 0.3 },
    { name: 'category', weight: 0.2 },
    { name: 'gender', weight: 0.1 },
    { name: 'description', weight: 0.1 },
  ],
  threshold: 0.35,
  includeScore: true,
}

export default function PortfolioPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [genderFilter, setGenderFilter] = useState<GenderFilter>('all')
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('all')
  const [pieces, setPieces] = useState<Piece[]>([])

  useEffect(() => {
    async function loadPieces() {
      try {
        const res = await fetch('/api/pieces')
        const data = await res.json()
        if (data.success) setPieces(data.data)
      } catch (err) {
        console.error('Failed to load pieces:', err)
      }
    }
    loadPieces()
  }, [])

  const fuse = useMemo(() => new Fuse(pieces, fuseOptions), [pieces])

  const filteredPieces = useMemo(() => {
    let results = searchQuery.trim()
      ? fuse.search(searchQuery).map((r) => r.item)
      : pieces

    if (genderFilter !== 'all') {
      results = results.filter((p) => p.gender === genderFilter)
    }
    if (categoryFilter !== 'all') {
      results = results.filter((p) => p.category === categoryFilter)
    }

    return results
  }, [searchQuery, genderFilter, categoryFilter, fuse])

  return (
    <main style={{ background: 'var(--charcoal)', minHeight: '100vh' }}>
      <Navbar />

      {/* Page header */}
      <section
        style={{
          paddingTop: 120,
          paddingBottom: 20,
          paddingLeft: 48,
          paddingRight: 48,
          borderBottom: '1px solid rgba(184,150,90,0.1)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(ellipse 60% 80% at 80% 50%, rgba(184,150,90,0.05) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <div
            style={{
              fontSize: 10,
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: 'var(--gold)',
              marginBottom: 16,
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
            The Portfolio
          </div>
          <h1
            style={{
              fontFamily: 'var(--font-cormorant)',
              fontSize: 'clamp(48px, 6vw, 80px)',
              fontWeight: 300,
              lineHeight: 1,
              marginBottom: 0,
            }}
          >
            Every Piece,{' '}
            <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>
              a Story
            </em>
          </h1>
        </motion.div>
      </section>

      {/* Filters + Search */}
      <section
        className="portfolio-filter-section"
        style={{
          padding: '32px 48px',
          borderBottom: '1px solid rgba(184,150,90,0.08)',
          position: 'sticky',
          top: 72,
          background: 'rgba(26,23,20,0.95)',
          backdropFilter: 'blur(20px)',
          zIndex: 50,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: 24,
            flexWrap: 'wrap',
            justifyContent: 'space-between',
          }}
          className="portfolio-filters"
        >
          {/* Search */}
          <div className="filter-group filter-search" style={{ position: 'relative', flex: '1 1 60px', minWidth: 0 }}>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search pieces, tags, styles..."
              style={{
                width: '100%',
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(184,150,90,0.15)',
                color: 'var(--cream)',
                padding: '10px 16px 10px 38px',
                fontSize: 13,
                fontFamily: 'var(--font-dm-sans)',
                outline: 'none',
                transition: 'border-color 0.3s',
              }}
              onFocus={(e) =>
                (e.target.style.borderColor = 'rgba(184,150,90,0.5)')
              }
              onBlur={(e) =>
                (e.target.style.borderColor = 'rgba(184,150,90,0.15)')
              }
            />
            <svg
              style={{
                position: 'absolute',
                left: 12,
                top: '50%',
                transform: 'translateY(-50%)',
                opacity: 0.4,
              }}
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--gold)"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
          </div>

          {/* Gender filter */}
          <div className="filter-group" style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
            {(['all', 'women', 'men', 'unisex'] as GenderFilter[]).map((g) => (
              <FilterButton
                key={g}
                active={genderFilter === g}
                onClick={() => setGenderFilter(g)}
              >
                {g === 'all' ? 'All' : g.charAt(0).toUpperCase() + g.slice(1)}
              </FilterButton>
            ))}
          </div>

          {/* Category filter */}
          <div className="filter-group" style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
            {(
              [
                'all',
                'bridal',
                'evening',
                'corporate',
                'everyday',
                'coord-sets',
                'custom',
              ] as CategoryFilter[]
            ).map((c) => (
              <FilterButton
                key={c}
                active={categoryFilter === c}
                onClick={() => setCategoryFilter(c)}
              >
                {categoryLabels[c]}
              </FilterButton>
            ))}
          </div>

          {/* Result count */}
          <span
            className="filter-count"
            style={{
              fontSize: 11,
              letterSpacing: '0.1em',
              color: 'rgba(249,245,239,0.3)',
            }}
          >
            {filteredPieces.length}{' '}
            {filteredPieces.length === 1 ? 'piece' : 'pieces'}
          </span>
        </div>
      </section>

      {/* Grid */}
      <section style={{ padding: '48px 48px 120px' }}>
        <AnimatePresence mode="popLayout">
          {filteredPieces.length > 0 ? (
            <motion.div
              layout
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: 20,
              }}
              className="portfolio-grid"
            >
              {filteredPieces.map((piece: any, i: number) => (
                <motion.div
                  key={piece._id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                >
                  <PieceCard
                    piece={piece}
                    size={i === 0 ? 'large' : 'medium'}
                    priority={i < 3}
                  />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                textAlign: 'center',
                padding: '120px 0',
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-cormorant)',
                  fontSize: 28,
                  fontStyle: 'italic',
                  color: 'rgba(249,245,239,0.3)',
                  marginBottom: 16,
                }}
              >
                No pieces found
              </p>
              <p
                style={{
                  fontSize: 13,
                  color: 'rgba(249,245,239,0.2)',
                }}
              >
                Try a different search or filter
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      <Footer />

      <style>{`
        .portfolio-filter-section {
          width: 100%;
        }

        .portfolio-filters {
          width: 100%;
        }
        .filter-group {
          display: flex;
          flex-wrap: wrap;
          gap: 4px;
          align-items: center;
        }

        .filter-count {
          min-width: 112px;
        }

        @media (max-width: 720px) {
          .portfolio-filter-section {
            padding: 24px 20px !important;
          }

          .portfolio-filters {
            flex-direction: column;
            align-items: stretch;
            gap: 12px;
          }

          .filter-group,
          .filter-count {
            width: 100%;
          }

          .filter-group.filter-search {
            min-width: 0;
          }

          .filter-group {
            flex-wrap: nowrap;
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
            padding-bottom: 4px;
          }

          .filter-group button {
            flex: 0 0 auto;
            white-space: nowrap;
          }
        }

        @media (max-width: 900px) {
          .portfolio-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 600px) {
          .portfolio-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </main>
  )
}

function FilterButton({
  children,
  active,
  onClick,
}: {
  children: React.ReactNode
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      style={{
        fontSize: 10,
        letterSpacing: '0.18em',
        textTransform: 'uppercase',
        padding: '7px 16px',
        background: active ? 'var(--gold)' : 'transparent',
        border: `1px solid ${active ? 'var(--gold)' : 'rgba(184,150,90,0.2)'}`,
        color: active ? 'var(--dark)' : 'rgba(249,245,239,0.5)',
        fontFamily: 'var(--font-dm-sans)',
        fontWeight: active ? 500 : 400,
        transition: 'all 0.3s',
        cursor: 'none',
      }}
      onMouseEnter={(e) => {
        if (!active) {
          const el = e.currentTarget
          el.style.borderColor = 'var(--gold)'
          el.style.color = 'var(--gold)'
        }
      }}
      onMouseLeave={(e) => {
        if (!active) {
          const el = e.currentTarget
          el.style.borderColor = 'rgba(184,150,90,0.2)'
          el.style.color = 'rgba(249,245,239,0.5)'
        }
      }}
    >
      {children}
    </button>
  )
}