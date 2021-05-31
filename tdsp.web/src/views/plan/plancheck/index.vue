<template>
  <div>
    <PageHeader :headertitle="title">
      <v-layout wrap>
        <v-flex xs4 sm4 md3>
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
                placeholder="计划日期"
                hint="计划日期"
                persistent-hint
                append-icon="event"
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
        <v-flex xs4 sm4 md3 class="ml-3">
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
        <v-flex xs4 sm4 md3 class="ml-3">
          <v-select
            :items="orgItems"
            item-text="text"
            item-value="text"
            v-model="orgName"
            hint="机构"
            persistent-hint
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
      <v-btn class="ma-2" @click="getdata" :disabled="btnloading">
        <v-icon>refresh</v-icon>刷新
      </v-btn>
      <v-btn class="ma-2" color="primary" @click="pass('all')" :disabled="btnloading || btnStatus">
        <v-icon>clear_all</v-icon>批量通过
      </v-btn>
      <v-btn class="ma-2" color="info" @click="create()" :disabled="btnloading || btnStatus">
        <v-icon>done</v-icon>审核确认
      </v-btn>
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn
            v-on="on"
            @click="addplan"
            :disabled="btnloading || btnStatus"
          >
            <v-icon>add</v-icon>
            增加计划
          </v-btn>
        </template>
        <span>增加计划</span>
      </v-tooltip>
    </PageHeader>
    <v-container fluid>
      <v-data-table
        v-model="selected"
        :headers="headers"
        :items="desserts"
        show-select
        :height="setheight"
        item-key="berthingPlanId"
        class="elevation-1"
        hide-default-footer
        sort-by="plan.berthingTime"
        group-by="plan.harbor"
        disable-pagination
        :search="search"
        :loading="loading"
        show-group-by
        :dense="tableDense"
      >

        <template v-slot:group.header="{group, groupBy, items, isOpen, toggle, remove}">
          <!-- 港池分组 -->
          <td :colspan="headers.length">
            <v-icon @click="toggle">
              {{ isOpen ? 'remove' : 'add' }}
            </v-icon>
            <span>港池名称：{{items[0].plan.harbor | formatHarbor}}</span>
            <span> | 数量{{items.length}}</span>
          </td>
        </template>
        <template v-slot:item.harbor="{ item }">
          <v-avatar :color="setHarbor(item.plan.harbor)" size="32">
            <span class="white--text headline" style="font-size:0.9rem !important">{{ item.plan.harbor | formatHarbor2 }}</span>
          </v-avatar>
        </template>
        <template v-slot:item.ship.cnName="{ item }">
          <span :class="item.audit.auditStatus==='NoPass'?'cancelline':''" :title="item.ship.mmsi">{{ item.ship.cnName }}({{ item.ship.name }})</span>
        </template>
        <template v-slot:item.plan.actionPlan="{ item }">
          <v-chip :color="getAction(item.plan.actionPlan)" small>
            {{item.plan.actionPlan | formatPlan}}
          </v-chip>
        </template>
        <template v-slot:item.plan.berthNo="{ item }">
          <span :class="item.audit.auditStatus==='NoPass'?'cancelline':''">{{ item.plan.berthNo }}</span>
        </template>
        <template v-slot:item.plan.tugs="{ item }">
          <span :class="item.audit.auditStatus==='NoPass'?'cancelline':''">
            {{item.plan.tugs}}
            {{item.plan.tugCorp}}
          </span>
        </template>
        <template v-slot:item.plan.berthingTime="{ item }">
          <span :class="item.audit.auditStatus==='NoPass'?'cancelline':''">{{ item.plan.berthingTime | daytimeFormat }}</span>
        </template>
        <template v-slot:item.shipLengthWidth="{ item }">
          <span :class="item.audit.auditStatus==='NoPass'?'cancelline':''">{{ item.ship.shipLength }}/{{ item.ship.shipWidth }}</span>
        </template>
        <template v-slot:item.frontbehindDraft="{ item }">
          <span :class="item.audit.auditStatus==='NoPass'?'cancelline':''">{{ item.ship.frontDraft }}/{{ item.ship.behindDraft }}</span>
        </template>
        <template v-slot:item.loadcargoWeight="{ item }">
          <span :class="item.audit.auditStatus==='NoPass'?'cancelline':''">{{ item.ship.cargoWeight }}/{{ item.ship.loadWeight }}</span>
        </template>
        <template v-slot:item.plan.isTide="{ item }">
          <div :class="item.audit.auditStatus === 'NoPass' ? 'cancelline' : ''">
            <span v-if="item.plan.isTide === false">
              否
            </span>
            <v-chip v-else color="info" small>
              是
            </v-chip>
          </div>
        </template>
        <template v-slot:item.plan.isPilotage="{ item }">
          <div :class="item.audit.auditStatus === 'NoPass' ? 'cancelline' : ''">
            <span v-if="item.plan.isPilotage === false">
              否
            </span>
            <v-chip v-else color="info" small>
              是
            </v-chip>
          </div>
        </template>
        <template v-slot:item.port="{ item }">
          {{ item.extended.previousPort }}/{{ item.extended.nextPort }}
        </template>
        <!-- 审核状态 -->
        <template v-slot:item.audit.auditStatus="{ item }">
           <v-chip
            class="ma-2"
            dark
            small
            :color="item.audit.auditStatus | f_statecolor"
          >
            {{ item.audit.auditStatus | f_schedulestate}}
          </v-chip>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-icon
                :disabled="btnloading || btnStatus"
                color="primary"
                v-on="on"
                @click="editItem(item.berthingPlanId)"
              >
                edit
              </v-icon>
            </template>
            <span>编辑</span>
          </v-tooltip>
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-icon
                :disabled="btnloading || btnStatus"
                color="red"
                v-on="on"
                @click="cancel(item.berthingPlanId)"
              >
                cancel
              </v-icon>
            </template>
            <span>取消</span>
          </v-tooltip>
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-icon
                :disabled="btnloading || btnStatus"
                color="green"
                v-on="on"
                @click="pass(item.berthingPlanId)"
              >
                check_box
              </v-icon>
            </template>
            <span>通过</span>
          </v-tooltip>
        </template>
        <template v-slot:no-results>
          <v-alert :value="true" color="error" icon="info">没有找到 "{{ search }}" 相关数据</v-alert>
        </template>
        <template v-slot:no-data>
          <span>当前时段没有数据</span>
        </template>
      </v-data-table>
    </v-container>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import dayjs from 'dayjs'
