CCHP.VTS.MIS 业务管理 web 客户端
===========================

# 概述

VTSMIS 业务管理部分 
功能结构分为 
 
1. VTS 值班
2. 业务处理 
3. 数据查询
4. 数据维护

# 功能结构


- 数据维护
    - 基础数据
        - 船舶标识
        - 通航环境
        - 自定义区域
    - 系统参数
    - 海图参数
- 数据查询(只读- )
    - 基础数据
        - 通航环境数据
        - 水文气象
        - 船舶档案
            #- 列表视图和卡片视图
            - 二级库
        - 水域定义
            - 港池
                - 港池
                - 泊位组
                - 泊位
            - 锚地
            - 施工区域
            - 定线制区域
                - 通航分道
                - 警戒区
                - 推荐航路
            - 自定义区域
    - 历史数据查询
        - 船舶计划
        - 值班日志
            VHF - 播发记录
            - 操作记录
    - 统计分析
        - 船舶统计
            - 自定义区域
            - 报告线水域
            - 定线制水域
        - 交通流量统计
        - 港口吞吐量统计
        警报/- 事件统计
        - 系统运行状态
    - 系统参数
- 业务处理
    - 船舶计划
        - 自动排序
        - 计划查询
        - 计划执行查询
        - 自动核对
    - 交通动态
        - 智能锚地
        - 进出港动态查询
    - 船舶标注
    - 支持联合行动
- VTS值班
    - 信息播发
    - 值班日志
    - 实时监控
        - 报警信息
        - CCTV
    - 应急处置
