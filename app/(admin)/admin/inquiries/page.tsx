'use client'

import { useEffect, useState } from 'react'

interface Inquiry {
  _id: string
  name: string
  email: string
  phone: string
  message: string
  serviceType: string
  budget?: string
  timeline?: string
  status: 'new' | 'contacted' | 'completed' | 'cancelled'
  createdAt: string
}

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [updating, setUpdating] = useState<string | null>(null)

  async function loadInquiries() {
    setLoading(true)
    try {
      const res = await fetch(`/api/inquiries?status=${filter === 'all' ? '' : filter}`)
      const data = await res.json()
      setInquiries(data.data || [])
    } catch (err) {
      console.error('Failed to load inquiries:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { loadInquiries() }, [filter])

  async function updateStatus(id: string, status: Inquiry['status']) {
    setUpdating(id)
    try {
      const res = await fetch(`/api/inquiries/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      })
      if (res.ok) {
        setInquiries(prev => prev.map(i => i._id === id ? { ...i, status } : i))
      } else {
        alert('Failed to update status')
      }
    } catch (err) {
      console.error('Failed to update status:', err)
      alert('Failed to update status')
    } finally {
      setUpdating(null)
    }
  }

  const filtered = filter === 'all' ? inquiries : inquiries.filter(i => i.status === filter)

  return (
    <div style={{ padding: '48px 40px', color: 'rgba(249,245,239,0.85)' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 40 }}>
        <div>
          <div style={{ fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(184,150,90,0.6)', marginBottom: 8 }}>
            Customer Service
          </div>
          <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 32, fontWeight: 400, fontStyle: 'italic', color: '#b8965a', margin: 0 }}>
            Inquiries
          </h1>
        </div>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 28, flexWrap: 'wrap' }}>
        {['all', 'new', 'contacted', 'completed', 'cancelled'].map((f) => (
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
          {filtered.length} inquiry{filtered.length !== 1 ? 's' : ''}
        </span>
      </div>

      {/* Table */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '80px 0', color: 'rgba(249,245,239,0.3)', fontSize: 14 }}>Loading inquiries...</div>
      ) : filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '80px 0' }}>
          <p style={{ color: 'rgba(249,245,239,0.3)', fontFamily: 'Georgia, serif', fontStyle: 'italic', fontSize: 20 }}>No inquiries yet</p>
        </div>
      ) : (
        <div style={{ border: '1px solid rgba(184,150,90,0.1)' }}>
          {/* Table header */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 200px 120px 120px 140px',
            padding: '12px 20px',
            borderBottom: '1px solid rgba(184,150,90,0.1)',
            fontSize: 9,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'rgba(249,245,239,0.3)',
          }}>
            <span>Contact</span>
            <span>Service</span>
            <span>Status</span>
            <span>Date</span>
            <span>Actions</span>
          </div>

          {filtered.map((inquiry) => (
            <div
              key={inquiry._id}
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 200px 120px 120px 140px',
                padding: '16px 20px',
                borderBottom: '1px solid rgba(184,150,90,0.06)',
                alignItems: 'start',
                transition: 'background 0.15s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(184,150,90,0.03)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
            >
              {/* Contact Info */}
              <div>
                <div style={{ fontSize: 14, color: 'rgba(249,245,239,0.9)', marginBottom: 4 }}>{inquiry.name}</div>
                <div style={{ fontSize: 12, color: 'rgba(249,245,239,0.6)', marginBottom: 2 }}>{inquiry.email}</div>
                <div style={{ fontSize: 12, color: 'rgba(249,245,239,0.6)', marginBottom: 8 }}>{inquiry.phone}</div>
                <div style={{ fontSize: 11, color: 'rgba(249,245,239,0.7)', lineHeight: 1.4 }}>
                  {inquiry.message.length > 100 ? `${inquiry.message.substring(0, 100)}...` : inquiry.message}
                </div>
                {(inquiry.budget || inquiry.timeline) && (
                  <div style={{ fontSize: 10, color: 'rgba(249,245,239,0.5)', marginTop: 6 }}>
                    {inquiry.budget && `Budget: ${inquiry.budget}`}
                    {inquiry.budget && inquiry.timeline && ' • '}
                    {inquiry.timeline && `Timeline: ${inquiry.timeline}`}
                  </div>
                )}
              </div>

              {/* Service Type */}
              <span style={{ fontSize: 11, color: 'rgba(249,245,239,0.7)', textTransform: 'capitalize' }}>
                {inquiry.serviceType}
              </span>

              {/* Status */}
              <select
                value={inquiry.status}
                onChange={(e) => updateStatus(inquiry._id, e.target.value as Inquiry['status'])}
                disabled={updating === inquiry._id}
                style={{
                  fontSize: 10,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  padding: '4px 8px',
                  border: '1px solid rgba(184,150,90,0.2)',
                  background: 'rgba(13,11,9,0.8)',
                  color: 'rgba(249,245,239,0.7)',
                  borderRadius: 0,
                  cursor: 'pointer',
                  opacity: updating === inquiry._id ? 0.5 : 1,
                }}
              >
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>

              {/* Date */}
              <span style={{ fontSize: 11, color: 'rgba(249,245,239,0.5)' }}>
                {new Date(inquiry.createdAt).toLocaleDateString()}
              </span>

              {/* Actions */}
              <div style={{ display: 'flex', gap: 6 }}>
                <button
                  onClick={() => {
                    const subject = encodeURIComponent(`Re: ${inquiry.serviceType} Inquiry`)
                    const body = encodeURIComponent(`Hi ${inquiry.name},\n\nThank you for your inquiry about ${inquiry.serviceType}.\n\n`)
                    window.open(`mailto:${inquiry.email}?subject=${subject}&body=${body}`)
                  }}
                  style={{
                    fontSize: 10,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: '#b8965a',
                    background: 'none',
                    border: '1px solid rgba(184,150,90,0.25)',
                    padding: '4px 8px',
                    cursor: 'pointer',
                  }}
                >
                  Email
                </button>
                <button
                  onClick={() => {
                    window.open(`tel:${inquiry.phone}`)
                  }}
                  style={{
                    fontSize: 10,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: '#b8965a',
                    background: 'none',
                    border: '1px solid rgba(184,150,90,0.25)',
                    padding: '4px 8px',
                    cursor: 'pointer',
                  }}
                >
                  Call
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}