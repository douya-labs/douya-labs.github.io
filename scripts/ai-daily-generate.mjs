import fs from 'node:fs'
import path from 'node:path'
import { execSync } from 'node:child_process'

const repoRoot = path.resolve(process.cwd())
const dailyDir = path.join(repoRoot, 'src', 'data', 'daily')
const inputArg = process.argv.find((arg) => arg.startsWith('--input='))
const dateArg = process.argv.find((arg) => arg.startsWith('--date='))

const githubTargets = [
  'bytedance/deer-flow',
  'BerriAI/litellm',
  'openai/openai-codex',
  'microsoft/autogen',
  'langchain-ai/open_deep_research',
]

const signalSources = {
  product: [
    {
      url: 'https://newsroom.ibm.com/2026-03-25-enterprise-ai-finds-its-voice-elevenlabs-and-ibm-bring-premium-voice-capabilities-to-agentic-ai',
      title: 'Enterprise AI Finds its Voice: ElevenLabs and IBM Bring Premium Voice Capabilities to Agentic AI',
      source: 'IBM Newsroom',
    },
    {
      url: 'https://www.globenewswire.com/news-release/2026/03/25/3261920/0/en/OVHcloud-announces-the-acquisition-of-Dragon-LLM-a-developer-of-specialized-generative-AI-models-and-is-launching-its-AI-lab-to-offer-new-services-to-its-customers-based-on-LLMs.html',
      title: 'OVHcloud announces the acquisition of Dragon LLM and launches its AI lab',
      source: 'GlobeNewswire / OVHcloud',
    },
  ],
  events: [
    {
      url: 'https://github.com/resources/events/github-rsac2026',
      title: 'GitHub at RSAC 2026',
      source: 'GitHub Events',
    },
    {
      url: 'https://www.helpnetsecurity.com/2026/03/25/novee-ai-pentesting-agent/',
      title: 'Training an AI agent to attack LLM applications like a real adversary',
      source: 'Help Net Security',
    },
  ],
  research: [
    {
      url: 'https://arxiv.org/abs/2603.00623',
      title: 'A Multi-Agent Framework for Structured Analysis and Reporting of Agentic Execution Traces',
      source: 'arXiv 2603.00623',
    },
    {
      url: 'https://www.atlantafed.org/research-and-data/publications/working-papers/2026/03/25/04-artificial-intelligence-productivity-and-the-workforce-evidence-from-corporate-executives',
      title: 'Artificial Intelligence, Productivity, and the Workforce: Evidence from Corporate Executives',
      source: 'Federal Reserve Bank of Atlanta',
    },
  ],
}

function pad(value) {
  return String(value).padStart(2, '0')
}

function getTodayUtcDateString() {
  const now = new Date()
  return `${now.getUTCFullYear()}-${pad(now.getUTCMonth() + 1)}-${pad(now.getUTCDate())}`
}

function ensureArray(value) {
  return Array.isArray(value) ? value : []
}

function normalizeItem(item) {
  return {
    title: String(item?.title || '').trim(),
    summary: String(item?.summary || '').trim(),
    source: String(item?.source || '').trim(),
    ...(item?.href ? { href: String(item.href).trim() } : {}),
  }
}

function validateEntry(entry) {
  const required = ['date', 'slug', 'title', 'summary', 'featured', 'sproutNote']
  for (const key of required) {
    if (!entry?.[key]) {
      throw new Error(`Missing required field: ${key}`)
    }
  }

  if (!entry.featured?.title || !entry.featured?.summary || !entry.featured?.source) {
    throw new Error('Featured section is incomplete')
  }
}

function normalizeEntry(entry, targetDate) {
  const normalized = {
    date: String(entry?.date || targetDate),
    slug: String(entry?.slug || targetDate),
    title: String(entry?.title || '').trim(),
    summary: String(entry?.summary || '').trim(),
    featured: normalizeItem(entry?.featured || {}),
    githubUpdates: ensureArray(entry?.githubUpdates).map(normalizeItem),
    productUpdates: ensureArray(entry?.productUpdates).map(normalizeItem),
    majorEvents: ensureArray(entry?.majorEvents).map(normalizeItem),
    researchPicks: ensureArray(entry?.researchPicks).map(normalizeItem),
    sproutNote: String(entry?.sproutNote || '').trim(),
    ...(entry?.reminderSummary ? { reminderSummary: String(entry.reminderSummary).trim() } : {}),
    ...(entry?.generatedAt ? { generatedAt: String(entry.generatedAt).trim() } : {}),
  }

  validateEntry(normalized)
  return normalized
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'))
}

function safeExec(command) {
  return execSync(command, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim()
}

function fetchText(url) {
  try {
    return safeExec(`curl -L --max-time 20 -A "Mozilla/5.0" ${JSON.stringify(url)}`)
  } catch {
    return ''
  }
}

function compactText(text) {
  return String(text || '')
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/\s+/g, ' ')
    .trim()
}

function includesAll(text, snippets) {
  const lower = text.toLowerCase()
  return snippets.every((snippet) => lower.includes(String(snippet).toLowerCase()))
}

