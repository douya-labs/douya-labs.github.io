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

const dailyModules = import.meta.glob<{ default: AiDailyEntry }>('./daily/*.json', { eager: true })

export const dailyEntries = Object.values(dailyModules)
  .map((module) => module.default)
  .sort((a, b) => b.date.localeCompare(a.date)) as AiDailyEntry[]

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
