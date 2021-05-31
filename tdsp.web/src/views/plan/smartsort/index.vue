<template>
  <div>
    <PageHeader :headertitle="title">
      <!-- 日期选择框 -->
      <v-layout wrap>
        <v-flex xs3 sm3 md4>
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
            <v-date-picker
              v-model="date"
              locale="zh-cn"
              @input="menu = false"
              :dayFormat="dayformat"
            ></v-date-picker>
          </v-menu>
        </v-flex>
        <v-flex xs3 sm3 md4 class="ml-3">
          <v-select
            :items="timespan"
            item-text="value"
            item-value="id"
            placeholder="时段"
            hint="时段"
            persistent-hint
            append-icon="map"
            v-model="timespannow"
          ></v-select>
        </v-flex>
      </v-layout>
      <v-flex style="min-width:230px">
        <v-text-field
          v-model="interval"
          name="name"
          placeholder="调度时间间隔(默认20分钟)"
          hint="调度时间间隔(默认20分钟)"
          type="number"
          step="1"
          id="id"
          clearable
        ></v-text-field>
      </v-flex>
      <!-- <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn class="ma-2" v-on="on" @click="getdata" :disabled="btnloading">
            <v-icon>refresh</v-icon>刷新
          </v-btn>
        </template>
        <span>刷新</span>
      </v-tooltip> -->
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn
            class="ma-2"
            v-on="on"
            @click="checksummary"
            :disabled="btnloading || btnStatus"
          >
            <v-icon>playlist_add_check</v-icon>计划检查
          </v-btn>
        </template>
        <span>对船舶计划进行检查</span>
        <br />
        <span>过滤掉已取消的计划</span>
        <br />
        <span>可选操作不影响排序</span>
      </v-tooltip>
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn
            class="ma-2"
            color="primary"
            v-on="on"
            @click="sort"
            :disabled="btnloading"
          >
            <v-icon>storage</v-icon>排序
          </v-btn>
        </template>
        <span>排序</span>
      </v-tooltip>
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn color="info" class="ma-2" v-on="on" :loading="btnloading" @click="exportfile">
            <v-icon>file_copy</v-icon>导出
          </v-btn>
        </template>
        <span>Word文件导出</span>
      </v-tooltip>
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn
            v-on="on"
            class="white--text ma-2"
            @click="submitSort"
            color="blue-grey"
            :disabled="btnloading"
            :loading="btnloading"
          >
            <v-icon>cloud_upload</v-icon>上报数据
          </v-btn>
        </template>
        <span>上报数据</span>
      </v-tooltip>
    </PageHeader>
    <v-container fluid>
      <v-data-table
        :headers="headers"
        :items="desserts"
        class="elevation-1"
        hide-default-footer
        :sort-desc="[false, false]"
        group-by="berthingPlan.plan.harbor"
        show-group-by
        multi-sort
        :height="setheight"
        fixed-header
        disable-pagination
        :loading="loading"
        :dense="tableDense"
      >
        <template v-slot:group.header="{group, groupBy, items, isOpen, toggle, remove}">
          <!-- 港池分组 -->
          <td :colspan="headers.length">
            <v-icon @click="toggle">
              {{ isOpen ? 'remove' : 'add' }}
            </v-icon>
            <span>港池名称：{{items[0].berthingPlan.plan.harbor | formatHarbor}}</span>
            <span> | 数量{{items.length}}</span>
          </td>
        </template>
        <!-- <template v-slot:item.harbor="{ item }">
          <span :class="item.schedule.state === 'Cancel' ? 'cancelline' : ''"
            v-if="item.berthingPlan!=null">
            {{item.berthingPlan.plan.harbor}}
          </span>
        </template> -->

        <template v-slot:item.drag="{ item }">
          <td class="handle" style="max-width: 28px">
            <v-icon>unfold_more</v-icon>
          </td>
        </template>
        <template v-slot:item.harbor="{ item }">
          <v-avatar :color="setHarbor(item.berthingPlan.plan.harbor)" size="32">
            <span class="white--text headline" style="font-size:0.9rem !important">{{ item.berthingPlan.plan.harbor | formatHarbor2 }}</span>
          </v-avatar>
        </template>
        <template v-slot:`item.berthingPlan.ship.cnName`="{ item }">
          <span
            v-if="item.berthingPlan!=null"
            :class="item.schedule.state === 'Cancel' ? 'cancelline' : ''"
            :title="item.berthingPlan.ship.mmsi"
            >{{ item.berthingPlan.ship.cnName }}
          </span>
        </template>
        <template v-slot:`item.berthingPlan.ship.name`="{ item }">
          <span
            v-if="item.berthingPlan!=null"
            :class="item.schedule.state === 'Cancel' ? 'cancelline' : ''"
            :title="item.berthingPlan.ship.mmsi"
            >{{ item.berthingPlan.ship.name }}
          </span>
        </template>
        <template v-slot:`item.period.orgName`="{ item }">
          <span
            :class="item.schedule.state === 'Cancel' ? 'cancelline' : ''"
            >{{ item.period.orgName }}
          </span>
        </template>
        <template v-slot:item.berthingPlan.plan.isTide="{ item }">
          <div :class="item.schedule.state === 'Cancel' ? 'cancelline' : ''">
            <span v-if="item.berthingPlan.plan.isTide === false">
              否
            </span>
            <v-chip v-else color="info" small>
              是
            </v-chip>
          </div>
        </template>
        <template v-slot:item.berthingPlan.plan.isPilotage="{ item }">
          <div :class="item.schedule.state === 'Cancel' ? 'cancelline' : ''">
            <span v-if="item.berthingPlan.plan.isPilotage === false">
              否
            </span>
            <v-chip v-else color="info" small>
              是
            </v-chip>
          </div>
        </template>
        <template v-slot:item.berthingPlan.plan.tugs="{ item }">
          <span :class="item.schedule.state === 'Cancel' ? 'cancelline' : ''"
            v-if="item.berthingPlan!=null"
          >
            {{item.berthingPlan.plan.tugs}}
            {{item.berthingPlan.plan.tugCorp}}
          </span>
        </template>
        <template v-slot:item.berthingPlan.plan.actionPlan="{ item }">
          <v-chip :color="getAction(item.berthingPlan.plan.actionPlan)" small>
            {{item.berthingPlan.plan.actionPlan | formatPlan}}
          </v-chip>
        </template>
        <template v-slot:item.berthingPlan.plan.berthNo="{ item }">
          <span :class="item.schedule.state === 'Cancel' ? 'cancelline' : ''"
            v-if="item.berthingPlan!=null"
          >
            {{item.berthingPlan.plan.berthNo}}
          </span>
        </template>
        <template v-slot:item.shipLengthWidth="{ item }">
          {{ item.berthingPlan.ship.shipLength }}/{{ item.berthingPlan.ship.shipWidth }}
        </template>
        <template v-slot:item.frontbehindDraft="{ item }">
          {{ item.berthingPlan.ship.frontDraft }}/{{ item.berthingPlan.ship.behindDraft }}
        </template>
        <template v-slot:item.loadcargoWeight="{ item }">
          {{ item.berthingPlan.ship.cargoWeight }}/{{ item.berthingPlan.ship.loadWeight }}
        </template>
        <template v-slot:item.port="{ item }">
          {{ item.berthingPlan.extended.previousPort }}/{{ item.berthingPlan.extended.nextPort }}
        </template>
        <template v-slot:item.result="{ item }">
          <div v-if="item.check.state === 'UnChecked'">

          </div>
          <div
            v-else
            :class="item.schedule.state === 'Cancel' ? 'cancelline' : ''"
            :style="item.check | getresstyle"
          >
            <img :src="item | getImgSrc" />
            <v-tooltip color="primary" max-width="400" top v-if="item.check.state === 'Err'">
              <template v-slot:activator="{ on }">
                <span dark v-on="on">{{ item.check.result }}</span>
              </template>
              <div v-html="item.check.details"></div>
            </v-tooltip>
            <span v-else>{{ item.check.result }}</span>
          </div>
        </template>
        <template v-slot:item.schedule.planTime="{ item }">
          <span
            :class="item.schedule.state === 'Cancel' ? 'cancelline' : ''"
          >
            {{item.schedule.planTime | daytimeFormat}}
          </span>
        </template>
        <template v-slot:item.schedule.scheduleTime="{ item }">
          <v-edit-dialog
            :return-value.sync="item.schedule.scheduleTime"
            large
            save-text="保存"
            cancel-text="取消"
            @save="save()"
            @cancel="cancel(item)"
            @open="open(item)"
            @close="close()"
          >
            <span
              :class="item.schedule.state === 'Cancel' ? 'cancelline' : ''"
              :style="{color: item.planId == editItemInfo.planId ? 'red': isOneOf(item.planId) ? 'green':''}"
            >
              {{item.schedule.scheduleTime | daytimeFormat}}
            </span>
            <template v-slot:input>
              <v-text-field
                :disabled="btnloading || btnStatus || item.schedule.state==='Cancel'"
                v-model="newscheduleDate"
                single-line
                type="date"
              ></v-text-field>
              <v-text-field
                :disabled="btnloading || btnStatus || item.schedule.state==='Cancel'"
                v-model="newscheduleTime"
                single-line
                type="time"
                autofocus
              ></v-text-field>
            </template>
          </v-edit-dialog>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-icon color="primary" v-on="on" @click="editItem(item)" :disabled="btnloading || btnStatus || item.schedule.state==='Cancel'">edit</v-icon>
            </template>
            <span>调整调度时间</span>
          </v-tooltip>
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-icon color="red" v-on="on" @click="cancelItem(item)" :disabled="btnloading || btnStatus || item.schedule.state==='Cancel'">cancel</v-icon>
            </template>
            <span>取消</span>
          </v-tooltip>
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-icon color="green" v-on="on" @click="passItem(item)" :disabled="btnloading || btnStatus || item.schedule.state==='Pass'">check_box</v-icon>
            </template>
            <span>通过</span>
          </v-tooltip>
        </template>
        <template v-slot:no-data>
          <span>当前时段没有数据</span>
        </template>
      </v-data-table>
    </v-container>
    <v-dialog v-model="dialog" max-width="500px" persistent>
      <v-card>
        <v-card-title primary-title>调整时间</v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-form ref="form" lazy-validation>
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
                        v-model="changedate"
                        label="日期"
                        prepend-icon="event"
                        readonly
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="changedate"
                      locale="zh-cn"
                      @input="menu1 = false"
                      :dayFormat="dayformat"
                    ></v-date-picker>
                  </v-menu>
                </v-flex>
                <v-flex xs12 sm12 md12>
                  <v-menu
                    ref="menu"
                    v-model="menu2"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    :return-value.sync="changetime"
                    transition="scale-transition"
                    offset-y
                    max-width="290px"
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model="changetime"
                        label="时间"
                        prepend-icon="access_time"
                        readonly
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-time-picker
                      v-if="menu2"
                      v-model="changetime"
                      format="24hr"
                      @click:minute="$refs.menu.save(changetime)"
                    ></v-time-picker>
                  </v-menu>
                </v-flex>
              </v-layout>
            </v-form>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closedialog">取消</v-btn>
          <v-btn color="blue darken-1" text @click="changesave">保存</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { pscApi as psc } from '@/api/plan'
