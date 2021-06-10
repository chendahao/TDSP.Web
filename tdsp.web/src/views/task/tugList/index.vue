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
        <template v-slot:item.heindhook="{ item }">
          {{ item.heindhook === true ? '有' : '无' }}
        </template>
        <template v-slot:item.actions="{ item }">
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-icon
                color="info"
                v-on="on"
                @click="edit(item.id,'detail')"
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
import { TugList } from '@/mock/tug'
import PageHeader from '@/components/PageHeader'
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
      headers: [
        { text: '名称', groupable: false, sortable: false, value: 'name' },
        { text: '船长(米)', groupable: false, sortable: false, value: 'length' },
        { text: '船宽(米)', groupable: false, sortable: false, value: 'width' },
        { text: '型深(米)', groupable: false, sortable: false, value: 'depth' },
        { text: '主机(马力)', groupable: false, sortable: false, value: 'mainEngine' },
        { text: '转速', groupable: false, sortable: false, value: 'rotatingSpeed' },
        { text: '满载吃水', groupable: false, sortable: false, value: 'draft' },
        { text: '航速', groupable: false, sortable: false, value: 'speed' },
        { text: '正拖力', groupable: false, sortable: false, value: 'fontDrag' },
        { text: '倒拖力', groupable: false, sortable: false, value: 'behindDrag' },
        { text: '尾拖钩', groupable: false, sortable: false, value: 'heindhook' },
        { text: '排序号', groupable: false, sortable: false, value: 'sort' },
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
      setTimeout(() => {
        this.tableData = TugList().data
        this.loading = false
      }, 1500)
    },
    edit (id, type) {
      this.$router.push({
        name: 'tugedit',
        query: { id: id, type: type }
      })
    },
    deleteitem (item) {
      this.$msgbox.confirm('要删除这条数据吗？', '删除确认', {
        confirmButtonText: '删除',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message.success('删除成功')
        // this.client.files2(id, this.userinfo.gh)
        //   .then(() => {
        //     this.$message.success('取消成功')
        //     this.getdata()
        //   })
      }).catch(() => {
      })
    }
  }
}
</script>
