'use client'

import { NewsArticle } from '@/types'
import { Card } from '@/components/ui/Card'
import { IconExternal } from '@/components/ui/Icons'

const SOURCE_STYLES: Record<string, { bg: string; text: string; border: string }> = {
  'SABC News': { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200' },
  'JMPD': { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' },
}

function timeAgo(dateStr: string): string {
  const now = Date.now()
  const date = new Date(dateStr).getTime()
  const diff = now - date
  const mins = Math.floor(diff / 60000)
  if (mins < 60) return `${mins}m ago`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `${hours}h ago`
  return `${Math.floor(hours / 24)}d ago`
}

export function NewsFeed({ articles }: { articles: NewsArticle[] }) {
  if (articles.length === 0) return null

  return (
    <div className="space-y-3">
      {articles.map((article) => {
        const style = SOURCE_STYLES[article.source] || { bg: 'bg-gray-50', text: 'text-gray-700', border: 'border-gray-200' }

        return (
          <Card key={article.id}>
            <div className="p-4">
              <div className="flex items-start gap-2 mb-2">
                <span className={`inline-flex items-center rounded-md border px-2 py-0.5 text-[11px] font-semibold ${style.bg} ${style.text} ${style.border}`}>
                  {article.source}
                </span>
              </div>
              <h3 className="text-base font-semibold text-gray-900 leading-snug">{article.title}</h3>
              <p className="mt-1 text-sm text-gray-600 leading-relaxed line-clamp-2">{article.body}</p>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-xs text-gray-400">{timeAgo(article.publishedAt)}</span>
                <a
                  href={article.sourcePage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1"
                >
                  View source <IconExternal className="w-3 h-3" />
                </a>
              </div>
            </div>
          </Card>
        )
      })}
    </div>
  )
}
