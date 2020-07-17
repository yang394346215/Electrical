import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import login from '../components/login.vue'
import home from '../components/home.vue'
const router = new Router({
  routes: [
    {path:'/',redirect:'/login'},
    {path:'/login',component:login},
    {path:'/home',component:home}
  ]
})
//给路由对象挂载路由导航守卫beforeEach
router.beforeEach((to,from,next)=>{
  //to 将要访问的路径
  //from 从哪个路径跳转而来
  //next 通过
  //    next()通过  next('/login') 强制跳转
  if(to.path === '/login'){
    next()
  }else{
    if(window.sessionStorage.getItem('token')){
      next()
    }else{
      next('/login')
    }
  }
})

export default router
