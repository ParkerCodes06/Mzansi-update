import { WaterUpdate } from '@/types'
import { setWaterUpdates } from '@/data/store'
import * as cheerio from 'cheerio'

const WATER_URL = 'https://twitter.com/johannesburgwater'

export async function scrapeWater(): Promise<void> {
  try {
    const urls = [
      { url: 'https://rss.app/feeds/joburg-water.xml', name: 'Joburg Water' },
    ]

    const updates: WaterUpdate[] = []

    for (const source of urls) {
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
            const areas: string[] = []
            const sowetoMatch = description.match(/Soweto|Pimville|Diepkloof|Orlando|Meadowlands|Dobsonville|Protea|Jabavu|Naledi|Chiawelo|Dlamini/i)
            if (sowetoMatch) {
              areas.push(sowetoMatch[0])
            }

            updates.push({
              id: `water-${Date.now()}-${updates.length}`,
              title,
              description,
              areas,
              status: title.toLowerCase().includes('planned') || title.toLowerCase().includes('scheduled')
                ? 'scheduled'
                : title.toLowerCase().includes('resolved') || title.toLowerCase().includes('restored')
                  ? 'completed'
                  : 'in-progress',
              source: source.name,
              sourceUrl: source.url,
              publishedAt: pubDate || new Date().toISOString(),
            })
          }
        })
      } catch {
        console.warn(`[Water] Failed to fetch ${source.name}`)
      }
    }

    if (updates.length > 0) {
      setWaterUpdates(updates)
      console.log(`[Water] Updated: ${updates.length} updates`)
    }
  } catch (err) {
    console.error('[Water] Scrape failed:', err)
  }
}
