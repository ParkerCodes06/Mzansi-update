import fs from 'fs'
import path from 'path'
import { Alert, LottoResult, Job, SassaSchedule, TrafficUpdate, WaterUpdate, WeatherForecast, NewsArticle } from '@/types'

const DATA_DIR = path.join(process.cwd(), 'src', 'data')

function readJSON<T>(filename: string): T[] {
  const filePath = path.join(DATA_DIR, filename)
  try {
    const raw = fs.readFileSync(filePath, 'utf-8')
    return JSON.parse(raw)
  } catch {
    return []
  }
}

function writeJSON<T>(filename: string, data: T[]): void {
  const filePath = path.join(DATA_DIR, filename)
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8')
}

export function getAlerts(): Alert[] {
  return readJSON<Alert>('alerts.json')
}

export function setAlerts(alerts: Alert[]): void {
  writeJSON('alerts.json', alerts)
}

export function addAlert(alert: Alert): void {
  const alerts = getAlerts()
  alerts.unshift(alert)
  setAlerts(alerts.slice(0, 200))
}

export function getAlertsByWard(wardIds: string[]): Alert[] {
  return getAlerts().filter(
    (a) => a.wardIds.length === 0 || a.wardIds.some((id) => wardIds.includes(id))
  )
}

export function getLottoResults(): LottoResult[] {
  return readJSON<LottoResult>('lotto.json')
}

export function setLottoResults(results: LottoResult[]): void {
  writeJSON('lotto.json', results)
}

export function getJobs(): Job[] {
  return readJSON<Job>('jobs.json')
}

export function setJobs(jobs: Job[]): void {
  writeJSON('jobs.json', jobs)
}

export function getSassaSchedules(): SassaSchedule[] {
  return readJSON<SassaSchedule>('sassa.json')
}

export function setSassaSchedules(schedules: SassaSchedule[]): void {
  writeJSON('sassa.json', schedules)
}

export function getTrafficUpdates(): TrafficUpdate[] {
  return readJSON<TrafficUpdate>('traffic.json')
}

export function setTrafficUpdates(updates: TrafficUpdate[]): void {
  writeJSON('traffic.json', updates)
}

export function getWaterUpdates(): WaterUpdate[] {
  return readJSON<WaterUpdate>('water.json')
}

export function setWaterUpdates(updates: WaterUpdate[]): void {
  writeJSON('water.json', updates)
}

export function getWeatherForecasts(): WeatherForecast[] {
  return readJSON<WeatherForecast>('weather.json')
}

export function setWeatherForecasts(forecasts: WeatherForecast[]): void {
  writeJSON('weather.json', forecasts)
}

export function getNewsArticles(): NewsArticle[] {
  return readJSON<NewsArticle>('news.json')
}

export function setNewsArticles(articles: NewsArticle[]): void {
  writeJSON('news.json', articles)
}
