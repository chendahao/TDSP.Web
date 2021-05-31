<template>
  <Homeindex v-if="login" style="background-color:#fff" />
</template>

<script>
import storagedata from '@/plugins/storagedata.js'
import Homeindex from '../components/Homeindex'
export default {
  components: {
    Homeindex
  },
  data () {
    return {
      login: false
    }
  },
  mounted () {
    if (!storagedata.getUserdata()) {
      // this.$router.replace('/login')
    } else if (storagedata.getUserdata()) {
      let datenow = new Date().valueOf()
      let login = new Date(storagedata.getlocalStorage('tokentime')).valueOf()
      if (datenow - login > 7200000) {
        // 2小时 登录时间与上次获取token时间超过2小时时 重新登录
        console.log('home-token超时')
      } else {
        this.login = true
      }
    }
  },
  methods: {

  }
}
</script>
<style>
.material-icons {
  display: inline-flex !important
}
</style>
