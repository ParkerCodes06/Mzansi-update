'use client'

import { Alert } from '@/types'
import { Badge } from '@/components/ui/Badge'
import { SeverityBadge } from '@/components/ui/SeverityBadge'
import { Card } from '@/components/ui/Card'

function timeAgo(dateStr: string): string {
  const now = Date.now()
  const date = new Date(dateStr).getTime()
  const diff = now - date
  const mins = Math.floor(diff / 60000)
  if (mins < 60) return `${mins} min ago`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `${hours}h ago`
  return `${Math.floor(hours / 24)}d ago`
}

export function AlertCard({ alert }: { alert: Alert }) {
  return (
    <Card>
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2 flex-wrap">
          <Badge category={alert.category} />
          <SeverityBadge severity={alert.severity} />
        </div>
        <h3 className="text-base font-semibold text-gray-900 leading-snug">{alert.title}</h3>
        <p className="mt-1 text-sm text-gray-600 leading-relaxed">{alert.body}</p>
        <div className="mt-3 flex items-center gap-3 text-xs text-gray-400">
          <span>{alert.source}</span>
          <span>{timeAgo(alert.publishedAt)}</span>
        </div>
      </div>
    </Card>
  )
}
