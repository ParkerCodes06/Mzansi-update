import { TrafficUpdate } from '@/types'
import { setTrafficUpdates } from '@/data/store'
import * as cheerio from 'cheerio'

const JRA_URL = 'https://twitter.com/JoburgRoads'

export async function scrapeTraffic(): Promise<void> {
  try {
    const sources = [
      { url: 'https://rss.app/feeds/jra-traffic.xml', name: 'JRA' },
    ]

    const updates: TrafficUpdate[] = []

    for (const source of sources) {
      try {
        const res = await fetch(source.url, {
          headers: { 'User-Agent': 'Mozilla/5.0' },
        })

        if (!res.ok) continue

        const xml = await res.text()
        const $ = cheerio.load(xml, { xmlMode: true })

        $('item').each((_, item) => {
          const title = $(item).find('title').text().trim()
          const description = $(item).find('description').text().trim()
          const pubDate = $(item).find('pubDate').text().trim()

          if (title) {
            const hasSoweto = title.toLowerCase().includes('soweto') || description.toLowerCase().includes('soweto')
            updates.push({
              id: `traffic-${Date.now()}-${updates.length}`,
              title,
              description,
              location: hasSoweto ? 'Soweto' : 'Johannesburg',
              severity: title.toLowerCase().includes('closed') || title.toLowerCase().includes('accident')
                ? 'major'
                : title.toLowerCase().includes('delay') || title.toLowerCase().includes('heavy')
                  ? 'moderate'
                  : 'minor',
              source: source.name,
              sourceUrl: source.url,
              publishedAt: pubDate || new Date().toISOString(),
            })
          }
        })
      } catch {
        console.warn(`[Traffic] Failed to fetch ${source.name}`)
      }
    }

    if (updates.length > 0) {
      setTrafficUpdates(updates)
      console.log(`[Traffic] Updated: ${updates.length} updates`)
    }
  } catch (err) {
    console.error('[Traffic] Scrape failed:', err)
  }
}
