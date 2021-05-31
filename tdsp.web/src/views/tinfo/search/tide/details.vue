<template>
  <v-data-table
    :headers="headers"
    :items="tideItems"
    :server-items-length="totalDesserts"
    class="elevation-1"
    :options.sync="pagination"
    :loading="loading"
    :dense="tableDense"
    :footer-props="{
      'items-per-page-options':rowsperpageitems
    }"
  >
    <template v-slot:item.tideDate="{ item }">
      {{ item.tideDate | formatDate}}
    </template>
    <template v-slot:item.fourthTide="{ item }">
     {{ item.fourthTide=='0'?'':item.fourthTide}}
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="getdata()">重试</v-btn>
    </template>
  </v-data-table>
</template>

<script>
import { mapState } from 'vuex'
import { pubApi as pub } from '@/api/pub'
import dayjs from 'dayjs'
export default {
  data () {
    return {
      client: new pub.TidesClient('', this.$axios),
      headers: [
        { text: '日期', sortable: false, value: 'tideDate' },
        { text: '第一潮时', sortable: false, value: 'firstTime' },
        { text: '第一潮高', sortable: false, value: 'firstTide' },
        { text: '第二潮时', sortable: false, value: 'secondTime' },
        { text: '第二潮高', sortable: false, value: 'secondTide' },
        { text: '第三潮时', sortable: false, value: 'thirdTime' },
        { text: '第三潮高', sortable: false, value: 'thirdTide' },
        { text: '第四潮时', sortable: false, value: 'fourthTime' },
        { text: '第四潮高', sortable: false, value: 'fourthTide' }
        // { text: '操作', sortable: false }
      ],
      tideItems: [],
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
      loading: true,
      totalDesserts: 0
    }
  },
  computed: {
    ...mapState('tabledense', [
      'tableDense'
    ])
  },
  filters: {
    formatDate: function (val) {
      if (val) {
        return dayjs(val).format('YYYY-MM-DD')
      } else {
        return ''
      }
    }
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
  created: function () {
    this.getdata()
  },
  methods: {
    getdata: async function () {
      this.loading = true
      this.pagination.rowsPerPage = this.pagination.itemsPerPage
      let page = this.pagination
      this.client.getAll(page.itemsPerPage, page.page, page.sortBy[0], this.searchKey, page.sortDesc[0])
        .then(res => {
          this.totalDesserts = res.page.total
          this.pagination.page = res.page.page
          this.pagination.rowsPerPage = res.page.pageSize
          this.tideItems = res.values
        })
        .finally(() => {
          this.loading = false
        })
    }
  }
}
</script>

<style>

</style>
