<template>
  <div>
    <v-layout row justify-center>
      <v-dialog persistent v-model="dialog" max-width="350">
        <v-card>
          <v-card-title class="headline">
            <v-icon large color="warning">warning</v-icon>
            <span class="title">确认删除此条数据吗？</span>
          </v-card-title>
          <v-card-text class="headline">内容为：{{info}}</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click.native="cancel">取消</v-btn>
            <v-btn color="primary" text @click.native="confirmdel">确认</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
  </div>
</template>
<script>
export default {
  props: ['info', 'show'],
  data () {
    return {
      dialog: false
    }
  },
  watch: {
    show (val) {
      if (val === true) {
        this.dialog = true
      } else {
        this.dialog = false
      }
    }
  },
  methods: {
    confirmdel () {
      this.$emit('CallBack', true)
      this.dialog = false
    },
    cancel () {
      this.$emit('CallBack', false)
      this.dialog = false
    }
  }
}
</script>
