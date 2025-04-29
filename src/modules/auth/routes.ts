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
  },
  {
    path: '/forgot-password',
    name: 'ForgotPassword',
    component: () => import('./views/page-forgot-password.vue')
  },
  {
    path: '/reset-password/:token',
    name: 'ResetPassword',
    component: () => import('./views/page-reset-password.vue')
  }
]
