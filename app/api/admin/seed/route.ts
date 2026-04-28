import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { connectDB } from '@/lib/mongodb'
import AdminUser from '@/models/AdminUser'

export async function POST(request: NextRequest) {
  try {
    await connectDB()

    // Check if admin user already exists
    const existing = await AdminUser.findOne({ username: 'liyah' })
    if (existing) {
      return NextResponse.json({
        message: 'Admin user already exists',
        username: 'liyah',
        password: 'StyliqueLiyah2025!'
      })
    }

    // Create admin user
    const hashedPassword = await bcrypt.hash('StyliqueLiyah2025!', 12)

    await AdminUser.create({
      username: 'liyah',
      name: 'Liyah',
      password: hashedPassword,
    })

    return NextResponse.json({
      message: 'Admin user created successfully',
      username: 'liyah',
      password: 'StyliqueLiyah2025!'
    })

  } catch (error) {
    console.error('Seed error:', error)
    return NextResponse.json(
      { error: 'Failed to create admin user' },
      { status: 500 }
    )
  }
}