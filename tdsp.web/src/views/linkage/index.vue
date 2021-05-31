<template>
  <div>
    <PageHeader headertitle="联合指挥">
      <v-spacer></v-spacer>
      <v-btn color="primary" @click="edit('-1','add')">
        <v-icon>add</v-icon>新增
      </v-btn>
    </PageHeader>
    <v-container fluid>
      <v-tabs>
        <v-tab ripple>当前作业船舶</v-tab>
        <v-tab-item>
          <v-toolbar class="elevation-0">
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              append-icon="search"
              label="搜索"
              single-line
              hide-details
              clearable
            ></v-text-field>
          </v-toolbar>
          <v-data-table
            :headers="headers"
            :items="desserts"
            class="elevation-1"
            hide-default-footer
            :search="search"
            :loading="loading"
            :dense="tableDense"
          >
            <template v-slot:items="props">
              <td>{{ props.item.mmsi }}</td>
              <td>{{ props.item.type }}</td>
              <td>{{ props.item.info }}</td>
              <td>{{ props.item.startTime | datetimeFormat }}</td>
              <td>{{ props.item.duration }}</td>
              <td>{{ props.item.publisher }}</td>
            </template>
            <template slot="no-data">
              <span>当前日期没有相关数据</span>
            </template>
            <template v-slot:no-results>
              <v-alert :value="true" color="error" icon="info">
                没有找到 "{{ search }}" 相关数据
              </v-alert>
            </template>
          </v-data-table>
        </v-tab-item>
        <v-tab ripple>全部数据</v-tab>
        <v-tab-item>
          <history></history>
        </v-tab-item>
      </v-tabs>
    </v-container>
    <edit :show="editshow" :id="id" :type="type" v-on:CallBack="editCallback"></edit>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import api from '@/api/duty/ShipServicePlanApi'
import PageHeader from '@/components/PageHeader'
import edit from './edit'
import history from './history'
import Bus from './bus.js'
export default {
  components: {
    PageHeader,
    edit,
    history
  },
  data () {
    return {
      headers: [
        { text: 'MMSI', sortable: false, value: 'mmsi' },
        { text: '业务类型', sortable: false, value: 'type' },
        { text: '业务内容', sortable: false, value: 'info' },
        { text: '开始时间', sortable: false, value: 'startTime' },
        { text: '作业时长', sortable: false, value: 'duration' },
        { text: '发布人', sortable: false, value: 'publisher' }
      ],
      search: '',
      desserts: [],
      loading: false,
      // 删除弹窗
      delinfo: '',
      delid: '',
      show: false,
      // 编辑窗口
      id: '-1',
      type: '',
      editshow: false
    }
  },
  computed: {
    ...mapState('tabledense', [
      'tableDense'
    ])
  },
  watch: {
    pagination: {
      handler (newval, oldval) {
        if (oldval.page) {
          this.getdata()
        }
      },
      deep: true
    }
  },
  created () {
    this.getdata()
    Bus.$on('regetdate', res => {
      this.getdata()
    })
  },
  methods: {
    getdata: async function () {
      this.loading = true
      let { data } = await api.GetRunning()
      this.desserts = data
      this.loading = false
    },
    edit (id, type) {
      this.id = id
      this.type = type
      this.editshow = true
    },
    editCallback: async function (msg) {
      // this.getdata()
      this.editshow = false
    }
  }
}
</script>
