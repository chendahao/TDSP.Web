<template>
  <div>
    <v-layout row justify-center>
      <v-dialog v-model="dialog" persistent max-width="500px">
        <v-card>
          <v-card-title>
            <span class="headline">联合指挥</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-form ref="form" lazy-validation>
                <v-flex md12>
                  <v-layout row wrap>
                    <v-flex md6>
                      <v-text-field
                        label="MMSI"
                        v-model="editedItem.mmsi"
                        :rules="MMSIRules"
                        @input="searchShipName"
                        required
                      ></v-text-field>
                    </v-flex>
                    <v-flex md6>
                      <v-text-field label="船名" v-model="shipname" readonly></v-text-field>
                    </v-flex>
                  </v-layout>
                </v-flex>
                <v-flex md12>
                  <v-combobox
                    v-model="editedItem.type"
                    :items="type_items"
                    placeholder="业务类型"
                    :rules="[v => !!v || '请输入业务类型']"
                  ></v-combobox>
                </v-flex>
                <v-flex md12>
                  <v-textarea label="事项" rows="2" auto-grow v-model.trim="editedItem.info"></v-textarea>
                </v-flex>
                <v-flex md12>
                  <v-layout row wrap>
                    <v-flex md6>
                      <v-menu
                        v-model="menu1"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        transition="scale-transition"
                        offset-y
                        min-width="290px"
                      >
                        <template v-slot:activator="{ on }">
                          <v-text-field
                            v-model="startdate"
                            label="开始日期"
                            prepend-icon="event"
                            readonly
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="startdate"
                          locale="zh-cn"
                          @input="menu1 = false"
                          :dayFormat="dayformat"
                        ></v-date-picker>
                      </v-menu>
                    </v-flex>
                    <v-flex md6>
                      <v-menu
                        ref="menust"
                        v-model="menu2"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        :return-value.sync="starttime"
                        transition="scale-transition"
                        offset-y
                        max-width="290px"
                        min-width="290px"
                      >
                        <template v-slot:activator="{ on }">
                          <v-text-field
                            v-model="starttime"
                            label="开始时间"
                            prepend-icon="access_time"
                            readonly
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-time-picker
                          v-if="menu2"
                          v-model="starttime"
                          format="24hr"
                          @click:minute="$refs.menust.save(starttime)"
                        ></v-time-picker>
                      </v-menu>
                    </v-flex>
                  </v-layout>
                </v-flex>
                <v-flex md12>
                  <v-text-field
                    v-model="duration"
                    label="作业时长(小时)"
                    hint="默认4小时"
                    persistent-hint
                    :rules="durationRules"
                    type="number"
                    step="1"
                  />
                </v-flex>
              </v-form>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <span class="grey--text">*根据MMSI查询港内船舶进行船名关联</span>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click.native="cancel">取消</v-btn>
            <v-btn color="blue darken-1" text @click.native="confirm">保存</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
  </div>
</template>
<script>
import api from '@/api/duty/ShipServicePlanApi'
import ShipInfoApi from '@/api/seachart/ShipInfoApi'
import dayjs from 'dayjs'
import Bus from './bus.js'
import storagedata from '@/plugins/storagedata.js'
export default {
  props: {
    show: {
      type: Boolean,
      default: false,
      required: true
    },
    item: {
      type: Object,
      default () {
        return {}
      }
    },
    id: {
      type: String,
      default: ''
    },
    // 新增true编辑
    type: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      dialog: false,
      editedItem: {
        id: '00000000-0000-0000-0000-000000000000',
        mmsi: '',
        type: '',
        info: '',
        startTime: '',
        duration: ''
      },
      type_items: ['供油', '作业'],
      shipname: '',
      duration: 4,
      MMSIRules: [
        v => !!v || 'MMSI不能为空',
        v => /^[0-9]{9}$/.test(v) || '输入的MMSI格式不正确'
      ],
      durationRules: [
        v => !!v || '作业时长不能为空',
        v => /^[0-9]*$/.test(v) || '请输入格式正确的时长'
      ],
      menu1: false,
      menu2: false,
      menu3: false,
      startdate: dayjs().format('YYYY-MM-DD'),
      starttime: dayjs().format('HH:mm')
    }
  },
  watch: {
    show (val) {
      if (val === true) {
        if (this.id !== '-1') {
          this.getItem(this.id)
        } else {
          this.startdate = dayjs().format('YYYY-MM-DD')
          this.starttime = dayjs().format('HH:mm')
        }
        this.dialog = true
      } else {
        this.dialog = false
      }
    }
  },
  methods: {
    getItem: async function () {
      let { data } = await api.GetById(this.id)
      this.startdate = dayjs(data.startTime).format('YYYY-MM-DD')
      this.starttime = dayjs(data.startTime).format('HH:mm')
      this.editedItem = data
      if (this.editedItem.duration) {
        let dur = dayjs(this.editedItem.duration, 'HH:mm')
        let h = dayjs(dur).hour()
        this.duration = h
      }
      this.searchShipName(data.mmsi)
    },
    confirm: async function () {
      if (this.$refs.form.validate()) {
        let data = null
        this.editedItem.startTime = this.startdate + ' ' + this.starttime
        if (this.duration) {
          let h = this.duration
          let end = dayjs(this.editedItem.startTime).add(h, 'hour')
          this.editedItem.endTime = dayjs(end).format('YYYY-MM-DD HH:mm')
        }
        if (this.id === '-1') {
          let userdata = storagedata.getUserdata()
          this.editedItem.publisher = userdata.fullName
          this.editedItem.publisherId = userdata.uid
          this.editedItem.regDate = dayjs().format('YYYY-MM-DD HH:mm')
          data = await api.Create(this.editedItem)
          // 新增
        } else {
          data = await api.Update(this.editedItem.id, this.editedItem)
          // 编辑
        }
        if (data.status === 200 || data.status === 201) {
          this.message.ShowMessage('保存成功', 'success')
        } else {
          this.message.ShowMessage('保存数据出错', 'error')
        }
        this.$emit('CallBack', true)
        Bus.$emit('regetdate', true)
        this.$refs.form.reset()
        this.dialog = false
      }
    },
    cancel () {
      this.$emit('CallBack', false)
      this.dialog = false
    },
    searchShipName: async function (val) {
      if (val && val.length === 9) {
        let data = await ShipInfoApi.GetByMMSI(val)
        // 当前没找到船舶返回404
        if (data.status) {
          if (data.status === 204) {
            this.shipname = '<未知>'
          } else {
            this.shipname = data.data.name
          }
        }
      }
    }
  }
}
</script>
