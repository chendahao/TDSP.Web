import Vue from 'vue'
import Vuetify from 'vuetify'
import zhHans from 'vuetify/es5/locale/zh-Hans'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
// 减小css体积
import '../styles/variables.scss'
import minifyTheme from 'minify-css-string'

Vue.use(Vuetify)

export default new Vuetify({
  lang: {
    locales: { zhHans },
    current: 'zhHans'
  },
  theme: {
    dark: false,
    options: { minifyTheme },
    themes: {
      light: {
        primary: '#42A5F5',
        secondary: '#2196f3',
        accent: '#8bc34a',
        error: '#f44336',
        warning: '#ffc107',
        info: '#9CCC65',
        success: '#4caf50'
      },
      dark: {
        primary: '#1E88E5',
        secondary: '#2196f3',
        accent: '#8bc34a',
        error: '#f44336',
        warning: '#ffc107',
        info: '#7CB342',
        success: '#4caf50'
      }
    }
  }
})