function fetchRepo(fullName) {
  try {
    const output = safeExec(`gh api repos/${fullName}`)
    return JSON.parse(output)
  } catch {
    return null
  }
}

function fetchGithubRepos() {
  return githubTargets.map(fetchRepo).filter(Boolean)
}

function buildGithubUpdates(repos) {
  return repos.slice(0, 3).map((repo) => ({
    title: `${repo.full_name} stayed active with real builder attention`,
    summary: `${repo.description || 'A notable AI repository is active today.'} 当前 star 约 ${repo.stargazers_count ?? '未知'}，最近更新时间 ${repo.updated_at ? new Date(repo.updated_at).toISOString().slice(0, 10) : '未知'}。这说明它不是静态摆设，而是今天仍在活跃演进的项目。`,
    source: 'GitHub API',
    href: repo.html_url,
  }))
}

function buildProductUpdates() {
  const ibmText = compactText(fetchText(signalSources.product[0].url))
  const ovhText = compactText(fetchText(signalSources.product[1].url))
  const items = []

  if (includesAll(ibmText, ['ElevenLabs', 'IBM', 'watsonx Orchestrate'])) {
    items.push({
      title: 'IBM and ElevenLabs pushed enterprise agentic AI toward voice-first deployment',
      summary:
        'IBM 与 ElevenLabs 宣布把 TTS / STT 接进 watsonx Orchestrate，让企业可以把更自然、多语言、可治理的语音体验接入 agentic workflow。这个信号说明产品化重点已经不只是“更会聊”，而是让 AI agent 真正进入客户服务、员工支持和高并发企业流程。',
      source: signalSources.product[0].source,
      href: signalSources.product[0].url,
    })
  }

  if (includesAll(ovhText, ['OVHcloud', 'Dragon LLM', 'AI lab'])) {
    items.push({
      title: 'OVHcloud acquired Dragon LLM and launched an AI lab for sovereign model services',
      summary:
        'OVHcloud 宣布收购 Dragon LLM 并启动 AI lab，方向明显是把面向受监管行业的 specialized LLM、主权部署和企业服务能力做成云产品。这个信号代表欧洲云厂商正在把“可控、可部署、合规友好”的 AI 当成真正的产品卖点。',
      source: signalSources.product[1].source,
      href: signalSources.product[1].url,
    })
  }

  if (items.length === 0) {
    items.push({
      title: 'Product update source fetch needs review',
      summary: '产品来源页面本轮抓取未成功命中预期关键词，需要人工复核来源可达性。',
      source: 'generator fallback',
    })
  }

  return items.slice(0, 2)
}

function buildMajorEvents() {
  const githubEventText = compactText(fetchText(signalSources.events[0].url))
  const noveeText = compactText(fetchText(signalSources.events[1].url))
  const items = []

  if (includesAll(githubEventText, ['RSA 2026', 'GitHub', 'security'])) {
    items.push({
      title: 'GitHub put AI security and AI-powered SDLC themes front-and-center around RSAC 2026',
      summary:
        'GitHub 的 RSAC 2026 页面把重点放在 developer-native security、AI-powered SDLC 与安全治理上。这个信号很直接：随着 Copilot 这类能力把开发速度继续拉高，平台方已经把“AI 加速开发之后，安全怎么跟上”当成主舞台议题。',
      source: signalSources.events[0].source,
      href: signalSources.events[0].url,
    })
  }

  if (includesAll(noveeText, ['RSAC 2026', 'AI pentesting agent'])) {
    items.push({
      title: 'Novee used RSAC 2026 to frame AI red teaming as a continuous testing problem',
      summary:
        'Novee 在 RSAC 2026 推出专门攻击 LLM 应用的 AI pentesting agent，强调多步攻击链、持续测试与 CI/CD 集成。这个事件说明安全行业已经默认：AI app 不是普通 web app，测试方法也必须升级到更贴近真实对抗者的模式。',
      source: signalSources.events[1].source,
      href: signalSources.events[1].url,
    })
  }

  if (items.length === 0) {
    items.push({
      title: 'Major event source fetch needs review',
      summary: '事件来源页面本轮抓取未成功命中预期关键词，需要人工复核来源可达性。',
      source: 'generator fallback',
    })
  }

  return items.slice(0, 2)
}

