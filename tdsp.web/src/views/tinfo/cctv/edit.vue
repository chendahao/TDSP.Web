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
                  v-model="editedItem.name"
                  label="监控设备名称"
                  :rules="[v => !!v || '请输入监控设备']"
                  :readonly="readonly"
                ></v-text-field>
              </v-flex>
              <v-flex offset-md2 md5>
                <v-text-field
                  v-model="editedItem.location"
                  label="监控设备安装地点"
                  :rules="[v => !!v || '请输入安装地点']"
                  :readonly="readonly"
                ></v-text-field>
              </v-flex>
              <v-flex md5>
                <v-text-field v-model.trim="editedItem.longitude" type="number" :rules="lng" label="经度" :readonly="readonly"></v-text-field>
              </v-flex>
              <v-flex offset-md2 md5>
                <v-text-field v-model.trim="editedItem.latitude" type="number" :rules="lat" label="纬度" :readonly="readonly"></v-text-field>
              </v-flex>
              <v-flex md5>
                <v-text-field v-model.trim="editedItem.videoAddress" label="视频地址" :rules="[v => !!v || '请输入视频地址']" :readonly="readonly"></v-text-field>
              </v-flex>
              <v-flex offset-md2 md5>
                <v-text-field v-model.trim="editedItem.person" label="联系人" :readonly="readonly"></v-text-field>
              </v-flex>
              <v-flex md5>
                <v-text-field v-model.trim="editedItem.phone" label="联系电话" :readonly="readonly"></v-text-field>
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
import api from '@/api/navenv/CCTVApi'
import PageHeader from '@/components/PageHeader'
export default {
  components: {
    PageHeader
  },
  data () {
    return {
      id: -1,
      editedItem: {
        cctvId: '00000000-0000-0000-0000-000000000000',
        name: '',
        location: '',
        longitude: '',
        latitude: '',
        videoAddress: '',
        person: '',
        phone: ''
      },
      lng: [
        v => !!v || '经度不能为空',
        v => (v < 180 && v > -180) || '请输入格式正确的经纬度'
      ],
      lat: [
        v => !!v || '纬度不能为空',
        v => (v < 90 && v > -90) || '请输入格式正确的经纬度'
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
        ? '新增监控设备'
        : this.readonly === true
          ? '监控设备信息'
          : '编辑监控设备'
    },
    close () {
      return this.readonly === true ? '关闭' : '取消'
    }
  },
  methods: {
    getItem: async function () {
      let { data } = await api.GetById(this.id)
      this.editedItem = data
    },
    save: async function () {
      if (this.$refs.form.validate()) {
        let data = null
        if (this.id === '-1') {
          // 新增
          data = await api.Create(this.editedItem)
        } else {
          // 编辑
          data = await api.Update(this.editedItem.cctvId, this.editedItem)
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
<style>
.span {
  color: rgba(0, 0, 0, 0.54);
  height: 20px;
  line-height: 20px;
  font-size: 16px;
  margin-left: 4px;
}
</style>
