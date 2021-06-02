<template>
  <div>
    <PageHeader headertitle="编辑用户">
      <v-spacer></v-spacer>
      <v-btn class="ma-2" @click="$router.go(-1)">返回</v-btn>
      <v-btn class="ma-2" color="primary" @click="save">保存</v-btn>
    </PageHeader>
    <v-card class="card_center">
      <v-card-text>
        <v-container grid-list-md>
          <v-form ref="form" lazy-validation>
            <v-layout row wrap>
              <v-flex md5>
                <v-text-field v-model="editedItem.fullName" label="用户名" :rules="fullNameRule" ></v-text-field>
              </v-flex>
              <v-flex offset-md2 md5>
                <v-text-field v-model="editedItem.userName" readonly label="登录名" :rules="[v => !!v || '请输入登录名']" ></v-text-field>
              </v-flex>
              <v-flex md5>
                <v-text-field v-model="editedItem.email" label="邮箱"></v-text-field>
              </v-flex>
              <v-flex offset-md2 md5>
                <v-select
                  v-model="editedItem.orgId"
                  :items="orgitems"
                  item-text="text"
                  item-value="value"
                  label="所属机构"
                  :rules="[v => !!v || '请选择所属机构']"
                  :menu-props="{zIndex:'9999'}"
                />
              </v-flex>
            </v-layout>
          </v-form>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="$router.go(-1)">返回</v-btn>
        <v-btn color="blue darken-1" text @click="save">保存</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>
<script>
import api from '@/api/auth/UserApi'
import codes from '@/api/auth/OrganApi'
import PageHeader from '@/components/PageHeader'
export default {
  components: {
    PageHeader
  },
  data () {
    return {
      editedItem: {
        password: '',
        confirmPassword: '',
        userName: '',
        fullName: '',
        email: '',
        orgId: ''
      },
      fullNameRule: [v => !!v || '请输入用户名', v => (v && v.length >= 3) || '用户名过短'],
      orgitems: [],
      pass1rules: [v => !!v || '请输入密码', v => (v && v.length >= 6) || '密码至少要6位']
    }
  },
  created () {
    this.id = this.$route.query.id
    this.getorgs()
      .then(
        this.getItem()
      )
  },
  methods: {
    getorgs: async function () {
      let { data } = await codes.GetCodes()
      this.orgitems = data
    },
    getItem: async function () {
      let data = await api.GetByName(this.id)
      this.editedItem = data.data
    },
    save: async function () {
      this.snackbar = false
      if (this.$refs.form.validate()) {
        let data = await api.UpdateUser(this.editedItem)
        if (data.status === 200) {
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
