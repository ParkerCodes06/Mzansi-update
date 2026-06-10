import { NextResponse } from 'next/server'
import { getWaterUpdates } from '@/data/store'

export const dynamic = 'force-static'
export const revalidate = 1800

export async function GET() {
  const updates = getWaterUpdates()
  return NextResponse.json(updates)
}
