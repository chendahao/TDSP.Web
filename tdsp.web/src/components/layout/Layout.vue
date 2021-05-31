<template>
  <v-app id="inspire" :dark="dark">
    <div v-if="$route.meta.needLogin">
      <v-navigation-drawer
        v-model="drawer"
        dark
        fixed
        overflow
        app
        :temporary="temporary"
        disable-resize-watcher
        src="../../assets/drawer-img.jpg"
        style="background-color:#082338;width:256px;height:100%;z-index: 999;"
      >
        <v-list-item v-show="drawer" style="position: absolute;width:256px;height:66px;z-index:16;background-color:#0B518D;">
          <v-list-item-title class="font" style="color:#white;text-align:center;font-size:35px;z-index:16;">拖轮调度系统</v-list-item-title>
        </v-list-item>
        <!-- <img v-show="drawer" src="./assets/logo.png" alt style="position: absolute;width:256px;height:66px;z-index:16" /> -->
        <nav-list v-model="menuList"></nav-list>
      </v-navigation-drawer>
      <Layouttop v-on:CallBack="CallBack"></Layouttop>
      <v-main class="font">
        <!-- 这里去掉 container样式 container 默认两边留空 需要时在需要的页面上添加-->
        <template v-if="!$route.meta.fullwidth">
          <keep-alive :max="3">
            <router-view v-if="$route.meta.keepAlive"></router-view>
          </keep-alive>
          <router-view v-if="!$route.meta.keepAlive">
            <!-- 这里是不被缓存的视图组件，比如 Edit！ -->
          </router-view>
        </template>
        <template v-else>
          <v-container fluid>
            <keep-alive :max="3">
              <router-view v-if="$route.meta.keepAlive"></router-view>
            </keep-alive>
            <router-view v-if="!$route.meta.keepAlive">
              <!-- 这里是不被缓存的视图组件，比如 Edit！ -->
            </router-view>
          </v-container>
        </template>
      </v-main>
    </div>
    <div v-if="!$route.meta.needLogin">
      <router-view></router-view>
    </div>
    <v-snackbar
      :value="this.$store.state.errorShow"
      :color="this.$store.state.errorcolor"
      :timeout="this.$store.state.errortimeout"
      top='top'
      @input="snackbarClose"
    >
      {{ $store.state.errortext }}
      <template v-slot:action="{ attrs }">
        <v-btn
          dark
          text
          v-bind="attrs"
          @click.native="snackbarClose(false)"
        >
          关闭
        </v-btn>
      </template>
    </v-snackbar>
    <scrolltop />
  </v-app>
</template>

