/**
 * Created by user on 2018/3/10.
 */
import axios from 'axios'
// import * as API from './index'

/**
 *  获取shop页面商铺详情
 */
export function shopDetails (shopId, extras, latitude, longitude) {
  const url = '/restapi/shopping/restaurant/' + shopId
  const data = Object.assign({}, {
    extras,
    terminal: 'h5',
    latitude,
    longitude
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function menuList (id) {
  const url = '/api/menuList'
  // const url = `/api/shopDetails/${id}`

  const data = Object.assign({}, {
    restaurant_id: id
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function qualification (id, latitude, longitude) {
  const url = '/restapi/shopping/v1/restaurants/' + id + '/business/qualification'

  const data = Object.assign({}, {
    latitude,
    longitude,
    terminal: 'h5'
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
