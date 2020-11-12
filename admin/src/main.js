import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'normalize.css/normalize.css' // a modern alternative to CSS resets
import './style.css';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

// 引入封装的axios组件
import http from './http'

Vue.use(ElementUI);

Vue.config.productionTip = false

//原型挂载
Vue.prototype.$http = http


new Vue({
  el: '#app',
  router,
  // store,
  render: h => h(App)
})