<script>
import Layouttop from './Layout_top.vue'
import navList from '@/components/NavList.vue'
import api from '@/api/auth/AccountApi'
import dayjs from 'dayjs'
import scrolltop from '@/components/ScrollTop'
import storagedata from '@/plugins/storagedata.js'
import { mapGetters } from 'vuex'
var RefreshT
export default {
  components: {
    Layouttop,
    navList,
    scrolltop
  },
  data: () => ({
    // 黑夜主题开关
    dark: false,
    // 左侧菜单栏控制开关
    drawer: true,
    temporary: false, // 临时菜单
    screenWidth: document.body.clientWidth, // 屏幕宽度  当宽度较窄时 菜单以temporary形式显示
    menuData: [
      {
        name: '基础数据',
        icon: 'library_books',
        controllerName: '/',
        children: [
          {
            name: '通航环境',
            controllerName: '/',
            children: [
              { name: '港池信息', controllerName: '/base/nenv/harbor' },
              { name: '码头信息', controllerName: '/base/nenv/wharf' },
              { name: '泊位组信息', controllerName: '/base/nenv/berthgroup' },
              { name: '泊位信息', controllerName: '/base/nenv/berth' },
              // { name: '涉水工程', controllerName: '/base/nenv/wadingworks' },
              { name: '航道信息', controllerName: '/base/nenv/channel' },
              { name: '锚地信息', controllerName: '/base/nenv/anchorage' },
              { name: '定线制信息', controllerName: '/base/nenv/customline' },
              { name: '自定义区域', controllerName: '/base/nenv/customarea' }
            ]
          },
          {
            name: '船舶标识',
            controllerName: '/base/shipmark'
          },
          {
            name: '综合信息',
            controllerName: '/base/berthview'
          }
        ]
      },
      {
        name: '船舶计划',
        icon: 'directions_boat',
        controllerName: '/',
        children: [
          { name: '动态计划查询', controllerName: '/plan/list' },
          // { name: '计划申报状态', controllerName: '/plan/declarstatus' },
          // { name: '计划期间管理', controllerName: '/plan/period' },
          { name: '动态计划审核', controllerName: '/plan/check' },
          { name: '动态计划排序', controllerName: '/plan/smartsort' },
          { name: '动态计划执行', controllerName: '/plan/planaction' },
          { name: '实时船舶动态', controllerName: '/tdyn/realtime' },
          { name: '历史计划查询', controllerName: '/tdyn/planhistory' },
          { name: '紧急调度', controllerName: '/plan/emergencyschedule' }
        ]
      },
      // {
      //   name: '交通动态',
      //   icon: 'transform',
      //   controllerName: '/',
      //   children: [
      // { name: '实时船舶动态', controllerName: '/tdyn/realtime' },
      // { name: '动态计划查询', controllerName: '/tdyn/shipplan' },
      // { name: '动态计划执行查询', controllerName: '/tdyn/planaction' }
      // { name: '报警记录查询', controllerName: '/tdyn/warning' }
      //   ]
      // },
      {
        name: '交通信息',
        icon: 'account_circle',
        controllerName: '/',
        children: [
          { name: '通知公告', controllerName: '/tinfo/news' },
          { name: '船舶数据库', controllerName: '/tinfo/shipdatabase' },
          { name: '潮汐数据查询', controllerName: '/tinfo/tide' },
          { name: '天气数据查询', controllerName: '/tinfo/weather' }
          // { name: '视频监控', controllerName: '/tinfo/cctv' },
          // {
          //   name: '水文气象查询',
          //   controllerName: '/planSummaryCheck',
          //   children: [
          //   ]
          // }
          // {
          //   name: '特殊船舶查询',
          //   controllerName: '/specialship',
          //   children: [
          //     { name: '扣押船舶查询', controllerName: '/tinfo/detention' },
          //     { name: '滞留船舶查询', controllerName: '/tinfo/retention' },
          //     { name: '重点跟踪船舶查询', controllerName: '/tinfo/tracking' }
          //   ]
          // }
        ]
      },
      {
        name: '统计分析',
        icon: 'bar_chart',
        controllerName: '/',
        children: [
          {
            name: '船舶统计',
            controllerName: '/chart',
            children: [
              { name: '自定义区域', controllerName: '/chart/customarea' },
              { name: '报告线水域', controllerName: '/chart/reportline' },
              { name: '定线制水域', controllerName: '/chart/customline' }
            ]
          },
          { name: '流量综合统计', controllerName: '/chart/complex' },
          { name: '交通流统计', controllerName: '/chart/transline' },
          {
            name: '吞吐量统计',
            controllerName: '/chart',
            children: [
              { name: '港口吞吐量统计', controllerName: '/chart/throughput' },
              { name: '码头吞吐量统计', controllerName: '/chart/wharfthroughput' },
              { name: '吞吐量统计表', controllerName: '/chart/form' }
            ]
          },
          { name: '泊位占用统计', controllerName: '/chart/berth' }
        ]
      },
      {
        name: '系统管理',
        icon: 'settings',
        controllerName: '/',
        children: [
          { name: '用户管理', controllerName: '/sys/user' },
          { name: '角色管理', controllerName: '/sys/role' },
          { name: '组织机构管理', controllerName: '/sys/org' }
        ]
      }
    ],
    webSock: null
  }),
  props: {
    source: String
  },
  created () {
    // 初始化WS
    // console.log()
    // this.initWebSocket()
  },
  computed: {
    ...mapGetters({ menuList: 'menuList' })
  },
  methods: {
    initWebSocket () {
      const wsUrl = 'ws://127.0.0.1:50000'
      this.webSock = new WebSocket(wsUrl)
      this.webSock.onmessage = this.websocketonmessage
      this.webSock.onopen = this.websocketonopen
      this.webSock.onerror = this.websocketonerror
      this.webSock.onclose = this.websocketclose
    },
    websocketonopen () { // 连接建立之后执行send方法发送数据
      let actions = { 'test': '12345' }
      this.websocketsend(JSON.stringify(actions))
    },
    websocketonerror () { // 连接建立失败重连
      this.initWebSocket()
    },
    websocketonmessage (e) { // 数据接收
      console.log(e)
    },
    websocketsend (Data) { // 数据发送
      this.webSock.send(Data)
    },
    websocketclose (e) { // 关闭
      console.log('断开连接', e)
    },
    CallBack (msg) {
      if (msg === 'drawer') {
        this.drawer = !this.drawer
      }
      if (msg === 'dark') this.dark = !this.dark
    },
    snackbarClose (val) {
      this.$store.state.errorShow = val
      if (val === false) {
        // 关闭时恢复默认3000
        this.$store.state.errortimeout = 3000
      }
    },
    RefreshToken: async function () {
      if (storagedata.getUserdata()) {
        let data = await api.RefreshToken()
        if (data.status === 401) {
          if (this.$route.name !== 'login') {
            this.$router.replace('/login')
          }
        } else {
          storagedata.setlocalStorage('tokentime', dayjs().format('YYYY-MM-DD HH:mm'))
          storagedata.setlocalStorage('usertoken', data.data.token)
        }
      }
    }
  },
  watch: {
    temporary (val) {
      if (val) {
        if (this.drawer === true) this.drawer = false
      }
    }
  },
  mounted () {
    if (document.body.clientWidth > 1475) {
      this.temporary = false
    } else {
      this.temporary = true
    }
    // 监听窗口大小
    window.onresize = () => {
      return (() => {
        this.screenWidth = document.body.clientWidth
        if (this.screenWidth > 1475) {
          this.temporary = false
        } else {
          this.temporary = true
        }
      })()
    }
    if (!storagedata.getUserdata()) {
      // 在router.beforeEach中已经判断登录状态
      // this.$router.replace('/login')
    } else if (storagedata.getUserdata()) {
      let datenow = new Date().valueOf()
      let login = new Date(storagedata.getlocalStorage('tokentime')).valueOf()
      if (datenow - login > 7200000) {
        // 2小时 登录时间与上次获取token时间超过2小时时 重新登录
        if (this.$route.name !== 'login') {
          this.$router.replace('/login')
        }
      }
    }
    // 每30min刷新token
    if (!RefreshT) {
      RefreshT = setInterval(() => {
        this.RefreshToken()
      }, 60 * 1000 * 30)
    }
    // 关闭浏览器窗口的时候清空浏览器缓存在localStorage的数据
    // window.onbeforeunload = function (e) {
    //   var storage = window.localStorage
    //   storage.clear()
    // }
  }
}
</script>
<style>
.font{
  font-family: 'Microsoft YaHei' ! important;
}
html{
  overflow-y: auto;
  overflow-x: hidden;
}
.theme--light.v-application {
  background-color: #f1f5f8;
}
.theme--light.v-app-bar.v-toolbar.v-sheet {
  background-color: #FFF;
}
.card_center {
  width: 80%;
  margin-left: 10%;
  margin-top: 20px;
}
.centerFrame {
  padding-top: 10px;
  text-align: center;
  margin: 0 auto;
  width: 900px;
}
/* ::-webkit-scrollbar {
  width: 5px;
  height: 5px;
  background-color: #F1F1F1;
}
::-webkit-scrollbar-thumb {
  background: #787878;
} */
.v-navigation-drawer--temporary{
  /* 防止海图和海图按钮覆盖覆盖 */
  z-index: 1500;
}
/* .v-toolbar__content{
    padding: 0px;
  } */
</style>
