<template>
  <div>
    <PageHeader headertitle="泊位占用统计">
      <v-spacer></v-spacer>
    </PageHeader>
    <v-container fluid>
      <v-toolbar class="elevation-0">
        <!-- 日期选择框 -->
        <v-subheader>根据时段查询</v-subheader>
        <v-col cols="2" sm="2" md="2">
          <v-menu
            v-model="menu"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="date"
                append-icon="event"
                placeholder="计划日期"
                hint="计划日期"
                persistent-hint
                readonly
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="date"
              locale="zh-cn"
              @input="menu = false"
              :dayFormat="dayformat"
            ></v-date-picker>
          </v-menu>
        </v-col>
        <v-col cols="2" sm="2" md="2" class="ml-3">
          <v-select
            :items="timespan"
            item-text="value"
            item-value="id"
            append-icon="map"
            placeholder="时段"
            hint="时段"
            persistent-hint
            v-model="timespannow"
          ></v-select>
        </v-col>
      </v-toolbar>
      <v-row align="center" justify="center"  style="margin-top:10px">
        <v-col md="7">
          <v-card>
            <v-card-title primary-title>
              占用量统计
            </v-card-title>
            <v-divider></v-divider>
            <div style="height: 700px;width:100%" ref="chartcontainer">
              <div id="chartdata" style="width:100%;height:700px"></div>
            </div>
          </v-card>
        </v-col>
        <v-col md="5">
          <v-card>
            <v-card-title primary-title>
              占用率统计
            </v-card-title>
            <v-divider></v-divider>
            <div style="height: 700px;width:100%">
              <div id="piechartdata" style="width:100%;height:700px"></div>
            </div>
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
import planperiod from '@/api/plan/PlanPeriodApi'
import PageHeader from '@/components/PageHeader'
var chart = ''
var piechart = ''
var chartrsz
export default {
  components: {
    PageHeader
  },
  data () {
    return {
      client: new psc.BerthShipClient('', this.$axios),
      periodclient: new psc.PlanPeriodClient('', this.$axios),
      timespan: [],
      date: '',
      // 时段
      timespannow: 0,
      menu: false,
      type_x: [],
      type_y1: [],
      type_y2: [],
      pie_x: [],
      pie_y1: [],
      pie_y2: []
    }
  },
  mounted: function () {
    chartrsz = function () {
      chart.resize()
      piechart.resize()
    }

    this.$nextTick(function () {
      chart = echarts.init(document.getElementById('chartdata'), 'default')
      chart.showLoading({
        text: '正在加载数据'
      })
      // 设置color属性时 需要取得default 等默认主题
      piechart = echarts.init(document.getElementById('piechartdata'), 'default')
      piechart.showLoading({
        text: '正在加载数据'
      })
      // 获取当前时间时段
      if (this.timespannow === 0) {
        this.gettimespans()
        this.getplanperiod()
      } else {
        this.getdata()
      }
    })
    window.addEventListener('resize', chartrsz)
    this.containerwidth = this.$refs.chartcontainer.width
  },
  destroyed () {
    window.removeEventListener('resize', chartrsz)
    chart = ''
    piechart = ''
  },
  watch: {
    date: function (newVal, oldVal) {
      if (oldVal !== '') {
        this.getdata()
      }
    },
    timespannow: function (newVal, oldVal) {
      if (oldVal !== 0) {
        this.getdata()
      }
    }
  },
  methods: {
    // 获取当前时间和时段
    getplanperiod: async function () {
      this.periodclient.getCurrent()
        .then(res => {
          this.date = dayjs(res.period.planDate).format('YYYY-MM-DD')
          this.timespannow = res.period.timespan
          this.getdata()
        })
    },
    gettimespans: async function () {
      this.periodclient.getTimeSpans().then(res => {
        this.timespan = res
      })
    },
    getdata: async function () {
      this.client.getOccupy(this.date, this.timespannow)
        .then(res => {
          this.type_x = res.map(m => {
            return m.name
          })
          this.type_y1 = res.map(m => {
            return m.used
          })
          this.type_y2 = res.map(m => {
            return m.unused
          })
          this.pie_x = [ ...this.type_x ]
          this.pie_y1 = [ ...this.type_y1 ]
          this.pie_y2 = [ ...this.type_y2 ]
          this.pie_x.unshift('name')
          this.pie_y1.unshift('占用')
          this.pie_y2.unshift('未占用')
          this.typechart()
          this.piechart()
        })
    },
    typechart () {
      var option = {
        color: ['#5793f3', '#38D8FF'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          data: ['占用', '未占用']
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
            data: this.type_x,
            axisLine: {
              lineStyle: {
                color: '#5793f3'
              }
            }
          }
        ],
        yAxis: [
          {
            name: '泊位数量',
            minInterval: 1,
            type: 'value',
            axisLine: {
              lineStyle: {
                color: '#5793f3'
              }
            }
          }
        ],
        series: [
          {
            label: {
              normal: {
                show: true
              }
            },
            name: '占用',
            type: 'bar',
            stack: '港池',
            data: this.type_y1
          },
          {
            label: {
              normal: {
                show: true
              }
            },
            name: '未占用',
            type: 'bar',
            stack: '港池',
            data: this.type_y2
          }
        ]
      }
      chart.hideLoading()
      chart.clear()
      chart.setOption(option)
      chart.resize()
    },
    piechart () {
      var option = {
        color: ['#5793f3', '#38D8FF'],
        legend: {},
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}  ({d}%)'
        },
        title: [
          {
            text: this.type_x[0],
            left: '25%',
            top: '10%',
            textAlign: 'center'
          },
          {
            text: this.type_x[1],
            left: '75%',
            top: '10%',
            textAlign: 'center'
          },
          {
            text: this.type_x[2],
            left: '25%',
            top: '60%',
            textAlign: 'center'
          },
          {
            text: this.type_x[3],
            left: '75%',
            top: '60%',
            textAlign: 'center'
          }
        ],
        dataset: {
          source: [
            this.pie_x,
            this.pie_y1,
            this.pie_y2
          ]
        },
        series: [
          {
            name: this.type_x[0],
            type: 'pie',
            radius: 50,
            center: ['25%', '30%'],
            label: {
              formatter: '{b}({d})%'
            },
            encode: {
              itemName: 'name',
              value: this.type_x[0]
            }
          },
          {
            name: this.type_x[1],
            type: 'pie',
            radius: 50,
            center: ['75%', '30%'],
            label: {
              formatter: '{b}({d})%'
            },
            encode: {
              itemName: 'name',
              value: this.type_x[1]
            }
          },
          {
            name: this.type_x[2],
            type: 'pie',
            radius: 50,
            center: ['25%', '75%'],
            label: {
              formatter: '{b}({d})%'
            },
            encode: {
              itemName: 'name',
              value: this.type_x[2]
            }
          },
          {
            name: this.type_x[3],
            type: 'pie',
            radius: 50,
            center: ['75%', '75%'],
            label: {
              formatter: '{b}({d})%'
            },
            encode: {
              itemName: 'name',
              value: this.type_x[3]
            }
          }
        ]
      }
      piechart.hideLoading()
      piechart.clear()
      piechart.setOption(option)
    }
  }
}
</script>
<style scoped>
/**港口吞吐量统计**/
.echarts-table {
  width: 100%;
  height: 431px;
  float: left;
  background-color: #fff;
  overflow-y: auto;
}

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
.personal-card-body {
  position: relative;
  padding: 10px 32px;
  line-height: 24px;
  display: -webkit-flex;
  display: flex;
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
