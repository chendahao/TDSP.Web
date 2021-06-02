<template>
  <div>
    <PageHeader headertitle="动态计划查询">
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
          <v-checkbox
            label="显示全部"
            v-model="showAll"
            on-icon="check_box"
            off-icon="check_box_outline_blank"
            hide-details
            v-on="on"
          ></v-checkbox>
        </template>
        <span>显示全部</span>
      </v-tooltip>
    </PageHeader>
    <v-container fluid>
      <v-data-table
        :headers="headers"
        :items="desserts"
        class="elevation-1"
        hide-default-footer
        disable-pagination
        :height="setheight"
        fixed-header
        sort-by="plan.berthingTime"
        group-by="plan.harbor"
        show-group-by
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
            <span>港池名称：{{items[0].plan.harbor | formatHarbor}}</span>
            <span> | 数量{{items.length}}</span>
          </td>
        </template>
        <template v-slot:item.harbor="{ item }">
          <v-avatar :color="setHarbor(item.plan.harbor)" size="32">
            <span class="white--text headline" style="font-size:0.9rem !important">{{ item.plan.harbor | formatHarbor2 }}</span>
          </v-avatar>
        </template>
        <template v-slot:`item.ship.cnName`="{ item }">
          <span :title="item.ship.mmsi">{{ item.ship.cnName }}</span>
        </template>
        <template v-slot:`item.ship.name`="{ item }">
          <span :title="item.ship.mmsi">{{ item.ship.name }}</span>
        </template>
        <template v-slot:item.plan.isTide="{ item }">
          <span v-if="item.plan.isTide === false">
            否
          </span>
          <v-chip v-else color="info" small>
            是
          </v-chip>
        </template>
        <template v-slot:item.plan.isPilotage="{ item }">
          <span v-if="item.plan.isPilotage === false">
            否
          </span>
          <v-chip v-else color="info" small>
            是
          </v-chip>
        </template>
        <template v-slot:item.plan.tugs="{ item }">
          <span>
            {{item.plan.tugs}}
            {{item.plan.tugCorp}}
          </span>
        </template>
        <template v-slot:item.plan.actionPlan="{ item }">
          {{ item.plan.actionPlan | formatPlan }}
        </template>
        <template v-slot:item.plan.berthingTime="{ item }">
          {{ item.plan.berthingTime | daytimeFormat }}
        </template>
        <template v-slot:item.extended.anchorTime="{ item }">
          {{ item.extended.anchorTime | daytimeFormat }}
        </template>
        <template v-slot:item.shipLengthWidth="{ item }">
          {{ item.ship.shipLength }}/{{ item.ship.shipWidth }}
        </template>
        <template v-slot:item.frontbehindDraft="{ item }">
          {{ item.ship.frontDraft }}/{{ item.ship.behindDraft }}
        </template>
        <template v-slot:item.loadcargoWeight="{ item }">
          {{ item.ship.cargoWeight }}/{{ item.ship.loadWeight }}
        </template>
          <template v-slot:item.port="{ item }">
          {{ item.extended.previousPort }}/{{ item.extended.nextPort }}
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
import { pubApi as pub } from '@/api/pub'
import { pscApi as psc } from '@/api/plan'
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
      setheight: window.innerHeight - 205,
      client: new psc.BerthingPlanClient('', this.$axios),
      binfoclient: new pub.BerthInfoClient('', this.$axios),
      periodclient: new psc.PlanPeriodClient('', this.$axios),
      // 时间
      date: '',
      // 时段
      timespannow: 0,
      menu: false,
      headers: [
        { text: '港池名称', groupable: true, sortable: true, value: 'plan.harbor' },
        { text: '', groupable: false, sortable: false, value: 'harbor' },
        { text: '中文船名', groupable: false, width: '130', sortable: false, value: 'ship.cnName' },
        { text: '英文船名', groupable: false, width: '130', sortable: false, value: 'ship.name' },
        { text: '乘潮', groupable: false, width: '60', sortable: false, align: 'center', value: 'plan.isTide' },
        { text: '引航', groupable: false, width: '60', sortable: false, align: 'center', value: 'plan.isPilotage' },
        { text: '动作', groupable: false, width: '100', sortable: false, value: 'plan.actionPlan' },
        { text: '泊位', groupable: false, width: '100', sortable: false, value: 'plan.berthNo' },
        { text: '拖轮', groupable: false, width: '100', sortable: false, value: 'plan.tugs' },
        { text: '货种', groupable: false, width: '100', sortable: false, value: 'ship.goodsType' },
        { text: '代理', groupable: false, width: '100', sortable: false, value: 'ship.agent' },
        { text: '靠离泊时间', groupable: false, width: '120', sortable: true, value: 'plan.berthingTime' },
        { text: '船长/船宽(米)', groupable: false, width: '130', sortable: false, value: 'shipLengthWidth' },
        { text: '前/后吃水(米)', groupable: false, width: '130', sortable: false, value: 'frontbehindDraft' },
        { text: '载货量/载重吨', groupable: false, width: '130', sortable: false, value: 'loadcargoWeight' },
        { text: '上一港/下一港', groupable: false, width: '150', sortable: false, align: 'center', value: 'port' },
        { text: '锚时', groupable: false, width: '130', sortable: false, value: 'extended.anchorTime' },
        { text: '机构名称', groupable: false, width: '280', sortable: true, value: 'plan.orgName' }
      ],
      desserts: [],
      showAll: true,
      loading: false,
    }
  },
  filters: {
    formatPlan: function (val) {
      return actionPlanFormat(val)
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
  mounted () {
    const that = this
    window.onresize = function temp () {
      // page 59; pageheader 64;pageheader dense 48;container padding top bottom 12px; appbar 64
      that.setheight = window.innerHeight - 212 + 59
    }
  },
  destroyed () {
    window.onresize = ''
  },
  created () {
    this.setheight = window.innerHeight - 212 + 59
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
    showAll () {
      this.getdata()
    }
  },
  methods: {
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
    getdata: async function () {
      this.loading = true
      this.client.getByPeriod(this.date, this.timespannow)
        .then(res => {
          let list = res
          if (this.showAll === false) {
            list = list.filter(item => (item.plan.tugCorp).indexOf('曹') > -1)
          }
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
        })
        .finally(() => {
          this.loading = false
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
.portrait.v-card {
  margin: 0 auto;
  max-width: 600px;
  width: 100%;
}

.cancelline {
  text-decoration: line-through;
}
</style>
