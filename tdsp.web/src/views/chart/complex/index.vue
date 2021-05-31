<template>
  <!-- 综合统计：自定义区域船舶统计 报告线水域统计 定线制统计 交通流统计 -->
  <div>
    <div>
      <PageHeader headertitle="流量综合统计">
        <v-spacer></v-spacer>
      </PageHeader>
      <v-container fluid>
        <v-toolbar  class="elevation-0" >
          <v-row  >
            <v-col md="2">
              <v-select v-model="type" :items="dropdownBtn" hint="按时段选择" persistent-hint></v-select>
            </v-col>
            <v-toolbar-items>
              <v-divider class="mx-2" inset vertical></v-divider>
            </v-toolbar-items>
            <v-col md="2">
              <v-menu
                v-model="menu1"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field v-model="date1" placeholder="开始时间" hint="开始时间" persistent-hint append-icon="event" readonly v-on="on"></v-text-field>
                </template>
                <v-date-picker
                  v-model="date1"
                  @input="menu1 = false"
                  locale="zh-cn"
                  :dayFormat="dayformat"
                ></v-date-picker>
              </v-menu>
            </v-col>
            <v-col md="2" class="ml-3">
              <v-menu
                v-model="menu2"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field v-model="date2" placeholder="截止时间" hint="截止时间" persistent-hint append-icon="dvr" readonly v-on="on"></v-text-field>
                </template>
                <v-date-picker
                  v-model="date2"
                  @input="menu2 = false"
                  locale="zh-cn"
                  :dayFormat="dayformat"
                ></v-date-picker>
              </v-menu>
            </v-col>
          </v-row>
        </v-toolbar>
        <v-row class="text-center flex"  >
          <v-col md="6" lg="6" sm="12" class="index_grid">
            <v-card>
              <v-toolbar class="elevation-0">
                <v-toolbar-title>
                  <img src="../../../assets/z-title1.png" />
                  自定义区域船舶
                  <div v-if="total1 > 0" class="toolbar-subtitle">
                    总计：{{ total1 }}（艘）
                  </div>
                </v-toolbar-title>
                <v-spacer></v-spacer>
                <v-select
                  :items="items1"
                  item-text="name"
                  item-value="customId"
                  v-model="item1"
                  hint="区域名称"
                  style="width:130px"
                  persistent-hint
                ></v-select>
              </v-toolbar>
              <v-divider></v-divider>
              <div id="chart1" style="width:100%;height:400px"></div>
            </v-card>
          </v-col>
          <v-col md="6" lg="6" class="index_grid">
            <v-card>
              <v-toolbar class="elevation-0">
                <v-toolbar-title>
                  <img src="../../../assets/z-title2.png" />
                  报告线水域统计分析
                  <div v-if="total2 > 0" class="toolbar-subtitle">
                    总计：{{ total2 }}（艘）
                  </div>
                </v-toolbar-title>
                <v-spacer></v-spacer>
                <v-select
                  :items="items1"
                  item-text="name"
                  item-value="customId"
                  v-model="item1"
                  hint="区域名称"
                  style="width:130px"
                  persistent-hint
                ></v-select>
              </v-toolbar>
              <v-divider></v-divider>
              <div id="chart2" style="width:100%;height:400px"></div>
            </v-card>
          </v-col>
          <v-col md="6" lg="6" class="index_grid">
            <v-card>
              <v-toolbar class="elevation-0">
                <v-toolbar-title>
                  <img src="../../../assets/z-title3.png" />
                  定线制水域
                  <div v-if="total3 > 0" class="toolbar-subtitle">
                    总计：{{ total3 }}（艘）
                  </div>
                </v-toolbar-title>
                <v-spacer></v-spacer>
                <v-select
                  :items="items3"
                  item-text="name"
                  item-value="customId"
                  v-model="item3"
                  hint="定线制名称"
                  style="width:130px"
                  persistent-hint
                ></v-select>
              </v-toolbar>
              <v-divider></v-divider>
              <div id="chart3" style="width:100%;height:400px"></div>
            </v-card>
          </v-col>
          <v-col md="6" lg="6" class="index_grid">
            <v-card>
              <v-toolbar class="elevation-0">
                <v-toolbar-title>
                  <img src="../../../assets/z-title4.png" />
                  交通流统计
                  <div v-if="total4 > 0" class="toolbar-subtitle">
                    总计：{{ total4 }}（艘）
                  </div>
                </v-toolbar-title>
                <v-spacer></v-spacer>
                <v-select
                  :items="items4"
                  item-text="name"
                  item-value="id"
                  v-model="item4"
                  hint="区域名称"
                  style="width:130px"
                  persistent-hint
                ></v-select>
              </v-toolbar>
              <v-divider></v-divider>
              <div id="chart4" style="width:100%;height:400px"></div>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>
