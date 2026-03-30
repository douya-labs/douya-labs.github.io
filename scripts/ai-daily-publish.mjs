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
run('git add -A')

const latestFile = output("ls src/data/daily/*.json | sort | tail -n 1 | xargs -n 1 basename")
const commitMessage = `chore: update AI Daily ${latestFile.replace('.json', '')}`

try {
  run(`git commit -m \"${commitMessage}\"`)
} catch (error) {
  const postAddStatus = output('git status --short')
  if (!postAddStatus) {
    console.log('Nothing new to commit after staging.')
    process.exit(0)
  }
  throw error
}

const targetBranch = process.env.GITHUB_REF_NAME || 'main'
run(`git push origin HEAD:${targetBranch}`)
console.log('Publish complete.')
