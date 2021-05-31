
/**
* mock api
*/

import ThroughPutData from './throughput.json'
import TrafficLineData from './trafficline.json'
import TrafficFlowData from './trafficflow.json'

import mock from '../mockUtils'

export default {

  /**
* ThroughPut
**/
  // 根据日期范围 统计吞吐量(单位:万吨)
  'GET /api/stat/ThroughPut': ThroughPutData,

  // 根据年/月 统计吞吐量 (单位:万吨)
  'GET /api/stat/ThroughPut/:year/:month': ThroughPutData,

  // 根据日期范围 获取货物种类分类统计(单位:万吨)
  'GET /api/stat/ThroughPut/goods': ThroughPutData,

  // 根据年/月 统计货物分类统计(单位:万吨)
  'GET /api/stat/ThroughPut/goods/:year/:month': ThroughPutData,

  /**
* TrafficFlow
**/
  // 获取 指定定线制 流量统计
  'GET /api/stat/TrafficFlow/CustomLine/:id': TrafficFlowData,
  //(req, res) => mock.getById(req.params.id, res, TrafficFlowData),

  // 获取报告线 交通流量统计
  'GET /api/stat/TrafficFlow/ReportLine': TrafficFlowData,

  // 获取报告线 交通流量统计
  'GET /api/stat/TrafficFlow/CustomArea/:id': TrafficFlowData,
  //(req, res) => mock.getById(req.params.id, res, TrafficFlowData),

  // 根据 流量线 和日期范围获取 流量统计数据
  'GET /api/stat/TrafficFlow/Traffic/:id': TrafficFlowData,
  //(req, res) => mock.getById(req.params.id, res, TrafficFlowData),

  /**
* TrafficLine
**/
  // 获取 GeoJson features 集合
  'GET /api/stat/TrafficLine/features': TrafficLineData,
  
   // 获取全部 交通流量统计线
  'GET /api/stat/TrafficLine': TrafficLineData,

  // 创建 交通流量统计线
  'POST /api/stat/TrafficLine': (req, res) => mock.create(req, res, TrafficLineData),

  // 根据 Id 获取 交通流量统计线
  'GET /api/stat/TrafficLine/:lineId': (req, res) => mock.getById(req.params.lineId, res, TrafficLineData),
  
  // 修改通流量统计线
  'PUT /api/stat/TrafficLine/:lineId': (req, res) => mock.update(req, res, TrafficLineData),

  // 删除通流量统计线
  'DELETE /api/stat/TrafficLine/:lineId': (req, res) => mock.deleteById(req.params.lineId, res, TrafficLineData)

}
