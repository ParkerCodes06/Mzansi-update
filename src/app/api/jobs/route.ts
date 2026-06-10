import { NextResponse } from 'next/server'
import { getJobs } from '@/data/store'

export const dynamic = 'force-static'
export const revalidate = 3600

export async function GET() {
  const jobs = getJobs()
  return NextResponse.json(jobs)
}
