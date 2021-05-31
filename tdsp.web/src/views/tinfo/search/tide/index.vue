<template>
  <div>
    <PageHeader headertitle="潮汐信息">
    </PageHeader>
    <v-container fluid>
    <v-tabs>
      <v-tab ripple>潮汐信息</v-tab>
      <v-tab-item>
        <v-toolbar class="elevation-0">
          <v-row>
            <v-col cols="3" sm="3" md="3">
              <datepicker v-model="date" :datespan="date" v-on:headCallBack="headCall" ></datepicker>
            </v-col>
          </v-row>
        </v-toolbar>
        <v-row  align="center" justify="center" style="margin-top:10px">
          <div class="nowh" v-if="nowh !== 0">当前潮高：{{nowh}}cm</div>
        </v-row>
        <v-row align="center" justify="center"  style="margin-top:10px">
          <div class="info-item">潮时(Hrs)</div>
          <div class="info-item">{{chartdata.firstTime | formatDate}}</div>
          <div class="info-item">{{chartdata.secondTime | formatDate}}</div>
          <div class="info-item">{{chartdata.thirdTime | formatDate}}</div>
          <div class="info-item">{{chartdata.fourthTime | formatDate}}</div>
        </v-row>
        <v-row align="center" justify="center" >
          <div class="info-item">潮高(cm)</div>
          <div class="info-item">{{chartdata.firstTide}}</div>
          <div class="info-item">{{chartdata.secondTide}}</div>
          <div class="info-item">{{chartdata.thirdTide}}</div>
          <div class="info-item">{{chartdata.fourthTide}}</div>
        </v-row>
        <div style="width:80%;margin-left:10%">
          <div id="tidechart" style="width:100%;height:60vh"></div>
        </div>
      </v-tab-item>
      <v-tab ripple>潮汐数据</v-tab>
      <v-tab-item>
        <his ></his>
      </v-tab-item>
    </v-tabs>

    </v-container>
  </div>
</template>
<script>
import dayjs from 'dayjs'
import datepicker from '@/components/DatePicker'
import his from '@/views/tinfo/search/tide/details'
import * as echarts from 'echarts/echarts.simple'
import { pubApi as pub } from '@/api/pub'
import PageHeader from '@/components/PageHeader'
var chart = ''
export default {
  components: {
    datepicker,
    his,
    PageHeader
  },
  data () {
    return {
      client: new pub.TidesClient('', this.$axios),
      pagination: {
        page: 1,
        rowsPerPage: 10,
        sortBy: '',
        descending: 'dateTides',
        searchKey: ''
      },
      loading: true,
      totalDesserts: 0,
      // 时间
      date: dayjs().format('YYYY-MM-DD'),
      nowh: 0,
      chartdata: {},
      headers: [
        { text: '第一潮时', sortable: false },
        { text: '第一潮高', sortable: false },
        { text: '第二潮时', sortable: false },
        { text: '第二潮高', sortable: false },
        { text: '第三潮时', sortable: false },
        { text: '第三潮高', sortable: false },
        { text: '第四潮时', sortable: false },
        { text: '第四潮高', sortable: false },
        { text: '日期', sortable: false }
        // { text: '操作', sortable: false }
      ],
      tideData: []
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
  watch: {
    date (val) {
      this.getchartdata()
      this.getdata()
    }
  },
  created: function () {
    this.getdata()
    this.gettidehnow()
  },
  mounted: function () {
    this.$nextTick(function () {
    })
    // vuetify22默认tabs懒加载 暂用此方式
    setTimeout(() => {
      let dom = document.getElementById('tidechart')
      chart = echarts.init(dom, 'light')
      chart.showLoading({
        text: '正在加载数据'
      })
      this.getchartdata()
      window.onresize = function () {
        chart.resize()
      }
    }, 200)
  },
  destroyed () {
    chart = ''
    window.onresize = function () {}
  },
  methods: {
    headCall: function (msg) { // 回调方法，接收子组件传的参数
      this.date = msg
    },
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
          if (res.value) {
            let h = res.value
            if (h) this.nowh = Math.round(res.value)
          }
        })
    },
    chart: function () {
      var option = {
        tooltip: {
          type: 'cross',
          trigger: 'axis'
        },
        xAxis: [
          {
            name: '潮时',
            type: 'time',
            boundaryGap: false,
            data: this.tideItems,
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
            splitNumber: 15
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
        series: [{
          data: this.tideData,
          type: 'line',
          smooth: true,
          itemStyle: {
            normal: {
              areaStyle: {
                color: '#99CCFF60'
              }
            }
          }
        }]
      }
      chart.hideLoading()
      chart.clear()
      chart.setOption(option)
    },
    search: function () {
      this.chart()
    }
  }
}
</script>
<style>
  .info-item{
    line-height: 30px;
    text-align: center;
    min-height: 30px;
    min-width: 80px;
    border: 1px solid gray;
  }
  .nowh{
    font-size: 20px;
  }
</style>
