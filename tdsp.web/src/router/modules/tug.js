import Layout from '@/components/layout/Layout.vue'

const tugRoutes = {
  path: '/',
  name: 'tug',
  component: Layout,
  meta: {
    keepAlive: false,
    icon: 'featured_play_list', // 是否需要被缓存
    needLogin: true,
    title: '作业',
    fullwidth: false
  },
  children: [
    {
      path: '/tug/plan',
      name: 'tugplan',
      component: () => import(/* webpackChunkName: "tuglist" */ '@/views/task/plan/index.vue'),
      meta: {
        keepAlive: false,
        icon: '',
        needLogin: true,
        title: '船舶计划',
        fullwidth: false,
        hideInMenu: false
      }
    },
    {
      path: '/tug/list',
      name: 'tuglist',
      component: () => import(/* webpackChunkName: "tuglist" */ '@/views/task/tugList/index.vue'),
      meta: {
        keepAlive: false,
        icon: '',
        needLogin: true,
        title: '拖轮信息',
        fullwidth: false,
        hideInMenu: false
      }
    },
    {
      path: '/tug/edit',
      name: 'tugedit',
      component: () => import(/* webpackChunkName: "tugedit" */ '@/views/task/tugList/edit.vue'),
      meta: {
        keepAlive: false,
        icon: '',
        needLogin: true,
        title: '拖轮信息',
        fullwidth: false,
        hideInMenu: true
      }
    },
    {
      path: '/tug/standard',
      name: 'tugstandard',
      component: () => import(/* webpackChunkName: "tugstandard" */ '@/views/task/tugStandard/index.vue'),
      meta: {
        keepAlive: false,
        icon: '',
        needLogin: true,
        title: '配备标准',
        fullwidth: false,
        hideInMenu: false
      }
    },
    {
      path: '/tug/standard/edit',
      name: 'tugstandardedit',
      component: () => import(/* webpackChunkName: "tugstandardedit" */ '@/views/task/tugStandard/edit.vue'),
      meta: {
        keepAlive: false,
        icon: '',
        needLogin: true,
        title: '配备标准',
        fullwidth: false,
        hideInMenu: true
      }
    },
    {
      path: '/tug/tugjobkind',
      name: 'tugjobkind',
      component: () => import(/* webpackChunkName: "tugjobkind" */ '@/views/task/tugJobKind/index.vue'),
      meta: {
        keepAlive: false,
        icon: '',
        needLogin: true,
        title: '作业类型',
        fullwidth: false,
        hideInMenu: false
      }
    },
    {
      path: '/tug/tugjobkind/edit',
      name: 'tugjobkindedit',
      component: () => import(/* webpackChunkName: "tugjobkindedit" */ '@/views/task/tugJobKind/edit.vue'),
      meta: {
        keepAlive: false,
        icon: '',
        needLogin: true,
        title: '作业类型',
        fullwidth: false,
        hideInMenu: true
      }
    },
    {
      path: '/tug/status',
      name: 'tugstatus',
      component: () => import(/* webpackChunkName: "tuglist" */ '@/views/task/tugStatus/index.vue'),
      meta: {
        keepAlive: false,
        icon: '',
        needLogin: true,
        title: '拖轮实时状态',
        fullwidth: false,
        hideInMenu: false
      }
    },
    {
      path: '/tug/kanban',
      name: 'tugkanban',
      component: () => import(/* webpackChunkName: "tuglist" */ '@/views/task/tugKanban/index.vue'),
      meta: {
        keepAlive: false,
        icon: '',
        needLogin: true,
        title: '拖轮作业看板',
        fullwidth: false,
        hideInMenu: false
      }
    },
    {
      path: '/plan/kanban',
      name: 'plankanban',
      component: () => import(/* webpackChunkName: "tuglist" */ '@/views/task/planKanban/index.vue'),
      meta: {
        keepAlive: false,
        icon: '',
        needLogin: true,
        title: '船舶计划看板',
        fullwidth: false,
        hideInMenu: false
      }
    },
    {
      path: '/plan/kanban2',
      name: 'plankanban2',
      component: () => import(/* webpackChunkName: "plankanban2" */ '@/views/task/planKanban/index2.vue'),
      meta: {
        keepAlive: false,
        icon: '',
        needLogin: true,
        title: '船舶计划看板',
        fullwidth: false,
        hideInMenu: true
      }
    },
    {
      path: '/plan/list',
      name: 'planlist2',
      component: () => import(/* webpackChunkName: "planlist2" */ '@/views/task/planKanban/plan.vue'),
      meta: {
        keepAlive: false,
        icon: '',
        needLogin: true,
        title: '船舶计划编排',
        fullwidth: false,
        hideInMenu: false
      }
    },
    {
      path: '/planrecord',
      name: 'planrecord',
      component: () => import(/* webpackChunkName: "planrecord" */ '@/views/task/planrecord/index.vue'),
      meta: {
        keepAlive: false,
        icon: '',
        needLogin: true,
        title: '拖轮作业记录',
        fullwidth: false,
        hideInMenu: false
      }
    }
  ]
}

export default tugRoutes
