<template>
  <router-view></router-view>
</template>

<script>
export default {
  name: 'App'
}
</script>
<style>
.font{
  font-family: 'Microsoft YaHei' ! important;
}
html{
  overflow-y: auto;
  overflow-x: hidden;
}
.theme--light.v-application {
  background-color: #f1f5f8;
}
.theme--light.v-app-bar.v-toolbar.v-sheet {
  background-color: #FFF;
}
.card_center {
  width: 80%;
  margin-left: 10%;
  margin-top: 20px;
}
.centerFrame {
  padding-top: 10px;
  text-align: center;
  margin: 0 auto;
  width: 900px;
}
.v-navigation-drawer--temporary{
  /* 防止海图和海图按钮覆盖覆盖 */
  z-index: 1500;
}
</style>
