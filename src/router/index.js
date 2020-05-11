import Vue from 'vue'
import Router from 'vue-router'

const layout = import('@/layout');

Vue.use(Router)
export const router = [{
    path: '/',
    name: 'index',
    component: () => import('@/views/home/index'), // 路由懒加载
    meta: {
      title: '消息', // 页面标题
      keepAlive: false, // keep-alive 标识
      noTopbar: true
    }
  },
  {
    path: '/client',
    name: 'client',
    component: () => import('@/views/client'),
    meta: {
      title: '客户',
      keepAlive: false,
      noTopbar: true
    }
  },
  {
    path: '/workbench',
    name: 'workbench',
    redirect: '/workbench/home',
    component: () => layout,
    // meta: {
    //   title: '工作台',
    //   keepAlive: false,
    //   noTopbar: true
    // },
    children:[
      {
        path: 'home',
        name: 'workbench-home',
        component: () => import('@/views/workbench/home'),
        meta: {
          title: '工作台',
          keepAlive: false,
          noTopbar: true
        }
      },
      {
        path: 'corp-manage',
        name: 'corp-manage',
        component: () => import('@/views/workbench/corp-manage'),
        meta: {
          title: '管理企业',
          keepAlive: false,
        }
      },
    ]
  },
  {
    path: '/find',
    name: 'find',
    component: () => import('@/views/find'),
    meta: {
      title: '发现',
      keepAlive: false,
      noTopbar: true

    }
  },
  {
    path: '/my',
    name: 'my',
    component: () => import('@/views/my'),
    meta: {
      title: '我的',
      keepAlive: false,
      noTopbar: true

    }
  }
]

const createRouter = () =>
  new Router({
    // mode: 'history', // 如果你是 history模式 需要配置vue.config.js publicPath
    // base: '/app/',
    scrollBehavior: () => ({
      y: 0
    }),
    routes: router
  })

export default createRouter()