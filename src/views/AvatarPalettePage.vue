<script setup lang="ts">
const paletteItems = [
  {
    key: 'green',
    name: '绿豆芽',
    slug: 'Lvdouya',
    vibe: '背景色是头像背景，主色用于耳机和头顶豆芽。',
    main: '#007054',
    background: '#59BD9E',
    accent: '#59BD9E',
  },
  {
    key: 'qing',
    name: '青豆芽',
    slug: 'Qingdouya',
    vibe: '青豆芽整体更冷，更偏蓝色；这版主色与背景色一致。',
    main: '#42709C',
    background: '#42709C',
    accent: '#6E9BC8',
  },
  {
    key: 'black',
    name: '黑豆芽',
    slug: 'Heidouya',
    vibe: '黑豆芽收得更稳，背景灰黑，主色近纯黑。',
    main: '#080A09',
    background: '#515352',
    accent: '#7A7D7C',
  },
  {
    key: 'yellow',
    name: '黄豆芽',
    slug: 'Huangdouya',
    vibe: '黄豆芽保留明亮感，像被阳光照着的暖黄。',
    main: '#FCD337',
    background: '#FFDE47',
    accent: '#FFF29A',
  },
  {
    key: 'red',
    name: '红豆芽',
    slug: 'Hongdouya',
    vibe: '红豆芽对比最明显，背景偏橙红，主色更深。',
    main: '#BF0B00',
    background: '#FF724B',
    accent: '#FFB28F',
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
        <h2>豆芽头像配色预览（参考图版本）</h2>
        <p>
          这一版直接参考你发的头像样式：白色头部、两侧耳机、头顶双叶豆芽。背景色用于头像底，主色用于耳机和豆芽，方便你直接看成品感觉。
        </p>
        <div class="hero-highlights papers-highlights">
          <span class="hero-highlights__item">5 bean sprouts</span>
          <span class="hero-highlights__item">reference-style avatar</span>
          <span class="hero-highlights__item">background + main color</span>
        </div>
      </section>

      <section class="palette-grid">
        <article
          v-for="item in paletteItems"
          :key="item.key"
          class="palette-card palette-card--avatar"
          :style="{
            '--palette-main': item.main,
            '--palette-bg': item.background,
            '--palette-accent': item.accent,
          }"
        >
          <div class="palette-card__surface palette-card__surface--avatar">
            <div class="reference-avatar-stage">
              <div class="reference-avatar-shadow" />
              <div class="reference-avatar-headset reference-avatar-headset--left" />
              <div class="reference-avatar-headset reference-avatar-headset--right" />

              <div class="reference-avatar">
                <div class="reference-avatar__sprout">
                  <span class="reference-avatar__stem" />
                  <span class="reference-avatar__leaf reference-avatar__leaf--left" />
                  <span class="reference-avatar__leaf reference-avatar__leaf--right" />
                </div>

                <div class="reference-avatar__shell">
                  <div class="reference-avatar__gloss reference-avatar__gloss--1" />
                  <div class="reference-avatar__gloss reference-avatar__gloss--2" />
                  <div class="reference-avatar__panel">
                    <div class="reference-avatar__eyes">
                      <span class="reference-avatar__eye" />
                      <span class="reference-avatar__eye" />
                    </div>
                    <div class="reference-avatar__blush reference-avatar__blush--left" />
                    <div class="reference-avatar__blush reference-avatar__blush--right" />
                    <div class="reference-avatar__smile" />
                  </div>
                </div>
              </div>
            </div>

            <div class="palette-card__body">
              <div class="archive-card__meta palette-card__meta">
                <span class="pill">{{ item.name }}</span>
                <span class="pill pill--soft">{{ item.slug }}</span>
              </div>

              <p class="palette-card__vibe">{{ item.vibe }}</p>

              <div class="palette-swatches">
                <div class="palette-swatch">
                  <span class="palette-swatch__label">主色（耳机 / 豆芽）</span>
                  <div class="palette-swatch__chip palette-swatch__chip--main">
                    <strong>{{ item.main }}</strong>
                  </div>
                </div>
                <div class="palette-swatch">
                  <span class="palette-swatch__label">背景色（头像底）</span>
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
          目前这页重点是让你先看“颜色进头像之后”的感觉，所以造型会尽量贴近参考图，但仍然保持网页里的可编辑矢量风格。如果你确认某一组颜色最顺眼，我可以继续把这一组单独放大、做成更正式的品牌头像页。
        </p>
      </article>
    </main>
  </div>
</template>
