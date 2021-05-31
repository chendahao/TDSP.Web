<template>
  <v-card flat width="100%">
    <v-card-title primary-title>
      <img src="../../assets/homeindex/user.png" class="mr-2"/>
      个人中心
    </v-card-title>
    <v-divider></v-divider>
    <v-container fluid style="width:92%;margin-left:4%">
      <v-row>
        <v-col md="3">
          <div class="user-text-center">
            <img src="../../assets/user.png" />
          </div>
        </v-col>
        <v-col md="9">
          <div class="user-address">
            <h3>
              <a href="#">欢迎您 {{username}}</a>
            </h3>
            <p style="text" :title="orgname">部门名称：{{orgname}}</p>
            <!-- <p style="text">部门名称：曹妃甸物流园区港口办</p> -->
            <p>登录时间：{{lastlogintime}}</p>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>
<script>
import storagedata from '@/plugins/storagedata.js'
export default {
  data () {
    return {
      username: '',
      orgname: '',
      lastlogintime: ''
    }
  },
  mounted () {
    let userdata = storagedata.getUserdata()
    this.username = userdata.fullName
    this.orgname = userdata.orgName
    this.lastlogintime = storagedata.getlocalStorage('logintime')
  }
}
</script>
<style scoped>
.personal-body {
  width: 100%;
  height: 100%;
  float: left;
}
.personal-card {
  margin-bottom: 15px;
  border-radius: 2px;
  background-color: #fff;
}
.personal-card-header {
  height: 58px;
  line-height: 58px;
  margin: 0px 32px;
  border-bottom: 1px solid #d7dde3;
  color: #333;
  border-radius: 2px 2px 0 0;
  font-size: 16px;
}
.personal-card-header > img {
  float: left;
  margin-top: 20px;
}
.personal-card-header h3 {
  float: left;
  font-size: 16px;
  color: #333333;
  margin-left: 8px;
  font-weight: 500;
}
.personal-card-body {
  position: relative;
  padding: 10px 32px;
  line-height: 24px;
  display: -webkit-flex;
  display: flex;
}
/************************/
.user-address h3 {
  font-size: 20px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 48px;
  letter-spacing: 0px;
  color: #535f72;
}
.user-address {
  text-align: left;
  padding-left: 20px;
  width: 100%;
}
.user-address h3 a {
  color: #535f72;
  text-decoration:none;
}
.user-address p {
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 1px;
}
.user-text-center {
  margin-top: 5px;
}
.user-address h3 span {
  font-size: 14px;
  float: right;
}
</style>
