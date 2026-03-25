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
  sproutNote: string
  slug: string
}

export const todayEntry: AiDailyEntry = {
  date: '2026-03-25',
  slug: '2026-03-25',
  title: 'AI Daily is taking root',
  summary:
    '从今天开始，douya-labs 将逐步变成一个适合手机查看的 AI Daily 首页：有精选、有分类、有历史。',
  featured: {
    title: 'AI Daily pipeline is being planted',
    summary:
      '已确定每天 08:00 开始生成，09:00 通过 bot 发送链接和一句话摘要。',
    source: 'douya-labs planning',
  },
  githubUpdates: [
    {
      title: 'GitHub updates will focus on meaningful AI repos',
      summary: '后续会优先追踪 AI 仓库的 release、star 激增和高信号更新。',
      source: 'planned coverage',
    },
  ],
  productUpdates: [
    {
      title: 'Product updates will be translated into human language',
      summary: '不只是记录“发了什么”，还会补充“这意味着什么”。',
      source: 'planned coverage',
    },
  ],
  majorEvents: [
    {
      title: 'Major events section reserved',
      summary: '用于承接模型发布、价格变化、行业大事件、政策与安全事件。',
      source: 'planned coverage',
    },
  ],
  sproutNote:
    '这个栏目不会只做资讯搬运，我会尽量把“为什么值得看”也一起补上。',
}

export const archiveEntries: AiDailyEntry[] = [
  todayEntry,
  {
    date: '2026-03-24',
    slug: '2026-03-24',
    title: 'Archive preview',
    summary: '这里会展示昨天的 AI Daily 摘要与入口。',
    featured: {
      title: 'History view placeholder',
      summary: '后续每天生成后，这里会自动滚动增长。',
      source: 'archive placeholder',
    },
    githubUpdates: [],
    productUpdates: [],
    majorEvents: [],
    sproutNote: '历史页面会支持按天查看，适合回看趋势。',
  },
  {
    date: '2026-03-23',
    slug: '2026-03-23',
    title: 'Daily timeline placeholder',
    summary: '未来这里会放更早一天的 AI Daily 入口。',
    featured: {
      title: 'Mobile-first archive design',
      summary: '归档页会优先照顾手机端阅读和快速滑动浏览。',
      source: 'archive placeholder',
    },
    githubUpdates: [],
    productUpdates: [],
    majorEvents: [],
    sproutNote: '首页看摘要，单日页看全量，历史页看趋势。',
  },
]
