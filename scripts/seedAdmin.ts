/**
 * Run this ONCE to create your admin account:
 *   npx ts-node --project tsconfig.json scripts/seedAdmin.ts
 *
 * Or with tsx:
 *   npx tsx scripts/seedAdmin.ts
 *
 * Make sure MONGODB_URI is in your .env.local first.
 */

import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const MONGODB_URI = process.env.MONGODB_URI!

if (!MONGODB_URI) {
  console.error('❌  MONGODB_URI is not set in .env.local')
  process.exit(1)
}

// ─── CHANGE THESE BEFORE RUNNING ───────────────────────────────────────────
const ADMIN_USERNAME = 'liyah'         // login username
const ADMIN_NAME = 'Liyah'             // display name
const ADMIN_PASSWORD = 'StyliqueLiyah2025!'  // strong password — change this!
// ────────────────────────────────────────────────────────────────────────────

const AdminUserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, lowercase: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
})

async function seed() {
  await mongoose.connect(MONGODB_URI)
  console.log('✅  Connected to MongoDB')

  const AdminUser =
    mongoose.models.AdminUser || mongoose.model('AdminUser', AdminUserSchema)

  const existing = await AdminUser.findOne({ username: ADMIN_USERNAME })
  if (existing) {
    console.log(`⚠️   Admin user "${ADMIN_USERNAME}" already exists. Skipping.`)
    await mongoose.disconnect()
    return
  }

  const hashed = await bcrypt.hash(ADMIN_PASSWORD, 12)

  await AdminUser.create({
    username: ADMIN_USERNAME,
    name: ADMIN_NAME,
    password: hashed,
  })

  console.log(`✅  Admin user created!`)
  console.log(`    Username: ${ADMIN_USERNAME}`)
  console.log(`    Password: ${ADMIN_PASSWORD}`)
  console.log(`\n🔒  Keep these credentials safe and delete this log.`)

  await mongoose.disconnect()
}

seed().catch((err) => {
  console.error('❌  Seed failed:', err)
  process.exit(1)
})