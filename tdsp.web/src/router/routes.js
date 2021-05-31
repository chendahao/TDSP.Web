import Layout from '@/components/layout/Layout.vue'
import Login from '@/views/Login.vue'

/*
* meta: keepalive 是否开启keepAlive
*       needlogin 需要登录
*       fullwith  内容两边是否留白
*       nolayout  不使用layout
 */

const baseRoutes = [
  {
    path: '/',
    name: 'main',
    component: Layout,
    meta: {
      icon: 'home',
      keepAlive: false,
      needLogin: true,
      title: '首页',
      fullwidth: false,
      hideInMenu: true
    },
    children: [
      {
        path: '/',
        name: 'home',
        component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
        meta: {
          keepAlive: false,
          icon: 'home',
          needLogin: true,
          title: 'home',
          fullwidth: false,
          hideInMenu: true
        }
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      keepAlive: false,
      icon: 'home',
      needLogin: false,
      title: '登录',
      fullwidth: false,
      hideInMenu: true
    }
  },
  {
    path: '/404',
    name: '404',
    component: () => import(/* webpackChunkName: "404" */ '@/views/404page.vue'),
    meta: {
      keepAlive: false,
      icon: 'home',
      needLogin: true,
      title: '404',
      fullwidth: false,
      hideInMenu: true
    }
  },
  {
    path: '/401',
    name: '401',
    component: () => import(/* webpackChunkName: "401" */ '@/views/401page.vue'),
    meta: {
      keepAlive: false,
      icon: 'home',
      needLogin: true,
      title: '401',
      fullwidth: false,
      hideInMenu: true
    }
  }
]

const misRoutes = [
  {
    path: '/',
    name: 'routers',
    redirect: 'home',
    component: Layout,
    meta: {
      keepAlive: false,
      icon: 'home', // 是否需要被缓存
      needLogin: true,
      title: '首页',
      fullwidth: false
    },
    children: [
      // base
      // 港池
      {
        path: '/base/berthview',
        name: 'berthview',
        component: () => import(/* webpackChunkName: "berthview" */ '@/views/base/berthview/index.vue'),
        meta: {
          keepAlive: false,
          icon: 'home',
          needLogin: true,
          title: '港池信息',
          fullwidth: false,
          hideInMenu: false,
          access: ['admin']
        }
      },
      {
        path: '/base/nenv/harbor',
        name: 'harbor',
        component: () => import(/* webpackChunkName: "harbor" */ '@/views/base/nenv/harbor/index.vue'),
        meta: {
          keepAlive: true,
          needLogin: true,
          title: '港池信息',
          fullwidth: false,
          hideInMenu: false,
          access: ['admin']
        }
      },
      // 港池编辑
      {
        path: '/base/nenv/harbor/edit',
        name: 'harboredit',
        component: () => import(/* webpackChunkName: "harboredit" */ '@/views/base/nenv/harbor/edit.vue'),
        meta: {
          keepAlive: false,
          icon: 'home',
          needLogin: true,
          title: '港池信息',
          fullwidth: false,
          hideInMenu: true
        }
      },
      // 码头
      {
        path: '/base/nenv/wharf',
        name: 'wharf',
        component: () => import(/* webpackChunkName: "wharf" */ '@/views/base/nenv/wharf/index.vue'),
        meta: {
          keepAlive: true,
          needLogin: true,
          title: '码头信息',
          fullwidth: false,
          hideInMenu: false
        }
      },
      {
        path: '/base/nenv/wharf/edit',
        name: 'wharfedit',
        component: () => import(/* webpackChunkName: "wharfedit" */ '@/views/base/nenv/wharf/edit.vue'),
        meta: {
          keepAlive: false,
          icon: 'home',
          needLogin: true,
          title: '码头信息',
          fullwidth: false,
          hideInMenu: true
        }
      },
      // 泊位组
      {
        path: '/base/nenv/berthgroup',
        name: 'berthgroup',
        component: () => import(/* webpackChunkName: "berthgroup" */ '@/views/base/nenv/berthgroup/index.vue'),
        meta: {
          keepAlive: true,
          needLogin: true,
          title: '泊位组信息',
          fullwidth: false,
          hideInMenu: false
        }
      },
      {
        path: '/base/nenv/berthgroup/edit',
        name: 'berthgroupedit',
        component: () => import(/* webpackChunkName: "berthgroupedit" */ '@/views/base/nenv/berthgroup/edit.vue'),
        meta: {
          keepAlive: false,
          icon: 'home',
          needLogin: true,
          title: '泊位组信息',
          fullwidth: false,
          hideInMenu: true
        }
      },
      // 泊位
      {
        path: '/base/nenv/berth',
        name: 'berth',
        component: () => import(/* webpackChunkName: "berth" */ '@/views/base/nenv/berth/index.vue'),
        meta: {
          keepAlive: true,
          needLogin: true,
          title: '泊位信息',
          fullwidth: false,
          hideInMenu: false
        }
      },
      {
        path: '/base/nenv/berth/edit',
        name: 'berthedit',
        component: () => import(/* webpackChunkName: "berthedit" */ '@/views/base/nenv/berth/edit.vue'),
        meta: {
          keepAlive: false,
          icon: 'home',
          needLogin: true,
          title: '泊位信息',
          fullwidth: false,
          hideInMenu: true
        }
      },
      // 航道
      {
        path: '/base/nenv/channel',
        name: 'channel',
        component: () => import(/* webpackChunkName: "channel" */ '@/views/base/nenv/channel/index.vue'),
        meta: {
          keepAlive: true,
          needLogin: true,
          title: '航道信息',
          fullwidth: false,
          hideInMenu: false
        }
      },
      {
        path: '/base/nenv/channel/edit',
        name: 'channeledit',
        component: () => import(/* webpackChunkName: "channeledit" */ '@/views/base/nenv/channel/edit.vue'),
        meta: {
          keepAlive: false,
          icon: 'home',
          needLogin: true,
          title: '航道信息',
          fullwidth: false,
          hideInMenu: true
        }
      },
      // 锚地
      {
        path: '/base/nenv/anchorage',
        name: 'anchorage',
        component: () => import(/* webpackChunkName: "anchorage" */ '@/views/base/nenv/anchorage/index.vue'),
        meta: {
          keepAlive: true,
          needLogin: true,
          title: '锚地信息',
          fullwidth: false,
          hideInMenu: false
        }
      },
      {
        path: '/base/nenv/anchorage/edit',
        name: 'anchorageedit',
        component: () => import(/* webpackChunkName: "anchorageedit" */ '@/views/base/nenv/anchorage/edit.vue'),
        meta: {
          keepAlive: false,
          icon: 'home',
          needLogin: true,
          title: '锚地信息',
          fullwidth: false,
          hideInMenu: true
        }
      },
      // 定线制
      {
        path: '/base/nenv/customline',
        name: 'customline',
        component: () => import(/* webpackChunkName: "customlint" */ '@/views/base/nenv/customline/index.vue'),
        meta: {
          keepAlive: true,
          needLogin: true,
          title: '定线制信息',
          fullwidth: false,
          hideInMenu: false
        }
      },
      {
        path: '/base/nenv/customline/edit',
        name: 'customlineedit',
        component: () => import(/* webpackChunkName: "customlineedit" */ '@/views/base/nenv/customline/edit.vue'),
        meta: {
          keepAlive: false,
          icon: 'home',
          needLogin: true,
          title: '定线制信息',
          fullwidth: false,
          hideInMenu: true
        }
      },
      // 涉水工程
      {
        path: '/base/nenv/wadingworks',
        name: 'wadingWorks',
        component: () => import(/* webpackChunkName: "wadingWorks" */ '@/views/base/nenv/wadingWorks/index.vue'),
        meta: {
          keepAlive: true,
          needLogin: true,
          title: '涉水工程',
          fullwidth: false,
          hideInMenu: false
        }
      },
      {
        path: '/base/nenv/wadingworks/edit',
        name: 'wadingWorksedit',
        component: () => import(/* webpackChunkName: "wadingWorksedit" */ '@/views/base/nenv/wadingWorks/edit.vue'),
        meta: {
          keepAlive: false,
          icon: 'home',
          needLogin: true,
          title: '涉水工程',
          fullwidth: false,
          hideInMenu: true
        }
      },
      // 船舶标识
      {
        path: '/base/shipmark',
        name: 'shipmark',
        component: () => import(/* webpackChunkName: "shipmark" */ '@/views/base/shipmark/index.vue'),
        meta: {
          keepAlive: true,
          needLogin: true,
          title: '船舶标识',
          fullwidth: false,
          hideInMenu: false
        }
      },
      {
        path: '/base/shipmark/edit',
        name: 'shipmarkdit',
        component: () => import(/* webpackChunkName: "shipmarkdit" */ '@/views/base/shipmark/edit.vue'),
        meta: {
          keepAlive: false,
          icon: 'home',
          needLogin: true,
          title: '船舶标识',
          fullwidth: false,
          hideInMenu: true
        }
      },
      // 自定义区域
      {
        path: '/base/nenv/customarea',
        name: 'customarea',
        component: () => import(/* webpackChunkName: "customarea" */ '@/views/base/nenv/customarea/index.vue'),
        meta: {
          keepAlive: true,
          needLogin: true,
          title: '自定义区域',
          fullwidth: false,
          hideInMenu: false
        }
      },
      {
        path: '/base/nenv/customarea/edit',
        name: 'customareaedit',
        component: () => import(/* webpackChunkName: "customareaedit" */ '@/views/base/nenv/customarea/edit.vue'),
        meta: {
          keepAlive: false,
          icon: 'home',
          needLogin: true,
          title: '自定义区域',
          fullwidth: false,
          hideInMenu: false
        }
      },
      // 助航设施
      {
        path: '/base/nenv/facility',
        name: 'facility',
        component: () => import(/* webpackChunkName: "facility" */ '@/views/base/nenv/facility/index.vue'),
        meta: {
          keepAlive: true,
          needLogin: true,
          title: '助航设施',
          fullwidth: false,
          hideInMenu: false
        }
      },
      {
        path: '/base/nenv/facility/edit',
        name: 'facilityedit',
        component: () => import(/* webpackChunkName: "facilityedit" */ '@/views/base/nenv/facility/edit.vue'),
        meta: {
          keepAlive: false,
          icon: 'home',
          needLogin: true,
          title: '助航设施',
          fullwidth: false,
          hideInMenu: false
        }
      },
      // base end
      // plan
      // 船舶计划审核
      {
        path: '/plan/check',
        name: 'plancheck',
        component: () => import(/* webpackChunkName: "plancheck" */ '@/views/plan/plancheck/index.vue'),
        meta: {
          keepAlive: false,
          icon: 'home',
          needLogin: true,
          title: '动态计划审核',
          fullwidth: false,
          hideInMenu: false
        }
      },
      // 船舶计划查询
      {
        path: '/plan/list',
        name: 'planlist',
        component: () => import(/* webpackChunkName: "planlist" */ '@/views/plan/planlist/index.vue'),
        meta: {
          keepAlive: false,
          icon: 'home',
          needLogin: true,
          title: '动态计划查询',
          fullwidth: false,
          hideInMenu: false
        }
      },
      // 智能排序
      {
        path: '/plan/smartsort',
        name: 'smartSort',
        component: () => import(/* webpackChunkName: "smartSort" */ '@/views/plan/smartsort/index.vue'),
        meta: {
          keepAlive: false,
          icon: 'home',
          needLogin: true,
          title: '智能排序',
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
          icon: 'home',
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
      // 动态计划查询
      {
        path: '/tdyn/shipplan',
        name: 'ShipPlan',
        component: () => import(/* webpackChunkName: "ShipPlan" */ '@/views/tdyn/shipplan/index.vue'),
        meta: {
          keepAlive: true,
          needLogin: true,
          title: '动态计划查询',
          fullwidth: false,
          hideInMenu: false
        }
      },
      // 历史计划查询
      {
        path: '/tdyn/planhistory',
        name: 'planhistpry',
        component: () => import(/* webpackChunkName: "planhistpry" */ '@/views/tdyn/planhistory/index.vue'),
        meta: {
          keepAlive: false,
          icon: 'home',
          needLogin: true,
          title: '历史计划查询',
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
          icon: 'home',
          needLogin: true,
          title: '新闻公告',
          fullwidth: false,
          hideInMenu: false
        }
      },
      {
        path: '/tinfo/news/detail',
        name: 'newsdetail',
        component: () => import(/* webpackChunkName: "newsdetail" */ '@/views/tinfo/news/detail.vue'),
        meta: {
          keepAlive: false,
          icon: 'home',
          needLogin: true,
          title: '新闻公告',
          fullwidth: false,
          hideInMenu: false
        }
      },
      {
        path: '/tinfo/news',
        name: 'newsindex',
        component: () => import(/* webpackChunkName: "newsindex" */ '@/views/tinfo/news/index.vue'),
        meta: {
          keepAlive: false,
          icon: 'home',
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
          hideInMenu: false
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
      },
      // tinfo end
      // 统计分析 chart
      // 自定义区域船舶统计
      {
        path: '/chart/customarea',
        name: 'CustomAreaChart',
        component: () => import(/* webpackChunkName: "CustomAreaChart" */ '@/views/chart/customarea/index.vue'),
        meta: {
          keepAlive: false,
          icon: 'home',
          needLogin: true,
          title: '自定义区域船舶统计',
          fullwidth: false,
          hideInMenu: false
        }
      },
      // 定线制水域船舶统计
      {
        path: '/chart/customline',
        name: 'CustomLineChart',
        component: () => import(/* webpackChunkName: "CustomLineChart" */ '@/views/chart/customline/index.vue'),
        meta: {
          keepAlive: false,
          icon: 'home',
          needLogin: true,
          title: '定线制水域船舶统计',
          fullwidth: false,
          hideInMenu: false
        }
      },
      // 报告线水域船舶统计
      {
        path: '/chart/reportline',
        name: 'ReportLineChart',
        component: () => import(/* webpackChunkName: "ReportLineChart" */ '@/views/chart/reportline/index.vue'),
        meta: {
          keepAlive: false,
          icon: 'home',
          needLogin: true,
          title: '报告线水域船舶统计',
          fullwidth: false,
          hideInMenu: false
        }
      },
      // 港口吞吐量统计
      {
        path: '/chart/throughput',
        name: 'Throughput',
        component: () => import(/* webpackChunkName: "Throughput" */ '@/views/chart/throughput/index.vue'),
        meta: {
          keepAlive: false,
          icon: 'home',
          needLogin: true,
          title: '港口吞吐量统计',
          fullwidth: false,
          hideInMenu: false
        }
      },
      {
        path: '/chart/wharfthroughput',
        name: 'Throughputwharf',
        component: () => import(/* webpackChunkName: "Throughputwharf" */ '@/views/chart/throughput/wharf.vue'),
        meta: {
          keepAlive: false,
          icon: 'home',
          needLogin: true,
          title: '码头吞吐量统计',
          fullwidth: false,
          hideInMenu: false
        }
      },
      // 交通流统计
      {
        path: '/chart/transline',
        name: 'TransLine',
        component: () => import(/* webpackChunkName: "TransLine" */ '@/views/chart/transline/index.vue'),
        meta: {
          keepAlive: false,
          icon: 'home',
          needLogin: true,
          title: '交通流统计',
          fullwidth: false,
          hideInMenu: false
        }
      },
      {
        path: '/chart/transline/list',
        name: 'TransLinelist',
        component: () => import(/* webpackChunkName: "TransLinelist" */ '@/views/chart/transline/list.vue'),
        meta: {
          keepAlive: false,
          icon: 'home',
          needLogin: true,
          title: '交通流量线',
          fullwidth: false,
          hideInMenu: false
        }
      },
      {
        path: '/chart/transline/edit',
        name: 'TransLineedit',
        component: () => import(/* webpackChunkName: "TransLineedit" */ '@/views/chart/transline/edit.vue'),
        meta: {
          keepAlive: false,
          icon: 'home',
          needLogin: true,
          title: '交通流量线',
          fullwidth: false,
          hideInMenu: false
        }
      },
      {
        path: '/chart/transline/drawline',
        name: 'TransLindrawline',
        component: () => import(/* webpackChunkName: "TransLindrawline" */ '@/views/chart/transline/drawline.vue'),
        meta: {
          keepAlive: false,
          icon: 'home',
          needLogin: true,
          title: '交通流量线',
          fullwidth: false,
          hideInMenu: false
        }
      },
      // 泊位占用统计
      {
        path: '/chart/berth',
        name: 'berthchart',
        component: () => import(/* webpackChunkName: "berthchart" */ '@/views/chart/berthstatus/index.vue'),
        meta: {
          keepAlive: false,
          icon: 'home',
          needLogin: true,
          title: '泊位占用统计',
          fullwidth: false,
          hideInMenu: false
        }
      },
      {
        path: '/chart/complex',
        name: 'complex',
        component: () => import(/* webpackChunkName: "complex" */ '@/views/chart/complex/index.vue'),
        meta: {
          keepAlive: false,
          icon: 'home',
          needLogin: true,
          title: '交通流量综合统计',
          fullwidth: false,
          hideInMenu: false
        }
      },
      {
        path: '/chart/form',
        name: 'form',
        component: () => import(/* webpackChunkName: "form" */ '@/views/chart/throughput/form.vue'),
        meta: {
          keepAlive: false,
          icon: 'home',
          needLogin: true,
          title: '吞吐量统计表',
          fullwidth: false,
          hideInMenu: false
        }
      },
      // 系统管理 sys
      {
        path: '/sys/user',
        name: 'user',
        component: () => import(/* webpackChunkName: "user" */ '@/views/sys/user/index.vue'),
        meta: {
          keepAlive: false,
          icon: 'home',
          needLogin: true,
          title: '用户管理',
          fullwidth: false,
          hideInMenu: false
        }
      },
      {
        path: '/sys/user/edit',
        name: 'useredit',
        component: () => import(/* webpackChunkName: "useredit" */ '@/views/sys/user/edit.vue'),
        meta: {
          keepAlive: false,
          icon: 'home',
          needLogin: true,
          title: '用户管理',
          fullwidth: false,
          hideInMenu: false
        }
      },
      {
        path: '/sys/user/regist',
        name: 'userregist',
        component: () => import(/* webpackChunkName: "userregist" */ '@/views/sys/user/regist.vue'),
        meta: {
          keepAlive: false,
          icon: 'home',
          needLogin: true,
          title: '用户注册',
          fullwidth: false,
          hideInMenu: false
        }
      },
      {
        path: '/sys/user/role',
        name: 'userrole',
        component: () => import(/* webpackChunkName: "userrole" */ '@/views/sys/user/userrole.vue'),
        meta: {
          keepAlive: false,
          icon: 'home',
          needLogin: true,
          title: '用户管理',
          fullwidth: false,
          hideInMenu: false
        }
      },
      {
        path: '/sys/role',
        name: 'role',
        component: () => import(/* webpackChunkName: "role" */ '@/views/sys/role/index.vue'),
        meta: {
          keepAlive: false,
          icon: 'home',
          needLogin: true,
          title: '角色管理',
          fullwidth: false,
          hideInMenu: false
        }
      },
      {
        path: '/sys/org',
        name: 'org',
        component: () => import(/* webpackChunkName: "org" */ '@/views/sys/org/index.vue'),
        meta: {
          keepAlive: false,
          icon: 'home',
          needLogin: true,
          title: '组织机构管理',
          fullwidth: false,
          hideInMenu: false
        }
      },
      {
        path: '/sys/org/edit',
        name: 'orgedit',
        component: () => import(/* webpackChunkName: "orgedit" */ '@/views/sys/org/edit.vue'),
        meta: {
          keepAlive: false,
          icon: 'home',
          needLogin: true,
          title: '组织机构管理',
          fullwidth: false,
          hideInMenu: false
        }
      }
    ]
  }
  // sys end
]

export default [
  ...baseRoutes,
  ...misRoutes
]
