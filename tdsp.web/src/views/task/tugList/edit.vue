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
                <v-text-field v-model="editedItem.name" label="拖轮名称" :rules="nameRules" :readonly="readonly"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 offset-md2 md5>
                <v-text-field v-model="editedItem.anchDepth" label="锚地水深(m)" :rules="depthRules" :readonly="readonly"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md5>
                <v-text-field v-model="editedItem.minLen" label="最小船长(m)" :rules="minLenRules" :readonly="readonly"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 offset-md2 md5>
                <v-text-field v-model="editedItem.maxLen" label="最大船长(m)" :rules="maxLenRules" :readonly="readonly"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md5>
                <v-text-field v-model="editedItem.sort" label="排序号" :rules="sortRules" :readonly="readonly"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 offset-md2 md5>
                <v-layout row align-center>
                  <span class="span">是否向下一锚地锚泊</span>
                  <v-switch color="primary" v-model="editedItem.isNext" :readonly="readonly"></v-switch>
                </v-layout>
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
import api from '@/api/navenv/AnchorageApi'
import PageHeader from '@/components/PageHeader'
export default {
  components: {
    PageHeader
  },
  data () {
    return {
      id: -1,
      editedItem: {
        anchId: '00000000-0000-0000-0000-000000000000',
        name: '',
        minLen: '',
        maxLen: '',
        sort: '',
        isNext: false,
        anchDepth: ''
      },
      defaultItem: {
        anchId: '00000000-0000-0000-0000-000000000000',
        name: '',
        minLen: '',
        maxLen: '',
        sort: '',
        isNext: false,
        anchDepth: ''
      },
      // valid
      nameRules: [
        v => !!v || '请输入锚地名称'
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
  },
  computed: {
    formTitle () {
      return this.id === '-1' ? '新增拖轮' : this.readonly === true ? '拖轮信息' : '编辑拖轮'
    },
    close () {
      return this.readonly === true ? '关闭' : '取消'
    }
  },
  methods: {
    getItem: async function () {
      let item = await api.GetItemById(this.id)
      this.editedItem = item.data
    },
    save: async function () {
      if (this.$refs.form.validate()) {
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
          this.$message.error(data.data.message)
        }
      }
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
