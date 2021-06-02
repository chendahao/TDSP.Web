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
                <v-text-field v-model="editedItem.name" label="工程名称" :rules="nameRules" :readonly="readonly"></v-text-field>
              </v-flex>
              <!-- <v-flex xs12 sm6 offset-md2 md5>
                <v-layout align-center row>
                  <span class="span">是否开启监控</span>
                  <v-switch color="primary" v-model="editedItem.isMonitor" :readonly="readonly"></v-switch>
                </v-layout>
              </v-flex> -->
              <v-flex xs12 sm6 md5>
                <!-- <datepicker
                  v-model="editedItem.startTime"
                  :datespan="editedItem.startTime"
                  v-on:headCallBack="startTimeCall"
                  :rules="[v => !!v || '请输入开始时间']"
                ></datepicker> -->
                <v-menu
                  ref="menu"
                  v-model="menu"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  :return-value.sync="editedItem.startTime"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                  z-index=999
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="editedItem.startTime"
                      label="开始时间"
                      prepend-icon="event"
                      readonly
                      v-on="on"
                      :rules="[v => !!v || '请选择开始时间']"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="editedItem.startTime" locale="zh-cn" :dayFormat="dayformat" no-title scrollable >
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="menu = false">取消</v-btn>
                    <v-btn text color="primary" @click="$refs.menu.save(editedItem.startTime)">确认</v-btn>
                  </v-date-picker>
                </v-menu>
              </v-flex>
              <v-flex xs12 sm6 offset-md2 md5>
                <!-- <datepicker
                v-model="editedItem.overtime"
                :datespan="editedItem.overtime"
                v-on:headCallBack="overTimeCall"
                :rules="[v => !!v || '请输入结束时间']"
              ></datepicker> -->
                <v-menu
                  ref="menu2"
                  v-model="menu2"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  :return-value.sync="editedItem.overtime"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                  z-index=999
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="editedItem.overtime"
                      label="结束时间"
                      prepend-icon="event"
                      readonly
                      v-on="on"
                      :rules="[v => !!v || '请选择结束时间']"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="editedItem.overtime" locale="zh-cn" :dayFormat="dayformat" no-title scrollable >
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="menu2 = false">取消</v-btn>
                    <v-btn text color="primary" @click="$refs.menu2.save(editedItem.overtime)">确认</v-btn>
                  </v-date-picker>
                </v-menu>
              </v-flex>
              <v-flex xs12 sm12 md12>
                <v-textarea auto-grow rows="1" v-model="editedItem.remarks" label="备注" :readonly="readonly"></v-textarea>
              </v-flex>
              <v-flex xs12 sm12 md12>
                <v-textarea auto-grow rows="1" v-model="editedItem.workingUnit" label="施工单位" :readonly="readonly"></v-textarea>
              </v-flex>
              <v-flex xs12 sm12 md12>
                <v-textarea auto-grow rows="1" v-model="editedItem.safetyMeasures" label="施工安全措施" :readonly="readonly"></v-textarea>
              </v-flex>
              <v-flex xs12 sm12 md12>
                <v-textarea auto-grow rows="1" v-model="editedItem.safetyPublicity" label="安全宣传情况" :readonly="readonly"></v-textarea>
              </v-flex>
              <v-flex xs12 sm12 md12>
                <CoorsFormat v-bind:coors="coors" v-bind:readonly="readonly" v-bind:type="Geotype"  display_name='涉水工程坐标集合' v-on:CallBack="Callback" ></CoorsFormat>
                <!-- <v-textarea auto-grow rows="1" v-model="coordinates" label="区域范围:格式:（Log Lat,Log Lat,......）" :readonly="readonly"></v-textarea> -->
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
import api from '@/api/navenv/WadingWorksApi'
import Polygonview from '@/components/Polygonview'
import dayjs from 'dayjs'
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
      menu: false,
      menu2: false,
      id: -1,
      editedItem: {
        wadingWorksId: '00000000-0000-0000-0000-000000000000',
        name: '',
        startTime: '',
        overtime: '',
        isMonitor: false,
        remarks: '',
        workingUnit: '',
        safetyMeasures: '',
        safetyPublicity: ''
      },
      // valid
      nameRules: [
        v => !!v || '请输入工程名称'
      ],
      depthRules: [
        v => /^\d+(\.\d+)?$/.test(v) || '请输入格式正确的水深'
      ],
      minLenRules: [
        v => /^\d+(\.\d+)?$/.test(v) || '请输入格式正确的最小船长'
      ],
      maxLenRules: [
        v => /^\d+(\.\d+)?$/.test(v) || '请输入格式正确的最大船长'
      ],
      sortRules: [
        v => /^[0-9]*$/.test(v) || '请输入格式正确的排序号'
      ],
      // 地图组件用数据
      geojson: { 'type': 'Polygon', 'coordinates': [] },
      name: '',
      coordinates: '',
      showmap: true,
      // 详细、编辑状态
      readonly: true,
      coors: '',
      Geotype: 'Polygon'
    }
  },
  watch: {
    coordinates (val) {
      let coors = val
      coors = coors.split(',')
      if (coors.length <= 3) return
      let latlngs = []
      for (let i = 0; i < coors.length; i++) {
        let element = coors[i]
        element = element.split(' ')
        let coor = []
        coor.push(element[0] * 1.0)
        coor.push(element[1] * 1.0)
        latlngs.push(coor)
      }
      let gdata = { 'type': 'Polygon', 'coordinates': [] }
      gdata.coordinates[0] = latlngs
      this.geojson = gdata
    }
  },
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
      return this.id === '-1' ? '新增工程' : this.readonly === true ? '工程信息' : '编辑工程'
    },
    close () {
      return this.readonly === true ? '关闭' : '取消'
    }
  },
  methods: {
    getItem: async function () {
      let item = await api.GetItemById(this.id)
      this.editedItem = item.data
      this.editedItem.startTime = dayjs(this.editedItem.startTime).format('YYYY-MM-DD')
      this.editedItem.overtime = dayjs(this.editedItem.overtime).format('YYYY-MM-DD')
      this.coors = item.data.polygon.coordinates[0]
    },
    startTimeCall: function (msg) {
      this.editedItem.startTime = msg
    },
    overTimeCall: function (msg) {
      this.editedItem.overtime = msg
    },
    save: async function () {
      if (this.$refs.form.validate()) {
        this.editedItem.polygon = this.geojson
        let data = null
        if (this.id === '-1') {
          // 新增
          data = await api.Create(this.editedItem)
        } else {
          // 编辑
          data = await api.Update(this.editedItem)
        }
        if (data.data.code === 0) {
          this.$message.success('保存成功')
          this.$router.go(-1)
        } else {
          this.$message.error('保存数据出错')
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
