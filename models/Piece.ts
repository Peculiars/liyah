import mongoose, { Schema, Document, Model } from 'mongoose'

export interface IPiece extends Document {
  title: string
  description: string
  category: 'bridal' | 'evening' | 'corporate' | 'everyday' | 'coord-sets' | 'custom'
  gender: 'women' | 'men' | 'unisex'
  mediaType: 'image' | 'video'
  mediaUrl: string
  cloudinaryPublicId: string
  thumbnailUrl: string
  tags: string[]
  isFeatured: boolean
  createdAt: Date
  updatedAt: Date
}

const PieceSchema = new Schema<IPiece>(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: [120, 'Title cannot exceed 120 characters'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
      maxlength: [1000, 'Description cannot exceed 1000 characters'],
    },
    category: {
      type: String,
      required: true,
      enum: ['bridal', 'evening', 'corporate', 'everyday', 'coord-sets', 'custom'],
    },
    gender: {
      type: String,
      required: true,
      enum: ['women', 'men', 'unisex'],
    },
    mediaType: {
      type: String,
      required: true,
      enum: ['image', 'video'],
    },
    mediaUrl: {
      type: String,
      required: true,
    },
    cloudinaryPublicId: {
      type: String,
      required: true,
    },
    thumbnailUrl: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
      default: [],
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
)

// Indexes for faster queries
PieceSchema.index({ category: 1 })
PieceSchema.index({ gender: 1 })
PieceSchema.index({ isFeatured: 1 })
PieceSchema.index({ createdAt: -1 })

const Piece: Model<IPiece> =
  mongoose.models.Piece || mongoose.model<IPiece>('Piece', PieceSchema)

export default Piece