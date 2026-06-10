import { SassaSchedule } from '@/types'
import { setSassaSchedules } from '@/data/store'
import * as cheerio from 'cheerio'

const SASSA_URL = 'https://www.sassa.gov.za/Pages/Approved-Payment-Dates.aspx'

export async function scrapeSassa(): Promise<void> {
  try {
    const res = await fetch(SASSA_URL, {
      headers: { 'User-Agent': 'Mozilla/5.0' },
    })

    if (!res.ok) {
      console.warn('[SASSA] HTTP error:', res.status)
      return
    }

    const html = await res.text()
    const $ = cheerio.load(html)
    const schedules: SassaSchedule[] = []

    $('table tbody tr, .payment-schedule .row').each((_, el) => {
      const cells = $(el).find('td, .cell')
      if (cells.length >= 4) {
        const grantType = $(cells[0]).text().trim()
        const year = parseInt($(cells[1]).text().trim()) || new Date().getFullYear()
        const month = parseInt($(cells[2]).text().trim()) || (new Date().getMonth() + 1)
        const dateText = $(cells[3]).text().trim()

        if (grantType && dateText) {
          const dateParts = dateText.split('-')
          schedules.push({
            id: `sassa-${Date.now()}-${grantType.replace(/\s+/g, '-').toLowerCase()}`,
            year,
            month,
            paymentType: grantType,
            startDate: dateParts[0]?.trim() || dateText,
            endDate: dateParts[1]?.trim() || dateText,
            description: `${grantType} payment window.`,
          })
        }
      }
    })

    if (schedules.length > 0) {
      setSassaSchedules(schedules)
      console.log(`[SASSA] Updated: ${schedules.length} schedules`)
    }
  } catch (err) {
    console.error('[SASSA] Scrape failed:', err)
  }
}
