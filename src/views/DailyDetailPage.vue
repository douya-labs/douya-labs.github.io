<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { getEntryBySlug } from '../data/ai-daily'

const route = useRoute()
const entry = computed(() => getEntryBySlug(String(route.params.slug || '')))

function formatDateLabel(date: string) {
  const [year, month, day] = date.split('-')
  return `${year} 年 ${Number(month)} 月 ${Number(day)} 日`
}
</script>

<template>
  <div class="page-shell">
    <main class="news-layout" v-if="entry">
      <div class="detail-nav">
        <RouterLink class="detail-nav__link" to="/">← 返回首页</RouterLink>
      </div>

      <header class="hero-card">
        <div>
          <p class="hero-card__eyebrow">AI 资讯归档</p>
          <h1>{{ entry.title }}</h1>
          <p class="hero-card__summary">{{ entry.summary }}</p>
        </div>
        <div class="hero-card__meta">
          <span class="badge">{{ formatDateLabel(entry.date) }}</span>
          <span class="badge badge--soft">按天归档</span>
        </div>
      </header>

      <section class="article-card">
        <p class="article-card__intro">{{ entry.intro }}</p>
      </section>

      <section v-for="section in entry.sections" :key="section.key" class="article-card">
        <div class="section-head">
          <h2>{{ section.title }}</h2>
        </div>

        <article v-for="item in section.items" :key="item.title" class="news-item">
          <div class="news-item__main">
            <h3>{{ item.title }}</h3>
            <p>{{ item.summary }}</p>
          </div>
          <div class="news-item__side">
            <span>来源</span>
            <strong>{{ item.source }}</strong>
            <a :href="item.href" target="_blank" rel="noreferrer">查看原文 ↗</a>
          </div>
        </article>
      </section>

      <section class="article-card article-card--closing">
        <h2>当日结语</h2>
        <p>{{ entry.closing }}</p>
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
