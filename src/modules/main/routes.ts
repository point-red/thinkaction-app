export const routes = {
  path: '/',
  component: () => import('@/layouts/app/app-index.vue'),
  children: [
    {
      path: '',
      component: () => import('./views/page-index.vue')
    },
    {
      path: '/welcome',
      name: 'Welcome',
      // @ts-ignore
      component: () => import('./views/page-welcome.vue')
    },
    {
      path: 'find',
      component: () => import('./views/page-find-user.vue')
    },
    {
      path: 'user/:id',
      component: () => import('./views/page-detail-user.vue')
    },
    {
      path: 'user/:id/:type',
      component: () => import('./views/page-relations.vue')
    },
    {
      path: 'create-resolution',
      component: () => import('./views/page-create-resolution.vue')
    },
    {
      path: 'edit-resolution/:id',
      component: () => import('./views/page-edit-resolution.vue')
    },
    {
      path: 'edit-weekly/:id',
      component: () => import('./views/page-edit-weekly-goals.vue')
    },
    {
      path: 'edit-completed/:id',
      component: () => import('./views/page-edit-complete-goals.vue')
    },
    {
      path: 'create-weekly-goals',
      component: () => import('./views/page-create-weekly-goals.vue')
    },
    {
      path: 'complete-goals',
      component: () => import('./views/page-complete-goals.vue')
    },
    {
      path: 'notification',
      component: () => import('./views/page-notification.vue')
    },
    {
      path: 'profile',
      component: () => import('./views/page-profile.vue')
    },
    {
      path: 'profile/edit',
      component: () => import('./views/page-edit-profile.vue')
    },
    {
      path: 'profile/edit-password',
      component: () => import('./views/page-edit-password.vue')
    },
    {
      path: 'monthly-report',
      component: () => import('./views/page-monthly-report.vue')
    },
    {
      path: 'yearly-report',
      component: () => import('./views/page-yearly-report.vue')
    },
    {
      path: 'post/:id',
      component: () => import('./views/page-detail-post.vue')
    },
    {
      path: 'post/:id/cheers',
      component: () => import('./views/page-detail-cheers.vue')
    },
    {
      path: 'nested',
      children: [
        {
          path: 'page-nested-1',
          component: () => import('./views/nested/page-nested-1.vue')
        },
        {
          path: 'page-nested-2',
          component: () => import('./views/nested/page-nested-2.vue')
        }
      ]
    }
  ]
}
