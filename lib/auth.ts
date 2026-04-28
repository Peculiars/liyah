import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'

export async function getSession() {
  return await getServerSession(authOptions)
}

export async function requireAdmin() {
  const session = await getSession()
  if (!session || session.user?.role !== 'admin') {
    return null
  }
  return session
}