'use client'

import { useSession, signOut } from 'next-auth/react'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import { useEffect } from 'react'

const navItems = [
  {
    href: '/admin',
    label: 'Dashboard',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
  },
  {
    href: '/admin/pieces',
    label: 'Pieces',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18M9 21V9" />
      </svg>
    ),
  },
  {
    href: '/admin/inquiries',
    label: 'Inquiries',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  {
    href: '/admin/settings',
    label: 'Settings',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </svg>
    ),
  },
  {
    href: '/admin/change-password',
    label: 'Change Password',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
  },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession()
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    if (status === 'unauthenticated' && pathname !== '/admin/login') {
      router.push('/admin/login')
    }
  }, [status, pathname, router])

  // Don't render layout on login page
  if (pathname === '/admin/login') return <>{children}</>

  if (status === 'loading') {
    return (
      <div style={{
        minHeight: '100vh',
        background: '#0D0B09',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <div style={{ color: 'rgba(249,245,239,0.4)', fontSize: 13, letterSpacing: '0.2em' }}>
          Loading...
        </div>
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#0F0D0B' }}>

      {/* ── Sidebar ── */}
      <aside style={{
        width: 240,
        background: '#0D0B09',
        borderRight: '1px solid rgba(184,150,90,0.1)',
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        top: 0,
        left: 0,
        height: '100vh',
        zIndex: 100,
        flexShrink: 0,
      }}>
        {/* Brand */}
        <div style={{
          padding: '28px 24px 24px',
          borderBottom: '1px solid rgba(184,150,90,0.08)',
        }}>
          <div style={{
            fontSize: 9,
            letterSpacing: '0.35em',
            textTransform: 'uppercase',
            color: 'rgba(184,150,90,0.5)',
            marginBottom: 6,
          }}>
            Admin Panel
          </div>
          <div style={{
            fontFamily: 'Georgia, serif',
            fontSize: 18,
            fontStyle: 'italic',
            color: '#B8965A',
            letterSpacing: '0.02em',
          }}>
            Stylique by Liyah
          </div>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: '16px 0' }}>
          {navItems.map((item) => {
            const active = pathname === item.href || pathname.startsWith(item.href + '/')
            return (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '11px 24px',
                  fontSize: 12,
                  letterSpacing: '0.08em',
                  color: active ? '#B8965A' : 'rgba(249,245,239,0.45)',
                  textDecoration: 'none',
                  background: active ? 'rgba(184,150,90,0.07)' : 'transparent',
                  borderLeft: active ? '2px solid #B8965A' : '2px solid transparent',
                  transition: 'all 0.2s',
                  fontFamily: 'system-ui, sans-serif',
                }}
              >
                <span style={{ opacity: active ? 1 : 0.6 }}>{item.icon}</span>
                {item.label}
              </Link>
            )
          })}
        </nav>

        {/* User + logout */}
        <div style={{
          padding: '16px 24px',
          borderTop: '1px solid rgba(184,150,90,0.08)',
        }}>
          <div style={{
            fontSize: 11,
            color: 'rgba(249,245,239,0.3)',
            marginBottom: 4,
            letterSpacing: '0.05em',
          }}>
            Signed in as
          </div>
          <div style={{
            fontSize: 13,
            color: 'rgba(249,245,239,0.7)',
            marginBottom: 14,
            fontFamily: 'Georgia, serif',
            fontStyle: 'italic',
          }}>
            {(session?.user as any)?.name || 'Admin'}
          </div>
          <button
            onClick={() => signOut({ callbackUrl: '/admin/login' })}
            style={{
              width: '100%',
              padding: '8px 0',
              background: 'transparent',
              border: '1px solid rgba(184,150,90,0.15)',
              color: 'rgba(249,245,239,0.4)',
              fontSize: 10,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              transition: 'all 0.2s',
              fontFamily: 'system-ui, sans-serif',
            }}
            onMouseEnter={e => {
              ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(184,150,90,0.4)'
              ;(e.currentTarget as HTMLElement).style.color = '#B8965A'
            }}
            onMouseLeave={e => {
              ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(184,150,90,0.15)'
              ;(e.currentTarget as HTMLElement).style.color = 'rgba(249,245,239,0.4)'
            }}
          >
            Sign Out
          </button>
        </div>
      </aside>

      {/* ── Main content ── */}
      <main style={{ marginLeft: 240, flex: 1, minHeight: '100vh' }}>
        {children}
      </main>
    </div>
  )
}