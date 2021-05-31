
import api1 from './navenv/mockapi.js'
import api2 from './sar/mockapi.js'
import api3 from './plan/mockapi.js'
import api4 from './stat/mockapi.js'

const merged = Object.assign(api1, api2, api3, api4)

export default merged