import { pscApi as psc } from '@/api/plan'
import codes from '@/api/navenv/CodesApi'
import PageHeader from '@/components/PageHeader'
import { actionPlanFormat } from '@/plugins/format'
import mixin from '@/views/plan/mixin.js'
export default {
  components: {
    PageHeader
  },
  mixins: [mixin],
  data () {
    return {
      client: new psc.BerthingPlanClient('', this.$axios),
      periodclient: new psc.PlanPeriodClient('', this.$axios),
      scheduleClient: new psc.PlanScheduleClient('', this.$axios),
      selected: [],
      selectedIds: [],
      search: '',
      timespan: [],
      btnloading: false, // 按钮状态
      btnStatus: false,
      // 时间
      date: '',
      setheight: window.innerHeight - 152,
      title: '动态计划审核',
      // 码头数据
      orgItems: [{ text: '全部', value: '' }],
      // 审核状态
      checkitems: [
        { text: '全部', value: '' },
        { text: '未审核', value: '0' },
        { text: '通过', value: '1' },
        { text: '未通过', value: '-1' }
      ],
      orgName: '全部',
      // 时段
      timespannow: 0,
      menu: false,
      headers: [
        { text: '港池', groupable: true, value: 'plan.harbor' },
        { text: '', groupable: false, sortable: false, value: 'harbor' },
        { text: '船名', groupable: false, width: '230', sortable: false, value: 'ship.cnName' },
        { text: '动作', groupable: false, width: '130', sortable: false, value: 'plan.actionPlan' },
        { text: '泊位', groupable: false, width: '100', sortable: false, value: 'plan.berthNo' },
        { text: '拖轮', groupable: false, width: '90', sortable: false, value: 'plan.tugs' },
        { text: '靠离泊时间', groupable: false, width: '130', value: 'plan.berthingTime' },
        { text: '船长/船宽(米)', groupable: false, width: '130', sortable: false, value: 'shipLengthWidth' },
        { text: '前/后吃水(米)', groupable: false, width: '130', sortable: false, value: 'frontbehindDraft' },
        { text: '载货量/载重吨', groupable: false, width: '130', sortable: false, value: 'loadcargoWeight' },
        { text: '乘潮', groupable: false, width: '60', sortable: false, value: 'plan.isTide', align: 'center' },
        { text: '引航', groupable: false, width: '60', sortable: false, value: 'plan.isPilotage', align: 'center' },
        { text: '审核状态', groupable: false, width: '120', sortable: false, value: 'audit.auditStatus', align: 'center' },
        { text: '操作', groupable: false, width: '130', sortable: false, value: 'actions', align: 'center' },
        { text: '代理', groupable: false, width: '120', sortable: true, value: 'ship.agent' },
        { text: '货物种类', groupable: false, width: '120', sortable: true, value: 'ship.goodsType' },
        { text: '上一港/下一港', groupable: false, width: '150', sortable: false, align: 'center', value: 'port' },
        { text: '机构名称', groupable: false, width: '280', sortable: true, value: 'plan.orgName' }

      ],
      desserts: [],
      loading: false
    }
  },
  filters: {
    formatPlan: function (val) {
      return actionPlanFormat(val)
    },
    f_schedulestate: function (val) {
      switch (val) {
        case 'Default':
          return '未审核'
        case 'NoPass':
          return '未通过'
        case 'Pass':
          return '通过'
        case 'Review':
          return '审核中'
        case 'Duplicate':
          return '通过'
        default:
          return val
      }
    },
    f_statecolor: function (val) {
      switch (val) {
        case 'Default':
          return ''
        case 'NoPass':
          return 'red'
        case 'Pass':
          return 'green'
        case 'Duplicate':
          return 'green'
        default:
          return ''
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
  created () {
    this.getwharf()
    // 获取当前时间时段
    if (this.timespannow === 0) {
      this.gettimespans()
      this.getplanperiod()
    } else {
      this.getdata()
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
    },
    selected (val) {
      this.selectedIds = val.map(res => {
        return res.berthingPlanId
      })
    },
    orgName (val, oldVal) {
      this.getdata()
    }
  },
  methods: {
    // 获取机构列表
    getwharf: async function () {
      let { data } = await codes.GetOrgans()
      this.orgItems = this.orgItems.concat(data)
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
          if (Status === 'Checked') this.btnStatus = false
          else if (Status === 'Open') {
            this.btnStatus = true
            this.message.ShowMessage('当前时间正在进行计划申报,请稍后操作', 'info')
          } else this.btnStatus = true
        })
    },
    getdata: async function () {
      this.btnloading = true
      this.loading = true
      let orgName = null
      this.checkstate()
      if (this.orgName !== '全部') orgName = this.orgName
      // this.client.planScheduleAll(this.date, this.timespannow)
      this.client.getByPeriod(this.date, this.timespannow, orgName)
        .then(res => {
          let list = res
          for (let i = 0; i < list.length; i++) {
            let harbor = list[i].plan.harbor
            if ((harbor).indexOf('一') > -1) {
              list[i].plan.harbor = '1' + harbor
            } else if ((harbor).indexOf('二') > -1) {
              list[i].plan.harbor = '2' + harbor
            } else if ((harbor).indexOf('三') > -1) {
              list[i].plan.harbor = '3' + harbor
            } else {
              list[i].plan.harbor = '0' + harbor
            }
          }
          this.desserts = list
          this.title = `动态计划审核(数量：${list.length})`
        })
        .finally(() => {
          this.loading = false
          this.btnloading = false
        })
      // 根据码头编号或名称查询数据
      // let data = await api.GetByPeriod(this.date, this.timespannow)
      // this.desserts = data.data
    },
    editItem: function (id) {
      this.$router.push({
        name: 'planActionadd',
        query: { id: id }
      })
    },
    pass (id) {
      // 批量处理
      this.btnloading = true
      if (id === 'all') {
        if (this.selectedIds.length === 0) {
          this.message.ShowMessage('请先选择审核的计划', 'info')
          this.btnloading = false
          return
        }
        this.client.pass(this.selectedIds)
          .then(() => {
            this.message.ShowMessage('批量审核成功', 'success')
            this.getdata()
          })
          .catch(err => {
            this.message.ShowMessage(err.response, 'error')
          })
      } else {
        let item = []
        item.push(id)
        this.client.pass(item)
          .then(() => {
            this.message.ShowMessage('审核成功', 'success')
            this.getdata()
          })
          .catch(err => {
            this.message.ShowMessage(err.response, 'error')
          })
      }
      this.btnloading = false
    },
    cancel: async function (id) {
      if (id) {
        this.client.noPass(id)
          .then(() => {
            this.message.ShowMessage('取消成功', 'success')
            this.getdata()
          })
          .catch(err => {
            this.message.ShowMessage(err.response, 'error')
          })
      }
    },
    create () {
      this.scheduleClient.create(this.date, this.timespannow)
        .then(() => {
          this.scheduleClient.checkPlanSchedule(this.date, this.timespannow)
          this.message.ShowMessage('确认成功', 'success')
        })
    },
    // 区分动作颜色
    getAction (item) {
      if (item === 'ShiftBerthing' || item === 'Berthing' || item === 'InBerthing') {
        return 'success'
      } else {
        return 'secondary'
      }
    },
    addplan () {
      this.$router.push({
        path: './planaction/add'
      })
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
<style scoped>
.btna {
  display: flex;
  align-items: center;
  margin-left: 3px;
  /* margin: 15px 5px; */
  /* border: 1px solid rgb(255, 255, 255); */
}
.portrait.v-card {
  margin: 0 auto;
  max-width: 600px;
  width: 100%;
}

.cancelline {
  text-decoration: line-through;
}
</style>
