<template>
  <div>
    <PageHeader :headertitle="formTitle">
      <v-spacer></v-spacer>
      <v-btn class="ma-2" @click="$router.go(-1)">{{close}}</v-btn>
      <v-btn class="ma-2" v-if="!readonly" color="primary" @click="save">保存</v-btn>
    </PageHeader>
    <v-card class="card_center">
      <v-card-text>
        <v-container grid-list-md>
          <v-form
            ref="form"
            lazy-validation
          >
            <v-layout wrap>
              <v-flex xs12 sm6 md5>
                <v-text-field v-model="editedItem.name" label="名称" :rules="[v => !!v || '请输入名称']" :readonly="readonly"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 offset-md2 md5>
                <v-text-field center v-model="editedItem.width" label="定线制宽度(海里)" :rules="widthRules" :readonly="readonly"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md5>
                <v-text-field v-model="inpoint_coor" label="方向线起点:格式:（Log Lat）" :rules="[v => !!v || '请输入起点坐标']" :readonly="readonly"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 offset-md2 md5>
                <v-text-field v-model="outpoint_coor" label="方向线终点:格式:（Log Lat）" :rules="[v => !!v || '请输入终点坐标']" :readonly="readonly"></v-text-field>
              </v-flex>
              <v-flex xs12 sm12 md12>
                <CoorsFormat v-bind:coors="coors" v-bind:readonly="readonly" v-bind:type="Geotype" display_name='定线制坐标集合' v-on:CallBack="Callback" ></CoorsFormat>
                <!-- <v-textarea  auto-grow rows="1" v-model="coordinates" label="定线制区域坐标集合:格式:Log Lat,Log Lat,......" :rules="[v => !!v || '请输入定线制范围']" :readonly="readonly"></v-textarea> -->
              </v-flex>
              <v-flex md12>
                <Polygonview v-if="showmap" v-bind:geojson="geojson" v-bind:coors="points"></Polygonview>
              </v-flex>
            </v-layout>
          </v-form>
        </v-container>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="$router.go(-1)">{{close}}</v-btn>
        <v-btn v-if="!readonly" color="blue darken-1" text @click="save">保存</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import api from '@/api/navenv/CustomLineApi'
import Polygonview from '@/components/Polygonview'
import PageHeader from '@/components/PageHeader'
import CoorsFormat from '@/components/CoorsFormat'
export default {
  components: {
    Polygonview,
    PageHeader,
    CoorsFormat
  },
  data () {
    return {
      id: -1,
      editedItem: {
        customId: '00000000-0000-0000-0000-000000000000',
        name: '',
        description: '',
        typeRetrograde: false,
        typeCross: false,
        typeOvertaking: false,
        inPoint: '',
        outPoint: '',
        width: '',
        polygon: ''
      },
      defaultItem: {
        customId: '00000000-0000-0000-0000-000000000000',
        name: '',
        description: '',
        typeRetrograde: false,
        typeCross: false,
        typeOvertaking: false,
        inPoint: '',
        outPoint: '',
        width: '',
        polygon: ''
      },
      widthRules: [
        v => /^\d+(\.\d+)?$/.test(v) || '请输入格式正确的宽度'
      ],
      // 地图组件用数据
      inpoint_coor: '',
      outpoint_coor: '',
      geojson: { 'type': 'Polygon', 'coordinates': [] },
      name: '',
      points: [],
      coordinates: '',
      showmap: true,
      // 详细、编辑状态
      readonly: true,
      coors: '',
      Geotype: 'Polygon'
    }
  },
  // watch: {
  //   coordinates (val) {
  //     let coors = val
  //     coors = coors.split(',')
  //     if (coors.length <= 3) return
  //     let latlngs = []
  //     for (let i = 0; i < coors.length; i++) {
  //       let element = coors[i]
  //       element = element.split(' ')
  //       let coor = []
  //       coor.push(element[0] * 1.0)
  //       coor.push(element[1] * 1.0)
  //       latlngs.push(coor)
  //     }
  //     let gdata = { 'type': 'Polygon', 'coordinates': [] }
  //     gdata.coordinates[0] = latlngs
  //     this.geojson = gdata
  //   }
  // },
  created () {
    this.id = this.$route.query.id
    let type = this.$route.query.type
    if (type === 'edit') {
      this.readonly = false
    }
    if (this.id !== '-1') {
      this.getItem()
    }
  },
  computed: {
    formTitle () {
      return this.id === '-1' ? '新增定线制' : this.readonly === true ? '定线制信息' : '编辑定线制'
    },
    close () {
      return this.readonly === true ? '关闭' : '取消'
    }
  },
  methods: {
    getItem: async function () {
      let item = await api.GetItemById(this.id)
      this.editedItem = item.data
      this.coors = item.data.polygon.coordinates[0]
      this.inpoint_coor = item.data.inPoint.coordinates[0] + ' ' + item.data.inPoint.coordinates[1]
      this.outpoint_coor = item.data.outPoint.coordinates[0] + ' ' + item.data.outPoint.coordinates[1]
      this.points = []
      this.points.push({ coor: [item.data.inPoint.coordinates[1], item.data.inPoint.coordinates[0]], name: '起点' })
      this.points.push({ coor: [item.data.outPoint.coordinates[1], item.data.outPoint.coordinates[0]], name: '终点' })
    },
    save: async function () {
      if (this.$refs.form.validate()) {
        this.editedItem.polygon = this.geojson
        let incoor = this.inpoint_coor
        let incoors = incoor.split(' ')
        this.editedItem.inPoint = { 'type': 'Point', 'coordinates': [incoors[0] * 1.0, incoors[1] * 1.0] }
        let outcoor = this.outpoint_coor
        let outcoors = outcoor.split(' ')
        this.editedItem.outPoint = { 'type': 'Point', 'coordinates': [outcoors[0] * 1.0, outcoors[1] * 1.0] }
        // this.editedItem.outPoint = { 'type': 'Point', 'coordinates': [this.outpoint_coor] }
        let data = null
        if (this.id === '-1') {
          // 新增
          data = await api.Create(this.editedItem)
        } else {
          // 编辑
          data = await api.Edit(this.editedItem)
        }
        if (data.data.code === 0) {
          this.message.ShowMessage('保存成功', 'success')
          this.$router.go(-1)
        } else {
          this.message.ShowMessage('保存数据出错', 'error')
        }
      }
    },
    Callback (data) {
      this.geojson = data
      this.editedItem.polygon = data
    }
  }
}
</script>
