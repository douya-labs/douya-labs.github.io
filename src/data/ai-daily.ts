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
  slug: string
}

export const todayEntry: AiDailyEntry = {
  date: '2026-03-25',
  slug: '2026-03-25',
  title: 'AI Daily is taking root',
  summary:
    '从今天开始，douya-labs 将逐步变成一个适合手机查看的 AI Daily 首页：有精选、有分类、有历史，也有每天 09:00 的提醒。',
  featured: {
    title: 'AI Daily pipeline is being planted',
    summary:
      '已确定每天 08:00 开始搜索与生成，09:00 通过 bot 发送链接 + 一句话摘要。',
    source: 'douya-labs planning',
  },
  githubUpdates: [
    {
      title: 'GitHub updates will focus on high-signal AI repos',
      summary: '后续会优先追踪 AI 仓库的 release、star 激增和具有方向感的更新。',
      source: 'planned coverage',
    },
    {
      title: 'Daily summaries will explain why a repo matters',
      summary: '不只记录“更新了什么”，还会补充“为什么值得点进去看”。',
      source: 'planned coverage',
    },
  ],
  productUpdates: [
    {
      title: 'Product updates will be translated into human language',
      summary: '把模型、功能、工具更新整理成更适合快速理解的卡片信息。',
      source: 'planned coverage',
    },
    {
      title: 'Daily page will emphasize practical impact',
      summary: '比如它会不会影响工作流、开发效率、产品决策或 agent 能力。',
      source: 'planned coverage',
    },
  ],
  majorEvents: [
    {
      title: 'Major events section reserved',
      summary: '用于承接模型发布、价格变化、行业大事件、政策与安全事件。',
      source: 'planned coverage',
    },
    {
      title: 'The homepage will surface one top story each day',
      summary: '避免首页被信息淹没，先让你一眼看到“今天最值得看的一条”。',
      source: 'planned coverage',
    },
  ],
  researchPicks: [
    {
      title: 'Research picks will stay small but high value',
      summary: '控制在 1~3 条，强调可读性与实际意义，而不是论文堆砌。',
      source: 'planned coverage',
    },
  ],
  sproutNote:
    '这个栏目不会只做资讯搬运，我会尽量把“为什么值得看”也一起补上，让它更像一份有判断力的晨间 AI Brief。',
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
    researchPicks: [],
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
    researchPicks: [],
    sproutNote: '首页看摘要，单日页看全量，历史页看趋势。',
  },
  {
    date: '2026-03-22',
    slug: '2026-03-22',
    title: 'Momentum placeholder',
    summary: '后续这里可扩展近 7 天趋势与重点回顾。',
    featured: {
      title: 'Weekly rhythm can emerge from daily notes',
      summary: '当日归档积累后，也能自然做出周回顾与趋势判断。',
      source: 'archive placeholder',
    },
    githubUpdates: [],
    productUpdates: [],
    majorEvents: [],
    researchPicks: [],
    sproutNote: '先把每天做好，周视角和月视角就会长出来。',
  },
]
