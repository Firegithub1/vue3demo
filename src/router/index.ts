/*
 * @Author: YiY
 * @Date: 2023-12-13 19:51:51
 * @LastEditTime: 2024-01-04 17:00:57
 */
import { createRouter, createWebHistory,RouteRecordRaw } from 'vue-router';
import localCache from '@/utils/cache';
import { ElMessage } from 'element-plus';

const routes: Array<RouteRecordRaw> = [
  {
    // 路由初始指向
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../pages/home/index.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../pages/login/index.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../pages/register/index.vue')
  }
]



const router = createRouter({
  history: createWebHistory(),
  routes
})


router.beforeEach((to, from, next) => {
  if (to.name == "login") {
    // localCache.clearCache()
    return next()
  }

  // 路由 不存在
  let arrPath = routes.map(item => item.path)
  if (!arrPath.includes(to.path)) {
    ElMessage({ message: '路由不存在~', type: 'warning'})
    router.push('/')
  }

  // let token = localCache.getCache("token")
  // if(!token) router.replace('/login');

  next()
})
export default router