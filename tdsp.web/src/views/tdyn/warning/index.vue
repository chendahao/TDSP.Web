<template>
  <div>
    <PageHeader headertitle="报警记录">
      <v-row  >
        <v-col md="3">
          <v-menu
            v-model="menu1"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="startdate"
                placeholder="报警日期"
                hint="报警日期"
                persistent-hint
                append-icon="event"
                readonly
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="startdate"
              locale="zh-cn"
              @input="menu1 = false"
              :dayFormat="dayformat"
            ></v-date-picker>
          </v-menu>
        </v-col>
        <v-col md="3" class="ml-3">
          <v-select
            :items="type_items"
            item-text="text"
            item-value="id"
            v-model="type_item"
            clearable
            append-icon="format_list_bulleted"
            placeholder="报警类型"
            hint="报警类型"
            persistent-hint
          ></v-select>
        </v-col>
      </v-row>
      <v-spacer></v-spacer>
      <v-text-field
        class="ma-2"
        v-model="content"
        placeholder="报警内容"
        append-icon="event_note"
        clearable
        hide-details
        single-line
      ></v-text-field>
      <v-btn class="ma-2" color="primary" @click="pass('all')">批量处理</v-btn>
      <v-btn class="ma-2" @click="searchwarn">查询</v-btn>
    </PageHeader>
    <v-container fluid>
      <v-data-table
        v-model="selected"
        :headers="headers"
        :items="desserts"
        item-key="warningId"
        class="elevation-1"
        show-select
        :server-items-length="totalDesserts"
        :options.sync="pagination"
        :footer-props="{
          'items-per-page-options':rowsperpageitems
        }"
        :loading="loading"
      >
        <template v-slot:item.type="{ item }">
          <span style="min-width:126px">{{item.type | typeformat}}</span>
        </template>
        <template v-slot:item.regDate="{ item }">
          {{item.regDate | formatDate}}
        </template>
        <template v-slot:item.chkId="{ item }">
          <span style="min-width:90px">{{item.chkId}}</span>
        </template>
        <template v-slot:item.chkDate="{ item }">
          {{item.chkDate | formatDate}}
        </template>
        <template v-slot:item.actions="{ item }">
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-icon
                color="primary"
                v-on="on"
                @click="pass(item.warningId)"
              >
                tune
              </v-icon>
            </template>
            <span>处理</span>
          </v-tooltip>
        </template>
        <template v-slot:no-data>
          <span>当前日期没有相关数据</span>
        </template>
      </v-data-table>
    </v-container>
  </div>
</template>
<script>
import api from '@/api/duty/WarningApi'
import dayjs from 'dayjs'
import PageHeader from '@/components/PageHeader'
export default {
  components: {
    PageHeader
  },
  data () {
    return {
      selected: [],
      selectedIds: [],
      headers: [
        { text: '报警类型', sortable: false, value: 'type' },
        { text: '报警时间', sortable: false, value: 'regDate' },
        { text: '报警信息', sortable: false, value: 'message' },
        { text: 'VHF播发信息', sortable: false, value: 'vhfMsg' },
        { text: 'MMSI', sortable: false, value: 'shipMsg' },
        { text: '处理人', sortable: false, value: 'chkId' },
        { text: '处理时间', sortable: false, value: 'chkDate' },
        { text: '处理', sortable: false, align: 'center', value: 'actions' }
      ],
      status: '',
      desserts: [],
      pagination: { sortBy: 'regDate', descending: true },
      rowsperpageitems: [10, 20, 50],
      totalDesserts: 0,
      loading: false,
      type_items: [],
      type_item: null,
      content: '',
      menu1: false,
      startdate: dayjs().format('YYYY-MM-DD')
    }
  },
  watch: {
    pagination: {
      handler (newval, oldval) {
        if (oldval.page) {
          this.getdata()
        }
      },
      deep: true
    },
    selected (val) {
      this.selectedIds = val.map(res => {
        return res.warningId
      })
    },
    startdate (val, oldval) {
      this.getdata()
    },
    type_item (val) {
      this.getdata()
    }
  },
  filters: {
    typeformat: function (val) {
      switch (val) {
        case 91:
          return '智能航路'
        case 92:
          return '碰撞预警'
        case 93:
          return '航道偏离'
        case 94:
          return '走锚报警'
        case 95:
          return '自定义区域'
        case 96:
          return '报告线监控'
        case 99:
          return 'AIS信号丢失'
        case 971:
          return '定线制异常'
        case 972:
          return '定线制穿越'
        case 973:
          return '定线制追越'
        case 1027:
          return '重点船舶'
        case 1028:
          return '港池异常船舶'
        case 1201:
          return '涉水工程'
        case 1202:
          return '扣押船舶'
        case 1203:
          return '黑名单船舶'
        default:
          return ''
      }
    },
    formatDate: function (val) {
      if (val) return dayjs(val).format('YYYY-MM-DD HH:mm')
      else return ''
    }
  },
  created () {
    this.gettypes()
      .then(
        res => {
          this.getdata()
        })
  },
  methods: {

    getdata: async function () {
      this.loading = true
      let data = await api.GetPagesAsync(this.startdate, this.type_item, this.pagination)
      this.desserts = data.data.values
      let page = data.data.page
      this.pagination.page = page.page
      this.pagination.rowsPerPage = page.pageSize
      this.totalDesserts = page.total
      this.loading = false
    },
    gettypes: async function () {
      let { data } = await api.GetTypesAsync()
      this.type_items = data
    },
    pass: async function (id) {
      // 批量处理
      if (id === 'all') {
        if (this.selectedIds.length === 0) {
          this.$message.info('请先选择准备处理的报警')
          return
        }
        let { data } = await api.CheckWarning(this.selectedIds)
        if (data.code === 0) {
          this.$message.success('批量处理成功')
          this.getdata()
        } else {
          this.$message.error('处理数据出错')
        }
      } else {
        let item = []
        item.push(id)
        let { data } = await api.CheckWarning(item)
        if (data.code === 0) {
          this.$message.success('处理成功')
          this.getdata()
        } else {
          this.$message.error('处理数据出错')
        }
      }
    },
    searchwarn () {
      let search = this.content
      if (search) {
        this.pagination.searchKey = search
        this.getdata()
      } else {
        this.pagination.searchKey = null
        this.getdata()
      }
    }
  }
}
</script>
