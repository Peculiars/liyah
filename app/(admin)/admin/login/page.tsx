'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function AdminLoginPage() {
  const router = useRouter()
  const [form, setForm] = useState({ username: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const result = await signIn('credentials', {
      username: form.username,
      password: form.password,
      redirect: false,
    })

    setLoading(false)

    if (result?.error) {
      setError('Invalid username or password')
    } else {
      router.push('/admin')
    }
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#0d0b09',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
        fontFamily: 'system-ui, sans-serif',
      }}
    >
      <div style={{ width: '100%', maxWidth: 400 }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div
            style={{
              fontSize: 9,
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: 'rgba(184,150,90,0.5)',
              marginBottom: 10,
            }}
          >
            Admin Access
          </div>
          <h1
            style={{
              fontFamily: 'Georgia, serif',
              fontSize: 28,
              fontStyle: 'italic',
              fontWeight: 400,
              color: '#b8965a',
              margin: 0,
            }}
          >
            Stylique by Liyah
          </h1>
        </div>

        {/* Card */}
        <div
          style={{
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(184,150,90,0.12)',
            padding: '40px 36px',
          }}
        >
          <h2
            style={{
              fontSize: 15,
              fontWeight: 500,
              color: 'rgba(249,245,239,0.8)',
              margin: '0 0 28px',
              letterSpacing: '0.02em',
            }}
          >
            Sign in to your account
          </h2>

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: 20 }}>
              <label style={labelStyle}>Username</label>
              <input
                type="text"
                value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
                required
                autoComplete="username"
                style={inputStyle}
                onFocus={(e) => (e.target.style.borderColor = 'rgba(184,150,90,0.5)')}
                onBlur={(e) => (e.target.style.borderColor = 'rgba(184,150,90,0.15)')}
              />
            </div>

            <div style={{ marginBottom: 28 }}>
              <label style={labelStyle}>Password</label>
              <input
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
                autoComplete="current-password"
                style={inputStyle}
                onFocus={(e) => (e.target.style.borderColor = 'rgba(184,150,90,0.5)')}
                onBlur={(e) => (e.target.style.borderColor = 'rgba(184,150,90,0.15)')}
              />
            </div>

            {error && (
              <div
                style={{
                  fontSize: 12,
                  color: '#e57373',
                  background: 'rgba(229,115,115,0.08)',
                  border: '1px solid rgba(229,115,115,0.2)',
                  padding: '10px 14px',
                  marginBottom: 20,
                }}
              >
                {error}
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
                transition: 'background 0.2s',
              }}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: 10,
  letterSpacing: '0.2em',
  textTransform: 'uppercase',
  color: 'rgba(249,245,239,0.4)',
  marginBottom: 8,
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  background: 'rgba(255,255,255,0.03)',
  border: '1px solid rgba(184,150,90,0.15)',
  color: 'rgba(249,245,239,0.9)',
  padding: '11px 14px',
  fontSize: 14,
  outline: 'none',
  transition: 'border-color 0.2s',
  boxSizing: 'border-box',
}



