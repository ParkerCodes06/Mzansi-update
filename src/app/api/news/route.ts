import { NextResponse } from 'next/server'
import { getNewsArticles } from '@/data/store'

export const dynamic = 'force-static'
export const revalidate = 600

export async function GET() {
  const articles = getNewsArticles()
  return NextResponse.json(articles)
}
