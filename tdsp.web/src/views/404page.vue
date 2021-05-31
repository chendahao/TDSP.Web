<template>
  <div style="text-align:center;margin-top:10%">
    <h1>没有找到相关的数据</h1>
    <v-btn class="ma-2" large color="error" @click="$router.go(-1)">上一页</v-btn>
    <v-btn class="ma-2" large color="normal" to="/">首页</v-btn>
  </div>
</template>
