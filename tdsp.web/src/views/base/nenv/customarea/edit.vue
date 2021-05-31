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
          <v-form ref="form" lazy-validation>
            <v-layout wrap>
              <v-flex xs12 sm6 md5>
                <v-text-field
                  v-model="editedItem.name"
                  label="名称"
                  :rules="[v => !!v || '请输入名称']"
                  :readonly="readonly"
                ></v-text-field>
              </v-flex>
              <!-- <v-flex xs12 sm6 offset-md2 md5>
                <v-layout row align-center>
                  <span class="span">开启监控</span>
                  <v-switch color="primary" v-model="editedItem.isMonitoring" :readonly="readonly"></v-switch>
                </v-layout>
              </v-flex> -->
              <v-flex xs12 sm12 md12>
                <v-textarea
                  rows="1"
                  auto-grow
                  v-model="editedItem.description"
                  label="说明"
                  :readonly="readonly"
                ></v-textarea>
              </v-flex>
              <v-flex xs12 sm12 md12>
                <CoorsFormat v-bind:coors="coors" v-bind:readonly="readonly" v-bind:type="Geotype" display_name='自定义区域坐标集合' v-on:CallBack="Callback" ></CoorsFormat>
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
import api from '@/api/navenv/CustomAreaApi'
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
        isMonitoring: false,
        manager: '',
        managerid: '',
        person: '',
        phone: '',
        polygon: ''
      },
      defaultItem: {
        customId: '00000000-0000-0000-0000-000000000000',
        name: '',
        description: '',
        isMonitoring: false,
        manager: '',
        managerid: '',
        person: '',
        phone: '',
        polygon: ''
      },
      // coorrule: [
      //   // 允许换行和出现多个空格，合法的坐标至少要两个
      //   v =>
      //     /^((\d|[1-8]\d)[°](\d|[0-5]\d)[′＇'′’](\d|[0-5]\d)(\.\d{1,2})?["＂″”][NS]?\s+(\d|[1-9]\d|1[0-7]\d)[°](\d|[0-5]\d)[′＇'′’](\d|[0-5]\d)(\.\d{1,2})?["＂″”][EW]?\s*){2,}$/.test(
      //       v
      //     ) || '输入的坐标格式不正确'
      // ],
      // 地图组件用数据
      geojson: { type: 'Polygon', coordinates: [] },
      name: '',
      showmap: true,
      // 详细、编辑状态
      readonly: true,
      coors: '',
      Geotype: 'Polygon'
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
      return this.id === '-1'
        ? '新增自定义区域'
        : this.readonly === true
          ? '自定义区域信息'
          : '编辑自定义区域'
    },
    close () {
      return this.readonly === true ? '关闭' : '取消'
    }
  },
  methods: {
    getItem: async function () {
      let item = await api.GetItemById(this.id)
      this.editedItem = item.data
      this.geojson = item.data.polygon
      this.coors = item.data.polygon.coordinates[0]
    },
    save: async function () {
      if (this.$refs.form.validate()) {
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
