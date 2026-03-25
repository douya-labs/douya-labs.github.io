<script setup lang="ts">
import { dailyEntries, todayEntry } from '../data/ai-daily'

const recentEntries = dailyEntries.slice(0, 4)

const basics = [
  { label: '栏目状态', value: 'Building' },
  { label: '生成时间', value: '08:00' },
  { label: '提醒时间', value: '09:00' },
  { label: '阅读模式', value: 'Mobile first' },
]
</script>

<template>
  <div class="page-shell">
    <div class="bg-orb bg-orb--1" />
    <div class="bg-orb bg-orb--2" />
    <div class="bg-grid" />

    <header class="hero hero--compact">
      <nav class="topbar">
        <div class="brand">
          <span class="brand__dot">🌱</span>
          <span>douya-labs</span>
        </div>
        <div class="topbar__hint">ai daily × bot × web</div>
      </nav>

      <section class="hero__content hero__content--single">
        <div class="hero__copy">
          <p class="eyebrow">AI DAILY HOME</p>
          <h1>今天值得看的 AI 信息，会先在这里集合。</h1>
          <p class="hero__desc">
            首页只保留最基本的信息和 Daily 汇总入口，真正的详细内容放到单日页面里看。
          </p>
        </div>
      </section>
    </header>

    <main>
      <section class="section">
        <div class="section__head section__head--tight">
          <p class="eyebrow">OVERVIEW</p>
          <h2>Basic info</h2>
          <p>这是一个面向手机浏览的 AI Daily 主页，适合快速扫一眼，再点进当天详情。</p>
        </div>

        <div class="stats-grid">
          <article v-for="item in basics" :key="item.label" class="status-card">
            <span>{{ item.label }}</span>
            <strong>{{ item.value }}</strong>
          </article>
        </div>
      </section>

      <section class="section">
        <div class="section__head section__head--tight">
          <p class="eyebrow">TODAY</p>
          <h2>{{ todayEntry.title }}</h2>
          <p>{{ todayEntry.summary }}</p>
        </div>

        <article class="daily-feature">
          <div class="daily-feature__meta">
            <span class="pill">{{ todayEntry.date }}</span>
            <span class="pill pill--soft">Today</span>
          </div>
          <h3>{{ todayEntry.featured.title }}</h3>
          <p>{{ todayEntry.featured.summary }}</p>
          <div class="card-actions">
            <RouterLink class="button button--primary button--inline" :to="`/daily/${todayEntry.slug}`">
              打开今日详情
            </RouterLink>
          </div>
        </article>
      </section>

      <section class="section">
        <div class="section__head section__head--tight">
          <p class="eyebrow">RECENT DAILY</p>
          <h2>Daily 汇总</h2>
          <p>这里只看概览，需要展开的时候再点进去。</p>
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
