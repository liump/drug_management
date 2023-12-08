import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'
import Layout from '@/components/Layout/Layout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'layout',
      component: Layout,
      children: [
        {
          path: '/drugCatelogue',
          name: 'drugCatelogue',
          component: () => import('@/views/DrugCatelogue/DrugCatelogue.vue')
        },
        {
          path: '/drugInput',
          name: 'drugInput',
          component: () => import('@/views/DrugInput/DrugInput.vue')
        },
        {
          path: '/drugOutput',
          name: 'drugOutput',
          component: () => import('@/views/DrugOutput/DrugOutput.vue')
        },
        {
          path: '/inventoryAlert',
          name: 'inventoryAlert',
          component: () => import('@/views/InventoryAlert/InventoryAlert.vue')
        },
        {
          path: '/userManagement',
          name: 'userManagement',
          component: () => import('@/views/UserManagement/UserManagement.vue')
        },
        {
          path: '/userRole',
          name: 'userRole',
          component: () => import('@/views/UserRole/UserRole.vue')
        },
      ]
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
