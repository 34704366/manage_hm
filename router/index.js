import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'


// 全局引入
Vue.use(VueRouter)

export const constantRoutes = [
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
            {
                path: '/markdown',
                name: 'markdown',
                component: () => import('../src/components/MarkdownEditor')
            }
            
        ]
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import("../views/Login"),
    },
    {
        path: '/404',
        component: () => import('../views/ErrorPage/404'),
        // hidden: true
    },
    {
        path: '/401',
        component: () => import('../views/ErrorPage/401'),
        // hidden: true
    }
    
];


// 异步挂载的路由，动态根据权限加载
export const asyncRoutes = [
    {
        path: '/Test01',
        component: () => import('../views/Test/01'),
        name: 'test01',
        meta: {
            roles: ['admin', 'editor']
        }
    },
    {
        path: '/Test02',
        component: () => import('../views/Test/02'),
        name: 'test02',
        meta: {
            roles: ['admin']
        }
    },
    
    // 必须放在动态挂载的最后，因为404是所有的路由都匹配不上的情况才显示
    {
        path: '*',
        redirect: '/404',
        // hidden: true
    }
]




// 创建router的函数
const createRouter = () => {
    let router = new VueRouter({
      mode: "history",
      routes: constantRoutes,
    });
    return router;
}


const router = createRouter();

export function resetRouter() {
    const newRouter = createRouter();
    router.matcher = newRouter.matcher    // reset router
}

export default router
