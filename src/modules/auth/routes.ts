export const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('./views/page-login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('./views/page-register.vue')
  }
]
