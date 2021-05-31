<template>
  <div>
    <PageHeader headertitle="船舶标识">
      <v-spacer></v-spacer>
      <!-- <v-btn color="primary" @click="edit(-1)">
        <v-icon>add</v-icon>
        新增
      </v-btn> -->
    </PageHeader>
    <v-container fluid>
      <v-data-table
        :headers="headers"
        :items="desserts"
        class="elevation-1"
        :loading="loading"
        hide-default-footer
        disable-pagination
        :dense="tableDense"
      >
        <template v-slot:item.color="{ item }">
          <svg
            viewBox="0 0 1024 1024"
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
          >
            <path d="M511.660605 71.736513l368.64 901.120074-737.280029 0z" :fill="item.color" />
          </svg>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-icon color="primary" v-on="on" @click="edit(item.id)">edit</v-icon>
            </template>
            <span>编辑</span>
          </v-tooltip>
          <!-- <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-icon
                color="primary"
                v-on="on"
                @click="delete(item.customId)"
              >
                delete
              </v-icon>
            </template>
            <span>删除</span>
          </v-tooltip>-->
        </template>
        <template v-slot:no-data>
          <v-btn color="primary" @click="getdata">重试</v-btn>
        </template>
      </v-data-table>
      <br>
      <ShipMarkersMap :markers="markers" v-if="showmap" />
    </v-container>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import api from '@/api/navenv/ShipMarkApi'
import PageHeader from '@/components/PageHeader'
import ShipMarkersMap from '@/components/ShipMarkersMap'
export default {
  components: {
    PageHeader,
    ShipMarkersMap
  },
  data () {
    return {
      headers: [
        { text: '名称', sortable: false, value: 'name' },
        { text: '描述', sortable: false, value: 'desc' },
        { text: '颜色', sortable: false, value: 'color' },
        { text: '排序号', sortable: false, value: 'sort' },
        { text: '操作', sortable: false, align: 'center', value: 'actions' }
      ],
      desserts: [],
      markers: [],
      pagination: {},
      rowsperpageitems: [10, 20, 50],
      totalDesserts: 0,
      loading: false,
      showmap: false
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
        if (oldval.groupBy) {
          this.getdata()
        }
      },
      deep: true
    }
  },
  activated () {
    this.showmap = false
    this.markers = []
    this.getdata()
  },
  methods: {
    getdata: async function () {
      this.loading = true
      let data = await api.GetAll(this.pagination)
      this.desserts = data.data
      this.loading = false
      this.markers = data.data
      this.showmap = true
    },
    edit (id) {
      this.$router.push({
        path: './shipmark/edit',
        query: { id: id }
      })
    }
  }
}
</script>
