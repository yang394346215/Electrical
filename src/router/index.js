import Vue from 'vue'
import Router from 'vue-router'
//解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(Router)

import login from '../components/login.vue'
import home from '../components/home.vue'
import commain from '../components/commain/commain.vue'
import users from '../components/commain/users.vue'
import roles from '../components/commain/roles.vue'
import rights from '../components/commain/rights.vue'

import categories from '../components/commain/commodity/categories.vue'
import goods from '../components/commain/commodity/goods.vue'
import params from '../components/commain/commodity/params.vue'
import reports from '../components/commain/reports.vue'
import orders from '../components/commain/orders.vue'

const router = new Router({
  routes: [
    {path: '/',redirect: '/login'},
    {path: '/login',component: login},
    {
      path: '/home',
      component: home,
      redirect: '/commain',
      children: [
        {path: '/commain',component: commain},
        {path: '/users',component: users},
        {path: '/roles',component: roles},
        {path: '/rights',component: rights},
        {path: '/categories',component: categories},
        {path: '/goods',component: goods},
        {path: '/params',component: params},
        {path: '/reports',component: reports},
        {path: '/orders',component: orders}
      ]
    }
  ]
})
//给路由对象挂载路由导航守卫beforeEach
router.beforeEach((to, from, next) => {
  //to 将要访问的路径
  //from 从哪个路径跳转而来
  //next 通过
  //    next()通过  next('/login') 强制跳转
  if (to.path === '/login') {
    next()
  } else {
    if (window.sessionStorage.getItem('token')) {
      next()
    } else {
      next('/login')
    }
  }
})

export default router
