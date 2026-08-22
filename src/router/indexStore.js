import { createRouter, createWebHistory } from 'vue-router'
import WeatherStoreHomeView from '@/views/store/WeatherStoreHomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'WeatherHome', component: WeatherStoreHomeView },
    { path: '/about', name: 'WeatherAbout', component: () => import('../views/WeatherAboutView.vue') },
    { path: '/weather/:cityId', name: 'WeatherDetail', component: () => import('../views/store/WeatherStoreDetailView.vue') },
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: () => import('../views/NotFoundView.vue') },
  ],
})

export default router
