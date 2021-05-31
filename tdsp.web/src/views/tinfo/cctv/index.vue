<template>
  <div>
    <PageHeader headertitle="CCTV视频监控">
      <v-spacer></v-spacer>
      <v-btn color="green" dark @click="edit('-1','edit')">
        <v-icon>add</v-icon>
        新增
      </v-btn>
      <v-btn color="primary" @click="tolist()">
        <v-icon>list</v-icon>
        视频监控
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
        <template v-slot:items="props">
          <td>{{props.item.name}}</td>
          <td>{{props.item.location}}</td>
          <td>{{props.item.person}}</td>
          <td>{{props.item.phone}}</td>
          <td class="justify-center layout px-0">
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-icon
                  color="info"
                  v-on="on"
                  @click="edit(props.item.cctvId,'detail')"
                >
                  view_quilt
                </v-icon>
              </template>
              <span>详细</span>
            </v-tooltip>
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-icon
                  color="primary"
                  v-on="on"
                  @click="edit(props.item.cctvId,'edit')"
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
                  @click="deleteitem(props.item.name,props.item.cctvId)"
                >
                  delete
                </v-icon>
              </template>
              <span>删除</span>
            </v-tooltip>
          </td>
        </template>
        <template v-slot:no-data>
          <v-btn color="primary" @click="getdata">重试</v-btn>
        </template>
      </v-data-table>
    </v-container>
    <DeleteConfirm v-bind:show="show" v-bind:info="delinfo"  v-on:CallBack="Callback" ></DeleteConfirm>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import api from '@/api/navenv/CCTVApi'
import DeleteConfirm from '@/components/DeleteConfirm'
import PageHeader from '@/components/PageHeader'
export default {
  components: {
    DeleteConfirm,
    PageHeader
  },
  data () {
    return {
      pagination: {},
      rowsperpageitems: [10, 20, 50],
      totalDesserts: 0,
      headers: [
        { text: '名称', sortable: false, value: 'name' },
        { text: '安装地点', sortable: false, value: 'location' },
        { text: '联系人', sortable: false, value: 'person' },
        { text: '联系电话', sortable: false, value: 'phone' },
        { text: '操作', sortable: false, align: 'center' }
      ],
      desserts: [],
      loading: false,
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
      let data = await api.GetPage(this.pagination)
      this.desserts = data.data.values
      let page = data.data.page
      this.pagination.page = page.page
      this.pagination.rowsPerPage = page.pageSize
      this.totalDesserts = page.total
      this.loading = false
    },
    edit (id, type) {
      this.$router.push({
        path: './cctv/edit',
        query: { id: id, type: type }
      })
    },
    tolist () {
      this.$router.push({
        path: './cctv/list'
      })
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
