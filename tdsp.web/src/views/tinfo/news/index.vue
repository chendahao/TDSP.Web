<template>
  <div>
    <PageHeader headertitle="通知公告">
      <v-spacer></v-spacer>
      <v-btn color="green" dark @click="edit('-1','edit')">
        <v-icon>add</v-icon>
        新增
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
        <template v-slot:item.published="{ item }">
          {{item.published | datetimeFormat}}
        </template>
        <template v-slot:item.actions="{ item }">
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-icon
                color="info"
                v-on="on"
                @click="detail(item.id,'detail')"
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
                @click="edit(item.id,'edit')"
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
                @click="deleteitem(item.title,item.id)"
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
import DeleteConfirm from '@/components/DeleteConfirm'
import PageHeader from '@/components/PageHeader'
import { pubApi as pub } from '@/api/pub'
export default {
  components: {
    DeleteConfirm,
    PageHeader
  },
  data () {
    return {
      client: new pub.NewsClient('', this.$axios),
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
      headers: [
        { text: '标题', sortable: false, value: 'title' },
        { text: '类别', sortable: false, value: 'typeName' },
        { text: '来源', sortable: false, value: 'source' },
        { text: '发布日期', sortable: false, value: 'published' },
        { text: '操作', sortable: false, align: 'center', value: 'actions' }
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
        if (newval.itemsPerPage !== oldval.itemsPerPage || newval.page !== oldval.page || newval.sortBy !== oldval.sortBy || newval.sortDesc !== oldval.sortDesc) {
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
      let page = this.pagination
      this.client.getPage(page.itemsPerPage, page.page, page.sortBy[0], this.searchKey, page.sortDesc[0])
        .then(res => {
          this.totalDesserts = res.page.total
          this.pagination.page = res.page.page
          this.pagination.itemsPerPage = res.page.pageSize
          this.desserts = res.values
        })
        .finally(() => {
          this.loading = false
        })
    },
    edit (id, type) {
      this.$router.push({
        path: './news/edit',
        query: { id: id, type: type }
      })
    },
    detail (id, type) {
      this.$router.push({
        path: './news/detail',
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
        this.client.remove(this.delid)
          .then(res => {
            if (res.code === 0) {
              this.$message.success('删除数据成功')
              this.getdata()
            }
          })
          .finally(() => {
            this.show = false
          })
      } else {
        this.delid = ''
      }
    }
  }
}
</script>
