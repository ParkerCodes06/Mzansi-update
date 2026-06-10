'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { IconHome, IconLotto, IconJobs, IconSassa, IconTraffic, IconWater, IconWeather } from '@/components/ui/Icons'

const ITEMS = [
  { href: '/', label: 'Home', icon: IconHome },
  { href: '/lotto', label: 'Lotto', icon: IconLotto },
  { href: '/jobs', label: 'Jobs', icon: IconJobs },
  { href: '/sassa', label: 'SASSA', icon: IconSassa },
  { href: '/traffic', label: 'Traffic', icon: IconTraffic },
  { href: '/water', label: 'Water', icon: IconWater },
  { href: '/weather', label: 'Weather', icon: IconWeather },
]

export function MobileNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-gray-200 bg-white sm:hidden">
      <div className="flex items-center justify-around px-1 py-1">
        {ITEMS.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-0.5 rounded-lg px-2 py-1 ${
                isActive ? 'text-blue-600' : 'text-gray-500'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
