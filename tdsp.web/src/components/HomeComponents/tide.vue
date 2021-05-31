<template>
  <v-card flat width="100%">
    <v-card-title primary-title title="点击进入详细页" @click="$router.push({name:'tide'})" style="cursor: pointer;">
      <img src="../../assets/homeindex/tide.png" class="mr-2"/>
      潮汐信息
    </v-card-title>
    <v-divider></v-divider>
    <v-container fluid style="width:92%;margin-left:4%">
      <v-row class="module-bottom-text">
        <v-col md="2" style="text-align:center">
          <p>当前潮高</p>
          <p style="font-size: 1.8rem;font-weight: 600;">{{nowh}}<em>cm</em></p>
        </v-col>
        <v-col md="1">
          <v-divider vertical></v-divider>
        </v-col>
        <v-col md="7">
          <table class="module-table">
            <tr>
              <th>潮时(Hrs)</th>
              <td>{{chartdata.firstTime | formatDate}}</td>
              <td>{{chartdata.secondTime | formatDate}}</td>
              <td>{{chartdata.thirdTime | formatDate}}</td>
              <td>{{chartdata.fourthTime | formatDate}}</td>
            </tr>
            <tr>
              <th class="tide_th">潮高(cm)</th>
              <td>{{chartdata.firstTide}}</td>
              <td>{{chartdata.secondTide}}</td>
              <td>{{chartdata.thirdTide}}</td>
              <td>{{chartdata.fourthTide}}</td>
            </tr>
          </table>
        </v-col>
      </v-row>
      <v-row>
        <div id="tidechart" style="width:100%;height:256px"></div>
      </v-row>
    </v-container>
  </v-card>
</template>
<script>
import dayjs from 'dayjs'
import * as echarts from 'echarts'
import { pubApi as pub } from '@/api/pub'
var tchart = ''
var Interval = ''
var tchartresize = ''
export default {
  data () {
    return {
      client: new pub.TidesClient('', this.$axios),
      nowh: 0,
      chartdata: {},
      tideData: [],
      date: dayjs().format('YYYY-MM-DD')
    }
  },
  filters: {
    formatDate: function (val) {
      if (!val) {
        return '0'
      }
      let tidetime = val.substr(0, 5)
      return tidetime
    }
  },
  created: function () {},
  mounted: function () {
    tchart = echarts.init(document.getElementById('tidechart'), 'light')
    this.gettidehnow() // 当前潮高
    this.getchartdata() // 潮汐表
    this.getdata()
    tchart.showLoading({
      text: '正在加载数据'
    })
    let _this = this
    Interval = setInterval(function () {
      _this.gettidehnow()
    }, 1000 * 60 * 3)
    tchartresize = function () {
      tchart.resize()
    }
    window.addEventListener('resize', tchartresize)
  },
  destroyed () {
    clearInterval(Interval)
    window.removeEventListener('resize', tchartresize)
    tchartresize = ''
    tchart = ''
  },
  methods: {
    getchartdata: async function () {
      this.client.getSeries(this.date)
        .then(res => {
          if (res === null) {
            this.tideData = []
          } else {
            this.tideData = res.map(item => {
              return [item.time * 1000, item.value]
            })
          }
          this.chart()
        })
    },
    getdata: async function () {
      this.client.getDayTides(this.date)
        .then(res => {
          this.chartdata = res
        })
    },
    // 获取当前时间的潮高
    gettidehnow: async function () {
      this.client.getTidePointNow()
        .then(res => {
          let h = res.value
          if (h) this.nowh = Math.round(res.value)
        })
    },
    chart: function () {
      var option = {
        tooltip: {
          trigger: 'axis',
          type: 'cross',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '8%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            name: '潮时',
            type: 'time',
            boundaryGap: false, // 左右铺满
            axisLine: {
              lineStyle: {
                color: '#8895A2'
              }
            },
            axisLabel: {
              formatter: function (value, index) {
                return dayjs(value).format('HH:mm')
              }
            },
            splitNumber: 12
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '潮高(cm)',
            axisLine: {
              lineStyle: {
                color: '#8895A2'
              }
            },
            splitLine: {
              show: true,
              lineStyle: {
                type: 'dashed'
              }
            }
          }
        ],
        series: [
          {
            data: this.tideData,
            showAllSymbol: false, // 标注所有数据点
            type: 'line',
            smooth: true,
            itemStyle: {
              normal: {
                areaStyle: {
                  color: '#99CCFF60'
                }
              }
            }
          }
        ]
      }
      tchart.hideLoading()
      tchart.setOption(option)
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

a {
  text-decoration: none;
  cursor: default;
}

ul,
ol {
  list-style: none;
}
/************************/

.broder_r {
  border-right: 1px solid #d7dde3;
}
.module-text {
  width: 100%;
}
.module-text h2 {
  font-size: 24px;
  line-height: 48px;
  letter-spacing: 0px;
  color: #333333;
}
.module-top {
  /* border-bottom: 1px solid #d7dde3; */
  float: left;
  width: 100%;
  padding-bottom: 20px;
}
.module-chart {
  float: left;
  width: 100%;
}
.tidenow {
  border-right: 1px solid #d7dde3;
}
.top-ul {
  width: 40%;
  text-align: left;
}
.top-ul li {
  width: 45%;
  float: left;
}
.top-ul li a {
  display: block;
  width: 67%;
}
.top-ul li span {
  font-size: 16px;
  width: 100%;
  display: block;
  line-height: 48px;
}
.top-ul li b {
  font-size: 36px;
  width: 100%;
  display: block;
  line-height: 48px;
}
.top-ul li b em {
  font-size: 16px;
}
.echarts-map > span {
  width: 120px;
  height: 122px;
  display: block;
  float: left;
}
.echarts-map {
  width: 60%;
  float: left;
}
.echarts-ul {
  height: 120px;
  overflow-y: auto;
  float: left;
  padding-left: 45px;
  width: calc(100% - 130px);
}
.echarts-ul li {
  text-align: left;
  width: 50%;
  float: left;
  line-height: 28px;
}
.echarts-ul li span {
  margin-right: 10px;
  font-size: 16px;
}
.itms-name img {
  padding-right: 15px;
}
.echarts-ul li span:nth-child(1) {
  padding-right: 10px;
  border-right: 1px solid #d9d9d9;
}

.echarts-ul li span:nth-child(2) {
  color: #807f7f;
}
.echarts-ul li span:nth-child(3) {
  color: #333333;
  font-size: 18px;
}
.module-bottom-text {
  min-height: 103px;
  width: 100%;
}
.module-bottom-text ul {
  width: 50%;
}
.module-bottom-text .module-table {
  width: 560px;
  margin-top: 25px;
  font-size: 16px;
}
.module-bottom-text .module-table tr {
  height: 27px;
  line-height: 27px;
}
.module-bottom-text .module-table th {
  border-bottom: 1px solid #eceef0;
  font-weight: initial;
}
.module-bottom-text .module-table td {
  border-bottom: 1px solid #eceef0;
}
.module-bottom-text .module-table tr,
th {
  padding: 5px 0px;
}
.module-table tr th {
  text-align: left;
}
.h2-title{
  padding-left: 20px;
  font-size: 24px;
  line-height: 48px;
  letter-spacing: 0px;
  color: #333333;
  text-align: left;
  font-weight: normal;
}
</style>
