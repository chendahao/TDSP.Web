<template>
  <div>
    <PageHeader :headertitle="formTitle">
      <v-spacer></v-spacer>
      <v-btn class="ma-2" @click="$router.go(-1)">{{close}}</v-btn>
      <v-btn class="ma-2" v-if="!readonly" color="primary" @click="save">保存</v-btn>
    </PageHeader>
    <v-card class="card_center">
      <v-card-text>
        <v-container grid-list-md>
          <v-form
            ref="form"
            lazy-validation
          >
            <v-layout wrap>
              <v-flex md12>
                <v-text-field v-model="editedItem.title" label="标题" :rules="titleRule" counter="200" :readonly="readonly"></v-text-field>
              </v-flex>
              <v-flex md12>
                <v-text-field v-model="editedItem.source" label="来源/发布单位" :rules="sourceRule" :readonly="readonly"></v-text-field>
              </v-flex>
              <v-flex md12>
                <v-text-field v-model="editedItem.typeName" label="类别" :rules="typeRule" :readonly="readonly"></v-text-field>
              </v-flex>
              <v-flex md12>
                <v-text-field v-model="editedItem.summary" label="摘要" :rules="summaryRule" counter="300" :readonly="readonly"></v-text-field>
              </v-flex>
              <v-flex md12 style="z-index:1">
                <editor ref="editor" :value="editedItem.content" @on-change="handleChange" />
              </v-flex>
            </v-layout>
          </v-form>
        </v-container>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="$router.go(-1)">{{close}}</v-btn>
        <v-btn v-if="!readonly" color="blue darken-1" text @click="save">保存</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import PageHeader from '@/components/PageHeader'
import Editor from '@/components/Editor'
import dayjs from 'dayjs'
import { pubApi as pub } from '@/api/pub'
export default {
  components: {
    PageHeader,
    Editor
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
        summary: '',
        content: ''
      },
      // 详细、编辑状态
      readonly: true,
      titleRule: [
        v => !!v || '请输入标题',
        v => v.length >= 10 || '标题过短',
        v => v.length <= 200 || '标题过长'
      ],
      sourceRule: [
        v => !!v || '请输入来源/发布单位'
      ],
      typeRule: [
        v => !!v || '请输入类别'
      ],
      summaryRule: [
        v => !!v || '请输入摘要',
        v => v.length >= 10 || '摘要过短',
        v => v.length <= 300 || '摘要过长'
      ]
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
    handleChange (html) {
      this.editedItem.content = html
    },
    getItem: async function () {
      // this.editedItem = item.data
      this.client.getById(this.id)
        .then(res => {
          this.editedItem = res
        })
    },
    save: async function () {
      // console.log(this.editedItem)
      this.editedItem.published = dayjs().format('YYYY-MM-DD HH:mm')
      if (this.$refs.form.validate()) {
        let data = null
        if (this.id === '-1') {
          // 新增
          this.client.create(this.editedItem)
            .then(res => {
              this.resCallback(res)
            })
        } else {
          // 编辑
          this.client.update(this.id, this.editedItem)
            .then(res => {
              this.resCallback(res)
            })
        }
      }
    },
    resCallback (res) {
      if (res.code === 0) {
        this.message.ShowMessage('保存成功', 'success')
        this.$router.go(-1)
      } else {
        this.message.ShowMessage(res.msg, 'error')
      }
    }
  }
}
</script>
