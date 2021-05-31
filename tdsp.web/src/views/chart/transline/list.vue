<template>
  <div>
    <PageHeader headertitle="流量线列表">
      <v-spacer></v-spacer>
      <v-btn class="ma-2" color="green" dark @click="edit('-1','edit')">
        <v-icon>add</v-icon>
        新增
      </v-btn>
      <v-btn class="ma-2" @click="gochart">
        <v-icon>keyboard_backspace</v-icon>
        返回图表
      </v-btn>
    </PageHeader>
    <v-container fluid>
      <v-data-table
        :headers="headers"
        :items="desserts"
        class="elevation-1"
        hide-default-footer
        disable-pagination
        :loading="loading"
        :dense="tableDense"
      >
        <template v-slot:item.actions="{ item }">
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-icon
                color="info"
                v-on="on"
                @click="edit(item.id,'detail')"
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
                @click="edit(item.id,'edit')"
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
                @click="deleteitem(item.name,item.id)"
              >
                delete
              </v-icon>
            </template>
            <span>删除</span>
          </v-tooltip>
        </template>
        <template v-slot:no-data>
          <span>没有数据</span>
        </template>
      </v-data-table>
    </v-container>
    <DeleteConfirm v-bind:show="show" v-bind:info="delinfo"  v-on:CallBack="Callback" ></DeleteConfirm>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import api from '@/api/stat/TrafficLineApi'
import DeleteConfirm from '@/components/DeleteConfirm'
import PageHeader from '@/components/PageHeader'
export default {
  components: {
    DeleteConfirm,
    PageHeader
  },
  data () {
    return {
      headers: [
        { text: '名称', sortable: false, value: 'name' },
        { text: '相关描述', sortable: false, value: 'description' },
        { text: '操作', sortable: false, value: 'actions', align: 'center' }
      ],
      desserts: [],
      loading: false,
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
        if (oldval.page) {
          this.getdata()
        }
      },
      deep: true
    }
  },
  created () {
    this.getdata()
  },
  methods: {
    getdata: async function () {
      this.loading = true
      let { data } = await api.GetAll()
      this.desserts = data
      this.loading = false
    },
    edit (id, type) {
      this.$router.push({
        path: './edit',
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
          this.message.ShowMessage('删除数据成功', 'success')
          this.getdata()
        } else {
          this.message.ShowMessage('删除数据出错', 'error')
        }
      } else {
        this.delid = ''
      }
      this.show = false
    },
    gochart () {
      this.$router.go(-1)
    }
  }
}
</script>
