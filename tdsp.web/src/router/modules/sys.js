import Layout from '@/components/layout/Layout.vue'

const sysRoutes = {
  path: '/sys',
  name: 'sys',
  component: Layout,
  meta: {
    keepAlive: false,
    icon: 'settings', // 是否需要被缓存
    needLogin: true,
    title: '系统管理',
    fullwidth: false
    ,access: ['admin']
  },
  children: [      
    // 系统管理 sys
    {
      path: '/user',
      name: 'user',
      component: () => import(/* webpackChunkName: "user" */ '@/views/sys/user/index.vue'),
      meta: {
        keepAlive: false,
        icon: '',
        needLogin: true,
        title: '用户管理',
        fullwidth: false,
        hideInMenu: false
      }
    },
    {
      path: '/user/edit',
      name: 'useredit',
      component: () => import(/* webpackChunkName: "useredit" */ '@/views/sys/user/edit.vue'),
      meta: {
        keepAlive: false,
        icon: '',
        needLogin: true,
        title: '用户管理',
        fullwidth: false,
        hideInMenu: true
      }
    },
    {
      path: '/user/regist',
      name: 'userregist',
      component: () => import(/* webpackChunkName: "userregist" */ '@/views/sys/user/regist.vue'),
      meta: {
        keepAlive: false,
        icon: '',
        needLogin: true,
        title: '用户注册',
        fullwidth: false,
        hideInMenu: true
      }
    },
    {
      path: '/user/role',
      name: 'userrole',
      component: () => import(/* webpackChunkName: "userrole" */ '@/views/sys/user/userrole.vue'),
      meta: {
        keepAlive: false,
        icon: '',
        needLogin: true,
        title: '用户管理',
        fullwidth: false,
        hideInMenu: true
      }
    },
    {
      path: '/role',
      name: 'role',
      component: () => import(/* webpackChunkName: "role" */ '@/views/sys/role/index.vue'),
      meta: {
        keepAlive: false,
        icon: '',
        needLogin: true,
        title: '角色管理',
        fullwidth: false,
        hideInMenu: false
      }
    },
    {
      path: '/org',
      name: 'org',
      component: () => import(/* webpackChunkName: "org" */ '@/views/sys/org/index.vue'),
      meta: {
        keepAlive: false,
        icon: '',
        needLogin: true,
        title: '组织机构管理',
        fullwidth: false,
        hideInMenu: false
      }
    },
    {
      path: '/org/edit',
      name: 'orgedit',
      component: () => import(/* webpackChunkName: "orgedit" */ '@/views/sys/org/edit.vue'),
      meta: {
        keepAlive: false,
        icon: '',
        needLogin: true,
        title: '组织机构管理',
        fullwidth: false,
        hideInMenu: true
      }
    }
  ]
}

export default {
  ...sysRoutes
}
