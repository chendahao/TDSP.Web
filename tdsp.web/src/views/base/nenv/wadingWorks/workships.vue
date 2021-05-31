<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="desserts"
      class="elevation-1"
      :loading="loading"
      hide-default-footer
      sort-by
      :dense="tableDense"
    >
      <template v-slot:item.times="{ item }">
          {{item.times | dateFormat}}
        </template>
     <template v-slot:item.actions="{ item }">
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-icon
              color="primary"
              v-on="on"
              @click="edit(item.wadingWorksShipsId)"
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
              @click="deleteitem(item.wadingWorksShipsId)"
            >
              delete
            </v-icon>
          </template>
          <span>删除</span>
        </v-tooltip>
     </template>
     <template v-slot:no-data>
        <v-card flat>
          <v-card-text>当前工程没有添加相关船舶</v-card-text>
        </v-card>
      </template>
    </v-data-table>
    <v-dialog
      v-model="dialog"
      persistent
      max-width="500px"
    >
      <v-card>
        <v-card-title>
          <span class="headline">相关船舶编辑</span>
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
                      ></v-text-field>
                    </template>
                    <v-date-picker v-model="editedItem.times" @input="menu = false" locale="zh-cn" :dayFormat="dayformat"></v-date-picker>
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
  </div>
</template>
<script>
import { mapState } from 'vuex'
import api from '@/api/navenv/WadingWorksApi'
import dayjs from 'dayjs'
export default {
  props: {
    workId: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      headers: [
        { text: 'MMSI', sortable: false, value: 'mmsi' },
        { text: '有效时间', sortable: false, value: 'times' },
        { text: '备注', sortable: false, value: 'remarks' },
        { text: '操作', sortable: false, align: 'center', value: 'actions' }
      ],
      dialog: false,
      desserts: [],
      loading: false,
      menu: false,
      editedItem: {
        wadingWorksShipsId: '00000000-0000-0000-0000-000000000000',
        mMSI: '',
        times: '',
        remarks: '',
        worksI: ''
      },
      defaultItem: {
        wadingWorksShipsId: '00000000-0000-0000-0000-000000000000',
        mMSI: '',
        times: '',
        remarks: '',
        worksI: ''
      }
    }
  },
  computed: {
    ...mapState('tabledense', [
      'tableDense'
    ])
  },
  created () {
    this.id = this.$route.query.id
    if (this.id !== -1) {
      this.getdata()
    }
  },
  watch: {
    pagination: {
      handler (newval, oldval) {
        if (oldval.groupBy) {
          this.getdata()
        }
      },
      deep: true
    }
  },
  methods: {
    getdata: async function () {
      this.loading = true
      let { data } = await api.GetShips(this.workId, this.pagination)
      this.desserts = data
      this.loading = false
    },
    edit: async function (id) {
      this.dialog = true
      let { data } = await api.GetShipById(id)
      this.editedItem = data
      this.editedItem.times = dayjs(this.editedItem.times).format('YYYY-MM-DD')
    },
    deleteitem: async function (id) {
      let { data } = await api.DeleteShip(id)
      if (data.code === 0) {
        this.message.ShowMessage('删除数据成功', 'success')
        this.getdata()
      } else {
        this.message.ShowMessage('删除数据出错', 'error')
      }
    },
    cancel: function () {
      this.dialog = false
      this.$refs.form.reset()
    },
    save: function () {
      if (this.$refs.form.validate()) {
        // 保存
        this.dialog = false
        this.getdata()
      }
    }
  }
}
</script>
