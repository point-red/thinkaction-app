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
  // Allow access to auth-related routes without authentication
  if (to.matched?.some((route) => ['Login', 'Register', 'ForgotPassword', 'ResetPassword'].includes(route.name as string))) {
    next()
    return
  }

  // Check authentication for other routes
  try {
    await client().get('/users/history?limit=1')
    next()
  } catch (e: any) {
    if (e.response?.status === 401) {
      next({ name: 'Login' })
      return
    }
    next()
  }
})

export default router
