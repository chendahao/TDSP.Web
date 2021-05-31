
/**
* mock api
*/

import PlanPeriodData from './PlanPeriod.json'
import PlanSummaryData from '../data/planSummary.json'
import PlanActionData from '../data/planaction.json'
import AnchorageShipData from '../data/anchorageship.json'
import BerthShipData from '../data/berthship.json'
import BerthingPlanData from '../data/berthingPlan.json'
import ExpArrivalShipData from '../data/ExpArrivalShip.json'
import BeforeMeetingData from './beforeMeeting.json'
import PlanOverShipData from './planovership.json'
import timespans from './timespans.json'

import mock from '../mockUtils'

export default {
/**
* AnchorageShip
**/
  // 获取当前期间锚地船舶
  'GET /api/plan/AnchorageShip': AnchorageShipData,

  // 根据期间获取锚地船舶数据
  // 'GET /api/plan/AnchorageShip/:date/:timespan': (req, res) => mock.queryData({ date: req.params.date, timespan: req.params.timespan }, res, AnchorageShipData),
  'GET /api/plan/AnchorageShip/:date/:timespan': AnchorageShipData,

  /**
* BeforeMeeting
**/
  // 根据日期 获取 船前会记录
  'GET /api/plan/BeforeMeeting': BeforeMeetingData,

  // 新建 船前会记录
  'POST /api/plan/BeforeMeeting': (req, res) => mock.create(req, res, BeforeMeetingData),

  // 根据 Id 获取 船前会记录
  'GET /api/plan/BeforeMeeting/:id': (req, res) => mock.getById(req.params.id, res, BeforeMeetingData),

  // 新建 船前会记录
  'PUT /api/plan/BeforeMeeting/:id': (req, res) => mock.update(req, res, BeforeMeetingData),

  // 新建 船前会记录
  'DELETE /api/plan/BeforeMeeting/:id': (req, res) => mock.deleteById(req.params.id, res, BeforeMeetingData),

  /**
* BerthingPlan
**/
  // 获取指定日期和时段的 靠泊计划
  'GET /api/plan/BerthingPlan': BerthingPlanData,

  // 手动创建靠泊计划,根据期间创建 计划汇总和执行记录
  'POST /api/plan/BerthingPlan': (req, res) => mock.create(req, res, BerthingPlanData),

  /**
* BerthShip
**/
  // 获取当前期间泊位船舶数据
  'GET /api/plan/BerthShip': BerthShipData,

  // 根据期间获取泊位船舶数据
  'GET /api/plan/BerthShip/:date/:timespan': BerthShipData,
  //'GET /api/plan/BerthShip/:date/:timespan': (req, res) => mock.queryData({ date: req.params.date, timespan: req.params.timespan }, res, BerthShipData),

  /**
* ExpArrivalShip
**/
  // 获取当前期间预到船舶
  'GET /api/plan/ExpArrivalShip': ExpArrivalShipData,

  // 根据期间获取预到船舶
  // 'GET /api/plan/ExpArrivalShip/:date/:timespan': (req, res) => mock.queryData({ date: req.params.date, timespan: req.params.timespan }, res, ExpArrivalShipData),
  'GET /api/plan/ExpArrivalShip/:date/:timespan': ExpArrivalShipData,

  /**
* PlanAction
**/
  // 获取指定日期全部 计划活动
  'GET /api/plan/PlanAction': PlanActionData,

  // 开始执行
  'POST /api/plan/PlanAction/:planId/start': (req, res) => mock.create(req, res, PlanActionData),

  // 完成执行
  'POST /api/plan/PlanAction/:planId/complete': (req, res) => mock.create(req, res, PlanActionData),

  // 暂停执行
  'POST /api/plan/PlanAction/:planId/pause': (req, res) => mock.create(req, res, PlanActionData),

  /**
* PlanOverShip
**/
  // 获取当前期间特殊船舶
  'GET /api/plan/PlanOverShip': PlanOverShipData,

  // 根据期间获取特殊船舶
  'GET /api/plan/PlanOverShip/:date/:timespan': PlanOverShipData,
  // 'GET /api/plan/PlanOverShip/:date/:timespan': (req, res) => mock.queryData({ date: req.params.date, timespan: req.params.timespan }, res, PlanOverShipData),

  /**
* PlanPeriod
**/
  // 获取当前计划期间
  'GET /api/plan/PlanPeriod': PlanPeriodData,

  //
  //'GET /api/plan/PlanPeriod/:date': (req, res) => mock.getById(req.params.date, res, PlanPeriodData),

  //
  'GET /api/plan/PlanPeriod/next': PlanPeriodData,

  // 返回时段列表
  'GET /api/plan/PlanPeriod/timespans': timespans,

  /**
* PlanSummary
**/
  // 获取 指定日期和时段的 计划汇总
  'GET /api/plan/PlanSummary': PlanSummaryData,

  // 根据计划Id获取 计划汇总
  'GET /api/plan/PlanSummary/:planId': (req, res) => mock.getById(req.params.planId, res, PlanSummaryData),

  // 修改计划并重新检查
  'PUT /api/plan/PlanSummary/:planId': (req, res) => mock.update(req, res, PlanSummaryData),

  // 创建计划汇总
  'POST /api/plan/PlanSummary/:date/:timespan/create': (req, res) => mock.create(req, res, PlanSummaryData),

  // 1. 检查没有汇总的计划2. 过滤掉已经取消的计划
  'POST /api/plan/PlanSummary/:date/:timespan/check': (req, res) => mock.create(req, res, PlanSummaryData),

  // 排序计划
  'POST /api/plan/PlanSummary/:date/:timespan/sort': (req, res) => mock.create(req, res, PlanSummaryData),

  // 导出
  'GET /api/plan/PlanSummary/:date/:timespan/export': (req, res) => mock.queryData({ date: req.params.date, timespan: req.params.timespan }, res, PlanSummaryData),

  // 通过
  'POST /api/plan/PlanSummary/:planId/pass': (req, res) => mock.create(req, res, PlanSummaryData),

  // 取消计划
  'POST /api/plan/PlanSummary/:planId/cancel': (req, res) => mock.create(req, res, PlanSummaryData)

}
