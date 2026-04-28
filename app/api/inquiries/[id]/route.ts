import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import Inquiry from '@/models/Inquiry'
import { requireAdmin } from '@/lib/auth'

// PATCH /api/inquiries/[id] — admin only, update status
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await requireAdmin()
    if (!session) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    await connectDB()

    const body = await req.json()
    const { status } = body

    if (!['new', 'seen', 'replied'].includes(status)) {
      return NextResponse.json(
        { success: false, error: 'Invalid status' },
        { status: 400 }
      )
    }

    const inquiry = await Inquiry.findByIdAndUpdate(
      params.id,
      { $set: { status } },
      { new: true }
    )

    if (!inquiry) {
      return NextResponse.json(
        { success: false, error: 'Inquiry not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true, data: inquiry })
  } catch (error: any) {
    console.error('[PATCH /api/inquiries/[id]]', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update inquiry' },
      { status: 500 }
    )
  }
}

// DELETE /api/inquiries/[id] — admin only
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await requireAdmin()
    if (!session) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    await connectDB()

    const inquiry = await Inquiry.findByIdAndDelete(params.id)
    if (!inquiry) {
      return NextResponse.json(
        { success: false, error: 'Inquiry not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true, message: 'Inquiry deleted' })
  } catch (error: any) {
    console.error('[DELETE /api/inquiries/[id]]', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete inquiry' },
      { status: 500 }
    )
  }
}