import dayjs from 'dayjs'
import { actionPlanFormat2 } from '@/plugins/format'
import planperiod from '@/api/plan/PlanPeriodApi'
import okicon from '@/assets/plansummary/i-icon1.png'
import erricon from '@/assets/plansummary/i-icon2.png'
import cancelimg from '@/assets/plansummary/i-btn1.png'
import passimg from '@/assets/plansummary/i-btn2.png'
import editimg from '@/assets/plansummary/i-btn3.png'
import PageHeader from '@/components/PageHeader'
import Sortable from 'sortablejs'
import mixin from '@/views/plan/mixin.js'
import exportword from './exportmixin.js'
export default {
  components: {
    PageHeader
  },
  mixins: [mixin, exportword],
  data () {
    return {
      client: new psc.PlanScheduleClient('', this.$axios),
      aclient: new psc.AnchorageShipClient('', this.$axios),
      bclient: new psc.BerthShipClient('', this.$axios),
      periodclient: new psc.PlanPeriodClient('', this.$axios),
      okicon: okicon,
      erricon: erricon,
      cancelimg: cancelimg,
      passimg: passimg,
      editimg: editimg,
      timespan: [],
      setheight: window.innerHeight - 152,
      title: '动态计划排序',
      // 时间
      date: '',
      timerules: v => /^[1-2][0-9][0-9][0-9]-([1][0-2]|0?[1-9])-([12][0-9]|3[01]|0?[1-9]) ([01][0-9]|[2][0-3]):[0-5][0-9]$/.test(
        v
      ) || '输入的时间格式不正确',
      // |^[1-2][0-9][0-9][0-9]-([1][0-2]|0?[1-9])-([12][0-9]|3[01]|0?[1-9]) ([01][0-9]|[2][0-3]):[0-5][0-9]$
      btnloading: false, // 按钮状态
      btnStatus: false, // 期间状态按钮
      // 时段
      timespannow: 0,
      headers: [
        { text: '', groupable: false, sortable: false, value: 'drag' },
        { text: '港池', groupable: true, sortable: true, value: 'berthingPlan.plan.harbor' },
        { text: '', groupable: false, sortable: false, value: 'harbor' },
        { text: '中文船名', groupable: false, width: '130', sortable: true, value: 'berthingPlan.ship.cnName' },
        { text: '英文船名', groupable: false, width: '200', sortable: true, value: 'berthingPlan.ship.name' },
        { text: '计划动作', groupable: false, width: '100', sortable: true, value: 'berthingPlan.plan.actionPlan' },
        { text: '靠离泊位', groupable: false, width: '100', sortable: true, value: 'berthingPlan.plan.berthNo' },
        { text: '申报时间', groupable: false, width: '100', sortable: true, value: 'schedule.planTime' },
        { text: '调度时间', groupable: false, width: '100', sortable: true, value: 'schedule.scheduleTime' },
        { text: '检查结果', groupable: false, width: '110', sortable: false, value: 'result' },
        { text: '操作', groupable: false, width: '130', sortable: false, align: 'center', value: 'actions' },
        { text: '拖轮', groupable: false, width: '100', sortable: false, value: 'berthingPlan.plan.tugs' },
        { text: '乘潮', groupable: false, width: '60', sortable: false, align: 'center', value: 'berthingPlan.plan.isTide' },
        { text: '引航', groupable: false, width: '60', sortable: false, align: 'center', value: 'berthingPlan.plan.isPilotage' },
        { text: '代理', groupable: false, width: '120', sortable: false, value: 'berthingPlan.ship.agent' },
        { text: '货种', groupable: false, width: '100', sortable: false, value: 'berthingPlan.ship.goodsType' },
        { text: '船长/船宽', groupable: false, width: '100', sortable: false, value: 'shipLengthWidth' },
        { text: '前/后吃水', groupable: false, width: '100', sortable: false, value: 'frontbehindDraft' },
        { text: '载货量/载重吨', groupable: false, width: '100', sortable: false, value: 'loadcargoWeight' },
        { text: '上一港/下一港', groupable: false, width: '150', sortable: false, align: 'center', value: 'port' },
        { text: '机构名称', groupable: false, width: '280', sortable: true, value: 'period.orgName' }
      ],
      desserts: [],
      loading: false,
      menu: false,
      menu1: false,
      menu2: false,
      dialog: false,
      changedate: '',
      changetime: '',
      editId: '',
      // 调度时间间隔
      interval: '',
      editItemInfo: { planId: '' },
      newscheduleDate: '',
      newscheduleTime: '',
      editIdlist: [], // 记录修改过的数据用户区分颜色显示
      initDataInedx: [] // 记录初始排序后的顺序和
    }
  },
  created () {
    this.setheight = window.innerHeight - 152
    // 获取当前时间时段
    if (this.timespannow === 0) {
      this.gettimespans()
      this.getplanperiod()
    } else {
      this.getdata()
    }
  },
  filters: {
    formatPlan: function (val) {
      return actionPlanFormat2(val)
    },
    getImgSrc (item) {
      const checkState = item.check.state
      const scheduleState = item.schedule.state
      if (checkState === 'Err') {
        if (scheduleState === 'Pass') return okicon
        else return erricon
      } else {
        return okicon
      }
    },
    getresstyle (item) {
      if (item.state === 'Err') {
        return 'color:red;'
      }
    },
    formatHarbor (val) {
      return val.replace(/[0-9]/ig, '')
    },
    formatHarbor2 (val) {
      const harbor = val.replace(/[0-9]/ig, '')
      if (harbor.indexOf('开敞') > -1) return '开敞'
      if (harbor.indexOf('一') > -1) return '一'
      if (harbor.indexOf('二') > -1) return '二'
      if (harbor.indexOf('三') > -1) return '三'
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
  methods: {
    isOneOf (id) {
      return this.editIdlist.includes(id)
    },
    // 获取当前时间和时段
    getplanperiod: async function () {
      this.periodclient.getNext()
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
    checkstate () {
      this.periodclient.getPeriodByTime(this.date, this.timespannow)
        .then(res => {
          const Status = res.stage
          if (Status === 'Scheduling') this.btnStatus = false
          else if (Status === 'Open') {
            this.btnStatus = true
            this.message.ShowMessage('当前时间正在进行计划申报，请稍后操作', 'info')
          } else this.btnStatus = true
        })
    },
    getdata: async function () {
      this.loading = true
      this.btnloading = true
      this.checkstate()
      this.client.getByPeriod(this.date, this.timespannow)
        .then(res => {
          let list = res
          // 按港池顺序 、 调度时间 ’正在‘排序
          for (let i = 0; i < list.length; i++) {
            let harbor = list[i].berthingPlan.plan.harbor
            if ((harbor).indexOf('一') > -1) {
              list[i].berthingPlan.plan.harbor = '1' + harbor
            } else if ((harbor).indexOf('二') > -1) {
              list[i].berthingPlan.plan.harbor = '2' + harbor
            } else if ((harbor).indexOf('三') > -1) {
              list[i].berthingPlan.plan.harbor = '3' + harbor
            } else {
              list[i].berthingPlan.plan.harbor = '0' + harbor
            }
            let time = list[i].schedule.scheduleTime
            list[i].schedule.scheduleTime = time.replace('T', ' ')
            let actionPlan = list[i].berthingPlan.plan.actionPlan

            // 按动作排序 同一时间  正在>离泊（离泊、移泊离）>靠泊（靠泊、移泊靠）
            switch (actionPlan) {
              case 'InUnBerthing':
                list[i].berthingPlan.plan.actionPlan = '0' + actionPlan
                break
              case 'InBerthing':
                list[i].berthingPlan.plan.actionPlan = '1' + actionPlan
                break
              case 'ShiftUnberthing':
                list[i].berthingPlan.plan.actionPlan = '2' + actionPlan
                break
              case 'Unberthing':
                list[i].berthingPlan.plan.actionPlan = '2' + actionPlan
                break
              case 'ShiftBerthing':
                list[i].berthingPlan.plan.actionPlan = '3' + actionPlan
                break
              case 'Berthing':
                list[i].berthingPlan.plan.actionPlan = '3' + actionPlan
                break
              case 'None':
                list[i].berthingPlan.plan.actionPlan = '4' + actionPlan
                break
              default:
                list[i].berthingPlan.plan.actionPlan = '4' + actionPlan
                break
            }
            // 取消的计划排在最后
            let state = list[i].schedule.state
            if ((state).indexOf('Cancel') < 0) {
              list[i].schedule.state2 = '0'
            } else {
              list[i].schedule.state2 = '1'
            }
          }
          // 默认正在在前 再按时间顺序排序，不使用组件排序
          let list1 = list.sort(this.listSortaAtionPlan) // 取消计划放在末尾
          let list2 = list1.sort(this.listSortaTime) // 正在放前
          let list3 = list2.sort(this.listStatus) // 按时间排序
          // 排序后给list加上排完的序号
          this.initDataInedx = []
          for (let j = 0; j < list3.length; j++) {
            const element = list3[j]
            list3[j].index = j
            let o = { id: list3[j].planId, index: j }
            this.initDataInedx.push(o)
          }
          this.desserts = list3
          this.title = `动态计划排序(数量：${list3.length})`
          const _self = this
          let table = document.querySelector('tbody')
          Sortable.create(table, {
            handle: '.handle',
            onEnd ({ newIndex, oldIndex }) {
              // if (newIndex === oldIndex) return
              // 在sortable拖拽之后 不在根据index对desserts进行移动
              // const rowSelected = _self.desserts.splice(oldIndex, 1)[0]
              // _self.desserts.splice(newIndex, 0, rowSelected)
            }
          })
        })
        .finally(() => {
          this.loading = false
          this.btnloading = false
        })
    },
    // 不在调用后台的排序方法，而是将计划按调度时间进行排序
    sort: async function () {
      this.desserts = []
      this.getdata()
    },
    // 按插入的序号排序
    getdata2: async function () {
      this.loading = true
      this.btnloading = true
      this.checkstate()
      this.client.getByPeriod(this.date, this.timespannow)
        .then(res => {
          let list = res
          for (let i = 0; i < list.length; i++) {
            const element = list[i]
            let harbor = element.berthingPlan.plan.harbor
            if ((harbor).indexOf('一') > -1) {
              element.berthingPlan.plan.harbor = '1' + harbor
            } else if ((harbor).indexOf('二') > -1) {
              element.berthingPlan.plan.harbor = '2' + harbor
            } else if ((harbor).indexOf('三') > -1) {
              element.berthingPlan.plan.harbor = '3' + harbor
            } else {
              element.berthingPlan.plan.harbor = '0' + harbor
            }
            for (let j = 0; j < this.initDataInedx.length; j++) {
              const index = this.initDataInedx[j]
              if (element.planId === index.id) {
                element.index = index.index
              }
            }
          }
          let list2 = list.sort(this.listSortaIndex)
          this.desserts = list2
        })
        .finally(() => {
          this.loading = false
          this.btnloading = false
        })
    },
    listSortaIndex (obj1, obj2) {
      var val1 = obj1.index
      var val2 = obj2.index
      if (val1 < val2) {
        return -1
      } else if (val1 > val2) {
        return 1
      } else {
        return 0
      }
    },
    // 正在的计划顺序在前
    listSortaAtionPlan (obj1, obj2) {
      var val1 = obj1.berthingPlan.plan.actionPlan
      var val2 = obj2.berthingPlan.plan.actionPlan
      if (val1 < val2) {
        return -1
      } else if (val1 > val2) {
        return 1
      } else {
        return 0
      }
    },
    // 按调度时间排序
    listSortaTime (obj1, obj2) {
      var val1 = obj1.schedule.scheduleTime
      var val2 = obj2.schedule.scheduleTime
      if (val1 < val2) {
        return -1
      } else if (val1 > val2) {
        return 1
      } else {
        return 0
      }
    },
    // state2: Cancel 0 其他 1 将cancel的数据排在队尾
    listStatus (obj1, obj2) {
      var val1 = obj1.schedule.state2
      var val2 = obj2.schedule.state2
      if (val1 < val2) {
        return -1
      } else if (val1 > val2) {
        return 1
      } else {
        return 0
      }
    },
    exportfile () {
      this.btnloading = true
      this.message.ShowMessage('正在导出中，请稍后', 'info')
      this.exportWord(this.date, this.timespannow, this.timespan)
      setTimeout(() => {
        this.btnloading = false
      }, 1500)
    },
    // 检查计划
    checksummary: async function () {
      this.btnloading = true
      if (this.desserts.length === 0) {
        this.message.ShowMessage('当前时段没有数据', 'info')
        this.btnloading = false
        return
      }
      this.message.ShowMessage('正在进行汇总检查', 'info')
      this.client.checkPlanSchedule(this.date, this.timespannow)
        .then(() => {
          // 成功
          this.message.ShowMessage('检查成功', 'success')
          this.getdata()
        })
        .catch(() => {
          this.message.ShowMessage('计划检查出错', 'error')
        })
        .finally(() => {
          this.btnloading = false
        })
    },
    importexport: async function () {
      // let { data } = await api.Export(this.date, this.timespannow)
    },
    cancelItem (item) {
      this.client.cancel(item.planId)
        .then(() => {
          this.getdata2()
        })
    },
    passItem (item) {
      this.client.pass(item.planId)
        .then(() => {
          this.getdata2()
        })
    },
    editItem: async function (item) {
      this.editItemInfo = item
      if (!item.schedule.scheduleTime) {
        this.message.ShowMessage('请先进行排序', 'info')
        return
      }
      this.dialog = true
      this.editId = item.planId
      let changetime = item.schedule.scheduleTime
      this.changedate = dayjs(changetime).format('YYYY-MM-DD')
      this.changetime = dayjs(changetime).format('HH:mm')
    },
    changesave: async function () {
      let postdate = this.changedate + ' ' + this.changetime
      this.editItemInfo.schedule.scheduleTime = postdate
      this.dialog = false
      this.client.adjustTime(this.editId, postdate)
        .then(res => {
          if (res.code === 0) {
            this.editIdlist.push(this.editId)
            this.dialog = false
            this.getdata2()
            this.message.ShowMessage('修改成功', 'success')
            const scheduleTime = this.editItemInfo.schedule.scheduleTime
            const berthNo = this.editItemInfo.berthingPlan.plan.berthNo
            const id = this.editItemInfo.planId
            const type = actionPlanFormat2(this.editItemInfo.berthingPlan.plan.actionPlan)
            // 检查修改的船舶计划动作
            if ((type).indexOf('靠') > -1) {
              const list = this.desserts.filter(item => item.berthingPlan.plan.berthNo === berthNo)
              if (list.length > 1) {
                for (let i = 0; i < list.length; i++) {
                  const element = list[i]
                  if (element.planId === id) continue
                  const time = element.schedule.scheduleTime
                  if (dayjs(time).isAfter(postdate) || dayjs(time).isSame(postdate)) {
                    this.message.ShowMessage(`『${berthNo}』泊位可能存在先离后靠情况，请核实`, 'warning', 0)
                  }
                }
              }
            }
            if ((type).indexOf('离') > -1) {
              const list = this.desserts.filter(item => item.berthingPlan.plan.berthNo === berthNo)
              if (list.length > 1) {
                for (let i = 0; i < list.length; i++) {
                  const element = list[i]
                  if (element.planId === id) continue
                  const time = element.schedule.scheduleTime
                  if (dayjs(time).isBefore(postdate) || dayjs(time).isSame(postdate)) {
                    this.message.ShowMessage(`『${berthNo}』泊位可能存在先离后靠情况，请核实`, 'warning', 0)
                  }
                }
              }
            }
          } else {
            this.dialog = false
            this.message.ShowMessage(res.msg, 'error')
          }
        })
    },
    closedialog () {
      this.dialog = false
      this.editItemInfo = { planId: '' }
    },
    save: async function () {
      this.changedate = this.newscheduleDate
      this.changetime = this.newscheduleTime
      this.changesave()
    },
    cancel (item) {
      this.editItemInfo = { planId: '' }
      this.newscheduleTime = ''
    },
    // 点击调度时间
    open (item) {
      this.editItemInfo = item
      this.editId = item.planId
      this.newscheduleDate = dayjs(item.schedule.scheduleTime).format('YYYY-MM-DD')
      this.newscheduleTime = dayjs(item.schedule.scheduleTime).format('HH:mm')
    },
    close () {},
    submitSort () {
      this.btnloading = true
      this.aclient.sendUp(this.date, this.timespannow)
      this.bclient.sendUp(this.date, this.timespannow)
      this.client.sendUp(this.date, this.timespannow)
        .then(() => {
          this.message.ShowMessage('上报成功', 'success')
        })
        .finally(() => {
          this.btnloading = false
        })
    },
    addplan () {
      this.$router.push({
        path: './planaction/add'
      })
    },
    // 区分动作颜色
    getAction (item) {
      item = item.replace(/[0-9]/ig, '')
      if (item === 'ShiftBerthing' || item === 'Berthing' || item === 'InBerthing') {
        return 'success'
      } else {
        return 'secondary'
      }
    },
    setHarbor (harbor) {
      if (harbor.indexOf('开敞') > -1) return 'indigo'
      if (harbor.indexOf('一') > -1) return 'teal'
      if (harbor.indexOf('二') > -1) return 'orange'
      if (harbor.indexOf('三') > -1) return '#2979FF'
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
.cancelline {
  text-decoration: line-through;
  text-decoration-style: double;
}
.handle {
  corsor: move !important;
  corsor: -webkit-grabbing !important;
}
</style>
