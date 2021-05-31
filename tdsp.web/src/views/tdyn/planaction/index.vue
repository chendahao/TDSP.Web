<template>
  <div>
    <PageHeader headertitle="计划执行查询">
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
    </PageHeader>
    <v-container fluid>
      <v-data-table
        :headers="headers"
        :items="desserts"
        class="elevation-1"
        hide-default-footer
        disable-pagination
        sort-by="harbor"
        :search="search"
        :loading="loading"
        :dense="tableDense"
      >
        <template v-slot:item.shipNameCn="{ item }">
          <span :title="item.mmsi">{{ item.shipNameCn }}</span>
        </template>
        <template v-slot:item.shipNameEn="{ item }">
          <span :title="item.mmsi">{{ item.shipNameEn }}</span>
        </template>
        <template v-slot:item.actionPlan="{ item }">
          {{ item.actionPlan | formatPlan }}
        </template>
        <template v-slot:item.actionPlan="{ item }">
          {{ item.actionPlan | formatPlan }}
        </template>
        <template v-slot:item.planTime="{ item }">
          {{ item.planTime | daytimeFormat }}
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
        <template v-slot:no-results>
          <v-alert :value="true" color="error" icon="warning">
            没有找到 "{{ search }}"  相关数据
          </v-alert>
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
import api from '@/api/plan/PlanActionApi'
import dayjs from 'dayjs'
import planperiod from '@/api/plan/PlanPeriodApi'
import PageHeader from '@/components/PageHeader'
export default {
  components: {
    PageHeader
  },
  data () {
    return {
      search: '',
      timespan: [],
      // 时间
      date: '',
      // 时段
      timespannow: 0,
      headers: [
        { text: '港池', sortable: true, value: 'harbor' },
        { text: '中文船名', sortable: true, value: 'shipNameCn' },
        { text: '英文船名', sortable: true, value: 'shipNameEn' },
        { text: '计划动作', sortable: false, value: 'actionPlan' },
        { text: '靠离泊位', sortable: false, value: 'berth' },
        // { text: '船舶代理', sortable: false, width: '100' },
        { text: '调度时间', sortable: false, value: 'planTime' },
        { text: '开始时间', sortable: false, value: 'startTime' },
        { text: '结束时间', sortable: false, value: 'overTime' },
        { text: '暂停时间', sortable: false, value: 'pauseTime' },
        { text: '暂停原因', sortable: false, value: 'causes' },
        { text: '状态', sortable: false, value: 'state' },
        { text: '晚点情况', sortable: false, value: 'lateTime' }
      // { text: '航行状态', sortable: false }
      ],
      desserts: [],
      loading: false,
      menu: false
    }
  },
  filters: {
    fromatStatus: function (val) {

    },
    formatVal: function (val) {
      if (val < 0) {
        return ''
      } else {
        return val
      }
    },
    formatPlan: function (val) {
      switch (val) {
        case -33:
          return '移泊靠'
        case -17:
          return '正在离泊'
        case -1:
          return '离泊'
        case 1:
          return '靠泊'
        case 17:
          return '正在靠泊'
        case 33:
          return '移泊离'
        default:
          return '其他'
      }
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
    this.getplanperiod()
      .then(
        res => {
        // 获取数据
          this.getdata()
        }
      )
    this.gettimespans()
  },
  methods: {
    // 获取当前时间和时段
    getplanperiod: async function () {
      let { data } = await planperiod.GetCurrent()
      this.date = dayjs(data.planDate).format('YYYY-MM-DD')
      this.actiondate = this.date
      this.timespannow = data.timespan
    },
    gettimespans: async function () {
      this.client.timespans().then(res => {
        this.timespan = res
      })
    },
    getdata: async function () {
      this.loading = true
      let data = await api.GetAll(this.date, this.timespannow)
      this.desserts = data.data
      this.loading = false
    },
    getstyle (item) {
      if (
        item.checkresult !== null &&
        item.checkresult !== '结果正常' &&
        item.checkresult !== ''
      ) {
        if (item.checkdetails.indexOf('放行') < 0) {
          return 'color: red;'
        }
      }
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
