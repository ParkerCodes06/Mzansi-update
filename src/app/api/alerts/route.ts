import { NextRequest, NextResponse } from 'next/server'
import { getAlertsByWard } from '@/data/store'

export async function GET(request: NextRequest) {
  const wardIds = request.nextUrl.searchParams.get('wards')?.split(',').filter(Boolean) || []
  const alerts = getAlertsByWard(wardIds)
  return NextResponse.json(alerts)
}
