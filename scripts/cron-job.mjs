import cron from 'node-cron'
import { runAllScrapers } from '../src/lib/scrapers/index.js'

console.log('[Cron] Starting scheduled scraper...')
console.log('[Cron] Runs every 30 minutes')

cron.schedule('*/30 * * * *', async () => {
  console.log(`[Cron] Running scrapers at ${new Date().toISOString()}`)
  await runAllScrapers()
  console.log(`[Cron] Done at ${new Date().toISOString()}`)
})

console.log('[Cron] Running on startup...')
runAllScrapers().then(() => {
  console.log('[Cron] Initial scrape complete')
})
