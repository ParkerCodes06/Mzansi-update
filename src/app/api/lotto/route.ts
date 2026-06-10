import { NextResponse } from 'next/server'
import { getLottoResults } from '@/data/store'

export const dynamic = 'force-static'
export const revalidate = 3600

export async function GET() {
  const results = getLottoResults()
  return NextResponse.json(results)
}
