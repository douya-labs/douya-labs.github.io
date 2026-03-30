<script setup lang="ts">
import { computed } from 'vue'
import { feedItems, getFeedSummary } from '../data/ai-feed'

const summary = computed(() => getFeedSummary())
const latestItems = computed(() => feedItems)
</script>

<template>
  <div class="page-shell">
    <main class="layout">
      <section class="hero-card">
        <div class="hero-card__copy">
          <p class="eyebrow">AI DAILY FEED</p>
          <h1>每天看一眼 AI 圈，先抓住真正有意思的事。</h1>
          <p class="hero-card__desc">
            现在首页不再是项目展示，而是一个可日刷的 AI 信息流。你每天打开首页，直接看列表；想展开的时候，再点进详情页。
          </p>
        </div>

        <div class="hero-card__stats">
          <div class="hero-stat">
            <span>最新日期</span>
            <strong>{{ summary.latestDate || '—' }}</strong>
          </div>
          <div class="hero-stat">
            <span>已整理内容</span>
            <strong>{{ summary.totalItems }} 条</strong>
          </div>
          <div class="hero-stat">
            <span>覆盖天数</span>
            <strong>{{ summary.totalDays }} 天</strong>
          </div>
        </div>
      </section>

      <section class="feed-section">
        <div class="section-head">
          <div>
            <p class="eyebrow">TODAY & RECENT</p>
            <h2>首页列表</h2>
          </div>
          <p class="section-head__hint">按时间倒序，直接刷；看到感兴趣的再进详情。</p>
        </div>

        <div class="feed-list">
          <RouterLink
            v-for="item in latestItems"
            :key="item.slug"
            class="feed-card"
            :to="`/item/${item.slug}`"
          >
            <div class="feed-card__meta">
              <span class="pill">{{ item.date }}</span>
              <span class="pill pill--soft">{{ item.categoryLabel }}</span>
            </div>
            <h3>{{ item.title }}</h3>
            <p class="feed-card__summary">{{ item.summary }}</p>
            <div class="feed-card__footer">
              <span>{{ item.dailyTitle }}</span>
              <span>查看详情 →</span>
            </div>
          </RouterLink>
        </div>
      </section>
    </main>
  </div>
</template>
