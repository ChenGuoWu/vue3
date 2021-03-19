/*
 * @Author: yuanaohua
 * @Date: 2021-03-16 11:05:02
 * @FilePath: /demo-vue3/demo-vue3/src/router/index.js
 */
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/list2',
    name: 'list2',
    component: () => import('../views/vue2/list.vue')
  },
  {
    path: '/list3',
    name: 'list3',
    component: () => import('../views/vue3/list.vue')
  },
  {
    path: '/detail2',
    name: 'detail2',
    component: () => import('../views/vue2/detail.vue')
  },
  {
    path: '/detail3',
    name: 'detail3',
    component: () => import('../views/vue3/detail.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
