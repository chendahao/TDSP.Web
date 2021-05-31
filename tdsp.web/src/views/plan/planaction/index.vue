<template>
  <div>
    <PageHeader headertitle="动态计划执行">
      <!-- 日期选择框 -->
      <v-layout wrap>
        <v-flex
          xs3
          sm3
          md3
        >
          <v-menu
            v-model="menu"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="date"
                append-icon="event"
                placeholder="计划日期"
                hint="计划日期"
                persistent-hint
                readonly
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="date" locale="zh-cn" @input="menu = false" :dayFormat="dayformat"></v-date-picker>
          </v-menu>
        </v-flex>
        <v-flex
          xs3
          sm3
          md3
          class="ml-3"
        >
          <v-select
            :items="timespan"
            item-text="value"
            item-value="id"
            append-icon="map"
            placeholder="时段"
            hint="时段"
            persistent-hint
            v-model="timespannow"
          ></v-select>
        </v-flex>
      </v-layout>
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="search"
        label="搜索"
        single-line
        hide-details
        clearable
      ></v-text-field>
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn
            class="ma-2"
            v-on="on"
            @click="getdata"
          >
            <v-icon>refresh</v-icon>
            刷新
          </v-btn>
        </template>
        <span>刷新</span>
      </v-tooltip>
      <!-- <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn
            v-on="on"
            @click="addplan"
          >
            <v-icon>add</v-icon>
            增加计划
          </v-btn>
        </template>
        <span>增加计划</span>
      </v-tooltip> -->
    </PageHeader>
    <v-container fluid>
      <v-data-table
        :headers="headers"
        :items="desserts"
        class="elevation-1"
        hide-default-footer
        disable-pagination
        sort-by="schedule.scheduleTime"
        group-by="plan.plan.harbor"
        show-group-by
        fixed-header
        :height="setheight"
        :search="search"
        :loading="loading"
        :dense="tableDense"
      >
        <template v-slot:group.header="{group, groupBy, items, isOpen, toggle, remove}">
          <!-- 港池分组 -->
          <td :colspan="headers.length">
            <v-icon @click="toggle">
              {{ isOpen ? 'remove' : 'add' }}
            </v-icon>
            <span>港池名称：{{items[0].plan.plan.harbor | formatHarbor}}</span>
          </td>
        </template>
        <template v-slot:item.actionPlan="{ item }">
          {{ item.period.actionPlan | formatPlan }}
        </template>
        <template v-slot:item.schedule.scheduleTime="{ item }">
          {{ item.schedule.scheduleTime | daytimeFormat }}
        </template>
        <template v-slot:item.startTime="{ item }">
          {{ item.startTime | daytimeFormat }}
        </template>
        <template v-slot:item.overTime="{ item }">
          {{ item.overTime | daytimeFormat }}
        </template>
        <template v-slot:item.pauseTime="{ item }">
          {{ item.pauseTime | daytimeFormat }}
        </template>
        <template v-slot:item.plan.plan.isTide="{ item }">
          <span v-if="item.plan.plan.isTide === false">
            否
          </span>
          <v-chip v-else color="info" small>
            是
          </v-chip>
        </template>
        <template v-slot:item.plan.plan.isPilotage="{ item }">
          <span v-if="item.plan.plan.isPilotage === false">
            否
          </span>
          <v-chip v-else color="info" small>
            是
          </v-chip>
        </template>
        <template v-slot:item.plan.plan.tugs="{ item }">
          <span>
            {{item.plan.plan.tugs}}
            {{item.plan.plan.tugCorp}}
          </span>
        </template>
        <template v-slot:no-data>
          <span>当前时段没有数据</span>
        </template>
      </v-data-table>
    </v-container>
    <!-- <v-dialog
      v-model="dialog"
      max-width="500px"
      persistent
    >
      <v-card>
        <v-card-title primary-title>
          {{dialogtitle}}
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-form
              ref="form"
              lazy-validation
            >
              <v-layout row wrap>
                <v-flex xs12 sm12 md12>
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
                        v-model="actiondate"
                        label="日期"
                        prepend-icon="event"
                        readonly
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker v-model="actiondate" locale="zh-cn" @input="menu1 = false" :dayFormat="dayformat"></v-date-picker>
                  </v-menu>
                </v-flex>
                <v-flex xs12 sm12 md12>
                  <v-menu
                    ref="menu"
                    v-model="menu2"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    :return-value.sync="time"
                    transition="scale-transition"
                    offset-y
                    max-width="290px"
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model="time"
                        label="时间"
                        prepend-icon="access_time"
                        readonly
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-time-picker
                      v-if="menu2"
                      v-model="time"
                      format="24hr"
                      @click:minute="$refs.menu.save(time)"
                    ></v-time-picker>
                  </v-menu>
                </v-flex>
                <v-flex xs12 sm12 md12 v-if="type=='p'">
                  <v-textarea
                    v-model="reason"
                    label="原因"
                    rows="2"
                    auto-grow
                    :rules="[v => !!v || '请输入暂停原因']"
                  >
                  </v-textarea>
                </v-flex>
              </v-layout>
            </v-form>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="cancel">取消</v-btn>
          <v-btn color="blue darken-1" text @click="save">保存</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog> -->
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { pscApi as psc } from '@/api/plan'
import dayjs from 'dayjs'
import { actionPlanFormat } from '@/plugins/format'
import PageHeader from '@/components/PageHeader'
export default {
  components: {
    PageHeader
  },
  data () {
    return {
      search: '',
      timespan: [],
      client: new psc.PlanActionClient('', this.$axios),
      periodclient: new psc.PlanPeriodClient('', this.$axios),
      // 时间
      // 搜索用时间
      // date: new Date().toISOString().substr(0, 10),
      date: '',
      // actiondate
      actiondate: '',
      // 时段
      timespannow: 0,
      setheight: window.innerHeight - 152,
      headers: [
        { text: '港池', groupable: true, sortable: false, value: 'plan.plan.harbor' },
        { text: '中文船名', groupable: false, width: '130', sortable: true, value: 'ship.cnName' },
        { text: '英文船名', groupable: false, width: '130', sortable: true, value: 'ship.name' },
        { text: 'MMSI', groupable: false, width: '130', sortable: false, value: 'ship.mmsi' },
        { text: '计划动作', groupable: false, width: '130', sortable: false, value: 'actionPlan' },
        { text: '乘潮', groupable: false, width: '60', sortable: false, value: 'plan.plan.isTide', align: 'center' },
        { text: '引航', groupable: false, width: '60', sortable: false, value: 'plan.plan.isPilotage', align: 'center' },
        { text: '拖轮', groupable: false, width: '90', sortable: false, value: 'plan.plan.tugs' },
        { text: '靠离泊位', groupable: false, width: '130', sortable: false, value: 'plan.plan.berthNo' },
        { text: '船舶代理', groupable: false, width: '130', sortable: false, value: 'plan.ship.agent' },
        { text: '调度时间', groupable: false, width: '130', sortable: true, value: 'schedule.scheduleTime' },
        { text: '开始时间', groupable: false, width: '130', sortable: false, value: 'startTime' },
        { text: '结束时间', groupable: false, width: '130', sortable: false, value: 'overTime' },
        { text: '暂停时间', groupable: false, width: '130', sortable: false, value: 'pauseTime' },
        { text: '暂停原因', groupable: false, width: '130', sortable: false, value: 'causes' }
        // { text: '航行状态', sortable: false },
        // { text: '操作', sortable: false, align: 'center' }
      ],
      desserts: [],
      loading: false,
      menu: false,
      menu1: false,
      menu2: false,
      dialog: false,
      dialogtitle: '',
      time: dayjs().format('HH:mm'),
      actionid: '',
      reason: null,
      type: '' // 开始=s 结束=e 暂停=p
    }
  },
  filters: {
    formatPlan: function (val) {
      return actionPlanFormat(val)
    },
    formatHarbor (val) {
      return val.replace(/[0-9]/ig, '')
    }
  },
  computed: {
    ...mapState('tabledense', [
      'tableDense'
    ])
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
    if (this.timespannow === 0) {
      this.gettimespans()
      this.getplanperiod()
    } else {
      this.getdata()
    }
  },
  mounted () {
    const that = this
    window.onresize = function temp () {
      // page 59; pageheader 64;pageheader dense 48;container padding top bottom 12px; appbar 64
      that.setheight = window.innerHeight - 152
    }
  },
  destroyed () {
    window.onresize = ''
  },
  methods: {
    // 获取当前时间和时段
    getplanperiod: async function () {
      this.periodclient.getCurrent()
        .then(res => {
          this.date = dayjs(res.period.planDate).format('YYYY-MM-DD')
          this.timespannow = res.period.timespan
          this.getdata()
        })
    },
    gettimespans: async function () {
      this.periodclient.getTimeSpans().then(res => {
        this.timespan = res
      })
    },
    getdata: async function () {
      this.loading = true
      this.client.getByPeriod(this.date, this.timespannow)
        .then(res => {
          let list = res
          for (let i = 0; i < list.length; i++) {
            let harbor = list[i].plan.plan.harbor
            if ((harbor).indexOf('一') > -1) {
              list[i].plan.plan.harbor = '1' + harbor
            } else if ((harbor).indexOf('二') > -1) {
              list[i].plan.plan.harbor = '2' + harbor
            } else if ((harbor).indexOf('三') > -1) {
              list[i].plan.plan.harbor = '3' + harbor
            } else {
              list[i].plan.plan.harbor = '0' + harbor
            }
          }
          this.desserts = list
        })
        .finally(() => {
          this.loading = false
        })
    },
    // start (id) {
    //   this.type = 's'
    //   this.actionid = id
    //   this.dialogtitle = '开始'
    //   this.time = dayjs().format('HH:mm')
    //   this.dialog = true
    // },
    // end (id) {
    //   this.type = 'e'
    //   this.actionid = id
    //   this.dialogtitle = '结束'
    //   this.time = dayjs().format('HH:mm')
    //   this.dialog = true
    // },
    // pause (id) {
    //   this.actionid = id
    //   this.type = 'p'
    //   this.dialogtitle = '暂停'
    //   this.time = dayjs().format('HH:mm')
    //   this.dialog = true
    // },
    // cancel () {
    //   this.actiondate = this.date
    //   this.reason = null
    //   this.actionid = ''
    //   this.$refs.form.resetValidation()
    //   this.dialog = false
    // },
    // save: async function () {
    //   if (this.$refs.form.validate()) {
    //     let time = this.actiondate + ' ' + this.time
    //     let res = ''
    //     if (this.type === 's') {
    //       res = await api.Start(this.actionid, time)
    //     } else if (this.type === 'e') {
    //       res = await api.Complete(this.actionid, time)
    //     } else {
    //       res = await api.Pause(this.actionid, this.reason, time)
    //     }
    //     this.checkstatus(res)
    //   }
    // },
    checkstatus (res) {
      if (res.data.code === 0) {
        // 成功
        this.message.ShowMessage('执行成功', 'success')
        this.getdata()
      } else if (res.data.code === 1) {
        this.message.ShowMessage(res.data.msg, 'error')
      }

      this.dialog = false
      this.actiondate = this.date
      this.reason = null
    },
    addplan () {
      this.$router.push({
        path: './planaction/add'
      })
    }
  }
}
</script>
<style lang="stylus" scoped>
.portrait.v-card {
  margin: 0 auto;
  max-width: 600px;
  width: 100%;
}
</style>
