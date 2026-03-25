<script setup lang="ts">
import { computed, ref } from 'vue'

type DemoCard = {
  title: string
  value: string
  desc: string
  tone?: 'default' | 'success' | 'warning'
}

type DemoPayload = {
  title: string
  summary: string
  cards: DemoCard[]
  timeline: string[]
}

const examplePayload: DemoPayload = {
  title: 'Sprout View',
  summary:
    '把 bot 不好展示的结果，优雅地放进网页里。适合做状态面板、执行结果、可分享链接预览。',
  cards: [
    {
      title: 'Latest Result',
      value: 'Success',
      desc: '最近一次任务执行完成，可直接分享页面给别人看。',
      tone: 'success',
    },
    {
      title: 'Render Mode',
      value: 'Web Preview',
      desc: '相比 bot 文本，网页更适合复杂布局与视觉效果。',
      tone: 'default',
    },
    {
      title: 'Next Step',
      value: 'Connect Data',
      desc: '后续可接 bot 输出、API、JSON 文件或静态内容。',
      tone: 'warning',
    },
  ],
  timeline: [
    '初始化 Vue 3 + Vite + TypeScript 项目',
    '预留 Bot 结果网页化展示区',
    '后续可接动态数据和分享链接',
  ],
}

const inputText = ref(JSON.stringify(examplePayload, null, 2))

const parsedPayload = computed<DemoPayload>(() => {
  try {
    const parsed = JSON.parse(inputText.value) as DemoPayload

    return {
      title: parsed.title || examplePayload.title,
      summary: parsed.summary || examplePayload.summary,
      cards: Array.isArray(parsed.cards) ? parsed.cards : examplePayload.cards,
      timeline: Array.isArray(parsed.timeline)
        ? parsed.timeline
        : examplePayload.timeline,
    }
  } catch {
    return examplePayload
  }
})

const isJsonValid = computed(() => {
  try {
    JSON.parse(inputText.value)
    return true
  } catch {
    return false
  }
})
</script>

<template>
  <div class="page-shell">
    <header class="hero">
      <div class="hero__badge">🌱 sprout-view</div>
      <h1>把 bot 的结果，搬进更好看的网页里</h1>
      <p class="hero__desc">
        这是一个给 Lay 用来做展示、预览、分享的轻量 Web 工作台。
        当聊天窗口装不下效果时，就让页面来接管舞台 ✨
      </p>
    </header>

    <main class="layout">
      <section class="panel panel--input">
        <div class="panel__head">
          <div>
            <p class="eyebrow">INPUT</p>
            <h2>模拟 bot 输出数据</h2>
          </div>
          <span :class="['status', isJsonValid ? 'is-valid' : 'is-invalid']">
            {{ isJsonValid ? 'JSON OK' : 'JSON Error' }}
          </span>
        </div>

        <p class="panel__hint">
          先用 JSON 模拟内容，后面可以很容易替换成 API、文件或 bot 产出的结构化数据。
        </p>

        <textarea
          v-model="inputText"
          class="json-editor"
          spellcheck="false"
        />
      </section>

      <section class="panel panel--preview">
        <div class="panel__head">
          <div>
            <p class="eyebrow">PREVIEW</p>
            <h2>网页展示效果</h2>
          </div>
        </div>

        <div class="preview-card">
          <div class="preview-card__top">
            <div>
              <p class="preview-label">{{ parsedPayload.title }}</p>
              <h3>{{ parsedPayload.summary }}</h3>
            </div>
            <div class="preview-chip">Shareable</div>
          </div>

          <div class="stats-grid">
            <article
              v-for="card in parsedPayload.cards"
              :key="card.title"
              class="stat-card"
              :data-tone="card.tone || 'default'"
            >
              <p class="stat-card__title">{{ card.title }}</p>
              <strong class="stat-card__value">{{ card.value }}</strong>
              <span class="stat-card__desc">{{ card.desc }}</span>
            </article>
          </div>

          <div class="timeline">
            <p class="timeline__title">Suggested flow</p>
            <ol>
              <li v-for="item in parsedPayload.timeline" :key="item">
                {{ item }}
              </li>
            </ol>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>
