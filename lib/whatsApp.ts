import type { BookingInquiry } from '@/types'

export function buildWhatsAppUrl(
  whatsappNumber: string,
  inquiry: BookingInquiry
): string {
  const { name, phone, message, pieceTitle } = inquiry

  let text: string

  if (pieceTitle) {
    text = `Hi Liyahss Kouture! I'm ${name}${phone ? ` (${phone})` : ''}. I'd love something like your *${pieceTitle}* piece. Here's what I have in mind:\n\n${message}\n\n— Sent via Liyahss Kouture website`
  } else {
    text = `Hi Liyahss Kouture! I'm ${name}${phone ? ` (${phone})` : ''}. I'd like to book a custom piece. Here's what I have in mind:\n\n${message}\n\n— Sent via Liyahss Kouture website`
  }

  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`
}