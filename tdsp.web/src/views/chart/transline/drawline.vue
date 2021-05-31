<template>
  <div>
    <PageHeader :headertitle="formTitle">
      <v-spacer></v-spacer>
      <v-btn class="ma-2" color="primary" @click="draw"><v-icon>gesture</v-icon>选择统计线</v-btn>
      <v-btn  class="ma-2" @click="$router.go(-1)">{{close}}</v-btn>
    </PageHeader>
    <!-- <v-dialog
      v-model="dialog"
      persistent :overlay="false"
      max-width="700px"
      transition="dialog-transition"
      :eager="true"
    > -->
    <!-- </v-dialog> -->
      <v-card v-show="dialog" style="margin-top:10px">
        <v-card-text>
          <v-container grid-list-md>
            <v-form
              ref="form"
              lazy-validation
            >
              <v-layout wrap>
                <v-flex xs12 sm6 md6 style="z-index: 400;">
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
                <v-flex xs12 sm6 md6 style="z-index: 400;">
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
                        append-icon="event"
                        readonly
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker v-model="date2" @input="menu2 = false" locale="zh-cn" :dayFormat="dayformat"></v-date-picker>
                  </v-menu>
                </v-flex>
                <v-flex md12>
                  <TrafficLineMap v-bind:geojson="geojson" v-on:CallBack="Callback" ></TrafficLineMap>
                </v-flex>
                <v-flex xs12 md12>
                  <span class="grey--text">点选海图或拖拽点选择流量统计线</span>
                </v-flex>
              </v-layout>
            </v-form>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <!-- <v-btn text @click="dialog = false">关闭</v-btn> -->
          <v-btn color="blue darken-1" text @click="save">查询</v-btn>
        </v-card-actions>
      </v-card>
    <v-layout align-center justify-center row v-show="!dialog" style="margin-top:10px">
      <div id="chartdata" style="width:1300px;height:75vh"></div>
    </v-layout>
  </div>
</template>

<script>
import api from '@/api/stat/TrafficFlowApi'
import TrafficLineMap from '@/components/TrafficLineMap'
import PageHeader from '@/components/PageHeader'
import * as echarts from 'echarts/echarts.simple'
import dayjs from 'dayjs'
var chart = ''
export default {
  components: {
    TrafficLineMap,
    PageHeader
  },
  data () {
    return {
      menu1: false,
      menu2: false,
      date1: dayjs().subtract(1, 'months').format('YYYY-MM-DD'),
      date2: dayjs().format('YYYY-MM-DD'),
      id: '-1',
      editedItem: {
        Id: 0,
        name: '',
        description: '',
        line: ''
      },
      defaultItem: {
        Id: 0,
        name: '',
        description: '',
        line: ''
      },
      // 地图组件用数据
      geojson: { 'type': 'LineString', 'coordinates': [] },
      name: '',
      // 详细、编辑状态
      readonly: true,
      dialog: true,
      xval: [],
      yval: [],
      charttitle: '交通流统计',
      subtitle: ''
    }
  },
  created () {
    // this.dialog = true
  },
  computed: {
    formTitle () {
      return '流量统计'
    },
    close () {
      return '返回'
    }
  },
  mounted: function () {
    chart = echarts.init(document.getElementById('chartdata'), 'light')
    window.onresize = function () {
      chart.resize()
    }
    // this.$nextTick(function () {
    //   this.dialog = true
    // })
  },
  methods: {
    save: async function () {
      if (this.geojson.coordinates.length <= 1) {
        this.message.ShowMessage('请在海图中点选流量线', 'success')
        return
      }
      this.dialog = false
      let item = await api.QueryFlow(this.geojson, this.date1, this.date2)
      let data = item.data
      this.xval = data.map(res => {
        return res.name
      })
      this.yval = data.map(res => {
        return res.value
      })
      this.charttitle = this.date1 + '至' + this.date2 + '交通流量统计'
      this.subtitle = '总计' + this.sum(this.yval) + '艘'
      this.chart()
    },
    draw () {
      if (this.dialog === false) this.dialog = true
    },
    sum (val) {
      let sum = 0
      for (const item of val) {
        sum += item
      }
      return sum
    },
    Callback: async function (msg) {
      this.geojson = msg
    },
    chart: function () {
      var option = {
        title: {
          text: this.charttitle,
          subtext: this.subtitle,
          x: 'center',
          align: 'right'
        },
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
        color: [
          '#61a0a8'
        ],
        toolbox: {
          feature: {
            dataView: { show: true, readOnly: true },
            magicType: { show: true, type: ['line', 'bar'] },
            saveAsImage: { show: true }
          }
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            data: this.xval,
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
            data: this.yval,
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
      chart.clear()
      chart.setOption(option)
    }
  }
}
</script>
<style>

  .span{
    height: 20px;
    line-height: 20px;
    font-size: 16px;
    margin-left: 4px;
  }
</style>
