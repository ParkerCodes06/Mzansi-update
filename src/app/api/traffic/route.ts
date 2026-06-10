import { NextResponse } from 'next/server'
import { getTrafficUpdates } from '@/data/store'

export const dynamic = 'force-static'
export const revalidate = 1800

export async function GET() {
  const updates = getTrafficUpdates()
  return NextResponse.json(updates)
}
