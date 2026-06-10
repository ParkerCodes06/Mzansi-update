import { Job } from '@/types'
import { setJobs } from '@/data/store'
import * as cheerio from 'cheerio'

const FIRSTJOBLY_URL = 'https://firstjobly.co.za'

export async function scrapeJobs(): Promise<void> {
  try {
    const res = await fetch(FIRSTJOBLY_URL, {
      headers: { 'User-Agent': 'Mozilla/5.0' },
    })

    if (!res.ok) {
      console.warn('[Jobs] HTTP error:', res.status)
      return
    }

    const html = await res.text()
    const $ = cheerio.load(html)
    const jobs: Job[] = []

    $('.job-card, .job-listing, .post-card').each((_, el) => {
      const title = $(el).find('.job-title, h2, h3').first().text().trim()
      const company = $(el).find('.company-name, .employer').text().trim()
      const location = $(el).find('.location').text().trim()
      const description = $(el).find('.description, .excerpt, p').first().text().trim()
      const url = $(el).find('a').first().attr('href') || ''
      const postedAt = $(el).find('.date, .posted-date, time').text().trim()

      if (title && company) {
        jobs.push({
          id: `job-${Date.now()}-${jobs.length}`,
          title,
          company,
          location: location || 'Soweto, Gauteng',
          description,
          url: url.startsWith('http') ? url : `${FIRSTJOBLY_URL}${url}`,
          postedAt,
          source: 'FirstJobly',
        })
      }
    })

    if (jobs.length > 0) {
      setJobs(jobs)
      console.log(`[Jobs] Updated: ${jobs.length} jobs`)
    }
  } catch (err) {
    console.error('[Jobs] Scrape failed:', err)
  }
}
