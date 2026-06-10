'use client'

import { Alert } from '@/types'
import { AlertCard } from './AlertCard'

export function AlertFeed({ alerts }: { alerts: Alert[] }) {
  if (alerts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <p className="text-gray-500 text-sm">No alerts for this area right now</p>
        <p className="text-gray-400 text-xs mt-1">Try selecting a different ward</p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {alerts.map((alert) => (
        <AlertCard key={alert.id} alert={alert} />
      ))}
    </div>
  )
}
