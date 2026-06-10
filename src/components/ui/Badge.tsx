'use client'

import { AlertCategory, CATEGORIES } from '@/types'
import { IconLoadshedding, IconSassa, IconLotto, IconJobs, IconTraffic, IconWater, IconWeather, IconCrime, IconGov, IconSports, IconEvent, IconObituary } from './Icons'

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  loadshedding: IconLoadshedding,
  sassa: IconSassa,
  lotto: IconLotto,
  jobs: IconJobs,
  traffic: IconTraffic,
  water: IconWater,
  weather: IconWeather,
  crime: IconCrime,
  gov: IconGov,
  sports: IconSports,
  event: IconEvent,
  obituary: IconObituary,
}

export function Badge({ category }: { category: AlertCategory }) {
  const info = CATEGORIES[category]
  if (!info) return null

  const Icon = ICON_MAP[info.iconName]

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium ${info.bgLight} ${info.accent}`}>
      {Icon && <Icon className="w-3.5 h-3.5" />}
      <span>{info.label}</span>
    </span>
  )
}
