<template>
  <div>
    <PageHeader headertitle="历史计划查询">
      <v-layout row wrap>
          <v-toolbar-items>
            <v-divider
              class="mx-2"
              inset
              vertical
            ></v-divider>
          </v-toolbar-items>
          <v-flex md2>
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
          </v-flex>
          <v-flex md2 class="ml-3">
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
            <!-- <v-select
              :items="timespan"
              item-text="value"
              item-value="id"
              placeholder="时段"
              hint="时段"
              persistent-hint
              append-icon="map"
              v-model="timespan1"
            ></v-select> -->
          </v-flex>
          <v-flex md2 class="ml-3">
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
          </v-flex>
          <v-flex md2 class="ml-3">
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
            <!-- <v-select
              :items="timespan"
              item-text="value"
              item-value="id"
              placeholder="时段"
              hint="时段"
              persistent-hint
              append-icon="map"
              v-model="timespan2"
            ></v-select> -->
          </v-flex>
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
    </PageHeader>
    <PageHeader>
      <v-layout row wrap>
        <div style="width: 160px">
        </div>
        <v-toolbar-items>
          <v-divider
            class="mx-2"
            inset
            vertical
          ></v-divider>
        </v-toolbar-items>
        <v-flex md3>
          <v-combobox
            :items="harborList"
            v-model="harbortype"
            :allow-overflow="allowoverflow"
            hint="港池"
            multiple
            clearable
            persistent-hint
          >
            <template v-slot:selection="{ item, index }">
              <v-chip small v-if="index === 0">
                <span>{{ item }}</span>
              </v-chip>
              <v-chip small v-if="index === 1">
                <span>{{ item }}</span>
              </v-chip>
              <span
                v-if="index === 2"
                class="grey--text caption"
              >(+{{ harbortype.length - 2 }})</span>
            </template>
          </v-combobox>
        </v-flex>
        <v-flex md3 class="ml-2">
          <v-combobox
            :items="typeList"
            v-model="goodstype"
            :allow-overflow="allowoverflow"
            hint="货物种类"
            multiple
            clearable
            persistent-hint
          >
            <template v-slot:selection="{ item, index }">
              <v-chip small v-if="index === 0">
                <span>{{ item }}</span>
              </v-chip>
              <v-chip small v-if="index === 1">
                <span>{{ item }}</span>
              </v-chip>
              <v-chip small v-if="index === 2">
                <span>{{ item }}</span>
              </v-chip>
              <span
                v-if="index === 3"
                class="grey--text caption"
              >(+{{ goodstype.length - 3 }})</span>
            </template>
          </v-combobox>
        </v-flex>
        <v-flex md3 class="ml-2">
          <v-combobox
            :items="planActionList"
            item-text="text"
            item-value="value"
            :allow-overflow="allowoverflow"
            v-model="planAction"
            clearable
            multiple
            hint="计划动作"
            persistent-hint
          >
            <template v-slot:selection="{ item, index }">
              <v-chip small v-if="index === 0">
                <span>{{ item.text }}</span>
              </v-chip>
              <v-chip small v-if="index === 1">
                <span>{{ item.text }}</span>
              </v-chip>
              <span
                v-if="index === 2"
                class="grey--text caption"
              >(+{{ planAction.length - 2 }})</span>
            </template>
          </v-combobox>
        </v-flex>
        <v-flex md1 class="ml-2">
          <v-select
            :items="attributeList"
            item-text="text"
            item-value="text"
            v-model="attribute"
            clearable
            hint="内/外贸"
            persistent-hint
          ></v-select>
        </v-flex>
      </v-layout>
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
        :height="setheight"
        show-overflow
        :sort-config="{multiple: true}"
        :loading="loading"
        show-footer
        :size="tableDense == true ? 'mini' : 'medium'"
        :data="desserts"
        :footer-method="footerMethod"
        :footer-cell-class-name="footerCellClassName"
      >
        <vxe-table-column type="seq" width="80"></vxe-table-column>
        <vxe-table-column
          field="ship.cnName"
          title="中文船名"
          sortable>
        </vxe-table-column>
        <vxe-table-column
          field="ship.name"
          title="英文船名"
          sortable>
        </vxe-table-column>
        <vxe-table-column
          field="ship.goodsType"
          title="货种"
          sortable>
        </vxe-table-column>
        <vxe-table-column
          field="plan.actionPlan"
          title="动作"
          sortable>
          <template #default="{ row }">
            {{row.plan.actionPlan | formatPlan}}
          </template>
        </vxe-table-column>
        <vxe-table-column
          field="shipLength"
          title="总长/船宽(米)"
          sortable>
          <template #default="{ row }">
            {{ row.ship.shipLength }}/{{ row.ship.shipWidth }}
          </template>
        </vxe-table-column>
        <vxe-table-column
          field="ship.loadWeight"
          title="载重吨"
          sortable>
        </vxe-table-column>
        <vxe-table-column
          field="ship.cargoWeight"
          title="载货量"
          sortable>
        </vxe-table-column>
        <vxe-table-column
          field="extended.shipAttributes"
          title="内/外贸"
          sortable>
          <template #default="{ row }">
            {{ row.extended.shipAttributes | tradeTypeFormat }}
          </template>
        </vxe-table-column>
        <vxe-table-column
          field="plan.berthingTime"
          title="日期"
          sortable>
          <template #default="{ row }">
            {{ row.plan.berthingTime | MDDFormat }}
          </template>
        </vxe-table-column>
        <vxe-table-column
          field="harbor"
          title="港池">
          <template #default="{ row }">
            {{ row.plan.berthNo }}{{ row.plan.harbor }}
          </template>
        </vxe-table-column>
      </vxe-table>
      <!-- <v-data-table
        :headers="headers"
        :items="desserts"
        class="elevation-1"
        hide-default-footer
        disable-pagination
        multi-sort
        sort-by="plan.berthingTime"
        fixed-header
        :height="setheight"
        :search="search"
        :loading="loading"
        :dense="tableDense"
      >
        <template v-slot:item.shipLength="{ item }">
          {{ item.ship.shipLength }}/{{ item.ship.shipWidth }}
        </template>
        <template v-slot:item.plan.actionPlan="{ item }">
          {{item.plan.actionPlan | formatPlan}}
        </template>
        <template v-slot:item.extended.shipAttributes="{ item }">
          {{ item.extended.shipAttributes }}
        </template>
        <template v-slot:item.plan.berthingTime="{ item }">
          {{ item.plan.berthingTime | MDDFormat }}
        </template>
        <template v-slot:item.harbor="{ item }">
          {{ item.plan.berthNo }}{{ item.plan.harbor }}
        </template>
        <template v-slot:no-results>
          <v-alert :value="true" color="error" icon="warning">
            没有找到 "{{ search }}"  相关数据
          </v-alert>
        </template>
        <template v-slot:no-data>
          <span>当前时段没有数据</span>
        </template>
      </v-data-table> -->
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
export default {
  components: {
    PageHeader
  },
  data () {
    return {
      client: new psc.BerthingPlanClient('', this.$axios),
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
      // 暂时去除排序功能，影响导出表格时表头文字显示
        // { text: '序号', sortable: false, value: 'index' },
        { text: '中文船名', sortable: true, value: 'ship.cnName' },
        { text: '英文船名', sortable: true, value: 'ship.name' },
        // { text: '靠离泊位', sortable: true, value: 'plan.berthNo' },
        { text: '货种', sortable: true, value: 'ship.goodsType' },
        { text: '动作', sortable: true, value: 'plan.actionPlan' },
        { text: '总长/船宽(米)', sortable: false, value: 'shipLength' },
        { text: '载重吨', sortable: true, value: 'ship.loadWeight' },
        { text: '载货量', sortable: true, value: 'ship.cargoWeight' },
        { text: '内/外贸', sortable: true, value: 'extended.shipAttributes', align: 'center' },
        // { text: '日期', sortable: true, value: 'plan.berthingTime' },
        { text: '日期', sortable: true, value: 'plan.berthingTime' },
        { text: '港池', sortable: true, value: 'harbor', align: 'center' }
      ],
      setheight: window.innerHeight - 152 - 64,
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
      harborList: [
        '开敞',
        '第一港池',
        '第二港池',
        '第三港池'
      ],
      attributeList: [
        { value: '内', text: '内' },
        { value: '外', text: '外' }
      ],
      attribute: '',
      showmore: false
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
      that.setheight = window.innerHeight - 152 - 64
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
    goodstype (val) {
      this.datafilter(val, this.planAction)
    },
    planAction (val) {
      this.datafilter(this.goodstype, val)
    },
    attribute (val) {
      this.datafilter(this.goodstype, this.planAction)
    },
    harbortype () {
      this.datafilter(this.goodstype, this.planAction)
    },
    showAll (val) {
      console.log(val)
    }
  },
  created () {
    this.planActionList = [
      { value: 'Berthing', text: '靠泊' },
      { value: 'Unberthing', text: '离泊' },
      { value: 'ShiftBerthing', text: '移泊靠' },
      { value: 'ShiftUnberthing', text: '移泊离' },
      { value: 'InBerthing', text: '正在离泊' },
      { value: 'InUnBerthing', text: '正在离泊' }
    ]
    this.gettimespans()
    this.getwharf()
    this.getdata()
  },
  methods: {
    gettimespans: async function () {
      this.periodclient.getTimeSpans().then(res => {
        this.timespan = res
      })
    },
    MDDFormat2: function (value) {
      if (!value) return ''
      if (!dayjs(value).isValid()) return value
      return dayjs(value).format('M.DD')
    },
    // 获取码头列表
    getwharf: async function () {
      let { data } = await codes.GetOrgans()
      this.orgItems = this.orgItems.concat(data)
    },
    getdata: async function () {
      this.loading = true
      let orgName = ''
      this.typeList = []
      if (this.orgId === '全部') orgName = ''
      else { orgName = this.orgId }
      const date1 = dayjs(this.date1 + ' ' + this.time1).format('YYYY-MM-DD HH:mm')
      const date2 = dayjs(this.date2 + ' ' + this.time2).format('YYYY-MM-DD HH:mm')
      this.client.getByDateRange(date1, date2, orgName, 'Pass', false)
        .then(res => {
          if (res.length <= 0) {
            this.desserts = []
            return
          }
          const l = res.sort(function (a, b) {
            return dayjs(b.plan.berthingTime).isBefore(a.plan.berthingTime) ? -1 : 1
          })
          for (let i = 0; i < l.length; i++) {
            const harbor = l[i].plan.harbor
            if ((harbor).indexOf('一') > -1) {
              l[i].harbor = '1' + harbor
            } else if ((harbor).indexOf('二') > -1) {
              l[i].harbor = '2' + harbor
            } else if ((harbor).indexOf('三') > -1) {
              l[i].harbor = '3' + harbor
            } else {
              l[i].harbor = '0' + harbor
            }
          }
          let l2 = l.sort(this.listSortaHarbor)
          this.dessertsBak = [...l2]
          // let tabledata = res
          // this.desserts = tabledata.map((item, index) => ({
          //   ...item, index: index + 1
          // }))
          this.datafilter(this.goodstype, this.planAction)
          let list = []
          for (let i = 0; i < res.length; i++) {
            const element = res[i]
            list.push(element.ship.goodsType)
          }
          let x = new Set(list)
          this.typeList = [...x]
        })
        .finally(() => {
          this.loading = false
        })
    },
    listSortaHarbor (obj1, obj2) {
      var val1 = obj1.harbor
      var val2 = obj2.harbor
      if (val1 < val2) {
        return -1
      } else if (val1 > val2) {
        return 1
      } else {
        return 0
      }
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
            case 'ship.cargoWeight':
              sumCell = XEUtils.sum(data, column.property)
              break
          }
          sums.push(sumCell)
        }
      })
      // 返回一个二维数组的表尾合计
      return [ sums ]
    },
    // 货种 动作 内外贸过滤数据
    datafilter (goods, plan) {
      if (goods === undefined) goods = []
      if (plan === undefined) plan = []
      let t = this.attribute
      if (t === undefined || t === null) t = ''
      let list = this.dessertsBak

      let harbors = this.harbortype
      if (harbors.length > 0) {
        let list0 = []
        for (let index = 0; index < harbors.length; index++) {
          const element = harbors[index]
          const a = list.filter(data => data.plan.harbor === element)
          list0 = list0.concat(a)
        }
        list = list0
      }
      if (goods.length > 0) {
        let list2 = []
        for (let index = 0; index < goods.length; index++) {
          const element = goods[index]
          const a = list.filter(data => data.ship.goodsType === element)
          list2 = list2.concat(a)
        }
        list = list2
      }
      if (plan.length > 0) {
        let list3 = []
        for (let index = 0; index < plan.length; index++) {
          const element = plan[index]
          const a = list.filter(data => data.plan.actionPlan === element.value)
          list3 = list3.concat(a)
        }
        list = list3
      }
      // if (plan !== '') {
      //   list = list.filter(data => data.plan.actionPlan === plan)
      // }
      if (t !== '') {
        list = list.filter(data => data.extended.shipAttributes.indexOf(t) > -1)
      }
      this.desserts = list
    },
    // 导出表格
    exportfile () {
      let orgName = this.orgId
      let tableName = `${this.date1}至${this.date2}${orgName}计划数据`
      let l = []
      // 重新整理结构
      for (let i = 0; i < this.desserts.length; i++) {
        const element = this.desserts[i]
        let child = {}
        child.cnName = element.ship.cnName
        child.name = element.ship.name
        child.goodsType = element.ship.goodsType
        child.actionPlan = actionPlanFormat(element.plan.actionPlan)
        child.shipLength = element.ship.shipLength + '/' + element.ship.shipWidth
        child.loadWeight = element.ship.loadWeight
        child.cargoWeight = element.ship.cargoWeight
        child.shipAttributes = element.extended.shipAttributes
        child.berthingTime = this.MDDFormat2(element.plan.berthingTime)
        child.berthNo = element.plan.berthNo + element.plan.harbor
        l.push(child)
      }
      // excel标题
      var ws = XLSX.utils.json_to_sheet([
        {
          cnName: '中文船名',
          name: '英文船名',
          goodsType: '货种',
          actionPlan: '动作',
          shipLength: '总长/船宽(米)',
          loadWeight: '载重吨',
          cargoWeight: '载货量',
          shipAttributes: '内/外贸',
          berthingTime: '日期',
          berthNo: '港池'
        }
      ], { skipHeader: true })
      XLSX.utils.sheet_add_json(ws, l, { skipHeader: true, origin: -1 })

      const wb = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb, ws, orgName)
      XLSX.writeFile(wb, `${tableName}.xlsx`)

      // 根据table生成excel
      // let table = document.getElementsByTagName('table')[0]
      // // 排序图标影响表格的导出 克隆一份table 去除图标的影响
      // var colneTable = table.cloneNode(true)
      // // 排序的上下箭头
      // let ilist = colneTable.getElementsByTagName('i')
      // for (let i = 0; i < ilist.length; i++) {
      //   const element = ilist[i]
      //   element.innerText = ''
      // }
      // // 多个排序的123 顺序号
      // let slist = colneTable.getElementsByClassName('v-data-table-header__sort-badge')
      // for (let i = 0; i < slist.length; i++) {
      //   const element = slist[i]
      //   element.innerText = ''
      // }
      // // raw= true
      // let ws = XLSX.utils.table_to_sheet(colneTable, { raw: true })
      // const wb = XLSX.utils.book_new()
      // XLSX.utils.book_append_sheet(wb, ws, orgName)
      // XLSX.writeFile(wb, `${tableName}.xlsx`)
    }
  }
}
</script>
