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

/**
 *  获取shop页面菜单列表
 */
export function menuList (id) {
  const url = '/restapi/shopping/v2/menu'

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

/**
 * 获取商铺评价分数
 */
export function ratingScores (id) {
  const url = '/restapi/ugc/v2/restaurants/' + id + '/ratings/scores'

  return axios.get(url).then((res) => {
    return Promise.resolve(res.data)
  })
}

/**
 * 获取商铺评价分类
 */
export function ratingTags (id) {
  const url = '/restapi/ugc/v2/restaurants/' + id + '/ratings/tags'

  return axios.get(url).then((res) => {
    return Promise.resolve(res.data)
  })
}

/**
 * 获取商铺评价列表
 */
export function ratings (id) {
  const url = '/restapi/ugc/v3/restaurants/' + id + '/ratings'
  const data = Object.assign({}, {
    has_content: true,
    offset: 0,
    limit: 8
  })

  return axios.get(url, {params: data}).then((res) => {
    return Promise.resolve(res.data)
  })
}

/**
 * 选择某个ratingTag获取相应的数据
 */
export function tatingTagName (id, tagName) {
  const url = '/restapi/ugc/v2/restaurants/' + id + '/ratings'
  const data = Object.assign({}, {
    has_content: true,
    tag_name: tagName,
    offset: 0,
    limit: 8
  })

  return axios.get(url, {params: data}).then((res) => {
    return Promise.resolve(res.data)
  })
}
