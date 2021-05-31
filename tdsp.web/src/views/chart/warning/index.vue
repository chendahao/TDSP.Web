<template>
  <div>
    <v-toolbar flat>
      <v-toolbar-title>24小时报警统计</v-toolbar-title>
      <v-divider
        class="mx-2"
        inset
        vertical
      ></v-divider>
      <!-- <v-toolbar-items>
        <v-combobox
          clearable
          v-model="type"
          :items="dropdownBtn"
          hint="按时段选择"
          persistent-hint
        ></v-combobox>
      </v-toolbar-items> -->
      <v-spacer></v-spacer>
      <!-- <v-btn @click="refreshchart(type)">刷新</v-btn> -->
    </v-toolbar>
    <v-layout align-center justify-center row>
      <div id="chartdata" style="width:80%;height:75vh"></div>
    </v-layout>
  </div>
</template>
<script>
import * as echarts from 'echarts/echarts.simple'
var chart = ''
export default {
  data () {
    return {
      xval: [],
      yval1: [],
      yval2: [],
      dropdownBtn: ['日', '周', '月', '季度', '年'],
      type: ''
    }
  },
  mounted: function () {
    this.$nextTick(function () {
      chart = echarts.init(document.getElementById('chartdata'), 'light')
      chart.showLoading({
        text: '正在加载数据'
      })
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
  methods: {
    getchartdata: async function (type) {
      this.xval = ['总数量', '走锚预警', '碰撞预警', '航道偏离', 'AIS灭失', '港池异常船舶', '定线制异常']
      this.yval1 = [2900, 1200, 300, 400, 700, 100, 200]
      // let item = await api.GetCustmLineFlowById(this.item, this.date1, this.date2)
      // let data = item.data
      if (this.yval1.length >= 1) {
        this.yval2 = [0]
        let total = this.yval1[0]
        for (let i = 1; i < this.yval1.length; i++) {
          let element = total
          for (let j = 0; j < i; j++) {
            element = element - this.yval1[j + 1]
          }
          this.yval2.push(element)
        }
      }
      this.chart()
    },
    chart: function () {
      var option = {
        // title: {
        //     text: '24小时报警统计（单位:次）'
        // },
        color: '#C23531',
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          },
          formatter: function (params) {
            var tar = params[1]
            return tar.name + '<br/>' + tar.seriesName + ' : ' + tar.value
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          splitLine: { show: false },
          data: this.xval
        },
        yAxis: {
          type: 'value',
          name: '次'
        },
        series: [
          {
            name: '辅助',
            type: 'bar',
            stack: '总量',
            itemStyle: {
              normal: {
                barBorderColor: 'rgba(0,0,0,0)',
                color: 'rgba(0,0,0,0)'
              },
              emphasis: {
                barBorderColor: 'rgba(0,0,0,0)',
                color: 'rgba(0,0,0,0)'
              }
            },
            data: this.yval2
          },
          {
            name: '数量',
            type: 'bar',
            stack: '总量',
            label: {
              normal: {
                show: true,
                position: 'inside'
              }
            },
            data: this.yval1
          }
        ]
      }
      chart.hideLoading()
      chart.clear()
      chart.setOption(option)
    },
    refreshchart () {
      this.chart()
    },
    getxval () {
      let val = []
      for (let i = 0; i < 7; i++) {
        let j = Math.floor(Math.random() * 1000)
        val.push(j)
      }
      return val
    }
  }
}
</script>
