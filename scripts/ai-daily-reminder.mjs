import fs from 'node:fs'
import path from 'node:path'

const repoRoot = path.resolve(process.cwd())
const dailyDir = path.join(repoRoot, 'src', 'data', 'daily')

const files = fs
  .readdirSync(dailyDir)
  .filter((name) => name.endsWith('.json'))
  .sort()

if (files.length === 0) {
  console.log('AI Daily 已准备好，查看首页： https://douya-labs.github.io/')
  process.exit(0)
}

const latestFile = files[files.length - 1]
const latestPath = path.join(dailyDir, latestFile)
const entry = JSON.parse(fs.readFileSync(latestPath, 'utf8'))

const dailyUrl = entry?.slug
  ? `https://douya-labs.github.io/#/daily/${entry.slug}`
  : 'https://douya-labs.github.io/'

const summary = entry?.reminderSummary || entry?.summary || '今日 AI Daily 已更新。'

console.log(`🌱 AI Daily 已更新：${summary}\n${dailyUrl}`)
