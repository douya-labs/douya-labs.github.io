import { dailyEntries, todayEntry, type AiDailyEntry, type AiItem } from './ai-daily'

export type NewsSection = {
  key: string
  label: string
  items: AiItem[]
}

const exactTitleMap: Record<string, string> = {
  'IBM and ElevenLabs pushed enterprise agentic AI toward voice-first deployment':
    'IBM 联手 ElevenLabs，把企业语音 Agent 往真实落地再推了一步',
  'OVHcloud acquired Dragon LLM and launched an AI lab for sovereign model services':
    'OVHcloud 收购 Dragon LLM，并推出 AI Lab 主打主权模型服务',
  'GitHub put AI security and AI-powered SDLC themes front-and-center around RSAC 2026':
    'GitHub 在 RSAC 2026 把 AI 安全与 AI 开发流程推到前台',
  'Novee used RSAC 2026 to frame AI red teaming as a continuous testing problem':
    'Novee 把 AI 红队测试重新定义成持续性问题',
  'TraceSIR focused on a real bottleneck of agent systems: how to debug long execution traces':
    'TraceSIR 盯上了 Agent 系统最痛的一点：长执行链路怎么调试',
  'Atlanta Fed found AI adoption is already lifting productivity, but unevenly':
    '亚特兰大联储：AI 已经在提升生产率，但提升并不均匀',
}

const repoIntroMap: Record<string, string> = {
  'bytedance/deer-flow': '这是一个面向长任务、多代理协作的开源 Agent 框架。',
  'BerriAI/litellm': '这是一个统一接入多家大模型 API 的网关与 SDK。',
  'langchain-ai/open_deep_research': '这是一个面向深度研究流程的开源 Agent 项目。',
  'openai/openai-codex': '这是 OpenAI 面向代码场景的重要开源项目。',
  'microsoft/autogen': '这是微软在多代理协作方向的重要开源框架。',
}

function extractGithubMeta(summary: string) {
  const starMatch = summary.match(/star 约\s*([\d,]+)/)
  const dateMatch = summary.match(/最近更新时间\s*(\d{4}-\d{2}-\d{2})/)

  return {
    stars: starMatch?.[1],
    updatedAt: dateMatch?.[1],
  }
}

function firstChineseParagraph(text: string) {
  const index = text.search(/[\u4e00-\u9fff]/)
  if (index === -1) return text.trim()
  return text.slice(index).trim()
}

export function localizeTitle(item: AiItem) {
  if (exactTitleMap[item.title]) return exactTitleMap[item.title]

  const featuredMatch = item.title.match(/^(.+) became today’s strongest GitHub signal$/)
  if (featuredMatch) {
    return `${featuredMatch[1]} 成为今天最值得关注的 GitHub AI 项目`
  }

  const activeMatch = item.title.match(/^(.+) stayed active with real builder attention$/)
  if (activeMatch) {
    return `${activeMatch[1]} 持续升温，仍是今天值得看的 AI 开源项目`
  }

  return item.title
}

export function localizeSummary(item: AiItem) {
  const featuredMatch = item.title.match(/^(.+) became today’s strongest GitHub signal$/)
  if (featuredMatch) {
    const repo = featuredMatch[1]
    const intro = repoIntroMap[repo] || '这是今天值得关注的 AI 开源项目。'
    return `${intro}${firstChineseParagraph(item.summary)}`
  }

  const activeMatch = item.title.match(/^(.+) stayed active with real builder attention$/)
  if (activeMatch) {
    const repo = activeMatch[1]
    const intro = repoIntroMap[repo] || '这是今天仍然很活跃的 AI 开源项目。'
    const { stars, updatedAt } = extractGithubMeta(item.summary)
    const parts = [intro]

    if (stars) parts.push(`目前 GitHub star 约 ${stars}。`)
    if (updatedAt) parts.push(`最近更新时间是 ${updatedAt}。`)

    parts.push('这说明它不是静态摆设，而是还在被持续迭代和关注。')
    return parts.join('')
  }

  return firstChineseParagraph(item.summary)
}

export function getSections(entry: AiDailyEntry): NewsSection[] {
  return [
    { key: 'featured', label: '今日主线', items: [entry.featured] },
    { key: 'github', label: 'GitHub 动向', items: entry.githubUpdates },
    { key: 'product', label: '产品发布', items: entry.productUpdates },
    { key: 'events', label: '行业事件', items: entry.majorEvents },
    { key: 'research', label: '研究精选', items: entry.researchPicks },
  ].filter((section) => section.items.length > 0)
}

export function formatDateLabel(date: string) {
  const [year, month, day] = date.split('-')
  return `${year} 年 ${Number(month)} 月 ${Number(day)} 日`
}

export function getArchiveEntries(limit = 10) {
  return dailyEntries.slice(1, limit + 1)
}

export function getTodayEntry() {
  return todayEntry
}
