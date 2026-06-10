import { getSassaSchedules } from '@/data/store'
import { Card } from '@/components/ui/Card'
import { SourceFooter } from '@/components/ui/SourceFooter'
import { IconSassa } from '@/components/ui/Icons'

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

export default function SassaPage() {
  const schedules = getSassaSchedules()

  const grouped = schedules.reduce<Record<string, typeof schedules>>((acc, s) => {
    const key = `${s.year}-${s.month}`
    if (!acc[key]) acc[key] = []
    acc[key].push(s)
    return acc
  }, {})

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center">
          <IconSassa className="w-5 h-5 text-green-600" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-gray-900">SASSA Grant Schedule</h1>
          <p className="text-sm text-gray-500">Social grant payment dates</p>
        </div>
      </div>

      {schedules.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-500 text-sm">No schedule available</p>
        </div>
      ) : (
        <div className="space-y-6">
          {Object.entries(grouped).map(([key, entries]) => {
            const [, month] = key.split('-')
            return (
              <div key={key}>
                <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">
                  {MONTHS[parseInt(month) - 1]} Payment Window
                </h2>
                <div className="space-y-3">
                  {entries.map((entry) => (
                    <Card key={entry.id}>
                      <div className="p-4">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <h3 className="text-base font-semibold text-gray-900">{entry.paymentType}</h3>
                            <p className="text-sm text-gray-600 mt-1">{entry.description}</p>
                          </div>
                          <div className="text-right shrink-0">
                            <p className="text-sm font-bold text-green-700">
                              {entry.startDate === entry.endDate
                                ? entry.startDate
                                : `${entry.startDate} – ${entry.endDate}`}
                            </p>
                            <p className="text-[11px] text-gray-500 mt-0.5">Payment window</p>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )
          })}
          <SourceFooter sources={[{ name: 'SASSA Official Website', url: 'https://www.sassa.gov.za' }]} />
        </div>
      )}

      {schedules.length === 0 && (
        <SourceFooter sources={[{ name: 'SASSA Official Website', url: 'https://www.sassa.gov.za' }]} />
      )}
    </div>
  )
}
