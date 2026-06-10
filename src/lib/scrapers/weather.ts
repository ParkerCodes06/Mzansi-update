import { WeatherForecast } from '@/types'
import { setWeatherForecasts } from '@/data/store'

export async function scrapeWeather(): Promise<void> {
  try {
    const res = await fetch(
      'https://api.weathersa.co.za/forecast/soweto',
      { headers: { 'User-Agent': 'Mozilla/5.0' } }
    )

    if (!res.ok) {
      console.warn('[Weather] API error:', res.status)
      return
    }

    const data = await res.json()
    const forecasts: WeatherForecast[] = []

    const days = data.forecast || data.days || []
    for (const day of days) {
      forecasts.push({
        id: `weather-${day.date || day.day}`,
        date: day.date || day.day,
        temperature: {
          high: day.temp_max || day.max_temp || day.temperature?.high || 0,
          low: day.temp_min || day.min_temp || day.temperature?.low || 0,
        },
        condition: day.condition || day.description || day.weather,
        icon: getWeatherIcon(day.condition || day.description || ''),
        rain: day.rain_chance || day.precipitation || day.rain || 0,
        wind: day.wind || `${day.wind_speed || 0} km/h ${day.wind_dir || 'N'}`,
      })
    }

    if (forecasts.length > 0) {
      setWeatherForecasts(forecasts)
      console.log(`[Weather] Updated: ${forecasts.length} days`)
    }
  } catch (err) {
    console.error('[Weather] Scrape failed:', err)
  }
}

function getWeatherIcon(condition: string): string {
  const c = condition.toLowerCase()
  if (c.includes('thunder') || c.includes('storm')) return '⛈️'
  if (c.includes('rain') || c.includes('drizzle') || c.includes('shower')) return '🌧️'
  if (c.includes('cloud') || c.includes('overcast')) return '☁️'
  if (c.includes('partly')) return '⛅'
  if (c.includes('clear') || c.includes('sunny') || c.includes('fair')) return '☀️'
  if (c.includes('fog') || c.includes('mist') || c.includes('haze')) return '🌫️'
  if (c.includes('snow') || c.includes('hail')) return '🌨️'
  if (c.includes('wind')) return '💨'
  return '🌤️'
}
