<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { getEntryBySlug } from '../data/ai-daily'

const route = useRoute()

const entry = computed(() => getEntryBySlug(String(route.params.slug || '')))

const sections = computed(() => {
  if (!entry.value) return []

  return [
    { eyebrow: 'GITHUB', title: 'GitHub updates', items: entry.value.githubUpdates },
    { eyebrow: 'PRODUCT', title: 'Product updates', items: entry.value.productUpdates },
    { eyebrow: 'EVENTS', title: 'Major events', items: entry.value.majorEvents },
    { eyebrow: 'RESEARCH', title: 'Research picks', items: entry.value.researchPicks },
  ]
})
</script>

<template>
  <div class="page-shell">
    <div class="bg-orb bg-orb--1" />
    <div class="bg-orb bg-orb--2" />
    <div class="bg-grid" />

    <main class="section detail-page" v-if="entry">
      <div class="detail-nav">
        <RouterLink class="text-link" to="/">← 返回首页</RouterLink>
        <RouterLink class="text-link" to="/archive">查看历史</RouterLink>
      </div>

      <section class="section__head section__head--tight">
        <p class="eyebrow">DAILY DETAIL</p>
        <h2>{{ entry.title }}</h2>
        <p>{{ entry.summary }}</p>
      </section>

      <article class="daily-feature">
        <div class="daily-feature__meta">
          <span class="pill">{{ entry.date }}</span>
          <span class="pill pill--soft">Featured</span>
        </div>
        <h3>{{ entry.featured.title }}</h3>
        <p>{{ entry.featured.summary }}</p>
        <span class="source">Source · {{ entry.featured.source }}</span>
      </article>

      <div class="daily-sections detail-sections">
        <section v-for="section in sections" :key="section.title" class="daily-section-card">
          <div class="daily-card__head">
            <p class="eyebrow">{{ section.eyebrow }}</p>
            <h3>{{ section.title }}</h3>
          </div>
          <ul class="daily-list">
            <li v-for="item in section.items" :key="item.title">
              <strong>{{ item.title }}</strong>
              <p>{{ item.summary }}</p>
            </li>
          </ul>
        </section>
      </div>

      <article class="sprout-note">
        <p class="eyebrow">SPROUT NOTE</p>
        <p>{{ entry.sproutNote }}</p>
      </article>
    </main>

    <main class="section detail-page" v-else>
      <div class="detail-nav">
        <RouterLink class="text-link" to="/">← 返回首页</RouterLink>
      </div>
      <section class="daily-feature">
        <h3>这一天的日报还没找到</h3>
        <p>你可以先回首页，或者去历史页看看别的日期。</p>
      </section>
    </main>
  </div>
</template>
