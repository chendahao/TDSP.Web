<template>
  <div>
    <v-card>
      <v-data-table
        :headers="headers"
        :items="desserts"
        class="elevation-1"
        disable-pagination
        hide-default-footer
        :search="search"
        :height="setheight"
        fixed-header
        :loading="loading"
        :dense="tableDense"
      >
        <template v-slot:item.actionPlan="{ item }">
          {{ item.plan.actionPlan | formatPlan}}
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
import { pscApi as psc } from '@/api/plan'
import { actionPlanFormat } from '@/plugins/format'
import mixin from './mixin.js'
export default {
  props: [
    'loading',
    'desserts',
    'search'
  ],
  mixins: [mixin],
  data () {
    return {
      setheight: window.innerHeight - 205,
      headers: [
        { text: '中文船名', sortable: false, width: '130', value: 'ship.cnName' },
        { text: '英文船名', sortable: false, width: '200', value: 'ship.name' },
        { text: '国籍', sortable: false, width: '130', value: 'ship.nationality' },
        { text: '锚时', sortable: false, width: '130', value: 'anchorTime' },
        { text: '计划动作', sortable: false, width: '130', value: 'actionPlan' },
        { text: '船长/船宽(米)', sortable: false, width: '130', value: 'shipLengthWidth' },
        { text: '前/后吃水(米)', sortable: false, width: '130', value: 'frontbehindDraft' },
        { text: '载货量/载重吨', sortable: false, width: '130', value: 'loadcargoWeight' },
        { text: '代理', sortable: false, width: '130', value: 'ship.agent' },
        { text: '机构名称', groupable: false, width: '280', sortable: false, value: 'plan.orgName' }
      ]
    }
  },
  filters: {
    formatPlan: function (val) {
      return actionPlanFormat(val)
    }
  },
  computed: {
    ...mapState('tabledense', [
      'tableDense'
    ])
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
