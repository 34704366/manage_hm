import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'


// 全局引入
Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Index',
        component: () => import('../views/Index.vue'),
        children: [
            {
                path: '/home',
                name: 'home',
                component: () => import('../views/Home')
            },
            {
                path: '/mall',
                name: 'mall',
                component: () => import('../views/Mall')
            },
            {
                path: '/user',
                name: 'user',
                component: () => import('../views/User')    // 如果是文件夹，不要加.vue
            },
            
        ]
    }
]

const router = new VueRouter({
    mode: 'history',
    routes
})


export default router
