import { createRouter, createWebHashHistory } from 'vue-router'
import ArchivePage from './views/ArchivePage.vue'
import DailyDetailPage from './views/DailyDetailPage.vue'
import HomePage from './views/HomePage.vue'
import PapersPage from './views/PapersPage.vue'
import AvatarPalettePage from './views/AvatarPalettePage.vue'

export const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
    },
    {
      path: '/daily/:slug',
      name: 'daily',
      component: DailyDetailPage,
    },
    {
      path: '/archive',
      name: 'archive',
      component: ArchivePage,
    },
    {
      path: '/papers/latest',
      name: 'papers-latest',
      component: PapersPage,
    },
    {
      path: '/avatar-palette',
      name: 'avatar-palette',
      component: AvatarPalettePage,
    },
  ],
})
