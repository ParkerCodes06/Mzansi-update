export interface Municipality {
  id: string
  name: string
  province: string
  sections: Section[]
}

export interface Section {
  id: string
  name: string
  wards: Ward[]
}

export interface Ward {
  id: string
  number: number
  name: string
}

export interface Alert {
  id: string
  title: string
  body: string
  category: AlertCategory
  severity: 'critical' | 'warning' | 'info'
  source: string
  sourceUrl?: string
  wardIds: string[]
  publishedAt: string
  expiresAt?: string
}

export type AlertCategory =
  | 'loadshedding'
  | 'sassa'
  | 'lotto'
  | 'jobs'
  | 'traffic'
  | 'water'
  | 'weather'
  | 'crime'
  | 'govVisit'
  | 'sports'
  | 'event'
  | 'obituary'

export interface NewsArticle {
  id: string
  title: string
  body: string
  source: string
  sourceUrl: string
  sourcePage: string
  imageUrl?: string
  publishedAt: string
  url: string
}

export interface LottoResult {
  id: string
  game: string
  numbers: string[]
  bonus?: string
  jackpot: string
  drawDate: string
  winners?: number
}

export interface Job {
  id: string
  title: string
  company: string
  location: string
  description: string
  url: string
  postedAt: string
  source: string
}

export interface SassaSchedule {
  id: string
  year: number
  month: number
  paymentType: string
  startDate: string
  endDate: string
  description: string
}

export interface TrafficUpdate {
  id: string
  title: string
  description: string
  location: string
  severity: 'minor' | 'moderate' | 'major'
  source: string
  sourceUrl: string
  publishedAt: string
}

export interface WaterUpdate {
  id: string
  title: string
  description: string
  areas: string[]
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled'
  source: string
  sourceUrl: string
  publishedAt: string
}

export interface WeatherForecast {
  id: string
  date: string
  temperature: {
    high: number
    low: number
  }
  condition: string
  icon: string
  rain: number
  wind: string
}

export interface CategoryInfo {
  slug: AlertCategory
  label: string
  iconName: string
  color: string
  accent: string
  bgLight: string
}

export const CATEGORIES: Record<AlertCategory, CategoryInfo> = {
  loadshedding: { slug: 'loadshedding', label: 'Load Shedding', iconName: 'loadshedding', color: '#e97319', accent: 'text-orange-700', bgLight: 'bg-orange-50' },
  sassa: { slug: 'sassa', label: 'SASSA Grants', iconName: 'sassa', color: '#16a34a', accent: 'text-green-700', bgLight: 'bg-green-50' },
  lotto: { slug: 'lotto', label: 'Lotto', iconName: 'lotto', color: '#ca8a04', accent: 'text-yellow-700', bgLight: 'bg-yellow-50' },
  jobs: { slug: 'jobs', label: 'Jobs', iconName: 'jobs', color: '#2563eb', accent: 'text-blue-700', bgLight: 'bg-blue-50' },
  traffic: { slug: 'traffic', label: 'Traffic', iconName: 'traffic', color: '#ea580c', accent: 'text-orange-700', bgLight: 'bg-orange-50' },
  water: { slug: 'water', label: 'Water', iconName: 'water', color: '#0891b2', accent: 'text-cyan-700', bgLight: 'bg-cyan-50' },
  weather: { slug: 'weather', label: 'Weather', iconName: 'weather', color: '#0284c7', accent: 'text-sky-700', bgLight: 'bg-sky-50' },
  crime: { slug: 'crime', label: 'Crime Alert', iconName: 'crime', color: '#dc2626', accent: 'text-red-700', bgLight: 'bg-red-50' },
  govVisit: { slug: 'govVisit', label: 'Gov Visit', iconName: 'gov', color: '#7c3aed', accent: 'text-violet-700', bgLight: 'bg-violet-50' },
  sports: { slug: 'sports', label: 'Sports', iconName: 'sports', color: '#059669', accent: 'text-emerald-700', bgLight: 'bg-emerald-50' },
  event: { slug: 'event', label: 'Events', iconName: 'event', color: '#db2777', accent: 'text-pink-700', bgLight: 'bg-pink-50' },
  obituary: { slug: 'obituary', label: 'Obituaries', iconName: 'obituary', color: '#78716c', accent: 'text-stone-700', bgLight: 'bg-stone-50' },
}

export const NEWS_SOURCES = [
  {
    id: 'sabc-news',
    name: 'SABC News',
    pageUrl: 'https://facebook.com/SABCNews',
    url: 'https://www.sabcnews.com',
    color: '#dc2626',
  },
  {
    id: 'jmpd',
    name: 'JMPD',
    pageUrl: 'https://facebook.com/JMPDsouthafrica',
    url: 'https://www.jmpd.org.za',
    color: '#1d4ed8',
  },
]
