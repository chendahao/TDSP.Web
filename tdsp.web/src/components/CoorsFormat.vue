<template>
  <div>
    <v-textarea
      lazy-validation
      rows="6"
      auto-grow
      v-model.trim="coordinates"
      :hint="formatcoordinates"
      persistent-hint
      :placeholder="placeholder"
      :label="display_name"
      :readonly="readonly"
      :rules="coorrule"
      ref="coordinates"
    ></v-textarea>
  </div>
</template>
<script>
export default {
  // coors:坐标集合[[],[],[]]
  // readolny：输入框的编辑状态
  // type:geojson 坐标的类型 支持LineString和Polygon
  props: ['coors', 'readonly', 'type', 'display_name'],
  data () {
    return {
      coordinates: '',
      formatcoordinates: '',
      coorrule: [
        // 允许换行和出现多个空格，合法的坐标至少要两个
        v =>
          /^((\d|[1-8]\d)[°](\d|[0-5]\d)(\s)?(\.\d{1,4})?[NSns]?\s+(\d|[1-9]\d|1[0-7]\d)[°](\d|[0-5]\d)(\s)?(\.\d{1,4})?[EWew]?\s*){2,}$/.test(
            v
          ) || '输入的坐标格式不正确'
      ],
      rule: /^((\d|[1-8]\d)[°](\d|[0-5]\d)(\s)?(\.\d{1,4})?[NSns]?\s+(\d|[1-9]\d|1[0-7]\d)[°](\d|[0-5]\d)(\s)?(\.\d{1,4})?[EWew]?\s*){2,}$/,
      placeholder: '纬度 经度的度分秒格式，如:\n38°51.41N 121°38.12E \n38°34.12N 121°38.12E \n或\n38°51.41 121°38.12 \n38°34.12 121°38.12  \n(用换行或空格分隔)'
    }
  },
  created () {
    if (this.coors) {
      this.convert2(this.coors)
    }
  },
  watch: {
    coors (val) {
      this.convert2(val)
    },
    coordinates (val) {
      this.formatCoor(val)
    }
  },
  methods: {
    // 转为度分秒
    convert2 (coors) {
      let pos = []
      let coordinates = ''
      for (let i = 0; i < coors.length; i++) {
        let element = coors[i]
        pos.push(element[0] + ' ' + element[1])
        let lat = this.formatDegree(element[1])
        let log = this.formatDegree(element[0])
        coordinates += lat + ' ' + log
        if (i !== coors.length - 1) {
          coordinates += '\n'
        }
      }
      this.coordinates = coordinates
      this.formatcoordinates = pos.toString()
    },
    formatDegree (value) {
      /// 将度转换成为度分
      value = Math.abs(value)
      var v1 = Math.floor(value)// 度
      var num = (value - v1) * 60 // 分
      var v2 = num.toFixed(4)
      return v1 + '°' + v2
    },
    formatCoor (val) {
      // 第一次加载时验证返回false
      if (this.$refs.coordinates.validate()) {
        this.returnGData(val)
      } else {
        if (this.rule.test(val) === true) {
          this.returnGData(val)
        }
      }
    },
    returnGData (val) {
      // 去除多余的空格 将度分秒符号统一替换
      var regE0 = /(\s\.)/g
      var regE1 = /[\s+]/g
      var regE2 = /[NEWSnews]/g
      var regE3 = /['′＇′’]/g
      let coor = val
        .replace(regE0, '.')
        .replace(regE1, ' ')
        .replace(regE2, '')
        .replace(regE3, '')
      let coors = coor.split(' ')
      var arr = []
      let latlngs = []
      for (let index = 0; index < coors.length; index += 2) {
        const element2 = coors[index + 1]
        let e2 = element2.split('°')
        const element = coors[index]
        let e1 = element.split('°')
        let c = []
        let log1 = e2[0] * 1.0
        let log2 = 0
        if (e2[1] !== '0') log2 = (e2[1] / 60) * 1.0
        let log = log1 + log2
        c.push(log)
        let lat1 = e1[0] * 1.0
        let lat2 = 0
        if (e1[1] !== '0') lat2 = (e1[1] / 60) * 1.0
        let lat = lat1 + lat2
        c.push(lat)
        latlngs.push(c)
        arr.push(log + ' ' + lat)
      }
      // 首位不一致时 将第一个坐标复制到队尾
      if (arr[0] !== arr[arr.length - 1]) {
        arr.push(arr[0])
      }
      this.formatcoordinates = arr.toString()
      let gdata = { type: this.type, coordinates: [] }
      if (this.type === 'LineString') {
        gdata.coordinates = latlngs
      } else {
        gdata.coordinates[0] = latlngs
      }
      this.$emit('CallBack', gdata)
    }
  }
}
</script>
