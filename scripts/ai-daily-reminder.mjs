import fs from 'node:fs'
import path from 'node:path'

const repoRoot = path.resolve(process.cwd())
const dailyDir = path.join(repoRoot, 'src', 'data', 'daily')

const files = fs
  .readdirSync(dailyDir)
  .filter((name) => name.endsWith('.json'))
  .sort()

if (files.length === 0) {
  console.log('AI 资讯已准备好： https://douya-labs.github.io/')
  process.exit(0)
}

const latestFile = files[files.length - 1]
const latestPath = path.join(dailyDir, latestFile)
const entry = JSON.parse(fs.readFileSync(latestPath, 'utf8'))

const dailyUrl = 'https://douya-labs.github.io/'
const summary = String(entry?.reminderSummary || entry?.summary || '今日 AI 资讯已更新。')
  .replace(/^今日 AI Daily：/, '今日 AI 资讯：')
  .replace(/agent/g, '智能体')

console.log(`🌱 ${summary}\n${dailyUrl}`)
