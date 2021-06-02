<template>
  <div>
    <PageHeader headertitle="用户管理">
      <v-spacer></v-spacer>
      <!-- <v-text-field
        v-model.trim ="search"
        append-icon="search"
        @click:append="searchuser"
        @keyup.enter="searchuser"
        label="关键词搜索"
        single-line
        hide-details
        clearable
      ></v-text-field> -->
      <v-btn
        color="primary"
        @click="regist"
      >
        <v-icon>add</v-icon>新增
      </v-btn>
    </PageHeader>
    <v-container fluid>
      <v-data-table
        :headers="headers"
        :items="desserts"
        class="elevation-1"
        :server-items-length="totalDesserts"
        :options.sync="pagination"
        :footer-props="{
          'items-per-page-options':rowsperpageitems
        }"
        :loading="loading"
        :dense="tableDense"
      >
        <template v-slot:item.actions="{ item }">
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-icon
                color="primary"
                v-on="on"
                @click="edit(item.userName)"
              >
                edit
              </v-icon>
            </template>
            <span>编辑</span>
          </v-tooltip>
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-icon
                color="info"
                v-on="on"
                @click="userrole(item.userName)"
              >
                person_outline
              </v-icon>
            </template>
            <span>分配角色</span>
          </v-tooltip>
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-icon
                color="primary"
                v-on="on"
                @click="unlock(item.userName)"
              >
                lock_open
              </v-icon>
            </template>
            <span>激活</span>
          </v-tooltip>
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-icon
                color="primary"
                v-on="on"
                @click="lock(item.userName)"
              >
                lock
              </v-icon>
            </template>
            <span>禁止</span>
          </v-tooltip>
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-icon
                color="warning"
                v-on="on"
                @click="deleteitem(item.fullName,item.uid)"
              >
                delete
              </v-icon>
            </template>
            <span>删除</span>
          </v-tooltip>
        </template>
        <template v-slot:no-data>
          <span>没有相关数据</span>
        </template>
      </v-data-table>
    </v-container>
    <DeleteConfirm v-bind:show="show" v-bind:info="delinfo"  v-on:CallBack="Callback" ></DeleteConfirm>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import api from '@/api/auth/UserApi'
import DeleteConfirm from '@/components/DeleteConfirm'
import PageHeader from '@/components/PageHeader'
export default {
  components: {
    DeleteConfirm,
    PageHeader
  },
  data () {
    return {
      headers: [
        { text: '登录名', sortable: true, value: 'userName' },
        { text: '中文名', sortable: true, value: 'fullName' },
        // { text: '角色', sortable: false },
        { text: '所属机构', sortable: false, value: 'orgName' },
        { text: '邮箱', sortable: false, value: 'email' },
        { text: '操作', sortable: false, align: 'center', value: 'actions' }
      ],
      desserts: [],
      pagination: {
        itemsPerPage: 10,
        page: 1
      },
      rowsperpageitems: [10, 20, 50],
      totalDesserts: 0,
      loading: false,
      search: '',
      // 删除弹窗
      delinfo: '',
      delid: '',
      show: false
    }
  },
  computed: {
    ...mapState('tabledense', [
      'tableDense'
    ])
  },
  watch: {
    pagination: {
      handler (newval, oldval) {
        if (oldval.groupBy) {
          this.getdata()
        }
      },
      deep: true
    }
  },
  created () {
    this.getdata()
  },
  methods: {
    getdata: async function () {
      this.loading = true
      let data = await api.GetUsers(this.pagination)
      this.desserts = data.data.values
      let page = data.data.page
      this.pagination.page = page.page
      this.pagination.rowsPerPage = page.pageSize
      this.totalDesserts = page.total
      this.loading = false
    },
    edit (uname) {
      this.$router.push({
        path: './user/edit',
        query: { id: uname }
      })
    },
    regist () {
      this.$router.push({
        path: './user/regist'
      })
    },
    userrole (uname) {
      this.$router.push({
        path: './user/role',
        query: { id: uname }
      })
    },
    searchuser: async function () {
      let search = this.search
      if (search) {
        this.pagination.searchKey = search
        this.getdata()
      } else {
        this.pagination.searchKey = null
        this.getdata()
      }
    },
    lock: async function (uname) {
      let data = await api.LockUser(uname)
      if (data.status === 200) {
        this.$message.success('禁用用户成功')
        this.getdata()
      } else {
        this.$message.error('禁用用户出错')
      }
    },
    unlock: async function (uname) {
      let data = await api.UnLockUser(uname)
      if (data.status === 200) {
        this.$message.success('激活用户成功')
        this.getdata()
      } else {
        this.$message.error('激活用户出错')
      }
    },
    deleteitem (name, id) {
      this.show = true
      this.delinfo = name
      this.delid = id
    },
    // 确认删除
    Callback: async function (msg) {
      if (msg === true) {
        let { data } = await api.DeleteUser(this.delid)
          .then(res => {
            this.$message.success('删除数据成功')
            this.getdata()
          })
          .catch(() => {
            this.$message.error('删除时出错')
          })
      } else {
        this.delid = ''
      }
      this.show = false
    }
  }
}
</script>
