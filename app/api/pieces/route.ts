import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import Piece from '@/models/Piece'
import { requireAdmin } from '@/lib/auth'

// GET /api/pieces — public, returns all pieces (with optional filters)
export async function GET(req: NextRequest) {
  try {
    await connectDB()

    const { searchParams } = new URL(req.url)
    const gender = searchParams.get('gender')
    const category = searchParams.get('category')
    const featured = searchParams.get('featured')
    const limit = searchParams.get('limit')

    const query: Record<string, any> = {}
    if (gender && gender !== 'all') query.gender = gender
    if (category && category !== 'all') query.category = category
    if (featured === 'true') query.isFeatured = true

    let dbQuery = Piece.find(query).sort({ createdAt: -1 })
    if (limit) dbQuery = dbQuery.limit(parseInt(limit))

    const pieces = await dbQuery.lean()

    return NextResponse.json({ success: true, data: pieces })
  } catch (error: any) {
    console.error('[GET /api/pieces]', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch pieces' },
      { status: 500 }
    )
  }
}

// POST /api/pieces — admin only, create a new piece
export async function POST(req: NextRequest) {
  try {
    const session = await requireAdmin()
    if (!session) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    await connectDB()

    const body = await req.json()

    const {
      title,
      description,
      category,
      gender,
      mediaType,
      mediaUrl,
      cloudinaryPublicId,
      thumbnailUrl,
      tags,
      isFeatured,
    } = body

    if (!title || !description || !category || !gender || !mediaType || !mediaUrl || !cloudinaryPublicId || !thumbnailUrl) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Parse tags — accept either array or comma-separated string
    const parsedTags = Array.isArray(tags)
      ? tags.map((t: string) => t.trim().toLowerCase()).filter(Boolean)
      : typeof tags === 'string'
      ? tags.split(',').map((t: string) => t.trim().toLowerCase()).filter(Boolean)
      : []

    const piece = await Piece.create({
      title: title.trim(),
      description: description.trim(),
      category,
      gender,
      mediaType,
      mediaUrl,
      cloudinaryPublicId,
      thumbnailUrl,
      tags: parsedTags,
      isFeatured: isFeatured ?? false,
    })

    return NextResponse.json({ success: true, data: piece }, { status: 201 })
  } catch (error: any) {
    console.error('[POST /api/pieces]', error)
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to create piece' },
      { status: 500 }
    )
  }
}