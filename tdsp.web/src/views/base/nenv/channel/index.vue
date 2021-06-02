<template>
  <div>
    <PageHeader headertitle="航道信息">
     <v-spacer></v-spacer>
      <!-- <v-btn class="ma-2" color="green" dark @click="edit('-1','edit')">
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
        <!-- <template v-slot:item.isMonitor="{ item }">
          {{ item.isNext==1?'是':'否' }}
        </template> -->
        <template v-slot:item.actions="{ item }">
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-icon
                color="info"
                v-on="on"
                @click="edit(item.channelId,'detail')"
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
                @click="edit(item.channelId,'edit')"
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
                @click="deleteitem(item.name,item.channelId)"
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
import api from '@/api/navenv/ChannelApi'
import DeleteConfirm from '@/components/DeleteConfirm'
import PageHeader from '@/components/PageHeader'
export default {
  components: {
    DeleteConfirm,
    PageHeader
  },
  data () {
    return {
      loading: false,
      headers: [
        { text: '航道名称', sortable: false, value: 'name' },
        { text: '航道宽度(海里)', sortable: false, value: 'width' },
        // { text: '是否开启监控', sortable: false, value: 'isMonitor' },
        { text: '所属港池', sortable: false, value: 'harborName' },
        { text: '操作', sortable: false, align: 'center', value: 'actions' }
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
        path: './channel/edit',
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