<script>
import CustomAreaApi from '@/api/navenv/CustomAreaApi' // 自定义区域船舶统计
import TrafficFlowApi from '@/api/stat/TrafficFlowApi'
import lineapi from '@/api/navenv/CustomLineApi'
import TrafficLineApi from '@/api/stat/TrafficLineApi'
import dayjs from 'dayjs'
import * as echarts from 'echarts/echarts.simple'
import PageHeader from '@/components/PageHeader'
import { sum } from '@/plugins/tool'
var chart1
var chart2
var chart3
var chart4 = ''
var chartresize = ''
export default {
  components: {
    PageHeader
  },
  data () {
    return {
      containerwidth: 0,
      dropdownBtn: ['近一月', '近一年'],
      type: '近一月',
      menu1: false,
      menu2: false,
      date1: dayjs()
        .subtract(1, 'months')
        .format('YYYY-MM-DD'),
      date2: dayjs().format('YYYY-MM-DD'),
      // chart1
      items1: [],
      item1: '',
      xval1: [],
      yval1: [],
      // chart2
      xval2: [],
      yval2: [],
      // chart3
      items3: [],
      item3: '',
      xval3: [],
      yval3: [],
      // chart4
      items4: [],
      item4: '',
      xval4: [],
      yval4: [],
      total1: 0,
      total2: 0,
      total3: 0,
      total4: 0
    }
  },
  mounted: function () {
    this.$nextTick(function () {
      this.chart1init()
      this.chart2init()
      this.chart3init()
      this.chart4init()
    })
    chartresize = function () {
      chart1.resize()
      chart2.resize()
      chart3.resize()
      chart4.resize()
    }
    window.addEventListener('resize', chartresize)
  },
  destroyed () {
    window.removeEventListener('resize', chartresize)
    chartresize = ''
    chart1 = ''
    chart2 = ''
    chart3 = ''
    chart4 = ''
  },
  watch: {
    type (val) {
      // 切换时段时重新查询数据
      if (val && val === '近一月') {
        this.date1 = dayjs()
          .subtract(1, 'months')
          .format('YYYY-MM-DD')
        this.date2 = dayjs().format('YYYY-MM-DD')
      } else {
        this.date1 = dayjs()
          .subtract(1, 'years')
          .format('YYYY-MM-DD')
        this.date2 = dayjs().format('YYYY-MM-DD')
      }
      this.get1data()
      this.get2data()
      this.get3data()
      this.get4data()
    },
    item1 () {
      this.get1data()
    },
    item3 () {
      this.get3data()
    },
    item4 () {
      this.get4data()
    },
    date1 () {
      this.get1data()
      this.get2data()
      this.get3data()
      this.get4data()
    },
    date2 () {
      this.get1data()
      this.get2data()
      this.get3data()
      this.get4data()
    }
  },
  methods: {
    // chart1
    chart1init () {
      chart1 = echarts.init(document.getElementById('chart1'), 'light')
      chart1.showLoading({
        text: '正在加载数据'
      })
      this.get1items().then(res => {
        this.item1 = this.items1[0].customId
        this.get1data()
      })
    },
    get1items: async function () {
      let { data } = await CustomAreaApi.GetAll()
      this.items1 = data.values
      this.item1 = this.items1[0].customId
    },
    get1data: async function () {
      if (this.item1 === '') return
      let item = await TrafficFlowApi.GetCustomAreaFlowById(
        this.item1,
        this.date1,
        this.date2
      )
      let data = item.data
      this.xval1 = data.map(res => {
        return res.name
      })
      this.yval1 = data.map(res => {
        return res.value
      })
      this.total1 = sum(this.yval1)
      this.chart1()
    },
    chart1 () {
      var option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            snap: true,
            crossStyle: {
              color: '#999'
            }
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: this.xval1,
            axisPointer: {
              type: 'shadow'
            },
            axisLine: {
              lineStyle: {
                color: '#5793f3'
              }
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '艘',
            // interval: 50,
            minInterval: 1,
            axisLabel: {
              formatter: '{value}'
            },
            axisLine: {
              lineStyle: {
                color: '#5793f3'
              }
            }
          }
        ],
        series: [
          {
            name: '船舶数量',
            type: 'bar',
            data: this.yval1,
            label: {
              normal: {
                show: true,
                position: 'insideTop'
              }
            }
          }
        ]
      }
      chart1.hideLoading()
      chart1.clear()
      chart1.setOption(option)
    },
    // chart2
    chart2init () {
      chart2 = echarts.init(document.getElementById('chart2'), 'light')
      chart2.showLoading({
        text: '正在加载数据'
      })
      this.get2data()
    },
    get2data: async function () {
      let item = await TrafficFlowApi.GetReportLineFlow(
        '',
        this.date1,
        this.date2
      )
      let data = item.data
      this.xval2 = data.map(res => {
        return res.name
      })
      this.yval2 = data.map(res => {
        return res.value
      })
      this.total2 = sum(this.yval2)
      this.chart2()
    },
    chart2 () {
      var option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: this.xval2,
            axisLine: {
              lineStyle: {
                color: '#5793f3'
              }
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '艘',
            axisLabel: {
              formatter: '{value}'
            },
            axisLine: {
              lineStyle: {
                color: '#5793f3'
              }
            }
          }
        ],
        series: [
          {
            name: '进入报告线',
            type: 'bar',
            stack: '报告线船舶',
            data: this.yval2,
            label: {
              normal: {
                show: true,
                position: 'insideTop'
              }
            }
          }
        ]
      }
      chart2.hideLoading()
      chart2.clear()
      chart2.setOption(option)
    },
    // chart3
    chart3init () {
      chart3 = echarts.init(document.getElementById('chart3'), 'light')
      chart3.showLoading({
        text: '正在加载数据'
      })
      this.get3items().then(res => {
        this.get3data()
      })
    },
    get3items: async function () {
      let { data } = await lineapi.GetAll()
      this.items3 = data.values
      this.item3 = this.items3[0].customId
    },
    get3data: async function () {
      if (this.item3 === '') return
      let item = await TrafficFlowApi.GetCustomLineFlowById(
        this.item3,
        this.date1,
        this.date2
      )
      let data = item.data
      this.xval3 = data.map(res => {
        return res.name
      })
      this.yval3 = data.map(res => {
        return res.value
      })
      this.total3 = sum(this.yval3)
      this.chart3()
    },
    chart3 () {
      var option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            snap: true,
            crossStyle: {
              color: '#999'
            }
          }
        },
        color: ['#61a0a8'],
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            data: this.xval3,
            axisPointer: {
              type: 'shadow'
            },
            axisLine: {
              lineStyle: {
                color: '#61a0a8'
              }
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '艘',
            // interval: 50,
            minInterval: 1,
            axisLabel: {
              formatter: '{value}'
            },
            axisLine: {
              lineStyle: {
                color: '#61a0a8'
              }
            }
          }
        ],
        series: [
          {
            name: '船舶数量',
            type: 'line',
            data: this.yval3,
            label: {
              normal: {
                show: true,
                position: [10, -20]
              }
            },
            areaStyle: { normal: {} }
          }
        ]
      }
      chart3.hideLoading()
      chart3.clear()
      chart3.setOption(option)
    },
    // chart4
    chart4init () {
      chart4 = echarts.init(document.getElementById('chart4'), 'light')
      chart4.showLoading({
        text: '正在加载数据'
      })
      this.get4items().then(res => {
        this.get4data()
      })
    },
    get4items: async function () {
      let { data } = await TrafficLineApi.GetAll()
      this.items4 = data
      if (this.items4.length > 0) {
        this.item4 = this.items4[0].id
      } else {
        chart4.hideLoading()
      }
    },
    get4data: async function () {
      if (this.item4 === '') return
      let item = await TrafficFlowApi.GetTrafficFlowById(
        this.item4,
        this.date1,
        this.date2
      )
      let data = item.data
      this.xval4 = data.map(res => {
        return res.name
      })
      this.yval4 = data.map(res => {
        return res.value
      })
      this.total4 = sum(this.yval4)
      this.chart4()
    },
    chart4 () {
      var option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            snap: true,
            crossStyle: {
              color: '#999'
            }
          }
        },
        color: ['#61a0a8'],
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            data: this.xval4,
            axisPointer: {
              type: 'shadow'
            },
            axisLine: {
              lineStyle: {
                color: '#61a0a8'
              }
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '艘',
            // interval: 50,
            minInterval: 1,
            axisLabel: {
              formatter: '{value}'
            },
            axisLine: {
              lineStyle: {
                color: '#61a0a8'
              }
            }
          }
        ],
        series: [
          {
            name: '船舶数量',
            type: 'line',
            data: this.yval4,
            label: {
              normal: {
                show: true,
                position: [10, -20]
              }
            },
            areaStyle: { normal: {} }
          }
        ]
      }
      chart4.hideLoading()
      chart4.clear()
      chart4.setOption(option)
    }
  }
}
</script>
<style lang="scss" scoped>
/****页面内容****/

