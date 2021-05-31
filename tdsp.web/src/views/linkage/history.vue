<template>
  <div>
    <v-toolbar class="elevation-0">
      <v-spacer></v-spacer>
      <v-text-field
        v-model.trim="search"
        append-icon="search"
        @click:append="datasearch"
        @keyup.enter="datasearch"
        label="关键词搜索"
        single-line
        hide-details
        clearable
      ></v-text-field>
    </v-toolbar>
    <v-data-table
      :headers="headers"
      :items="desserts"
      class="elevation-1"
      :server-items-length="totalDesserts"
      :options.sync="pagination"
      :footer-props="{
          'items-per-page-options':rowsperpageitems
        }"
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
        <td>{{ props.item.regDate | datetimeFormat }}</td>
        <td class="justify-center layout px-0">
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-icon color="primary" v-on="on" @click="edit(props.item.id,'edit')">edit</v-icon>
            </template>
            <span>编辑</span>
          </v-tooltip>
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-icon
                color="primary"
                v-on="on"
                @click="deleteitem(props.item.mmsi,props.item.id)"
              >delete</v-icon>
            </template>
            <span>删除</span>
          </v-tooltip>
        </td>
      </template>
      <template v-slot:no-results>
        <v-alert :value="true" color="error" icon="warning">
          没有找到 "{{ search }}"  相关数据
        </v-alert>
      </template>
      <template v-slot:no-data>
        <span>没有相关数据</span>
      </template>
    </v-data-table>
    <DeleteConfirm v-bind:show="show" v-bind:info="delinfo" v-on:CallBack="Callback"></DeleteConfirm>
    <edit :show="editshow" :id="id" :type="type" v-on:CallBack="editCallback"></edit>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import api from '@/api/duty/ShipServicePlanApi'
import edit from './edit'
import DeleteConfirm from '@/components/DeleteConfirm'
import Bus from './bus.js'
export default {
  components: {
    DeleteConfirm,
    edit
  },
  data () {
    return {
      headers: [
        { text: 'MMSI', sortable: false, value: 'mmsi' },
        { text: '业务类型', sortable: false, value: 'type' },
        { text: '业务内容', sortable: false, value: 'info' },
        { text: '开始时间', sortable: false, value: 'startTime' },
        { text: '作业时长', sortable: false, value: 'duration' },
        { text: '发布人', sortable: false, value: 'publisher' },
        { text: '发布时间', sortable: false, value: 'regDate' },
        { text: '操作', sortable: false, align: 'center' }
      ],
      desserts: [],
      pagination: { sortBy: 'regDate', descending: true },
      rowsperpageitems: [10, 20, 50],
      totalDesserts: 0,
      loading: false,
      menu: false,
      date: '',
      search: '',
      // 删除弹窗
      delinfo: '',
      delid: '',
      show: false,
      // 编辑窗口
      id: '',
      type: '',
      editshow: false
    }
  },
  created () {
    this.getdata()
    Bus.$on('regetdate', res => {
      this.getdata()
    })
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
  methods: {
    getdata: async function () {
      this.loading = true
      let data = await api.GetPage(this.pagination)
      this.desserts = data.data.values
      let page = data.data.page
      this.pagination.page = page.page
      this.pagination.rowsPerPage = page.pageSize
      this.totalDesserts = page.total
      this.loading = false
    },
    edit (id, type) {
      this.id = id
      this.type = type
      this.editshow = true
    },
    deleteitem (name, id) {
      this.show = true
      this.delinfo = name
      this.delid = id
    },
    // 确认删除
    Callback: async function (msg) {
      if (msg === true) {
        let { data } = await api.Delete(this.delid)
        if (data.code === 0) {
          this.message.ShowMessage('删除数据成功', 'success')
          Bus.$emit('regetdate', true)
          // this.getdata()
        }
      } else {
        this.delid = ''
      }
      this.show = false
    },
    editCallback: async function (msg) {
      // this.getdata()
      this.editshow = false
    },
    datasearch: async function () {
      let search = this.search
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
