import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'
import Layout from '@/components/Layout/Layout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/Login/Login.vue')
    },
    {
      path: '/bigScreen',
      name: 'BigScreen',
      component: () => import('@/views/BigScreen/BigScreen.vue')
    },
    {
      path: '/menu',
      name: 'Layout',
      component: Layout,
      children: [
        {
          path: '/drugCatelogue',
          name: 'DrugCatelogue',
          component: () => import('@/views/DrugCatelogue/DrugCatelogue.vue')
        },
        {
          path: '/drugInput',
          name: 'DrugInput',
          component: () => import('@/views/DrugInput/DrugInput.vue')
        },
        {
          path: '/drugOutput',
          name: 'DrugOutput',
          component: () => import('@/views/DrugOutput/DrugOutput.vue')
        },
        {
          path: '/drugPrice',
          name: 'DrugPrice',
          component: () => import('@/views/DrugPrice/DrugPrice.vue')
        },
        {
          path: '/inventoryAlert',
          name: 'InventoryAlert',
          component: () => import('@/views/InventoryAlert/InventoryAlert.vue')
        },
        {
          path: '/userManagement',
          name: 'UserManagement',
          component: () => import('@/views/UserManagement/UserManagement.vue')
        },
        {
          path: '/userRole',
          name: 'UserRole',
          component: () => import('@/views/UserRole/UserRole.vue')
        },
      ]
    },
    {
      path: '/about',
      name: 'About',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

router.beforeEach(async (to, from) => {
  const token = localStorage.getItem('pro__token')
  if (
    // 检查用户是否已登录
    !token &&
    // ❗️ 避免无限重定向
    to.name !== 'Login'
  ) {
    // 将用户重定向到登录页面
    return { name: 'Login' }
  } 
  if(token && to.name === 'Login') {
    return { name: 'DrugCatelogue' }
  }
})


export default router
