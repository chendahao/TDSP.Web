import Vue from 'vue'
import dayjs from 'dayjs'

// 全局的日期格式化方法

// 格式化日期年-月-日
Vue.filter('dateFormat', function (value) {
  if (!value) return ''
  if (!dayjs(value).isValid()) return value // 当时间不是正确的时间格式时，如string类型的日期 返回value
  return dayjs(value).format('YYYY-MM-DD')
})

// 格式化日期时间
Vue.filter('datetimeFormat', function (value) {
  if (!value) return ''
  if (!dayjs(value).isValid()) return value
  return dayjs(value).format('YYYY-MM-DD  HH:mm')
})

// 格式化日时间 HHmm/DD 动态计划等
Vue.filter('daytimeFormat', function (value) {
  if (!value) return ''
  if (!dayjs(value).isValid()) return value
  return dayjs(value).format('HHmm/DD')
})

// 格式化日时间 M.DD 动态计划等
Vue.filter('MDDFormat', function (value) {
  if (!value) return ''
  if (!dayjs(value).isValid()) return value
  return dayjs(value).format('M.DD')
})

// datepicker中格式化日期显示格式 去除默认（日）显示
Vue.prototype.dayformat = function (d) {
  return dayjs(d).format('D')
}

// 格式化日时间 HH:mm 动态计划等
Vue.filter('timeFormat', function (value) {
  if (!value) return ''
  if (!dayjs(value).isValid()) return value
  return dayjs(value).format('HH:mm')
})
