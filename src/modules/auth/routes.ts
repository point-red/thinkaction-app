export const routes = [
  {
    path: '/login',
    component: () => import('./views/page-login.vue')
  },
  {
    path: '/register',
    component: () => import('./views/page-register.vue')
  }
]
