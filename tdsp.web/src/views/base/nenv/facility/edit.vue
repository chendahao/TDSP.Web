<template>
  <div>
    <PageHeader :headertitle="formTitle">
      <v-spacer></v-spacer>
      <v-btn @click="$router.go(-1)">{{close}}</v-btn>
      <v-btn v-if="!readonly" color="primary" @click="save">保存</v-btn>
    </PageHeader>
    <v-card class="card_center">
      <v-card-text>
        <v-container grid-list-md>
          <v-form ref="form" lazy-validation>
            <v-layout wrap>
              <v-flex md5>
                <v-text-field
                  v-model="editedItem.facNumber"
                  label="助航设施编号"
                  :rules="[v => !!v || '请输入助航设施编号']"
                  :readonly="readonly"
                ></v-text-field>
              </v-flex>
              <v-flex offset-md2 md5>
                <v-text-field
                  v-model="editedItem.facName"
                  label="助航设施名称"
                  :rules="[v => !!v || '请输入助航设施名称']"
                  :readonly="readonly"
                ></v-text-field>
              </v-flex>
              <v-flex md5>
                <v-select
                  :items="type"
                  label="设施类别"
                  :rules="[v => !!v || '请选择设施类别']"
                  v-model="editedItem.facType"
                  clearable
                  :menu-props="{zIndex:'9999'}"
                  :readonly="readonly"
                ></v-select>
              </v-flex>
              <v-flex offset-md2 md5>
                <v-text-field v-model.trim="editedItem.height" :rules="[v => !!v || '请输入助航设施高度']" label="高度" :readonly="readonly"></v-text-field>
              </v-flex>
              <v-flex md5>
                <v-text-field v-model.trim="editedItem.lng" type="number" :rules="lng" label="经度" :readonly="readonly"></v-text-field>
              </v-flex>
              <v-flex offset-md2 md5>
                <v-text-field v-model.trim="editedItem.lat" type="number" :rules="lat" label="纬度" :readonly="readonly"></v-text-field>
              </v-flex>
              <v-flex md5>
                <v-text-field v-model.trim="editedItem.areaName" label="水域名称" :readonly="readonly"></v-text-field>
              </v-flex>
              <v-flex offset-md2 md5>
                <v-menu
                  v-model="menu1"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="editedItem.createTime"
                      label="建设或放置时间"
                      prepend-inner-icon="event"
                      readonly
                      :rules="[v => !!v || '请选择建设或放置时间']"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="editedItem.createTime"
                    locale="zh-cn"
                    @input="menu1 = false"
                    :dayFormat="dayformat"
                  ></v-date-picker>
                </v-menu>
              </v-flex>
              <v-flex md5>
                <v-text-field v-model.trim="editedItem.markType" label="灯光形式" :readonly="readonly"></v-text-field>
              </v-flex>
              <v-flex offset-md2 md5>
                <v-text-field v-model.trim="editedItem.range" :rules="[v => !!v || '请输入助航设施射程']" label="射程(米)" :readonly="readonly"></v-text-field>
              </v-flex>
              <v-flex md12>
                <v-text-field v-model.trim="editedItem.usage" label="使用情况" :readonly="readonly"></v-text-field>
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
import api from '@/api/navenv/NavAidsApi'
import PageHeader from '@/components/PageHeader'
import dayjs from 'dayjs'
export default {
  components: {
    PageHeader
  },
  data () {
    return {
      id: -1,
      editedItem: {
        id: 0,
        facNumber: '',
        facName: '',
        facType: '',
        lng: '',
        lat: '',
        height: '',
        areaName: '',
        createTime: '',
        markType: '',
        range: '',
        usage: ''
      },
      lng: [
        v => !!v || '经度不能为空',
        v => (v < 180 && v > -180) || '请输入格式正确的经纬度'
      ],
      lat: [
        v => !!v || '纬度不能为空',
        v => (v < 90 && v > -90) || '请输入格式正确的经纬度'
      ],
      menu1: false,
      type: [
        '灯塔',
        '灯桩',
        '导标',
        '锚地标',
        '航道标',
        '孤立危险物标',
        '禁止抛锚标'
      ],
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
  },
  computed: {
    formTitle () {
      return this.id === '-1'
        ? '新增助航设施'
        : this.readonly === true
          ? '助航设施信息'
          : '编辑助航设施'
    },
    close () {
      return this.readonly === true ? '关闭' : '取消'
    }
  },
  methods: {
    getItem: async function () {
      let { data } = await api.GetById(this.id)
      this.editedItem = data
      let time = this.editedItem.createTime
      this.editedItem.createTime = dayjs(time).format('YYYY-MM-DD')
    },
    save: async function () {
      if (this.$refs.form.validate()) {
        let data = null
        if (this.id === '-1') {
          // 新增
          data = await api.Create(this.editedItem)
        } else {
          // 编辑
          data = await api.Update(this.editedItem.id, this.editedItem)
        }
        if (data.status === 200 || data.status === 201) {
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
<style>
.span {
  color: rgba(0, 0, 0, 0.54);
  height: 20px;
  line-height: 20px;
  font-size: 16px;
  margin-left: 4px;
}
</style>
