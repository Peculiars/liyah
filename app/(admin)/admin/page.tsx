'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

interface Stats {
  totalPieces: number
  featuredPieces: number
  newInquiries: number
  totalInquiries: number
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [recentInquiries, setRecentInquiries] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const [piecesRes, inquiriesRes] = await Promise.all([
          fetch('/api/pieces'),
          fetch('/api/inquiries?limit=5'),
        ])
        const piecesData = await piecesRes.json()
        const inquiriesData = await inquiriesRes.json()

        const pieces = piecesData.data || []
        const inquiries = inquiriesData.data || []

        setStats({
          totalPieces: pieces.length,
          featuredPieces: pieces.filter((p: any) => p.isFeatured).length,
          newInquiries: inquiries.filter((i: any) => i.status === 'new').length,
          totalInquiries: inquiriesData.pagination?.total || inquiries.length,
        })
        setRecentInquiries(inquiries.slice(0, 5))
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  return (
    <div style={{ padding: '48px 40px', color: 'rgba(249,245,239,0.85)' }}>
      {/* Header */}
      <div style={{ marginBottom: 48 }}>
        <div style={{ fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(184,150,90,0.6)', marginBottom: 8 }}>
          Overview
        </div>
        <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 32, fontWeight: 400, fontStyle: 'italic', color: '#b8965a', margin: 0 }}>
          Dashboard
        </h1>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 48 }}>
        {[
          { label: 'Total Pieces', value: stats?.totalPieces ?? '—', href: '/admin/pieces' },
          { label: 'Featured', value: stats?.featuredPieces ?? '—', href: '/admin/pieces' },
          { label: 'New Inquiries', value: stats?.newInquiries ?? '—', href: '/admin/inquiries', highlight: (stats?.newInquiries ?? 0) > 0 },
          { label: 'Total Inquiries', value: stats?.totalInquiries ?? '—', href: '/admin/inquiries' },
        ].map((s) => (
          <Link
            key={s.label}
            href={s.href}
            style={{
              display: 'block',
              padding: '24px',
              background: 'rgba(255,255,255,0.02)',
              border: `1px solid ${s.highlight ? 'rgba(184,150,90,0.3)' : 'rgba(184,150,90,0.1)'}`,
              textDecoration: 'none',
              transition: 'border-color 0.2s',
            }}
          >
            <div style={{ fontSize: 32, fontFamily: 'Georgia, serif', color: s.highlight ? '#b8965a' : 'rgba(249,245,239,0.9)', marginBottom: 8 }}>
              {loading ? '...' : s.value}
            </div>
            <div style={{ fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(249,245,239,0.35)' }}>
              {s.label}
            </div>
          </Link>
        ))}
      </div>

      {/* Quick actions */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        {/* Quick links */}
        <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(184,150,90,0.1)', padding: 28 }}>
          <h2 style={{ fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(249,245,239,0.4)', margin: '0 0 20px' }}>
            Quick Actions
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <Link href="/admin/pieces/new" style={actionLinkStyle}>
              <span>＋</span> Upload New Piece
            </Link>
            <Link href="/admin/inquiries" style={actionLinkStyle}>
              <span>✉</span> View Inquiries
            </Link>
            <Link href="/admin/settings" style={actionLinkStyle}>
              <span>⚙</span> Edit Site Settings
            </Link>
            <Link href="/" target="_blank" style={actionLinkStyle}>
              <span>↗</span> Preview Live Site
            </Link>
          </div>
        </div>

        {/* Recent inquiries */}
        <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(184,150,90,0.1)', padding: 28 }}>
          <h2 style={{ fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(249,245,239,0.4)', margin: '0 0 20px' }}>
            Recent Inquiries
          </h2>
          {loading ? (
            <p style={{ fontSize: 13, color: 'rgba(249,245,239,0.3)' }}>Loading...</p>
          ) : recentInquiries.length === 0 ? (
            <p style={{ fontSize: 13, color: 'rgba(249,245,239,0.3)' }}>No inquiries yet</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {recentInquiries.map((inq) => (
                <div
                  key={inq._id}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingBottom: 12,
                    borderBottom: '1px solid rgba(184,150,90,0.07)',
                  }}
                >
                  <div>
                    <div style={{ fontSize: 13, color: 'rgba(249,245,239,0.8)', marginBottom: 2 }}>{inq.name}</div>
                    <div style={{ fontSize: 11, color: 'rgba(249,245,239,0.3)' }}>{inq.phone}</div>
                  </div>
                  <span
                    style={{
                      fontSize: 9,
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                      padding: '3px 8px',
                      background: inq.status === 'new' ? 'rgba(184,150,90,0.12)' : 'transparent',
                      border: `1px solid ${inq.status === 'new' ? 'rgba(184,150,90,0.3)' : 'rgba(255,255,255,0.08)'}`,
                      color: inq.status === 'new' ? '#b8965a' : 'rgba(249,245,239,0.3)',
                    }}
                  >
                    {inq.status}
                  </span>
                </div>
              ))}
              <Link href="/admin/inquiries" style={{ fontSize: 11, color: '#b8965a', textDecoration: 'none', letterSpacing: '0.1em' }}>
                View all →
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

const actionLinkStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 10,
  padding: '10px 14px',
  fontSize: 13,
  color: 'rgba(249,245,239,0.6)',
  textDecoration: 'none',
  border: '1px solid rgba(184,150,90,0.08)',
  transition: 'all 0.2s',
  background: 'transparent',
}
