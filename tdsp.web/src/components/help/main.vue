<template>
<!--  帮助图标slot中填写相关帮助信息 支持br换行  -->
  <div>
    <v-tooltip bottom style="cursor: help;">
      <template v-slot:activator="{ on }">
        <v-icon v-on="on" color="gray">help</v-icon>
      </template>
      <span>
        <slot></slot>
      </span>
    </v-tooltip>
  </div>
</template>
