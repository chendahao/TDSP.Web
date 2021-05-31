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
                <v-text-field v-model="editedItem.wharfNo" label="码头名称" :rules="[v => !!v || '请输入码头名称']" :readonly="readonly"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 offset-md2 md5>
                <v-text-field v-model="editedItem.addInfor" label="前沿吃水" :rules="addInforRules" :readonly="readonly"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md5>
                <v-text-field v-model.trim="editedItem.longitude" label="经度" :rules="lng" :readonly="readonly"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 offset-md2 md5>
                <v-text-field v-model.trim="editedItem.latitude" label="纬度" :rules="lat" :readonly="readonly"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md5>
                <v-select
                  :items="harboritems"
                  item-text="text"
                  item-value="value"
                  label="所属港池"
                  v-model="editedItem.harborId"
                  :rules="[v => !!v || '请选择所属港池']"
                  :menu-props="{zIndex:'9999'}"
                  :readonly="readonly"
                ></v-select>
              </v-flex>
              <v-flex xs12 sm6 offset-md2 md5>
                <v-select
                  :items="orgitems"
                  item-text="text"
                  item-value="value"
                  label="所属机构"
                  v-model="editedItem.orgId"
                  :rules="[v => !!v || '请选择所属机构']"
                  :menu-props="{zIndex:'9999'}"
                  :readonly="readonly"
                ></v-select>
              </v-flex>
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
import api from '@/api/navenv/WharfApi'
import codes from '@/api/navenv/CodesApi'
import auth from '@/api/auth/OrganApi'
import Pointview from '@/components/Pointview'
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
        wharfId: '00000000-0000-0000-0000-000000000000',
        wharfNo: '',
        longitude: '',
        latitude: '',
        addInfor: '',
        harborId: '',
        orgId: '',
        orgName: ''
      },
      addInforRules: [
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
      harboritems: [],
      orgitems: [],
      // 地图组件用数据
      coors: [],
      name: '',
      showmap: false,
      // 详细、编辑状态
      readonly: true
    }
  },
  computed: {
    formTitle () {
      return this.id === '-1' ? '新增码头' : this.readonly === true ? '码头信息' : '编辑码头'
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
          this.name = val.wharfNo
          this.coors = latlngs
        } else {
          this.showmap = false
        }
      },
      deep: true
    }
  },
  created () {
    this.id = this.$route.query.id
    let type = this.$route.query.type
    if (type === 'edit') {
      this.readonly = false
    }
    if (this.id !== '-1') {
      this.getharbor()
        .then(res => {
          this.getorgs()
          this.getItem()
        })
    } else {
      this.getharbor()
      this.getorgs()
    }
  },
  methods: {
    getharbor: async function () {
      let { data } = await codes.GetHarbors()
      this.harboritems = data
    },
    getorgs: async function () {
      let { data } = await auth.GetCodes()
      this.orgitems = data
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
        let data = null
        const orgId = this.editedItem.orgId
        this.editedItem.orgName = this.orgitems.find(n => n.value === orgId).text
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
    }
  }
}
</script>
