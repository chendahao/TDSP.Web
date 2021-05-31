<template>
  <div class="scrolltop">
    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <v-scale-transition origin="center center">
          <v-btn fab v-on="on" large color="primary" @click="$vuetify.goTo(1)" v-show="scrollshow">
            <v-icon>arrow_upward</v-icon>
          </v-btn>
        </v-scale-transition>
      </template>
      <span>向上</span>
    </v-tooltip>
  </div>
</template>
<script>
export default {
  data () {
    return {
      scrollshow: false
    }
  },
  mounted () {
    window.addEventListener('scroll', this.handleScroll, true)
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.handleScroll, true)
  },
  methods: {
    handleScroll () {
      var top = Math.floor(document.body.scrollTop || document.documentElement.scrollTop || window.pageXOffset)
      if (top > 300) this.scrollshow = true
      else this.scrollshow = false
    }
  }
}
</script>
<style>
.scrolltop{
  position: fixed;
  bottom: 50px;
  right: 100px;
}
</style>
