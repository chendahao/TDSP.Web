<template>
  <div>
    <PageHeader headertitle="视频监控信息">
      <v-spacer></v-spacer>
      <v-btn @click="$router.go(-1)">返回</v-btn>
    </PageHeader>
    <v-container fluid grid-list-md>
      <v-data-iterator
        :items="desserts"
        class="elevation-1"
        :server-items-length="totalDesserts"
        :options.sync="pagination"
        :footer-props="{
          'items-per-page-options':rowsperpageitems
        }"
        :loading="loading"
        content-tag="v-layout"
        row
        wrap
      >
        <template v-slot:item="props">
             <v-flex
              xs12
              sm6
              md3
              lg3
            >
              <v-card>
                <v-card-title>
                  <h4>{{ props.item.name }}</h4>
                  <v-spacer></v-spacer>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                      <v-icon
                        color="primary"
                        v-on="on"
                        @click="getItem(props.item)"
                      >
                        videocam
                      </v-icon>
                    </template>
                    <span>查看</span>
                  </v-tooltip>
                </v-card-title>
                <v-divider></v-divider>
                <div class="dia_video_in">
                  <!-- <v-list-tile>
                    <v-list-tile-content>安装地点:</v-list-tile-content>
                    <v-list-tile-content class="align-end">{{ props.item.location }}</v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-content>负责人:</v-list-tile-content>
                    <v-list-tile-content class="align-end">{{ props.item.person }}</v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-content>负责人电话:</v-list-tile-content>
                    <v-list-tile-content class="align-end">{{ props.item.phone }}</v-list-tile-content>
                  </v-list-tile> -->
                  <!-- <v-list-tile> -->
                    <video class="video_in"
                      :id="props.item.cctvId"
                      :src='props.item.videoAddress'
                      preload='metadata'
                      @error="videoerr(props.item.cctvId)"
                      @play="videoplay(props.item.cctvId)"
                      @mouseover="mouseover(props.item.cctvId)"
                      @mouseleave="mouseleave(props.item.cctvId)"
                    >
                      该浏览器不支持视频播放
                    </video>
                  <!-- </v-list-tile> -->
                </div>
              </v-card>
            </v-flex>
        </template>
        <template v-slot:no-data>
          <v-btn color="primary" @click="getdata">重试</v-btn>
        </template>
      </v-data-iterator>
    </v-container>
    <v-layout row justify-center>
      <v-dialog v-model="dialog" fullscreen controls transition="dialog-bottom-transition" :overlay="false">
        <v-card>
          <v-toolbar dark color="primary">
            <v-btn icon @click.native="dialog = false" dark>
              <v-icon>close</v-icon>
            </v-btn>
            <v-toolbar-title>{{name}}</v-toolbar-title>
            <v-divider
              class="mx-2"
              inset
              vertical
            ></v-divider>
            <v-toolbar-title>负责人：{{person}}</v-toolbar-title>
            <v-divider
              class="mx-2"
              inset
              vertical
            ></v-divider>
            <v-toolbar-title>联系电话：{{phone}}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <!-- <v-btn dark flat @click.native="dialog = false">Save</v-btn> -->
            </v-toolbar-items>
          </v-toolbar>
          <video class="dia_video" ref='video' autoplay preload='metadata'>
            该浏览器不支持视频播放
          </video>
        </v-card>
      </v-dialog>
    </v-layout>
  </div>
</template>

<script>
import api from '@/api/navenv/CCTVApi'
import PageHeader from '@/components/PageHeader'
export default {
  components: {
    PageHeader
  },
  data () {
    return {
      img: require('../../../assets/no-video.png'),
      headers: [
        { text: '名称', sortable: false, value: 'name' },
        { text: '地点', sortable: false, value: 'location' },
        { text: '负责人', sortable: false, value: 'person' },
        { text: '电话', sortable: false, value: 'phone' },
        { text: '操作', sortable: false, align: 'center' }
      ],
      desserts: [],
      pagination: {},
      rowsperpageitems: [10, 20, 50],
      totalDesserts: 0,
      loading: false,
      dialog: false,
      name: '',
      person: '',
      phone: '',
      videosrc: 'https://interactive-examples.mdn.mozilla.net/media/examples/flower.webm?tdsourcetag=s_pctim_aiomsg',
      controls: false
    }
  },

  watch: {
    pagination: {
      handler (newval, oldval) {
        if (oldval.page) {
          this.getdata()
        }
      },
      deep: true
    },
    dialog (val) {
      if (val === false) {
        this.$refs.video.src = ''
      }
    }
  },
  created () {
    this.getdata()
  },
  methods: {
    getdata: async function () {
      this.loading = true
      let { data } = await api.GetPage(this.pagination)
      this.desserts = data.values
      let page = data.page
      this.pagination.page = page.page
      this.pagination.rowsPerPage = page.pageSize
      this.totalDesserts = page.total
      this.loading = false
    },
    getItem: async function (item) {
      this.name = item.name
      this.person = item.person
      this.phone = item.phone
      let { data } = await api.GetById(item.cctvId)
      this.$refs.video.src = data.videoAddress
      // this.$refs.video.src = 'https://interactive-examples.mdn.mozilla.net/media/examples/flower.webm?tdsourcetag=s_pctim_aiomsg'
      this.dialog = true
    },
    videoerr (id) {
      let vdo = document.getElementById(id)
      vdo.poster = this.img
      // vdo.src = 'https://interactive-examples.mdn.mozilla.net/media/examples/flower.webm?tdsourcetag=s_pctim_aiomsg'
    },
    // 播放视频是 暂停其他视频的播放
    videoplay (id) {
      let idlist = this.desserts.map(res => {
        return res.cctvId
      })
      for (let i = 0; i < idlist.length; i++) {
        const element = idlist[i]
        if (element !== id) {
          let vdo = document.getElementById(element)
          vdo.pause()
        }
      }
    },
    mouseover (id) {
      let vdo = document.getElementById(id)
      vdo.controls = true
    },
    mouseleave (id) {
      let vdo = document.getElementById(id)
      vdo.controls = false
    }
  }
}
</script>
<style>
  .dia_video{
    width: 80%;
    margin-left: 10%;
    height: 100%;
  }
  .dia_video_in{
    width: 100%;
    /* margin-left: 10%; */
    height: 200px;
  }
  .video_in{
    width: 100%;
    height: 200px;
  }
</style>
