import { getWaterUpdates } from '@/data/store'
import { Card } from '@/components/ui/Card'
import { SourceFooter } from '@/components/ui/SourceFooter'
import { IconWater } from '@/components/ui/Icons'

export default function WaterPage() {
  const updates = getWaterUpdates()

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-cyan-50 flex items-center justify-center">
          <IconWater className="w-5 h-5 text-cyan-600" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-gray-900">Water Supply Updates</h1>
          <p className="text-sm text-gray-500">Maintenance and outages</p>
        </div>
      </div>

      {updates.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-500 text-sm">No water updates</p>
        </div>
      ) : (
        <div className="space-y-3">
          {updates.map((update) => {
            const statusColor = update.status === 'in-progress'
              ? 'bg-yellow-50 text-yellow-700'
              : update.status === 'scheduled'
                ? 'bg-blue-50 text-blue-700'
                : update.status === 'completed'
                  ? 'bg-green-50 text-green-700'
                  : 'bg-red-50 text-red-700'

            return (
              <Card key={update.id}>
                <div className="p-4">
                  <div className="flex items-start gap-3">
                    <span className={`shrink-0 rounded-md px-2 py-1 text-[11px] font-semibold uppercase ${statusColor}`}>
                      {update.status}
                    </span>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base font-semibold text-gray-900">{update.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{update.description}</p>
                      {update.areas.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {update.areas.map((area) => (
                            <span key={area} className="rounded-md bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
                              {area}
                            </span>
                          ))}
                        </div>
                      )}
                      <p className="text-xs text-gray-400 mt-2">{update.source}</p>
                    </div>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>
      )}

      <SourceFooter sources={[{ name: 'Johannesburg Water', url: 'https://www.johannesburgwater.co.za' }]} />
    </div>
  )
}
