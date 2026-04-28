interface WhatsAppMessageParams {
  name: string
  phone: string
  message: string
  piece?: {
    title: string
    category: string
    gender: string
  } | null
  whatsappNumber: string
}

export function buildWhatsAppUrl({
  name,
  phone,
  message,
  piece,
  whatsappNumber,
}: WhatsAppMessageParams): string {
  // Clean the number — remove spaces, dashes, brackets
  const cleanNumber = whatsappNumber.replace(/[\s\-\(\)]/g, '')

  let text: string

  if (piece) {
    text = `Hi Liyah! I'm ${name} (${phone}).

I'd love something like your *${piece.title}* piece (${piece.gender}, ${piece.category}).

Here's what I have in mind:
${message}

Looking forward to hearing from you! 🖤`
  } else {
    text = `Hi Liyah! I'm ${name} (${phone}).

I'd like to commission a custom piece. Here's what I have in mind:
${message}

Looking forward to hearing from you! 🖤`
  }

  const encoded = encodeURIComponent(text)
  return `https://wa.me/${cleanNumber}?text=${encoded}`
}