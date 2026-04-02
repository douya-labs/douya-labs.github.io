<script setup lang="ts">
import { computed } from 'vue'
import { dailyEntries, todayEntry, type NewsSection } from '../data/ai-daily'

const entry = computed(() => todayEntry)
const archives = computed(() => dailyEntries.slice(1, 15))

function fmtDate(date: string) {
  const [, m, d] = date.split('-')
  return `${m}.${d}`
}

function fmtDateFull(date: string) {
  const [y, m, d] = date.split('-')
  return `${y} 年 ${Number(m)} 月 ${Number(d)} 日`
}

function fmtTime(v?: string) {
  if (!v) return '今日整理'
  return new Intl.DateTimeFormat('zh-CN', {
    month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit',
    hour12: false, timeZone: 'Asia/Shanghai',
  }).format(new Date(v))
}

function sectionIcon(s: NewsSection) {
  return ({ top: '✦', company: '◉', view: '↗' } as Record<string,string>)[s.key] || '•'
}
function sectionKicker(s: NewsSection) {
  return ({ top: 'TOP STORY', company: 'MARKET MOVE', view: 'WHAT IT MEANS' } as Record<string,string>)[s.key] || 'AI DAILY'
}
function sectionHint(s: NewsSection) {
  return ({ top: '今天最值得先看的大新闻。', company: '公司动作、产业信号和组织变化。', view: '把零散新闻连成一个趋势判断。' } as Record<string,string>)[s.key] || '今天的 AI 观察切片。'
}
function sourceClass(s: NewsSection) {
  if (s.key === 'company') return 'news-card__source--company'
  if (s.key === 'view') return 'news-card__source--view'
  return ''
}
function iconClass(s: NewsSection) {
  if (s.key === 'company') return 'news-section__icon--company'
  if (s.key === 'view') return 'news-section__icon--view'
  return ''
}
</script>

<template>
  <div class="page-container" v-if="entry">
    <!-- Hero -->
    <section class="hero fade-in">
      <div class="hero__date">{{ fmtDate(entry.date) }}</div>
      <h1 class="hero__title">{{ entry.title }}</h1>
      <p class="hero__summary">{{ entry.summary }}</p>
      <div class="hero__badge-row">
        <span class="badge badge--accent">{{ fmtDateFull(entry.date) }}</span>
        <span class="badge">每日更新</span>
        <span class="badge">AI DAILY · DOUYA LABS</span>
      </div>
    </section>

    <hr class="gradient-line" />

    <!-- Intro -->
    <section class="intro-card glass-card glass-card--glow fade-in fade-in-delay-1">
      <p class="section-label">编辑导读</p>
      <h2 class="section-title">今天值得看什么？</h2>
      <p class="intro-card__text">{{ entry.intro }}</p>
    </section>

    <hr class="gradient-line" />

    <!-- News Sections -->
    <section v-for="section in entry.sections" :key="section.key" class="news-section fade-in fade-in-delay-2">
      <div class="news-section__header">
        <div :class="['news-section__icon', iconClass(section)]">{{ sectionIcon(section) }}</div>
        <div>
          <p class="section-label">{{ sectionKicker(section) }}</p>
          <h2 class="section-title">{{ section.title }}</h2>
        </div>
      </div>
      <p class="section-hint">{{ sectionHint(section) }}</p>

      <div v-for="item in section.items" :key="item.title" class="news-card">
        <div class="glass-card glass-card--glow">
          <span :class="['news-card__source', sourceClass(section)]">{{ item.source }}</span>
          <h3 class="news-card__title">{{ item.title }}</h3>
          <p class="news-card__summary">{{ item.summary }}</p>
          <div class="news-card__footer">
            <span class="news-card__time">{{ fmtTime(item.publishedAt) }}</span>
            <a :href="item.href" target="_blank" rel="noreferrer" class="news-card__link">查看原文 ↗</a>
          </div>
        </div>
      </div>

      <hr class="gradient-line" />
    </section>

    <!-- Closing -->
    <section class="closing-card glass-card glass-card--glow fade-in fade-in-delay-3">
      <p class="section-label">编辑结语</p>
      <h2 class="section-title">今天的判断</h2>
      <p class="closing-card__text">{{ entry.closing }}</p>
    </section>

    <hr class="gradient-line" />

    <!-- Archive -->
    <section v-if="archives.length" class="archive-section fade-in fade-in-delay-3">
      <p class="section-label">ARCHIVE</p>
      <h2 class="section-title">往期归档</h2>
      <p class="section-hint">首页放今天，旧内容做成可回看的 AI 每日杂志。</p>
      <div class="archive-grid">
        <RouterLink v-for="a in archives" :key="a.slug" :to="`/daily/${a.slug}`" class="archive-item">
          <div class="glass-card">
            <div class="archive-item__date">{{ fmtDate(a.date) }} — {{ fmtDateFull(a.date) }}</div>
            <div class="archive-item__summary">{{ a.summary }}</div>
          </div>
        </RouterLink>
      </div>
    </section>

    <footer class="site-footer">
      <p>Douya Labs · AI 资讯日报</p>
    </footer>
  </div>

  <div class="page-container" v-else>
    <section class="hero fade-in">
      <h1 class="hero__title">今天的 AI 资讯还没生成</h1>
      <p class="hero__summary">稍后再来看看。</p>
    </section>
  </div>
</template>
