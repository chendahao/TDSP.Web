<template>
  <div>
    <PageHeader headertitle="动态计划查询">
      <!-- 日期选择框 -->
      <v-row >
        <v-col
          cols="3"
          sm="3"
          md="3"
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
        </v-col>
        <v-col
          cols="3"
          sm="3"
          md="3"
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
        </v-col>
      </v-row>
      <v-spacer></v-spacer>
      <v-text-field
        class="ma-2"
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
        <template v-slot:item.isTide="{ item }">
          {{ item.isTide===true?'是':'否' }}
        </template>
        <template v-slot:item.actionPlan="{ item }">
         {{ item.actionPlan | formatPlan}}
        </template>
        <template v-slot:item.berthingTime="{ item }">
          {{ item.berthingTime | daytimeFormat }}
        </template>
        <template v-slot:item.planTime="{ item }">
          {{ item.planTime | daytimeFormat }}
        </template>
        <template v-slot:item.planState="{ item }">
          {{ item.planState==-1?'是':'否' }}
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
import api from '@/api/plan/PlanSummaryApi'
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
        { text: '是否乘潮', sortable: true, value: 'isTide' },
        { text: '计划动作', sortable: true, value: 'actionPlan' },
        { text: '靠离泊位', sortable: true, value: 'berth' },
        { text: '申报时间', sortable: true, value: 'berthingTime' },
        { text: '调度时间', sortable: true, value: 'planTime' },
        { text: '是否取消', sortable: true, value: 'planState' },
        { text: '检查结果', sortable: true, value: 'checkresult' }
      ],
      desserts: [],
      loading: false,
      menu: false
    }
  },
  filters: {
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
      let { data } = await planperiod.GetNext()
      this.date = dayjs(data.planDate).format('YYYY-MM-DD')
      this.timespannow = data.timespan
    },
    gettimespans: async function () {
      this.client.timespans().then(res => {
        this.timespan = res
      })
    },
    getdata: async function () {
      this.loading = true
      let data = await api.GetByPeriod(this.date, this.timespannow)
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
