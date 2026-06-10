import { LottoResult } from '@/types'
import { setLottoResults } from '@/data/store'
import * as cheerio from 'cheerio'

const LOTTO_URL = 'https://www.nationallottery.co.za/results'

export async function scrapeLotto(): Promise<void> {
  try {
    const res = await fetch(LOTTO_URL, {
      headers: { 'User-Agent': 'Mozilla/5.0' },
    })

    if (!res.ok) {
      console.warn('[Lotto] HTTP error:', res.status)
      return
    }

    const html = await res.text()
    const $ = cheerio.load(html)
    const results: LottoResult[] = []

    $('.result-card, .lottery-result').each((_, el) => {
      const game = $(el).find('.game-name').text().trim()
      const numbers: string[] = []
      $(el).find('.ball, .number').each((__, num) => {
        numbers.push($(num).text().trim())
      })
      const bonus = $(el).find('.bonus-ball, .powerball').text().trim()
      const jackpot = $(el).find('.jackpot').text().trim()
      const drawDate = $(el).find('.draw-date').text().trim()

      if (game && numbers.length > 0 && !game.toLowerCase().includes('sportstake')) {
        results.push({
          id: `lotto-${Date.now()}-${game.replace(/\s+/g, '-')}`,
          game,
          numbers,
          bonus: bonus || undefined,
          jackpot,
          drawDate,
        })
      }
    })

    if (results.length > 0) {
      setLottoResults(results)
      console.log(`[Lotto] Updated: ${results.length} results`)
    }
  } catch (err) {
    console.error('[Lotto] Scrape failed:', err)
  }
}
