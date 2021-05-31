/* md5: 6fa439a26ce882a01f7aea2e2e64b1ac */
/* Rap仓库id: 282336 */
/* Rapper版本: 1.2.0 */
/* eslint-disable */
/* tslint:disable */
// @ts-nocheck

/**
 * 本文件由 Rapper 同步 Rap 平台接口，自动生成，请勿修改
 * Rap仓库 地址: http://rap2.taobao.org/repository/editor?id=282336
 */

import * as commonLib from 'rap/runtime/commonLib'

export interface IModels {
  /**
   * 接口名：示例接口
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=282336&mod=453843&itf=1950831
   */
  'GET/example/1619404103182': {
    Req: {
      /**
       * 请求属性示例
       */
      foo?: string
    }
    Res: {
      /**
       * 字符串属性示例
       */
      string: string
      /**
       * 数字属性示例
       */
      number: number
      /**
       * 布尔属性示例
       */
      boolean: boolean
      /**
       * 正则属性示例
       */
      regexp: string
      /**
       * 函数属性示例
       */
      function: string
      /**
       * 数组属性示例
       */
      array: {
        /**
         * 数组元素示例
         */
        foo: number
        /**
         * 数组元素示例
         */
        bar: string
      }[]
      /**
       * 自定义数组元素示例
       */
      items: any[]
      /**
       * 对象属性示例
       */
      object: {
        /**
         * 对象属性示例
         */
        foo: number
        /**
         * 对象属性示例
         */
        bar: string
      }
      /**
       * 占位符示例
       */
      placeholder: string
    }
  }

  /**
   * 接口名：获取同步数据
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=282336&mod=453856&itf=1950883
   */
  'GET/api/psc/SyncAgent/{category}': {
    Req: {
      category: string
      /**
       * 任务Id (可选)
       */
      taskId?: string
    }
    Res: {
      /**
       * 同步任务Id,用于检测/识别通过任务|长度限制：最大值: 255
       */
      taskId: string
      /**
       * 同步内容类别名称|长度限制：最大值: 100
       */
      category: string
      /**
       * 创建时间
       */
      created: string
      /**
       * 消息内容,通常保存为 Json 形式|长度限制：最小值: 1
       */
      payload: string
      /**
       * 载荷数据校验|长度限制：最小值: 1
       */
      checksum: string
    }
  }

  /**
     * 接口名：确认同步数据获取
获取同步数据后需要进行 确认，避免重复获取
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=282336&mod=453856&itf=1950884
     */
  'POST/api/psc/SyncAgent/ack/{category}/{taskId}': {
    Req: {
      category?: string
      taskId?: string
    }
    Res: {}
  }

  /**
   * 接口名：提交同步数据
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=282336&mod=453856&itf=1950885
   */
  'POST/api/psc/SyncAgent': {
    Req: {
      /**
       * 同步任务Id,用于检测/识别通过任务|长度限制：最大值: 255
       */
      taskId: string
      /**
       * 同步内容类别名称|长度限制：最大值: 100
       */
      category: string
      /**
       * 创建时间
       */
      created: string
      /**
       * 消息内容,通常保存为 Json 形式|长度限制：最小值: 1
       */
      payload: string
      /**
       * 载荷数据校验|长度限制：最小值: 1
       */
      checksum: string
    }
    Res: {}
  }

  /**
   * 接口名：获取当前期间锚地船舶
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=282336&mod=453857&itf=1950886
   */
  'GET/api/psc/AnchorageShip': {
    Req: {}
    Res: {}
  }

  /**
   * 接口名：根据期间获取锚地船舶数据
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=282336&mod=453857&itf=1950887
   */
  'GET/api/psc/AnchorageShip/{date}/{timespan}': {
    Req: {
      date: string
      timespan: string
    }
    Res: {}
  }

  /**
   * 接口名：上报海事局
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=282336&mod=453857&itf=1950888
   */
  'POST/api/psc/AnchorageShip/{date}/{timespan}/sendup': {
    Req: {
      date: string
      timespan: string
    }
    Res: {
      /**
       * 状态代码
       */
      code: number
    }
  }

  /**
   * 接口名：获取指定日期和时段的全部靠泊计划(包括审核和未审核)
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=282336&mod=453858&itf=1950889
   */
  'GET/api/psc/BerthingPlan/{date}/{timespan}': {
    Req: {
      date: string
      timespan: string
      /**
       * 组织机构名称,如果为空则返回全部
       */
      orgName?: string
    }
    Res: {}
  }

  /**
   * 接口名：获取期间计划审核汇总
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=282336&mod=453858&itf=1950890
   */
  'GET/api/psc/BerthingPlan/{date}/{timespan}/AuditSummary': {
    Req: {
      date: string
      timespan: string
    }
    Res: {}
  }

  /**
   * 接口名：获取期间计划 特定审核状态的数量
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=282336&mod=453858&itf=1950891
   */
  'GET/api/psc/BerthingPlan/{date}/{timespan}/AuditCount': {
    Req: {
      date: string
      timespan: string
      /**
       * 审核状态|枚举值: Default,Review,Pass,Duplicate,NoPass
       */
      status?: string
    }
    Res: {}
  }

  /**
   * 接口名：根据日期-时间 范围和组织机构 查询靠泊计划
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=282336&mod=453858&itf=1950892
   */
  'GET/api/psc/BerthingPlan/range': {
    Req: {
      /**
       * 开始时间
       */
      start?: string
      /**
       * 结束时间
       */
      end?: string
      /**
       * 组织机构名称,如果为空则返回全部
       */
      orgName?: string
      /**
       * 审核状态，默认为 审核通过|枚举值: Default,Review,Pass,Duplicate,NoPass
       */
      audit?: string
      /**
       * 显示全部,默认 false,根据审核状态获取记录
       */
      showAll?: boolean
    }
    Res: {}
  }

  /**
   * 接口名：根据时段范围和组织机构 查询靠泊计划
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=282336&mod=453858&itf=1950893
   */
  'GET/api/psc/BerthingPlan/Period': {
    Req: {
      /**
       * 开始时段期间编号,形如 'BP20210101-1'
       */
      start?: string
      /**
       * 结束时段期间编号,形如 'BP20210101-2'
       */
      end?: string
      /**
       * 组织机构名称,如果为空则返回全部
       */
      orgName?: string
      /**
       * 审核状态，默认为 审核通过|枚举值: Default,Review,Pass,Duplicate,NoPass
       */
      audit?: string
      /**
       * 显示全部,默认 false,根据审核状态获取记录
       */
      showAll?: boolean
    }
    Res: {}
  }

  /**
   * 接口名：根据 计划Id 获取靠泊计划对象
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=282336&mod=453858&itf=1950894
   */
  'GET/api/psc/BerthingPlan/{id}': {
    Req: {
      id: string
    }
    Res: {}
  }

  /**
   * 接口名：更新靠泊计划
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=282336&mod=453858&itf=1950895
   */
  'PUT/api/psc/BerthingPlan/{planId}': {
    Req: {
      planId?: string
    }
    Res: {}
  }

  /**
   * 接口名：新建靠离泊计划
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=282336&mod=453858&itf=1950896
   */
  'POST/api/psc/BerthingPlan': {
    Req: {
      /**
       * 主键
       */
      berthingPlanId: string
      /**
       * 计划信息
       */
      plan: {}
      /**
       * 船舶信息
       */
      ship: {}
      /**
       * 扩展船舶信息
       */
      extended: {
        /**
         * 船舶属性 (内贸/外贸/外派)|长度限制：最大值: 10
         */
        shipAttributes?: string
        /**
         * 锚时(下锚时间)
         */
        anchorTime?: string
        /**
         * 上一港|长度限制：最大值: 30
         */
        previousPort?: string
        /**
         * 下一港|长度限制：最大值: 30
         */
        nextPort?: string
      }
    }
    Res: {}
  }

  /**
   * 接口名：审核通过靠泊计划
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=282336&mod=453858&itf=1950897
   */
  'POST/api/psc/BerthingPlan/pass': {
    Req: {}
    Res: {}
  }

  /**
   * 接口名：提交不通过审核
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=282336&mod=453858&itf=1950898
   */
  'POST/api/psc/BerthingPlan/NoPass': {
    Req: {
      /**
       * 记录Id
       */
      planId?: string
      reason?: string
    }
    Res: {}
  }

