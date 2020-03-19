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
        },
        {
          path: '/menu3',
          name: 'Menu3',
          component: () => import('@/views/menu/3'),
          meta: { title: 'Menu3' }
        },
        {
          path: '/menu4',
          name: 'Menu4',
          component: () => import('@/views/menu/4'),
          meta: { title: 'Menu4' }
        },
        {
          path: '/menu5',
          name: 'Menu5',
          component: () => import('@/views/menu/5'),
          meta: { title: 'Menu5' }
        },
        {
          path: '/menu6',
          name: 'Menu6',
          component: () => import('@/views/menu/6'),
          meta: { title: 'Menu' }
        }
      ]
    }
  ]
})
