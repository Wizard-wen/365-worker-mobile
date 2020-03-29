import Vue from 'vue'
import Router from 'vue-router'
import routerConfig from './routerConfig.js'

import notFound from '@/pages/notFound.vue'


import store from '../store/index.js'

let isLogin = store.state.loginModule.isLogin

Vue.use(Router)

window.router = new Router({
    routes: [
        {
            path: '*',
            components: notFound,
        },
        ...routerConfig,
    ]
})

export default router
