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
      path: '/tug/status',
      name: 'tugstatus',
      component: () => import(/* webpackChunkName: "tuglist" */ '@/views/task/tugStatus/index.vue'),
      meta: {
        keepAlive: false,
        icon: '',
        needLogin: true,
        title: '拖轮作业看板',
        fullwidth: false,
        hideInMenu: false
      }
    }
  ]
}

export default tugRoutes