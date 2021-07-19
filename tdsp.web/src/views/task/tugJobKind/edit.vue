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
                <v-text-field v-model="editedItem.name" label="类型名称" :rules="nameRules" :readonly="readonly"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md5 offset-md2>
                <v-switch :label="editedItem.planed === true ?  '计划内作业 计划内作业通过 拖轮作业计划管理 ' : '计划外 临时调度,不需要作业计划'" v-model="editedItem.planed"></v-switch>
                <!-- <v-text-field v-model="editedItem.planed" label="计划内" :readonly="readonly"></v-text-field> -->
              </v-flex>
              <v-flex xs12 sm12 md12>
                <v-text-field v-model="editedItem.description" label="说明" :readonly="readonly"></v-text-field>
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
import { tugApi as api } from '@/api/tugApi'
import PageHeader from '@/components/PageHeader'
import dayjs from 'dayjs'
export default {
  components: {
    PageHeader
  },
  data () {
    return {
      client: new api.TugJobKindClient('', this.$axios),
      jobKind: '-1',
      editedItem: {
        jobKind: 0,
        name: '',
        description: '',
        planed: false
      },
      // valid
      nameRules: [
        v => !!v || '请输入锚地名称'
      ],
      // 详细、编辑状态
      readonly: true
    }
  },
  created () {
    this.jobKind = this.$route.query.jobKind
    let type = this.$route.query.type
    if (type === 'edit') {
      this.readonly = false
    }
    if (this.jobKind !== '-1') {
      this.getItem()
    }
  },
  computed: {
    formTitle () {
      return this.jobKind === '-1' ? '新增作业类型' : this.readonly === true ? '作业类型信息' : '编辑作业类型'
    },
    close () {
      return this.readonly === true ? '关闭' : '取消'
    }
  },
  methods: {
    getItem: async function () {
      this.client.tugJobKind5(this.jobKind)
        .then(res => {
          res.builtDate = dayjs(res.builtDate).format('YYYY-MM-DD')
          this.editedItem = res
        })
    },
    save: async function () {
      if (this.$refs.form.validate()) {
        let data = null
        if (this.jobKind === '-1') {
          // 新增
          this.client.tugJobKind(this.editedItem)
            .then(res => {
              if (!res) {
                this.$message.success('保存成功')
                this.$router.go(-1)
              }
            })
            .catch(err => {
              this.$message.error(err)
            })
        } else {
          // 编辑
          this.client.tugJobKind3(this.jobKind, this.editedItem)
            .then(res => {
              if (!res) {
                this.$message.success('保存成功')
                this.$router.go(-1)
              }
            })
            .catch(err => {
              this.$message.error(err)
            })
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
