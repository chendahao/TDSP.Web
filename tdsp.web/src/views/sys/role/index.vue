<template>
  <div>
    <PageHeader headertitle="角色管理">
     <v-spacer></v-spacer>
      <v-btn color="primary" @click="add">
        <v-icon>add</v-icon>
        新增
      </v-btn>
    </PageHeader>
    <v-container fluid>
      <v-data-table
        :headers="headers"
        :items="desserts"
        class="elevation-1"
        hide-default-footer
        disable-pagination
        :loading="loading"
        :dense="tableDense"
      >
        <template v-slot:item.actions="{ item }">
          <!-- <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-icon
                color="primary"
                v-on="on"
                @click="edit(item.incodeId)"
              >
                edit
              </v-icon>
            </template>
            <span>编辑</span>
          </v-tooltip> -->
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-icon
                color="warning"
                v-on="on"
                @click="deleteitem(item.name,item.name)"
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
    <v-dialog
      v-model="dialog"
      persistent
      max-width="400px"
    >
      <v-card>
        <v-card-title>
          <span class="headline">添加角色</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-form
              ref="form"
              lazy-validation
            >
              <v-layout wrap>
                <v-flex xs12 sm12 md12>
                  <v-text-field v-model="rolename" label="角色名称" :rules="[v => !!v || '请输入角色名称']"></v-text-field>
                </v-flex>
              </v-layout>
            </v-form>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" class="ma-2" text @click="cancel">取消</v-btn>
          <v-btn color="blue darken-1" class="ma-2" text @click="save">保存</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <DeleteConfirm v-bind:show="show" v-bind:info="delinfo"  v-on:CallBack="Callback" ></DeleteConfirm>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import api from '@/api/auth/RoleApi'
import DeleteConfirm from '@/components/DeleteConfirm'
import PageHeader from '@/components/PageHeader'
export default {
  components: {
    PageHeader,
    DeleteConfirm
  },
  data () {
    return {
      headers: [
        { text: '角色名称', sortable: false, value: 'name' },
        { text: '操作', sortable: false, align: 'center', value: 'actions' }
      ],
      desserts: [],
      loading: false,
      // 删除弹窗
      delinfo: '',
      delid: '',
      show: false,
      // 添加角色
      rolename: null,
      dialog: false
    }
  },
  computed: {
    ...mapState('tabledense', [
      'tableDense'
    ])
  },
  created () {
    this.getdata()
  },
  methods: {
    getdata: async function () {
      this.loading = true
      let data = await api.GetRoles()
      this.desserts = data.data
      this.loading = false
    },
    deleteitem (name, id) {
      this.show = true
      this.delinfo = name
      this.delid = id
    },
    // 确认删除
    Callback: async function (msg) {
      if (msg === true) {
        let { data } = await api.Delete(this.delid)
        if (data.code === 0) {
          this.message.ShowMessage('删除数据成功', 'success')
          this.getdata()
        } else {
          this.message.ShowMessage('删除数据出错', 'error')
        }
      } else {
        this.delid = ''
      }
      this.show = false
    },
    add () {
      this.dialog = true
    },
    cancel () {
      this.$refs.form.reset()
      this.dialog = false
    },
    save: async function () {
      if (this.$refs.form.validate()) {
        let data = await api.CreateRole(this.rolename)
        if (data.data.code === 0) {
          this.message.ShowMessage('保存成功', 'success')
          this.getdata()
        } else {
          this.message.ShowMessage('保存数据出错', 'error')
        }
      }
    }
  }
}
</script>
