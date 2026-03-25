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

      <section class="hero-home hero-home--single">
        <article class="hero-daily-card">
          <div class="hero-daily-card__glow" />
          <div class="hero-daily-card__inner">
            <div class="hero-daily-card__top">
              <div>
                <p class="eyebrow">AI DAILY HOME</p>
                <h1>每天把 AI 世界里真正值得看的东西，整理成一页。</h1>
                <p class="hero__desc">
                  首页只放概览，真正的日报内容放进单独详情页里。这个顶部卡片会承接每天的核心数据，未来会直接显示当天真实生成的内容。
                </p>
              </div>

              <div class="hero-daily-card__meta">
                <span class="pill">{{ todayEntry.date }}</span>
                <span class="pill pill--soft">Today</span>
              </div>
            </div>

            <div class="hero-highlights">
              <span v-for="item in highlights" :key="item" class="hero-highlights__item">
                {{ item }}
              </span>
            </div>

            <div class="hero-daily-card__body">
              <section class="hero-daily-card__featured">
                <p class="hero-daily-card__label">Featured</p>
                <h2>{{ todayEntry.featured.title }}</h2>
                <p>{{ todayEntry.featured.summary }}</p>
              </section>

              <section class="hero-daily-card__snapshot">
                <div class="snapshot-item">
                  <span>Title</span>
                  <strong>{{ todayEntry.title }}</strong>
                </div>
                <div class="snapshot-item">
                  <span>Summary</span>
                  <strong>{{ todayEntry.summary }}</strong>
                </div>
                <div class="snapshot-item">
                  <span>Data mode</span>
                  <strong>Seed now · real later</strong>
                </div>
              </section>
            </div>

            <div class="hero__actions">
              <RouterLink class="button button--primary" :to="`/daily/${todayEntry.slug}`">
                打开今日详情
              </RouterLink>
              <RouterLink class="button button--ghost" to="/archive">
                浏览历史
              </RouterLink>
            </div>
          </div>
        </article>
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
