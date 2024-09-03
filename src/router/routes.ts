import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/user',
  },
  {
    path: '/user',
    component: () => import('layouts/UserLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: 'cache', component: () => import('pages/CachePage.vue') },
      { path: 'api', component: () => import('pages/APIAccessPage.vue') },
    ],
  },
  {
    path: '/admin',
    component: () => import('layouts/AdminLayout.vue'),
    children: [
      { path: '', component: () => import('pages/admin/Admin1Page.vue') },
      { path: 'admin1', component: () => import('pages/admin/Admin1Page.vue') },
      { path: 'admin2', component: () => import('pages/admin/Admin2Page.vue') },
    ],
  },
  {
    path: '/login',
    component: () => import('layouts/AdminLayout.vue'),
    children: [{ path: '', component: () => import('pages/LoginPage.vue') }],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
