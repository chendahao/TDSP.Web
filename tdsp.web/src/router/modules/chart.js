import Layout from '@/components/layout/Layout.vue'

const chartRoutes = {
  path: '/',
  name: 'chart',
  redirect: '',
  component: Layout,
  meta: {
    keepAlive: false,
    icon: 'bar_chart', // 是否需要被缓存
    needLogin: true,
    title: '统计分析',
    fullwidth: false
  },
  children: [
    // 统计分析 chart
    // 自定义区域船舶统计
    {
      path: '/chart/customarea',
      name: 'CustomAreaChart',
      component: () => import(/* webpackChunkName: "CustomAreaChart" */ '@/views/chart/customarea/index.vue'),
      meta: {
        keepAlive: false,
        icon: '',
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
        icon: '',
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
        icon: '',
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
        icon: '',
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
        icon: '',
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
        icon: '',
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
        icon: '',
        needLogin: true,
        title: '交通流量线',
        fullwidth: false,
        hideInMenu: true
      }
    },
    {
      path: '/chart/transline/edit',
      name: 'TransLineedit',
      component: () => import(/* webpackChunkName: "TransLineedit" */ '@/views/chart/transline/edit.vue'),
      meta: {
        keepAlive: false,
        icon: '',
        needLogin: true,
        title: '交通流量线',
        fullwidth: false,
        hideInMenu: true
      }
    },
    {
      path: '/chart/transline/drawline',
      name: 'TransLindrawline',
      component: () => import(/* webpackChunkName: "TransLindrawline" */ '@/views/chart/transline/drawline.vue'),
      meta: {
        keepAlive: false,
        icon: '',
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
        icon: '',
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
        icon: '',
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
        icon: '',
        needLogin: true,
        title: '吞吐量统计表',
        fullwidth: false,
        hideInMenu: false
      }
    }
  ]
}

export default chartRoutes
