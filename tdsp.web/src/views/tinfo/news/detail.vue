<template>
  <div>
    <PageHeader :headertitle="formTitle">
      <v-spacer></v-spacer>
      <v-btn class="ma-2" @click="$router.go(-1)">{{close}}</v-btn>
      <v-btn class="ma-2" v-if="!readonly" color="primary" @click="save">保存</v-btn>
    </PageHeader>
    <v-card class="card_center">
      <v-skeleton-loader
        :loading="loading"
        :transition="transition"
        height="500"
        type="article"
      >
        <v-card-title primary-title style="justify-content: center;">
          {{editedItem.title}}
        </v-card-title>
        <v-card-subtitle style="display: flex;justify-content: center">
          <span class="subtitle_text">来源: {{editedItem.source}}</span>
          <span class="subtitle_text">类别: {{editedItem.typeName}}</span>
          <span class="subtitle_text">发布时间: {{editedItem.published | dateFormat}}</span>
        </v-card-subtitle>
        <hr style="width: 80%;margin-left: 10%;">
        <v-card-text>
          <div v-html="editedItem.content"></div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="$router.go(-1)">{{close}}</v-btn>
          <v-btn v-if="!readonly" color="blue darken-1" text @click="save">保存</v-btn>
        </v-card-actions>
      </v-skeleton-loader>
    </v-card>
  </div>
</template>

<script>
import PageHeader from '@/components/PageHeader'
import dayjs from 'dayjs'
import { pubApi as pub } from '@/api/pub'
export default {
  components: {
    PageHeader
  },
  data () {
    return {
      client: new pub.NewsClient('', this.$axios),
      id: -1,
      editedItem: {
        id: 0,
        title: '',
        source: '',
        typeName: '',
        published: '',
        summary: '',
        content: ''
      },
      loading: false,
      // 详细、编辑状态
      readonly: true
    }
  },
  created () {
    this.id = this.$route.query.id
    let type = this.$route.query.type
    if (type === 'edit') {
      this.readonly = false
    }
    if (this.id !== '-1') {
      this.getItem()
    }
  },
  computed: {
    formTitle () {
      return this.id === '-1' ? '新增通知公告' : this.readonly === true ? '通知公告信息' : '编辑通知公告'
    },
    close () {
      return this.readonly === true ? '关闭' : '取消'
    }
  },
  methods: {
    getItem: async function () {
      this.loading = true
      this.client.getById(this.id)
        .then(res => {
          this.editedItem = res
        })
        .finally(() => {
          this.loading = false
        })
    }
  }
}
</script>
<style scoped>
  .subtitle_text {
    margin: 0 20px;
  }
</style>
