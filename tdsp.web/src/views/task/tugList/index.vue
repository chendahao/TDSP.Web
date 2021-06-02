<template>
  <div>
    <PageHeader :dense="false" headertitle="拖轮信息">
     <v-spacer></v-spacer>
      <v-btn text @click="getdata">
        <v-icon>refresh</v-icon>
        刷新
      </v-btn>
    </PageHeader>
    <v-container fluid>
      <v-data-table
        :headers="headers"
        :items="tableData"
        hide-default-footer
        disable-pagination
        class="elevation-1"
        fixed-header
        :height="setheight"
        :loading="loading"
        :search="search"
        :dense="tableDense"
      >
        <template v-slot:item.heindhook="{ item }">
          {{ item.heindhook === true ? '有' : '无' }}
        </template>
      </v-data-table>
    </v-container>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { TugList } from '@/mock/tug'
import PageHeader from '@/components/PageHeader'
export default {
  components: {
    PageHeader
  },
  data () {
    return {
      search: '',
      setheight: 550,
      tableData: [],
      loading: false,
      headers: [
        { text: '名称', groupable: false, sortable: false, value: 'name' },
        { text: '船长(米)', groupable: false, sortable: false, value: 'length' },
        { text: '船宽(米)', groupable: false, sortable: false, value: 'width' },
        { text: '型深(米)', groupable: false, sortable: false, value: 'depth' },
        { text: '主机(马力)', groupable: false, sortable: false, value: 'mainEngine' },
        { text: '转速', groupable: false, sortable: false, value: 'rotatingSpeed' },
        { text: '满载吃水', groupable: false, sortable: false, value: 'draft' },
        { text: '航速', groupable: false, sortable: false, value: 'speed' },
        { text: '正拖力', groupable: false, sortable: false, value: 'fontDrag' },
        { text: '倒拖力', groupable: false, sortable: false, value: 'behindDrag' },
        { text: '尾拖钩', groupable: false, sortable: false, value: 'heindhook' },
        { text: '排序号', groupable: false, sortable: false, value: 'sort' },
        { text: '操作', sortable: false, align: 'center' }
      ]
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
  methods: {
    getdata () {
      this.loading = true
      setTimeout(() => {
        this.tableData = TugList().data
        this.loading = false
      }, 1500)
    }
  }
}
</script>