// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
//初始化ElementUI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
//导入全局css
import './assets/css/index.css'
//导入axios
import axios from 'axios'
//请求拦截器，每次通过axios访问时会先通过这里
axios.interceptors.request.use(config=>{
  //给请求头一个authorization属性配置token，后端需要授权api
  config.headers.authorization = window.sessionStorage.getItem('token')
  //必须return一个config出去
  return config
})
Vue.prototype.$axios = axios


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
