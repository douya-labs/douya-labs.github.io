<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { getEntryBySlug } from '../data/ai-daily'
import { formatDateLabel, getSections, localizeSummary, localizeTitle } from '../data/news-editorial'

const route = useRoute()
const entry = computed(() => getEntryBySlug(String(route.params.slug || '')))
const sections = computed(() => (entry.value ? getSections(entry.value) : []))
</script>

<template>
  <div class="page-shell">
    <main class="news-layout" v-if="entry">
      <div class="detail-nav">
        <RouterLink class="detail-nav__link" to="/">← 返回今天首页</RouterLink>
      </div>

      <header class="news-hero news-hero--detail">
        <div>
          <p class="news-hero__eyebrow">往期 AI 资讯归档</p>
          <h1>{{ formatDateLabel(entry.date) }} AI 资讯</h1>
          <p class="news-hero__desc">{{ entry.summary }}</p>
        </div>
        <div class="news-hero__meta">
          <span class="news-badge">{{ entry.date }}</span>
          <span class="news-badge news-badge--soft">归档页</span>
        </div>
      </header>

      <section v-for="section in sections" :key="section.key" class="news-section">
        <div class="section-heading">
          <h3>{{ section.label }}</h3>
        </div>

        <article v-for="item in section.items" :key="item.title" class="news-article">
          <div class="news-article__main">
            <h4>{{ localizeTitle(item) }}</h4>
            <p>{{ localizeSummary(item) }}</p>
          </div>
          <div class="news-article__side">
            <span class="source-label">来源</span>
            <strong>{{ item.source }}</strong>
            <a v-if="item.href" :href="item.href" target="_blank" rel="noreferrer">打开原文 ↗</a>
          </div>
        </article>
      </section>

      <section class="editor-note">
        <h3>一句话总结</h3>
        <p>{{ entry.sproutNote }}</p>
      </section>
    </main>

    <main class="news-layout" v-else>
      <section class="daily-overview daily-overview--empty">
        <h2>这一天的归档没找到</h2>
        <p>你可以先回首页看今天的 AI 资讯。</p>
        <RouterLink class="detail-nav__link" to="/">返回首页</RouterLink>
      </section>
    </main>
  </div>
</template>
