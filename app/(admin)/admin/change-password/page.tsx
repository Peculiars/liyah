'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminChangePasswordPage() {
  const router = useRouter()
  const [form, setForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)

    if (form.newPassword !== form.confirmPassword) {
      setError('New passwords do not match')
      setLoading(false)
      return
    }

    if (form.newPassword.length < 8) {
      setError('New password must be at least 8 characters long')
      setLoading(false)
      return
    }

    try {
      const res = await fetch('/api/admin/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentPassword: form.currentPassword,
          newPassword: form.newPassword,
        }),
      })

      const data = await res.json()

      if (res.ok) {
        setSuccess('Password changed successfully!')
        setForm({ currentPassword: '', newPassword: '', confirmPassword: '' })
        setTimeout(() => {
          router.push('/admin/login')
        }, 2000)
      } else {
        setError(data.error || 'Failed to change password')
      }
    } catch (err) {
      console.error('Password change error:', err)
      setError('Failed to change password')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ padding: '48px 40px', color: 'rgba(249,245,239,0.85)' }}>
      {/* Header */}
      <div style={{ marginBottom: 40 }}>
        <div style={{ fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(184,150,90,0.6)', marginBottom: 8 }}>
          Account Security
        </div>
        <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 32, fontWeight: 400, fontStyle: 'italic', color: '#b8965a', margin: 0 }}>
          Change Password
        </h1>
      </div>

      <div style={{ maxWidth: 400 }}>
        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 20 }}>
          <div>
            <label style={labelStyle}>Current Password</label>
            <input
              type="password"
              value={form.currentPassword}
              onChange={(e) => setForm({ ...form, currentPassword: e.target.value })}
              required
              autoComplete="current-password"
              style={inputStyle}
              onFocus={(e) => (e.target.style.borderColor = 'rgba(184,150,90,0.5)')}
              onBlur={(e) => (e.target.style.borderColor = 'rgba(184,150,90,0.15)')}
            />
          </div>

          <div>
            <label style={labelStyle}>New Password</label>
            <input
              type="password"
              value={form.newPassword}
              onChange={(e) => setForm({ ...form, newPassword: e.target.value })}
              required
              autoComplete="new-password"
              style={inputStyle}
              onFocus={(e) => (e.target.style.borderColor = 'rgba(184,150,90,0.5)')}
              onBlur={(e) => (e.target.style.borderColor = 'rgba(184,150,90,0.15)')}
            />
            <div style={{ fontSize: 10, color: 'rgba(249,245,239,0.4)', marginTop: 4 }}>
              Must be at least 8 characters long
            </div>
          </div>

          <div>
            <label style={labelStyle}>Confirm New Password</label>
            <input
              type="password"
              value={form.confirmPassword}
              onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
              required
              autoComplete="new-password"
              style={inputStyle}
              onFocus={(e) => (e.target.style.borderColor = 'rgba(184,150,90,0.5)')}
              onBlur={(e) => (e.target.style.borderColor = 'rgba(184,150,90,0.15)')}
            />
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
            disabled={loading}
            style={{
              width: '100%',
              padding: '13px',
              background: loading ? 'rgba(184,150,90,0.5)' : '#b8965a',
              border: 'none',
              color: '#0d0b09',
              fontSize: 11,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              fontWeight: 600,
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s',
            }}
          >
            {loading ? 'Changing Password...' : 'Change Password'}
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
  marginBottom: 6,
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