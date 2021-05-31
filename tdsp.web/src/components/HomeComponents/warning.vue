<template>
  <div class="personal-body">
    <div class="personal-card">
      <div class="personal-card-header">
        <img src="../../assets/homeindex/title7.png" class="mr-2"/>
        <h3>报警信息</h3>
      </div>
      <div class="personal-card-body">
        <!-- <ul class="timeLine">
          <li v-for="(item, index) in items" :key="index" :style="timeLineli">
            <p :style="index===0?timeLinelionp:timeLinelip">
              <span>{{item.regDate | formatdate}}</span>
            </p>
            <div class="con">
              <h3>【{{item.type | formattype}}】</h3>
              <span>{{item.message}}</span>
            </div>
          </li>
        </ul> -->
      </div>
    </div>
  </div>
</template>
<script>
import time1 from '@/assets/time1.png'
import time2 from '@/assets/time2.png'
import bl from '@/assets/bl.png'
import api from '@/api/stat/WarningApi'
import dayjs from 'dayjs'
export default {
  data () {
    return {
      timeLinelip: {
        background: 'url(' + time2 + ') no-repeat 70px 0'
      },
      timeLinelionp: {
        background: 'url(' + time1 + ') no-repeat 70px 0'
      },
      timeLineli: {
        background: 'url(' + bl + ') repeat-y 78px 0'
      },
      pagination: {
        rowsPerPage: 5,
        page: 1
      },
      items: []
    }
  },
  created () {
    this.getdata()
  },
  filters: {
    formatdate (val) {
      return dayjs(val).format('HHmm/DD')
    },
    formattype (val) {
      switch (val) {
        case 91:
          return '智能航路'
        case 92:
          return '碰撞预警'
        case 93:
          return '航道偏离'
        case 94:
          return '走锚报警'
        case 95:
          return '自定义区域'
        case 96:
          return '报告线监控'
        case 99:
          return 'AIS信号灭失'
        case 971:
          return '定线制异常'
        case 972:
          return '定线制穿越'
        case 973:
          return '定线制追越'
        case 1027:
          return '重点船舶'
        case 1028:
          return '港池异常船舶'
        case 1201:
          return '涉水工程'
        case 1202:
          return '扣押船舶'
        case 1203:
          return '黑名单船舶'
        default:
          return '其他'
      }
    }
  },
  methods: {
    getdata: async function () {
      let date = dayjs().format('YYYY-MM-DD')
      // date = '2017-11-22'
      let { data } = await api.GetPages(this.pagination, date)
      this.items = data.values
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
  height: 410px;
  overflow-y: auto;
  position: relative;
  padding: 10px 10px;
  line-height: 24px;
  display: -webkit-flex;
  display: flex;
}

a {
  text-decoration: none;
}

ul,
ol {
  list-style: none;
  padding-left: 4px;
}
/************************/

.timeLine {
  margin: 20px auto 0;
  overflow: auto;
  position: relative;
  width: 100%;
}

.timeLine li {
  padding-bottom: 30px;
  zoom: 1;
  display: flex;
}

.timeLine li:after {
  content: " ";
  display: block;
  height: 0;
  clear: both;
  visibility: hidden;
}

.timeLine li:last-child {
  background: none !important;
}

.timeLine li p {
  display: inline-block;
  width: 98px;
  text-align: right;
  padding-right: 40px;
  color: #333333;
  text-align: center;
  font-family: cursive;
  font-size: 16px;
  line-height: 20px;
}

.timeLine li p span {
  display: block;
  color: #333333;
}

.timeLine li .con {
  text-align: left;
  width: calc(100% - 105px);
  display: inline-block;
  padding-left: 10px;
}
.con h3 {
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 28px;
  letter-spacing: 0px;
  color: #333333;
}

.con span {
  font-size: 14px;
  font-weight: normal;
  letter-spacing: 0px;
  color: #333333;
}

.timeLine li .con img {
  max-width: 100%;
}

/* .on  */
.timeLine li.on p {
  display: inline-block;
  width: 98px;
  text-align: right;
  padding-right: 40px;
  color: #333333;
  text-align: center;
  font-family: cursive;
  font-size: 16px;
  line-height: 20px;
}
</style>
