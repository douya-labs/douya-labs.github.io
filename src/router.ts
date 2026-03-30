import { createRouter, createWebHashHistory } from 'vue-router'
import HomePage from './views/HomePage.vue'
import DailyDetailPage from './views/DailyDetailPage.vue'

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
      name: 'daily-detail',
      component: DailyDetailPage,
    },
    {
      path: '/item/:slug',
      redirect: (to) => {
        const raw = String(to.params.slug || '')
        return raw.length >= 10 ? `/daily/${raw.slice(0, 10)}` : '/'
      },
    },
  ],
})
