'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function AdminPiecesPage() {
  const [pieces, setPieces] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState<string | null>(null)
  const [filter, setFilter] = useState('all')

  async function loadPieces() {
    setLoading(true)
    const res = await fetch('/api/pieces')
    const data = await res.json()
    setPieces(data.data || [])
    setLoading(false)
  }

  useEffect(() => { loadPieces() }, [])

  async function deletePiece(id: string, title: string) {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return
    setDeleting(id)
    const res = await fetch(`/api/pieces/${id}`, { method: 'DELETE' })
    if (res.ok) {
      setPieces((prev) => prev.filter((p) => p._id !== id))
    } else {
      alert('Failed to delete piece')
    }
    setDeleting(null)
  }

  async function toggleFeatured(id: string, current: boolean) {
    const res = await fetch(`/api/pieces/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isFeatured: !current }),
    })
    if (res.ok) {
      setPieces((prev) => prev.map((p) => p._id === id ? { ...p, isFeatured: !current } : p))
    }
  }

  const filtered = filter === 'all' ? pieces : filter === 'featured' ? pieces.filter(p => p.isFeatured) : pieces.filter(p => p.gender === filter || p.category === filter)

  return (
    <div style={{ padding: '48px 40px', color: 'rgba(249,245,239,0.85)' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 40 }}>
        <div>
          <div style={{ fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(184,150,90,0.6)', marginBottom: 8 }}>
            Portfolio
          </div>
          <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 32, fontWeight: 400, fontStyle: 'italic', color: '#b8965a', margin: 0 }}>
            All Pieces
          </h1>
        </div>
        <Link
          href="/admin/pieces/new"
          style={{
            background: '#b8965a',
            color: '#0d0b09',
            padding: '12px 24px',
            fontSize: 11,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            fontWeight: 600,
            textDecoration: 'none',
          }}
        >
          + Upload Piece
        </Link>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 28, flexWrap: 'wrap' }}>
        {['all', 'featured', 'women', 'men', 'unisex', 'bridal', 'evening', 'corporate', 'everyday', 'coord-sets'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              padding: '6px 14px',
              fontSize: 10,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              background: filter === f ? '#b8965a' : 'transparent',
              border: `1px solid ${filter === f ? '#b8965a' : 'rgba(184,150,90,0.2)'}`,
              color: filter === f ? '#0d0b09' : 'rgba(249,245,239,0.4)',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            {f}
          </button>
        ))}
        <span style={{ fontSize: 12, color: 'rgba(249,245,239,0.3)', alignSelf: 'center', marginLeft: 8 }}>
          {filtered.length} piece{filtered.length !== 1 ? 's' : ''}
        </span>
      </div>

      {/* Table */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '80px 0', color: 'rgba(249,245,239,0.3)', fontSize: 14 }}>Loading pieces...</div>
      ) : filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '80px 0' }}>
          <p style={{ color: 'rgba(249,245,239,0.3)', fontFamily: 'Georgia, serif', fontStyle: 'italic', fontSize: 20 }}>No pieces yet</p>
          <Link href="/admin/pieces/new" style={{ fontSize: 12, color: '#b8965a', textDecoration: 'none' }}>Upload your first piece →</Link>
        </div>
      ) : (
        <div style={{ border: '1px solid rgba(184,150,90,0.1)' }}>
          {/* Table header */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '60px 1fr 120px 120px 80px 80px 140px',
            padding: '12px 20px',
            borderBottom: '1px solid rgba(184,150,90,0.1)',
            fontSize: 9,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'rgba(249,245,239,0.3)',
          }}>
            <span>Media</span>
            <span>Title</span>
            <span>Category</span>
            <span>Gender</span>
            <span>Type</span>
            <span>Featured</span>
            <span>Actions</span>
          </div>

          {filtered.map((piece) => (
            <div
              key={piece._id}
              style={{
                display: 'grid',
                gridTemplateColumns: '60px 1fr 120px 120px 80px 80px 140px',
                padding: '14px 20px',
                borderBottom: '1px solid rgba(184,150,90,0.06)',
                alignItems: 'center',
                transition: 'background 0.15s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(184,150,90,0.03)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
            >
              {/* Thumbnail */}
              <div style={{ width: 44, height: 52, position: 'relative', overflow: 'hidden', flexShrink: 0 }}>
                <Image
                  src={piece.thumbnailUrl || piece.mediaUrl}
                  alt={piece.title}
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>

              {/* Title */}
              <div>
                <div style={{ fontSize: 13, color: 'rgba(249,245,239,0.85)', marginBottom: 3 }}>{piece.title}</div>
                <div style={{ fontSize: 10, color: 'rgba(249,245,239,0.3)', display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {piece.tags?.slice(0, 3).map((t: string) => (
                    <span key={t} style={{ background: 'rgba(184,150,90,0.07)', padding: '1px 6px' }}>{t}</span>
                  ))}
                </div>
              </div>

              {/* Category */}
              <span style={{ fontSize: 11, color: 'rgba(249,245,239,0.5)', textTransform: 'capitalize' }}>{piece.category}</span>

              {/* Gender */}
              <span style={{ fontSize: 11, color: 'rgba(249,245,239,0.5)', textTransform: 'capitalize' }}>{piece.gender}</span>

              {/* Type */}
              <span style={{
                fontSize: 9,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                padding: '3px 7px',
                border: '1px solid rgba(184,150,90,0.15)',
                color: 'rgba(184,150,90,0.7)',
              }}>
                {piece.mediaType}
              </span>

              {/* Featured toggle */}
              <button
                onClick={() => toggleFeatured(piece._id, piece.isFeatured)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: 18,
                  padding: 0,
                  opacity: piece.isFeatured ? 1 : 0.25,
                  transition: 'opacity 0.2s',
                }}
                title={piece.isFeatured ? 'Remove from featured' : 'Mark as featured'}
              >
                ★
              </button>

              {/* Actions */}
              <div style={{ display: 'flex', gap: 8 }}>
                <Link
                  href={`/admin/pieces/${piece._id}`}
                  style={{
                    fontSize: 10,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: '#b8965a',
                    textDecoration: 'none',
                    padding: '5px 10px',
                    border: '1px solid rgba(184,150,90,0.25)',
                  }}
                >
                  Edit
                </Link>
                <button
                  onClick={() => deletePiece(piece._id, piece.title)}
                  disabled={deleting === piece._id}
                  style={{
                    fontSize: 10,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: '#e57373',
                    background: 'none',
                    border: '1px solid rgba(229,115,115,0.2)',
                    padding: '5px 10px',
                    cursor: 'pointer',
                    opacity: deleting === piece._id ? 0.5 : 1,
                  }}
                >
                  {deleting === piece._id ? '...' : 'Delete'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}