<template>
  <div>
    <PageHeader headertitle="涉水工程管理">
      <v-spacer></v-spacer>
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn
            class="ma-2"
            color="green"
            dark
            v-on="on"
            @click="edit('-1','edit')"
          >
            <v-icon>add</v-icon>
            新增
          </v-btn>
        </template>
        <span>新增涉水工程</span>
      </v-tooltip>
    </PageHeader>
    <v-container fluid>
      <v-data-table
        :headers="headers"
        :items="desserts"
        single-expand
        show-expand
        class="elevation-1"
        :server-items-length="totalDesserts"
        :options.sync="pagination"
        :footer-props="{
          'items-per-page-options':rowsperpageitems
        }"
        :loading="loading"
        item-key="wadingWorksId"
        :dense="tableDense"
      >
        <template v-slot:item.startTime="{ item }">
          {{ item.startTime | dateFormat}}
        </template>
        <template v-slot:item.overtime="{ item }">
          {{ item.overtime | dateFormat}}
        </template>
        <!-- <template v-slot:item.isMonitor="{ item }">
          {{ item.typeCross==true?'是':'否' }}
        </template> -->
        <template v-slot:item.actions="{ item }">
          <v-tooltip bottom>
            <span>相关船舶</span>
          </v-tooltip>
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-icon
                color="green"
                v-on="on"
                @click="add(item.wadingWorksId,-1)"
              >
                add_box
              </v-icon>
            </template>
            <span>添加船舶</span>
          </v-tooltip>
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-icon
                color="info"
                v-on="on"
                @click="edit(item.wadingWorksId,'detail')"
              >
                view_quilt
              </v-icon>
            </template>
            <span>详细</span>
          </v-tooltip>
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-icon
                color="primary"
                v-on="on"
                @click="edit(item.wadingWorksId,'edit')"
              >
                edit
              </v-icon>
            </template>
            <span>编辑</span>
          </v-tooltip>
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-icon
                color="warning"
                v-on="on"
                @click="deleteitem(item.name,item.wadingWorksId)"
              >
                delete
              </v-icon>
            </template>
            <span>删除</span>
          </v-tooltip>
        </template>
        <template v-slot:no-data>
          <v-btn color="primary" @click="getdata">重试</v-btn>
        </template>
        <template v-slot:expanded-item="{ headers, item  }">
          <td :colspan="headers.length">
            <workships :workId="item.wadingWorksId"></workships>
          </td>
        </template>
      </v-data-table>
    </v-container>
    <v-dialog
      v-model="dialog"
      persistent
      max-width="500px"
    >
      <v-card>
        <v-card-title>
          <span class="headline">{{ formTitle }}</span>
        </v-card-title>
        <v-card-text>
          <v-container >
            <v-form
              ref="form"
              lazy-validation
            >
              <v-row >
                <v-col cols="12" sm="12" md="12">
                  <v-text-field v-model="editedItem.mmsi" label="MMSI" :rules="[v => !!v || '请输入船舶MMSI']"></v-text-field>
                </v-col>
                <v-col cols="12" sm="12" md="12">
                  <v-menu
                    ref="menu"
                    v-model="menu"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    transition="scale-transition"
                    offset-y
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model="editedItem.times"
                        label="有效时间"
                        readonly
                        v-on="on"
                        :rules="[v => !!v || '请选择开始时间']"
                      ></v-text-field>
                    </template>
                    <v-date-picker v-model="editedItem.times" @input="menu = false" locale="zh-cn" :dayFormat="dayformat"> </v-date-picker>
                  </v-menu>
                </v-col>
                <v-col cols="12" sm="12" md="12">
                  <v-textarea
                    v-model="editedItem.remarks"
                    label="备注"
                    rows="2"
                    auto-grow
                  >
                  </v-textarea>
                </v-col>
              </v-row>
            </v-form>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="cancel">取消</v-btn>
          <v-btn color="blue darken-1" text @click="save">保存</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <DeleteConfirm v-bind:show="show" v-bind:info="delinfo"  v-on:CallBack="Callback" ></DeleteConfirm>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import api from '@/api/navenv/WadingWorksApi'
import workships from '@/views/base/nenv/wadingWorks/workships'
import DeleteConfirm from '@/components/DeleteConfirm'
import PageHeader from '@/components/PageHeader'
export default {
  components: {
    workships,
    DeleteConfirm,
    PageHeader
  },
  data () {
    return {
      dialog: false,
      expand: false,
      formTitle: '新增船舶',
      menu: false,
      headers: [
        { text: '工程名称', sortable: false, value: 'name' },
        { text: '开始时间', sortable: false, value: 'startTime' },
        { text: '结束时间', sortable: false, value: 'overtime' },
        { text: '施工单位', sortable: false, value: 'workingUnit' },
        // { text: '是否开启监控', sortable: false, value: 'isMonitor' },
        { text: '备注', sortable: false, value: 'remarks' },
        { text: '操作', sortable: false, align: 'center', value: 'actions' }
      ],
      desserts: [],
      pagination: {
        groupBy: [],
        groupDesc: [],
        itemsPerPage: 10,
        multiSort: false,
        mustSort: false,
        page: 1,
        sortBy: [],
        sortDesc: []
      },
      rowsperpageitems: [10, 20, 50],
      totalDesserts: 0,
      loading: false,
      editedItem: {
        wadingWorksShipsId: '00000000-0000-0000-0000-000000000000',
        mmsi: '',
        times: '',
        remarks: '',
        worksId: ''
      },
      // 删除弹窗
      delinfo: '',
      delid: '',
      show: false
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
        if (newval.itemsPerPage !== oldval.itemsPerPage || newval.page !== oldval.page || newval.sortBy !== oldval.sortBy || newval.sortDesc !== oldval.sortDesc) {
          this.getdata()
        }
      },
      deep: true
    }
  },
  activated () {
    this.getdata()
  },
  methods: {
    getdata: async function () {
      this.loading = true
      let data = await api.GetAll(this.pagination)
      this.desserts = data.data.values
      let page = data.data.page
      this.pagination.page = page.page
      this.pagination.rowsPerPage = page.pageSize
      this.totalDesserts = page.total
      this.loading = false
    },
    add: async function (workid, shipid) {
      this.editedItem.worksId = workid
      this.formTitle = '新增船舶'
      this.dialog = true
    },
    cancel: function () {
      this.dialog = false
      this.$refs.form.reset()
    },
    save: async function () {
      if (this.$refs.form.validate()) {
        // 保存
        let { data } = await api.AddShip(this.editedItem.worksId, this.editedItem)
        if (data.code === 0) {
          this.$message.success('添加数据成功')
          this.getdata()
        } else {
          this.$message.error('添加数据出错')
        }
      }
    },
    edit (id, type) {
      this.$router.push({
        path: './wadingWorks/edit',
        query: { id: id, type: type }
      })
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
          this.$message.success('删除数据成功')
          this.getdata()
        } else {
          this.$message.error('删除数据出错')
        }
      } else {
        this.delid = ''
      }
      this.show = false
    }
  }
}
</script>
