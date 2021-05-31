export default {
  mounted () {
    const that = this
    window.onresize = function temp () {
      that.setheight = window.innerHeight - 152
    }
  },
  destroyed () {
    window.onresize = ''
  }
}
