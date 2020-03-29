

/**
 * 首页
 */

import homePage from '@/pages/home.vue'
import orderDetail from '@/pages/home/orderDetail.vue'

const homeModule = [
    {
        path: '/homePage',
        name: 'homePage',
        component: homePage,
        meta: {
            requiresAuth:false,//该页面不需要登录
        }
    },
    {
        path: '/orderDetail',
        name: 'orderDetail',
        component: orderDetail,
        meta: {
            requiresAuth:false,//该页面不需要登录
        }
    }
]
/**
 * 重定向
 */
export default [
    {path: '/', redirect: '/homepage'},
    ...homeModule,
]