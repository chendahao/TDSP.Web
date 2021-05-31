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
                <v-text-field v-model="editedItem.name" label="航道名称" :rules="[v => !!v || '请输入航道名称']" :readonly="readonly"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 offset-md2 md5>
                <v-text-field center v-model="editedItem.width" label="航道宽度(海里)"  :rules="widthRules" :readonly="readonly"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md5>
                <v-select
                  :items="harborlist"
                  item-text="text"
                  item-value="value"
                  label="所属港池"
                  v-model="editedItem.harborId"
                  :rules="[v => !!v || '请选择所属港池']"
                  :menu-props="{zIndex:'9999'}"
                  :readonly="readonly"
                ></v-select>
              </v-flex>
              <!-- <v-flex xs12 sm6 offset-md2 md5>
                <v-layout row align-center>
                  <span class="span">是否进行偏离监控</span>
                  <v-switch color="primary" v-model="editedItem.isMonitor" :readonly="readonly"></v-switch>
                </v-layout>
                <v-radio-group v-model="editedItem.isMonitor" row>
                  是否进行偏离监控
                  <v-radio label="是" value='1' ></v-radio>
                  <v-radio label="否" value='0' ></v-radio>
                </v-radio-group>
              </v-flex> -->
              <v-flex xs12 sm12 md12>
                <CoorsFormat v-bind:coors="coors" v-bind:readonly="readonly" v-bind:type="Geotype" display_name='航道坐标集合' v-on:CallBack="Callback" ></CoorsFormat>
                <!-- <v-textarea  auto-grow rows="1" v-model="coordinates" label="航道范围:格式:Log Lat,Log Lat,......" :readonly="readonly"></v-textarea> -->
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
import api from '@/api/navenv/ChannelApi'
import Codeapi from '@/api/navenv/CodesApi'
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
        channelId: '00000000-0000-0000-0000-000000000000',
        name: '',
        isMonitor: 0,
        width: '',
        harborId: '',
        harborName: '',
        lines: ''
      },
      defaultItem: {
        channelId: '00000000-0000-0000-0000-000000000000',
        name: '',
        isMonitor: 0,
        width: '',
        harborId: '',
        harborName: '',
        lines: ''
      },
      widthRules: [
        v => /^\d+(\.\d+)?$/.test(v) || '请输入格式正确的港池宽度'
      ],
      harborlist: [],
      // 地图组件用数据
      geojson: { 'type': 'LineString', 'coordinates': [] },
      name: '',
      coordinates: '',
      showmap: true,
      // 详细、编辑状态
      readonly: true,
      coors: '',
      Geotype: 'LineString'
    }
  },
  created () {
    this.id = this.$route.query.id
    let type = this.$route.query.type
    if (type === 'edit') {
      this.readonly = false
    }
    if (this.id !== '-1') {
      this.getHarborlist().then(res => {
        this.getItem()
      })
    } else {
      this.getHarborlist()
    }
  },
  computed: {
    formTitle () {
      return this.id === '-1' ? '新增航道' : this.readonly === true ? '航道信息' : '编辑航道'
    },
    close () {
      return this.readonly === true ? '关闭' : '取消'
    }
  },
  methods: {
    getItem: async function () {
      let item = await api.GetItemById(this.id)
      this.editedItem = item.data
      this.coors = item.data.lines.coordinates
    },
    getHarborlist: async function () {
      let { data } = await Codeapi.GetHarbors()
      this.harborlist = data
    },
    save: async function () {
      if (this.$refs.form.validate()) {
        this.editedItem.lines = this.geojson
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
<style>

  .span{
    height: 20px;
    line-height: 20px;
    font-size: 16px;
    margin-left: 4px;
  }
</style>
