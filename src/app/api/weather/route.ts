import { NextResponse } from 'next/server'
import { getWeatherForecasts } from '@/data/store'

export const dynamic = 'force-static'
export const revalidate = 3600

export async function GET() {
  const forecasts = getWeatherForecasts()
  return NextResponse.json(forecasts)
}
