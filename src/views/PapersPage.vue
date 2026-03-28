<script setup lang="ts">
import { llmPaperCategories, llmPapersMeta } from '../data/llm-papers'
</script>

<template>
  <div class="page-shell">
    <div class="bg-orb bg-orb--1" />
    <div class="bg-orb bg-orb--2" />
    <div class="bg-grid" />

    <main class="section detail-page papers-page">
      <div class="detail-nav">
        <RouterLink class="text-link" to="/">← 返回首页</RouterLink>
        <RouterLink class="text-link" to="/archive">查看日报归档</RouterLink>
      </div>

      <section class="section__head section__head--tight">
        <p class="eyebrow">LATEST LLM PAPERS</p>
        <h2>{{ llmPapersMeta.title }}</h2>
        <p>{{ llmPapersMeta.subtitle }}</p>
        <div class="hero-highlights papers-highlights">
          <span class="hero-highlights__item">更新时间 · {{ llmPapersMeta.updatedAt }}</span>
          <span class="hero-highlights__item">16 papers</span>
          <span class="hero-highlights__item">4 tracks</span>
        </div>
      </section>

      <article class="archive-summary papers-summary-card">
        <p>{{ llmPapersMeta.note }}</p>
      </article>

      <section
        v-for="category in llmPaperCategories"
        :key="category.key"
        class="section section--tight papers-category"
      >
        <div class="section__head section__head--tight">
          <p class="eyebrow">TRACK</p>
          <h2>{{ category.title }}</h2>
          <p>{{ category.description }}</p>
        </div>

        <div class="paper-grid">
          <article v-for="paper in category.papers" :key="paper.title" class="paper-card">
            <div class="archive-card__meta">
              <span class="pill pill--soft">{{ paper.announced }}</span>
              <span class="pill">{{ category.key }}</span>
            </div>
            <h3>{{ paper.title }}</h3>
            <p>{{ paper.summary }}</p>
            <div class="paper-card__why">
              <strong>为什么值得看</strong>
              <p>{{ paper.whyItMatters }}</p>
            </div>
            <div class="paper-card__footer">
              <span class="source">{{ paper.source }}</span>
              <a class="text-link" :href="paper.href" target="_blank" rel="noreferrer">
                打开论文入口 ↗
              </a>
            </div>
          </article>
        </div>
      </section>
    </main>
  </div>
</template>
