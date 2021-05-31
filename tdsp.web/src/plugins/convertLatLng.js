/// 将度转换成为度分(不含秒,分为小数形式 eg. 118°28' .5115N 38°54' .1673E)
function convertLatLng (item) {
  if (item.lng && item.lat) {
    // 纬度
    let vallat = Math.abs(item.lat)
    var lat1 = Math.floor(vallat) // 度
    var num1 = (vallat - lat1) * 60 // 分
    // 处理纬度分
    var lat2 = Math.floor(num1) // 分1
    var lat3 = Math.floor((num1 - lat2) * 10000)

    // 经度
    let vallng = Math.abs(item.lng)
    var lng1 = Math.floor(vallng) // 度
    var num2 = (vallng - lng1) * 60 // 分
    // 处理经度分
    var lng2 = Math.floor(num2) // 分1
    var lng3 = Math.floor((num2 - lng2) * 10000)
    return (
      lat1 + '°' + lat2 + "' ." + lat3 + '"N ' + lng1 + '°' + lng2 + "' ." + lng3 + '"E'
    )
  } else {
    return ''
  }
}

export {
  convertLatLng
}
