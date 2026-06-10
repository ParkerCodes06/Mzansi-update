'use client'

import Link from 'next/link'
import { Logo } from '@/components/ui/Icons'

const NAV_ITEMS = [
  { href: '/lotto', label: 'Lotto' },
  { href: '/jobs', label: 'Jobs' },
  { href: '/sassa', label: 'SASSA' },
  { href: '/traffic', label: 'Traffic' },
  { href: '/water', label: 'Water' },
  { href: '/weather', label: 'Weather' },
]

export function Header() {
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto max-w-5xl px-4">
        <div className="flex items-center justify-between py-3">
          <Link href="/" className="flex items-center gap-3">
            <Logo />
            <div>
              <h1 className="text-lg font-bold text-gray-900">MzansiUpdate</h1>
              <p className="text-[11px] text-gray-500 leading-none">Soweto's Digital Newspaper</p>
            </div>
          </Link>
          <nav className="hidden sm:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-3 py-1.5 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-100 hover:text-gray-900 transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/about"
              className="px-3 py-1.5 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-100 hover:text-gray-900 transition-colors"
            >
              About
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}
