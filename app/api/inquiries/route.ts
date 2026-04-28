import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import Inquiry from '@/models/Inquiry'
import { requireAdmin } from '@/lib/auth'

// GET /api/inquiries — admin only
export async function GET(req: NextRequest) {
  try {
    const session = await requireAdmin()
    if (!session) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    await connectDB()

    const { searchParams } = new URL(req.url)
    const status = searchParams.get('status')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')

    const query: Record<string, any> = {}
    if (status && status !== 'all') query.status = status

    const total = await Inquiry.countDocuments(query)
    const inquiries = await Inquiry.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean()

    return NextResponse.json({
      success: true,
      data: inquiries,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error: any) {
    console.error('[GET /api/inquiries]', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch inquiries' },
      { status: 500 }
    )
  }
}

// POST /api/inquiries — public (called when client submits booking form)
export async function POST(req: NextRequest) {
  try {
    await connectDB()

    const body = await req.json()
    const { name, phone, message, pieceId, pieceTitle } = body

    if (!name?.trim() || !phone?.trim() || !message?.trim()) {
      return NextResponse.json(
        { success: false, error: 'Name, phone, and message are required' },
        { status: 400 }
      )
    }

    const inquiry = await Inquiry.create({
      name: name.trim(),
      phone: phone.trim(),
      message: message.trim(),
      pieceId: pieceId || null,
      pieceTitle: pieceTitle || null,
      status: 'new',
    })

    return NextResponse.json({ success: true, data: inquiry }, { status: 201 })
  } catch (error: any) {
    console.error('[POST /api/inquiries]', error)
    return NextResponse.json(
      { success: false, error: 'Failed to save inquiry' },
      { status: 500 }
    )
  }
}