  /**
   * 接口名：获取当前期间泊位船舶数据
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=282336&mod=453859&itf=1950899
   */
  'GET/api/psc/BerthShip': {
    Req: {}
    Res: {}
  }

  /**
   * 接口名：根据期间获取泊位船舶数据
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=282336&mod=453859&itf=1950900
   */
  'GET/api/psc/BerthShip/{date}/{timespan}': {
    Req: {
      date: string
      timespan: string
    }
    Res: {}
  }

  /**
   * 接口名：泊位占用比例
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=282336&mod=453859&itf=1950901
   */
  'GET/api/psc/BerthShip/occupy': {
    Req: {
      date?: string
      timespan?: number
    }
    Res: {}
  }

  /**
   * 接口名：上报海事局
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=282336&mod=453859&itf=1950902
   */
  'POST/api/psc/BerthShip/{date}/{timespan}/sendup': {
    Req: {
      date: string
      timespan: string
    }
    Res: {
      /**
       * 状态代码
       */
      code: number
    }
  }

  /**
   * 接口名：根据时间 查询进出港记录
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=282336&mod=453860&itf=1950903
   */
  'GET/api/psc/EntryAndExit': {
    Req: {
      /**
       * 开始时间
       */
      start?: string
      /**
       * 结束时间
       */
      end?: string
      /**
       * 码头名称,可以为空
       */
      orgName?: string
    }
    Res: {}
  }

  /**
     * 接口名：检查上期是否存在重复计划
默认为当前时段
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=282336&mod=453860&itf=1950904
     */
  'POST/api/psc/EntryAndExit/CheckDupPlans': {
    Req: {
      periodCode?: string
    }
    Res: {}
  }

  /**
     * 接口名：生成 进出港记录
默认为当前时段
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=282336&mod=453860&itf=1950905
     */
  'POST/api/psc/EntryAndExit/EERecord': {
    Req: {
      periodCode?: string
    }
    Res: {}
  }

  /**
   * 接口名：执行 期间计划检查任务
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=282336&mod=453860&itf=1950906
   */
  'POST/api/psc/EntryAndExit/QueuePeriodTask': {
    Req: {
      periodCode?: string
    }
    Res: {}
  }

  /**
   * 接口名：获取指定日期和期间的全部 计划活动
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=282336&mod=453861&itf=1950907
   */
  'GET/api/psc/PlanAction': {
    Req: {
      date?: string
      period?: number
    }
    Res: {}
  }

  /**
   * 接口名：根据Id 获取 PlanAction
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=282336&mod=453861&itf=1950908
   */
  'GET/api/psc/PlanAction/{planId}': {
    Req: {
      planId: string
    }
    Res: {
      /**
       * 计划Id
       */
      planId: string
      /**
       * 所属港池名称
       */
      harbor: string
      /**
       * 单位名称
       */
      orgName: string
      /**
       * 填报时间
       */
      regDate: string
      /**
       * 填报时间段
       */
      timespan: number
      /**
       * MMSI
       */
      mmsi: string
      /**
       * 中文船名
       */
      shipNameCn: string
      /**
       * 英文船名
       */
      shipNameEn: string
      /**
       * 计划时间/申报时间
       */
      planTime: string
      /**
       * 调度时间
       */
      scheduleTime: string
      /**
       * 靠离泊位
       */
      berth: string
      /**
       * 计划动作
       */
      actionPlan: {}
      /**
       * 开始时间
       */
      startTime: string
      /**
       * 结束时间
       */
      overTime: string
      /**
       * 暂停时间
       */
      pauseTime: string
      /**
       * 原因
       */
      causes: string
      /**
       * 过期时间
       */
      lateTime: string
      state: string
    }
  }

  /**
   * 接口名：根据 船舶MMSI 获取 PlanAction
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=282336&mod=453861&itf=1950909
   */
  'GET/api/psc/PlanAction/mmsi/{mmsi}': {
    Req: {
      mmsi: string
      date?: string
    }
    Res: {
      /**
       * 主键
       */
      planActionId: string
      /**
       * 开始时间
       */
      startTime: string
      /**
       * 结束时间
       */
      overTime: string
      /**
       * 暂停时间
       */
      pauseTime: string
      /**
       * 原因|长度限制：最大值: 200
       */
      causes: string
      /**
       * 所属期间
       */
      period: {}
      /**
       * 船舶信息
       */
      ship: {}
      /**
       * 调度信息
       */
      schedule: {
        /**
         * 调度状态
         */
        state: {}
        /**
         * 计划时间
         */
        planTime: string
        /**
         * 调度时间
         */
        scheduleTime: string
      }
      /**
       * 关联的计划
       */
      plan: {}
      /**
       * 数据同步状态
       */
      syncStatus: {}
    }
  }

  /**
   * 接口名：根据时段查询申报状态
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=282336&mod=453862&itf=1950910
   */
  'GET/api/psc/DeclarStatus/{planDate}/{timeSpan}': {
    Req: {
      planDate: string
      timeSpan: string
    }
    Res: {}
  }

  /**
   * 接口名：获取当前计划期间
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=282336&mod=453863&itf=1950911
   */
  'GET/api/psc/PlanPeriod': {
    Req: {}
    Res: {
      period: {
        /**
         * 期间编号
         */
        periodCode: string
        /**
         * 计划日期
         */
        planDate: string
        /**
         * 时段 (1-4)
         */
        timespan: number
      }
      stage: {}
      /**
       * 开始时间
       */
      startTime: string
      /**
       * 结束
       */
      endTime: string
    }
  }

  /**
   * 接口名：获取指定时间的 靠泊计划期间
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=282336&mod=453863&itf=1950912
   */
  'GET/api/psc/PlanPeriod/{date}': {
    Req: {
      date: string
    }
    Res: {}
  }

  /**
   * 接口名：获取的 靠泊计划期间
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=282336&mod=453863&itf=1950913
   */
  'GET/api/psc/PlanPeriod/{date}/{timeSpan}': {
    Req: {
      date: string
      timeSpan: string
    }
    Res: {
      period: {
        /**
         * 期间编号
         */
        periodCode: string
        /**
         * 计划日期
         */
        planDate: string
        /**
         * 时段 (1-4)
         */
        timespan: number
      }
      stage: {}
      /**
       * 开始时间
       */
      startTime: string
      /**
       * 结束
       */
      endTime: string
    }
  }

  /**
   * 接口名：获取下一个靠泊计划期间
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=282336&mod=453863&itf=1950914
   */
  'GET/api/psc/PlanPeriod/next': {
    Req: {}
    Res: {
      period: {
        /**
         * 时段 (1-4)
         */
        timespan: number
        /**
         * 期间编号
         */
        periodCode: string
        /**
         * 计划日期
         */
        planDate: string
      }
      stage: {}
      /**
       * 开始时间
       */
      startTime: string
      /**
       * 结束
       */
      endTime: string
    }
  }

  /**
   * 接口名：修改期间阶段为 Open
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=282336&mod=453863&itf=1950915
   */
  'POST/api/psc/PlanPeriod/{date}/{timespan}/open': {
    Req: {
      date: string
      timespan: string
    }
    Res: {
      /**
       * 状态代码
       */
      code: number
    }
  }

  /**
   * 接口名：修改期间阶段为 Checked
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=282336&mod=453863&itf=1950916
   */
  'POST/api/psc/PlanPeriod/{date}/{timespan}/checked': {
    Req: {
      date: string
      timespan: string
    }
    Res: {
      /**
       * 状态代码
       */
      code: number
    }
  }

  /**
   * 接口名：靠泊计划时段列表
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=282336&mod=453863&itf=1950917
   */
  'GET/api/psc/PlanPeriod/timespans': {
    Req: {}
    Res: {}
  }

  /**
   * 接口名：获取指定日期和时段的 计划调度
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=282336&mod=453864&itf=1950918
   */
  'GET/api/psc/EmergencySchedule': {
    Req: {
      /**
       * 计划日期
       */
      date?: string
      /**
       * 时段 1~4
       */
      timespan?: number
      /**
       * true 表示查看全部, false:PlanState==Pass
       */
      showAll?: boolean
    }
    Res: {}
  }

