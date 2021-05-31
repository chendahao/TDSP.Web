<template>
  <div>
    <PageHeader headertitle="组织机构管理">
      <v-spacer />
      <v-btn
        color="primary"
        dark
        @click="edit('-1','edit')"
      >
        <v-icon>add</v-icon>新增
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
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-icon
                color="primary"
                v-on="on"
                @click="edit(item.orgId,'edit')"
              >
                edit
              </v-icon>
            </template>
            <span>编辑</span>
          </v-tooltip>
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-icon
                color="warning"
                v-on="on"
                @click="deleteitem(item.name,item.orgId)"
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
import api from '@/api/auth/OrganApi'
import dayjs from 'dayjs'
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
        { text: '部门名称', sortable: true, value: 'orgName' },
        { text: '负责人', sortable: false, value: 'contacts' },
        { text: '联系电话', sortable: false, value: 'phone' },
        { text: '排序号', sortable: true, value: 'sort' },
        { text: '操作', sortable: false, align: 'center', value: 'actions' }
      ],
      desserts: [],
      pagination: {},
      rowsperpageitems: [10, 20, 50],
      totalDesserts: 0,
      loading: false,
      type_items: [],
      type_item: null,
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
        if (oldval.page) {
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
      let { data } = await api.GetAll()
      this.desserts = data
      this.loading = false
    },
    edit (id, type) {
      this.$router.push({
        path: './org/edit',
        query: { id: id, type: type }
      })
    },
    searchuser () {
      let search = this.content
      if (search) {
        this.pagination.searchKey = search
        this.getdata()
      } else {
        this.pagination.searchKey = null
        this.getdata()
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
        let { data } = await api.Delete(this.delid)
        if (data.code === 0) {
          this.message.ShowMessage('删除数据成功', 'success')
          this.getdata()
        }
      } else {
        this.delid = ''
      }
      this.show = false
    }
  }
}
</script>
