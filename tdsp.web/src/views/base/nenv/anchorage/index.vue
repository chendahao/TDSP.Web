<template>
  <div>
    <PageHeader headertitle="锚地信息">
     <v-spacer></v-spacer>
      <!-- <v-btn color="green" dark @click="edit('-1','edit')">
        <v-icon>add</v-icon>
        新增
      </v-btn> -->
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
        <template v-slot:item.isNext="{ item }">
          {{ item.isNext==1?'是':'否' }}
        </template>
        <template v-slot:item.actions="{ item }">
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-icon
                color="info"
                v-on="on"
                @click="edit(item.anchId,'detail')"
              >
                view_quilt
              </v-icon>
            </template>
            <span>详细</span>
          </v-tooltip>
          <!-- <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-icon
                color="primary"
                v-on="on"
                @click="edit(item.anchId,'edit')"
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
                @click="deleteitem(item.name,item.anchId)"
              >
                delete
              </v-icon>
            </template>
            <span>删除</span>
          </v-tooltip> -->
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
import api from '@/api/navenv/AnchorageApi'
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
        { text: '锚地名称', sortable: false, value: 'name' },
        { text: '最小船长(m)', sortable: false, value: 'minLen' },
        { text: '最大船长(m)', sortable: false, value: 'maxLen' },
        { text: '锚地水深(m)', sortable: false, value: 'anchDepth' },
        { text: '顺序号', sortable: false, value: 'sort' },
        { text: '是否向下一个锚地锚泊', sortable: false, value: 'isNext' },
        { text: '操作', sortable: false, align: 'center', value: 'actions' }
      ],
      desserts: [],
      pagination: {},
      rowsperpageitems: [10, 20, 50],
      totalDesserts: 0,
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
        if (oldval.groupBy) {
          this.getdata()
        }
      },
      deep: true
    }
  },
  activated () {
    this.getdata()
  },
  methods: {
    getdata: async function () {
      this.loading = true
      let data = await api.GetAll(this.pagination)
      this.desserts = data.data.values
      let page = data.data.page
      this.pagination.page = page.page
      this.pagination.rowsPerPage = page.pageSize
      this.totalDesserts = page.total
      this.loading = false
    },
    edit (id, type) {
      this.$router.push({
        path: './anchorage/edit',
        query: { id: id, type: type }
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
          this.$message.success('删除数据成功')
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
