import fs from 'node:fs'
import path from 'node:path'
import { execSync } from 'node:child_process'

const repoRoot = path.resolve(process.cwd())
const dailyDir = path.join(repoRoot, 'src', 'data', 'daily')
const dateArg = process.argv.find((arg) => arg.startsWith('--date='))

function pad(value) {
  return String(value).padStart(2, '0')
}

function getTodayUtcDateString() {
  const now = new Date()
  return `${now.getUTCFullYear()}-${pad(now.getUTCMonth() + 1)}-${pad(now.getUTCDate())}`
}

function safeExec(command) {
  return execSync(command, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim()
}

function fetchGoogleNewsRss(query) {
  const encoded = encodeURIComponent(`${query} when:1d`)
  const url = `https://news.google.com/rss/search?q=${encoded}&hl=en-US&gl=US&ceid=US:en`
  return safeExec(`python3 - <<'PY'
import urllib.request
print(urllib.request.urlopen(${JSON.stringify(url)}, timeout=20).read().decode('utf-8', 'ignore'))
PY`)
}

function decodeHtml(text) {
  return String(text || '')
    .replace(/<!\[CDATA\[|\]\]>/g, '')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .trim()
}

function getTag(block, tag) {
  const match = block.match(new RegExp(`<${tag}>([\\s\\S]*?)<\\/${tag}>`, 'i'))
  return decodeHtml(match?.[1] || '')
}

function parseItems(xmlText) {
  const items = []
  const matches = xmlText.match(/<item>[\s\S]*?<\/item>/g) || []

  for (const block of matches.slice(0, 8)) {
    const title = getTag(block, 'title').replace(/\s+-\s+[^-]+$/, '').trim()
    const href = getTag(block, 'link')
    const publishedAt = getTag(block, 'pubDate')
    const sourceMatch = block.match(/<source[^>]*>([\s\S]*?)<\/source>/i)
    const source = decodeHtml(sourceMatch?.[1] || '')

    if (title && href) {
      items.push({ title, href, publishedAt, source })
    }
  }

  return items
}

const queryGroups = [
  { key: 'top', title: '今日重点', query: 'OpenAI OR Apple OR Anthropic AI' },
  { key: 'company', title: '公司与产业动向', query: 'Microsoft AI OR enterprise AI OR AI jobs' },
  { key: 'view', title: '值得关注的趋势', query: 'AI industry trend OR AI platform OR AI economy' },
]

const manualSummaryMap = [
  {
    match: /OpenAI/i,
    title: 'OpenAI 再次成为今天 AI 新闻的中心话题',
    summary:
      '围绕 OpenAI 的报道重点已经不只是模型能力本身，而是产品路线、资源投入和商业优先级的重新排序。这说明头部 AI 公司开始进入更现实的经营阶段，市场更关心它们接下来把资源押在哪些真正能长期成立的方向上。',
  },
  {
    match: /Apple/i,
    title: '苹果正在把 AI 当成平台入口能力来重新设计',
    summary:
      '如果苹果的调整方向属实，那么它看重的就不只是某个聊天功能，而是 AI 如何更深地进入系统入口、应用分发和搜索式体验。对行业来说，这意味着 AI 竞争越来越像平台战争，而不只是模型竞赛。',
  },
  {
    match: /job cuts|jobs|BBC/i,
    title: '企业开始更频繁地用 AI 解释效率与裁员问题',
    summary:
      'AI 对就业的影响正在从抽象讨论走向现实叙事。越来越多公司和管理者把组织收缩、效率改革与 AI 联系在一起，这种变化会进一步放大公众对岗位替代和职业重构的关注。',
  },
  {
    match: /Microsoft/i,
    title: '微软继续推动 AI 在组织场景中制度化落地',
    summary:
      '相比炫目的模型发布，微软这类动作更像企业市场真正会发生的事情：培训、工具接入、组织协同和流程改造。它说明 AI 的竞争正在从实验阶段转向长期部署阶段。',
  },
]

function toChineseItem(raw, fallbackTitle) {
  for (const rule of manualSummaryMap) {
    if (rule.match.test(raw.title)) {
      return {
        title: rule.title,
        summary: rule.summary,
        source: raw.source || fallbackTitle,
        href: raw.href,
        publishedAt: raw.publishedAt,
      }
    }
  }

  return {
    title: raw.title || fallbackTitle,
    summary:
      '这条新闻进入今天的 AI 观察范围，原因不在于它有多热闹，而在于它折射出了 AI 在产品、企业或社会层面的新变化。后续可以继续根据真实来源内容，把这段摘要再压得更像编辑稿。',
    source: raw.source || fallbackTitle,
    href: raw.href,
    publishedAt: raw.publishedAt,
  }
}

function generateEntry(targetDate) {
  const sections = queryGroups.map((group) => {
    const rss = fetchGoogleNewsRss(group.query)
    const parsed = parseItems(rss).slice(0, 2)
    return {
      key: group.key,
      title: group.title,
      items: parsed.map((item) => toChineseItem(item, group.title)),
    }
  })

  return {
    date: targetDate,
    slug: targetDate,
    title: '今日 AI 资讯：从产品路线到产业入口，AI 竞争正在变得更现实',
    summary:
      '今天的 AI 新闻已经不再只是“谁又发了一个更强的模型”，而是在同时指向产品取舍、平台入口、企业落地和就业压力这些更现实的问题。对普通读者来说，这种变化反而更值得看，因为它说明 AI 正在真正进入产业层面。',
    intro:
      '如果把今天分散的几条 AI 新闻放在一起看，会发现行业焦点正在明显变化：头部公司开始重新衡量产品路线，平台型公司重新思考入口，企业继续推进 AI 落地，而公众则越来越在意 AI 会怎样改变工作和组织。AI 这件事，已经越来越不像单纯的技术新闻了。',
    sections,
    closing:
      '一句话说，今天最值得关注的不是某个模型又强了多少，而是 AI 正在变成一场更现实的产业竞争：谁拿入口，谁有落地能力，谁能承受转型成本，接下来都会越来越清楚。',
    reminderSummary:
      '今日 AI 资讯：头部公司开始重排产品路线，平台入口之争和企业落地继续升温。',
    generatedAt: new Date().toISOString(),
  }
}

const targetDate = dateArg ? dateArg.slice('--date='.length) : getTodayUtcDateString()
const outputPath = path.join(dailyDir, `${targetDate}.json`)
const entry = generateEntry(targetDate)

fs.mkdirSync(dailyDir, { recursive: true })
fs.writeFileSync(outputPath, `${JSON.stringify(entry, null, 2)}\n`, 'utf8')

console.log(`Generated AI news JSON: ${path.relative(repoRoot, outputPath)}`)
console.log(`Title: ${entry.title}`)
console.log(`Reminder: ${entry.reminderSummary}`)
for (const section of entry.sections) {
  console.log(`${section.title}: ${section.items.length}`)
}
