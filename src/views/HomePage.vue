<script setup lang="ts">
import { dailyEntries, todayEntry } from '../data/ai-daily'

const recentEntries = dailyEntries.slice(0, 4)

const highlights = [
  'Daily AI briefing',
  'Mobile-first reading',
  '09:00 bot reminder',
]
</script>

<template>
  <div class="page-shell">
    <div class="bg-orb bg-orb--1" />
    <div class="bg-orb bg-orb--2" />
    <div class="bg-grid" />

    <header class="hero hero--home">
      <nav class="topbar">
        <div class="brand">
          <span class="brand__dot">🌱</span>
          <span>douya-labs</span>
        </div>
        <div class="topbar__hint">ai daily × bot × web</div>
      </nav>

      <section class="hero-home">
        <div class="hero-home__copy">
          <p class="eyebrow">AI DAILY HOME</p>
          <h1>每天把 AI 世界里真正值得看的东西，整理成一页。</h1>
          <p class="hero__desc">
            首页只保留简洁概览，真正的日报内容放进单独详情页里。
            你早上打开时，先看到今天值不值得点开；想深看，再进入当天 Daily。
          </p>

          <div class="hero__actions">
            <RouterLink class="button button--primary" :to="`/daily/${todayEntry.slug}`">
              打开今日详情
            </RouterLink>
            <RouterLink class="button button--ghost" to="/archive">
              浏览历史
            </RouterLink>
          </div>

          <div class="hero-highlights">
            <span v-for="item in highlights" :key="item" class="hero-highlights__item">
              {{ item }}
            </span>
          </div>
        </div>

        <div class="hero-panel">
          <div class="hero-panel__badge">Today</div>
          <p class="hero-panel__date">{{ todayEntry.date }}</p>
          <h2>{{ todayEntry.title }}</h2>
          <p>{{ todayEntry.summary }}</p>
          <div class="hero-panel__divider" />
          <strong>{{ todayEntry.featured.title }}</strong>
          <span>{{ todayEntry.featured.summary }}</span>
        </div>
      </section>
    </header>

    <main>
      <section class="section section--tight">
        <div class="section__head section__head--tight">
          <p class="eyebrow">RECENT DAILY</p>
          <h2>Daily 汇总</h2>
          <p>首页只看概览，需要展开的时候再点进去。</p>
        </div>

        <div class="archive-list">
          <article v-for="entry in recentEntries" :key="entry.slug" class="archive-card">
            <div class="archive-card__meta">
              <span class="pill pill--soft">{{ entry.date }}</span>
              <span>{{ entry.title }}</span>
            </div>
            <p>{{ entry.summary }}</p>
            <div class="card-actions">
              <RouterLink class="text-link" :to="`/daily/${entry.slug}`">查看详情 →</RouterLink>
            </div>
          </article>
        </div>

        <div class="section-footer">
          <RouterLink class="button button--ghost button--inline" to="/archive">
            查看全部历史
          </RouterLink>
        </div>
      </section>
    </main>
  </div>
</template>
