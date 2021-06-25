<!--
  拖轮实时状态
-->
<template>
  <div>
    <PageHeader :dense="false" headertitle="拖轮配备调准">
      <v-spacer></v-spacer>
      <v-btn text @click="getdata">
        <v-icon>refresh</v-icon>
        刷新
      </v-btn>
    </PageHeader>
    <v-container fluid>
      <v-data-iterator
        :items="items"
        item-key="mmsi"
        disable-filtering
        disable-pagination
        disable-sort
        hide-default-footer
      >
        <template v-slot:default="props">
          <v-row>
            <v-col
              v-for="item in props.items"
              :key="item.name"
              cols="12"
              sm="6"
              md="2"
              lg="2"
            >
              <v-card>
                <v-card-title class="subheading font-weight-bold">
                  {{ item.name }}
                </v-card-title>

                <v-divider></v-divider>

                <v-list dense>
                  <v-list-item>
                    <v-list-item-content>作业类型:</v-list-item-content>
                    <v-list-item-content class="align-end">
                      {{ item.jobKind }}
                    </v-list-item-content>
                  </v-list-item>

                  <v-list-item>
                    <v-list-item-content>状态:</v-list-item-content>
                    <v-list-item-content class="align-end" style="display:block">
                      <v-chip label :color="getStatusColor(item.status)">
                        {{ item.status | formatStatus }}
                      </v-chip>
                    </v-list-item-content>
                  </v-list-item>

                  <v-list-item>
                    <v-list-item-content>更新时间:</v-list-item-content>
                    <v-list-item-content class="align-end">
                      {{ item.updateTime | relativeTime }}
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-card>
            </v-col>
          </v-row>
        </template>
      </v-data-iterator>
    </v-container>
  </div>
</template>
<script>
import { tugApi as api } from '@/api/tugApi'
import PageHeader from '@/components/PageHeader'
import dayjs from 'dayjs'
var relativeTime = require('dayjs/plugin/relativeTime')
var updateLocale = require('dayjs/plugin/updateLocale')
require('dayjs/locale/zh-cn')
dayjs.locale('zh-cn')
dayjs.extend(relativeTime)
dayjs.extend(updateLocale)
dayjs.updateLocale('zh-cn', {
  relativeTime: {
    future: '%s后',
    past: '%s前',
    s: '几秒',
    m: '1 分钟',
    mm: '%d 分钟',
    h: '1 小时',
    hh: '%d 小时',
    d: '1 天',
    dd: '%d 天',
    M: '1 个月',
    MM: '%d 个月',
    y: '1 年',
    yy: '%d 年'
  }
})
export default {
  components: {
    PageHeader
  },
  data () {
    return {
      client: new api.TugStateClient('', this.$axios),
      items: []
    }
  },
  created() {
    this.getdata()
  },
  filters: {
    formatStatus: function (val) {
      switch (val) {
        case 'Idle':
          return '空闲'
        case 'Scheduled':
          return '接受调度'
        case 'Running':
          return '作业中'
        case 'TugOff':
          return '脱开'
        default:
          return val
      }
    },
    relativeTime (val) {
      return dayjs(val).fromNow()
    }
  },
  methods: {
    getdata () {
      this.client.tugStateAll()
        .then(res => {
          this.items = res
        })
    },
    getStatusColor (val) {
      switch (val) {
        case 'Idle':
          return ''
        case 'Scheduled':
          return 'primary'
        case 'Running':
          return 'green'
        case 'TugOff':
          return 'info'
        default:
          return ''
      }
    }
  }
}
</script>