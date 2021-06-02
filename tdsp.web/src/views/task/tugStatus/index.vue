<template>
  <div>
    <PageHeader :dense="false" headertitle="拖轮实时作业看板">
     <v-spacer></v-spacer>
      <v-btn text @click="getdata">
        <v-icon>refresh</v-icon>
        刷新
      </v-btn>
    </PageHeader>
    <v-container fluid>
      <v-row justify="start">
        <v-col md="3" sm="6" xs="12" v-for="(item, index) in workingList">
          <v-card v-if="item.hasWork" :loading="loading">
            <v-card-title style="padding: 5px 16px 0px 16px;">
              <img src="@/assets/shipicon.png" class="mr-1"/>
              {{ item.tug }}
            </v-card-title>
            <v-list>
              <template
                v-for="(work, index2) in item.work"
                no-action
              >
                <v-list-item
                  :key="index2"
                >
                  <v-list-item-avatar>
                    <v-avatar
                      color="primary"
                      size="36"
                    >
                      <span class="white--text">{{work.type}}</span>
                    </v-avatar>
                  </v-list-item-avatar>

                  <v-list-item-content>
                    <v-list-item-title>{{work.ship}}</v-list-item-title>
                    <v-list-item-subtitle v-if="work.startTime">开始时间：{{work.startTime}}</v-list-item-subtitle>
                    <v-list-item-subtitle v-if="work.remark">备注：{{work.remark}}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-divider
                  v-if="index2 < item.work.length - 1"
                  :key="index2"
                  inset
                ></v-divider>
              </template>
            </v-list>
          </v-card>
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <v-card flat v-if="nowWorkList.length > 0">
        <v-card-title primary-title>
          无作业拖轮
        </v-card-title>
        <v-chip v-for="(item, index) in nowWorkList" label class="ma-2">
          <v-icon left>
            label
          </v-icon>
          {{item.tug}}
        </v-chip>
      </v-card>
    </v-container>
  </div>
</template>
<script>
import PageHeader from '@/components/PageHeader'
import { TugStatus } from '@/mock/tug'
import { orderBy } from 'lodash'
export default {
  components: {
    PageHeader
  },
  data () {
    return {
      workingList: [],
      nowWorkList: [],
      loading: false
    }
  },
  created() {
    this.getdata()
  },
  methods: {
    getdata () {
      this.loading = true
      setTimeout(() => {
        const list = TugStatus()
        const datalist = orderBy(list, ['hasWork', 'sort'], ['desc', 'asc'])
        this.workingList = datalist.filter(item => item.hasWork === true )
        this.nowWorkList = datalist.filter(item => item.hasWork === false )
        
        this.loading = false
      }, 1000);
    }
  }
}
</script>
