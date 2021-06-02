<template>
  <div>
    <PageHeader :headertitle="title">
      <v-spacer></v-spacer>
      <v-text-field
        class="ma-2"
        v-model.trim="search"
        append-icon="search"
        @click:append="searchberth"
        @keyup.enter="searchberth"
        label="泊位编号搜索"
        single-line
        hide-details
        clearable
      ></v-text-field>
      <!-- <v-btn
        class="ma-2"
        color="green"
        dark
        @click="edit('-1','edit')"
      >
        <v-icon>add</v-icon>新增
      </v-btn> -->
    </PageHeader>
    <v-container fluid>
      <v-data-table
        :headers="headers"
        :items="desserts"
        single-expand
        show-expand
        class="elevation-1"
        :server-items-length="totalDesserts"
        :options.sync="pagination"
        :footer-props="{
          'items-per-page-options':rowsperpageitems
        }"
        :loading="loading"
        sort-by
        item-key="berthId"
        :dense="tableDense"
      >
        <template v-slot:item.actions="{ item }">
          <!-- <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-icon
                color="primary"
                v-on="on"
                @click="expanded = !expanded"
              >view_list</v-icon>
            </template>
            <span>子泊位</span>
          </v-tooltip> -->
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-icon
                color="info"
                v-on="on"
                @click="edit(item.berthId,'detail')"
              >view_quilt</v-icon>
            </template>
            <span>详细</span>
          </v-tooltip>
          <!-- <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-icon
                color="primary"
                v-on="on"
                @click="edit(item.berthId,'edit')"
              >edit</v-icon>
            </template>
            <span>编辑</span>
          </v-tooltip>
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-icon
                color="warning"
                v-on="on"
                @click="deleteitem(item.berthNo,item.berthId)"
              >delete</v-icon>
            </template>
            <span>删除</span>
          </v-tooltip> -->
        </template>
        <template v-slot:expanded-item="{ headers, item  }">
          <td :colspan="headers.length">
            <v-data-table
              :headers="headers"
              :items="item.children"
              hide-default-footer
              class="elevation-1"
            >
              <template v-slot:item.actions="{ item }">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-icon
                      color="primary"
                      v-on="on"
                      @click="edit(item.berthId,'detail')"
                    >view_quilt</v-icon>
                  </template>
                  <span>详细</span>
                </v-tooltip>
                <!-- <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-icon
                      color="primary"
                      v-on="on"
                      @click="edit(item.berthId,'edit')"
                    >edit</v-icon>
                  </template>
                  <span>编辑</span>
                </v-tooltip>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-icon
                      color="primary"
                      v-on="on"
                      @click="deleteitem(item.berthNo,item.berthId)"
                    >delete</v-icon>
                  </template>
                  <span>删除</span>
                </v-tooltip> -->
              </template>
            </v-data-table>
          </td>
        </template>
        <template v-slot:no-data>
          <v-btn
            color="primary"
            @click="getdata"
          >重试</v-btn>
        </template>
      </v-data-table>
    </v-container>
    <DeleteConfirm
      v-bind:show="show"
      v-bind:info="delinfo"
      v-on:CallBack="Callback"
    ></DeleteConfirm>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import api from '@/api/navenv/BerthApi'
import DeleteConfirm from '@/components/DeleteConfirm'
import PageHeader from '@/components/PageHeader'
export default {
  components: {
    DeleteConfirm,
    PageHeader
  },
  data () {
    return {
      title: '泊位信息',
      search: '',
      expand: false,
      loading: false,
      headers: [
        { text: '泊位编号', sortable: true, value: 'berthNo' },
        { text: '距口门排序', sortable: true, value: 'distanceSort' },
        { text: '所属泊位组', sortable: true, value: 'groupNo' },
        { text: '操作', sortable: false, align: 'center', value: 'actions' },
        { text: '子泊位', width: '100', value: 'data-table-expand' }
      ],
      desserts: [],
      id: -1,
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
      // pagination: {},
      rowsperpageitems: [10, 20, 50],
      totalDesserts: 0,
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
        path: './berth/edit',
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
        } else {
          this.$message.error('删除数据出错')
        }
      } else {
        this.delid = ''
      }
      this.show = false
    },
    searchberth: async function () {
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
