import daily20260326 from './daily/2026-03-26.json'
import daily20260325 from './daily/2026-03-25.json'
import daily20260324 from './daily/2026-03-24.json'
import daily20260323 from './daily/2026-03-23.json'
import daily20260322 from './daily/2026-03-22.json'

export type AiItem = {
  title: string
  summary: string
  source: string
  href?: string
}

export type AiDailyEntry = {
  date: string
  title: string
  summary: string
  featured: AiItem
  githubUpdates: AiItem[]
  productUpdates: AiItem[]
  majorEvents: AiItem[]
  researchPicks: AiItem[]
  sproutNote: string
  reminderSummary?: string
  generatedAt?: string
  slug: string
}

export const dailyEntries = [
  daily20260326,
  daily20260325,
  daily20260324,
  daily20260323,
  daily20260322,
] as AiDailyEntry[]

export const todayEntry = dailyEntries[0]

export function getEntryBySlug(slug: string) {
  return dailyEntries.find((entry) => entry.slug === slug)
}

export function getEntryStats(entry: AiDailyEntry) {
  const totalItems =
    entry.githubUpdates.length +
    entry.productUpdates.length +
    entry.majorEvents.length +
    entry.researchPicks.length

  return {
    totalItems,
    githubCount: entry.githubUpdates.length,
    productCount: entry.productUpdates.length,
    eventCount: entry.majorEvents.length,
    researchCount: entry.researchPicks.length,
  }
}
