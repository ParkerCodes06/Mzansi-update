import { getTrafficUpdates } from '@/data/store'
import { Card } from '@/components/ui/Card'
import { SourceFooter } from '@/components/ui/SourceFooter'
import { IconTraffic, IconMapPin } from '@/components/ui/Icons'

export default function TrafficPage() {
  const updates = getTrafficUpdates()

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center">
          <IconTraffic className="w-5 h-5 text-orange-600" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-gray-900">Traffic & Road Updates</h1>
          <p className="text-sm text-gray-500">Road closures, accidents, delays</p>
        </div>
      </div>

      {updates.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-500 text-sm">No traffic updates</p>
        </div>
      ) : (
        <div className="space-y-3">
          {updates.map((update) => {
            const severityColor = update.severity === 'major'
              ? 'bg-red-50 text-red-700'
              : update.severity === 'moderate'
                ? 'bg-yellow-50 text-yellow-700'
                : 'bg-blue-50 text-blue-700'

            return (
              <Card key={update.id}>
                <div className="p-4">
                  <div className="flex items-start gap-3">
                    <span className={`shrink-0 rounded-md px-2 py-1 text-[11px] font-semibold uppercase ${severityColor}`}>
                      {update.severity}
                    </span>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base font-semibold text-gray-900">{update.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{update.description}</p>
                      <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <IconMapPin className="w-3.5 h-3.5" /> {update.location}
                        </span>
                        <span>{update.source}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>
      )}

      <SourceFooter sources={[
        { name: 'Johannesburg Roads Agency (JRA)', url: 'https://www.jra.org.za' },
        { name: 'CoJ Traffic', url: 'https://twitter.com/CoJTraffic' },
      ]} />
    </div>
  )
}
