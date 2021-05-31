<template>
  <div>
    <PageHeader headertitle="船舶数据库">
      <v-spacer></v-spacer>
      <!-- 这里是服务器搜索 -->
      <v-text-field
        v-model.trim ="search"
        append-icon="search"
        @click:append="searchship"
        @keyup.enter="searchship"
        label="关键词搜索"
        single-line
        hide-details
        clearable
      ></v-text-field>
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
        <template v-slot:item.shipLength="{ item }">
          {{ item.shipLength }}/{{ item.shipWidth }}
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
import api from '@/api/navenv/ShipDatabaseApi'
import PageHeader from '@/components/PageHeader'
export default {
  components: {
    PageHeader
  },
  data () {
    return {
      search: '',
      headers: [
        { text: 'MMSI', sortable: false, value: 'mmsi' },
        { text: 'IMO', sortable: false, value: 'imo' },
        { text: '中文船名', sortable: false, value: 'cnName' },
        { text: '英文船名', sortable: false, value: 'name' },
        { text: '船长/船宽(m)', sortable: false, value: 'shipLength' },
        { text: '国籍', sortable: false, value: 'nationality' },
        { text: '载重吨', sortable: false, value: 'loadWeight' },
        { text: '呼号', sortable: false, value: 'callSign' },
        { text: '备注', sortable: false, value: 'remark' }
      // { text: '操作', sortable: false }
      ],
      desserts: [],
      pagination: {
        groupBy: [],
        groupDesc: [],
        itemsPerPage: 10,
        multiSort: false,
        mustSort: false,
        page: 1,
        sortBy: [],
        sortDesc: []
      },
      rowsperpageitems: [10, 20, 50],
      totalDesserts: 0,
      loading: false
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
        if (newval.itemsPerPage !== oldval.itemsPerPage || newval.page !== oldval.page || newval.sortBy !== oldval.sortBy || newval.sortDesc !== oldval.sortDesc) {
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
      let data = await api.GetPage(this.pagination)
      this.desserts = data.data.values
      let page = data.data.page
      this.pagination.page = page.page
      this.pagination.itemsPerPage = page.pageSize
      this.totalDesserts = page.total
      this.loading = false
    },
    edit (id) {
      this.$router.push({
        path: '/shipdatabase/edit',
        query: { id: id }
      })
    },
    delete: async function (id) {
      // let data = await api.Delete(this.editedItem)
      // success
      // 刷新
    },
    searchship: async function () {
      let search = this.search
      if (search) {
        this.pagination.searchKey = search
        this.getdata()
      } else {
        this.pagination.searchKey = null
        this.getdata()
      }
    }
  }
}
</script>
