<template>
  <div>
    <PageHeader headertitle="交通流统计">
      <v-spacer></v-spacer>
    </PageHeader>
    <v-container fluid>
      <v-toolbar class="elevation-0">
        <v-layout row wrap>
          <v-flex md2>
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
              :items="items"
              item-text="name"
              item-value="id"
              v-model="item"
              append-icon="format_list_bulleted"
              placeholder="区域名称"
              hint="区域名称"
              persistent-hint
            ></v-select>
          </v-flex>
        </v-layout>
        <v-spacer></v-spacer>
        <v-btn class="ma-2" @click="refreshchart"><v-icon>refresh</v-icon>刷新</v-btn>
        <v-btn class="ma-2" @click="list"><v-icon>list</v-icon>流量线列表</v-btn>
        <v-btn class="ma-2" @click="drawline" color="info"><v-icon>waves</v-icon>实时统计</v-btn>
      </v-toolbar>
    </v-container>
    <v-layout align-center justify-center row>
      <div id="chartdata" style="width:1300px;height:75vh"></div>
    </v-layout>
  </div>
</template>
<script>
import api from '@/api/stat/TrafficFlowApi'
import TrafficLineApi from '@/api/stat/TrafficLineApi'
import * as echarts from 'echarts/echarts.simple'
import dayjs from 'dayjs'
import PageHeader from '@/components/PageHeader'
var chart = ''
export default {
  components: {
    PageHeader
  },
  data () {
    return {
      xval: [],
      yval: [],
      dropdownBtn: ['近一月', '近一年'],
      type: '近一月',
      menu1: false,
      menu2: false,
      date1: dayjs().subtract(1, 'months').format('YYYY-MM-DD'),
      date2: dayjs().format('YYYY-MM-DD'),
      items: [],
      item: '',
      subtitle: ''
    }
  },
  mounted: function () {
    chart = echarts.init(document.getElementById('chartdata'), 'light')
    chart.showLoading({
      text: '正在加载数据'
    })
    this.getitems()
      .then(res => {
        this.item = this.items[0].id
        this.getchartdata()
      })
    window.onresize = function () {
      chart.resize()
    }
  },
  destroyed () {
    chart = ''
    window.onresize = function () {}
  },
  watch: {
    type (val) {
      // 切换时段时重新查询数据
      if (val && val === '近一月') {
        this.date1 = dayjs().subtract(1, 'months').format('YYYY-MM-DD')
        this.date2 = dayjs().format('YYYY-MM-DD')
      } else {
        this.date1 = dayjs().subtract(1, 'years').format('YYYY-MM-DD')
        this.date2 = dayjs().format('YYYY-MM-DD')
      }
      this.getchartdata()
    },
    item () {
      this.getchartdata()
    },
    date1 () {
      this.getchartdata()
    },
    date2 () {
      this.getchartdata()
    }
  },
  methods: {
    getitems: async function () {
      let { data } = await TrafficLineApi.GetAll()
      this.items = data
      this.item = this.items[0].id
    },
    list () {
      this.$router.push({
        path: './transline/list'
      })
    },
    drawline () {
      this.$router.push({
        path: './transline/drawline'
      })
    },
    getchartdata: async function () {
      let item = await api.GetTrafficFlowById(this.item, this.date1, this.date2)
      let data = item.data
      this.xval = data.map(res => {
        return res.name
      })
      this.yval = data.map(res => {
        return res.value
      })
      this.subtitle = '总计' + this.sum(this.yval) + '艘'
      this.chart()
    },
    sum (val) {
      let sum = 0
      for (const item of val) {
        sum += item
      }
      return sum
    },
    chart: function () {
      var option = {
        title: {
          text: '交通流统计',
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
          // {
          //   name: '船舶数量',
          //   type: 'line',
          //   smooth: true,
          //   data: this.yval
          // }
        ]
      }
      chart.hideLoading()
      chart.clear()
      chart.setOption(option)
    },
    refreshchart () {
      this.getitems()
      this.chart()
    }
  }
}
</script>
