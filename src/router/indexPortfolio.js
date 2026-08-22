import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'Dashboard', component: () => import('@/views/portfolio/DashboardView.vue') },
    { path: '/weather', name: 'Weather', component: () => import('@/views/store/WeatherStoreHomeView.vue') },
    { path: '/weather/:cityId', name: 'WeatherDetail', component: () => import('@/views/store/WeatherStoreDetailView.vue') },
    { path: '/stocks', name: 'Stocks', component: () => import('@/views/portfolio/StocksView.vue') },
    { path: '/portfolio', name: 'Portfolio', component: () => import('@/views/portfolio/PortfolioView.vue') },
    { path: '/alerts', name: 'Alerts', component: () => import('@/views/portfolio/AlertsView.vue') },
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: () => import('@/views/NotFoundView.vue') },
  ],
})

export default router
