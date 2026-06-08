import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', name: 'home', component: () => import('@/views/HomeView.vue') },
  { path: '/game', name: 'game', component: () => import('@/views/GameView.vue') },
  { path: '/tips', name: 'tips', component: () => import('@/views/TipsView.vue') }
]

export default createRouter({
  history: createWebHistory(),
  routes
})
