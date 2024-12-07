import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import FavoriteView from '../views/FavoriteView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/favorite',
    name: 'favorite',
    component: FavoriteView
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
