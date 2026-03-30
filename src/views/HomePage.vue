<script setup lang="ts">
import { computed } from 'vue'
import { dailyEntries, todayEntry } from '../data/ai-daily'

const entry = computed(() => todayEntry)
const archives = computed(() => dailyEntries.slice(1, 15))

function formatDateLabel(date: string) {
  const [year, month, day] = date.split('-')
  return `${year} 年 ${Number(month)} 月 ${Number(day)} 日`
}
</script>

<template>
  <div class="page-shell">
    <main class="news-layout" v-if="entry">
      <header class="hero-card">
        <div>
          <p class="hero-card__eyebrow">AI 资讯</p>
          <h1>{{ entry.title }}</h1>
          <p class="hero-card__summary">{{ entry.summary }}</p>
        </div>
        <div class="hero-card__meta">
          <span class="badge">{{ formatDateLabel(entry.date) }}</span>
          <span class="badge badge--soft">每日更新</span>
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
        <h2>今日结语</h2>
        <p>{{ entry.closing }}</p>
      </section>

      <section v-if="archives.length" class="article-card">
        <div class="section-head">
          <h2>往期归档</h2>
          <p>首页只放今天，旧内容按天归档。</p>
        </div>
        <div class="archive-list">
          <RouterLink
            v-for="archive in archives"
            :key="archive.slug"
            class="archive-item"
            :to="`/daily/${archive.slug}`"
          >
            <strong>{{ formatDateLabel(archive.date) }}</strong>
            <span>{{ archive.summary }}</span>
          </RouterLink>
        </div>
      </section>
    </main>

    <main class="news-layout" v-else>
      <section class="article-card article-card--empty">
        <h2>今天的 AI 资讯还没生成</h2>
        <p>稍后再来看看。</p>
      </section>
    </main>
  </div>
</template>
