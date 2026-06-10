import { scrapeLoadShedding } from './loadshedding'
import { scrapeLotto } from './lotto'
import { scrapeSassa } from './sassa'
import { scrapeJobs } from './jobs'
import { scrapeTraffic } from './traffic'
import { scrapeWater } from './water'
import { scrapeWeather } from './weather'
import { scrapeNews } from './news'

export async function runAllScrapers(): Promise<void> {
  console.log('[Scraper] Starting all scrapers...')

  const scrapers = [
    { name: 'LoadShedding', fn: scrapeLoadShedding },
    { name: 'Lotto', fn: scrapeLotto },
    { name: 'SASSA', fn: scrapeSassa },
    { name: 'Jobs', fn: scrapeJobs },
    { name: 'Traffic', fn: scrapeTraffic },
    { name: 'Water', fn: scrapeWater },
    { name: 'Weather', fn: scrapeWeather },
    { name: 'News', fn: scrapeNews },
  ]

  const results = await Promise.allSettled(
    scrapers.map(async (s) => {
      try {
        await s.fn()
        return { name: s.name, status: 'ok' }
      } catch (err) {
        return { name: s.name, status: 'failed', error: err }
      }
    })
  )

  for (const r of results) {
    if (r.status === 'fulfilled') {
      console.log(`[Scraper] ${r.value.name}: ${r.value.status}`)
    } else {
      console.error(`[Scraper] Rejected:`, r.reason)
    }
  }

  console.log('[Scraper] All scrapers finished.')
}
