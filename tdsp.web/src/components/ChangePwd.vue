<template>
  <div>
    <v-dialog
      v-model="dialog"
      persistent
      max-width="500px"
      transition="dialog-transition"
    >
      <v-card>
        <v-card-title primary-title>
          修改密码
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-form
              ref="form"
              lazy-validation
            >
              <v-flex md12>
                <v-text-field
                  autofocus
                  type="password"
                  label="原密码"
                  :rules="pass0rules"
                  v-model.trim="pass0"
                ></v-text-field>
              </v-flex>
              <v-flex md12>
                <v-text-field
                  type="password"
                  label="新密码"
                  :rules="pass1rules"
                  v-model.trim="pass1"
                ></v-text-field>
              </v-flex>
              <v-flex md12>
                <v-text-field
                  type="password"
                  label="确认密码"
                  :rules="[v => !!v || '请再次输入新密码',passwordConfirmRule]"
                  v-model.trim="pass2"
                ></v-text-field>
              </v-flex>
            </v-form>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="cancel">取消</v-btn>
          <v-btn color="blue darken-1" text @click="save">保存</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-snackbar
      v-model="snackbar"
      :color="color"
      :timeout="timeout"
      top='top'
    >
      {{ snackbartext }}
      <v-btn
        dark
        text
        @click="snackbar = false"
      >
        关闭
      </v-btn>
    </v-snackbar>
  </div>
</template>
<script>
import api from '@/api/auth/AccountApi'
export default {
  props: ['show'],
  data () {
    return {
      dialog: false,
      snackbar: false,
      snackbartext: '删除成功',
      color: 'success',
      timeout: 3000,
      pass0: '',
      pass1: '',
      pass2: '',
      pass0rules: [
        v => !!v || '请输入原密码',
        v => (v && v.length >= 6) || '密码至少要6位',
        v => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{6,}/.test(v) || '密码至少需要一个大写字母一个小写字母一个数字一个特殊字符'
      ],
      pass1rules: [
        v => !!v || '请输入新密码',
        v => (v && v.length >= 6) || '密码至少要6位',
        v => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{6,}/.test(v) || '密码至少需要一个大写字母一个小写字母一个数字一个特殊字符'
      ]
    }
  },
  computed: {
    passwordConfirmRule () {
      return () => (this.pass1 === this.pass2) || '两次输入的密码不一致'
    }
  },
  watch: {
    show (val) {
      if (val === true) this.dialog = true
      else this.dialog = false
    },
    pass1 (val) {
      if (val && this.pass2) {
        this.$refs.form.validate()
      }
    },
    pass2 (val) {
      if (val && this.pass1) {
        this.$refs.form.validate()
      }
    }
  },
  methods: {
    cancel () {
      this.$refs.form.reset()
      this.$emit('CallBack')
      this.dialog = false
    },
    save: async function () {
      if (this.$refs.form.validate()) {
        let { data } = await api.ChangePassword(this.pass0, this.pass1)
        if (data.code === 0) {
          this.snackbartext = '修改成功'
          this.color = 'success'
          this.snackbar = true
          this.$emit('CallBack')
          this.$refs.form.reset()
          this.dialog = false
        } else {
          this.snackbartext = '修改时出错，请重试'
          this.color = 'error'
          this.snackbar = true
          this.$emit('CallBack')
          this.$refs.form.reset()
          this.dialog = false
        }
      }
    }
  }
}
</script>
