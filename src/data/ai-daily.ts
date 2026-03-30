export type NewsItem = {
  title: string
  summary: string
  source: string
  href: string
  publishedAt?: string
}

export type NewsSection = {
  key: string
  title: string
  items: NewsItem[]
}

export type DailyNewsEntry = {
  date: string
  slug: string
  title: string
  summary: string
  intro: string
  sections: NewsSection[]
  closing: string
  reminderSummary?: string
  generatedAt?: string
}

const dailyModules = import.meta.glob<{ default: DailyNewsEntry }>('./daily/*.json', { eager: true })

export const dailyEntries = Object.values(dailyModules)
  .map((module) => module.default)
  .sort((a, b) => b.date.localeCompare(a.date)) as DailyNewsEntry[]

export const todayEntry = dailyEntries[0]

export function getEntryBySlug(slug: string) {
  return dailyEntries.find((entry) => entry.slug === slug)
}
