<script setup lang="ts">
const projects = [
  {
    name: 'Sprout View',
    tag: 'Preview Engine',
    desc: '把 bot 里不方便展示的结果，转成更适合浏览和分享的网页视图。',
  },
  {
    name: 'Bot Experiments',
    tag: 'Playground',
    desc: '一些对话、交互、可视化和 UI 想法的试验场，想到就种一棵。',
  },
  {
    name: 'Shareable Pages',
    tag: 'Static Demos',
    desc: '适合直接甩链接给别人看的页面，轻量、直接、体面。',
  },
]

const signals = [
  'Web-first previews for bot outputs',
  'A tiny lab for interactive demos',
  'Built to share, tweak, and grow',
]
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
        <div class="topbar__hint">bot × web × demos</div>
      </nav>

      <section class="hero__content">
        <div class="hero__copy">
          <p class="eyebrow">DIGITAL SPROUT LAB</p>
          <h1>Build weird little things.<br />Make them look great.</h1>
          <p class="hero__desc">
            douya-labs 是一个轻量但有点酷的小实验室：
            把 bot 的输出、想法、效果和互动，搬进更适合展示的网页里。
          </p>

          <div class="hero__actions">
            <a class="button button--primary" href="#projects">Explore</a>
            <a class="button button--ghost" href="https://github.com/douya-labs/douya-labs.github.io" target="_blank" rel="noreferrer">
              GitHub
            </a>
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
              <p><span class="prompt">></span> initialize douya-labs</p>
              <p><span class="prompt">></span> render stylish preview shell</p>
              <p><span class="prompt">></span> deploy to github pages</p>
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
      <section id="projects" class="section">
        <div class="section__head">
          <p class="eyebrow">PROJECT TRACKS</p>
          <h2>Things growing here</h2>
          <p>
            目前先放一版概念区，后续可以把真实项目、页面入口、演示卡片慢慢种上去。
          </p>
        </div>

        <div class="project-grid">
          <article v-for="project in projects" :key="project.name" class="project-card">
            <div class="project-card__tag">{{ project.tag }}</div>
            <h3>{{ project.name }}</h3>
            <p>{{ project.desc }}</p>
          </article>
        </div>
      </section>

      <section class="section section--panel">
        <div class="panel">
          <div>
            <p class="eyebrow">NEXT</p>
            <h2>More demos coming soon</h2>
            <p>
              这里之后可以接 bot 结果展示页、交互 demo、视觉实验、分享卡片页，
              让聊天框里装不下的内容，都有一个像样的落点。
            </p>
          </div>
          <div class="panel__meta">
            <span>Status</span>
            <strong>Online & Growing</strong>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>
