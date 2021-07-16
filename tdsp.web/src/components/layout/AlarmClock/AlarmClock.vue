<template>
  <div style="position:relative;">
    <v-menu
      offset-y
      transition="slide-y-transition"
      bottom
      @input="setMenuValue"
      :value="menuvalue"
      :close-on-click="closeOnClick"
      :close-on-content-click="closeOnContentClick"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="indigo"
          dark
          v-bind="attrs"
          v-on="on"
        >
          <v-icon>alarm</v-icon>
        </v-btn>
      </template>
      <v-card width="450" v-show="!dialog">
        <v-list>
          <v-list-item>
            <v-list-item-avatar>
              <v-icon>alarm</v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>事件备忘录</v-list-item-title>
              <v-list-item-subtitle>事件备忘录</v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-action style="flex-direction: row;">
              <v-btn @click="dialog = true" ><v-icon>alarm_add</v-icon>新增</v-btn>
              <v-btn color="primary" class="ml-2" text @click="completeAlarm">完成</v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-list>

        <v-divider></v-divider>
        <v-list>
          <v-list-item-group v-model="selectList" multiple style="max-height:450px;overflow:auto">
            <template v-for="(item, index) in items">
              <v-list-item :key="`alarm-${index}`" :value="item">
                <template v-slot:default="{ active }">
                  <v-list-item-content>
                    <v-list-item-title v-text="item.title" class="text--primary"></v-list-item-title>
                    <v-list-item-subtitle
                      class="text--primary"
                      v-text="item.content"
                    ></v-list-item-subtitle>
                    <!-- <div class="text--primary" v-if="item.content">
                      {{item.content}}
                    </div> -->
                  </v-list-item-content>

                  <v-list-item-action>
                    <v-list-item-action-text v-if="item.alarm">
                      <v-chip small>{{ item.dateTime | relativeTime }}</v-chip>
                    </v-list-item-action-text>

                    <v-icon v-if="active" color="green">check_circle</v-icon>
                    <v-icon v-else color="grey lighten-1">check_circle</v-icon>
                  </v-list-item-action>
                </template>
              </v-list-item>

              <v-divider
                v-if="index < items.length - 1"
                :key="index"
              ></v-divider>
            </template>
            <span v-if="items.length <= 0">当前没有备忘录</span>
          </v-list-item-group>
        </v-list>
        <v-card-actions>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
      <v-card width="450" v-show="dialog">
        <v-list>
          <v-list-item>
            <v-list-item-avatar>
              <v-icon>alarm</v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>事件备忘录</v-list-item-title>
              <v-list-item-subtitle>事件备忘录</v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-action>
            </v-list-item-action>
          </v-list-item>
        </v-list>
        <v-divider></v-divider>
        <v-card-text>
          <v-form>
            <v-text-field label="标题" v-model="record.title"></v-text-field>
            <v-textarea filled label="详细" v-model="record.content"></v-textarea>
            <v-chip-group center-active next-icon="arrow_forward_ios" prev-icon="arrow_back_ios" show-arrows active-class="primary--text">
              <v-chip small class="ml-1" title="30分钟后" @click="setTime(0.5)">30分钟后</v-chip>
              <v-chip small class="ml-1" title="1小时" @click="setTime(1)">1小时</v-chip>
              <v-chip small class="ml-1" title="2小时" @click="setTime(2)">2小时</v-chip>
              <v-chip small class="ml-1" title="4小时" @click="setTime(4)">4小时</v-chip>
              <v-chip small class="ml-1" :title="timevalue" @click="setTimeByUser">{{timevalue}}</v-chip>
              <v-chip small class="ml-1" title="不提醒" @click="setTime(0)">不提醒</v-chip>
            </v-chip-group>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="success" @click="dialog = false">取消</v-btn>
          <v-btn color="success" @click="saveInfo">保存</v-btn>
        </v-card-actions>
      </v-card>
    </v-menu>
    <v-dialog
      v-model="pickerDialog"
      scrollable
      persistent :overlay="false"
      max-width="300px"
      transition="dialog-transition"
    >
      <v-card>
        <v-card-title primary-title>
          提醒时间设置
        </v-card-title>
        <v-card-text>
          <v-container grid-list-xs>
            <v-form>
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
                    placeholder="日期"
                    hint="日期"
                    persistent-hint
                    append-icon="event"
                    readonly
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="date1" @input="menu1 = false" locale="zh-cn" :dayFormat="dayformat"></v-date-picker>
              </v-menu>
              <v-menu
                ref="menutime1"
                v-model="menu2"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="time1"
                    placeholder="时间"
                    hint="时间"
                    persistent-hint
                    append-icon="access_time"
                    readonly
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-time-picker v-if="menu2" format="24hr" v-model="time1" @click:minute="$refs.menutime1.save(time1)"></v-time-picker>
              </v-menu>
              <span style="color:red">{{err}}</span>
            </v-form>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="success" @click="setAlarmTime">确认</v-btn>
          <v-btn text @click="setAlarmTimeCancel">取消</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <div v-if="showAlarm" class="alarmCard">
      <v-alert
        border="left"
        color="green"
        dark
        width="500"
      >
      <v-row align="center">
        <v-col class="grow">
          I'm an alert with a top border and red color
          <br>
          I'm an alert with a top border and red color
          I'm an alert with a top border and red colorI'm an alert with a top border and red colorI'm an alert with a top border and red color
        </v-col>
        <v-col class="shrink">
          <v-btn color="primary">text</v-btn>
        </v-col>
      </v-row>
      </v-alert>
      <v-alert
        border="left"
        color="green"
        dark
        width="500"
      >
        <v-row align="center">
          <v-col class="grow">
            I'm an alert with a top border and red color
            <br>
            I'm an alert with a top border and red color
            I'm an alert with a top border and red colorI'm an alert with a top border and red colorI'm an alert with a top border and red color
          </v-col>
          <v-col class="shrink">
            <v-btn color="primary">text</v-btn>
          </v-col>
        </v-row>
      </v-alert>
    </div>
  </div>
