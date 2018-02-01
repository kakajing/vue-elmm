import {loadSearch} from 'common/js/cache'

const state = {
  latitude: '',   // 当前位置纬度
  longitude: '',   // 当前位置经度
  searchHistory: loadSearch()
}

export default state
