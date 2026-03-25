<script setup lang="ts">
import { dailyEntries } from '../data/ai-daily'
</script>

<template>
  <div class="page-shell">
    <div class="bg-orb bg-orb--1" />
    <div class="bg-orb bg-orb--2" />
    <div class="bg-grid" />

    <main class="section detail-page">
      <div class="detail-nav">
        <RouterLink class="text-link" to="/">← 返回首页</RouterLink>
      </div>

      <section class="section__head section__head--tight">
        <p class="eyebrow">ARCHIVE</p>
        <h2>AI Daily archive</h2>
        <p>这里按日期收纳历史日报。首页只看汇总，完整内容从这里或首页入口点进去。</p>
      </section>

      <div class="archive-list">
        <article v-for="entry in dailyEntries" :key="entry.slug" class="archive-card">
          <div class="archive-card__meta">
            <span class="pill pill--soft">{{ entry.date }}</span>
            <span>{{ entry.title }}</span>
          </div>
          <p>{{ entry.summary }}</p>
          <small>{{ entry.sproutNote }}</small>
          <div class="card-actions">
            <RouterLink class="text-link" :to="`/daily/${entry.slug}`">查看详情 →</RouterLink>
          </div>
        </article>
      </div>
    </main>
  </div>
</template>
