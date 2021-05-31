<template>
  <div>
    <v-card>
      <v-data-table
        :headers="headers"
        :items="desserts"
        class="elevation-1"
        hide-default-footer
        disable-pagination
        :search="search"
        :loading="loading"
        :dense="tableDense"
      >
        <template v-slot:item.actionPlan="{ item }">
          {{ item.actionPlan | formatPlan}}
        </template>
        <template v-slot:no-data>
          <span>当前时段没有数据</span>
        </template>
        <template v-slot:no-results>
          <v-alert :value="true" color="error" icon="info">没有找到 "{{ search }}" 相关数据</v-alert>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import api from '@/api/plan/PlanOverShipApi'
export default {
  props: [
    'date',
    'timespan',
    'search'
  ],
  data () {
    return {
      headers: [
        { text: 'MMSI', sortable: false, value: 'mmsi' },
        { text: '英文船名', sortable: false, value: 'shipNameEn' },
        { text: '计划动作', sortable: false, value: 'actionPlan' },
        { text: '部门名称', sortable: false, value: 'orgName' }
      ],
      desserts: [],
      loading: false
    }
  },
  filters: {
    formatPlan: function (val) {
      // 移泊靠 = -33,
      // 正在离泊 = -17,
      // 离泊 = -1,
      // 靠泊 = 1,
      // 正在靠泊 = 17,
      // 移泊离 = 33
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
          return '陆岛运输'
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
    timespan: function (newVal, oldVal) {
      if (oldVal !== 0) {
        this.getdata()
      }
    }
  },
  created () {
    this.getdata()
  },
  methods: {
    getdata: async function () {
      this.loading = true
      let { data } = await api.GetByPeriod(this.date, this.timespan)
      this.desserts = data
      this.loading = false
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
