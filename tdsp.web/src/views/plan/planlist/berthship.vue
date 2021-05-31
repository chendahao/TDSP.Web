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
        group-by="harbor"
        sort-by="berthNo"
        :height="setheight"
        fixed-header
        show-group-by
        :loading="loading"
        :dense="tableDense"
      >
        <template v-slot:group.header="{group, groupBy, items, isOpen, toggle, remove}">
          <!-- 港池分组 -->
          <td :colspan="headers.length">
            <v-icon @click="toggle">
              {{ isOpen ? 'remove' : 'add' }}
            </v-icon>
            <span>港池名称：{{items[0].harbor | formatHarbor}}</span>
            <span> | 数量{{ getShipCount(items[0].harbor)}}</span>
          </td>
        </template>
        <template v-slot:item.shipLengthWidth="{ item }">
          <div v-if="item.shipLength !=='' && item.shipWidth !==''">
            {{ item.shipLength }}/{{ item.shipWidth }}
          </div>
        </template>
        <template v-slot:item.frontbehindDraft="{ item }">
          <div v-if="item.frontDraft !=='' && item.behindDraft !==''">
            {{ item.frontDraft }}/{{ item.behindDraft }}
          </div>
        </template>
        <template v-slot:item.loadcargoWeight="{ item }">
          <div v-if="item.loadWeight !=='' && item.cargoWeight !==''">
            {{ item.cargoWeight }}/{{ item.loadWeight }}
          </div>
        </template>
        <template v-slot:item.berthTime="{ item }">
          {{ item.berthTime | daytimeFormat  }}
        </template>
        <template v-slot:item.actionPlan="{ item }">
          <div v-if="item.actionPlan !== ''">
            {{ item.actionPlan | formatPlan }}
          </div>
        </template>
        <template v-slot:no-data>
          <span>当前时段没有数据</span>
        </template>
        <template v-slot:no-results>
          <v-alert :value="true" color="error" icon="info">
            没有找到 "{{ search }}" 相关数据
          </v-alert>
        </template>
      </v-data-table>

    </v-card>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { pscApi as psc } from '@/api/plan'
import { pubApi as pub } from '@/api/pub'
import mixin from './mixin.js'
import { actionPlanFormat } from '@/plugins/format'
export default {
  props: [
    'loading',
    'desserts',
    'search'
  ],
  mixins: [mixin],
  data () {
    return {
      client: new psc.BerthShipClient('', this.$axios),
      binfoclient: new pub.BerthInfoClient('', this.$axios),
      setheight: window.innerHeight - 205,
      headers: [
        { text: '港池名称', groupable: true, sortable: true, value: 'harbor' },
        { text: '泊位', groupable: false, width: '100', sortable: false, value: 'berthNo' },
        { text: '中文船名', groupable: false, width: '130', sortable: false, value: 'cnName' },
        { text: '英文船名', groupable: false, width: '200', sortable: false, value: 'name' },
        { text: '国籍', groupable: false, width: '100', sortable: false, value: 'nationality' },
        { text: '船长/船宽(米)', groupable: false, width: '120', sortable: false, value: 'shipLengthWidth' },
        { text: '前/后吃水(米)', groupable: false, width: '120', sortable: false, value: 'frontbehindDraft' },
        { text: '靠妥泊位时间', groupable: false, width: '130', sortable: false, value: 'berthTime' },
        { text: '动作', groupable: false, width: '100', sortable: false, value: 'actionPlan' },
        { text: '货种', groupable: false, width: '100', sortable: false, value: 'goodsType' },
        { text: '载货量/载重吨', groupable: false, width: '130', sortable: false, value: 'loadcargoWeight' },
        { text: '代理', groupable: false, width: '100', sortable: false, value: 'agent' },
        { text: '机构名称', groupable: false, width: '280', sortable: false, value: 'orgName' }
      ],
      menu: false,
      item: {
        harbor: '',
        berthNo: '',
        cnName: '',
        name: '',
        nationality: '',
        shipLength: '',
        shipWidth: '',
        frontDraft: '',
        behindDraft: '',
        loadWeight: '',
        cargoWeight: '',
        berthTime: '',
        actionPlan: '',
        goodsType: '',
        agent: '',
        orgName: ''
      }
    }
  },
  filters: {
    formatPlan: function (val) {
      return actionPlanFormat(val)
    },
    formatVal: function (val) {
      if (val < 0) {
        return ''
      } else {
        return val
      }
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
  methods: {
    // getdata: async function () {
    //   this.loading = true
    //   this.binfoclient.getAll(999)
    //     .then(res => {
    //       const all = []
    //       const berthList = res.values
    //       this.client.getByPeriod(this.date, this.timespan)
    //         .then(plans => {
    //           let list = plans
    //           this.$emit('getLength2', plans.length)
    //           for (let j = 0; j < berthList.length; j++) {
    //             const element = berthList[j]
    //             let item = {
    //               harbor: element.harbor,
    //               berthNo: element.berthNo,
    //               cnName: '',
    //               name: '',
    //               nationality: '',
    //               shipLength: '',
    //               shipWidth: '',
    //               frontDraft: '',
    //               behindDraft: '',
    //               loadWeight: '',
    //               cargoWeight: '',
    //               berthTime: '',
    //               actionPlan: '',
    //               goodsType: '',
    //               agent: '',
    //               orgName: element.orgName
    //             }
    //             if (item.harbor.indexOf('一') > -1) {
    //               item.harbor = '1' + item.harbor
    //             } else if (item.harbor.indexOf('二') > -1) {
    //               item.harbor = '2' + item.harbor
    //             } else if (item.harbor.indexOf('三') > -1) {
    //               item.harbor = '3' + item.harbor
    //             } else {
    //               item.harbor = '0' + item.harbor
    //             }
    //             for (let i = 0; i < list.length; i++) {
    //               if (list[i].berthNo === item.berthNo) {
    //                 item.cnName = list[i].ship.cnName
    //                 item.name = list[i].ship.name
    //                 item.nationality = list[i].ship.nationality
    //                 item.shipLength = list[i].ship.shipLength
    //                 item.shipWidth = list[i].ship.shipWidth
    //                 item.frontDraft = list[i].ship.frontDraft
    //                 item.behindDraft = list[i].ship.behindDraft
    //                 item.loadWeight = list[i].ship.loadWeight
    //                 item.cargoWeight = list[i].ship.cargoWeight
    //                 item.berthTime = list[i].berthTime
    //                 item.actionPlan = list[i].plan.actionPlan
    //                 item.goodsType = list[i].ship.goodsType
    //                 item.agent = list[i].ship.agent
    //               }
    //             }
    //             all.push(item)
    //           }
    //           this.desserts = all
    //         })
    //         .finally(() => {
    //           this.loading = false
    //         })
    //     })
    // },
    getShipCount (name) {
      const c = this.desserts.filter(data => data.harbor === name && data.cnName !== '')
      return c.length
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
