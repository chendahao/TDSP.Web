<template>
  <div>
    <PageHeader headertitle="码头吞吐量统计">
      <v-spacer></v-spacer>
    </PageHeader>
    <v-container fluid>
      <v-toolbar class="elevation-0">
        <v-layout row wrap>
          <v-flex md1>
            <v-select
              v-model="type"
              :items="dropdownBtn"
              hint="按时段选择"
              persistent-hint
            ></v-select>
          </v-flex>
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
                  placeholder="开始时间"
                  hint="开始时间"
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
              v-model="menu2"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="date2"
                  placeholder="截止时间"
                  hint="截止时间"
                  persistent-hint
                  append-icon="dvr"
                  readonly
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="date2" @input="menu2 = false" locale="zh-cn" :dayFormat="dayformat"></v-date-picker>
            </v-menu>
          </v-flex>
          <v-flex md3 class="ml-3">
            <v-select
              :items="orgItems"
              item-text="text"
              item-value="text"
              v-model="orgId"
              hint="机构"
              persistent-hint
            ></v-select>
          </v-flex>
        </v-layout>
        <v-spacer></v-spacer>
        <v-btn class="ma-2" @click="search"><v-icon>refresh</v-icon>刷新</v-btn>
        <v-btn class="ma-2" color="primary" @click="exportfile">
          <v-icon>cloud_download</v-icon>导出
        </v-btn>
      </v-toolbar>
      <v-row align="center" justify="center" style="margin-top:10px">
        <v-col md="7" sm="12">
          <v-card>
            <v-card-title primary-title>
              吞吐量统计
              <v-divider
                class="mx-4"
                vertical
              ></v-divider>
              <div v-if="total > 0" class="toolbar-subtitle">
                总计：{{ total }} （万吨）
              </div>
            </v-card-title>
            <v-divider></v-divider>
            <div style="height: 753px;width:100%" ref="chartcontainer">
              <div id="chartdata" style="width:100%;height:753px"></div>
            </div>
          </v-card>
        </v-col>
        <v-col md="5" sm="12">
          <v-card>
            <v-card-title primary-title>
              类型统计
            </v-card-title>
            <v-divider></v-divider>
            <div style="height: 322px;width: 100%;">
                <div id="piechartdata" style="width:100%;height:322px"></div>
              </div>
            <v-simple-table fixed-header height="432px">
              <template v-slot:default>
                <thead>
                  <tr>
                    <th style="width:31%;font-weight:600;text-align: center;">名称</th>
                    <th style="width:33%;font-weight:600;text-align: center;">吞吐量(万吨)</th>
                    <th style="width:36%;font-weight:600;text-align: center;">数量</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in type_list" :key="index">
                    <td style="width:33%;text-align: center;">{{item.name}}</td>
                    <td style="width:34%;text-align: center;" :title="item.value">{{item.value | fixval}}</td>
                    <td style="width:33%;text-align: center;">{{item.count}}</td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import * as echarts from 'echarts/echarts.simple'
