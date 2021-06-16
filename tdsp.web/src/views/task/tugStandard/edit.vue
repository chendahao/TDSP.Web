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
                <v-text-field v-model="editedItem.harbor" label="港池名称" :readonly="readonly"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md5 offset-md2>
                <v-text-field v-model="editedItem.shipType" label="船舶类型" :readonly="readonly"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md5>
                <v-text-field v-model="editedItem.lengthRange.min" label="最小长度" :rules="rules" :readonly="readonly"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md5 offset-md2>
                <v-text-field v-model.number="editedItem.lengthRange.max" label="最大长度" :rules="rules" :readonly="readonly"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md5>
                <v-text-field v-model.number="editedItem.tugNumber.berth" label="靠泊 数量" :rules="numRules" :readonly="readonly"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md5 offset-md2>
                <v-text-field v-model.number="editedItem.tugNumber.unBerth" label="离泊 数量" :rules="numRules" :readonly="readonly"></v-text-field>
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
      client: new api.TugInfoClient('', this.$axios),
      mmsi: '-1',
      editedItem: {
        autoId: "",
        harbor: "",
        lengthRange: {
          min: '',
          max: ''
        },
        tugNumber: {
          berth: '',
          unBerth: ''
        }
      },
      menu: false,
      // valid
      nameRules: [
        v => !!v || '请输入锚地名称'
      ],
      rules: [
        v => /^\d+(\.\d+)?$/.test(v) || '输入格式不正确'
      ],
      mmsiRules: [
        v => /^\d{9}$/.test(v) || '输入MMSI格式不正确'
      ],
      numRules: [
        v => /^[0-9]*$/.test(v) || '输入格式不正确'
      ],
      name: '',
      // 详细、编辑状态
      readonly: true
    }
  },
  created () {
    this.mmsi = this.$route.query.mmsi
    let type = this.$route.query.type
    if (type === 'edit') {
      this.readonly = false
    }
    if (this.mmsi !== '-1') {
      this.getItem()
    }
  },
  computed: {
    formTitle () {
      return this.mmsi === '-1' ? '新增拖轮' : this.readonly === true ? '拖轮信息' : '编辑拖轮'
    },
    close () {
      return this.readonly === true ? '关闭' : '取消'
    }
  },
  methods: {
    getItem: async function () {
      this.client.tugInfo4(this.mmsi)
        .then(res => {
          res.builtDate = dayjs(res.builtDate).format('YYYY-MM-DD')
          this.editedItem = res
        })
    },
    save: async function () {
      if (this.$refs.form.validate()) {
        let data = null
        if (this.mmsi === '-1') {
          // 新增
          this.client.tugInfo2(this.editedItem)
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
          this.client.tugInfo3(this.mmsi, this.editedItem)
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
