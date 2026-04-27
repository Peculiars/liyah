import Link from 'next/link'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer
      style={{
        padding: '80px 48px 48px',
        borderTop: '1px solid rgba(184,150,90,0.1)',
        background: 'var(--dark)',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          paddingBottom: 60,
          borderBottom: '1px solid rgba(184,150,90,0.08)',
          flexWrap: 'wrap',
          gap: 48,
        }}
      >
        {/* Brand */}
        <div style={{ maxWidth: 320 }}>
          <div
            style={{
              fontFamily: 'var(--font-cormorant)',
              fontSize: 26,
              fontWeight: 300,
              letterSpacing: '0.1em',
              marginBottom: 16,
              color: 'var(--cream)',
            }}
          >
            Stylique <span style={{ color: 'var(--gold)' }}>by Liyah</span>
          </div>
          <p
            style={{
              fontFamily: 'var(--font-cormorant)',
              fontSize: 14,
              fontStyle: 'italic',
              color: 'rgba(249,245,239,0.35)',
              lineHeight: 1.8,
            }}
          >
            "Couture Reimagined — a symphony of curves, culture & class. Where
            fabric becomes feeling, and every thread tells a story."
          </p>
        </div>

        {/* Links */}
        <div style={{ display: 'flex', gap: 64, flexWrap: 'wrap' }}>
          <div>
            <div
              style={{
                fontSize: 10,
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: 'var(--gold)',
                marginBottom: 20,
                opacity: 0.8,
              }}
            >
              Navigate
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                { href: '/', label: 'Home' },
                { href: '/portfolio', label: 'Portfolio' },
                { href: '/about', label: 'About Liyah' },
                { href: '/book', label: 'Book a Piece' },
              ].map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    style={{
                      fontSize: 13,
                      color: 'rgba(249,245,239,0.45)',
                      textDecoration: 'none',
                      letterSpacing: '0.03em',
                      transition: 'color 0.3s',
                    }}
                    onMouseEnter={(e) =>
                      ((e.target as HTMLElement).style.color = 'var(--cream)')
                    }
                    onMouseLeave={(e) =>
                      ((e.target as HTMLElement).style.color =
                        'rgba(249,245,239,0.45)')
                    }
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div
              style={{
                fontSize: 10,
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: 'var(--gold)',
                marginBottom: 20,
                opacity: 0.8,
              }}
            >
              Collections
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                'Bridal',
                "Evening & Occasions",
                'Corporate',
                "Men's Couture",
                'Coord Sets',
              ].map((c) => (
                <li key={c}>
                  <Link
                    href={`/portfolio?category=${c.toLowerCase()}`}
                    style={{
                      fontSize: 13,
                      color: 'rgba(249,245,239,0.45)',
                      textDecoration: 'none',
                      transition: 'color 0.3s',
                    }}
                    onMouseEnter={(e) =>
                      ((e.target as HTMLElement).style.color = 'var(--cream)')
                    }
                    onMouseLeave={(e) =>
                      ((e.target as HTMLElement).style.color =
                        'rgba(249,245,239,0.45)')
                    }
                  >
                    {c}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div
        style={{
          paddingTop: 32,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 16,
        }}
      >
        <span
          style={{
            fontSize: 11,
            color: 'rgba(249,245,239,0.2)',
            letterSpacing: '0.05em',
          }}
        >
          © {year} Stylique by Liyah. All rights reserved. Lagos, Nigeria.
        </span>
        <div style={{ display: 'flex', gap: 24 }}>
          {[
            { href: 'https://instagram.com/liyahss_kouture', label: 'Instagram' },
            { href: 'https://tiktok.com/@liyahss_kouture', label: 'TikTok' },
            { href: 'https://wa.me/2348000000000', label: 'WhatsApp' },
          ].map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: 10,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'rgba(249,245,239,0.3)',
                textDecoration: 'none',
                transition: 'color 0.3s',
              }}
              onMouseEnter={(e) =>
                ((e.target as HTMLElement).style.color = 'var(--gold)')
              }
              onMouseLeave={(e) =>
                ((e.target as HTMLElement).style.color =
                  'rgba(249,245,239,0.3)')
              }
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}