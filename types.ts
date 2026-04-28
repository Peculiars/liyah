export type Gender = 'women' | 'men' | 'unisex'

export type Category =
  | 'bridal'
  | 'evening'
  | 'corporate'
  | 'everyday'
  | 'coord-sets'
  | 'custom'

export type MediaType = 'image' | 'video'

export interface Piece {
  _id: string
  title: string
  description: string
  category: Category
  gender: Gender
  mediaType: MediaType
  mediaUrl: string
  thumbnailUrl: string
  tags: string[]
  isFeatured: boolean
  createdAt: string
}

export interface HeroSlide {
  headline: string[]
  italicIndex: number
  sub: string
  imageUrl: string
}

export interface SiteSettings {
  whatsappNumber: string
  brandBio: string
  heroTitle: string
  heroSubtitle: string
  instagramUrl: string
  tiktokUrl: string
  heroSlides: HeroSlide[]
  stats: {
    followers: string
    piecesCreated: string
    bespoke: string
  }
  aboutTagline: string
  aboutBody: string
}

export interface BookingInquiry {
  _id?: string
  name: string
  phone: string
  message: string
  pieceId?: string
  pieceTitle?: string
  createdAt?: string
}