import { tugApi as api } from '@/api/tugApi'
var mixin = {
  data () {
    return {
      tugClient: new api.TugStateClient('', this.$axios)
    }
  },
  methods: {
    getTugStatus () {
      this.tugClient.tugStateAll()
        .then(res => {
          // 空闲
          this.tugList = res.filter(i => i.status === 'Idle')
          // 非空闲
          this.tugList2 = res.filter(i => i.status !== 'Idle')
        })
    }
  }
}
export default mixin
