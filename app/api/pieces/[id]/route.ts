import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import Piece from '@/models/Piece'
import { deleteFromCloudinary } from '@/lib/cloudinary'
import { requireAdmin } from '@/lib/auth'

// GET /api/pieces/[id] — public
export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params

  try {
    await connectDB()
    const piece = await Piece.findById(id).lean()

    if (!piece) {
      return NextResponse.json(
        { success: false, error: 'Piece not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true, data: piece })
  } catch (error: any) {
    console.error('[GET /api/pieces/[id]]', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch piece' },
      { status: 500 }
    )
  }
}

// PATCH /api/pieces/[id] — admin only
export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params

  try {
    const session = await requireAdmin()
    if (!session) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    await connectDB()

    const body = await req.json()

    // Parse tags if provided
    if (body.tags !== undefined) {
      body.tags = Array.isArray(body.tags)
        ? body.tags.map((t: string) => t.trim().toLowerCase()).filter(Boolean)
        : typeof body.tags === 'string'
        ? body.tags.split(',').map((t: string) => t.trim().toLowerCase()).filter(Boolean)
        : []
    }

    // Trim string fields
    if (body.title) body.title = body.title.trim()
    if (body.description) body.description = body.description.trim()

    const piece = await Piece.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true, runValidators: true }
    )

    if (!piece) {
      return NextResponse.json(
        { success: false, error: 'Piece not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true, data: piece })
  } catch (error: any) {
    console.error('[PATCH /api/pieces/[id]]', error)
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to update piece' },
      { status: 500 }
    )
  }
}

// DELETE /api/pieces/[id] — admin only
export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params

  try {
    const session = await requireAdmin()
    if (!session) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    await connectDB()

    const piece = await Piece.findById(id)
    if (!piece) {
      return NextResponse.json(
        { success: false, error: 'Piece not found' },
        { status: 404 }
      )
    }

    // Delete from Cloudinary first
    if (piece.cloudinaryPublicId) {
      await deleteFromCloudinary(
        piece.cloudinaryPublicId,
        piece.mediaType as 'image' | 'video'
      ).catch((err) => console.warn('Cloudinary delete failed:', err))
    }

    await Piece.findByIdAndDelete(id)

    return NextResponse.json({ success: true, message: 'Piece deleted' })
  } catch (error: any) {
    console.error('[DELETE /api/pieces/[id]]', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete piece' },
      { status: 500 }
    )
  }
}