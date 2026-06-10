import { Alert } from '@/types'
import { addAlert, setAlerts, getAlerts } from '@/data/store'

export async function scrapeLoadShedding(): Promise<void> {
  try {
    const res = await fetch('https://developer.sepush.co.za/business/2.0/area?id=soweto&test=1', {
      headers: {
        'token': process.env.ESKOM_SE_PUSH_TOKEN || '',
      },
    })

    if (!res.ok) {
      console.warn('[LoadShedding] API error:', res.status)
      return
    }

    const data = await res.json()

    if (data.schedule?.days) {
      const alerts: Alert[] = []
      const now = new Date()

      for (const day of data.schedule.days) {
        for (const slot of day.stages) {
          for (const time of slot.times) {
            alerts.push({
              id: `ls-${day.date}-${slot.stage}-${time.start}`,
              title: `Load Shedding Stage ${slot.stage} — ${day.date}`,
              body: `Eskom Stage ${slot.stage} load shedding from ${time.start} to ${time.end}.`,
              category: 'loadshedding',
              severity: slot.stage >= 4 ? 'critical' : 'warning',
              source: 'EskomSePush',
              wardIds: [],
              publishedAt: now.toISOString(),
              expiresAt: new Date(`${day.date}T${time.end}:00`).toISOString(),
            })
          }
        }
      }

      const existing = getAlerts().filter((a) => a.category !== 'loadshedding')
      setAlerts([...alerts, ...existing].slice(0, 200))
      console.log(`[LoadShedding] Updated: ${alerts.length} alerts`)
    }
  } catch (err) {
    console.error('[LoadShedding] Scrape failed:', err)
  }
}
