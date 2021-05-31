<template>
  <div>
    <v-toolbar class="elevation-0">
      <div v-if="headertitle">
        <v-toolbar-title style="margin-right:40px">
          <h4>
            {{headertitle}}
          </h4>
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
    headertitle: {
      type: String,
      default: ''
    }
  }
}
</script>
