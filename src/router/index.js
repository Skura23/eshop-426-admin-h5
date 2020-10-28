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
    path: '/home/chat',
    name: 'index',
    component: () => import('@/views/home/chat'), // 路由懒加载
    meta: {
      title: '聊天', // 页面标题
      keepAlive: false, // keep-alive 标识
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
    path: '/client/detail',
    name: 'client-detail',
    component: () => import('@/views/client/detail'),
    meta: {
      title: '客户信息',
      keepAlive: false,
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
      {
        path: 'corp-manage/detail',
        name: 'corp-manage-detail',
        component: () => import('@/views/workbench/corp-manage/detail'),
        meta: {
          title: '资料',
          keepAlive: false,
        }
      },
      {
        path: 'order-manage',
        name: 'order-manage',
        component: () => import('@/views/workbench/order-manage'),
        meta: {
          title: '订单管理',
          keepAlive: false,
        }
      },
      {
        path: 'prepay-order',
        name: 'prepay-order',
        component: () => import('@/views/workbench/prepay-order'),
        meta: {
          title: '预付订单',
          keepAlive: false,
        }
      },
      {
        path: 'case-manage',
        name: 'case-manage',
        component: () => import('@/views/workbench/case-manage'),
        meta: {
          title: '案例管理',
          keepAlive: false,
        }
      },
      {
        path: 'case-manage/modi',
        name: 'case-manage-modi',
        component: () => import('@/views/workbench/case-manage/modi'),
        meta: {
          title: '案例发布',
          keepAlive: false,
        }
      },
      {
        path: 'banchuan-manage',
        name: 'banchuan-manage',
        component: () => import('@/views/workbench/banchuan-manage'),
        meta: {
          title: '板川产品',
          keepAlive: false,
        }
      },
      {
        path: 'banchuan-manage/detail',
        name: 'banchuan-manage-detail',
        component: () => import('@/views/workbench/banchuan-manage/detail'),
        meta: {
          title: '板川产品',
          keepAlive: false,
        }
      },
      {
        path: 'selfrun-manage',
        name: 'selfrun-manage',
        component: () => import('@/views/workbench/selfrun-manage'),
        meta: {
          title: '自营产品',
          keepAlive: false,
        }
      },
      {
        path: 'selfrun-manage/detail',
        name: 'selfrun-manage-detail',
        component: () => import('@/views/workbench/selfrun-manage/detail'),
        meta: {
          title: '自营产品',
          keepAlive: true,
        }
      },
      {
        path: 'selfrun-manage/class',
        name: 'selfrun-manage-class',
        component: () => import('@/views/workbench/selfrun-manage/class'),
        meta: {
          title: '产品分类',
          keepAlive: false,
        }
      },
      {
        path: 'turnover',
        name: 'turnover',
        component: () => import('@/views/workbench/turnover'),
        meta: {
          title: '营业额',
          keepAlive: false,
        }
      },
      {
        path: 'turnover/detail',
        name: 'turnover-detail',
        component: () => import('@/views/workbench/turnover/detail'),
        meta: {
          title: '我的收益',
          keepAlive: false,
        }
      },
      {
        path: 'cashout',
        name: 'cashout',
        component: () => import('@/views/workbench/cashout'),
        meta: {
          title: '佣金提现',
          keepAlive: false,
        }
      },
      {
        path: 'cashout/detail',
        name: 'cashout-detail',
        component: () => import('@/views/workbench/cashout/detail'),
        meta: {
          title: '佣金提现',
          keepAlive: false,
        }
      },
      {
        path: 'cashout/remainCashout',
        name: 'cashout-remainCashout',
        component: () => import('@/views/workbench/cashout/remainCashout'),
        meta: {
          title: '提现',
          keepAlive: false,
        }
      },
      
      {
        path: 'afterSale',
        name: 'afterSale',
        component: () => import('@/views/workbench/afterSale'),
        meta: {
          title: '售后管理',
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
  },
  {
    path: '/my/qr',
    name: 'my-qr',
    component: () => import('@/views/my/qr'),
    meta: {
      title: '名片码',
      keepAlive: false,
    }
  },
  {
    path: '/my/cash',
    name: 'my',
    component: () => import('@/views/my/cash'),
    meta: {
      title: '提现',
      keepAlive: false,
    }
  },
  {
    path: '/my/bill',
    name: 'my-bill',
    component: () => import('@/views/my/bill'),
    meta: {
      title: '账单',
      keepAlive: false,
    }
  },
  {
    path: '/my/goods',
    name: 'my',
    component: () => import('@/views/my/goods'),
    meta: {
      title: '推广商品',
      keepAlive: false,
    }
  },
  {
    path: '/my/cashoutbind',
    name: 'my',
    component: () => import('@/views/my/cashoutbind'),
    meta: {
      title: '提现绑定',
      keepAlive: false,
    }
  },
  {
    path: '/my/cashoutbind',
    name: 'my',
    component: () => import('@/views/my/cashoutbind'),
    meta: {
      title: '提现绑定',
      keepAlive: false,
    }
  },
  {
    path: '/my/card-edit',
    name: 'my-card-edit',
    component: () => import('@/views/my/card-edit'),
    meta: {
      title: '名片编辑',
      keepAlive: false,
      noTopbar: false
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login'),
    meta: {
      title: '我的',
      keepAlive: false,
      noTopbar: true

    }
  },
  {
    path: '/login/factory-list',
    name: 'factory-list',
    component: () => import('@/views/login/factory-list'),
    meta: {
      title: '店铺列表',
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