<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { getEntryBySlug, type NewsItem, type NewsSection } from '../data/ai-daily'

const route = useRoute()
const entry = computed(() => getEntryBySlug(String(route.params.slug || '')))

function formatDateLabel(date: string) {
  const [year, month, day] = date.split('-')
  return `${year} 年 ${Number(month)} 月 ${Number(day)} 日`
}

function formatPublishedAt(value?: string) {
  if (!value) return '当日整理'

  return new Intl.DateTimeFormat('zh-CN', {
    month: 'numeric',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'Asia/Shanghai',
  }).format(new Date(value))
}

function getSectionKicker(section: NewsSection) {
  const map: Record<string, string> = {
    top: 'TOP STORY',
    company: 'MARKET MOVE',
    view: 'WHAT IT MEANS',
  }
  return map[section.key] || 'AI DAILY'
}

function getSectionIcon(section: NewsSection) {
  const map: Record<string, string> = {
    top: '✦',
    company: '◉',
    view: '↗',
  }
  return map[section.key] || '•'
}

function getSectionHint(section: NewsSection) {
  const map: Record<string, string> = {
    top: '这一天最值得先看的核心头条。',
    company: '公司、组织和产业层的变化。',
    view: '把当天消息串起来看趋势。',
  }
  return map[section.key] || '这一天的 AI 观察切片。'
}

function getCoverStyle(seed: string, index = 0) {
  const styles = {
    top: [
      'linear-gradient(135deg, #2563eb 0%, #7c3aed 55%, #0f172a 100%)',
      'linear-gradient(135deg, #0f172a 0%, #1d4ed8 45%, #06b6d4 100%)',
    ],
    company: [
      'linear-gradient(135deg, #0f766e 0%, #14b8a6 45%, #99f6e4 100%)',
      'linear-gradient(135deg, #14532d 0%, #22c55e 45%, #86efac 100%)',
    ],
    view: [
      'linear-gradient(135deg, #7c2d12 0%, #ea580c 45%, #fdba74 100%)',
      'linear-gradient(135deg, #4c1d95 0%, #9333ea 48%, #f0abfc 100%)',
    ],
    default: [
      'linear-gradient(135deg, #1f2937 0%, #4f46e5 45%, #93c5fd 100%)',
      'linear-gradient(135deg, #0f172a 0%, #334155 45%, #94a3b8 100%)',
    ],
  }

  const palette = styles[seed as keyof typeof styles] || styles.default
  return {
    background: palette[index % palette.length],
  }
}

function getCoverLabel(item: NewsItem) {
  if (/OpenAI/i.test(item.title)) return 'OPENAI'
  if (/Apple/i.test(item.title)) return 'APPLE'
  if (/Microsoft/i.test(item.title)) return 'MSFT'
  if (/AI/i.test(item.title)) return 'AI'
  return item.source.slice(0, 12).toUpperCase()
}
</script>

<template>
  <div class="page-shell">
    <main class="news-layout" v-if="entry">
      <div class="detail-nav">
        <RouterLink class="detail-nav__link" to="/">← 返回首页</RouterLink>
      </div>

      <header class="hero-card hero-card--glow">
        <div class="hero-card__main">
          <p class="hero-card__eyebrow">AI DAILY ARCHIVE</p>
          <h1>{{ entry.title }}</h1>
          <p class="hero-card__summary">{{ entry.summary }}</p>

          <div class="hero-card__chips">
            <span class="badge">{{ formatDateLabel(entry.date) }}</span>
            <span class="badge badge--soft">归档页面</span>
          </div>
        </div>

        <aside class="hero-panel">
          <div class="hero-panel__meter">
            <span>归档视图</span>
            <strong>{{ entry.sections.length }} 个板块</strong>
          </div>
          <div class="hero-panel__list">
            <article v-for="section in entry.sections" :key="section.key" class="hero-brief">
              <span>{{ getSectionIcon(section) }} {{ getSectionKicker(section) }}</span>
              <strong>{{ section.items[0]?.title || section.title }}</strong>
            </article>
          </div>
        </aside>
      </header>

      <section class="article-card article-card--intro">
        <div class="section-head section-head--stacked">
          <div>
            <p class="section-kicker">当日导读</p>
            <h2>这一天的全局判断</h2>
          </div>
          <p>{{ entry.intro }}</p>
        </div>
      </section>

      <section v-for="section in entry.sections" :key="section.key" class="article-card article-card--section">
        <div class="section-head section-head--stacked section-head--section">
          <div>
            <p class="section-kicker">{{ getSectionIcon(section) }} {{ getSectionKicker(section) }}</p>
            <h2>{{ section.title }}</h2>
          </div>
          <p>{{ getSectionHint(section) }}</p>
        </div>

        <div class="section-showcase" v-if="section.items.length">
          <article class="news-card news-card--feature">
            <div class="news-card__cover" :style="getCoverStyle(section.key, 0)">
              <span class="news-card__cover-chip">{{ section.title }}</span>
              <span class="news-card__cover-watermark">{{ getCoverLabel(section.items[0]) }}</span>
              <div class="news-card__cover-copy">
                <strong>{{ section.items[0].source }}</strong>
                <h3>{{ section.items[0].title }}</h3>
              </div>
            </div>

            <div class="news-card__body">
              <div class="news-card__meta-row">
                <span>{{ formatPublishedAt(section.items[0].publishedAt) }}</span>
                <span>归档重点</span>
              </div>
              <p>{{ section.items[0].summary }}</p>
              <a :href="section.items[0].href" target="_blank" rel="noreferrer">查看原文 ↗</a>
            </div>
          </article>

          <div class="news-card-grid" v-if="section.items.slice(1).length">
            <article
              v-for="(item, index) in section.items.slice(1)"
              :key="item.title"
              class="news-card news-card--compact"
            >
              <div class="news-card__mini-cover" :style="getCoverStyle(section.key, index + 1)">
                <span>{{ getCoverLabel(item) }}</span>
              </div>
              <div class="news-card__body">
                <div class="news-card__meta-row">
                  <span>{{ item.source }}</span>
                  <span>{{ formatPublishedAt(item.publishedAt) }}</span>
                </div>
                <h3>{{ item.title }}</h3>
                <p>{{ item.summary }}</p>
                <a :href="item.href" target="_blank" rel="noreferrer">查看原文 ↗</a>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section class="article-card article-card--closing">
        <div class="section-head section-head--stacked">
          <div>
            <p class="section-kicker">ARCHIVE NOTE</p>
            <h2>当日结语</h2>
          </div>
          <p>{{ entry.closing }}</p>
        </div>
      </section>
    </main>

    <main class="news-layout" v-else>
      <section class="article-card article-card--empty">
        <h2>这一天的 AI 资讯没找到</h2>
        <p>你可以先回首页看今天的内容。</p>
        <RouterLink class="detail-nav__link" to="/">返回首页</RouterLink>
      </section>
    </main>
  </div>
</template>
