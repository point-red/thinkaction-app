import { createRouter, createWebHistory } from 'vue-router'

import { routes as authRoutes } from '@/modules/auth/routes'
import { routes as mainRoutes } from '@/modules/main/routes'
import { routes as templateRoutes } from '@/modules/template/routes'
import client from '@/lib/connection'

const routes = [
  ...authRoutes,
  mainRoutes,
  templateRoutes,
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../modules/main/views/page-not-found.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes
})

router.beforeEach(async (to, from, next) => {
  if (to.matched?.some((a) => ['Login', 'Register'].includes(a.name as string))) {
    next()
  }
  try {
    await client().get('/users/history?limit=1')
  } catch (e: any) {
    if (e.response?.status === 401) {
      next({ name: 'Login' })
      return
    }
  }
  next()
})

export default router
