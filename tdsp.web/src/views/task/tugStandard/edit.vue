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
              <v-flex xs12 sm12 md12>
                <v-text-field v-model="editedItem.harbor" label="港池名称" :readonly="readonly"></v-text-field>
              </v-flex>
              <v-flex xs12 sm12 md12>
                <v-combobox
                  v-model="editedItem.vesselTypes"
                  :items="items"
                  chips
                  clearable
                  label="船舶类型"
                  multiple
                >
                  <template v-slot:selection="{ attrs, item, select, selected }">
                    <v-chip
                      v-bind="attrs"
                      :input-value="selected"
                      @click="select"
                    >
                      <strong>{{ item }}</strong>&nbsp;
                    </v-chip>
                  </template>
                </v-combobox>
              </v-flex>
              <v-flex xs12 sm6 md5>
                <v-text-field v-model.number="editedItem.lenRange.min" label="最小长度" :rules="rules" :readonly="readonly"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md5 offset-md2>
                <v-text-field v-model.number="editedItem.lenRange.max" label="最大长度" :rules="rules" :readonly="readonly"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md5>
                <v-text-field v-model.number="editedItem.tugs.berth" label="靠泊 数量" :rules="numRules" :readonly="readonly"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md5 offset-md2>
                <v-text-field v-model.number="editedItem.tugs.unBerth" label="离泊 数量" :rules="numRules" :readonly="readonly"></v-text-field>
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
      client: new api.TugStandardClient('', this.$axios),
      autoId: '-1',
      editedItem: {
        autoId: 0,
        harbor: '',
        lenRange: {
          min: '',
          max: ''
        },
        tugs: {
          berth: '',
          unBerth: ''
        }
      },
      chips: [],
      items: ['杂货', '集装箱', '散货', '油船', 'LNG'],
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
    this.autoId = this.$route.query.autoId
    let type = this.$route.query.type
    if (type === 'edit') {
      this.readonly = false
    }
    if (this.autoId !== '-1') {
      this.getItem()
    }
  },
  computed: {
    formTitle () {
      return this.autoId === '-1' ? '新增配备标准' : this.readonly === true ? '拖轮配备标准' : '编辑拖轮配备标准'
    },
    close () {
      return this.readonly === true ? '关闭' : '取消'
    }
  },
  methods: {
    getItem: async function () {
      this.client.tugStandard5(this.autoId)
        .then(res => {
          this.editedItem = res
        })
    },
    remove (item) {
      this.editedItem.vesselTypes.editedItem.vesselTypes(this.chips.indexOf(item), 1)
      this.editedItem.vesselTypes = [...this.editedItem.vesselTypes]
    },
    save: async function () {
      if (this.$refs.form.validate()) {
        let data = null
        if (this.autoId === '-1') {
          // 新增
          this.client.tugStandard(this.editedItem)
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
          this.client.tugStandard3(this.autoId, this.editedItem)
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
