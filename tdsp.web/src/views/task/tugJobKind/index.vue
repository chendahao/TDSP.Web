<template>
  <div>
    <PageHeader :dense="false" headertitle="拖轮作业类型">
     <v-spacer></v-spacer>
     <v-btn color="primary" @click="edit('-1','edit')">
        <v-icon>add</v-icon>
        新增
      </v-btn>
      <v-btn text @click="getdata">
        <v-icon>refresh</v-icon>
        刷新
      </v-btn>
      <Help>
        <slot>
          计划内作业 计划内作业通过 拖轮作业计划管理
          <br />
          计划外 临时调度,不需要作业计划
        </slot>
      </Help>
    </PageHeader>
    <v-container fluid>
      <v-data-table
        :headers="headers"
        :items="tableData"
        :server-items-length="totalData"
        :height="setheight"
        fixed-header
        :options.sync="pagination"
        :footer-props="{
          'items-per-page-options':rowsperpageitems
        }"
        :loading="loading"
      >
        <template v-slot:item.planed="{ item }">
          <span v-if="item.planed === false">
            否
          </span>
          <v-chip v-else color="info" small>
            是
          </v-chip>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-icon
                color="info"
                v-on="on"
                @click="edit(item.jobKind,'detail')"
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
                @click="edit(item.jobKind,'edit')"
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
                @click="deleteitem(item)"
              >
                delete
              </v-icon>
            </template>
            <span>删除</span>
          </v-tooltip>
        </template>
        <template v-slot:no-data>
          <v-btn color="primary" @click="getdata">重试</v-btn>
        </template>
      </v-data-table>
    </v-container>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { tugApi as api } from '@/api/tugApi'
import Help from '@/components/help'
import PageHeader from '@/components/PageHeader'
export default {
  components: {
    PageHeader,
    Help
  },
  data () {
    return {
      search: '',
      setheight: 550,
      tableData: [],
      loading: false,
      rowsperpageitems: [10, 20, 50],
      totalData: 0,
      pagination: {},
      client: new api.TugJobKindClient('', this.$axios),
      headers: [
        { text: '作业类型名称', groupable: false, sortable: false, value: 'name' },
        { text: '说明', groupable: false, sortable: false, value: 'description' },
        { text: '是否关联计划', groupable: false, sortable: false, value: 'planed' },
        { text: '操作', sortable: false, align: 'center', value: 'actions' }
      ]
    }
  },
  computed: {
    ...mapState('tabledense', [
      'tableDense'
    ])
  },
  mounted () {
    const that = this
    window.onresize = function temp () {
      // page 59; pageheader 64;pageheader dense 48;container padding top bottom 12px; appbar 64
      that.setheight = window.innerHeight - 212 + 59 - 64
    }
  },
  watch: {
    pagination: {
      handler (newval, oldval) {
        if (oldval.groupBy) {
          this.getData()
        }
      },
      deep: true
    }
  },
  destroyed () {
    window.onresize = ''
  },
  created () {
    this.setheight = window.innerHeight - 212 + 59 - 64
    this.initData()
  },
  methods: {
    initData () {
      this.loading = true
      this.client.tugJobKind2(null, null, null, null, false)
        .then(res => {
          this.tableData = res.values
          this.pagination.page = res.page.page
          this.pagination.itemsPerPage = res.page.pageSize
          this.totalData = res.page.total
        })
        .finally(() => {
          this.loading = false
        })
    },
    getdata () {
      this.loading = true
      const page = this.pagination
      const desc = page.sortDesc.length > 0 ? page.sortDesc[0] : false
      this.client.tugJobKind2(page.itemsPerPage, page.page, page.sortBy, this.searchKey, desc)
        .then(res => {
          this.tableData = res.values
          this.pagination.page = res.page.page
          this.pagination.itemsPerPage = res.page.pageSize
          this.totalData = res.page.total
        })
        .finally(() => {
          this.loading = false
        })
    },
    edit (jobKind, type) {
      this.$router.push({
        name: 'tugjobkindedit',
        query: { jobKind: jobKind, type: type }
      })
    },
    deleteitem (item) {
      this.$msgbox.confirm('要删除这条数据吗？', '删除确认', {
        confirmButtonText: '删除',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        console.log(item)
        this.client.tugJobKind4(item.jobKind)
          .then(() => {
            this.$message.success('删除成功')
            this.getdata()
          })
      }).catch(() => {
      })
    }
  }
}
</script>
