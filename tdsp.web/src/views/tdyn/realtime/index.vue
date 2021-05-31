<template>
  <div>
    <PageHeader headertitle="实时船舶动态" style="user-select:none">
      <v-row v-show="show">
        <v-subheader>
          在航
          <span style="margin-left:5px">{{sailingcount}}</span>
        </v-subheader>
        <v-divider class="mx-2" inset vertical></v-divider>
        <v-subheader>
          靠泊
          <span style="margin-left:5px">{{berthingcount}}</span>
        </v-subheader>
        <v-divider class="mx-2" inset vertical></v-divider>
        <v-subheader>
          锚泊
          <span style="margin-left:5px">{{anchoringcount}}</span>
        </v-subheader>
        <v-divider class="mx-2" inset vertical></v-divider>
        <v-subheader>
          离港
          <span style="margin-left:5px">{{leavingcount}}</span>
        </v-subheader>
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
      <v-tabs>
        <v-tab ripple>在航船舶</v-tab>
        <v-tab-item>
          <sailing :search="search" :desserts='sailingdata'></sailing>
        </v-tab-item>
        <v-tab ripple>靠泊船舶</v-tab>
        <v-tab-item>
          <berthing :search="search" :desserts='berthingdata'></berthing>
        </v-tab-item>
        <v-tab ripple>锚泊船舶</v-tab>
        <v-tab-item>
          <anchoring :search="search" :desserts='anchoringdata'></anchoring>
        </v-tab-item>
        <v-tab ripple>离港船舶</v-tab>
        <v-tab-item>
          <leaving :search="search" :desserts='leavingdata'></leaving>
        </v-tab-item>
      </v-tabs>
    </v-container>
  </div>
</template>
<script>
import PageHeader from '@/components/PageHeader'
import sailing from '@/views/tdyn/realtime/sailing'
import berthing from '@/views/tdyn/realtime/berthing'
import anchoring from '@/views/tdyn/realtime/anchoring'
import leaving from '@/views/tdyn/realtime/leaving'
import api from '@/api/stat/RealTimeShipsApi'
var refreshdata = ''
export default {
  components: {
    PageHeader,
    sailing,
    berthing,
    anchoring,
    leaving
  },
  data () {
    return {
      search: '',
      sailingcount: 0,
      berthingcount: 0,
      anchoringcount: 0,
      leavingcount: 0,
      show: false,
      sailingdata: [],
      berthingdata: [],
      anchoringdata: [],
      leavingdata: []
    }
  },
  mounted () {
    this.getdata()
    let _this = this
    refreshdata = setInterval(function () {
      _this.getdata()
    }, 1000 * 60 * 3)
  },
  beforeDestroy () {
    clearInterval(refreshdata)
    refreshdata = ''
  },
  methods: {
    getdata: async function () {
      this.getSailing()
      this.getBerthing()
      this.getAhcnoring()
      this.getLeaving()
      this.show = true
    },
    getSailing: async function () {
      let { data } = await api.GetByUnderWay()
      this.sailingdata = data
      this.sailingcount = data.length
    },
    getBerthing: async function () {
      let { data } = await api.GetByMoored()
      this.berthingdata = data
      this.berthingcount = data.length
    },
    getAhcnoring: async function () {
      let { data } = await api.GetByAtAnchor()
      this.anchoringdata = data
      this.anchoringcount = data.length
    },
    getLeaving: async function () {
      let { data } = await api.GetLeavingShips()
      this.leavingdata = data
      this.leavingcount = data.length
    }
  }
}
</script>
