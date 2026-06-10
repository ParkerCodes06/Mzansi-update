# MzansiUpdate

A hyperlocal civic information hub for **Soweto, South Africa** — a digital community newspaper that aggregates trusted, verified information from official sources into one clean, fast-loading web app.

**Target users:** Soweto residents who want to know what's happening in their area — load shedding, SASSA grants, lotto results, local jobs, traffic, water cuts, weather, and news from trusted sources.

**Business model (B2G):** License the platform to municipalities as a public alert + information system. Negotiate zero-rated data with telcos.

---

## Tech Stack

- **Next.js 15** (App Router) — React framework
- **Tailwind CSS v4** — styling
- **Geist font** — typography
- **JSON file storage** — no database needed for MVP
- **Custom SVG icons** — no emoji dependencies
- **Cheerio** — web scraping for data sources

## Features

| Feature | Source | Route |
|---|---|---|
| Load Shedding | EskomSePush API | Feed (`/`) |
| SASSA Grants | Scraped from sassa.gov.za | `/sassa` |
| Lotto Results | Scraped from nationallottery.co.za | `/lotto` |
| Jobs | Scraped from FirstJobly | `/jobs` |
| Traffic | Scraped from JRA feed | `/traffic` |
| Water | Scraped from Joburg Water | `/water` |
| Weather | SAWS API | `/weather` |
| News | RSS feeds from SABC News + JMPD | Feed sidebar |

## Pages

| Page | Route | Description |
|---|---|---|
| Home | `/` | Ward-filtered feed + live news + quick links |
| Lotto | `/lotto` | Lotto, PowerBall, Daily Lotto, Plus games, PowerBall Plus |
| Jobs | `/jobs` | Scraped Soweto-area job listings |
| SASSA | `/sassa` | Monthly grant payment schedule |
| Traffic | `/traffic` | Road closures, accidents, delays |
| Water | `/water` | Water supply interruptions and maintenance |
| Weather | `/weather` | 4-day forecast |
| About | `/about` | Info page |

## Key Design Decisions

- **No user accounts** — ward selection stored in localStorage
- **No UGC** — all content from scraped/API sources (no moderation burden)
- **Source attribution** — every page links to the official source website
- **Clean white theme** — inspired by MSN.com, professional look for government pitches
- **Desktop + mobile** — responsive with bottom nav on mobile, header nav on desktop

## Getting Started

```bash
npm install
npm run dev        # → http://localhost:3000
npm run build      # Production build
npm run scrape     # Run all scrapers manually
```

## Roadmap

### Short-term
- Facebook page curation as news feeds
- EskomSePush API token for live load shedding data
- PWA polish (app icons, install prompt, offline page)
- Deploy to Vercel / Railway
- Source config panel (admin page)
- More scrapers (GovGazette, SAPS crime stats)

### Medium-term
- Multi-language (Zulu + Afrikaans + English)
- SMS fallback (Africa's Talking) for critical alerts
- Dashboard analytics for municipality partners
- Multi-township expansion (architecture already supports it)
- First municipality pilot (City of Joburg)

### Long-term
- Native mobile apps (wrap PWA in Capacitor)
- Billing portal for municipality subscriptions
- Zero-rating partnership (MTN / Vodacom)
- Premium job/classified listings (revenue stream)
- Official data partnerships (SABC, SAWS, Eskom)
