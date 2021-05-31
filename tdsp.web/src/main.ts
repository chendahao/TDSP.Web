import Vue from 'vue'
import vuetify from './plugins/vuetify'
import './plugins/leaflet'
import App from './App.vue'
import router from '@/router'
import store from '@/store'
import axios from '@/plugins/axios'
import message from './plugins/message'
import './plugins/format-g'

// import 'xe-utils'
// import VXETable from 'vxe-table'
// import 'vxe-table/lib/style.css'

Vue.config.productionTip = true

Vue.prototype.message = message

// Vue.use(VXETable)

/**
 * @description 全局注册axios
 */
Vue.prototype.$axios = axios

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
