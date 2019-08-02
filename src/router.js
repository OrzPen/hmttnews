import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    component: () =>
        import('@/views/tabbar-layout'),
    children: [{
      path: '/',
      name: 'home',
      component: () =>
          import('@/views/home')
    }]
  },
  {
    path: '/login',
    name: 'login',
    component: () =>
        import('@/views/login')
  },
  // 搜索组件路由配置
  {
    path: '/search',
    name: 'search',
    component: () =>
        import('@/views/search')
  },
  // 显示搜索结果组件
  {
    name: 'search-result',
    path: '/search-result/:queryText',
    component: () =>
        import('@/views/search/search-result.vue')
  }
  ]
})
