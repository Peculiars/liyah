import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import SiteSettings from '@/models/Settings'
import { requireAdmin } from '@/lib/auth'

// GET /api/settings — public (frontend needs WhatsApp number, bio, hero text)
export async function GET() {
  try {
    await connectDB()

    let settings = await SiteSettings.findOne().lean()

    // If no settings document exists yet, create one with defaults
    if (!settings) {
      const created = await SiteSettings.create({})
      settings = created.toObject()
    }

    return NextResponse.json({ success: true, data: settings })
  } catch (error: any) {
    console.error('[GET /api/settings]', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch settings' },
      { status: 500 }
    )
  }
}

// PATCH /api/settings — admin only
export async function PATCH(req: NextRequest) {
  try {
    const session = await requireAdmin()
    if (!session) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    await connectDB()

    const body = await req.json()

    // Upsert — create if doesn't exist, update if does
    const settings = await SiteSettings.findOneAndUpdate(
      {},
      { $set: body },
      { new: true, upsert: true, runValidators: true }
    )

    return NextResponse.json({ success: true, data: settings })
  } catch (error: any) {
    console.error('[PATCH /api/settings]', error)
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to update settings' },
      { status: 500 }
    )
  }
}