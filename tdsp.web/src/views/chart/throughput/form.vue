<template>
  <div>
    <PageHeader headertitle="吞吐量统计表">
      <v-layout row wrap>
        <v-toolbar-items>
          <v-divider
            class="mx-2"
            inset
            vertical
          ></v-divider>
        </v-toolbar-items>
        <v-menu
          v-model="menu1"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              class="ml-1"
              style="max-width:120px"
              v-model="date1"
              placeholder="开始日期"
              hint="开始日期"
              persistent-hint
              append-icon="event"
              readonly
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker v-model="date1" @input="menu1 = false" locale="zh-cn" :dayFormat="dayformat"></v-date-picker>
        </v-menu>
        <v-menu
          ref="menutime1"
          v-model="menu2"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              class="ml-1"
              style="max-width:120px"
              v-model="time1"
              placeholder="开始时间"
              hint="开始时间"
              persistent-hint
              append-icon="event"
              readonly
              v-on="on"
            ></v-text-field>
          </template>
          <v-time-picker v-if="menu2" format="24hr" v-model="time1" @click:minute="$refs.menutime1.save(time1)"></v-time-picker>
        </v-menu>
        <v-menu
          v-model="menu3"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              class="ml-1"
              style="max-width:120px"
              v-model="date2"
              placeholder="截止日期"
              hint="截止日期"
              persistent-hint
              append-icon="dvr"
              readonly
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker v-model="date2" @input="menu3 = false" locale="zh-cn" :dayFormat="dayformat"></v-date-picker>
        </v-menu>
        <v-menu
          ref="menutime2"
          v-model="menu4"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              class="ml-1"
              style="max-width:120px"
              v-model="time2"
              placeholder="截止时间"
              hint="截止时间"
              persistent-hint
              append-icon="dvr"
              readonly
              v-on="on"
            ></v-text-field>
          </template>
          <v-time-picker v-if="menu4" format="24hr" v-model="time2" @click:minute="$refs.menutime2.save(time2)"></v-time-picker>
        </v-menu>
        <v-flex md3 class="ml-2">
          <v-select
            :items="orgItems"
            item-text="text"
            item-value="text"
            v-model="orgId"
            hint="机构名称"
            persistent-hint
          ></v-select>
        </v-flex>
        <!-- <v-flex md2 class="ml-2">
          <v-radio-group v-model="showAll" row>
            <v-radio label="全部" value='true' style="margin-top:10px"></v-radio>
            <v-radio label="过滤" value='false' style="margin-top:10px"></v-radio>
          </v-radio-group>
        </v-flex> -->
      </v-layout>
      <v-spacer></v-spacer>
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn
            class="ma-2"
            v-on="on"
            @click="getdata"
          >
            查询
          </v-btn>
        </template>
        <span>查询</span>
      </v-tooltip>
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn class="ma-2" color="primary" v-on="on" @click="exportfile">
            <v-icon>cloud_download</v-icon>导出
          </v-btn>
        </template>
        <span>导出</span>
      </v-tooltip>
    </PageHeader>
    <v-container fluid>
      <vxe-table
        border
        highlight-hover-row
        ref="xTable"
        id="table"
        :height="setheight"
        show-overflow
        :sort-config="{multiple: true, defaultSort: {field: 'total', order: 'desc'}}"
        :loading="loading"
        show-footer
        :size="tableDense == true ? 'mini' : 'medium'"
        :data="desserts"
        :footer-method="footerMethod"
        :footer-cell-class-name="footerCellClassName"
      >
        <vxe-table-column type="seq" width="80"></vxe-table-column>
        <vxe-table-column
          field="goodsType"
          title="货物重类"
          sortable>
        </vxe-table-column>
        <vxe-table-column
          field="tradeType1"
          title="内贸"
          sortable>
        </vxe-table-column>
        <vxe-table-column
          field="weight1"
          :formatter="weightFormat1"
          title="载货量"
          sortable>
        </vxe-table-column>
        <vxe-table-column
          field="count1"
          title="船舶数量"
          :formatter="count1Format"
          sortable>
        </vxe-table-column>
        <vxe-table-column
          field="tradeType2"
          title="外贸"
          sortable>
        </vxe-table-column>
        <vxe-table-column
          field="weight2"
          :formatter="weightFormat2"
          title="载货量"
          sortable>
        </vxe-table-column>
        <vxe-table-column
          field="count2"
          title="船舶数量"
          :formatter="count2Format"
          sortable>
        </vxe-table-column>
        <vxe-table-column
          field="total"
          :formatter="totalFormat"
          title="合计"
          sortable>
        </vxe-table-column>
      </vxe-table>
    </v-container>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { pscApi as psc } from '@/api/plan'
