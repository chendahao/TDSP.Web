
/**
* mock api
*/

import HarborData from '../data/harbor.json'
import BerthData from '../data/berth.json'
import BerthGroupData from '../data/berthgroup.json'
import WharfData from '../data/wharf.json'
import ChannelData from '../data/channel.json'
import AnchorageData from '../data/anchorage.json'
import CustomLineData from '../data/customLine.json'
import CustomAreaData from '../data/CustomArea.json'
import ShipMarkData from '../data/shipColor.json'
import ShipDatabaseData from '../data/shipdatabase.json'
import WeatherData from '../data/weather.json'
import TidesData from '../data/tide.json'
import WadingWorksData from '../data/wadingWorks.json'
import WadingWorksShipsData from '../data/wadingWorksShips.json'

import mock from '../mockUtils'

export default {

  /**
  * Anchorage
  **/
  // 获取锚地分页记录
  'GET /api/navenv/Anchorage': (req, res) => mock.toPage(req, res, AnchorageData),

  // 更新锚地记录
  'PUT /api/navenv/Anchorage': (req, res) => mock.update(req, res, AnchorageData),

  // 创建 锚地记录
  'POST /api/navenv/Anchorage': (req, res) => mock.create(req, res, AnchorageData),

  // 根据 锚地Id 获取 锚地记录
  'GET /api/navenv/Anchorage/:id': (req, res) => mock.getById(req.params.id, res, AnchorageData),

  // 删除锚地记录
  'DELETE /api/navenv/Anchorage/:id': (req, res) => mock.deleteById(req.params.id, res, AnchorageData),

  /**
  * Berth
  **/
  // 获取泊位分页数据
  'GET /api/navenv/Berth': (req, res) => mock.toPage(req, res, BerthData),

  // 更新泊位数据
  'PUT /api/navenv/Berth': (req, res) => mock.update(req, res, BerthData),

  // 创建泊位
  'POST /api/navenv/Berth': (req, res) => mock.create(req, res, BerthData),

  // 根据 Id 获取泊位数据
  'GET /api/navenv/Berth/:id': (req, res) => mock.getById(req.params.id, res, BerthData),

  // 删除泊位数据
  'DELETE /api/navenv/Berth/:id': (req, res) => mock.deleteById(req.params.id, res, BerthData),

  // 文件上传
  'POST /api/navenv/Berth/files': (req, res) => mock.create(req, res, BerthData),

  /**
  * BerthGroup
  **/
  // 获取全部泊位组分页列表
  'GET /api/navenv/BerthGroup': (req, res) => mock.toPage(req, res, BerthGroupData),

  // 修改泊位组
  'PUT /api/navenv/BerthGroup': (req, res) => mock.update(req, res, BerthGroupData),

  // 新建 泊位组
  'POST /api/navenv/BerthGroup': (req, res) => mock.create(req, res, BerthGroupData),

  // 根据 BerthGroup.GroupId 获取泊位组
  'GET /api/navenv/BerthGroup/:groupId': (req, res) => mock.getById(req.params.groupId, res, BerthGroupData),

  // 删除泊位组
  'DELETE /api/navenv/BerthGroup/:groupId': (req, res) => mock.deleteById(req.params.groupId, res, BerthGroupData),

  /**
  * Channel
  **/
  // 获取全部航道分页数据
  'GET /api/navenv/Channel': (req, res) => mock.toPage(req, res, ChannelData),

  // 更新涉水工程
  'PUT /api/navenv/Channel': (req, res) => mock.update(req, res, ChannelData),

  // 新建 涉水工程
  'POST /api/navenv/Channel': (req, res) => mock.create(req, res, ChannelData),

  // 根据 ChannelId 获取 航道数据
  'GET /api/navenv/Channel/:channelId': (req, res) => mock.getById(req.params.channelId, res, ChannelData),

  // 删除涉水工程
  'DELETE /api/navenv/Channel/:workId': (req, res) => mock.deleteById(req.params.workId, res, ChannelData),


  /**
  * CustomLine
  **/
  // 获取 定线制分页数据
  'GET /api/navenv/CustomLine': (req, res) => mock.toPage(req, res, CustomLineData),

  // 更新定线制记录
  'PUT /api/navenv/CustomLine': (req, res) => mock.update(req, res, CustomLineData),

  // 新建 定线制记录
  'POST /api/navenv/CustomLine': (req, res) => mock.create(req, res, CustomLineData),

  // 根据 Id 获取 定线制记录
  'GET /api/navenv/CustomLine/:id': (req, res) => mock.getById(req.params.id, res, CustomLineData),

  // 删除定线制数据
  'DELETE /api/navenv/CustomLine/:id': (req, res) => mock.deleteById(req.params.id, res, CustomLineData),


  /**
  * CustomArea
  **/
  // 获取 自定义区域分页数据
  'GET /api/navenv/CustomArea': (req, res) => mock.toPage(req, res, CustomAreaData),

  // 更新自定义区域记录
  'PUT /api/navenv/CustomArea': (req, res) => mock.update(req, res, CustomAreaData),

  // 新建自定义区域记录
  'POST /api/navenv/CustomArea': (req, res) => mock.create(req, res, CustomAreaData),

  // 根据 Id 获取 自定义区域记录
  'GET /api/navenv/CustomArea/:id': (req, res) => mock.getById(req.params.id, res, CustomAreaData),

  // 删除自定义区域数据
  'DELETE /api/navenv/CustomArea/:id': (req, res) => mock.deleteById(req.params.id, res, CustomAreaData),

  /**
  * Harbor
  **/
  // 获取全部 港池分页数据
  'GET /api/navenv/Harbor': (req, res) => mock.toPage(req, res, HarborData),

  //
  'PUT /api/navenv/Harbor': (req, res) => mock.update(req, res, HarborData),

  //
  'POST /api/navenv/Harbor': (req, res) => mock.create(req, res, HarborData),

  // 根据CCHP.VTS.Models.NavEnv.Harbor.HarborId 获取港池记录
  'GET /api/navenv/Harbor/:id': (req, res) => mock.getById(req.params.id, res, HarborData),

  //
  'DELETE /api/navenv/Harbor/:id': (req, res) => mock.deleteById(req.params.id, res, HarborData),


  /**
  * ShipDatabase
  **/
  // 获取船舶数据库分页数据
  'GET /api/navenv/ShipDatabase': (req, res) => mock.toPage(req, res, ShipDatabaseData),

  // 根据 船舶MMSI/IMO/CallSign 获取船舶信息
  'GET /api/navenv/ShipDatabase/mmsi/:sign': (req, res) => mock.getById(req.params.sign, res, ShipDatabaseData),

  // 根据 船舶 ID 获取船舶信息
  'GET /api/navenv/ShipDatabase/:id': (req, res) => mock.getById(req.params.id, res, ShipDatabaseData),


  /**
  * ShipMark
  **/
  //
  'GET /api/navenv/ShipMark': ShipMarkData,

  //
  'PUT /api/navenv/ShipMark': (req, res) => mock.update(req, res, ShipMarkData),

  //
  'POST /api/navenv/ShipMark': (req, res) => mock.create(req, res, ShipMarkData),

  // 删除船舶标识
  'DELETE /api/navenv/ShipMark/:id': (req, res) => mock.deleteById(req.params.id, res, ShipMarkData),


  /**
  * Tides
  **/
  // 获取 潮汐表分页数据
  'GET /api/navenv/Tides': (req, res) => mock.toPage(req, res, TidesData),

  // 更新每日潮汐记录
  'PUT /api/navenv/Tides': (req, res) => mock.update(req, res, TidesData),

  // 新建每日潮汐记录数据
  'POST /api/navenv/Tides': (req, res) => mock.create(req, res, TidesData),

  // 获取给定日期的潮汐表
  'GET /api/navenv/Tides/:date': (req, res) => mock.getById(req.params.date, res, TidesData),

  // 删除指定日期的潮汐数据
  'DELETE /api/navenv/Tides/:date': (req, res) => mock.deleteById(req.params.date, res, TidesData),

  // 获取当日潮高序列(30分钟一个数值)
  'GET /api/navenv/Tides/series': TidesData,

  // 返回指定日期标准潮高序列
  'GET /api/navenv/Tides/series/:date': (req, res) => mock.getById(req.params.date, res, TidesData),

  // 获取当前 潮汐数据
  'GET /api/navenv/Tides/Point': TidesData,

  // 获取给定时间 潮汐数据
  'GET /api/navenv/Tides/Point/:time': (req, res) => mock.getById(req.params.time, res, TidesData),


  /**
  * WadingWorks
  **/
  // 获取全部涉水工程分页数据
  'GET /api/navenv/WadingWorks': (req, res) => mock.toPage(req, res, WadingWorksData),

  // 更新涉水工程
  'PUT /api/navenv/WadingWorks': (req, res) => mock.update(req, res, WadingWorksData),

  // 新建 涉水工程
  'POST /api/navenv/WadingWorks': (req, res) => mock.create(req, res, WadingWorksData),

  // 根据 WadingWorks.WadingWorksId 获取 涉水工程对象
  'GET /api/navenv/WadingWorks/:workId': (req, res) => mock.getById(req.params.workId, res, WadingWorksData),

  // 删除涉水工程
  'DELETE /api/navenv/WadingWorks/:workId': (req, res) => mock.deleteById(req.params.workId, res, WadingWorksData),

  // 根据工程Id 获取全部所属船舶
  'GET /api/navenv/WadingWorks/:workId/ships': (req, res) => mock.toPage(req, res, WadingWorksShipsData),

  // 更新涉水工程船舶
  'PUT /api/navenv/WadingWorks/:workId/ships': (req, res) => mock.update(req, res, WadingWorksData),

  // 增加涉水工程船舶
  'POST /api/navenv/WadingWorks/:workId/ships': (req, res) => mock.create(req, res, WadingWorksData),

  // 根据 ShipId 获取涉水工程船舶
  'GET /api/navenv/WadingWorks/ships/:shipId': (req, res) => mock.getById(req.params.shipId, res, WadingWorksData),

  // 删除涉水工程船信息
  'DELETE /api/navenv/WadingWorks/ships/:shipId': (req, res) => mock.deleteById(req.params.shipId, res, WadingWorksData),


  /**
  * Weather
  **/
  //
  'GET /api/navenv/Weather': (req, res) => mock.toPage(req, res, WeatherData),

  /**
  * Wharf
  **/
  // 获取码头数据 分页列表
  'GET /api/navenv/Wharf': (req, res) => mock.toPage(req, res, WharfData),

  // 修改 CCHP.VTS.Models.NavEnv.Wharf 对象
  'PUT /api/navenv/Wharf': (req, res) => mock.update(req, res, WharfData),

  // 新建码头
  'POST /api/navenv/Wharf': (req, res) => mock.create(req, res, WharfData),

  // 根据 码头Id 获取 码头数据
  'GET /api/navenv/Wharf/:wharfId': (req, res) => mock.getById(req.params.wharfId, res, WharfData),

  // 删除 码头数据记录
  'DELETE /api/navenv/Wharf/:wharfId': (req, res) => mock.deleteById(req.params.wharfId, res, WharfData),


}
