// 格式化方法
/**
 * 格式化计划动作
 */
export function actionPlanFormat (val) {
  switch (val) {
    case 'ShiftBerthing':
      return '移泊靠'
    case 'InUnBerthing':
      return '正在离泊'
    case 'Unberthing':
      return '离泊'
    case 'Berthing':
      return '靠泊'
    case 'InBerthing':
      return '正在靠泊'
    case 'ShiftUnberthing':
      return '移泊离'
    case 'None':
      return '无'
    default:
      return ''
  }
}

// 用于计划审核
export function actionPlanFormat2 (val) {
  val = val.replace(/[0-9]/ig, '')
  switch (val) {
    case 'ShiftBerthing':
      return '移泊靠'
    case 'InUnBerthing':
      return '正在离泊'
    case 'Unberthing':
      return '离泊'
    case 'Berthing':
      return '靠泊'
    case 'InBerthing':
      return '正在靠泊'
    case 'ShiftUnberthing':
      return '移泊离'
    case 'None':
      return '无'
    default:
      return '其他'
  }
}

export function planPeriodFormat (val) {
  switch (val) {
    case 'Default':
      return '未开放提交'
    case 'Open':
      return '开放提交'
    case 'Checked':
      return '审核阶段'
    case 'Scheduling':
      return '排序阶段'
    case 'Running':
      return '执行中'
    case 'Closed':
      return '关闭'
    default:
      return '其他'
  }
}

/**
 * @description: 格式化内外贸名称
 * @param {*} val
 * @return {*}
 */
export function tradeTypeFormat (val) {
  if (val.indexOf('内') > -1) {
    return '内'
  } else if (val.indexOf('外') > -1) {
    return '外'
  } else return val
}

// 0 = 发动机使用中
// 1 = 锚泊
// 2 = 未操纵
// 3 = 有限适航性
// 4 = 受船舶吃水限制
// 5 = 系泊
// 6 = 搁浅
// 7 = 从事捕捞
// 8 = 航行中
// 9 = 留做将来修正导航状态用于载运危险品（DG）、有害物质（HS）或海洋污染物（MP）的船舶或载运IMO的C类危险品或污染物、高速船（HSC）
// 10 = 留做将来修正导航状态用于载运 DG、HS或MP或载运IMO的A类危险品或污染物的船舶WIG
// 11 = 机动船尾推作业（区域使用）
// 12 = 机动船顶推或侧推作业（区域使用）
// 13 = 留做将来用
// 14 = AIS-SART（现行的）、MOB-AIS、EPIRB-AIS 15 = 未规定=默认值（也用于测试中的AIS-SART、MOB-AIS和 EPIRB-AIS）
