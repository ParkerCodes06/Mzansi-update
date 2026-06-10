import { runAllScrapers } from '../src/lib/scrapers/index.js'

async function main() {
  console.log('=== MzansiUpdate Scraper ===')
  console.log(`Started at: ${new Date().toISOString()}`)
  console.log('')

  await runAllScrapers()

  console.log('')
  console.log(`Finished at: ${new Date().toISOString()}`)
  process.exit(0)
}

main().catch((err) => {
  console.error('Fatal:', err)
  process.exit(1)
})
