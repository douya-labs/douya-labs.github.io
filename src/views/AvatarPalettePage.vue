<script setup lang="ts">
const paletteItems = [
  {
    key: 'yellow',
    name: '黄豆芽',
    slug: 'Huangdouya',
    vibe: '暖黄、柔和、带一点草本感',
    main: '#B7A634',
    background: '#F8F3E7',
    accent: '#E7DB8A',
  },
  {
    key: 'green',
    name: '绿豆芽',
    slug: 'Lvdouya',
    vibe: '鲜嫩植物绿，偏暖，像叶子',
    main: '#5BAE4A',
    background: '#F1F7EE',
    accent: '#B5E0AB',
  },
  {
    key: 'black',
    name: '黑豆芽',
    slug: 'Heidouya',
    vibe: '柔和乌黑，不用纯黑，显得更高级',
    main: '#2B2B2B',
    background: '#F3F1ED',
    accent: '#9B9389',
  },
  {
    key: 'red',
    name: '红豆芽',
    slug: 'Hongdouya',
    vibe: '柔和果感红，不是过分刺眼的大红',
    main: '#DB5A6B',
    background: '#FAECEB',
    accent: '#F4B8BE',
  },
  {
    key: 'qing',
    name: '青豆芽',
    slug: 'Qingdouya',
    vibe: '冷青碧，偏水色 / 玉色，明显区别于绿色',
    main: '#5DA6A7',
    background: '#EDF6F6',
    accent: '#B4D7D8',
  },
] as const
</script>

<template>
  <div class="page-shell palette-page-shell">
    <div class="bg-orb bg-orb--1" />
    <div class="bg-orb bg-orb--2" />
    <div class="bg-grid" />

    <main class="section detail-page palette-page">
      <div class="detail-nav">
        <RouterLink class="text-link" to="/">← 返回首页</RouterLink>
        <RouterLink class="text-link" to="/archive">查看日报归档</RouterLink>
      </div>

      <section class="section__head section__head--tight palette-hero">
        <p class="eyebrow">AVATAR PALETTE</p>
        <h2>豆芽头像配色预览</h2>
        <p>
          每张卡片都是一个头像预览：卡片底色代表背景色，头像外圈和状态点代表主色。青豆芽特意做成更冷、更偏蓝绿的方向，避免和绿豆芽撞色。
        </p>
        <div class="hero-highlights papers-highlights">
          <span class="hero-highlights__item">5 palettes</span>
          <span class="hero-highlights__item">avatar-first preview</span>
          <span class="hero-highlights__item">qing ≠ green</span>
        </div>
      </section>

      <section class="palette-grid">
        <article
          v-for="item in paletteItems"
          :key="item.key"
          class="palette-card"
          :style="{
            '--palette-main': item.main,
            '--palette-bg': item.background,
            '--palette-accent': item.accent,
          }"
        >
          <div class="palette-card__surface">
            <div class="palette-avatar-wrap">
              <div class="palette-avatar-shadow" />
              <div class="palette-avatar">
                <div class="palette-avatar__halo" />
                <div class="palette-avatar__face">
                  <div class="palette-avatar__eyes">
                    <span />
                    <span />
                  </div>
                  <div class="palette-avatar__smile" />
                </div>
                <div class="palette-avatar__sprout">
                  <span class="palette-avatar__leaf palette-avatar__leaf--left" />
                  <span class="palette-avatar__leaf palette-avatar__leaf--right" />
                </div>
              </div>
              <span class="palette-avatar__status" />
            </div>

            <div class="palette-card__body">
              <div class="archive-card__meta palette-card__meta">
                <span class="pill">{{ item.name }}</span>
                <span class="pill pill--soft">{{ item.slug }}</span>
              </div>

              <p class="palette-card__vibe">{{ item.vibe }}</p>

              <div class="palette-swatches">
                <div class="palette-swatch">
                  <span class="palette-swatch__label">主色</span>
                  <div class="palette-swatch__chip palette-swatch__chip--main">
                    <strong>{{ item.main }}</strong>
                  </div>
                </div>
                <div class="palette-swatch">
                  <span class="palette-swatch__label">背景</span>
                  <div class="palette-swatch__chip palette-swatch__chip--bg">
                    <strong>{{ item.background }}</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>
      </section>

      <article class="sprout-note palette-note">
        <p class="eyebrow">SPROUT NOTE</p>
        <p>
          区分重点：绿豆芽偏叶子感、偏暖植物绿；青豆芽偏水色感、偏冷蓝绿色。如果后面你要换成正式头像图标，也可以直接沿用这组主色 / 背景色结构。
        </p>
      </article>
    </main>
  </div>
</template>
