<template>
  <div>
    <PageHeader :headertitle="title">
      <v-spacer></v-spacer>
      <!-- <v-text-field
        class="ma-2"
        v-model.trim="search"
        append-icon="search"
        @keyup="searchEvent"
        label="关键词搜索"
        single-line
        hide-details
        clearable
      ></v-text-field> -->
      <!-- <v-btn
        class="ma-2"
        color="green"
        dark
        @click="getdata"
      >
        <v-icon>add</v-icon>getdata
      </v-btn> -->
    </PageHeader>
    <v-container fluid>
      <vxe-table
        resizable
        highlight-hover-row
        border="inner"
        :height="setheight"
        :loading="loading"
        show-overflow
        :size="tableDense == true ? 'mini' : 'medium'"
        ref="xTree"
        :tree-config="{children: 'children',expandAll: true}"
        :data="tableData">
        <vxe-table-column field="harborName" title="港池" tree-node :formatter="formatHarbor"></vxe-table-column>
        <vxe-table-column field="orgName" title="所属机构"></vxe-table-column>
        <vxe-table-column field="wharfNo" title="码头名称"></vxe-table-column>
        <vxe-table-column field="berthNo" title="泊位编号"></vxe-table-column>
        <vxe-table-column field="harborDepth" title="港池最大吃水"></vxe-table-column>
      </vxe-table>
    </v-container>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapState } from 'vuex'
import api from '@/api/navenv/BerthViewApi'
import PageHeader from '@/components/PageHeader'
import 'xe-utils'
import VXETable from 'vxe-table'
import 'vxe-table/lib/style.css'
Vue.use(VXETable)
export default {
  components: {
    PageHeader
  },
  data () {
    return {
      title: '通航环境综合信息',
      search: '',
      expand: false,
      loading: false,
      headers: [
        { text: '泊位编号', sortable: true, value: 'berthNo' },
        { text: '距口门排序', sortable: true, value: 'distanceSort' },
        { text: '所属泊位组', sortable: true, value: 'groupNo' }
      ],
      desserts: [],
      tableData: [],
      id: -1,
      setheight: window.innerHeight - 152,
      pagination: {
        groupBy: [],
        groupDesc: [],
        itemsPerPage: 999,
        multiSort: false,
        mustSort: false,
        page: 1,
        sortBy: [],
        sortDesc: []
      },
      // pagination: {},
      rowsperpageitems: [10, 20, 50],
      totalDesserts: 0
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
  mounted () {
    const that = this
    window.onresize = function temp () {
      // page 59; pageheader 64;pageheader dense 48;container padding top bottom 12px; appbar 64
      that.setheight = window.innerHeight - 152
    }
  },
  destroyed () {
    window.onresize = ''
  },
  created () {
    this.getdata()
  },
  methods: {
    formatHarbor ({ cellValue }) {
      if (cellValue) {
        return cellValue.replace(/[0-9]/ig, '')
      }
    },
    getdata: async function () {
      this.loading = true
      let { data } = await api.berthView(this.pagination)
      this.desserts = data.values
      let desserts2 = this.desserts.sort(this.listSortberthNo)
      var tree = this.groupArr(desserts2, 'harborName')
      for (let i = 0; i < tree.length; i++) {
        const element = tree[i]
        let harbor = element.harborName
        if ((harbor).indexOf('一') > -1) {
          element.harborName = '1' + harbor
        } else if ((harbor).indexOf('二') > -1) {
          element.harborName = '2' + harbor
        } else if ((harbor).indexOf('三') > -1) {
          element.harborName = '3' + harbor
        } else {
          element.harborName = '0' + harbor
        }
        element.children = this.groupArr2(element.children, 'wharfNo')
      }
      let list = tree.sort(this.listSortHarborName)
      this.tableData = list
      this.loading = false
    },
    groupArr (list, field) {
      var fieldList = []; var att = []
      list.map((e) => {
        fieldList.push(e[field])
      })
      // 数组去重
      fieldList = fieldList.filter((e, i, self) => {
        return self.indexOf(e) === i
      })
      for (var j = 0; j < fieldList.length; j++) {
        // 过滤出匹配到的数据
        var arr = list.filter((e) => {
          return e[field] === fieldList[j]
        })
        att.push({
          harborName: arr[0][field],
          children: arr
        })
      }
      return att
    },
    groupArr2 (list, field) {
      var fieldList = []; var att = []
      list.map((e) => {
        fieldList.push(e[field])
      })
      // 数组去重
      fieldList = fieldList.filter((e, i, self) => {
        return self.indexOf(e) === i
      })
      for (var j = 0; j < fieldList.length; j++) {
        // 过滤出匹配到的数据
        var arr = list.filter((e) => {
          return e[field] === fieldList[j]
        })
        att.push({
          wharfNo: arr[0][field],
          children: arr
        })
      }
      return att
    },
    listSortHarborName (obj1, obj2) {
      var val1 = obj1.harborName
      var val2 = obj2.harborName
      if (val1 < val2) {
        return -1
      } else if (val1 > val2) {
        return 1
      } else {
        return 0
      }
    },
    listSortberthNo (obj1, obj2) {
      var val1 = obj1.berthNo
      var val2 = obj2.berthNo
      if (val1 < val2) {
        return -1
      } else if (val1 > val2) {
        return 1
      } else {
        return 0
      }
    }
  }
}
</script>
