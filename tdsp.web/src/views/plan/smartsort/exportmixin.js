import 'docxtemplater/build/docxtemplater'
import JSZipUtils from 'jszip-utils'
import { saveAs } from 'file-saver'
import { actionPlanFormat, actionPlanFormat2 } from '@/plugins/format'
import { pscApi as psc } from '@/api/plan'
import dayjs from 'dayjs'
var JSZip = require('jszip')
export default {
  data () {
    return {
      client: new psc.PlanScheduleClient('', this.$axios),
      aclient: new psc.AnchorageShipClient('', this.$axios),
      bclient: new psc.BerthShipClient('', this.$axios),
      pclient: new psc.PreArrivalShipClient('', this.$axios)
    }
  },
  methods: {
    /**
     * @description: 导出word
     * @param {type}
     * @return {type} file
     */
    exportWord: function (date, timespannow, spans) {
      const datetime = date + ' ' + spans[timespannow - 1].value
      const fileName = datetime + '船舶计划.docx'
      const file = '/plan.docx'
      let form = {
        datetime: datetime
      }
      let plan1table; let plan2table; let plan3table; let plan4table = []
      let berth1table; let berth2table; let berth3table; let berth4table = []
      let anchtable = []
      let arrivaltable = []
      this.client.getByPeriod(date, timespannow).then(plan => {
        for (let i = 0; i < plan.length; i++) {
          let actionPlan = plan[i].berthingPlan.plan.actionPlan
          // 根据动作排序，同一时间   正在>离泊（离泊、移泊离）>靠泊（靠泊、移泊靠）
          switch (actionPlan) {
            case 'InUnBerthing':
              plan[i].berthingPlan.plan.actionPlan = '0' + actionPlan
              break
            case 'InBerthing':
              plan[i].berthingPlan.plan.actionPlan = '1' + actionPlan
              break
            case 'ShiftUnberthing':
              plan[i].berthingPlan.plan.actionPlan = '2' + actionPlan
              break
            case 'Unberthing':
              plan[i].berthingPlan.plan.actionPlan = '2' + actionPlan
              break
            case 'ShiftBerthing':
              plan[i].berthingPlan.plan.actionPlan = '3' + actionPlan
              break
            case 'Berthing':
              plan[i].berthingPlan.plan.actionPlan = '3' + actionPlan
              break
            case 'None':
              plan[i].berthingPlan.plan.actionPlan = '4' + actionPlan
              break
            default:
              plan[i].berthingPlan.plan.actionPlan = '4' + actionPlan
              break
          }
          // if ((actionPlan).indexOf('In') < 0) {
          //   plan[i].berthingPlan.plan.actionPlan = '1' + actionPlan
          // } else {
          //   plan[i].berthingPlan.plan.actionPlan = '0' + actionPlan
          // }
          let state = plan[i].schedule.state
          if ((state).indexOf('Cancel') < 0) {
            plan[i].schedule.state2 = '0'
          } else {
            plan[i].schedule.state2 = '1'
          }
        }
        let planlist0 = plan.sort(this.actionSort)
        let planlist = planlist0.sort(this.timeSort)
        let statelist = planlist.sort(this.listStatus) // 按时间排序
        plan1table = this.plan(statelist.filter(item => item.berthingPlan.plan.harbor === '开敞'))
        plan2table = this.plan(statelist.filter(item => item.berthingPlan.plan.harbor === '第一港池'))
        plan3table = this.plan(statelist.filter(item => item.berthingPlan.plan.harbor === '第二港池'))
        plan4table = this.plan(statelist.filter(item => item.berthingPlan.plan.harbor === '第三港池'))
        this.bclient.getByPeriod(date, timespannow).then(berth => {
          let berthlist = berth.sort(this.berthSort)
          berth1table = this.berth(berthlist.filter(item => item.harbor === '开敞'))
          berth2table = this.berth(berthlist.filter(item => item.harbor === '第一港池'))
          berth3table = this.berth(berthlist.filter(item => item.harbor === '第二港池'))
          berth4table = this.berth(berthlist.filter(item => item.harbor === '第三港池'))
          this.aclient.getByPeriod(date, timespannow).then(anch => {
            anchtable = this.anch(anch)
            this.pclient.getByPeriod(date, timespannow).then(arrival => {
              arrivaltable = this.arrival(arrival)
              // 读取并获得模板文件的二进制内容
              JSZipUtils.getBinaryContent(file, function (error, content) {
                // 抛出异常
                if (error) {
                  throw error
                }

                // 创建一个JSZip实例，内容为模板的内容
                let zip = new JSZip(content)
                // 创建并加载docxtemplater实例对象
                let doc = new window.docxtemplater().loadZip(zip)
                // 设置模板变量的值
                doc.setData({
                  ...form,
                  table1: plan1table,
                  table2: plan2table,
                  table3: plan3table,
                  table4: plan4table,
                  berth1: berth1table,
                  berth2: berth2table,
                  berth3: berth3table,
                  berth4: berth4table,
                  anch: anchtable,
                  arrival: arrivaltable
                })

                try {
                  // 用模板变量的值替换所有模板变量
                  doc.render()
                } catch (error) {
                  // 抛出异常
                  let e = {
                    message: error.message,
                    name: error.name,
                    stack: error.stack,
                    properties: error.properties
                  }
                  console.log(JSON.stringify({ error: e }))
                  throw error
                }

                // 生成一个代表docxtemplater对象的zip文件（不是一个真实的文件，而是在内存中的表示）
                let out = doc.getZip().generate({
                  type: 'blob',
                  mimeType:
                    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
                })
                // 将目标文件对象保存为目标类型的文件，并命名
                saveAs(out, fileName)
              })
            })
          })
        })
      })
    },
    // state2: Cancel 0 其他 1 将cancel的数据排在队尾
    listStatus (obj1, obj2) {
      var val1 = obj1.schedule.state2
      var val2 = obj2.schedule.state2
      if (val1 < val2) {
        return -1
      } else if (val1 > val2) {
        return 1
      } else {
        return 0
      }
    },
    plan (data) {
      let list = []
      for (let i = 0; i < data.length; i++) {
        const element = data[i]
        // 过滤取消的计划
        // 取消的计划改为---/dd
        // if (element.schedule.state === 'Cancel') {

        //   continue
        // }
        let plan = {}
        plan.cnName = element.berthingPlan.ship.cnName
        plan.name = element.berthingPlan.ship.name
        if (element.schedule.state === 'Cancel') {
          if (element.berthingPlan.plan.actionPlan === '1InBerthing' || element.berthingPlan.plan.actionPlan === '0InUnBerthing') {
            plan.time = this.dayFormat(element.schedule.scheduleTime) + actionPlanFormat2(element.berthingPlan.plan.actionPlan)
          } else {
            plan.time = this.dayFormat(element.schedule.scheduleTime) + actionPlanFormat2(element.berthingPlan.plan.actionPlan)
          }
        } else {
          if (element.berthingPlan.plan.actionPlan === '1InBerthing' || element.berthingPlan.plan.actionPlan === '0InUnBerthing') {
            plan.time = actionPlanFormat2(element.berthingPlan.plan.actionPlan)
          } else {
            plan.time = this.daytimeFormat(element.schedule.scheduleTime) + actionPlanFormat2(element.berthingPlan.plan.actionPlan)
          }
        }
        plan.berthNo = element.berthingPlan.plan.berthNo
        if (element.berthingPlan.plan.tugCorp !== '' && element.berthingPlan.plan.tugCorp !== '无') {
          plan.tugs = element.berthingPlan.plan.tugs + element.berthingPlan.plan.tugCorp
        } else {
          plan.tugs = element.berthingPlan.plan.tugs
        }
        plan.goodsType = element.berthingPlan.ship.goodsType
        plan.shipLength = element.berthingPlan.ship.shipLength
        plan.shipWidth = element.berthingPlan.ship.shipWidth
        plan.cargoWeight = element.berthingPlan.ship.cargoWeight
        plan.loadWeight = element.berthingPlan.ship.loadWeight
        plan.agent = element.berthingPlan.ship.agent
        plan.frontDraft = element.berthingPlan.ship.frontDraft
        plan.behindDraft = element.berthingPlan.ship.behindDraft
        if (element.berthingPlan.plan.isPilotage === true) {
          plan.isPilotage = '是'
        } else {
          plan.isPilotage = '否'
        }
        list.push(plan)
      }
      return list
    },
    berth (data) {
      let list = []
      for (let i = 0; i < data.length; i++) {
        const element = data[i]
        let plan = {}
        plan.cnName = element.ship.cnName
        plan.name = element.ship.name
        plan.time = this.daytimeFormat(element.berthTime)
        plan.berthNo = element.berthNo
        plan.nationality = element.ship.nationality
        plan.goodsType = element.ship.goodsType
        plan.shipLength = element.ship.shipLength
        plan.shipWidth = element.ship.shipWidth
        plan.cargoWeight = element.ship.cargoWeight
        plan.loadWeight = element.ship.loadWeight
        plan.agent = element.ship.agent
        plan.frontDraft = element.ship.frontDraft
        plan.behindDraft = element.ship.behindDraft
        plan.remark = element.plan.remark === null ? '' : element.plan.remark
        plan.actionPlan = actionPlanFormat(element.plan.actionPlan)
        list.push(plan)
      }
      return list
    },
    anch (data) {
      let list = []
      for (let i = 0; i < data.length; i++) {
        const element = data[i]
        let plan = {}
        plan.cnName = element.ship.cnName
        plan.name = element.ship.name
        plan.nationality = element.ship.nationality
        plan.goodsType = element.ship.goodsType
        plan.shipLength = element.ship.shipLength
        plan.shipWidth = element.ship.shipWidth
        plan.cargoWeight = element.ship.cargoWeight
        plan.loadWeight = element.ship.loadWeight
        plan.agent = element.ship.agent === null ? '' : element.ship.agent
        plan.frontDraft = element.ship.frontDraft
        plan.behindDraft = element.ship.behindDraft
        plan.remark = element.plan.remark === null ? '' : element.plan.remark
        plan.actionPlan = actionPlanFormat(element.plan.actionPlan)
        list.push(plan)
      }
      return list
    },
    arrival (data) {
      let list = []
      for (let i = 0; i < data.length; i++) {
        const element = data[i]
        let plan = {}
        plan.cnName = element.ship.cnName
        plan.name = element.ship.name
        plan.time = this.daytimeFormat(element.arrivalTime)
        plan.berthNo = element.berthNo
        plan.nationality = element.ship.nationality
        plan.goodsType = element.ship.goodsType
        plan.shipLength = element.ship.shipLength
        plan.shipWidth = element.ship.shipWidth
        plan.cargoWeight = element.ship.cargoWeight
        plan.loadWeight = element.ship.loadWeight
        plan.agent = element.ship.agent
        plan.callSign = element.ship.callSign
        plan.frontDraft = element.ship.frontDraft
        plan.behindDraft = element.ship.behindDraft
        plan.remark = element.plan.remark === null ? '' : element.plan.remark
        plan.actionPlan = actionPlanFormat(element.plan.actionPlan)
        list.push(plan)
      }
      return list
    },
    berthSort (obj1, obj2) {
      var val1 = obj1.berthNo
      var val2 = obj2.berthNo
      if (val1 < val2) {
        return -1
      } else if (val1 > val2) {
        return 1
      } else {
        return 0
      }
    },
    timeSort (obj1, obj2) {
      var val1 = obj1.schedule.scheduleTime
      var val2 = obj2.schedule.scheduleTime
      if (val1 < val2) {
        return -1
      } else if (val1 > val2) {
        return 1
      } else {
        return 0
      }
    },
    actionSort (obj1, obj2) {
      var val1 = obj1.berthingPlan.plan.actionPlan
      var val2 = obj2.berthingPlan.plan.actionPlan
      if (val1 < val2) {
        return -1
      } else if (val1 > val2) {
        return 1
      } else {
        return 0
      }
    },
    daytimeFormat (value) {
      if (!value) return ''
      if (!dayjs(value).isValid()) return value
      return dayjs(value).format('HHmm/DD')
    },
    dayFormat (value) {
      if (!value) return ''
      if (!dayjs(value).isValid()) return value
      return dayjs(value).format('----/DD')
    }
  }
}