import { pscApi as psc } from '@/api/plan'
import dayjs from 'dayjs'
import PageHeader from '@/components/PageHeader'
import codes from '@/api/navenv/CodesApi'
import { listSort, sum } from '@/plugins/tool'
import XLSX from 'xlsx'
var chart = ''
var piechart = ''
var chartrsz
export default {
  components: {
    PageHeader
  },
  data () {
    return {
      client: new psc.ThroughPutClient('', this.$axios),
      periodclient: new psc.PlanPeriodClient('', this.$axios),
      // 柱状图用数据
      xval: [],
      yval: [],
      dropdownBtn: ['近十日', '近一月', '近一年'],
      type: '近十日',
      menu1: false,
      menu2: false,
      date1: dayjs().subtract(10, 'days').format('YYYY-MM-DD'),
      date2: dayjs().format('YYYY-MM-DD'),
      // 码头数据
      orgItems: [{ text: '全部', value: '' }],
      orgId: '全部',
      // 饼图数据
      pieval: [],
      type_list: [],
      total: 0,
      timespan: [],
      timespan1: 1,
      timespan2: 4
    }
  },
  filters: {
    fixval: function (val) {
      if (val >= 0.01 && val <= 0.1) return val
      if (val < 0.01) return '<0.01'
      return val.toFixed(2)
    }
  },
  mounted: function () {
    this.getwharf()
    this.$nextTick(function () {
      chart = echarts.init(document.getElementById('chartdata'), 'light')
      chart.showLoading({
        text: '正在加载数据'
      })
      piechart = echarts.init(document.getElementById('piechartdata'), 'light')
      piechart.showLoading({
        text: '正在加载数据'
      })
      this.gettimespans()
      this.getChartData()
      this.getPieChartData()
    })
    chartrsz = function () {
      chart.resize()
      piechart.resize()
    }
    window.addEventListener('resize', chartrsz)
  },
  destroyed () {
    window.removeEventListener('resize', chartrsz)
    chart = ''
    piechart = ''
  },
  watch: {
    type (val) {
      if (val === '近一年') {
        this.date1 = dayjs().subtract(1, 'years').format('YYYY-MM-DD')
        this.date2 = dayjs().format('YYYY-MM-DD')
      } else if (val === '近十日') {
        this.date1 = dayjs().subtract(10, 'days').format('YYYY-MM-DD')
        this.date2 = dayjs().format('YYYY-MM-DD')
      } else if (val === '近一月') {
        this.date1 = dayjs().subtract(1, 'months').format('YYYY-MM-DD')
        this.date2 = dayjs().format('YYYY-MM-DD')
      }
    },
    date1 () {
      this.getChartData()
      this.getPieChartData()
    },
    date2 () {
      this.getChartData()
      this.getPieChartData()
    },
    orgId (val, oldVal) {
      this.getChartData()
      this.getPieChartData()
    }
  },
  methods: {
    gettimespans: async function () {
      this.periodclient.getTimeSpans().then(res => {
        this.timespan = res
      })
    },
    search () {
      this.chart()
      this.pieChart()
    },
    // 获取码头列表
    getwharf: async function () {
      let { data } = await codes.GetOrgans()
      this.orgItems = this.orgItems.concat(data)
    },
    getChartData: async function () {
      let m = this.month
      if (m === '') {
        m = 0
      }
      let orgName = ''
      if (this.orgId === '全部') orgName = ''
      else { orgName = this.orgId }
      this.client.getThroughPutByRange(this.date1, this.date2, orgName)
        .then(res => {
          this.xval = res.map(m => {
            return m.name
          })
          this.yval = res.map(m => {
            return (m.value).toFixed(1)
          })
          this.total = (sum(this.yval)).toFixed(1)
          this.chart()
        })
    },
    getPieChartData: async function () {
      let m = this.month
      if (m === '') {
        m = 0
      }
      let orgName = ''
      if (this.orgId === '全部') orgName = ''
      else { orgName = this.orgId }
      this.client.getGoodsByRange(this.date1, this.date2, orgName)
        .then(res => {
          let filtersRes = res.filter(item => item.value > 0)
          this.pieval = filtersRes
          let sortlist = filtersRes.sort(listSort)
          this.type_list = sortlist
          this.pieChart()
        })
    },
    chart: function () {
      var option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          }
        },
        grid: {
          left: '2%',
          right: '2%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            axisTick: {
              alignWithLabel: true
            },
            axisLine: {
              lineStyle: {
                color: '#5793f3'
              }
            },
            data: this.xval
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '货物吞吐量(万吨)',
            min: 0,
            axisLine: {
              lineStyle: {
                color: '#5793f3'
              }
            },
            axisLabel: {
              formatter: '{value}'
            }
          }
        ],
        series: [
          {
            name: '货物吞吐量',
            type: 'bar',
            color: '#5793f3',
            data: this.yval,
            label: {
              show: true,
              position: 'top',
              distance: 15,
              align: 'center',
              verticalAlign: 'middle',
              rotate: 0,
              fontSize: 16,
              rich: {
                name: {
                }
              }
            }
          }
        ]
      }
      chart.hideLoading()
      chart.clear()
      chart.setOption(option)
    },
    pieChart () {
      var option = {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        series: [
          {
            name: '名称',
            type: 'pie',
            radius: ['50%', '80%'],
            data: this.type_list,
            label: {
              normal: {
                show: false,
                position: 'center'
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '30',
                  fontWeight: 'bold'
                }
              }
            },
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
      piechart.hideLoading()
      piechart.clear()
      piechart.setOption(option)
      // 加载前先移除监听器 防止多个监听器同时存在
      piechart.off('mouseover')
      piechart.off('mouseout')
      let index = 0
      piechart.dispatchAction({ type: 'highlight', seriesIndex: 0, dataIndex: 0 })
      // 当鼠标移入时，如果不是第一项，则把当前项置为选中，如果是第一项，则设置第一项为当前项
      piechart.on('mouseover', function (e) {
        piechart.dispatchAction({ type: 'downplay', seriesIndex: 0, dataIndex: 0 })
        if (e.dataIndex !== index) {
          piechart.dispatchAction({ type: 'downplay', seriesIndex: 0, dataIndex: index })
        }
        if (e.dataIndex === 0) {
          piechart.dispatchAction({ type: 'highlight', seriesIndex: 0, dataIndex: e.dataIndex })
        }
      })

      // 当鼠标离开时，把当前项置为选中
      piechart.on('mouseout', function (e) {
        index = e.dataIndex
        piechart.dispatchAction({ type: 'highlight', seriesIndex: 0, dataIndex: 0 })
      })
    },
    exportfile () {
      let m = this.month
      let tableName = `吐量量统计表`
      var ws = XLSX.utils.json_to_sheet([{ name: '货物种类', value: '载货量（万吨）', count: '数量' }], { skipHeader: true })
      XLSX.utils.sheet_add_json(ws, this.pieval, { skipHeader: true, origin: -1 })

      const wb = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb, ws, '吞吐量统计表')
      /* generate file and send to client */
      XLSX.writeFile(wb, `${tableName}.xlsx`)
    }
  }
}
</script>
<style scoped>
/**港口吞吐量统计**/
::-webkit-scrollbar {
  width: 16px;
  background: none;
}
::-webkit-scrollbar-thumb {
  background: #dadce0;
  background-clip: padding-box;
  border: 4px solid transparent;
  border-radius: 8px;
  box-shadow: none;
  min-height: 50px;
}
.toolbar-subtitle {
  display: inline-block;
  font-size: small;
}
</style>
