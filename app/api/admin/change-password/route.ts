import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { connectDB } from '@/lib/mongodb'
import AdminUser from '@/models/AdminUser'
import { requireAdmin } from '@/lib/auth'

export async function POST(req: NextRequest) {
  try {
    const session = await requireAdmin()
    if (!session) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    const { currentPassword, newPassword } = await req.json()

    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        { success: false, error: 'Current password and new password are required' },
        { status: 400 }
      )
    }

    if (newPassword.length < 8) {
      return NextResponse.json(
        { success: false, error: 'New password must be at least 8 characters long' },
        { status: 400 }
      )
    }

    await connectDB()

    // Get the current admin user
    const user = await AdminUser.findOne({ username: (session.user as any).username })
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      )
    }

    // Verify current password
    const isValid = await bcrypt.compare(currentPassword, user.password)
    if (!isValid) {
      return NextResponse.json(
        { success: false, error: 'Current password is incorrect' },
        { status: 400 }
      )
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 12)

    // Update password
    await AdminUser.updateOne(
      { _id: user._id },
      { password: hashedPassword }
    )

    return NextResponse.json({
      success: true,
      message: 'Password changed successfully'
    })

  } catch (error: any) {
    console.error('[POST /api/admin/change-password]', error)
    return NextResponse.json(
      { success: false, error: 'Failed to change password' },
      { status: 500 }
    )
  }
}