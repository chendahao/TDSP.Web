import Vue from 'vue'
import { Message, MessageBox, Notification } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.prototype.$message = Message
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$notify = Notification
