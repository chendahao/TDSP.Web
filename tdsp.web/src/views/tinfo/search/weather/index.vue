<template>
  <div>
    <PageHeader headertitle="气象数据">
      <v-spacer></v-spacer>
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
        <template v-slot:item.regDate="{ item }">
          {{ item.regDate | dateFormat}}
        </template>
        <template v-slot:item.publishDate="{ item }">
          {{ item.publishDate | dateFormat}}
        </template>
        <template v-slot:no-data>
          <span>当前日期没有数据</span>
        </template>
      </v-data-table>
    </v-container>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { pubApi as pub } from '@/api/pub'
import PageHeader from '@/components/PageHeader'
import dayjs from 'dayjs'
export default {
  components: {
    PageHeader
  },
  data () {
    return {
      client: new pub.WeatherClient('', this.$axios),
      headers: [
        { text: '发布时间', sortable: false, value: 'regDate' },
        { text: '接收时间', sortable: false, value: 'publishDate' },
        { text: '时效', sortable: false, value: 'times' },
        { text: '天气', sortable: false, value: 'weatherInfo' },
        { text: '风力', sortable: false, value: 'windPower' },
        { text: '风向', sortable: false, value: 'windDirection' },
        { text: '能见度(km)', sortable: false, value: 'visibility' }
      ],
      desserts: [],
      pagination: {},
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
        if (oldval.page) {
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
      let date = dayjs().format('YYYY-MM-DD')
      this.client.getByDate(date)
        .then(res => {
          this.desserts = res.values
          let page = res.page
          this.pagination.page = page.page
          this.pagination.rowsPerPage = page.pageSize
          this.totalDesserts = page.total
          this.loading = false
        })
    }
  }
}
</script>