body {
  background: #f2f5f8;
}

.personal-card {
  /*margin-bottom: 15px;*/
  border-radius: 2px;
  background-color: #fff;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}

.personal-card-header {
  height: 58px;
  line-height: 58px;
  margin: 0px 32px;
  border-bottom: 1px solid #d7dde3;
  color: #333;
  border-radius: 2px 2px 0 0;
  font-size: 16px;
}

.personal-card-header > img {
  float: left;
  margin-top: 20px;
}

.personal-card-header h3 {
  float: left;
  font-size: 16px;
  color: #333333;
  margin-left: 8px;
  font-weight: 500;
}

.personal-card-body {
  position: relative;
  padding: 10px 32px;
  line-height: 24px;
  display: -webkit-flex;
  display: flex;
  max-width: 850px;
}

.fluid-title {
  width: 100%;
  height: 80px;
  background-color: #ffffff;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.08);
}

.fluid-title .header-left {
  float: right;
  margin-right: 50px;
}

.fluid-title .input-search {
  position: relative;
}

.fluid-title .header-left .input-search a {
  position: absolute;
  right: 0px;
  top: -5px;
  line-height: initial;
}

.fluid-title .header-left input {
  border-bottom: 1px solid #999999;
  padding-right: 30px;
}

.fluid-title-text {
  font-size: 24px;
  font-weight: 600;
  font-stretch: normal;
  line-height: 80px;
  letter-spacing: 1px;
  color: #333333;
  padding-left: 49px;
}

.inquiry {
  width: 100%;
  min-height: 64px;
  background-color: #ffffff;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.08);
  margin-top: 15px;
  line-height: 64px;
}

.data-span span {
  line-height: 32px;
  height: 32px;
  display: block;
  width: 72px;
  text-align: center;
  border: 1px solid #d9d9d9;
  float: left;
  margin-left: 10px;
  border-radius: 2px;
}

.inquiry .layui-form-item {
  float: left;
}

.personal-card-header ul {
  float: right;
}

.personal-card-header ul li {
  float: left;
  padding: 0px 10px;
}

.personal-card-header button {
  float: right;
  width: 72px;
  height: 28px;
  background-color: #ffffff;
  border-radius: 4px;
  border: solid 1px #d9d9d9;
  margin-top: 13px;
  margin-left: 10px;
  font-size: 14px;
}

/* // .index_grid{
//   background-color: #f1f5f8;
// } */
.inner_grid_1{
  padding-top: 24px;
  padding-right: 12px;
}

.inner_grid_2{
  padding-top: 24px;
  padding-left: 12px;
}

/**港口吞吐量统计**/

.echarts-table table {
  width: 100%;
  padding: 0;
  margin: 15px 0px 32px 0px;
}

.echarts-table td {
  border: none;
  font-size: 16px;
  padding: 6px 6px 6px 12px;
  color: #333;
  text-align: center;
}

.echarts-table th {
  font: 16px "Trebuchet MS", Verdana, Arial, Helvetica, sans-serif;
  color: #333;
  border: none;
  letter-spacing: 2px;
  text-transform: uppercase;
  text-align: center;
  padding: 6px 6px 6px 12px;
}

.echarts-table table tr:nth-child(odd) {
  background: #f2f8ff;
  height: 40px;
}

.echarts-table table tr:nth-child(even) {
  height: 46px;
}

/****突发事件上报*****/

.tab {
  height: auto;
  margin: 100px auto;
  border: 1px solid #cccccc;
  overflow: hidden;
}

.tab-content {
  background: #ffffff;
}

.tab-title {
  margin-bottom: 15px;
}

.tab-title span {
  display: inline-block;
  width: auto;
  height: 56px;
  line-height: 56px;
  cursor: pointer;
  text-align: center;
  margin: 0px 20px;
}

.tab-title span.current {
  color: #284d73;
  border-bottom: 4px solid #284d73;
}

.tab-content li {
  width: 100%;
  height: auto;
  display: none;
  padding: 20px 0px;
}

.tab-content li.show {
  display: block;
}
.color-table {
  margin-bottom: 20px;
}

.tab-content table {
  width: 1200px;
  margin: 0 auto;
}

.color-table td {
  font-size: 16px;
  padding: 13px 6px 13px 12px;
  color: #333;
  text-align: center;
  min-width: 112px;
}

.color-table th {
  font: 16px "Trebuchet MS", Verdana, Arial, Helvetica, sans-serif;
  color: #333;
  letter-spacing: 2px;
  text-transform: uppercase;
  text-align: center;
  padding: 13px 6px 13px 12px;
  background: #f0f8ff;
  width: 160px;
}

.color-table table,
table tr th,
table tr td {
  border: 1px solid #ebebeb;
}

.color-table .text-lg {
  text-align: left;
  text-indent: 40px;
  line-height: 30px;
}

.color-table-td td {
  text-align: left;
}
.btn-sm {
  float: right;
}

/**滚动条样式**/

::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}

::-webkit-scrollbar-button:vertical {
  display: none;
}

::-webkit-scrollbar-corner,
::-webkit-scrollbar-track {
  background-color: #e2e2e2;
}

::-webkit-scrollbar-thumb {
  border-radius: 0;
  background-color: rgba(0, 0, 0, 0.3);
}

::-webkit-scrollbar-thumb:vertical:hover {
  background-color: rgba(0, 0, 0, 0.35);
}

::-webkit-scrollbar-thumb:vertical:active {
  background-color: rgba(0, 0, 0, 0.38);
}

.toolbar-subtitle {
  display: inline-block;
  font-size: small;
}
</style>
