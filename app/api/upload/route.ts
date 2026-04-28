import { NextRequest, NextResponse } from 'next/server'
import sharp from 'sharp'
import { uploadToCloudinary } from '@/lib/cloudinary'
import { requireAdmin } from '@/lib/auth'

const MAX_IMAGE_SIZE = 20 * 1024 * 1024 // 20MB
const MAX_VIDEO_SIZE = 200 * 1024 * 1024 // 200MB

export async function POST(req: NextRequest) {
  try {
    const session = await requireAdmin()
    if (!session) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    const formData = await req.formData()
    const file = formData.get('file') as File | null

    if (!file) {
      return NextResponse.json(
        { success: false, error: 'No file provided' },
        { status: 400 }
      )
    }

    const isVideo = file.type.startsWith('video/')
    const isImage = file.type.startsWith('image/')

    if (!isVideo && !isImage) {
      return NextResponse.json(
        { success: false, error: 'Only image and video files are accepted' },
        { status: 400 }
      )
    }

    const maxSize = isVideo ? MAX_VIDEO_SIZE : MAX_IMAGE_SIZE
    if (file.size > maxSize) {
      return NextResponse.json(
        {
          success: false,
          error: `File too large. Max size: ${isVideo ? '200MB' : '20MB'}`,
        },
        { status: 400 }
      )
    }

    const arrayBuffer = await file.arrayBuffer()
    let buffer: Buffer = Buffer.from(arrayBuffer as ArrayBuffer)

    // Compress images with Sharp before uploading
    if (isImage) {
      buffer = await sharp(buffer)
        .rotate() // auto-rotate based on EXIF
        .resize(2000, 2400, {
          fit: 'inside',
          withoutEnlargement: true,
        })
        .webp({ quality: 85 })
        .toBuffer()
    }

    // Upload to Cloudinary
    const result = await uploadToCloudinary(buffer, {
      folder: 'stylique/pieces',
      resource_type: isVideo ? 'video' : 'image',
    })

    return NextResponse.json({
      success: true,
      data: {
        url: result.url,
        publicId: result.publicId,
        thumbnailUrl: result.thumbnailUrl,
        mediaType: isVideo ? 'video' : 'image',
      },
    })
  } catch (error: any) {
    console.error('[POST /api/upload]', error)
    return NextResponse.json(
      { success: false, error: error.message || 'Upload failed' },
      { status: 500 }
    )
  }
}