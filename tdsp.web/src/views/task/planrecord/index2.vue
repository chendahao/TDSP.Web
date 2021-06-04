<template>
  <div>
    <PageHeader :dense="false" headertitle="拖轮作业记录">
      <v-layout row wrap>
        <v-flex md4>
          <v-menu
            v-model="menu"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="date"
                placeholder="日期"
                hint="日期"
                width="200px"
                persistent-hint
                append-icon="event"
                readonly
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="date"
              locale="zh-cn"
              @input="menu = false"
              :dayFormat="dayformat"
            ></v-date-picker>
          </v-menu>
        </v-flex>
      </v-layout>
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="search"
        label="搜索"
        single-line
        hide-details
        clearable
      ></v-text-field>
      <v-btn text @click="getdata">
        <v-icon>refresh</v-icon>
        刷新
      </v-btn>
    </PageHeader>
    <v-container fluid>
      <v-data-iterator
      :items="dataList"
      item-key="tugId"
      :search="search"
      disable-pagination
      disable-sort
      hide-default-footer
    >
      <template v-slot:default="props">
        <v-row>
          <v-col
            v-for="item in props.items"
            :key="item.tugId"
            cols="12"
            sm="6"
            md="4"
            lg="3"
          >
            <v-card>
              <v-card-title class="subheading font-weight-bold">
                {{ item.name }}
              </v-card-title>

              <v-divider></v-divider>

              <v-list dense>
                <v-list-item>
                  <v-list-item-content>name:</v-list-item-content>
                  <v-list-item-content class="align-end">
                    {{ item.name }}
                  </v-list-item-content>
                </v-list-item>

              </v-list>
            </v-card>
          </v-col>
        </v-row>
      </template>
      </v-data-iterator>
    </v-container>
  </div>
</template>
<script>
import PageHeader from '@/components/PageHeader'
import { TugList } from '@/mock/tug'
import { orderBy } from 'lodash'
import dayjs from 'dayjs'
export default {
  components: {
    PageHeader
  },
  data () {
    return {
      menu: false,
      date: dayjs().format('YYYY-MM-DD'),
      dataList: [],
      search: '',
      loading: false
    }
  },
  created () {
    this.getdata()
  },
  watch: {
    date () {
      this.getdata()
    }
  },
  methods: {
    getdata () {
      this.loading = true
      setTimeout(() => {
        this.dataList = TugList().data
        this.loading = false
      }, 150)
    }
  }
}
</script>
