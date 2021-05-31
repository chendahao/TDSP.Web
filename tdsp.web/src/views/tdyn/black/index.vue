<template>
  <div>
    <PageHeader headertitle="黑名单船舶列表">
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
      >
        <!-- <template v-slot:items="props">

        </template> -->
      </v-data-table>
    </v-container>
    <DeleteConfirm v-bind:show="show" v-bind:info="delinfo"  v-on:CallBack="Callback" ></DeleteConfirm>
  </div>
</template>
<script>
import PageHeader from '@/components/PageHeader'
import DeleteConfirm from '@/components/DeleteConfirm'
export default {
  components: {
    PageHeader,
    DeleteConfirm
  },
  data () {
    return {
      headers: [
        { text: 'MMSI', sortable: false },
        { text: '类型', sortable: false },
        { text: '预案内容', sortable: false },
        { text: '操作', sortable: false, align: 'center' }
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
      // let { data } = await api.GetAll(this.pagination)
      // this.desserts = data.values
      // let page = data.page
      // this.pagination.page = page.page
      // this.pagination.rowsPerPage = page.pageSize
      // this.totalDesserts = page.total
      this.loading = false
    }
  }
}
</script>
