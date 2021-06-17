<template>
  <div>
    <PageHeader :dense="false" headertitle="拖轮实时作业看板">
      <v-spacer></v-spacer>
      <v-btn color="primary" @click="addJob">
        <v-icon>add</v-icon>
        增加作业
      </v-btn>
      <v-btn text @click="getdata">
        <v-icon>refresh</v-icon>
        刷新
      </v-btn>
    </PageHeader>
    <v-container fluid>
      <v-row justify="start">
        <v-col md="3" sm="6" xs="12" v-for="(item, index) in workingList" :key="index">
          <v-card v-if="item.hasWork" :loading="loading">
            <v-card-title style="padding: 5px 16px 0px 16px;">
              <img src="@/assets/shipicon.png" class="mr-1"/>
              {{ item.tug }}
            </v-card-title>
            <v-list>
              <template
                v-for="(work, index2) in item.work"
                no-action
              >
                <v-list-item
                  :key="index2"
                >
                  <v-list-item-avatar>
                    <v-avatar
                      color="primary"
                      size="36"
                    >
                      <span class="white--text">{{work.type}}</span>
                    </v-avatar>
                  </v-list-item-avatar>

                  <v-list-item-content>
                    <v-list-item-title v-if="work.ship" @click="getPlanInfo(work)" style="cursor: pointer;">
                      {{work.ship}}
                      <!-- <v-tooltip top>
                        <template v-slot:activator="{ on }">
                          <v-icon small v-on="on" @click="getPlanInfo(work)">info</v-icon>
                        </template>
                        <span>关联计划</span>
                      </v-tooltip> -->
                    </v-list-item-title>
                    <v-list-item-subtitle v-if="work.startTime">开始时间：{{work.startTime}}</v-list-item-subtitle>
                    <v-list-item-subtitle v-if="work.remark">{{work.remark}}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-divider
                  v-if="index2 < item.work.length - 1"
                  :key="index2"
                  inset
                ></v-divider>
              </template>
            </v-list>
          </v-card>
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <v-card flat v-if="nowWorkList.length > 0">
        <v-card-title primary-title>
          空闲拖轮
        </v-card-title>
        <v-chip v-for="(item, index) in nowWorkList" :key="index" label class="ma-2">
          <v-icon left>
            label
          </v-icon>
          {{item.tug}}
        </v-chip>
      </v-card>
    </v-container>
    <v-dialog
      v-model="dialog"
      scrollable
      :overlay="false"
      max-width="400px"
      transition="dialog-transition"
    >
      <v-card>
        <v-card-title primary-title>
          添加拖轮作业
        </v-card-title>
        <v-card-text>
          
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="success">text</v-btn>
          <v-btn text>text</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="dialog"
      scrollable
      :overlay="false"
      max-width="400px"
      transition="dialog-transition"
    >
      <v-card v-if="hasInfo">
        <!-- <v-card-title primary-title>
          <v-spacer></v-spacer>
          <v-avatar
            color="primary"
            size="36"
          >
            <span class="white--text">{{planInfo.plan.actionPlan}}</span>
          </v-avatar>
          <v-chip label>{{planInfo.plan.berthNo}}</v-chip>
        </v-card-title> -->
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
  </div>
</template>
<script>
import PageHeader from '@/components/PageHeader'
import { TugStatus } from '@/mock/tug'
import { orderBy } from 'lodash'
export default {
  components: {
    PageHeader
  },
  data () {
    return {
      workingList: [],
      nowWorkList: [],
      loading: false,
      dialog: false,
      planInfo: {},
      dialog_job: false,
      hasInfo: false
    }
  },
  created () {
    this.getdata()
  },
  methods: {
    getdata () {
      this.loading = true
      setTimeout(() => {
        const list = TugStatus()
        const datalist = orderBy(list, ['hasWork', 'sort'], ['desc', 'asc'])
        this.workingList = datalist.filter(item => item.hasWork === true)
        this.nowWorkList = datalist.filter(item => item.hasWork === false)

        this.loading = false
      }, 150)
    },
    addJob () {
      
    },
    getPlanInfo (ship) {
      console.log(ship)
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
      this.dialog = true
    }
  }
}
</script>
