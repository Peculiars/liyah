'use client'

import { useEffect, useState } from 'react'

interface Settings {
  whatsappNumber: string
  brandBio: string
  heroTitle: string
  heroSubtitle: string
  instagramUrl: string
  tiktokUrl: string
  heroSlides: {
    headline: string[]
    italicIndex: number
    sub: string
    imageUrl: string
  }[]
  stats: {
    followers: string
    piecesCreated: string
    bespoke: string
  }
  aboutTagline: string
  aboutBody: string
}

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<Settings | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    loadSettings()
  }, [])

  async function loadSettings() {
    try {
      const res = await fetch('/api/settings')
      const data = await res.json()
      if (data.success) {
        setSettings(data.data)
      }
    } catch (err) {
      console.error('Failed to load settings:', err)
    } finally {
      setLoading(false)
    }
  }

  async function saveSettings() {
    if (!settings) return

    setSaving(true)
    setMessage('')

    try {
      const res = await fetch('/api/settings', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      })

      if (res.ok) {
        setMessage('Settings saved successfully!')
        setTimeout(() => setMessage(''), 3000)
      } else {
        setMessage('Failed to save settings')
      }
    } catch (err) {
      console.error('Failed to save settings:', err)
      setMessage('Failed to save settings')
    } finally {
      setSaving(false)
    }
  }

  function updateSetting<K extends keyof Settings>(key: K, value: Settings[K]) {
    if (!settings) return
    setSettings({ ...settings, [key]: value })
  }

  function updateStats<K extends keyof Settings['stats']>(key: K, value: string) {
    if (!settings) return
    setSettings({
      ...settings,
      stats: { ...settings.stats, [key]: value }
    })
  }

  function updateHeroSlide(index: number, field: keyof Settings['heroSlides'][0], value: any) {
    if (!settings) return
    const newSlides = [...settings.heroSlides]
    newSlides[index] = { ...newSlides[index], [field]: value }
    setSettings({ ...settings, heroSlides: newSlides })
  }

  if (loading) {
    return (
      <div style={{ padding: '48px 40px', color: 'rgba(249,245,239,0.85)' }}>
        <div style={{ textAlign: 'center', padding: '80px 0', color: 'rgba(249,245,239,0.3)', fontSize: 14 }}>
          Loading settings...
        </div>
      </div>
    )
  }

  if (!settings) {
    return (
      <div style={{ padding: '48px 40px', color: 'rgba(249,245,239,0.85)' }}>
        <div style={{ textAlign: 'center', padding: '80px 0', color: 'rgba(249,245,239,0.3)', fontSize: 14 }}>
          Failed to load settings
        </div>
      </div>
    )
  }

  return (
    <div style={{ padding: '48px 40px', color: 'rgba(249,245,239,0.85)' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 40 }}>
        <div>
          <div style={{ fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(184,150,90,0.6)', marginBottom: 8 }}>
            Site Management
          </div>
          <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 32, fontWeight: 400, fontStyle: 'italic', color: '#b8965a', margin: 0 }}>
            Settings
          </h1>
        </div>
        <button
          onClick={saveSettings}
          disabled={saving}
          style={{
            padding: '12px 24px',
            background: saving ? 'rgba(184,150,90,0.5)' : '#b8965a',
            border: 'none',
            color: '#0d0b09',
            fontSize: 11,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            fontWeight: 600,
            cursor: saving ? 'not-allowed' : 'pointer',
          }}
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      {message && (
        <div style={{
          padding: '12px 16px',
          marginBottom: 24,
          background: message.includes('successfully') ? 'rgba(76,175,80,0.1)' : 'rgba(244,67,54,0.1)',
          border: `1px solid ${message.includes('successfully') ? 'rgba(76,175,80,0.3)' : 'rgba(244,67,54,0.3)'}`,
          color: message.includes('successfully') ? '#4caf50' : '#f44336',
          fontSize: 12,
        }}>
          {message}
        </div>
      )}

      <div style={{ display: 'grid', gap: 32 }}>
        {/* Contact Information */}
        <div>
          <h2 style={{ fontSize: 16, fontWeight: 500, color: '#b8965a', marginBottom: 16, fontFamily: 'Georgia, serif', fontStyle: 'italic' }}>
            Contact Information
          </h2>
          <div style={{ display: 'grid', gap: 16 }}>
            <div>
              <label style={{ display: 'block', fontSize: 12, color: 'rgba(249,245,239,0.7)', marginBottom: 6 }}>
                WhatsApp Number
              </label>
              <input
                type="text"
                value={settings.whatsappNumber}
                onChange={(e) => updateSetting('whatsappNumber', e.target.value)}
                style={inputStyle}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 12, color: 'rgba(249,245,239,0.7)', marginBottom: 6 }}>
                Instagram URL
              </label>
              <input
                type="url"
                value={settings.instagramUrl}
                onChange={(e) => updateSetting('instagramUrl', e.target.value)}
                style={inputStyle}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 12, color: 'rgba(249,245,239,0.7)', marginBottom: 6 }}>
                TikTok URL
              </label>
              <input
                type="url"
                value={settings.tiktokUrl}
                onChange={(e) => updateSetting('tiktokUrl', e.target.value)}
                style={inputStyle}
              />
            </div>
          </div>
        </div>

        {/* Brand Content */}
        <div>
          <h2 style={{ fontSize: 16, fontWeight: 500, color: '#b8965a', marginBottom: 16, fontFamily: 'Georgia, serif', fontStyle: 'italic' }}>
            Brand Content
          </h2>
          <div style={{ display: 'grid', gap: 16 }}>
            <div>
              <label style={{ display: 'block', fontSize: 12, color: 'rgba(249,245,239,0.7)', marginBottom: 6 }}>
                Brand Bio
              </label>
              <textarea
                value={settings.brandBio}
                onChange={(e) => updateSetting('brandBio', e.target.value)}
                rows={3}
                style={{ ...inputStyle, resize: 'vertical' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 12, color: 'rgba(249,245,239,0.7)', marginBottom: 6 }}>
                Hero Title
              </label>
              <input
                type="text"
                value={settings.heroTitle}
                onChange={(e) => updateSetting('heroTitle', e.target.value)}
                style={inputStyle}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 12, color: 'rgba(249,245,239,0.7)', marginBottom: 6 }}>
                Hero Subtitle
              </label>
              <textarea
                value={settings.heroSubtitle}
                onChange={(e) => updateSetting('heroSubtitle', e.target.value)}
                rows={2}
                style={{ ...inputStyle, resize: 'vertical' }}
              />
            </div>
          </div>
        </div>

        {/* About Section */}
        <div>
          <h2 style={{ fontSize: 16, fontWeight: 500, color: '#b8965a', marginBottom: 16, fontFamily: 'Georgia, serif', fontStyle: 'italic' }}>
            About Section
          </h2>
          <div style={{ display: 'grid', gap: 16 }}>
            <div>
              <label style={{ display: 'block', fontSize: 12, color: 'rgba(249,245,239,0.7)', marginBottom: 6 }}>
                About Tagline
              </label>
              <input
                type="text"
                value={settings.aboutTagline}
                onChange={(e) => updateSetting('aboutTagline', e.target.value)}
                style={inputStyle}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 12, color: 'rgba(249,245,239,0.7)', marginBottom: 6 }}>
                About Body
              </label>
              <textarea
                value={settings.aboutBody}
                onChange={(e) => updateSetting('aboutBody', e.target.value)}
                rows={3}
                style={{ ...inputStyle, resize: 'vertical' }}
              />
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div>
          <h2 style={{ fontSize: 16, fontWeight: 500, color: '#b8965a', marginBottom: 16, fontFamily: 'Georgia, serif', fontStyle: 'italic' }}>
            Statistics
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
            <div>
              <label style={{ display: 'block', fontSize: 12, color: 'rgba(249,245,239,0.7)', marginBottom: 6 }}>
                Followers
              </label>
              <input
                type="text"
                value={settings.stats.followers}
                onChange={(e) => updateStats('followers', e.target.value)}
                style={inputStyle}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 12, color: 'rgba(249,245,239,0.7)', marginBottom: 6 }}>
                Pieces Created
              </label>
              <input
                type="text"
                value={settings.stats.piecesCreated}
                onChange={(e) => updateStats('piecesCreated', e.target.value)}
                style={inputStyle}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 12, color: 'rgba(249,245,239,0.7)', marginBottom: 6 }}>
                Bespoke Rate
              </label>
              <input
                type="text"
                value={settings.stats.bespoke}
                onChange={(e) => updateStats('bespoke', e.target.value)}
                style={inputStyle}
              />
            </div>
          </div>
        </div>

        {/* Hero Slides */}
        <div>
          <h2 style={{ fontSize: 16, fontWeight: 500, color: '#b8965a', marginBottom: 16, fontFamily: 'Georgia, serif', fontStyle: 'italic' }}>
            Hero Slides
          </h2>
          <div style={{ display: 'grid', gap: 24 }}>
            {settings.heroSlides.map((slide, index) => (
              <div key={index} style={{ padding: 20, border: '1px solid rgba(184,150,90,0.1)', background: 'rgba(255,255,255,0.02)' }}>
                <h3 style={{ fontSize: 14, color: '#b8965a', marginBottom: 12, fontFamily: 'Georgia, serif', fontStyle: 'italic' }}>
                  Slide {index + 1}
                </h3>
                <div style={{ display: 'grid', gap: 12 }}>
                  <div>
                    <label style={{ display: 'block', fontSize: 11, color: 'rgba(249,245,239,0.6)', marginBottom: 4 }}>
                      Headline (comma-separated)
                    </label>
                    <input
                      type="text"
                      value={slide.headline.join(', ')}
                      onChange={(e) => updateHeroSlide(index, 'headline', e.target.value.split(', '))}
                      style={inputStyle}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: 11, color: 'rgba(249,245,239,0.6)', marginBottom: 4 }}>
                      Italic Index (0-based)
                    </label>
                    <input
                      type="number"
                      value={slide.italicIndex}
                      onChange={(e) => updateHeroSlide(index, 'italicIndex', parseInt(e.target.value) || 0)}
                      style={inputStyle}
                      min="0"
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: 11, color: 'rgba(249,245,239,0.6)', marginBottom: 4 }}>
                      Subtitle
                    </label>
                    <input
                      type="text"
                      value={slide.sub}
                      onChange={(e) => updateHeroSlide(index, 'sub', e.target.value)}
                      style={inputStyle}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: 11, color: 'rgba(249,245,239,0.6)', marginBottom: 4 }}>
                      Image URL
                    </label>
                    <input
                      type="url"
                      value={slide.imageUrl}
                      onChange={(e) => updateHeroSlide(index, 'imageUrl', e.target.value)}
                      style={inputStyle}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '10px 12px',
  background: 'rgba(13,11,9,0.8)',
  border: '1px solid rgba(184,150,90,0.2)',
  color: 'rgba(249,245,239,0.9)',
  fontSize: 13,
  fontFamily: 'system-ui, sans-serif',
  outline: 'none',
  transition: 'border-color 0.2s',
}