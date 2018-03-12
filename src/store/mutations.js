import * as types from './mutation-types'

const matutaions = {
  // 记录当前经度
  [types.SET_LATITUDE] (state, latitude) {
    state.latitude = latitude
  },
  // 记录当前纬度
  [types.SET_LONGITUDE] (state, longitude) {
    state.longitude = longitude
  }
}

export default matutaions