  /**
   * 接口名：更新紧急调度
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=282336&mod=453864&itf=1950919
   */
  'PUT/api/psc/EmergencySchedule/{planId}': {
    Req: {
      planId?: string
    }
    Res: {
      /**
       * 状态代码
       */
      code: number
    }
  }

  /**
     * 接口名：上报海事局
上报成功后,期间阶段进入到 执行阶段 Running
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=282336&mod=453864&itf=1950920
     */
  'POST/api/psc/EmergencySchedule/sendup': {
    Req: {}
    Res: {
      /**
       * 状态代码
       */
      code: number
    }
  }

  /**
   * 接口名：获取指定日期和时段的 计划调度
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=282336&mod=453865&itf=1950921
   */
  'GET/api/psc/PlanSchedule': {
    Req: {
      /**
       * 计划日期
       */
      date?: string
      /**
       * 时段 1~4
       */
      timespan?: number
      /**
       * true 表示查看全部, false:PlanState==Pass
       */
      showAll?: boolean
    }
    Res: {}
  }

  /**
   * 接口名：根据计划Id获取 计划调度
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=282336&mod=453865&itf=1950922
   */
  'GET/api/psc/PlanSchedule/{planId}': {
    Req: {
      planId: string
    }
    Res: {
      /**
       * 主键
       */
      planId: string
      /**
       * 计划期间信息
       */
      period: {}
      /**
       * 调度信息
       */
      schedule: {
        /**
         * 计划时间
         */
        planTime: string
        /**
         * 调度时间
         */
        scheduleTime: string
        /**
         * 调度状态
         */
        state: {}
      }
      /**
       * 自动检查结果
       */
      check: {
        /**
         * 检查结果详情|长度限制：最大值: 1000
         */
        details: string
        /**
         * 检查结果|长度限制：最大值: 200
         */
        result: string
        /**
         * 检查状态
         */
        state: {}
      }
      /**
       * 关联计划
       */
      berthingPlan: {}
      /**
       * 数据同步状态
       */
      syncStatus: {}
    }
  }

  /**
     * 接口名：创建计划调度
根据已经审核的靠泊计划生成本期间计划调度记录
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=282336&mod=453865&itf=1950923
     */
  'POST/api/psc/PlanSchedule/{date}/{timespan}/create': {
    Req: {
      date: string
      timespan: string
    }
    Res: {}
  }

  /**
   * 接口名：计划检查
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=282336&mod=453865&itf=1950924
   */
  'POST/api/psc/PlanSchedule/{date}/{timespan}/check': {
    Req: {
      date: string
      timespan: string
    }
    Res: {}
  }

  /**
   * 接口名：靠泊计划自动排序,自动设置 调度时间
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=282336&mod=453865&itf=1950925
   */
  'POST/api/psc/PlanSchedule/{date}/{timespan}/sort': {
    Req: {
      date: string
      timespan: string
      /**
       * 间隔分钟数
       */
      interval?: number
    }
    Res: {
      /**
       * 状态代码
       */
      code: number
    }
  }

  /**
   * 接口名：变更 调度时间
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=282336&mod=453865&itf=1950926
   */
  'PUT/api/psc/PlanSchedule/{planId}/adjust': {
    Req: {
      planId?: string
    }
    Res: {
      /**
       * 状态代码
       */
      code: number
    }
  }

  /**
   * 接口名：导出报表 （未实现）
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=282336&mod=453865&itf=1950927
   */
  'GET/api/psc/PlanSchedule/{date}/{timespan}/export': {
    Req: {
      date: string
      timeSpan: number
      timespan?: string
    }
    Res: {}
  }

  /**
   * 接口名：手动放行
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=282336&mod=453865&itf=1950928
   */
  'POST/api/psc/PlanSchedule/{planId}/pass': {
    Req: {
      planId: string
    }
    Res: {
      /**
       * 状态代码
       */
      code: number
    }
  }

  /**
   * 接口名：取消计划
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=282336&mod=453865&itf=1950929
   */
  'POST/api/psc/PlanSchedule/{planId}/cancel': {
    Req: {
      planId: string
    }
    Res: {
      /**
       * 状态代码
       */
      code: number
    }
  }

  /**
     * 接口名：上报海事局
上报成功后,期间阶段进入到 执行阶段 Running
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=282336&mod=453865&itf=1950930
     */
  'POST/api/psc/PlanSchedule/{date}/{timespan}/sendup': {
    Req: {
      date: string
      timespan: string
    }
    Res: {
      /**
       * 状态代码
       */
      code: number
    }
  }

  /**
   * 接口名：获取当前期间预到船舶
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=282336&mod=453866&itf=1950931
   */
  'GET/api/psc/PreArrivalShip': {
    Req: {}
    Res: {}
  }

  /**
   * 接口名：根据期间获取预到船舶
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=282336&mod=453866&itf=1950932
   */
  'GET/api/psc/PreArrivalShip/{date}/{timespan}': {
    Req: {
      date: string
      timespan: string
    }
    Res: {}
  }

  /**
   * 接口名：上报海事局
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=282336&mod=453866&itf=1950933
   */
  'GET/api/psc/PreArrivalShip/{date}/{timespan}/sendup': {
    Req: {
      date: string
      timespan: string
    }
    Res: {
      /**
       * 状态代码
       */
      code: number
    }
  }

  /**
     * 接口名：根据日期范围 统计日吞吐量(单位:万吨)
根据日期分组,统计 载货量
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=282336&mod=453867&itf=1950934
     */
  'GET/api/psc/ThroughPut': {
    Req: {
      /**
       * 开始时间
       */
      start?: string
      /**
       * 结束时间
       */
      end?: string
      /**
       * 组织机构名称
       */
      orgName?: string
    }
    Res: {}
  }

  /**
   * 接口名：根据年/月 统计吞吐量 (单位:万吨)
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=282336&mod=453867&itf=1950935
   */
  'GET/api/psc/ThroughPut/{year}/{month}': {
    Req: {
      year: string
      month: string
    }
    Res: {}
  }

  /**
   * 接口名：根据日期范围 获取货物种类分类统计(单位:万吨)
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=282336&mod=453867&itf=1950936
   */
  'GET/api/psc/ThroughPut/goods': {
    Req: {
      /**
       * 开始时间
       */
      start?: string
      /**
       * 结束时间 (可选)
       */
      end?: string
      /**
       * 组织机构名称
       */
      orgName?: string
    }
    Res: {}
  }

  /**
   * 接口名：根据年/月 统计货物分类统计(单位:万吨)
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=282336&mod=453867&itf=1950937
   */
  'GET/api/psc/ThroughPut/goods/{year}/{month}': {
    Req: {
      year: string
      month: string
    }
    Res: {}
  }

  /**
     * 接口名：根据日期范围 统计日吞吐量(单位:万吨)
根据日期分组,统计 载货量
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=282336&mod=453868&itf=1950938
     */
  'GET/api/psc/ThroughPutData': {
    Req: {
      /**
       * 开始日期
       */
      start?: string
      /**
       * 结束日期
       */
      end?: string
      /**
       * 组织机构名称
       */
      orgName?: string
    }
    Res: {}
  }
}

type ResSelector<T> = T

