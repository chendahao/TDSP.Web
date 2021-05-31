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
              <v-flex  md5>
                <v-text-field v-model="editedItem.name" label="港池名称" :rules="[v => !!v || '请输入港池名称']" :readonly="readonly"></v-text-field>
              </v-flex>

              <v-flex offset-md2 md5>
                <v-text-field center v-model="editedItem.depth" label="吃水深度(m)"  :rules="depthRules" :readonly="readonly"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md5>
                <v-layout row align-center>
                  <span class="span">是否排序</span>
                  <v-switch color="primary" v-model="editedItem.isSort" :readonly="readonly"></v-switch>
                </v-layout>
              </v-flex>
              <v-flex offset-md2 md5>
                <v-select
                  :items="sortkey"
                  item-text="text"
                  item-value="value"
                  label="第一关键字"
                  v-model="editedItem.fristSortKey"
                  clearable
                  :menu-props="{zIndex:'9999'}"
                  :readonly="readonly"
                ></v-select>
              </v-flex>
              <v-flex xs12 sm6 md5>
                <v-select
                  :items="sortkey"
                  item-text="text"
                  item-value="value"
                  label="第二关键字"
                  v-model="editedItem.secondSortKey"
                  clearable
                  :menu-props="{zIndex:'9999'}"
                  :readonly="readonly"
                ></v-select>
              </v-flex>
              <v-flex offset-md2 md5>
                <v-select
                  :items="sortkey"
                  item-text="text"
                  item-value="value"
                  label="第三关键字"
                  v-model="editedItem.thirdSortKey"
                  clearable
                  :menu-props="{zIndex:'9999'}"
                  :readonly="readonly"
                ></v-select>
              </v-flex>
              <v-flex xs12 sm6 md5>
                <v-text-field v-model.trim="editedItem.longitude" label="经度" :rules="lng" :readonly="readonly"></v-text-field>
              </v-flex>
              <v-flex offset-md2 md5>
                <v-text-field v-model.trim="editedItem.latitude" label="纬度" :rules="lat" :readonly="readonly"></v-text-field>
              </v-flex>
              <v-flex xs12 sm12 md12>
                <CoorsFormat v-bind:coors="coors" v-bind:readonly="readonly" v-bind:type="Geotype" display_name='港池坐标集合' v-on:CallBack="Callback" ></CoorsFormat>
                <!-- <v-textarea auto-grow rows="1" v-model="coordinates" label="港池范围:格式:Log Lat,Log Lat,......" :rules="[v => !!v || '请输入港池范围']" :readonly="readonly"></v-textarea> -->
              </v-flex>
              <v-flex md12>
                <Polygonview v-if="showmap" v-bind:geojson="geojson"></Polygonview>
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
import api from '@/api/navenv/HarborApi'
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
      coors: '',
      Geotype: 'Polygon',
      id: -1,
      editedItem: {
        harborId: '00000000-0000-0000-0000-000000000000',
        name: '',
        isSort: false,
        fristSortKey: '',
        secondSortKey: '',
        thirdSortKey: '',
        longitude: '',
        latitude: '',
        depth: '',
        coordinates: ''
      },
      defaultItem: {
        harborId: '00000000-0000-0000-0000-000000000000',
        name: '',
        isSort: false,
        fristSortKey: '',
        secondSortKey: '',
        thirdSortKey: '',
        longitude: '',
        latitude: '',
        depth: '',
        coordinates: ''
      },
      depthRules: [
        v => /^\d+(\.\d+)?$/.test(v) || '请输入格式正确的前沿吃水'
      ],
      lng: [
        v => !!v || '经度不能为空',
        v => (v < 180 && v > -180) || '请输入格式正确的经纬度'
      ],
      lat: [
        v => !!v || '纬度不能为空',
        v => (v < 90 && v > -90) || '请输入格式正确的经纬度'
      ],
      sortkey: [
        { value: '煤炭', text: '煤炭' },
        { value: '石油', text: '石油' },
        { value: '矿石', text: '矿石' },
        { value: '散货', text: '散货' }
      ],
      // 地图组件用数据
      geojson: { 'type': 'Polygon', 'coordinates': [] },
      name: '',
      coordinates: '',
      showmap: true,
      // 详细、编辑状态
      readonly: true
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
      return this.id === '-1' ? '新增港池' : this.readonly === true ? '港池信息' : '编辑港池'
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
    },
    save: async function () {
      if (this.$refs.form.validate()) {
        // this.editedItem.polygon = this.geojson
        let data = null
        if (this.id === '-1') {
          // 新增
          data = await api.Create(this.editedItem)
        } else {
          // 编辑
          data = await api.Update(this.editedItem)
        }
        if (data.data.code === 0) {
          this.message.ShowMessage('保存成功', 'success')
          this.$router.go(-1)
        } else {
          this.message.ShowMessage(data.data.message, 'error')
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
<style>
  .span{
    height: 20px;
    line-height: 20px;
    font-size: 16px;
    margin-left: 4px;
  }
</style>
