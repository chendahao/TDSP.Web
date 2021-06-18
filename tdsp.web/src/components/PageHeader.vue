<template>
  <div>
    <v-toolbar :dense="dense" :class="toolbarclass" :style="{'border-bottom':$vuetify.theme.dark? '2px #082338 solid':'2px #f1f5f8 solid'}">
      <div v-if="headertitle">
        <v-toolbar-title>
          <span v-if="icon" class="header-icon">
            <v-icon>{{icon}}</v-icon>
            {{headertitle}}
          </span>
          <span v-else class="header-main">
            {{headertitle}}
          </span>
          <span v-if="subtitle" style="color: #9e9e9e;">
            {{subtitle}}
          </span>
        </v-toolbar-title>
      </div>
      <slot></slot>
    </v-toolbar>
  </div>
</template>
<script>
export default {
  name: 'PageHeader',
  props: {
    toolbarclass: {
      type: String,
      default: 'elevation-0'
    },
    headertitle: {
      type: String,
      default: ''
    },
    subtitle: {
      type: String,
      default: ''
    },
    dense: {
      type: Boolean,
      default: false
    },
    icon: {
      type: String,
      default: ''
    }
  }
}
</script>
<style lang="less">
  .header-main {
    margin-right: 40px;
    border-left: 10px #1abc9c solid;
    padding-left: 5px;
    font-weight: bold;
  }
  .header-icon {
    margin-right: 40px;
    padding-left: 5px;
    font-weight: bold;
  }
</style>
