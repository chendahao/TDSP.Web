<template>
  <div>
    <v-card>
      <v-data-table
        :headers="headers"
        :items="desserts"
        class="elevation-1"
        :footer-props="{
          'items-per-page-options':rowsperpageitems
        }"
        :loading="loading"
        :search="search"
        sort-by
        :dense="tableDense"
      >
        <template v-slot:item.lnglat="{ item }">
          {{ item | formatlnglat }}
        </template>
        <template v-slot:item.sog="{ item }">
          {{ item.sog | valfixed }}
        </template>
        <template v-slot:no-data>
          <span>当前时间没有数据</span>
        </template>
        <template v-slot:no-results>
          <v-alert :value="true" color="error" icon="info">
            没有找到 "{{ search }}" 相关数据
          </v-alert>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { convertLatLng } from '@/plugins/convertLatLng.js'
export default {
  props: [
    'search',
    'desserts'
  ],
  data () {
    return {
      headers: [
        { text: 'MMSI', sortable: true, value: 'mmsi' },
        { text: '中文船名', sortable: true, value: 'shipNameCn' },
        { text: '英文船名', sortable: true, value: 'shipNameEn' },
        { text: '类型', sortable: true, value: 'shipType' },
        { text: '呼号', sortable: true, value: 'callsign' },
        { text: '坐标', sortable: false, value: 'lnglat' },
        { text: '船速(节)', sortable: true, value: 'sog' }
      ],
      rowsperpageitems: [10, 20, 50],
      loading: false
    }
  },
  computed: {
    ...mapState('tabledense', [
      'tableDense'
    ])
  },
  filters: {
    valfixed: function (val) {
      if (val) return val.toFixed(2)
      return ''
    },
    formatlnglat: function (item) {
      return convertLatLng(item)
    }
  },
  methods: {
    getdata () {

    }
  }
}
</script>
