<template>
  <v-dialog
    v-model="dialogInfo"
    scrollable
    :overlay="false"
    @click:outside="clickoutside"
    max-width="400px"
    transition="dialog-transition"
  >
    <v-card v-if="hasInfo">
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title>{{planInfo.ship.cnName}}</v-list-item-title>
          <v-list-item-subtitle>{{planInfo.ship.name}}</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-flex>
            <v-chip label class="ma-1" color="green" dark>{{planInfo.plan.actionPlan}}</v-chip>
            <v-chip label class="ma-1">{{planInfo.plan.berthNo}}</v-chip>
          </v-flex>
        </v-list-item-action>
      </v-list-item>
      <v-card-text class="mt-2">
        <v-row no-gutters>
          <v-col md="2">船长:</v-col>
          <v-col md="4" class="">{{planInfo.ship.cnName}}</v-col>
          <v-col md="2">船长:</v-col>
          <v-col md="4" class="">{{planInfo.ship.cnName}}</v-col>
          <v-col md="2">船长:</v-col>
          <v-col md="4" class="">{{planInfo.ship.cnName}}</v-col>
          <v-col md="2">船长:</v-col>
          <v-col md="4" class="">{{planInfo.ship.cnName}}</v-col>
          <v-col md="2">船长:</v-col>
          <v-col md="4" class="">{{planInfo.ship.cnName}}</v-col>
          <v-col md="2">船长:</v-col>
          <v-col md="4" class="">{{planInfo.ship.cnName}}</v-col>
          <v-col md="2">船长:</v-col>
          <v-col md="4" class="">{{planInfo.ship.cnName}}</v-col>
          <v-col md="2">船长:</v-col>
          <v-col md="4" class="">{{planInfo.ship.cnName}}</v-col>
          <v-col md="2">船长:</v-col>
          <v-col md="4" class="">{{planInfo.ship.cnName}}</v-col>
          <v-col md="2">船长:</v-col>
          <v-col md="4" class="">{{planInfo.ship.cnName}}</v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<script>
// api get plan Info
export default {
  props: ['show', 'ship'],
  data () {
    return {
      hasInfo: false,
      planInfo: {},
      dialogInfo: false
    }
  },
  watch: {
    show (val) {
      if (val && !this.dialogInfo) {
        this.getPlanInfo()
      }
    }
  },
  methods: {
    getPlanInfo () {
      this.planInfo = {
        audit: {
          auditStatus: 'Pass',
          auditTime: '2021-06-03T16:00:02.3550443',
          reviewedBy: 'wangjian'
        },
        syncStatus: 'Default',
        berthingPlanId: '00002021-0603-1339-75a7-3a0001659e1e',
        plan: {
          orgName: '华能曹妃甸港口有限公司',
          berthingTime: '2021-06-03T19:00:00',
          harbor: '开敞',
          berthNo: '华能3',
          tugs: 2,
          tugCorp: '曹拖',
          actionPlan: '靠泊',
          isTide: false,
          isPilotage: false,
          sortKey: '',
          periodCode: 'BP20210603-3',
          planDate: '2021-06-03T00:00:00',
          timespan: 3
        },
        ship: {
          shipLength: 190,
          shipWidth: 28,
          frontDraft: 5.1,
          behindDraft: 5.3,
          goodsType: '煤炭',
          shipType: '货轮',
          loadWeight: 37031,
          cargoWeight: 0,
          agent: '新翕昊',
          maxDraft: 5.3,
          imo: '',
          nationality: '中国',
          callSign: '',
          mmsi: '413363730',
          name: 'JI LING 96',
          cnName: '吉领96'
        },
        extended: {
          shipAttributes: '内',
          previousPort: '靖江',
          nextPort: '靖江',
          anchorTime: null
        }
      }
      this.hasInfo = true
      this.dialogInfo = true
    },
    clickoutside () {
      this.hasInfo = false
      this.planInfo = {}
      this.dialogInfo = false
      this.$emit('CallBack', false)
    }
  }
}
</script>
