<script setup lang="ts">
import { computed } from 'vue'
import {
  formatDateLabel,
  getArchiveEntries,
  getSections,
  getTodayEntry,
  localizeSummary,
  localizeTitle,
} from '../data/news-editorial'

const entry = computed(() => getTodayEntry())
const sections = computed(() => (entry.value ? getSections(entry.value) : []))
const archives = computed(() => getArchiveEntries(12))
</script>

<template>
  <div class="page-shell">
    <main class="news-layout" v-if="entry">
      <header class="news-hero">
        <div>
          <p class="news-hero__eyebrow">AI 资讯日报</p>
          <h1>今天 AI 圈里值得看的事，都放在这里了。</h1>
          <p class="news-hero__desc">
            不再拆成很多碎页面。首页直接把当天新闻摊开，尽量用中文写清楚，方便你快速读完。
          </p>
        </div>
        <div class="news-hero__meta">
          <span class="news-badge">{{ formatDateLabel(entry.date) }}</span>
          <span class="news-badge news-badge--soft">今日更新</span>
        </div>
      </header>

      <section class="daily-overview">
        <h2>{{ formatDateLabel(entry.date) }} AI 资讯</h2>
        <p>{{ entry.summary }}</p>
      </section>

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

      <section class="archive-section" v-if="archives.length">
        <div class="section-heading">
          <h3>往期日报</h3>
          <p>详情页只保留按天归档，想回看再点进去。</p>
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
      <section class="daily-overview daily-overview--empty">
        <h2>今天的 AI 资讯还没准备好</h2>
        <p>稍后再来看看。</p>
      </section>
    </main>
  </div>
</template>
