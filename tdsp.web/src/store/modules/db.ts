import { dbGet, dbSet } from '@/libs/db'

export default {
  namespaced: true,
  actions: {
    /**
     * @description 将数据存储到指定位置 | 路径不存在会自动初始化
     * @description 效果类似于取值 dbName.path = value
     * @param {Object} context
     * @param {Object} payload dbName {String} 数据库名称
     * @param {Object} payload path {String} 存储路径
     * @param {Object} payload value {*} 需要存储的值
     * @param {Object} payload user {Boolean} 是否区分用户
     */
    set (context: any, {
      dbName = 'database',
      path = '',
      value = '',
      user = false
    }: any) {
      dbSet({ dbName, path, value, user })
    },
    /**
     * @description 获取数据
     * @description 效果类似于取值 dbName.path || defaultValue
     * @param {Object} context
     * @param {Object} payload dbName {String} 数据库名称
     * @param {Object} payload path {String} 存储路径
     * @param {Object} payload defaultValue {*} 取值失败的默认值
     * @param {Object} payload user {Boolean} 是否区分用户
     */
    get (context: any, {
      dbName = 'database',
      path = '',
      defaultValue = '',
      user = false
    }: any) {
      return dbGet({ dbName, path, defaultValue, user })
    }
  }
}
