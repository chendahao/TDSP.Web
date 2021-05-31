<template>
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
      <v-text-field v-model="dateselect" append-icon="event" readonly v-on="on"></v-text-field>
    </template>
    <v-date-picker v-model="dateselect" locale="zh-cn" @input="menu = false" :dayFormat="dayformat">
    </v-date-picker>
  </v-menu>
</template>
<script>
import dayjs from 'dayjs'
export default {
  props: {
    datespan: {
      type: String,
      default: new Date().toISOString().substr(0, 10)
    }
  },
  data: () => ({
    menu: false,
    dateselect: ''
  }),
  created: function () {
    this.dateselect = this.datespan
  },
  watch: {
    dateselect (val) {
      this.save(val)
    }
  },
  methods: {
    save (date) {
      this.$emit('headCallBack', date)
      this.menu = false
    },
    dayformat (d) {
      return dayjs(d).format('D')
    }
  }
}
</script>
