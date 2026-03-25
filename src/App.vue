<script setup lang="ts">
import { archiveEntries, todayEntry } from './data/ai-daily'

const projectTracks = [
  {
    title: 'AI Daily',
    tag: 'Morning Brief',
    desc: '每天 08:00 开始生成，09:00 通过 bot 发送链接 + 一句话摘要。',
  },
  {
    title: 'Green Zone',
    tag: 'Builder Space',
    desc: '绿豆芽的施工区，适合承接功能页、demo、需要 coding 的实现内容。',
  },
  {
    title: 'Yellow Zone',
    tag: 'Creative Space',
    desc: '黄豆芽的创意区，适合承接概念页、表达页、展示页和内容实验。',
  },
]

const signals = [
  '08:00 collect + generate',
  '09:00 bot reminder with link',
  'Mobile-first AI browsing experience',
]

const archivePreview = archiveEntries.slice(1)
</script>

<template>
  <div class="page-shell">
    <div class="bg-orb bg-orb--1" />
    <div class="bg-orb bg-orb--2" />
    <div class="bg-grid" />

    <header class="hero">
      <nav class="topbar">
        <div class="brand">
          <span class="brand__dot">🌱</span>
          <span>douya-labs</span>
        </div>
        <div class="topbar__hint">ai daily × bot × web</div>
      </nav>

      <section class="hero__content">
        <div class="hero__copy">
          <p class="eyebrow">DIGITAL SPROUT LAB</p>
          <h1>Wake up to a cleaner AI brief.</h1>
          <p class="hero__desc">
            douya-labs 正在长成一个适合手机查看的 AI Daily 站点：
            每天收集 AI GitHub 更新、产品功能变化、重大事件和高信号信息，
            再把它们整理成更适合浏览和分享的网页。
          </p>

          <div class="hero__actions">
            <a class="button button--primary" href="#daily">View today</a>
            <a class="button button--ghost" href="#archive">Browse history</a>
          </div>
        </div>

        <div class="hero-card">
          <div class="hero-card__glow" />
          <div class="hero-card__inner">
            <div class="terminal-bar">
              <span />
              <span />
              <span />
            </div>

            <div class="terminal-content">
              <p><span class="prompt">></span> collect ai signals</p>
              <p><span class="prompt">></span> render mobile-first daily page</p>
              <p><span class="prompt">></span> send 09:00 bot reminder</p>
            </div>

            <ul class="signal-list">
              <li v-for="signal in signals" :key="signal">
                <span class="signal-dot" />
                {{ signal }}
              </li>
            </ul>
          </div>
        </div>
      </section>
    </header>

    <main>
      <section id="daily" class="section">
        <div class="section__head section__head--tight">
          <p class="eyebrow">TODAY'S AI DAILY</p>
          <h2>{{ todayEntry.title }}</h2>
          <p>{{ todayEntry.summary }}</p>
        </div>

        <div class="daily-overview">
          <article class="daily-feature">
            <div class="daily-feature__meta">
              <span class="pill">{{ todayEntry.date }}</span>
              <span class="pill pill--soft">Featured</span>
            </div>
            <h3>{{ todayEntry.featured.title }}</h3>
            <p>{{ todayEntry.featured.summary }}</p>
            <span class="source">Source · {{ todayEntry.featured.source }}</span>
          </article>

          <aside class="daily-status">
            <div class="status-card">
              <span>Build window</span>
              <strong>08:00</strong>
            </div>
            <div class="status-card">
              <span>Bot reminder</span>
              <strong>09:00</strong>
            </div>
            <div class="status-card">
              <span>Reading mode</span>
              <strong>Mobile first</strong>
            </div>
          </aside>
        </div>

        <div class="daily-grid">
          <section class="daily-card">
            <div class="daily-card__head">
              <p class="eyebrow">GITHUB</p>
              <h3>GitHub updates</h3>
            </div>
            <ul class="daily-list">
              <li v-for="item in todayEntry.githubUpdates" :key="item.title">
                <strong>{{ item.title }}</strong>
                <p>{{ item.summary }}</p>
              </li>
            </ul>
          </section>

          <section class="daily-card">
            <div class="daily-card__head">
              <p class="eyebrow">PRODUCT</p>
              <h3>Product updates</h3>
            </div>
            <ul class="daily-list">
              <li v-for="item in todayEntry.productUpdates" :key="item.title">
                <strong>{{ item.title }}</strong>
                <p>{{ item.summary }}</p>
              </li>
            </ul>
          </section>

          <section class="daily-card">
            <div class="daily-card__head">
              <p class="eyebrow">EVENTS</p>
              <h3>Major events</h3>
            </div>
            <ul class="daily-list">
              <li v-for="item in todayEntry.majorEvents" :key="item.title">
                <strong>{{ item.title }}</strong>
                <p>{{ item.summary }}</p>
              </li>
            </ul>
          </section>
        </div>

        <section class="daily-card daily-card--wide research-card">
          <div class="daily-card__head">
            <p class="eyebrow">RESEARCH</p>
            <h3>Research picks</h3>
          </div>
          <ul class="daily-list">
            <li v-for="item in todayEntry.researchPicks" :key="item.title">
              <strong>{{ item.title }}</strong>
              <p>{{ item.summary }}</p>
            </li>
          </ul>
        </section>

        <article class="sprout-note">
          <p class="eyebrow">SPROUT NOTE</p>
          <p>{{ todayEntry.sproutNote }}</p>
        </article>
      </section>

      <section id="tracks" class="section">
        <div class="section__head">
          <p class="eyebrow">PROJECT TRACKS</p>
          <h2>Things growing here</h2>
          <p>
            AI Daily 会变成一个固定栏目；green / yellow 继续作为不同协作区，承接后续的 demo 与展示页。
          </p>
        </div>

        <div class="project-grid">
          <article v-for="track in projectTracks" :key="track.title" class="project-card">
            <div class="project-card__tag">{{ track.tag }}</div>
            <h3>{{ track.title }}</h3>
            <p>{{ track.desc }}</p>
          </article>
        </div>
      </section>

      <section id="archive" class="section section--archive">
        <div class="section__head section__head--tight">
          <p class="eyebrow">HISTORY</p>
          <h2>Daily archive preview</h2>
          <p>后续每天的数据会按日期沉淀下来，方便手机端快速回看。</p>
        </div>

        <div class="archive-list">
          <article v-for="entry in archivePreview" :key="entry.slug" class="archive-card">
            <div class="archive-card__meta">
              <span class="pill pill--soft">{{ entry.date }}</span>
              <span>{{ entry.title }}</span>
            </div>
            <p>{{ entry.summary }}</p>
            <small>{{ entry.sproutNote }}</small>
          </article>
        </div>
      </section>
    </main>
  </div>
</template>
