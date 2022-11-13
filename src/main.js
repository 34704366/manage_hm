import Vue from 'vue'
import ElementUI, { Message } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import App from './App.vue'
import router from '../router'
import store from './store'
import SvgIcon from './components/SvgIcon'
import NProgress from 'nprogress'
import { getToken } from '@/utils/auth'
 
Vue.config.productionTip = false;
Vue.use(ElementUI);
// 全局注册SvgIcon组件
Vue.component('svg-icon', SvgIcon);



// 远程引入在线的iconfont字体库，线上需要修改成本地引入
let sp = document.createElement('script');
sp.src = '//at.alicdn.com/t/c/font_3753930_e9vuuh4sxm4.js';
document.body.appendChild(sp);


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
      NProgress.done();
    } else {
      const hasRoles = store.getters.roles && store.getters.roles.length > 0
      if (hasRoles) {
        // 如果已经有了权限
        next();
      } else {
        try {
          // const { roles } = await store.dispatch('user/getInfo');
          const result = await store.dispatch('user/getInfo')
          console.log({ ...to, replace: true })
          // next({ ...to, replace: true })
        } catch (error) {
          // remove token and go to login page to re-login
          // await store.dispatch('user/resetToken')

          Message.error(error || 'has error')
          console.log(error)
          NProgress.done();
        }
      }
    }
    next();
  } else {
    // 重新登录

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
