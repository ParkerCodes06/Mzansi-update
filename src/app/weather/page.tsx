import { getWeatherForecasts } from '@/data/store'
import { Card } from '@/components/ui/Card'
import { SourceFooter } from '@/components/ui/SourceFooter'
import { IconWeather } from '@/components/ui/Icons'

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

function formatDate(dateStr: string): string {
  const d = new Date(dateStr)
  return DAYS[d.getDay()]
}

export default function WeatherPage() {
  const forecasts = getWeatherForecasts()

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-sky-50 flex items-center justify-center">
          <IconWeather className="w-5 h-5 text-sky-600" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-gray-900">Soweto Weather</h1>
          <p className="text-sm text-gray-500">4-day forecast</p>
        </div>
      </div>

      {forecasts.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-500 text-sm">Forecast not available</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {forecasts.map((day) => (
              <Card key={day.id}>
                <div className="p-4 text-center">
                  <p className="text-xs font-semibold text-gray-500 uppercase">{formatDate(day.date)}</p>
                  <p className="text-3xl my-3">{day.icon}</p>
                  <p className="text-sm font-medium text-gray-800">{day.condition}</p>
                  <div className="flex items-center justify-center gap-2 mt-2">
                    <span className="text-lg font-bold text-gray-900">{day.temperature.high}°</span>
                    <span className="text-sm text-gray-500">{day.temperature.low}°</span>
                  </div>
                  <div className="flex items-center justify-center gap-3 mt-2 text-xs text-gray-500">
                    <span>Rain {day.rain}%</span>
                    <span>{day.wind}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          <SourceFooter sources={[{ name: 'South African Weather Service (SAWS)', url: 'https://www.weathersa.co.za' }]} />
        </>
      )}

      {forecasts.length === 0 && (
        <SourceFooter sources={[{ name: 'South African Weather Service (SAWS)', url: 'https://www.weathersa.co.za' }]} />
      )}
    </div>
  )
}
