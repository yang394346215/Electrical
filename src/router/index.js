import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import login from '../components/login.vue'
import home from '../components/home.vue'
export default new Router({
  routes: [
    {path:'/',redirect:'/login'},
    {path:'/login',component:login},
    {path:'/home',component:home}
  ]
})
