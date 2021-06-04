<template>
  <div>
    <PageHeader :dense="false" headertitle="拖轮作业记录">
      <v-layout row wrap>
        <v-flex md4>
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
                placeholder="日期"
                hint="日期"
                width="200px"
                persistent-hint
                append-icon="event"
                readonly
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="date"
              locale="zh-cn"
              @input="menu = false"
              :dayFormat="dayformat"
            ></v-date-picker>
          </v-menu>
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
      <v-btn text @click="getdata">
        <v-icon>refresh</v-icon>
        刷新
      </v-btn>
    </PageHeader>
    <v-container fluid>
      <v-data-table
        :headers="headers"
        :items="dataList"
        class="elevation-1"
        hide-default-footer
        disable-pagination
        :height="setheight"
        fixed-header
        sort-by="id"
        group-by="tug"
        show-group-by
        :search="search"
        :loading="loading"
        :dense="tableDense"
      >
        <template v-slot:group.header="{group, groupBy, items, isOpen, toggle, remove}">
          <!-- 港池分组 -->
          <td :colspan="headers.length" @click="toggle">
            <v-icon>
              {{ isOpen ? 'remove' : 'add' }}
            </v-icon>
            <span>{{items[0].tug}}</span>
            <span> | 作业数量{{items.length}}</span>
          </td>
        </template>
        <template v-slot:item.harbor="{ item }">
        </template>
      </v-data-table>
    </v-container>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import PageHeader from '@/components/PageHeader'
import { workList } from '@/mock/tug'
import { orderBy } from 'lodash'
import dayjs from 'dayjs'
export default {
  components: {
    PageHeader
  },
  data () {
    return {
      menu: false,
      date: dayjs().format('YYYY-MM-DD'),
      setheight: window.innerHeight - 205,
      headers: [
        { text: '拖轮名称', groupable: true, sortable: true, value: 'tug' },
        { text: '', groupable: false, sortable: false, value: 'harbor' },
        { text: '作业船舶', groupable: false, sortable: false, value: 'shipName' },
        { text: '备车时间', groupable: false, sortable: false, align: 'center', value: 'time1' },
        { text: '开始时间', groupable: false, sortable: false, align: 'center', value: 'time2' },
        { text: '脱开时间', groupable: false, sortable: false, align: 'center', value: 'time3' },
        { text: '完车时间', groupable: false, sortable: false, align: 'center', value: 'time4' },
        { text: '作业状态', groupable: false, sortable: false, value: 'status' },
        { text: '备注', groupable: false, sortable: false, value: 'remark' }
      ],
      dataList: [],
      search: '',
      loading: false
    }
  },
  computed: {
    ...mapState('tabledense', [
      'tableDense'
    ])
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
  created () {
    this.setheight = window.innerHeight - 212 + 59
    this.getdata()
  },
  watch: {
    date () {
      this.getdata()
    }
  },
  methods: {
    getdata () {
      this.loading = true
      setTimeout(() => {
        this.dataList = workList()
        this.loading = false
      }, 150)
    }
  }
}
</script>
