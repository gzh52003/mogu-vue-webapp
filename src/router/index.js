import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/goods/:id',
    name: 'Goods',
    component: () => import('../views/Goods.vue')
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import('../views/Cart.vue')
  },
  {
    path: '/mine',
    name: 'Mine',
    component: () => import('../views/Mine.vue')
  },
  {
    path: '/addressa',
    name: 'addressa',
    component: () => import('../views/addressa.vue')
  },
  {
    path: '/addressEdit',
    name: 'addressEdit',
    component: () => import('../views/addressEdit.vue')
  },
  {
    path: '/coupon',
    name: 'coupon',
    component: () => import('../views/coupon.vue')
  },
  {
    path: '/reg',
    name: 'Reg',
    component: () => import('../views/Reg.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/classify',
    name: 'Classify',
    component: () => import('../views/Classify.vue')
  },
  {
    path: '/orderList',
    name: 'orderList',
    component: () => import('../views/List.vue')
  },
]

const router = new VueRouter({
  routes
})

export default router
