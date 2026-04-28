'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminNewPiecePage() {
  const router = useRouter()
  const [form, setForm] = useState({
    title: '',
    description: '',
    category: '',
    gender: '',
    tags: '',
    mediaUrl: '',
    mediaType: 'image' as 'image' | 'video',
    cloudinaryPublicId: '',
    thumbnailUrl: '',
    isFeatured: false,
  })
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setSuccess('')
    setUploading(true)

    try {
      const pieceData = {
        title: form.title,
        description: form.description,
        category: form.category,
        gender: form.gender,
        mediaType: form.mediaType,
        mediaUrl: form.mediaUrl,
        cloudinaryPublicId: form.cloudinaryPublicId,
        thumbnailUrl: form.thumbnailUrl,
        tags: form.tags.split(',').map(t => t.trim()).filter(t => t),
        isFeatured: form.isFeatured,
      }

      const res = await fetch('/api/pieces', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pieceData),
      })

      if (res.ok) {
        setSuccess('Piece uploaded successfully!')
        setTimeout(() => {
          router.push('/admin/pieces')
        }, 1500)
      } else {
        const data = await res.json()
        setError(data.error || 'Failed to upload piece')
      }
    } catch (err) {
      console.error('Upload error:', err)
      setError('Failed to upload piece')
    } finally {
      setUploading(false)
    }
  }

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    setError('')

    try {
      const formData = new FormData()
      formData.append('file', file)

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      if (res.ok) {
        const data = await res.json()
        setForm(prev => ({
          ...prev,
          mediaUrl: data.data.url,
          cloudinaryPublicId: data.data.publicId,
          thumbnailUrl: data.data.thumbnailUrl,
          mediaType: data.data.mediaType,
        }))
      } else {
        setError('Failed to upload file')
      }
    } catch (err) {
      console.error('File upload error:', err)
      setError('Failed to upload file')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div style={{ padding: '48px 40px', color: 'rgba(249,245,239,0.85)' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 40 }}>
        <div>
          <div style={{ fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(184,150,90,0.6)', marginBottom: 8 }}>
            Portfolio
          </div>
          <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 32, fontWeight: 400, fontStyle: 'italic', color: '#b8965a', margin: 0 }}>
            Upload New Piece
          </h1>
        </div>
        <button
          onClick={() => router.push('/admin/pieces')}
          style={{
            padding: '10px 20px',
            background: 'transparent',
            border: '1px solid rgba(184,150,90,0.25)',
            color: 'rgba(249,245,239,0.6)',
            fontSize: 11,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            cursor: 'pointer',
          }}
        >
          Cancel
        </button>
      </div>

      <div style={{ maxWidth: 600 }}>
        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 24 }}>
          {/* Media Upload */}
          <div>
            <label style={labelStyle}>Media</label>
            <div style={{ display: 'grid', gap: 12 }}>
              <input
                type="file"
                accept="image/*,video/*"
                onChange={handleFileUpload}
                disabled={uploading}
                style={{
                  padding: '12px',
                  background: 'rgba(13,11,9,0.8)',
                  border: '1px solid rgba(184,150,90,0.15)',
                  color: 'rgba(249,245,239,0.9)',
                  fontSize: 13,
                  borderRadius: 0,
                }}
              />
              {form.mediaUrl && (
                <div style={{
                  width: 200,
                  height: 200,
                  border: '1px solid rgba(184,150,90,0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden'
                }}>
                  {form.mediaType === 'video' ? (
                    <video
                      src={form.mediaUrl}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      controls
                    />
                  ) : (
                    <img
                      src={form.mediaUrl}
                      alt="Preview"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Title */}
          <div>
            <label style={labelStyle}>Title *</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
              style={inputStyle}
            />
          </div>

          {/* Description */}
          <div>
            <label style={labelStyle}>Description</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows={4}
              style={{ ...inputStyle, resize: 'vertical' }}
            />
          </div>

          {/* Category and Gender */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div>
              <label style={labelStyle}>Category *</label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                required
                style={inputStyle}
              >
                <option value="">Select category</option>
                <option value="bridal">Bridal</option>
                <option value="evening">Evening</option>
                <option value="corporate">Corporate</option>
                <option value="everyday">Everyday</option>
                <option value="coord-sets">Coord Sets</option>
              </select>
            </div>
            <div>
              <label style={labelStyle}>Gender *</label>
              <select
                value={form.gender}
                onChange={(e) => setForm({ ...form, gender: e.target.value })}
                required
                style={inputStyle}
              >
                <option value="">Select gender</option>
                <option value="women">Women</option>
                <option value="men">Men</option>
                <option value="unisex">Unisex</option>
              </select>
            </div>
          </div>

          {/* Tags */}
          <div>
            <label style={labelStyle}>Tags (comma-separated)</label>
            <input
              type="text"
              value={form.tags}
              onChange={(e) => setForm({ ...form, tags: e.target.value })}
              placeholder="e.g. lace, embroidery, custom"
              style={inputStyle}
            />
          </div>

          {/* Featured */}
          <div>
            <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={form.isFeatured}
                onChange={(e) => setForm({ ...form, isFeatured: e.target.checked })}
                style={{ width: 16, height: 16 }}
              />
              <span style={{ fontSize: 13, color: 'rgba(249,245,239,0.7)' }}>
                Mark as featured piece
              </span>
            </label>
          </div>

          {error && (
            <div style={{
              fontSize: 12,
              color: '#e57373',
              background: 'rgba(229,115,115,0.08)',
              border: '1px solid rgba(229,115,115,0.2)',
              padding: '10px 14px',
            }}>
              {error}
            </div>
          )}

          {success && (
            <div style={{
              fontSize: 12,
              color: '#4caf50',
              background: 'rgba(76,175,80,0.08)',
              border: '1px solid rgba(76,175,80,0.2)',
              padding: '10px 14px',
            }}>
              {success}
            </div>
          )}

          <button
            type="submit"
            disabled={uploading || !form.mediaUrl}
            style={{
              width: '100%',
              padding: '16px',
              background: uploading || !form.mediaUrl ? 'rgba(184,150,90,0.5)' : '#b8965a',
              border: 'none',
              color: '#0d0b09',
              fontSize: 12,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              fontWeight: 600,
              cursor: uploading || !form.mediaUrl ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s',
            }}
          >
            {uploading ? 'Uploading...' : 'Upload Piece'}
          </button>
        </form>
      </div>
    </div>
  )
}

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: 12,
  color: 'rgba(249,245,239,0.7)',
  marginBottom: 8,
  letterSpacing: '0.02em',
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '12px 14px',
  background: 'rgba(13,11,9,0.8)',
  border: '1px solid rgba(184,150,90,0.15)',
  color: 'rgba(249,245,239,0.9)',
  fontSize: 13,
  fontFamily: 'system-ui, sans-serif',
  outline: 'none',
  transition: 'border-color 0.2s',
}