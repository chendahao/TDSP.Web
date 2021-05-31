<template>
  <div>
    <v-snackbar
      v-model="snackbar"
      :color="color"
      :timeout="timeout"
      top='top'
    >
      {{ text }}
      <v-btn
        dark
        flat
        @click="snackbar = false"
      >
        关闭
      </v-btn>
    </v-snackbar>
  </div>
</template>
<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    },
    text: {
      type: String,
      default: ''
    },
    color: {
      type: String,
      default: 'success'
    }
  },
  data () {
    return {
      snackbar: false,
      snackbartext: '更新成功',
      timeout: 5000
    }
  },
  watch: {
    show (val) {
      this.snackbar = val
    }
  }
}
</script>
