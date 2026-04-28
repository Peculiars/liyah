'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { buildWhatsAppUrl } from '@/lib/whatsApp'
import type { Piece } from '@/types'

interface BookingFormProps {
  piece?: Piece
  whatsappNumber?: string
}

export default function BookingForm({
  piece,
  whatsappNumber = '+2348060995158',
}: BookingFormProps) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validate = () => {
    const e: Record<string, string> = {}
    if (!name.trim()) e.name = 'Please enter your name'
    if (!message.trim()) e.message = 'Please describe what you have in mind'
    return e
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }
    setErrors({})

    const url = buildWhatsAppUrl({
      whatsappNumber,
      name,
      phone,
      message,
      piece,
    })
    window.open(url, '_blank')
  }

  const inputStyle = (hasError: boolean) => ({
    width: '100%',
    background: 'rgba(255,255,255,0.03)',
    border: `1px solid ${hasError ? 'rgba(220,80,80,0.6)' : 'rgba(184,150,90,0.15)'}`,
    color: 'var(--cream)',
    padding: '14px 18px',
    fontSize: 13,
    fontFamily: 'var(--font-dm-sans)',
    outline: 'none',
    transition: 'border-color 0.3s',
  })

  return (
    <form onSubmit={handleSubmit} style={{ width: '100%' }}>
      {/* If triggered from a piece card */}
      {piece && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            marginBottom: 28,
            padding: '14px 18px',
            background: 'rgba(184,150,90,0.06)',
            border: '1px solid rgba(184,150,90,0.2)',
          }}
        >
          <span
            style={{
              fontSize: 11,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'rgba(249,245,239,0.5)',
            }}
          >
            Inspired by:
          </span>
          <span
            style={{
              fontFamily: 'var(--font-cormorant)',
              fontSize: 15,
              fontStyle: 'italic',
              color: 'var(--gold)',
            }}
          >
            {piece.title}
          </span>
        </div>
      )}

      {/* Name + Phone row */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 16,
          marginBottom: 16,
        }}
        className="grid-cols-booking"
      >
        <div>
          <label
            style={{
              fontSize: 10,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'rgba(249,245,239,0.4)',
              display: 'block',
              marginBottom: 8,
            }}
          >
            Your Name *
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onFocus={(e) =>
              (e.target.style.borderColor = 'rgba(184,150,90,0.5)')
            }
            onBlur={(e) =>
              (e.target.style.borderColor = errors.name
                ? 'rgba(220,80,80,0.6)'
                : 'rgba(184,150,90,0.15)')
            }
            placeholder="Adaeze Okonkwo"
            style={inputStyle(!!errors.name)}
          />
          {errors.name && (
            <span
              style={{
                fontSize: 11,
                color: 'rgba(220,100,100,0.8)',
                display: 'block',
                marginTop: 4,
              }}
            >
              {errors.name}
            </span>
          )}
        </div>
        <div>
          <label
            style={{
              fontSize: 10,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'rgba(249,245,239,0.4)',
              display: 'block',
              marginBottom: 8,
            }}
          >
            Phone Number
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            onFocus={(e) =>
              (e.target.style.borderColor = 'rgba(184,150,90,0.5)')
            }
            onBlur={(e) =>
              (e.target.style.borderColor = 'rgba(184,150,90,0.15)')
            }
            placeholder="+234 801 234 5678"
            style={inputStyle(false)}
          />
        </div>
      </div>

      {/* Message */}
      <div style={{ marginBottom: 8 }}>
        <label
          style={{
            fontSize: 10,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'rgba(249,245,239,0.4)',
            display: 'block',
            marginBottom: 8,
          }}
        >
          Tell Liyah Your Vision *
        </label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onFocus={(e) =>
            (e.target.style.borderColor = 'rgba(184,150,90,0.5)')
          }
          onBlur={(e) =>
            (e.target.style.borderColor = errors.message
              ? 'rgba(220,80,80,0.6)'
              : 'rgba(184,150,90,0.15)')
          }
          placeholder="I need a custom piece for my engagement ceremony. I love fitted silhouettes, warm tones, and something that moves well when I dance..."
          rows={5}
          style={{ ...inputStyle(!!errors.message), resize: 'none' }}
        />
        {errors.message && (
          <span
            style={{
              fontSize: 11,
              color: 'rgba(220,100,100,0.8)',
              display: 'block',
              marginTop: 4,
            }}
          >
            {errors.message}
          </span>
        )}
      </div>

      {/* Submit */}
      <motion.button
        type="submit"
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        style={{
          width: '100%',
          background: 'var(--gold)',
          color: 'var(--dark)',
          padding: '18px',
          fontSize: 11,
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          border: 'none',
          fontFamily: 'var(--font-dm-sans)',
          fontWeight: 500,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 12,
          marginTop: 8,
          cursor: 'none',
          transition: 'background 0.3s',
        }}
      >
        <WhatsAppIcon />
        Send via WhatsApp
      </motion.button>

      <p
        style={{
          textAlign: 'center',
          fontSize: 11,
          color: 'rgba(249,245,239,0.2)',
          marginTop: 14,
          letterSpacing: '0.05em',
        }}
      >
        Your message opens in WhatsApp — Liyah replies personally.
      </p>
    </form>
  )
}

function WhatsAppIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="currentColor"
      style={{ flexShrink: 0 }}
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.555 4.122 1.528 5.854L.057 23.428a.5.5 0 00.617.612l5.71-1.505A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.956 0-3.784-.558-5.33-1.524l-.394-.248-4.081 1.076 1.044-3.987-.265-.408A9.944 9.944 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
    </svg>
  )
}