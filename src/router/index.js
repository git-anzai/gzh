import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: "/",
      redirect: "/login"
    },
    {
      path: '/login',
      name: 'login',
      component: (resolve) => require(['@/components/pages/workBench'], resolve)
    },
    {
      path: '/index',
      name: 'index',
      component: (resolve) => require(['@/components/common/index'], resolve),
      children: [
        {
          path: '/index',
          name: 'workBench',
          component: (resolve) => require(['@/components/pages/workBench'], resolve),
        }]
    }
  ]
})
