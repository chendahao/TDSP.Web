import Layout from '@/components/layout/Layout.vue'

const planRoutes = {
  path: '/',
  name: 'routers',
  redirect: 'home',
  component: Layout,
  meta: {
    keepAlive: false,
    icon: 'directions_boat', // 是否需要被缓存
    needLogin: true,
    title: '船舶计划',
    fullwidth: false
  },
  children: [     
    // plan
    // 船舶计划查询
    {
      path: '/plan/list',
      name: 'planlist',
      component: () => import(/* webpackChunkName: "planlist" */ '@/views/plan/planlist/index.vue'),
      meta: {
        keepAlive: false,
        icon: '',
        needLogin: true,
        title: '动态计划查询',
        fullwidth: false,
        hideInMenu: false
      }
    },
    // 执行
    {
      path: '/plan/planaction',
      name: 'planAction',
      component: () => import(/* webpackChunkName: "planAction" */ '@/views/plan/planaction/index.vue'),
      meta: {
        keepAlive: false,
        icon: '',
        needLogin: true,
        title: '计划执行',
        fullwidth: false,
        hideInMenu: false
      }
    },
    // plan end
    // tdyn
    // 交通动态
    {
      path: '/tdyn/realtime',
      name: 'realtime',
      component: () => import(/* webpackChunkName: "realtime" */ '@/views/tdyn/realtime/index.vue'),
      meta: {
        keepAlive: true,
        needLogin: true,
        title: '实时船舶信息',
        fullwidth: false,
        hideInMenu: false
      }
    },
    // 动态计划执行查询
    {
      path: '/tdyn/planaction',
      name: 'PlanActionsearch',
      component: () => import(/* webpackChunkName: "PlanActionsearch" */ '@/views/tdyn/planaction/index.vue'),
      meta: {
        keepAlive: true,
        needLogin: true,
        title: '计划执行查询',
        fullwidth: false,
        hideInMenu: false
      }
    },
    // 交通动态 tdyn end
    // tinfo 交通信息
    // 潮汐
    {
      path: '/tinfo/tide',
      name: 'tide',
      component: () => import(/* webpackChunkName: "tide" */ '@/views/tinfo/search/tide/index.vue'),
      meta: {
        keepAlive: true,
        needLogin: true,
        title: '潮汐信息',
        fullwidth: false,
        hideInMenu: false
      }
    },
    {
      path: '/tinfo/news/edit',
      name: 'newsedit',
      component: () => import(/* webpackChunkName: "newsedit" */ '@/views/tinfo/news/edit.vue'),
      meta: {
        keepAlive: false,
        icon: '',
        needLogin: true,
        title: '新闻公告',
        fullwidth: false,
        hideInMenu: true
      }
    },
    {
      path: '/tinfo/news/detail',
      name: 'newsdetail',
      component: () => import(/* webpackChunkName: "newsdetail" */ '@/views/tinfo/news/detail.vue'),
      meta: {
        keepAlive: false,
        icon: '',
        needLogin: true,
        title: '新闻公告',
        fullwidth: false,
        hideInMenu: true
      }
    },
    {
      path: '/tinfo/news',
      name: 'newsindex',
      component: () => import(/* webpackChunkName: "newsindex" */ '@/views/tinfo/news/index.vue'),
      meta: {
        keepAlive: false,
        icon: '',
        needLogin: true,
        title: '新闻公告',
        fullwidth: false,
        hideInMenu: false
      }
    },
    // 船舶数据库
    {
      path: '/tinfo/shipdatabase',
      name: 'shipdatabase',
      component: () => import(/* webpackChunkName: "shipdatabase" */ '@/views/tinfo/shipdatabase/index.vue'),
      meta: {
        keepAlive: true,
        needLogin: true,
        title: '船舶数据库',
        fullwidth: false,
        hideInMenu: false
      }
    },
    {
      path: '/tinfo/shipdatabase/edit',
      name: 'shipdatabaseedit',
      component: () => import(/* webpackChunkName: "shipdatabaseedit" */ '@/views/tinfo/shipdatabase/edit.vue'),
      meta: {
        keepAlive: true,
        needLogin: true,
        title: '船舶数据库',
        fullwidth: false,
        hideInMenu: true
      }
    },
    // 气象
    {
      path: '/tinfo/weather',
      name: 'weather',
      component: () => import(/* webpackChunkName: "weather" */ '@/views/tinfo/search/weather/index.vue'),
      meta: {
        keepAlive: true,
        needLogin: true,
        title: '气象信息',
        fullwidth: false,
        hideInMenu: false
      }
    }
  ]
}

export default planRoutes
