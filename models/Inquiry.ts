import mongoose, { Schema, Document, Model } from 'mongoose'

export interface IInquiry extends Document {
  name: string
  phone: string
  message: string
  pieceId?: string
  pieceTitle?: string
  status: 'new' | 'seen' | 'replied'
  createdAt: Date
}

const InquirySchema = new Schema<IInquiry>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
    pieceId: {
      type: String,
      default: null,
    },
    pieceTitle: {
      type: String,
      default: null,
    },
    status: {
      type: String,
      enum: ['new', 'seen', 'replied'],
      default: 'new',
    },
  },
  { timestamps: true }
)

InquirySchema.index({ createdAt: -1 })
InquirySchema.index({ status: 1 })

const Inquiry: Model<IInquiry> =
  mongoose.models.Inquiry || mongoose.model<IInquiry>('Inquiry', InquirySchema)

export default Inquiry