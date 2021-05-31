<template>
  <v-card flat width="100%" height="100%">
    <v-card-title primary-title title="点击进入详细页" @click="$router.push({name:'newsindex'})" style="cursor: pointer;">
      <img src="../../assets/homeindex/title5.png" class="mr-2"/>
      新闻公告
    </v-card-title>
    <v-divider></v-divider>
    <v-container fluid style="height:387px; overflow:auto">
      <v-timeline
        dense
      >
        <v-timeline-item
          v-for="item in list"
          :key="item.published"
          small
        >
          <v-card class="elevation-2">
            <v-card-title class="headline" style="cursor: pointer;" :title="item.title" @click="detail(item.id)">{{item.title | ellipsis }}</v-card-title>
            <v-card-text>
              {{ item.published | dateFormat }}
                |  来源：{{ item.source }}
            </v-card-text>
          </v-card>
        </v-timeline-item>
      </v-timeline>
    </v-container>
  </v-card>
</template>
<script>
import { pubApi as pub } from '@/api/pub'
import dayjs from 'dayjs'
import { ellipsis } from '@/plugins/tool'
var chart = ''
var chartresize = ''
export default {
  data () {
    return {
      client: new pub.NewsClient('', this.$axios),
      list: []
    }
  },
  created () {
    this.getdata()
  },
  filters: {
    ellipsis (val) {
      return ellipsis(val, 20)
    }
  },
  methods: {
    getdata () {
      this.client.getTop(10)
        .then(res => {
          this.list = res
        })
    },
    detail (id, type = 'detail') {
      this.$router.push({
        name: 'newsdetail',
        query: { id: id, type: type }
      })
    }
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
.card-map1 {
  width: 100%;
  height: 363px;
}
</style>