export interface IResponseTypes {
  'GET/example/1619404103182': ResSelector<IModels['GET/example/1619404103182']['Res']>
  'GET/api/psc/SyncAgent/{category}': ResSelector<IModels['GET/api/psc/SyncAgent/{category}']['Res']>
  'POST/api/psc/SyncAgent/ack/{category}/{taskId}': ResSelector<
    IModels['POST/api/psc/SyncAgent/ack/{category}/{taskId}']['Res']
  >
  'POST/api/psc/SyncAgent': ResSelector<IModels['POST/api/psc/SyncAgent']['Res']>
  'GET/api/psc/AnchorageShip': ResSelector<IModels['GET/api/psc/AnchorageShip']['Res']>
  'GET/api/psc/AnchorageShip/{date}/{timespan}': ResSelector<
    IModels['GET/api/psc/AnchorageShip/{date}/{timespan}']['Res']
  >
  'POST/api/psc/AnchorageShip/{date}/{timespan}/sendup': ResSelector<
    IModels['POST/api/psc/AnchorageShip/{date}/{timespan}/sendup']['Res']
  >
  'GET/api/psc/BerthingPlan/{date}/{timespan}': ResSelector<
    IModels['GET/api/psc/BerthingPlan/{date}/{timespan}']['Res']
  >
  'GET/api/psc/BerthingPlan/{date}/{timespan}/AuditSummary': ResSelector<
    IModels['GET/api/psc/BerthingPlan/{date}/{timespan}/AuditSummary']['Res']
  >
  'GET/api/psc/BerthingPlan/{date}/{timespan}/AuditCount': ResSelector<
    IModels['GET/api/psc/BerthingPlan/{date}/{timespan}/AuditCount']['Res']
  >
  'GET/api/psc/BerthingPlan/range': ResSelector<IModels['GET/api/psc/BerthingPlan/range']['Res']>
  'GET/api/psc/BerthingPlan/Period': ResSelector<IModels['GET/api/psc/BerthingPlan/Period']['Res']>
  'GET/api/psc/BerthingPlan/{id}': ResSelector<IModels['GET/api/psc/BerthingPlan/{id}']['Res']>
  'PUT/api/psc/BerthingPlan/{planId}': ResSelector<IModels['PUT/api/psc/BerthingPlan/{planId}']['Res']>
  'POST/api/psc/BerthingPlan': ResSelector<IModels['POST/api/psc/BerthingPlan']['Res']>
  'POST/api/psc/BerthingPlan/pass': ResSelector<IModels['POST/api/psc/BerthingPlan/pass']['Res']>
  'POST/api/psc/BerthingPlan/NoPass': ResSelector<IModels['POST/api/psc/BerthingPlan/NoPass']['Res']>
  'GET/api/psc/BerthShip': ResSelector<IModels['GET/api/psc/BerthShip']['Res']>
  'GET/api/psc/BerthShip/{date}/{timespan}': ResSelector<IModels['GET/api/psc/BerthShip/{date}/{timespan}']['Res']>
  'GET/api/psc/BerthShip/occupy': ResSelector<IModels['GET/api/psc/BerthShip/occupy']['Res']>
  'POST/api/psc/BerthShip/{date}/{timespan}/sendup': ResSelector<
    IModels['POST/api/psc/BerthShip/{date}/{timespan}/sendup']['Res']
  >
  'GET/api/psc/EntryAndExit': ResSelector<IModels['GET/api/psc/EntryAndExit']['Res']>
  'POST/api/psc/EntryAndExit/CheckDupPlans': ResSelector<IModels['POST/api/psc/EntryAndExit/CheckDupPlans']['Res']>
  'POST/api/psc/EntryAndExit/EERecord': ResSelector<IModels['POST/api/psc/EntryAndExit/EERecord']['Res']>
  'POST/api/psc/EntryAndExit/QueuePeriodTask': ResSelector<IModels['POST/api/psc/EntryAndExit/QueuePeriodTask']['Res']>
  'GET/api/psc/PlanAction': ResSelector<IModels['GET/api/psc/PlanAction']['Res']>
  'GET/api/psc/PlanAction/{planId}': ResSelector<IModels['GET/api/psc/PlanAction/{planId}']['Res']>
  'GET/api/psc/PlanAction/mmsi/{mmsi}': ResSelector<IModels['GET/api/psc/PlanAction/mmsi/{mmsi}']['Res']>
  'GET/api/psc/DeclarStatus/{planDate}/{timeSpan}': ResSelector<
    IModels['GET/api/psc/DeclarStatus/{planDate}/{timeSpan}']['Res']
  >
  'GET/api/psc/PlanPeriod': ResSelector<IModels['GET/api/psc/PlanPeriod']['Res']>
  'GET/api/psc/PlanPeriod/{date}': ResSelector<IModels['GET/api/psc/PlanPeriod/{date}']['Res']>
  'GET/api/psc/PlanPeriod/{date}/{timeSpan}': ResSelector<IModels['GET/api/psc/PlanPeriod/{date}/{timeSpan}']['Res']>
  'GET/api/psc/PlanPeriod/next': ResSelector<IModels['GET/api/psc/PlanPeriod/next']['Res']>
  'POST/api/psc/PlanPeriod/{date}/{timespan}/open': ResSelector<
    IModels['POST/api/psc/PlanPeriod/{date}/{timespan}/open']['Res']
  >
  'POST/api/psc/PlanPeriod/{date}/{timespan}/checked': ResSelector<
    IModels['POST/api/psc/PlanPeriod/{date}/{timespan}/checked']['Res']
  >
  'GET/api/psc/PlanPeriod/timespans': ResSelector<IModels['GET/api/psc/PlanPeriod/timespans']['Res']>
  'GET/api/psc/EmergencySchedule': ResSelector<IModels['GET/api/psc/EmergencySchedule']['Res']>
  'PUT/api/psc/EmergencySchedule/{planId}': ResSelector<IModels['PUT/api/psc/EmergencySchedule/{planId}']['Res']>
  'POST/api/psc/EmergencySchedule/sendup': ResSelector<IModels['POST/api/psc/EmergencySchedule/sendup']['Res']>
  'GET/api/psc/PlanSchedule': ResSelector<IModels['GET/api/psc/PlanSchedule']['Res']>
  'GET/api/psc/PlanSchedule/{planId}': ResSelector<IModels['GET/api/psc/PlanSchedule/{planId}']['Res']>
  'POST/api/psc/PlanSchedule/{date}/{timespan}/create': ResSelector<
    IModels['POST/api/psc/PlanSchedule/{date}/{timespan}/create']['Res']
  >
  'POST/api/psc/PlanSchedule/{date}/{timespan}/check': ResSelector<
    IModels['POST/api/psc/PlanSchedule/{date}/{timespan}/check']['Res']
  >
  'POST/api/psc/PlanSchedule/{date}/{timespan}/sort': ResSelector<
    IModels['POST/api/psc/PlanSchedule/{date}/{timespan}/sort']['Res']
  >
  'PUT/api/psc/PlanSchedule/{planId}/adjust': ResSelector<IModels['PUT/api/psc/PlanSchedule/{planId}/adjust']['Res']>
  'GET/api/psc/PlanSchedule/{date}/{timespan}/export': ResSelector<
    IModels['GET/api/psc/PlanSchedule/{date}/{timespan}/export']['Res']
  >
  'POST/api/psc/PlanSchedule/{planId}/pass': ResSelector<IModels['POST/api/psc/PlanSchedule/{planId}/pass']['Res']>
  'POST/api/psc/PlanSchedule/{planId}/cancel': ResSelector<IModels['POST/api/psc/PlanSchedule/{planId}/cancel']['Res']>
  'POST/api/psc/PlanSchedule/{date}/{timespan}/sendup': ResSelector<
    IModels['POST/api/psc/PlanSchedule/{date}/{timespan}/sendup']['Res']
  >
  'GET/api/psc/PreArrivalShip': ResSelector<IModels['GET/api/psc/PreArrivalShip']['Res']>
  'GET/api/psc/PreArrivalShip/{date}/{timespan}': ResSelector<
    IModels['GET/api/psc/PreArrivalShip/{date}/{timespan}']['Res']
  >
  'GET/api/psc/PreArrivalShip/{date}/{timespan}/sendup': ResSelector<
    IModels['GET/api/psc/PreArrivalShip/{date}/{timespan}/sendup']['Res']
  >
  'GET/api/psc/ThroughPut': ResSelector<IModels['GET/api/psc/ThroughPut']['Res']>
  'GET/api/psc/ThroughPut/{year}/{month}': ResSelector<IModels['GET/api/psc/ThroughPut/{year}/{month}']['Res']>
  'GET/api/psc/ThroughPut/goods': ResSelector<IModels['GET/api/psc/ThroughPut/goods']['Res']>
  'GET/api/psc/ThroughPut/goods/{year}/{month}': ResSelector<
    IModels['GET/api/psc/ThroughPut/goods/{year}/{month}']['Res']
  >
  'GET/api/psc/ThroughPutData': ResSelector<IModels['GET/api/psc/ThroughPutData']['Res']>
}

