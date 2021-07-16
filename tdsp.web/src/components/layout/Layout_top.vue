<template>
  <div>
    <v-app-bar app fixed class="elevation-1" style="z-index:99">
      <v-btn icon @click.stop="changemenu">
        <v-icon color="#1976d2">menu</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on" @click="goseachart">
            <v-icon color="#1976d2">map</v-icon>
          </v-btn>
        </template>
        <span>海图系统</span>
      </v-tooltip>
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on" @click="setTableDense(!tableDense)">
            <v-icon v-if="tableDense">view_headline</v-icon>
            <v-icon v-else>view_agenda</v-icon>
          </v-btn>
        </template>
        <span>表格风格</span>
      </v-tooltip>
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on" @click="$vuetify.theme.dark=!$vuetify.theme.dark">
            <v-icon v-if="$vuetify.theme.dark">nights_stay</v-icon>
            <v-icon v-else>wb_sunny</v-icon>
          </v-btn>
        </template>
        <span>暗夜模式</span>
      </v-tooltip>
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on" @click="toggle">
            <v-icon large v-if="active">fullscreen_exit</v-icon>
            <v-icon large v-else>fullscreen</v-icon>
          </v-btn>
        </template>
        <span>全屏</span>
      </v-tooltip>
      <Alarm-Clock></Alarm-Clock>
      <v-menu offset-y transition="slide-y-transition" bottom>
        <template v-slot:activator="{ on }">
          <v-btn class="ml-2" icon large v-on="on">
            <v-avatar size="32px" color="#1976d2">
              <span class="white--text headline">{{firstname}}</span>
            </v-avatar>
          </v-btn>
        </template>
        <v-list>
          <v-list-item @click="changepwdshow">
            <v-list-item-title>修改密码</v-list-item-title>
          </v-list-item>
          <v-list-item @click="resignin">
            <v-list-item-title>退出登录</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <ChangePwd v-bind:show="show" v-on:CallBack="CallBack"></ChangePwd>
  </div>
</template>
<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import ChangePwd from '@/components/ChangePwd.vue'
import AlarmClock from './AlarmClock/AlarmClock.vue'
import storagedata from '@/plugins/storagedata.js'
export default {
  components: {
    ChangePwd,
    AlarmClock
  },
  data () {
    return {
      drawer: '',
      dark: false,
      show: false,
      firstname: ''
    }
  },
  created () {
    if (storagedata.getUserdata()) {
      let user = storagedata.getUserdata()
      this.firstname = user.fullName.substring(0, 1)
    }
  },
  computed: {// 用户打开海图页面
    seachart: {
      get () {
        return this.$store.state.seachart_url_info
      },
      set (val) {
        this.$store.state.seachart_url_info = val
      }
    },
    ...mapState('tabledense', [
      'tableDense'
    ]),
    ...mapState('fullscreen', [
      'active'
    ])
  },
  methods: {
    ...mapActions('fullscreen', [
      'toggle'
    ]),
    changepwdshow () {
      this.show = true
    },
    resignin () {
      storagedata.removelocalStorage('userdata')
      storagedata.removelocalStorage('usertoken')
      this.$router.replace('/login')
    },
    logout () {
      storagedata.removelocalStorage('userdata')
      storagedata.removelocalStorage('usertoken')
      window.open('about:blank', '_top').close()
    },
    colorexchange () {
      // this.dark = !this.dark
      this.$emit('CallBack', 'dark')
    },
    changemenu () {
      this.$emit('CallBack', 'drawer')
    },
    CallBack () {
      this.show = false
    },
    //
    ...mapMutations('tabledense', [
      'setTableDense'
    ]),
    // changeDense () {
    //   this.$store.commit('tabledense/setTableDense', !this.tableDense)
    // },
    goseachart () {
      if (this.seachart === null) {
        this.seachart = window.open('/seachart/', 'seachart')
      } else if (this.seachart.closed) {
        this.seachart = window.open('/seachart/', 'seachart')
      } else {
        if (this.seachart.location.pathname === '/seachart/') {
          this.seachart.focus()
        } else {
          (
            this.seachart = window.open('/seachart/', 'seachart')
          )
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
