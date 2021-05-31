<template>
  <v-card flat width="100%" height="100%">
    <v-card-title primary-title>
      <img src="../../assets/homeindex/title5.png" class="mr-2" style="cursor: pointer;"/>
      近一月报告线水域船舶情况
    </v-card-title>
    <v-divider></v-divider>
    <v-container fluid style="width:92%;margin-left:4%">
      <div id="reportlinedata" style="width:100%;height:387px"></div>
    </v-container>
  </v-card>
</template>
<script>
import api from '@/api/stat/TrafficFlowApi'
import * as echarts from 'echarts'
import dayjs from 'dayjs'
var chart = ''
var chartresize = ''
export default {
  data () {
    return {
      xval: [],
      yval: [],
      yval2: [],
      dropdownBtn: ['月', '年'],
      type: '月',
      menu1: false,
      menu2: false,
      date1: dayjs()
        .subtract(1, 'months')
        .format('YYYY-MM-DD'),
      date2: dayjs().format('YYYY-MM-DD')
    }
  },
  mounted: function () {
    chart = echarts.init(document.getElementById('reportlinedata'), 'light')
    chart.showLoading({
      text: '正在加载数据'
    })
    this.getreportlinedata()
    chartresize = function () {
      chart.resize()
    }
    window.addEventListener('resize', chartresize)
  },
  destroyed () {
    window.removeEventListener('resize', chartresize)
    chartresize = ''
    chart = ''
  },
  methods: {
    getreportlinedata: async function () {
      let item = await api.GetReportLineFlow('', this.date1, this.date2)
      let data = item.data
      this.xval = data.map(res => {
        return res.name
      })
      this.yval = data.map(res => {
        return res.value
      })
      if (chart) {
        this.chart()
      }
    },
    chart: function () {
      var option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          left: '1%',
          right: '1%',
          bottom: '1%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: this.xval,
            axisLine: {
              lineStyle: {
                color: '#8895A2'
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
                color: '#8895A2'
              }
            }
          }
        ],
        series: [
          {
            name: '进入报告线',
            type: 'bar',
            stack: '报告线船舶',
            data: this.yval,
            label: {
              normal: {
                show: true,
                position: 'top',
                color: '#4cabce',
                offset: [3, 0],
                rotate: 45
              }
            }
          }
        ]
      }
      chart.hideLoading()
      chart.setOption(option)
    },
    refreshchart () {
      this.getreportlinedata()
    },
    getxval () {
      let val = []
      for (let i = 1; i < 31; i++) {
        let j = Math.floor(Math.random() * 1000)
        val.push(j)
      }
      return val
    },
    dayformat (d) {
      return dayjs(d).format('D')
    }
  }
}
</script>
<style scoped>
.personal-body {
  width: 100%;
  height: 100%;
  float: left;
}
.personal-card {
  border-radius: 2px;
  background-color: #fff;
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
}
/************************/
.card-map1 {
  width: 100%;
  height: 363px;
}
</style>