export function createFetch(fetchConfig: commonLib.RequesterOption, extraConfig?: {fetchType?: commonLib.FetchType}) {
  if (!extraConfig || !extraConfig.fetchType) {
    console.warn(
      'Rapper Warning: createFetch API will be deprecated, if you want to customize fetch, please use overrideFetch instead, since new API guarantees better type consistency during frontend lifespan. See detail https://www.yuque.com/rap/rapper/overridefetch'
    )
  }
  const rapperFetch = commonLib.getRapperRequest(fetchConfig)

  return {
    /**
     * 接口名：示例接口
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=282336&mod=453843&itf=1950831
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'GET/example/1619404103182': (req?: IModels['GET/example/1619404103182']['Req'], extra?: commonLib.IExtra) => {
      return rapperFetch({
        url: '/example/1619404103182',
        method: 'GET',
        params: req,
        extra,
      }) as Promise<IResponseTypes['GET/example/1619404103182']>
    },

    /**
     * 接口名：获取同步数据
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=282336&mod=453856&itf=1950883
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'GET/api/psc/SyncAgent/{category}': (
      req?: IModels['GET/api/psc/SyncAgent/{category}']['Req'],
      extra?: commonLib.IExtra
    ) => {
      return rapperFetch({
        url: '/api/psc/SyncAgent/{category}',
        method: 'GET',
        params: req,
        extra,
      }) as Promise<IResponseTypes['GET/api/psc/SyncAgent/{category}']>
    },

    /**
     * 接口名：确认同步数据获取
获取同步数据后需要进行 确认，避免重复获取
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=282336&mod=453856&itf=1950884
     * @param req 请求参数
            * @param extra 请求配置项
     */
    'POST/api/psc/SyncAgent/ack/{category}/{taskId}': (
      req?: IModels['POST/api/psc/SyncAgent/ack/{category}/{taskId}']['Req'],
      extra?: commonLib.IExtra
    ) => {
      return rapperFetch({
        url: '/api/psc/SyncAgent/ack/{category}/{taskId}',
        method: 'POST',
        params: req,
        extra,
      }) as Promise<IResponseTypes['POST/api/psc/SyncAgent/ack/{category}/{taskId}']>
    },

    /**
     * 接口名：提交同步数据
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=282336&mod=453856&itf=1950885
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'POST/api/psc/SyncAgent': (req?: IModels['POST/api/psc/SyncAgent']['Req'], extra?: commonLib.IExtra) => {
      return rapperFetch({
        url: '/api/psc/SyncAgent',
        method: 'POST',
        params: req,
        extra,
      }) as Promise<IResponseTypes['POST/api/psc/SyncAgent']>
    },

    /**
     * 接口名：获取当前期间锚地船舶
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=282336&mod=453857&itf=1950886
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'GET/api/psc/AnchorageShip': (req?: IModels['GET/api/psc/AnchorageShip']['Req'], extra?: commonLib.IExtra) => {
      return rapperFetch({
        url: '/api/psc/AnchorageShip',
        method: 'GET',
        params: req,
        extra,
      }) as Promise<IResponseTypes['GET/api/psc/AnchorageShip']>
    },

    /**
     * 接口名：根据期间获取锚地船舶数据
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=282336&mod=453857&itf=1950887
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'GET/api/psc/AnchorageShip/{date}/{timespan}': (
      req?: IModels['GET/api/psc/AnchorageShip/{date}/{timespan}']['Req'],
      extra?: commonLib.IExtra
    ) => {
      return rapperFetch({
        url: '/api/psc/AnchorageShip/{date}/{timespan}',
        method: 'GET',
        params: req,
        extra,
      }) as Promise<IResponseTypes['GET/api/psc/AnchorageShip/{date}/{timespan}']>
    },

    /**
     * 接口名：上报海事局
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=282336&mod=453857&itf=1950888
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'POST/api/psc/AnchorageShip/{date}/{timespan}/sendup': (
      req?: IModels['POST/api/psc/AnchorageShip/{date}/{timespan}/sendup']['Req'],
      extra?: commonLib.IExtra
    ) => {
      return rapperFetch({
        url: '/api/psc/AnchorageShip/{date}/{timespan}/sendup',
        method: 'POST',
        params: req,
        extra,
      }) as Promise<IResponseTypes['POST/api/psc/AnchorageShip/{date}/{timespan}/sendup']>
    },

    /**
     * 接口名：获取指定日期和时段的全部靠泊计划(包括审核和未审核)
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=282336&mod=453858&itf=1950889
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'GET/api/psc/BerthingPlan/{date}/{timespan}': (
      req?: IModels['GET/api/psc/BerthingPlan/{date}/{timespan}']['Req'],
      extra?: commonLib.IExtra
    ) => {
      return rapperFetch({
        url: '/api/psc/BerthingPlan/{date}/{timespan}',
        method: 'GET',
        params: req,
        extra,
      }) as Promise<IResponseTypes['GET/api/psc/BerthingPlan/{date}/{timespan}']>
    },

    /**
     * 接口名：获取期间计划审核汇总
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=282336&mod=453858&itf=1950890
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'GET/api/psc/BerthingPlan/{date}/{timespan}/AuditSummary': (
      req?: IModels['GET/api/psc/BerthingPlan/{date}/{timespan}/AuditSummary']['Req'],
      extra?: commonLib.IExtra
    ) => {
      return rapperFetch({
        url: '/api/psc/BerthingPlan/{date}/{timespan}/AuditSummary',
        method: 'GET',
        params: req,
        extra,
      }) as Promise<IResponseTypes['GET/api/psc/BerthingPlan/{date}/{timespan}/AuditSummary']>
    },

    /**
     * 接口名：获取期间计划 特定审核状态的数量
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=282336&mod=453858&itf=1950891
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'GET/api/psc/BerthingPlan/{date}/{timespan}/AuditCount': (
      req?: IModels['GET/api/psc/BerthingPlan/{date}/{timespan}/AuditCount']['Req'],
      extra?: commonLib.IExtra
    ) => {
      return rapperFetch({
        url: '/api/psc/BerthingPlan/{date}/{timespan}/AuditCount',
        method: 'GET',
        params: req,
        extra,
      }) as Promise<IResponseTypes['GET/api/psc/BerthingPlan/{date}/{timespan}/AuditCount']>
    },

    /**
     * 接口名：根据日期-时间 范围和组织机构 查询靠泊计划
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=282336&mod=453858&itf=1950892
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'GET/api/psc/BerthingPlan/range': (
      req?: IModels['GET/api/psc/BerthingPlan/range']['Req'],
      extra?: commonLib.IExtra
    ) => {
      return rapperFetch({
        url: '/api/psc/BerthingPlan/range',
        method: 'GET',
        params: req,
        extra,
      }) as Promise<IResponseTypes['GET/api/psc/BerthingPlan/range']>
    },

    /**
     * 接口名：根据时段范围和组织机构 查询靠泊计划
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=282336&mod=453858&itf=1950893
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'GET/api/psc/BerthingPlan/Period': (
      req?: IModels['GET/api/psc/BerthingPlan/Period']['Req'],
      extra?: commonLib.IExtra
    ) => {
      return rapperFetch({
        url: '/api/psc/BerthingPlan/Period',
        method: 'GET',
        params: req,
        extra,
      }) as Promise<IResponseTypes['GET/api/psc/BerthingPlan/Period']>
    },

    /**
     * 接口名：根据 计划Id 获取靠泊计划对象
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=282336&mod=453858&itf=1950894
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'GET/api/psc/BerthingPlan/{id}': (
      req?: IModels['GET/api/psc/BerthingPlan/{id}']['Req'],
      extra?: commonLib.IExtra
    ) => {
      return rapperFetch({
        url: '/api/psc/BerthingPlan/{id}',
        method: 'GET',
        params: req,
        extra,
      }) as Promise<IResponseTypes['GET/api/psc/BerthingPlan/{id}']>
    },

    /**
     * 接口名：更新靠泊计划
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=282336&mod=453858&itf=1950895
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'PUT/api/psc/BerthingPlan/{planId}': (
      req?: IModels['PUT/api/psc/BerthingPlan/{planId}']['Req'],
      extra?: commonLib.IExtra
    ) => {
      return rapperFetch({
        url: '/api/psc/BerthingPlan/{planId}',
        method: 'PUT',
        params: req,
        extra,
      }) as Promise<IResponseTypes['PUT/api/psc/BerthingPlan/{planId}']>
    },

    /**
     * 接口名：新建靠离泊计划
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=282336&mod=453858&itf=1950896
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'POST/api/psc/BerthingPlan': (req?: IModels['POST/api/psc/BerthingPlan']['Req'], extra?: commonLib.IExtra) => {
      return rapperFetch({
        url: '/api/psc/BerthingPlan',
        method: 'POST',
        params: req,
        extra,
      }) as Promise<IResponseTypes['POST/api/psc/BerthingPlan']>
    },

    /**
     * 接口名：审核通过靠泊计划
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=282336&mod=453858&itf=1950897
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'POST/api/psc/BerthingPlan/pass': (
      req?: IModels['POST/api/psc/BerthingPlan/pass']['Req'],
      extra?: commonLib.IExtra
    ) => {
      return rapperFetch({
        url: '/api/psc/BerthingPlan/pass',
        method: 'POST',
        params: req,
        extra,
      }) as Promise<IResponseTypes['POST/api/psc/BerthingPlan/pass']>
    },

    /**
     * 接口名：提交不通过审核
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=282336&mod=453858&itf=1950898
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'POST/api/psc/BerthingPlan/NoPass': (
      req?: IModels['POST/api/psc/BerthingPlan/NoPass']['Req'],
      extra?: commonLib.IExtra
    ) => {
      return rapperFetch({
        url: '/api/psc/BerthingPlan/NoPass',
        method: 'POST',
        params: req,
        extra,
      }) as Promise<IResponseTypes['POST/api/psc/BerthingPlan/NoPass']>
    },

    /**
     * 接口名：获取当前期间泊位船舶数据
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=282336&mod=453859&itf=1950899
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'GET/api/psc/BerthShip': (req?: IModels['GET/api/psc/BerthShip']['Req'], extra?: commonLib.IExtra) => {
      return rapperFetch({
        url: '/api/psc/BerthShip',
        method: 'GET',
        params: req,
        extra,
      }) as Promise<IResponseTypes['GET/api/psc/BerthShip']>
    },

    /**
     * 接口名：根据期间获取泊位船舶数据
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=282336&mod=453859&itf=1950900
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'GET/api/psc/BerthShip/{date}/{timespan}': (
      req?: IModels['GET/api/psc/BerthShip/{date}/{timespan}']['Req'],
      extra?: commonLib.IExtra
    ) => {
      return rapperFetch({
        url: '/api/psc/BerthShip/{date}/{timespan}',
        method: 'GET',
        params: req,
        extra,
      }) as Promise<IResponseTypes['GET/api/psc/BerthShip/{date}/{timespan}']>
    },

    /**
     * 接口名：泊位占用比例
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=282336&mod=453859&itf=1950901
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'GET/api/psc/BerthShip/occupy': (
      req?: IModels['GET/api/psc/BerthShip/occupy']['Req'],
      extra?: commonLib.IExtra
    ) => {
      return rapperFetch({
        url: '/api/psc/BerthShip/occupy',
        method: 'GET',
        params: req,
        extra,
      }) as Promise<IResponseTypes['GET/api/psc/BerthShip/occupy']>
    },

    /**
     * 接口名：上报海事局
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=282336&mod=453859&itf=1950902
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'POST/api/psc/BerthShip/{date}/{timespan}/sendup': (
      req?: IModels['POST/api/psc/BerthShip/{date}/{timespan}/sendup']['Req'],
      extra?: commonLib.IExtra
    ) => {
      return rapperFetch({
        url: '/api/psc/BerthShip/{date}/{timespan}/sendup',
        method: 'POST',
        params: req,
        extra,
      }) as Promise<IResponseTypes['POST/api/psc/BerthShip/{date}/{timespan}/sendup']>
    },

    /**
     * 接口名：根据时间 查询进出港记录
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=282336&mod=453860&itf=1950903
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'GET/api/psc/EntryAndExit': (req?: IModels['GET/api/psc/EntryAndExit']['Req'], extra?: commonLib.IExtra) => {
      return rapperFetch({
        url: '/api/psc/EntryAndExit',
        method: 'GET',
        params: req,
        extra,
      }) as Promise<IResponseTypes['GET/api/psc/EntryAndExit']>
    },

    /**
     * 接口名：检查上期是否存在重复计划
默认为当前时段
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=282336&mod=453860&itf=1950904
     * @param req 请求参数
            * @param extra 请求配置项
     */
    'POST/api/psc/EntryAndExit/CheckDupPlans': (
      req?: IModels['POST/api/psc/EntryAndExit/CheckDupPlans']['Req'],
      extra?: commonLib.IExtra
    ) => {
      return rapperFetch({
        url: '/api/psc/EntryAndExit/CheckDupPlans',
        method: 'POST',
        params: req,
        extra,
      }) as Promise<IResponseTypes['POST/api/psc/EntryAndExit/CheckDupPlans']>
    },

    /**
     * 接口名：生成 进出港记录
默认为当前时段
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=282336&mod=453860&itf=1950905
     * @param req 请求参数
            * @param extra 请求配置项
     */
    'POST/api/psc/EntryAndExit/EERecord': (
      req?: IModels['POST/api/psc/EntryAndExit/EERecord']['Req'],
      extra?: commonLib.IExtra
    ) => {
      return rapperFetch({
        url: '/api/psc/EntryAndExit/EERecord',
        method: 'POST',
        params: req,
        extra,
      }) as Promise<IResponseTypes['POST/api/psc/EntryAndExit/EERecord']>
    },

    /**
     * 接口名：执行 期间计划检查任务
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=282336&mod=453860&itf=1950906
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'POST/api/psc/EntryAndExit/QueuePeriodTask': (
      req?: IModels['POST/api/psc/EntryAndExit/QueuePeriodTask']['Req'],
      extra?: commonLib.IExtra
    ) => {
      return rapperFetch({
        url: '/api/psc/EntryAndExit/QueuePeriodTask',
        method: 'POST',
        params: req,
        extra,
      }) as Promise<IResponseTypes['POST/api/psc/EntryAndExit/QueuePeriodTask']>
    },

    /**
     * 接口名：获取指定日期和期间的全部 计划活动
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=282336&mod=453861&itf=1950907
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'GET/api/psc/PlanAction': (req?: IModels['GET/api/psc/PlanAction']['Req'], extra?: commonLib.IExtra) => {
      return rapperFetch({
        url: '/api/psc/PlanAction',
        method: 'GET',
        params: req,
        extra,
      }) as Promise<IResponseTypes['GET/api/psc/PlanAction']>
    },

    /**
     * 接口名：根据Id 获取 PlanAction
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=282336&mod=453861&itf=1950908
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'GET/api/psc/PlanAction/{planId}': (
      req?: IModels['GET/api/psc/PlanAction/{planId}']['Req'],
      extra?: commonLib.IExtra
    ) => {
      return rapperFetch({
        url: '/api/psc/PlanAction/{planId}',
        method: 'GET',
        params: req,
        extra,
      }) as Promise<IResponseTypes['GET/api/psc/PlanAction/{planId}']>
    },

    /**
     * 接口名：根据 船舶MMSI 获取 PlanAction
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=282336&mod=453861&itf=1950909
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'GET/api/psc/PlanAction/mmsi/{mmsi}': (
      req?: IModels['GET/api/psc/PlanAction/mmsi/{mmsi}']['Req'],
      extra?: commonLib.IExtra
    ) => {
      return rapperFetch({
        url: '/api/psc/PlanAction/mmsi/{mmsi}',
        method: 'GET',
        params: req,
        extra,
      }) as Promise<IResponseTypes['GET/api/psc/PlanAction/mmsi/{mmsi}']>
    },

    /**
     * 接口名：根据时段查询申报状态
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=282336&mod=453862&itf=1950910
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'GET/api/psc/DeclarStatus/{planDate}/{timeSpan}': (
      req?: IModels['GET/api/psc/DeclarStatus/{planDate}/{timeSpan}']['Req'],
      extra?: commonLib.IExtra
    ) => {
      return rapperFetch({
        url: '/api/psc/DeclarStatus/{planDate}/{timeSpan}',
        method: 'GET',
        params: req,
        extra,
      }) as Promise<IResponseTypes['GET/api/psc/DeclarStatus/{planDate}/{timeSpan}']>
    },

    /**
     * 接口名：获取当前计划期间
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=282336&mod=453863&itf=1950911
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'GET/api/psc/PlanPeriod': (req?: IModels['GET/api/psc/PlanPeriod']['Req'], extra?: commonLib.IExtra) => {
      return rapperFetch({
        url: '/api/psc/PlanPeriod',
        method: 'GET',
        params: req,
        extra,
      }) as Promise<IResponseTypes['GET/api/psc/PlanPeriod']>
    },

    /**
     * 接口名：获取指定时间的 靠泊计划期间
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=282336&mod=453863&itf=1950912
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'GET/api/psc/PlanPeriod/{date}': (
      req?: IModels['GET/api/psc/PlanPeriod/{date}']['Req'],
      extra?: commonLib.IExtra
    ) => {
      return rapperFetch({
        url: '/api/psc/PlanPeriod/{date}',
        method: 'GET',
        params: req,
        extra,
      }) as Promise<IResponseTypes['GET/api/psc/PlanPeriod/{date}']>
    },

    /**
     * 接口名：获取的 靠泊计划期间
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=282336&mod=453863&itf=1950913
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'GET/api/psc/PlanPeriod/{date}/{timeSpan}': (
      req?: IModels['GET/api/psc/PlanPeriod/{date}/{timeSpan}']['Req'],
      extra?: commonLib.IExtra
    ) => {
      return rapperFetch({
        url: '/api/psc/PlanPeriod/{date}/{timeSpan}',
        method: 'GET',
        params: req,
        extra,
      }) as Promise<IResponseTypes['GET/api/psc/PlanPeriod/{date}/{timeSpan}']>
    },

    /**
     * 接口名：获取下一个靠泊计划期间
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=282336&mod=453863&itf=1950914
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'GET/api/psc/PlanPeriod/next': (req?: IModels['GET/api/psc/PlanPeriod/next']['Req'], extra?: commonLib.IExtra) => {
      return rapperFetch({
        url: '/api/psc/PlanPeriod/next',
        method: 'GET',
        params: req,
        extra,
      }) as Promise<IResponseTypes['GET/api/psc/PlanPeriod/next']>
    },

    /**
     * 接口名：修改期间阶段为 Open
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=282336&mod=453863&itf=1950915
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'POST/api/psc/PlanPeriod/{date}/{timespan}/open': (
      req?: IModels['POST/api/psc/PlanPeriod/{date}/{timespan}/open']['Req'],
      extra?: commonLib.IExtra
    ) => {
      return rapperFetch({
        url: '/api/psc/PlanPeriod/{date}/{timespan}/open',
        method: 'POST',
        params: req,
        extra,
      }) as Promise<IResponseTypes['POST/api/psc/PlanPeriod/{date}/{timespan}/open']>
    },

    /**
     * 接口名：修改期间阶段为 Checked
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=282336&mod=453863&itf=1950916
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'POST/api/psc/PlanPeriod/{date}/{timespan}/checked': (
      req?: IModels['POST/api/psc/PlanPeriod/{date}/{timespan}/checked']['Req'],
      extra?: commonLib.IExtra
    ) => {
      return rapperFetch({
        url: '/api/psc/PlanPeriod/{date}/{timespan}/checked',
        method: 'POST',
        params: req,
        extra,
      }) as Promise<IResponseTypes['POST/api/psc/PlanPeriod/{date}/{timespan}/checked']>
    },

    /**
     * 接口名：靠泊计划时段列表
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=282336&mod=453863&itf=1950917
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'GET/api/psc/PlanPeriod/timespans': (
      req?: IModels['GET/api/psc/PlanPeriod/timespans']['Req'],
      extra?: commonLib.IExtra
    ) => {
      return rapperFetch({
        url: '/api/psc/PlanPeriod/timespans',
        method: 'GET',
        params: req,
        extra,
      }) as Promise<IResponseTypes['GET/api/psc/PlanPeriod/timespans']>
    },

    /**
     * 接口名：获取指定日期和时段的 计划调度
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=282336&mod=453864&itf=1950918
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'GET/api/psc/EmergencySchedule': (
      req?: IModels['GET/api/psc/EmergencySchedule']['Req'],
      extra?: commonLib.IExtra
    ) => {
      return rapperFetch({
        url: '/api/psc/EmergencySchedule',
        method: 'GET',
        params: req,
        extra,
      }) as Promise<IResponseTypes['GET/api/psc/EmergencySchedule']>
    },

    /**
     * 接口名：更新紧急调度
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=282336&mod=453864&itf=1950919
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'PUT/api/psc/EmergencySchedule/{planId}': (
      req?: IModels['PUT/api/psc/EmergencySchedule/{planId}']['Req'],
      extra?: commonLib.IExtra
    ) => {
      return rapperFetch({
        url: '/api/psc/EmergencySchedule/{planId}',
        method: 'PUT',
        params: req,
        extra,
      }) as Promise<IResponseTypes['PUT/api/psc/EmergencySchedule/{planId}']>
    },

    /**
     * 接口名：上报海事局
上报成功后,期间阶段进入到 执行阶段 Running
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=282336&mod=453864&itf=1950920
     * @param req 请求参数
            * @param extra 请求配置项
     */
    'POST/api/psc/EmergencySchedule/sendup': (
      req?: IModels['POST/api/psc/EmergencySchedule/sendup']['Req'],
      extra?: commonLib.IExtra
    ) => {
      return rapperFetch({
        url: '/api/psc/EmergencySchedule/sendup',
        method: 'POST',
        params: req,
        extra,
      }) as Promise<IResponseTypes['POST/api/psc/EmergencySchedule/sendup']>
    },

    /**
     * 接口名：获取指定日期和时段的 计划调度
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=282336&mod=453865&itf=1950921
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'GET/api/psc/PlanSchedule': (req?: IModels['GET/api/psc/PlanSchedule']['Req'], extra?: commonLib.IExtra) => {
      return rapperFetch({
        url: '/api/psc/PlanSchedule',
        method: 'GET',
        params: req,
        extra,
      }) as Promise<IResponseTypes['GET/api/psc/PlanSchedule']>
    },

    /**
     * 接口名：根据计划Id获取 计划调度
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=282336&mod=453865&itf=1950922
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'GET/api/psc/PlanSchedule/{planId}': (
      req?: IModels['GET/api/psc/PlanSchedule/{planId}']['Req'],
      extra?: commonLib.IExtra
    ) => {
      return rapperFetch({
        url: '/api/psc/PlanSchedule/{planId}',
        method: 'GET',
        params: req,
        extra,
      }) as Promise<IResponseTypes['GET/api/psc/PlanSchedule/{planId}']>
    },

    /**
     * 接口名：创建计划调度
根据已经审核的靠泊计划生成本期间计划调度记录
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=282336&mod=453865&itf=1950923
     * @param req 请求参数
            * @param extra 请求配置项
     */
    'POST/api/psc/PlanSchedule/{date}/{timespan}/create': (
      req?: IModels['POST/api/psc/PlanSchedule/{date}/{timespan}/create']['Req'],
      extra?: commonLib.IExtra
    ) => {
      return rapperFetch({
        url: '/api/psc/PlanSchedule/{date}/{timespan}/create',
        method: 'POST',
        params: req,
        extra,
      }) as Promise<IResponseTypes['POST/api/psc/PlanSchedule/{date}/{timespan}/create']>
    },

    /**
     * 接口名：计划检查
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=282336&mod=453865&itf=1950924
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'POST/api/psc/PlanSchedule/{date}/{timespan}/check': (
      req?: IModels['POST/api/psc/PlanSchedule/{date}/{timespan}/check']['Req'],
      extra?: commonLib.IExtra
    ) => {
      return rapperFetch({
        url: '/api/psc/PlanSchedule/{date}/{timespan}/check',
        method: 'POST',
        params: req,
        extra,
      }) as Promise<IResponseTypes['POST/api/psc/PlanSchedule/{date}/{timespan}/check']>
    },

    /**
     * 接口名：靠泊计划自动排序,自动设置 调度时间
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=282336&mod=453865&itf=1950925
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'POST/api/psc/PlanSchedule/{date}/{timespan}/sort': (
      req?: IModels['POST/api/psc/PlanSchedule/{date}/{timespan}/sort']['Req'],
      extra?: commonLib.IExtra
    ) => {
      return rapperFetch({
        url: '/api/psc/PlanSchedule/{date}/{timespan}/sort',
        method: 'POST',
        params: req,
        extra,
      }) as Promise<IResponseTypes['POST/api/psc/PlanSchedule/{date}/{timespan}/sort']>
    },

    /**
     * 接口名：变更 调度时间
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=282336&mod=453865&itf=1950926
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'PUT/api/psc/PlanSchedule/{planId}/adjust': (
      req?: IModels['PUT/api/psc/PlanSchedule/{planId}/adjust']['Req'],
      extra?: commonLib.IExtra
    ) => {
      return rapperFetch({
        url: '/api/psc/PlanSchedule/{planId}/adjust',
        method: 'PUT',
        params: req,
        extra,
      }) as Promise<IResponseTypes['PUT/api/psc/PlanSchedule/{planId}/adjust']>
    },

    /**
     * 接口名：导出报表 （未实现）
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=282336&mod=453865&itf=1950927
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'GET/api/psc/PlanSchedule/{date}/{timespan}/export': (
      req?: IModels['GET/api/psc/PlanSchedule/{date}/{timespan}/export']['Req'],
      extra?: commonLib.IExtra
    ) => {
      return rapperFetch({
        url: '/api/psc/PlanSchedule/{date}/{timespan}/export',
        method: 'GET',
        params: req,
        extra,
      }) as Promise<IResponseTypes['GET/api/psc/PlanSchedule/{date}/{timespan}/export']>
    },

    /**
     * 接口名：手动放行
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=282336&mod=453865&itf=1950928
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'POST/api/psc/PlanSchedule/{planId}/pass': (
      req?: IModels['POST/api/psc/PlanSchedule/{planId}/pass']['Req'],
      extra?: commonLib.IExtra
    ) => {
      return rapperFetch({
        url: '/api/psc/PlanSchedule/{planId}/pass',
        method: 'POST',
        params: req,
        extra,
      }) as Promise<IResponseTypes['POST/api/psc/PlanSchedule/{planId}/pass']>
    },

    /**
     * 接口名：取消计划
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=282336&mod=453865&itf=1950929
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'POST/api/psc/PlanSchedule/{planId}/cancel': (
      req?: IModels['POST/api/psc/PlanSchedule/{planId}/cancel']['Req'],
      extra?: commonLib.IExtra
    ) => {
      return rapperFetch({
        url: '/api/psc/PlanSchedule/{planId}/cancel',
        method: 'POST',
        params: req,
        extra,
      }) as Promise<IResponseTypes['POST/api/psc/PlanSchedule/{planId}/cancel']>
    },

    /**
     * 接口名：上报海事局
上报成功后,期间阶段进入到 执行阶段 Running
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=282336&mod=453865&itf=1950930
     * @param req 请求参数
            * @param extra 请求配置项
     */
    'POST/api/psc/PlanSchedule/{date}/{timespan}/sendup': (
      req?: IModels['POST/api/psc/PlanSchedule/{date}/{timespan}/sendup']['Req'],
      extra?: commonLib.IExtra
    ) => {
      return rapperFetch({
        url: '/api/psc/PlanSchedule/{date}/{timespan}/sendup',
        method: 'POST',
        params: req,
        extra,
      }) as Promise<IResponseTypes['POST/api/psc/PlanSchedule/{date}/{timespan}/sendup']>
    },

    /**
     * 接口名：获取当前期间预到船舶
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=282336&mod=453866&itf=1950931
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'GET/api/psc/PreArrivalShip': (req?: IModels['GET/api/psc/PreArrivalShip']['Req'], extra?: commonLib.IExtra) => {
      return rapperFetch({
        url: '/api/psc/PreArrivalShip',
        method: 'GET',
        params: req,
        extra,
      }) as Promise<IResponseTypes['GET/api/psc/PreArrivalShip']>
    },

    /**
     * 接口名：根据期间获取预到船舶
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=282336&mod=453866&itf=1950932
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'GET/api/psc/PreArrivalShip/{date}/{timespan}': (
      req?: IModels['GET/api/psc/PreArrivalShip/{date}/{timespan}']['Req'],
      extra?: commonLib.IExtra
    ) => {
      return rapperFetch({
        url: '/api/psc/PreArrivalShip/{date}/{timespan}',
        method: 'GET',
        params: req,
        extra,
      }) as Promise<IResponseTypes['GET/api/psc/PreArrivalShip/{date}/{timespan}']>
    },

    /**
     * 接口名：上报海事局
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=282336&mod=453866&itf=1950933
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'GET/api/psc/PreArrivalShip/{date}/{timespan}/sendup': (
      req?: IModels['GET/api/psc/PreArrivalShip/{date}/{timespan}/sendup']['Req'],
      extra?: commonLib.IExtra
    ) => {
      return rapperFetch({
        url: '/api/psc/PreArrivalShip/{date}/{timespan}/sendup',
        method: 'GET',
        params: req,
        extra,
      }) as Promise<IResponseTypes['GET/api/psc/PreArrivalShip/{date}/{timespan}/sendup']>
    },

    /**
     * 接口名：根据日期范围 统计日吞吐量(单位:万吨)
根据日期分组,统计 载货量
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=282336&mod=453867&itf=1950934
     * @param req 请求参数
            * @param extra 请求配置项
     */
    'GET/api/psc/ThroughPut': (req?: IModels['GET/api/psc/ThroughPut']['Req'], extra?: commonLib.IExtra) => {
      return rapperFetch({
        url: '/api/psc/ThroughPut',
        method: 'GET',
        params: req,
        extra,
      }) as Promise<IResponseTypes['GET/api/psc/ThroughPut']>
    },

    /**
     * 接口名：根据年/月 统计吞吐量 (单位:万吨)
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=282336&mod=453867&itf=1950935
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'GET/api/psc/ThroughPut/{year}/{month}': (
      req?: IModels['GET/api/psc/ThroughPut/{year}/{month}']['Req'],
      extra?: commonLib.IExtra
    ) => {
      return rapperFetch({
        url: '/api/psc/ThroughPut/{year}/{month}',
        method: 'GET',
        params: req,
        extra,
      }) as Promise<IResponseTypes['GET/api/psc/ThroughPut/{year}/{month}']>
    },

    /**
     * 接口名：根据日期范围 获取货物种类分类统计(单位:万吨)
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=282336&mod=453867&itf=1950936
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'GET/api/psc/ThroughPut/goods': (
      req?: IModels['GET/api/psc/ThroughPut/goods']['Req'],
      extra?: commonLib.IExtra
    ) => {
      return rapperFetch({
        url: '/api/psc/ThroughPut/goods',
        method: 'GET',
        params: req,
        extra,
      }) as Promise<IResponseTypes['GET/api/psc/ThroughPut/goods']>
    },

    /**
     * 接口名：根据年/月 统计货物分类统计(单位:万吨)
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=282336&mod=453867&itf=1950937
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'GET/api/psc/ThroughPut/goods/{year}/{month}': (
      req?: IModels['GET/api/psc/ThroughPut/goods/{year}/{month}']['Req'],
      extra?: commonLib.IExtra
    ) => {
      return rapperFetch({
        url: '/api/psc/ThroughPut/goods/{year}/{month}',
        method: 'GET',
        params: req,
        extra,
      }) as Promise<IResponseTypes['GET/api/psc/ThroughPut/goods/{year}/{month}']>
    },

    /**
     * 接口名：根据日期范围 统计日吞吐量(单位:万吨)
根据日期分组,统计 载货量
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=282336&mod=453868&itf=1950938
     * @param req 请求参数
            * @param extra 请求配置项
     */
    'GET/api/psc/ThroughPutData': (req?: IModels['GET/api/psc/ThroughPutData']['Req'], extra?: commonLib.IExtra) => {
      return rapperFetch({
        url: '/api/psc/ThroughPutData',
        method: 'GET',
        params: req,
        extra,
      }) as Promise<IResponseTypes['GET/api/psc/ThroughPutData']>
    },
  }
}
