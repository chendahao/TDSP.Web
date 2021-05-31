<template>
  <v-card flat width="100%">
    <v-card-title primary-title>
      <img src="../../assets/homeindex/title1.png" class="mr-2"/>
      辖区情况
    </v-card-title>
    <v-divider></v-divider>
    <v-container fluid style="width:96%;margin-left:4%">
      <v-row>
        <h2 class="h2-title">曹妃甸辖区</h2>
      </v-row>
      <v-row >
        <v-col md="5" sm="12">
          <v-row>
            <v-col md="3">
              <div style="cursor:pointer">
                <p style="font-size:1rem">船只总计</p>
                <!-- <b style="font-size:2rem">{{shiptotal}}</b> -->
                <v-tooltip top>
                  <template v-slot:activator="{ on }">
                    <b style="font-size:2rem" v-on="on" @click="$router.push('./tdyn/realtime')">{{shiptotal}}</b>
                  </template>
                  <span>点击查询详细信息</span>
                </v-tooltip>
              </div>
            </v-col>
            <v-col md="1">
              <v-divider vertical></v-divider>
            </v-col>
            <v-col md="3">
              <div style="cursor:pointer">
                <p style="font-size:1rem">航行</p>
                <!-- <b style="font-size:2rem">{{ship_stat_1}}</b> -->
                <v-tooltip top>
                  <template v-slot:activator="{ on }">
                    <b style="font-size:2rem" v-on="on" @click="$router.push('./tdyn/realtime')">{{ship_stat_1}}</b>
                  </template>
                  <span>点击查询详细信息</span>
                </v-tooltip>
              </div>
            </v-col>
            <v-col md="1">
              <v-divider vertical></v-divider>
            </v-col>
            <v-col md="3">
              <div style="cursor:pointer">
                <p style="font-size:1rem">停泊</p>
                <!-- <b style="font-size:2rem">{{ship_stat_2}}</b> -->
                <v-tooltip top>
                  <template v-slot:activator="{ on }">
                    <b style="font-size:2rem" v-on="on" @click="$router.push('./tdyn/realtime')">{{ship_stat_2}}</b>
                  </template>
                  <span>点击查询详细信息</span>
                </v-tooltip>
              </div>
            </v-col>
          </v-row>
        </v-col>
        <v-col md="7" sm="12">
          <div class="echarts-map">
            <span style="margin-left:-15px">
              <div id="shiptypechart" style="width:120px;height:122px"></div>
            </span>
            <ul class="echarts-ul">
              <li v-for="(item, index) in ship_type_list" :key="index">
                <span class="itms-name">
                  <img v-if="index%7===0" src="../../assets/shiptype/mc-icon0.png" />
                  <img v-else-if="index%7===1" src="../../assets/shiptype/mc-icon1.png" />
                  <img v-else-if="index%7===2" src="../../assets/shiptype/mc-icon2.png" />
                  <img v-else-if="index%7===3" src="../../assets/shiptype/mc-icon3.png" />
                  <img v-else-if="index%7===4" src="../../assets/shiptype/mc-icon4.png" />
                  <img v-else-if="index%7===5" src="../../assets/shiptype/mc-icon5.png" />
                  <img v-else-if="index%7===6" src="../../assets/shiptype/mc-icon6.png" />
                  {{item.name}}
                </span>
                <span>{{item.percent}}%</span>
                <span>{{item.value}}</span>
              </li>
            </ul>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>
