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
                <v-text-field v-model="editedItem.berthNo" label="泊位编号"  :rules="[v => !!v || '请输入泊位编号']" :readonly="readonly"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 offset-md2 md5>
                <v-text-field center v-model="editedItem.distanceSort" label="距离口门排序"  :rules="SortRules" :readonly="readonly"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md5>
                <v-text-field v-model="editedItem.longitude" label="经度" :rules="lng" :readonly="readonly"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 offset-md2 md5>
                <v-text-field v-model="editedItem.latitude" label="纬度" :rules="lat" :readonly="readonly"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md5>
                <v-select
                  :items="berthList"
                  item-text="text"
                  item-value="value"
                  label="上级泊位"
                  v-model="editedItem.parentId"
                  clearable
                  :menu-props="{zIndex:'9999'}"
                  :readonly="readonly"
                ></v-select>
              </v-flex>
              <v-flex xs12 sm6 offset-md2 md5>
                <v-select
                  :items="berthGroup"
                  item-text="text"
                  item-value="value"
                  label="所属泊位组"
                  v-model="editedItem.groupId"
                  :rules="[v => !!v || '请选择所属泊位组']"
                  :menu-props="{zIndex:'9999'}"
                  :readonly="readonly"
                ></v-select>
              </v-flex>
              <!-- <v-flex xs12 sm6 md5>
                <v-text-field disabled v-model="editedItem.img" label="泊位图片"></v-text-field>
              </v-flex> -->
              <v-flex md12>
                <Pointview v-if="showmap" v-bind:coors="coors" v-bind:name="name"></Pointview>
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
import api from '@/api/navenv/BerthApi'
import Pointview from '@/components/Pointview'
import codes from '@/api/navenv/CodesApi'
import PageHeader from '@/components/PageHeader'
export default {
  components: {
    Pointview,
    PageHeader
  },
  data () {
    return {
      id: -1,
      editedItem: {
        berthId: '00000000-0000-0000-0000-000000000000',
        berthNo: '',
        distanceSort: '',
        longitude: '',
        latitude: '',
        parentId: '',
        groupId: ''
      },
      defaultItem: {
        berthId: '00000000-0000-0000-0000-000000000000',
        berthNo: '',
        distanceSort: '',
        longitude: '',
        latitude: '',
        parentId: '',
        groupId: ''
      },
      SortRules: [
        v => !!v || '排序号不能为空',
        v => /^[0-9]*$/.test(v) || '请输入格式正确的排序号'
      ],
      lng: [
        v => !!v || '经度不能为空',
        v => (v < 180 && v > -180) || '请输入格式正确的经纬度'
      ],
      lat: [
        v => !!v || '纬度不能为空',
        v => (v < 90 && v > -90) || '请输入格式正确的经纬度'
      ],
      berthList: [],
      berthGroup: [],
      // 地图组件用数据
      coors: [],
      name: '',
      showmap: false,
      // 详细、编辑状态
      readonly: true
    }
  },
  created () {
    this.id = this.$route.query.id
    let type = this.$route.query.type
    if (type === 'edit') {
      this.readonly = false
    }
    if (this.id !== '-1') {
      this.getParents()
        .then(res => {
          this.getgroup()
          this.getItem()
        })
    } else {
      this.getParents()
      this.getgroup()
    }
  },
  computed: {
    formTitle () {
      return this.id === '-1' ? '新增泊位' : this.readonly === true ? '泊位信息' : '编辑泊位'
    },
    close () {
      return this.readonly === true ? '关闭' : '取消'
    }
  },
  watch: {
    editedItem: {
      handler (val) {
        if (val.longitude > 180 || val.longitude < -180) {
          this.showmap = false
          return
        }
        if (val.latitude > 90 || val.latitude < -90) {
          this.showmap = false
          return
        }
        if (val.longitude && val.latitude) {
          this.showmap = true
          let latlngs = []
          latlngs.push(val.latitude)
          latlngs.push(val.longitude)
          this.name = val.berthNo
          this.coors = latlngs
        } else {
          this.showmap = false
        }
      },
      deep: true
    }
  },
  methods: {
    getParents: async function () {
      let { data } = await codes.GetBerths(true)
      this.berthList = data
    },
    getgroup: async function () {
      let { data } = await codes.GetBerthGroups()
      this.berthGroup = data
    },
    getItem: async function () {
      let item = await api.GetItemById(this.id)
      this.editedItem = item.data
      let latlngs = []
      latlngs.push(item.data.latitude)
      latlngs.push(item.data.longitude)
      this.coors = latlngs
      this.name = item.data.wharfNo
      this.showmap = true
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
          this.message.ShowMessage('保存成功', 'success')
          this.$router.go(-1)
        } else {
          this.message.ShowMessage('获取数据时出错', 'error')
        }
      }
    }
  }
}
</script>
