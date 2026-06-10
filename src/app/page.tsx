'use client'

import { useState, useEffect } from 'react'
import { AlertFeed } from '@/components/alerts/AlertFeed'
import { NewsFeed } from '@/components/alerts/NewsFeed'
import { WardSelect, useSelectedWards } from '@/components/alerts/WardSelect'
import { Alert, NewsArticle, CATEGORIES, NEWS_SOURCES } from '@/types'
import { Card } from '@/components/ui/Card'
import { IconExternal } from '@/components/ui/Icons'
import Link from 'next/link'

const QUICK_LINKS = [
  { href: '/lotto', label: 'Lotto', color: '#ca8a04', bg: 'bg-yellow-50' },
  { href: '/jobs', label: 'Jobs', color: '#2563eb', bg: 'bg-blue-50' },
  { href: '/sassa', label: 'SASSA', color: '#16a34a', bg: 'bg-green-50' },
  { href: '/traffic', label: 'Traffic', color: '#ea580c', bg: 'bg-orange-50' },
  { href: '/water', label: 'Water', color: '#0891b2', bg: 'bg-cyan-50' },
  { href: '/weather', label: 'Weather', color: '#0284c7', bg: 'bg-sky-50' },
]

export default function Home() {
  const { wardIds, selectWard } = useSelectedWards()
  const [alerts, setAlerts] = useState<Alert[]>([])
  const [news, setNews] = useState<NewsArticle[]>([])
  const [loading, setLoading] = useState(true)
  const [liveTime, setLiveTime] = useState('')

  useEffect(() => {
    setLiveTime(new Date().toLocaleTimeString('en-ZA', { hour: '2-digit', minute: '2-digit' }))

    const params = wardIds.length > 0 ? `?wards=${wardIds.join(',')}` : ''
    Promise.all([
      fetch(`/api/alerts${params}`).then((r) => r.json()),
      fetch('/api/news').then((r) => r.json()),
    ])
      .then(([alertsData, newsData]) => {
        setAlerts(alertsData)
        setNews(newsData)
      })
      .catch(() => {
        setAlerts([])
        setNews([])
      })
      .finally(() => setLoading(false))

    const ticker = setInterval(() => {
      setLiveTime(new Date().toLocaleTimeString('en-ZA', { hour: '2-digit', minute: '2-digit' }))
    }, 30000)

    return () => clearInterval(ticker)
  }, [wardIds])

  const criticalAlerts = alerts.filter((a) => a.severity === 'critical')
  const heroAlert = criticalAlerts[0] || alerts[0]
  const restAlerts = alerts.filter((a) => a.id !== heroAlert?.id)

  function catLabel(category: string) {
    const info = CATEGORIES[category as keyof typeof CATEGORIES]
    return info ? { label: info.label, bgLight: info.bgLight, accent: info.accent } : null
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <WardSelect wardIds={wardIds} onToggle={selectWard} />
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
          </span>
          <span>Live · {liveTime}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-6 gap-2">
        {QUICK_LINKS.map((link, i) => (
          <Link
            key={link.href}
            href={link.href}
            className={`animate-fade-in stagger-${i + 1} card-hover flex flex-col items-center justify-center gap-1.5 rounded-lg border border-gray-200 ${link.bg} px-3 py-3 text-center`}
          >
            <span className="text-sm font-semibold" style={{ color: link.color }}>{link.label}</span>
          </Link>
        ))}
      </div>

      {heroAlert && (
        <div className="hero-enter">
          <Card>
            <div className="p-4 sm:p-5">
              <div className="flex items-center gap-2 mb-2">
                {catLabel(heroAlert.category) && (
                  <span className={`inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium ${catLabel(heroAlert.category)!.bgLight} ${catLabel(heroAlert.category)!.accent}`}>
                    <span>{catLabel(heroAlert.category)!.label}</span>
                  </span>
                )}
                {heroAlert.severity === 'critical' && (
                  <span className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-semibold uppercase tracking-wide bg-red-50 text-red-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse-dot" />
                    CRITICAL
                  </span>
                )}
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight">{heroAlert.title}</h2>
              <p className="mt-2 text-sm text-gray-600 leading-relaxed">{heroAlert.body}</p>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-xs text-gray-400">{heroAlert.source}</span>
                {heroAlert.sourceUrl && (
                  <a href={heroAlert.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:text-blue-800 flex items-center gap-1">
                    Source <IconExternal className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          </Card>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">Latest Updates</h2>
          </div>
          {loading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse rounded-lg border border-gray-200 bg-white p-4">
                  <div className="h-3 w-24 bg-gray-100 rounded mb-3" />
                  <div className="h-4 w-3/4 bg-gray-100 rounded mb-2" />
                  <div className="h-3 w-full bg-gray-100 rounded" />
                </div>
              ))}
            </div>
          ) : (
            <AlertFeed alerts={restAlerts} />
          )}
        </div>

        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">News</h2>
          </div>
          {loading ? (
            <div className="text-center py-8 text-gray-500 text-sm">Loading news...</div>
          ) : (
            <NewsFeed articles={news.slice(0, 4)} />
          )}
          {news.length > 0 && (
            <div className="mt-3 rounded-lg border border-gray-200 bg-gray-50 p-3">
              <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2">Sources</p>
              <div className="space-y-1">
                {NEWS_SOURCES.map((s) => (
                  <a
                    key={s.id}
                    href={s.pageUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs text-blue-600 hover:text-blue-800"
                  >
                    {s.name} <IconExternal className="w-3 h-3" />
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
