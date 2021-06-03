import tugstatus from './data/tugstatus.json'
var Mock = require('mockjs')

export const TugList = () => {
  return Mock.mock({
    'data|25': [{
      'tugId|+1': 0,
      'length|40-100': 1,
      'width|10-25': 1,
      'depth|4-6.1': 1,
      'mainEngine|4000-7000': 1,
      'rotatingSpeed|700-900': 1,
      'draft|3-5.1-3': 1,
      'speed|12-13.1': 1,
      'fontDrag|1': ['-', '65', '51', '52'],
      'behindDrag|1': ['56', '65', '51', '52', '70', '40'],
      'heindhook|1': true,
      'sort|+1': 1,
      'name|': '@name'
    }]
  })
}

export const TugStatus = () => {
  return tugstatus
}