</template>
<script>
import dayjs from 'dayjs'
import { mapState } from 'vuex'
var relativeTime = require('dayjs/plugin/relativeTime')
var updateLocale = require('dayjs/plugin/updateLocale')
require('dayjs/locale/zh-cn')
dayjs.locale('zh-cn')
dayjs.extend(relativeTime)
dayjs.extend(updateLocale)
dayjs.updateLocale('zh-cn', {
  relativeTime: {
    future: '%s后',
    past: '%s前',
    s: '几秒',
    m: '1 分钟',
    mm: '%d 分钟',
    h: '1 小时',
    hh: '%d 小时',
    d: '1 天',
    dd: '%d 天',
    M: '1 个月',
    MM: '%d 个月',
    y: '1 年',
    yy: '%d 年'
  }
})
export default {
  data () {
    return {
      menuvalue: '',
      closeOnClick: true,
      closeOnContentClick: false,
      message: false,
      hints: true,
      dialog: false,
      pickerDialog: false,
      menu1: false,
      menu2: false,
      date1: dayjs().format('YYYY-MM-DD'),
      time1: dayjs().add(8, 'hour').format('HH:mm'),
      show: false,
      menu: false,
      time: null,
      err: '',
      selectList: [],
      timevalue: '其他时间',
      setTimevalue: false,
      record: {
        id: 0,
        title: '',
        content: '',
        dateTime: '',
        status: 0, // 0 初始状态； 2 延后； 3 完成
        alarm: true
      },
      setTimeVal: 0.5,
      messages: 0,
      showAlarm: false
    }
  },
  computed: {
    ...mapState({
      items: state => state.alarmList.list
    })
  },
  filters: {
    relativeTime (val) {
      return dayjs(val).fromNow()
    }
  },
  mounted () {
    const item = this.items[0]
    this.$notify.info({
      title: `备忘事件提醒：${item.title}`,
      position: 'bottom-right',
      dangerouslyUseHTMLString: true,
      showClose: true,
      message: `<p>内容 ${item.content}</p><p>时间 ${item.dateTime}</p>`,
      duration: 0
    });
  },
  methods: {
    // 选择其他时间
    setTimeByUser () {
      this.closeOnClick = false
      this.pickerDialog = true
    },
    setAlarmTime () {
      this.snackbar = true
      const t = dayjs(this.date1 + '' + this.time1)
      console.log(t)
      this.err = ''
      if (dayjs(t).isBefore(dayjs())) {
        this.err = '不能选择之前的时间'
        return
      }
      this.timevalue = t.format('MM-DD HH:mm')
      this.setTimevalue = true
      this.record.dateTime = t.format('YYYY-MM-DD HH:mm')
      this.pickerDialog = false
      setTimeout(() => {
        this.closeOnClick = true
      }, 100)
    },
    setAlarmTimeCancel () {
      this.pickerDialog = false
      this.setTimevalue = false
      setTimeout(() => {
        this.closeOnClick = true
      }, 100)
    },
    // 保存新增的提醒
    saveInfo () {
      this.dialog = false
      const id = dayjs().valueOf()
      this.record.id = id
      if (this.timevalue === '其他时间' && this.setTimevalue === true) {
        const t = dayjs(this.date1 + '' + this.time1)
        this.record.dateTime = t.format('YYYY-MM-DD HH:mm')
      }
      if (this.record.dateTime === '') {
        this.record.dateTime = dayjs().add(this.setTimeVal, 'hour').format('YYYY-MM-DD HH:mm')
      }
      this.$store.dispatch('alarmList/add', this.record)
      this.menuvalue = false
      this.$message.success('保存成功')
      this.refreshInfo()
    },
    refreshInfo () {
      this.record = {
        id: 0,
        title: '',
        content: '',
        dateTime: '',
        status: 0, // 0 初始状态； 2 延后； 3 完成
        alarm: true
      }
      this.setTimevalue = false
    },
    setMenuValue () {
      this.menuvalue = !this.menuvalue
    },
    completeAlarm () {
      for (let i = 0; i < this.selectList.length; i++) {
        const element = this.selectList[i]
        this.$store.dispatch('alarmList/remove', element)
      }
      // this.showAlarm = true
    },
    completeAlarmOne (item) {
      console.log(item)
      // this.$store.dispatch('alarmList/remove', item)
    },
    setTime (val) {
      if (val <= 0) {
        this.record.alarm = false
      }
      this.setTimeVal = val
      this.timevalue = '其他时间'
      this.record.dateTime = dayjs().add(val, 'hour').format('YYYY-MM-DD HH:mm')
    }
  }
}
</script>
<style lang="stylus" scoped>
  .alarmCard {
    z-index: 999;
    position: absolute;
    right: -45px;
    top: 60px;
  }
</style>
