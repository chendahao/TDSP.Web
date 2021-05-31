<template>
  <div>
    <PageHeader headertitle="港口吞吐量统计">
      <v-spacer></v-spacer>
    </PageHeader>
    <v-container fluid>
      <v-toolbar class="elevation-0">
        <v-subheader>按时间统计</v-subheader>
        <!-- <v-layout row wrap> -->
          <v-flex md1>
            <v-select v-model="type" :items="types"></v-select>
          </v-flex>
          <v-divider class="mx-2" inset vertical></v-divider>
          <v-flex md2>
            <v-combobox v-model="year" :items="years" placeholder="年" hint="年" persistent-hint append-icon="calendar_today"></v-combobox>
          </v-flex>
          <v-flex md2 class="ml-3">
            <v-select
              v-model="month"
              :items="months"
              placeholder="月"
              hint="月"
              persistent-hint
              append-icon="event_note"
              :disabled="monthtype_disable"
            ></v-select>
          </v-flex>
        <!-- </v-layout> -->
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
                    <th style="width:36%;font-weight:600;text-align: center;">占比</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in type_list" :key="index">
                    <td style="width:33%;text-align: center;">{{item.name}}</td>
                    <td style="width:34%;text-align: center;">{{item.value | fixval}}</td>
                    <td style="width:33%;text-align: center;">{{item.percent | fixval2}}%</td>
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
import XLSX from 'xlsx'
import { listSort, sum } from '@/plugins/tool'
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
      // 柱状图用数据
      xval: [],
      yval: [],
      types: ['年', '月'],
      years: [
        2015,
        2016,
        2017,
        2018,
        2019,
        2020,
        2021,
        2022,
        2023,
        2024,
        2025,
        2026,
        2027,
        2028,
        2029,
        2030
      ],
      months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      type: '年',
      year: dayjs().year(),
      month: '',
      // month:dayjs().format('MM'),
      monthtype_disable: true,
      // 饼图数据
      pieval: [],
      type_list: [],
      total: 0
    }
  },
  filters: {
    fixval: function (val) {
      if (val < 0.01) return '<0.01'
      if (val >= 0.01 && val < 0.1) {
        return val.toFixed(2)
      }
      return val.toFixed(1)
    },
    // 百分比
    fixval2: function (val) {
      if (val < 0.1) return '<0.1'
      return val.toFixed(2)
    }
  },
  mounted: function () {
    this.$nextTick(function () {
      chart = echarts.init(document.getElementById('chartdata'), 'light')
      chart.showLoading({
        text: '正在加载数据'
      })
      piechart = echarts.init(document.getElementById('piechartdata'), 'light')
      piechart.showLoading({
        text: '正在加载数据'
      })
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
      // 切换时段时重新查询数据
      if (val && val === '月') {
        this.month = dayjs().month() + 1
        this.monthtype_disable = false
      } else {
        this.month = ''
        this.monthtype_disable = true
      }
      this.getChartData()
      this.getPieChartData()
    },
    year () {
      this.getChartData()
      this.getPieChartData()
    },
    month () {
      this.getChartData()
      this.getPieChartData()
    },
    importtype () {
      this.getChartData()
      this.getPieChartData()
    }
  },
  methods: {
    // 导出文件
    exportfile () {
      let m = this.month
      let tableName = `${this.year}年${!m ? '' : (m + '月')}曹妃甸港吞吐量统计表`
      // let table = this.$refs.exporttable
      // const ws = XLSX.utils.table_to_sheet(table)
      var ws = XLSX.utils.json_to_sheet([{ name: '货物种类', value: '载货量（万吨）', percent: '占比' }], { skipHeader: true })
      XLSX.utils.sheet_add_json(ws, this.type_list, { skipHeader: true, origin: -1 })

      const wb = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb, ws, '曹妃甸港吞吐量统计表')
      /* generate file and send to client */
      XLSX.writeFile(wb, `${tableName}.xlsx`)
    },
    search () {
      this.chart()
      this.pieChart()
    },
    getChartData: async function () {
      let m = this.month
      if (m === '') {
        m = 0
      }
      this.client.getThroughPut(this.year, m)
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
      this.client.getGoods(this.year, m)
        .then(res => {
          this.pieval = res
          // 计算分类百分比
          let data = res
          let sum = 0
          data.forEach(function (item) {
            sum += item.value
          })
          let list = []
          for (let index = 0; index < data.length; index++) {
            const element = data[index]
            let item = {}
            item.name = element.name
            item.value = element.value
            // 过滤质量为0的数据
            // 0 显示为小于0.01
            item.percent = element.value / sum * 100
            list.push(item)
            // if (item.value !== 0) {
            // }
          }
          let sortlist = list.sort(listSort)
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
/* .v-toolbar__extension  {
    margin-bottom: 20px;
  }
   .container {
    padding: 0px;
  }
  .v-tabs__bar{
    margin: 20px 0;
  } */
</style>
