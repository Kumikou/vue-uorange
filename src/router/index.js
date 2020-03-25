import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  mode: 'history',
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
      path: '/order/:goodsId',
      name: 'Order',
      component: () => import('@/views/order/index')
    },
    {
      path: '/alipay',
      name: 'Alipay',
      component: () => import('@/views/alipay/index')
    },
    {
      path: '/alipay/result',
      name: 'Alipay',
      component: () => import('@/views/aliresult/index')
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
          path: '/info',
          component: () => import('@/views/menu/info'),
          meta: { title: 'info' }
        },
        {
          path: '/followed',
          component: () => import('@/views/menu/followed'),
          meta: { title: 'followed' }
        },
        {
          path: '/publish',
          component: () => import('@/views/menu/publish'),
          meta: { title: 'publish' }
        },
        {
          path: '/bought',
          component: () => import('@/views/menu/bought'),
          meta: { title: 'bought' }
        },
        {
          path: '/collection',
          component: () => import('@/views/menu/collection'),
          meta: { title: 'collection' }
        },
        {
          path: '/sold',
          component: () => import('@/views/menu/sold'),
          meta: { title: 'sold' }
        },
        {
          path: '/address',
          component: () => import('@/views/menu/address'),
          meta: { title: 'address' }
        }
      ]
    }
  ]
})
