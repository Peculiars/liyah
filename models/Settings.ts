import mongoose, { Schema, Document, Model } from 'mongoose'

export interface ISiteSettings extends Document {
  whatsappNumber: string
  brandBio: string
  heroTitle: string
  heroSubtitle: string
  instagramUrl: string
  tiktokUrl: string
  // Hero slides - admin can edit each slide's text
  heroSlides: {
    headline: string[]
    italicIndex: number
    sub: string
    imageUrl: string
  }[]
  // About section stats
  stats: {
    followers: string
    piecesCreated: string
    bespoke: string
  }
  aboutTagline: string
  aboutBody: string
}

const SiteSettingsSchema = new Schema<ISiteSettings>(
  {
    whatsappNumber: {
      type: String,
      required: true,
      default: '+2348060995158',
    },
    brandBio: {
      type: String,
      default:
        'Liyahss Kouture is a Lagos-born couture studio where every commission begins with a conversation. We translate who you are into fabric, structure, and silhouette.',
    },
    heroTitle: {
      type: String,
      default: 'Where Fabric Becomes Feeling',
    },
    heroSubtitle: {
      type: String,
      default:
        'Bespoke creations crafted for the woman and man who refuse to be dressed — only adorned. Every thread tells your story.',
    },
    instagramUrl: {
      type: String,
      default: 'https://instagram.com/liyahss_kouture',
    },
    tiktokUrl: {
      type: String,
      default: 'https://tiktok.com/@liyahss_kouture',
    },
    heroSlides: {
      type: [
        {
          headline: [String],
          italicIndex: Number,
          sub: String,
          imageUrl: String,
        },
      ],
      default: [
        {
          headline: ['Where Fabric', 'Becomes', 'Feeling.'],
          italicIndex: 2,
          sub: 'Bespoke creations crafted for those who refuse to be dressed — only adorned.',
          imageUrl:
            'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1400&q=85',
        },
        {
          headline: ['Crafted for', 'Curves,', 'Culture & Class.'],
          italicIndex: 1,
          sub: 'Every commission begins with a conversation and ends with a masterpiece.',
          imageUrl:
            'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=1400&q=85',
        },
        {
          headline: ['Tailored', 'to Slay,', 'Made Not Bought.'],
          italicIndex: 0,
          sub: 'From Lagos with love — where African elegance meets contemporary couture.',
          imageUrl:
            'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=1400&q=85',
        },
      ],
    },
    stats: {
      type: {
        followers: String,
        piecesCreated: String,
        bespoke: String,
      },
      default: {
        followers: '12K+',
        piecesCreated: '381',
        bespoke: '100%',
      },
    },
    aboutTagline: {
      type: String,
      default: 'Crafted for those who refuse to blend in',
    },
    aboutBody: {
      type: String,
      default:
        'From bridal to boardroom, every piece is constructed with obsessive attention to fit, drape, and the quiet luxury that whispers rather than shouts.',
    },
  },
  { timestamps: true }
)

const SiteSettings: Model<ISiteSettings> =
  mongoose.models.SiteSettings ||
  mongoose.model<ISiteSettings>('SiteSettings', SiteSettingsSchema)

export default SiteSettings