<template>
  <div>
    <PageHeader :headertitle="formTitle">
      <v-spacer></v-spacer>
      <v-btn class="ma-2" @click="$router.go(-1)">关闭</v-btn>
      <v-btn class="ma-2" color="primary" @click="save">保存</v-btn>
    </PageHeader>
    <v-card class="card_center">
      <v-card-text>
        <v-container grid-list-md>
          <v-form
            ref="form"
            lazy-validation
          >
            <v-layout wrap>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="editedItem.name" label="标识名称" readonly></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="editedItem.sort" label="排序号" :rules="Rules"></v-text-field>
              </v-flex>
              <v-flex xs12 sm12 md3>
                <v-text-field v-model="editedItem.color" label="标识颜色" :rules="ColorRule"></v-text-field>
              </v-flex>
              <v-flex xs12 sm12 md1 style="margin-top:15px">
                <colorpicker v-model="editedItem.color"></colorpicker>
              </v-flex>
              <v-flex md12>
                <v-text-field
                  label="描述"
                  v-model="editedItem.desc"
                  :rules="[ v => !!v || '请输入描述']"
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-form>
        </v-container>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="$router.go(-1)">取消</v-btn>
        <v-btn color="blue darken-1" text @click="save">保存</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import api from '@/api/navenv/ShipMarkApi'
import colorpicker from '@/components/ColorPicker'
import PageHeader from '@/components/PageHeader'
export default {
  components: {
    colorpicker,
    PageHeader
  },
  data () {
    return {
      id: -1,
      editedItem: {
        id: '',
        name: '',
        color: '',
        sort: '',
        desc: ''
      },
      defaultItem: {
        id: '',
        name: '',
        color: '',
        sort: '',
        desc: ''
      },
      // valid
      Rules: [
        v => !!v || '请输入排序号'
      ],
      ColorRule: [
        v => /^#([a-fA-F0-9]{8}|[a-fA-F0-9]{4}|[a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/.test(v) || '颜色格式不正确'
      ],
      formTitle: '船舶标识'
    }
  },
  created () {
    this.id = this.$route.query.id
    if (this.id !== '-1') {
      this.getItem()
    }
  },
  methods: {
    getItem: async function () {
      let item = await api.GetById(this.id)
      this.editedItem = item.data
      if (item.data.color.indexOf('#') === -1) this.editedItem.color = '#' + item.data.color
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
