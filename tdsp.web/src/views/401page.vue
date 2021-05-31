<template>
  <div style="text-align:center;margin-top:10%">
    <h1>您没有该功能的权限</h1>
    <v-btn class="ma-2" large color="error" @click="$router.go(-1)">上一页</v-btn>
    <v-btn class="ma-2" large color="normal" to="/">首页</v-btn>
  </div>
</template>