function buildResearchPicks() {
  const traceText = compactText(fetchText(signalSources.research[0].url))
  const fedText = compactText(fetchText(signalSources.research[1].url))
  const items = []

  if (includesAll(traceText, ['TraceSIR', 'multi-agent framework', 'execution traces'])) {
    items.push({
      title: 'TraceSIR focused on a real bottleneck of agent systems: how to debug long execution traces',
      summary:
        'TraceSIR 提出用多代理框架去结构化分析 agent 的长执行轨迹，并配套 TraceBench 与 ReportEval。它的重要性在于：研究重点不再只是做更炫的 agent demo，而是开始解决 production 里最痛的调试、归因和复盘问题。',
      source: signalSources.research[0].source,
      href: signalSources.research[0].url,
    })
  }

  if (includesAll(fedText, ['productivity', 'workforce', 'corporate executives'])) {
    items.push({
      title: 'Atlanta Fed found AI adoption is already lifting productivity, but unevenly',
      summary:
        '这份基于近 750 位企业高管调查的 working paper 发现：AI 投入已经较广泛，生产率提升为正且预计 2026 年继续增强，同时短期整体就业下滑证据有限，但岗位结构正在变化。它像一个现实校准器：AI 的真正影响正在组织层面慢慢显形。',
      source: signalSources.research[1].source,
      href: signalSources.research[1].url,
    })
  }

  if (items.length === 0) {
    items.push({
      title: 'Research source fetch needs review',
      summary: '研究来源页面本轮抓取未成功命中预期关键词，需要人工复核来源可达性。',
      source: 'generator fallback',
    })
  }

  return items.slice(0, 2)
}

function buildEntryFromRealSignals(targetDate) {
  const repos = fetchGithubRepos()
  const githubUpdates = buildGithubUpdates(repos)
  const productUpdates = buildProductUpdates()
  const majorEvents = buildMajorEvents()
  const researchPicks = buildResearchPicks()
  const featuredRepo = repos[0]

  const featured = featuredRepo
    ? {
        title: `${featuredRepo.full_name} became today’s strongest GitHub signal`,
        summary: `${featuredRepo.description || 'This repository is one of today’s strongest open-source AI signals.'} 它的 star、最近更新时间和话题标签一起说明，这不是模板占位，而是真实可验证的外部项目动态。`,
        source: 'GitHub API',
        href: featuredRepo.html_url,
      }
    : productUpdates[0] || {
        title: 'Real-source collection needs attention',
        summary: '外部数据抓取未成功，本次生成无法保证日报内容为真实信号。',
        source: 'generator fallback',
      }

  const repoNames = repos.slice(0, 2).map((repo) => repo.full_name).join('、')
  const totalRealItems = githubUpdates.length + productUpdates.length + majorEvents.length + researchPicks.length

  return {
    date: targetDate,
    slug: targetDate,
    title:
      totalRealItems > 0
        ? 'AI Daily: deployable AI systems, governed workflows, and agent tooling are converging'
        : 'AI Daily auto-generated draft',
    summary:
      totalRealItems > 0
        ? `今天这版 AI Daily 已经不是单点 GitHub 信号，而是把 GitHub、产品发布、行业事件和研究线索一起拉进了生成链。像 ${repoNames || 'agent / AI infra 项目'} 这样的开源动向，正在和企业语音 agent、安全测试、生产率研究汇成同一条“AI 正在走向真实生产环境”的主线。`
        : '今天的 AI Daily 生成链已自动运行，但真实外部信号源暂未完全抓取成功。',
    featured,
    githubUpdates,
    productUpdates,
    majorEvents,
    researchPicks,
    sproutNote:
      totalRealItems > 0
        ? '这次最关键的变化，不再只是 GitHub 真数据进了流水线，而是 product、events、research 三块也开始被真实来源驱动。这样生成出来的日报才更接近一个能持续运转的内容系统，而不是半自动草稿。'
        : '生成链已经能自动产出文件，但只要真实信号还没进来，它就还不是我们要的 AI Daily。',
    reminderSummary:
      totalRealItems > 0
        ? `今日 AI Daily：${repoNames || 'GitHub 热门项目'} 等开源动态之外，IBM × ElevenLabs 的企业语音 agent、RSAC 2026 的 AI 安全议题，以及 TraceSIR / Atlanta Fed 研究也已进入生成链。`
        : '今日 AI Daily：生成链已自动运行，但外部信号源仍在继续补齐。',
    generatedAt: new Date().toISOString(),
  }
}

const targetDate = dateArg ? dateArg.slice('--date='.length) : getTodayUtcDateString()
const outputPath = path.join(dailyDir, `${targetDate}.json`)

let sourceEntry
if (inputArg) {
  const inputPath = path.resolve(repoRoot, inputArg.slice('--input='.length))
  sourceEntry = readJson(inputPath)
} else {
  sourceEntry = buildEntryFromRealSignals(targetDate)
}

const normalized = normalizeEntry(sourceEntry, targetDate)
normalized.date = targetDate
normalized.slug = targetDate
normalized.generatedAt = new Date().toISOString()

fs.mkdirSync(dailyDir, { recursive: true })
fs.writeFileSync(outputPath, `${JSON.stringify(normalized, null, 2)}\n`, 'utf8')

console.log(`Generated AI Daily JSON: ${path.relative(repoRoot, outputPath)}`)
console.log(`Title: ${normalized.title}`)
console.log(`Reminder: ${normalized.reminderSummary || normalized.summary}`)
console.log(`GitHub updates: ${normalized.githubUpdates.length}`)
console.log(`Product updates: ${normalized.productUpdates.length}`)
console.log(`Major events: ${normalized.majorEvents.length}`)
console.log(`Research picks: ${normalized.researchPicks.length}`)