/**
 * Created by user on 2018/1/22.
 */
import axios from 'axios'

/**
 * 获取msite页面地址信息
 */
export function msiteAdress (geohash) {
  const url = '/restapi/v1/pois/' + geohash
  return axios.get(url).then((res) => {
    return Promise.resolve(res.data)
  })
}

/**
 * 获取导航食品类型列表
 */
export function msiteFoodTypes (latitude, longitude, templates) {
  const url = '/restapi/shopping/openapi/entries'
  const data = Object.assign({}, {
    latitude: latitude,
    longitude: longitude,
    templates: templates
  })
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

/**
 * 商铺列表
 */
export function shopList (latitude, longitude, extras) {
  const url = '/restapi/shopping/v3/restaurants'
  const data = {
    latitude: latitude,
    longitude: longitude,
    offset: 0,
    limit: 8,
    extras,
    extra_filters: 'home',
    rank_id: '',
    terminal: 'h5'
  }
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
