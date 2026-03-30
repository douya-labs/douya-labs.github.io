import { dailyEntries, type AiDailyEntry, type AiItem } from './ai-daily'

export type FeedCategory = 'featured' | 'github' | 'product' | 'event' | 'research'

export type FeedItem = {
  slug: string
  dailySlug: string
  date: string
  dailyTitle: string
  category: FeedCategory
  categoryLabel: string
  title: string
  summary: string
  source: string
  href?: string
  highlight: string
  indexInDay: number
}

const categoryMeta: Record<FeedCategory, { label: string; highlight: string }> = {
  featured: {
    label: '今日主线',
    highlight: '今天最值得先看的一条。',
  },
  github: {
    label: 'GitHub 动向',
    highlight: '偏开发者视角，适合看开源生态和工具热度。',
  },
  product: {
    label: '产品发布',
    highlight: '偏落地与商业化，适合看谁在把 AI 真正做成产品。',
  },
  event: {
    label: '行业事件',
    highlight: '偏行业信号，适合判断风向和叙事变化。',
  },
  research: {
    label: '研究精选',
    highlight: '偏研究和长期趋势，适合补充认知密度。',
  },
}

function makeFeedItem(
  entry: AiDailyEntry,
  category: FeedCategory,
  item: AiItem,
  indexInDay: number,
): FeedItem {
  const meta = categoryMeta[category]

  return {
    slug: `${entry.slug}-${category}-${indexInDay + 1}`,
    dailySlug: entry.slug,
    date: entry.date,
    dailyTitle: entry.title,
    category,
    categoryLabel: meta.label,
    title: item.title,
    summary: item.summary,
    source: item.source,
    href: item.href,
    highlight: meta.highlight,
    indexInDay,
  }
}

function buildFeed(entry: AiDailyEntry) {
  return [
    makeFeedItem(entry, 'featured', entry.featured, 0),
    ...entry.githubUpdates.map((item, index) => makeFeedItem(entry, 'github', item, index)),
    ...entry.productUpdates.map((item, index) => makeFeedItem(entry, 'product', item, index)),
    ...entry.majorEvents.map((item, index) => makeFeedItem(entry, 'event', item, index)),
    ...entry.researchPicks.map((item, index) => makeFeedItem(entry, 'research', item, index)),
  ]
}

export const feedItems = dailyEntries.flatMap(buildFeed)

export function getFeedItemBySlug(slug: string) {
  return feedItems.find((item) => item.slug === slug)
}

export function getRelatedItems(item: FeedItem, limit = 4) {
  return feedItems
    .filter((candidate) => candidate.slug !== item.slug && candidate.date === item.date)
    .slice(0, limit)
}

export function getDailyEntryBySlug(slug: string) {
  return dailyEntries.find((entry) => entry.slug === slug)
}

export function getFeedSummary() {
  const totalDays = new Set(feedItems.map((item) => item.date)).size
  const latestDate = feedItems[0]?.date ?? ''

  return {
    totalItems: feedItems.length,
    totalDays,
    latestDate,
  }
}
