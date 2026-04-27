import type { Piece, SiteSettings } from '@/types'

export const mockPieces: Piece[] = [
  {
    _id: '1',
    title: 'Scarlet Mermaid Gown',
    description:
      'A jaw-dropping crimson mermaid silhouette with a dramatic train. Crafted from Italian duchess satin with hand-sewn crystal detailing along the bodice. Perfect for red carpet, galas, and high-profile events.',
    category: 'evening',
    gender: 'women',
    mediaType: 'image',
    mediaUrl:
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=80',
    thumbnailUrl:
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&q=80',
    tags: ['red', 'mermaid', 'gown', 'evening', 'crystal', 'satin', 'gala'],
    isFeatured: true,
    createdAt: '2025-01-15T10:00:00Z',
  },
  {
    _id: '2',
    title: 'Lagos Bridal Dreams',
    description:
      'A breathtaking ivory and gold bridal gown blending Yoruba cultural heritage with contemporary couture. Features hand-embroidered aso-oke panels and a cathedral-length train.',
    category: 'bridal',
    gender: 'women',
    mediaType: 'image',
    mediaUrl:
      'https://images.unsplash.com/photo-1594552072238-b8a33785b6cd?w=800&q=80',
    thumbnailUrl:
      'https://images.unsplash.com/photo-1594552072238-b8a33785b6cd?w=400&q=80',
    tags: ['bridal', 'ivory', 'gold', 'wedding', 'aso-oke', 'cathedral train'],
    isFeatured: true,
    createdAt: '2025-02-01T10:00:00Z',
  },
  {
    _id: '3',
    title: 'Executive Agbada Set',
    description:
      'A masterfully tailored three-piece agbada in rich navy blue with gold embroidery. Cut for the modern African man of power — commanding in every room.',
    category: 'corporate',
    gender: 'men',
    mediaType: 'image',
    mediaUrl:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80',
    thumbnailUrl:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
    tags: ['agbada', 'navy', 'gold', 'men', 'traditional', 'corporate', 'embroidery'],
    isFeatured: false,
    createdAt: '2025-02-10T10:00:00Z',
  },
  {
    _id: '4',
    title: 'Dusty Rose Coord Set',
    description:
      'A stunning two-piece coord in dusty rose ankara print. Cropped structured blazer paired with wide-leg trousers — effortlessly elegant for afternoon occasions.',
    category: 'coord-sets',
    gender: 'women',
    mediaType: 'image',
    mediaUrl:
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    thumbnailUrl:
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80',
    tags: ['coord set', 'ankara', 'dusty rose', 'blazer', 'trousers', 'two-piece'],
    isFeatured: false,
    createdAt: '2025-02-20T10:00:00Z',
  },
  {
    _id: '5',
    title: 'Midnight Kaftan Luxe',
    description:
      'Floor-length midnight blue kaftan in hand-woven aso-oke with intricate silver woven patterns. A regal statement for celebrations, weddings, and cultural events.',
    category: 'evening',
    gender: 'men',
    mediaType: 'image',
    mediaUrl:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&q=80',
    thumbnailUrl:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80',
    tags: ['kaftan', 'midnight blue', 'silver', 'aso-oke', 'men', 'celebration'],
    isFeatured: true,
    createdAt: '2025-03-01T10:00:00Z',
  },
  {
    _id: '6',
    title: 'Golden Hour Bridal',
    description:
      'Sun-kissed gold bridal gown with a fitted bodice, voluminous tulle skirt, and delicate champagne lace overlay. Made for the bride who glows.',
    category: 'bridal',
    gender: 'women',
    mediaType: 'image',
    mediaUrl:
      'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80',
    thumbnailUrl:
      'https://images.unsplash.com/photo-1519741497674-611481863552?w=400&q=80',
    tags: ['bridal', 'gold', 'champagne', 'tulle', 'lace', 'fitted', 'glam'],
    isFeatured: true,
    createdAt: '2025-03-10T10:00:00Z',
  },
  {
    _id: '7',
    title: 'Corporate Power Suit',
    description:
      'A bold monochrome structured suit with strong shoulders and a cinched waist. Crafted in premium worsted wool — for the woman who owns every room.',
    category: 'corporate',
    gender: 'women',
    mediaType: 'image',
    mediaUrl:
      'https://images.unsplash.com/photo-1594938298603-c8148c4b8832?w=800&q=80',
    thumbnailUrl:
      'https://images.unsplash.com/photo-1594938298603-c8148c4b8832?w=400&q=80',
    tags: ['suit', 'power dressing', 'monochrome', 'wool', 'corporate', 'structured'],
    isFeatured: false,
    createdAt: '2025-03-15T10:00:00Z',
  },
  {
    _id: '8',
    title: 'Emerald Plunge Gown',
    description:
      'Deep emerald green gown with a daring plunge neckline, ruched waist, and side slit. Draped in stretch crepe for a figure-sculpting fit that moves like water.',
    category: 'evening',
    gender: 'women',
    mediaType: 'video',
    mediaUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    thumbnailUrl:
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400&q=80',
    tags: ['emerald', 'plunge', 'gown', 'ruched', 'evening', 'crepe', 'slit'],
    isFeatured: false,
    createdAt: '2025-03-20T10:00:00Z',
  },
  {
    _id: '9',
    title: 'Ankara Street Luxe',
    description:
      'Vibrant ankara fabric reimagined in a sleek contemporary silhouette. Mini skirt and structured crop top — bringing traditional print into modern street luxury.',
    category: 'everyday',
    gender: 'women',
    mediaType: 'image',
    mediaUrl:
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80',
    thumbnailUrl:
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400&q=80',
    tags: ['ankara', 'street', 'mini', 'crop top', 'vibrant', 'casual', 'two-piece'],
    isFeatured: false,
    createdAt: '2025-03-25T10:00:00Z',
  },
]

export const mockSettings: SiteSettings = {
  whatsappNumber: '+2348060995158',
  brandBio:
    'Liyahss Kouture is a Lagos-born couture studio where every commission begins with a conversation. We translate who you are into fabric, structure, and silhouette.',
  heroTitle: 'Where Fabric Becomes Feeling',
  heroSubtitle:
    'Bespoke creations crafted for the woman and man who refuse to be dressed — only adorned. Every thread tells your story.',
  instagramUrl: 'https://instagram.com/liyahss_kouture',
  tiktokUrl: 'https://tiktok.com/@liyahss_kouture',
}