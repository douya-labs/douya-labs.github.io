<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { getDailyEntryBySlug, getFeedItemBySlug, getRelatedItems } from '../data/ai-feed'

const route = useRoute()

const item = computed(() => getFeedItemBySlug(String(route.params.slug || '')))
const dailyEntry = computed(() => {
  if (!item.value) return undefined
  return getDailyEntryBySlug(item.value.dailySlug)
})
const relatedItems = computed(() => {
  if (!item.value) return []
  return getRelatedItems(item.value, 4)
})
</script>

<template>
  <div class="page-shell">
    <main class="layout detail-layout" v-if="item && dailyEntry">
      <div class="detail-nav">
        <RouterLink class="text-link" to="/">← 返回首页</RouterLink>
        <a v-if="item.href" class="text-link" :href="item.href" target="_blank" rel="noreferrer">
          查看原始来源 ↗
        </a>
      </div>

      <article class="detail-card">
        <div class="detail-card__meta">
          <span class="pill">{{ item.date }}</span>
          <span class="pill pill--soft">{{ item.categoryLabel }}</span>
        </div>
        <p class="eyebrow">AI DAILY DETAIL</p>
        <h1>{{ item.title }}</h1>
        <p class="detail-card__summary">{{ item.summary }}</p>

        <div class="detail-blocks">
          <section class="detail-block">
            <h2>为什么值得看</h2>
            <p>{{ item.highlight }}</p>
          </section>

          <section class="detail-block">
            <h2>来源</h2>
            <p>{{ item.source }}</p>
          </section>

          <section class="detail-block">
            <h2>所属日报</h2>
            <p>{{ dailyEntry.title }}</p>
            <p class="detail-block__sub">{{ dailyEntry.summary }}</p>
          </section>

          <section class="detail-block">
            <h2>豆芽备注</h2>
            <p>{{ dailyEntry.sproutNote }}</p>
          </section>
        </div>
      </article>

      <section class="related-section" v-if="relatedItems.length">
        <div class="section-head section-head--detail">
          <div>
            <p class="eyebrow">MORE FROM THE SAME DAY</p>
            <h2>同一天还发生了什么</h2>
          </div>
        </div>

        <div class="related-list">
          <RouterLink
            v-for="related in relatedItems"
            :key="related.slug"
            class="related-card"
            :to="`/item/${related.slug}`"
          >
            <div class="feed-card__meta">
              <span class="pill pill--soft">{{ related.categoryLabel }}</span>
            </div>
            <h3>{{ related.title }}</h3>
            <p>{{ related.summary }}</p>
          </RouterLink>
        </div>
      </section>
    </main>

    <main class="layout detail-layout" v-else>
      <div class="detail-nav">
        <RouterLink class="text-link" to="/">← 返回首页</RouterLink>
      </div>

      <article class="detail-card detail-card--empty">
        <p class="eyebrow">NOT FOUND</p>
        <h1>这条内容没找到</h1>
        <p class="detail-card__summary">可能链接已经失效，或者这条内容还没有生成出来。</p>
      </article>
    </main>
  </div>
</template>
