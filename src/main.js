import Vue from 'vue'
import ElementUI, { Message } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import App from './App.vue'
import router from '../router'
import store from './store'
import SvgIcon from './components/SvgIcon'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css' // progress bar style

import { getToken } from '@/utils/auth'
 
Vue.config.productionTip = false;
Vue.use(ElementUI);
// 全局注册SvgIcon组件
Vue.component('svg-icon', SvgIcon);



// 远程引入在线的iconfont字体库，线上需要修改成本地引入
let sp = document.createElement('script');
sp.src = '//at.alicdn.com/t/c/font_3753930_e9vuuh4sxm4.js';
document.body.appendChild(sp);


const whiteList = ['/login', '/auth-redirect'] // no redirect whitelist

// 路由守卫函数（路由跳转时的钩子函数） to:将要执行的路由， from：现在的路由，
// next：需要最后调用next函数resolve这个钩子函数，可以跳转到指定位置
router.beforeEach(async(to, form, next) => {
  // start progress bar
  NProgress.start();

  // set page title
  document.title = 'this title'

  // determine whether the user has logged in
  const hasToken = getToken();
  
  if (hasToken) {
    if (to.path === '/login') {
      // if is logined
      next({
        path: '/'
      })
      // NProgress.done();
    } else {
      const hasRoles = store.getters.roles && store.getters.roles.length > 0
      // console.log(hasRoles)
      if (hasRoles) {
        // 如果已经有了权限
        console.log('already permission')
        next();
      } else {
        try {
          const { roles } = await store.dispatch('user/getInfo')
          
          const accessRoutes = await store.dispatch('permission/generateRoutes', roles)
          // 生成可访问的路由表
          router.addRoutes(accessRoutes)    // 动态添加可访问的路由表
          
          // console.log(roles.a.a.a)

          // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
          next({ ...to, replace: true })
          
        } catch (error) {
          // remove token and go to login page to re-login
          store.dispatch('user/resetToken').then(() => {
            Message.error(error || 'has error')
            console.log(error)
            next(`/login?redirect=${to.path}`)
            NProgress.done();
          })
        }
      }
    }
    // console.log(router.options.routes)
    // next();
  } else {
    // 重新登录
    console.log('re login')

    // 如果是不用登录的页面
    if (whiteList.indexOf(to.path) >= 0) {
      // 在白名单，直接跳转
      next();
    } else {
      // re login
      setTimeout(() => {
        next(`/login?redirect=${to.path}`)
        console.log(to.path)
        NProgress.done();
      }, 500)
    }
  }
  
})

// 路由守卫的结束
router.afterEach(() => {
  NProgress.done();
});


new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
