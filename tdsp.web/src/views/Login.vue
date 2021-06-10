
<template>
  <div class="bgmain" :style="bgImg">
    <div class="bg1"></div>
    <div class="gyl">
      拖轮调度系统
    </div>
    <div class="bg">
      <div class="wel">用户登录</div>
      <v-card style="margin-top:80px" flat>
        <v-card-text>
          <v-form ref="form" lazy-validation>
            <v-text-field
              prepend-icon="person"
              v-model.trim="username"
              name="login"
              label="用户名"
              type="text"
              :rules="[v => !!v || '请输入用户名']"
            ></v-text-field>
            <v-text-field
              prepend-icon="lock"
              :append-icon="showpwd ? 'visibility' : 'visibility_off'"
              :type="showpwd ? 'text' : 'password'"
              @click:append="showpwd = !showpwd"
              v-model.trim="password"
              name="password"
              label="密码"
              @keyup.native="loginKeyDown"
              :hint="bigChar === true ? '大写锁定已打开': ''"
              id="password"
              :rules="[v => !!v || '请输入密码']"
              @keyup.enter="login"
            ></v-text-field>
          </v-form>
          <v-card-title primary-title style="color:red;padding:0px;margin-left:20px;height:24px">{{errmsg}}</v-card-title>
        </v-card-text>
        <v-card-actions>
          <v-btn block color="#347ebc" dark @click="login">登录</v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </div>
</template>
<script>
import api from '@/api/auth/AccountApi'
import defaultImg from '@/assets/loginbg2.jpg'
import dayjs from 'dayjs'
import storagedata from '@/plugins/storagedata.js'
export default {
  layout: null,
  data () {
    return {
      username: '',
      password: '',
      errmsg: '',
      bgImg: {
        backgroundImage: 'url(' + defaultImg + ')',
        backgroundSize: 'cover'
      },
      showpwd: false,
      bigChar: false,
      firstTochar: false
    }
  },
  created () {
  },
  methods: {
    login: async function () {
      if (this.$refs.form.validate()) {
        let data = await api.Login(this.username, this.password)
        if (data.status === 400) {
          this.errmsg = `* ${data.data}`
          return
        }
        if (data.data.code === 401) {
          this.errmsg = `* ${data.data}`
          return
        }
        // 将用户信息存储在localstorage中
        storagedata.setlocalStorage('userdata', JSON.stringify(data.data.user))
        storagedata.setlocalStorage('usertoken', data.data.token)
        storagedata.setlocalStorage('logintime', dayjs().format('YYYY-MM-DD HH:mm')) // 登录时间
        storagedata.setlocalStorage('tokentime', dayjs().format('YYYY-MM-DD HH:mm')) // 最后获取token时间
        this.$router.replace('/')
      }
    },
    loginKeyDown (event) {
      const _that = this
      // 是否输入过字母键，且判断是否按键为caps lock
      if (_that.firstTochar) {
        if (event.keyCode === 20) {
          _that.bigChar = !_that.bigChar
          return
        }
      }
      // 未输入过字母键，或按键不是caps lock，判断每次最后输入的字符的大小写
      var e = event || window.event
      var keyvalue = e.keyCode ? e.keyCode : e.which
      var shifKey = e.shiftKey ? e.shiftKey : ((keyvalue === 16))
      if (typeof (_that.password) === 'undefined') {
        return
      }
      var strlen = _that.password.length
      var password = _that.password

      if (strlen) {
        var uniCode = password.charCodeAt(strlen - 1)
        if (keyvalue >= 65 && keyvalue <= 90) {
          // 如果是字母键
          _that.firstTochar = true
          if (((uniCode >= 65 && uniCode <= 90) && !shifKey) || ((uniCode >= 97 && uniCode <= 122) && shifKey)) {
            _that.bigChar = true
          } else {
            _that.bigChar = false
          }
        }
      }
    }
  }
}
</script>
<style>
.bgmain {
  height: 100vh;
  background-size: 100%;
}
.bg1 {
  width: 100%;
  height: 237px;
  background: #424242;
  opacity: 0.6;
  position: absolute;
  left: 0;
  top: 0px;
  right: 0px;
  bottom: 0px;
  margin: auto;
}
.gyl {
  width: 50vw;
  height: 170px;
  color: #ffffff;
  /* font-size: 55px; */
  font-size: 3rem;
  position: absolute;
  left: 10%;
  top: 11%;
  bottom: 0px;
  margin: auto;
}
.gy2 {
  color: #fff;
  margin-left: 6px;
  font-size: 18px;
  text-align: center;
  margin-top: 10px;
}
.bg {
  width: 375px;
  height: 337px;
  background: #fff;
  position: absolute;
  left: 56%;
  top: 0px;
  right: 0px;
  bottom: 0px;
  margin: auto;
  z-index: 1;
  box-shadow: 0px 0px 50px rgba(0, 0, 0, 0.4);
  border-radius: 5px;
}

.wel {
  width: 375px;
  height: 35px;
  color: #347ebc;
  font-size: 1.5rem;
  position: absolute;
  top: 2rem;
  text-align: center;
}

</style>
