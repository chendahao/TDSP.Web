<template>
  <div>
    <PageHeader :dense="false" headertitle="船舶计划实时看板">
     <v-spacer></v-spacer>
      <!-- <v-tooltip bottom>
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
      </v-tooltip> -->
      <v-btn text @click="getdata">
        <v-icon>refresh</v-icon>
        刷新
      </v-btn>
    </PageHeader>
    <v-container fluid>
      <div v-if="workingList.length > 0">
        <v-card-title primary-title>
          作业船舶
        </v-card-title>
        <v-row justify="start">
          <v-col md="3" sm="6" xs="12" v-for="(item, index) in workingList" :key="index">
            <v-card>
              <v-list-item two-line>
                <v-list-item-action class="mr-1">
                  <v-avatar :color="setHarbor(item.plan.harbor)" size="32">
                    <span class="white--text headline" style="font-size:0.9rem !important">{{ item.plan.harbor | formatHarbor2 }}</span>
                  </v-avatar>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title :title="item.ship.cnName">{{item.ship.cnName}}<span style="font-size: small;color: gray;">({{item.ship.name}})</span></v-list-item-title>
                  <v-list-item-subtitle>
                    <v-chip label small class="ma-1">{{ item.plan.actionPlan | formatPlan }}</v-chip>
                    <v-chip label small class="ma-1">{{ item.plan.berthNo }}</v-chip>
                  </v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action v-if="item.plan.isTide || item.plan.isPilotage" style="display: flex;flex-direction: row;">
                  <v-chip small color="info" v-if="item.plan.isTide" title="乘潮">乘</v-chip>
                  <v-chip small color="info" v-if="item.plan.isPilotage" title="引航">引</v-chip>
                </v-list-item-action>
              </v-list-item>
              <v-divider></v-divider>
              <v-card flat>
                <v-list>
                  <v-list-item-group
                  >
                    <v-list-item
                      v-for="(tug, index) in item.tug"
                      :key="index"
                      dense
                      color="blue-grey"
                    >
                      <v-list-item-content>
                        <v-list-item-title>{{tug.name}}-{{tug.startTime}}</v-list-item-title>
                        <v-list-item-subtitle v-if="tug.remark">{{tug.remark}}</v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list-item-group>
                </v-list>
              </v-card>
            </v-card>
          </v-col>
        </v-row>
      </div>
      <div v-if="completedList.length > 0">
        <v-card-title primary-title>
          作业完毕船舶
        </v-card-title>
        <v-row>
          <v-col md="3" sm="6" xs="12" v-for="(item, index) in completedList" :key="index">
            <v-card>
              <v-expansion-panels accordion flat>
                <v-expansion-panel>
                  <v-expansion-panel-header style="height:64px;padding: 0px">
                    <v-list-item two-line>
                      <v-list-item-action class="mr-1">
                        <v-avatar :color="setHarbor(item.plan.harbor)" size="32">
                          <span class="white--text headline" style="font-size:0.9rem !important">{{ item.plan.harbor | formatHarbor2 }}</span>
                        </v-avatar>
                      </v-list-item-action>
                      <v-list-item-content>
                        <v-list-item-title>{{item.ship.cnName}}</v-list-item-title>
                        <v-list-item-subtitle>{{item.ship.name}}</v-list-item-subtitle>
                      </v-list-item-content>
                      <v-list-item-action style="display: flex;flex-direction: row;">
                        <v-chip label small>{{ item.plan.actionPlan | formatPlan }}</v-chip>
                        <v-chip small color="info" v-if="item.plan.isTide">乘</v-chip>
                        <v-chip small color="info" v-if="item.plan.isPilotage">引</v-chip>
                      </v-list-item-action>
                    </v-list-item>
                  </v-expansion-panel-header>
                  <v-expansion-panel-content style="padding: 0px">
                    <v-list>
                      <v-list-item-group
                      >
                        <v-list-item
                          v-for="(tug, index) in item.tug"
                          :key="index"
                          dense
                          color="blue-grey"
                        >
                          <v-list-item-content>
                            <v-list-item-title>{{tug.name}}-{{tug.startTime}}</v-list-item-title>
                            <v-list-item-subtitle v-if="tug.remark">{{tug.remark}}</v-list-item-subtitle>
                          </v-list-item-content>
                        </v-list-item>
                      </v-list-item-group>
                    </v-list>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-card>
          </v-col>
        </v-row>
      </div>
      <div v-if="waitingList.length > 0">
        <v-card-title primary-title>
          待作业船舶
        </v-card-title>
        <v-row>
          <v-col md="3" sm="6" xs="12" v-for="(item, index) in waitingList" :key="index">
            <v-card>
              <v-list-item two-line>
                <v-list-item-action class="mr-1">
                  <v-avatar :color="setHarbor(item.plan.harbor)" size="32">
                    <span class="white--text headline" style="font-size:0.9rem !important">{{ item.plan.harbor | formatHarbor2 }}</span>
                  </v-avatar>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title>{{item.ship.cnName}}</v-list-item-title>
                  <v-list-item-subtitle>{{item.ship.name}}</v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action style="display: flex;flex-direction: row;">
                  <v-chip label small>{{ item.plan.actionPlan | formatPlan }}</v-chip>
                  <v-chip small color="info" v-if="item.plan.isTide">乘</v-chip>
                  <v-chip small color="info" v-if="item.plan.isPilotage">引</v-chip>
                </v-list-item-action>
              </v-list-item>
            </v-card>
          </v-col>
        </v-row>
      </div>
    </v-container>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import dayjs from 'dayjs'
import { actionPlanFormat } from '@/plugins/format'
import PageHeader from '@/components/PageHeader'
import { PlanStatus } from '@/mock/tug'
import { orderBy } from 'lodash'
export default {
  components: {
    PageHeader
  },
  data () {
    return {
      desserts: [],
      workingList: [],
      waitingList: [],
      completedList: [],
      showAll: false,
      loading: false,
      model: 1
    }
  },
  computed: {
    ...mapState('tabledense', [
      'tableDense'
    ])
  },
  created () {
    this.setheight = window.innerHeight - 212 + 59
    this.getdata()
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
  watch: {
    showAll () {
      this.getdata()
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
  methods: {
    getdata () {
      this.loading = true
      setTimeout(() => {
        let list = PlanStatus()
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
        const datalist = orderBy(list, ['plan.harbor'], ['asc'])
        this.workingList = datalist.filter(item => item.status === 'working')
        this.waitingList = datalist.filter(item => item.status === 'waiting')
        this.completedList = datalist.filter(item => item.status === 'completed')
        this.loading = false
      }, 150)
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
