
import store from '@/store'

// 信息、颜色(info success 或red green )、时间
const ShowMessage = function (msg, color = 'info', time = 5000) {
  if (msg === undefined) return
  store.state.errortimeout = time
  store.state.errorcolor = color
  store.state.errortext = msg
  store.state.errorShow = true
}
export default {
  ShowMessage
}
