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
      { path: '', component: () => import('pages/HotspotPage.vue') },
      { path: 'metrics', component: () => import('pages/MetricsPage.vue') },
      { path: 'api', component: () => import('pages/APIAccessPage.vue') },
      { path: 'inventory', component: () => import('pages/InventoryPage.vue') },
      {
        path: 'settings',
        component: () => import('pages/UserSettingsPage.vue'),
      },
    ],
  },
  {
    path: '/admin',
    component: () => import('layouts/AdminLayout.vue'),
    children: [
      { path: '', component: () => import('pages/admin/users/ListUsersPage.vue') },
      {
        path: 'users',
        component: () => import('pages/admin/users/ListUsersPage.vue'),
      },
      {
        path: 'users/create',
        component: () => import('pages/admin/users/CreateUserPage.vue'),
      },
      {
        path: 'company',
        component: () => import('pages/admin/company/ViewCompanyPage.vue'),
      },
      { path: 'groups', component: () => import('pages/admin/groups/ListGroupsPage.vue') },
      { path: 'alerts', component: () => import('pages/admin/alerts/ListAlertsPage.vue') },
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
