<template>
  <div>
    <!-- 值班日志 -->
    <PageHeader :dense="false" headertitle="值班日志">
      <v-spacer></v-spacer>
      <v-btn text @click="getdata">
        <v-icon>refresh</v-icon>
        刷新
      </v-btn>
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
        <template v-slot:item.actions="{ item }">
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-icon
                color="info"
                v-on="on"
                @click="edit(item.recordId,'detail')"
              >
                view_quilt
              </v-icon>
            </template>
            <span>详细</span>
          </v-tooltip>
        </template>
        <template v-slot:no-data>
          <span>当前没有数据</span>
          <v-btn small text color="primary" @click="getdata">重试</v-btn>
        </template>
      </v-data-table>
    </v-container>
  </div>
</template>
<script>
import PageHeader from '@/components/PageHeader'
import { tugApi as api } from '@/api/tugApi'
import { mapState } from 'vuex'
export default {
  components: {
    PageHeader
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
      client: new api.DutyClient('', this.$axios),
      headers: [
        { text: '值班日期', groupable: false, sortable: false, value: 'date' },
        { text: '值班人员', groupable: false, align: 'center', sortable: false, value: 'dispatcher' },
        { text: '交班人', groupable: false, align: 'center', sortable: false, value: 'shifter' },
        { text: '接班人', groupable: false, align: 'center', sortable: false, value: 'successor' },
        { text: '备注', groupable: false, align: 'center', sortable: false, value: 'remarks' },
        { text: '操作', sortable: false, align: 'center', width: '110', value: 'actions' }
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
      this.client.duty(null, null, null, null, false)
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
      this.client.duty(page.itemsPerPage, page.page, page.sortBy, this.searchKey, desc)
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
    edit (recordId, type) {
      this.$router.push({
        name: 'dutydetail',
        query: { recordId: recordId, type: type }
      })
    }
  }
}
</script>