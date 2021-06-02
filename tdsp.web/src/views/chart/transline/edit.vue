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
              <v-flex xs12 sm6 md6>
                <v-text-field v-model="editedItem.name" label="名称" :rules="nameRules" :readonly="readonly"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md6>
                <v-text-field v-model="editedItem.description" label="描述" :readonly="readonly"></v-text-field>
              </v-flex>
              <v-flex md12>
                <TrafficLineMap v-if="showmap" v-bind:geojson="geojson" v-on:CallBack="Callback" ></TrafficLineMap>
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
import api from '@/api/stat/TrafficLineApi'
import TrafficLineMap from '@/components/TrafficLineMap'
import PageHeader from '@/components/PageHeader'
export default {
  components: {
    TrafficLineMap,
    PageHeader
  },
  data () {
    return {
      id: '-1',
      editedItem: {
        Id: 0,
        name: '',
        description: '',
        line: ''
      },
      defaultItem: {
        Id: 0,
        name: '',
        description: '',
        line: ''
      },
      // valid
      nameRules: [
        v => !!v || '请输入名称'
      ],
      // 地图组件用数据
      geojson: { 'type': 'LineString', 'coordinates': [] },
      name: '',
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
      this.getItem()
    }
    this.showmap = true
  },
  computed: {
    formTitle () {
      return this.id === '-1' ? '新增统计线' : this.readonly === true ? '统计线信息' : '编辑统计线'
    },
    close () {
      return this.readonly === true ? '关闭' : '取消'
    }
  },
  methods: {
    getItem: async function () {
      let { data } = await api.GetById(this.id)
      this.editedItem = data
      this.geojson = data.line
      this.showmap = true
    },
    save: async function () {
      if (this.editedItem.line === '') {
        this.$message.info('请在海图中选择流量线')
        return
      }
      if (this.$refs.form.validate()) {
        let data = null
        if (this.id === '-1') {
          // 新增
          data = await api.Create(this.editedItem)
        } else {
          // 编辑
          data = await api.Update(this.editedItem.id, this.editedItem)
        }
        if (data.data.code === 0) {
          this.$message.success('保存成功')
          this.$router.go(-1)
        } else {
          this.$message.error('保存数据出错')
        }
      }
    },
    // 确认删除
    Callback: async function (msg) {
      this.editedItem.line = msg
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
