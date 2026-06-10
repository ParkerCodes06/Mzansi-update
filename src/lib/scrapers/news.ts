import { NewsArticle } from '@/types'
import { setNewsArticles, getNewsArticles } from '@/data/store'

const FEEDS = [
  {
    id: 'sabc-news',
    name: 'SABC News',
    pageUrl: 'https://facebook.com/SABCNews',
    url: 'https://www.sabcnews.com/sabcnews/feed/',
  },
  {
    id: 'jmpd',
    name: 'JMPD',
    pageUrl: 'https://facebook.com/JMPDsouthafrica',
    url: 'https://www.jmpd.org.za/feed/',
  },
]

export async function scrapeNews(): Promise<void> {
  const articles: NewsArticle[] = []

  for (const feed of FEEDS) {
    try {
      const res = await fetch(feed.url, {
        headers: { 'User-Agent': 'Mozilla/5.0 (compatible; MzansiUpdate/1.0)' },
      })

      if (!res.ok) {
        console.warn(`[News] ${feed.name} HTTP ${res.status}`)
        continue
      }

      const text = await res.text()
      const items = parseRSS(text)

      for (const item of items.slice(0, 30)) {
        articles.push({
          id: `news-${feed.id}-${Date.now()}-${articles.length}`,
          title: item.title,
          body: item.description,
          source: feed.name,
          sourceUrl: feed.url,
          sourcePage: feed.pageUrl,
          imageUrl: item.image,
          publishedAt: item.pubDate || new Date().toISOString(),
          url: item.link,
        })
      }

      console.log(`[News] ${feed.name}: ${items.length} articles`)
    } catch (err) {
      console.error(`[News] ${feed.name} failed:`, err)
    }
  }

  if (articles.length > 0) {
    const existing = getNewsArticles()
    const merged = [...articles, ...existing].slice(0, 200)
    setNewsArticles(merged)
  }
}

interface RSSItem {
  title: string
  description: string
  link: string
  pubDate: string
  image?: string
}

function parseRSS(xml: string): RSSItem[] {
  const items: RSSItem[] = []

  const itemRegex = /<item>([\s\S]*?)<\/item>/gi
  let match

  while ((match = itemRegex.exec(xml)) !== null) {
    const content = match[1]

    const getTag = (tag: string): string => {
      const m = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, 'i').exec(content)
      return m ? m[1].trim() : ''
    }

    const title = getTag('title')
    const description = getTag('description').replace(/<[^>]+>/g, '').trim()
    const link = getTag('link')
    const pubDate = getTag('pubDate')

    let image = ''
    const imgMatch = /<media:content[^>]*url="([^"]+)"/i.exec(content)
    if (imgMatch) image = imgMatch[1]

    if (title) {
      items.push({ title, description, link, pubDate, image })
    }
  }

  return items
}
