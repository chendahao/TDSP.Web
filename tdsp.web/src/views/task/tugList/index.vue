<template>
  <div>
    <PageHeader :dense="false" headertitle="拖轮信息">
     <v-spacer></v-spacer>
     <v-btn color="primary" @click="edit('-1','edit')">
        <v-icon>add</v-icon>
        新增
      </v-btn>
      <v-btn text @click="getdata">
        <v-icon>refresh</v-icon>
        刷新
      </v-btn>
    </PageHeader>
    <v-container fluid>
      <v-data-table
        :headers="headers"
        :items="tableData"
        hide-default-footer
        disable-pagination
        class="elevation-1"
        fixed-header
        :height="setheight"
        :loading="loading"
        :search="search"
        :dense="tableDense"
      >
        <template v-slot:item.builtDate="{ item }">
          {{ item.builtDate | dateFormat }}
        </template>
        <template v-slot:item.actions="{ item }">
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-icon
                color="info"
                v-on="on"
                @click="edit(item.mmsi,'detail')"
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
                @click="edit(item.mmsi,'edit')"
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
import PageHeader from '@/components/PageHeader'
import { orderBy } from 'lodash'
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
      client: new api.TugInfoClient('', this.$axios),
      headers: [
        { text: '船名', groupable: false, width: '80', sortable: false, value: 'name' },
        { text: '中文名', groupable: false, width: '130', sortable: false, value: 'cnName' },
        { text: 'MMSI', groupable: false, width: '80', sortable: false, value: 'mmsi' },
        { text: '船长(米)', groupable: false, width: '80', sortable: false, value: 'shipLength' },
        { text: '船宽(米)', groupable: false, width: '80', sortable: false, value: 'shipWidth' },
        { text: '型深(米)', groupable: false, width: '80', sortable: false, value: 'moldedDepth' },
        { text: '主机(马力)', groupable: false, width: '90', sortable: false, value: 'enginePower' },
        { text: '转速', groupable: false, width: '80', sortable: false, value: 'engineSpeed' },
        { text: '满载吃水', groupable: false, width: '80', sortable: false, value: 'fullLoadDraft' },
        { text: '航速', groupable: false, width: '60', sortable: false, value: 'maxSpeed' },
        { text: '正拖力', groupable: false, width: '60', sortable: false, value: 'forwardDrag' },
        { text: '倒拖力', groupable: false, width: '60', sortable: false, value: 'asternDrag' },
        { text: '尾拖钩', groupable: false, width: '80', sortable: false, value: 'towingHook' },
        { text: '建造日期', groupable: false, width: '130', sortable: false, value: 'builtDate' },
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
      that.setheight = window.innerHeight - 212 + 59
    }
  },
  destroyed () {
    window.onresize = ''
  },
  created () {
    this.setheight = window.innerHeight - 212 + 59
    this.getdata()
  },
  methods: {
    getdata () {
      this.loading = true
      this.client.tugInfoAll()
        .then(res => {
          let list = res
          for (let i = 0; i < list.length; i++) {
            let element = list[i]
            element.num = element.cnName.replace(/\s+/g, '').replace(/[\u4e00-\u9fa5a-zA-Z]/gm, '') * 1.0
          }
          const list2 = orderBy(list, ['num'], ['asc'])
          this.tableData = list2
          this.loading = false
        })
    },
    edit (mmsi, type) {
      this.$router.push({
        name: 'tugedit',
        query: { mmsi: mmsi, type: type }
      })
    },
    deleteitem (item) {
      this.$msgbox.confirm('要删除这条数据吗？', '删除确认', {
        confirmButtonText: '删除',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        console.log(item)
        this.client.tugInfo4(item.mmsi)
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
