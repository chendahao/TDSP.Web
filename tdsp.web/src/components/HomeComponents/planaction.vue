<template>
  <v-card flat width="100%">
    <v-card-title primary-title title="点击进入详细页" @click="$router.push({name:'planAction'})" style="cursor: pointer;">
      <img src="../../assets/homeindex/title7.png" class="mr-2"/>
      动态计划执行信息
    </v-card-title>
    <v-divider></v-divider>
    <v-container fluid>
      <div class="personal-card-body">
        <div class="news">
        <!-- <div class="news"> -->
          <div v-if="alertshow">
            <v-alert
              :value="alertshow"
              type="info"
            >
              <b>当前时段没有计划或未汇总</b>
              <v-btn class="ma-2" small color="error" @click="$router.push({name:'plancheck'})">计划审核</v-btn>
              <v-btn class="ma-2" small color="error" @click="$router.push({name:'smartSort'})">计划排序</v-btn>
            </v-alert>
          </div>
          <div v-else @mouseenter="clearscroll" @mouseleave="scrolllist" @click="$router.push({name:'planAction'})">
            <transition-group name="flip-list" tag="ul">
              <li v-for="item in desserts" :key="item.planActionId">
                <div class="news-itm">
                  <h3>
                    <div style="width:20vw;float:left;height:48px; overflow:hidden" :title="item.ship.cnName + ` | ` + item.ship.name + ` | ` + item.mmsi">
                      {{item.ship.cnName}}
                      <!-- 没有中文名时 只显示英文名 防止名称过长 -->
                      <small style="font-style:oblique" v-if="item.ship.name !== item.ship.cnName"> {{item.ship.name}}</small>
                    </div>
                    <!-- <v-chip :color="setTypeStyle(item)" text-color="white">{{item.period.actionPlan | formatPlan}}</v-chip> -->
                  </h3>
                  <div class="itms-address">
                    <span class="items-title">MMSI：</span>
                    <v-chip label small>{{item.ship.mmsi}}</v-chip>
                  </div>
                  <div class="itms-address">
                    <span class="items-title">计划动作：</span>
                    <v-chip small>{{item.period.actionPlan | formatPlan}}</v-chip>
                  </div>
                </div>
                <div class="news-itm">
                  <div class="itms-address">
                    <span class="items-title">排序时间：</span>
                    <v-chip label small v-if="item.schedule.scheduleTime">{{item.schedule.scheduleTime | daytimeFormat}}</v-chip>
                  </div>
                  <div class="itms-address">
                    <span class="items-title">开始时间：</span>
                    <v-chip label small v-if="item.startTime">{{item.startTime | daytimeFormat}}</v-chip>
                  </div>
                  <div class="itms-address">
                    <span class="items-title">结束时间：</span>
                    <v-chip label small v-if="item.overTime">{{item.overTime | daytimeFormat}}</v-chip>
                  </div>
                  <div class="itms-address">
                    <span class="items-title">暂停时间：</span>
                    <v-chip label small v-if="item.pauseTime">{{item.pauseTime | daytimeFormat}}</v-chip>
                  </div>
                </div>
              </li>
            </transition-group>
          </div>
        </div>
      </div>
    </v-container>
  </v-card>
</template>
<script>
import api from '@/api/plan/PlanActionApi'
import dayjs from 'dayjs'
import { pscApi as psc } from '@/api/plan'
import { actionPlanFormat } from '@/plugins/format'
export default {
  data () {
    return {
      client: new psc.PlanActionClient('', this.$axios),
      periodclient: new psc.PlanPeriodClient('', this.$axios),
      search: '',
      timespan: [],
      // 时间
      date: '',
      // 时段
      timespannow: 0,
      desserts: [],
      loading: false,
      menu: false,
      setscroll: undefined,
      getplan: undefined,
      alertshow: false
    }
  },
  filters: {
    fromatStatus: function (val) {},
    formatVal: function (val) {
      if (val < 0) {
        return ''
      } else {
        return val
      }
    },
    formatPlan: function (val) {
      return actionPlanFormat(val)
    }
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
  created () {
    // 获取当前时间时段
    this.getplanperiod()
  },
  mounted () {
    let _this = this
    this.getplan = setInterval(function () {
      _this.getplanperiod()
    }, 3000 * 60)
  },
  destroyed () {
    // 清除定时器
    clearInterval(this.getplan)
    this.clearscroll()
  },
  methods: {
    scrolllist () {
      if (this.setscroll === undefined) {
        this.setscroll = setInterval(() => {
          if (this.desserts.length > 0) {
            this.desserts = this.moveElement(this.desserts, -1)
          }
        }, 3000)
      }
    },
    clearscroll () {
      clearInterval(this.setscroll)
      this.setscroll = undefined
    },
    /**
     * 移动数组
     * arr 需要移动的数组
     * n  移动的位置
     */
    moveElement (arr, n) {
      if (Math.abs(n) > arr.length) n = n % arr.length
      return arr.slice(-n).concat(arr.slice(0, -n))
    },
    // 获取当前时间和时段
    getplanperiod: async function () {
      this.periodclient.getCurrent()
        .then(res => {
          this.date = dayjs(res.period.planDate).format('YYYY-MM-DD')
          this.timespannow = res.period.timespan
          this.getdata()
        })
    },
    getdata: async function () {
      this.loading = true
      this.client.getByPeriod(this.date, this.timespannow)
        .then(res => {
          const length = res.length
          if (length === 0) this.alertshow = true
          else this.scrolllist()
          // 滚动方法 移除过度效果 .flip-list-move
          this.desserts = res
        })
        .finally(() => {
          this.loading = false
        })
    },
    dayformat (d) {
      return dayjs(d).format('D')
    },
    setTypeStyle (item) {
      if (!item.startTime) {
        return 'teal'
        // 未开始
      }
      if (item.actionPlan > 0) {
        return 'cyan'
        // 完成
      }
      if (item.actionPlan < 0) {
        return '#eba15f'
        // 进行中
      }
    }
  }
}
</script>
<style scoped>

.items-content {
  font-weight: 600;
}
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
  border-radius: 2px;
  background-color: #fff;
}

.personal-card-body {
  height: 304px;
  overflow-y: auto;
  position: relative;
  margin-right: 1px;
  padding: 10px 10px;
  line-height: 24px;
  display: -webkit-flex;
  display: flex;
}

ul,
ol {
  list-style: none;
  padding-left: 15px;
}

/************************/

.news {
  height: 312px;
  width: 100%;
  text-align: left;
  cursor: pointer;
}

.news li {
  border-bottom: 1px solid #edf1f5;
  float: left;
  width: 100%;
}

.news h3 {
  float: left;
  width: 50%;
  font-size: 18px;
}

.news-itm h3 i {
  font-style: normal;
  width: 60px;
  height: 24px;
  display: inline-block;
  line-height: 24px;
  text-align: center;
  border-radius: 4px;
  margin-left: 23px;
  font-size: 14px;
}

.news-itm {
  width: 100%;
  float: left;
  line-height: 48px;
}

.itms-address {
  float: left;
  width: 25%;
  font-size: 14px;
}

.cl-1 {
  background: #75c87c;
}

.cl-2 {
  background: #eba15f;
}

.cl-3 {
  background: #b26ed6;
}

.cl-4 {
  background: #bfbfbf;
}
</style>
