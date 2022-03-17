import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import AuthLayout from '@/layout/auth-layout.vue'
import AppLayout from '@/layout/app-layout.vue'
import Page404Layout from '@/layout/page-404-layout.vue'

import RouteViewComponent from './route-view.vue'

const routes: Array<RouteRecordRaw> = [
  {

    path: "/:catchAll(.*)",
    redirect: { name: 'login' },
  },
  {
    name:'waiter',
    path:'/waiter',
    component: AppLayout,
    children:[
      {
        name: 'orderMeal',
        path: 'orderMeal',
        component: () => import('@/pages/waiter/orderMeal.vue'),
      },
      {
        name: 'orderDetail',
        path: 'orderDetail',
        component: () => import('@/pages/waiter/orderDetail.vue'),
      },
      {
        name: 'mealState',
        path: 'mealState',
        component: () => import('@/pages/waiter/mealState.vue'),
      },
    ]
  },
  {
    name: 'admin',
    path: '/admin',
    component: AppLayout,
    children: [
      {
        name: 'statistics',
        path: 'statistics',
        component: () => import('@/pages/admin/statistics/order_management/order_management.vue'),
      },
      {
        name: 'forms',
        path: 'forms',
        component: RouteViewComponent,
        children: [
          {
            name: 'form-wizard',
            path: 'form-wizard',
            component: () => import('@/pages/admin/forms/form-wizard/FormWizard.vue'),
          },
        ],
      },
      {
        name: 'tables',
        path: 'tables',
        component: () => import('@/pages/admin/tables/Tips.vue'),
      },

      {
        name: 'tips-all',
        path: 'tips-all',
        component: () => import('@/pages/admin/tables/TipsAll.vue'),
      },
      {
        name: 'pages',
        path: 'pages',
        component: () => import('@/pages/admin/pages/personel_management/personel_management.vue'),
      },
    ]
  },

  {
    path: '/auth',
    component: AuthLayout,
    children: [
      {
        name: 'login',
        path: 'login',
        component: () => import('@/pages/auth/login/Login.vue'),
      },
      {
        name: 'signup',
        path: 'signup',
        component: () => import('@/pages/auth/signup/Signup.vue'),
      },
      {
        name: 'recover-password',
        path: 'recover-password',
        component: () => import('@/pages/auth/recover-password/RecoverPassword.vue'),
      },
      {
        path: '',
        redirect: { name: 'login' },
      },
    ],
  },
  {
    path: '/404',
    component: Page404Layout,
    children: [
      {
        name: 'not-found-advanced',
        path: 'not-found-advanced',
        component: () => import('@/pages/404-pages/VaPageNotFoundSearch.vue'),
      },
      {
        name: 'not-found-simple',
        path: 'not-found-simple',
        component: () => import('@/pages/404-pages/VaPageNotFoundSimple.vue'),
      },
      {
        name: 'not-found-custom',
        path: 'not-found-custom',
        component: () => import('@/pages/404-pages/VaPageNotFoundCustom.vue'),
      },
      {
        name: 'not-found-large-text',
        path: '/pages/not-found-large-text',
        component: () => import('@/pages/404-pages/VaPageNotFoundLargeText.vue'),
      },
    ],
  },
  {
    name: 'cook',
    path: '/cook',
    component: AppLayout,
    children: [
      {
        name: 'main',
        path: 'main',
        component: () => import('@/pages/cook/cookmain/main.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  //  mode: process.env.VUE_APP_ROUTER_MODE_HISTORY === 'true' ? 'history' : 'hash',
  routes
})

export default router
