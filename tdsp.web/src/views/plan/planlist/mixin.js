export default {
  mounted () {
    const that = this
    window.onresize = function temp () {
      that.setheight = window.innerHeight - 205
    }
  },
  destroyed () {
    window.onresize = ''
  }
}
