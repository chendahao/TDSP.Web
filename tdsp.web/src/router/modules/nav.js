import Layout from '@/components/layout/Layout.vue'

/*
* meta: keepalive 是否开启keepAlive
*       needlogin 需要登录
*       fullwith  内容两边是否留白
*       nolayout  不使用layout
 */

const NenvRoutes = {
  path: '/base',
  name: 'base',
  component: Layout,
  meta: {
    keepAlive: false,
    icon: 'library_books',
    needLogin: true,
    title: '通航环境',
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
        icon: '',
        needLogin: true,
        title: '港池信息',
        fullwidth: false,
        hideInMenu: true
        // access: ['']
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
        hideInMenu: false
        // access: ['']
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
        hideInMenu: true
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
        hideInMenu: true
      }
    }
  ]
}

export default NenvRoutes
