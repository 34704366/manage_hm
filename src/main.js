import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import App from './App.vue'
import router from '../router'
import store from './store'
import http from 'axios'
import SvgIcon from './components/SvgIcon'


Vue.config.productionTip = false;
Vue.use(ElementUI);
// 全局注册SvgIcon组件
Vue.component('svg-icon', SvgIcon);

Vue.prototype.$http = http


// 远程引入在线的iconfont字体库，线上需要修改成本地引入
let sp = document.createElement('script');
sp.src = '//at.alicdn.com/t/c/font_3753930_062l9pfndog5.js';
document.body.appendChild(sp);

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
