<template>
  <div>
    <v-list-group
      sub-group
      no-action
      :prepend-icon="value.meta.icon"
      v-if="isFolder"
    >
      <template v-slot:activator>
        <v-list-item-title class="font" style="color:white" :title="value.meta.title">{{value.meta.title}}</v-list-item-title>
      </template>
      <items
        v-for="item in value.children"
        :value="item"
        :key="item.name"
      ></items>
    </v-list-group>

    <v-list-item
      v-else
      :to="{ name: value.name }"
    >
      <v-list-item-icon>
        <v-icon>{{value.meta.icon}}</v-icon>
      </v-list-item-icon>
      <v-list-item-title class="font" v-text="value.meta.title" :title="value.meta.title" style="color:white"></v-list-item-title>
    </v-list-item>

  </div>
</template>

<script>
export default {
  name: 'items',
  props: ['value'],
  computed: {
    isFolder () {
      return this.value && !!this.value.children
    }
  },
  components: {}
}
</script>

<style>
</style>
