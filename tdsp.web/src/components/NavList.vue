<template>
  <v-list style="margin-top:64px">
    <v-list-item to="/">
      <v-list-item-icon>
        <v-icon style="color:white">home</v-icon>
      </v-list-item-icon>
      <v-list-item-title style="color:white" class="font">首页</v-list-item-title>
    </v-list-item>
    <div
      v-for="(item,i) in value"
      :key="i"
    >
      <v-list-group
        v-if="item.children"
        :prepend-icon="item.icon"
      >
        <template v-slot:activator>
          <v-list-item-title class="font" style="color:white" :title="item.meta.title">{{item.meta.title}}</v-list-item-title>
        </template>
        <nav-item
          v-for="(child,j) in item.children"
          :value="child"
          :parent="item.path"
          :key="i+j"
        />
      </v-list-group>
      <v-list-item
        v-else
        :to="{ name: item.name }"
      >
        <v-list-item-icon>
          <v-icon>{{item.meta.icon}}</v-icon>
        </v-list-item-icon>
        <v-list-item-title class="font" v-text="item.meta.title" :title="item.meta.title" style="color:white"></v-list-item-title>
      </v-list-item>
    </div>
  </v-list>
</template>

<script>
import NavItem from './NavItem.vue'
export default {
  name: 'navlist',
  props: ['value'],
  components: { NavItem },
  data () {
    return {
      // 打开系统管理子系统
      sys: null
    }
  },
  methods: {
    tosys () {
      if (this.sys === null) {
        this.sys = window.open('/sys/', 'sys')
      } else if (this.sys.closed) {
        this.sys = window.open('/sys/', 'sys')
      } else {
        this.sys.focus()
      }
    }
  }
}
</script>
<style lang="scss">
  .v-list .v-list-item--active {
    color: #e7ecea;
  }

</style>
