
/**
* mock api
*/
import AlarmData from './alarmRecord.json'
import dealData from './dealRecord.json'
import DisposalPlanData from './disposalPlan.json'
import SearchRescueData from './searchrescue.json'
import mock from '../mockUtils'

export default {

  /**
  * Alarm
  **/
  //获取正在处理的数据
  'GET /api/sar/Alarm/processing': AlarmData,

  // 获取 报警记录 分页数据
  'GET /api/sar/Alarm': (req, res) => mock.toPage(req, res, AlarmData),

  // 创建 报警记录
  'POST /api/sar/Alarm': (req, res) => mock.create(req, res, AlarmData),

  // 获取正在处理的 报警记录
  'GET /api/sar/Alarm/processing': AlarmData,

  // 根据 Id 获取 报警记录
  'GET /api/sar/Alarm/:id': (req, res) => mock.getById(req.params.id, res, AlarmData),

  // 更新 报警记录
  'PUT /api/sar/Alarm/:id': (req, res) => mock.update(req, res, AlarmData),

  // 删除 报警记录
  'DELETE /api/sar/Alarm/:id': (req, res) => mock.deleteById(req.params.id, res, AlarmData),

  // 获取 空白的报警记录
  'POST /api/sar/Alarm/create': (req, res) => mock.create(req, res, AlarmData),

  // 获取 报警处置记录
  'GET /api/sar/Alarm/:alarmId/deals': (req, res) => mock.getById(req.params.alarmId, res, dealData),

  // 更新 处置记录
  'PUT /api/sar/Alarm/:alarmId/deals': (req, res) => mock.update(req, res, dealData),

  // 增加 报警处置记录
  'POST /api/sar/Alarm/:alarmId/deals': (req, res) => mock.create(req, res, dealData),

  // 删除 报警处置记录
  'PUT /api/sar/Alarm/:alarmId/deals/:dealId': (req, res) => mock.update(req, res, dealData),

  /**
  * DisposalPlan
  **/
  // 获取 处置预案 分页数据
  'GET /api/sar/DisposalPlan': (req, res) => mock.toPage(req, res, DisposalPlanData),

  // 创建 处置预案
  'POST /api/sar/DisposalPlan': (req, res) => mock.create(req, res, DisposalPlanData),

  // 根据 Id 获取 处置预案
  'GET /api/sar/DisposalPlan/:id': (req, res) => mock.getById(req.params.id, res, DisposalPlanData),

  // 更新 处置预案
  'PUT /api/sar/DisposalPlan/:id': (req, res) => mock.update(req, res, DisposalPlanData),

  // 删除 处置预案
  'DELETE /api/sar/DisposalPlan/:id': (req, res) => mock.deleteById(req.params.id, res, DisposalPlanData),

  /**
  * SearchRescue
  **/
  // 获取搜救力量分页列表
  'GET /api/sar/SearchRescue': (req, res) => mock.toPage(req, res, SearchRescueData),

  //
  'POST /api/sar/SearchRescue': (req, res) => mock.create(req, res, SearchRescueData),

  // 根据 Id 获取搜救力量 记录
  'GET /api/sar/SearchRescue/:id': (req, res) => mock.getById(req.params.id, res, SearchRescueData),

  //
  'PUT /api/sar/SearchRescue/:id': (req, res) => mock.update(req, res, SearchRescueData),

  // 删除对象
  'DELETE /api/sar/SearchRescue/:id': (req, res) => mock.deleteById(req.params.id, res, SearchRescueData)

}
