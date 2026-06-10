import { NextResponse } from 'next/server'
import { getSassaSchedules } from '@/data/store'

export const dynamic = 'force-static'
export const revalidate = 86400

export async function GET() {
  const schedules = getSassaSchedules()
  return NextResponse.json(schedules)
}
