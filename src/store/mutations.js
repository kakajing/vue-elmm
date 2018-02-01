import * as types from './mutation-types'

const matutaions = {
  // 记录当前经度纬度
  [types.RECODE_ADDRESS] (state, {latitude, longitude}) {
    state.latitude = latitude
    state.longitude = longitude
  },
  [types.SET_LATITUDE] (state, latitude) {
    state.latitude = latitude
  },
  [types.SET_LONGITUDE] (state, longitude) {
    state.longitude = longitude
  },
  [types.SET_SEARCH_HISTORY] (state, history) {
    state.searchHistory = history
  }
}

export default matutaions
