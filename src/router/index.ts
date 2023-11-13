import { createRouter, createWebHistory } from 'vue-router'
import { RouteRecordRaw } from 'vue-router'
import { useCommonStore } from '@/stores/common'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/main'
  },
  {
    path: '/main',
    component: () => import('@/layout/index.vue')
  }
]

const router = createRouter({
  routes,
  history: createWebHistory()
})
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token') || useCommonStore().token
  // 内嵌到别的系统上没有token
  if (to.path == '/dataEchartsSchool' && !token) {
    next()
  } else {
    if (to.path != '/login' && !token) {
      next({
        path: '/login'
      })
    } else {
      if (to.path == '/login' && token) {
        next('/login')
      } else {
        next()
      }
    }
  }
})

export default router