<script>
import dayjs from 'dayjs'
import * as echarts from 'echarts'
import statapi from '@/api/stat/ShipStatApi'
import mcicon0 from '@/assets/shiptype/mc-icon0.png'
import mcicon1 from '@/assets/shiptype/mc-icon1.png'
import mcicon2 from '@/assets/shiptype/mc-icon2.png'
import mcicon3 from '@/assets/shiptype/mc-icon3.png'
import mcicon4 from '@/assets/shiptype/mc-icon4.png'
import mcicon5 from '@/assets/shiptype/mc-icon5.png'
import mcicon6 from '@/assets/shiptype/mc-icon6.png'
import bg1 from '@/assets/bg1.png'
import { listSort } from '@/plugins/tool'
var typechart = ''
var Interval = ''
export default {
  data () {
    return {
      nowh: 0,
      chartdata: {},
      date: dayjs().format('YYYY-MM-DD'),
      shiptotal: 0,
      ship_stat_1: 0, // 航行
      ship_stat_2: 0, // 停泊
      ship_type_list: [],
      // 船舶类型统计
      pieval: [],
      mcicon0: mcicon0,
      mcicon1: mcicon1,
      mcicon2: mcicon2,
      mcicon3: mcicon3,
      mcicon4: mcicon4,
      mcicon5: mcicon5,
      mcicon6: mcicon6,
      bg1: bg1,
      rimg: {
        background: 'url(' + bg1 + ') no-repeat center right'
      }
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
    typechart = echarts.init(document.getElementById('shiptypechart'), 'default')
    this.getNavStatus() // 船舶类型和船舶类型数量统计
    this.getshiptype()
    let _this = this
    Interval = setInterval(function () {
      // 船舶航行状态
      _this.getNavStatus()
      _this.getshiptype()
    }, 1000 * 60 * 3)
  },
  destroyed () {
    clearInterval(Interval)
    typechart = ''
  },
  methods: {
    // 船舶航行状态
    getNavStatus: async function () {
      let { data } = await statapi.GetNavStatus()
      let sum = 0 // 总计
      let SumStat1 = 0 // 航行船舶数量
      let SumStat2 = 0 // 停泊船数量
      data.forEach(function (item) {
        // 在航
        // code = 0 3 4 8
        // 具体代码 src/plugins/format
        if (item.code === 0 || item.code === 3 || item.code === 4 || item.code === 8) {
          SumStat1 += item.value
        }
        // 锚泊
        // code 1 5
        if (item.code === 1 || item.code === 5) {
          SumStat2 += item.value
        }
        sum += item.value
      })
      this.shiptotal = sum
      this.ship_stat_1 = SumStat1
      this.ship_stat_2 = SumStat2
    },
    //
    getshiptype: async function () {
      let { data } = await statapi.GetShipTypes()
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
        item.percent = ((element.value / sum) * 100).toFixed(2)
        list.push(item)
      }
      // 根据数量进行排序
      let sortlist = list.sort(listSort)
      this.ship_type_list = sortlist
      this.pieval = sortlist
      if (typechart) {
        this.pieChart()
      }
    },
    pieChart () {
      var option = {
        color: ['#4ECB73', '#00A0FF', '#FAD336', '#FF7139', '#F2637B', '#36CBCA', '#A356EC'],
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        series: [
          {
            name: '船舶类型',
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            hoverOffset: 5,
            label: {
              normal: {
                show: false,
                position: 'center'
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '15',
                  fontWeight: 'bold'
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            itemStyle: { // 图形样式
              normal: {
                borderColor: '#ffffff',
                borderWidth: 2
              }
            },
            data: this.pieval
          }
        ]
      }
      typechart.clear()
      typechart.setOption(option)
      // 设置默认选中高亮部分
      typechart.dispatchAction({
        type: 'highlight',
        // seriesName: '船舶类型',
        dataIndex: 0,
        name: '货轮'
      })
      // 加载前先移除监听器 防止多个监听器同时存在
      typechart.off('mouseover')
      typechart.off('mouseout')
      let index = 0
      typechart.dispatchAction({ type: 'highlight', seriesIndex: 0, dataIndex: 0 })
      // 当鼠标移入时，如果不是第一项，则把当前项置为选中，如果是第一项，则设置第一项为当前项
      typechart.on('mouseover', function (e) {
        typechart.dispatchAction({ type: 'downplay', seriesIndex: 0, dataIndex: 0 })
        if (e.dataIndex !== index) {
          typechart.dispatchAction({ type: 'downplay', seriesIndex: 0, dataIndex: index })
        }
        if (e.dataIndex === 0) {
          typechart.dispatchAction({ type: 'highlight', seriesIndex: 0, dataIndex: e.dataIndex })
        }
      })

      // 当鼠标离开时，把当前项置为选中
      typechart.on('mouseout', function (e) {
        index = e.dataIndex
        typechart.dispatchAction({ type: 'highlight', seriesIndex: 0, dataIndex: 0 })
      })
    }
  }
}
</script>
<style scoped>
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
  padding: 10px 0px 10px 32px;
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
  /* padding-bottom: 20px; */
}
.module-chart {
  float: left;
  width: 100%;
}
.top-ul {
  width: 40%;
  text-align: left;
}
.top-ul li {
  width: 33%;
  float: left;
}
.top-ul li a {
  display: block;
  width: 67%;
}
.top-ul li span {
  font-size: 16px;
  color: #000000;
  width: 100%;
  display: block;
  line-height: 48px;
}
.top-ul li b {
  font-size: 36px;
  color: #333333;
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
  width: 100%;
  /* float: right; */
}
.echarts-ul {
  height: 120px;
  overflow-y: auto;
  float: right ;
  padding-left: 5px;
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
  font-size: 18px;
}
.module-bottom-text {
  min-height: 103px;
  float: left;
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
  text-align: left;
  font-weight: normal;
}
</style>
