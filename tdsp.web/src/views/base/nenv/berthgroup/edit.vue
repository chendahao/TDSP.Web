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
                <v-text-field v-model="editedItem.groupNo" label="组编号" :rules="nameRules" :readonly="readonly"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 offset-md2 md5>
                <v-text-field center v-model="editedItem.length" type="number" label="组长度" :rules="lengthRules" :readonly="readonly"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md5>
                <v-text-field center v-model="editedItem.maxLoadWeight" type="number" label="最大载重吨" :rules="maxLoadRules" :readonly="readonly"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 offset-md2 md5>
                <v-text-field center v-model="editedItem.minLoadWeight" type="number" label="最小载重吨" :rules="minLoadRules" :readonly="readonly"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md5>
                <v-select
                  :items="wharfitems"
                  item-text="text"
                  item-value="value"
                  label="所属码头"
                  v-model="editedItem.wharfId"
                  :rules="[v => !!v || '请选择所属码头']"
                  :readonly="readonly"
                ></v-select>
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
import api from '@/api/navenv/BerthGroupApi'
import codes from '@/api/navenv/CodesApi'
import PageHeader from '@/components/PageHeader'
export default {
  components: {
    PageHeader
  },
  data () {
    return {
      id: -1,
      editedItem: {
        groupId: '00000000-0000-0000-0000-000000000000',
        groupNo: '',
        length: '',
        maxLoadWeight: '',
        minLoadWeight: '',
        wharfId: ''
      },
      defaultItem: {
        groupId: '00000000-0000-0000-0000-000000000000',
        groupNo: '',
        length: '',
        maxLoadWeight: '',
        minLoadWeight: '',
        wharfId: ''
      },
      wharfitems: [],
      // valid
      nameRules: [
        v => !!v || '请输入码头名称'
      ],
      lengthRules: [
        v => /^\d+(\.\d+)?$/.test(v) || '请输入格式正确的组长度'
      ],
      maxLoadRules: [
        v => /^\d+(\.\d+)?$/.test(v) || '请输入格式正确的最大载重吨'
      ],
      minLoadRules: [
        v => /^\d+(\.\d+)?$/.test(v) || '请输入格式正确的最小载重吨'
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
      this.getwharf()
        .then(res => {
          this.getItem()
        })
    } else {
      this.getwharf()
    }
  },
  computed: {
    formTitle () {
      return this.id === '-1' ? '新增泊位组' : this.readonly === true ? '泊位组信息' : '编辑泊位组'
    },
    close () {
      return this.readonly === true ? '关闭' : '取消'
    }
  },
  methods: {
    getwharf: async function () {
      let { data } = await codes.GetWharfs()
      this.wharfitems = data
    },
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
          data = await api.Update(this.editedItem.groupId, this.editedItem)
        }
        if (data.data.code === 0) {
          this.$message.success('保存成功')
          this.$router.go(-1)
        } else {
          this.$message.error('保存数据出错')
        }
      }
    }
  }
}
</script>
