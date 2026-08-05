import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../components/Home.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/auth', name: 'auth', component: () => import('../components/Auth.vue') },
    { path: '/cart', name: 'cart', component: () => import('../components/Cart.vue') },
    { path: '/delivery', name: 'delivery', component: () => import('../components/Delivery.vue') },
    { path: '/orders', name: 'orders', component: () => import('../components/Orders.vue') },
    { path: '/profile', name: 'profile', component: () => import('../components/Profile.vue') },
    { path: '/store', name: 'store', component: () => import('../components/Store.vue') },
    { path: '/compare', name: 'compare', component: () => import('../components/StoreComparison.vue') },
    { path: '/users', name: 'users', component: () => import('../components/Users.vue') },
    { path: '/login', name: 'login', component: () => import('../components/Login.vue') },
  ]
})

export default router