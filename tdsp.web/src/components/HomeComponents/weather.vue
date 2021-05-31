<template>
  <v-card flat width="100%" height="100%">
    <v-card-title primary-title title="点击进入详细页" @click="$router.push({name:'weather'})" style="cursor: pointer;">
      <img src="../../assets/homeindex/title3.png" class="mr-2"/>
      今日气象
    </v-card-title>
    <v-divider></v-divider>
    <v-container fluid>
      <table>
        <tr>
          <th>天气</th>
          <!-- <th>发布时间</th> -->
          <th>时效</th>
          <th>风向</th>
          <th>风力</th>
          <th>能见度</th>
        </tr>
        <tr v-for="(item, index) in desserts" :key="index">
          <td>
            <a>
              <v-tooltip top>
                <template v-slot:activator="{ on }">
                  <v-avatar size="35" v-on="on">
                    <img :src="item.weatherInfo | getweathersrc" :alt="item.weatherInfo" />
                  </v-avatar>
                </template>
                <span>{{item.weatherInfo}}</span>
              </v-tooltip>
            </a>
          </td>
          <td>{{item.times}}</td>
          <td>
            <a>
              <v-tooltip top>
                <template v-slot:activator="{ on }">
                  <v-avatar size="20" v-on="on">
                    <img :src="item.windDirection | getwindsrc" />
                  </v-avatar>
                </template>
                <span>{{item.windDirection}}</span>
              </v-tooltip>
            </a>
          </td>
          <td>{{item.windPower}}</td>
          <td>{{item.visibility}}(km)</td>
        </tr>
      </table>
    </v-container>
  </v-card>
</template>
<script>
import { pubApi as pub } from '@/api/pub'
import dayjs from 'dayjs'
import weatherimg from '@/assets/weather/weather.js'
import windimg from '@/assets/wind/wind.js'
export default {
  data () {
    return {
      client: new pub.WeatherClient('', this.$axios),
      desserts: []
    }
  },
  created () {
    this.getdata()
  },
  filters: {
    getwindsrc (val) {
      switch (val) {
        case '北风':
          return windimg.windn
        case '南风':
          return windimg.winds
        case '东风':
          return windimg.winde
        case '西风':
          return windimg.windw
        case '东北风':
          return windimg.windne
        case '东北东风':
          return windimg.windne
        case '北北东':
          return windimg.windne
        case '东北东':
          return windimg.windne
        case '北北东风':
          return windimg.windne
        case '东南风':
          return windimg.windse
        case '东南东风':
          return windimg.windse
        case '东南东':
          return windimg.windse
        case '南南东风':
          return windimg.windse
        case '南南东':
          return windimg.windse
        case '西北风':
          return windimg.windnw
        case '西北西风':
          return windimg.windnw
        case '西北西':
          return windimg.windnw
        case '北北西风':
          return windimg.windnw
        case '北北西':
          return windimg.windnw
        case '西南风':
          return windimg.windsw
        case '南南西':
          return windimg.windsw
        case '南南西风':
          return windimg.windsw
        case '西南西':
          return windimg.windsw
        case '西南西风':
          return windimg.windsw
        case '旋转风':
          return windimg.windx
        default:
          return ''
      }
    },
    getweathersrc (val) {
      switch (val) {
        case '4级风':
          return weatherimg.wind4
        case '5级风':
          return weatherimg.wind5
        case '6级风':
          return weatherimg.wind6
        case '7级风':
          return weatherimg.wind7
        case '8级风':
          return weatherimg.wind8
        case '9级风':
          return weatherimg.wind9
        case '10级风':
          return weatherimg.wind10
        case '11级风':
          return weatherimg.wind11
        case '12级风':
          return weatherimg.wind12
        case '13级风':
          return weatherimg.wind13
        case '14级风':
          return weatherimg.wind14
        case '15级风':
          return weatherimg.wind15
        case '16级风':
          return weatherimg.wind16
        case '17级风':
          return weatherimg.wind17
        case '暴雪':
          return weatherimg.hugestorms
        case '暴雨':
          return weatherimg.Rainstorm
        case '冰雹':
          return weatherimg.hail
        case '吹雪':
          return weatherimg.Blowingsnow
        case '大暴雪':
          return weatherimg.themostsnow
        case '大暴雨':
          return weatherimg.themostrain
        case '大雪':
          return weatherimg.heavysnow
        case '大雨':
          return weatherimg.heavyrain
        case '冻雨':
          return weatherimg.Frozenrain
        case '多云':
          return weatherimg.cloud
        case '浮尘':
          return weatherimg.dust
        case '雷电':
          return weatherimg.thunder
        case '雷阵雨':
          return weatherimg.Thundershower
        case '龙卷风':
          return weatherimg.tornado
        case '霾':
          return weatherimg.haze
        case '强沙尘暴':
          return weatherimg.heavysandstorms
        case '特强沙尘暴':
          return weatherimg.heavysandstorms
        case '轻雾':
          return weatherimg.Lightfog
        case '晴':
          return weatherimg.Sunny
        case '沙尘暴':
          return weatherimg.sandstorms
        case '霜冻':
          return weatherimg.Frozen
        case '特大暴雪':
          return weatherimg.Extralargesnow
        case '特大暴雨':
          return weatherimg.Extralargerain
        case '雾':
          return weatherimg.fog
        case '小雨':
          return weatherimg.shower
        case '阵雨':
          return weatherimg.shower
        case '小雪':
          return weatherimg.snow
        case '扬沙':
          return weatherimg.sand
        case '阴':
          return weatherimg.cloudy
        case '雨夹雪':
          return weatherimg.Sleet
        case '中雪':
          return weatherimg.Moderaterain
        case '中雨':
          return weatherimg.Moderatesnow
        default:
          return ''
      }
    }
  },
  methods: {
    getdata: async function () {
      this.client.getToday().then(res => {
        this.desserts = res
      })
    }
  }
}
</script>
<style scoped>
.personal-body {
  /* background: #f2f5f8; */
  width: 100%;
  height: 100%;
  float: left;
}

.personal-card {
  border-radius: 2px;
  background-color: #fff;
}

.personal-card-header {
  height: 58px;
  line-height: 58px;
  margin: 0px 32px;
  border-bottom: 1px solid #d7dde3;
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
  margin-left: 8px;
  font-weight: 500;
}

.personal-card-body {
  position: relative;
  /* padding: 10px 32px; */
  line-height: 24px;
  display: -webkit-flex;
  display: flex;
}

/*****/

table {
  width: 100%;
  padding: 0;
  margin: 0;
}

td {
  border: none;
  font-size: 14px;
  padding: 10px 6px 10px 12px;
  text-align: center;
}

th {
  font: 14px "Trebuchet MS", Verdana, Arial, Helvetica, sans-serif;
  border: none;
  letter-spacing: 2px;
  text-transform: uppercase;
  text-align: center;
  padding: 6px 6px 6px 12px;
}
</style>
