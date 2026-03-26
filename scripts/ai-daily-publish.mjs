import { execSync } from 'node:child_process'

function run(command, options = {}) {
  execSync(command, {
    stdio: 'inherit',
    ...options,
  })
}

function output(command) {
  return execSync(command, { encoding: 'utf8' }).trim()
}

const status = output('git status --short')
if (!status) {
  console.log('No changes to publish.')
  process.exit(0)
}

run('npm run ai-daily:build')
run('git add AI_DAILY_PLAN.md package.json README_AI_DAILY_AUTOMATION.md scripts src/data src/views/HomePage.vue tsconfig.app.json')

const commitMessage = `chore: update AI Daily automation and content`

try {
  run(`git commit -m "${commitMessage}"`)
} catch (error) {
  const postAddStatus = output('git status --short')
  if (!postAddStatus) {
    console.log('Nothing new to commit after staging.')
    process.exit(0)
  }
  throw error
}

run('git push origin main')
console.log('Publish complete.')
