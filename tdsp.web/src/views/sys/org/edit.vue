<template>
  <div>
    <PageHeader :headertitle="formTitle">
      <v-spacer />
      <v-btn class="ma-2" @click="$router.go(-1)">
        {{ close }}
      </v-btn>
      <v-btn class="ma-2" v-if="!readonly" color="primary" @click="save">
        保存
      </v-btn>
    </PageHeader>
    <v-card class="card_center">
      <v-card-text>
        <v-container grid-list-md>
          <v-form ref="form" lazy-validation>
            <v-layout wrap>
              <v-flex xs12 sm6 md5>
                <v-text-field
                  v-model="editedItem.orgName"
                  label="机构名称"
                  :rules="[v => !!v || '请输入机构名称']"
                  :readonly="readonly"
                />
              </v-flex>
              <v-flex xs12 sm6 offset-md2 md5>
                <v-text-field
                  v-model="editedItem.contacts"
                  label="联系人"
                  :rules="[v => !!v || '请输入联系人']"
                  :readonly="readonly"
                />
              </v-flex>
              <v-flex xs12 sm6 md5>
                <v-text-field
                  v-model="editedItem.phone"
                  label="电话"
                  :rules="[v => !!v || '请输入电话']"
                  :readonly="readonly"
                />
              </v-flex>
              <v-flex xs12 sm6 offset-md2 md5>
                <v-text-field
                  v-model.number="editedItem.sort"
                  type="number"
                  label="排序号"
                  :rules="[v => !!v || '请输入排序号']"
                  :readonly="readonly"
                />
              </v-flex>
            </v-layout>
          </v-form>
        </v-container>
      </v-card-text>

      <v-card-actions>
        <v-spacer />
        <v-btn color="blue darken-1" text @click="$router.go(-1)">{{ close }}</v-btn>
        <v-btn color="blue darken-1" text @click="save" v-if="!readonly" >保存</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import PageHeader from '@/components/PageHeader'
import api from '@/api/auth/OrganApi'
export default {
  components: {
    PageHeader
  },
  data () {
    return {
      id: '',
      editedItem: {
        orgId: '00000000-0000-0000-0000-000000000000',
        orgName: '',
        contacts: '',
        phone: '',
        sort: null
      },
      defaultItem: {},
      // 详细、编辑状态
      readonly: true
    }
  },
  computed: {
    formTitle () {
      return this.id === '-1'
        ? '新增组织机构'
        : this.readonly === true
          ? '组织机构信息'
          : '编辑组织机构'
    },
    close () {
      return this.readonly === true ? '关闭' : '取消'
    }
  },
  watch: {},
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
          data = await api.Update(this.id, this.editedItem)
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