import dayjs from 'dayjs'
import PageHeader from '@/components/PageHeader'
import codes from '@/api/navenv/CodesApi'
import XLSX from 'xlsx'
import XEUtils from 'xe-utils'
import { actionPlanFormat, tradeTypeFormat } from '@/plugins/format'
import { dataGroupingToArray } from '@/plugins/tool'
import Vue from 'vue'
import VXETable from 'vxe-table'
import 'vxe-table/lib/style.css'
Vue.use(VXETable)
export default {
  components: {
    PageHeader
  },
  data () {
    return {
      client: new psc.ThroughPutDataClient('', this.$axios),
      periodclient: new psc.PlanPeriodClient('', this.$axios),
      search: '',
      menu1: false,
      menu2: false,
      menu3: false,
      menu4: false,
      date1: dayjs().subtract(2, 'days').format('YYYY-MM-DD'),
      date2: dayjs().format('YYYY-MM-DD'),
      time1: '00:00',
      time2: '00:00',
      // 机构数据
      orgItems: [{ text: '全部', value: '' }],
      orgId: '全部',
      showAll: 'false',
      headers: [
        { text: '货种', sortable: true, value: 'goodsType' },
        { text: '内贸', sortable: true, value: 'tradeType1' },
        { text: '载货量', sortable: true, value: 'weight1' },
        { text: '数量', sortable: true, value: 'count1' },
        { text: '外面', sortable: true, value: 'tradeType2' },
        { text: '载货量', sortable: true, value: 'weight2' },
        { text: '数量', sortable: true, value: 'count2' }
      ],
      setheight: window.innerHeight - 152,
      desserts: [],
      dessertsBak: [],
      loading: false,
      menu: false,
      typeList: [],
      goodstype: [],
      allowoverflow: false,
      planActionList: [],
      planAction: [],
      timespan: [],
      timespan1: 1,
      timespan2: 4,
      harbortype: [],
      attribute: ''
    }
  },
  filters: {
    formatPlan: function (val) {
      return actionPlanFormat(val)
    },
    tradeTypeFormat: function (val) {
      return tradeTypeFormat(val)
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
      that.setheight = window.innerHeight - 152
    }
  },
  destroyed () {
    window.onresize = ''
  },
  watch: {
    // date1: function (newVal, oldVal) {
    //   if (oldVal !== '') {
    //     this.getdata()
    //   }
    // },
    // date2: function (newVal, oldVal) {
    //   if (oldVal !== 0) {
    //     this.getdata()
    //   }
    // },
    // timespan1: function (newVal, oldVal) {
    //   if (oldVal !== '') {
    //     this.getdata()
    //   }
    // },
    // timespan2: function (newVal, oldVal) {
    //   if (oldVal !== '') {
    //     this.getdata()
    //   }
    // },
    orgId (val, oldVal) {
      // this.goodstype = ''
      // this.planAction = ''
      this.getdata()
    },
    showAll (val) {
      console.log(val)
    }
  },
  created () {
    this.getwharf()
    this.getdata()
  },
  methods: {
    MDDFormat2: function (value) {
      if (!value) return ''
      if (!dayjs(value).isValid()) return value
      return dayjs(value).format('M.DD')
    },
    weightFormat1 ({ row }) {
      if (row.weight1 === 0 && row.count1 > 0) return 0.01
      if (row.count1 === 0) return ''
      return row.weight1.toFixed(2).replace(/[.]?0+$/g, '') * 1.0
    },
    weightFormat2 ({ row }) {
      if (row.weight2 === 0 && row.count2 > 0) return 0.01
      if (row.count2 === 0) return ''
      return row.weight2.toFixed(2).replace(/[.]?0+$/g, '') * 1.0
    },
    count1Format ({ row }) {
      if (row.count1 > 0) return row.count1
    },
    count2Format ({ row }) {
      if (row.count2 > 0) return row.count2
    },
    totalFormat ({ row }) {
      const t = row.weight1 + row.weight2
      return t.toFixed(2).replace(/[.]?0+$/g, '') * 1.0
    },
    // 获取码头列表
    getwharf: async function () {
      let { data } = await codes.GetOrgans()
      this.orgItems = this.orgItems.concat(data)
    },
    getdata: async function () {
      this.loading = true
      let orgName = ''
      this.List = []
      let list = []
      if (this.orgId === '全部') orgName = ''
      else { orgName = this.orgId }
      const date1 = dayjs(this.date1 + ' ' + this.time1).format('YYYY-MM-DD HH:mm')
      const date2 = dayjs(this.date2 + ' ' + this.time2).format('YYYY-MM-DD HH:mm')
      this.client.getThroughPutByRange(date1, date2, orgName)
        .then(res => {
          for (let i = 0; i < res.length; i++) {
            let item = {}
            const element = res[i]
            element.tradeType = tradeTypeFormat(element.tradeType)
            if (element.tradeType === '内') {
              item.goodsType = element.goodsType
              item.tradeType1 = '内'
              item.weight1 = element.weight
              item.count1 = element.count
              item.tradeType2 = '外'
              item.weight2 = 0
              item.count2 = 0
            } else {
              item.goodsType = element.goodsType
              item.tradeType1 = '内'
              item.weight1 = 0
              item.count1 = 0
              item.tradeType2 = '外'
              item.weight2 = element.weight
              item.count2 = element.count
            }
            list.push(item)
          }
          let a = dataGroupingToArray(list, ['goodsType'])
          let b = this.groupCountToArray(a)
          this.desserts = b
        })
        .finally(() => {
          this.loading = false
        })
    },
    groupCountToArray (list) {
      let CountList = []
      for (let i = 0; i < list.length; i++) {
        const element = list[i].list
        let oneType = {
          goodsType: element.goodsType,
          tradeType1: '内',
          weight1: 0,
          count1: 0,
          tradeType2: '外',
          weight2: 0,
          count2: 0
        }
        for (let j = 0; j < element.length; j++) {
          const plan = element[j]
          oneType.tradeType1 = plan.tradeType1
          oneType.tradeType2 = plan.tradeType2
          oneType.goodsType = plan.goodsType
          oneType.weight1 += plan.weight1
          oneType.count1 += plan.count1
          oneType.weight2 += plan.weight2
          oneType.count2 += plan.count2
        }
        CountList.push(oneType)
      }
      return CountList
    },
    footerCellClassName ({ $rowIndex, column }) {
      if (column.type === 'seq') {
        if ($rowIndex === 0) {
          return 'col-blue'
        } else {
          return 'col-red'
        }
      } else if (column.property === 'ship.cargoWeight') {
        if ($rowIndex === 1) {
          return 'col-red'
        }
      }
    },
    footerMethod ({ columns, data }) {
      const sums = []
      columns.forEach((column, columnIndex) => {
        if (columnIndex === 0) {
          sums.push('总计' + data.length)
        } else {
          let sumCell = null
          switch (column.property) {
            case 'weight1':
              sumCell = XEUtils.sum(data, column.property).toFixed(2).replace(/[.]?0+$/g, '')
              break
            case 'weight2':
              sumCell = XEUtils.sum(data, column.property).toFixed(2).replace(/[.]?0+$/g, '')
              break
            case 'count1':
              sumCell = XEUtils.sum(data, column.property)
              break
            case 'count2':
              sumCell = XEUtils.sum(data, column.property)
              break
            case 'total':
              sumCell = (XEUtils.sum(data, 'weight1') + XEUtils.sum(data, 'weight2')).toFixed(2).replace(/[.]?0+$/g, '')
              break
          }
          sums.push(sumCell)
        }
      })
      // 返回一个二维数组的表尾合计
      return [ sums ]
    },
    exportEvent () {
      const toBuffer = (wbout) => {
        const buf = new ArrayBuffer(wbout.length)
        const view = new Uint8Array(buf)
        for (let index = 0; index !== wbout.length; ++index) view[index] = wbout.charCodeAt(index) & 0xFF
        return buf
      }
      // 转换数据
      const table = this.$refs.xTable.$el.querySelector('.body--wrapper>.vxe-table--body')
      const book = XLSX.utils.book_new()
      const sheet = XLSX.utils.table_to_sheet(table)
      XLSX.utils.book_append_sheet(book, sheet)
      const wbout = XLSX.write(book, { bookType: 'xlsx', bookSST: false, type: 'binary' })
      const blob = new Blob([toBuffer(wbout)], { type: 'application/octet-stream' })
      // 保存导出
      this.$XSaveFile({ filename: '数据导出', type: 'xlsx', content: blob })
    },
    // 导出表格
    exportfile () {
      let orgName = this.orgId
      let tableName = `${this.date1}至${this.date2}${orgName}吞吐量统计`

      const table = this.$refs.xTable.$el.querySelector('.body--wrapper>.vxe-table--body')
      const wb = XLSX.utils.book_new()
      const ws = XLSX.utils.table_to_sheet(table, { raw: true })

      XLSX.utils.book_append_sheet(wb, ws, orgName)
      XLSX.writeFile(wb, `${tableName}.xlsx`)
    }
  }
}
</script>
