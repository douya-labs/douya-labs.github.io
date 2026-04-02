<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { getEntryBySlug, type NewsSection } from '../data/ai-daily'

const route = useRoute()
const entry = computed(() => getEntryBySlug(String(route.params.slug || '')))

function fmtDate(date: string) {
  const [, m, d] = date.split('-')
  return `${m}.${d}`
}
function fmtDateFull(date: string) {
  const [y, m, d] = date.split('-')
  return `${y} 年 ${Number(m)} 月 ${Number(d)} 日`
}
function fmtTime(v?: string) {
  if (!v) return '当日整理'
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
  return ({ top: '这一天最值得先看的核心头条。', company: '公司、组织和产业层的变化。', view: '把当天消息串起来看趋势。' } as Record<string,string>)[s.key] || '这一天的 AI 观察切片。'
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
    <RouterLink to="/" class="back-link">← 返回首页</RouterLink>

    <section class="hero fade-in">
      <div class="hero__date">{{ fmtDate(entry.date) }}</div>
      <h1 class="hero__title">{{ entry.title }}</h1>
      <p class="hero__summary">{{ entry.summary }}</p>
      <div class="hero__badge-row">
        <span class="badge badge--accent">{{ fmtDateFull(entry.date) }}</span>
        <span class="badge">归档页面</span>
      </div>
    </section>

    <hr class="gradient-line" />

    <section class="intro-card glass-card glass-card--glow fade-in fade-in-delay-1">
      <p class="section-label">当日导读</p>
      <h2 class="section-title">这一天的全局判断</h2>
      <p class="intro-card__text">{{ entry.intro }}</p>
    </section>

    <hr class="gradient-line" />

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

    <section class="closing-card glass-card glass-card--glow fade-in fade-in-delay-3">
      <p class="section-label">当日结语</p>
      <h2 class="section-title">当天的判断</h2>
      <p class="closing-card__text">{{ entry.closing }}</p>
    </section>

    <footer class="site-footer">
      <p>Douya Labs · AI 资讯日报</p>
    </footer>
  </div>

  <div class="page-container" v-else>
    <section class="hero fade-in">
      <h1 class="hero__title">这一天的 AI 资讯没找到</h1>
      <p class="hero__summary">你可以先回首页看今天的内容。</p>
      <RouterLink to="/" class="back-link" style="margin-top: 24px;">返回首页</RouterLink>
    </section>
  </div>
</template>
