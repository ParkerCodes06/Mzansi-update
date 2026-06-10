import { Card } from '@/components/ui/Card'
import { IconInfo } from '@/components/ui/Icons'

export default function AboutPage() {
  return (
    <div className="space-y-6 max-w-2xl">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
          <IconInfo className="w-5 h-5 text-gray-600" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-gray-900">About MzansiUpdate</h1>
        </div>
      </div>

      <Card>
        <div className="p-5 space-y-4">
          <div>
            <h2 className="text-sm font-semibold text-gray-900 mb-1">What is this?</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              MzansiUpdate is a hyperlocal civic information hub for Soweto. We aggregate trusted information
              from official sources so you can see everything that matters to your area in one place.
            </p>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-gray-900 mb-2">How it works</h2>
            <div className="space-y-2">
              {[
                { label: 'Select your ward', desc: 'Choose where you live in Soweto' },
                { label: 'See relevant updates', desc: 'Alerts are filtered to your area' },
                { label: 'Trusted sources', desc: 'All info from official channels' },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-gray-800">{item.label}</p>
                    <p className="text-xs text-gray-500">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-gray-900 mb-2">Data Sources</h2>
            <div className="space-y-1">
              {[
                'Load Shedding — EskomSePush',
                'SASSA Grants — SASSA Official',
                'Lotto — National Lottery / Ithuba',
                'Jobs — FirstJobly',
                'Traffic — JRA / CoJ',
                'Water — Joburg Water',
                'Weather — SAWS',
              ].map((s) => (
                <p key={s} className="text-sm text-gray-600">{s}</p>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
