<template>
  <v-card flat width="100%">
    <v-card-title primary-title title="点击进入详细页" @click="$router.push({name:'Throughput'})" style="cursor: pointer;">
      <img src="../../assets/homeindex/title1.png" class="mr-2"/>
      月吞吐量
    </v-card-title>
    <v-divider></v-divider>
    <v-container fluid style="width:92%;margin-left:4%">
      <div id="chartdata" style="width:100%;height:238px"></div>
    </v-container>
  </v-card>
</template>
<script>
import * as echarts from 'echarts/echarts.common'
import { pscApi as psc } from '@/api/plan'
import dayjs from 'dayjs'
var chart = ''
var chartrsz
export default {
  data () {
    return {
      client: new psc.ThroughPutClient('', this.$axios),
      year: dayjs().format('YYYY'),
      month: dayjs().format('MM')
    }
  },
  mounted () {
    this.$nextTick(function () {
      chart = echarts.init(document.getElementById('chartdata'), 'light')
      chart.showLoading({
        text: '正在加载数据'
      })
      this.getChartData()
    })
    chartrsz = function () {
      chart.resize()
    }
    window.addEventListener('resize', chartrsz)
  },
  destroyed () {
    window.removeEventListener('resize', chartrsz)
    chart = ''
  },
  methods: {
    getChartData: async function () {
      this.client.getThroughPut(this.year, this.month)
        .then(res => {
          this.xval = res.map(m => {
            return m.name
          })
          this.yval = res.map(m => {
            return (m.value).toFixed(1)
          })
          this.chart()
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
              normal: {
                show: true,
                position: 'top',
                color: '#5793f3',
                offset: [5, -10],
                rotate: 60
              }
            }
          }
        ]
      }
      chart.hideLoading()
      chart.clear()
      chart.setOption(option)
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
  margin-bottom: 15px;
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
.user-address h3 {
  font-size: 20px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 48px;
  letter-spacing: 0px;
  color: #535f72;
}
.user-address {
  text-align: left;
  padding-left: 20px;
  width: 100%;
}
.user-address h3 a {
  color: #535f72;
  text-decoration:none;
}
.user-address p {
  font-size: 14px;
  color: #666666;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 1px;
}
.user-text-center {
  margin-top: 5px;
}
.user-address h3 span {
  font-size: 14px;
  color: #5c83dc;
  float: right;
}
</style>
