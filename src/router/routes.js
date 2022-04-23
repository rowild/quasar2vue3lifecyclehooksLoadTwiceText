
const routes = [
  {
    path: '/',
    component: () => import('layouts/StartpageLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') }
    ]
  },
  {
    path: '/main',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/MainPage.vue'),
        children: [
          {
            path: '/subsite-one',
            component: () => import('pages/main/SubsiteOnePage.vue.vue')
          },
          {
            path: '/subsite-two',
            component: () => import('pages/main/SubsiteTwoPage.vue.vue')
          }
        ]
      }
    ]
  },
  // Always leave this as last one, but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
