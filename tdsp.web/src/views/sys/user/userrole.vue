<template>
  <div>
    <PageHeader headertitle="用户角色">
      <v-spacer></v-spacer>
      <v-btn class="ma-2" @click="$router.go(-1)">返回</v-btn>
      <v-btn class="ma-2" color="primary" @click="save">保存</v-btn>
    </PageHeader>
    <v-card class="card_center">
      <v-card-text>
        <v-container grid-list-md>
          <v-checkbox v-for="(item, index) in list" :key="index" v-model="selected" :label="item.name" :value="item.name"></v-checkbox>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" class="ma-2" text @click="$router.go(-1)">返回</v-btn>
        <v-btn color="blue darken-1" class="ma-2" text @click="save">保存</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>
<script>
import RoleApi from '@/api/auth/RoleApi'
import api from '@/api/auth/UserApi'
import PageHeader from '@/components/PageHeader'
export default {
  components: {
    PageHeader
  },
  data () {
    return {
      uname: '',
      list: [],
      // 已选角色
      selected: []
    }
  },
  created () {
    this.uname = this.$route.query.id
    this.getroles().then(
      this.getuserrole()
    )
  },
  methods: {
    // 获取所有角色
    getroles: async function () {
      let data = await RoleApi.GetRoles()
      this.list = data.data
    },
    // 获取用户的角色列表
    getuserrole: async function () {
      let { data } = await api.GetUserRoles(this.uname)
      this.selected = data
    },
    save: async function () {
      let data = await api.SetUserRoles(this.uname, this.selected)
      if (data.status === 200) {
        this.message.ShowMessage('保存成功', 'success')
        this.$router.go(-1)
      } else {
        this.message.ShowMessage('保存数据出错', 'error')
      }
    }
  }
}
</script>
