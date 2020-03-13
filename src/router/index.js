import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'HelloWorld',
    //   component: HelloWorld
    // }
    {
      path: '/',
      name: 'Index',
      component: () => import('@/views/index')
    },
    {
      path: '/detail',
      name: 'Detail',
      component: () => import('@/views/detail/index')
    },
    {
      path: '/personal',
      name: 'Personal',
      component: () => import('@/views/personal/index'),
      meta: {
        title: '个人中心'
      },
      children: [
        {
          path: '/menu1',
          name: 'Menu1',
          component: () => import('@/views/menu/1'),
          meta: { title: 'Menu1' }
        },
        {
          path: '/menu2',
          name: 'Menu2',
          component: () => import('@/views/menu/2'),
          meta: { title: 'Menu2' }
        }
      ]
    }
  ]
})
